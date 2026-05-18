---
title: 内网穿透
description: ""
lastUpdated: 2026-03-31T19:37:59Z
tags: [web, network]
---



## cpolar

```sh
# 1. install cpolar
# yay -S cpolar
curl -L https://www.cpolar.com/static/downloads/install-release-cpolar.sh | sudo bash

# 2. 登录
# 3. 穿透 tcp
cpolar tcp 25565 
# cpolar by@bestexpresser    (Ctrl+C to quit)
                              
# Tunnel Status    online
# Account             Nahida-aa (Plan: Free)
# Version             3.18/3.18
# Web Interface       127.0.0.1:4040
# Forwarding          tcp://31.tcp.cpolar.top:10219 -> tcp://127.0.0.1:25565
# # Conn              0
# Avg Conn Time       0.00ms 

# 其他玩家使用 地址: 31.tcp.cpolar.top:10219 连接即可
17.tcp.vip.cpolar.cn:11666
```
