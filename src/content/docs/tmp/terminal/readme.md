# shell

shell={GUI, CLI, ...}
<table>
<thead>
<tr>
<th align="left">PowerShell（命令行）</th><th align="center">PowerShell（别名）</th>
<th align="center"><a href="https://zh.wikipedia.org/wiki/%E5%91%BD%E4%BB%A4%E6%8F%90%E7%A4%BA%E7%AC%A6" rel="nofollow">命令提示符</a></th>
<th align="center"><a href="https://zh.wikipedia.org/wiki/Unix_shell" rel="nofollow">Unix shell</a></th><th align="center">描述</th></tr></thead><tbody><tr><td align="left">Get-ChildItem</td><td align="center">gci, dir, ls</td><td align="center"><a href="https://zh.wikipedia.org/wiki/Dir_%28%E5%91%BD%E4%BB%A4%29" rel="nofollow">dir</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/Ls" rel="nofollow">ls</a></td><td align="center">列出目前或指定文件夹中的所有文件和文件夹</td></tr><tr><td align="left">Test-Connection[<a href="https://zh.wikipedia.org/wiki/PowerShell#cite_note-8" rel="nofollow">a]</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/Ping" rel="nofollow">ping</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/Ping" rel="nofollow">ping</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/Ping" rel="nofollow">ping</a></td><td align="center">从目前电脑向指定电脑发送<a href="https://zh.wikipedia.org/wiki/Ping" rel="nofollow">Ping</a>，或指示另一台电脑这样做</td></tr><tr><td align="left">Get-Content</td><td align="center">gc, type, cat</td><td align="center"><a href="https://zh.wikipedia.org/w/index.php?title=TYPE_%28DOS_command%29&amp;action=edit&amp;redlink=1" rel="nofollow">type</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/Cat_%28Unix%29" rel="nofollow">cat</a></td><td align="center">获取文件内容</td></tr><tr><td align="left">Get-Command</td><td align="center">gcm</td><td align="center"><a href="https://zh.wikipedia.org/w/index.php?title=Help_%28command%29&amp;action=edit&amp;redlink=1" rel="nofollow">help</a></td><td align="center"><a href="https://zh.wikipedia.org/w/index.php?title=Type_%28Unix%29&amp;action=edit&amp;redlink=1" rel="nofollow">type</a>, <a href="https://zh.wikipedia.org/w/index.php?title=Which_%28command%29&amp;action=edit&amp;redlink=1" rel="nofollow">which</a>, <a href="https://zh.wikipedia.org/w/index.php?title=Compgen_%28Unix%29&amp;action=edit&amp;redlink=1" rel="nofollow">compgen</a></td><td align="center">列出可用的命令</td></tr><tr><td align="left">Get-Help</td><td align="center">help, man</td><td align="center"><a href="https://zh.wikipedia.org/w/index.php?title=Help_%28command%29&amp;action=edit&amp;redlink=1" rel="nofollow">help</a></td><td align="center"><a href="https://zh.wikipedia.org/w/index.php?title=Apropos_%28Unix%29&amp;action=edit&amp;redlink=1" rel="nofollow">apropos</a>, <a href="https://zh.wikipedia.org/wiki/%E6%89%8B%E5%86%8C%E9%A1%B5" rel="nofollow">man</a></td><td align="center">在控制台上打印命令的文档</td></tr><tr><td align="left">Clear-Host</td><td align="center">cls, clear</td><td align="center"><a href="https://zh.wikipedia.org/w/index.php?title=Cls_%28computing%29&amp;action=edit&amp;redlink=1" rel="nofollow">cls</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/Clear_%28Unix%29" rel="nofollow">clear</a></td><td align="center">清除屏幕[<a href="https://zh.wikipedia.org/wiki/PowerShell#cite_note-9" rel="nofollow">b]</a></td></tr><tr><td align="left">Copy-Item</td><td align="center">cpi, copy, cp</td><td align="center"><a href="https://zh.wikipedia.org/wiki/Copy_%28%E5%91%BD%E4%BB%A4%29" rel="nofollow">copy</a>, <a href="https://zh.wikipedia.org/w/index.php?title=Xcopy&amp;action=edit&amp;redlink=1" rel="nofollow">xcopy</a>, <a href="https://zh.wikipedia.org/w/index.php?title=Robocopy&amp;action=edit&amp;redlink=1" rel="nofollow">robocopy</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/Cp_%28Unix%29" rel="nofollow">cp</a></td><td align="center">将文件和文件夹复制到另一个位置</td></tr><tr><td align="left">Move-Item</td><td align="center">mi, move, mv</td><td align="center"><a href="https://zh.wikipedia.org/w/index.php?title=Move_%28command%29&amp;action=edit&amp;redlink=1" rel="nofollow">move</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/Mv_%28Unix%29" rel="nofollow">mv</a></td><td align="center">将文件和文件夹移动到新位置</td></tr><tr><td align="left">Remove-Item</td><td align="center">ri, del, erase, rmdir, rd, rm</td><td align="center"><a href="https://zh.wikipedia.org/w/index.php?title=Del_%28command%29&amp;action=edit&amp;redlink=1" rel="nofollow">del</a>, <a href="https://zh.wikipedia.org/w/index.php?title=Del_%28command%29&amp;action=edit&amp;redlink=1" rel="nofollow">erase</a>, <a href="https://zh.wikipedia.org/wiki/Rmdir" rel="nofollow">rmdir</a>, <a href="https://zh.wikipedia.org/wiki/Rmdir" rel="nofollow">rd</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/Rm_%28Unix%29" rel="nofollow">rm</a>, rmdir</td><td align="center">删除文件或文件夹</td></tr><tr><td align="left">Rename-Item</td><td align="center">rni, ren, mv</td><td align="center"><a href="https://zh.wikipedia.org/w/index.php?title=Ren_%28command%29&amp;action=edit&amp;redlink=1" rel="nofollow">ren</a>, rename</td><td align="center"><a href="https://zh.wikipedia.org/wiki/Mv_%28Unix%29" rel="nofollow">mv</a></td><td align="center">重命名单个文件、文件夹、硬链接或符号链接</td></tr><tr><td align="left">Get-Location</td><td align="center">gl, cd, pwd</td><td align="center"><a href="https://zh.wikipedia.org/wiki/Cd_%28%E5%91%BD%E4%BB%A4%29" rel="nofollow">cd</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/Pwd" rel="nofollow">pwd</a></td><td align="center">显示工作路径（目前文件夹）</td></tr><tr><td align="left">Pop-Location</td><td align="center">popd</td><td align="center"><a href="https://zh.wikipedia.org/w/index.php?title=Pushd_and_popd&amp;action=edit&amp;redlink=1" rel="nofollow">popd</a></td><td align="center">popd</td><td align="center">将工作路径更改为最近推送到堆栈上的位置</td></tr><tr><td align="left">Push-Location</td><td align="center">pushd</td><td align="center"><a href="https://zh.wikipedia.org/w/index.php?title=Pushd_and_popd&amp;action=edit&amp;redlink=1" rel="nofollow">pushd</a></td><td align="center">pushd</td><td align="center">将工作路径存储到堆栈中</td></tr><tr><td align="left">Set-Location</td><td align="center">sl, cd, chdir</td><td align="center"><a href="https://zh.wikipedia.org/wiki/Cd_%28%E5%91%BD%E4%BB%A4%29" rel="nofollow">cd</a>, <a href="https://zh.wikipedia.org/wiki/Cd_%28%E5%91%BD%E4%BB%A4%29" rel="nofollow">chdir</a></td><td align="center">cd</td><td align="center">改变工作路径</td></tr><tr><td align="left">Tee-Object</td><td align="center">tee</td><td align="center">不适用</td><td align="center"><a href="https://zh.wikipedia.org/wiki/Tee" rel="nofollow">tee</a></td><td align="center">将输入管道传输到文件或变量，并沿管道传递输入</td></tr><tr><td align="left">Write-Output</td><td align="center">echo, write</td><td align="center"><a href="https://zh.wikipedia.org/wiki/Echo_%28%E5%91%BD%E4%BB%A4%29" rel="nofollow">echo</a></td><td align="center">echo</td><td align="center">将字符串或其他对像打印到<a href="https://zh.wikipedia.org/wiki/%E6%A8%99%E6%BA%96%E4%B8%B2%E6%B5%81" rel="nofollow">标准流</a></td></tr><tr><td align="left">Get-Process</td><td align="center">gps, ps</td><td align="center">tlist,[<a href="https://zh.wikipedia.org/wiki/PowerShell#cite_note-Available_tlist_kill-10" rel="nofollow">c]</a> <a href="https://zh.wikipedia.org/w/index.php?title=Tasklist&amp;action=edit&amp;redlink=1" rel="nofollow">tasklist</a>[<a href="https://zh.wikipedia.org/wiki/PowerShell#cite_note-Available_tasklist_taskkill-11" rel="nofollow">d]</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/Ps_%28Unix%29" rel="nofollow">ps</a></td><td align="center">列出所有正在执行的进程</td></tr><tr><td align="left">Stop-Process</td><td align="center">spps, kill</td><td align="center"><a href="https://zh.wikipedia.org/w/index.php?title=Kill_%28command%29&amp;action=edit&amp;redlink=1" rel="nofollow">kill</a>,[<a href="https://zh.wikipedia.org/wiki/PowerShell#cite_note-Available_tlist_kill-10" rel="nofollow">c]</a> <a href="https://zh.wikipedia.org/wiki/Kill_%28%E5%91%BD%E4%BB%A4%29" rel="nofollow">taskkill</a>[<a href="https://zh.wikipedia.org/wiki/PowerShell#cite_note-Available_tasklist_taskkill-11" rel="nofollow">d]</a></td><td align="center">kill[<a href="https://zh.wikipedia.org/wiki/PowerShell#cite_note-UNIX_kill_misnomer-12" rel="nofollow">e]</a></td><td align="center">停止正在执行的进程</td></tr><tr><td align="left">Select-String</td><td align="center">sls</td><td align="center"><a href="https://zh.wikipedia.org/wiki/Findstr" rel="nofollow">findstr</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/Find" rel="nofollow">find</a>, <a href="https://zh.wikipedia.org/wiki/Grep" rel="nofollow">grep</a></td><td align="center">打印与模式匹配的行</td></tr><tr><td align="left">Set-Variable</td><td align="center">sv, set</td><td align="center"><a href="https://zh.wikipedia.org/w/index.php?title=Environment_variable&amp;action=edit&amp;redlink=1" rel="nofollow">set</a></td><td align="center">env, export, set, setenv</td><td align="center">创建或更改<a href="https://zh.wikipedia.org/wiki/%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F" rel="nofollow">环境变量</a>的内容</td></tr><tr><td align="left">Invoke-WebRequest</td><td align="center">iwr, curl, wget[<a href="https://zh.wikipedia.org/wiki/PowerShell#cite_note-13" rel="nofollow">f]</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/CURL" rel="nofollow">curl</a></td><td align="center"><a href="https://zh.wikipedia.org/wiki/Wget" rel="nofollow">wget</a>, curl</td><td align="center">获取互联网上的网页内容</td></tr></tbody>
</table>

