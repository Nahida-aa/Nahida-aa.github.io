---
title: ui 框架迁移指南
description: 讲解如何在 React、Solid、Vue.js 之间进行项目迁移和代码转换
---

- React <-> Solid
- React <-> Vue.js
- Solid <-> Vue.js

## 核心概念对比

### 响应式模型

| 框架 | 响应式原理 | 更新粒度 |
|------|------------|----------|
| **React** | 虚拟 DOM + 状态提升 | 组件级重渲染 |
| **Solid** | 细粒度信号 (Signals) | 原子级更新 |
| **Vue.js** | 响应式对象 (Proxy) | 组件级 + 依赖追踪 |

### 语法对应关系

| 概念 | React | Solid | Vue.js |
|------|--------|----------|---------|
| 状态 | `useState` | `createSignal` | `ref` / `reactive` |
| 副作用 | `useEffect` | `createEffect` | `watchEffect` / `watch` |
| 计算值 | `useMemo` | `createMemo` | `computed` |
| 子组件通信 | props | props | props / emits |
| 渲染 | JSX | JSX | Template |

### Vue `watch` vs `watchEffect` 区别

| 特性 | `watchEffect` | `watch` |
|------|--------------|-------|
| **依赖追踪** | 自动追踪函数内响应式依赖 | 需显式指定监听源 |
| **执行时机** | 立即执行一次 | 默认不立即执行（除非 `{ immediate: true }`） |
| **参数** | 只有一个函数 | 第一个参数是监听源，第二个是回调 |
| **旧值/新值** | 无法直接获取 | 回调提供 `(newVal, oldVal)` |

**与 React/Solid 副作用的关系**：
- **`watchEffect`** ≈ **`useEffect`** (React) / **`createEffect`** (Solid) — 自动追踪依赖
- **`watch`** ≈ **`useEffect(() => {}, [dep])`** (React 手动依赖数组) — 需显式指定监听源

## 关键差异总结

### React vs Solid
- **状态**：`useState` ↔ `createSignal` (需 `count()` 读取)
- **副作用**：`useEffect(() => {}, [dep])` ↔ `createEffect(() => {})` (自动追踪依赖)
- **更新粒度**：虚拟 DOM 组件级重渲染 ↔ 细粒度信号级更新
- **编译器**：React Compiler 可自动优化，Solid 原生细粒度

### React vs Vue.js
- **状态**：`useState` ↔ `ref`/`reactive` (需 `.value`)
- **模板**：JSX ↔ Template (指令 `v-if`/`v-for` ↔ 三元/`map`)
- **事件**：`onClick` ↔ `@click` (驼峰 ↔ 短横线)
- **副作用**：`useEffect` ↔ `watchEffect`/`watch` (Vue 需区分自动/手动依赖追踪)
- **context/inject**：Context API (`createContext`) ↔ `provide/inject`

### Solid vs Vue.js
- **响应式**：信号 (Signals) ↔ Proxy 响应式对象
- **语法**：JSX ↔ Template
- **依赖追踪**：函数式 `count()` ↔ `.value` 属性访问

---

## React <-> Solid

### 1. 状态管理

**React 写法：**
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Solid 写法：**
```jsx
import { createSignal } from 'solid-js';

function Counter() {
  const [count, setCount] = createSignal(0);
  
  return (
    <div>
      <p>Count: {count()}</p>
      <button onClick={() => setCount(count() + 1)}>Increment</button>
    </div>
  );
}
```

**关键差异：**
- Solid 的信号是**函数式访问**：`count()` 而不是 `count`
- 不需要 `useState`，使用 `createSignal`
- JSX 类似，但 Solid 没有虚拟 DOM

### 2. 副作用

**React：**
```jsx
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);
```

**Solid：**
```jsx
createEffect(() => {
  console.log('Count changed:', count());
});
```

**注意：** Solid 的 `createEffect` 自动追踪依赖，不需要依赖数组。

### 3. 计算值

**React（传统写法）：**
```jsx
const doubled = useMemo(() => count * 2, [count]);
```

**React（React Compiler / Forget）：**
```jsx
// 新版 React Compiler 会自动优化，无需手动 useMemo
const doubled = count * 2;  // 编译器自动处理依赖追踪
```

> **注意**：React Compiler（Forget）已逐步推广，可自动将组件和 Hooks 转换为等效代码，减少手动优化需求。但 `useMemo` 仍兼容。

