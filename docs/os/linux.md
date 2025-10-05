---
title: linux
description: 
created_at: 2022-03-07T19:15:38Z
updated_at: 2025-07-05T03:05:30Z
tags: [os]
---
https://distrowatch.com/

DistroWatch 是 Linux 发行版信息的主要网站，提供发行版介绍、新闻和统计数据。
## Classify

systemd: Ubuntu、Debian、Fedora、Arch、Manjaro...

NixOS：就不太一样，因为 NixOS 配置不是手工改文件，而是 declarative（声明式配置）

## releases

#### arch linux

##### Garuda (arch)

###### Garuda Mokka (arch + kde)
```
 ／|、
(˙、．7
 |、～ヽ
 じしf_,)ノ
```
##### EndeavourOS

##### Manjaro

##### CachyOS (arch + kde)

一个基于 Arch Linux 的高性能发行版，专注于提供优化的用户体验和现代化的桌面环境。

**主要特点**
- **高性能优化**: 使用自定义的 Linux 内核 (linux-cachyos)，包含多项性能补丁和优化
- **现代化桌面**: 默认使用 KDE Plasma 桌面环境，提供美观且功能丰富的界面
- **易用性**: 提供图形化安装程序和系统管理工具，降低 Arch Linux 的入门门槛
- **滚动更新**: 继承 Arch Linux 的滚动更新机制，确保软件始终保持最新
- **软件仓库**: 除了 Arch 官方仓库，还提供自己的 CachyOS 仓库，包含优化过的软件包

**核心组件**
- **内核**: linux-cachyos (基于 linux-zen，包含 BORE 调度器、FUTEX2 等优化)
- **桌面环境**: KDE Plasma (默认)，可选 GNOME
- **包管理器**: pacman (与 Arch Linux 兼容)
- **初始化系统**: systemd
- **文件系统**: Btrfs (支持快照和压缩)

**性能优化**
- **BORE 调度器**: 改进的多队列调度算法，提供更好的响应性和吞吐量
- **FUTEX2**: 更高效的 futex 实现，减少锁竞争
- **LRU 优化**: 改进的页面回收算法
- **网络优化**: 包含最新的网络协议栈优化

**适用场景**
- **游戏玩家**: 优化的内核和调度器提供更好的游戏性能
- **开发者**: 现代化的开发环境和工具链
- **日常使用**: 美观的桌面环境和易用的系统管理
- **性能爱好者**: 追求系统性能极限的用户

**注意事项**
- **硬件兼容性**: 虽然优化良好，但某些硬件可能需要额外配置
- **学习曲线**: 虽然比原生 Arch 易用，但仍需要一定的 Linux 基础
- **社区支持**: 社区相对较小，但非常活跃和友好

##### arch 发行版的比较

| 特性 | CachyOS | Garuda Linux | Manjaro | Arch Linux |
|------|---------|-------------|---------|-----------|
| 性能优化 | 🥇 高度优化 | 🥈 良好优化 | 🥈 良好优化 | 🥉 基础优化 |
| 易用性 | 🥇 图形化安装 | 🥇 图形化安装 | 🥇 图形化安装 | 🥉 手动安装 |
| 稳定性 | 🥈 稳定 | 🥇 非常稳定 | 🥇 非常稳定 | 🥉 需要经验 |
| 更新频率 | 🥇 滚动更新 | 🥇 滚动更新 | 🥇 滚动更新 | 🥇 滚动更新 |
| 软件仓库 | 🥇 丰富 | 🥇 丰富 | 🥇 丰富 | 🥇 丰富 |

#### Debian

##### Mint

## installation
- https://wiki.archlinuxcn.org/wiki/安装指南

### base


#### 分区
##### EFI 分区
- 功能：存放 EFI 引导文件（Windows、Linux GRUB、systemd-boot 等）
- 必须是 FAT32，这是 UEFI 标准要求。不能改成 btrfs，否则电脑无法通过 UEFI 启动。

### 准备

#### 备份重要数据

#### 检查分区和磁盘布局
```sh
lsblk
# or 
sudo fdisk -l
```
##### 分区工具选择

**命令行工具：**
- `fdisk` - 传统分区工具
- `parted` - 支持 GPT，功能强大
- `gdisk` - 专门用于 GPT 分区

**图形化工具：**
- `gparted` - 图形界面，直观易用
- `cfdisk` - 文本界面，相对友好
##### 对于多系统

