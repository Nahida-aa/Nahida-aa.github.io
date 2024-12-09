# Git

## command

```sh
git --version
git config --list
git config --global user.name "username"
git config --global user.email "email"

# 查看将要删除的文件
git clean -n
# view the files and directories that will be removed
git clean -nd
# 删除所有未跟踪的文件
git clean -f
# 删除所有未跟踪的文件和目录
git clean -fd
```


## degit

- `degit` 是一个 `Node.js` 工具，可以快速下载 Git 仓库的副本，而不包含 .git 目录

```sh
# 用于运行本地或远程的 npm 包。使用 npx 可以直接运行 degit，而不需要全局安装它
npx degit user/repo#branch
npx degit gitee:user/repo#branch folder-name
npx degit Nahida-aa/Docker-learn#main Docker

# or local global install
npm install -g degit
degit github:username/repository-name
```
