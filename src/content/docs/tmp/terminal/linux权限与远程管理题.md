# 基础命令

1、linux中使用什么命令查看当前工作目录。

```sh
pwd
```

2、使用linux命令一次性创建a.txt b.txt c.txt 三个文件。

```sh
touch a.txt b.txt c.txt
```

3、在当前目录下创建文件名为test的文件夹。

```sh
mkdir test
```

4、将第2题创建的文件a.txt移动到test文件夹下。

```sh
mv a.txt test/
```



5、将第2题创建的文件b.txt 文件重名成b_1.txt.

```sh
mv b.txt b_1.txt
```



6、查看家目录下有那些文件或文件夹。

```sh
ll
```



7、以列表的形式并且以人性化的方式显示文件大小查看家目录下的文件。

```sh
ls -hl /home
```



8、将/etc/passwd 复制到第3题新建立的test文件下。

```sh
sudo cp /etc/passwd /test/
```



9、将/test/passwd 文件输出行号并写入到a.txt文件中。

```sh
cat -n /test/passwd > a.txt
```



10、使用man,--help帮助，查看grep的使用方法。

```sh
man grep
grep --help
```

11、请描述什么是绝对路径与相对路径

```sh
以/开头或以~开头
```



12、执行创建文件命令 mkdir a/b/c 如果a/b不存在的情况下，能否正常执行，如果不能应该怎么创建c？

```sh
no
mkdir -p a/b/c
```



13、请删除12题创建的a/b/c目录下的c文件夹

```sh
rm -rf a
```



14、查看当前目录下的后缀为“.txt”的文件，采用长格式显示并且显示文件修改时间。

```sh
ls -tl .txt
```



15、请创建一个文件夹 test1 并且将test文件夹copy到test1中。

```sh
mkdir test1
cp -r test test1
```

# 权限

1、创建一个用户lilei,其ID号为2002，基本组为stu(id为3000)，附加组为Linux:

```sh
sudo groupadd -g 3000 stu
sudo groupadd Linux 
sudo useradd -u 2002 -g stu -G Linux lilei
```

2、创建一个用户hanmeimei需要默认创建家目录，并且指定shell为/bin/bash

```sh
sudo useradd -m -s /bin/bash hanmeimei
```



3、修改lilei的ID号为4004,所属组为Linux.

```sh
usermod -u 4004 -g Linux lilei
```

4、添加系统用户zhaoyu,且不允许其登陆系统

```sh
useradd -r -s '/sbin/nologin' zhaoyu
```

5、在桌面创建一个文件a.text,并查看文件的权限。

```sh
touch a.text 
ls -l
```



6、修改a.text文件所属组的权限为只读。

```sh
chmod g=r a.text
```



7、将a.text文件权限修改为，其他人无任何权限，所有者可读可写，所属组只可读。

```sh
chmod u=rw,g=r,o=--- a.text
or
chmod 640 a.text
```

# 远程管理

1、linux文件权限有那几种，利用什么命令查看拷贝回来的文件有什么权限？

2、linux中查看系统的ip地址命令？如何检查本地网卡是否正常？

3、查看linux系统中所有进程的状态的命令是什么？

4、发现linux系统中有个异常的后台进程想要将其结束使用什么命令？

5、检查两台linux系统是否能通信使用什么命令？

6、在使用ping命令的时候怎么指定定数据大小，并且ping10个数据包后结束ping命令？

7、linux系统变卡想要查看那几个进程占用CPU，内存较高，请问可以使用什么命令？

8、chmod755filename命令中，755代表的是什么,其中755可以用什么代替？

9、查看磁盘挂载情况的命令是什么？

课后实操题

1、请远程登录同桌的linux系统，在同桌电脑桌面建一个以自己名字命名的文件夹.

2、进入自己名字的文件夹，创建一个自己名字的文件，并将这个文件权限修改成所有者可写可读，其他人没有任何权限。

