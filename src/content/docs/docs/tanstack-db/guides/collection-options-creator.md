---
title: 创建集合选项创建器
id: guide/collection-options-creator
source: https://tanstack.com/db/latest/docs/guide/collection-options-creator
license: MIT
---

# 创建集合选项创建器

集合选项创建器是一个工厂函数，用于为 TanStack DB 集合生成配置选项。它提供了一种标准化的方式，将不同的同步引擎和数据源与 TanStack DB 的响应式同步优先架构集成。

## 概述

集合选项创建器遵循一致的模式：
1. 接受特定于同步引擎的配置
2. 返回满足 `CollectionConfig` 接口的对象
3. 处理同步初始化、数据解析和事务管理
4. 可选：提供特定于同步引擎的实用函数

## 何时创建自定义集合

你应该在以下情况下创建自定义集合：
- 你有一个专用的同步引擎（如 ElectricSQL、Trailbase、Firebase、RxDB 或自定义 WebSocket 解决方案）
- 你需要同步行为，而这些行为未被查询集合覆盖
- 你想与具有自己同步协议的后端集成

**注意**：如果你只是调用 API 并返回数据，请改用查询集合。

## 核心要求

每个集合选项创建器必须实现这些关键职责：

### 1. 配置接口

定义扩展或包含标准集合属性的配置接口：

```typescript
// 模式 A：用户提供处理程序（Query / ElectricSQL 风格）
interface MyCollectionConfig<TItem extends object> {
  // 你的同步引擎特定选项
  connectionUrl: string
  apiKey?: string
  
  // 标准集合属性
  id?: string
  schema?: StandardSchemaV1
  getKey: (item: TItem) => string | number
  sync?: SyncConfig<TItem>
  
  rowUpdateMode?: 'partial' | 'full'
  
  // 用户提供变更处理程序
  onInsert?: InsertMutationFn<TItem>
  onUpdate?: UpdateMutationFn<TItem>
  onDelete?: DeleteMutationFn<TItem>
}

// 模式 B：内置处理程序（Trailbase 风格）
interface MyCollectionConfig<TItem extends object> 
  extends Omit<CollectionConfig<TItem>, 'onInsert' | 'onUpdate' | 'onDelete'> {
  // 你的同步引擎特定选项
  recordApi: MyRecordApi<TItem>
  connectionUrl: string
  
  rowUpdateMode?: 'partial' | 'full'
  
  // 注意：onInsert/onUpdate/onDelete 由你的集合创建器实现
}
```

### 2. 同步实现

同步函数是集合的核心。它必须：

同步函数必须返回一个清理函数，以便进行适当的垃圾回收：

```typescript
const sync: SyncConfig<T>['sync'] = (params) => {
  const { begin, write, commit, markReady, collection } = params
  
  // 1. 初始化与同步引擎的连接
  const connection = initializeConnection(config)
  
  // 2. 首先设置实时订阅（防止竞态条件）
  const eventBuffer: Array<any> = []
  let isInitialSyncComplete = false
  
  connection.subscribe((event) => {
    if (!isInitialSyncComplete) {
      // 在初始同步期间缓冲事件以防止竞态条件
      eventBuffer.push(event)
      return
    }
    
    // 处理实时事件
    begin()
    
    switch (event.type) {
      case 'insert':
        write({ type: 'insert', value: event.data })
        break
      case 'update':
        write({ type: 'update', value: event.data })
        break
      case 'delete':
        write({ type: 'delete', value: event.data })
        break
    }
    
    commit()
  })
  
  // 3. 执行初始数据获取
  async function initialSync() {
    try {
      const data = await fetchInitialData()
      
      begin() // 开始一个事务
      
      for (const item of data) {
        write({
          type: 'insert',
          value: item
        })
      }
      
      commit() // 提交事务
      
      // 4. 处理缓冲的事件
      isInitialSyncComplete = true
      if (eventBuffer.length > 0) {
        begin()
          for (const event of eventBuffer) {
            // 根据同步引擎的需要去重
            write({ type: event.type, value: event.data })
          }
        commit()
        eventBuffer.splice(0)
      }
      
    } catch (error) {
      console.error('初始同步失败：', error)
      throw error
    } finally {
      // 始终调用 markReady，即使出错
      markReady()
    }
  }

  initialSync()
  
  // 4. 返回清理函数
  return () => {
    connection.close()
    // 清理所有计时器、间隔或其他资源
  }
}
```

