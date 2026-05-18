[磁盘操作系统](https://baike.baidu.com/item/磁盘操作系统/3793138?fromModule=lemma_inlink)（Disk Operating System），是早期[个人计算机](https://baike.baidu.com/item/个人计算机/3731770?fromModule=lemma_inlink)上的一类[操作系统](https://baike.baidu.com/item/操作系统/192?fromModule=lemma_inlink)。

# Built-In Command

## help

## tree

## dir

## cd

```cmd
CHDIR [/D] [drive:][path]
CHDIR [..]
CD [/D] [drive:][path]
CD [..]

  键入 CD drive: 显示指定驱动器中的当前目录。
不带参数只键入 CD，则显示当前驱动器和目录。

使用 /D 开关，除了改变驱动器的当前目录之外，
还可改变当前驱动器。

如果命令扩展被启用，CHDIR 会如下改变:

当前的目录字符串会被转换成使用磁盘名上的大小写。所以，
如果磁盘上的大小写如此，CD C:\TEMP 会将当前目录设为
C:\Temp。

CHDIR 命令不把空格当作分隔符，因此有可能将目录名改为一个
带有空格但不带有引号的子目录名。例如:
cd \winnt\profiles\username\programs\start menu

chdir{change directory}
```

```cmd
cd. > my_app/middleware.py
#可以
```



## md

```cmd
MKDIR [drive:]path
MD [drive:]path
```

## rd

```cmd
help rd
#
删除一个目录。

RMDIR [/S] [/Q] [drive:]path
RD [/S] [/Q] [drive:]path

    /S      除目录本身外，还将删除指定目录下的所有子目录和
            文件。用于删除目录树。

    /Q      安静模式，带 /S 删除目录树时不要求确认
```

```cmd
rd templates\
#result
目录不是空的。
#cmd
rd /s templates\
```



## del

## type

```cmd
type "">./login/serializers.py
```



## echo

```cmd
ECHO 处于打开状态。
```

```cmd
help echo
#result
显示消息，或者启用或关闭命令回显。

  ECHO [ON | OFF]
  ECHO [message]

若要显示当前回显设置，请键入不带参数的 ECHO。
```

C:\Users\aa\Desktop\demo.bat

```bat
@echo off
chcp 65001
rem 以下是一些常用的变量
:: 另一种注释方式
echo 你好，我是你的电脑，我叫%computername%
exit 
:: 退出命令行
pause >nul
rem 暂停就无效啦
```

errorlevel

```cmd
#显示上次错误级别
echo %errorlevel%
```



## 重定向操作符

```cmd
>覆盖
>>追加
<
```

```cmd
di >right.txt 2>error.txt
```



## set

```cmd
显示、设置或删除 cmd.exe 环境变量。
SET [variable=[string]]
  variable  指定环境变量名。
  string    指定要指派给变量的一系列字符串。
要显示当前环境变量，键入不带参数的 SET。
如果命令扩展被启用，SET 会如下改变:
可仅用一个变量激活 SET 命令，等号或值不显示所有前缀匹配
SET 命令已使用的名称的所有变量的值。例如:
    SET P
会显示所有以字母 P 打头的变量
如果在当前环境中找不到该变量名称，SET 命令将把 ERRORLEVEL
设置成 1。
SET 命令不允许变量名含有等号。
在 SET 命令中添加了两个新命令行开关:
    SET /A expression
    SET /P variable=[promptString]
/A 命令行开关指定等号右边的字符串为被评估的数字表达式。该表达式
评估器很简单并以递减的优先权顺序支持下列操作:
    ()                  - 分组
    ! ~ -               - 一元运算符
    * / %               - 算数运算符
    + -                 - 算数运算符
    << >>               - 逻辑移位
    &                   - 按位“与”
    ^                   - 按位“异”
    |                   - 按位“或”
    = *= /= %= += -=    - 赋值
      &= ^= |= <<= >>=
    ,                   - 表达式分隔符

如果你使用任何逻辑或取余操作符， 你需要将表达式字符串用
引号扩起来。在表达式中的任何非数字字符串键作为环境变量
名称，这些环境变量名称的值已在使用前转换成数字。如果指定
了一个环境变量名称，但未在当前环境中定义，那么值将被定为
零。这使你可以使用环境变量值做计算而不用键入那些 % 符号
来得到它们的值。如果 SET /A 在命令脚本外的命令行执行的，
那么它显示该表达式的最后值。该分配的操作符在分配的操作符
左边需要一个环境变量名称。除十六进制有 0x 前缀，八进制
有 0 前缀的，数字值为十进位数字。因此，0x12 与 18 和 022
相同。请注意八进制公式可能很容易搞混: 08 和 09 是无效的数字，
因为 8 和 9 不是有效的八进制位数。(& )

/P 命令行开关允许将变量数值设成用户输入的一行输入。读取输入
行之前，显示指定的 promptString。promptString 可以是空的。

环境变量替换已如下增强:

    %PATH:str1=str2%

会扩展 PATH 环境变量，用 "str2" 代替扩展结果中的每个 "str1"。
要有效地从扩展结果中删除所有的 "str1"，"str2" 可以是空的。
"str1" 可以以星号打头；在这种情况下，"str1" 会从扩展结果的
开始到 str1 剩余部分第一次出现的地方，都一直保持相配。

也可以为扩展名指定子字符串。

    %PATH:~10,5%

会扩展 PATH 环境变量，然后只使用在扩展结果中从第 11 个(偏
移量 10)字符开始的五个字符。如果没有指定长度，则采用默认
值，即变量数值的余数。如果两个数字(偏移量和长度)都是负数，
使用的数字则是环境变量数值长度加上指定的偏移量或长度。

    %PATH:~-10%

会提取 PATH 变量的最后十个字符。

    %PATH:~0,-2%

会提取 PATH 变量的所有字符，除了最后两个。

终于添加了延迟环境变量扩充的支持。该支持总是按默认值被
停用，但也可以通过 CMD.EXE 的 /V 命令行开关而被启用/停用。
请参阅 CMD /?

考虑到读取一行文本时所遇到的目前扩充的限制时，延迟环境
变量扩充是很有用的，而不是执行的时候。以下例子说明直接
变量扩充的问题:

    set VAR=before
    if "%VAR%" == "before" (
        set VAR=after
        if "%VAR%" == "after" @echo If you see this, it worked
    )

不会显示消息，因为在读到第一个 IF 语句时，BOTH IF 语句中
的 %VAR% 会被代替；原因是: 它包含 IF 的文体，IF 是一个
复合语句。所以，复合语句中的 IF 实际上是在比较 "before" 和
"after"，这两者永远不会相等。同样，以下这个例子也不会达到
预期效果:

    set LIST=
    for %i in (*) do set LIST=%LIST% %i
    echo %LIST%

原因是，它不会在目前的目录中建立一个文件列表，而只是将
LIST 变量设成找到的最后一个文件。这也是因为 %LIST% 在
FOR 语句被读取时，只被扩充了一次；而且，那时的 LIST 变量
是空的。因此，我们真正执行的 FOR 循环是:

    for %i in (*) do set LIST= %i

这个循环继续将 LIST 设成找到的最后一个文件。

延迟环境变量扩充允许你使用一个不同的字符(惊叹号)在执行
时间扩充环境变量。如果延迟的变量扩充被启用，可以将上面
例子写成以下所示，以达到预期效果:

    set VAR=before
    if "%VAR%" == "before" (
        set VAR=after
        if "!VAR!" == "after" @echo If you see this, it worked
    )

    set LIST=
    for %i in (*) do set LIST=!LIST! %i
    echo %LIST%

如果命令扩展被启用，有几个动态环境变量可以被扩展，但不会出现在 SET 显示的变
量列表中。每次变量数值被扩展时，这些变量数值都会被动态计算。如果用户用这些
名称中任何一个明确定义变量，那个定义会替代下面描述的动态定义:

%CD% - 扩展到当前目录字符串。

%DATE% - 用跟 DATE 命令同样的格式扩展到当前日期。

%TIME% - 用跟 TIME 命令同样的格式扩展到当前时间。

%RANDOM% - 扩展到 0 和 32767 之间的任意十进制数字。

%ERRORLEVEL% - 扩展到当前 ERRORLEVEL 数值。

%CMDEXTVERSION% - 扩展到当前命令处理器扩展版本号。

%CMDCMDLINE% - 扩展到调用命令处理器的原始命令行。

%HIGHESTNUMANODENUMBER% - 扩展到此计算机上的最高 NUMA 节点号。
```

cmd

```cmd
set
```

result

```cmd
...
ProgramFiles=C:\Program Files #程序默认安装的路径
...
SystemRoot=C:\Windows #系统根目录
...
```

cmd

```cmd
set name=xxx
set name
```

result

```cmd
name=xxx
```

cmd

```cmd
set name=
set name
```

result

```cmd
环境变量 name 没有定义
```

cmd

```cmd
set /a 3+2*3
```

resault

```cmd
9
```

cmd

```cmd
set /a zz=4/3
```

result

```cmd
1
```

cmd

```cmd
set zz
```

result

```cmd
zz=1
```

cmd

```cmd
c:
cd C:\Users\aa\Desktop
type nul>demo.bat
```

C:\Users\aa\Desktop\demo.bat

```bat
@echo off
set /a za=4*5
echo %za%
pause >nul
```

<span title="clink叮当声">click</span>

![image-20231226005724812](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20231226005724812.png)

键入任意键就会关闭

C:\Users\aa\Desktop\demo.bat

```bat
@echo off
chcp 65001
set /p za=plesae enter a number(也可以是其他哦):
echo you 输入的number is: %za%
pause >nul
```

click

![image-20231226011408640](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20231226011408640.png)

![image-20231226011426716](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20231226011426716.png)

## copy

## mv

## exit

## goto

C:\Users\aa\Desktop\demo.bat

```bat
@echo off
chcp 65001
echo how old are you?
goto :input

:input
echo i am 2 years old
echo i am ready to exit
pause >nul
```

## start

```cmd
help start
#
启动一个单独的窗口以运行指定的程序或命令。

START ["title"] [/D path] [/I] [/MIN] [/MAX] [/SEPARATE | /SHARED]
      [/LOW | /NORMAL | /HIGH | /REALTIME | /ABOVENORMAL | /BELOWNORMAL]
      [/NODE <NUMA node>] [/AFFINITY <hex affinity mask>] [/WAIT] [/B]
      [/MACHINE <x86|amd64|arm|arm64>][command/program] [parameters]

    "title"     在窗口标题栏中显示的标题。
    path        启动目录。
    B           启动应用程序，但不创建新窗口。
                应用程序已忽略 ^C 处理。除非应用程序
                启用 ^C 处理，否则 ^Break 是唯一可以中断
                该应用程序的方式。
    I           新的环境将是传递
                给 cmd.exe 的原始环境，而不是当前环境。
    MIN         以最小化方式启动窗口。
    MAX         以最大化方式启动窗口。
    SEPARATE    在单独的内存空间中启动 16 位 Windows 程序。
    SHARED      在共享内存空间中启动 16 位 Windows 程序。
    LOW         在 IDLE 优先级类中启动应用程序。
    NORMAL      在 NORMAL 优先级类中启动应用程序。
    HIGH        在 HIGH 优先级类中启动应用程序。
    REALTIME    在 REALTIME 优先级类中启动应用程序。
    ABOVENORMAL 在 ABOVENORMAL 优先级类中启动应用程序。
    BELOWNORMAL 在 BELOWNORMAL 优先级类中启动应用程序。
    NODE        将首选非一致性内存结构(NUMA)
                节点指定为十进制整数。
    AFFINITY    将处理器关联掩码指定为十六进制数字。
                进程被限制在这些处理器上运行。

                将 /AFFINITY 和
                 /NODE 结合使用时，会对关联掩码进行不同的解释。指定关联掩码，就将 NUMA
                节点的处理器掩码向右移位以从零位开始一样。
                进程被限制在指定关联掩码和 NUMA 节点之间的
                那些通用处理器上运行。
                如果没有通用处理器，则进程被限制在
                指定的 NUMA 节点上运行。
    WAIT        启动应用程序并等待它终止。
    MACHINE     指定应用程序进程的系统架构。

    command/program
                如果它是内部 cmd 命令或批文件，则
                该命令处理器是使用 cmd.exe 的 /K 开关运行的。
                这表示运行命令
                之后，该窗口将仍然存在。

                如果它不是内部 cmd 命令或批处理文件，则
                它就是一个程序，并将作为一个窗口化应用程序或
                控制台应用程序运行。

    parameters  这些是传递给 command/program 的参数。

注意: 在 64 位平台上不支持 SEPARATE 和 SHARED 选项。

通过指定 /NODE，可按照利用 NUMA 系统中的内存
区域的方式创建进程。例如，可以创建两个完全通过共享内存互相
通信的进程以共享相同的
首选 NUMA 节点，从而最大限度地减少内存延迟。只要有可能，它们就会分配
来自相同 NUMA 节点的内存，并且会在指定节点之外的
处理器上自由运行。

    start /NODE 1 application1.exe
    start /NODE 1 application2.exe

这两个进程可被进一步限制
在相同 NUMA 节点内的指定处理器上运行。在以下示例中，application1 在节点的两个
低位处理器上运行，而 application2在该节点的其后两个
处理器上运行。该示例假定指定节点至少具有
四个逻辑处理器。请注意，节点号可更改为该计算机的任何有效
节点号，而无需更改关联掩码。

    start /NODE 1 /AFFINITY 0x3 application1.exe
    start /NODE 1 /AFFINITY 0xc application2.exe

如果命令扩展被启用，通过命令行或 START 命令的外部命令
调用会如下改变:

将文件名作为命令键入，非可执行文件可以通过文件关联调用。
    (例如，WORD.DOC 会调用跟 .DOC 文件扩展名关联的应用程序)。
    关于如何从命令脚本内部创建这些关联，请参阅 ASSOC 和
     FTYPE 命令。

执行的应用程序是 32 位 GUI 应用程序时，CMD.EXE 不等应用
    程序终止就返回命令提示符。如果在命令脚本内执行，该新行为
    则不会发生。

如果执行的命令行的第一个符号是不带扩展名或路径修饰符的
    字符串 "CMD"，"CMD" 会被 COMSPEC 变量的数值所替换。这
    防止从当前目录提取 CMD.EXE。

如果执行的命令行的第一个符号没有扩展名，CMD.EXE 会使用
    PATHEXT 环境变量的数值来决定要以什么顺序寻找哪些扩展
    名。PATHEXT 变量的默认值是:

        .COM;.EXE;.BAT;.CMD

    请注意，该语法跟 PATH 变量的一样，分号隔开不同的元素。

查找可执行文件时，如果没有相配的扩展名，看一看该名称是否
与目录名相配。如果确实如此，START 会在那个路径上调用
Explorer。如果从命令行执行，则等同于对那个路径作 CD /D。
```

```cmd
start c:
start /max c:windows
```

## call

C:\Users\aa\Desktop\main.bat

```bat
@echo off
call demo.bat
rem 因为在同一path下，所以可以直接调用
```

## sort

```cmd
help sort
#
SORT [/R] [/+n] [/M kilobytes] [/L locale] [/REC recordbytes]
  [[drive1:][path1]filename1] [/T [drive2:][path2]]
  [/O [drive3:][path3]filename3]
  /+n                         Specifies the character number, n, to
                              begin each comparison.  /+3 indicates that
                              each comparison should begin at the 3rd
                              character in each line.  Lines with fewer
                              than n characters collate before other lines.
                              By default comparisons start at the first
                              character in each line.
  /L[OCALE] locale            Overrides the system default locale with
                              the specified one.  The ""C"" locale yields
                              the fastest collating sequence and is
                              currently the only alternative.  The sort
                              is always case insensitive.
  /M[EMORY] kilobytes         Specifies amount of main memory to use for
                              the sort, in kilobytes.  The memory size is
                              always constrained to be a minimum of 160
                              kilobytes.  If the memory size is specified
                              the exact amount will be used for the sort,
                              regardless of how much main memory is
                              available.

                              The best performance is usually achieved by
                              not specifying a memory size.  By default the
                              sort will be done with one pass (no temporary
                              file) if it fits in the default maximum
                              memory size, otherwise the sort will be done
                              in two passes (with the partially sorted data
                              being stored in a temporary file) such that
                              the amounts of memory used for both the sort
                              and merge passes are equal.  The default
                              maximum memory size is 90% of available main
                              memory if both the input and output are
                              files, and 45% of main memory otherwise.
  /REC[ORD_MAXIMUM] characters 指定记录中的最大字符数量
                              (默认值为 4096，最大值为 65535)。
  /R[EVERSE]                  颠倒排列顺序，即，从 Z 到 A，再从 9 到 0。
  [drive1:][path1]filename1   指定要排序的文件。如果没有指定，则排序标准
                              输入。指定输入文件比将同一个文件重定向为标
                              准输入快。
  /T[EMPORARY]
    [drive2:][path2]          指定保留排序工作存储的目录路径，以防主内
                              存无法容纳数据。默认值是使用系统临时目录。
  /O[UTPUT]
    [drive3:][path3]filename3 指定在哪个文件中储存经过排序的输入。
                              如果没有指定，数据会被写入标准输出。指定
                              输出文件比将标准输出重定向到同一个文件快。
```

## shutdow

```cmd
help shutdow
#
用法: shutdown [/i | /l | /s | /sg | /r | /g | /a | /p | /h | /e | /o] [/hybrid] [/soft] [/fw] [/f]
    [/m \\computer][/t xxx][/d [p|u:]xx:yy [/c "comment"]]

    没有参数   显示帮助。这与键入 /? 是一样的。
    /?         显示帮助。这与不键入任何选项是一样的。
    /i         显示图形用户界面(GUI)。
               这必须是第一个选项。
    /l         注销。这不能与 /m 或 /d 选项一起使用。
    /s         关闭计算机。
    /sg        关闭计算机。在下一次启动时，如果启用了
               自动重启登录，则将自动登录并锁定上次交互用户。
               登录后，重启任何已注册的应用程序。
    /r         完全关闭并重启计算机。
    /g         完全关闭并重启计算机。重新启动系统后，
               如果启用了自动重启登录，则将自动登录并
               锁定上次交互用户。
               登录后，重启任何已注册的应用程序。
    /a         中止系统关闭。
               这只能在超时期间使用。
               与 /fw 结合使用，以清除任何未完成的至固件的引导。
    /p         关闭本地计算机，没有超时或警告。
               可以与 /d 和 /f 选项一起使用。
    /h         休眠本地计算机。
               可以与 /f 选项一起使用。
    /hybrid    执行计算机关闭并进行准备以快速启动。
               必须与 /s 选项一起使用。
    /fw        与关闭选项结合使用，使下次启动转到
               固件用户界面。
    /e         记录计算机意外关闭的原因。
    /o         转到高级启动选项菜单并重新启动计算机。
               必须与 /r 选项一起使用。
    /m \\computer 指定目标计算机。
    /t xxx     将关闭前的超时时间设置为 xxx 秒。
               有效范围是 0-315360000 (10 年)，默认值为 30。
               如果超时期限大于 0，则 /f 参数为
               /f 参数。
    /c "comment" 注释重启或关闭的原因。
               最多允许 512 个字符。
    /f         强制关闭正在运行的应用程序而不事先警告用户。
               当大于 0 的值为
 时，隐含 /f 参数               则默示为 /f 参数。
    /d [p|u:]xx:yy  提供重新启动或关闭的原因。
               p 指示重启或关闭是计划内的。
               u 指示原因是用户定义的。
               如果未指定 p 和 u，则
重新启动或关闭               是计划外的。
               xx 是主要原因编号(小于 256 的正整数)。
               yy 是次要原因编号(小于 65536 的正整数)。

此计算机上的原因:
(E = 预期 U = 意外 P = 计划内，C = 自定义)
类别    主要    次要    标题

 U      0       0       其他(计划外)
E       0       0       其他(计划外)
E P     0       0       其他(计划内)
 U      0       5       其他故障: 系统没有反应
E       1       1       硬件: 维护(计划外)
E P     1       1       硬件: 维护(计划内)
E       1       2       硬件: 安装(计划外)
E P     1       2       硬件: 安装(计划内)
E       2       2       操作系统: 恢复(计划外)
E P     2       2       操作系统: 恢复(计划内)
  P     2       3       操作系统: 升级(计划内)
E       2       4       操作系统: 重新配置(计划外)
E P     2       4       操作系统: 重新配置(计划内)
  P     2       16      操作系统: Service Pack (计划内)
        2       17      操作系统: 热修补(计划外)
  P     2       17      操作系统: 热修补(计划内)
        2       18      操作系统: 安全修补(计划外)
  P     2       18      操作系统: 安全修补(计划内)
E       4       1       应用程序: 维护(计划外)
E P     4       1       应用程序: 维护(计划内)
E P     4       2       应用程序: 安装(计划内)
E       4       5       应用程序: 没有反应
E       4       6       应用程序: 不稳定
 U      5       15      系统故障: 停止错误
 U      5       19      安全问题(计划外)
E       5       19      安全问题(计划外)
E P     5       19      安全问题(计划内)
E       5       20      网络连接丢失(计划外)
 U      6       11      电源故障: 电线被拔掉
 U      6       12      电源故障: 环境
  P     7       0       旧版 API 关机
```

```cmd
shutdown /r -t 120
shutdown /a
shutdown /i
```

## 特殊字符

```cmd
|
#管道符 将第一条命令的结果作为第二条命令的参数来使用
dir ..\Desktop\ | find "bat"
```

```cmd
&
#第一条命令执行失败，后面的命令也会继续执行
dir z:\ & dir d:\
```

```cmd
&&
#第一条命令执行失败，后面的命令不会继续执行
dir z:\ && dir d:\
```

```cmd
||
#第一条命令执行失败，后面的命令才会继续执行
dir z:\ || dir d:\
```

```cmd
()
@echo off
@REM echo 1 & echo 2 & echo 3
(
    echo 1
    echo 2
    echo 3
)
pause >nul
```



# external command

```md
外部命名更容易改名
```

## ping.exe

```cmd
#cmd
ping
#or 
ping /?
#result
用法: ping [-t] [-a] [-n count] [-l size] [-f] [-i TTL] [-v TOS]
            [-r count] [-s count] [[-j host-list] | [-k host-list]]
            [-w timeout] [-R] [-S srcaddr] [-c compartment] [-p]
            [-4] [-6] target_name

选项:
    -t             Ping 指定的主机，直到停止。
                   若要查看统计信息并继续操作，请键入 Ctrl+Break；
                   若要停止，请键入 Ctrl+C。
    -a             将地址解析为主机名。
    -n count       要发送的回显请求数。
    -l size        发送缓冲区大小。
    -f             在数据包中设置“不分段”标记(仅适用于 IPv4)。
    -i TTL         生存时间。
    -v TOS         服务类型(仅适用于 IPv4。该设置已被弃用，
                   对 IP 标头中的服务类型字段没有任何
                   影响)。
    -r count       记录计数跃点的路由(仅适用于 IPv4)。
    -s count       计数跃点的时间戳(仅适用于 IPv4)。
    -j host-list   与主机列表一起使用的松散源路由(仅适用于 IPv4)。
    -k host-list    与主机列表一起使用的严格源路由(仅适用于 IPv4)。
    -w timeout     等待每次回复的超时时间(毫秒)。
    -R             同样使用路由标头测试反向路由(仅适用于 IPv6)。
                   根据 RFC 5095，已弃用此路由标头。
                   如果使用此标头，某些系统可能丢弃
                   回显请求。
    -S srcaddr     要使用的源地址。
    -c compartment 路由隔离舱标识符。
    -p             Ping Hyper-V 网络虚拟化提供程序地址。
    -4             强制使用 IPv4。
    -6             强制使用 IPv6。
```

### ping <span title="目标">target</span>_name

```cmd
#cmd
ping www.baidu.com
#result
正在 Ping www.baidu.com [183.2.172.185] 具有 32 字节的数据:
来自 183.2.172.185 的回复: 字节=32 时间=23ms TTL=52
来自 183.2.172.185 的回复: 字节=32 时间=23ms TTL=52
来自 183.2.172.185 的回复: 字节=32 时间=26ms TTL=52
来自 183.2.172.185 的回复: 字节=32 时间=39ms TTL=52

183.2.172.185 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 23ms，最长 = 39ms，平均 = 27ms

#cmd
ping 192.168.1.1
#result
正在 Ping 192.168.1.1 具有 32 字节的数据:
请求超时。
请求超时。
请求超时。
请求超时。

192.168.1.1 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 0，丢失 = 4 (100% 丢失)，
```

### ping -a target_name

```cmd
#cmd
ipconfig
#result
...
无线局域网适配器 WLAN:
	...
   IPv4 地址 . . . . . . . . . . . . : 10.16.19.37

#cmd
ping -a 10.16.19.37
#result
正在 Ping LAPTOP-UPIMBQFR [10.16.19.37] 具有 32 字节的数据:
来自 10.16.19.37 的回复: 字节=32 时间<1ms TTL=128
...

#cmd
hostname
#result
LAPTOP-UPIMBQFR
```

## ipconfig.exe

```cmd
Windows IP 配置


以太网适配器 VirtualBox Host-Only Network:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::e62c:7f5c:7931:2e37%18
   IPv4 地址 . . . . . . . . . . . . : 192.168.56.1
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . :

无线局域网适配器 本地连接* 1:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

无线局域网适配器 本地连接* 2:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . :

以太网适配器 VMware Network Adapter VMnet1:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::abac:b4e8:f70f:55c7%17
   IPv4 地址 . . . . . . . . . . . . : 192.168.42.1
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . :

以太网适配器 VMware Network Adapter VMnet8:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::4dfa:1df6:8ee2:5cf8%9
   IPv4 地址 . . . . . . . . . . . . : 192.168.30.1
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . :

无线局域网适配器 WLAN:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::8e70:8837:ba12:8274%10
   IPv4 地址 . . . . . . . . . . . . : 10.16.19.37
   子网掩码  . . . . . . . . . . . . : 255.255.0.0
   默认网关. . . . . . . . . . . . . : 10.16.255.254
```

```cmd
#
ipconfig.exe /?
#
用法:
    ipconfig [/allcompartments] [/? | /all |
                                 /renew [adapter] | /release [adapter] |
                                 /renew6 [adapter] | /release6 [adapter] |
                                 /flushdns | /displaydns | /registerdns |
                                 /showclassid adapter |
                                 /setclassid adapter [classid] |
                                 /showclassid6 adapter |
                                 /setclassid6 adapter [classid] ]

其中
    adapter             连接名称
                       (允许使用通配符 * 和 ?，参见示例)

    选项:
       /?               显示此帮助消息
       /all             显示完整配置信息。
       /release         释放指定适配器的 IPv4 地址。
       /release6        释放指定适配器的 IPv6 地址。
       /renew           更新指定适配器的 IPv4 地址。
       /renew6          更新指定适配器的 IPv6 地址。
       /flushdns        清除 DNS 解析程序缓存。
       /registerdns     刷新所有 DHCP 租用并重新注册 DNS 名称
       /displaydns      显示 DNS 解析程序缓存的内容。
       /showclassid     显示适配器允许的所有 DHCP 类 ID。
       /setclassid      修改 DHCP 类 ID。
       /showclassid6    显示适配器允许的所有 IPv6 DHCP 类 ID。
       /setclassid6     修改 IPv6 DHCP 类 ID。


默认情况下，仅显示绑定到 TCP/IP 的每个适配器的 IP 地址、子网掩码和
默认网关。

对于 Release 和 Renew，如果未指定适配器名称，则会释放或更新所有绑定
到 TCP/IP 的适配器的 IP 地址租用。

对于 Setclassid 和 Setclassid6，如果未指定 ClassId，则会删除 ClassId。

示例:
    > ipconfig                       ... 显示信息
    > ipconfig /all                  ... 显示详细信息
    > ipconfig /renew                ... 更新所有适配器
    > ipconfig /renew EL*            ... 更新所有名称以 EL 开头
                                         的连接
    > ipconfig /release *Con*        ... 释放所有匹配的连接，
                                         例如“有线以太网连接 1”或
                                             “有线以太网连接 2”
    > ipconfig /allcompartments      ... 显示有关所有隔离舱的
                                         信息
    > ipconfig /allcompartments /all ... 显示有关所有隔离舱的
                                         详细信息
```

## netstat.exe

```cmd
netstat -ano
netstat -ano | findstr TCP
```



## control.exe

## telnet

```md
常被用于黑客，所以默认不开启
开启方法：
control
程序
启用或关闭windows功能
```

![image-20231227103627807](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20231227103627807.png)

```cmd
telnet /?
#
telnet [-a][-e escape char][-f log file][-l user][-t term][host [port]]
 -a      企图自动登录。除了用当前已登陆的用户名以外，与 -l 选项相同。
 -e      跳过字符来进入 telnet 客户端提示。
 -f      客户端登录的文件名
 -l      指定远程系统上登录用的用户名。
         要求远程系统支持 TELNET ENVIRON 选项。
 -t      指定终端类型。
         支持的终端类型仅是: vt100, vt52, ansi 和 vtnt。
 host    指定要连接的远程计算机的主机名或 IP 地址。
 port    指定端口号或服务名。
```

```cmd
telnet www.baidu.com 80
telnet www.baidu.com 23 #这个是没有开的端口

```



## mstsc

# beautify

## Built-In

### title

```cmd
Sets the window title for the command prompt window.

TITLE [string]

  string       Specifies the title for the command prompt window.
prompt{提示}
Specifies{指定}
```

![image-20231226012508586](C:\Users\aa\AppData\Roaming\Typora\typora-user-images\image-20231226012508586.png)

### mode.com

```cmd
Configures system devices.

Serial port:       MODE COMm[:] [BAUD=b] [PARITY=p] [DATA=d] [STOP=s]
                                [to=on|off] [xon=on|off] [odsr=on|off]
                                [octs=on|off] [dtr=on|off|hs]
                                [rts=on|off|hs|tg] [idsr=on|off]

Device Status:     MODE [device] [/STATUS]

Redirect printing: MODE LPTn[:]=COMm[:]

Select code page:  MODE CON[:] CP SELECT=yyy

Code page status:  MODE CON[:] CP [/STATUS]

Display mode:      MODE CON[:] [COLS=c] [LINES=n]

Typematic rate:    MODE CON[:] [RATE=r DELAY=d]
```

cmd

```cmd
mode
```

result

```cmd
Status for device CON:
----------------------
    Lines:          33
    Columns:        99
    Keyboard rate:  31
    Keyboard delay: 1
    Code page:      65001
device{设备}
Columns{列}
rate{速率,率}
delay{延迟}
936~GBK
```

### color

```cmd
Sets the default console foreground and background colors.


COLOR [attr]

  attr        Specifies color attribute of console output


Color attributes are specified by TWO hex digits -- the first
corresponds to the background; the second the foreground.  Each digit
can be any of the following values:





    0 = Black       8 = Gray
    1 = Blue        9 = Light Blue
    2 = Green       A = Light Green
    3 = Aqua        B = Light Aqua
    4 = Red         C = Light Red
    5 = Purple      D = Light Purple
    6 = Yellow      E = Light Yellow
If no argument is given, this command restores the color to what it was
when CMD.EXE started.  This value either comes from the current console
window, the /T command line switch or from the DefaultColor registry
The COLOR command sets ERRORLEVEL to 1 if an attempt is made to execute
the COLOR command with a foreground and background color that are the
```



## external