**Solid：**
```jsx
const doubled = createMemo(() => count() * 2);
```

### 4. 组件生命周期

| React | Solid |
|--------|----------|
| `useEffect(() => {}, [])` | `onMount(() => {})` |
| `useEffect(() => { return cleanup }, [])` | `onCleanup(() => {})` |
| `useEffect(() => { return () => {} }, [])` | `onCleanup(() => {})` |

---

## React <-> Vue.js

### 1. 模板语法迁移

**React ↔ Vue.js：**

**条件渲染：**

React (JSX)：
```jsx
{show && <p>Visible</p>}
```

Vue.js (Template)：
```vue
<p v-if="show">Visible</p>
<!-- 或 -->
<p v-show="show">Visible</p>
```

**列表渲染：**

React (JSX)：
```jsx
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

Vue.js (Template)：
```vue
<div v-for="item in items" :key="item.id">
  {{ item.name }}
</div>
```

**事件处理：**

React (JSX)：
```jsx
<button onClick={handleClick}>Click</button>
```

Vue.js (Template)：
```vue
<button @click="handleClick">Click</button>
```

**插值：**

React (JSX)：
```jsx
<p>{count}</p>
```

Vue.js (Template)：
```vue
<p>{{ count }}</p>
```

**属性绑定：**

React (JSX)：
```jsx
<input
  value={text}
  onChange={e => setText(e.target.value)}
/>
```

Vue.js (Template)：
```vue
<input :value="text" @input="text = $event.target.value" />
<!-- 或双向绑定 -->
<input v-model="text" />
```

### 2. 单文件组件 (SFC) 结构

**React (JSX)：**
```jsx
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Vue.js (SFC)：**
```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);
const increment = () => count.value++;
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

### 3. 状态管理迁移

| React | Vue.js |
|--------|---------|
| `useState(initial)` | `ref(initial)` / `reactive(obj)` |
| `count` / `setCount(c)` | `count.value` |
| 对象状态 | `reactive` 更适合 |

### 3. Props 和事件

**React：**
```jsx
// 父组件
<Child data={data} onUpdate={handleUpdate} />

// 子组件
function Child({ data, onUpdate }) {
  return <button onClick={() => onUpdate()}>{data}</button>;
}
```

**Vue.js：**
```vue
<!-- 父组件 -->
<Child :data="data" @update="handleUpdate" />

<!-- 子组件 -->
<script setup>
const props = defineProps(['data']);
const emit = defineEmits(['update']);
</script>

<template>
  <button @click="emit('update')">{{ props.data }}</button>
</template>
```

### 4. 副作用

**React：**
```jsx
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);
```

**Vue.js：**
```vue
<script setup>
import { watch, watchEffect } from 'vue';

// watchEffect：自动追踪依赖（类似 useEffect）
watchEffect(() => {
  console.log('Count changed:', count.value);
});

// watch：显式指定监听源（类似 useEffect with dep array）
watch(count, (newVal, oldVal) => {
  console.log('Count changed:', newVal, oldVal);
});
</script>
```

> **注意**：`watchEffect` ≈ `useEffect`（自动追踪），`watch` ≈ `useEffect(() => {}, [dep])`（手动指定依赖）。

### 5. context/inject

Vue 的 `inject` 类似于 React 的 Context API，用于跨组件层级传递数据。Solid 也有 Context API（`createContext`/`useContext`）。

**React (Context API)：**
```jsx
import { createContext, useContext, useState } from 'react';

// 创建 Context
const ThemeContext = createContext('light');

// 提供者组件
function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 消费者组件
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}
```

**Vue.js (Provide / Inject)：**
```vue
<!-- 祖先组件 -->
<script setup>
import { provide, ref } from 'vue';

const theme = ref('dark');
provide('theme', theme);  // 提供数据
</script>

<!-- 后代组件 -->
<script setup>
import { inject } from 'vue';

const theme = inject('theme', 'light');  // 注入数据，默认值为 'light'
</script>

<template>
  <div>Current theme: {{ theme }}</div>
