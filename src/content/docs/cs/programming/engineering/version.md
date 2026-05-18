---
title: "版本控制"
description: "版本控制"
tags: ["工程化"]
lastUpdated: 2025-02-08
---

# 版本控制

版本控制是一种记录文件内容变化，以便将来查阅特定版本修订情况的系统。

## 为什么需要版本控制？

- **历史回溯**：查看代码的历史变更，回滚到任意版本
- **协作开发**：多人同时修改同一项目，自动合并代码
- **分支管理**：并行开发多个功能，互不干扰
- **问题定位**：通过 Git 日志快速定位引入问题的提交

## 版本控制系统的分类

### 本地版本控制系统

- 简单的数据库记录文件变更
- 无法多人协作
- 例如：RCS

### 集中式版本控制系统

- 单一的中央服务器保存所有版本
- 客户端从服务器拉取最新版本
- 优点：易于管理，权限控制
- 缺点：服务器单点故障，依赖网络
- 例如：SVN、CVS、Perforce

### 分布式版本控制系统

- 每个客户端都有完整的版本库
- 不依赖网络，可以离线工作
- 优点：分布式，性能好，安全
- 例如：Git、Mercurial、Bazaar

## Git 简介

Git 是由 Linux 之父 Linus Torvalds 为了管理 Linux 内核开发而创建的分布式版本控制系统。

### Git 的特点

- **分布式**：每个克隆都是完整的版本库
- **快照存储**：每次提交保存完整快照，而非差异比较
- **高性能**：本地操作，无需联网
- **分支管理**：轻量级分支，鼓励频繁使用分支
- **开源免费**：完全开源，免费使用

### Git 与 SVN 的区别

| 特性 | Git | SVN |
|------|-----|-----|
| 类型 | 分布式 | 集中式 |
| 存储 | 快照存储 | 差异存储 |
| 分支 | 轻量级指针 | 目录副本 |
| 网络 | 大部分操作无需联网 | 几乎所有操作需要联网 |
| 完整性 | SHA-1 哈希校验 | 较少校验 |

## Git 基础

### 安装 Git

#### Windows

1. 下载安装包：https://git-scm.com/download/win
2. 运行安装程序
3. 建议选择 "Git from the command line and also from 3rd-party software"

#### macOS

```bash
# 使用 Homebrew 安装
brew install git

# 或者使用 Xcode 命令行工具
xcode-select --install
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt-get install git

# CentOS/Fedora
sudo yum install git
```

### 配置 Git

```bash
# 设置用户名和邮箱（必须）
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

# 查看配置
git config --list

# 查看特定配置
git config user.name
```

配置文件位置：
- 系统级：`/etc/gitconfig`
- 用户级：`~/.gitconfig` 或 `~/.config/git/config`
- 项目级：`.git/config`

### Git 工作区、暂存区和版本库

```
工作区 (Working Directory)
    ↓ git add
暂存区 (Staging Area / Index)
    ↓ git commit
版本库 (Repository)
    ↓ git push
远程仓库 (Remote Repository)
```

- **工作区**：实际的项目目录，包含正在编辑的文件
- **暂存区**：`.git/index` 文件，保存即将提交的文件列表
- **版本库**：`.git` 目录，包含所有历史版本和元数据

### Git 文件状态

```
未跟踪 (Untracked)
    ↓ git add
已暂存 (Staged)
    ↓ git commit
已提交 (Committed) / 未修改 (Unmodified)
    ↓ 修改文件
已修改 (Modified)
    ↓ git add
已暂存 (Staged)
```

## 常用 Git 命令

### 基础操作

```bash
# 初始化仓库
git init

# 克隆远程仓库
git clone <url>
git clone <url> <directory>

# 查看工作区状态
git status

# 查看文件变更内容
git diff                    # 工作区 vs 暂存区
git diff --staged           # 暂存区 vs 版本库
git diff HEAD               # 工作区 vs 版本库

# 添加文件到暂存区
git add <file>              # 添加单个文件
git add .                   # 添加所有文件
git add -A                  # 添加所有文件（包括删除的文件）

# 提交到版本库
git commit -m "提交信息"
git commit -a -m "提交信息" # 自动 add 已跟踪的文件并提交

# 查看提交历史
git log
git log --oneline           # 简洁模式
git log --graph             # 图形化展示分支
git log -p                  # 显示具体修改内容
git log -5                  # 显示最近 5 条
```

