# Linux 系统下载地址

```md
https://mirrors.tuna.tsinghua.edu.cn/#
```

![image-20240227130104595](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227130104595.png)

![image-20240227130109377](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227130109377.png)

DVD：普通的版本的镜像，我们一般用这个。里面有很多我们用的常用软件和组件。

Everything：这个和DVD区别是里面的基本包含了所有软件和组件。镜像文件比较大。

Minimal：小版本，只有包含系统和很少的软件。

NetInstall：通过网络安装的包，要联网安装。

# 操作系统简介

操作系统（Operating System，简称 OS）是管理和控制计算机硬件与软件资源的计算机程序，是直接 运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。

操作系统是用户和计算机的接口，同时也是计算机硬件和其他软件的接口。操作系统的功能包括管理计 算机系统的硬件、软件及数据资源，控制程序运行，改善人机界面，为其它应用软件提供支持，让计算 机系统所有资源最大限度地发挥作用，提供各种形式的用户界面，使用户有一个好的工作环境，为其它 软件的开发提供必要的服务和相应的接口。

操作系统接口示意图：

![image-20240227135400339](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227135400339.png)

如果没有安装操作系统的计算机称之为裸机，只有一堆硬件。

操作系统位于底层硬件与用户之间，是两者沟通的桥梁。用户可以通过操作系统的用户界面，输入命令， 操作系统则对命令进行解释，驱动硬件设备，实现用户要求。

## 2操作系统类型：

1、桌面操作系统

2、服务器操作系统

3、嵌入式操作系统

4、移动设备操作系统

### 2.1桌面操作系统

桌面操作系统主要用于个人计算机上。个人计算机市场从硬件架构上来说主要分为两大阵营，

PC 机与 M ac 机，从软件上可主要分为两大类，分别为类 Unix 操作系统和 Windows 操作系统：

Unix 和类 Unix 操作系统：Mac，Linux 发行版（如 Debian，Ubuntu，LinuxMint，openSUSE，Fedora，Mandrake，Red Hat，Centos 等）

微软公司 Windows 操作系统 ：Windows 98，Windows 2000，Windows XP，Windows Vista，Windows 7，Windows 8，Windows 8.1，Windows10 等

### 2.2 服务器操作系统:

Linux 安全，稳定，免费 Windows Server 付费，相对 linux 来说 windows 安全性稍低。

## 3虚拟机：

虚拟机（Virtual Machine）指通过软件模拟的具有完整硬件系统功能的、运行在一个完全隔离

环境中 的完整计算机系统虚拟系统通过生成现有操作系统的全新虚拟镜像，具有真实操作系

统完全一样的功能, 进入虚拟系统后，所有操作都是在这个全新的独立的虚拟系统里面进行，

可以独立安装运行软件，保存 数据，拥有自己的独立桌面，不会对真正的系统产生任何影响.

### 3.1安装虚拟机

virtual box (开源 google)

下一步*n (建议d盘)

![image-20240227140555459](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227140555459.png)

#### 3.1.1install centos7

click 新建

![image-20240227144106799](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227144106799.png)

要选中跳过自动安装

内存看情况(可以默认: 2G, 1cpu)

磁盘(可以默认: 20G)

click 完成 后

![image-20240227144547082](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227144547082.png)

Mouse Right 设置 网络

![image-20240227153013132](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227153013132.png)

选择 桥接网卡(名称: 设置中的描述)

启动

##### 3.1.1.1init

![image-20240227165633371](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165633371.png)

![image-20240227165648716](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165648716.png)![image-20240227165710600](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165710600.png)

![image-20240227165719241](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165719241.png)

![image-20240227165724132](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165724132.png)

![image-20240227165730364](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165730364.png)

安装普通版

![image-20240227165736040](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165736040.png)

![image-20240227165755767](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165755767.png)

确认?TODO

![image-20240227165828414](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165828414.png)

![image-20240227165838428](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165838428.png)

网络(重要)

![image-20240227165911030](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165911030.png)