## 0shortcut key

### 0.0常用

Tab 键 -- 命令、文件名等补全。

Ctrl + c -- 取消当前行输入的命令，相当于 Ctrl + Break。

Ctrl + Z -- 后端运行,把当前的程序挂起

```md
比如你正在mysql终端中，需要出来搞点其他的文件操作，又不想退出mysql终端（因为下次还得输入用户名密码进入，挺麻烦），于是可以ctrl+z将mysql挂起，然后进行其他操作，
然后输入fg回车后就可以回来，当然可以挂起好多进程到后台，
后fg 加编号就能把挂起的进程返回到前台。
当然，配合bg和fg命令进行前后台切换会非常方便。
```

Ctrl + l -- 清屏，相当于执行 clear 命令。

Ctrl + s -- 暂停当前终端

Ctrl + q -- 恢复当前终端



Ctrl + a -- 光标移动到行首（Beginning of line），等同 Home 键。

Ctrl + e -- 光标移动到行尾（End of line），等同 End 键。

Alt + f -- 光标向前（Forward）移动到下一个单词。

Alt + b -- 光标往回（Backward）移动到前一个单词。



Ctrl + u -- 删除光标所在位置左边与行首之间的所有字符。

Ctrl + k -- 删除光标所在位置与行尾之间的所有字符。