### 撤销操作

```bash
# 撤销工作区的修改
git checkout -- <file>
git restore <file>          # Git 2.23+

# 撤销暂存区的修改（回到工作区）
git reset HEAD <file>
git restore --staged <file> # Git 2.23+

# 撤销最近一次提交（回到暂存区）
git reset --soft HEAD~1

# 撤销最近一次提交（回到工作区）
git reset --mixed HEAD~1

# 撤销最近一次提交（完全删除，慎用）
git reset --hard HEAD~1

# 修改最后一次提交
git commit --amend
git commit --amend -m "新的提交信息"
```

### 远程仓库

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add <name> <url>
git remote add origin https://github.com/username/repo.git

# 修改远程仓库 URL
git remote set-url origin <new-url>

# 拉取远程仓库
git fetch origin            # 拉取但不合并
git pull origin main        # 拉取并合并

# 推送到远程仓库
git push origin main
git push -u origin main     # 首次推送并关联分支
git push --force origin main # 强制推送（慎用）

# 删除远程分支
git push origin --delete <branch-name>
```

### 分支操作

```bash
# 查看分支
git branch                  # 查看本地分支
git branch -r               # 查看远程分支
git branch -a               # 查看所有分支

# 创建分支
git branch <name>

# 切换分支
git checkout <name>
git switch <name>           # Git 2.23+

# 创建并切换分支
git checkout -b <name>
git switch -c <name>        # Git 2.23+

# 合并分支
git merge <branch-name>     # 合并到当前分支

# 删除分支
git branch -d <name>        # 已合并的分支
git branch -D <name>        # 强制删除（未合并）

# 重命名分支
git branch -m <old-name> <new-name>
```

### 标签操作

```bash
# 查看标签
git tag

# 创建轻量标签
git tag v1.0.0

# 创建附注标签
git tag -a v1.0.0 -m "版本 1.0.0"

# 查看标签信息
git show v1.0.0

# 推送标签
git push origin v1.0.0
git push origin --tags      # 推送所有标签

# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin --delete v1.0.0
git push origin :v1.0.0
```

### 暂存操作

```bash
# 暂存当前工作区
git stash
git stash save "描述信息"

# 查看暂存列表
git stash list

# 应用暂存（不删除）
git stash apply
git stash apply stash@{0}

# 应用并删除暂存
git stash pop
git stash pop stash@{0}

# 删除暂存
git stash drop
git stash drop stash@{0}

# 清空所有暂存
git stash clear
```

## Git 工作流

### Git Flow

最经典的分支管理模型：

```
main ──────────────────────────────────────┐
     │                │                     │
develop ──────────────┼─────────────────────┤
     │                │                     │
feature/xxx ─────────┘                     │
     │                                      │
release/xxx ────────────────────────────────┤
     │                                      │
hotfix/xxx ─────────────────────────────────┘
```

- **main**：生产环境代码，随时可发布
- **develop**：开发分支，集成最新功能
- **feature**：功能分支，从 develop 切出，完成后合并回 develop
- **release**：发布分支，从 develop 切出，测试后合并到 main 和 develop
- **hotfix**：紧急修复分支，从 main 切出，修复后合并到 main 和 develop

### GitHub Flow

更简单的工作流，适合持续部署：

1. 从 main 创建分支
2. 提交代码
3. 创建 Pull Request
4. 代码审查
5. 合并到 main
6. 部署

### GitLab Flow

结合 Git Flow 和 GitHub Flow 的优点：

- 使用环境分支（production, staging, pre-production）
- 通过合并到不同分支进行部署

## 常用 Git 技巧

### 别名配置

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.lg "log --graph --oneline --all"
```

### 搜索历史

```bash
# 搜索提交信息
git log --grep="关键字"

# 搜索文件历史
git log -p -- <file>

# 搜索代码变更
git log -S"关键字"
git log -G"正则表达式"
```

### 二分查找

