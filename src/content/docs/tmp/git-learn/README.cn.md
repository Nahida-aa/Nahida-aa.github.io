# init

## install git

windows

安装后

鼠标右键打开Git Bash

![image-20240302235147995](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240302235147995.png)

## 生成公钥私钥

```bash
ssh-keygen -t rsa -C "127655233@qq.com"
```

```bash
全程enter
sssh-keygen -t rsa -C "127655233@qq.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/aa/.ssh/id_rsa):
/c/Users/aa/.ssh/id_rsa already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/aa/.ssh/id_rsa
Your public key has been saved in /c/Users/aa/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:TjeIOfbFjXdZyI/DvOmbv0N45weCa2sI6ExewJjproA 127655233@qq.com
The key's randomart image is:
+---[RSA 3072]----+
|                 |
|             . . |
|   =          o .|
|  + o  o o o o = |
| .   o= S *.o O .|
|. . o.o= o.o.o.*.|
|E. = . .o. . .=o.|
|. . +   . +  . oo|
|..       o..  ++=|
+----[SHA256]-----+
```

![image-20240303000443387](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303000443387.png)

![image-20240303000807646](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303000807646.png)

打开这个文件

![image-20240303000832177](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303000832177.png)

复制

![image-20240303001112825](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303001112825.png)

![image-20240303001200337](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303001200337.png)

## 克隆项目

```bash
git clone https://gitee.com/liqianglog/django-vue-admin.git #后面是发现的一个表面不错的项目
```



## 新建项目

新建仓库

![image-20240303002939689](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303002939689.png)

.gitignore

![image-20240303003154565](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303003154565.png)

看到这个，这里表示不上传·这个文件

编辑.gitignore

使其上传时忽略.ieda

![image-20240303003838064](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303003838064.png)

## 下载到本地



```bash
git clone https://gitee.com/nahida-aa/blog.git
```

# git command

进入有.git文件的目录

![image-20240303005726804](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303005726804.png)

## 分支

if 一个人开发一个分支就行

合作开发时

一个小组一个分支

习惯

开发时用dev分支

发布时用master分支

### 创建分支

```sh
git branch  # 显示分支
git branch 分支名称  # 创建分支
git branch
```

![image-20240303010216590](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303010216590.png)

### 切换分支

```sh
git checkout dev
```

![image-20240303010440680](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303010440680.png)

切换回来

```sh
git checkout master
```

![image-20240303010541750](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303010541750.png)

### 推送代码到服务器

```sh
git push origin dev
```

#### 私人令牌

```sh
5c602bb631e9e10435b88f26fc1f90d2
```

```
gitee
账号
nahida-aa
密码
JQK135147xa
```

![image-20240303012629017](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303012629017.png)

### 跟踪(同步)分支

```sh
git branch --set-upstream-to=origin/dev dev
```

不过同步,不会改变云端

### 删除分支

```sh
git branch -d aa
```

## 继续搭建项目

在blog目录下创建项目

```cmd
django-admin startproject blog
```

也可以将之前的项目文件复制过来

![image-20240303015850896](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303015850896.png)

切换到master分支,提交(推送代码)

```sh
git branch master
git add ./
git status 
git commit -m "project init"
git push origin/master  #master可省略 err
应该是
git push origin master
or
git push origin/maste
```

![image-20240303022311072](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303022311072.png)

err

```sh
$ git push origin/master
fatal: 'origin/master' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

```sh
git branch --set-upstream-to=origin/master
貌似并未解决
```

![image-20240303024917828](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303024917828.png)

![image-20240303024937410](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303024937410.png)

其他分支不会有

### 将master的内容合并到dev

```sh
git checkout dev
git branch --set-upstream-to=origin/dev dev
```

```sh
git merge master
git add ./
git status
git push
```

将dev合并到自己的分支(aa)

之后init完成

### 演示在本地切换分支看到不同文件

```sh
git checkout aa
```

![image-20240303040803146](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303040803146.png)

/blog/blog/settings.py

```py
...
# git演示
```

![image-20240303040918453](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303040918453.png)

切换成dev应该会消失，但是没有消失?

先切换回aa

```sh
git checkout aa
git add ./
git status
```

![image-20240303041236692](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303041236692.png)



```sh
git commit -m "demo"
git push origin aa
or
git push

