# CODING_GUIDELINES

## file\dir\var

### architecture

纯分层{适用于小型项目或单一模块}:

纯分模块{部分缺点可以用子模块解决,但不建议优先这样分}:
```md
- server/modules/{module_name}/
  - table.ts // 数据库表结构定义
  - type.ts // 数据类型定义, 可顺便创建zod.schema
  - da.ts // 数据访问操作(可选)
  - service.ts // 业务逻辑处理(da)
  - util.ts // 辅助函数
  - router.ts // 路由处理, 可顺便创建zod.schema
  - {module_name}/
    - ...
- server/modules/{module_name}/
  - ...
```
先分模块后分层{推荐}:
```md
- server/modules/{module_name}/
  - table.ts or table/1.ts,2.ts...
  - type.ts or type/1.ts,2.ts...
  - da.ts or da/1.ts,2.ts...(可选)
  - service.ts or service/1.ts,2.ts...
  - util.ts or util/1.ts,2.ts...
  - router.ts or router/1.ts,2.ts...
```

| name | 来源 | 用途 | 分类 |
| :--: | :--: | :--: | :--: |
| **router** | fastapi | 路由器 | router |
| route | hono | 路由器 | router |
| controller | spring | 控制器\路由器 | router |
| **service** | spring | 业务逻辑\服务 | service |
| Repository | DDD\spring | 数据访问对象\仓库 | Repository |
| **DAO**{data access object} | oop\java | 数据访问对象\仓库 | Repository |
| dto{Data Transfer Object} | spring | 数据传输对象\裁剪字段用于 API | dto |
| schema | zod\drizzle\yup | 数据验证器\结构定义 | schema\table |
| model | django\fastapi\prisma | 数据模型\ORM模型|数据验证器\结构定义\dto | model\table\schema |
| **table** | drizzle | 数据库表结构 | table |
| entity | spring | 实体\数据模型 | model\table |

## type\schema 与 infer

Drizzle:
```md
table -> schema
table -> type
```
Zod:
```md
schema -> type
schema == openapi_schema == dto
```
FastAPI:
```md
class == schema == openapi_schema == dto
```
SQLModel:
```md
class == table
```

由于 Drizzle 和 Zod 都支持 `infer`，因此可以直接从表结构或验证器中推断出类型。但是这会导致开发时占用过大的内存，因此建议在需要时再使用 `infer`。

| 场景 | 字段数 | 建议 |
| :--: | :--: | :--: |
|少量 | <= 5-7 | 直接手写 type\schema 更清晰易读 |
|中等 | 8-15 | 视字段名变化频率而定，使用 `infer` 或手写 |
|大量 | > 15 | 使用 `infer`,`Omit`,`extend`, 避免重构时代码维护成本过高  |

## version control