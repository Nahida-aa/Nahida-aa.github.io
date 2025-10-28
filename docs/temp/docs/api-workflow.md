# 项目版本文件管理系统 - API 流程说明

## 系统层级结构

```
项目 (Project)
└── 版本 (Version)
    └── 文件 (File)
```

- **一个项目** 可以有多个版本
- **一个版本** 可以有多个文件
- 文件直接属于版本，版本属于项目

## 完整的文件上传流程

### 1. 创建版本并获取上传链接

```http
POST /api/project/version/create
```

**请求体**：
```json
{
  "project_id": "uuid",
  "version_number": "1.0.0",
  "name": "第一个版本",
  "changelog": "初始版本",
  "files": [
    {
      "filename": "my-mod.jar",
      "file_type": "primary",
      "expected_size": 1048576,
      "mime_type": "application/java-archive"
    }
  ]
}
```

**响应**：
```json
{
  "version_id": "version-uuid",
  "upload_urls": [
    {
      "file_id": "file-uuid",
      "filename": "my-mod.jar",
      "upload_url": "https://r2.example.com/presigned-upload-url",
      "storage_key": "projects/project-id/versions/1.0.0/timestamp_my-mod.jar"
    }
  ]
}
```

### 2. 客户端直接上传到 R2

```javascript
// 客户端使用预签名 URL 直接上传
const response = await fetch(upload_url, {
  method: 'PUT',
  body: file,
  headers: {
    'Content-Type': file.type
  }
});

const uploadSuccess = response.ok;
```

### 3. 确认上传状态 (这就是 `/project/file/upload-complete` API 的作用)

```http
POST /api/project/file/upload-complete
```

**请求体**：
```json
{
  "file_id": "file-uuid",
  "file_size": 1048576,
  "upload_success": true,
  "file_hash": {
    "sha256": "file-hash-value"
  }
}
```

**作用**：
- 客户端告诉服务器：我已经成功上传了这个文件
- 服务器更新文件状态：从 `pending` 改为 `completed`
- 如果版本的所有文件都上传完成，版本状态从 `uploading` 改为 `draft`

### 4. 提交版本审核

```http
POST /api/project/version/submit
```

**请求体**：
```json
{
  "version_id": "version-uuid"
}
```

### 5. 获取版本详情（包含文件列表）

```http
GET /api/project/version/{version_id}
```

**响应**：
```json
{
  "project": {
    "id": "project-uuid",
    "name": "我的模组",
    "slug": "my-mod",
    "type": "mod",
    "visibility": "public"
  },
  "version": {
    "id": "version-uuid",
    "version_number": "1.0.0",
    "status": "approved",
    "author": {
      "id": "user-uuid",
      "username": "作者名"
    }
  },
  "files": [
    {
      "id": "file-uuid",
      "filename": "my-mod.jar",
      "upload_status": "completed",
      "file_size": 1048576
    }
  ]
}
```

### 6. 下载文件

```http
POST /api/project/file/download-url
```

**请求体**：
```json
{
  "file_id": "file-uuid"
}
```

**响应**：
```json
{
  "download_url": "https://r2.example.com/download-url",
  "filename": "my-mod.jar",
  "file_size": 1048576,
  "expires_at": "2024-01-01T01:00:00.000Z"
}
```

## 为什么需要 `/project/file/upload-complete` API？

### 问题背景
1. **预签名 URL 机制**：客户端直接上传到 R2，服务器不知道上传结果
2. **状态同步**：服务器需要知道文件是否真的上传成功了
3. **业务逻辑**：只有所有文件上传完成，版本才能进入下一阶段

### 解决方案
- 客户端上传后，调用确认 API 告诉服务器结果
- 服务器根据客户端反馈更新文件和版本状态
- 避免了服务器主动检查 R2 的额外 API 开销

### 替代方案对比

| 方案 | 优点 | 缺点 |
|------|------|------|
| 客户端确认 | 即时反馈，无额外API费用 | 依赖客户端诚实性 |
| 服务器检查 | 100%准确 | 额外的R2 API费用 |
| Webhook通知 | 自动化，准确 | 复杂度高，需要R2支持 |

## 数据流向图

```
用户操作 → 创建版本 → 获取上传链接 → 客户端上传 → 确认上传 → 提交审核
   ↓           ↓            ↓            ↓           ↓          ↓
数据库状态：  draft → uploading → pending files → completed files → processing
```

## 权限控制

- **版本创建**：项目所有者或有写权限的成员
- **文件上传确认**：版本创建者或项目所有者
- **文件下载**：
  - 公开项目：任何人
  - 私有项目：项目成员

这样设计确保了：
1. 清晰的层级关系（项目→版本→文件）
2. 完整的状态管理
3. 费用优化（避免不必要的API调用）
4. 良好的用户体验（实时状态反馈）