Ctrl + w -- 删除光标所在位置前任意个空格及其前的一个单词，或光标所在位置左边至所在单词首的所有字符。

Alt + d -- 删除光标所在位置后任意个空格及其后的一个单词，或光标所在位置至所在单词尾的所有字符。

Ctrl + y -- 复制你上一次删除或剪切的条目。



Alt + u -- 转换光标所在位置后的一个单词为大写，或光标所在单词位置至此单词尾的字母为大写。

Alt + l -- 转换光标所在位置后的一个单词为小写，或光标所在单词位置至此单词尾的字母为小写。



Alt + . -- 在光标处输入最近历史命令的最后一个字符串，如果此命令只有单个字符串，则输入此字符串。可持续使用以持续切换为更前的命令。



Ctrl + r -- 依据用户在：提示符后的输入字符串匹配查找 history 记录中命令条目。

Ctrl + g -- 从历史搜索模式（Ctrl + r）退出。



!num -- 执行 history 记录中第 num 条命令条目，num 正整数时，为正序；负数时，为反序。

!string:p -- 输出最近的以 string 开头的命令条目。等同 !?string?。

### 0.1控制命令

Ctrl + c -- 取消当前行输入的命令，相当于Ctrl + Break。

Ctrl + s -- 暂停当前终端。

