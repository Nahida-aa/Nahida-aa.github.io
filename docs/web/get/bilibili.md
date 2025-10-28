---
title: get bilibili
description: 
created_at: 2025-10-09T18:48:47Z
updated_at: 2025-10-09T18:48:47Z
tags: [web]
---
## get bilibili 推流码

```http
@cookie = 
@CSRF_TOKEN = 
@room_id

POST https://api.live.bilibili.com/room/v1/Room/startLive
Cookie: {{cookie}}

### 开始B站直播
POST https://api.live.bilibili.com/room/v1/Room/startLive
Content-Type: application/x-www-form-urlencoded
Cookie: SESSDATA=你的SESSDATA; bili_jct=你的CSRF_TOKEN; DedeUserID=你的DedeUserID
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36
Referer: https://live.bilibili.com/
Origin: https://live.bilibili.com/

csrf=你的CSRF_TOKEN&csrf_token=你的CSRF_TOKEN&room_id=你的直播间ID&platform=pc&area_v2=分区ID&build=版本号&version=版本号
```