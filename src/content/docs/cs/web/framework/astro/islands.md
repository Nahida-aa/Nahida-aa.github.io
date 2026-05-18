---
title: 岛屿架构
description: 这种方法让你能够构建快速、以内容为中心的网站，同时保留在需要时添加交互式 UI 组件的能力
---

这种方法让你能够构建快速、以内容为中心的网站，同时保留在需要时添加交互式 UI 组件的能力。

## 什么是岛屿架构？

岛屿架构是一种基于组件的架构模式，其中交互式组件（岛屿）嵌入在静态 HTML 页面中。可以把页面想象成一片静态 HTML 的海洋，其中点缀着交互式岛屿。

核心原则：**只有交互式组件才会作为 JavaScript 发送到客户端，而页面的其余部分保持静态 HTML。**

### 什么组件是岛屿？

**只有添加了 `client:*` 指令的组件才是岛屿。** 没有指令的组件只是静态 HTML。

```astro
<!-- 静态 HTML - 不是岛屿 -->
<Counter />

<!-- 岛屿 -->
<Counter client:load />
```

这就是 Astro 的核心理念：**默认静态，按需水合**。

### 工作原理

默认情况下，Astro 在服务器上渲染所有组件为静态 HTML，**不包含任何客户端 JavaScript**。当你需要交互性时，使用客户端指令来启用。

```astro
---
import Counter from './Counter.tsx';
---

<!-- 静态 HTML - 无 JavaScript -->
<h1>欢迎访问我的网站</h1>

<!-- 交互式岛屿 - 包含 JavaScript -->
<Counter client:load />
```

## 客户端指令

客户端指令告诉 Astro 何时以及如何水合你的交互式组件：

| 指令 | 水合时机 | 适用场景 |
|---|---|---|
| `client:load` | 页面加载时立即 | 关键交互式 UI |
| `client:idle` | 浏览器空闲时 | 非关键组件 |
| `client:visible` | 进入视口时 | 首屏以下内容 |
| `client:only` | 仅客户端，无 SSR | 依赖浏览器 API 的组件 |
| `client:media` | 媒体查询匹配时 | 响应式组件 |

### client:load

在页面加载时立即水合组件。用于必须立即可用的关键 UI。

```astro
<Header client:load />
```

### client:idle

当浏览器空闲时水合。推荐用于大多数交互式组件。

```astro
<ThemeToggle client:idle />
```

### client:visible

当组件进入视口时水合。非常适合首屏以下的内容。

```astro
<Footer client:visible />
```

### client:only

完全跳过服务器端渲染。用于依赖浏览器 API 的组件。

```astro
<GitHubCalendar client:only="react" />
```

## 隔离机制

岛屿在隔离的上下文中运行，这是理解岛屿架构的关键：

1. **独立运行**：每个岛屿独立水合，彼此不知道对方的存在，不依赖于对方
2. **互不影响**：如果某个岛屿加载失败或报错，**不会影响其他岛屿和页面**。页面其余部分是静态 HTML，根本不是 JavaScript
3. **并行加载**：低优先级的岛屿（如图片轮播）不会阻塞高优先级岛屿（如导航栏），两者并行加载独立水合
4. **状态共享**：客户端岛屿之间仍然可以共享状态和通信（通过事件或状态管理库），尽管运行在不同的组件上下文中
5. **框架混合**：由于岛屿相互独立，你可以在同一页面混合使用 React、Vue、Svelte、Solid 等不同框架

```astro
<!-- 页面可以混合使用多个框架 -->
<Header client:load />           <!-- React -->
<Counter client:load />           <!-- Vue -->
<Footer client:visible />         <!-- Svelte -->
```

## 岛屿嵌套

岛屿可以嵌套使用：

```astro
<Wrapper client:idle>  <!-- 外层岛屿 -->
  <NestedComponent client:idle />  <!-- 内层岛屿，嵌套在外层里面 -->
</Wrapper>
```

### 同一框架嵌套

同一 UI 框架下的嵌套，有两种方式：

**方式一：封装为整体（需要共享上下文或状态时）**

```astro
<App client:load />
```

适用于：
- 子组件需要共享同一框架的 Context 或状态（如 React Context、Svelte stores、Solid signals）
- 整个组件树作为统一的交互单元

> **Solid signals**：可以将 signals/stores 创建在组件外部，然后在岛屿间共享