![image-20240227165916352](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165916352.png)

先off，再打开

![image-20240227165941359](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165941359.png)

![image-20240227165949135](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227165949135.png)

配置好后点击 begin Install

![image-20240227170028202](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227170028202.png)![image-20240227170059446](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227170059446.png)

设置密码

![image-20240227170115621](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227170115621.png)

等待安装完成, click rebot

![image-20240227170150935](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227170150935.png)

##### 3.1.1.2登录

登录

![image-20240227170207590](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227170207590.png)

登录成功

![image-20240227170230561](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227170230561.png)

##### 3.1.1.3查看 ip

```shell
ip addr
```

![image-20240227174249939](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227174249939.png)

#### 3.1.2install ubuntu

取消检查更新

![image-20240227192755673](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227192755673.png)

用户名不能用root, 默认会有一个root用户

![image-20240227193900929](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227193900929.png)

打开终端, 查看ip

![image-20240227212321817](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227212321817.png)

![image-20240227212728083](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227212728083.png)

```md
240e:45d:ce50:e74b:3029:7795:abf4:9c4e
```

## 4mobaxterm连接虚拟机

![image-20240227170339752](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227170339752.png)

MobaXterm是一款强大的终端软件，提供远程网络工具，如SSH、X11、RDP、VNC、FTP和MOSH。它为需要以更方便的方式处理远程作业的程序员、Webmaster和IT administrator提供了单一Windows应用程序，并捆打了大量功能。你可以在Windows 10/8/7上免费下载MobaXterm家庭版本，既可以作为便携版本也可以作为...

安装成功后

session>ssh

### 4.1连接centOS

刚刚查到的ip是

```md
192.168.36.26
```

可以在本机(192.168.56.1(不是WLAN))  ping 一下 192.168.36.26

![image-20240227174822039](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227174822039.png)

不过本机有防火墙，虚拟机ping不过来

![image-20240227180303235](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227180303235.png)

ps: 用来保存密码(246369)的主密码我设置的246369aa

![image-20240227181333245](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227181333245.png)

### 4.2连接ubuntu

![image-20240227213355164](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227213355164.png)![image-20240227213531042](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227213531042.png)

被拒绝(阻塞?)

在虚拟机安装一个 东西

Ubuntu一定要安装openssh-server才能用ssh

```shell
sudo apt install openssh-server
```

![image-20240227214010643](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227214010643.png)

![image-20240227214030722](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227214030722.png)

再次尝试连接

![image-20240227214304770](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240227214304770.png)

成功

热点断开再连接发现ubuntu的ip变了

但是centOS的ip没有变

这是正常的行为。当你的 Ubuntu 虚拟机从网络断开然后重新连接时，它可能会从 DHCP 服务器获取一个新的 IP 地址。DHCP（动态主机配置协议）是一种网络协议，它可以自动为网络设备分配 IP 地址。

如果你希望你的虚拟机始终使用相同的 IP 地址，你可以配置静态 IP 地址。这需要你编辑你的网络配置文件，并指定一个固定的 IP 地址。

在 Ubuntu 18.04 及更高版本中，你可以使用 Netplan 来配置静态 IP 地址。以下是一个示例的 Netplan 配置文件：

```
network:
 version: 2
 renderer: networkd
 ethernets:
  enp0s3:
   dhcp4: no
   addresses: [192.168.1.100/24]
   gateway4: 192.168.1.1
   nameservers:
    addresses: [8.8.8.8, 8.8.4.4]
```

在这个文件中，我们禁用了 DHCP (`dhcp4: no`)，并指定了一个静态 IP 地址 (`addresses: [192.168.1.100/24]`)。我们还指定了默认网关 (`gateway4: 192.168.1.1`) 和 DNS 服务器 (`addresses: [8.8.8.8, 8.8.4.4]`)。

请注意，你需要根据你的网络环境来修改这个配置。你需要选择一个在你的网络中未被使用的 IP 地址，你的网关和 DNS 服务器的地址也可能不同。

