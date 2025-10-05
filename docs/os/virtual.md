---
title: virtual
description: 
created_at: 2025-09-08T19:40:44Z
updated_at: 2025-09-08T19:40:44Z
tags: [os]
---
## waydroid

### config
```sh
code /var/lib/waydroid/waydroid.cfg
```
#### 将 ～/Downloads 目录挂载到 /sdcard/Download
```sh
# 检查 waydroid 配置
sudo grep -E 'host_data_path|host.user|host.uid|host.gid' /var/lib/waydroid/waydroid.prop || echo "no waydroid.prop or no host_data_path"
```
out:
```
waydroid.host.user=aa
waydroid.host.uid=1000
waydroid.host.gid=1000
waydroid.host_data_path=/home/aa/.local/share/waydroid/data
```

```sh
# 绑定你的宿主 Downloads 到 Waydroid 的 Download
sudo mount --bind /home/aa/下载 /home/aa/.local/share/waydroid/data/media/0/Download
```