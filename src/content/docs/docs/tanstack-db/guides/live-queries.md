---
title: 实时查询
id: live-queries
---

# TanStack DB 实时查询

TanStack DB 提供了强大且类型安全的查询系统，允许你使用类似 SQL 的流式 API 从集合中获取、过滤、转换和聚合数据。所有查询默认都是**实时的**，意味着当底层数据更改时，它们会自动更新。

查询系统围绕一个类似于 Kysely 或 Drizzle 等 SQL 查询构建器的 API 构建，你可以链式调用方法来组合查询。查询构建器不会按照方法调用的顺序执行操作 —— 相反，它会将你的查询组合成一个优化的增量管道，然后高效地编译和执行。每个方法都返回一个新的查询构建器，允许你将操作链接在一起。

实时查询解析为集合，当底层数据更改时，这些集合会自动更新。你可以订阅更改、迭代结果并使用所有标准的集合方法。

```ts
import { createCollection, liveQueryCollectionOptions, eq } from '@tanstack/db'

const activeUsers = createCollection(liveQueryCollectionOptions({
  query: (q) =>
    q
      .from({ user: usersCollection })
      .where(({ user }) => eq(user.active, true))
      .select(({ user }) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }))
}))
```

结果类型会根据你的查询结构自动推断，提供完整的 TypeScript 支持。当你使用 `select` 子句时，结果类型与你的投影匹配。不使用 `select` 时，你会得到带有正确连接可选性的完整模式。

## 虚拟属性

实时查询结果在每一行上都包含计算的只读虚拟属性：

- `$synced`：当行被同步确认时为 `true`；当仍然是乐观状态时为 `false`。
- `$origin`：如果最后一次确认的更改来自此客户端，则为 `"local"`，否则为 `"remote"`。
- `$key`：结果行的键。
- `$collectionId`：源集合 ID。

这些属性可以在 `where`、`select` 和 `orderBy` 子句中使用。它们会自动添加到查询输出中，不应持久化回存储。

## 目录

