---
title: "Ollama"
description: "一个用于运行大型语言模型的工具，支持本地部署和管理多种开源模型。"
tags: ["AI", "Ollama"]
lastUpdated: 2025-04-26
---

# Ollama

官网: https://ollama.com/

## 安装

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

## 配置

通过环境变量配置: https://github.com/ollama/ollama/blob/main/docs/faq.md

- `OLLAMA_HOST`: 服务监听地址, 默认 `127.0.0.1:11434`
- `OLLAMA_ORIGINS`: 允许的来源, 用于跨域

```bash
OLLAMA_HOST=0.0.0.0:11434 OLLAMA_ORIGINS=* ollama serve
```

## 常用模型

| 模型 | 大小 | 描述 |
|------|------|------|
| `llama3.1` | 4.7GB | Meta 最新的开源模型 |
| `qwen2.5` | 4.5GB | 阿里开源模型, 中文效果好 |

## 常用命令

```bash
ollama list                # 列出本地模型
ollama pull <model>        # 拉取模型
ollama run <model>         # 运行模型并进入交互模式
ollama serve               # 启动 Ollama 服务
ollama rm <model>          # 删除本地模型
```

## API 调用

Ollama 默认在 `http://localhost:11434` 提供 API。

生成文本:

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1",
  "prompt": "你好，请介绍一下你自己",
  "stream": false
}'
```

对话模式:

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.1",
  "messages": [
    {
      "role": "user",
      "content": "你好，请介绍一下你自己"
    }
  ],
  "stream": false
}'
```

## OpenAI 兼容 API

Ollama 提供 OpenAI 兼容的 API 端点:

```bash
curl http://localhost:11434/v1/chat/completions -H "Content-Type: application/json" -d '{
  "model": "llama3.1",
  "messages": [
    {
      "role": "user",
      "content": "你好"
    }
  ]
}'
```

## 与 LangChain 集成

```python
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage

model = ChatOllama(model="llama3.1")
response = model.invoke([HumanMessage(content="你好")])
print(response.content)
```

## 自定义模型

可以通过 Modelfile 自定义模型:

```dockerfile
FROM llama3.1

SYSTEM "你是一个专业的编程助手，擅长用简洁明了的方式回答技术问题。"

PARAMETER temperature 0.7
```

```bash
ollama create my-assistant -f Modelfile
ollama run my-assistant
```

## Web UI

- [Open WebUI](https://github.com/open-webui/open-webui): 功能丰富的 Web 界面
- [ollama-webui](https://github.com/ollama-webui/ollama-webui): Ollama 官方 Web UI

使用 Docker 启动 Open WebUI:

```bash
docker run -d -p 3000:3000 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

## 性能优化

1. 使用 GPU 加速: Ollama 会自动检测并使用 NVIDIA GPU
2. 调整模型参数:
   - `num_ctx`: 上下文窗口大小
   - `num_predict`: 最大生成 token 数
   - `temperature`: 生成随机性

```python
model = ChatOllama(
    model="llama3.1",
    num_ctx=8192,
    temperature=0.7
)
```