```sh
sudo parted /dev/nvme0n1
```
#### 制作OS启动盘
- Ventoy：方便、多 ISO、多系统测试，适合玩多系统 live，或者临时做测试。
- Rufus / dd：稳定、官方支持、安装类 ISO 完全兼容，特别是 NixOS + btrfs + EFI 这种复杂安装环境。

```sh
lsblk
```
找到你的 USB 设备名，例如 /dev/sda

假设你的 NixOS ISO 文件路径为：
```sh
/home/aa/下载/latest-nixos-graphical-x86_64-linux.iso
```
执行:
```sh
# if= input file; of= output file (设备); bs= block size (每次写入4MB); status=progress 显示进度; oflag=sync 确保写入完成
sudo dd if=/home/aa/下载/latest-nixos-graphical-x86_64-linux.iso of=/dev/sda bs=4M status=progress oflag=sync
sudo dd if=/home/aa/下载/debian-live-13.1.0-amd64-kde.iso of=/dev/sda bs=4M status=progress oflag=sync
sudo dd if=/home/aa/下载/garuda-mokka-linux-zen-250916.iso of=/dev/sda bs=4M status=progress oflag=sync
```
写入完成后不要拔 USB，先执行 (也可以在gui手动弹出)：
```sh
sudo sync
sudo eject /dev/sda
```

### 安装时的分区步骤

对于多系统只能选择手动分区, 否则可能会:
- 覆盖整个磁盘，把 其他系统 也删掉
- 错误格式化 EFI 分区或其他分区

### NixOS
https://mirrors.tuna.tsinghua.edu.cn/
### Garuda Mokka (arch linux)

### Arch Linux

- https://wiki.archlinuxcn.org/wiki/安装指南

```bash
```

## install after
https://wiki.archlinux.org/title/General_recommendations

### network

#### 针对 Realtek 芯片 (小螃蟹网卡)
一旦开启 power save，驱动 bug + USB 供电机制导致直接“卡死”, 建议关掉 wifi.powersave
> 小螃蟹网卡必须关掉 power save，不然一定会抽风。


##### 查看当前 WiFi 电源管理状态
```bash
# 首先获取 WiFi 网卡名称
# 方法1: 使用 ip 命令查看所有网络接口
ip link show

# 方法2: 专门查看无线网卡
iw dev

# 方法3: 获取第一个无线网卡名称 (自动化脚本用)
WIFI_INTERFACE=$(iw dev | awk '$1=="Interface"{print $2}' | head -1)
echo "WiFi 网卡名称: $WIFI_INTERFACE"

# 方法4: 使用 nmcli 查看网卡状态
nmcli device status

# 查看 WiFi 电源管理状态 (使用实际网卡名称)
iwconfig $WIFI_INTERFACE | grep "Power Management"
# 或者使用 iw 命令
sudo iw dev $WIFI_INTERFACE get power_save
sudo iw dev wlp12s0 get power_save
```
##### 临时关闭 WiFi 电源管理
```bash
# 首先获取 WiFi 网卡名称
WIFI_INTERFACE=$(iw dev | awk '$1=="Interface"{print $2}' | head -1)

# 临时关闭 (重启后失效)
sudo iwconfig $WIFI_INTERFACE power off

# 或者使用 iw 命令
sudo iw dev $WIFI_INTERFACE set power_save off

# 验证是否关闭成功
iwconfig $WIFI_INTERFACE | grep "Power Management"
# 应该显示 "Power Management:off"

# 如果你确定网卡名称，也可以直接使用，例如:
# sudo iwconfig wlan0 power off
# sudo iwconfig wlp12s0 power off
```
##### 永久关闭 WiFi 电源管理
```bash
# 使用 NetworkManager 配置 (适用于所有无线连接)
sudo nano /etc/NetworkManager/conf.d/wifi-powersave.conf
```
添加以下内容：
```sh
[connection]
wifi.powersave = 2
```
重启 NetworkManager
```bash
sudo systemctl restart NetworkManager
```
`wifi.powersave` 的设置值与含义如下，这与官方定义和普遍实践一致：

