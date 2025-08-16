---
title: linux
description: 
created_at: 2025-07-05T03:05:30Z
updated_at: 2025-07-05T03:05:30Z
tags: [linux]
---

## Classify

## Arch Linux

### installation

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
