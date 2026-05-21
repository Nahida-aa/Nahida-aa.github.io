---
title: Rust 模块系统
---

> 如果你写过其他语言：`use` ≈ import，`pub` ≈ export，`pub use` ≈ re-export (export import), `mod` ≈ 声明\创建模块，

举个最简单的例子——两个文件，一个导出函数，一个导入调用：

```rust
// src/greeter.rs —— 导出
pub fn hello() {              // pub = 对外公开
    println!("Hello!");
}
```

```rust
// src/main.rs —— 导入
mod greeter;  // 声明
use crate::greeter::hello; // 导入          

fn main() {
    hello();          // 用 :: 访问模块内的东西
}
```

**三步走：**

1. **创建文件** —— `greeter.rs`
2. **声明模块** —— `mod greeter;` 告诉 Rust 有这个模块
3. **使用路径** —— `greeter::hello()` 访问模块内的项

---

## 可见性：pub

模块里默认**全部私有**，只有 `pub` 的才能被外部访问。

```rust
mod helper {
    fn private_fn() {}        // ❌ 外部看不到
    pub fn public_fn() {}     // ✅ 外部能用
}
```

## 相对/绝对路径

```rust
use crate::module::Item;      // 绝对路径（从 crate 根开始）
use super::module::Item;      // 相对路径（父模块）
```

## pub use：二次导出

把深层模块的东西"提"到外层，调用方不用关心内部结构。

```rust
// src/lib.rs
mod greeter;
pub use greeter::hello;       // 外部直接 hello() 就行
```

## 进阶语法

| 语法 | 用途 | 示例 |
|------|------|------|
| `use A as B` | 重命名 | `use std::io::Result as IoResult` |
| `use A::{B, C}` | 嵌套导入 | `use std::{cmp::Ordering, io}` |
| `use A::*` | 全部导入 | `use std::collections::*` |

## 文件组织结构

一个模块对应一个文件/目录：

```
src/
├── lib.rs          ← crate 根
├── greeter.rs      ← mod greeter;
└── greeter/        ← greeter 的子模块目录
    └── helper.rs   ← mod helper;
```

```rust
// greeter.rs 中声明子模块
pub mod helper;
```