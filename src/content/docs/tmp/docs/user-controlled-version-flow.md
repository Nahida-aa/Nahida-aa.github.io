# 版本状态流程优化：用户控制审核时机

## 概述

简化项目版本创建和审核流程，移除文件上传后的自动审核提交，让用户完全控制审核时机。移除不必要的中间API，采用更简洁的流程设计。

## 优化要点

### 1. 状态流程简化

**旧流程（自动提交）**：
```
创建版本(uploading) -> 文件上传完成(自动提交审核 processing) -> 审核结果(approved/rejected)
```

**新流程（用户控制）**：
```
创建版本(uploading) -> 文件上传完成(仍为uploading) -> 用户主动提交审核(processing) -> 审核结果(approved/rejected)
```

### 2. API 设计简化

#### 移除的API
- ❌ `POST /project/file/upload-complete` - 文件上传确认API（不再需要）
- ❌ `POST /project/version/resubmit` - 重新提交审核API（合并到统一提交API）

#### 保留的核心API
- ✅ `POST /project/version/create` - 创建版本并获取上传链接
- ✅ `DELETE /project/version/{id}/cancel` - 取消版本（删除失败的版本）
- ✅ `POST /project/version/submit` - 提交版本审核（统一的提交API）

### 3. 客户端交互模式

#### 文件上传成功时
```javascript
// 所有文件上传成功后，用户可以选择：
// 1. 继续上传更多文件
// 2. 主动调用提交审核API
await fetch('/api/project/version/submit', {
  method: 'POST',
  body: JSON.stringify({ version_id })
});
```

#### 文件上传失败时
```javascript
// 如果上传过程中遇到问题，用户可以选择：
// 1. 重试上传
// 2. 取消整个版本
await fetch('/api/project/version/{version_id}/cancel', {
  method: 'DELETE'
});
```

### 4. 数据库 Schema 

#### projectVersion 表
- `status` 字段默认值：`uploading`
- 状态枚举：`uploading`, `processing`, `rejected`, `approved`, `published`, `archived`
- 移除 `draft` 状态

### 5. 业务逻辑优化

#### 5.1 用户完全控制审核时机
- **触发条件**：用户主动调用提交审核API
- **状态检查**：API验证所有文件上传完成
- **用户体验**：用户可以在合适的时机提交审核

#### 5.2 简化的状态管理
- **创建阶段**：版本始终从 `uploading` 开始
- **上传阶段**：版本状态保持 `uploading`，文件状态独立管理
- **审核阶段**：用户主动调用API后进入 `processing` 状态

#### 5.3 错误处理
- **事务保护**：版本创建失败时自动回滚
- **手动清理**：用户可通过取消API清理失败的版本
- **权限检查**：确保操作者有相应权限

## API 流程变更

### 1. 创建版本 API (`POST /project/version/create`)
- **行为**：不变，创建版本记录并返回预签名URL
- **初始状态**：`uploading`
- **事务保护**：失败时自动回滚

### 2. 提交审核 API (`POST /project/version/submit`)
- **新行为**：统一处理首次提交和重新提交
- **状态限制**：允许 `uploading` 和 `rejected` 状态提交
- **验证逻辑**：严格检查所有文件上传完成

### 3. 取消版本 API (`DELETE /project/version/{id}/cancel`)
- **行为**：不变，删除版本及相关文件记录
- **状态限制**：只能取消 `uploading` 状态的版本

## 数据迁移

### 迁移脚本：`migrations/simplify-version-status-flow.sql`

1. **状态默认值**：确保默认状态为 `uploading`
2. **现有数据清理**：将不合适的状态回退到 `uploading`
3. **注释更新**：更新状态字段注释，说明新的状态流转

### 迁移安全性
- **时间窗口限制**：只回退最近创建的 `processing` 状态版本
- **保护正在审核的版本**：避免影响已经在审核中的版本
- **向后兼容**：保持其他状态（approved、published等）不变

## 优势分析

### 1. 用户体验改善
- **完全控制**：用户决定何时提交审核
- **操作简化**：减少不必要的API调用
- **流程清晰**：上传和审核分离，逻辑更直观

### 2. 系统设计简化
- **API数量减少**：移除冗余的中间API
- **状态管理简化**：减少自动状态转换
- **维护成本降低**：更少的代码和逻辑分支

### 3. 错误处理优化
- **失败恢复简单**：用户可以轻松取消失败的版本
- **重试机制友好**：上传失败不影响版本状态
- **调试更容易**：状态变化更可预测

## 测试建议

1. **基本流程测试**：创建版本 -> 文件上传 -> 主动提交审核
2. **失败场景测试**：上传失败后取消版本
3. **重新提交测试**：被拒绝版本的重新提交
4. **权限测试**：不同用户角色的操作权限
5. **数据迁移测试**：验证现有数据的迁移效果

## 实施建议

1. **前端适配**：
   - 移除自动提交审核的逻辑
   - 添加手动"提交审核"按钮
   - 优化上传失败时的用户引导

2. **后端部署**：
   - 运行数据库迁移脚本
   - 移除废弃的API端点
   - 更新API文档

3. **监控和观察**：
   - 监控新流程的用户使用情况
   - 收集用户反馈
   - 观察版本提交的时机分布