一旦你编辑了你的配置文件，你可以使用 `sudo netplan apply` 命令来应用你的更改。

在 Ubuntu 16.04 及更低版本中，你需要编辑 `/etc/network/interfaces` 文件来配置静态 IP 地址。你可以在网上找到许多关于如何做到这一点的教程。

TODO

```md
fe80::8534:b82d:3e4b:c8fb这不是ip
突然发现ip没变
240e:45d:ce50:e74b:3029:7795:abf4:9c4e
```

# Linux

## 1文件和目录介绍

### 1.1Windows和Linux **文件系统区别**

1、Windows 下的文件系统，打开我的电脑可以看到多个盘符。

2、每个盘符都相当于一个根。

![image-20240228014246408](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228014246408.png)

### 1.2linux 文件目录

1 linux 下没有盘符的概念，只有一个根目录

![image-20240228014403626](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228014403626.png)

```md
这里的python是用户名
```

```shell
# 切换为根目录
cd /
# 
ls
```

![image-20240228014919193](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228014919193.png)

## 2文件目录command

格式: command [-options] [parameter]

command：命令名，相应功能的英文单词或单词的缩写

[-options]：选项，可用来对命令进行控制，可选

[-parameter]：传给命令的参数，可选

### 2.0 --help

```shell
ls --help
```

```shell
ls
ls -a
ls -l
```

![image-20240228153310797](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228153310797.png)

```shell
touch aa.txt
ls -l
```

![image-20240228153748040](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228153748040.png)

```shell
dr:目录,文件夹
w:写
x:执行
r:读
```

#### 2.0.1man

```sh
man ls #查看ls的使用方法,q退出
```

### 2.1ls查看目录文件

list的缩写?

```shell
ls -a    do not ignore entries starting with . {即显示隐藏文件}
ls -l    use a long listing format {即以一个列表显示}
	ls -a -l == ls -l -a == ls -al == ls -la ~= ll
ls -h, --human-readable    human{人性化}readable{易读的}
ls -R, --recursive{递归}    list subdirectories{子目录} recursively
ls [dir]    列出dir中的文件、文件夹
```

```shell
pwd 显示当前路径
```

![image-20240228154628519](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228154628519.png)

![image-20240228161242258](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228161242258.png)

### 2.2cd切换工作目录

```shell
cd . 切换到当前目录
cd .. 切换到上一级目录
cd ~ 切换到家目录 == cd
cd - 上一次工作目录互相切换
```

### 2.3touch新建文件

![image-20240228163540858](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228163540858.png)

### 2.4mkdir新建目录

```shell
-p 递归创建
mkdir [目录名]
mkdir -p a/b/c 在 b 目录不存在时，可以用-p 参数同时创建 b 目录
```

### 2.5rmdir删除目录

![image-20240228171633147](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228171633147.png)

### 2.6rm删除文件或目录

```shell
-r 递归地删除目录下的内容，删除文件夹时必须加此参数
-f 强制删除，忽略不存在的文件，无需提示
```

```shell
rm aa.txt bb.txt cc.txt
```

![image-20240228173630386](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228173630386.png)

![image-20240228173815159](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228173815159.png)

```shell
rm -rf vip
```

![image-20240228173944777](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228173944777.png)

```shell
touch a.txt aa.txt aaa.txt
rm -rf a*
```

### 2.7mv移动(rename)

```shell
mv aa.txt vip/    #将aa.txt移动到vip/里面
```

![image-20240228183747465](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228183747465.png)

```sh
mv vip/aa.txt ./bb.txt    #将aa.txt移动到当前目录并重命名为bb.txt
mv bb.txt aa.txt    #将bb.txt移动到当前目录并重命名为aa.txt
```

![image-20240228184251523](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228184251523.png)

覆盖

```shell
touch vip/aa.txt aa.txt
mv vip/aa.txt ./aa.txt    #vip/aa.txt将覆盖./aa.txt
```

因此存在安全问题,

```sh
-f 覆盖前不询问
-i 覆盖前询问
-n 不覆盖已经存在的文件
```