### 3. 事务生命周期

理解事务生命周期对于正确实现非常重要。

同步过程遵循此生命周期：

1. **begin()** - 开始收集更改
2. **write()** - 将更改添加到待处理事务（缓冲直到 commit）
3. **commit()** - 原子地将所有更改应用到集合状态
4. **markReady()** - 发出初始同步完成的信号

**竞态条件预防：**
许多同步引擎在初始同步完成之前就开始实时订阅。你的实现**必须**去重通过订阅到达的、表示与初始同步相同数据的事件。考虑：
- 在初始获取**之前**启动监听器并缓冲事件
- 跟踪时间戳、序列号或文档版本
- 使用读取时间戳或其他排序机制

### 4. 数据解析和类型转换

如果你的同步引擎返回不同类型的数据，请为特定字段提供转换函数：

```typescript
interface MyCollectionConfig<TItem, TRecord> {
  // ... 其他配置
  
  // 仅为需要类型转换的字段指定转换
  parse: {
    created_at: (ts: number) => new Date(ts * 1000),  // 时间戳 -> Date
    updated_at: (ts: number) => new Date(ts * 1000),  // 时间戳 -> Date
    metadata?: (str: string) => JSON.parse(str)       // JSON 字符串 -> 对象
  }
  
  serialize: {
    created_at: (date: Date) => Math.floor(date.valueOf() / 1000),  // Date -> 时间戳
    updated_at: (date: Date) => Math.floor(date.valueOf() / 1000),  // Date -> 时间戳  
    metadata?: (obj: object) => JSON.stringify(obj)                 // 对象 -> JSON 字符串
  }
}
```

**类型转换示例：**

```typescript
// Firebase 时间戳转 Date
parse: {
  createdAt: (timestamp) => timestamp?.toDate?.() || new Date(timestamp),
  updatedAt: (timestamp) => timestamp?.toDate?.() || new Date(timestamp),
}

// PostGIS 几何图形转 GeoJSON
parse: {
  location: (wkb: string) => parseWKBToGeoJSON(wkb)
}

// JSON 字符串转对象（带错误处理）
parse: {
  metadata: (str: string) => {
    try {
      return JSON.parse(str)
    } catch {
      return {}
    }
  }
}
```

### 5. Schema 和类型转换

构建自定义集合时，你需要决定如何处理后端存储格式与用户在集合中使用的客户端类型之间的关系。

#### 两个独立关注点

**后端格式** - 存储层使用的类型（SQLite、Postgres、Firebase 等）
- 示例：Unix 时间戳、ISO 字符串、JSON 字符串、PostGIS 几何图形

**客户端格式** - 用户在 TanStack DB 集合中使用的类型
- 示例：Date 对象、解析后的 JSON、GeoJSON

TanStack DB 中的 Schema 定义**客户端格式**（变更的 TInput/TOutput）。如何在后端和客户端格式之间建立桥梁取决于你的集成设计。

#### 方法 1：集成提供 Parse/Serialize 辅助函数

对于有特定存储格式的后端，提供用户配置的 `parse`/`serialize` 选项：

```typescript
// TrailBase 示例：用户指定字段转换
export function trailbaseCollectionOptions(config) {
  return {
    parse: config.parse,      // 用户提供字段转换
    serialize: config.serialize,
    
    onInsert: async ({ transaction }) => {
      const serialized = transaction.mutations.map(m =>
        serializeFields(m.modified, config.serialize)
      )
      await config.recordApi.createBulk(serialized)
    }
  }
}

// 用户明确配置转换
const collection = createCollection(
  trailbaseCollectionOptions({
    schema: todoSchema,
    parse: {
      created_at: (ts: number) => new Date(ts * 1000)  // Unix → Date
    },
    serialize: {
      created_at: (date: Date) => Math.floor(date.valueOf() / 1000)  // Date → Unix
    }
  })
)
```

