---
title: Fish Shell
description: 一款友好的交互式 Shell，带有自动补全、语法高亮和基于 Web 的配置界面
lastUpdated: 2026-03-31T03:30:00Z
tags: [fish, shell, terminal, cli]
---

## 安装

```sh
# Arch Linux / Garuda
sudo pacman -S fish

# Ubuntu / Debian
sudo apt install fish

# macOS
brew install fish

# 或使用官网脚本
curl -L https://get.oh-my.fish | fish
```

## 设置为默认 Shell

```sh
# 查看当前 shell
echo $SHELL

# 查看已安装 shells
cat /etc/shells

# 切换到 fish
chsh -s /usr/bin/fish

# 或者直接运行
fish
```

## 基本特性

### 🎯 智能自动补全

Fish 会自动建议历史命令和文件路径，按 `→` 或 `Tab` 接受建议。

```sh
# 输入 git 后按 Tab，会显示所有 git 子命令
git <Tab>
# add  branch  checkout  clone  commit  push  pull ...

# 输入部分命令后显示灰色建议
git che<Tab>  # → git checkout
```

### 🎨 语法高亮

- ✅ 绿色 = 有效命令
- ❌ 红色 = 无效命令
- 🔗 蓝色 = 链接/路径
- 📁 下划线 = 目录

### 📜 历史搜索

```sh
# 输入部分命令后按 ↑，搜索历史
ssh <Up>  # 显示之前用过的 ssh 命令

# Ctrl+R 模糊搜索历史
```

## 配置

### 配置文件位置

```
~/.config/fish/
├── config.fish          # 主配置文件
├── fish_variables       # 变量存储
├── completions/         # 自定义补全
├── conf.d/              # 配置片段
└── functions/           # 自定义函数
```

### Web 配置界面

```sh
# 启动浏览器配置界面
fish_config
```

会打开浏览器，可以：
- 选择主题颜色
- 配置提示符
- 管理变量和函数
- 绑定快捷键

## 常用配置

### config.fish 示例

```fish
# ~/.config/fish/config.fish

# 环境变量
set -gx EDITOR nvim
set -gx VISUAL code

# PATH
fish_add_path ~/bin
fish_add_path ~/.local/bin

# 别名
alias g git
alias ll "ls -la"
alias .. "cd .."
alias ... "cd ../.."

# 启动问候语
function fish_greeting
    echo "🐟 欢迎使用 Fish Shell!"
    echo "当前时间: "(date "+%Y-%m-%d %H:%M")
end
```

### 函数示例

```fish
# ~/.config/fish/functions/mkcd.fish
function mkcd
    mkdir -p $argv[1]
    cd $argv[1]
end
```

使用：`mkcd new-project`

## 与 Bash 的区别

| 特性 | Bash | Fish |
|------|------|------|
| 赋值 | `VAR=value` | `set VAR value` |
| 导出 | `export VAR=value` | `set -x VAR value` |
| 数组 | `${array[@]}` | `$array` |
| 命令替换 | `$(cmd)` 或 `` `cmd` `` | `(cmd)` |
| 条件 | `[ $a -eq $b ]` | `test $a -eq $b` |
| 字符串包含 | `[[ $s == *pattern* ]]` | `string match -q "*pattern*" $s` |

## 常用命令

```fish
# 设置变量
set myvar "hello"

# 全局环境变量
set -gx MY_VAR "value"

# 追加到 PATH
fish_add_path /new/path

# 数组操作
set mylist a b c
echo $mylist[1]    # a
echo $mylist[-1]   # c (最后一个)

# 字符串操作
set str "hello world"
string length $str      # 11
string sub -l 5 $str    # hello
string split " " $str   # hello world (数组)

# 条件判断
if test -f file.txt
    echo "文件存在"
else if test -d dir
    echo "目录存在"
else
    echo "都不存在"
end

# 循环
for file in *.txt
    echo $file
end

# 函数
function hello
    echo "Hello, $argv[1]!"
end
hello "Fish"  # Hello, Fish!
```

## 插件管理器

### Fisher（推荐）

```fish
# 安装 Fisher
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher

# 安装插件
fisher install jorgebucaran/nvm.fish      # Node 版本管理
fisher install patrickf1/fzf.fish         # fzf 集成
fisher install jethrokuan/z               # z 目录跳转
```

### Oh My Fish

```fish
# 安装
curl -L https://get.oh-my.fish | fish

# 主题
omf install bobthefish
git clone https://github.com/oh-my-fish/theme-bobthefish
omf theme bobthefish
```

## 提示符主题

```fish
# 安装 Starship（跨 Shell 提示符）
curl -sS https://starship.rs/install.sh | sh

# 添加到 config.fish
echo 'starship init fish | source' >> ~/.config/fish/config.fish
```

## 常见问题

### Fish 不兼容 POSIX 脚本？

Fish 是交互式 Shell，不是 POSIX shell。如果需要运行 POSIX 脚本：

```fish
# 方法 1: 显式使用 bash
bash script.sh

# 方法 2: shebang
#!/bin/bash
# 在脚本第一行指定解释器
```

### 禁用欢迎语

```fish
# 在 config.fish 中
set fish_greeting
```

## 参考

- [Fish 官网](https://fishshell.com/)
- [Fish 文档](https://fishshell.com/docs/current/)
- [Awesome Fish](https://github.com/jorgebucaran/awesome-fish)
