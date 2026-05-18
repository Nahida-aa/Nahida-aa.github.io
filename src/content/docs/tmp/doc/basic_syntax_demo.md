# Heading level 1

<h1>Heading level 1</h1>

Heading level 1
===============

通常建议全篇文档只有一个一级标题，即只有一个`<h1>`标签。

## Heading level 2

<h2>Heading level 2</h2>

Heading level 2
---------------

### Heading level 3

<h3>Heading level 3</h3>

#### Heading level 4

<h4>Heading level 4</h4>

##### Heading level 5

<h5>Heading level 5</h5>

###### Heading level 6

<h6>Heading level 6</h6>

---

## Paragraphs

1. 两次回车。

    This is the first paragraph.

    And this is the second paragraph.

2. `<p>`标签。

    <p>I really like using Markdown.</p>

    <p>I think I'll use it to format all of my documents from now on.</p>

---

## Line Break

换行

1. 两个空格加回车(容易看不见)。

    This is the first line.  
    And this is the second line.

2. `<br>`标签(最建议的方案)。

    This is the first line.<br>And this is the second line.

3. `\`加回车。

    This is the first line.\
    And this is the second line.

---

## Emphasis

### Bold

1. **Bold**Text.(建议)

2. I just love __bold text__.

    不建议多方式混用。

3. <strong>Strong</strong>Text.

### Italic

1. *Italic*Text.(建议)

2. I just love _italic text_.

    不建议多方式混用。

3. <em>Emphasized</em>Text.

### Bold and Italic

1. ***Bold and Italic***Text.(建议)

2. I just love ___bold and italic text___.

    不建议多方式混用。

3. <strong><em>Strong and Emphasized</em></strong>Text.

---

## BlockQuotes

1. This is a blockquote.

    > This is the first line of the blockquote.

2. <blockquote>This is a blockquote.</blockquote>

3. multiple paragraphs.
    > This is the first line of the blockquote.
    >
    > This is the second line of the blockquote.
    >> This is the first line of the blockquote.
    > - This is the second line of the blockquote.

    <blockquote>
        <p>This is the first line of the blockquote.</p>
        <p>This is the second line of the blockquote.</p>
    </blockquote>

---

## Lists

### Unordered Lists

1. This is an unordered list.

    - Item 1
    - Item 2
    - Item 3

2. <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>

### Ordered Lists

1. This is an ordered list.

    1. Item 1
    2. Item 2
    3. Item 3

2. <ol>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ol>

### Nested Lists

1. This is a nested list.

    - Item 1

        I need to add another paragraph below the second list item.

        - Subitem 1
            > This is a blockquote.
        - Subitem 2:

                <script>
                    alert('Hello, world!');
                </script>

    - Item 2
        - Subitem 1

            ![Image](https://www.example.com/image.jpg)
        - Subitem 2

---

## Code Blocks

1. This is a code block.

```html
<p>This is a paragraph.</p>
```

缩进式（indented）和围栏式（fenced）代码块不建议混用

---

## Horizontal Rules

---

***

___

<hr>

## Links

[Markdown语法](https://markdown.com.cn)。

带标题的

[Markdown语法](https://markdown.com.cn "最好的markdown教程")。

网址和email地址

<https://markdown.com.cn>

<1276552337@qq.com>

带格式的

I love supporting the **[EFF](https://eff.org)**.

This is the *[Markdown Guide](https://www.markdownguide.org)*.

See the section on [`code`](#code).

[引用类型链接实例][1]

[hobbit-hole] [2]

[技术文档的编写] [3]

## images

![这是图片](/assets/img/philly-magic-garden.jpg "Magic Gardens")

[![沙漠中的岩石图片](/assets/img/shiprock.jpg "Shiprock")](https://markdown.com.cn)

<c style="color: red">xx<c>

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=549216743&bvid=BV1pq4y1u7ap&cid=443964069&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="500px"></iframe>

## 转义

| Character | Name |
| --------- | ---- |
|\ | ackslash |
| ` | backtick (see also escaping backticks in code) |
| * | asterisk |
| _ | underscore |
| { } |curly braces |
| [ ] | brackets |
| ( ) | parentheses |
| # | pound sign |
| + | plus sign |
| - | minus sign (hyphen) |
| . | dot |
| ! | exclamation mark |
| \| | pipe (see also escaping pipe in tables) |

## HTML

## 参考文献

**\[1]** https://markdown.com.cn/basic-syntax/links.html

**\[2]** [第二个](https://en.wikipedia.org/wiki/Hobbit#Lifestyle)

**\[3]** https://www.example.com "技术文档的编写"