![image-20240228185409607](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228185409607.png)

### 2.8cp

```sh
-i 覆盖前提示 -r 若给出的源文件是目录文件，则 cp 将递归复制该目录下的所有子目录和文
件， 目标文件必须为一个
目录名 cp src des 如果是复制文件夹，则加上-r 选项
TODO
```

![image-20240228185732326](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228185732326.png)

### 2.9cat查看(输出)\合并 file

concatenate{连接} FILE(s) to standard{标准的} output{输出}

```sh
-n 输出行编号
-s 不输出多行空行
-b 对非空行进行编号
```

```sh
cat aa.txt
```

![image-20240228211641955](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228211641955.png)

![image-20240228211920149](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228211920149.png)

```sh
cat filename1 filename2 > filename 将filename1 和filename2 的文件合并写入到filename 文件中
#将f1和f2输出到f
```

#### 1.9.3输出到文件

```sh
cat f1 > f2    #将f1中的内容 覆盖 到f2
cat f1 >> f2    #将f1中的内容 追加 到f2
```

### 2.10more(谁在terminal看那么长的文章呀)

查看文件内容，可以分页查看，每次查看一页的内容，适合查看内容比较多的文件。

```sh
more filename 查看 filename 文件的内容
```

![image-20240228212518377](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228212518377.png)

### 2.11history

```sh
history 输出(打印)历史命令
history -c 删除历史命令记录
```

### 2.12clear清屏

### 2.13sudo获取root权限

ubuntu 默认是不能以 root 账号登录系统，那么遇到需要 root 权限的怎么办？

那么这个时候只要在命令前面加上 sudo，就可以获得 root 权限。

![image-20240228212658179](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240228212658179.png)

```sh
mv: cannot move 'a.txt' to '/a.txt': Permission{许可} denied{deny:拒绝}
```

```sh
sudo mv a.txt /
```

## 3权限与远程管理

Linux 系统通常作为服务器的系统，而我们在实际使用过程中，经常需要多人同时操作服务器，因此Linux 系统需要支持权限管理和远程管理。

（1）用户：

要登录 Linux 必须要有一个用户，一台 Linux 系统下可以有多个用户，

并且每个用户可有不同的权限。在 Linux 中可以指定用户对不同的文

件、目录拥有不同的权限。

（2）用户组：

Linux 有一个组的概念，不同的用户分配到一个组，那么同组下的用户，

都拥有这个组的权限。

（3）权限

Linux 权限有三种，读，写，执行。

![image-20240229153446666](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229153446666.png)

### 3.1用户管理

用户管理包括：创建用户、删除用户、修改用户帐号属性、创建用户组、修改用户组属性。其中，创建用户/删除用户/修改其他用户密码的终端命令都需要通过sudo执行。

#### 3.1.1useradd创建用户

```sh
useradd [用户名]
-d指定新账户的主目录
-g指定用户的所属组
-G指定用户附加组
-s指定用户登录shell
-m自动创建家目录
```

instance:

```sh
sudo useradd bb
#给bb设置密码
sudo passwd bb
```

![image-20240229164021798](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229164021798.png)

![image-20240229165153364](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229165153364.png)

可以看到创建的用户

但是尝试登录时登录失败

TODO

#### 3.12userdel删除用户

```sh
userdel [用户名]
-r删除用户的同时删除家目录
```

#### 3.1.3usermod修改用户属性

```sh
usermod 
-u 用户id
-g 所属组id
-a-GGID：不使用-a选项，会覆盖此前的附加组；
-d-m将家目录内容移至新位置
-s该用户帐号的新登录
-l新的登录名称
```

#### 3.1.4切换用户

```sh
su - [用户名]加-同时切换到用户的家目录，不加直接在当前目录切换到新用户。
```

instance:

```sh
sudo su - root
```

![image-20240229164534771](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229164534771.png)

### 3.2用户组管理

#### 3.2.1groupaddi创建用户组

#### 3.2.2groupdel

#### 3.2.3groupmod

