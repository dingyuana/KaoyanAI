# 考研知识库问答系统 · 技术规格说明书

> 本文档定义项目的技术选型、接口规范和目录结构。
> 当前版本反映项目实际状态（M4 知识库扩展阶段已完成）。

---

## 1. 技术选型

### 前端

| 选项 | 选择 | 理由 |
|------|------|------|
| 框架 | Next.js 16（App Router） | SSR + 流式响应原生支持 |
| UI 框架 | Tailwind CSS 4 | 原子化 CSS，暗色模式内置 |
| 数学渲染 | KaTeX（客户端 `renderToString`） | 零配置，支持行内/块级公式 |
| 字体图标 | Lucide React | 轻量图标库 |
| 测试 | Vitest + Testing Library | 组件级单元测试 |
| 部署平台 | 待定（Docker 容器化） | 发布阶段启用 |

### 后端

| 选项 | 选择 | 理由 |
|------|------|------|
| 语言/框架 | Python 3.12 + FastAPI | 异步原生，自动 API 文档 |
| 架构 | 模块化 | `main.py` / `wiki_retriever.py` / `llm.py` / `config.py` + `exceptions.py` / `rate_limiter.py` / `logging_config.py` |
| 端口 | 8000 | 开发默认端口 |
| 检索 | glob + 关键词匹配（re 模块）+ TTL 缓存 | 无数据库依赖，直接读 MD 文件 |
| 流式 | SSE (Server-Sent Events) | 标准流式协议，浏览器原生 Fetch 支持 |
| 缓存 | 内存 TTL 缓存（read_file / _l3_cache） | 自动过期，60s TTL |
| 测试 | pytest + TestClient | FastAPI 异步测试 |
| 部署 | systemd + uvicorn / Docker | 发布阶段配置 |

### 知识库

| 选项 | 选择 | 理由 |
|------|------|------|
| 格式 | Markdown + YAML Frontmatter | 人类可读，版本控制友好 |
| 结构 | L1（Raw）→ L2（Index）→ L3（Generated） | 三层可追溯架构 |
| 规模 | 7 学科，1574+ 个文件，415 个 L3 文档 | 数学 + 408 四门专业课 + 英语/政治占位 |
| 检索方式 | 文件名 + 正文关键词匹配 + n-gram 模糊匹配 | MVP 阶段够用 |

### LLM

| 选项 | 选择 | 理由 |
|------|------|------|
| 模型 | MiniMax-M2.7 / GPT-4o-mini / Claude | 支持 OpenAI 兼容接口，按需切换 |
| 接入方式 | HTTP API（httpx 异步流式） | 无 SDK 依赖，逐 token SSE 推送 |
| 上下文构建 | 检索结果截取相关内容注入 + token 预算控制 | 不依赖模型微调 |
| 当前状态 | **流式模式**（配置 API Key 即启用，留空则 Mock） | 可通过 `.env` 控制 |

---

## 2. 后端模块

| 模块 | 文件 | 职责 |
|------|------|------|
| API 路由 | `main.py` | FastAPI 应用、CORS、/health /subjects /concepts /chat /chat/stream |
| 知识库检索 | `wiki_retriever.py` | 文件遍历、Frontmatter 解析、关键词匹配、TTL 缓存 |
| LLM 集成 | `llm.py` | LLM API 流式调用、Mock 模式、<think> tag 过滤、token 预算控制 |
| 配置管理 | `config.py` | 路径/Key/7 学科配置/Mock 模式自动判断 |
| 异常处理 | `exceptions.py` | KaoyanError / SubjectNotFoundError / InvalidInputError / LLMServiceError / RateLimitError |
| 限流 | `rate_limiter.py` | 基于 IP 的请求频率限制 |
| 日志 | `logging_config.py` | 结构化日志配置 |

---

## 3. 接口规范

### 3.1 健康检查

```
GET /health
响应 200:
  {"status": "ok"}
```

### 3.2 学科列表

```
GET /subjects
响应 200:
  {"subjects": ["math","ds","arch","net","os","english","politics"], "count": 7}
```

### 3.3 概念列表（按章节分组）

```
GET /concepts/{subject}
参数: subject = math | ds | arch | net | os | english | politics
响应 200:
  {
    "subject": "math",
    "groups": {
      "高等数学": [{"id": "xxx", "title": "函数极限", "type": "concept", "tags": [...]}, ...],
      "线性代数": [...],
      ...
    },
    "count": 208
  }
错误:
  404: {"error": {"code": "SUBJECT_NOT_FOUND", "message": "学科 'xxx' 不存在"}}
```

### 3.4 概念详情

