# 考研知识库问答系统 · 技术规格说明书

> 本文档分为两部分：**MVP 技术规格**（当前）和 **Commercial 技术规格**（后期）。  
> MVP 用最简技术栈验证核心价值；Commercial 在验证通过后逐步引入重型组件。

---

# 第一部分：MVP 技术规格

## 1. 技术选型

### 前端

| 选项 | 选择 | 理由 |
|------|------|------|
| 类型 | 单页 HTML + Vanilla JS | 无需构建，5分钟部署，最快验证 |
| 数学渲染 | KaTeX (CDN) | CDN引入，零配置，支持主流公式 |
| HTTP | Fetch API | 原生支持，无需axios |

### 后端

| 选项 | 选择 | 理由 |
|------|------|------|
| 语言/框架 | Python + FastAPI（单文件） | 轻量、快速开发、自动文档 |
| 端口 | 8000 | 标准FastAPI默认端口 |
| 检索 | glob + 关键词匹配 | 无数据库依赖，直接读 MD 文件 |
| 缓存 | 无（无状态服务） | MVP阶段跳过，减少复杂度 |
| 部署 | Railway / Render | Git推送即部署，免费额度够用 |

### 知识库

| 选项 | 选择 | 理由 |
|------|------|------|
| 存储 | Git + 文件系统（MD文件） | 版本控制，人类可读，Hermes可直写 |
| 检索 | Python re 模块关键词匹配 | MVP够用，后期切ES |
| 数量 | 20-30 个数学概念 MD 文件 | 覆盖核心章节，可手动维护 |

### LLM

| 选项 | 选择 | 理由 |
|------|------|------|
| 模型 | Claude 3.5 Sonnet / GPT-4o | 按调用量付费，灵活切换 |
| 调用 | 官方 SDK（requests封装） | 流式输出，重试机制 |
| 上下文 | 从检索结果中截取相关内容注入 | 不依赖模型微调 |

### 部署

| 选项 | 选择 | 理由 |
|------|------|------|
| 方式 | 单服务器 + Nginx 反向代理 | 一个云服务器搞定，费用低 |
| 前端 | 静态文件，由 Nginx 直接服务 | 无需 Node 服务 |
| 后端 | uvicorn 守护进程运行 | systemd 管理，自动重启 |

---

## 2. MVP 接口规范

### 2.1 问答接口

```yaml
POST /api/v1/query
描述: 知识库问答
请求体:
  question: string    # 用户问题
  subject: string     # 学科: math|english|politics（暂时只支持math）
响应(非流式):
  answer: string      # 回答内容
  sources:
    - file: string    # 来源文件名
      excerpt: string  # 相关段落
  status: string       # "ok" | "no_context"
响应(流式):
  使用 Server-Sent Events (SSE)
  event: chunk        # {"content": "..."}
  event: sources      # {"sources": [...]}
  event: done         # {"status": "ok"}
```

### 2.2 学科切换

```yaml
GET /api/v1/subjects
描述: 获取可用学科列表
响应:
  subjects:
    - id: string
      name: string
      status: string   # "active" | "coming_soon"
```

---

## 3. MVP 架构

```
┌─────────────────────────────────────────────────┐
│                 用户浏览器                       │
│   单页HTML + KaTeX + Fetch API                  │
└────────────────────┬──────────────────────────┘
                     │ HTTP
┌────────────────────▼──────────────────────────┐
│           Nginx (反向代理)                      │
│   / → 静态文件                                  │
│   /api → FastAPI :8000                         │
└────────────────────┬──────────────────────────┘
                     │
┌────────────────────▼──────────────────────────┐
│           FastAPI 后端                          │
│   - query_router: 处理问答请求                   │
│   - search_service: glob读MD + 关键词匹配        │
│   - llm_service: 调用LLM API + 流式返回         │
│   - subject_router: 学科信息                    │
└────────────────────┬──────────────────────────┘
                     │
          ┌──────────┴──────────┐
          ↓                     ↓
   wiki/math/*.md         LLM API
   (20-30个概念文件)       (Claude/GPT)
```

---

# 第二部分：Commercial 技术规格

> 以下内容在 MVP 验证通过后逐步引入。

## 4. Commercial 技术选型

### 前端

| 选项 | 选择 | 理由 |
|------|------|------|
| 框架 | Next.js 14 (App Router) | SSR、路由、PWA支持 |
| UI库 | Tailwind CSS + Shadcn/ui | 快速开发、自定义强 |
| 状态管理 | Zustand | 轻量、TypeScript友好 |
| 数学渲染 | KaTeX（服务端渲染） | 性能更优 |