```sh
-g Gid
```

```sh
创建用户时，会默认创建一个与用户名同名的组名
创建成功后可在/etc/passwd文件下查看
新创建的用户没有sudo权限，需要将用户加到adm,sudo这两个组中才拥有sudo权限
```

### 3.3权限管理

```sh
chmod+/-rwx文件名|目录名+增加权限，-取消权限
每个文件，都有三组不同的权限，第一组文件所有者，第二组是文件所属组，第三组是其他用户。
第一组：u文件所有者修改所有者权限：chmod u+/-/=rwx filename
第二组：g文件所有组修改所属组权限：chmod g+/-/=rwx filename
第三组：o其他用户修改所属组权限：chmod o+/-/=rwx filename
```

instance:

![image-20240229180417463](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229180417463.png)

```sh
#给a.txt的所有者用户增加x权限
chmod u+x a.txt
#给a.txt的所有组增加x(可执行)权限
chmod g+x a.txt
```

![image-20240229180849623](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229180849623.png)

![image-20240229181425790](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229181425790.png)

快捷修改权限

```sh
4=r 2=w 1=x  
chmod 755 a.txt
```

![image-20240229181744555](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229181744555.png)

### 3.4远程管理

#### 3.4.1查看ip

```sh
ip addr
```

![image-20240229183059853](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229183059853.png)

```sh
240e:45d:ce30:16ba:703a:844f:3dc6:3fca
```

```sh
ifconfig
```

#### 3.4.2ping

```sh
ping -c 指定ping几个数据包结束
ping -i 指定发送数据包的间隔，单位是秒
ping -s 指定发送数据的大小，单位字节
ping -t 设置TTL的大小，TTL网络调数大小
```

#### 3.4.3ssh远程连接

SSH是一种网络协议，用于计算机之间的加密登录。Linux下默认开启sshd服务，只有开启sshd服务才能进行ssh连接。

可以使用service sshd status查看是否开启sshd服务。active(running)表示已经开启。

```sh
service sshd status
```

![image-20240229185018578](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229185018578.png)

Windows下连接方式

Windows下我们借助第三方软件，xshell或者putty来连接。

xshell和putty下载地址：链接：https://pan.baidu.com/s/1kUCyM2r

密码：zyplssh

端口号默认：22

Linux下ssh命令连接方式

ssh -p 端口主机 #-p 可以指定端口。ssh一般使用默认的22。看到提示welcome表示已经连接成功

![image-20240229190006673](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229190006673.png)

#### 3.4.4scp文件复制(已过时)

scp就是secure copy，是一个在Linux下用来进行远程拷贝文件的命令

现在可以直接拖拽

也可以使用SFTP

#### 3.4.5SFTP

![image-20240229194012300](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229194012300.png)

![image-20240229194030398](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229194030398.png)

### 3.5系统信息

#### 3.5.1date

![image-20240229194351837](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229194351837.png)

#### 3.5.2df/du查看磁盘空间

```sh
df -TH 查看磁盘分区，以及挂载情况
du -sh [目录名] 查看目录大小
du -h [filename] 查看文件大小
```

#### 3.5.3uname查看内核/操作系统/CPU信息

```sh
uname -a # 查看内核/操作系统/CPU信息
每个信息分开查看：
uname -i 查看硬件平台 x86_64
uname -m 查看cpu     x86_64
uname -n 节点名称    aa-VirtualBox
uname -o 操作系统    GNU/Linux
uname -v 内核版本  #107~20.04.1-Ubuntu SMP Fri Feb 9 14:20:11 UTC 2024
uname -r 发行版本号  5.15.0-97-generic
```

#### 3.5.4top查看进程

```sh
top 查看进程实时运行情况，即系统资源实时使用情况，退出top界面输入q
```

![image-20240229201523014](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229201523014.png)

![image-20240229201546524](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229201546524.png)

##### 3.5.4.1ps

查看所有进程状态

```sh
ps -ajx    一般使用ps命令带选项ajx一起使用
ps aux|grep aa
ps aux|grep redis
```

