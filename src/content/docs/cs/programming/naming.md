---
title: "编程命名规范"
description: "学习如何像程序员一样命名万物"
tags: ["编程", "naming"]
lastUpdated: 2025-02-28
---

## 概述

好的命名能让代码更易读、更易维护。本文介绍编程中常见的命名规范和最佳实践。

## 命名风格

### 常见命名法

| 风格 | 示例 | 适用场景 |
|------|------|----------|
| `camelCase` | `userName`, `getUserInfo` | 变量、函数（JavaScript/Java） |
| `PascalCase` | `UserName`, `UserService` | 类、类型、组件 |
| `snake_case` | `user_name`, `get_user_info` | 变量、函数（Python/Rust） |
| `SCREAMING_SNAKE_CASE` | `MAX_COUNT`, `API_KEY` | 常量 |
| `kebab-case` | `user-name`, `app-header` | CSS 类、文件名、URL |

### 语言约定

| 语言 | 变量/函数 | 类/类型 | 常量 | 私有成员 |
|------|----------|---------|------|----------|
| JavaScript | `camelCase` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `_private` |
| TypeScript | `camelCase` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `private` 关键字 |
| Java | `camelCase` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `private` 关键字 |
| Python | `snake_case` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `_private` |
| Go | `PascalCase` (公开) / `camelCase` (私有) | `PascalCase` | `PascalCase` | 小写开头 |
| Rust | `snake_case` | `PascalCase` | `SCREAMING_SNAKE_CASE` | - |
| C# | `PascalCase` | `PascalCase` | `PascalCase` | `_camelCase` |

## 变量命名

### 基本原则

1. **要有意义**：变量名应表达其用途
2. **使用名词**：变量通常是事物，使用名词
3. **避免缩写**：除非是众所周知的缩写

```javascript
// ❌ 不好的命名
let a = 10;
let d = 30;
let usrNm = "张三";

// ✅ 好的命名
let age = 10;
let daysUntilExpiry = 30;
let userName = "张三";
```

### 布尔变量

布尔变量应该用肯定的表述，使用 `is`, `has`, `can`, `should` 等前缀：

```javascript
// ❌ 不好的命名
let notActive = false;
let error = false;

// ✅ 好的命名
let isActive = true;
let hasError = false;
let canEdit = true;
let shouldUpdate = false;
```

### 数字变量

对于表示数量的变量，加上单位：

```javascript
// ❌ 可能有歧义
let delay = 1000;  // 毫秒还是秒？

// ✅ 清晰明确
let delayMs = 1000;     // 毫秒
let delaySeconds = 1;    // 秒
```

### 数组/列表

使用复数形式：

```javascript
// ❌ 单数形式
let user = ["张三", "李四"];

// ✅ 复数形式
let users = ["张三", "李四"];
let items = [];
let products = [];
```

### 映射/字典

使用描述键值关系的名称：

```javascript
// ❌ 不够明确
let data = {
    "1001": { name: "张三" },
    "1002": { name: "李四" }
};

// ✅ 明确描述
let userIdToUser = {
    "1001": { name: "张三" },
    "1002": { name: "李四" }
};

// 或者简单点
let userMap = {};
let userById = {};
```

## 函数命名

### 基本原则

1. **使用动词+名词**：函数是动作，通常以动词开头
2. **描述做什么**：函数名应该清晰地表达其功能
3. **保持一致**：相同类型的函数使用相同的前缀

### 常用动词前缀

