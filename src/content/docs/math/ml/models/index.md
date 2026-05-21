---
title: ml models
---
## 音频源分离
### Demucs
https://github.com/adefossez/demucs

主要用于从混合音频中分离出人声、鼓、贝斯、吉他等不同音轨。它是目前最先进的音乐源分离工具之一，基于卷积神经网络（CNN）和 Transformer 架构，常被用于提取伴奏或干声

## 语音识别
### Whisper 
Automatic Speech Recognition（asr, 自动语音识别, 语音转文字）

OpenAI 开发的一个通用语音识别模型。它支持多语言语音转文字、翻译（例如将其他语言翻译成英语），以及语言识别。Whisper 基于大规模弱监督训练，能够处理各种口音、背景噪音和技术术语

## 翻译 (llm )
- 上下文感知：摘要/术语表/ASR 纠错等预处理显著提升翻译质量
- 支持任意语言对
- 通过 concurrency=50 并发翻译抵消 LLM 延迟
## 音频处理链
### librosa + pydub + audiostretchy
audiostretchy 做时间拉伸保音色效果尚可，结合两级速度调节（全局 base factor + 局部 factor）的设计是稳妥的工程方案。局限：对极端拉伸 (>1.2x) 会出现 artifact，
## tts 端到端语音合成

### VoxCPM2

OpenBMB（面壁智能）开源的端到端语音合成（TTS）模型，采用 tokenizer-free + diffusion autoregressive 架构，在连续潜空间直接生成语音，无需离散 tokenizer

跨语种声音克隆模型

- 上传一段参考音频（如中文说话人），可以生成该说话人在其他语言（如英文、日文等 30 种语言）下的语音
- 它采用了 isolated reference channel（隔离的参考音色通道），将音色信息与内容/语种解耦，因此天然支持跨语言克隆
- 除了参考音频克隆，还支持 Voice Design：直接用文字描述（如 "a warm male voice in his 40s"）创建全新音色，无需任何参考音频


main.py               REST 端点 + CORS + lifespan 生命周期          │
│    │                                                                │
│    ├─ database.py       SQLite: tasks / task_stages / settings       │
│    ├─ worker.py         单线程 FIFO 队列 (daemon thread)             │
│    │      └─ PipelineRunner.run()  遍历 9 个阶段                    │
│    ├─ pipeline.py       状态机: 成功/失败 → 可恢复                  │
│    └─ adapters/         各阶段适配器 (lazy import)                   │
│         ├─ ytdlp.py         ① 下载视频                              │
│         ├─ demucs.py        ② 分离人声/背景音                       │
│         ├─ whisper_asr.py   ③ ASR 语音识别                          │
│         ├─ asr_sentence_fixer.py  ④ 修正句子边界                    │
│         ├─ openai_translate.py    ⑤ LLM 翻译 (并发50)               │
│         ├─ audio.py         ⑥ 切分参考音频 / ⑧ 拉伸混音            │
│         ├─ voxcpm.py        ⑦ TTS 配音 (声音克隆)                  │
│         └─ ffmpeg.py        ⑨ 混流+压制字幕