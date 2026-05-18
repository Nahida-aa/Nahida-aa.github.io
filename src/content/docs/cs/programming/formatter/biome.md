---
title: "Biome"
description: "格式化工具"
tags: ["工程化"]
lastUpdated: 2025-03-31
---

# Biome

一个高性能的 JavaScript / TypeScript 格式化工具和 Linter, 类似于 ESLint + Prettier, 但是性能更好

官网: https://biomejs.dev/

对比:

- 比 Prettier 快 10-100 倍
- 比 ESLint 快 20 倍
- 开箱即用, 不需要复杂的配置
- 支持 JavaScript, TypeScript, JSX, TSX, JSON, CSS, 等等

## 安装

### 全局安装

```bash
npm install -g @biomejs/biome
```

### 项目内安装

```bash
npm install -D @biomejs/biome
```

## 初始化

```bash
npx @biomejs/biome init
```

这会在项目根目录创建一个 `biome.json` 文件:

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": false,
    "clientKind": "git",
    "useIgnoreFile": false
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": []
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab"
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double",
      "trailingCommas": "none"
    }
  }
}
```

## 常用命令

### 检查代码

```bash
npx @biomejs/biome check .
```

### 格式化代码

```bash
npx @biomejs/biome format .
npx @biomejs/biome format --write .  # 格式化并写入文件
```

### 修复问题

```bash
npx @biomejs/biome check --apply .
npx @biomejs/biome check --apply-unsafe .  # 应用不安全的修复
```

## 配置项

### formatter

| 配置项 | 描述 | 可选值 | 默认值 |
|--------|------|--------|--------|
| `enabled` | 是否启用格式化 | `true`, `false` | `true` |
| `indentStyle` | 缩进风格 | `tab`, `space` | `tab` |
| `indentWidth` | 缩进宽度 | 数字 | `2` |
| `lineWidth` | 行宽 | 数字 | `80` |
| `lineEnding` | 行尾 | `lf`, `crlf`, `cr` | `lf` |

### javascript.formatter

| 配置项 | 描述 | 可选值 | 默认值 |
|--------|------|--------|--------|
| `quoteStyle` | 引号风格 | `double`, `single` | `double` |
| `trailingCommas` | 尾逗号 | `all`, `es5`, `none` | `all` |
| `semicolons` | 分号 | `always`, `asNeeded` | `always` |
| `arrowParentheses` | 箭头函数参数括号 | `always`, `asNeeded` | `always` |
| `quoteProperties` | 对象属性引号 | `asNeeded`, `preserve` | `asNeeded` |
| `bracketSpacing` | 对象字面量空格 | `true`, `false` | `true` |
| `bracketSameLine` | 最后一个 `>` 是否在同一行 | `true`, `false` | `false` |

### linter.rules

| 配置项 | 描述 |
|--------|------|
| `recommended` | 启用推荐规则 | `true` |
| `all` | 启用所有规则 | `true` |
| `nursery` | 启用 nursery 规则（试验性） | `true` |

规则配置示例:

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noUselessConstructor": "error",
        "noUselessSwitchCase": "warn"
      },
      "correctness": {
        "noUnusedVariables": "error"
      },
      "style": {
        "noVar": "error",
        "useConst": "error"
      },
      "suspicious": {
        "noExplicitAny": "warn"
      }
    }
  }
}
```

## 和 Prettier 对比

| 特性 | Biome | Prettier |
|------|-------|----------|
| 语言支持 | JS/TS, JSON, CSS, Vue, 更多 | 很多语言 |
| 速度 | 极快 | 快 |
| 配置 | 简单 | 简单 |
| 插件生态 | 较少 | 丰富 |
| 自定义程度 | 中等 | 较高 |

## 和 ESLint 对比

| 特性 | Biome | ESLint |
|------|-------|--------|
| 语言支持 | JS/TS | JS/TS + 插件 |
| 速度 | 极快 | 较慢 |
| 配置 | 简单 | 复杂 |
| 规则数量 | 较少 | 很多 |
| 插件生态 | 较少 | 丰富 |
| 自动修复 | 支持 | 支持 |

## 配置示例

### 常用配置

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "es5",
      "semicolons": "asNeeded",
      "arrowParentheses": "asNeeded"
    }
  },
  "linter": {
    "rules": {
      "recommended": true
    }
  },
  "organizeImports": {
    "enabled": true
  }
}
```

### 配合 VS Code

安装插件: `biomejs.biome`

在 `.vscode/settings.json` 中配置:

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

### 配合 Git Hooks

使用 `simple-git-hooks` 配合 `lint-staged`:

```bash
npm install -D simple-git-hooks lint-staged
```

`package.json`:

```json
{
  "scripts": {
    "lint": "biome check .",
    "lint:fix": "biome check --apply .",
    "format": "biome format --write ."
  },
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
  "lint-staged": {
    "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}": [
      "biome check --apply --no-errors-on-unmatched"
    ]
  }
}
```

然后运行:

```bash
npx simple-git-hooks
```

## 忽略文件

### biome.json 中配置

```json
{
  "files": {
    "ignore": ["dist", "build", "node_modules", "*.config.js"]
  }
}
```

### .gitignore

Biome 会自动读取 `.gitignore` 中的配置, 只需要在 `biome.json` 中启用:

```json
{
  "vcs": {
    "enabled": true,
    "useIgnoreFile": true
  }
}
```

### 行内忽略

```javascript
// biome-ignore lint/suspicious/noExplicitAny: 暂时使用 any
const value: any = getValue();

// biome-ignore format: 需要保持原样
const data = [
  1, 2, 3,
  4, 5, 6
];
```

## 从 Prettier 迁移

### 使用 biome migrate

```bash
npx @biomejs/biome migrate prettier
```

这会读取 `.prettierrc` 并创建/更新 `biome.json`。

### 常见差异

| Prettier | Biome |
|----------|-------|
| `tabWidth: 2` | `indentWidth: 2` |
| `useTabs: false` | `indentStyle: "space"` |
| `singleQuote: true` | `javascript.formatter.quoteStyle: "single"` |
| `trailingComma: "es5"` | `javascript.formatter.trailingCommas: "es5"` |
| `semi: false` | `javascript.formatter.semicolons: "asNeeded"` |
| `arrowParens: "avoid"` | `javascript.formatter.arrowParentheses: "asNeeded"` |
| `printWidth: 100` | `lineWidth: 100` |

## 从 ESLint 迁移

### 规则对照

Biome 实现了大部分 ESLint 核心规则, 查看: https://biomejs.dev/linter/rules/

### 常见规则对照

| ESLint | Biome |
|--------|-------|
| `no-unused-vars` | `correctness/noUnusedVariables` |
| `no-var` | `style/noVar` |
| `prefer-const` | `style/useConst` |
| `no-explicit-any` | `suspicious/noExplicitAny` |
| `eqeqeq` | `suspicious/noDoubleEquals` |
| `curly` | `style/useBlockStatements` |

## 性能对比

官方基准测试:

| 工具 | 时间 |
|------|------|
| Biome | 0.4 秒 |
| Prettier | 7.0 秒 (慢 17x) |
| ESLint | 8.5 秒 (慢 21x) |
| ESLint + Prettier | 12.4 秒 (慢 31x) |

## 相关项目

- [ESLint](./eslint.md): JavaScript Linter
- [Prettier](./prettier.md): 代码格式化工具
