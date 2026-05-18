---
title: "Openclaw"
---

# OpenClaw

一款开源的用于抓取网页内容的工具, 类似于 Firecrawl 和 Jina Reader, 但是是开源的并且可以自己部署

Github: https://github.com/TheR1D/shell_gpt

注意: 这个项目名字比较容易和其他项目混淆, 注意区分

- OpenClaw (这个项目): 网页抓取
- [OpenCLAWS](https://github.com/biomimetics/OpenCLAWS):  Robotics 相关的项目
- openclaw: 一个 2004 年的 Gameboy Advance 游戏

## 部署

```bash
git clone https://github.com/Doriandarko/openclaw
cd openclaw
docker compose up -d
```

或者直接运行镜像:

```bash
docker run -d -p 8000:8000 ghcr.io/doriandarko/openclaw:latest
```

不过直接运行可能会因为缺少环境变量而无法正常工作, 建议使用 docker compose

## 配置

环境变量:

- `OPENAI_API_KEY`: OpenAI API Key
- `OPENAI_API_BASE`: OpenAI API Base URL (默认 `https://api.openai.com/v1`)
- `OPENAI_MODEL`: 使用的模型 (默认 `gpt-4o-mini`)

- `ANTHROPIC_API_KEY`: Anthropic API Key
- `ANTHROPIC_MODEL`: Anthropic 模型 (默认 `claude-3-5-sonnet-20241022`)

- `GROQ_API_KEY`: Groq API Key
- `GROQ_MODEL`: Groq 模型 (默认 `llama-3.3-70b-versatile`)

- `TOGETHER_API_KEY`: Together API Key
- `TOGETHER_MODEL`: Together 模型 (默认 `meta-llama/Llama-3.3-70B-Instruct-Turbo`)

- `API_KEY_ENABLED`: 是否启用 API Key 验证 (默认 `false`)
- `API_KEY`: 访问 API 所需的 Key

## 模型优先级

OpenClaw 会按照以下顺序尝试使用模型:

1. Anthropic
2. OpenAI
3. Groq
4. Together

只要配置了对应的 API Key, 就会使用该模型

## 使用

API 文档: http://localhost:8000/docs

## Scrape

类似于 Jina Reader 的使用方式

```bash
# 返回 Markdown 格式
curl -X GET "http://localhost:8000/scrape?url=https://example.com"

# 返回结构化的 JSON
curl -X GET "http://localhost:8000/scrape?url=https://example.com&format=json"
```

### 参数

- `url`: 要抓取的 URL
- `formats`: 返回格式. 可以是 `markdown`, `html`, `json` (默认 `markdown`)
- `json_schema`: JSON Schema 用于格式化输出
- `wait_for`: 等待页面加载的时间 (单位: 秒, 默认 `0`)
- `raw`: 是否返回原始内容 (默认 `false`)
- `screenshot`: 是否返回截图 (默认 `false`)
- `headers`: 自定义请求头 (JSON 格式)
- `only_main_content`: 是否只返回主要内容 (默认 `true`)
- `remove_selector`: 要移除的 CSS 选择器

## Search

```bash
curl -X POST "http://localhost:8000/search" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "最新 AI 新闻",
    "max_results": 5
  }'
```

### 参数

- `query`: 搜索查询
- `max_results`: 最大结果数 (默认 `5`)
- `fetch_page_content`: 是否获取页面内容 (默认 `true`)
- `formats`: 返回格式
- `json_schema`: JSON Schema
- `only_main_content`: 是否只返回主要内容 (默认 `true`)
- `wait_for`: 等待页面加载的时间
- `screenshot`: 是否返回截图
- `headers`: 自定义请求头

## Extract

提取网页内容并按照指定格式返回

```bash
curl -X POST "http://localhost:8000/extract" \
  -H "Content-Type: application/json" \
  -d '{
    "urls": ["https://example.com/article/1", "https://example.com/article/2"],
    "schema": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "文章标题"
        },
        "summary": {
          "type": "string",
          "description": "文章摘要"
        }
      }
    },
    "wait_for": 1
  }'
```

### 参数

- `urls`: 要提取的 URL 列表
- `schema`: JSON Schema 用于格式化输出
- `raw`: 是否返回原始内容 (默认 `false`)
- `wait_for`: 等待页面加载的时间
- `screenshot`: 是否返回截图
- `headers`: 自定义请求头

## Crawl

爬取整个网站

```bash
curl -X POST "http://localhost:8000/crawl" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "max_pages": 10,
    "max_depth": 3,
    "exclude_paths": ["/blog/*"],
    "include_paths": ["/docs/*"]
  }'
```

### 参数

- `url`: 要爬取的 URL
- `max_pages`: 最大页面数 (默认 `100`)
- `max_depth`: 最大深度 (默认 `10`)
- `exclude_paths`: 要排除的路径列表 (支持 glob 模式)
- `include_paths`: 要包含的路径列表 (支持 glob 模式)
- `formats`: 返回格式
- `json_schema`: JSON Schema
- `raw`: 是否返回原始内容
- `wait_for`: 等待页面加载的时间
- `screenshot`: 是否返回截图
- `headers`: 自定义请求头
- `only_main_content`: 是否只返回主要内容 (默认 `true`)

### 响应

```json
{
  "job_id": "0194fca8-85c4-75cb-b939-0a25d4f3e4d7",
  "status": "queued"
}
```

### 查询任务状态

```bash
curl "http://localhost:8000/crawl/status/<job_id>"
```

### 取消任务

```bash
curl -X POST "http://localhost:8000/crawl/cancel/<job_id>"
```

## API Key 验证

如果启用了 API Key 验证, 需要在请求头中添加 `Authorization`:

```bash
curl -X GET "http://localhost:8000/scrape?url=https://example.com" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 和其他服务的对比

| 功能 | OpenClaw | Firecrawl | Jina Reader |
|------|----------|-----------|-------------|
| 开源 | 是 | 部分 | 否 |
| 自部署 | 支持 | 支持 | 不支持 |
| 价格 | 免费 | 免费/付费 | 免费/付费 |
| Scrape | 支持 | 支持 | 支持 |
| Search | 支持 | 支持 | 支持 |
| Crawl | 支持 | 支持 | 不支持 |
| Extract | 支持 | 支持 | 不支持 |
| LLM 集成 | 支持 | 支持 | 支持 |

## 相关项目

- [Firecrawl](./firecrawl.md): 网页抓取服务
- [Jina Reader](./jina_reader.md): 网页抓取服务
- [LangChain](../programming/ai/langchain.md): LLM 应用开发框架
- [ShellGPT](./shell_gpt.md): 命令行 AI 助手