</template>
```

**对应关系：**

| React Context | Solid Context | Vue Provide/Inject |
|--------------|-----------------|-------------------|
| `createContext(default)` | `createContext(default)` | `provide(key, value)` |
| `useContext(Context)` | `useContext(Context)` | `inject(key, default)` |
| `Provider` 组件 | `Context.Provider` | `provide()` 函数 |
| 需要 `Provider` 包裹 | 需要 `Provider` 包裹 | 不需要额外组件 |

> **注意**：Solid 有 Context API（`createContext`/`useContext`），与 React 类似；Vue 使用 `provide`/`inject`。

---

## Solid <-> Vue.js

### 1. 模板语法迁移

**Solid (JSX)：**
```jsx
function App() {
  const show = createSignal(true);
  const items = [{ id: 1, name: 'Item 1' }];
  
  return (
    <div>
      {show() && <p>Visible</p>}
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      <input value={text()} onInput={e => setText(e.target.value)} />
    </div>
  );
}
```

**Vue.js (Template)：**
```vue
<template>
  <div>
    <p v-if="show">Visible</p>
    <div v-for="item in items" :key="item.id">{{ item.name }}</div>
    <input v-model="text" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const show = ref(true);
const items = ref([{ id: 1, name: 'Item 1' }]);
const text = ref('');
</script>
```

### 2. 响应式模型迁移

**Solid (信号/Signals)：**
```jsx
function App() {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);
  
  return (
    <div>
      <p>Count: {count()}</p>
      <p>Doubled: {doubled()}</p>
      <button onClick={() => setCount(count() + 1)}>Increment</button>
    </div>
  );
}
```

**Vue.js (响应式对象/Ref)：**
```vue
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>
```

**关键差异：**
- Solid：`count()` 函数式访问，`createMemo` 自动追踪
- Vue.js：`count.value` 属性访问，`computed` 需显式定义

### 3. 副作用迁移

**Solid：**
```jsx
createEffect(() => {
  console.log('Count changed:', count());
});
```

**Vue.js：**
```vue
<script setup>
import { watch, watchEffect } from 'vue';

// watchEffect：自动追踪（类似 createEffect）
watchEffect(() => {
  console.log('Count changed:', count.value);
});

// watch：显式指定源（类似 useEffect with deps）
watch(count, (newVal, oldVal) => {
  console.log('Count changed:', newVal, oldVal);
});
</script>
```

---

### 4. solid context

**Solid (Context API)：**
```jsx
import { createContext, useContext } from 'solid-js';

const ThemeContext = createContext('light');

// 提供者组件
function App() {
  return (
    <ThemeContext.Provider value={'dark'}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 消费者组件
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme()}</div>;
}
```

**Vue.js (Provide / Inject)：**
```vue
<!-- 祖先组件 -->
<script setup>
import { provide, ref } from 'vue';

const theme = ref('dark');
provide('theme', theme);
</script>

<!-- 后代组件 -->
<script setup>
import { inject } from 'vue';

const theme = inject('theme', 'light');
</script>

<template>
  <div>Current theme: {{ theme }}</div>
</template>
```

**对应关系：**

| Solid Context | Vue Provide/Inject |
|------------------|-------------------|
| `createContext(default)` | `provide(key, value)` |
| `useContext(Context)` | `inject(key, default)` |
| `Context.Provider` 组件 | `provide()` 函数 |
| 需要 `Provider` 包裹 | 不需要额外组件 |

## 迁移工具推荐

### 自动化迁移

1. **React → Solid**：
   - 手动迁移为主（语法相似度高）
   - 使用 [Solid converter](https://github.com/Solid/solid) 参考

2. **React → Vue**：
   - [Vue Migration Guide](https://vuejs.org/guide/migration/)
   - 使用 AST 转换工具（自定义脚本）

3. **Vue → React**：
   - [React for Vue developers](https://react.dev/learn/thinking-in-react)
   - 模板转 JSX 工具（部分自动化）

### 手动迁移检查清单

- [ ] 状态管理转换（useState → createSignal / ref）
- [ ] 生命周期钩子对应（useEffect → createEffect / watch）
- [ ] 事件处理转换（onClick → onClick / @click）
- [ ] 条件渲染转换（三元/&& → v-if / v-show）
- [ ] 列表渲染转换（map → v-for）

## 总结

1. **React <-> Solid**：语法相似，主要改状态管理和副作用，对 TS 开发者成本低
2. **React <-> Vue.js**：学习曲线高（需学 HTML、JS、TS、模板语法），对只会 TS 者成本高于 React/Solid
3. **Solid <-> Vue.js**：响应式模型和语法差异大，需同时理解信号和 Proxy

选择迁移时，建议先在小模块试验，验证兼容性和性能后再全面推广。
