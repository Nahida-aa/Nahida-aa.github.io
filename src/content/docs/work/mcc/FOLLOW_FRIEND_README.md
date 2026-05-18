# 关注功能和好友功能实现（增强版）

本项目实现了完整的关注功能和好友功能，支持通知系统、好友请求流程，以及互相关注自动成为好友的特性。

## 新增功能 ✨

### 通知系统
- ✅ 关注通知：A 关注 B 时，B 会收到通知
- ✅ 好友请求通知：发送好友请求时，对方会收到通知
- ✅ 好友请求接受/拒绝通知：请求被处理后，发送者会收到通知
- ✅ 通知管理：标记已读、删除、获取未读数量

### 好友请求流程
- ✅ 发送好友请求（状态：pending）
- ✅ 接受好友请求（状态：accepted，创建双向好友关系）
- ✅ 拒绝好友请求（状态：rejected）
- ✅ 查看收到的好友请求
- ✅ 查看发送的好友请求

## 功能特性

### 关注功能
- ✅ 用户可以关注其他用户（单向关系）
- ✅ 用户可以取消关注
- ✅ 获取关注列表（我关注的用户）
- ✅ 获取粉丝列表（关注我的用户）
- ✅ 防止重复关注
- ✅ 防止自己关注自己
- ✅ **关注时自动发送通知给被关注者**

### 好友功能
- ✅ 发送好友请求（替代直接添加好友）
- ✅ 接受/拒绝好友请求
- ✅ 删除好友
- ✅ 获取好友列表
- ✅ 获取收到的好友请求列表
- ✅ 获取发送的好友请求列表
- ✅ 好友关系是双向的
- ✅ 防止重复发送好友请求
- ✅ 防止自己添加自己为好友
- ✅ **好友请求相关操作都会发送通知**

### 自动成为好友
- ✅ 当两个用户互相关注时，自动成为好友（跳过请求流程）
- ✅ 取消关注时，如果是因为互相关注而自动成为的好友，会自动删除好友关系
- ✅ 手动添加的好友关系不会因为取消关注而删除
- ✅ 在好友列表中显示成为好友的原因（互相关注 or 手动请求）

### 通知系统
- ✅ 多种通知类型：关注、好友请求、好友接受、好友拒绝、系统通知
- ✅ 通知管理：查看、标记已读、删除
- ✅ 未读通知数量统计
- ✅ 关联用户和相关记录ID

## 数据库设计

### 关注表 (follow)
```sql
CREATE TABLE "follow" (
    "id" text PRIMARY KEY NOT NULL,
    "follower_id" text NOT NULL,      -- 关注者ID
    "following_id" text NOT NULL,     -- 被关注者ID
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);
```

### 好友表 (friend) - 更新
```sql
CREATE TABLE "friend" (
    "id" text PRIMARY KEY NOT NULL,
    "user_id" text NOT NULL,          -- 用户ID
    "friend_id" text NOT NULL,        -- 好友ID
    "status" text DEFAULT 'pending' NOT NULL,  -- pending, accepted, rejected, blocked
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "reason" text DEFAULT 'manual_request' NOT NULL,  -- mutual_follow, manual_request
    "requester_id" text NOT NULL      -- 请求发起者ID
);
```

### 通知表 (notification) - 新增
```sql
CREATE TABLE "notification" (
    "id" text PRIMARY KEY NOT NULL,
    "user_id" text NOT NULL,          -- 接收通知的用户ID
    "type" text NOT NULL,             -- follow, friend_request, friend_accept, friend_reject, system
    "title" text NOT NULL,            -- 通知标题
    "content" text NOT NULL,          -- 通知内容
    "related_user_id" text,           -- 相关用户ID
    "related_id" text,                -- 相关记录ID
    "is_read" boolean DEFAULT false,   -- 是否已读
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);
```

## API 端点

### 关注相关
- `POST /api/follow` - 关注用户（**会发送通知**）
- `POST /api/unfollow` - 取消关注
- `GET /api/following` - 获取关注列表
- `GET /api/followers` - 获取粉丝列表

### 好友相关（更新）
- `POST /api/friend/request` - **发送好友请求**（会发送通知）
- `POST /api/friend/accept/{requestId}` - **接受好友请求**（会发送通知）
- `POST /api/friend/reject/{requestId}` - **拒绝好友请求**（会发送通知）
- `POST /api/friend/remove` - 删除好友
- `GET /api/friends` - 获取好友列表
- `GET /api/friend-requests/received` - **获取收到的好友请求**
- `GET /api/friend-requests/sent` - **获取发送的好友请求**

