# vim

## overview

Vim 是从 vi 发展出来的一个文本编辑器。代码补全、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。

简单的来说，vi 是老式的字处理器，不过功能已经很齐全了，但是还是有可以进步的地方。vim 则可以说是程序开发者的一项很好用的工具

### table

**normal**:

| mode | command | description |
| --- | --- | --- |
| normal | `i` | **insert**, **insert** mode before the cursor |
| normal | `I` | **Insert**, **Insert** mode at the beginning of the line |
| normal | `a` | **append**, insert mode after the cursor |
| normal | `A` | **Append**, insert mode at the end of the line |
| normal | `o` | **open a new line**, insert mode on the next line |
| normal | `O` | **Open ane new line**, insert mode on the previous line |
| normal | `h` | move cursor left |
| normal | `j` | move cursor down |
| normal | `k` | move cursor up |
| normal | `l` | move cursor right |
| normal | `w` | move cursor to the beginning of the **next word** |
| normal | `e` | move cursor to the **end** of the next word |
| normal | `b` | **back**, move cursor to the **beginning** of the previous word |
| normal | `[number]G` | move cursor to the number line, default to the end of the file |
| normal | `[number]gg` | move cursor to the number line, default to the beginning of the file |
| normal | `x` | delete character under the cursor |
| normal | `dd` | **delete** the line |
| normal | `dw` | **delete** the **word** under the cursor |
| normal | `cw` | **change** the **word** under the cursor, enter insert mode |

| normal | `u` | **undo** |
| normal | `Ctrl + r` | **redo** |
| normal | `yw` | **yank**, copy the **word** |
| normal | `yy` | **yank**, copy the line |
| normal | `p` | **paste** |
| normal | `.` | repeat the last command |
| normal | `ci{` | **change** the content **inside** the `{}`, and insert |
| normal | `ci[` | **change** the content **inside** the `[]`, and insert |
| normal | `ci(` | **change** the content **inside** the `()`, and insert |
| normal | `ci'` | **change** the content **inside** the `''`, and insert |
| normal | `ci"` | **change** the content **inside** the `""`, and insert |
| normal | `Ctrl + o` | **jump** to the previous position |
| normal | `Ctrl + i` | **jump** to the next position |
| normal | `Ctrl + u` | **move** the screen up |
| normal | `Ctrl + d` | **move** the screen down |
| normal | `Ctrl + e` | **move** the screen up |
| normal | `Ctrl + y` | **move** the screen down |
| normal | `Ctrl + b` | **move** the screen up |
| normal | `Ctrl + f` | **move** the screen down |
| normal | `Ctrl + d` | **move** the screen down |
| normal | `Ctrl + g` | **show** the file information |
| normal | `Ctrl + v + [movement]` | **visual block mode** |

insert mode:

**:(command line mode)**:

| mode | command | description |
| --- | --- | --- |
| : | `:w` | **write**, save the file |
| : | `:q` | **quit**, close the file |
| : | `:q!` | **quit**, close the file without saving |
| : | `:wq` | **write** and **quit**, save the file and close the file |
| : | `:/pattern` | **search** the pattern |
| : | `:%s/old_chars/new_chars/g` | **substitute**, replace the old with the new in global |
| : | `:e!` | **edit**, reload the file |
| : | `:set nu` | **set**, show the line number |
| : | `:set nonu` | **set**, hide the line number |
| : | `:set ts=4` | **set**, set the tabstop to 4 |

**visual** mode:

**settings**:

~/.vimrc

```vimrc
syntax on # 语法高亮
set ts=4 # tabstop
set expandtab # tab转换为空格
set autoindent # 自动缩进
set number # 显示行号
# set relativenumber # 显示相对行号
```

## Basics vim

### Introduction to Vim Modes

The first key vim concept to understand is **modes**.

You can switch between two primary modes: **normal mode** and **insert mode** to perform different actions.

- Normal Mode

   Used for:

  - Moving the cursor
  - Deleting characters, words, lines, etc
  - Performing operations like Copy / Paste

- Insert Mode

Used for editing and inserting text.

You can think of insert mode as the default behavior in the editors you are already used to.

Pressing the same key can have different effects depending on which mode you are in. For example:

- the `w` key in normal mode moves the cursor forward one word
- the `w` key in insert mode types the character "w"

In the next few lessons, you will learn the basics of each mode and how to switch between them.

### Basics Movement

While in normal mode you have access to many powerful motions to help you navigate through code.

Let's start by learning the basics. Use the `hjkl` keys as indicated below to move one character in any direction.

- `h` moves the cursor one character to the left, suggest pointer finger
- `j` moves the cursor down one line, suggest pointer finger
- `k` moves the cursor up one line, suggest middle finger
- `l` moves the cursor one character to the right, suggest ring finger

#### # Why not use the arrow keys?

Vim is about efficiency, which means staying as close as possible to the home row keys.  
Vim 是关于效率的，这意味着尽可能靠近主行键。

The arrow keys are intuitive, but using them requires you to move your right hand completely away from the home row keys. This is inefficient.  
箭头键很直观，但使用它们需要您将右手完全远离主行键。这是低效的。

#### # Where should I rest my fingers?

You should rest with your fingers on the home row keys, even though this makes your right index finger responsible for hitting both `h` and `j` keys.  
您应该将手指放在主行键上，即使这会使您的右手食指负责敲击键 `h` 和 `j` 键。

Your right hand fingers should rest on `j` `k` `l`;

Your left  hand fingers should rest on `a` `s` `d` `f`.

### Moving With Words

It is useful to navigate by word to travel medium distances, since all statements in a program are composed of words.  
通过单词导航以移动中等距离很有用，因为程序中的所有语句都是由单词组成的。

- `w` --- move to the **next word**
- `e` --- move to the **end** of a word
- `b` --- move **back** a word

### Insert Mode

So far you have learned how to move in normal mode. In order to edit text, you will need to enter insert mode.
到目前为止，您已经学会了如何在正常模式下移动。为了编辑文本，您需要进入插入模式。

E37: No write since last change<br>
E162: No write since change for buffer ".\test\readme.md"<br>
Press ENTER or type command to continue

```yaml
since
    prep.自...以后;自...以来;何曾(气愤);什么时候
    conj.因为;由于;自...以来;在...以后;既然
    adv.自...以后,自...以来;此后;后来
    n.(法、美)新斯(人名)
    net.自从;既然;因为
buffer
    n.缓冲;缓存
    v.保护;缓解,缓冲;存储;缓存
    net.缓冲器
press
    n.压平器;印刷;商业压力;新闻报道;新闻工作者;拥挤;推举
    v.压,挤,推,贴,按;压制(唱片);前进,推进;坚持;敦促;推举
type
    n.类型,种类;典型;榜样;字体;象征;标本
    v.打字;测定...类型
No write since last change
    (自从上次更改后)没有写入
No write since last change for bufer "$file path$"
    (自上次更改缓存"xxx.md"以来)，没有再写入
Press ENTER or type command to continue
    按ENTER或键入命令继续
```