| 值 | 正确的常量名 (来自源码/文档) | 正确的含义 |
| :-- | :--- | :--- |
| **`0`** | `NM_SETTING_WIRELESS_POWERSAVE_DEFAULT` | **默认**：由系统和网卡驱动自动决定策略。 |
| **`1`** | `NM_SETTING_WIRELESS_POWERSAVE_IGNORE` | **忽略**：不通过NetworkManager更改任何电源设置。 |
| **`2`** | `NM_SETTING_WIRELESS_POWERSAVE_DISABLE` | **禁用**：**关闭**省电模式。**（这是追求网络性能时的推荐设置）** |
| **`3`** | `NM_SETTING_WIRELESS_POWERSAVE_ENABLE` | **启用**：**开启**省电模式。**（这是常见的默认值）** |

检查 NetworkManager 的实际设置
```sh
nmcli connection show | grep wifi.powersave
```
如果输出 wifi.powersave: 2，说明 NetworkManager 配置生效。
> [!note]
> 但是！有可能还是被 cfg80211 默认开启 \
> Linux 内核的 Wi-Fi 驱动（cfg80211/mac80211）在接口创建时，默认会把 power save 打开。 \
> 所以 NetworkManager 配置不一定能覆盖。

Realtek RTL8852BE
###### 兜底方案（可选）
防止 NetworkManager 或其他因素在接口 up 后重新开启省电：

创建 systemd service：
```sh
sudo nano /etc/systemd/system/wifi-powersave-off.service
```
```ini
[Unit]
Description=Disable WiFi power saving
After=NetworkManager.service
Requires=NetworkManager.service

[Service]
Type=oneshot
ExecStart=/usr/bin/iw dev wlp12s0 set power_save off
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```
启用:
```sh
sudo systemctl daemon-reload
sudo systemctl enable --now wifi-powersave-off.service
```
验证:
```sh
iw dev wlp12s0 get power_save
```
##### 智能电源管理方案 (使用 NetworkManager 钩子)

这是一个更智能的方案，通过 NetworkManager 的钩子机制，根据用户自定义的热点列表自动调整 WiFi 电源管理设置。

```bash
# 查看 NetworkManager 钩子目录结构
ls -al /etc/NetworkManager/dispatcher.d/
ls -al /etc/NetworkManager/dispatcher.d/pre-up.d/     # 连接前执行
ls -al /etc/NetworkManager/dispatcher.d/pre-down.d/  # 断开前执行  
ls -al /etc/NetworkManager/dispatcher.d/no-wait.d/   # 非阻塞执行
```

###### 创建简单的热点检测脚本
```bash
# 创建热点电源管理脚本
sudo nano /etc/NetworkManager/dispatcher.d/pre-up.d/99-hotspot-powersave
# 删除文件
sudo rm /etc/NetworkManager/dispatcher.d/pre-up.d/99-hotspot-powersave
```

```bash
#!/bin/bash

interface=$1
action=$2

# Only act on WiFi interfaces
if [[ "$interface" = wl* ]]; then
    # Get the connection UUID
    conn_uuid=$(nmcli -t -m tabular -f device,uuid connection show --active | grep "$interface" | cut -d':' -f2)

    if [ -n "$conn_uuid" ]; then
        # Get the SSID of this connection
        current_ssid=$(nmcli -t -f 802-11-wireless.ssid connection show "$conn_uuid" | cut -d':' -f2)

        # 特定热点名称
        HOTSPOT_SSID="e1"

        # 检查是否连接到特定热点
        if [[ "$current_ssid" == "$HOTSPOT_SSID" ]]; then
            # logger "连接到热点 '$HOTSPOT_SSID'，禁用 Wi-Fi 电源管理"
            iw dev "$interface" set power_save off
        else
            # 对于其他网络，启用电源管理（默认行为）
            # logger "连接到常规网络 '$current_ssid'，启用 Wi-Fi 电源管理"
            iw dev "$interface" set power_save on
        fi
    fi
fi
```

###### 设置脚本权限并测试
```bash
# 设置脚本为可执行
sudo chmod +x /etc/NetworkManager/dispatcher.d/pre-up.d/99-hotspot-powersave
# 重启 NetworkManager 使配置生效 (貌似不需要)
sudo systemctl restart NetworkManager
# 检查当前电源管理状态
iw dev | awk '$1=="Interface"{print $2}' | xargs -I {} iw dev {} get power_save
# or 你知道 是 哪个接口, 例如 wlp12s0
iw dev wlp12s0 get power_save
```

