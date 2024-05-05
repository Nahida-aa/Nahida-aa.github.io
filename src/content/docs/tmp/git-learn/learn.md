# 快速入门

```sh
git
git config --list --show-origin
cd ~
cat .gitconfig #查看配置文件
ls .ssh/
```

# key

```sh
$ ls .ssh/
config  id_rsa  id_rsa.pub  known_hosts  known_hosts.old
```

```md
id_rsa: 私钥
id_rsa.pub: 公钥
```

## 生成ssh key

```sh
#1 检查用户名和邮箱是否配置
$ git config --global --list
user.email=1276552337@qq.com
user.name=Nahida-aa
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process
filter.lfs.required=true
credential.https://gitee.com.provider=generic
core.autocrlf=true

#1.1 如果未配置用户名和邮箱
$ git config --global user.email "your email"
$ git config --global user.name "your name"

#2 检查是否生成过ssh key
$ ls ~/.ssh/ 

#3 生成ssh key
$ ssh-keygen -t rsa -C "your email"
```

# 分支合并

## 合并冲突

e.g.

aa

init

```sh
git checkout dev
git pull
git checkout aa
git merge dev
```

aa_1.txt

```md
aa第一次写的code
```

```sh
git checkout aa
git add ./
git commit -m 'aa合并冲突test'
git pull 
git push

git checkout dev
git merge aa
git pull
git push
```

bb

init(在aa提交到dev前)

```sh
git checkout dev
git pull
git checkout bb
git merge dev
```

![image-20240303234155549](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303234155549.png)

aa_1.txt

```md
bb第一次写的code
```

```sh
git checkout bb
git add ./
git commit -m 'bb合并冲突test'
git pull 
git push

git checkout dev
git merge bb
git pull #此时出现合并冲突
git push
```

![image-20240303234756028](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303234756028.png)

出现冲突直接下班等再次上班与aa讨论(下班了就不要打扰别人啦)

### 解决

讨论出解决方案

e.g.

直接编辑aa_1.txt

```md
aa第一次写的code
bb第一次写的code
```

```sh
git add ./
git commit -m 'bb 解决pull时与aa的冲突'
git pull
git push
```

# 项目发布

当项目开发完成之后，需要进行项目的合并与发布，

每组员将开发的分支逐个合并到dev分支，

如果有冲突则解决冲突，

在dev上的代码经过测试没有问题后，合并到master分支，完成发布

逐个合并

组员将自己分支上开发的代码，合并到dev分支上

前提：已经完成了自己分支代码的开发并完成添加、提交及推送

1.切换到dev分支

```sh
git checkout dev
```

2.同步服务器dev代码

```sh
git pull
```

3.合并, aa to dev

```sh
git merge aa
```

4.添加

```sh
git add ./
```

5.提交

```sh
git commit -m 'aa合并'
```

6.推送

```sh
git push [origin dev]
```

所有组员都合并完成之后，在dev测试代码没问题则可以同步到master分支

1.切换到dev

```sh
git checkout dev
```

2.获取项目code, 即所有成员合并完成之后的代码

```sh
git pull
```

3.切换到master分支

```sh
git checkout dev
```

4.合并 dev to master

```sh
git merge dev
```

5.添加

```sh
git add ./
```

6.提交

```sh
git commit -m '发布'
```

7.打标签 版本号v1.0 起一个容易记住的名字

```sh
git tag tagname
```

8.同步到服务器

```sh
git push [origin master]
```
