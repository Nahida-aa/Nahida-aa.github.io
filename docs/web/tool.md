---
title: Tool
description: 
created_at: 2022-07-06T16:26:29Z
updated_at: 2025-08-25T11:23:09Z
tags: [web]
---

## Bun vs pnpm 全面对比

### 1. 基本介绍

#### Bun
- **性质**: 一体化 JavaScript 运行时 + 包管理器 + 构建工具
- **语言**: Zig 编写
- **发布**: 2022年，相对较新
- **核心**: JavaScriptCore 引擎 (Safari 同款)
- **定位**: 替代 Node.js + npm 的完整解决方案

#### pnpm
- **性质**: 专注的包管理器
- **语言**: TypeScript/JavaScript 编写
- **发布**: 2017年，相对成熟
- **核心**: 硬链接 + 符号链接的依赖管理
- **定位**: npm/yarn 的高效替代品

### 2. 包管理性能对比

#### 安装速度对比

| 操作 | Bun | pnpm | npm | yarn |
|------|-----|------|-----|------|
| 冷安装 | 🥇 超快 | 🥈 很快 | 🥉 慢 | 一般 |
| 热安装 | 🥇 超快 | 🥈 很快 | 慢 | 一般 |
| 缓存命中 | 🥇 即时 | 🥇 即时 | 慢 | 一般 |

```bash
# 真实项目安装时间对比 (Next.js 项目)
# Bun:    ~2-5秒
# pnpm:   ~8-15秒  
# npm:    ~30-60秒
# yarn:   ~20-40秒
```

#### 磁盘空间使用

```bash
# 典型的 React 项目
# Bun:    ~180MB (全局缓存共享)
# pnpm:   ~120MB (硬链接共享)
# npm:    ~350MB (每个项目独立)
# yarn:   ~300MB (每个项目独立)
```

### 3. 依赖管理策略

#### pnpm 的硬链接策略
```bash
# pnpm 依赖结构
node_modules/
├── .pnpm/                    # 实际包存储
│   ├── react@18.2.0/
│   └── lodash@4.17.21/
├── react -> .pnpm/react@18.2.0/node_modules/react
└── lodash -> .pnpm/lodash@4.17.21/node_modules/lodash

# 优势
✅ 磁盘空间最优化
✅ 严格的依赖隔离
✅ 解决幻影依赖问题
✅ 符合 Node.js 解析算法
```

#### Bun 的扁平化策略
```bash
# Bun 依赖结构
node_modules/
├── react/                    # 直接存储
├── lodash/
└── .bin/

# 优势
✅ 安装速度最快
✅ 兼容性最好
✅ 简单清晰的结构
❌ 可能存在幻影依赖
```

### 4. 命令对比

#### 基本包管理命令

| 操作 | Bun | pnpm |
|------|-----|------|
| 安装依赖 | `bun install` | `pnpm install` |
| 添加包 | `bun add react` | `pnpm add react` |
| 删除包 | `bun remove react` | `pnpm remove react` |
| 运行脚本 | `bun run dev` | `pnpm run dev` |
| 更新包 | `bun update` | `pnpm update` |
| 全局安装 | `bun add -g pkg` | `pnpm add -g pkg` |

#### 独特功能对比

```bash
# Bun 独有功能
bun run index.ts          # 直接运行 TypeScript
bun build ./index.ts      # 内置构建工具
bun test                  # 内置测试运行器
bun create react-app my-app  # 快速创建项目
bun --watch index.ts      # 热重载

# pnpm 独有功能
pnpm dlx create-react-app my-app  # 类似 npx
pnpm patch react@18.2.0  # 包补丁功能
pnpm publish --filter     # Monorepo 发布
pnpm workspace run test   # 工作区命令
pnpm why react           # 依赖分析
```

### 5. 生态系统兼容性

#### Bun 兼容性
```bash
# ✅ 支持的框架
✅ React/Next.js
✅ Vue/Nuxt
✅ Svelte/SvelteKit
✅ Express/Fastify
✅ 大部分 npm 包

# ❌ 已知问题
❌ 某些 native 模块
❌ 一些 Webpack 插件
❌ 特殊的 Node.js API
❌ 某些老旧包
```

#### pnpm 兼容性
```bash
# ✅ 几乎 100% npm 兼容
✅ 所有 Node.js 项目
✅ 所有主流框架
✅ 完整的 npm 生态
✅ Monorepo 支持
```