Ctrl + q -- 恢复当前终端。

Ctrl + z -- 后端运行。

Ctrl + l -- 清空屏幕并重新显示当前命令行内容。



[Ctrl] + [Alt] + [Delete] -- 关机并重新引导系统。在正常关机步骤不起作用时，可使用此方式。

[Ctrl] + [Alt] + [Fn] / [Alt] + [Fn] -- 切换虚拟终端。默认， [F1]至[F6] 是命令行终端， [F7] 是 X 终端。

[Alt] + [Tab] -- 在图形化桌面环境中切换任务。

[Ctrl] + [Alt] + [Backspace] -- 杀死当前的 X 会话，返回到登录会话。如果正常退出步骤不起作用，你可以使用这种方法。

### 0.2编辑命令

Tab 键 -- 命令、文件名等补全。

Ctrl + d -- 删除一个字符，即 Delete 键(命令行若无字符，相当于exit，处理多行标准输入时也表示 EOF)。

Ctrl + h -- 退格删除一个字符，即 Backspace 键。

Ctrl + u -- 删除光标所在位置左边与行首之间的所有字符。

Ctrl + k -- 删除光标所在位置与行尾之间的所有字符。

Ctrl + w -- 删除光标所在位置前任意个空格及其前的一个单词，或光标所在位置左边至所在单词首的所有字符。

Alt + d -- 删除光标所在位置后任意个空格及其后的一个单词，或光标所在位置至所在单词尾的所有字符。

Ctrl + y -- 复制你上一次删除或剪切的条目。

Ctrl + t -- 光标处在行尾，则交换前两个字符的位置；否则交换光标处字符与前一字符位置，并且光标向右移动单个字符位置。

Alt + t -- 依据光标所在位置，交换其所处单词和前一个单词的位置；交换其前后两个单词的位置；交换其前最后两个单词的位置（注意空格位置的变化）。

Alt + u -- 转换光标所在位置后的一个单词为大写，或光标所在单词位置至此单词尾的字母为大写。

Alt + l -- 转换光标所在位置后的一个单词为小写，或光标所在单词位置至此单词尾的字母为小写。

Alt + . -- 在光标处输入最近历史命令的最后一个字符串，如果此命令只有单个字符串，则输入此字符串。可持续使用以持续切换为更前的命令。

Ctrl + - -- 依次撤销命令行除添加字符的首次修改及其后的所有修改，否则恢复到空行。等同 Ctrl + x + u。

Ctrl + x + u -- 按住 Ctrl 的同时再先后按 x 和 u，依次撤销命令行除添加字符的首次修改及其后的所有修改，否则恢复到空行。等同 Ctrl + -。

### 0.3移动光标

Ctrl + a -- 光标移动到行首（Ahead of line），即 Home 键。

Ctrl + e -- 光标移动到行尾（End of line），即 End 键。

Ctrl + xx -- 光标在输入的命令行首与行尾切换跳转。

Ctrl + f -- 光标向前（Forward）/右移动一个字符位置。

Ctrl + b -- 光标往回（Backward）/左移动一个字符位置。

Alt + f -- 光标向前（Forward）移动到下一个单词。