git checkout dev
```

![image-20240303041748087](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303041748087.png)

执行完后刚刚写的代码瞬间消失了

```sh
git checkout aa
```

![image-20240303041849946](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303041849946.png)

切换回来就又有了

### 下班时将aa分支的修改提交到dev

```sh
git checkout dev
git merge aa
```

![image-20240303042346443](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303042346443.png)

可以看到在本地的dev出现了刚刚的修改

此时云端的dev

![image-20240303042550820](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303042550820.png)

并未修改

```sh
git add ./
git status
git pull #可能在我提交前别人也提交了一些其他代码
git push
```

![image-20240303043234948](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303043234948.png)

### 假设bb与我协同开发

D:\a_note\git\projects\blog_bb

```sh
git clone https://gitee.com/nahida-aa/blog.git
```

![image-20240303043725802](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303043725802.png)

```sh
cd blog
git branch dev
git branch bb

git checkout dev
git push origin dev # if 云端没有dev
git branch --set-upstream-to=origin/dev dev
git pull
git push origin dev

git checkout bb
git push origin bb # if 云端没有bb
git branch --set-upstream-to=origin/bb bb
#git pull
#git push origin bb
```

![image-20240303045731395](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303045731395.png)

#### bb组提交到bb分支云端

```sh
git add ./
git status
git commit -m "bb_2024_03_03"
git push
```

![image-20240303045837983](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303045837983.png)

![image-20240303050334958](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303050334958.png)

![image-20240303050243121](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303050243121.png)

此时bb的代码还未提交到dev分支哦

#### bb组将本地bb合并到本地dev,再将本地dev提交到云端dev

```sh
git checkout dev
git merge bb
git pull
git push
```

![image-20240303050656419](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303050656419.png)

此时dev也有了

bb开发组完工

此时aa组也将准备下班

#### aa组同上

aa组的工作如下

```sh
git checkout aa
```

![image-20240303051237157](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303051237157.png)

```sh
git add ./
git status
git commit -m "aa_3.3"
git pull
git push

git checkout dev
git merge aa
git pull #此时必须,因为在之前bb提交修改过dev
git push
```

![image-20240303052016568](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303052016568.png)

#### 第二天开工时(以bb为例)

![image-20240303052507923](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303052507923.png)

先从dev pull最新的code

```sh
git checkout dev
git pull #将bb的本地dev弄成最新的
git checkout bb
git merge dev 将本地dev合并过来
```

![image-20240303052630462](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303052630462.png)

### git原理

![image-20240303134701268](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303134701268.png)

暂存区的存在便于回退等修改

仓库区的存在便于记录操作(备注)

#### 工作区与暂存区

![image-20240303140358400](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303140358400.png)

以开始工作为例

init

```sh
git checkout dev
git pull #将bb的本地dev弄成最新的
git checkout aa
git merge dev 将本地dev合并过来
```

在本地修改code

![image-20240303140420661](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303140420661.png)

```
M :{modified已修改}
U :{未跟踪的(新建的)}
```

![image-20240303141504336](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303141504336.png)

```sh
On branch aa
Your branch is ahead of 'origin/aa' by 11 commits.
"你的分支比origin/aa提交多11次"
  (use "git push" to publish your local commits)

Changes not staged for commit:
"更改暂未提交"
  (use "git add <file>..." to update what will be committed)
  ''
  (use "git restore <file>..." to discard changes in working directory)
  '使用"git add <file>..."丢弃工作目录中的修改'
        modified:   aa.txt

Untracked files:
'未跟踪的文件们'
  (use "git add <file>..." to include in what will be committed)
  '使用" git add < file > ..."来包含将要提交的内容'
        aa_1.txt

no changes added to commit (use "git add" and/or "git commit -a")
'没有为提交添加更改(使用“ git add”和/或“ git commit-a”)'
```

放到暂存区

```sh
git add ./
git status
```

![image-20240303145810469](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303145810469.png)

```sh
A :{已添加索引}
M :{已修改索引}
```

```sh
On branch aa
Your branch is ahead of 'origin/aa' by 11 commits.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   aa.txt
        new file:   aa_1.txt
