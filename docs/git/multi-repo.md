---
title: multi-repo
description: 
created_at: 2025-08-17T02:53:50Z
updated_at: 2025-08-17T02:53:50Z
tags: [git]
---

## overview
多仓库项目（multi-repo 或 multi-repository）管理通常有以下几种主流方式，适用于微服务、前后端分离或多语言项目：

### 目录结构建议

一般采用如下顶层目录结构，每个子仓库独立管理：

```
root/
├── service-a/      # 仓库A
├── service-b/      # 仓库B
├── frontend/       # 前端仓库
├── docs/           # 文档仓库
└── scripts/        # 自动化脚本
```

每个子目录可以是独立的 git 仓库，也可以是一个 monorepo（单仓库多项目）。

### 管理方式

#### 独立仓库（推荐）
- 每个服务/模块单独一个 git 仓库，独立开发、测试、部署。
- 优点：权限、发布、依赖隔离，适合团队协作。
- 缺点：跨仓库变更需要同步，CI/CD 配置复杂。

#### Monorepo（单仓库多项目）
- 所有项目放在一个仓库，统一管理依赖和脚本。
- 优点：跨项目变更方便，统一版本控制。
- 缺点：仓库体积大，权限难细分。

### 推荐工具

- **Git Submodule**:
  - 在 GitHub 上：显示为一个特殊的引用（类似快捷方式），不是实际文件内容，只能看到子仓库的链接和 .gitmodules 文件
  - 在本地：显示为一个普通文件夹，但里面的内容需要用 `git submodule update` 拉取，默认只保存引用
- **Git Subtree**:
  - 在 GitHub 和本地：都显示为普通文件夹，里面是实际的文件内容，和主仓库其他文件没有区别
- **CI/CD 工具**：如 GitHub Actions、GitLab CI、Jenkins，分别为每个仓库配置自动化流程。
- **统一文档与脚本**：在根目录下维护 docs 和 `scripts/`，便于团队协作。

### 实践建议

- 明确每个仓库的职责和边界。
- 统一代码规范和文档格式。
- 使用自动化脚本（如 shell、python）批量管理和部署。
- 定期同步依赖和接口文档。

## git submodule

很好！使用 submodule 可以让你的主仓库保持轻量，子仓库独立管理，非常适合多仓库协作。下面是操作步骤：

### 添加 submodule

假设你要把远程仓库 `https://github.com/yourname/other-repo.git` 加入当前项目的 `other-repo` 目录：

```bash
# git submodule add <你的远程仓库地址> <子模块目录名>
git submodule add https://github.com/yourname/other-repo.git other-repo
git commit -m "Add submodule: other-repo"
```

### 初始化和更新 submodule

首次克隆主仓库后，需初始化并拉取子仓库内容：

```bash
git submodule init
git submodule update
```

或者一条命令：

```bash
git clone --recurse-submodules <主仓库地址>
```

### 3. 更新 submodule

进入子仓库目录，拉取最新内容并提交引用到主仓库：

```bash
cd other-repo
git pull origin main
cd ..
git add other-repo
git commit -m "Update submodule: other-repo"
git push
```

### 4. 注意事项

- `.gitmodules` 文件会自动生成，记录 submodule 信息。
- 子仓库的变更需要在主仓库中提交引用更新。
- 每个开发者都需同步 submodule。
