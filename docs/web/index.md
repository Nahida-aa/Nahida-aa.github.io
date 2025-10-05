---
title: web
description: 
created_at: 2023-07-06T22:24:40Z
updated_at: 2025-08-08T08:54:40Z
tags: [web,dev]
---

URL 的基本结构确实可以表示为:
```
`<协议>://<主机>[:<端口>][/路径][?<查询>][#<片段>]`
`<protocol>://<host>[:<port>][/<path>][?<query>][#<fragment>]`
```
但需要注意：

- **协议**：如 `http`、`https`、`ftp` 等
- **主机**：域名或 IP 地址
- **端口**：可选，默认值取决于协议（HTTP 为 80，HTTPS 为 443）
- **路径**：资源在服务器上的位置
- **查询**：可选的参数，以 `?` 开头
- **片段**：可选的页面内锚点，以 `#` 开头

例如：
- `https://www.example.com:8080/path/to/resource?param=value#section` 
- `http://localhost`（使用默认端口 80）