| 前缀 | 含义 | 示例 |
|------|------|------|
| `get` | 获取值 | `getUserById`, `getTotalPrice` |
| `set` | 设置值 | `setUserName`, `setActive` |
| `is` | 返回布尔值 | `isValid`, `isLoggedIn` |
| `has` | 是否有 | `hasPermission`, `hasError` |
| `can` | 是否能 | `canEdit`, `canDelete` |
| `load` | 加载数据 | `loadUserList`, `loadConfig` |
| `fetch` | 远程获取 | `fetchUserData`, `fetchApi` |
| `save` | 保存 | `saveUser`, `saveConfig` |
| `update` | 更新 | `updateUser`, `updateSettings` |
| `delete` / `remove` | 删除 | `deleteUser`, `removeItem` |
| `create` / `add` | 创建/添加 | `createUser`, `addItem` |
| `init` | 初始化 | `initApp`, `initConfig` |
| `reset` | 重置 | `resetForm`, `resetState` |
| `toggle` | 切换 | `toggleMenu`, `toggleDarkMode` |
| `handle` | 处理事件 | `handleClick`, `handleSubmit` |
| `on` | 事件回调 | `onClick`, `onSubmit` |
| `calculate` | 计算 | `calculateTotal`, `calculateTax` |
| `validate` | 验证 | `validateEmail`, `validateForm` |
| `format` | 格式化 | `formatDate`, `formatMoney` |
| `parse` | 解析 | `parseJson`, `parseUrl` |
| `convert` | 转换 | `convertToJson`, `convertToArray` |
| `filter` | 过滤 | `filterUsers`, `filterActive` |
| `sort` | 排序 | `sortUsers`, `sortByDate` |
| `find` / `search` | 查找 | `findUser`, `searchProducts` |

### 示例

```javascript
// ❌ 不好的命名
function process(data) { }      // 太模糊
function doStuff() { }           // 太宽泛
function u() { }                  // 太短

// ✅ 好的命名
function getUserById(userId) { }
function validateEmail(email) { }
function calculateTotalPrice(items) { }
```

## 类命名

### 基本原则

1. **使用名词**：类是事物的模板，使用名词
2. **使用 `PascalCase`**：几乎所有语言的约定
3. **具体但不过于具体**：足够描述但不过度

```typescript
// ❌ 不好的命名
class user_data { }           // 风格错误
class Manager { }             // 太模糊
class UserInformationObject { }  // 太长

// ✅ 好的命名
class User { }
class UserManager { }
class UserService { }
class OrderController { }
```

### 常用后缀

| 后缀 | 含义 | 示例 |
|------|------|------|
| `Manager` | 管理器 | `UserManager`, `ConfigManager` |
| `Service` | 服务 | `AuthService`, `UserService` |
| `Controller` | 控制器 | `UserController`, `OrderController` |
| `Repository` | 仓储 | `UserRepository`, `OrderRepository` |
| `Factory` | 工厂 | `UserFactory`, `ConnectionFactory` |
| `Builder` | 构建器 | `UserBuilder`, `QueryBuilder` |
| `Provider` | 提供者 | `ConfigProvider`, `AuthProvider` |
| `Handler` | 处理器 | `ErrorHandler`, `EventHandler` |
| `Interceptor` | 拦截器 | `AuthInterceptor`, `LogInterceptor` |
| `Helper` / `Utils` | 工具类 | `DateHelper`, `StringUtils` |
| `Config` / `Options` | 配置 | `AppConfig`, `ConnectionOptions` |
| `Exception` / `Error` | 异常 | `UserNotFoundException`, `ValidationError` |
| `Event` | 事件 | `UserCreatedEvent`, `OrderUpdatedEvent` |
| `Listener` | 监听器 | `UserCreatedListener`, `EventListener` |
| `Request` / `Response` | 请求/响应 | `LoginRequest`, `UserResponse` |
| `Dto` | 数据传输对象 | `CreateUserDto`, `UpdateOrderDto` |
| `ViewModel` / `Vm` | 视图模型 | `UserListViewModel`, `ProductVm` |

## 接口命名

TypeScript/Java/C# 等语言有接口的概念：

### 约定

- TypeScript：通常使用 `PascalCase`，不加特殊前缀
- Java/C#：通常以 `I` 为前缀，如 `IUserService`