![image-20240229201816312](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240229201816312.png)

##### 3.5.4.2kill结束进程

```sh
kill [参数] [进程号]
kill -9 [进程号]：强制结束进程
kill -15 [进程号]：结束进程，等级没有-9高
提示：在Linux中1号进程（init进程）是有所有进程的祖先进程，是不能被结束的。
```

## 4文件查找与编辑

```sh
echo $PATH
```

![image-20240302120021357](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240302120021357.png)

```md
: 在这里用来分隔
```

### 4.1文件查找、

#### 4.1.1which命令

```shell
which pwd
which python3
```

扩展：与which功能相似的还有一条命令whereis也可以查找到命令的绝对路径

which会列出这个命令的别名记录,而whereis会显示出这个命令的帮助文档所在位置

```shell
语法：
whereis (选项) (参数)
选项
-b：只查找二进制文件；
-B<目录>：只在设置的目录下查找二进制文件；
-f：不显示文件名前的路径名称；
-m：只查找说明文件；
-M<目录>：只在设置的目录下查找说明文件；
-s：只查找原始代码文件；
-S<目录>只在设置的目录下查找原始代码文件；
-u：查找不包含指定类型的文件。
whereis 命令只能用于程序名的搜索，如果省略选项，则返回所有信息
```

```sh
whereis pwd
whereis -b pwd
whereis svn
```

说明：svn没安装，找不出来

#### 4.1.2find命令

在一个目录（及子目录）中搜索文件，你可以指定一些匹配条件，如按文件名、文件类型、用户等条件查找文件。

```sh
find [搜索路径] [搜索选项] filename
path 路径，表示从这个路径下开始查找
-name filename查找名为filename的文件
-size+/-大小 按照文件大小来查找，+大于，-小于
-user username按文件所属查找
通过时间值查找:
-ctime -atime -mtime（以天为单位）
-cmin -amin -mmin（以分钟为单位）
-type按文件的类型
-inum根据i节点进行查找
-group组名按所属组来查找
-a and逻辑与
-o or逻辑或
-exec或 -ok command{} \; 将查到的文件执行command操作,{}和\;之间有空格，固定格式。
提示：如果find命令省略路径不写，表示从当前路径开始查找。
find还可以结合通配符使用。
linux下的通配符
```

![image-20240302131821756](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240302131821756.png)

instance:

![image-20240302130827003](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240302130827003.png)

#### 4.1.3locate命令

```sh
locate [list file in databases]:/usr/bin/locate
说明:
是Linux所特有的命令,寻找文件或目录，最好用于快速定位系统命令，配置文件等
虽然搜索速度很快，但有时候会找不到
locate是在文件数据库中查找的，所以速度会很快
但是如果数据库没有包含这个文件的话，他就会找不到；
格式:
locate [搜索关键字]
配合:updatedb [update a database for mlocate]:/usr/bin/updatedb 建立整个系统目录文件的数据库
注意：其执行权限为：root！！！
```

```sh
locate /etc/sh
res:
    /etc/shadow
    /etc/shadow-
    /etc/shells
```

当在某些目录下创建文件，然后更新数据库之后，并不能用locate命令查找到
原因是系统在更新数据库的配置文件中，设置了一些搜索限制，所以搜索不到，输入如下命令可以看到：

```sh
vi /etc/updatedb.conf
```

```sh
PRUNE_BIND_MOUNTS=“yes”表示开启搜索限制，如果为’no’则表示不开启搜索限制；
PRUNEFS=表示搜索时，不搜索的文件系统；
PRUNENAMES=表示搜索时，不搜索的文件类型；
PRUNEPATHS=表示搜索时，不搜索的路径；
不只locate命令遵循搜索限制，whereis与which也遵循
```

#### 4.1.4grep命令

一种强大的文本搜索工具

它能使用正则表达式搜索文本, 并把匹配的行打印出来

```sh
grep "python" filename 在filename文件中查找python,并打印结果(行)
grep "python" f1 f2 f3 也可以多文件
```