```

提交到仓库区并备注

```sh
git commit -m "v_demo"
```

推送(同步)到server

```sh
git push
```

删除工作区的文件

![image-20240303151333003](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303151333003.png)

````sh
git rm aa_1.txt # 删除并将更改添加到暂存区
````

![image-20240303151431108](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303151431108.png)

```md
已删除索引,已删除 (索引貌似指数据库中的索引才怪)
索引是暂存区的哦(.git/index)
这个表示存在已删除这个index
```

添加到暂存区

```sh
git add ./ #这步貌似不需要(确实不需要rm/add都是将更改存放在暂存区)
```

发现删错了

```sh
git reset HEAD aa_1.txt #
~=
git restore --staged aa_1.txt #恢复暂存区

git checkout -- aa_1.txt
~=
git restore aa_1.txt
```

if 在资源管理器删除文件

![image-20240303153651488](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303153651488.png)

```sh
git restore aa.txt
~=
git checkout -- aa.txt
```

if 将删除操作提交到本地仓库

```sh
git rm aa_1.txt #rm and-> 暂存区
git commit -m 'rm opear' # -> 本地仓库
```

想要恢复

```sh
git reflog # 查看版本记录
```

![image-20240303172824325](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303172824325.png)

回退(重置)版本

```sh
git reset f0c7d8a #回退到上一版本,保留工作区的变化,丢弃暂存区,那么此时工作区显示已经删了,暂存是上一版的显示
=
git reset HEAD^
```

if 推送到server

```sh
git status
git add ./
git status
git commit -m 'test:提交到服务器再回退' #提交
git pull
git push #推送(同步)
```

![image-20240303184407834](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303184407834.png)

看到aa_1.txt已被删除

![image-20240303185006825](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303185006825.png)

```md
17ec0438232fda28365e4d7fcdef994ef98528a2
```

回滚办法是强制推送进行覆盖

先回退本地分支

```sh
git reset HEAD^
```

紧接着强制推送到远程分支

```sh
git push -f
```

![image-20240303190038762](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303190038762.png)

注意：本地分支back后，版本将落后远程分支，必须使用强制推送覆盖远程分支，否则无法推送到远程分支

#### 暂存区与仓库区

![image-20240303150030107](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303150030107.png)

提交到仓库区并备注

```sh
git commit -m "v_demo"
git status
```

![image-20240303150341304](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303150341304.png)

#### 本地与server

工作区、暂存区、仓库区都在本地

![image-20240303150528223](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303150528223.png)

推送(同步)到server

```sh
git push
git status
```

![image-20240303150742747](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303150742747.png)

![image-20240303150844790](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240303150844790.png)

### err

## common

```bash
git gitclone git地址 #克隆项目
git add 文件或目录 #添加
git rm 文件或目录 #删除暂存区文件
git checkout -- 文件 # 恢复文件
git commit -m'备注说明'  #提交到仓库区
git reset HEAD或版本号 # 回退版本
git reflog  #查看版本日志
git log  #查看详细日志
git status  #查看暂存区文件
git branch 分支名称 #创建分支
git branch --set-upstream-to=origin/分支名 称分支名称 #跟踪分支
git checkout 分支名称  # 切换分支
git checkout -bv分支名称 origin/分支名称 #创建分支同时切换到新分支
git diff 版本1 版本2  #对比两个版本的不同
git merge 分支名称  #合并分支代码
git pull  #拉取服务器代码
git push origin 分支名称#推送代码到服务器
git tag 标签名称  # 打标签
```

## git reset回退版本

back to V1?

```sh
git reset V1
三种模式
git reset --soft v #back to v 保留工作区和暂存区的内容
git reset --hard v #..丢弃工作区和暂存区的内容
git reset --mixed v #..保存工作区丢弃暂存区
 --mixed也是此reset的default
```

### git log

```sh
git log --oneline #查看版本提交记录
```

### git reflog

查看所有的操作记录

### git ls-files

查看暂存区文件
