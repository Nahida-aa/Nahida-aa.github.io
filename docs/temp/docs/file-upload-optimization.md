# 文件上传与下载系统 - 费用优化方案

## 系统架构概览

我们的文件上传与下载系统采用了多步流程设计，旨在最大化用户体验和最小化费用开销：

### 1. 数据库 Schema 设计

#### Project Version 状态管理
```sql
status ENUM('draft', 'uploading', 'processing', 'completed', 'rejected')
```

#### Project File 状态管理
```sql
upload_status ENUM('pending', 'uploading', 'completed', 'failed')
upload_success BOOLEAN DEFAULT FALSE  -- 客户端确认字段
```

### 2. API 设计 - 分步流程

#### 步骤 1: 创建版本并获取上传链接
```typescript
POST /api/project/version/create
Response: {
  version_id: string,
  upload_urls: Array<{
    file_id: string,
    upload_url: string,  // R2 预签名上传 URL
    expires_at: string
  }>
}
```

#### 步骤 2: 客户端直接上传到 R2
- 使用预签名 URL 直接上传到 R2
- 无需通过服务器代理，减少带宽成本
- 支持多文件并行上传

#### 步骤 3: 确认上传成功
```typescript
POST /api/project/file/confirm-upload
Body: {
  file_id: string,
  upload_success: boolean
}
```

#### 步骤 4: 提交版本审核
```typescript
POST /api/project/version/{id}/submit
```

### 3. 下载系统 - 按需生成链接

#### 动态生成下载链接
```typescript
POST /api/project/file/download-url
Response: {
  download_url: string,
  filename: string,
  file_size: number,
  expires_at: string
}
```

## 费用优化策略

### 1. 预签名 URL 策略

#### 上传 URL
- **生成时机**: 创建版本时批量生成
- **有效期**: 1小时（足够用户上传）
- **费用**: 仅 API 调用费用，无存储/传输费用

#### 下载 URL
- **生成时机**: 用户请求下载时实时生成
- **有效期**: 1小时
- **费用影响**: 
  - 私有文件：使用预签名 URL（少量 API 费用）
  - 公共文件：使用公共 URL（仅在访问时计费）

### 2. 公共 URL vs 预签名 URL

#### 公共文件 (project.visibility = 'public')
```typescript
// 使用公共 URL，不额外计费（除非被访问）
buildPublicUrl(storage_key)
// 格式: https://pub-{account_id}.r2.dev/{storage_key}
```

#### 私有文件 (project.visibility = 'private')
```typescript
// 使用预签名 URL，安全且费用可控
generatePresignedDownloadUrl(storage_key, 3600)
```

### 3. 延迟公共 URL 构建

**原策略问题**:
```typescript
// ❌ 立即构建公共 URL 可能导致不必要的费用
file.public_url = buildPublicUrl(storage_key);
```

**优化策略**:
```typescript
// ✅ 仅在需要时生成，避免预先计费
const downloadUrl = file.project_visibility === 'private' 
  ? await generatePresignedDownloadUrl(file.storage_key, 3600)
  : buildPublicUrl(file.storage_key);
```

### 4. 确认机制优化

#### 避免额外 S3 API 调用
```typescript
// ❌ 原方案：通过 S3 API 检查文件存在
const fileExists = await checkFileExists(storage_key);

// ✅ 优化方案：客户端预签名 URL 响应确认
const uploadResponse = await fetch(presignedUrl, {
  method: 'PUT',
  body: file
});
const upload_success = uploadResponse.ok;
```

## 费用节省分析

### 1. API 调用费用
- **R2 API 调用**: 每百万次 $4.50
- **预签名 URL 生成**: 仅客户端库操作，无额外 API 费用
- **文件存在检查**: 通过客户端响应避免，节省 HEAD 请求费用

### 2. 数据传输费用
- **上传**: 客户端直传 R2，避免服务器中转
- **下载**: 直接从 R2，避免服务器代理
- **公共文件**: 仅在实际访问时计费，构建 URL 本身不计费

### 3. 存储费用
- **按需存储**: 用户确认上传成功后才标记为已完成
- **失败清理**: 定期清理上传失败的临时文件

## 安全考虑

### 1. 权限控制
```typescript
// 私有项目文件下载权限检查
const isMember = await db.select()
  .from(projectMember)
  .where(and(
    eq(projectMember.project_id, file.project_id),
    eq(projectMember.user_id, session.user.id),
    eq(projectMember.status, 'active')
  ));
```

### 2. 预签名 URL 安全
- **有效期限制**: 1小时过期
- **操作限制**: 上传 URL 仅允许 PUT，下载 URL 仅允许 GET
- **域名绑定**: 可选择绑定特定域名

### 3. 文件验证
- **类型检查**: 基于 MIME 类型和文件扩展名
- **大小限制**: 根据项目类型设置不同限制
- **病毒扫描**: 可集成第三方扫描服务

## 监控与优化

### 1. 费用监控
```typescript
// 记录下载请求（可选）
await recordDownloadAttempt(file_id, ip_address);

// 统计 API 使用情况
await trackAPIUsage(endpoint, user_id, timestamp);
```

### 2. 性能优化
- **CDN 集成**: 公共文件可配置 CDN 加速
- **缓存策略**: 下载链接可设置适当的缓存头
- **批量操作**: 支持批量下载，减少 API 调用次数

### 3. 用户体验优化
- **进度显示**: 大文件上传/下载进度条
- **断点续传**: 大文件支持断点续传
- **错误重试**: 自动重试机制处理网络问题

## 总结

通过以上设计，我们实现了：

1. **费用最优**: 
   - 避免不必要的 API 调用
   - 延迟公共 URL 构建
   - 客户端直传减少带宽费用

2. **安全可控**: 
   - 预签名 URL 限时限权
   - 私有文件权限验证
   - 文件类型和大小验证

3. **用户体验**:
   - 多文件并行上传
   - 实时进度反馈
   - 批量下载支持

4. **可扩展性**:
   - 支持多种项目类型
   - 灵活的权限控制
   - 易于集成 CDN 和其他优化