### 通知相关（新增）
- `GET /api/notifications` - 获取通知列表
- `GET /api/notifications/unread-count` - 获取未读通知数量
- `PATCH /api/notifications/{id}/read` - 标记通知为已读
- `PATCH /api/notifications/read-all` - 标记所有通知为已读
- `DELETE /api/notifications/{id}` - 删除通知

### 关系状态
- `GET /api/relationship/{targetUserId}` - 获取与特定用户的关系状态

## 文件结构

```
src/
├── db/schema/
│   ├── auth-schema.ts           # 数据库表结构定义（包含通知表）
│   └── index.ts                 # 导出所有表结构
├── lib/utils/
│   ├── follow-friend.ts         # 关注和好友功能的业务逻辑
│   └── notification.ts          # 通知系统业务逻辑（新增）
├── server/apps/
│   ├── follow-friend.ts         # 关注和好友API路由
│   └── notification.ts          # 通知API路由（新增）
├── components/
│   ├── user/
│   │   ├── UserProfile.tsx      # 用户资料卡片组件
│   │   ├── UserRelations.tsx    # 社交关系管理组件
│   │   └── NotificationCenter.tsx    # 通知中心组件（待创建）
│   └── demo/
│       └── SocialDemo.tsx       # 功能演示页面
└── migrations/
    └── 001_create_follow_friend_tables.sql  # 数据库迁移文件（包含通知表）
```

## 业务流程

### 关注流程（更新）
1. 用户点击关注按钮
2. 检查是否已经关注
3. 创建关注记录
4. **发送关注通知给被关注者**
5. 检查是否互相关注
6. 如果互相关注，自动创建好友关系
7. 返回结果和好友状态

### 好友请求流程（新增）
1. **发送好友请求**：
   - 检查是否已有关系
   - 创建待处理的好友请求记录
   - 发送好友请求通知给目标用户

2. **处理好友请求**：
   - **接受**：更新状态为accepted，创建反向关系，发送接受通知
   - **拒绝**：更新状态为rejected，发送拒绝通知

3. **查看请求**：
   - 收到的请求：待处理的请求列表
   - 发送的请求：已发送的请求状态

### 通知流程（新增）
1. **生成通知**：在关注、好友请求等操作时自动创建通知
2. **推送通知**：实时或定期推送给用户
3. **管理通知**：用户可以查看、标记已读、删除通知

## 使用示例

### 发送好友请求
```tsx
const sendFriendRequest = async (targetUserId: string) => {
  const response = await fetch('/api/friend/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ friendId: targetUserId })
  });
  return response.json();
};
```

### 处理好友请求
```tsx
const acceptFriendRequest = async (requestId: string) => {
  const response = await fetch(`/api/friend/accept/${requestId}`, {
    method: 'POST',
  });
  return response.json();
};

const rejectFriendRequest = async (requestId: string) => {
  const response = await fetch(`/api/friend/reject/${requestId}`, {
    method: 'POST',
  });
  return response.json();
};
```

### 获取通知
```tsx
const getNotifications = async () => {
  const response = await fetch('/api/notifications');
  return response.json();
};

const getUnreadCount = async () => {
  const response = await fetch('/api/notifications/unread-count');
  return response.json();
};
```

## 主要改进

### 1. 通知系统
- **解决了关注无通知的问题**：用户被关注时会收到通知
- **完整的通知管理**：支持多种通知类型和状态管理
- **实时反馈**：所有社交操作都有相应的通知

### 2. 好友请求流程
- **更符合实际应用**：发送请求 → 等待处理 → 接受/拒绝
- **防止骚扰**：需要对方同意才能成为好友
- **状态追踪**：可以查看请求的处理状态

### 3. 数据库设计优化
- **增加状态字段**：支持pending、accepted、rejected等状态
- **增加请求者字段**：明确谁发起的好友请求
- **通知表设计**：支持多种通知类型和关联关系

## 安全考虑

1. **防止垃圾请求**：检查重复请求和无效状态
2. **权限验证**：确保只能处理发给自己的请求
3. **通知权限**：只能操作自己的通知
4. **级联删除**：用户删除时自动清理相关数据

## 扩展功能建议

基于现有结构可以扩展的功能：
- **实时通知推送**：WebSocket 或 Server-Sent Events
- **通知设置**：用户可以选择接收哪些类型的通知
- **批量操作**：批量接受/拒绝好友请求
- **黑名单功能**：阻止特定用户发送请求
- **好友分组**：将好友分类管理
- **推荐系统**：基于共同好友推荐新朋友

这个增强版实现解决了原版的问题，提供了更完整、更符合实际应用需求的社交功能。