- [创建实时查询集合](#创建实时查询集合)
- [使用 queryOnce 的一次性查询](#使用-queryonce-的一次性查询)
- [From 子句](#from-子句)
- [Where 子句](#where-子句)
- [Select 投影](#select-投影)
- [连接 (Joins)](#连接-joins)
- [子查询](#子查询)
- [包含 (Includes)](#包含-includes)
- [groupBy 和聚合](#groupby-和聚合)
- [findOne](#findone)
- [Distinct](#distinct)
- [Order By、Limit 和 Offset](#order-by-limit-和-offset)
- [可组合查询](#可组合查询)
- [响应式效果 (createEffect)](#响应式效果-createeffect)
- [表达式函数参考](#表达式函数参考)
- [函数式变体](#函数式变体)

## 创建实时查询集合

要创建实时查询集合，你可以使用带有 `createCollection` 的 `liveQueryCollectionOptions`，或使用便捷函数 `createLiveQueryCollection`。

### 使用 liveQueryCollectionOptions

创建实时查询的基本方法是使用带有 `createCollection` 的 `liveQueryCollectionOptions`：

```ts
import { createCollection, liveQueryCollectionOptions, eq } from '@tanstack/db'

const activeUsers = createCollection(liveQueryCollectionOptions({
  query: (q) =>
    q
      .from({ user: usersCollection })
      .where(({ user }) => eq(user.active, true))
      .select(({ user }) => ({
        id: user.id,
        name: user.name,
      }))
}))
```

### 配置选项

为了更多控制，你可以指定其他选项：

```ts
const activeUsers = createCollection(liveQueryCollectionOptions({
  id: 'active-users', // 可选：如未提供则自动生成
  query: (q) =>
    q
      .from({ user: usersCollection })
      .where(({ user }) => eq(user.active, true))
      .select(({ user }) => ({
        id: user.id,
        name: user.name,
      })),
  getKey: (user) => user.id, // 可选：如未提供则使用流键
  startSync: true, // 可选：立即开始同步
}))
```

| 选项 | 类型 | 描述 |
|--------|------|-------------|
| `id` | `string`（可选） | 实时查询的可选唯一标识符。如未提供，将自动生成。这用于调试和日志记录。 |
| `query` | `QueryBuilder` 或函数 | 查询定义，可以是 `Query` 实例或返回 `Query` 实例的函数。 |
| `getKey` | `(item) => string \| number`（可选） | 从每一行提取唯一键的函数。如未提供，将使用流的内部键。对于简单情况，这是来自父集合的键，但在连接的情况下，自动生成的键将是父键的组合。当你想为结果集合使用父集合中的特定键时，使用 `getKey` 很有用。 |
| `schema` | `Schema`（可选） | 可选的模式验证 |
| `startSync` | `boolean`（可选） | 是否立即开始同步。默认为 `true`。 |
| `gcTime` | `number`（可选） | 垃圾回收时间（毫秒）。默认为 `5000`（5 秒）。 |

### 便捷函数

对于更简单的情况，你可以使用 `createLiveQueryCollection` 作为快捷方式：

```ts
import { createLiveQueryCollection, eq } from '@tanstack/db'

const activeUsers = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .where(({ user }) => eq(user.active, true))
    .select(({ user }) => ({
      id: user.id,
      name: user.name,
    }))
)
```

## 使用 queryOnce 的一次性查询

如果你需要一次性快照（没有持续响应性），请使用 `queryOnce`。它会创建一个实时查询集合，预加载它，提取结果，并自动清理，因此你无需记住调用 `cleanup()`。

```ts
import { eq, queryOnce } from '@tanstack/db'

// 基本一次性查询
const activeUsers = await queryOnce((q) =>
  q
    .from({ user: usersCollection })
    .where(({ user }) => eq(user.active, true))
    .select(({ user }) => ({ id: user.id, name: user.name }))
)

// 使用 findOne() 的单个结果
const user = await queryOnce((q) =>
  q
    .from({ user: usersCollection })
    .where(({ user }) => eq(user.id, userId))
    .findOne()
)
```

将 `queryOnce` 用于脚本、后台任务、数据导出或 AI/LLM 上下文构建。`findOne()` 在没有匹配行时解析为 `undefined`。对于 UI 绑定和响应式更新，请改用实时查询。

### 与框架一起使用

在 React 中，你可以使用 `useLiveQuery` 钩子：

```tsx
import { useLiveQuery } from '@tanstack/react-db'

function UserList() {
  const activeUsers = useLiveQuery((q) =>
    q
      .from({ user: usersCollection })
      .where(({ user }) => eq(user.active, true))
  )

  return (
    <ul>
      {activeUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

在 Angular 中，你可以使用 `injectLiveQuery` 函数：

```typescript
import { Component } from '@angular/core'
import { injectLiveQuery } from '@tanstack/angular-db'

@Component({
  selector: 'user-list',
  template: `
    @for (user of activeUsers.data(); track user.id) {
      <li>{{ user.name }}</li>
    }
  `
})
export class UserListComponent {
  activeUsers = injectLiveQuery((q) =>
    q
      .from({ user: usersCollection })
      .where(({ user }) => eq(user.active, true))
  )
}
```

> **注意：** React 钩子（`useLiveQuery`、`useLiveInfiniteQuery`、`useLiveSuspenseQuery`）接受一个可选的依赖数组参数，在值更改时重新执行查询，类似于 React 的 `useEffect`。有关何时以及如何使用依赖数组的详细信息，请参阅 [React 适配器文档](../framework/react/overview#dependency-arrays)。

有关框架集成的更多详细信息，请参阅 [React](../framework/react/overview)、[Vue](../framework/vue/overview) 和 [Angular](../framework/angular/overview) 适配器文档。

### 使用 React Suspense

对于 React 应用程序，你可以使用 `useLiveSuspenseQuery` 钩子与 React Suspense 边界集成。此钩子在初始加载数据时暂停渲染，然后在更新流入时不再重新暂停。

```tsx
import { useLiveSuspenseQuery } from '@tanstack/react-db'
import { Suspense } from 'react'

function UserList() {
  // 这将暂停直到数据就绪
  const { data } = useLiveSuspenseQuery((q) =>
    q
      .from({ user: usersCollection })
      .where(({ user }) => eq(user.active, true))
  )

  // data 始终有定义 - 无需可选链
  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

function App() {
  return (
    <Suspense fallback={<div>加载用户中...</div>}>
      <UserList />
    </Suspense>
  )
}
```

#### 类型安全

与 `useLiveQuery` 的关键区别是，`data` 始终有定义（永远不会是 `undefined`）。钩子在初始加载期间暂停，因此当你的组件渲染时，保证数据可用：

```tsx
function UserStats() {
  const { data } = useLiveSuspenseQuery((q) =>
    q.from({ user: usersCollection })
  )

  // TypeScript 知道 data 是 Array<User>，而不是 Array<User> | undefined
  return <div>用户总数：{data.length}</div>
}
```

#### 错误处理

结合错误边界来处理加载错误：

```tsx
import { ErrorBoundary } from 'react-error-boundary'

function App() {
  return (
    <ErrorBoundary fallback={<div>加载用户失败</div>}>
      <Suspense fallback={<div>加载用户中...</div>}>
        <UserList />
      </Suspense>
    </ErrorBoundary>
  )
}
```

#### 响应式更新

初始加载后，数据更新会流入而无需重新暂停：

```tsx
function UserList() {
  const { data } = useLiveSuspenseQuery((q) =>
    q.from({ user: usersCollection })
  )

  // 在初始加载期间暂停一次
  // 之后，当用户更改时数据自动更新
  // UI 永远不会为实时更新重新暂停
  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

#### 依赖项更改时重新暂停

当依赖项更改时，钩子会重新暂停以加载新数据：

```tsx
function FilteredUsers({ minAge }: { minAge: number }) {
  const { data } = useLiveSuspenseQuery(
    (q) =>
      q
        .from({ user: usersCollection })
        .where(({ user }) => gt(user.age, minAge)),
    [minAge] // 当 minAge 更改时重新暂停
  )

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name} - {user.age}</li>
      ))}
    </ul>
  )
}
```

#### 何时使用哪个钩子

- **使用 `useLiveSuspenseQuery`** 当：
  - 你想使用 React Suspense 处理加载状态
  - 你更喜欢使用 `<Suspense>` 和 `<ErrorBoundary>` 组件处理加载/错误状态
  - 你想要保证非 undefined 的数据类型
  - 查询始终需要运行（不是条件性的）

- **使用 `useLiveQuery`** 当：
  - 你需要条件性/禁用的查询
  - 你更喜欢在组件内处理加载/错误状态
  - 你想内联显示加载状态而无需 Suspense
  - 你需要访问 `status` 和 `isLoading` 标志
  - **你正在使用带加载器的路由器**（React Router、TanStack Router 等）- 在加载器中预加载并在组件中使用 `useLiveQuery`

```tsx
// useLiveQuery - 在组件中处理状态
function UserList() {
  const { data, status, isLoading } = useLiveQuery((q) =>
    q.from({ user: usersCollection })
  )

  if (isLoading) return <div>加载中...</div>
  if (status === 'error') return <div>加载用户时出错</div>

  return <ul>{data?.map(user => <li key={user.id}>{user.name}</li>)}</ul>
}

// useLiveSuspenseQuery - 使用 Suspense/ErrorBoundary 处理状态
function UserList() {
  const { data } = useLiveSuspenseQuery((q) =>
    q.from({ user: usersCollection })
  )

  return <ul>{data.map(user => <li key={user.id}>{user.name}</li>)}</ul>
}

// 使用路由器加载器的 useLiveQuery - 推荐模式
// 在你的路由配置中：
const route = {
  path: '/users',
  loader: async () => {
    // 在加载器中预加载集合
    await usersCollection.preload()
    return null
  },
  component: UserList,
}

// 在你的组件中：
function UserList() {
  // 集合已加载，因此数据立即可用
  const { data } = useLiveQuery((q) =>
    q.from({ user: usersCollection })
  )

  return <ul>{data?.map(user => <li key={user.id}>{user.name}</li>)}</ul>
}
```

### 条件查询

在 React 中，你可以通过从 `useLiveQuery` 回调返回 `undefined` 或 `null` 来有条件地禁用查询。禁用时，钩子返回一个特殊状态，指示查询未激活。

```tsx
import { useLiveQuery } from '@tanstack/react-db'

function TodoList({ userId }: { userId?: string }) {
  const { data, isEnabled, status } = useLiveQuery((q) => {
    // 当 userId 不可用时禁用查询
    if (!userId) return undefined

    return q
      .from({ todos: todosCollection })
      .where(({ todos }) => eq(todos.userId, userId))
  }, [userId])

  if (!isEnabled) {
    return <div>请选择一个用户</div>
  }

  return (
    <ul>
      {data?.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  )
}
```

当查询被禁用时（回调返回 `undefined` 或 `null`）：
- `status` 是 `'disabled'`
- `data`、`state` 和 `collection` 是 `undefined`
- `isEnabled` 是 `false`
- `isLoading`、`isReady`、`isIdle` 和 `isError` 都是 `false`

这种模式对于"等待输入存在"的流程很有用，无需有条件地渲染钩子本身或管理外部启用标志。

### 替代回调返回类型

`useLiveQuery` 回调可以根据你的用例返回不同的类型：

#### 返回查询构建器（标准）

最常见的模式是返回查询构建器：

```tsx
const { data } = useLiveQuery((q) =>
  q.from({ todos: todosCollection })
     .where(({ todos }) => eq(todos.completed, false))
)
```

#### 返回预创建的集合

你可以直接返回现有集合：

```tsx
const activeUsersCollection = createLiveQueryCollection((q) =>
  q.from({ users: usersCollection })
     .where(({ users }) => eq(users.active, true))
)

function UserList({ usePrebuilt }: { usePrebuilt: boolean }) {
  const { data } = useLiveQuery((q) => {
    // 在预创建集合和即席查询之间切换
    if (usePrebuilt) return activeUsersCollection

    return q.from({ users: usersCollection })
  }, [usePrebuilt])

  return <ul>{data?.map(user => <li key={user.id}>{user.name}</li>)}</ul>
}
```

#### 返回 LiveQueryCollectionConfig

你可以返回一个配置对象来指定其他选项，如自定义 ID：

```tsx
const { data } = useLiveQuery((q) => {
  return {
    query: q.from({ items: itemsCollection })
               .select(({ items }) => ({ id: items.id })),
    id: 'items-view', // 用于调试的自定义 ID
    gcTime: 10000 // 自定义垃圾回收时间
  }
})
```

当你需要以下情况时，这特别有用：
- 附加稳定的 ID 用于调试或日志记录
- 配置特定于集合的选项，如 `gcTime` 或 `getKey`
- 在不同集合配置之间有条件地切换

## From 子句

每个查询的基础是 `from` 方法，它指定源集合或子查询。你可以使用对象语法为源设置别名。

### 方法签名

```ts
from({
  [alias]: Collection | Query,
}): Query
```

**参数：**
- `[alias]` - 集合或查询实例。注意，`from` 子句中只允许一个带别名的集合或子查询。

### 基本用法

从集合中选择所有记录的基本查询：

```ts
const allUsers = createCollection(liveQueryCollectionOptions({
  query: (q) => q.from({ user: usersCollection })
}))
```

结果包含所有用户及其完整模式。你可以迭代结果或通过键访问它们：

```ts
// 获取所有用户作为数组
const users = allUsers.toArray

// 通过 ID 获取特定用户
const user = allUsers.get(1)

// 检查用户是否存在
const hasUser = allUsers.has(1)
```

使用别名使你的查询更具可读性，尤其是在处理多个集合时：

```ts
const users = createCollection(liveQueryCollectionOptions({
  query: (q) => q.from({ u: usersCollection })
}))

// 使用别名访问字段
const userNames = createCollection(liveQueryCollectionOptions({
  query: (q) =>
    q
      .from({ u: usersCollection })
      .select(({ u }) => ({
        name: u.name,
        email: u.email,
      }))
}))
```

## Where 子句

使用 `where` 子句根据条件过滤数据。你可以链式调用多个 `where` —— 它们通过 `and` 逻辑组合。

`where` 方法接受一个回调函数，该函数接收包含表别名的对象，并返回布尔表达式。你使用比较函数（如 `eq()`、`gt()`）和逻辑运算符（如 `and()` 和 `or()`）构建这些表达式。这种声明式方法允许查询系统高效地优化你的过滤器。这些在[表达式函数参考](#表达式函数参考)部分有更详细的描述。这与使用 Kysely 或 Drizzle 构建查询非常相似。

需要注意的是，`where` 方法不是在每一行或结果上执行的函数，它是描述将要执行的查询的一种方式。这种声明式方法几乎适用于所有用例，但如果你需要使用更复杂的条件，还有 `fn.where` 函数式变体，在[函数式变体](#函数式变体)部分有描述。

### 方法签名

```ts
where(
  condition: (row: TRow) => Expression<boolean>
): Query
```

**参数：**
- `condition` - 接收带有表别名的行对象并返回布尔表达式的回调函数

### 基本过滤

通过简单条件过滤用户：

```ts
import { eq } from '@tanstack/db'

const activeUsers = createCollection(liveQueryCollectionOptions({
  query: (q) =>
    q
      .from({ user: usersCollection })
      .where(({ user }) => eq(user.active, true))
}))
```

### 多条件

链式调用多个 `where` 实现 AND 逻辑：

```ts
import { eq, gt } from '@tanstack/db'

const adultActiveUsers = createCollection(liveQueryCollectionOptions({
  query: (q) =>
    q
      .from({ user: usersCollection })
      .where(({ user }) => eq(user.active, true))
      .where(({ user }) => gt(user.age, 18))
}))
```

### 复杂条件

使用逻辑运算符构建复杂条件：

```ts
import { eq, gt, or, and } from '@tanstack/db'

const specialUsers = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .where(({ user }) => 
      and(
        eq(user.active, true),
        or(
          gt(user.age, 25),
          eq(user.role, 'admin')
        )
      )
    )
)
```

### 可用运算符

查询系统提供了多个比较运算符：

```ts
import { eq, gt, gte, lt, lte, like, ilike, inArray, and, or, not } from '@tanstack/db'

// 相等
eq(user.id, 1)

// 比较
gt(user.age, 18)    // 大于
gte(user.age, 18)   // 大于或等于
lt(user.age, 65)    // 小于
lte(user.age, 65)   // 小于或等于

// 字符串匹配
like(user.name, 'John%')    // 区分大小写的模式匹配
ilike(user.name, 'john%')   // 不区分大小写的模式匹配

// 数组成员资格
inArray(user.id, [1, 2, 3])

// 逻辑运算符
and(condition1, condition2)
or(condition1, condition2)
not(condition)
```

有关所有可用函数的完整参考，请参阅[表达式函数参考](#表达式函数参考)部分。

## Select 投影

使用 `select` 指定结果中要包含的字段并转换数据。不使用 `select` 时，你会得到完整模式。

与 `where` 子句类似，`select` 方法接受一个回调函数，该函数接收包含表别名的对象，并返回要包含在结果中的字段对象。这些可以与[表达式函数参考](#表达式函数参考)部分的函数结合使用以创建计算字段。你还可以使用展开运算符包含表中的所有字段。

### 方法签名

```ts
select(
  projection: (row: TRow) => Record<string, Expression>
): Query
```

**参数：**
- `projection` - 接收带有表别名的行对象并返回选定字段对象的回调函数

### 基本选择

从数据中选择的特定字段：

```ts
const userNames = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .select(({ user }) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }))
)

/*
结果类型：{ id: number, name: string, email: string }
*/
```

### 字段重命名

在结果中重命名字段：

```ts
const userProfiles = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .select(({ user }) => ({
      userId: user.id,
      fullName: user.name,
      contactEmail: user.email,
    }))
)
```

### 计算字段

使用表达式创建计算字段：

```ts
import { gt, length } from '@tanstack/db'

const userStats = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .select(({ user }) => ({
      id: user.id,
      name: user.name,
      isAdult: gt(user.age, 18),
      nameLength: length(user.name),
    }))
)
```

### 使用函数和包含所有字段

使用内置函数转换数据：

```ts
import { concat, upper, gt } from '@tanstack/db'

const formattedUsers = createCollection(liveQueryCollectionOptions({
  query: (q) =>
    q
      .from({ user: usersCollection })
      .select(({ user }) => ({
        ...user, // 包含所有用户字段
        displayName: upper(concat(user.firstName, ' ', user.lastName)),
        isAdult: gt(user.age, 18),
      }))
}))

/*
结果类型：
{
  id: number,
  name: string,
  email: string,
  displayName: string,
  isAdult: boolean,
}
*/
```

有关可用函数的完整列表，请参阅[表达式函数参考](#表达式函数参考)部分。

## 连接 (Joins)

使用 `join` 组合来自多个集合的数据。连接默认为 `left` 连接类型，仅支持相等条件。

TanStack DB 中的连接是组合来自多个集合的数据的一种方式，在概念上非常类似于 SQL 连接。当两个集合连接时，结果是一个新集合，其中包含作为单行组合的数据。新集合是一个实时查询集合，当底层数据更改时会自动更新。

没有 `select` 的 `join` 将返回以连接的集合别名命名空间化的行对象。

连接的结果类型将考虑连接类型，连接字段的可选性由连接类型决定。

> [!TIP]
> 如果你需要分层结果而不是平面连接行（例如，每个项目及其嵌套的问题），请参阅下面的[包含 (Includes)](#包含-includes)。

### 方法签名

```ts
join(
  { [alias]: Collection | Query },
  condition: (row: TRow) => Expression<boolean>, // 必须是 `eq` 条件
  joinType?: 'left' | 'right' | 'inner' | 'full'
): Query
```

**参数：**
- `aliases` - 键是别名，值是要连接的集合或子查询的对象
- `condition` - 接收组合行对象并返回相等条件的回调函数
- `joinType` - 可选的连接类型：`'left'`（默认）、`'right'`、`'inner'` 或 `'full'`

### 基本连接

连接用户及其帖子：

```ts
const userPosts = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .join({ post: postsCollection }, ({ user, post }) => 
      eq(user.id, post.userId)
    )
)

/*
结果类型：
{ 
  user: User,
  post?: Post, // post 是可选的，因为它是左连接
}
*/
```

### 连接类型

将连接类型指定为第三个参数：

```ts
const activeUserPosts = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .join(
      { post: postsCollection }, 
      ({ user, post }) => eq(user.id, post.userId),
      'inner', // `inner`、`left`、`right` 或 `full`
    )
)
```

或使用别名 `leftJoin`、`rightJoin`、`innerJoin` 和 `fullJoin` 方法：

### 左连接

```ts
// 左连接 - 所有用户，即使没有帖子
const allUsers = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .leftJoin(
      { post: postsCollection }, 
      ({ user, post }) => eq(user.id, post.userId),
    )
)

/*
结果类型：
{
  user: User,
  post?: Post, // post 是可选的，因为它是左连接
}
*/
```

### 右连接

```ts
// 右连接 - 所有帖子，即使没有用户
const allPosts = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .rightJoin(
      { post: postsCollection }, 
      ({ user, post }) => eq(user.id, post.userId),
    )
)

/*
结果类型：
{
  user?: User, // user 是可选的，因为它是右连接
  post: Post,
}
*/
```

### 内连接

```ts
// 内连接 - 仅匹配的记录
const activeUserPosts = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .innerJoin(
      { post: postsCollection }, 
      ({ user, post }) => eq(user.id, post.userId),
    )
)

/*
结果类型：
{
  user: User,
  post: Post,
}
*/
```

### 全连接

```ts
// 全连接 - 所有用户和所有帖子
const allUsersAndPosts = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .fullJoin(
      { post: postsCollection }, 
      ({ user, post }) => eq(user.id, post.userId),
    )
)

/*
结果类型：
{
  user?: User, // user 是可选的，因为它是全连接
  post?: Post, // post 是可选的，因为它是全连接
}
*/
```

### 多连接

在单个查询中链式调用多个连接：

```ts
const userPostComments = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .join({ post: postsCollection }, ({ user, post }) => 
      eq(user.id, post.userId)
    )
    .join({ comment: commentsCollection }, ({ post, comment }) => 
      eq(post.id, comment.postId)
    )
    .select(({ user, post, comment }) => ({
      userName: user.name,
      postTitle: post.title,
      commentText: comment.text,
    }))
)
```

## 子查询

子查询允许你将一个查询的结果用作另一个查询的输入，它们嵌入在查询本身中，并编译为单个查询管道。它们非常类似于作为单个操作的一部分执行的 SQL 子查询。

请注意，子查询与在新查询的 `from` 或 `join` 子句中使用实时查询结果不同。当你这样做时，中间结果被完全计算并且可供你访问，而子查询对其父查询是内部的，并且它们本身不会实例化为集合，因此效率更高。

有关在新查询的 `from` 或 `join` 子句中使用实时查询结果的更多详细信息，请参阅[缓存中间结果](#缓存中间结果)部分。

### `from` 子句中的子查询

使用子查询作为主源：

```ts
const activeUserPosts = createCollection(liveQueryCollectionOptions({
  query: (q) => {
    // 首先构建子查询
    const activeUsers = q
      .from({ user: usersCollection })
      .where(({ user }) => eq(user.active, true))
    
    // 在主查询中使用子查询
    return q
      .from({ activeUser: activeUsers })
      .join({ post: postsCollection }, ({ activeUser, post }) => 
        eq(activeUser.id, post.userId)
      )
  }
}))
```

### `join` 子句中的子查询

与子查询结果连接：

```ts
const userRecentPosts = createCollection(liveQueryCollectionOptions({
  query: (q) => {
    // 首先构建子查询
    const recentPosts = q
      .from({ post: postsCollection })
      .where(({ post }) => gt(post.createdAt, '2024-01-01'))
      .orderBy(({ post }) => post.createdAt, 'desc')
      .limit(1)
    
    // 在主查询中使用子查询
    return q
      .from({ user: usersCollection })
      .join({ recentPost: recentPosts }, ({ user, recentPost }) => 
        eq(user.id, recentPost.userId)
      )
  }
}))
```

### 子查询去重

当同一子查询在查询中被多次使用时，它会自动去重并仅执行一次：

```ts
const complexQuery = createCollection(liveQueryCollectionOptions({
  query: (q) => {
    // 构建一次子查询
    const activeUsers = q
      .from({ user: usersCollection })
      .where(({ user }) => eq(user.active, true))
    
    // 多次使用同一子查询
    return q
      .from({ activeUser: activeUsers })
      .join({ post: postsCollection }, ({ activeUser, post }) => 
        eq(activeUser.id, post.userId)
      )
      .join({ comment: commentsCollection }, ({ activeUser, comment }) => 
        eq(activeUser.id, comment.userId)
      )
  }
}))
```

在这个例子中，`activeUsers` 子查询被使用了两次，但只执行一次，提高了性能。

### 复杂嵌套子查询

构建具有多个嵌套级别的复杂查询：

```ts
import { count } from '@tanstack/db'

const topUsers = createCollection(liveQueryCollectionOptions({
  query: (q) => {
    // 构建帖子计数子查询
    const postCounts = q
      .from({ post: postsCollection })
      .groupBy(({ post }) => post.userId)
      .select(({ post }) => ({
        userId: post.userId,
        count: count(post.id),
      }))
    
    // 构建用户统计子查询
    const userStats = q
      .from({ user: usersCollection })
      .join({ postCount: postCounts }, ({ user, postCount }) => 
        eq(user.id, postCount.userId)
      )
      .select(({ user, postCount }) => ({
        id: user.id,
        name: user.name,
        postCount: postCount.count,
      }))
      .orderBy(({ userStats }) => userStats.postCount, 'desc')
      .limit(10)
    
    // 在主查询中使用用户统计子查询
    return q.from({ userStats })
  }
}))
```

## 包含 (Includes)

包含允许你在 `.select()` 内嵌套子查询以生成分层结果。连接将 1:N 关系展平为重复行，而每个父行都会获得一个与其相关项目的嵌套集合。

```ts
import { createLiveQueryCollection, eq } from '@tanstack/db'

const projectsWithIssues = createLiveQueryCollection((q) =>
  q.from({ p: projectsCollection }).select(({ p }) => ({
    id: p.id,
    name: p.name,
    issues: q
      .from({ i: issuesCollection })
      .where(({ i }) => eq(i.projectId, p.id))
      .select(({ i }) => ({
        id: i.id,
        title: i.title,
      })),
  })),
)
```

每个项目的 `issues` 字段都是一个实时的 `Collection`，当底层数据更改时会增量更新。

### 关联条件

子查询的 `.where()` 必须包含一个 `eq()`，将子字段链接到父字段 —— 这就是**关联条件**。它告诉系统子项如何与父项关联。

```ts
// 关联条件：将问题链接到其父项目
.where(({ i }) => eq(i.projectId, p.id))
```

关联条件可以作为独立的 `.where()` 出现，也可以在 `and()` 内部：

```ts
// 也有效 —— 从 and() 内部提取关联
.where(({ i }) => and(eq(i.projectId, p.id), eq(i.status, 'open')))
```

关联字段不需要包含在父级的 `.select()` 中。

### 其他过滤器

子查询支持除关联条件之外的其他 `.where()` 子句，包括引用父字段的过滤器：

```ts
q.from({ p: projectsCollection }).select(({ p }) => ({
  id: p.id,
  name: p.name,
  issues: q
    .from({ i: issuesCollection })
    .where(({ i }) => eq(i.projectId, p.id))       // 关联
    .where(({ i }) => eq(i.createdBy, p.createdBy)) // 引用父级的过滤器
    .where(({ i }) => eq(i.status, 'open'))          // 纯子过滤器
    .select(({ i }) => ({
      id: i.id,
      title: i.title,
    })),
}))
```

引用父级的过滤器是完全响应式的 —— 如果父级的字段更改，子结果会自动更新。

### 排序和限制

子查询支持 `.orderBy()` 和 `.limit()`，按父级应用：

```ts
q.from({ p: projectsCollection }).select(({ p }) => ({
  id: p.id,
  name: p.name,
  issues: q
    .from({ i: issuesCollection })
    .where(({ i }) => eq(i.projectId, p.id))
    .orderBy(({ i }) => i.createdAt, 'desc')
    .limit(5)
    .select(({ i }) => ({
      id: i.id,
      title: i.title,
    })),
}))
```

每个项目获得自己的前 5 个问题，而不是跨所有项目共享的 5 个问题。

### toArray

默认情况下，每个子结果都是一个实时的 `Collection`。如果你想要一个普通数组，请用 `toArray()` 包装子查询：

```ts
import { createLiveQueryCollection, eq, toArray } from '@tanstack/db'

const projectsWithIssues = createLiveQueryCollection((q) =>
  q.from({ p: projectsCollection }).select(({ p }) => ({
    id: p.id,
    name: p.name,
    issues: toArray(
      q
        .from({ i: issuesCollection })
        .where(({ i }) => eq(i.projectId, p.id))
        .select(({ i }) => ({
          id: i.id,
          title: i.title,
        })),
    ),
  })),
)
```

使用 `toArray()` 时，当其问题更改时，项目行会重新发出。没有它，子 `Collection` 会独立更新。

### 聚合

你可以在子查询中使用聚合函数。聚合按父级计算：

```ts
import { createLiveQueryCollection, eq, count } from '@tanstack/db'

const projectsWithCounts = createLiveQueryCollection((q) =>
  q.from({ p: projectsCollection }).select(({ p }) => ({
    id: p.id,
    name: p.name,
    issueCount: q
      .from({ i: issuesCollection })
      .where(({ i }) => eq(i.projectId, p.id))
      .select(({ i }) => ({ total: count(i.id) })),
  })),
)
```

每个项目获得自己的计数。当问题被添加或删除时，计数会响应式更新。

### 嵌套包含

包含可以任意嵌套。例如，项目可以包含问题，而问题可以包含评论：

```ts
const tree = createLiveQueryCollection((q) =>
  q.from({ p: projectsCollection }).select(({ p }) => ({
    id: p.id,
    name: p.name,
    issues: q
      .from({ i: issuesCollection })
      .where(({ i }) => eq(i.projectId, p.id))
      .select(({ i }) => ({
        id: i.id,
        title: i.title,
        comments: q
          .from({ c: commentsCollection })
          .where(({ c }) => eq(c.issueId, i.id))
          .select(({ c }) => ({
            id: c.id,
            body: c.body,
          })),
      })),
  })),
)
```

每个级别都独立且增量更新 —— 向问题添加评论不会重新处理其他问题或项目。

### 在 React 中使用包含

在 React 中使用包含时，每个子 `Collection` 都需要自己的 `useLiveQuery` 订阅来接收响应式更新。将子集合传递给调用 `useLiveQuery(childCollection)` 的子组件：

```tsx
import { useLiveQuery } from '@tanstack/react-db'
import { eq } from '@tanstack/db'

function ProjectList() {
  const { data: projects } = useLiveQuery((q) =>
    q.from({ p: projectsCollection }).select(({ p }) => ({
      id: p.id,
      name: p.name,
      issues: q
        .from({ i: issuesCollection })
        .where(({ i }) => eq(i.projectId, p.id))
        .select(({ i }) => ({
          id: i.id,
          title: i.title,
        })),
    })),
  )

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          {project.name}
          {/* 将子集合传递给子组件 */}
          <IssueList issuesCollection={project.issues} />
        </li>
      ))}
    </ul>
  )
}

function IssueList({ issuesCollection }) {
  // 订阅子集合以获取响应式更新
  const { data: issues } = useLiveQuery(issuesCollection)

  return (
    <ul>
      {issues.map((issue) => (
        <li key={issue.id}>{issue.title}</li>
      ))}
    </ul>
  )
}
```

每个 `IssueList` 组件都独立订阅其项目的问题。当添加或删除问题时，只有受影响的 `IssueList` 重新渲染 —— 父级 `ProjectList` 不会。

> [!NOTE]
> 你必须将子集合传递给子组件并使用 `useLiveQuery` 订阅。在父级中直接读取 `project.issues` 而不订阅将给你集合对象，但当子数据更改时组件不会重新渲染。

## groupBy 和聚合

使用 `groupBy` 对数据进行分组并应用聚合函数。当你在 `select` 中使用聚合而不使用 `groupBy` 时，整个结果集被视为单个组。

### 方法签名

```ts
groupBy(
  grouper: (row: TRow) => Expression | Expression[]
): Query
```

**参数：**
- `grouper` - 接收行对象并返回分组键的回调函数。可以返回单个值或多列分组的数组

### 基本分组

按部门对用户进行分组并计数：

```ts
import { count, avg } from '@tanstack/db'

const departmentStats = createCollection(liveQueryCollectionOptions({
  query: (q) =>
    q
      .from({ user: usersCollection })
      .groupBy(({ user }) => user.departmentId)
      .select(({ user }) => ({
        departmentId: user.departmentId,
        userCount: count(user.id),
        avgAge: avg(user.age),
      }))
}))
```

> [!NOTE]
> 在 `groupBy` 查询中，`select` 子句中的属性必须是：
> - 聚合函数（如 `count`、`sum`、`avg`）
> - 在 `groupBy` 子句中使用的属性
>
> 你不能选择既未聚合也未分组的属性。

> [!WARNING]
> `fn.select()` 不能与 `groupBy()` 一起使用。`groupBy` 运算符需要静态分析 `select` 子句，以发现要为每组计算哪些聚合函数（如 `count`、`sum`、`max` 等）。由于 `fn.select()` 是不透明的 JavaScript 函数，编译器无法检查它。将标准 `.select()` API 与 `groupBy()` 结合使用时，请使用标准 `.select()` API。

### 多列分组

通过从回调返回数组来按多列分组：

```ts
const userStats = createCollection(liveQueryCollectionOptions({
  query: (q) =>
    q
      .from({ user: usersCollection })
      .groupBy(({ user }) => [user.departmentId, user.role])
      .select(({ user }) => ({
        departmentId: user.departmentId,
        role: user.role,
        count: count(user.id),
        avgSalary: avg(user.salary),
      }))
}))
```

### 聚合函数

使用各种聚合函数来汇总数据：

```ts
import { count, sum, avg, min, max } from '@tanstack/db'

const orderStats = createCollection(liveQueryCollectionOptions({
  query: (q) =>
    q
      .from({ order: ordersCollection })
      .groupBy(({ order }) => order.customerId)
      .select(({ order }) => ({
        customerId: order.customerId,
        totalOrders: count(order.id),
        totalAmount: sum(order.amount),
        avgOrderValue: avg(order.amount),
        minOrder: min(order.amount),
        maxOrder: max(order.amount),
      }))
}))
```

有关可用聚合函数的完整列表，请参阅[聚合函数](#聚合函数)部分。

### Having 子句

使用 `having` 过滤聚合结果 —— 这类似于 `where` 子句，但在执行聚合后应用。

#### 方法签名

```ts
having(
  condition: (row: TRow) => Expression<boolean>
): Query
```

**参数：**
- `condition` - 接收表引用（如果查询包含 `select()` 子句，还有 `$selected`）并返回布尔表达式的回调函数

```ts
// 直接使用聚合函数
const highValueCustomers = createLiveQueryCollection((q) =>
  q
    .from({ order: ordersCollection })
    .groupBy(({ order }) => order.customerId)
    .having(({ order }) => gt(sum(order.amount), 1000))
)

// 通过 $selected 使用 SELECT 字段（使用 select() 时推荐）
const highValueCustomersWithSelect = createLiveQueryCollection((q) =>
  q
    .from({ order: ordersCollection })
    .groupBy(({ order }) => order.customerId)
    .select(({ order }) => ({
      customerId: order.customerId,
      totalSpent: sum(order.amount),
      orderCount: count(order.id),
    }))
    .having(({ $selected }) => gt($selected.totalSpent, 1000))
)
```

### 隐式单组聚合

当你不使用 `groupBy` 而使用聚合时，整个结果集被分组：

```ts
const overallStats = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .select(({ user }) => ({
      totalUsers: count(user.id),
      avgAge: avg(user.age),
      maxSalary: max(user.salary),
    }))
)
```

这相当于将整个集合分组为单个组。

### 访问分组数据

可以通过组键访问分组结果：

```ts
const deptStats = createCollection(liveQueryCollectionOptions({
  query: (q) =>
    q
      .from({ user: usersCollection })
      .groupBy(({ user }) => user.departmentId)
      .select(({ user }) => ({
        departmentId: user.departmentId,
        count: count(user.id),
      }))
}))

// 通过部门 ID 访问
const engineeringStats = deptStats.get(1)
```

> **注意**：分组结果根据分组方式进行不同的键控：
> - **单列分组**：由实际值键控（例如，`deptStats.get(1)`）
> - **多列分组**：由分组值的 JSON 字符串键控（例如，`userStats.get('[1,"admin"]')`）

## findOne

使用 `findOne` 返回单个结果而不是数组。当你希望最多找到一个匹配记录时（例如，按唯一标识符查询），这很有用。

`findOne` 方法将返回类型从数组更改为单个对象或 `undefined`。当找不到匹配记录时，结果为 `undefined`。

### 方法签名

```ts
findOne(): Query
```

### 基本用法

通过 ID 查找特定用户：

```ts
const user = createLiveQueryCollection((q) =>
  q
    .from({ users: usersCollection })
    .where(({ users }) => eq(users.id, 1))
    .findOne()
)

// 结果类型：User | undefined
// 如果存在 id=1 的用户：{ id: 1, name: 'John', ... }
// 如果未找到：undefined
```

### 与 React 钩子一起使用

将 `findOne` 与 `useLiveQuery` 一起使用以获取单个记录：

```tsx
import { useLiveQuery } from '@tanstack/react-db'
import { eq } from '@tanstack/db'

function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading } = useLiveQuery((q) =>
    q
      .from({ users: usersCollection })
      .where(({ users }) => eq(users.id, userId))
      .findOne()
  , [userId])

  if (isLoading) return <div>加载中...</div>
  if (!user) return <div>未找到用户</div>

  return <div>{user.name}</div>
}
```

### 与 Select 一起使用

将 `findOne` 与 `select` 结合以投影特定字段：

```ts
const userEmail = createLiveQueryCollection((q) =>
  q
    .from({ users: usersCollection })
    .where(({ users }) => eq(users.id, 1))
    .select(({ users }) => ({
      id: users.id,
      email: users.email,
    }))
    .findOne()
)

// 结果类型：{ id: number, email: string } | undefined
```

### 返回类型行为

返回类型根据是否使用 `findOne` 而变化：

```ts
// 不使用 findOne - 返回数组
const users = createLiveQueryCollection((q) =>
  q.from({ users: usersCollection })
)
// 类型：Array<User>

// 使用 findOne - 返回单个对象或 undefined
const user = createLiveQueryCollection((q) =>
  q.from({ users: usersCollection }).findOne()
)
// 类型：User | undefined
```

### 最佳实践

**使用时机：**
- 按唯一标识符（ID、电子邮件等）查询
- 你最多期望一个结果
- 你想要类型安全的单记录访问而无需数组索引

**避免时机：**
- 你可能有多个匹配记录（改用常规查询）
- 你需要迭代结果

## Distinct

使用 `distinct` 根据选定的列从查询结果中删除重复行。`distinct` 运算符确保每组唯一选定值仅在结果集中出现一次。

> [!IMPORTANT]
> `distinct` 运算符需要 `select` 子句。你不能在未指定要选择哪些列的情况下使用 `distinct`。

### 方法签名

```ts
distinct(): Query
```

### 基本用法

从单列获取唯一值：

```ts
const uniqueCountries = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .select(({ user }) => ({ country: user.country }))
    .distinct()
)

// 结果仅包含唯一国家
// 如果你有来自美国、加拿大和英国的用户，结果将有 3 个项目
```

### 多列 Distinct

获取多列的唯一组合：

```ts
const uniqueRoleSalaryPairs = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .select(({ user }) => ({
      role: user.role,
      salary: user.salary,
    }))
    .distinct()
)

// 结果仅包含唯一的角色-薪水组合
// 例如，Developer-75000、Developer-80000、Manager-90000
```

### 边缘情况

#### Null 值

Null 值被视为不同的值：

```ts
const uniqueValues = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .select(({ user }) => ({ department: user.department }))
    .distinct()
)

// 如果某些用户的部门为 null，null 将作为一个不同的值出现
// 结果可能是：['Engineering', 'Marketing', null]
```

## Order By、Limit 和 Offset

使用 `orderBy`、`limit` 和 `offset` 来控制结果顺序和分页。为了获得最佳性能，排序是增量执行的。

### 方法签名

```ts
orderBy(
  selector: (row: TRow) => Expression,
  direction?: 'asc' | 'desc'
): Query

limit(count: number): Query

offset(count: number): Query
```

**参数：**
- `selector` - 接收行对象并返回要排序的值的回调函数
- `direction` - 排序方向：`'asc'`（默认）或 `'desc'`
- `count` - 要限制或跳过的行数

### 基本排序

按单列排序结果：

```ts
const sortedUsers = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .orderBy(({ user }) => user.name)
    .select(({ user }) => ({
      id: user.id,
      name: user.name,
    }))
)
```

### 多列排序

按多列排序：

```ts
const sortedUsers = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .orderBy(({ user }) => user.departmentId, 'asc')
    .orderBy(({ user }) => user.name, 'asc')
    .select(({ user }) => ({
      id: user.id,
      name: user.name,
      departmentId: user.departmentId,
    }))
)
```

### 按 SELECT 字段排序

当你在 `select()` 中使用聚合或计算值时，可以使用 `$selected` 命名空间按这些字段排序：

```ts
const topCustomers = createLiveQueryCollection((q) =>
  q
    .from({ order: ordersCollection })
    .groupBy(({ order }) => order.customerId)
    .select(({ order }) => ({
      customerId: order.customerId,
      totalSpent: sum(order.amount),
      orderCount: count(order.id),
      latestOrder: max(order.createdAt),
    }))
    .orderBy(({ $selected }) => $selected.totalSpent, 'desc')
    .limit(10)
)
```

### 降序

使用 `desc` 进行降序排序：

```ts
const recentPosts = createLiveQueryCollection((q) =>
  q
    .from({ post: postsCollection })
    .orderBy(({ post }) => post.createdAt, 'desc')
    .select(({ post }) => ({
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
    }))
)
```

### 使用 `limit` 和 `offset` 进行分页

使用 `offset` 跳过结果：

```ts
const page2Users = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .orderBy(({ user }) => user.name, 'asc')
    .limit(20)
    .offset(20) // 跳过前 20 个结果
    .select(({ user }) => ({
      id: user.id,
      name: user.name,
    }))
)
```

## 可组合查询

通过组合更小、可重用的部分来构建复杂查询。这种方法使你的查询更易于维护，并通过缓存提高性能。

### 条件查询构建

根据运行时条件构建查询：

```ts
import { Query, eq } from '@tanstack/db'

function buildUserQuery(options: { activeOnly?: boolean; limit?: number }) {
  let query = new Query().from({ user: usersCollection })
  
  if (options.activeOnly) {
    query = query.where(({ user }) => eq(user.active, true))
  }
  
  if (options.limit) {
    query = query.limit(options.limit)
  }
  
  return query.select(({ user }) => ({
    id: user.id,
    name: user.name,
  }))
}

const activeUsers = createLiveQueryCollection(buildUserQuery({ activeOnly: true, limit: 10 }))
```

### 缓存中间结果

实时查询集合的结果本身就是一个集合，当底层数据更改时会自动更新。这意味着你可以将实时查询集合的结果用作另一个实时查询集合中的源。这种模式对于构建复杂查询很有用，在这些查询中，你想要缓存中间结果以使进一步的查询更快。

```ts
// 活跃用户的基本查询
const activeUsers = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .where(({ user }) => eq(user.active, true))
)

// 依赖于活跃用户的查询
const activeUserPosts = createLiveQueryCollection((q) =>
  q
    .from({ user: activeUsers })
    .join({ post: postsCollection }, ({ user, post }) => 
      eq(user.id, post.userId)
    )
    .select(({ user, post }) => ({
      userName: user.name,
      postTitle: post.title,
    }))
)
```

### 可重用查询定义

你可以使用 `Query` 类创建可重用的查询定义。这对于构建复杂查询很有用，在这些查询中，你想在整个应用程序中多次重用相同的查询构建器实例。

```ts
import { Query, eq } from '@tanstack/db'

// 创建可重用的查询构建器
const userQuery = new Query()
  .from({ user: usersCollection })
  .where(({ user }) => eq(user.active, true))

// 在不同上下文中使用它
const activeUsers = createLiveQueryCollection({
  query: userQuery.select(({ user }) => ({
    id: user.id,
    name: user.name,
  }))
})

// 或作为子查询
const userPosts = createLiveQueryCollection((q) =>
  q
    .from({ activeUser: userQuery })
    .join({ post: postsCollection }, ({ activeUser, post }) => 
      eq(activeUser.id, post.userId)
    )
)
```

### 可重用回调函数

创建可重用的查询逻辑是一种常见的模式，可以提高代码的组织性和可维护性。推荐的方法是使用带有 `Ref<T>` 类型的回调函数，而不是尝试直接键入 `QueryBuilder` 实例。

#### 推荐模式

使用 `Ref<MyType>` 创建可重用的过滤和转换函数：

```ts
import type { Ref } from '@tanstack/db'
import { eq, gt, and } from '@tanstack/db'

// 创建可重用的过滤回调
const isActiveUser = ({ user }: { user: Ref<User> }) =>
  eq(user.active, true)

const isAdultUser = ({ user }: { user: Ref<User> }) =>
  gt(user.age, 18)

const isActiveAdult = ({ user }: { user: Ref<User> }) =>
  and(isActiveUser({ user }), isAdultUser({ user }))

// 在查询中使用它们 —— 它们与 .where() 无缝配合
const activeAdults = createCollection(liveQueryCollectionOptions({
  query: (q) =>
    q
      .from({ user: usersCollection })
      .where(isActiveUser)
      .where(isAdultUser)
      .select(({ user }) => ({
        id: user.id,
        name: user.name,
        age: user.age,
      }))
}))
```

回调签名 `({ user }: { user: Ref<User> }) => Expression` 与 `.where()` 期望的完全匹配，使其类型安全且可组合。

#### 链接多个过滤器

你可以链接多个可重用的过滤器：

```tsx
import { useLiveQuery } from '@tanstack/react-db'

const { data } = useLiveQuery((q) => {
  return q
    .from({ item: itemsCollection })
    .where(({ item }) => eq(item.id, 1))
    .where(activeItemFilter)      // 可重用过滤器 1
    .where(verifiedItemFilter)     // 可重用过滤器 2
    .select(({ item }) => ({ ...item }))
}, [])
```

#### 使用不同别名

该模式适用于任何表别名：

```ts
const activeFilter = ({ item }: { item: Ref<Item> }) =>
  eq(item.active, true)

// 适用于任何别名
const query1 = new Query()
  .from({ item: itemsCollection })
  .where(activeFilter)

const query2 = new Query()
  .from({ i: itemsCollection })
  .where(({ i }) => activeFilter({ item: i }))  // 映射别名
```

#### 带多个表的回调

对于带有连接的查询，创建接受多个引用的回调：

```ts
const isHighValueCustomer = ({ user, order }: {
  user: Ref<User>
  order: Ref<Order>
}) => and(
  eq(user.active, true),
  gt(order.amount, 1000)
)

// 直接在 where 子句中使用
const highValueCustomers = createCollection(liveQueryCollectionOptions({
  query: (q) =>
    q
      .from({ user: usersCollection })
      .join({ order: ordersCollection }, ({ user, order }) =>
        eq(user.id, order.userId)
      )
      .where(isHighValueCustomer)
      .select(({ user, order }) => ({
        userName: user.name,
        orderAmount: order.amount,
      }))
}))
```

#### 为什么不使用 QueryBuilder 类型？

你可能很想创建接受和返回 `QueryBuilder` 的函数：

```ts
// ❌ 不推荐 —— 过于复杂的类型
const applyFilters = <T extends QueryBuilder<unknown>>(query: T): T => {
  return query.where(({ item }) => eq(item.active, true))
}
```

这种方法有几个问题：
1. **复杂类型**：`QueryBuilder<T>` 泛型表示整个查询上下文，包括基本模式、当前模式、连接、结果类型等。
2. **类型推断**：类型随着每次方法调用而变化，使得手动键入不切实际
3. **有限灵活性**：难以组合多个过滤器或用于不同的表别名

相反，请使用与 `.where()`、`.select()` 和其他查询方法直接配合使用的回调函数。

#### 可重用的 Select 转换

你也可以创建可重用的 select 投影：

```ts
const basicUserInfo = ({ user }: { user: Ref<User> }) => ({
  id: user.id,
  name: user.name,
  email: user.email,
})

const userWithStats = ({ user }: { user: Ref<User> }) => ({
  ...basicUserInfo({ user }),
  isAdult: gt(user.age, 18),
  isActive: eq(user.active, true),
})

const users = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .select(userWithStats)
)
```

这种方法使你的查询逻辑更加模块化、可测试且在应用程序中可重用。

## 响应式效果 (createEffect)

虽然实时查询集合将查询结果具体化为你可以订阅和迭代的集合，但**响应式效果**让你响应查询结果*更改*，而无需具体化完整的结果集。当行进入、退出或更新查询结果时，效果会触发回调。

这对于触发副作用很有用 —— 发送通知、同步到外部系统、生成 AI 响应、更新计数 —— 每当你的数据更改时。

### 何时使用效果 vs 实时查询集合

| 用例 | 方法 |
|----------|----------|
| 在 UI 中显示查询结果 | 实时查询集合 + `useLiveQuery` |
| 响应更改（副作用） | `createEffect` / `useLiveQueryEffect` |
| 跟踪进入结果集的新项目 | 带 `onEnter` 的 `createEffect` |
| 监控退出结果集的项目 | 带 `onExit` 的 `createEffect` |
| 响应结果集内的更新 | 带 `onUpdate` 的 `createEffect` |

### 基本用法

```ts
import { createEffect, eq } from '@tanstack/db'

const effect = createEffect({
  query: (q) =>
    q
      .from({ msg: messagesCollection })
      .where(({ msg }) => eq(msg.role, 'user')),
  onEnter: async (event) => {
    console.log('新用户消息：', event.value)
    await generateResponse(event.value)
  },
})

// 稍后：停止效果
await effect.dispose()
```

### 配置

`createEffect` 接受 `EffectConfig` 对象：

```ts
const effect = createEffect({
  id: 'my-effect',            // 可选：如未提供则自动生成为 `live-query-effect-{n}`
  query: (q) => q.from(...), // 要观察的查询
  onEnter: (event, ctx) => { ... },  // 每次进入回调
  onUpdate: (event, ctx) => { ... }, // 每次更新回调
  onExit: (event, ctx) => { ... },   // 每次退出回调
  onBatch: (events, ctx) => { ... }, // 每次图表运行的完整批次回调
  onError: (error, event) => { ... }, // 回调错误处理程序
  onSourceError: (error) => { ... }, // 源集合错误回调
  skipInitial: false,          // 在初始加载期间抑制增量
})
```

| 选项 | 类型 | 描述 |
|--------|------|-------------|
| `id` | `string`（可选） | 用于调试/追踪的标识符。如未提供，自动生成为 `live-query-effect-{n}`。 |
| `query` | `QueryBuilder` 或函数 | 要观察的查询。接受与实时查询集合相同的构建器函数或 `QueryBuilder` 实例。 |
| `onEnter` | `(event, ctx) => void \| Promise<void>`（可选） | 为进入查询结果的每一行调用一次。 |
| `onUpdate` | `(event, ctx) => void \| Promise<void>`（可选） | 为查询结果中更新的每一行调用一次。 |
| `onExit` | `(event, ctx) => void \| Promise<void>`（可选） | 为退出查询结果的每一行调用一次。 |
| `onBatch` | `(events, ctx) => void \| Promise<void>`（可选） | 每次图表运行调用一次，带有完整的未过滤的增量事件批次。 |
| `onError` | `(error, event) => void`（可选） | 当 `onEnter`、`onUpdate`、`onExit` 或 `onBatch` 抛出或拒绝时调用。 |
| `onSourceError` | `(error) => void`（可选） | 当源集合进入错误或清理状态时调用。此后效果会自动处置。如未提供，错误会记录到 `console.error`。 |
| `skipInitial` | `boolean`（可选） | 当为 `true` 时，初始数据加载期间的增量会被抑制。只有后续更改会触发处理程序。默认为 `false`。 |

### 增量事件

每个增量事件描述查询结果中的单行更改：

```ts
interface DeltaEvent<TRow, TKey> {
  type: 'enter' | 'exit' | 'update'
  key: TKey
  value: TRow
  previousValue?: TRow  // 仅适用于 'update' 事件
}
```

| 事件类型 | 含义 | `value` | `previousValue` |
|------------|---------|---------|------------------|
| `enter` | 行进入查询结果 | 新行 | — |
| `exit` | 行离开查询结果 | 退出的行 | — |
| `update` | 行更改但保留在结果中 | 新行 | 更改前的行 |

### 命名回调

使用与你关心的查询结果转换相匹配的回调：

```ts
// 仅新行进入结果
createEffect({ onEnter: (event) => { ... }, ... })

// 仅行离开结果
createEffect({ onExit: (event) => { ... }, ... })

// 仅行更改但保留在结果中
createEffect({ onUpdate: (event) => { ... }, ... })

// 检查图表运行的完整混合批次
createEffect({ onBatch: (events) => { ... }, ... })
```

### 每行回调 vs `onBatch`

你可以提供每行回调、`onBatch` 或两者：

```ts
createEffect({
  query: (q) => q.from({ user: usersCollection }),

  onEnter: (event, ctx) => {
    console.log(`进入：${event.key}`)
  },

  onExit: (event, ctx) => {
    console.log(`退出：${event.key}`)
  },

  onBatch: (events, ctx) => {
    console.log(`批次包含 ${events.length} 个事件`)
  },
})
```

两个处理程序都接收 `EffectContext`：

```ts
interface EffectContext {
  effectId: string   // 效果的 ID
  signal: AbortSignal // 调用 effect.dispose() 时中止
}
```

`signal` 在效果被处置时用于取消正在进行的异步工作：

```ts
createEffect({
  query: (q) => q.from({ task: tasksCollection }),
  onEnter: async (event, ctx) => {
    const result = await fetch('/api/process', {
      method: 'POST',
      body: JSON.stringify(event.value),
      signal: ctx.signal, // 处置时取消
    })
    // ...
  },
})
```

### 跳过初始数据

默认情况下，效果处理所有数据，包括初始加载。设置 `skipInitial: true` 以仅响应初始同步后发生的更改：

```ts
// 仅对新消息做出反应，而不是现有消息
const effect = createEffect({
  query: (q) =>
    q.from({ msg: messagesCollection })
       .where(({ msg }) => eq(msg.role, 'user')),
  skipInitial: true,
  onEnter: async (event) => {
    await sendNotification(event.value)
  },
})
```

### 错误处理

` onEnter`、`onUpdate`、`onExit` 或 `onBatch` 抛出的错误（同步或异步）会被捕获并路由到 `onError`。如果未提供 `onError`，它们会被记录到 `console.error`：

```ts
createEffect({
  query: (q) => q.from({ order: ordersCollection }),
  onEnter: async (event) => {
    await processOrder(event.value)
  },
  onError: (error, event) => {
    console.error(`处理订单 ${event.key} 失败：`, error)
    reportToErrorTracker(error)
  },
})
```

如果源集合进入错误或清理状态，效果会自动处置自身。使用 `onSourceError` 来处理这种情况：

```ts
createEffect({
  query: (q) => q.from({ data: dataCollection }),
  onBatch: (events) => { ... },
  onSourceError: (error) => {
    console.warn('数据源失败，效果已处置：', error.message)
  },
})
```

### 处置

`createEffect` 返回一个带有 `dispose()` 方法的 `Effect` 句柄：

```ts
const effect = createEffect({ ... })

// 检查是否已处置
console.log(effect.disposed) // false

// 处置：取消订阅源，中止信号，
// 并等待正在进行的异步处理程序解决
await effect.dispose()

console.log(effect.disposed) // true
```

`dispose()` 是幂等的 —— 多次调用是安全的。它返回一个承诺，当所有正在进行的异步处理程序都已解决（通过 `Promise.allSettled`）时解析。

### 查询功能

效果支持完整的查询系统 —— 你可以使用实时查询集合做的一切都适用于效果：

```ts
// 连接
createEffect({
  query: (q) =>
    q
      .from({ user: usersCollection })
      .join({ post: postsCollection }, ({ user, post }) =>
        eq(user.id, post.userId)
      )
      .select(({ user, post }) => ({
        userName: user.name,
        postTitle: post.title,
      })),
  onEnter: (event) => {
    console.log(`${event.value.userName} 发布了"${event.value.postTitle}"`)
  },
})

// 过滤器
createEffect({
  query: (q) =>
    q
      .from({ user: usersCollection })
      .where(({ user }) => eq(user.role, 'admin')),
  onEnter: (event) => {
    console.log(`新管理员：${event.value.name}`)
  },
})

// OrderBy + Limit（前 K 个窗口）
createEffect({
  query: (q) =>
    q
      .from({ score: scoresCollection })
      .orderBy(({ score }) => score.points, 'desc')
      .limit(10),
  onBatch: (events) => {
    // 每次图表运行触发一次，包含所有进入/更新/退出事件
    for (const event of events) {
      console.log(`${event.type}：${event.value.name}（${event.value.points} 分）`)
    }
  },
})
```

当使用带有 `limit` 的 `orderBy` 时，效果会跟踪前 K 个窗口。当项目进入窗口时，你会收到 `enter` 事件；当它们被替换时，你会收到 `exit` 事件。

### 事务合并

当在单个事务中发生多个更改时，效果会将它们合并为单个批次。这意味着你的处理程序会被调用一次，并带有该事务的所有更改，而不是每次写入一次：

```ts
createEffect({
  query: (q) => q.from({ item: itemsCollection }),
  onBatch: (events) => {
    // 如果在一个事务中插入了 3 个项目，
    // 这会触发一次，包含所有 3 个事件
    console.log(`${events.length} 个项目已添加`)
  },
})
```

### 在 React 中使用

`useLiveQueryEffect` 钩子自动管理效果生命周期 —— 在挂载时创建，在卸载时处置，并在依赖项更改时重新创建：

```tsx
import { useLiveQueryEffect } from '@tanstack/react-db'
import { eq } from '@tanstack/db'

function ChatComponent({ channelId }: { channelId: string }) {
  useLiveQueryEffect(
    {
      query: (q) =>
        q
          .from({ msg: messagesCollection })
          .where(({ msg }) => eq(msg.channelId, channelId)),
      skipInitial: true,
      onEnter: async (event) => {
        await playNotificationSound()
      },
    },
    [channelId] // 当 channelId 更改时重新创建效果
  )

  return <div>...</div>
}
```

第二个参数是依赖数组（类似于 `useEffect`）。当依赖项更改时，旧效果会被处置，并使用更新的配置创建新效果。

### 完整示例

这是一个更完整的示例，展示了一个监控订单状态更改并发送通知的效果：

```ts
import { createEffect, eq } from '@tanstack/db'

const orderEffect = createEffect({
  id: 'order-status-monitor',
  query: (q) =>
    q
      .from({ order: ordersCollection })
      .join({ customer: customersCollection }, ({ order, customer }) =>
        eq(order.customerId, customer.id)
      )
      .where(({ order }) => eq(order.status, 'shipped'))
      .select(({ order, customer }) => ({
        orderId: order.id,
        customerEmail: customer.email,
        trackingNumber: order.trackingNumber,
      })),
  skipInitial: true,

  onEnter: async (event, ctx) => {
    await sendShipmentEmail({
      to: event.value.customerEmail,
      orderId: event.value.orderId,
      tracking: event.value.trackingNumber,
      signal: ctx.signal,
    })
  },

  onError: (error, event) => {
    console.error(`为订单 ${event.key} 发送通知失败：`, error)
  },

  onSourceError: (error) => {
    alertOpsTeam('订单监控效果失败', error)
  },
})

// 在应用程序关闭时
await orderEffect.dispose()
```

## 表达式函数参考

查询系统提供了一组全面的函数，用于过滤、转换和聚合数据。

### 比较运算符

#### `eq(left, right)`

相等比较：

```ts
eq(user.id, 1)
eq(user.name, 'John')
```

#### `gt(left, right)`、`gte(left, right)`、`lt(left, right)`、`lte(left, right)`

数字、字符串和日期比较：

```ts
gt(user.age, 18)
gte(user.salary, 50000)
lt(user.createdAt, new Date('2024-01-01'))
lte(user.rating, 5)
```

#### `inArray(value, array)`

检查值是否在数组中：

```ts
inArray(user.id, [1, 2, 3])
inArray(user.role, ['admin', 'moderator'])
```

#### `like(value, pattern)`、`ilike(value, pattern)`

字符串模式匹配：

```ts
like(user.name, 'John%')    // 区分大小写
ilike(user.email, '%@gmail.com')  // 不区分大小写
```

#### `isUndefined(value)`、`isNull(value)`

检查缺失值与 null 值：

```ts
// 检查属性是否缺失/未定义
isUndefined(user.profile)

// 检查值是否显式为 null
isNull(user.profile)
```

这些函数在使用连接和可选属性时特别重要，因为它们区分：
- `undefined`：属性不存在或不存在
- `null`：属性存在但显式设置为 null

**连接示例：**

```ts
// 查找没有匹配配置文件的用户（左连接导致未定义）
const usersWithoutProfiles = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .leftJoin(
      { profile: profilesCollection },
      ({ user, profile }) => eq(user.id, profile.userId)
    )
    .where(({ profile }) => isUndefined(profile))
)

// 查找具有显式 null bio 字段的用户
const usersWithNullBio = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .where(({ user }) => isNull(user.bio))
)
```

### 逻辑运算符

#### `and(...conditions)`

用 AND 逻辑组合条件：

```ts
and(
  eq(user.active, true),
  gt(user.age, 18),
  eq(user.role, 'user')
)
```

#### `or(...conditions)`

用 OR 逻辑组合条件：

```ts
or(
  eq(user.role, 'admin'),
  eq(user.role, 'moderator')
)
```

#### `not(condition)`

否定条件：

```ts
not(eq(user.active, false))
```

### 字符串函数

#### `upper(value)`、`lower(value)`

转换大小写：

```ts
upper(user.name)  // 'JOHN'
lower(user.email) // 'john@example.com'
```

#### `length(value)`

获取字符串或数组长度：

```ts
length(user.name)     // 字符串长度
length(user.tags)     // 数组长度
```

#### `concat(...values)`

连接字符串：

```ts
concat(user.firstName, ' ', user.lastName)
concat('User: ', user.name, ' (', user.id, ')')
```

### 数学函数

#### `add(left, right)`

添加两个数字：

```ts
add(user.salary, user.bonus)
```

#### `coalesce(...values)`

返回第一个非 null 值：

```ts
coalesce(user.displayName, user.name, 'Unknown')
```

### 聚合函数

#### `count(value)`

计算非 null 值：

```ts
count(user.id)        // 计算所有用户
count(user.postId)    // 计算有帖子的用户
```

#### `sum(value)`

汇总数値：

```ts
sum(order.amount)
sum(user.salary)
```

#### `avg(value)`

计算平均值：

```ts
avg(user.salary)
avg(order.amount)
```

#### `min(value)`、`max(value)`

查找最小值和最大值：

```ts
min(user.salary)
max(order.amount)
```

### 函数组合

函数可以组合和链式调用：

```ts
// 复杂条件
and(
  eq(user.active, true),
  or(
    gt(user.age, 25),
    eq(user.role, 'admin')
  ),
  not(inArray(user.id, bannedUserIds))
)

// 复杂转换
concat(
  upper(user.firstName),
  ' ',
  upper(user.lastName),
  ' (',
  user.id,
  ')'
)

// 复杂聚合
avg(add(user.salary, coalesce(user.bonus, 0)))
```

## 函数式变体

函数式变体 API 提供了标准 API 的替代方案，为复杂转换提供了更多灵活性。使用函数式变体，回调函数包含实际执行的代码以执行操作，让你能够充分使用 JavaScript 的强大功能。

> [!WARNING]
> 函数式变体 API 无法被查询优化器优化或使用集合索引。它旨在用于标准 API 不够用的罕见情况。

### 函数式 Select

> [!WARNING]
> `fn.select()` 不能与 `groupBy()` 一起使用。`groupBy` 运算符需要静态分析 `select` 子句以发现要计算哪些聚合函数，这对于不透明的 JavaScript 函数是不可能的。对分组查询使用标准 `.select()` API。

使用 `fn.select()` 进行带 JavaScript 逻辑的复杂转换：

```ts
const userProfiles = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .fn.select((row) => ({
      id: row.user.id,
      displayName: `${row.user.firstName} ${row.user.lastName}`,
      salaryTier: row.user.salary > 100000 ? 'senior' : 'junior',
      emailDomain: row.user.email.split('@')[1],
      isHighEarner: row.user.salary > 75000,
    }))
)
```

### 函数式 Where

使用 `fn.where()` 进行复杂过滤逻辑：

```ts
const specialUsers = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .fn.where((row) => {
      const user = row.user
      return user.active && 
             (user.age > 25 || user.role === 'admin') &&
             user.email.includes('@company.com')
    })
)
```

### 函数式 Having

使用 `fn.having()` 进行复杂聚合过滤：

```ts
const highValueCustomers = createLiveQueryCollection((q) =>
  q
    .from({ order: ordersCollection })
    .groupBy(({ order }) => order.customerId)
    .select(({ order }) => ({
      customerId: order.customerId,
      totalSpent: sum(order.amount),
      orderCount: count(order.id),
    }))
    .fn.having(({ $selected }) => {
      return $selected.totalSpent > 1000 && $selected.orderCount >= 3
    })
)
```

### 复杂转换

函数式变体擅长复杂数据转换：

```ts
const userProfiles = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .fn.select((row) => {
      const user = row.user
      const fullName = `${user.firstName} ${user.lastName}`.trim()
      const emailDomain = user.email.split('@')[1]
      const ageGroup = user.age < 25 ? 'young' : user.age < 50 ? 'adult' : 'senior'
      
      return {
        userId: user.id,
        displayName: fullName || user.name,
        contactInfo: {
          email: user.email,
          domain: emailDomain,
          isCompanyEmail: emailDomain === 'company.com'
        },
        demographics: {
          age: user.age,
          ageGroup: ageGroup,
          isAdult: user.age >= 18
        },
        status: user.active ? 'active' : 'inactive',
        profileStrength: fullName && user.email && user.age ? 'complete' : 'incomplete'
      }
    })
)
```

### 类型推断

函数式变体保持完整的 TypeScript 支持：

```ts
const processedUsers = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .fn.select((row): ProcessedUser => ({
      id: row.user.id,
      name: row.user.name.toUpperCase(),
      age: row.user.age,
      ageGroup: row.user.age < 25 ? 'young' : row.user.age < 50 ? 'adult' : 'senior',
    }))
)
```

### 何时使用函数式变体

当你需要以下内容时，请使用函数式变体：
- 无法用内置函数表达的复杂 JavaScript 逻辑
- 与外部库或实用程序的集成
- 用于自定义操作的完整 JavaScript 功能

函数式变体中的回调是实际执行的 JavaScript 函数，这与使用声明式表达式的标准 API 不同。这让你完全控制逻辑，但代价是优化机会减少。

但是，尽可能首选标准 API，因为它提供更好的性能和优化机会。
