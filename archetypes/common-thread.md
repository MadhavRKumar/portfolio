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
