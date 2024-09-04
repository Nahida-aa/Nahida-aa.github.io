# MSYS2

## Git

```sh
  /d/github/env                                                                                                                                                                      15:32:49 
❯ where git
/d/Git/cmd/git
/usr/bin/git
/usr/bin/git
/d/Git/bin/git
  /d/github/env                                                                                                                                                                      15:32:54
❯ whereis git
git: /usr/bin/git.exe /usr/share/git /d/Git/cmd/git.exe /d/Git/bin/git.exe /usr/share/man/man1/git.1.gz
  /d/github/env                                                                                                                                                                      15:33:03
❯ git -v
git version 2.45.0.windows.1
  /d/github/env                                                                                                                                                                      15:33:13
❯ /usr/bin/git -v
git version 2.46.0
  /d/github/env                                                                                                                                                                                         15:33:20 
❯
```

```sh
git config list
```

```sh
# git for MSYS2
init.defaultbranch=main
user.name=aa
user.email=Nahida-aa@outlook.com
http.sslverify=false
```

```sh
# git for Windows
diff.astextplain.textconv=astextplain
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process
filter.lfs.required=true
http.sslbackend=openssl
http.sslcainfo=D:/Git/mingw64/etc/ssl/certs/ca-bundle.crt
core.autocrlf=true
core.fscache=true
core.symlinks=false
pull.rebase=false
credential.helper=manager
credential.https://dev.azure.com.usehttppath=true
init.defaultbranch=main
init.defaultbranch=main
user.name=aa
user.email=Nahida-aa@outlook.com
http.sslverify=false
```

### github

### SSH
