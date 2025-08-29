---
title: linux
description: 
created_at: 2022-03-07T19:15:38Z
updated_at: 2025-07-05T03:05:30Z
tags: [os]
---

## Classify


## installation

### Garuda Mokka (arch linux)
KDE

#### install after

##### network

###### 修改 WIFI 省电模式 (如果连接的是热点)

###### 配置国内镜像源（以清华源为例）

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

###### 使用 network proxy

```bash
# watt-toolkit 用于加速访问 GitHub
yay -S watt-toolkit-bin-gitee
# 用于 network proxy
yay -S clash-verge-rev-bin
```

##### system upgrade

```bash
sudo pacman -Syyu 
```

##### chinese
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
echo -e "--ozone-platform=wayland\n--enable-wayland-ime" > ~/.config/code-flags.conf
# 修改 fcitx 的 开启 默认键: Ctrl+space -> Shift
```

#### 自带 software

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

#### themes

##### grub

`/usr/share/grub/themes/`

##### sddm, 登录屏幕（Login Screen）

由登录管理器（如 SDDM、LightDM、GDM 等）负责，显示在你输入用户名和密码之前。主题文件通常在 `/usr/share/sddm/themes/` 目录下。

##### 欢迎屏幕(Splash/Loading Screen)
###### KDE Plasma
登录成功后，桌面环境（如 KDE Plasma）会显示一个加载动画或欢迎界面，直到桌面完全加载。
KDE 的欢迎屏幕叫“Splash Screen”，主题文件一般在：`/usr/share/plasma/look-and-feel/` 目录下。
#### 已知问题

- [ ] 了解 Panel colorizer 修改预设
- [ ] 登录屏幕 SDDM 的学习 
  - [ ] SDDM 发现 切换用户登录 界面: 的扩展屏显示有问题可能手动设置导致
- reboot 时的 FAILED

### Arch Linux

```bash
```

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

### kde

```
catppuccin: cat 主题 支持 kde, vscode ...
klassy: KDE Plasma 桌面的高度可定制的二进制窗口装饰、应用程序样式和全局主题插件
plasma-panel-colorizer: KDE Plasma 面板颜色化插件
kwin-effects-forceblur: Better Blur 是 Plasma 6 模糊效果的一个分支，具有附加功能和错误修复。
KDE-Rounded-Corners: 桌面特效来实现 窗口圆角
```
