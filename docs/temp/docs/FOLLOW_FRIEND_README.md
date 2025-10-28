# 关注功能和好友功能实现

本项目实现了完整的关注功能和好友功能，支持互相关注自动成为好友的特性。

## 功能特性

### 关注功能
- ✅ 用户可以关注其他用户（单向关系）
- ✅ 用户可以取消关注
- ✅ 获取关注列表（我关注的用户）
- ✅ 获取粉丝列表（关注我的用户）
- ✅ 防止重复关注
- ✅ 防止自己关注自己

### 好友功能
- ✅ 用户可以手动添加好友
- ✅ 用户可以删除好友
- ✅ 获取好友列表
- ✅ 好友关系是双向的
- ✅ 防止重复添加好友
- ✅ 防止自己添加自己为好友

### 自动成为好友
- ✅ 当两个用户互相关注时，自动成为好友
- ✅ 取消关注时，如果是因为互相关注而成为的好友，会自动删除好友关系
- ✅ 手动添加的好友关系不会因为取消关注而删除
- ✅ 在好友列表中显示成为好友的原因（互相关注 or 手动添加）

## 数据库设计

### 关注表 (follow)
```sql
CREATE TABLE "follow" (
    "id" text PRIMARY KEY NOT NULL,
    "follower_id" text NOT NULL,      -- 关注者ID
    "following_id" text NOT NULL,     -- 被关注者ID
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "follow_follower_id_user_id_fk" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE CASCADE,
    CONSTRAINT "follow_following_id_user_id_fk" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE CASCADE
);
```

### 好友表 (friend)
```sql
CREATE TABLE "friend" (
    "id" text PRIMARY KEY NOT NULL,
    "user_id" text NOT NULL,          -- 用户ID
    "friend_id" text NOT NULL,        -- 好友ID
    "status" text DEFAULT 'accepted' NOT NULL,  -- 状态：accepted, pending, blocked
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "reason" text DEFAULT 'manual_request' NOT NULL,  -- 原因：mutual_follow, manual_request
    CONSTRAINT "friend_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE,
    CONSTRAINT "friend_friend_id_user_id_fk" FOREIGN KEY ("friend_id") REFERENCES "user"("id") ON DELETE CASCADE
);
```

### 索引
- 唯一索引防止重复关注/好友关系
- 查询性能优化索引

## API 端点

### 关注相关
- `POST /api/follow` - 关注用户
- `POST /api/unfollow` - 取消关注
- `GET /api/following` - 获取关注列表
- `GET /api/followers` - 获取粉丝列表

### 好友相关
- `POST /api/friend/add` - 添加好友
- `POST /api/friend/remove` - 删除好友
- `GET /api/friends` - 获取好友列表

### 关系状态
- `GET /api/relationship/:targetUserId` - 获取与特定用户的关系状态

## 文件结构

```
src/
├── db/schema/
│   ├── auth-schema.ts           # 数据库表结构定义
│   └── index.ts                 # 导出所有表结构
├── lib/utils/
│   └── follow-friend.ts         # 关注和好友功能的业务逻辑
├── server/apps/
│   └── follow-friend.ts         # API 路由定义
├── components/
│   ├── user/
│   │   ├── UserProfile.tsx      # 用户资料卡片组件
│   │   └── UserRelations.tsx    # 社交关系管理组件
│   └── demo/
│       └── SocialDemo.tsx       # 功能演示页面
└── migrations/
    └── 001_create_follow_friend_tables.sql  # 数据库迁移文件
```

## 使用方法

### 1. 数据库迁移
运行迁移文件创建必要的表：
```bash
# 根据你的数据库工具运行迁移
# 例如使用 Drizzle ORM：
npm run db:migrate
```

### 2. 导入组件
```tsx
import UserProfile from '@/components/user/UserProfile';
import UserRelations from '@/components/user/UserRelations';
```

### 3. 使用 API
```tsx
// 关注用户
const followUser = async (targetUserId: string) => {
  const response = await fetch('/api/follow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetUserId })
  });
  return response.json();
};

// 添加好友
const addFriend = async (friendId: string) => {
  const response = await fetch('/api/friend/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ friendId })
  });
  return response.json();
};
```

## 业务逻辑

### 关注流程
1. 用户点击关注按钮
2. 检查是否已经关注
3. 创建关注记录
4. 检查是否互相关注
5. 如果互相关注，自动创建好友关系
6. 返回结果和好友状态

### 取消关注流程
1. 用户点击取消关注
2. 删除关注记录
3. 检查是否有因为互相关注而成为的好友关系
4. 如果有，删除该好友关系
5. 返回结果

### 好友关系
- 好友关系是双向的，一次添加会创建两条记录
- 记录成为好友的原因（互相关注 or 手动添加）
- 删除好友时会删除双向记录

## 安全考虑

1. **防止重复操作**：数据库唯一索引防止重复关注/好友关系
2. **防止自操作**：API 层检查防止用户关注/添加自己
3. **级联删除**：用户删除时自动清理相关关系
4. **权限验证**：需要实现用户认证中间件（代码中使用占位符）

## 扩展功能

可以基于现有结构扩展的功能：
- 关注请求（需要对方同意）
- 好友请求系统
- 黑名单功能
- 关注/好友数量统计
- 关注/好友推荐
- 隐私设置（私密账户）

## 注意事项

1. **用户认证**：当前代码中使用占位符 `"current-user-id"`，需要集成真实的用户认证系统
2. **性能优化**：对于大量用户，可以考虑缓存和分页
3. **通知系统**：可以集成通知系统，在被关注/添加好友时发送通知
4. **数据一致性**：在高并发场景下需要考虑数据一致性问题

## 测试

建议测试场景：
1. 基本关注/取消关注功能
2. 基本好友添加/删除功能
3. 互相关注自动成为好友
4. 取消关注时好友关系处理
5. 边界情况（重复操作、自操作等）
6. 并发操作处理

这个实现提供了完整的关注和好友功能，支持自动成为好友的特性，代码结构清晰，易于维护和扩展。