###### 可选：添加断开时的处理
```bash
# 创建 pre-down.d 脚本（可选）
sudo nano /etc/NetworkManager/dispatcher.d/pre-down.d/99-hotspot-powersave

# 添加以下内容：
#!/bin/bash
INTERFACE="$1"
ACTION="$2"

[[ "$INTERFACE" =~ ^wl ]] || exit 0

if [[ "$ACTION" == "down" ]]; then
    # 断开连接时恢复电源管理
    if command -v iw >/dev/null 2>&1; then
        iw dev "$INTERFACE" set power_save on 2>/dev/null
        logger -t "hotspot-powersave" "网络断开，已恢复 $INTERFACE 电源管理"
    fi
fi

exit 0

# 设置权限
sudo chmod +x /etc/NetworkManager/dispatcher.d/pre-down.d/99-hotspot-powersave
```

###### 钩子方案的优势

1. **自动化**: 无需手动干预，系统自动检测和调整
2. **智能化**: 根据网络特征判断是否为手机热点
3. **可定制**: 可以添加自定义规则和网络列表
4. **日志记录**: 详细的日志帮助诊断问题
5. **灵活性**: 可以根据需要调整检测规则
6. **节能**: 在普通网络下保持电源管理，延长电池续航

###### 注意事项

- 手机热点检测可能不是 100% 准确，需要根据实际情况调整规则
- 某些企业网络可能被误判为手机热点
- 建议定期检查日志，优化检测规则
- 可以结合用户手动配置来提高准确性
##### 连接手机热点的最佳实践
```bash
# 1. 获取 WiFi 网卡名称
WIFI_INTERFACE=$(iw dev | awk '$1=="Interface"{print $2}' | head -1)
echo "使用网卡: $WIFI_INTERFACE"

# 2. 关闭 WiFi 电源管理
sudo iwconfig $WIFI_INTERFACE power off

# 3. 扫描可用的热点
sudo iw dev $WIFI_INTERFACE scan | grep -E "SSID|signal"

# 4. 连接热点 (使用 NetworkManager)
nmcli device wifi connect "热点名称" password "密码"

# 5. 验证连接状态
nmcli device status
ip addr show $WIFI_INTERFACE

# 6. 测试网络连接
ping -c 4 8.8.8.8
```

##### 热点连接故障排除
```bash
# 查看连接日志
journalctl -u NetworkManager -f

# 重启网络服务
sudo systemctl restart NetworkManager

# 删除已保存的连接配置并重新连接
nmcli connection delete "热点名称"
nmcli device wifi connect "热点名称" password "密码"

# 检查 DNS 配置
cat /etc/resolv.conf

# 手动设置 DNS (如果需要)
sudo nmcli connection modify "热点名称" ipv4.dns "8.8.8.8,8.8.4.4"
sudo nmcli connection up "热点名称"
```

##### 特殊情况处理

**5GHz vs 2.4GHz 频段选择:**
```bash
# 优先连接 2.4GHz (更稳定，但速度较慢)
# 手机热点设置中选择 2.4GHz 频段

# 如果必须使用 5GHz，可能需要调整监管域
sudo iw reg set CN  # 设置为中国监管域
```

**处理频繁断线:**
```bash
# 增加 WiFi 扫描间隔
sudo nano /etc/NetworkManager/NetworkManager.conf
# 在 [device] 部分添加：
[device]
wifi.scan-rand-mac-address=no
wifi.background-scan=false

# 重启 NetworkManager
sudo systemctl restart NetworkManager
```


```bash
ls -al /etc/NetworkManager/conf.d/
```

#### 配置国内镜像源（以清华源为例）

