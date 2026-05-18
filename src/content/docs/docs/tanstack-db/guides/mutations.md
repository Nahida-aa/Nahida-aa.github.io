---
title: 变更操作
editUrl: true
---

# TanStack DB 变更操作

TanStack DB 提供了强大的变更系统，支持乐观更新与自动状态管理。该系统基于 **乐观变更 → 后端持久化 → 同步返回 → 确认状态** 的模式构建。这能在保持数据一致性的同时提供高度响应的用户体验，并且易于理解。

本地变更会立即作为乐观状态应用，然后持久化到后端，最后当服务器状态同步回来时，乐观状态会被确认的服务器状态替换。

```tsx
// 定义带有变更处理程序的集合
const todoCollection = createCollection({
  id: "todos",
  onUpdate: async ({ transaction }) => {
    const mutation = transaction.mutations[0]
    await api.todos.update(mutation.original.id, mutation.changes)
  },
})

// 应用乐观更新
todoCollection.update(todo.id, (draft) => {
  draft.completed = true
})
```

这种模式将 Redux/Flux 单向数据流从客户端扩展到包含服务器：

<figure>
  <a href="https://raw.githubusercontent.com/TanStack/db/main/docs/unidirectional-data-flow.lg.png" target="_blank">
    <img src="https://raw.githubusercontent.com/TanStack/db/main/docs/unidirectional-data-flow.png" />
  </a>
</figure>

通过乐观状态的内循环，以及持久化到服务器并将更新的服务器状态同步回集合的较慢外循环。

### 简化变更 vs 传统方法

TanStack DB 的变更系统消除了传统方法中乐观更新所需的大量样板代码。对比差异：

**之前（TanStack Query 手动乐观更新）：**

```typescript
const addTodoMutation = useMutation({
  mutationFn: async (newTodo) => api.todos.create(newTodo),
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] })
    const previousTodos = queryClient.getQueryData(['todos'])
    queryClient.setQueryData(['todos'], (old) => [...(old || []), newTodo])
    return { previousTodos }
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context.previousTodos)
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})
```

**之后（TanStack DB）：**

```typescript
const todoCollection = createCollection(
  queryCollectionOptions({
    queryKey: ['todos'],
    queryFn: async () => api.todos.getAll(),
    getKey: (item) => item.id,
    schema: todoSchema,
    onInsert: async ({ transaction }) => {
      await Promise.all(
        transaction.mutations.map((mutation) =>
          api.todos.create(mutation.modified)
        )
      )
    },
  })
)

// 简单变更 - 无样板代码！
todoCollection.insert({
  id: crypto.randomUUID(),
  text: '🔥 让应用更快',
  completed: false,
})
```

优势：
- ✅ 自动乐观更新
- ✅ 错误时自动回滚
- ✅ 无需手动操作缓存
- ✅ 类型安全的变更

## 目录

