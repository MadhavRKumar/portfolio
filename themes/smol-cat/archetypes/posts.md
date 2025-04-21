---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
slug: {{ .Name | urlize }}
type: posts
draft: true
categories:
  - default
tags:
  - default
---
