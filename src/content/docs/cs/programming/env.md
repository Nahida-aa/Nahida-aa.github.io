---
title: "环境配置"
description: "环境配置相关教程"
tags: ["编程", "环境配置", "tutorial"]
lastUpdated: 2025-04-04
---

## 环境变量

### Windows

使用 `set` 命令设置环境变量, 只对当前终端有效:

```cmd
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%
```

使用 `setx` 命令设置永久环境变量:

```cmd
# 设置用户变量
setx JAVA_HOME "C:\Program Files\Java\jdk-17"

# 设置系统变量 (需要管理员权限)
setx /M JAVA_HOME "C:\Program Files\Java\jdk-17"
```

### Linux / macOS

临时设置 (只对当前终端有效):

```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

永久设置:

根据使用的 Shell 配置文件:

- **Bash**: `~/.bashrc`
- **Zsh**: `~/.zshrc`
- **Fish**: `~/.config/fish/config.fish`

```bash
# 将环境变量写入配置文件
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc

# 重新加载配置
source ~/.bashrc
```

### 常用环境变量

| 变量名 | 描述 |
|--------|------|
| `PATH` | 可执行文件搜索路径 |
| `JAVA_HOME` | Java 安装路径 |
| `M2_HOME` | Maven 安装路径 |
| `GRADLE_HOME` | Gradle 安装路径 |
| `ANDROID_HOME` | Android SDK 路径 |
| `GOPATH` | Go 工作区路径 |
| `GOROOT` | Go 安装路径 |
| `PYTHONPATH` | Python 模块搜索路径 |
| `NODE_PATH` | Node.js 模块搜索路径 |
| `http_proxy` | HTTP 代理 |
| `https_proxy` | HTTPS 代理 |
| `no_proxy` | 不使用代理的域名 |

### 查看环境变量

```cmd
# Windows
set          # 查看所有环境变量
set JAVA_HOME  # 查看特定变量

# Linux / macOS
env          # 查看所有环境变量
echo $JAVA_HOME  # 查看特定变量
```

## 终端配置

### 代理配置

```bash
# 临时设置
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7890

# 不使用代理的域名
export no_proxy="localhost,127.0.0.1,.local,.internal"
```

常用代理软件端口:

| 软件 | HTTP 代理 | Socks5 代理 |
|------|-----------|-------------|
| Clash | 7890 | 7890 |
| V2RayN | 10809 | 10808 |
| Shadowsocks | 1080 | 1080 |

### Windows Terminal

配置 Git Bash 为默认终端:

1. 打开 Windows Terminal 设置
2. 点击 "添加新配置文件"
3. 填写以下信息:
   - 名称: `Git Bash`
   - 命令行: `C:\Program Files\Git\bin\bash.exe --login -i`
   - 起始目录: `%USERPROFILE%`
   - 图标: `C:\Program Files\Git\mingw64\share\git\git-for-windows.ico`
4. 将 Git Bash 设置为默认配置文件

> 注意: 使用 `--login` 参数以确保 `.bash_profile` 被正确加载

### PowerShell 配置

PowerShell 配置文件位置:

| 配置类型 | 路径 |
|---------|------|
| 当前用户, 当前主机 | `$HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1` |
| 当前用户, 所有主机 | `$HOME\Documents\PowerShell\profile.ps1` |
| 所有用户, 当前主机 | `$PSHOME\Microsoft.PowerShell_profile.ps1` |
| 所有用户, 所有主机 | `$PSHOME\profile.ps1` |

常用配置:

```powershell
# 查看配置文件路径
$profile

# 编辑配置文件
notepad $profile
```

### Zsh 配置

Zsh 配置文件加载顺序:

1. `.zshenv` - 总是读取
2. `.zprofile` - 登录 shell 读取
3. `.zshrc` - 交互式 shell 读取
4. `.zlogin` - 登录 shell 读取

常用配置:

```bash
# 别名配置
alias ll='ls -alh'
alias gs='git status'
alias gc='git commit'
alias gp='git push'

# 路径配置
export PATH="$HOME/.local/bin:$PATH"

# 代理配置
proxy() {
    export http_proxy=http://127.0.0.1:7890
    export https_proxy=http://127.0.0.1:7890
    export all_proxy=socks5://127.0.0.1:7890
    echo "Proxy enabled"
}

noproxy() {
    unset http_proxy
    unset https_proxy
    unset all_proxy
    echo "Proxy disabled"
}
```

## 版本管理工具

推荐使用版本管理工具来管理多版本的开发环境:

| 语言/工具 | 版本管理工具 |
|-----------|-------------|
| Java | [SDKMAN!](./sdkman.md) |
| Node.js | [nvm-windows](./nvm_windows.md), [fnm](./fnm.md) |
| Python | [pyenv](./pyenv.md), [conda](./conda.md) |
| Go | [goenv](https://github.com/syndbg/goenv) |
| Rust | [rustup](./rustup.md) |
| Ruby | [rbenv](https://github.com/rbenv/rbenv) |
| PHP | [phpenv](https://github.com/phpenv/phpenv) |

## 常用开发环境配置

### Java 环境

```bash
# 使用 SDKMAN! 安装
sdk install java 17.0.9-tem