**优势：** 对类型转换有明确控制。集成处理程序确保一致性地应用它们。

#### 方法 2：用户在 QueryFn/处理程序中处理一切

对于简单的 API 或用户需要完全控制的情况，他们可以自己处理解析/序列化：

```typescript
// 查询集合：用户处理所有转换
const collection = createCollection(
  queryCollectionOptions({
    schema: todoSchema,
    queryFn: async () => {
      const response = await fetch('/api/todos')
      const todos = await response.json()
      // 用户手动解析以匹配他们的 schema 的 TOutput
      return todos.map(todo => ({
        ...todo,
        created_at: new Date(todo.created_at)  // ISO 字符串 → Date
      }))
    },
    onInsert: async ({ transaction }) => {
      // 用户为后端手动序列化
      await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({
          ...transaction.mutations[0].modified,
          created_at: transaction.mutations[0].modified.created_at.toISOString()  // Date → ISO 字符串
        })
      })
    }
  })
)
```

**优势：** 最大灵活性，无抽象开销。用户确切地看到发生了什么。

#### 方法 3：在处理程序中自动序列化

如果你的后端有明确定义的类型，你可以在变更处理程序中自动序列化：

```typescript
export function myCollectionOptions(config) {
  return {
    onInsert: async ({ transaction }) => {
      // 为后端自动序列化已知类型
      const serialized = transaction.mutations.map(m => ({
        ...m.modified,
        // Date 对象 → 后端使用的 Unix 时间戳
        created_at: m.modified.created_at instanceof Date
          ? Math.floor(m.modified.created_at.valueOf() / 1000)
          : m.modified.created_at
      }))
      await backend.insert(serialized)
    }
  }
}
```

**优势：** 用户配置最少。集成自动处理后端的格式。

#### 关键设计原则

1. **Schema 仅验证客户端变更** - 它们不影响同步期间如何解析后端数据
2. **TOutput 是面向应用程序的类型** - 这是用户在应用程序中使用的类型
3. **根据后端约束选择方法** - 固定类型 → 自动序列化；可变类型 → 用户配置
4. **清楚地记录后端格式** - 解释你的存储使用什么类型以及如何处理它们

有关用户视角的 schema 的更多信息，请参阅 [Schema 指南](./schemas.md)。

### 6. 变更处理模式

在集合选项创建器中有两种不同的处理变更的模式：

#### 模式 A：用户提供的处理程序（ElectricSQL、Query）

用户在配置中提供变更处理程序。你的集合创建器将它们传递过去：

```typescript
interface MyCollectionConfig<TItem extends object> {
  // ... 其他配置
  
  // 用户提供这些处理程序
  onInsert?: InsertMutationFn<TItem>
  onUpdate?: UpdateMutationFn<TItem>
  onDelete?: DeleteMutationFn<TItem>
}

export function myCollectionOptions<TItem extends object>(
  config: MyCollectionConfig<TItem>
) {
  return {
    // ... 其他选项
    rowUpdateMode: config.rowUpdateMode || 'partial',
    
    // 传递用户提供的处理程序（可能带有附加逻辑）
    onInsert: config.onInsert ? async (params) => {
      const result = await config.onInsert!(params)
      // 附加同步协调逻辑
      return result
    } : undefined
  }
}
```

#### 模式 B：内置处理程序（Trailbase、WebSocket、Firebase）

你的集合创建器使用同步引擎的 API 直接实现处理程序：

