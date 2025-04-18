---
title: Self hosting TT-RSS with docker-compose
date: 2025-03-02
slug: 2025-03-02-tt-rss-docker-compose
type: posts
tags:
  - tutorial
  - rss
---

# How to self-host Tiny Tiny RSS with Docker Compose

{{< toc >}}

## Get a server
There are a lot of options for where you host your instance: a Raspberry Pi, an old laptop, a VPS, NearlyFreeSpeech, etc. I trust you to make that decision for yourself based on your needs, technical ability, and financial situation.

I chose to go with an AWS EC2 instance purely because I am familiar with the platform through work and already had an account set up for some personal projects. I am considering switching over to NearlyFreeSpeech in the future, but for now this works.

## Setup docker-compose.yml
First you'll need to [install Docker and Docker Compose](https://docs.docker.com/engine/install/) for whatever flavor of Linux your server is. I think the documentation is pretty good so hopefully you don't run into any issues.

Once you have Docker ready, create a `docker-compose.yml` file and add the following:

```yaml
services:

  db:
    image: postgres:15-alpine
    restart: unless-stopped
    env_file:
      - .env
    environment:
      - POSTGRES_USER=${TTRSS_DB_USER}
      - POSTGRES_PASSWORD=${TTRSS_DB_PASS}
      - POSTGRES_DB=${TTRSS_DB_NAME}
    volumes:
      - db:/var/lib/postgresql/data
    networks:
      - nginx-reverse-proxy

  app:
    image: cthulhoo/ttrss-fpm-pgsql-static:latest
    restart: unless-stopped
    env_file:
      - .env
    volumes:
      - app:/var/www/html
      - ./config.d:/opt/tt-rss/config.d:ro
    depends_on:
      - db
    networks:
      - nginx-reverse-proxy

  updater:
    image: cthulhoo/ttrss-fpm-pgsql-static:latest
    restart: unless-stopped
    env_file:
      - .env
    volumes:
      - app:/var/www/html
      - ./config.d:/opt/tt-rss/config.d:ro
    depends_on:
      - app
    command: /opt/tt-rss/updater.sh
    networks:
      - nginx-reverse-proxy

  web-nginx:
    image: cthulhoo/ttrss-web-nginx:latest
    restart: unless-stopped
    env_file:
      - .env
    expose:
      - ${HTTP_PORT}
    volumes:
      - app:/var/www/html:ro
    depends_on:
      - app
    environment:
      VIRTUAL_HOST: ${HOST}
      LETSENCRYPT_HOST: ${HOST}
    networks:
      - nginx-reverse-proxy

  nginx-proxy:
    image: nginxproxy/nginx-proxy
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - certs:/etc/nginx/certs
      - html:/usr/share/nginx/html
      - /var/run/docker.sock:/tmp/docker.sock:ro
    labels:
      - com.github.nginx-proxy.nginx
    networks:
      - nginx-reverse-proxy

  nginx-proxy-acme:
    image: nginxproxy/acme-companion
    restart: always
    depends_on:
       - "nginx-proxy"
    environment:
      DEFAULT_EMAIL: ${EMAIL}
    volumes:
      - certs:/etc/nginx/certs
      - html:/usr/share/nginx/html
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - nginx-reverse-proxy

networks:
  nginx-reverse-proxy:
    name: nginx-reverse-proxy

volumes:
  db:
  app:
  html:
  certs:
```

Let's talk about the sections here. I am going to assume some baseline familiarity with Docker YAML here so I won't get too deep into the specifics like networking and volumes.

### Nginx reverse proxy

