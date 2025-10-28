```ts
import { z } from "@hono/zod-openapi";
// 存在兼容性问题:
// zod 允许忽略 不存在的字段
// zod-openapi 可能因此导致生成的 schema 不正确
```