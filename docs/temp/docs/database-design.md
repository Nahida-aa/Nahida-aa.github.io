# 数据库设计文档

## 整体架构概览

本数据库设计支持一个 Minecraft 模组/资源包分享平台，用户和组织可以创建项目、上传文件、管理版本等。

## 核心实体关系

### 1. 用户和组织管理 (auth-schema.ts)

- **user**: 用户基础信息
- **organization**: 组织/团队信息  
- **member**: 组织成员关系
- **session**: 用户会话管理
- **account**: 第三方账号绑定
- **follow/friend**: 社交关系
- **notification**: 通知系统

### 2. 项目管理 (project-schema.ts)

#### 核心项目表
- **project**: 项目主表
  - 支持用户或组织作为所有者 (`owner_type`, `owner_id`)
  - 项目类型: mod, resource_pack, data_pack, world, mod_pack, plugin, server
  - 状态管理: draft, published, archived, private
  - 可见性: public, private, unlisted

#### 版本管理
- **projectVersion**: 项目版本
  - 语义化版本号 (1.0.0, 1.2.3-beta)
  - 版本类型: release, beta, alpha
  - 游戏版本兼容性
  - 模组加载器支持 (forge, fabric, quilt 等)

#### 文件管理
- **projectFile**: 项目文件
  - 文件类型: primary, additional, required, optional
  - 完整性校验 (SHA1, SHA256)
  - 下载统计

#### 依赖管理
- **projectDependency**: 项目依赖
  - 内部依赖 (平台内其他项目)
  - 外部依赖 (第三方链接)
  - 依赖类型: required, optional, incompatible, embedded

#### 协作和社交
- **projectMember**: 项目协作者
  - 角色: owner, maintainer, contributor, viewer
  - 细粒度权限控制
- **projectFollow**: 项目关注
- **projectBookmark**: 项目收藏
- **projectComment**: 项目评论 (支持嵌套回复)
- **projectRating**: 项目评分 (1-5星)

#### 统计分析
- **projectDownload**: 详细下载记录
  - 支持匿名和注册用户
  - 地理位置统计
  - 用户代理分析

### 3. 文件存储 (file-schema.ts)

#### 统一文件管理
- **fileStorage**: 文件存储主表
  - 支持多种存储提供商 (local, S3, Cloudflare 等)
  - 文件去重 (基于哈希)
  - 病毒扫描状态
  - 访问控制

#### 文件使用追踪
- **fileUsage**: 文件使用关联
  - 一个文件可被多个实体使用
  - 支持排序和特色标记

#### 分享和访问
- **fileShare**: 文件分享链接
  - 临时访问令牌
  - 下载次数限制
  - 密码保护
- **fileAccessLog**: 访问日志
  - 详细的访问和下载记录
  - 性能监控

#### 文件分类
- **fileTag**: 文件标签
- **fileTagRelation**: 文件标签关联

## 关键设计决策

### 1. 多态所有者设计
使用 `owner_type` + `owner_id` 的组合来支持用户和组织都可以拥有项目：
```sql
-- 用户拥有的项目
owner_type = 'user', owner_id = user.id

-- 组织拥有的项目  
owner_type = 'organization', owner_id = organization.id
```

### 2. 文件存储分离
将文件存储与业务逻辑分离：
- `fileStorage`: 物理文件存储
- `projectFile`: 项目中的文件引用
- `fileUsage`: 文件使用关系

这样设计的优势：
- 文件去重
- 统一的访问控制
- 跨实体文件共享
- 便于迁移存储提供商

### 3. 版本化设计
项目采用版本化管理：
- 每个版本独立的文件集合
- 支持多个游戏版本
- 灵活的依赖管理

### 4. 权限和可见性
多层次的访问控制：
- 项目级别: public, private, unlisted
- 文件级别: public, private, restricted
- 成员级别: owner, maintainer, contributor, viewer

## 索引策略

### 查询优化
- 项目列表查询: `(type, status, published_at)`
- 所有者查询: `(owner_type, owner_id)`
- 文件访问: `(file_id, created_at)`
- 用户活动: `(user_id, created_at)`

### 唯一约束
- 项目 slug 全局唯一
- 用户在项目中的角色唯一
- 用户对项目的关注/收藏唯一

## 扩展性考虑

### 1. 分区策略
对于高频表可考虑分区：
- `projectDownload`: 按时间分区
- `fileAccessLog`: 按时间分区
- `notification`: 按用户分区

### 2. 缓存策略
- 项目元数据缓存
- 用户权限缓存
- 统计数据缓存

### 3. 归档策略
- 软删除设计
- 历史数据归档
- 日志数据清理

## 安全考虑

### 1. 数据完整性
- 外键约束
- 文件哈希校验
- 版本号验证

### 2. 访问控制
- 基于角色的权限系统
- 文件访问令牌
- 审计日志

### 3. 数据保护
- 敏感信息加密
- 个人数据合规
- 备份和恢复

## API 设计建议

### RESTful 端点结构
```
/api/projects                    # 项目列表
/api/projects/{slug}             # 项目详情
/api/projects/{slug}/versions    # 项目版本列表
/api/projects/{slug}/members     # 项目成员
/api/projects/{slug}/files       # 项目文件
/api/organizations/{slug}/projects # 组织项目
/api/users/{username}/projects   # 用户项目
```

### 查询参数优化
- 分页: `page`, `limit`
- 过滤: `type`, `game_versions`, `loaders`
- 排序: `sort`, `order`
- 搜索: `q`, `tags`

这个设计提供了一个完整、可扩展的项目管理和文件存储系统，支持复杂的协作和权限管理需求。
