# 数据库结构优化和错误处理改进

## 修改内容

### 1. 数据库 Schema 修改

**文件**: `/src/db/schema/project-schema.ts`

```sql
-- 版本状态默认值从 'draft' 改为 'uploading'
status: varchar('status', { length: 20 }).default('uploading').notNull()
```

**状态流转逻辑**:
```
创建版本 → uploading (上传中)
↓ (所有文件上传完成)
draft (草稿，可以提交审核)
↓ (提交审核)
processing (审核中)
↓ (审核结果)
approved/rejected (通过/拒绝)
```

### 2. API 修改

#### A. 版本创建 API (`/project/version/create`)

**之前的问题**:
- 创建时状态为 `draft`
- 创建失败时没有清理机制

**现在的改进**:
```typescript
// 1. 创建时状态为 'uploading'
status: 'uploading', // 创建时即为上传中状态

// 2. 事务保护和错误处理
const result = await db.transaction(async (tx) => {
  try {
    // 创建版本和文件记录
    // 生成预签名URL
    return { version_id, upload_urls };
  } catch (error) {
    // 事务会自动回滚，清理所有已插入的记录
    console.error('创建版本失败:', error);
    throw error;
  }
});
```

#### B. 新增取消版本API (`DELETE /project/version/{version_id}/cancel`)

**作用**: 手动清理创建失败或不需要的版本

```typescript
// 删除版本及相关文件记录
await db.transaction(async (tx) => {
  // 删除文件记录
  await tx.delete(projectFile).where(eq(projectFile.version_id, version_id));
  // 删除版本记录
  await tx.delete(projectVersion).where(eq(projectVersion.id, version_id));
});
```

#### C. 文件上传确认 API (`/project/file/upload-complete`)

**改进**: 当所有文件上传完成时，自动将版本状态从 `uploading` 改为 `draft`

```typescript
// 检查该版本的所有文件是否都已完成上传
const allCompleted = versionFiles.every(f => f.upload_status === 'completed');

// 如果所有文件都上传完成，自动将版本状态从uploading改为draft
if (allCompleted) {
  await db.update(projectVersion)
    .set({ status: 'draft' })
    .where(and(
      eq(projectVersion.id, file.version_id),
      eq(projectVersion.status, 'uploading')
    ));
}
```

#### D. 提交审核 API (`/project/version/submit`)

**改进**: 允许从 `uploading` 和 `draft` 状态提交审核

```typescript
// 验证版本状态
if (!['draft', 'uploading'].includes(version.status)) {
  throw new Error('只有草稿或上传中状态的版本可以提交审核');
}

// 如果版本还是uploading状态，先检查所有文件是否完成
if (version.status === 'uploading') {
  const allCompleted = allFiles.every(f => f.upload_status === 'completed');
  if (!allCompleted) {
    throw new Error('还有文件未完成上传，请先完成所有文件上传');
  }
}
```

## 优势

### 1. 更清晰的状态管理
- 版本创建时就是 `uploading`，明确表示正在上传文件
- 所有文件上传完成后自动变为 `draft`
- 状态流转更加逻辑化

### 2. 完善的错误处理
- 事务保护确保数据一致性
- 创建失败时自动回滚，无需手动清理
- 提供手动取消API处理特殊情况

### 3. 灵活的提交机制
- 允许从多种状态提交审核
- 自动检查文件上传完成度
- 避免状态不一致的问题

## 数据库迁移

运行迁移脚本 `/migrations/update-version-status-default.sql`:

```sql
-- 修改默认值
ALTER TABLE project_version 
ALTER COLUMN status SET DEFAULT 'uploading';

-- 添加状态说明注释
COMMENT ON COLUMN project_version.status IS 'Version status: uploading -> draft -> processing -> approved/rejected';
```

## 使用示例

### 创建和上传流程

```javascript
// 1. 创建版本（状态：uploading）
const createResponse = await fetch('/api/project/version/create', {
  method: 'POST',
  body: JSON.stringify({
    project_id: 'uuid',
    version_number: '1.0.0',
    files: [{ filename: 'mod.jar', expected_size: 1048576 }]
  })
});

const { version_id, upload_urls } = await createResponse.json();

// 2. 上传文件
for (const { file_id, upload_url } of upload_urls) {
  const uploadResult = await fetch(upload_url, { method: 'PUT', body: file });
  
  // 3. 确认上传（文件状态：completed，版本状态可能变为：draft）
  await fetch('/api/project/file/upload-complete', {
    method: 'POST',
    body: JSON.stringify({
      file_id,
      file_size: file.size,
      upload_success: uploadResult.ok
    })
  });
}

// 4. 提交审核（状态：processing）
await fetch('/api/project/version/submit', {
  method: 'POST',
  body: JSON.stringify({ version_id })
});
```

### 错误处理

```javascript
// 如果创建过程中出错，可以取消版本
await fetch(`/api/project/version/${version_id}/cancel`, {
  method: 'DELETE'
});
```

这样的设计确保了数据一致性，提供了完善的错误处理，并且状态流转更加清晰和合理。
