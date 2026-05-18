---
title: git
description: "git 是一个分布式版本控制系统, 用于跟踪计算机文件的修改, 主要用于源代码管理 (SCM) 。"
lastUpdated: 2025-03-31T20:18:40Z
tags: [git,cli]
---

## cli

### git status

显示当前工作目录和暂存区的状态。它可以帮助你了解哪些文件被修改、哪些文件被添加到暂存区、哪些文件未被跟踪等信息。

```sh
🪟 ❯ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```
>[!note]
> `On branch main` : 当前所在的分支是 `main` 分支<br/>
> `Your branch is up to date with 'origin/main'` : 当前分支与远程分支 `origin/main` 是同步的，没有新的提交。<br/>
> `nothing to commit, working tree clean` : 没有需要提交的更改，工作目录是干净的。<br/>
> `Your branch` : 你的分支<br/>
> `is up to date` : 是最新的<br/>
> `up to date` : 最新的<br/>
> `with 'origin/main'` : 和 `origin/main` 一起<br/>
> `is up to date with ...` : 
