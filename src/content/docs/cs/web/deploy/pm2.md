---
title: pm2
description: Process Management
lastUpdated: 2026-03-30T13:16:42Z
tags: [web, deploy]
---

## base

### delete
```sh
pm2 delete api

pm2 delete all
```
## config
### exec_mode
在 PM2（以及 Node.js 生态）中，Cluster（集群）和 Fork（派生） 是两种完全不同的进程运行模式。
简单来说：Fork 适合单进程应用，Cluster 适合高并发多核利用。
1. Fork 模式 (默认)
这是最基本的模式。PM2 只是简单地把你的脚本跑起来，就像你在终端输入 node app.js 一样。

* 实例数量：通常只有 1 个进程。
* 通信：主进程和子进程之间几乎没有自动的负载均衡。
* 适用场景：
* 开发环境。
   * 非 Web 服务（如：定时任务、消息队列监听、脚本工具）。
   * 非 Node.js 运行时（如：运行 Bun、Python 或 PHP 脚本时，PM2 只能用 Fork 模式）。

2. Cluster 模式
这是 PM2 的"神技"。它利用 Node.js 原生的 cluster 模块，在主进程下开启多个子进程（Worker）。

* 实例数量：可以根据 CPU 核心数开启多个（如 instances: 'max'）。
* 负载均衡：PM2 会自动把请求分发到空闲的子进程上。如果一个进程崩了，PM2 会立即拉起一个新的，实现零秒宕机更新（Reload）。
* 端口共享：所有子进程可以共享同一个端口（例如都监听 3000 端口），用户感知不到背后有多个进程。
* 适用场景：
* 生产环境的 Web 服务器（Express, Koa, NestJS 等）。
   * 需要处理大量并发请求、榨干服务器 CPU 性能的应用。

3. 核心对比表

| 特性 | Fork 模式 | Cluster 模式 |
|---|---|---|
| 多核利用 | ❌ 默认单核 | ✅ 自动利用所有核心 |
| 端口共享 | ❌ 不能同时起多个同端口实例 | ✅ 多个实例共享同一端口 |
| 负载均衡 | ❌ 无 | ✅ PM2 自动分发请求 |
| 适用语言 | 所有语言 (JS, TS, Bun, Python) | ⚠️ 仅限 Node.js (原生支持) |
| 配置项 | exec_mode: 'fork' | exec_mode: 'cluster' |


1. 如果你坚持用 Bun：你必须使用 Fork 模式。因为 PM2 的 Cluster 模式底层深度绑定了 Node.js 的 API，Bun 无法直接接入。想实现多核负载，得靠上一条回复提到的 reusePort: true。
2. 如果你切回 Node.js：建议使用 Cluster 模式，这样你可以通过 pm2 reload 实现无缝重启，且能自动处理高并发。

#### 动态扩容
```sh
# 扩展到 2 个进程
pm2 scale api 2

# 或者直接扩展到 CPU 核心数允许的最大值
pm2 scale api max
```
## monit (监控)



```sh
pm2 list

pm2 monit
```

### logs

```sh
# Display all apps logs in realtime
pm2 logs

# Display only `api` application logs
pm2 logs api

# Display new logs in json
pm2 logs --json

# Display 1000 lines of api log file
pm2 logs big-api --lines 1000
```