Alt + b -- 光标往回（Backward）移动到前一个单词。

### 0.4查找历史

Ctrl + p -- 调出命令历史中的前一条（Previous）命令，即向上箭头键↑。

Ctrl + n -- 调出命令历史中的下一条（Next）命令，即向下箭头键↓。

Ctrl + r -- 依据用户在：提示符后的输入匹配查找 history 记录中命令条目。

Ctrl + g -- 从历史搜索模式（Ctrl + r）退出。

### 0.5Bang(!)命令

!! -- 输出并执行最近已执行过的一条命令。

!num -- 执行 history 记录中第 num 条命令条目，num 正整数时，为正序；负数时，为反序。

!num:p -- 输出第 num 条命令条目，不执行。

!num:gs/str1/str2/ -- 将第 num 条命令条目中的 str1 字符串替换为str2，（若不加 g，则仅替换第一个匹配）。

!string -- 输出最近已执行过的以 string 开头的命令条目。等同 !?string?。

!?string? -- 输出最近已执行过的以 string 开头的命令条目。等同 !string。

!string:p -- 输出最近已执行过的以 string 开头的命令条目。



^abc -- 删除最近已执行过的命令中的 abc 字符串，并执行。

\^foo\^bar -- 将最近已执行过的命令中的 foo 字符串替换为 bar，并执行。

!$ -- 执行最近已执行过的命令中的最后一个参数。

!* -- 执行最近已执行过的命令中的所有参数。

!*:p -- 输出最近已执行过的命令中的所有参数。

### 0.6other

Esc 键 -- 连续按 3 次显示所有的支持的终端命令。

Esc + b -- 移动到当前单词的开头

Esc + f -- 移动到当前单词的结尾

Esc + t -- 颠倒光标所在处及其相邻单词的位置

Esc + d -- 由光标位置开始，删除单词，直到单词结束，往右侧（还有剪切功能）

Esc + c -- 使下一个单词首字母大写, 同时光标前进一个单词, 如光标停留在单词的某个字母上, 如 word 中的 o 字母上, 则 o 字母变大写. 而不是 w

Esc + u -- 使下一个单词所有字母变大写, 同时光标前进一个单词, 同上, 如光标在 o 字母上, 则 ord 变大写, w 不变.

Esc+. -- 上一个命令的后面的参数

Esc + 操作次数 操作动作 -- 指定操作次数，重复执行指定的操作。9

## 1Linux

### 1.1--help

```shell
ls --help
```

