---
title: TypeScript 客户端
description: >-
  Electric 提供了一个 TypeScript 客户端，用于从 Postgres 流式传输 Shapes 到
  网页浏览器和其他 JavaScript 环境。
---

TypeScript 客户端是一个高级客户端接口，它封装了 [HTTP API](/docs/sync/api/http)，使得在网页浏览器和其他 JavaScript 环境中同步 [Shapes](/docs/sync/guides/shapes) 变得简单。

定义在 [packages/typescript-client](https://github.com/electric-sql/electric/tree/main/packages/typescript-client) 中，它提供了一个 [ShapeStream](#shapestream) 原语来订阅变更流，以及一个 [Shape](#shape) 原语来在变更时获取整个 shape。

## 安装

该客户端以 [`@electric-sql/client`](https://www.npmjs.com/package/@electric-sql/client) 的名称发布在 NPM 上：

```sh
npm i @electric-sql/client
```

## 使用方法

该客户端导出：

* 一个 [`ShapeStream`](#shapestream) 类，用于消费 [Shape Log](../http#shape-log)
* 一个 [`Shape`](#shape) 类，用于将日志流具体化为 shape 对象

### 最佳实践：使用 API 端点，而非直接访问

:::tip 推荐模式
虽然 Electric 客户端可以直接连接到 Electric 服务，**但我们强烈建议在生产应用中通过后端 API 代理请求**。这种模式将 Electric shapes 视为普通 API 调用，提供更好的安全性、可维护性和开发体验。
:::

#### 推荐：API 代理模式

```ts
// 客户端代码 - 简洁的 API 模式
import { ShapeStream, Shape } from '@electric-sql/client'

const stream = new ShapeStream({
  url: `http://localhost:3001/api/items`, // 你的 API 端点
  // 不会向客户端暴露表或 SQL
})
const shape = new Shape(stream)
shape.subscribe((data) => console.log(data))
```

```ts
// 服务端代码 - 处理 Electric 细节
import { ELECTRIC_PROTOCOL_QUERY_PARAMS } from '@electric-sql/client'

app.get('/api/items', async (req, res) => {
  const electricUrl = new URL('http://localhost:3000/v1/shape')

  // 仅转发 Electric 协议参数
  ELECTRIC_PROTOCOL_QUERY_PARAMS.forEach((param) => {
    if (req.query[param]) {
      electricUrl.searchParams.set(param, req.query[param])
    }
  })

  // 服务端控制表和授权
  electricUrl.searchParams.set('table', 'items')
  electricUrl.searchParams.set('where', `user_id = '${req.user.id}'`)

  // 代理响应并流式传输...
  const response = await fetch(electricUrl)
  // 处理流式传输（完整示例请参见认证指南）
})
```

此模式提供：

* **安全性**：凭证和表名永远不会暴露给客户端
* **授权**：服务端通过 WHERE 子句控制数据访问
* **类型安全**：后端验证所有操作
* **可维护性**：数据库变更不影响客户端代码
* **熟悉性**：像标准 REST/GraphQL API 一样工作

**→ 请参阅[认证指南](/docs/sync/guides/auth)，了解 API 代理模式的详细解释和完整实现示例。**

#### 直接连接（仅限开发）

对于开发或示例，你可以直接连接：

```ts
import { ShapeStream, Shape } from '@electric-sql/client'

const stream = new ShapeStream({
  url: `http://localhost:3000/v1/shape`,
  params: {
    table: 'items',
  },
})
const shape = new Shape(stream)
shape.subscribe((data) => console.log(data))
```

:::warning
直接连接会暴露数据库结构，应仅用于开发或受信任的环境。
:::

### ShapeStream

[`ShapeStream`](https://github.com/electric-sql/electric/blob/main/packages/typescript-client/src/client.ts#L163) 是一个低级原语，用于消费 [Shape Log](../http#shape-log)。

通过 shape 定义和选项构造，然后可以直接订阅 shape 日志消息，或者传入 [`Shape`](#shape) 将流具体化为对象。

```tsx
import { ShapeStream } from '@electric-sql/client'

// 在插入、更新或删除时向订阅者传递行
const stream = new ShapeStream({
  url: `http://localhost:3000/v1/shape`,
  params: {
    table: `foo`,
  },
})

stream.subscribe((messages) => {
  // messages 是一个包含一个或多个行更新的数组
  // 流将等待所有订阅者处理完这些消息后再继续
})
```

#### 使用 Server-Sent Events (SSE)

Electric 支持 Server-Sent Events (SSE) 以实现更高效的实时更新。SSE 使用持久连接，允许服务器在更新发生时立即推送，而不是进行重复的长轮询请求：

```tsx
import { ShapeStream } from '@electric-sql/client'

const stream = new ShapeStream({
  url: `http://localhost:3000/v1/shape`,
  params: {
    table: `foo`,
  },
  liveSse: true, // 启用 SSE 进行实时更新
})

stream.subscribe((messages) => {
  // 通过 SSE 接收实时更新
})
```

**SSE 的优势：**

* 更少的 HTTP 请求 - 客户端无需在每条消息后重新连接
* 对于频繁到达的小消息（间隔 <100ms，如 token 流式传输）延迟更低
* 减少带宽（每次更新无需请求开销）
* 对于频繁更新更高效

**自动回退：**

客户端会自动检测 SSE 何时无法正常工作（例如，由于代理缓冲），并回退到长轮询。当以下情况发生时：

1. SSE 连接立即关闭（< 1 秒）
2. 这种情况连续发生 3 次
3. 客户端记录警告并切换到长轮询

如果你的反向代理或 CDN 正在缓冲响应，你可能需要配置它以支持流式传输。请参阅 [HTTP API SSE 文档](/docs/sync/api/http#server-sent-events-sse) 获取代理配置示例。

#### 选项

`ShapeStream` 构造函数接受 [以下选项](https://github.com/electric-sql/electric/blob/main/packages/typescript-client/src/client.ts#L39)：

```ts
/**
 * ShapeStream 的构造选项。
 */
export interface ShapeStreamOptions<T = never> {
  /**
   * Shape 托管的完整 URL。这可以是
   * Electric 服务器本身或代理。
   * 例如，对于本地 Electric 实例，你可以
   * 设置为 `http://localhost:3000/v1/shape`
   */
  url: string

  /**
   * Shape 的 PostgreSQL 特定参数。
   * 包括表、where 子句、列和副本设置。
   */
  params: {
    /**
     * Shape 的根表。
     */
    table: string

    /**
     * Shape 的 where 子句。
     */
    where?: string

    /**
     * 位置 where 子句参数值。这些将被传递到服务器
     * 并替换 where 子句中的 `$i` 参数。
     *
     * 可以是数组（注意位置参数从 1 开始，数组将相应映射），
     * 或具有与 where 子句中使用位置参数匹配的键的对象。
     *
     * 如果 where 子句是 `id = $1 or id = $2`，params 必须具有键 `"1"` 和 `"2"`，
     * 或者是长度为 2 的数组。
     */
    params?: Record<`${number}`, string> | string[]

    /**
     * 要包含在 shape 中的列。
     * 必须包含主键，并且只能包含有效列。
     */
    columns?: string[]

    /**
     * 如果 `replica` 是 `default`（默认值），则 Electric 将仅发送
     * 更新中的已更改列。
     *
     * 如果是 `full`，Electric 将发送包含已更改和
     * 未更改值的整行。`old_value` 也将出现在更新消息中，
     * 包含已更改列的前一个值。
     *
     * 将 `replica` 设置为 `full` 显然会导致更高的带宽
     * 使用量，因此不建议这样做。
     */
    replica?: Replica

    /**
     * 要附加到 URL 的附加请求参数。
     * 这些将与 Electric 的标准参数合并。
     */
    [key: string]: string | string[] | undefined
  }

  /**
   * Shape 日志上的"偏移量"。通常不需要设置，因为 ShapeStream
   * 会自动处理这一点。设置偏移量的常见场景是
   * 如果你正在维护日志的本地缓存。如果你已经离线
   * 并且正在重新启动 ShapeStream 以追赶 Shape 的最新状态，
   * 你会传入你从 Electric 服务器看到的最后一个偏移量和句柄，
   * 以便它知道从 shape 的哪个点开始追赶你。
   */
  offset?: Offset

  /**
   * 与 `offset` 类似，除非你正在维护
   * 日志缓存，否则通常不会使用。
   */
  handle?: string

  /**
   * 要附加到客户端发出的请求的 HTTP 头。
   * 可用于添加认证头。
   */
  headers?: Record<string, string>

  /**
   * 自动获取 Shape 的更新。如果你只想
   * 同步当前 shape 并停止，请传递 false。
   */
  subscribe?: boolean

  /**
   * 初始数据加载模式。控制数据如何加载到 shape 日志中。
   *
   * 当 `log` 为 `full`（默认值）时，服务器会在传递实时更新之前
   * 创建匹配 shape 定义的所有数据的初始快照。
   *
   * 当 `log` 为 `changes_only` 时，服务器跳过初始快照创建。
   * 客户端将仅接收建立 shape 后发生的更改，
   * 而看不到基础数据。在此模式下，你可以使用 `requestSnapshot()` 
   * 按需获取数据的子集。
   */
  log?: 'full' | 'changes_only'

  /**
   * 使用 Server-Sent Events (SSE) 进行实时更新，而不是长轮询。
   *
   * 启用后，客户端使用持久 SSE 连接接收实时
   * 更新，这比长轮询更高效（单个连接 vs 多个请求）。
   *
   * 如果 SSE 连接失败（例如，由于代理缓冲或配置错误），
   * 客户端会自动回退到长轮询。这会在 3 次连续
   * 快速关闭尝试（连接持续少于 1 秒）后发生。
   *
   * 默认值：false（使用长轮询）
   */
  liveSse?: boolean

  /**
   * @deprecated 请改用 `liveSse`。将在未来版本中移除。
   */
  experimentalLiveSse?: boolean

  /**
   * 用于中止流的信号。
   */
  signal?: AbortSignal

  /**
   * 自定义 fetch 客户端实现。
   */
  fetchClient?: typeof fetch

  /**
   * 用于处理特定 Postgres 数据类型的自定义解析器。
   */
  parser?: Parser<T>

  /**
   * 一个在发出给订阅者之前转换消息值的函数。
   * 这可用于 camelCase 键或重命名字段。
   */
  transformer?: TransformFunction<T>

  /**
   * 用于处理错误的函数。
   * 这是可选的，当未提供时，任何 shapestream 错误都将被抛出。
   * 如果函数返回包含 parameters 和/或 headers 的对象，
   * shapestream 将应用这些更改并重试同步。
   * 如果函数返回 void，则 shapestream 将停止。
   */
  onError?: ShapeStreamErrorHandler

  backoffOptions?: BackoffOptions
}
```

请注意，某些参数名称是 Electric 内部使用的保留名称，不能在自定义参数中使用：

* `offset`
* `handle`
* `live`
* `cursor`
* `source_id`

以下 PostgreSQL 特定参数应包含在 `params` 对象中：

* `table` - Shape 的根表
* `where` - 用于过滤行的 SQL where 子句
* `params` - where 子句中位置参数的值（例如 `$1`）
* `columns` - 要包含的列列表
* `replica` - 控制是发送完整行更新还是部分行更新

使用 PostgreSQL 特定参数的示例：

```typescript
const stream = new ShapeStream({
  url: 'http://localhost:3000/v1/shape',
  params: {
    table: 'users',
    where: 'age > $1',
    columns: ['id', 'name', 'email'],
    params: ['18'],
    replica: 'full',
  },
})
```

你也可以在 `params` 对象中与 PostgreSQL 特定参数一起包含其他自定义参数：

```typescript
const stream = new ShapeStream({
  url: 'http://localhost:3000/v1/shape',
  params: {
    table: 'users',
    customParam: 'value',
  },
})
```

#### 动态选项

`params` 和 `headers` 都支持在需要时解析的函数选项。这些函数可以是同步的或异步的：

```typescript
const stream = new ShapeStream({
  url: 'http://localhost:3000/v1/shape',
  params: {
    table: 'items',
    userId: () => getCurrentUserId(),
    filter: async () => await getUserPreferences(),
  },
  headers: {
    Authorization: async () => `Bearer ${await getAccessToken()}`,
    'X-Tenant-Id': () => getCurrentTenant(),
  },
})
```

函数选项并行解析，使得这种模式对于多个异步操作（如获取认证令牌和用户上下文）非常高效。常见用例包括：

* 需要刷新的认证令牌
* 可能更改的用户特定参数
* 基于当前状态的动态过滤
* 上下文决定请求的多租户应用程序

#### 消息

`ShapeStream` 消费并发出消息流。这些消息可以是表示 shape 数据更改的 `ChangeMessage`：

```ts
export type ChangeMessage<T extends Row<unknown> = Row> = {
  key: string
  value: T
  old_value?: Partial<T> // 仅当 `replica` 为 `full` 时在更新中提供
  headers: Header & { operation: `insert` | `update` | `delete` }
}
```

或者是表示对客户端指令的 `ControlMessage`：

```ts
export type ControlMessage = {
  headers:
    | (Header & {
        control: `up-to-date` | `must-refetch`
        global_last_seen_lsn?: string
      })
    | (Header & { control: `snapshot-end` } & PostgresSnapshot)
}
```

控制消息包括：

* `up-to-date` - 表示客户端已收到所有可用数据
* `must-refetch` - 表示客户端必须丢弃本地数据并重新从头同步
* `snapshot-end` - 标记子集快照的结束，包含 PostgreSQL 快照元数据（xmin、xmax、xip_list）用于跟踪要跳过的更改

有关详细信息，请参阅 [HTTP API 控制消息文档](../http#control-messages)。

#### 解析和自定义解析

要了解 shape 中每列的类型，你可以检查 shape 响应中的 `electric-schema` 响应头。此头包含每列的 PostgreSQL 类型信息。

默认情况下，在构造 `ChangeMessage.value` 时，`ShapeStream` 会将以下 Postgres 类型解析为原生 JavaScript 值：

* `int2`、`int4`、`float4` 和 `float8` 被解析为 JavaScript `Number`
* `int8` 被解析为 JavaScript `BigInt`
* `bool` 被解析为 JavaScript `Boolean`
* `json` 和 `jsonb` 使用 `JSON.parse` 解析为 JavaScript 值/数组/对象
* Postgres 数组被解析为 JavaScript 数组，例如 `"{{1,2},{3,4}}"` 被解析为 `[[1,2],[3,4]]`

所有其他类型不会被解析，而是以保持它们在 HTTP 端点提供的字符串格式。

你可以通过为特定 PostgreSQL 数据类型定义自定义解析器来扩展默认解析行为。当你想要将日期、JSON 或其他复杂类型的字符串表示转换为相应的 JavaScript 对象时，这特别有用。以下是一个示例：

```ts
// 定义行类型
type CustomRow = {
  id: number
  title: string
  created_at: Date // 我们希望这是一个 Date 对象
}

const stream = new ShapeStream<CustomRow>({
  url: 'http://localhost:3000/v1/shape',
  params: {
    table: 'posts',
  },
  parser: {
    // 将时间戳列解析为 JavaScript Date 对象
    timestamptz: (date: string) => new Date(date),
  },
})

const shape = new Shape(stream)
shape.subscribe((data) => {
  console.log(data.created_at instanceof Date) // true
})
```

**列映射**

要在数据库格式（例如 snake_case）和应用程序格式（例如 camelCase）之间转换列名，请使用 `columnMapper` 选项。这提供了双向转换，在 WHERE 子句中自动编码列名并在查询结果中解码它们。

```ts
import { ShapeStream, snakeCamelMapper } from '@electric-sql/client'

type CustomRow = {
  id: number
  postTitle: string // 数据库中的 post_title
  createdAt: Date // 数据库中的 created_at
}

const stream = new ShapeStream<CustomRow>({
  url: 'http://localhost:3000/v1/shape',
  params: {
    table: 'posts',
  },
  parser: {
    timestamptz: (date: string) => new Date(date), // 类型转换
  },
  columnMapper: snakeCamelMapper(), // 列名转换
})

// 现在你也可以在 WHERE 子句中使用 camelCase：
await stream.requestSnapshot({
  where: "postTitle LIKE $1", // 自动编码为：post_title LIKE $1
  params: { "1": "%electric%" },
  orderBy: "createdAt DESC", // 自动编码为：created_at DESC
  limit: 10,
})
```

对于自定义映射，请使用 `createColumnMapper`：

```ts
import { createColumnMapper } from '@electric-sql/client'

const mapper = createColumnMapper({
  post_title: 'postTitle',
  created_at: 'createdAt',
})

const stream = new ShapeStream<CustomRow>({
  url: 'http://localhost:3000/v1/shape',
  params: { table: 'posts' },
  columnMapper: mapper,
})
```

**转换器**

解析器对单个字段进行操作，columnMapper 重命名列，而转换器允许你修改整个记录以进行值转换，如端到端加密数据客户端解密、计算派生字段或其他数据处理。

**注意：** 对于列名转换（snake_case ↔ camelCase），请使用 `columnMapper`。转换器专门用于转换值，而不是列名。

```ts
type CustomRow = {
  id: number
  title: string
  encryptedData: string
}

const stream = new ShapeStream<CustomRow>({
  url: 'http://localhost:3000/v1/shape',
  params: { table: 'posts' },
  columnMapper: snakeCamelMapper(), // 重命名列
  transformer: (row) => ({
    ...row,
    encryptedData: decrypt(row.encryptedData), // 转换值
  }),
})
```

#### Replica full

默认情况下，Electric 在更新消息中发送已修改的列，而不是完整的行。具体来说：

* `insert` 操作包含完整的行
* `update` 操作包含主键列和已更改的列
* `delete` 操作仅包含主键列

如果你想在更新和删除时接收完整的行值，可以将 `ShapeStream` 的 `replica` 选项设置为 `full`：

```tsx
import { ShapeStream } from '@electric-sql/client'

const stream = new ShapeStream({
  url: `http://localhost:3000/v1/shape`,
  params: {
    table: `foo`,
    replica: `full`,
  },
})
```

使用 `replica=full` 时，返回的行将包括：

* 在 `insert` 时，`msg.value` 中的新值
* 在 `update` 时，`msg.value` 中的新值和 `msg.old_value` 中任何已更改列的前一个值 - 可以通过组合两者来重建完整的先前状态
* 在 `delete` 时，`msg.value` 中的完整先前值

这效率较低，并且对于相同的 shape（特别是对于具有大静态列值的表）将使用更多带宽。还要注意，具有不同 `replica` 设置的 shape 是不同的，即使是相同的表和 where 子句组合。

#### 认证

有关包括令牌刷新和授权的认证模式，请参阅[认证指南](/docs/sync/guides/auth)，其中详细介绍了代理和守门员认证模式。

### Shape

[`Shape`](https://github.com/electric-sql/electric/blob/main/packages/typescript-client/src/shape.ts) 是使用同步数据的主要原语。

它接受一个 [`ShapeStream`](#shapestream)，消费流，将其具体化为 Shape 对象，并在发生更改时通知你。

```tsx
import { ShapeStream, Shape } from '@electric-sql/client'

const stream = new ShapeStream({
  url: `http://localhost:3000/v1/shape`,
  params: {
    table: `foo`,
  },
})
const shape = new Shape(stream)

// 返回在 shape 数据完全加载后解析的最新 shape 数据 promise
await shape.rows

// 当 shape 更新时向订阅者传递 shape 数据
shape.subscribe(({ rows }) => {
  // rows 是 shape 中每行的当前值的数组。
})
```

### 订阅更新

`subscribe` 方法允许你在 shape 更改时接收更新。它接受两个参数：

1. 消息处理程序回调（必需）
2. 错误处
理程序回调（可选）

```typescript
const stream = new ShapeStream({
  url: 'http://localhost:3000/v1/shape',
  params: {
    table: 'issues',
  },
})

// 订阅消息和错误处理程序
stream.subscribe(
  (messages) => {
    // 处理消息
    console.log('收到的消息：', messages)
  },
  (error) => {
    // 获取错误通知
    console.error('订阅中的错误：', error)
  }
)
```

你可以对同一流有多个活动订阅。每个订阅将接收相同的消息，并且流将等待所有订阅者处理完其消息后再继续。

要停止接收更新，你可以：

* 使用 `subscribe` 返回的函数取消订阅特定订阅
* 使用 `unsubscribeAll()` 取消订阅所有订阅

```typescript
// 存储取消订阅函数
const unsubscribe = stream.subscribe((messages) => {
  console.log('收到的消息：', messages)
})

// 稍后，取消订阅此特定订阅
unsubscribe()

// 或取消订阅所有订阅
stream.unsubscribeAll()
```

### 错误处理

ShapeStream 通过 `onError` 回调提供强大的错误处理和自动重试支持。

#### `onError` 回调

`onError` 选项提供强大的错误恢复和自动重试支持：

```typescript
onError?: ShapeStreamErrorHandler

type ShapeStreamErrorHandler = (
  error: Error
) => void | RetryOpts | Promise<void | RetryOpts>

type RetryOpts = {
  params?: ParamsRecord
  headers?: Record<string, string>
}
```

#### 返回值行为

`onError` 的返回值控制同步是否继续：

| 返回值 | 行为 |
|--------------|----------|
| `{}`（空对象） | 使用相同的参数和头重试同步 |
| `{ params }` | 使用修改后的参数重试同步 |
| `{ headers }` | 使用修改后的头重试同步 |
| `{ params, headers }` | 使用两者都修改重试同步 |
| `void` 或 `undefined` | **永久停止同步** |

**关键**：如果你希望同步在错误后继续，你**必须**返回至少一个空对象 `{}`。简单地记录错误而不返回任何内容将停止同步。

**自动重试**：客户端会自动重试 5xx 服务器错误、网络错误和 429 速率限制，并使用指数退避（可通过 `backoffOptions` 配置）。`onError` 回调仅在耗尽这些自动重试后或对于不可重试的错误（如 4xx 客户端错误）才被调用。

**没有 `onError`**：如果未提供错误处理程序，不可重试的错误（如 4xx 客户端错误）将被抛出，流将停止。

#### 示例

**处理客户端错误并重试：**

```typescript
const stream = new ShapeStream({
  url: 'http://localhost:3000/v1/shape',
  params: { table: 'items' },
  onError: (error) => {
    console.error('流错误：', error)

    // 注意：5xx 错误由客户端自动重试
    // onError 主要用于处理 4xx 客户端错误

    if (error instanceof FetchError && error.status === 400) {
      // 错误请求 - 也许使用不同的参数重试
      return {
        params: { table: 'items', where: 'id > 0' }
      }
    }

    // 在其他错误时停止（返回 void）
  }
})
```

**刷新认证令牌：**

```typescript
const stream = new ShapeStream({
  url: 'http://localhost:3000/v1/shape',
  params: { table: 'items' },
  headers: {
    Authorization: `Bearer ${initialToken}`
  },
  onError: async (error) => {
    if (error instanceof FetchError && error.status === 401) {
      // 异步刷新令牌
      const newToken = await refreshAuthToken()

      return {
        headers: {
          Authorization: `Bearer ${newToken}`
        }
      }
    }

    // 使用相同参数重试其他错误
    return {}
  }
})
```

**更新查询参数：**

```typescript
const stream = new ShapeStream({
  url: 'http://localhost:3000/v1/shape',
  params: {
    table: 'items',
    where: 'user_id = $1',
    params: [currentUserId]
  },
  onError: (error) => {
    if (error instanceof FetchError && error.status === 403) {
      // 访问被拒绝 - 也许切换到不同的用户上下文
      return {
        params: {
          table: 'items',
          where: 'user_id = $1',
          params: [fallbackUserId]
        }
      }
    }

    return {} // 重试其他错误
  }
})
```

**客户端错误的选择性重试逻辑：**

```typescript
let retryCount = 0

const stream = new ShapeStream({
  url: 'http://localhost:3000/v1/shape',
  params: { table: 'items' },
  onError: (error) => {
    console.error('流错误：', error)

    // 注意：此回调在 5xx 错误的自动重试之后调用
    // 所以如果你看到 5xx 在这里，指数退避已经耗尽

    if (error instanceof FetchError) {
      // 401 - 尝试刷新认证令牌一次
      if (error.status === 401 && retryCount === 0) {
        retryCount++
        return { headers: { Authorization: getNewToken() } }
      }

      // 400 - 错误请求，可能是我们的参数有问题
      if (error.status === 400) {
        console.error('错误请求，停止流')
        return // 停止
      }

      // 其他 4xx 错误 - 停止
      if (error.status >= 400 && error.status < 500) {
        return // 停止
      }
    }

    // 对于非 HTTP 错误或耗尽的 5xx 重试，停止
    return // 停止
  }
})
```

#### 订阅级错误回调

单个订阅也可以处理特定于其订阅的错误：

```typescript
stream.subscribe(
  (messages) => {
    // 处理消息
  },
  (error) => {
    // 处理此特定订阅的错误
    console.error('订阅错误：', error)
  }
)
```

注意：订阅错误回调无法控制重试行为 - 使用流级 `onError` 来实现。

#### 错误类型

所有 Electric 错误都扩展自基础 `Error` 类：

**初始化错误**（由构造函数抛出）：

* `MissingShapeUrlError`：缺少必需的 URL 参数
* `InvalidSignalError`：无效的 AbortSignal 实例
* `ReservedParamError`：使用保留的参数名称

**运行时错误**（由 `onError` 处理或抛出）：

* **`FetchError`**：HTTP 请求失败
  * 属性：`status`、`text`、`json`、`headers`、`url`
  * 使用它来检查 HTTP 状态码并实现重试逻辑

* **`FetchBackoffAbortError`**：请求被退避逻辑中止
  * 使用 `AbortSignal` 取消请求时抛出

* **`MissingShapeHandleError`**：当 offset > -1 时需要 Shape 句柄

* **`ParserNullValueError`**：不允许 NULL 的列中的 NULL 值

* **`MissingHeadersError`**：响应缺少必需的头

从包中导入错误类型：

```typescript
import { FetchError, FetchBackoffAbortError } from '@electric-sql/client'
```

### 仅更改模式和子集快照

Electric 支持两种用于同步 shapes 的日志模式。默认的 `full` 模式创建初始快照，然后传递实时更新。`changes_only` 模式跳过初始快照：

```typescript
const stream = new ShapeStream({
  url: 'http://localhost:3000/v1/shape',
  params: {
    table: 'items',
  },
  log: 'changes_only', // 跳过初始快照
})
```

在 `changes_only` 日志模式中，客户端仅接收 shape 建立后发生的更改。这对于以下情况很有用：

* 不需要历史数据的地方
* 通过其他方式获取初始状态的应用程序
* 启动时不需要完整数据集以减少初始同步时间

子集快照允许用户查看比整个 shape 更窄的数据视图，从而实现高级渐进式或动态数据加载策略。它有助于避免客户端在启动时加载大型数据集，特别是对于很少更改且需要用于引用（例如，仅加载显式提到的用户）的数据

#### 从 'now' 开始

你可以使用 `offset: 'now'` 跳过所有历史数据并从当前点开始：

```typescript
const stream = new ShapeStream({
  url: 'http://localhost:3000/v1/shape',
  params: {
    table: 'items',
  },
  offset: 'now', // 从当前点开始，跳过所有历史记录
  log: 'changes_only',
})
```

这会立即提供带有最新继续偏移量的 up-to-date 消息，允许应用程序从头开始而无需处理任何历史数据。

#### 请求子集快照

在 `changes_only` 模式下，你可以使用 `requestSnapshot()` 方法按需请求特定数据子集的快照：

```typescript
const stream = new ShapeStream({
  url: 'http://localhost:3000/v1/shape',
  params: {
    table: 'items',
  },
  log: 'changes_only',
})

// 使用过滤和分页请求数据子集
const { metadata, data } = await stream.requestSnapshot({
  where: "priority = 'high'",
  params: { '1': 'high' },
  orderBy: 'created_at DESC',
  limit: 20,
  offset: 0,
})

// 快照数据会自动注入到消息流中
// 并带有适当的更改跟踪
```

:::warning URL 长度限制
使用子集参数在 URL 中的 GET 请求（默认）在查询涉及许多参数（例如，连接查询中有数百个 ID 的 `WHERE id = ANY($1)`）时可能会因 `414 Request-URI Too Long` 错误而失败。

要避免这种情况，请通过在流上设置 `subsetMethod: 'POST'` 来使用 POST 请求：

```typescript
const stream = new ShapeStream({
  url: 'http://localhost:3000/v1/shape',
  params: { table: 'items' },
  log: 'changes_only',
  subsetMethod: 'POST', // 对所有子集请求使用 POST
})
```

或者为每个请求覆盖 `method: 'POST'`：

```typescript
const { metadata, data } = await stream.requestSnapshot({
  where: "status = 'active'",
  method: 'POST', // 使用 POST 正文而不是查询参数
})
```

在 Electric 2.0 中，子集快照的 GET 将被弃用，仅支持 POST。
:::

`requestSnapshot` 方法接受以下参数：

* `where`（可选）- 用于过滤子集的 WHERE 子句
* `params`（可选）- WHERE 子句的参数
* `orderBy`（使用 limit/offset 时需要）- ORDER BY 子句
* `limit`（可选）- 要返回的最大行数
* `offset`（可选）- 要跳过的行数，用于分页
* `method`（可选）- HTTP 方法：`'GET'`（默认）或 `'POST'`

该方法返回一个包含以下内容的 promise：

* `metadata` - PostgreSQL 快照元数据（xmin、xmax、xip_list、snapshot_mark、database_lsn）
* `data` - 请求子集的更改消息数组

快照数据会自动注入到订阅的消息流中，并带有适当的更改跟踪。客户端使用快照元数据来过滤掉已合并到快照中的更改，防止重复。

在快照数据之后添加 `snapshot-end` 控制消息以标记其边界：

```typescript
{
  headers: {
    control: "snapshot-end",
    xmin: "1234",
    xmax: "1240",
    xip_list: ["1235", "1237"],
    snapshot_mark: 42,
    database_lsn: "0/12345678"
  }
}
```

有关更多使用示例，请参阅[演示](/sync/demos/)和[集成](/docs/sync/integrations/react)。