```bash
# 配置 配置清华源(本系统默认配置好了其他CN源, 可跳过)：
kate /etc/pacman.d/mirrorlist
## 在文件顶部添加以下内容
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
# 添加 Arch Linux CN 仓库国内源 (可选, 推荐)
## Arch Linux CN 仓库包含许多额外的软件包。要使用它的清华镜像，你需要编辑 /etc/pacman.conf
kate /etc/pacman.conf
## 在文件末尾添加以下内容
[archlinuxcn]
SigLevel = Optional TrustAll
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

#### 使用 network proxy

```bash
# watt-toolkit 用于加速访问 GitHub
yay -S watt-toolkit-bin-gitee
# 用于 network proxy
yay -S clash-verge-rev-bin
```

### system upgrade

```bash
sudo pacman -Syyu 
```

### GUI

#### Display server
Xorg 是 X 窗口系统（通常称为 X11 或 X）的公开开源实现。运行具有图形用户界面（GUI）的应用程序需要使用它。

Wayland 是一种较新的替代显示服务器协议，有多个混成器可供选择。与 Xorg 相比，它的优势在于增强了安全功能，能更有效地处理现代图形任务，通过 Xwayland 保持与 Xorg 的兼容性。它目前正在积极进行开发。 
#### Display drivers
#### Desktop environments (DE)
显示服务器只提供图形环境的基本框架，完整的用户体验还需要其他组件。

KDE、GNOME、Xfce、Cinnamon、LXDE、LXQt 等桌面环境捆绑了大量集成良好的应用程序，如窗口管理器或混成器、面板/任务栏、文件管理器、终端模拟器、文本编辑器、图标和其他实用程序。经验不足的用户可能希望安装一个桌面环境，以获得更熟悉的环境。更多资源请参见 分类:桌面环境。 
```bash
echo $XDG_CURRENT_DESKTOP
```
##### KDE

###### Dolphin 文件管理器 (kde 桌面自带)
默认情况下，KDE Dolphin 文件管理器可能设置为单击打开文件，如果您习惯 Windows 的单击选中行为，可以通过以下方式修改：

**工作区行为** → **常规行为** → **点击行为**

###### VS Code 在 KDE vs GNOME 的使用体验对比

VS Code (基于 Electron) 在不同桌面环境中的表现有细微差异，以下是详细对比：

#### 🎨 **视觉集成度**

| 方面 | KDE Plasma | GNOME |
|------|------------|-------|
| **主题适配** | ⭐⭐⭐⭐⭐ (KDE 主题自动应用) | ⭐⭐⭐⭐ (需手动配置) |
| **窗口装饰** | ⭐⭐⭐⭐⭐ (原生 KDE 装饰) | ⭐⭐⭐⭐⭐ (GNOME 装饰) |
| **系统托盘** | ⭐⭐⭐⭐⭐ (完美集成) | ⭐⭐⭐⭐ (基本支持) |
| **通知集成** | ⭐⭐⭐⭐⭐ (深度集成) | ⭐⭐⭐⭐ (标准集成) |

#### ⚡ **性能表现**

| 方面 | KDE Plasma | GNOME |
|------|------------|-------|
| **启动速度** | ⭐⭐⭐⭐⭐ (KDE 优化) | ⭐⭐⭐⭐⭐ (标准) |
| **内存占用** | ⭐⭐⭐⭐⭐ (相似) | ⭐⭐⭐⭐⭐ (相似) |
| **响应速度** | ⭐⭐⭐⭐⭐ (流畅) | ⭐⭐⭐⭐⭐ (流畅) |
| **Wayland 支持** | ⭐⭐⭐⭐⭐ (优秀) | ⭐⭐⭐⭐⭐ (优秀) |

#### 🛠️ **功能集成**

| 方面 | KDE Plasma | GNOME |
|------|------------|-------|
| **文件管理器集成** | ⭐⭐⭐⭐⭐ (Dolphin 深度集成) | ⭐⭐⭐⭐ (Nautilus 基本集成) |
| **系统设置访问** | ⭐⭐⭐⭐⭐ (便捷) | ⭐⭐⭐⭐ (需要额外配置) |
| **快捷键冲突** | ⭐⭐⭐⭐ (可能有少量冲突) | ⭐⭐⭐⭐⭐ (很少冲突) |
| **扩展生态** | ⭐⭐⭐⭐⭐ (相同) | ⭐⭐⭐⭐⭐ (相同) |

#### ⌨️ **输入法支持**

| 方面 | KDE Plasma | GNOME |
|------|------------|-------|
| **Fcitx5 支持** | ⭐⭐⭐⭐⭐ (原生优秀) | ⭐⭐⭐⭐ (需要配置) |
| **IBus 支持** | ⭐⭐⭐⭐ (良好) | ⭐⭐⭐⭐⭐ (优秀) |
| **Wayland 输入** | ⭐⭐⭐⭐⭐ (稳定) | ⭐⭐⭐⭐⭐ (稳定) |

#### 🎯 **推荐使用场景**

**选择 KDE Plasma 的情况：**
- ✅ 喜欢高度可定制的桌面环境
- ✅ 需要与 KDE 应用深度集成
- ✅ 偏好现代化的视觉效果
- ✅ 使用 Dolphin 文件管理器

**选择 GNOME 的情况：**
- ✅ 喜欢简洁干净的界面
- ✅ 重视系统稳定性
- ✅ 偏好默认的 GNOME 应用生态
- ✅ 对系统资源使用更敏感

#### 🔧 **优化建议**

**KDE Plasma 环境：**
```bash
# VS Code 主题同步
# KDE 主题会自动应用到 VS Code