```
GET /concepts/{subject}/{concept_id}
参数: concept_id = 文件名（不含 .md）
响应 200:
  {
    "id": "L3-math-concept-函数极限",
    "title": "函数极限",
    "subject": "math",
    "type": "concept",
    "tags": ["高等数学"],
    "related": [],
    "source_anchors": ["RAW-math-高数-P056-concept"],
    "content": "# 函数极限\n\n## 形式化定义\n..."
  }
错误:
  400: {"error": {"code": "INVALID_INPUT", "message": "概念 'xxx' 不存在"}}
```

### 3.5 关联习题

```
GET /concepts/{subject}/{concept_id}/exercises
响应 200:
  {
    "subject": "ds",
    "concept_id": "二叉树",
    "exercises": [
      {"id": "二叉树练习题", "title": "树与二叉树练习题", "tags": [...], "difficulty": "中等", "score": 12}
    ],
    "count": 1
  }
```

### 3.6 全部习题（按难度分组）

```
GET /exercises/{subject}
响应 200:
  {
    "count": 30,
    "subject": "math",
    "groups": {
      "基础篇": [{"id": "...", "title": "...", "tags": [...], "difficulty": "简单"}, ...],
      "强化篇": [...]
    }
  }
```

### 3.7 问答（非流式）

```
POST /chat
请求体:
  {"message": "什么是极限？", "subject": "math"}
响应 200:
  {
    "answer": "极限是高等数学的核心概念，指的是...",
    "sources": ["math/L3/L3-math-concept-函数极限.md", ...]
  }
请求体验证:
  message: 非空，≤1000 字，不含 <script>
错误:
  400: {"error": {"code": "INVALID_INPUT", "message": "消息不能为空"}}
  502: {"error": {"code": "LLM_ERROR", "message": "生成回答时出错"}}
```

### 3.8 问答（流式 SSE）

```
POST /chat/stream
请求体:
  {"message": "什么是导数？", "subject": "math"}
响应（text/event-stream）:
  data: {"type":"sources","sources":["math/L3/...md",...]}\n\n
  data: {"type":"chunk","content":"导数是..."}\n\n
  data: {"type":"chunk","content":"微分学..."}\n\n
  data: {"type":"done"}\n\n
错误:
  502: {"error": {"code": "LLM_ERROR", "message": "检索知识库失败"}}
```

---

## 4. 错误码表

| 错误码 | HTTP 状态码 | 说明 |
|--------|-----------|------|
| `SUBJECT_NOT_FOUND` | 404 | 学科不存在 |
| `INVALID_INPUT` | 400 | 输入校验失败（空消息/过长/非法字符/概念不存在） |
| `LLM_ERROR` | 502 | LLM 调用失败（API 超时/鉴权失败/网络错误） |
| `RATE_LIMITED` | 429 | 请求过于频繁 |
| `INTERNAL_ERROR` | 500 | 未捕获的服务器内部错误 |

所有错误响应格式：
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "中文错误描述",
    "detail": {}
  }
}
```

---

## 5. 前端路由设计

| 路径 | 页面 | 状态 |
|------|------|------|
| `/kaoyan` | 问答首页（含聊天/概念浏览 Tab） | ✅ 完成 |
| `/kaoyan/api/chat/stream` | 流式 API 代理 → `:8000/chat/stream` | ✅ 完成 |
| `/kaoyan/api/chat` | 非流式 API 代理 | ✅ 完成 |
| `/kaoyan/api/subjects` | 学科列表代理 | ✅ 完成 |
| `/kaoyan/api/concepts/{subject}` | 概念列表代理 | ✅ 完成 |
| `/kaoyan/api/concepts/{subject}/{id}/exercises` | 关联习题代理 | ✅ 完成 |
| `/kaoyan/api/exercises/{subject}` | 习题列表代理 | ✅ 完成 |

---

## 6. 验收状态

### 6.1 核心功能（已验收）

- [x] 后端健康检查正常
- [x] 学科列表接口返回全部 7 学科
- [x] 概念列表接口返回数学 + 408 四门课概念
- [x] 问答接口（非流式）返回回答 + 来源
- [x] 问答接口（流式 SSE）逐步输出
- [x] 前端流式展示回答
- [x] KaTeX 数学公式渲染（行内 + 块级）
- [x] 暗色模式适配
- [x] 学科切换 UI（7 学科动态加载）
- [x] 真实 LLM 流式调用
- [x] 异常处理（自定义异常体系 + 统一错误响应）
- [x] 限流保护
- [x] 请求日志
- [x] 概念树浏览（7 学科按章节分组）
- [x] 概念详情（Markdown 渲染 + KaTeX + 关联习题）
- [x] 后端 42 个测试通过
- [x] 前端 19 个测试通过

### 6.2 待验收

- [ ] Docker 化部署
- [ ] CI/CD 流水线
- [ ] 英语/政治知识库
- [ ] 首次回答 < 3 秒（含 LLM 延迟）
- [ ] 移动端布局适配完善
- [ ] 前端端到端测试
- [ ] 覆盖率 > 60%（核心模块）