---
title: program env
description: 
created_at: 2021-12-29T17:34:48Z
updated_at: 2025-09-03T17:34:48Z
tags: [dev]
---
## c\c++

## nodejs

## python

## ts

## java

## go

## rust

```bash
# install
sudo pacman -S rustup
```
- `rustup` 是 Rust 官方推荐的安装和管理 Rust 版本的工具。
- `rustc` 是 Rust 的编译器，用于将 Rust 代码编译为可执行文件。
- `cargo` 是 Rust 的包管理器和构建工具，用于管理项目依赖、编译代码和发布包。
- `rust-analyzer` 是一个用于 Rust 语言的智能代码分析工具，提供代码补全、错误检查等功能，常用于集成开发环境 (IDE) 中。可能需要 单独安装: `sudo pacman -S rust-analyzer`

## zig

## csharp
```bash
sudo pacman -S dotnet-sdk
# out:
extra/dotnet-runtime              9.0.8.sdk109-1   70.33 MiB  23.43 MiB
extra/dotnet-targeting-pack       9.0.8.sdk109-1   47.59 MiB   6.41 MiB
extra/netstandard-targeting-pack  9.0.8.sdk109-1   17.87 MiB   1.29 MiB
extra/dotnet-sdk                  9.0.8.sdk109-1  289.23 MiB  78.32 MiB

# uninstall
sudo pacman -Rns dotnet-sdk
```
### script
```bash
dotnet tool install -g dotnet-script
# set env
## bash
## fish
set -U fish_user_paths $fish_user_paths /home/aa/.dotnet/tools # ~/.config/fish/fish_variables
# uninstall, 需要先卸载 dotnet-script
dotnet tool uninstall -g dotnet-script
```