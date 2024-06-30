# vim

## overview

Vim 是从 vi 发展出来的一个文本编辑器。代码补全、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。

简单的来说，vi 是老式的字处理器，不过功能已经很齐全了，但是还是有可以进步的地方。vim 则可以说是程序开发者的一项很好用的工具

## Basics vim

### Introduction to Vim Modes

The first key vim concept to understand is **modes**.

You can switch between two primary modes: **normal mode** and **insert mode** to perform different actions.

#### Insert Mode

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

    

