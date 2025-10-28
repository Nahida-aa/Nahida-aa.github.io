# 项目成员管理系统

## 概述

项目成员管理系统支持**用户**和**组织**两种类型的成员，提供完整的成员增删改查功能。

## 表结构设计

### projectMember 表

```sql
CREATE TABLE project_member (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES project(id) ON DELETE CASCADE,
  
  -- 成员信息：支持用户和组织
  entity_type VARCHAR(20) NOT NULL, -- 'user' | 'organization'
  entity_id VARCHAR(255) NOT NULL,  -- 引用 user.id 或 organization.id
  
  -- 角色权限
  role VARCHAR(20) DEFAULT 'member' NOT NULL,
  permissions JSONB DEFAULT '[]' NOT NULL,
  
  -- 状态
  status VARCHAR(20) DEFAULT 'pending' NOT NULL, -- 'active' | 'inactive' | 'pending'
  
  -- 加入方式
  join_method VARCHAR(20) DEFAULT 'invite' NOT NULL, -- 'invite' | 'manual_review' | 'system'
  inviter_id VARCHAR(255) REFERENCES user(id),
  
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  
  UNIQUE(project_id, entity_type, entity_id)
);
```

## API 接口

### 1. 列出项目成员

```typescript
// 获取所有成员（用户 + 组织）
GET /projects/{slug}/members

// 响应格式
[
  {
    "id": "user123",
    "entityType": "user",
    "name": "张三",
    "username": "zhangsan",
    "image": "https://example.com/avatar.png",
    "role": "owner",
    "permissions": ["read", "write", "manage_members"],
    "status": "active",
    "joinMethod": "system",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": "org456",
    "entityType": "organization",
    "name": "开发团队",
    "username": "dev-team",
    "image": "https://example.com/org-logo.png",
    "role": "maintainer",
    "permissions": ["read", "write", "manage_versions"],
    "status": "active",
    "joinMethod": "invite",
    "createdAt": "2024-01-02T00:00:00.000Z"
  }
]
```

### 2. 添加项目成员

```typescript
POST /projects/{slug}/members

// 请求体
{
  "entityType": "user", // 或 "organization"
  "entityId": "user123",
  "role": "member",
  "permissions": ["read", "write"] // 可选，会根据角色设置默认值
}
```

### 3. 移除项目成员

```typescript
DELETE /projects/{slug}/members/{entityType}/{entityId}
```

### 4. 更新成员角色

```typescript
PATCH /projects/{slug}/members/{entityType}/{entityId}/role

// 请求体
{
  "role": "maintainer",
  "permissions": ["read", "write", "manage_versions"] // 可选
}
```

### 5. 更新成员状态

```typescript
PATCH /projects/{slug}/members/{entityType}/{entityId}/status

// 请求体
{
  "status": "active" // "active" | "inactive" | "pending"
}
```

### 6. 批量添加成员

```typescript
POST /projects/{slug}/members/batch

// 请求体
{
  "members": [
    {
      "entityType": "user",
      "entityId": "user1",
      "role": "member"
    },
    {
      "entityType": "organization",
      "entityId": "org1",
      "role": "contributor"
    }
  ]
}
```

### 7. 获取成员统计

```typescript
GET /projects/{slug}/members/stats

// 响应格式
{
  "total": 5,
  "userCount": 3,
  "organizationCount": 2,
  "activeCount": 4,
  "pendingCount": 1,
  "roleStats": {
    "owner": 1,
    "maintainer": 1,
    "member": 2,
    "contributor": 1
  }
}
```

## 服务函数

### 查询相关

```typescript
// 获取所有成员（用户 + 组织）
listProjectMember(slug: string)

// 获取所有成员（高效版本，使用左连接）
listProjectMemberEfficient(slug: string)

// 获取特定类型的成员
listProjectMembersByType(slug: string, entityType: 'user' | 'organization')

// 检查用户是否为项目成员
isProjectMember(projectId: string, userId: string): Promise<boolean>

// 获取用户角色和权限
getUserProjectRole(projectId: string, userId: string)
```

### 管理相关

