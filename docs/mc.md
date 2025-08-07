---
title: mc
description: 
created_at: 2011-06-16T10:06:40Z
updated_at: 2025-08-06T22:12:40Z
tags: [mc]
---

## 启动器

### hmcl

### pcl

### fcl

## 联机

- cpolar https://www.cpolar.com
- ngrok, https://ngrok.com/ 被过滤了, 需要网络代理
- 花生壳
- frp, Fast Reverse Proxy 固定端口 自建服务，需要一台 VPS
- Playit.gg https://playit.gg/ 固定地址 需要网络代理

### MCSManager

```sh
sudo su -c "wget -qO- https://script.mcsmanager.com/setup.sh | bash"
systemctl start mcsm-{web,daemon}
systemctl restart mcsm-{web,daemon}
systemctl stop mcsm-{web,daemon}
# 查看状态
systemctl status mcsm-daemon
systemctl status mcsm-web
# 访问 web
http://localhost:23333/
# 下载 Minecraft Server Launcher
https://fabricmc.net/use/server/
# 下载 mc_server.jar
https://bmclapi2.bangbang93.com/version/1.21.1/server
```
- Only supports Ubuntu/Centos/Debian/Archlinux.

#### eula.txt
```txt
eula=true
```

#### server.properties
```properties
enforce-secure-profile=false # 1.21+ 新增安全协议，必须关闭
level-seed=1063292310985219505
online-mode=false          # 关闭正版验证，允许非正版玩家加入
# 玩家体验设置
keep-inventory=true      # 死亡不掉落
accepts-transfers=false  # 关闭玩家转移

# 游戏规则优化
gamemode=survival       # 默认生存模式
difficulty=normal       # 难度
max-players=20
```

#### command

```sh
/gamerule keepInventory true
```

### cpolar

```sh
# 1. install cpolar
yay -S cpolar`
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

### 补充

一个 mc server 对应一个 world

## mods
| name | description | mc version | loaders | env | link |
| ---- | ----------- | ---------- | ------- | --- | ---- |
| yes_steve_model | 允许玩家根据需要自定义玩家模型和动画 | 1.21.1 |...| and | https://ysm.cfpa.team/ |
|Tweakeroo|为游戏添加了一大堆杂项“调整”|1.21.x|....|client|
|Item Scroller| | 1.21.x | ....|client|
|MiniHUD|有各种“迷你 F3”信息行供您选择| 1.21.x | ....|client|
|Litematica| 投影建筑蓝图 | 1.21.x | ....|client|

### 合成表, recipe viewer

#### emi | 1.21.1 | ....|and|
#### rei | 1.21.x | ....|client|

### 连锁采集

#### liteminer | 1.21-1.21.1 1.21.4-1.21.8 | .... | and|

### 建造

### Litematica | 1.21.x | ....|client|

投影建筑蓝图

依赖: MaLiLib

### info

#### Mod Menu | 1.21.x |fabric,quilt|client|

#### jade|1.21.x|...|client,and|

Jade 是现代 Minecraft 版本的信息 HUD 模组 - Hwyla/Waila。专为更好的用户体验和 API 而设计。

显示 方块或生物 的 信息

#### AppleSkin | 1.21.x | ....|and|
添加了各种与食物相关的 HUD 改进。这主要是一个客户端模组，但它需要在服务器上才能在客户端上显示准确的饱和度/耗尽值。

#### MiniHUD | 1.21.x | ....|client|
有各种“迷你 F3”信息行供您选择

依赖: MaLiLib

### map

#### xaero_s_minimap | no 1.21.2 | ....|client|

#### xaero_s_world_map | no 1.21.2 | ....|client,and|

### model

#### yes_steve_model | 1.21.1 |...| and | https://ysm.cfpa.team/ |

允许玩家根据需要自定义玩家模型和动画

#### carry-on

允许你拾取方块实体和生物，并将它们带在身边！

按住 Shift（可重新绑定）并在任意 Tile Entities 或生物上右键点击（使用空手）来拾取和携带

### base

#### fabric-api | and |

#### Sodium|client|

#### Architectury API | and

一个中间 API，旨在简化多平台模组的开发。

#### Forge Config API Port  Forge | and