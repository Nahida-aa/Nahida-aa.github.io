---
title: component
description: "Web Components"
created_at: 2025-08-09T12:56:07Z
updated_at: 2025-08-09T12:56:07Z
tags: [web, component, html]
---

## svg

```html
<script>
  class StarIcon extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gold">
          <path d="M12 2l3 7h7l-5.5 4.5 2 7L12 16l-6.5 4.5 2-7L2 9h7z"/>
        </svg>`
    }
  }
  customElements.define('star-icon', StarIcon)
</script>

<star-icon></star-icon>
```

## list

```html
<!-- for + innerHTML 拼字符串 -->
<ul id="list"></ul>

<script>
  const data = ['苹果', '香蕉', '橙子']
  const list = document.getElementById('list')

  let html = ''
  for (let item of data) {
    html += `<li class="text-red-500">${item}</li>`
  }
  list.innerHTML = html
</script>

<!-- document.createElement -->
<ul id="list"></ul>

<script>
  const data = ['苹果', '香蕉', '橙子']
  const list = document.getElementById('list')

  for (let item of data) {
    const li = document.createElement('li')
    li.textContent = item
    li.className = 'text-blue-500'
    list.appendChild(li)
  }
</script>

<!-- <template> + 克隆 -->
<template id="item-template">
  <li class="text-green-500"></li>
</template>

<ul id="list"></ul>

<script>
  const data = ['苹果', '香蕉', '橙子']
  const list = document.getElementById('list')
  const template = document.getElementById('item-template')

  for (let item of data) {
    const clone = template.content.cloneNode(true)
    clone.querySelector('li').textContent = item
    list.appendChild(clone)
  }
</script>

<!-- Web Components（封装循环逻辑） -->
<fruit-list></fruit-list>

<script>
  class FruitList extends HTMLElement {
    connectedCallback() {
      const data = ['苹果', '香蕉', '橙子']
      this.innerHTML = `
        <ul>
          ${data.map(item => `<li class="text-purple-500">${item}</li>`).join('')}
        </ul>
      `
    }
  }
  customElements.define('fruit-list', FruitList)
</script>
```