**方式二：独立嵌套（需要不同加载机制时）**

```astro
<App client:load>
  <Sidebar client:idle />    <!-- 不同加载时机 -->
  <Comments client:visible /> <!-- 进入视口时加载 -->
</App>
```

适用于：
- 子组件需要不同的加载策略（如 `client:idle` vs `client:load`）
- 子组件是独立的交互单元，不依赖父组件的 Context

### 注意事项

- 官方文档没有明确说明何时应该嵌套岛屿，何时应该封装为一个整体
- 根据实践总结：
  - 同一框架下，**优先封装为一个整体**，避免独立加载子组件
  - 嵌套适用于：将完整的 SPA 嵌入到静态页面中
- Astro 官方正在计划通过 **[shared-root hydration](https://github.com/withastro/roadmap/discussions/1239)** 解决同一框架嵌套时的 Context API 共享问题

## SolidJS 状态管理

SolidJS 支持灵活的跨组件通信，可以分为**组件内**、**组件间**和**岛屿间**三种场景。

### 组件内通信

使用 `createSignal` 或 `createStore` 在组件内部管理状态：

```tsx
import { createSignal, createStore } from 'solid-js';

function Counter() {
  const [count, setCount] = createSignal(0);
  
  return <button onClick={() => setCount(c => c + 1)}>{count()}</button>;
}
```

### 组件间通信

将 signals/stores 创建在单独的 `.tsx`/`.ts` 文件中，实现跨组件共享：

```tsx
// store.ts
import { createSignal, createStore } from 'solid-js';

export const sharedSignal = createSignal(0);
export const sharedStore = createStore({ name: 'Astro' });
```

```tsx
// ComponentA.tsx
import { sharedSignal } from './store';

export function ComponentA() {
  const [count, setCount] = sharedSignal;
  
  return <button onClick={() => setCount(c => c + 1)}>Increment</button>;
}
```

```tsx
// ComponentB.tsx
import { sharedSignal } from './store';

export function ComponentB() {
  const [count] = sharedSignal;
  
  return <span>Count: {count()}</span>;
}
```

### 跨岛屿通信

在不同岛屿间共享状态，需要满足以下条件：

1. **信号创建在组件外部**：在单独的 `.tsx`/`.ts` 文件中创建，而不是在组件内部
2. **使用 `client:*` 指令**：确保岛屿被水合
3. **通过 props 传递**：将信号作为 props 传递给岛屿

```tsx
// store.ts
import { createSignal } from 'solid-js';

export const sharedSignal = createSignal(0);
```

```tsx
// ComponentA.tsx
import { sharedSignal } from './store';

export function ComponentA() {
  const [count, setCount] = sharedSignal;
  
  return <button onClick={() => setCount(c => c + 1)}>Increment</button>;
}
```

```tsx
// ComponentB.tsx
import { sharedSignal } from './store';

export function ComponentB() {
  const [count] = sharedSignal;
  
  return <span>Count: {count()}</span>;
}
```

```astro
---
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';
---

<!-- 信号通过 props 传递 -->
<ComponentA count={sharedSignal} client:load />
<ComponentB count={sharedSignal} client:idle />
```

> **说明**：
> - `.astro` frontmatter 在服务端执行
> - 信号作为 props 传递时会序列化到 HTML，客户端重建为共享信号

### 与其他框架对比

| 框架 | 跨岛屿通信方式 |
|------|------------|
| SolidJS | 将 signals/stores 创建在组件外部 |
| React | 使用 Context（需封装为整体） |
| Vue | 使用 reactive（需封装为整体） |
| Svelte | 使用 stores |

## 优势

1. **性能**：大幅减少发送到浏览器的 JavaScript
2. **并行加载**：岛屿相互独立加载，不会互相阻塞
3. **框架无关**：使用 React、Vue、Svelte、Solid 或任何支持的框架
4. **渐进增强**：即使 JavaScript 加载失败，页面仍然可以正常工作
5. **容错性**：单个岛屿的错误不会导致整个页面崩溃

## 客户端岛屿 vs 服务端岛屿

- **客户端岛屿**：交互式 UI 组件，与页面其他部分分开水合
- **服务端岛屿**：单独服务端渲染动态内容的 UI 组件（使用 `server:defer`）

一个组件可以同时是客户端岛屿和服务端岛屿