# 窗口规则优化 (在 KDE 系统设置中)
# 系统设置 → 窗口管理 → 窗口规则
# 为 VS Code 添加特殊规则
```

**GNOME 环境：**
```bash
# 安装 GNOME 集成扩展
sudo pacman -S gnome-browser-connector

# VS Code GNOME 扩展
# 在 VS Code 中安装 "GNOME Extension Manager" 扩展
```

#### 📊 **用户体验评分 (满分 5 星)**

| 类别 | KDE Plasma | GNOME | 说明 |
|------|------------|-------|------|
| **视觉一致性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | KDE 主题自动应用，GNOME 原生支持 VS Code |
| **功能集成度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | KDE 与系统深度集成，GNOME 简洁高效 |
| **性能表现** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 两个环境性能相近 |
| **易用性** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | GNOME 更简洁，KDE 更灵活 |
| **VS Code 兼容性** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | VS Code 主要面向 GNOME 环境优化 |
| **总体评分** | **⭐⭐⭐⭐⭐** | **⭐⭐⭐⭐⭐** | **各有优势，取决于个人偏好** |

#### 💡 **最终建议**

- **如果使用 KDE**: VS Code 体验会更佳，视觉和功能集成度更高
- **如果使用 GNOME**: VS Code 仍然表现优秀，只是集成度稍逊
- **核心功能**: 两个环境下的 VS Code 核心编辑功能完全相同
- **个人偏好**: 最终选择取决于您对桌面环境的喜好

**总结**: KDE Plasma 环境下 VS Code 有略微更好的用户体验，但差异不大，两个环境都可以很好地使用 VS Code。

#### Window managers or compositors
完整的桌面环境提供了完整的用户界面，但是通常会占用不少系统资源。希望系统性能最大化的用户可以只安装窗口管理器或混成器，然后加入需要的其他软件。大部分使用 Xorg 的桌面环境也可以换用其它的窗口管理器。动态式、堆叠式和平铺式窗口管理器处理窗口的方式各不相同。

### Power management (电源管理)

### chinese
https://wiki.archlinuxcn.org/wiki/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%E6%9C%AC%E5%9C%B0%E5%8C%96

###### input method
https://wiki.archlinuxcn.org/wiki/Fcitx5

```sh
# 1. 安装 Fcitx5 及其中文组件
sudo pacman -S fcitx5-im fcitx5-chinese-addons   
# fcitx5 fcitx5-configtool
# fcitx5-qt fcitx5-gtk

# 2. KDE Wayland
## 要使用 Wayland 输入法协议，首先退出正在运行的 Fcitx 5 进程，前往系统设置 > 输入设备 > 虚拟键盘，选择 Fcitx 5
reboot

# 3. Chromium 和基于 Chromium / Electron 的软件: VS Code、QQ、Discord、Element 等
## https://wiki.archlinuxcn.org/wiki/Chromium#%E5%8E%9F%E7%94%9F_Wayland_%E4%B8%8A%E8%BF%90%E8%A1%8C
## 3.1 检查 在 chrome://version/ 中的 "command line" 部分，确保包含 --ozone-platform-hint=auto --ozone-platform=wayland --enable-wayland-ime --wayland-text-input-version=3
## 3.2 如果没有则添加启动参数
echo -e '--ozone-platform-hint=auto\n--ozone-platform=wayland\n--enable-wayland-ime\n--wayland-text-input-version=3' | sudo tee -a ~/.config/chromium-flags.conf
### or 在 文件 ～/.config/chromium-flags.conf 中添加
--ozone-platform-hint=auto
--ozone-platform=wayland
--enable-wayland-ime
--wayland-text-input-version=3

