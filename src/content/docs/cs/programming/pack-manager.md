---
title: package manager
description: "包管理器是一种用于自动化安装、升级、配置和删除计算机程序的工具。主要可以分为两类：操作系统包管理器和编程语言包管理器。"
lastUpdated: 2025-04-01T00:34:27Z
tags: [package]
---

| 环境 | 包管理器 | 说明 |
| --- | --- | --- |
| windows | [winget](https://winget.run/) | Windows 10 和 Windows 11 的包管理器 |
| macOS | [Homebrew](https://brew.sh/) | macOS 的包管理器 |
| Ubuntu\debian | [apt](https://packages.debian.org/) | Debian 和 Ubuntu 的包管理器 |
| Arch Linux\Manjaro | [pacman](https://archlinux.org/) | Arch Linux 和 Manjaro 的包管理器 |
| Fedora | [dnf](https://dnf.readthedocs.io/en/latest/) | Fedora 的包管理器 |
| openSUSE\CentOS\RHEL | [yum](https://yum.baseurl.org/) | openSUSE、CentOS 和 RHEL 的包管理器 |
| Python | [pip](https://pypi.org/) | Python 的包管理器 |
| Conda | [conda](https://docs.conda.io/en/latest/) | Python 的包管理器 |
| Nodejs | [npm](https://www.npmjs.com/) | Node.js 的包管理器 |
| Nodejs | [yarn](https://yarnpkg.com/) | Node.js 的包管理器 |
| Nodejs | [pnpm](https://pnpm.io/) | Node.js 的包管理器 |
| Deno | [deno](https://deno.land/) | Deno 的包管理器 |
| Bun | [bun](https://bun.sh/) | Bun 的包管理器 |
| Rust | [cargo](https://doc.rust-lang.org/cargo/) | Rust 的包管理器 |
| Go | [go](https://golang.org/) | Go 的包管理器 |
| C\C++ |[conan](https://conan.io/) | C\C++ 的包管理器 |
| Ruby | [gem](https://rubygems.org/) | Ruby 的包管理器 |
| Java | [maven](https://maven.apache.org/) | Java 的包管理器 |
| Java | [gradle](https://gradle.org/) | Java 的包管理器 |
| PHP | [composer](https://getcomposer.org/) | PHP 的包管理器 |
| C# | [nuget](https://www.nuget.org/) | C# 的包管理器 |
| Elixir | [hex](https://hex.pm/) | Elixir 的包管理器 |
| Elixir | [mix](https://hexdocs.pm/mix/) | Elixir 的包管理器 |

## winget (Windows)

```terminal
Administrator in ~ took 50s
🪟 ❯ winget search miniconda
The `msstore` source requires that you view the following agreements before using.
Terms of Transaction: https://aka.ms/microsoft-store-terms-of-transaction
The source requires the current machine's 2-letter geographic region to be sent to the backend service to function properly (ex. "US").

Do you agree to all the source agreements terms?
[Y] Yes  [N] No: yes
Name       Id                  Version        Match          Source
-------------------------------------------------------------------
Miniconda3 Anaconda.Miniconda3 py312_25.1.1-2 Tag: miniconda winget

🪟 ❯ winget install Miniconda3
# or 
🪟 ❯ winget install Anaconda.Miniconda3
```