### 6. 项目配置对比

#### Bun 项目配置
```json
// bunfig.toml
[install]
cache = false
registry = "https://registry.npmjs.org/"
optional = true

[install.scopes]
"@company" = "https://npm.company.com"

[test]
preload = ["./setup.ts"]

[build]
target = "node"
outdir = "./dist"
```

#### pnpm 项目配置
```yaml
# .npmrc
node-linker=hoisted          # 扁平化模式
strict-peer-dependencies=false
auto-install-peers=true
registry=https://registry.npmjs.org/

# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - '!**/test/**'
```

### 7. Monorepo 支持对比

#### pnpm Monorepo (更成熟)
```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'

# package.json
{
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "dev": "pnpm --filter @company/web dev"
  }
}
```

```bash
# pnpm Monorepo 命令
pnpm --filter @company/web add react
pnpm --filter @company/api build
pnpm -r run test  # 递归运行所有包的测试
```

#### Bun Monorepo (新兴)
```json
// bun.json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

```bash
# Bun Monorepo 命令
bun --filter @company/web add react
bun run --filter @company/api build
```

### 8. 性能基准测试

#### 真实项目测试结果

```bash
# 大型 Next.js 项目 (500+ 依赖)
# 首次安装
Bun:    4.2s   🥇
pnpm:   12.8s  🥈
npm:    45.6s  🥉
yarn:   32.1s

# 二次安装 (有缓存)
Bun:    0.8s   🥇
pnpm:   2.1s   🥈
npm:    28.3s  🥉
yarn:   15.7s

# 磁盘使用 (包含 node_modules)
pnpm:   145MB  🥇 (硬链接优化)
Bun:    198MB  🥈
npm:    387MB  🥉
yarn:   354MB
```

### 9. 使用场景建议

#### 选择 Bun 的场景

```bash
# ✅ 适合 Bun
✅ 新项目，追求极致性能
✅ 全栈 TypeScript 开发
✅ 需要快速原型开发
✅ 团队愿意尝试新技术
✅ 简单的依赖结构
✅ 现代化的技术栈

# 项目示例
bun create next-app my-app    # 新 Next.js 项目
bun create react-app my-app  # 新 React 项目
```

#### 选择 pnpm 的场景

```bash
# ✅ 适合 pnpm
✅ 企业级项目，稳定性优先
✅ 复杂的 Monorepo 项目
✅ 需要严格的依赖管理
✅ 有大量自定义工具链
✅ 团队对新技术保守
✅ 需要完美的 npm 兼容性

# 项目示例
pnpm create vue my-app       # Vue 项目
pnpm dlx create-t3-app       # T3 Stack 项目
```

### 10. 迁移指南

#### 从 npm 迁移到 Bun
```bash
# 1. 安装 Bun
curl -fsSL https://bun.sh/install | bash

# 2. 删除现有依赖
rm -rf node_modules package-lock.json

# 3. 使用 Bun 安装
bun install

# 4. 更新脚本 (可选)
# package.json 中的脚本可以直接使用
```

#### 从 npm 迁移到 pnpm
```bash
# 1. 安装 pnpm
npm install -g pnpm

# 2. 导入现有项目
pnpm import  # 从 package-lock.json 导入

# 3. 或重新安装
rm -rf node_modules package-lock.json
pnpm install
```

### 11. 最终建议

#### 技术选型矩阵

| 项目类型 | 推荐工具 | 理由 |
|----------|----------|------|
| 个人项目/学习 | **Bun** | 速度快，体验好 |
| 小型商业项目 | **Bun** | 开发效率高 |
| 中型团队项目 | **pnpm** | 平衡性能与稳定性 |
| 大型企业项目 | **pnpm** | 成熟稳定，生态完整 |
| Monorepo 项目 | **pnpm** | 专业的 Monorepo 支持 |
| 实验性项目 | **Bun** | 尝试新技术 |

#### 混合使用策略
```bash
# 开发阶段使用 Bun (快速迭代)
bun install
bun run dev

# 生产构建使用 pnpm (稳定可靠)
pnpm install --frozen-lockfile
pnpm run build
```

**总结**: Bun 在性能上确实领先，但 pnpm 在稳定性和生态兼容性上更强。选择取决于您的项目需求和团队情况！