```typescript
// TypeScript 风格
interface User {
    id: string;
    name: string;
}

interface UserService {
    getById(id: string): User;
}

// Java/C# 风格
interface IUserService {
    User getById(String id);
}
```

## 常量命名

### 基本原则

1. **使用 `SCREAMING_SNAKE_CASE`**：大多数语言的约定
2. **放在一起**：相关常量放在一起定义

```javascript
// ❌ 不好的命名
const maxCount = 100;
const ApiKey = "xxx";

// ✅ 好的命名
const MAX_COUNT = 100;
const API_KEY = "xxx";
const DEFAULT_TIMEOUT_MS = 5000;
```

### 枚举命名

枚举使用 `PascalCase`，枚举值使用 `SCREAMING_SNAKE_CASE`：

```typescript
enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    VIEWER = "viewer"
}

enum OrderStatus {
    PENDING = 1,
    PAID = 2,
    SHIPPED = 3,
    DELIVERED = 4,
    CANCELLED = 5
}
```

## 文件命名

### 基本原则

1. **使用小写**：避免大小写问题
2. **使用 `-` 或 `_`**：分隔单词
3. **与主要内容一致**：文件名反映文件内容

### 常见约定

| 类型 | 风格 | 示例 |
|------|------|------|
| 组件 | `PascalCase.tsx` | `UserProfile.tsx`, `AppHeader.tsx` |
| 工具函数 | `kebab-case.ts` | `date-utils.ts`, `string-helpers.ts` |
| 类/服务 | `kebab-case.ts` 或 `PascalCase.ts` | `user-service.ts`, `UserService.ts` |
| 样式文件 | `kebab-case.css` | `user-profile.css`, `app-header.scss` |
| 测试文件 | `*.test.ts` / `*.spec.ts` | `user-service.test.ts` |
| 配置文件 | `kebab-case` 或点分隔 | `webpack.config.js`, `eslint.config.json` |

### 示例

```
# React/Vue 项目
components/
  UserProfile.tsx      # 组件用 PascalCase
  UserProfile.test.tsx # 测试文件
  user-profile.css     # 样式文件

services/
  user-service.ts      # 服务用 kebab-case
  user-service.test.ts

utils/
  date-helpers.ts      # 工具函数
  string-utils.ts
```

## CSS 类命名

### BEM 规范

BEM (Block-Element-Modifier) 是最流行的 CSS 命名规范：

```css
/* Block: 独立的组件 */
.card { }

/* Element: 组件的一部分 */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier: 变体或状态 */
.card--featured { }
.card__button--primary { }
```

### 实用类命名

使用 Tailwind CSS 风格的实用类：

```css
.text-center { }
.bg-blue-500 { }
.p-4 { }
.mt-2 { }
```

## 数据库命名

### 表名

- 使用小写和下划线
- 使用复数形式

```sql
-- ✅ 好的命名
users
user_profiles
orders
order_items

-- ❌ 不好的命名
User             -- 大小写问题
userProfile      -- camelCase
order_item       -- 单数
```

### 列名

- 使用小写和下划线
- 外键使用 `表名_id` 格式

```sql
CREATE TABLE users (
    id              BIGINT PRIMARY KEY,
    user_name       VARCHAR(255),
    email           VARCHAR(255) UNIQUE,
    created_at      TIMESTAMP,
    updated_at      TIMESTAMP
);

CREATE TABLE user_profiles (
    id              BIGINT PRIMARY KEY,
    user_id         BIGINT REFERENCES users(id),  -- 外键
    avatar_url      VARCHAR(255),
    bio             TEXT
);
```

### 索引和约束

```sql
-- 主键: pk_表名
PRIMARY KEY pk_users (id)

-- 外键: fk_子表_父表
FOREIGN KEY fk_user_profiles_users (user_id) REFERENCES users(id)

-- 唯一索引: uk_表名_列名
UNIQUE KEY uk_users_email (email)

-- 普通索引: idx_表名_列名
INDEX idx_users_created_at (created_at)
```