3、利用scp命令将第2题中创建的文件拷贝到自己系统的家目录下。

4、利用scp命令将第3题中的以自己名字的文件夹拷贝到自己系统的桌面，并且将同桌在自己桌面建立的文件夹拷贝到同桌电脑。

5、请在自己windows电脑中选择一张图片上传到linux，并且将自己名字命名的那个文件夹下载到windows下。

6、创建一个用户lilei,其ID号为2002，基本组为stu(id为3000)，附加组为linux。

7、创建一个用户hanmeimei需要默认创建家目录，并且指定用户使用的shell为/bin/bash

8、修改lilei的ID号为4004,所属组为linux。

9、添加系统用户zhaoyu,不允许其登录操作系统。

10、在桌面创建一个文件a.text,并查看文件的权限。

11、修改a.text文件所属组的权限为只读。

12、将a.text文件权限修改为所有者可读可写，所属组只可读，其他人无任何权限。

# 文件查找与编辑

1、在Desktop/test/下新建三个空白文件 a.py b.py c.py.

```
touch a.py b.py c.py
```

2、将第1题中创建的三个文件打包成一个名称为 py.tar 的包.

```
tar -cvf py.tar a.py b.py c.py
```

3、新建 tar 目录，并且将py.tar移动到tar目录下.

```
mkdir tar
mv py.tar tar
```

4、请使用命令将第2题中创建的py.tar包解出来。

```
tar -xvf py.tar
```

5、将第4题中解包出来的三个文件使用gzip打包压缩命名为py.tar.gz。

```
tar -zcvf py.tar.gz a.py b.py c.py
```

6、请简单描述使用vim编辑文件时在整个文件的各行或某几行的行首或行尾加一些字符串使用的命令。

```
vim file
:1,$s/^/string/           在文件的第一行至最后一行的行首插入“string”。
:%s/$/string/g            在整个文件每一行的行尾添加“string”。
:%s/string1/string2/g     在整个文件中替换“string1”成“string2”。
:3,7s/string1/string2/    仅替换文件中的第3行到第7行中的“string1”成“string2”。
```

注意: 其中s为substitute，%表示所有行，g表示global

待验证

7、使用vim同时编辑2个文件，拷贝其中一个文件中的文本粘贴到另一个文件中的操作命令？

```
vim a.txt aa.txt # 打开两个文件
:n #回车切换下一个
:N #回车切换上一个
yy #拷贝
p #粘贴
```

8、创建一个文件目录vim_test,将/etc/passwd 文件复制到vim_test目录下。

```
mkdir vim_test
cd vim_test
cp /etc/passwd ./
```

10、使用vim编辑passwd文件将在10,20行注释掉，在行末加上注释时间。

```
10,20s/^/#/g
10,20s/$/ 注释时间2018-3-15/g
```

11、使用vim打开文件编辑时直接定位到15行将15-20行删除。

```
vim +15 passwd
:set number # 显示行号
5dd   #删除当前光标开始后5行
```

12、使用vim编辑文件时跳转至首行，复制1-5行，粘贴到文档的最后。

```
gg #定位到首行
5yy #拷贝5行
G  #定位到末行
p  #粘贴
```

13、使用vim编辑文件password将全文中的：用/替换。

```
:%s/:/\//g
```

14、请将15-20行的flase替换成bash，替换前需要提示是否替换。

```
10,20s/false/bash/c
```

15、查找/etc目录下大于50K且类型为普通文件的所有文件。

```sh
 find /etc/ -size +50 -type f -exec ls -lh {} \;
```

16、新建myfind目录，查找/etc目录下以以a开头的文件，并且将这些文件复制到myfind目录下。

```sh
mkdir myfind
find /etc/ -name a* -exec cp {} /root/test/vim_test/myfind/ \;
```

17、查找myfind目录下以.conf结尾的所有文件，并且以列表的形式查看查询结果文件的大小。

```sh
 find myfind/ -name *.conf -exec ls -lh {} \;
```