# 4. Xwayland
## 编辑环境变量
echo -e "XMODIFIERS=@im=fcitx\nSDL_IM_MODULE=fcitx\nGLFW_IM_MODULE=ibus" | sudo tee -a ~/.config/environment.d/env.conf
### or 在 文件 ～/.config/environment.d/env.conf 中添加
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
GLFW_IM_MODULE=ibus
## 对于运行于 Xwayland GTK 程序，你可以单独为软件设置环境变量GTK_IM_MODULE=fcitx，or
echo -e "[Settings]\ngtk-im-module=fcitx" | sudo tee -a ~/.config/gtk-3.0/settings.ini
### or 在 文件 ～/.config/gtk-3.0/settings.ini 中添加
[Settings]
gtk-im-module=fcitx
```

```bash
# vscode
echo -e "--ozone-platform=wayland" > ~/.config/code-flags.conf
# Warning: '--enable-wayland-ime' is not in the list of known options, but still passed to Electron/Chromium.
# or 在 文件 ～/.config/code-flags.conf 中添加
--ozone-platform=wayland
# 修改 fcitx 的 开启 默认键: Ctrl+space -> Shift
```
virtual

### themes
```ts
`
⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷
⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇
⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⣸⢐⢕⢽
⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕
⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕
⡝⡵⠟⠈⠀⠀⠀⠀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⢀⢕
⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄
⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕
⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿
⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟
⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠
⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙
⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣
`
```
#### grub

`/usr/share/grub/themes/`

##### sddm, 登录屏幕（Login Screen）

`/etc/sddm.conf` 


由登录管理器（如 SDDM、LightDM、GDM 等）负责，显示在你输入用户名和密码之前。主题文件通常在 `/usr/share/sddm/themes/` 目录下。

##### 欢迎屏幕(Splash/Loading Screen)
登录成功后，桌面环境（如 KDE Plasma）会显示一个加载动画或欢迎界面，直到桌面完全加载。

###### KDE Plasma

KDE 的欢迎屏幕叫“Splash Screen”，主题文件一般在：`/usr/share/plasma/look-and-feel/` 目录下。

### enhance experience software

#### kde

```
catppuccin: cat 主题 支持 kde, vscode ...
klassy: KDE Plasma 桌面的高度可定制的二进制窗口装饰、应用程序样式和全局主题插件
plasma-panel-colorizer: KDE Plasma 面板颜色化插件
kwin-effects-forceblur: Better Blur 是 Plasma 6 模糊效果的一个分支，具有附加功能和错误修复。
KDE-Rounded-Corners: 桌面特效来实现 窗口圆角
```
 Energy Saving
##### fish

- starship `code ~/.config/starship.toml`
- fastfetch (类似 neofetch)

```bash
fastfetch --config mokka.jsonc

# 查找系统级的 fastfetch 配置目录
find /usr -name "*fastfetch*" -type d 2>/dev/null

# 查找具体的 mokka.jsonc 文件
find /usr -name "mokka.jsonc" 2>/dev/null 
# /usr/share/fastfetch/presets/mokka.jsonc
```

### common software

#### vscode
建议安装 aur repo 的版本


```bash filename='~/.config/code-flags.conf'
--ozone-platform=wayland
```

To help diagnose the problem, you can restart VS Code with the following flags to generate a verbose log:

```bash
code --verbose --vmodule="*/components/os_crypt/*=1"
```

### 已知问题

- [ ] 了解 Panel colorizer 修改预设
- reboot 时的 FAILED

## use

### common commands

```bash
# update system
sudo pacman -Syu
# install package
sudo pacman -S <package_name>
# uninstall package
sudo pacman -R <package_name>
# search package
pacman -Ss <package_name>

# AUR, Arch User Repository
# install yay
sudo pacman -S yay
# install package from AUR
yay -S <package_name>
# uninstall package from AUR
yay -R <package_name>
# search package in AUR
yay -Ss <package_name>
# update all packages from AUR
yay -Syu
# clean up unused packages
yay -Rns $(pacman -Qdtq)
# clean up cache
yay -Sc
# clean up all cache
yay -Scc
```

## General_recommendations
- https://wiki.archlinuxcn.org/wiki/建议阅读
- https://wiki.archlinux.org/title/General_recommendations
### Package management
```
/etc/pacman.conf 
```
#### Repositories
#### Mirrors (镜像,软件仓库镜像)
- https://wiki.archlinuxcn.org/wiki/镜像源
```
/etc/pacman.d/mirrorlist
```
### Graphical user interface
### Networking
- https://wiki.archlinuxcn.org/wiki/网络配置
- https://wiki.archlinux.org/title/Network_configuration