## API 命名

### RESTful API

```
# 资源使用复数
GET    /api/users              # 获取用户列表
GET    /api/users/:id          # 获取单个用户
POST   /api/users              # 创建用户
PUT    /api/users/:id          # 更新用户
DELETE /api/users/:id          # 删除用户

# 子资源
GET    /api/users/:id/orders   # 获取用户的订单

# 操作（非资源）
POST   /api/auth/login         # 登录
POST   /api/auth/logout        # 登出
POST   /api/users/:id/activate # 激活用户
```

### URL 命名

- 使用小写字母
- 使用 `-` 分隔单词
- 不使用 `_` 或 `camelCase`

```
✅ /api/user-profiles
✅ /api/order-items
❌ /api/userProfiles
❌ /api/user_profiles
```

## 版本控制

### Git 分支

```
main/master      # 主分支
develop          # 开发分支
feature/xxx      # 功能分支
bugfix/xxx       # 修复分支
hotfix/xxx       # 热修复分支
release/xxx      # 发布分支
```

### Git 提交信息

使用约定式提交 (Conventional Commits)：

```
<type>(<scope>): <description>

<body>

<footer>
```

常用类型：

| 类型 | 描述 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 bug |
| `docs` | 文档更新 |
| `style` | 代码格式 |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试 |
| `chore` | 构建/工具 |

示例：

```
feat(auth): 添加登录功能
fix(user): 修复用户查询的性能问题
docs: 更新 README
style: 格式化代码
refactor: 重构用户服务
```

## 避免的命名

### 不要使用的词

- `data`：太模糊，几乎所有东西都是数据
- `info`：同上，不够具体
- `manager`：除非确实是管理器
- `processor`：同上
- `util` / `utils` / `helper`：尽量避免，工具类会越来越大
- `common` / `shared`：同上，容易变成垃圾场

### 不要使用缩写

除非是众所周知的：

```
✅ id, url, http, api, db, io, config, admin
❌ usr, nm, dt, calc, tmp, val
```

### 不要使用匈牙利命名法

这是一种过时的命名方式：

```
❌ strUserName, intAge, bIsActive
✅ userName, age, isActive
```

### 不要在名称中包含类型

```
❌ userList, userArray, userMap
✅ users, userById
```

## 命名的艺术

### 平衡长度和清晰度

```javascript
// 太长也不好
let numberOfActiveUsersInCurrentMonth = 0;

// 可以简写
let activeUsersThisMonth = 0;

// 太短会模糊
let cnt = 0;
```

### 使用领域术语

如果你在做电商系统，使用 `SKU`、`SPU`、`订单`、`商品` 等术语，而不是自己发明。

### 保持一致性

```javascript
// 不要混用
getUserById()
fetchUser()
findUser()

// 保持一致
getUserById()
getUserByEmail()
getUserByPhone()
```

### 函数应该做一件事

如果函数名里有 `and`，说明它做了太多事情：

```javascript
// ❌ 做了两件事
function updateUserAndSendEmail(userId, data) { }

// ✅ 分开
function updateUser(userId, data) { }
function sendWelcomeEmail(user) { }
```

## 工具推荐

- **ESLint**: JavaScript/TypeScript 代码规范检查
- **Prettier**: 代码格式化
- **Stylelint**: CSS 代码规范检查
- **Pylint**: Python 代码规范检查
- **RuboCop**: Ruby 代码规范检查
- **Checkstyle**: Java 代码规范检查

## 总结

好的命名是编程的艺术，需要不断实践和总结。记住：

1. **代码是给人读的**：写代码时想着阅读者
2. **命名是文档**：好的命名不需要额外注释
3. **保持一致**：项目内使用相同的命名风格
4. **不要害怕重命名**：不合适的名称应该及时修改
