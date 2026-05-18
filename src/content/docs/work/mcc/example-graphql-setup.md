# 在现有项目中集成 GraphQL

## 1. 渐进式迁移方案

### 方式一：GraphQL 作为 REST API 的补充
```typescript
// 保留现有的 REST API 用于简单操作
POST /api/auth/login
GET /api/health

// 新增 GraphQL 端点用于复杂查询
POST /api/graphql
```

### 方式二：GraphQL 包装现有服务
```typescript
// GraphQL resolvers 调用现有的服务层
const resolvers = {
  Query: {
    project: async (_, { id }, { services }) => {
      return await services.projectService.getProject(id);
    }
  }
};
```

## 2. 技术栈兼容性

### 与 Hono 集成
```typescript
import { Hono } from 'hono';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const app = new Hono();

// 现有的 REST 路由
app.route('/api', restRoutes);

// GraphQL 端点
app.use('/graphql', async (c, next) => {
  // Apollo Server 集成
});
```

### 与现有数据库层集成
```typescript
// 使用现有的 Drizzle ORM
const resolvers = {
  Query: {
    projects: async (_, args, { db }) => {
      return await db.select().from(projects);
    }
  }
};
```

## 3. 实际优势对比

### Discord 类功能实现

#### REST 方式：
```typescript
// 获取频道消息需要多个请求
GET /api/channels/123/messages
GET /api/users/456  // 每个消息作者
GET /api/channels/123/members
```

#### GraphQL 方式：
```graphql
query ChannelData($channelId: ID!) {
  channel(id: $channelId) {
    id
    name
    messages(last: 50) {
      id
      content
      author {
        id
        username
        avatar
        isOnline
      }
      reactions {
        emoji
        count
      }
    }
    members {
      user {
        id
        username
        status
      }
      roles {
        name
        color
      }
    }
  }
}
```

### Modrinth 类功能实现

#### 复杂搜索和过滤：
```graphql
query SearchMods($filters: ModSearchInput!) {
  searchMods(filters: $filters) {
    totalCount
    nodes {
      id
      name
      description
      author {
        username
      }
      categories {
        name
        icon
      }
      stats {
        downloads
        followers
      }
      latestVersion {
        name
        gameVersions
        loaders
      }
    }
  }
}
```

## 4. 性能考虑

### 优势：
- **数据获取优化**：避免 over-fetching 和 under-fetching
- **缓存友好**：Apollo Client 提供智能缓存
- **实时更新**：Subscriptions 比 WebSocket 更易管理

### 注意事项：
- **N+1 查询问题**：需要使用 DataLoader
- **查询复杂度**：需要限制查询深度
- **缓存策略**：需要合理设计缓存键

## 5. 开发体验提升

### 类型安全：
```typescript
// 自动生成的类型
interface GetProjectQuery {
  project: {
    id: string;
    name: string;
    author: {
      username: string;
    };
  };
}
```

### 开发工具：
- Apollo Studio：查询测试和性能监控
- GraphQL Codegen：自动生成类型定义
- VSCode 插件：语法高亮和自动补全

## 6. 建议的迁移路径

1. **第一阶段**：为新功能使用 GraphQL
2. **第二阶段**：将复杂查询迁移到 GraphQL
3. **第三阶段**：逐步替换简单的 REST 端点
4. **维护期**：保留必要的 REST 端点（如文件上传、健康检查）

## 7. 实际代码示例

### 集成到现有 Hono 应用：
```typescript
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

// 在 Hono 中使用
app.post('/api/graphql', async (c) => {
  return handler(c.req);
});
```

这种渐进式的方法可以让你在不破坏现有功能的前提下，逐步享受 GraphQL 的优势。