```sh
-E 使用正则表达式
grep -E "[a-c]+" filename 
```

```sh
grep home /etc/passwd
syslog:x:104:108::/home/syslog:/bin/false
luohuihua:x:1000:1000:luohuihua,,,:/home/luohuihua:/bin/bash
grep -E"(home)|(sbin)" /etc/passwd
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
syslog:x:104:108::/home/syslog:/bin/false
luohuihua:x:1000:1000:luohuihua,,,:/home/luohuihua:/bin/bashsshd:x:121:65534::/var/run/sshd:/usr/sbin/nologinroot@ubuntu
```

在多个文件中查找

```sh
grep "match_pattern" file_1file_2file_3...
grep luohuihua /etc/passwd /etc/group /etc/passwd:luohuihua:x:1000:1000:luohuihua,,,:/home/luohuihua:/bin/bash
/etc/group:adm:x:4:syslog,luohuihua
/etc/group:cdrom:x:24:luohuihua
/etc/group:sudo:x:27:luohuihua
/etc/group:dip:x:30:luohuihua
/etc/group:plugdev:x:46:luohuihua
/etc/group:lpadmin:x:113:luohuihua
/etc/group:luohuihua:x:1000:
/etc/group:sambashare:x:128:luohuihua
```

输出包含匹配字符串的行数 `-n` 选项：

```sh
grep luohuihua -n /etc/passwd /etc/group
/etc/passwd:40:luohuihua:x:1000:1000:luohuihua,,,:/home/luohuihua:/bin/bash
/etc/group:5:adm:x:4:syslog,luohuihua
/etc/group:18:cdrom:x:24:luohuihua
/etc/group:21:sudo:x:27:luohuihua
/etc/group:23:dip:x:30:luohuihua
/etc/group:35:plugdev:x:46:luohuihua
/etc/group:52:lpadmin:x:113:luohuihua
/etc/group:67:luohuihua:x:1000:
/etc/group:68:sambashare:x:128:luohuihua
```

统计文件或者文本中包含匹配字符串的行数`-c`选项：

```sh
grep luohuihua -c /etc/passwd /etc/group
/etc/passwd:1
/etc/group:8
```

#### 4.1.5 | 管道符

将左边的输出传递给右边 (当作右边的输入)

```sh
ps -ajx|grep ssh #将ps命令的输出结果当grep的输入过滤
ll /etc | grep -E ".*" -c #显示/etc目录下的文件或目录的总数量
```

#### 4.1.6 >重定向 >>追加重定向

```sh
ls > test.txt将ls命令的输出重定向到test.txt
ls >> text.txt将ls命令的输出追加到test.tx
```

```sh
输入重定向<
ls 
Downloads examples.desktop test test.txt 下载 公共的 图片 文档  桌面 模板 视频 音乐
cat test.txt 
/etc
ls < test.txt 
Downloads examples.desktop test test.txt 下载 公共的 图片 文档  桌面 模板 视频 音乐
```

### 4.2文件打包和压缩

#### 4.2.1tar打包

```sh
tar -cvf x_name.tar path
-c 创建一个新的归档
-v 详细地列出处理的文件
-f 使用归档文件
```

![image-20240302193459770](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240302193459770.png)

#### 4.2.2tar解包

```sh
tar -xvf name.tar
-x将打包过的文件解包
提示：-f选项必须放在最后面
```

![image-20240302193953021](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240302193953021.png)

#### 4.2.3gzip压缩

`gzip`一般跟`tar`一起使用，完成打包压缩

tar 只负责打包并未做压缩，使用 `-z` 选项可以调用 `gzip` 压缩，完成打包压缩。

使用`tar`打包压缩的文件名，一般命名成`xxx.tar.gz`区别与其他文件。

```sh
压缩文件：
tar -zcvf name.tar.gz a.txt b.txt c.txt
解压缩文件：
tar -zxvf name.tar.gz
解压缩到指定路径:
tar -zxvf name.tar.gz -C 目标路径 
-C 指定解压到那里，解压的目录必须存在
```