```shell
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).
#列出文件信息(默认当前目录)
#
Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.
#
#alphabetically{abc,按字母顺序} specified{v.指定d,具体说明d}

Mandatory arguments to long options are mandatory for short options too.
  -a, --all                  do not ignore entries starting with .
#不忽略开头带.的
  -A, --almost-all           do not list implied . and ..
#almost{adv.几乎,差不多;adj.近似的;net.差不多了,将近,差一点}
#implied{adj.不言而喻的;v.imply的过去式和过去分词;net.隐含,含蓄的,暗示}
      --author               with -l, print the author of each file
  -b, --escape               print C-style escapes for nongraphic characters
      --block-size=SIZE      with -l, scale sizes by SIZE when printing them;
                               e.g., '--block-size=M'; see SIZE format below
  -B, --ignore-backups       do not list implied entries ending with ~
  -c                         with -lt: sort by, and show, ctime                                  (time of last modification of file                                  status information);                                                with -l: show ctime and sort by name;
                               otherwise: sort by ctime, newest 									first
  -C                         list entries by columns
      --color[=WHEN]         colorize the output; WHEN can be 'always' (default
                               if omitted), 'auto', or 'never'; more info below
  -d, --directory            list directories themselves, not their contents
  -D, --dired                generate output designed for Emacs' dired mode
  -f                         do not sort, enable -aU, disable -ls --color
  -F, --classify             append indicator (one of */=>@|) to entries
      --file-type            likewise, except do not append '*'
      --format=WORD          across -x, commas -m, horizontal -x, long -l,
                               single-column -1, verbose -l, vertical -C
      --full-time            like -l --time-style=full-iso
  -g                         like -l, but do not list owner
      --group-directories-first
                             group directories before files;
                               can be augmented with a --sort option, but any
                               use of --sort=none (-U) disables grouping
  -G, --no-group             in a long listing, don't print group names
  -h, --human-readable       with -l and -s, print sizes like 1K 234M 2G etc.
      --si                   likewise, but use powers of 1000 not 1024
  -H, --dereference-command-line
                             follow symbolic links listed on the command line
      --dereference-command-line-symlink-to-dir
                             follow each command line symbolic link
                               that points to a directory
      --hide=PATTERN         do not list implied entries matching shell PATTERN
                               (overridden by -a or -A)
      --hyperlink[=WHEN]     hyperlink file names; WHEN can be 'always'
                               (default if omitted), 'auto', or 'never'
      --indicator-style=WORD  append indicator with style WORD to entry names:
                               none (default), slash (-p),
                               file-type (--file-type), classify (-F)
  -i, --inode                print the index number of each file
  -I, --ignore=PATTERN       do not list implied entries matching shell PATTERN
  -k, --kibibytes            default to 1024-byte blocks for disk usage;
                               used only with -s and per directory totals
  -l                         use a long listing format
  -L, --dereference          when showing file information for a symbolic
                               link, show information for the file the link
                               references rather than for the link itself
  -m                         fill width with a comma separated list of entries
  -n, --numeric-uid-gid      like -l, but list numeric user and group IDs
  -N, --literal              print entry names without quoting
  -o                         like -l, but do not list group information
  -p, --indicator-style=slash
                             append / indicator to directories
  -q, --hide-control-chars   print ? instead of nongraphic characters
      --show-control-chars   show nongraphic characters as-is (the default,
                               unless program is 'ls' and output is a terminal)
  -Q, --quote-name           enclose entry names in double quotes
      --quoting-style=WORD   use quoting style WORD for entry names:
                               literal, locale, shell, shell-always,
                               shell-escape, shell-escape-always, c, escape
                               (overrides QUOTING_STYLE environment variable)
  -r, --reverse              reverse order while sorting
  -R, --recursive            list subdirectories recursively
  -s, --size                 print the allocated size of each file, in blocks
  -S                         sort by file size, largest first
      --sort=WORD            sort by WORD instead of name: none (-U), size (-S),
                               time (-t), version (-v), extension (-X)
      --time=WORD            with -l, show time as WORD instead of default
                               modification time: atime or access or use (-u);
                               ctime or status (-c); also use specified time
                               as sort key if --sort=time (newest first)
      --time-style=TIME_STYLE  time/date format with -l; see TIME_STYLE below
  -t                         sort by modification time, newest first
  -T, --tabsize=COLS         assume tab stops at each COLS instead of 8
  -u                         with -lt: sort by, and show, access time;
                               with -l: show access time and sort by name;
                               otherwise: sort by access time, newest first
  -U                         do not sort; list entries in directory order
  -v                         natural sort of (version) numbers within text
  -w, --width=COLS           set output width to COLS.  0 means no limit
  -x                         list entries by lines instead of by columns
  -X                         sort alphabetically by entry extension
  -Z, --context              print any security context of each file
  -1                         list one file per line.  Avoid '\n' with -q or -b
      --help     display this help and exit
      --version  output version information and exit

The SIZE argument is an integer and optional unit (example: 10K is 10*1024).
Units are K,M,G,T,P,E,Z,Y (powers of 1024) or KB,MB,... (powers of 1000).

The TIME_STYLE argument can be full-iso, long-iso, iso, locale, or +FORMAT.
FORMAT is interpreted like in date(1).  If FORMAT is FORMAT1<newline>FORMAT2,
then FORMAT1 applies to non-recent files and FORMAT2 to recent files.
TIME_STYLE prefixed with 'posix-' takes effect only outside the POSIX locale.
Also the TIME_STYLE environment variable sets the default style to use.

Using color to distinguish file types is disabled both by default and
with --color=never.  With --color=auto, ls emits color codes only when
standard output is connected to a terminal.  The LS_COLORS environment
variable can change the settings.  Use the dircolors command to set it.

Exit status:
 0  if OK,
 1  if minor problems (e.g., cannot access subdirectory),
 2  if serious trouble (e.g., cannot access command-line argument).

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation at: <https://www.gnu.org/software/coreutils/ls>
or available locally via: info '(coreutils) ls invocation'
```

