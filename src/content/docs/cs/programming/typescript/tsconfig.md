---
title: "tsconfig"
---

# tsconfig.json 配置详解

## 概述

`tsconfig.json` 是 TypeScript 项目的配置文件, 用于指定编译选项和项目结构。

## 配置文件查找

当运行 `tsc` 命令时, TypeScript 会按以下顺序查找配置文件:

1. 当前目录的 `tsconfig.json`
2. 当前目录的 `tsconfig.json5`
3. 父目录的 `tsconfig.json`
4. 直到文件系统根目录

也可以通过 `--project` 或 `-p` 参数指定配置文件:

```bash
tsc -p ./path/to/tsconfig.json
```

## 基本结构

```json
{
  "compilerOptions": {
    /* 编译选项 */
  },
  "files": [
    /* 指定编译的文件列表 */
  ],
  "include": [
    /* 指定编译的文件/目录 glob 模式 */
  ],
  "exclude": [
    /* 指定排除的文件/目录 glob 模式 */
  ],
  "extends": [
    /* 继承的配置文件 */
  ],
  "references": [
    /* 项目引用 */
  ]
}
```

## 常用配置项

### 项目文件配置

| 配置项 | 描述 |
|--------|------|
| `files` | 显式指定要编译的文件列表 |
| `include` | 指定要编译的文件/目录, 支持 glob 模式 |
| `exclude` | 指定要排除的文件/目录, 支持 glob 模式 |

```json
{
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

### extends

继承其他配置文件:

```json
{
  "extends": "@tsconfig/node20/tsconfig.json"
}
```

### compilerOptions 核心配置

#### 目标环境

| 配置项 | 描述 | 默认值 |
|--------|------|--------|
| `target` | 编译后的 JavaScript 版本 | `ES3` |
| `module` | 模块系统 | 取决于 `target` |
| `lib` | 编译时包含的库 | 默认值取决于 `target` |

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "lib": ["ES2022", "DOM"]
  }
}
```

常见的 `target` 值:
- `ES3` - 最老的版本, 兼容性最好
- `ES5` - 支持 IE9+
- `ES2015` / `ES6`
- `ES2016` - `ES7`
- `ES2017` - `ES8`
- ...
- `ESNext` - 最新特性

常见的 `module` 值:
- `CommonJS` - Node.js 默认
- `ES6` / `ES2015` - ES 模块
- `AMD` - 异步模块定义
- `System` - SystemJS
- `UMD` - 通用模块定义
- `NodeNext` - Node.js 12+ 支持的模块解析
- `Preserve` - 保留原始模块语法

#### 模块解析

| 配置项 | 描述 |
|--------|------|
| `moduleResolution` | 模块解析策略 |
| `baseUrl` | 解析非相对路径的基础目录 |
| `paths` | 路径映射 |
| `rootDirs` | 组合多个目录为一个虚拟目录 |
| `typeRoots` | 类型定义文件的目录 |
| `types` | 自动包含的类型定义包 |

```json
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

#### 严格类型检查

| 配置项 | 描述 |
|--------|------|
| `strict` | 启用所有严格类型检查选项 |
| `noImplicitAny` | 不允许隐式的 `any` 类型 |
| `strictNullChecks` | 严格的 `null`/`undefined` 检查 |
| `strictFunctionTypes` | 严格的函数参数类型检查 |
| `strictBindCallApply` | 严格的 `bind`/`call`/`apply` 检查 |
| `strictPropertyInitialization` | 严格的属性初始化检查 |
| `noImplicitThis` | 不允许隐式的 `this` 类型 |
| `useUnknownInCatchVariables` | catch 变量使用 `unknown` 类型 |

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

#### 代码质量

| 配置项 | 描述 |
|--------|------|
| `noUnusedLocals` | 不允许未使用的局部变量 |
| `noUnusedParameters` | 不允许未使用的函数参数 |
| `noImplicitReturns` | 函数所有路径都必须有返回值 |
| `noFallthroughCasesInSwitch` | 不允许 switch case 贯穿 |
| `noUncheckedIndexedAccess` | 索引访问结果添加 `undefined` |
| `noPropertyAccessFromIndexSignature` | 只能通过索引访问的属性不能使用点访问 |

```json
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