```yaml
  nginx-proxy:
    image: nginxproxy/nginx-proxy
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - certs:/etc/nginx/certs
      - html:/usr/share/nginx/html
      - /var/run/docker.sock:/tmp/docker.sock:ro
    labels:
      - com.github.nginx-proxy.nginx
    networks:
      - nginx-reverse-proxy

  nginx-proxy-acme:
    image: nginxproxy/acme-companion
    restart: always
    depends_on:
       - "nginx-proxy"
    environment:
      DEFAULT_EMAIL: ${EMAIL}
    volumes:
      - certs:/etc/nginx/certs
      - html:/usr/share/nginx/html
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - nginx-reverse-proxy

networks:
  nginx-reverse-proxy:
    name: nginx-reverse-proxy
```
Starting from the bottom we setup our reverse proxy using [nginx-proxy](https://github.com/nginx-proxy/nginx-proxy) and the [acme-companion](https://github.com/nginx-proxy/acme-companion/tree/main). This allows us to access our tt-rss instance via HTTPS. We can also re-use this server and add more containers if we'd like to host other things in the future. You'll need to supply your email for `DEFAULT_EMAIL`. We also set up a user defined network.

### TT-RSS containers
```yaml
  db:
    image: postgres:15-alpine
    restart: unless-stopped
    env_file:
      - .env
    environment:
      - POSTGRES_USER=${TTRSS_DB_USER}
      - POSTGRES_PASSWORD=${TTRSS_DB_PASS}
      - POSTGRES_DB=${TTRSS_DB_NAME}
    volumes:
      - db:/var/lib/postgresql/data
    networks:
      - nginx-reverse-proxy

  app:
    image: cthulhoo/ttrss-fpm-pgsql-static:latest
    restart: unless-stopped
    env_file:
      - .env
    volumes:
      - app:/var/www/html
      - ./config.d:/opt/tt-rss/config.d:ro
    depends_on:
      - db
    networks:
      - nginx-reverse-proxy

  updater:
    image: cthulhoo/ttrss-fpm-pgsql-static:latest
    restart: unless-stopped
    env_file:
      - .env
    volumes:
      - app:/var/www/html
      - ./config.d:/opt/tt-rss/config.d:ro
    depends_on:
      - app
    command: /opt/tt-rss/updater.sh
    networks:
      - nginx-reverse-proxy
 
  web-nginx:
    image: cthulhoo/ttrss-web-nginx:latest
    restart: unless-stopped
    env_file:
      - .env
    expose:
      - ${HTTP_PORT}
    volumes:
      - app:/var/www/html:ro
    depends_on:
      - app
    environment:
      VIRTUAL_HOST: ${HOST}
      LETSENCRYPT_HOST: ${HOST}
    networks:
      - nginx-reverse-proxy
```

Then, following the [instructions from tt-rss](https://tt-rss.org/wiki/InstallationNotes/#docker-composeyml), we include all the necessary containers to run tt-rss. A few key things to note:

1. We added all the containers to our nginx-reverse-proxy network so we can proxy to the `web-nginx` container while still allowing all the tt-rss containers to communicate with each other.
2. We set `VIRTUAL_HOST` and `LETSENCRYPT_HOST` on `web-nginx`. This is required for the reverse proxy and the acme companion. I set these values to a subdomain of my personal website.[^1]
3. You'll need to create a `.env` file on your server and set its values (once again see the [tt-rss documentation](https://tt-rss.org/wiki/InstallationNotes/#env)).

With everything set, we should be good to `docker compose up -d`.

## Read some blogs

That's it! Subscribe to some blogs you like. Organize your feeds however you want. Read some blogs. Be intentional about the content you consume.[^2] If a blog you like doesn't explicitly link its RSS feed, you can use [rsslookup.com](https://www.rsslookup.com/) to try and find it. Most blogging platforms will create one by default.

To get you started, here are some blogs I've been enjoying. They are, for what I hope are obvious reasons, largely geared towards software engineers.
- https://www.remoteworkprep.com/blog/
- https://ntietz.com/blog/
- https://josh.works/
- https://milofultz.com/
- https://olano.dev/ 

Ways to find more blogs yourself:
- https://blogroll.org/
- https://aboutideasnow.com/
- https://uses.tech/
- https://marginalia-search.com/
- talk to people and ask![^3]


[^1]: Since this site is built with [Hugo](https://gohugo.io/) and hosted on [Netlify](https://www.netlify.com/), I did need to add a DNS A Record that points the subdomain to the Elastic IP of my EC2 instance.

[^2]: I have a (not entirely fleshed out) idea that there is a connection between the rise in "[algorithmic complacency](https://www.youtube.com/watch?v=QEJpZjg8GuA)" and the homegrown fascism of the United States. Democracy requires continual, conscious civic engagement from us. Fascism, much like these content algorithms, forcefully removes our agency. It seems these systems are preferable to some. In this way, I view intentional consumption as a political act.

[^3]: Some of my favorite blogs have been recommended to me by co-workers. Admittedly, I have not thought to ask non-software engineer friends this question. Perhaps that's out of fear it'll make me sound even more like an esoteric out of touch tech weirdo.