```typescript
interface MyCollectionConfig<TItem extends object> 
  extends Omit<CollectionConfig<TItem>, 'onInsert' | 'onUpdate' | 'onDelete'> {
  // ... 同步引擎特定配置
  // 注意：onInsert/onUpdate/onDelete 不在配置中
}

export function myCollectionOptions<TItem extends object>(
  config: MyCollectionConfig<TItem>
) {
  return {
    // ... 其他选项
    rowUpdateMode: config.rowUpdateMode || 'partial',
    
    // 使用同步引擎 API 实现处理程序
    onInsert: async ({ transaction }) => {
      // 处理提供者特定的批处理限制（例如 Firestore 的 500 限制）
      const chunks = chunkArray(transaction.mutations, PROVIDER_BATCH_LIMIT)
      
      for (const chunk of chunks) {
        const ids = await config.recordApi.createBulk(
          chunk.map(m => serialize(m.modified))
        )
        await awaitIds(ids)
      }
      
      return transaction.mutations.map(m => m.key)
    },
    
    onUpdate: async ({ transaction }) => {
      const chunks = chunkArray(transaction.mutations, PROVIDER_BATCH_LIMIT)
      
      for (const chunk of chunks) {
        await Promise.all(
          chunk.map(m => 
            config.recordApi.update(m.key, serialize(m.changes))
          )
        )
      }
      
      await awaitIds(transaction.mutations.map(m => String(m.key)))
    }
  }
}
```

许多提供者都有批处理大小限制（Firestore：500，DynamoDB：25 等），因此相应地分块处理大型事务。

当**用户需要提供自己的 API 时选择模式 A**，当**你的同步引擎直接处理写入时选择模式 B**。

## 行更新模式

集合支持两种更新模式：
- **`partial`**（默认） - 更新与现有数据合并
- **`full`** - 更新替换整行

在同步配置中配置：

```typescript
sync: {
  sync: syncFn,
  rowUpdateMode: 'full' // 或 'partial'
}
```

## 生产示例

有关完整、可用于生产的示例，请参阅 TanStack DB 仓库中的集合包：