```bash
# 开始二分查找
git bisect start

# 标记当前版本为坏
git bisect bad

# 标记已知的好版本
git bisect good v1.0.0

# Git 自动切换版本，测试后标记
git bisect good/bad

# 找到问题后重置
git bisect reset
```

### 忽略文件

创建 `.gitignore` 文件：

```gitignore
# 依赖目录
node_modules/
vendor/
__pycache__/

# 构建输出
dist/
build/
*.log

# 系统文件
.DS_Store
Thumbs.db

# IDE 配置
.idea/
.vscode/
*.swp
*.swo

# 环境变量
.env
.env.local
.env.*.local
```

### Git 配置示例

```bash
# 用户信息
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

# 编辑器
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "vim"           # Vim

# 大小写敏感
git config --global core.ignorecase false

# 换行符处理
git config --global core.autocrlf input         # macOS/Linux
git config --global core.autocrlf true          # Windows

# 显示中文文件名
git config --global core.quotepath false

# 拉取时使用 rebase
git config --global pull.rebase true

# 合并时自动创建备份
git config --global merge.keepBackup false

# 颜色输出
git config --global color.ui auto
```

## Git 提交规范

### 约定式提交 (Conventional Commits)

```
<type>(<scope>): <description>

<body>

<footer>
```

### Type 类型

| 类型 | 描述 |
|------|------|
| feat | 新功能 |
| fix | 修复 bug |
| docs | 文档更新 |
| style | 代码格式（不影响功能） |
| refactor | 重构（不新增功能，不修复 bug） |
| perf | 性能优化 |
| test | 测试相关 |
| chore | 构建/工具相关 |
| ci | CI/CD 相关 |
| revert | 回滚提交 |

### 示例

```
feat(auth): 添加登录功能

- 支持用户名密码登录
- 支持 OAuth2.0 登录
- 添加登录日志

Closes #123
```

```
fix(user): 修复用户查询的 N+1 问题

使用 JOIN 查询优化性能，查询时间从 500ms 降到 50ms

Closes #456
```

## Git 工具推荐

### GUI 工具

- **GitHub Desktop**：简单易用，适合初学者
- **GitKraken**：功能强大，可视化好
- **SourceTree**：Atlassian 出品，功能丰富
- **Tower**：macOS 上的优秀 Git 客户端
- **VS Code Git**：VS Code 内置 Git 支持

### 命令行增强

- **lazygit**：简单易用的终端 Git UI
- **tig**：文本模式的 Git 界面
- **gitui**：Rust 编写的终端 Git UI
- **zsh-git**：Oh My Zsh 的 Git 插件

### 在线学习

- **Learn Git Branching**：交互式 Git 学习游戏
- **Git-SCM Book**：Git 官方书籍
- **Pro Git**：Git 权威指南（免费电子书）

## 常见问题

### 如何修改已提交的信息？

```bash
# 修改最后一次提交
git commit --amend -m "新的提交信息"

# 如果已经推送到远程，需要强制推送
git push --force origin main
```

### 如何合并多个提交？

```bash
# 交互式 rebase，合并最近 3 个提交
git rebase -i HEAD~3

# 将 pick 改为 squash 或 s 来合并
```

### 如何忽略已跟踪的文件？

```bash
# 停止跟踪但保留文件
git rm --cached <file>

# 然后添加到 .gitignore
```

### 如何解决合并冲突？

1. 运行 `git status` 查看冲突文件
2. 打开冲突文件，找到标记为 `<<<<<<<`, `=======`, `>>>>>>>` 的部分
3. 手动修改，删除标记
4. `git add` 解决后的文件
5. `git commit` 完成合并

### 如何找回误删的提交？

```bash
# 查看操作历史
git reflog

# 找到误删的 commit hash，恢复
git reset --hard <commit-hash>
# 或者
git checkout <commit-hash> -- <file>
```

## 总结

Git 是现代软件开发中不可或缺的工具。掌握 Git 的使用可以：

1. **提高开发效率**：快速切换分支、合并代码
2. **保证代码安全**：完整的历史记录，随时回滚
3. **促进团队协作**：多人并行开发，自动合并
4. **支持持续集成**：配合 CI/CD 流程，自动化部署

建议多实践，掌握常用命令后再深入学习高级特性。