![image-20240302194844616](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240302194844616.png)

下载下来看看

![image-20240302194942663](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240302194942663.png)

![image-20240302195213126](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240302195213126.png)

#### 4.2.4bzip2压缩

暂时不用

### 4.3软件安装(in ubuntu)

#### 4.3.1apt

ubuntu下的包管理工具

安装软件包：

```sh
sudo apt install
```

软件包卸载软件包：

```sh
sudo apt remove
```

软件包更新已安装的包：

```sh
sudo apt upgrade
```

小火车安装演示：

```sh
sudo apt install sl
```

### 4.4vim编辑器的使用

linux下的文本编辑器，可以执行输出、删除、查找、替换、块操作等众多文本操作。vim没有菜单，只有命令，且命令繁多。

#### 4.4.1vim有三种模式

- 命令模式
- 输入模式
- 末行模式

##### 4.4.1.1模式切换

![image-20240302201235200](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20240302201235200.png)

#### 4.4.2命令模式

使用vim打开文件的时候，就进到命令模式。

```sh
vim filename:打开或新建文件，并将光标置于第一行首
vim +n filename：打开文件，并将光标置于第n行首
vim + filename：打开文件，并将光标置于最后一行首
vim +/pattern filename：打开文件，并将光标置于第一个与pattern匹配的串处
vim -r filename：在上次正用vi编辑时发生系统崩溃，恢复filename
vim filename....filename：打开多个文件，依次进行编辑
```

命令模式下只能输入命令不能进行编辑，只有进入编辑模式才能做文件编辑。

##### 4.4.2.2移动光标

```sh
h：光标左移一个字符
l：光标右移一个字符
k或Ctrl+p：光标上移一行
j或Ctrl+n：光标下移一行
w或W：光标右移一个字至字首
b或B：光标左移一个字至字首
0：（注意是数字零）光标移至当前行首
$：光标移至当前行尾
Ctrl+f向文件尾翻一屏
Ctrl+b向文件首翻一屏
home移动至行首
end移动至行末
G跳转至文档最末尾
gg跳转至文档首行
nG    n是一个数字，表示跳转至第几行
```

##### 4.4.2.3删除、复制...

```sh
dd 删除光标所在行
do 删除光标所在行光标前面的内容(数字0)
d$ 删除光标所在行光标末尾的内容
3dd 删除光标所在行包含当前行后面3行内容（数字可以替换成自己想要删除的行数多少）
yy 复制
2yy 复制光标所在行开始2行内容
p 粘贴，删除的内容也可以直接用p粘贴
u撤销
ctrl r反撤销
```

#### 4.4.3进入编辑模式

```sh
i：在光标前
I：在当前行首
a：光标后
A：在当前行尾
o：在当前行之下新开一行
O：在当前行之上新开一行
```

#### 4.4.4进入行末模式

在命令模式下，用户按":"键即可进入末行模式

##### 4.4.4.1退出及保存：

```sh
:q退出
:q!退出并不保存
:w保存
:wq退出并保存
:x退出并保存
```

##### 4.4.4.2查找替换：

```sh
/string 在文本中查找 string
n下一个
N上一个
:n1,n2s/word1/word2/g将n1行到n2行中word1替换成word2,g表示全部替换，不加g则只替换匹配中的第一个
:1,$s/word1/word2/g从第一行到最后一行寻找word1字符串，并将该字符串取代为word2(常用)
:1,$s/word1/word2/gc从第一行到最后一行寻找word1字符串，并将该字符串取代为word2！且在取代前显示提示字符给用户确认是否需要替换(常用)
```

4.4.4.3显示行号

```sh
：set nu显示行号
：set nonu取消显示行号
```

#### 4.4.5其他模式

4.4.5.1visual模式

```sh
v:按字符移动,选中文本
V:按行移动,选中文本可视模式可以配合d,y,>>,<<实现对文本块的删除,复制,左右移动
[搜索选项]:
```