- **[@tanstack/query-collection](https://github.com/TanStack/db/tree/main/packages/query-collection)** - 模式 A：带全量重新获取策略的用户提供处理程序
- **[@tanstack/trailbase-collection](https://github.com/TanStack/db/tree/main/packages/trailbase-collection)** - 模式 B：带基于 ID 跟踪的内置处理程序  
- **[@tanstack/electric-collection](https://github.com/TanStack/db/tree/main/packages/electric-collection)** - 模式 A：带复杂同步协议的事务 ID 跟踪
- **[@tanstack/rxdb-collection](https://github.com/TanStack/db/tree/main/packages/rxdb-collection)** - 模式 B：将 [RxDB](https://rxdb.info) 变更流桥接到 TanStack DB 的同步生命周期的内置处理程序

### 生产集合的关键经验

**来自查询集合：**
- 最简单的方法：变更后全量重新获取
- 最适合：没有实时同步的 API
- 模式：用户提供 `onInsert/onUpdate/onDelete` 处理程序

**来自 Trailbase 集合：**  
- 展示基于 ID 的乐观状态管理
- 处理提供者批处理限制（分块大型操作）
- 模式：集合使用记录 API 提供变更处理程序

**来自 Electric 集合：**
- 用于分布式同步的复杂事务 ID 跟踪
- 演示高级去重技术
- 展示如何用同步协调包装用户处理程序

**来自 RxDB 集合：**
- 使用 RxDB 的内置查询和变更流
- 使用 `RxCollection.$` 订阅插入/更新/删除，并通过 begin-write-commit 将它们转发到 TanStack DB
- 实现内置变更处理程序（onInsert、onUpdate、onDelete），调用 RxDB API（bulkUpsert、incrementalPatch、bulkRemove）

## 完整示例：WebSocket 集合

这是一个基于 WebSocket 的集合选项创建器的完整示例，演示了完整的往返流程：

1. 客户端发送包含所有变更的事务（批处理）
2. 服务器处理事务并可能修改数据（验证、时间戳等）
3. 服务器发回确认和实际处理后的数据
4. 客户端等待此往返完成后再丢弃乐观状态

```typescript
import type {
  CollectionConfig,
  SyncConfig,
  InsertMutationFnParams,
  UpdateMutationFnParams,
  DeleteMutationFnParams,
  UtilsRecord,
} from '@tanstack/db'

interface WebSocketMessage<T> {
  type: 'insert' | 'update' | 'delete' | 'sync' | 'transaction' | 'ack'
  data?: T | T[]
  mutations?: Array<{
    type: 'insert' | 'update' | 'delete'
    data: T
    id?: string
  }>
  transactionId?: string
  id?: string
}

interface WebSocketCollectionConfig<TItem extends object>
  extends Omit<CollectionConfig<TItem>, 'onInsert' | 'onUpdate' | 'onDelete' | 'sync'> {
  url: string
  reconnectInterval?: number
  
  // 注意：onInsert/onUpdate/onDelete 由 WebSocket 连接处理
  // 用户不提供这些处理程序
}

interface WebSocketUtils extends UtilsRecord {
  reconnect: () => void
  getConnectionState: () => 'connected' | 'disconnected' | 'connecting'
}

export function webSocketCollectionOptions<TItem extends object>(
  config: WebSocketCollectionConfig<TItem>
): CollectionConfig<TItem> & { utils: WebSocketUtils } {
  let ws: WebSocket | null = null
  let reconnectTimer: NodeJS.Timeout | null = null
  let connectionState: 'connected' | 'disconnected' | 'connecting' = 'disconnected'
  
  // 跟踪等待确认待处理事务
  const pendingTransactions = new Map<string, {
    resolve: () => void
    reject: (error: Error) => void
    timeout: NodeJS.Timeout
  }>()
  
  const sync: SyncConfig<TItem>['sync'] = (params) => {
    const { begin, write, commit, markReady } = params
    
    function connect() {
      connectionState = 'connecting'
      ws = new WebSocket(config.url)
      
      ws.onopen = () => {
        connectionState = 'connected'
        // 请求初始同步
        ws.send(JSON.stringify({ type: 'sync' }))
      }
      
      ws.onmessage = (event) => {
        const message: WebSocketMessage<TItem> = JSON.parse(event.data)
        
        switch (message.type) {
          case 'sync':
            // 初始同步，带有项目数组
            begin()
            if (Array.isArray(message.data)) {
              for (const item of message.data) {
                write({ type: 'insert', value: item })
              }
            }
            commit()
            markReady()
            break
            
          case 'insert':
          case 'update':
          case 'delete':
            // 来自其他客户端的实时更新
            begin()
            write({ 
              type: message.type, 
              value: message.data as TItem 
            })
            commit()
            break
            
          case 'ack':
            // 服务器确认了我们的事务
            if (message.transactionId) {
              const pending = pendingTransactions.get(message.transactionId)
              if (pending) {
                clearTimeout(pending.timeout)
                pendingTransactions.delete(message.transactionId)
                pending.resolve()
              }
            }
            break
            
          case 'transaction':
            // 服务器在处理我们的事务后发回实际数据
            if (message.mutations) {
              begin()
              for (const mutation of message.mutations) {
                write({
                  type: mutation.type,
                  value: mutation.data
                })
              }
              commit()
            }
            break
        }
      }
      
      ws.onerror = (error) => {
        console.error('WebSocket 错误：', error)
        connectionState = 'disconnected'
      }
      
      ws.onclose = () => {
        connectionState = 'disconnected'
        // 自动重连
        if (!reconnectTimer) {
          reconnectTimer = setTimeout(() => {
            reconnectTimer = null
            connect()
          }, config.reconnectInterval || 5000)
        }
      }
    }
    
    // 开始连接
    connect()
    
    // 返回清理函数
    return () => {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer)
        reconnectTimer = null
      }
      if (ws) {
        ws.close()
        ws = null
      }
    }
  }
  
  // 辅助函数：发送事务并等待服务器确认
  const sendTransaction = async (
    params: InsertMutationFnParams<TItem> | UpdateMutationFnParams<TItem> | DeleteMutationFnParams<TItem>
  ): Promise<void> => {
    if (ws?.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket 未连接')
    }
    
    const transactionId = crypto.randomUUID()
    
    // 将事务中的所有变更转换为传输格式
    const mutations = params.transaction.mutations.map(mutation => ({
      type: mutation.type,
      id: mutation.key,
      data: mutation.type === 'delete' ? undefined : 
           mutation.type === 'update' ? mutation.changes : 
           mutation.modified
    }))
    
    // 一次发送整个事务
    ws.send(JSON.stringify({
      type: 'transaction',
      transactionId,
      mutations
    }))
    
    // 等待服务器确认
    return new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        pendingTransactions.delete(transactionId)
        reject(new Error(`事务 ${transactionId} 超时`))
      }, 10000) // 10 秒超时
      
      pendingTransactions.set(transactionId, {
        resolve,
        reject,
        timeout
      })
    })
  }
  
  // 所有变更处理程序使用同一个事务发送器
  const onInsert = async (params: InsertMutationFnParams<TItem>) => {
    await sendTransaction(params)
  }
  
  const onUpdate = async (params: UpdateMutationFnParams<TItem>) => {
    await sendTransaction(params)
  }
  
  const onDelete = async (params: DeleteMutationFnParams<TItem>) => {
    await sendTransaction(params)
  }
  
  return {
    id: config.id,
    schema: config.schema,
    getKey: config.getKey,
    sync: { sync },
    onInsert,
    onUpdate,
    onDelete,
    utils: {
      reconnect: () => {
        if (ws) ws.close()
        connect()
      },
      getConnectionState: () => connectionState
    }
  }
}
```

## 使用示例

```typescript
import { createCollection } from '@tanstack/react-db'
import { webSocketCollectionOptions } from './websocket-collection'

const todos = createCollection(
  webSocketCollectionOptions({
    url: 'ws://localhost:8080/todos',
    getKey: (todo) => todo.id,
    schema: todoSchema
    // 注意：没有 onInsert/onUpdate/onDelete - 由 WebSocket 自动处理
  })
)

// 使用集合
todos.insert({ id: '1', text: '买牛奶', completed: false })

// 访问实用函数
todos.utils.getConnectionState() // 'connected'
todos.utils.reconnect() // 强制重连
```

## 高级：管理乐观状态

同步优先应用程序中的一个关键挑战是知道何时丢弃乐观状态。当用户进行更改时：

1. UI 立即更新（乐观更新）
2. 变更被发送到后端
3. 后端处理并持久化更改
4. 更改同步回客户端
5. 乐观状态应该被丢弃，以支持同步的数据

关键问题是：**你怎么知道步骤 4 何时完成？**

### 策略 1：内置提供者方法（推荐）

许多提供者提供内置方法来等待同步完成：

```typescript
// Firebase
await waitForPendingWrites(firestore)

// 自定义 WebSocket
await websocket.waitForAck(transactionId)
```

### 策略 2：事务 ID 跟踪（ElectricSQL）

ElectricSQL 返回你可以跟踪的事务 ID：

```typescript
// 跟踪已看到的事务 ID
const seenTxids = new Store<Set<number>>(new Set())

// 在同步中跟踪来自传入消息的 txid
if (message.headers.txids) {
  message.headers.txids.forEach(txid => {
    seenTxids.setState(prev => new Set([...prev, txid]))
  })
}

// 变更处理程序返回 txid 并等待它们
const wrappedOnInsert = async (params) => {
  const result = await config.onInsert!(params)
  
  // 等待 txid 出现在同步数据中
  if (result.txid) {
    await awaitTxId(result.txid)
  }
  
  return result
}

// 等待 txid 的实用函数
const awaitTxId = (txId: number): Promise<boolean> => {
  if (seenTxids.state.has(txId)) return Promise.resolve(true)
  
  return new Promise((resolve) => {
    const unsubscribe = seenTxids.subscribe(() => {
      if (seenTxids.state.has(txId)) {
        unsubscribe()
        resolve(true)
      }
    })
  })
}
```

### 策略 3：基于 ID 的跟踪（Trailbase）

Trailbase 跟踪特定记录 ID 何时被同步：

```typescript
// 用时间戳跟踪已同步的 ID
const seenIds = new Store(new Map<string, number>())

// 在同步中，标记 ID 为已见
write({ type: 'insert', value: item })
seenIds.setState(prev => new Map(prev).set(item.id, Date.now()))

// 变更后等待特定 ID
const wrappedOnInsert = async (params) => {
  const ids = await config.recordApi.createBulk(items)
  
  // 等待所有 ID 被同步回来
  await awaitIds(ids)
}

const awaitIds = (ids: string[]): Promise<void> => {
  const allSynced = ids.every(id => seenIds.state.has(id))
  if (allSynced) return Promise.resolve()
  
  return new Promise((resolve) => {
    const unsubscribe = seenIds.subscribe((state) => {
      if (ids.every(id => state.has(id))) {
        unsubscribe()
        resolve()
      }
    })
  })
}
```

### 策略 4：版本/时间戳跟踪

跟踪版本号或时间戳以检测数据何时是最新的：

```typescript
// 跟踪最新同步时间戳
let lastSyncTime = 0

// 在变更中，记录操作发送的时间
const wrappedOnUpdate = async (params) => {
  const mutationTime = Date.now()
  await config.onUpdate(params)
  
  // 等待同步赶上
  await waitForSync(mutationTime)
}

const waitForSync = (afterTime: number): Promise<void> => {
  if (lastSyncTime > afterTime) return Promise.resolve()
  
  return new Promise((resolve) => {
    const check = setInterval(() => {
      if (lastSyncTime > afterTime) {
        clearInterval(check)
        resolve()
      }
    }, 100)
  })
}
```

### 策略 5：全量重新获取（查询集合）

查询集合在变更后简单地重新获取所有数据：

```typescript
const wrappedOnInsert = async (params) => {
  // 执行变更
  await config.onInsert(params)
  
  // 重新获取整个集合
  await refetch()
  
  // 重新获取将用新数据触发同步，
  // 自动丢弃乐观状态
}
```

### 选择策略

- **内置方法**：当你的提供者提供同步完成 API 时最佳
- **事务 ID**：当你的后端提供可靠的事务跟踪时最佳
- **基于 ID**：适用于每个变更返回受影响 ID 的系统
- **全量重新获取**：最简单但效率最低；适用于小型数据集
- **版本/时间戳**：当你的同步包含可靠的排序信息时有效

### 实施技巧

1. **始终在变更处理程序中等待同步** - 确保乐观状态被妥善管理
2. **处理超时** - 不要永远等待同步确认
3. **清理跟踪数据** - 删除旧的 txid/ID 以防止内存泄漏
4. **提供实用函数** - 导出 `awaitTxId` 或 `awaitSync` 等函数供高级用例使用

## 最佳实践

1. **始终调用 markReady()** - 这表示集合已有初始数据并准备好使用
2. **优雅地处理错误** - 即使出错也调用 markReady()，避免阻塞应用程序
3. **清理资源** - 从同步返回清理函数以防止内存泄漏
4. **批处理操作** - 使用 begin/commit 批处理多个更改以获得更好的性能
5. **竞态条件** - 在初始获取之前启动监听器并缓冲事件
6. **类型安全** - 使用 TypeScript 泛型在整个过程中保持类型安全
7. **提供实用函数** - 导出同步引擎特定的实用函数供高级用例使用

## 测试你的集合

用以下方法测试你的集合选项创建器：

1. **单元测试** - 测试同步逻辑、数据转换
2. **集成测试** - 使用真实同步引擎测试
3. **错误场景** - 连接失败、无效数据
4. **性能** - 大型数据集、频繁更新

## 结论

创建集合选项创建器让你可以将任何同步引擎与 TanStack DB 强大的同步优先架构集成。遵循此处显示的模式，你将拥有一个健壮、类型安全的集成，提供出色的开发者体验。