```typescript
// 添加成员
addProjectMember(
  projectId: string,
  entityType: 'user' | 'organization',
  entityId: string,
  role?: string,
  permissions?: string[],
  inviterId?: string
)

// 移除成员
removeProjectMember(
  projectId: string,
  entityType: 'user' | 'organization',
  entityId: string
)

// 更新角色
updateProjectMemberRole(
  projectId: string,
  entityType: 'user' | 'organization',
  entityId: string,
  newRole: string,
  newPermissions?: string[]
)

// 更新状态
updateProjectMemberStatus(
  projectId: string,
  entityType: 'user' | 'organization',
  entityId: string,
  status: 'active' | 'inactive' | 'pending'
)

// 批量添加
addMultipleProjectMembers(projectId: string, members: MemberInfo[], inviterId?: string)

// 获取统计
getProjectMemberStats(projectId: string)

// 权限检查
checkMemberPermission(projectId: string, userId: string, permission: string): Promise<boolean>
```

## 角色权限系统

### 预定义角色

```typescript
const ROLE_PERMISSIONS = {
  owner: [
    'read', 'write', 'delete', 
    'manage_members', 'manage_versions', 'manage_settings',
    'transfer_ownership'
  ],
  maintainer: [
    'read', 'write', 'delete',
    'manage_members', 'manage_versions'
  ],
  member: [
    'read', 'write'
  ],
  contributor: [
    'read', 'write'
  ],
  viewer: [
    'read'
  ]
};
```

### 权限检查辅助函数

```typescript
// 检查特定权限
hasPermission(member: { permissions: string[] }, permission: string): boolean

// 检查成员管理权限
canManageMembers(member: { permissions: string[] }): boolean

// 检查版本管理权限
canManageVersions(member: { permissions: string[] }): boolean

// 检查是否为所有者或维护者
isOwnerOrMaintainer(member: { role: string }): boolean
```

## 使用示例

### 获取项目成员列表

```typescript
// 获取所有成员
const allMembers = await listProjectMember("my-awesome-mod");

// 仅获取用户成员
const userMembers = await listProjectMembersByType("my-awesome-mod", "user");

// 仅获取组织成员
const orgMembers = await listProjectMembersByType("my-awesome-mod", "organization");

// 处理不同类型的成员
allMembers.forEach(member => {
  if (member.entityType === 'user') {
    console.log(`用户成员: ${member.name} (@${member.username})`);
  } else {
    console.log(`组织成员: ${member.name} (${member.username})`);
  }
});
```

### 权限检查

```typescript
// 检查用户是否有管理成员权限
const canManage = await checkMemberPermission(projectId, userId, 'manage_members');

if (canManage) {
  // 执行成员管理操作
  await addProjectMember(projectId, 'user', newUserId, 'member');
}
```

### 添加成员

```typescript
// 添加用户成员
await addProjectMember(
  projectId,
  'user',
  'user123',
  'member',
  ['read', 'write'],
  inviterId
);

// 添加组织成员
await addProjectMember(
  projectId,
  'organization',
  'org456',
  'contributor',
  ['read', 'write'],
  inviterId
);
```

## 数据库查询优化

### 高效的成员列表查询

```sql
-- 使用左连接一次性查询所有成员
SELECT 
  pm.entity_id as id,
  pm.entity_type,
  COALESCE(u.name, o.name) as name,
  COALESCE(u.username, o.slug) as username,
  COALESCE(u.image, o.logo) as image,
  pm.role,
  pm.permissions,
  pm.status,
  pm.join_method,
  pm.created_at
FROM project_member pm
LEFT JOIN "user" u ON (pm.entity_id = u.id AND pm.entity_type = 'user')
LEFT JOIN organization o ON (pm.entity_id = o.id AND pm.entity_type = 'organization')
WHERE pm.project_id = $1
ORDER BY pm.created_at;
```

### 索引优化

```sql
-- 复合唯一索引
CREATE UNIQUE INDEX project_member_unique_idx 
ON project_member(project_id, entity_type, entity_id);

-- 查询优化索引
CREATE INDEX project_member_project_idx ON project_member(project_id);
CREATE INDEX project_member_type_idx ON project_member(entity_type, entity_id);
```

## 注意事项

1. **权限验证**：所有修改操作都需要验证当前用户是否有 `manage_members` 权限
2. **所有者保护**：项目所有者不能被移除，角色不能被降级
3. **实体验证**：添加成员时会验证用户或组织是否存在
4. **状态管理**：支持 `active`、`inactive`、`pending` 三种状态
5. **权限继承**：组织成员的权限可以考虑从组织角色继承（待实现）
6. **审计日志**：建议记录所有成员变更操作（待实现）

## 扩展功能

### 待实现功能

1. **权限继承**：组织成员权限从组织内角色继承
2. **邀请系统**：完整的邀请和审批流程
3. **通知系统**：成员变更通知
4. **审计日志**：记录所有成员操作历史
5. **批量权限管理**：批量更新多个成员的权限