### 后端

| 选项 | 选择 | 理由 |
|------|------|------|
| 语言/框架 | Python FastAPI（模块化） | 异步、自动文档、生态好 |
| API风格 | REST + SSE（流式） | 标准接口 + 流式回答 |
| 缓存 | Redis | 问题缓存、会话管理 |
| 部署 | Docker + Docker Compose | 本地开发 + 生产环境 |

### 数据层

| 选项 | 选择 | 理由 |
|------|------|------|
| 全文检索 | Elasticsearch 8.x | 中文分词、高亮 |
| 向量检索 | Milvus / Qdrant | 语义搜索 |
| 关系数据 | PostgreSQL 15 | 用户数据、关系查询 |
| 知识库存储 | Git + 文件系统 | 版本控制、人类可读 |

### LLM

| 选项 | 选择 | 理由 |
|------|------|------|
| 模型 | Claude 3.5 Sonnet | 中文好、引用严谨 |
| 备选 | GPT-4o | 性价比、生态 |
| 调用方式 | 官方SDK + 自定义封装 | 流式、重试、降级 |

### 部署

| 选项 | 选择 | 理由 |
|------|------|------|
| 容器化 | Docker + Docker Compose | 本地开发 |
| 生产 | Kubernetes (GKE/ACK) | 自动扩缩容 |
| CI/CD | GitHub Actions | 代码质量 + 知识库更新管道 |

---

## 5. Commercial 接口规范

### 5.1 查询接口

```yaml
POST /api/v1/query
描述: 知识库问答
请求体:
  question: string    # 用户问题
  subject: string     # 学科: math|english|politics
  stream: boolean     # 是否流式，默认true
响应(非流式):
  answer: string      # 回答内容
  sources:
    - file: string    # 来源文件名
      title: string   # 来源概念标题
      anchor: string  # L1锚点ID
  related_exercises:
    - id: string
      title: string
响应(流式):
  使用 Server-Sent Events (SSE)
  data: {"type": "chunk", "content": "..."}
  data: {"type": "sources", "sources": [...]}
  data: {"type": "done"}
```

### 5.2 概念浏览接口

```yaml
GET /api/v1/concepts?subject=math
描述: 获取概念树
响应:
  tree:
    - id: string
      title: string
      children: [...]

GET /api/v1/concept/{id}
描述: 获取单个概念详情
响应:
  id: string
  title: string
  content: string       # Markdown
  sources: [...]
  exercises: [...]
```

---

## 6. Commercial 数据流

```
用户提问
  → Nginx API网关（限流、认证）
  → FastAPI /query 路由
  → SearchService.search(question, subject)
      → Elasticsearch（关键词检索）
      → Milvus（语义检索）
      → 混合排序（RRF算法）
  → LLMService.answer(question, context)
      → 检查Redis缓存
      → 调用Claude API（流式）
      → 返回SSE流
  → 记录查询日志到PostgreSQL
```

---

## 7. Commercial 部署架构

```
生产环境:
┌──────────────────────────────────┐
│            CDN (静态资源)          │
└──────────────┬───────────────────┘
               │
┌──────────────▼───────────────────┐
│    Kubernetes Cluster             │
│  ┌──────────┐  ┌──────────┐      │
│  │Frontend  │  │Frontend  │ 副本  │
│  │Pod       │  │Pod       │      │
│  └──────────┘  └──────────┘      │
│  ┌──────────┐  ┌──────────┐      │
│  │API Pod   │  │API Pod   │ 副本  │
│  └──────────┘  └──────────┘      │
│  ┌──────────┐  ┌──────────┐      │
│  │ES        │  │Redis     │      │
│  └──────────┘  └──────────┘      │
│  ┌──────────┐  ┌──────────┐      │
│  │Milvus    │  │Postgres  │      │
│  └──────────┘  └──────────┘      │
└──────────────────────────────────┘
```

---

## 8. 架构对比

| 维度 | MVP | Commercial |
|------|-----|------------|
| 前端 | 单页HTML | Next.js |
| 后端 | 单FastAPI文件 | 模块化FastAPI |
| 数据库 | 无（文件系统） | PostgreSQL + Redis |
| 检索 | glob + 关键词 | ES + Milvus |
| 知识库 | 20-30个MD | N个MD |
| 学科 | 数学 | 数学+英语+政治 |
| 用户系统 | 无 | 微信/手机登录 |
| 部署 | 单服务器 | K8s集群 |
| 开发周期 | 3-4周 | 6-8周 |

---

*技术规格制定：2026-05-09*  
*MVP 验证通过后启动 Commercial 规划*