#### 输出配置

| 配置项 | 描述 |
|--------|------|
| `outDir` | 输出目录 |
| `outFile` | 合并输出到单个文件 |
| `rootDir` | 输入文件的根目录 |
| `removeComments` | 移除注释 |
| `noEmit` | 不生成输出文件（只做类型检查） |
| `declaration` | 生成 `.d.ts` 声明文件 |
| `declarationMap` | 生成声明文件的 source map |
| `sourceMap` | 生成 source map |
| `inlineSourceMap` | 内联 source map |
| `esModuleInterop` | 启用 ES 模块互操作性 |
| `allowSyntheticDefaultImports` | 允许从没有默认导出的模块默认导入 |

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "sourceMap": true,
    "removeComments": true
  }
}
```

#### 互操作性

| 配置项 | 描述 |
|--------|------|
| `esModuleInterop` | 启用 ES 模块和 CommonJS 的互操作性 |
| `allowSyntheticDefaultImports` | 允许从没有默认导出的模块默认导入 |
| `isolatedModules` | 将每个文件作为单独的模块 |
| `verbatimModuleSyntax` | 保持模块语法的原样 |

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "isolatedModules": true
  }
}
```

#### 其他常用配置

| 配置项 | 描述 |
|--------|------|
| `allowJs` | 允许编译 JavaScript 文件 |
| `checkJs` | 检查 JavaScript 文件的类型 |
| `jsx` | JSX 编译方式 |
| `experimentalDecorators` | 启用装饰器 |
| `emitDecoratorMetadata` | 为装饰器发射元数据 |
| `skipLibCheck` | 跳过声明文件的类型检查 |
| `forceConsistentCasingInFileNames` | 强制文件名大小写一致 |
| `resolveJsonModule` | 允许导入 JSON 模块 |
| `allowArbitraryExtensions` | 允许任意文件扩展名 |

## 配置示例

### Node.js 项目

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### React 项目

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Vue 项目

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 库项目

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "removeComments": false
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

## 继承配置

可以继承其他配置文件:

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### 使用社区推荐的基础配置

安装:

```bash
npm install -D @tsconfig/node20
npm install -D @tsconfig/recommended
npm install -D @tsconfig/strictest
```

使用:

```json
{
  "extends": "@tsconfig/node20/tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

可用的基础配置:

- `@tsconfig/recommended` - 推荐配置
- `@tsconfig/strictest` - 最严格配置
- `@tsconfig/node18` - Node.js 18
- `@tsconfig/node20` - Node.js 20
- `@tsconfig/vite-react` - Vite + React
- `@tsconfig/vite-react-ts` - Vite + React + TS
- `@tsconfig/next` - Next.js
- `@tsconfig/nuxt` - Nuxt
- `@tsconfig/svelte` - Svelte
- `@tsconfig/deno` - Deno
- `@tsconfig/bun` - Bun

## 多配置文件

一个项目可以有多个配置文件:

```
tsconfig.json          # 主配置
tsconfig.node.json     # Vite 配置文件
tsconfig.test.json     # 测试配置
```

示例 `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

然后在主配置中引用:

```json
{
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 编译时覆盖配置

可以通过命令行参数覆盖配置:

```bash
tsc --target ES2022 --module NodeNext
tsc --noEmit --strict
```

## 常见问题

### 模块找不到

确保配置了正确的 `moduleResolution`:

```json
{
  "compilerOptions": {
    "moduleResolution": "Bundler"  // 或 "NodeNext"
  }
}
```

### 路径别名不生效

需要配置 `paths` 和 `baseUrl`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

注意: TypeScript 不会处理路径别名的转换, 需要配合构建工具（如 Vite、Webpack）或 `tsc-alias`。

### 类型声明找不到

配置 `typeRoots` 或 `types`:

```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./src/types"],
    "types": ["node", "jest"]
  }
}
```

### 导入 JSON 文件

启用 `resolveJsonModule`:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

```typescript
import data from './data.json'
```

## 推荐的严格配置

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

## 相关资源

- [TSConfig 参考](https://www.typescriptlang.org/tsconfig)
- [TSConfig 基础配置](https://github.com/tsconfig/bases)
- [TypeScript 手册](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