# 环境变量 (手动安装时)
export JAVA_HOME=/path/to/jdk
export PATH=$JAVA_HOME/bin:$PATH
```

### Maven 环境

```bash
# 使用 SDKMAN! 安装
sdk install maven

# 环境变量 (手动安装时)
export M2_HOME=/path/to/maven
export PATH=$M2_HOME/bin:$PATH

# 配置阿里云镜像 (settings.xml)
# <mirror>
#   <id>aliyun</id>
#   <mirrorOf>central</mirrorOf>
#   <name>Aliyun Maven</name>
#   <url>https://maven.aliyun.com/repository/public</url>
# </mirror>
```

### Node.js 环境

```bash
# 使用 fnm 安装
fnm install 20
fnm use 20

# npm 镜像配置
npm config set registry https://registry.npmmirror.com

# pnpm 镜像配置
pnpm config set registry https://registry.npmmirror.com
```

### Go 环境

```bash
# 环境变量
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOROOT/bin:$GOPATH/bin:$PATH

# 模块代理
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOPRIVATE=*.example.com
```

### Python 环境

```bash
# 使用 conda 创建环境
conda create -n myenv python=3.11
conda activate myenv

# pip 镜像配置
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### Rust 环境

```bash
# 使用 rustup 安装
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 镜像配置 (国内)
export RUSTUP_DIST_SERVER=https://rsproxy.cn
export RUSTUP_UPDATE_ROOT=https://rsproxy.cn/rustup
```

## 国内镜像源

### 常见镜像源

| 名称 | 地址 |
|------|------|
| 阿里云 | https://developer.aliyun.com/mirror/ |
| 腾讯云 | https://mirrors.cloud.tencent.com/ |
| 华为云 | https://mirrors.huaweicloud.com/ |
| 清华大学 | https://mirrors.tuna.tsinghua.edu.cn/ |
| 中国科学技术大学 | https://mirrors.ustc.edu.cn/ |

### 常用软件镜像

- **npm**: `https://registry.npmmirror.com`
- **Maven**: `https://maven.aliyun.com/repository/public`
- **PyPI**: `https://pypi.tuna.tsinghua.edu.cn/simple`
- **Go**: `https://goproxy.cn`
- **Rust**: `https://rsproxy.cn`
- **Docker Hub**: `https://docker.1ms.run`

## IDE 配置

### VS Code

配置文件位置:

- **Windows**: `%APPDATA%\Code\User\settings.json`
- **macOS**: `~/Library/Application Support/Code/User/settings.json`
- **Linux**: `~/.config/Code/User/settings.json`

推荐安装的扩展:

| 扩展名称 | 用途 |
|---------|------|
| Chinese (Simplified) Language Pack | 中文语言包 |
| GitLens | Git 增强 |
| Error Lens | 行内错误提示 |
| Todo Tree | Todo 管理 |
| Remote - SSH | 远程开发 |
| Dev Containers | 容器开发 |

### IntelliJ IDEA

配置文件位置:

- **Windows**: `%APPDATA%\JetBrains\IntelliJIdea2024.1`
- **macOS**: `~/Library/Application Support/JetBrains/IntelliJIdea2024.1`
- **Linux**: `~/.config/JetBrains/IntelliJIdea2024.1`

推荐配置:

- **自动导入**: Settings → Editor → General → Auto Import
- **编码**: Settings → Editor → File Encodings → UTF-8
- **Maven**: Settings → Build, Execution, Deployment → Build Tools → Maven

## SSH 配置

### 生成 SSH 密钥

```bash
# 生成 RSA 密钥
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"

# 生成 Ed25519 密钥 (推荐)
ssh-keygen -t ed25519 -C "your.email@example.com"
```

### SSH 配置文件

配置文件位置: `~/.ssh/config`

```ssh
# 通用配置
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
    ForwardAgent yes

# GitHub
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519

# 开发服务器
Host dev
    HostName 192.168.1.100
    User developer
    Port 22
    IdentityFile ~/.ssh/dev_key
```

### 将公钥添加到服务器

```bash
# 方法 1: 使用 ssh-copy-id
ssh-copy-id user@server

# 方法 2: 手动添加
cat ~/.ssh/id_ed25519.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

## Git 配置

### 基础配置

```bash
# 设置用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 设置默认编辑器
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "vim"          # Vim

# 设置默认分支名
git config --global init.defaultBranch main

# 大小写敏感
git config --global core.ignorecase false
```

### 中文乱码问题

```bash
# 显示中文文件名
git config --global core.quotepath false

# 中文日志编码
git config --global i18n.logoutputencoding utf-8

# Windows 上的配置
git config --global core.autocrlf input
```

### 常用别名

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
git config --global alias.lg "log --graph --oneline --all"
```

### GPG 签名

```bash
# 列出 GPG 密钥
gpg --list-secret-keys --keyid-format=long

# 配置 Git 使用 GPG 签名
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true
git config --global tag.gpgsign true

# 导出公钥并添加到 GitHub/GitLab
gpg --armor --export YOUR_KEY_ID
```

### 代理配置

```bash
# 全局代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 针对特定域名
git config --global http."https://github.com".proxy http://127.0.0.1:7890

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 相关内容

- [Git 基础](../git/basic.md)
- [常用终端工具](./terminal.md)
