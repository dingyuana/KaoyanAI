# 考研知识库问答系统 · 技术规格说明书

> 本文档定义项目的技术选型、接口规范和目录结构。
> 当前版本反映项目实际状态（MVP 核心功能已完成）。

---

## 1. 技术选型

### 前端

| 选项 | 选择 | 理由 |
|------|------|------|
| 框架 | Next.js 16（App Router） | SSR + 流式响应原生支持 |
| UI 框架 | Tailwind CSS 4 | 原子化 CSS，暗色模式内置 |
| 数学渲染 | KaTeX（客户端 `renderToString`） | 零配置，支持行内/块级公式 |
| 字体图标 | Lucide React | 轻量图标库 |
| 部署平台 | Vercel（目标） | Next.js 官方平台 |

### 后端

| 选项 | 选择 | 理由 |
|------|------|------|
| 语言/框架 | Python + FastAPI | 异步原生，自动 API 文档 |
| 架构 | 模块化（非单文件） | `main.py` / `wiki_retriever.py` / `llm.py` / `config.py` 分离 |
| 端口 | 8001 | 开发默认端口 |
| 检索 | glob + 关键词匹配（re 模块） | 无数据库依赖，直接读 MD 文件 |
| 流式 | SSE (Server-Sent Events) | 标准流式协议，浏览器原生 Fetch 支持 |
| 缓存 | 无（当前） | 后期引入 Redis |
| 部署 | systemd + uvicorn（目标） | 稳定生产部署 |

### 知识库

| 选项 | 选择 | 理由 |
|------|------|------|
| 格式 | Markdown + YAML Frontmatter | 人类可读，版本控制友好 |
| 结构 | L1（Raw）→ L2（Index）→ L3（Generated） | 三层可追溯架构 |
| 规模 | 942 个文件（数学学科） | 421 概念 + 17 方法 + 30 习题 + 465 Raw |
| 检索方式 | 文件名 + 正文关键词匹配 | MVP 阶段够用 |

### LLM

| 选项 | 选择 | 理由 |
|------|------|------|
| 模型 | GPT-4o-mini / Claude Sonnet | 按调用量付费 |
| 接入方式 | HTTP API（httpx） | 无 SDK 依赖 |
| 上下文构建 | 检索结果截取相关内容注入 | 不依赖模型微调 |
| 当前状态 | **Mock 模式** | 需配置真实 API Key 后切换 |

---

## 2. 接口规范

### 2.1 健康检查

```yaml
GET /health
响应:
  status: string   # "ok"
```

### 2.2 学科列表

```yaml
GET /subjects
响应:
  subjects:
    - id: string      # 学科标识（math/english/politics）
      name: string    # 学科名称
      available: bool # 是否可用（是否有知识库）
  count: int
```

### 2.3 概念列表

```yaml
GET /concepts/{subject}
参数:
  subject: string     # 学科（math/english/politics）
响应:
  subject: string
  concepts:
    - title: string       # 概念标题
      file_path: string   # 文件路径
      type: string        # concept/method/exercise
      tags: []            # 标签（如有）
      chapter: string     # 所属章节（如有）
  count: int
```

### 2.4 问答接口（非流式）

```yaml
POST /chat
请求体:
  message: string     # 用户问题
  subject: string     # 学科（可选）
响应:
  answer: string      # AI 回答
  sources: []string   # 来源文件列表
```

### 2.5 问答接口（流式 SSE）

```yaml
POST /chat/stream
请求体:
  message: string     # 用户问题
  subject: string     # 学科（可选）
响应（SSE 事件流）:
  event: sources     # {"type":"sources","sources":[...]}
  event: chunk       # {"type":"chunk","content":"..."}
  event: done        # {"type":"done"}
```

### 2.6 前端 API Route（代理）

```yaml
POST /kaoyan/api/chat/stream
  前端 Next.js API Route，代理到后端 :8001/chat/stream
  用于开发环境前后端联调
```

---

## 3. 前端路由设计

| 路径 | 页面 | 状态 |
|------|------|------|
| `/kaoyan` | 问答首页 | ✅ 完成 |
| `/kaoyan/api/chat` | 非流式 API 代理 | ✅ 完成 |
| `/kaoyan/api/chat/stream` | 流式 API 代理 | ✅ 完成 |

---

## 4. 验收标准

### 4.1 核心功能验收

- [x] 后端健康检查正常
- [x] 学科列表接口返回数学/英语/政治
- [x] 概念列表接口返回数学 L3 文件
- [x] 问答接口（非流式）返回回答 + 来源
- [x] 问答接口（流式 SSE）逐步输出
- [x] 前端流式展示回答
- [x] KaTeX 数学公式渲染（行内 + 块级）
- [x] 暗色模式适配
- [x] 学科切换 UI（数学激活，英语/政治灰色）
- [ ] 真实 LLM 调通（当前 Mock）
- [ ] 首次回答 < 3 秒（含 LLM 延迟）
- [ ] 移动端布局适配完善

### 4.2 待验收

- [ ] Docker 化部署
- [ ] LLM 真实流式输出
- [ ] 单元测试覆盖核心模块
- [ ] 前后端端到端测试
- [ ] 错误处理优雅降级
