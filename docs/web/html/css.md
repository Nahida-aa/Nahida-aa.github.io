---
title: css
description: 
created_at: 2023-08-02T20:15:32Z
updated_at: 2025-03-30T10:35:32Z
tags: [css,html]
---

## flex
```css
.flex {
  display: flex;
}
```
Flex 有两个角色：

* **容器（container）**：设置 `display: flex` 的元素
* **项目（items）**：容器里的直接子元素

Flex 有两条轴：

* **主轴（main axis）**：项目排列的方向
* **交叉轴（cross axis）**：与主轴垂直的方向

默认：主轴是 **水平**（从左到右），交叉轴是 **垂直**（从上到下）。

```html
<div class="container flex">
  <div class="item flex-1">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```
### flex/container attributes

| 属性   | 作用  | 常用值|
| --- | ------- | ---- |
| `flex-direction`  | 主轴方向    | `row`（默认）、`row-reverse`、`column`、`column-reverse`                                  |
| `flex-wrap`       | 是否换行       | `nowrap`（默认）、`wrap`、`wrap-reverse`                                                 |
| `justify-content` | 主轴对齐方式     | `flex-start`（默认）、`center`、`flex-end`、`space-between`、`space-around`、`space-evenly` |
| `align-items`     | 交叉轴对齐方式    | `stretch`（默认）、`flex-start`、`center`、`flex-end`、`baseline`|
| `align-content`   | 多行时交叉轴对齐方式 | 同上（只在多行时生效）|
| `gap` | 主轴和交叉轴 的 间距   | 长度值（如 `10px`）或百分比（如 `5%`）|

### flex/items attributes

| 属性            | 作用           | 常用值                         |
| ------------- | ------------ | --------------------------- |
| `flex-grow`   | 剩余空间分配比例     | 数字（默认 0）                    |
| `flex-shrink` | 空间不足时的缩小比例   | 数字（默认 1）                    |
| `flex-basis`  | 初始大小         | 长度值、(默认 `auto`)                  |
| `flex`        | 上面三者的简写      | `flex: 1` 等价于 `flex: 1 1 0` |
| `align-self`  | 单独项目的交叉轴对齐方式 | 覆盖 `align-items`            |

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<div aria-label="container" class=" w-40 flex">
  <div class="item flex-1">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

然后在 `.container` 里不断调整：

* `flex-direction`
* `justify-content`
* `align-items`
* `flex-wrap`

### justify

- `justify` or `justify-content` 用于设置 flex 容器内 item 的 方向 上的 对齐方式。

值:
- `start`：项目向容器方向上的起始边界对齐。
- `center`：项目在容器方向上内居中对齐。
- `end`：项目向容器方向上的结束边界对齐。
- `between` or `space-between`：项目在容器方向上两端对齐，项目之间的间隔相等。
- ...

### items

`items` or `align-items` 用于设置 flex 容器内 item 的 **交叉轴** 上的 对齐方式。

### gap

## :has()
```html
<style>
  div:has(.highlight) { /* 使用 :has() 选择包含 .highlight 的 div */
    border: 2px solid red;
    padding: 10px;
    margin-bottom: 10px;
  }
  div { /* 普通 div 的样式 */
    border: 2px solid gray;
    padding: 10px;
    margin-bottom: 10px; 
  }
  .highlight { /* .highlight 的样式 */
    background-color: yellow;
    padding: 5px;
  }
</style>
<div><!-- 不包含 .highlight 的 div -->
  <p>这是一个普通的 div，没有 .highlight 元素。</p>
</div>
<div><!-- 包含 .highlight 的 div -->
  <p>这是一个包含 <span class="highlight">高亮内容</span> 的 div。</p>
</div>
<div><!-- 不包含 .highlight 的 div -->
  <p>这是另一个普通的 div，没有 .highlight 元素。</p>
</div>
```