- [变更方法](#变更方法)
- [变更生命周期](#变更生命周期)
- [集合写入操作](#集合写入操作)
- [操作处理程序](#操作处理程序)
- [创建自定义操作](#创建自定义操作)
- [手动事务](#手动事务)
- [节奏化变更](#节奏化变更)
- [变更合并](#变更合并)
- [控制乐观行为](#控制乐观行为)
- [事务状态](#事务状态)
- [处理临时 ID](#处理临时-id)

## 变更方法

TanStack DB 提供不同的变更方法，每种适用于不同的使用场景：

### 集合级变更

集合级变更（`insert`、`update`、`delete`）专为单个集合的**直接状态操作**而设计。这是进行更改的最简单方式，适用于简单的 CRUD 操作。

```tsx
// 直接状态更改
todoCollection.update(todoId, (draft) => {
  draft.completed = true
  draft.completedAt = new Date()
})
```

在以下情况下使用集合级变更：
- 对单个集合进行简单的 CRUD 操作
- 状态更改简单且与服务器存储的内容一致

你可以使用 `metadata` 来注释这些操作并在处理程序中自定义行为：

```tsx
// 使用元数据注释
todoCollection.update(
  todoId,
  { metadata: { intent: 'complete' } },
  (draft) => {
    draft.completed = true
  }
)

// 在处理程序中使用元数据
onUpdate: async ({ transaction }) => {
  const mutation = transaction.mutations[0]

  if (mutation.metadata?.intent === 'complete') {
    await Promise.all(
      transaction.mutations.map((mutation) =>
        api.todos.complete(mutation.original.id)
      )
    )
  } else {
    await Promise.all(
      transaction.mutations.map((mutation) =>
        api.todos.update(mutation.original.id, mutation.changes)
      )
    )
  }
}
```

### 使用自定义操作的基于意图的变更

对于更复杂的场景，使用 `createOptimisticAction` 创建**基于意图的变更**，捕获特定的用户操作。

```tsx
// 意图："点赞这篇帖子"
const likePost = createOptimisticAction<string>({
  onMutate: (postId) => {
    // 对更改的乐观猜测
    postCollection.update(postId, (draft) => {
      draft.likeCount += 1
      draft.likedByMe = true
    })
  },
  mutationFn: async (postId) => {
    // 将意图发送到服务器
    await api.posts.like(postId)
    // 服务器确定实际状态更改
    await postCollection.utils.refetch()
  },
})

// 使用它
likePost(postId)
```

在以下情况下使用自定义操作：
- 需要在单个事务中变更**多个集合**
- 乐观变更是对服务器如何转换数据的**猜测**
- 你想将**用户意图**发送到后端，而不是精确的状态更改
- 服务器执行复杂的逻辑、计算或副作用
- 你想要一个干净、可重用的变更，捕获特定操作

自定义操作提供了一种最清晰的方式来捕获应用程序中作为命名操作的特定类型的变更。虽然使用集合级变更的元数据可以实现类似的结果，但自定义操作使意图明确，并将相关逻辑保持在一起。

**何时使用每种方法：**

- **集合级变更**（`collection.update`）：单个集合上的简单 CRUD 操作
- **`createOptimisticAction`**：基于意图的操作、多集合变更、立即提交
- **绕过变更系统**：使用现有的变更逻辑而无需重写

### 绕过变更系统

如果你在现有系统中已有变更逻辑，并且不想重写它，你可以**完全绕过** TanStack DB 的变更系统，使用现有模式。

使用这种方法，你可以使用现有逻辑正常写入服务器，然后使用集合的机制重新获取或同步数据以等待服务器写入。同步完成后，集合将拥有更新的服务器数据，你可以渲染新状态、隐藏加载指示器、显示成功消息、导航到新页面等。

```tsx
// 使用现有逻辑直接调用后端
const handleUpdateTodo = async (todoId, changes) => {
  await api.todos.update(todoId, changes)

  // 等待服务器更改加载到集合中
  await todoCollection.utils.refetch()
}

// 使用 Electric
const handleUpdateTodo = async (todoId, changes) => {
  const { txid } = await api.todos.update(todoId, changes)

  // 等待此特定事务同步到集合中
  await todoCollection.utils.awaitTxId(txid)

  // 现在服务器更改已加载，你可以相应地更新 UI
}
```

在以下情况下使用此方法：
- 你有不想重写的现有变更逻辑
- 你对当前的变更模式感到满意
- 你只想将 TanStack DB 用于查询和状态管理

如何同步更改回来：
- **QueryCollection**：使用 `collection.utils.refetch()` 手动重新获取以从服务器重新加载数据
- **ElectricCollection**：使用 `collection.utils.awaitTxId(txid)` 等待特定事务同步
- **其他同步系统**：等待你的同步机制更新集合

## 变更生命周期

变更生命周期在所有变更类型中遵循一致的的模式：

1. **应用乐观状态**：变更立即作为乐观状态应用到本地集合
2. **调用处理程序**：调用适当的处理程序 — 要么是 `mutationFn`，要么是集合处理程序（`onInsert`、`onUpdate` 或 `onDelete`）— 以持久化更改
3. **后端持久化**：你的处理程序将数据持久化到后端
4. **同步返回**：处理程序确保服务器写入已同步回集合
5. **丢弃乐观状态**：同步后，乐观状态被确认的服务器状态替换

```tsx
// 步骤 1：立即应用乐观状态
todoCollection.update(todo.id, (draft) => {
  draft.completed = true
})
// UI 立即使用乐观状态更新

// 步骤 2-3：onUpdate 处理程序持久化到后端
// 步骤 4：处理程序等待同步返回
// 步骤 5：乐观状态被服务器状态替换
```

如果处理程序在持久化期间抛出错误，乐观状态会自动回滚。

## 集合写入操作

集合支持三种核心写入操作：`insert`、`update` 和 `delete`。每个操作都会立即应用乐观状态并触发相应的操作处理程序。

### Insert（插入）

向集合添加新项目：

```typescript
// 插入单个项目
todoCollection.insert({
  id: "1",
  text: "买菜",
  completed: false
})

// 插入多个项目
todoCollection.insert([
  { id: "1", text: "买菜", completed: false },
  { id: "2", text: "遛狗", completed: false },
])

// 带元数据插入
todoCollection.insert(
  { id: "1", text: "自定义项目", completed: false },
  { metadata: { source: "import" } }
)

// 不带乐观更新插入
todoCollection.insert(
  { id: "1", text: "服务器验证项目", completed: false },
  { optimistic: false }
)
```

**返回**：一个 `Transaction` 对象，可用于跟踪变更的生命周期。

### Update（更新）

使用不可变草稿模式修改现有项目：

```typescript
// 更新单个项目
todoCollection.update(todo.id, (draft) => {
  draft.completed = true
})

// 更新多个项目
todoCollection.update([todo1.id, todo2.id], (drafts) => {
  drafts.forEach((draft) => {
    draft.completed = true
  })
})

// 带元数据更新
todoCollection.update(
  todo.id,
  { metadata: { reason: "用户更新" } },
  (draft) => {
    draft.text = "更新后的文本"
  }
)

// 不带乐观更新更新
todoCollection.update(
  todo.id,
  { optimistic: false },
  (draft) => {
    draft.status = "服务器验证"
  }
)
```

**参数**：
- `key` 或 `keys`：要更新的项目键
- `options`（可选）：带有 `metadata` 和/或 `optimistic` 标志的配置对象
- `updater`：接收草稿以进行变更的函数

**返回**：一个 `Transaction` 对象，可用于跟踪变更的生命周期。

> [!IMPORTANT]
> `updater` 函数使用类似 Immer 的模式来将更改捕获为不可变更新。你绝不能重新分配草稿参数本身 — 只能变更其属性。

### Delete（删除）

从集合中移除项目：

```typescript
// 删除单个项目
todoCollection.delete(todo.id)

// 删除多个项目
todoCollection.delete([todo1.id, todo2.id])

// 带元数据删除
todoCollection.delete(todo.id, {
  metadata: { reason: "已完成" }
})

// 不带乐观更新删除
todoCollection.delete(todo.id, { optimistic: false })
```

**参数**：
- `key` 或 `keys`：要删除的项目键
- `options`（可选）：带有 `metadata` 和/或 `optimistic` 标志的配置对象

**返回**：一个 `Transaction` 对象，可用于跟踪变更的生命周期。

## 操作处理程序

操作处理程序是在创建集合时提供的函数，用于处理将变更持久化到后端。每个集合可以定义三个可选处理程序：`onInsert`、`onUpdate` 和 `onDelete`。

### 处理程序签名

所有操作处理程序都接收带有以下属性的对象：

```typescript
type OperationHandler = (params: {
  transaction: Transaction
  collection: Collection
}) => Promise<any> | any
```

`transaction` 对象包含：
- `mutations`：变更对象数组，每个对象包含：
  - `collection`：正在变更的集合
  - `type`：变更类型（`'insert'`、`'update'` 或 `'delete'`）
  - `original`：原始项目（用于更新和删除）
  - `modified`：修改的项目（用于插入和更新）
  - `changes`：更改对象（用于更新）
  - `key`：项目键
  - `metadata`：附加到变更的可选元数据

### 定义操作处理程序

在创建集合时定义处理程序：

```typescript
const todoCollection = createCollection({
  id: "todos",
  // ... 其他选项

  onInsert: async ({ transaction }) => {
    await Promise.all(
      transaction.mutations.map((mutation) =>
        api.todos.create(mutation.modified)
      )
    )
  },

  onUpdate: async ({ transaction }) => {
    await Promise.all(
      transaction.mutations.map((mutation) =>
        api.todos.update(mutation.original.id, mutation.changes)
      )
    )
  },

  onDelete: async ({ transaction }) => {
    await Promise.all(
      transaction.mutations.map((mutation) =>
        api.todos.delete(mutation.original.id)
      )
    )
  },
})
```

> [!IMPORTANT]
> 在操作处理程序必须等待服务器更改同步回集合后才能解析。不同的集合类型提供不同的模式来确保正确执行。

### 集合特定的处理程序模式

不同的集合类型有其处理程序的特定模式：

**QueryCollection** - 处理程序完成后自动重新获取：
```typescript
onUpdate: async ({ transaction }) => {
  await Promise.all(
    transaction.mutations.map((mutation) =>
      api.todos.update(mutation.original.id, mutation.changes)
    )
  )
  // 处理程序完成后自动重新获取
}
```

**ElectricCollection** - 返回 txid 以跟踪同步：
```typescript
onUpdate: async ({ transaction }) => {
  const txids = await Promise.all(
    transaction.mutations.map(async (mutation) => {
      const response = await api.todos.update(mutation.original.id, mutation.changes)
      return response.txid
    })
  )
  return { txid: txids }
}
```

### 通用变更函数

你可以为整个应用程序定义一个通用变更函数：

```typescript
import type { MutationFn } from "@tanstack/react-db"

const mutationFn: MutationFn = async ({ transaction }) => {
  const response = await api.mutations.batch(transaction.mutations)

  if (!response.ok) {
    throw new Error(`HTTP 错误: ${response.status}`)
  }
}

// 在集合中使用
const todoCollection = createCollection({
  id: "todos",
  onInsert: mutationFn,
  onUpdate: mutationFn,
  onDelete: mutationFn,
})
```

### 变更处理程序中的模式验证

当为集合配置模式时，TanStack DB 会在变更期间自动验证和转换数据。变更处理程序接收的是**转换后的数据**（TOutput），而不是原始输入。

```typescript
const todoSchema = z.object({
  id: z.string(),
  text: z.string(),
  created_at: z.string().transform(val => new Date(val))  // TInput: string, TOutput: Date
})

const collection = createCollection({
  schema: todoSchema,
  onInsert: async ({ transaction }) => {
    const item = transaction.mutations[0].modified

    // item.created_at 已经是 Date 对象 (TOutput)
    console.log(item.created_at instanceof Date)  // true

    // 如果你的 API 需要字符串，请在处理程序中序列化
    await api.todos.create({
      ...item,
      created_at: item.created_at.toISOString()  // Date → string
    })
  }
})

// 用户提供字符串 (TInput)
collection.insert({
  id: "1",
  text: "任务",
  created_at: "2024-01-01T00:00:00Z"
})
```

**关键点：**
- 模式验证在调用变更处理程序**之前**进行
- 处理程序接收的是 **TOutput**（转换后的数据）
- 如果你的后端需要不同的格式，请在处理程序中进行序列化
- 模式验证错误会在处理程序运行之前抛出 `SchemaValidationError`

有关模式验证和转换的详细文档，请参阅模式指南（对应英文文档的 schemas.md）。

## 创建自定义操作

对于更复杂的变更模式，使用 `createOptimisticAction` 创建具有对变更生命周期完全控制的自定义操作。

### 基本操作

创建一个结合变更逻辑与持久化的操作：

```tsx
import { createOptimisticAction } from "@tanstack/react-db"

const addTodo = createOptimisticAction<string>({
  onMutate: (text) => {
    // 应用乐观状态
    todoCollection.insert({
      id: crypto.randomUUID(),
      text,
      completed: false,
    })
  },
  mutationFn: async (text, params) => {
    // 持久化到后端
    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text, completed: false }),
    })
    const result = await response.json()

    // 等待同步返回
    await todoCollection.utils.refetch()

    return result
  },
})

// 在组件中使用
const Todo = () => {
  const handleClick = () => {
    addTodo("🔥 让应用更快")
  }

  return <Button onClick={handleClick} />
}
```

### 使用模式验证的类型安全操作

为了更好的类型安全性和运行时验证，你可以使用模式验证库，如 Zod、Valibot 或其他。以下是使用 Zod 的示例：

```tsx
import { createOptimisticAction } from "@tanstack/react-db"
import { z } from "zod"

// 为操作参数定义模式
const addTodoSchema = z.object({
  text: z.string().min(1, "待办事项文本不能为空"),
  priority: z.enum(["low", "medium", "high"]).optional(),
})

// 使用模式的推断类型作为泛型
const addTodo = createOptimisticAction<z.infer<typeof addTodoSchema>>({
  onMutate: (params) => {
    // 在运行时验证参数
    const validated = addTodoSchema.parse(params)

    // 应用乐观状态
    todoCollection.insert({
      id: crypto.randomUUID(),
      text: validated.text,
      priority: validated.priority ?? "medium",
      completed: false,
    })
  },
  mutationFn: async (params) => {
    // 参数已经过验证
    const validated = addTodoSchema.parse(params)

    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({
        text: validated.text,
        priority: validated.priority ?? "medium",
        completed: false,
      }),
    })
    const result = await response.json()

    await todoCollection.utils.refetch()
    return result
  },
})

// 使用类型安全的参数
const Todo = () => {
  const handleClick = () => {
    addTodo({
      text: "🔥 让应用更快",
      priority: "high",
    })
  }

  return <Button onClick={handleClick} />
}
```

这种模式适用于任何验证库（Zod、Valibot、Yup 等），并提供：
- ✅ 参数的运行时验证
- ✅ 来自推断类型的类型安全
- ✅ 无效输入的清晰错误消息
- ✅ 参数形状的唯一事实来源

### 复杂的多集合操作

操作可以变更多个集合：

```tsx
const createProject = createOptimisticAction<{
  name: string
  ownerId: string
}>({
  onMutate: ({ name, ownerId }) => {
    const projectId = crypto.randomUUID()

    // 插入项目
    projectCollection.insert({
      id: projectId,
      name,
      ownerId,
      createdAt: new Date(),
    })

    // 更新用户的项目计数
    userCollection.update(ownerId, (draft) => {
      draft.projectCount += 1
    })
  },
  mutationFn: async ({ name, ownerId }) => {
    const response = await api.projects.create({ name, ownerId })

    // 等待两个集合都同步
    await Promise.all([
      projectCollection.utils.refetch(),
      userCollection.utils.refetch(),
    ])

    return response
  },
})
```

### 操作参数

`mutationFn` 接收用于高级用例的附加参数：

```tsx
const updateTodo = createOptimisticAction<{
  id: string
  changes: Partial<Todo>
}>({
  onMutate: ({ id, changes }) => {
    todoCollection.update(id, (draft) => {
      Object.assign(draft, changes)
    })
  },
  mutationFn: async ({ id, changes }, params) => {
    // params.transaction 包含事务对象
    // params.signal 是用于取消的 AbortSignal

    const response = await api.todos.update(id, changes, {
      signal: params.signal,
    })

    await todoCollection.utils.refetch()
    return response
  },
})
```

## 手动事务

为了最大限度地控制事务生命周期，使用 `createTransaction` 手动创建事务。这种方法允许你批量处理多个变更、实现自定义提交流程，或创建跨多个用户交互的事务。

### 基本手动事务

```ts
import { createTransaction } from "@tanstack/react-db"

const addTodoTx = createTransaction({
  autoCommit: false,
  mutationFn: async ({ transaction }) => {
    // 将所有变更持久化到后端
    await Promise.all(
      transaction.mutations.map((mutation) =>
        api.saveTodo(mutation.modified)
      )
    )
  },
})

// 应用第一个更改
addTodoTx.mutate(() =>
  todoCollection.insert({
    id: "1",
    text: "第一个待办事项",
    completed: false
  })
)

// 用户审查更改...

// 应用另一个更改
addTodoTx.mutate(() =>
  todoCollection.insert({
    id: "2",
    text: "第二个待办事项",
    completed: false
  })
)

// 用户准备好时提交（例如，当他们点击保存时）
addTodoTx.commit()
```

### 事务配置

手动事务接受以下选项：

```typescript
createTransaction({
  id?: string,              // 事务的可选唯一标识符
  autoCommit?: boolean,     // 是否在 mutate() 后自动提交
  mutationFn: MutationFn,   // 持久化变更的函数
  metadata?: Record<string, unknown>, // 可选自定义元数据
})
```

**autoCommit**：
- `true`（默认）：事务在每次 `mutate()` 调用后立即提交
- `false`：事务等待显式 `commit()` 调用

### 事务方法

手动事务提供几种方法：

```typescript
// 在事务内应用变更
tx.mutate(() => {
  collection.insert(item)
  collection.update(key, updater)
})

// 提交事务
await tx.commit()

// 手动回滚更改（例如，用户取消表单）
// 注意：如果 mutationFn 抛出错误，回滚会自动发生
tx.rollback()
```

### 多步骤工作流

手动事务擅长处理复杂工作流：

```ts
const reviewTx = createTransaction({
  autoCommit: false,
  mutationFn: async ({ transaction }) => {
    await api.batchUpdate(transaction.mutations)
  },
})

// 步骤 1：用户进行初始更改
reviewTx.mutate(() => {
  todoCollection.update(id1, (draft) => {
    draft.status = "已审查"
  })
  todoCollection.update(id2, (draft) => {
    draft.status = "已审查"
  })
})

// 步骤 2：向用户显示预览...

// 步骤 3：用户确认或进行额外更改
reviewTx.mutate(() => {
  todoCollection.update(id3, (draft) => {
    draft.status = "已审查"
  })
})

// 步骤 4：用户一次性提交所有更改
await reviewTx.commit()
// 或用户取消
// reviewTx.rollback()
```

### 与本地集合一起使用

当与手动事务一起使用时，LocalOnly 和 LocalStorage 集合需要特殊处理。与具有自动调用 `onInsert`、`onUpdate` 和 `onDelete` 处理程序的服务器同步集合不同，本地集合需要你在事务的 `mutationFn` 中手动调用 `utils.acceptMutations()` 来接受变更。

#### 为什么需要这样做

本地集合（LocalOnly 和 LocalStorage）不参与手动事务的标准变更处理程序流程。它们需要显式调用以持久化在 `tx.mutate()` 期间所做的更改。

#### 基本用法

```ts
import { createTransaction } from "@tanstack/react-db"
import { localOnlyCollectionOptions } from "@tanstack/react-db"

const formDraft = createCollection(
  localOnlyCollectionOptions({
    id: "form-draft",
    getKey: (item) => item.id,
  })
)

const tx = createTransaction({
  autoCommit: false,
  mutationFn: async ({ transaction }) => {
    // 首先使用数据调用 API
    const draftData = transaction.mutations
      .filter((m) => m.collection === formDraft)
      .map((m) => m.modified)

    await api.saveDraft(draftData)

    // API 成功后，接受并持久化本地集合变更
    formDraft.utils.acceptMutations(transaction)
  },
})

// 应用变更
tx.mutate(() => {
  formDraft.insert({ id: "1", field: "value" })
})

// 准备好时提交
await tx.commit()
```

#### 组合本地和服务器集合

你可以在同一事务中混合使用本地和服务器集合：

```ts
const localSettings = createCollection(
  localStorageCollectionOptions({
    id: "user-settings",
    storageKey: "app-settings",
    getKey: (item) => item.id,
  })
)

const userProfile = createCollection(
  queryCollectionOptions({
    queryKey: ["profile"],
    queryFn: async () => api.profile.get(),
    getKey: (item) => item.id,
    onUpdate: async ({ transaction }) => {
      await api.profile.update(transaction.mutations[0].modified)
    },
  })
)

const tx = createTransaction({
  mutationFn: async ({ transaction }) => {
    // 在 mutationFn 中显式处理服务器集合变更
    await Promise.all(
      transaction.mutations
        .filter((m) => m.collection === userProfile)
        .map((m) => api.profile.update(m.modified))
    )

    // 服务器变更成功后，接受本地集合变更
    localSettings.utils.acceptMutations(transaction)
  },
})

// 在一个事务中更新本地和服务器数据
tx.mutate(() => {
  localSettings.update("theme", (draft) => {
    draft.mode = "dark"
  })
  userProfile.update("user-1", (draft) => {
    draft.name = "更新后的名称"
  })
})

await tx.commit()
```

#### 事务排序

**何时调用 `acceptMutations`** 对事务语义很重要：

**在 API 成功之后（推荐用于一致性）：**
```ts
mutationFn: async ({ transaction }) => {
  await api.save(data)  // 首先调用 API
  localData.utils.acceptMutations(transaction)  // 成功后再持久化
}
```

✅ **优点**：如果 API 失败，本地更改也会回滚（全有或全无语义）
❌ **缺点**：在 API 成功之前，本地状态不会反映更改

**在 API 调用之前（用于独立的本地状态）：**
```ts
mutationFn: async ({ transaction }) => {
  localData.utils.acceptMutations(transaction)  // 首先持久化
  await api.save(data)  // 然后调用 API
}
```

✅ **优点**：无论 API 结果如何，本地状态都会立即持久化
❌ **缺点**：API 失败会导致本地更改持久化（状态不一致）

根据你的本地数据是否应该独立于或耦合到远程变更来选择。

#### 最佳实践

- 始终为手动事务中的本地集合调用 `utils.acceptMutations()`
- 如果你想要事务一致性，在 API 成功**之后**调用 `acceptMutations`
- 如果本地状态应该无论如何都持久化，在 API 调用**之前**调用 `acceptMutations`
- 如果你需要分别处理它们，请按集合过滤变更
- 在同一事务中自由混合本地和服务器集合

### 监听事务生命周期

监控事务状态更改：

```typescript
const tx = createTransaction({
  autoCommit: false,
  mutationFn: async ({ transaction }) => {
    await api.persist(transaction.mutations)
  },
})

// 等待事务完成
tx.isPersisted.promise.then(() => {
  console.log("事务已持久化！")
})

// 检查当前状态
console.log(tx.state) // 'pending'、'persisting'、'completed' 或 'failed'
```

## 节奏化变更

节奏化变更提供了对**何时以及如何在后端持久化变更**的细粒度控制。你可以使用时序策略来批量处理、延迟或根据应用程序的需要排队变更，而不是立即持久化每个变更。

由 [TanStack Pacer](https://github.com/TanStack/pacer) 提供支持，节奏化变更非常适合以下场景：
- **自动保存表单**，等待用户停止输入
- **滑块控件**，需要平滑更新而不会压垮后端
- **顺序工作流**，其中顺序很重要，每个变更都必须持久化

### 关键设计

策略之间的根本区别在于它们如何处理事务：

**防抖/节流**：一次只有一个待处理事务（收集变更）和一个持久化事务（写入后端）。多个快速变更会自动合并到单个事务中。

**队列**：每个变更创建一个单独的事务，保证按创建顺序处理（默认为 FIFO，可配置为 LIFO）。所有变更都保证会持久化。

### 可用策略

| 策略 | 行为 | 最适合 |
|----------|----------|----------|
| **`debounceStrategy`** | 在持久化之前等待不活动期。只保存最终状态。 | 自动保存表单、输入时搜索 |
| **`throttleStrategy`** | 确保执行之间的最小间隔。执行之间的变更会被合并。 | 滑块、进度更新、分析 |
| **`queueStrategy`** | 每个变更成为一个单独的事务，按顺序处理（默认为 FIFO，可配置为 LIFO）。保证所有变更都会持久化。 | 顺序工作流、文件上传、受速率限制的 API |

### 防抖策略

防抖策略在持久化之前等待一段不活动期。这非常适合自动保存场景，你想等待用户停止输入后再保存他们的工作。

```tsx
import { usePacedMutations, debounceStrategy } from "@tanstack/react-db"

function AutoSaveForm({ formId }: { formId: string }) {
  const mutate = usePacedMutations<{ field: string; value: string }>({
    onMutate: ({ field, value }) => {
      // 立即应用乐观更新
      formCollection.update(formId, (draft) => {
        draft[field] = value
      })
    },
    mutationFn: async ({ transaction }) => {
      // 将最终合并的状态持久化到后端
      await api.forms.save(transaction.mutations)
    },
    // 在最后一次更改后等待 500ms 再持久化
    strategy: debounceStrategy({ wait: 500 }),
  })

  const handleChange = (field: string, value: string) => {
    // 多个快速更改合并到单个事务中
    mutate({ field, value })
  }

  return (
    <form>
      <input onChange={(e) => handleChange('title', e.target.value)} />
      <textarea onChange={(e) => handleChange('content', e.target.value)} />
    </form>
  )
}
```

**关键特征**：
- 每次变更时计时器重置
- 只有最终合并的状态会持久化
- 显著减少快速更改的后端写入次数

### 节流策略

节流策略确保执行之间的最小间隔。这非常适合滑块或进度更新等场景，你希望平滑、一致的更新而不会压垮后端。

```tsx
import { usePacedMutations, throttleStrategy } from "@tanstack/react-db"

function VolumeSlider() {
  const mutate = usePacedMutations<number>({
    onMutate: (volume) => {
      // 立即应用乐观更新
      settingsCollection.update('volume', (draft) => {
        draft.value = volume
      })
    },
    mutationFn: async ({ transaction }) => {
      await api.settings.updateVolume(transaction.mutations)
    },
    // 最多每 200ms 持久化一次
    strategy: throttleStrategy({
      wait: 200,
      leading: true,   // 在第一次调用时立即执行
      trailing: true,  // 在等待期后如果有变更则执行
    }),
  })

  const handleVolumeChange = (volume: number) => {
    mutate(volume)
  }

  return (
    <input
      type="range"
      min={0}
      max={100}
      onChange={(e) => handleVolumeChange(Number(e.target.value))}
    />
  )
}
```

**关键特征**：
- 保证持久化之间的最小间隔
- 可以在前导边缘、后导边缘或两者上执行
- 执行之间的变更会被合并

### 队列策略

队列策略为每个变更创建一个单独的事务，并按顺序处理。与可能会丢弃中间变更的防抖/节流不同，**保证每个变更都会被尝试**，这使它成为不能跳过任何操作的工作流的理想选择。

```tsx
import { usePacedMutations, queueStrategy } from "@tanstack/react-db"

function FileUploader() {
  const mutate = usePacedMutations<File>({
    onMutate: (file) => {
      // 立即应用乐观更新
      uploadCollection.insert({
        id: crypto.randomUUID(),
        file,
        status: 'pending',
      })
    },
    mutationFn: async ({ transaction }) => {
      // 每个文件上传都是自己的事务
      const mutation = transaction.mutations[0]
      await api.files.upload(mutation.modified)
    },
    // 按顺序处理每个上传，它们之间间隔 500ms
    strategy: queueStrategy({
      wait: 500,
      addItemsTo: 'back',    // FIFO：添加到队列后面
      getItemsFrom: 'front', // FIFO：从队列前面处理
    }),
  })

  const handleFileSelect = (files: FileList) => {
    // 每个文件创建自己的事务，排队等待顺序处理
    Array.from(files).forEach((file) => {
      mutate(file)
    })
  }

  return <input type="file" multiple onChange={(e) => handleFileSelect(e.target.files!)} />
}
```

**关键特征**：
- 每个变更成为自己的事务
- 按顺序处理（默认为 FIFO）
- 可以通过设置 `getItemsFrom: 'back'` 配置为 LIFO
- 保证所有变更都会被尝试（与可能跳过中间变更的防抖/节流不同）
- 在启动下一个之前等待每个事务完成

**错误处理**：
- 如果变更失败，**不会自动重试** - 事务转换为"failed"状态
- 失败的变更通过 `transaction.isPersisted.promise`（将被拒绝）暴露其错误
- **后续变更继续处理** - 单个失败不会阻塞队列
- 每个变更都是独立的；多个变更之间没有全有或全无的事务语义
- 要实现重试逻辑，请参阅[重试行为](#重试行为)

### 选择策略

使用本指南为你的用例选择正确的策略：

**使用 `debounceStrategy` 当：**
- 你想等待用户完成他们的操作
- 只有最终状态重要（中间状态可以被丢弃）
- 你想最小化后端写入
- 示例：自动保存表单、输入时搜索、设置面板

**使用 `throttleStrategy` 当：**
- 你想要以受控的速率进行平滑、一致的更新
- 一些中间状态应该持久化，但不是全部
- 你需要更新感觉响应迅速而不会压垮后端
- 示例：音量滑块、进度条、分析跟踪、实时光标位置

**使用 `queueStrategy` 当：**
- 每个变更都必须持久化（不能丢失任何操作）
- 操作顺序很重要
- 你正在使用受速率限制的 API
- 你需要带延迟的顺序处理
- 示例：文件上传、批处理操作、审计跟踪、多步骤向导

### 在 React 中使用

`usePacedMutations` 钩子使得在 React 组件中使用节奏化变更变得容易：

```tsx
import { usePacedMutations, debounceStrategy } from "@tanstack/react-db"

function MyComponent({ itemId }: { itemId: string }) {
  const mutate = usePacedMutations<number>({
    onMutate: (newValue) => {
      // 立即应用乐观更新
      collection.update(itemId, (draft) => {
        draft.value = newValue
      })
    },
    mutationFn: async ({ transaction }) => {
      await api.save(transaction.mutations)
    },
    strategy: debounceStrategy({ wait: 500 }),
  })

  // 每个 mutate 调用都返回一个你可以等待的 Transaction
  const handleSave = async (newValue: number) => {
    const tx = mutate(newValue)

    // 可以选择等待持久化
    try {
      await tx.isPersisted.promise
      console.log('保存成功！')
    } catch (error) {
      console.error('保存失败:', error)
    }
  }

  return <button onClick={() => handleSave(42)}>保存</button>
}
```

该钩子自动记忆化策略和变更函数，以防止不必要的重新创建。你也可以在 React 之外直接使用 `createPacedMutations`：

```ts
import { createPacedMutations, queueStrategy } from "@tanstack/db"

const mutate = createPacedMutations<{ id: string; changes: Partial<Item> }>({
  onMutate: ({ id, changes }) => {
    // 立即应用乐观更新
    collection.update(id, (draft) => {
      Object.assign(draft, changes)
    })
  },
  mutationFn: async ({ transaction }) => {
    await api.save(transaction.mutations)
  },
  strategy: queueStrategy({ wait: 200 }),
})

// 在应用程序的任何地方使用
mutate({ id: '123', changes: { name: '新名称' } })
```

### 理解队列和钩子实例

**每个唯一的 `usePacedMutations` 钩子调用都会创建自己独立的队列。** 这是影响你如何构建变更的重要设计决策。

如果你有多个组件分别调用 `usePacedMutations`，每个组件都将有自己的隔离队列：

```tsx
function EmailDraftEditor1({ draftId }: { draftId: string }) {
  // 这会创建队列 A
  const mutate = usePacedMutations({
    onMutate: (text) => {
      draftCollection.update(draftId, (draft) => {
        draft.text = text
      })
    },
    mutationFn: async ({ transaction }) => {
      await api.saveDraft(transaction.mutations)
    },
    strategy: debounceStrategy({ wait: 500 }),
  })

  return <textarea onChange={(e) => mutate(e.target.value)} />
}

function EmailDraftEditor2({ draftId }: { draftId: string }) {
  // 这会创建队列 B（与队列 A 分开）
  const mutate = usePacedMutations({
    onMutate: (text) => {
      draftCollection.update(draftId, (draft) => {
        draft.text = text
      })
    },
    mutationFn: async ({ transaction }) => {
      await api.saveDraft(transaction.mutations)
    },
    strategy: debounceStrategy({ wait: 500 }),
  })

  return <textarea onChange={(e) => mutate(e.target.value)} />
}
```

在这个例子中，来自 `EmailDraftEditor1` 和 `EmailDraftEditor2` 的变更将**独立地**排队和处理。它们不会共享相同的防抖计时器或队列。

**要在多个组件之间共享同一个队列**，创建一个单独的 `createPacedMutations` 实例并在任何地方使用它：

```tsx
// 创建单个共享实例
import { createPacedMutations, debounceStrategy } from "@tanstack/db"

export const mutateDraft = createPacedMutations<{ draftId: string; text: string }>({
  onMutate: ({ draftId, text }) => {
    draftCollection.update(draftId, (draft) => {
      draft.text = text
    })
  },
  mutationFn: async ({ transaction }) => {
    await api.saveDraft(transaction.mutations)
  },
  strategy: debounceStrategy({ wait: 500 }),
})

// 现在两个组件共享同一个队列
function EmailDraftEditor1({ draftId }: { draftId: string }) {
  return <textarea onChange={(e) => mutateDraft({ draftId, text: e.target.value })} />
}

function EmailDraftEditor2({ draftId }: { draftId: string }) {
  return <textarea onChange={(e) => mutateDraft({ draftId, text: e.target.value })} />
}
```

通过这种方法，来自两个组件的所有变更共享相同的防抖计时器和队列，确保它们通过单个防抖实现以正确的顺序处理。

**关键要点：**

- 每个 `usePacedMutations()` 调用 = 唯一队列
- 每个 `createPacedMutations()` 调用 = 唯一队列
- 要共享队列：创建一个实例并在任何需要的地方导入它
- 共享队列确保来自不同地方的变更以正确的顺序排序

## 变更合并

当多个变更在事务内对同一项目进行操作时，TanStack DB 会智能地合并它们以：
- **减少网络流量**：发送到服务器的变更更少
- **保留用户意图**：最终状态与用户期望的一致
- **保持 UI 一致性**：本地状态始终反映用户操作

合并行为遵循基于变更类型的真值表：

| 现有 → 新      | 结果    | 描述                                       |
| ------------------- | --------- | ------------------------------------------------- |
| **insert + update** | `insert`  | 保持插入类型，合并更改，清空原始数据 |
| **insert + delete** | _已移除_ | 变更相互抵消                   |
| **update + delete** | `delete`  | 删除占主导                                  |
| **update + update** | `update`  | 联合更改，保留第一个原始数据                |

> [!NOTE]
> 尝试在事务内多次插入或删除同一项目将抛出错误。

## 控制乐观行为

默认情况下，所有变更都会立即应用乐观更新以提供即时反馈。但是，当你需要等待服务器确认后再在本地应用更改时，可以禁用此行为。

### 何时禁用乐观更新

在以下情况下考虑使用 `optimistic: false`：

- **复杂的服务器端处理**：依赖于服务器端生成的操作（例如，级联外键、计算字段）
- **验证要求**：后端验证可能会拒绝更改的操作
- **确认工作流**：删除时 UX 应该等待确认后再删除数据
- **批处理操作**：大型操作，乐观回滚会具有破坏性

### 行为差异

**`optimistic: true`（默认）**：
- 立即将变更应用到本地存储
- 提供即时 UI 反馈
- 如果服务器拒绝变更，需要回滚
- 最适合简单、可预测的操作

**`optimistic: false`**：
- 在服务器确认之前不修改本地存储
- 没有即时 UI 反馈，但不需要回滚
- UI 仅在成功的服务器响应后更新
- 最适合复杂或验证繁重的操作

### 使用非乐观变更

```typescript
// 需要确认的删除
const handleDeleteAccount = () => {
  userCollection.delete(userId, { optimistic: false })
}

// 服务器生成的数据
const handleCreateInvoice = () => {
  // 服务器生成发票号码、税费计算等
  invoiceCollection.insert(invoiceData, { optimistic: false })
}

// 同一事务中的混合方法
tx.mutate(() => {
  // 简单更改的即时 UI 反馈
  todoCollection.update(todoId, (draft) => {
    draft.completed = true
  })

  // 复杂更改等待服务器确认
  auditCollection.insert(auditRecord, { optimistic: false })
})
```

### 等待持久化

使用 `optimistic: false` 的一个常见模式是等待变更完成后再导航或显示成功反馈：

```typescript
const handleCreatePost = async (postData) => {
  // 不带乐观更新插入
  const tx = postsCollection.insert(postData, { optimistic: false })

  try {
    // 等待写入服务器并同步返回完成
    await tx.isPersisted.promise

    // 服务器写入和同步返回成功
    navigate(`/posts/${postData.id}`)
  } catch (error) {
    // 显示错误通知
    toast.error("创建帖子失败：" + error.message)
  }
}

// 也适用于更新和删除
const handleUpdateTodo = async (todoId, changes) => {
  const tx = todoCollection.update(
    todoId,
    { optimistic: false },
    (draft) => Object.assign(draft, changes)
  )

  try {
    await tx.isPersisted.promise
    navigate("/todos")
  } catch (error) {
    toast.error("更新待办事项失败：" + error.message)
  }
}
```

## 事务状态

事务在其生命周期内经历以下状态：

1. **`pending`**：创建事务时的初始状态，可以应用乐观变更
2. **`persisting`**：事务正在持久化到后端
3. **`completed`**：事务已成功持久化，并且任何后端更改都已同步返回
4. **`failed`**：持久化或同步返回事务时抛出错误

### 监控事务状态

```typescript
const tx = todoCollection.update(todoId, (draft) => {
  draft.completed = true
})

// 检查当前状态
console.log(tx.state) // 'pending'

// 等待特定状态
await tx.isPersisted.promise
console.log(tx.state) // 'completed' 或 'failed'

// 处理错误
try {
  await tx.isPersisted.promise
  console.log("成功！")
} catch (error) {
  console.log("失败：", error)
}
```

### 状态转换

正常流程是：`pending` → `persisting` → `completed`

如果发生错误：`pending` → `persisting` → `failed`

失败的事务会自动回滚其乐观状态。

### 重试行为

**重要提示：** TanStack DB 不会自动重试失败的变更。如果变更失败（网络错误、服务器错误等），事务会转换为 `failed` 状态，乐观状态会回滚。这是设计使然。自动重试逻辑根据你的用例有很大差异（幂等性要求、错误类型、退避策略等）。

要实现重试逻辑，请在你的 `mutationFn` 中包装你的 API 调用：

```typescript
// 简单重试助手
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (attempt === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)))
    }
  }
  throw new Error('不可达')
}

// 在集合中使用
const todoCollection = createCollection({
  id: "todos",
  onUpdate: async ({ transaction }) => {
    const mutation = transaction.mutations[0]
    // 最多重试 3 次，延迟递增
    await withRetry(() =>
      api.todos.update(mutation.original.id, mutation.changes)
    )
  },
})
```

对于更复杂的重试策略，请考虑使用像 [p-retry](https://github.com/sindresorhus/p-retry) 这样的库，它支持指数退避、自定义重试条件和中止信号。

## 处理临时 ID

当向服务器生成最终 ID 的集合中插入新项目时，你需要小心处理从临时 ID 到真实 ID 的过渡，以避免 UI 问题和新操作失败。

### 问题

当你使用临时 ID 插入项目时，乐观对象最终会被具有真实服务器生成 ID 的同步对象替换。这可能导致两个问题：

1. **UI 闪烁**：当键从临时 ID 更改为真实 ID 时，你的 UI 框架可能会卸载并重新挂载组件
2. **后续操作**：如果在真实 ID 同步回来之前尝试使用临时 ID 进行删除等操作，可能会失败

```tsx
// 生成临时 ID（例如，负数）
const tempId = -(Math.floor(Math.random() * 1000000) + 1)

// 使用临时 ID 插入
todoCollection.insert({
  id: tempId,
  text: "新待办事项",
  completed: false
})

// 问题 1：当 tempId 被真实 ID 替换时，UI 可能会重新渲染
// 问题 2：在同步完成之前尝试删除将使用 tempId
todoCollection.delete(tempId) // 后端可能会返回 404
```

### 解决方案 1：使用客户端生成的 UUID

如果你的后端支持客户端生成的 ID，请使用 UUID 完全消除临时 ID 问题：

```tsx
// 在客户端生成 UUID
const id = crypto.randomUUID()

todoCollection.insert({
  id,
  text: "新待办事项",
  completed: false
})

// 无闪烁 - ID 是稳定的
// 后续操作立即生效
todoCollection.delete(id) // 使用相同的 ID 工作
```

当你的后端支持时，这是最简洁的方法，因为 ID 永远不会更改。

### 解决方案 2：等待持久化或使用非乐观插入

等待变更持久化后再允许后续操作，或者使用非乐观插入以避免在真实 ID 可用之前显示项目：

```tsx
const handleCreateTodo = async (text: string) => {
  const tempId = -Math.floor(Math.random() * 1000000) + 1

  const tx = todoCollection.insert({
    id: tempId,
    text,
    completed: false
  })

  // 等待持久化完成
  await tx.isPersisted.promise

  // 现在我们有来自服务器的真实 ID
  // 后续操作将使用真实 ID
}

// 在持久化之前禁用删除按钮
const TodoItem = ({ todo, isPersisted }: { todo: Todo, isPersisted: boolean }) => {
  return (
    <div>
      {todo.text}
      <button
        onClick={() => todoCollection.delete(todo.id)}
        disabled={!isPersisted}
      >
        删除
      </button>
    </div>
  )
}
```

### 解决方案 3：维护视图键映射

为了在进行乐观更新的同时避免 UI 闪烁，维护从 ID（临时和真实）到稳定视图键的单独映射：

```tsx
// 创建映射 API
const idToViewKey = new Map<number | string, string>()

function getViewKey(id: number | string): string {
  if (!idToViewKey.has(id)) {
    idToViewKey.set(id, crypto.randomUUID())
  }
  return idToViewKey.get(id)!
}

function linkIds(tempId: number, realId: number) {
  const viewKey = getViewKey(tempId)
  idToViewKey.set(realId, viewKey)
}

// 配置集合以在真实 ID 返回时链接 ID
const todoCollection = createCollection({
  id: "todos",
  // ... 其他选项
  onInsert: async ({ transaction }) => {
    const mutation = transaction.mutations[0]
    const tempId = mutation.modified.id

    // 在服务器上创建 todo 并取回真实 ID
    const response = await api.todos.create({
      text: mutation.modified.text,
      completed: mutation.modified.completed,
    })
    const realId = response.id

    // 将临时 ID 链接到与真实 ID 相同的视图键
    linkIds(tempId, realId)

    // 等待同步返回
    await todoCollection.utils.refetch()
  },
})

// 使用临时 ID 插入时
const tempId = -Math.floor(Math.random() * 1000000) + 1
const viewKey = getViewKey(tempId) // 创建并存储映射

todoCollection.insert({
  id: tempId,
  text: "新待办事项",
  completed: false
})

// 使用视图键进行渲染
const TodoList = () => {
  const { data: todos } = useLiveQuery((q) =>
    q.from({ todo: todoCollection })
  )

  return (
    <ul>
      {todos.map((todo) => (
        <li key={getViewKey(todo.id)}> {/* 稳定键 */}
          {todo.text}
        </li>
      ))}
    </ul>
  )
}
```

这种模式在临时 → 真实 ID 转换期间维护稳定的键，防止你的 UI 框架卸载并重新挂载组件。视图键存储在集合项目之外，因此你不需要在数据模型中添加额外字段。

### 最佳实践

1. **尽可能使用 UUID**：客户端生成的 UUID 消除了临时 ID 问题
2. **确定性地生成临时 ID**：使用负数或特定模式来区分临时 ID 和真实 ID
3. **禁用临时项目上的操作**：在持久化完成之前禁用删除/更新按钮
4. **维护视图键映射**：创建 ID 和稳定视图键之间的映射以进行渲染

> [!NOTE]
> 有一个[未解决的问题](https://github.com/TanStack/db/issues/19)，用于添加对 TanStack DB 中临时 ID 处理的更好的内置支持。这将自动化视图键模式，使使用服务器生成的 ID 更容易。
