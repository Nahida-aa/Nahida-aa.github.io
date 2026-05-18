---
title: Nginx
description: ""
lastUpdated: 2026-03-02T13:23:04Z
tags: [deploy, nginx]
---
## install nginx
https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04
```sh
# debian
# 首先，更新本地软件包索引，以确保您能够访问最新的软件包列表
sudo apt update
sudo apt upgrade -y
# 安装 nginx
sudo apt install nginx -y
# 检查 nginx 版本
nginx -v
# 如果没有, 可能在 /usr/sbin 通常只对 root/sudo 可见
sudo nginx -v
# or
sudo /usr/sbin/nginx -v
# 检查安装状态
dpkg -l | grep nginx
```

### 检查 web 服务器
```sh
systemctl status nginx
# 通过访问服务器的 IP 地址来查看 Nginx 的默认登录页面
## 查看公网ip
curl -4 icanhazip.com
## 访问 http://<公网ip>
```
### 配置 Nginx
```sh
ls /etc/nginx/sites-enabled/
# 编辑配置文件
sudo nano /etc/nginx/sites-enabled/default
# 测试配置文件是否正确
sudo nginx -t
# 重载 Nginx
sudo systemctl reload nginx
# 开机自启（如果还没）
sudo systemctl enable nginx
```
