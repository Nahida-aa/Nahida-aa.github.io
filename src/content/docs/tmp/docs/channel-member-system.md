---
title: 频道成员系统使用指南
---
## 🎯 系统概述

这个频道成员系统采用Discord风格的设计，实现了：

1. **社区（Community）**：对应Discord服务器，与项目/组织1对1关联
2. **权限系统**：使用64位掩码，支持角色继承和频道覆写
3. **成员管理**：统一的成员列表，支持在线状态、角色管理等

## 📋 核心功能

### 1. 获取频道成员列表

```typescript
// 基础用法
const members = await ChannelMemberAPI.getChannelMembers('channel-123');

// 高级选项
const members = await ChannelMemberAPI.getChannelMembers('channel-123', {
  includeOffline: true,  // 包含离线成员
  limit: 50,            // 限制数量
  search: 'username'    // 搜索特定用户
});
```

### 2. React Hook使用

```typescript
// 获取频道成员
function MyComponent({ channelId }) {
  const { members, total, isLoading, refresh } = useChannelMembers(channelId, {
    includeOffline: true,
    refreshInterval: 30000
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h3>成员列表 ({total})</h3>
      {members.map(member => (
        <div key={member.id}>
          {member.nickname || member.displayName}
          {member.isOnline && '🟢'}
        </div>
      ))}
      <button onClick={refresh}>刷新</button>
    </div>
  );
}

// 获取在线成员
function OnlineMembers({ channelId }) {
  const { onlineMembers, onlineCount } = useOnlineMembers(channelId);
  
  return (
    <div>
      <h3>在线成员 ({onlineCount})</h3>
      {onlineMembers.map(member => (
        <div key={member.id}>
          {member.displayName} - {member.lastActiveAt}
        </div>
      ))}
    </div>
  );
}

// 成员统计
function ChannelStats({ channelId }) {
  const { stats } = useChannelMemberStats(channelId);
  
  if (!stats) return null;
  
  return (
    <div>
      <p>总成员: {stats.totalMembers}</p>
      <p>在线: {stats.onlineMembers}</p>
      <p>活跃: {stats.membersByStatus.active}</p>
    </div>
  );
}
```

### 3. 成员搜索

```typescript
function MemberSearch({ channelId }) {
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    isSearching 
  } = useChannelMemberSearch(channelId);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="搜索成员..."
      />
      
      {isSearching && <div>搜索中...</div>}
      
      <div>
        {searchResults.map(member => (
          <div key={member.id}>
            {member.displayName} - {member.roles.join(', ')}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🔐 权限系统

### 权限检查示例

```typescript
import { Permissions, PermissionUtils } from '@/lib/types/permissions';

// 检查用户权限
const canManageMessages = PermissionUtils.hasPermission(
  userPermissions, 
  Permissions.MANAGE_MESSAGES
);

// 检查多个权限
const isModerator = PermissionUtils.hasPermission(
  userPermissions,
  Permissions.MANAGE_MESSAGES | Permissions.KICK_MEMBERS
);

// 获取权限列表
const permissionList = PermissionUtils.getPermissionList(userPermissions);
console.log('用户权限:', permissionList);
```

### 频道权限覆写

```typescript
// 频道可以覆写默认权限
const channelOverwrites = [
  {
    id: 'role-moderator',
    type: 'role',
    allow: Permissions.MANAGE_MESSAGES.toString(),
    deny: '0'
  },
  {
    id: 'user-123',
    type: 'member', 
    allow: '0',
    deny: Permissions.SEND_MESSAGES.toString() // 禁言特定用户
  }
];
```

## 📡 API 接口

### 获取成员列表
```
GET /api/channels/:channelId/members
Query参数:
- includeOffline: boolean - 是否包含离线成员
- limit: number - 限制数量
- search: string - 搜索关键词
```

### 获取成员统计
```
GET /api/channels/:channelId/members/stats
返回:
- totalMembers: 总成员数
- onlineMembers: 在线成员数  
- membersByRole: 按角色统计
- membersByStatus: 按状态统计
```

### 获取在线成员
```
GET /api/channels/:channelId/members/online
返回: 当前在线的成员列表
```

### 获取用户权限
```
GET /api/channels/:channelId/members/:userId/permissions
返回: 用户在该频道的详细权限信息
```

## 🚀 最佳实践

### 1. 性能优化

```typescript
// 使用合适的刷新间隔
const { members } = useChannelMembers(channelId, {
  refreshInterval: 30000 // 30秒刷新成员列表
});

const { onlineMembers } = useOnlineMembers(channelId, 10000); // 10秒刷新在线状态
```

### 2. 错误处理

```typescript
function MemberList({ channelId }) {
  const { members, isError, error } = useChannelMembers(channelId);
  
  if (isError) {
    console.error('获取成员失败:', error);
    return <div>无法加载成员列表</div>;
  }
  
  return <div>{/* 成员列表 */}</div>;
}
```

### 3. 权限控制

```typescript
function MemberActions({ member, currentUserPermissions }) {
  const canKick = PermissionUtils.hasPermission(
    currentUserPermissions,
    Permissions.KICK_MEMBERS
  );
  
  const canBan = PermissionUtils.hasPermission(
    currentUserPermissions,
    Permissions.BAN_MEMBERS
  );
  
  return (
    <div>
      {canKick && <button>踢出成员</button>}
      {canBan && <button>封禁成员</button>}
    </div>
  );
}
```

## 🔧 扩展功能

系统支持进一步扩展：

1. **实时更新**：通过WebSocket实现成员状态实时同步
2. **角色管理**：动态创建和分配角色
3. **活动追踪**：记录成员活动历史
4. **通知系统**：成员加入/离开通知

## 📊 数据流

```
用户请求 → 权限验证 → 查询社区成员 → 应用频道权限覆写 → 过滤有权限的成员 → 返回结果
```

这个系统提供了完整的Discord风格频道成员管理功能，支持复杂的权限控制和实时状态更新。
