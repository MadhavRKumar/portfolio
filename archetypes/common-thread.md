---
{{- $name := substr .Name 11 | urlize -}}
{{ $date := now.Format "2006-01-02" }}
date: '{{ $date }}'
slug: '{{ $date }}-common-threads-{{ $name | urlize }}'
title = 'Common Threads: {{ replace $name "-" " " | title }}'
type: posts
tags:
  - common-threads
---

# Common Threads: {{ replace $name "-" " " | title }}
This is a part of a series called "Common Threads". 
My goal is to bring together ideas from different sources I interact with and synthesize them into a post as a means of [learning in public](https://www.swyx.io/learn-in-public).
See the [introductory post](https://www.madhavrkumar.com/posts/2025-03-06-common-threads/) for a slightly more in-depth explanation of what this is and why I'm doing it.

## Fibers

## Definition
