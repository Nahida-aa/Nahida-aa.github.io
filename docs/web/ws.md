---
title: websocket
description: WebSocket 是一种通信协议，允许在单个 TCP 连接上进行双向持久通信通道。它通常用于 web 应用程序中的实时数据传输。
created_at: 2025-02-01T03:06:07Z
updated_at: 2025-08-24T03:06:07Z
tags: [web]
---

## Socket.IO
https://socket.io/

**Socket.IO 并不是“纯粹”的 WebSocket 协议实现**，虽然它最终可能会用到 WebSocket 作为传输层，但它在底层有自己的一套**自定义协议**。

### 为什么说不是“标准 WebSocket”？

1. **标准 WebSocket**

   * 遵循 [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455)。
   * 客户端和服务端通过标准的握手，建立一条全双工的 TCP 通道。
   * 数据传输就是消息帧，不带额外语义。

2. **Socket.IO 的做法**

   * 在握手阶段，**先走 HTTP/HTTPS 请求**（它叫 *Engine.IO* 协议）。
   * 协商使用哪种传输：**WebSocket 或 HTTP 长轮询**。
   * 如果能用 WebSocket，就升级为 WebSocket；否则 fallback 到轮询。
   * 在 WebSocket 上面，Socket.IO **再封装了一层自己的协议**，比如：

     ```text
     42["chat","hello"]
     ```

     其中 `42` 是协议标识，`["chat","hello"]` 才是你定义的事件和数据。
   * 这意味着一个 **纯 WebSocket 客户端**（如浏览器 `new WebSocket("ws://...")`）
     -> **没法直接和 Socket.IO 服务端对话**，因为它听不懂 `42["chat","hello"]` 这样的自定义格式。

### example

#### 标准 WebSocket：

```js
// 浏览器
const ws = new WebSocket("ws://localhost:3000");
ws.send("hello");

// 服务端 (ws 库)
ws.on("message", msg => console.log(msg)); // "hello"
```

消息直接就是 `"hello"`。

#### Socket.IO：

```js
// 浏览器
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
socket.emit("chat", "hello");
```

底层发出去的其实是：

```text
42["chat","hello"]
```
如果服务端只是用 `ws`，它会看到 `"42["chat","hello"]"` 这样的原始字符串，完全不知道是什么意思。
