# 考研知识库问答系统 · Code Wiki

> **项目定位**：基于 LLM + 自建分层知识库的考研智能学习助手。面向考研学生，提供问答、概念浏览、学习诊断、错题管理、个性化计划、AI 辅导、模考与学习数据看板等端到端功能。
>
> **代码仓库位置**：`/workspace`
> **最新版本状态**：后端 + 前端 + 测试 + 部署全链路打通，数学 L3 完成，数据结构/组成原理/网络/操作系统 L3 进行中。

---

## 一、项目总览与架构

### 1.1 产品目标

| 维度 | 内容 |
|------|------|
| 核心功能 | 智能问答（流式）、概念查阅（分章）、学习诊断、错题本、个性化学习计划、AI 辅导、模考、学习数据看板 |
| 目标用户 | 考研备考学生（数学 + 专业课 408） |
| 知识来源 | 自建分层知识库（Markdown + YAML Frontmatter） |
| 交互方式 | 对话式问答 + 结构化页面 + 数据可视化 |

### 1.2 技术选型

| 层次 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 前端 | Next.js（App Router） + TypeScript | 16.x | SSR/静态混合，`basePath: /kaoyan` |
| 前端样式 | Tailwind CSS | 4.x | 原子化 CSS，深色模式 |
| 公式渲染 | KaTeX | 0.16.x | 客户端 LaTeX 公式渲染 |
| 前端路由 | Next.js App Router | — | `/kaoyan` 前缀 |
| 前端测试 | Vitest + @testing-library/react | — | 组件单元测试 |
| 后端 | FastAPI + Uvicorn | Python 3.12 | 异步 + SSE 流式响应 |
| 后端数据 | 文件系统（Markdown） + SQLAlchemy + PostgreSQL（可选） | asyncpg 异步连接 | 用户数据/诊断/错题/计划存在数据库，知识库读文件 |
| AI 服务 | 兼容 OpenAI Chat Completions API 的 LLM 供应商 | 流式调用 | 未配置 Key 时进入 Mock 模式 |
| 部署 | Docker + Nginx 反向代理 | — | 三容器：frontend / backend / db（可选），Nginx 统一入口 |
| CI | GitHub Actions | — | 后端 pytest + 前端 lint/build |
| E2E（预置） | Playwright | — | 位于 `/workspace/e2e/` |

### 1.3 整体架构

```
┌──────────────────────────────────────────────────────────────┐
│                            用户浏览器                           │
│  https://host/kaoyan          https://host/kaoyan/api/*       │
└────────────────────┬──────────────────────┬──────────────────┘
                     │                      │
                     ▼                      ▼
            ┌─────────────────────────────────────────┐
            │           Nginx (端口 80)              │
            │  /kaoyan → frontend:3003              │
            │  /api   → backend:8090                │
            │  / → 301 /kaoyan                      │
            └────────────┬────────────┬──────────────┘
                         │            │
        ┌────────────────▼──┐   ┌─────▼────────────────────┐
        │   Frontend (Next) │   │   Backend (FastAPI)      │
        │   - 页面渲染       │   │  - 路由层 main.py        │
        │   - 对话 UI        │   │  - 知识库 wiki_retriever │
        │   - 概念树         │   │  - LLM 调用 llm.py       │
        │   - 数据看板       │   │  - 业务模块               │
        └────────────────────┘   │  auth/diagnosis          │
                                  │  error_book/planner      │
                                  │  tutor/exam/stats        │
                                  │  database/rate_limiter   │
                                  └──────────┬───────────────┘
                                             │
                    ┌────────────────────────┼──────────────────┐
                    ▼                        ▼                  ▼
         ┌──────────────────┐    ┌─────────────────────┐  ┌──────────────┐
         │  PostgreSQL(可选) │    │ Wiki 知识库(文件系统) │  │  LLM API      │
         │  用户/诊断/错题     │    │ wiki/{subject}/L3/*  │  │  真实/ Mock   │
         │  计划/模考记录     │    │  wiki/WIKI_SCHEMA.md  │  │              │
         └──────────────────┘    └─────────────────────┘  └──────────────┘
```

### 1.4 目录结构

```
/workspace
├── backend/                       # FastAPI 后端（模块化）
│   ├── main.py                    # 应用入口、路由注册、中间件、错误处理
│   ├── config.py                  # 配置（环境变量、知识库路径、LLM 配置）
│   ├── wiki_retriever.py          # 知识库检索、文件缓存、相关性评分
│   ├── llm.py                     # LLM 调用封装（Mock/真实，流式）
│   ├── database.py                # SQLAlchemy 模型 + 异步连接
│   ├── auth.py                    # JWT 注册/登录/鉴权
│   ├── diagnosis.py               # 学习诊断（出题→提交→报告）
│   ├── error_book.py              # 错题本（增删查/艾宾浩斯复习/相似题推荐）
│   ├── planner.py                 # 个性化学习计划生成/任务管理
│   ├── tutor.py                   # AI 引导式辅导（提示先行/完整解答）
│   ├── exam.py                    # 模考（生成/提交/章节统计/历史）
│   ├── stats.py                   # 数据看板/雷达图/趋势数据
│   ├── exceptions.py              # 自定义异常类（继承 KaoyanError）
│   ├── rate_limiter.py            # IP 级滑动窗口限流
│   ├── logging_config.py          # 日志单例
│   ├── Dockerfile                 # 后端镜像（python:3.12-slim 多阶段）
│   ├── Dockerfile.dev
│   ├── requirements.txt
│   ├── .env.example
│   └── tests/                     # pytest 测试套件（~12 个文件）
│
├── frontend/                      # Next.js 16 前端
│   ├── src/app/
│   │   ├── layout.tsx             # 全局 Layout（KaTeX CDN 注入）
│   │   ├── page.tsx               # 问答页（首页）
│   │   ├── client-layout.tsx      # 客户端布局外壳（含 AuthProvider）
│   │   ├── concepts/              # 概念浏览页
│   │   ├── diagnosis/             # 诊断页
│   │   ├── error-book/            # 错题本页
│   │   ├── plan/                  # 学习计划页
│   │   ├── tutor/                 # AI 辅导页
│   │   ├── exam/                  # 模考页
│   │   ├── dashboard/             # 数据看板页
│   │   ├── login/                 # 登录页
│   │   └── api/                   # 前端 API 代理（转发到后端 8090）
│   │       ├── chat/route.ts
│   │       ├── chat/stream/route.ts
│   │       ├── concepts/[subject]/route.ts
│   │       ├── concepts/[subject]/[concept_id]/route.ts
│   │       ├── concepts/[subject]/[concept_id]/exercises/route.ts
│   │       ├── exercises/[subject]/route.ts
│   │       ├── subjects/route.ts
│   │       └── [...path]/route.ts   # 其余 auth/diagnosis/error-book 等统一 catch-all
│   ├── src/components/            # 可复用组件
│   │   ├── AppNav.tsx             # 顶部导航
│   │   ├── ChatInterface.tsx      # 问答面板（流式+学科切换）
│   │   ├── ConceptTree.tsx        # 概念树（分章+搜索+展开折叠）
│   │   ├── ConceptDetail.tsx      # 概念详情（Markdown 渲染+相关习题）
│   │   ├── ConceptAnswerPanel.tsx # 概念问答面板
│   │   └── MessageBubble.tsx      # 消息气泡（KaTeX 渲染）
│   ├── src/lib/
│   │   ├── api.ts                 # 所有前后端通信函数 + 类型定义
│   │   ├── auth-context.tsx       # AuthProvider + useAuth Hook
│   │   ├── concept-utils.ts       # 概念数据处理工具
│   │   └── render-md.ts           # Markdown + KaTeX 渲染器
│   ├── src/test/                  # Vitest 前端测试（9 文件，38+ 用例）
│   ├── Dockerfile / Dockerfile.dev
│   ├── next.config.ts             # basePath=/kaoyan，output=standalone
│   ├── package.json
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   └── eslint.config.mjs
│
├── wiki/                          # 分层知识库（核心资产）
│   ├── WIKI_SCHEMA.md             # 总宪法（L1/L2/L3 定义、锚点 ID）
│   ├── WIKI_AGENT.md              # 通用 AI 行为约束
│   ├── math/                      # 数学（已完成，L3 文件齐全）
│   │   ├── SCHEMA.md
│   │   ├── AGENT.md
│   │   ├── INDEX.yaml
│   │   ├── RAW/                   # L1 原始材料（按章分文件）
│   │   ├── L3/                    # concepts/ methods/ exercises/
│   │   ├── TEMPLATES/
│   │   └── _meta/concept_map.yaml
│   ├── ds/                        # 数据结构（L3 已完成）
│   ├── arch/                      # 计算机组成原理（RAW 就绪，L3 编译中）
│   ├── net/                       # 计算机网络（RAW 就绪，L3 编译中）
│   ├── os/                        # 操作系统（L3 已完成）
│   └── english/                   # 英语（SCHEMA + INDEX 占位）
│
├── e2e/                           # Playwright 浏览器测试
│   ├── core-flows.spec.ts         # 核心流程测试脚本
│   └── playwright.config.ts
│
├── nginx/                         # 反向代理配置
│   ├── nginx.conf                 # 生产配置（静态缓存 + 流式透传）
│   └── nginx.dev.conf             # 开发配置
│
├── docs/                          # 设计与规格文档
│   ├── 01-requirements.md
│   ├── 02-tech-spec.md
│   ├── 03-architecture.md
│   ├── 04-modules.md
│   ├── 05-agent-rules.md
│   ├── 06-spec-prompts.md
│   ├── 07-plan.md
│   ├── 08-midterm-goals.md
│   ├── 09-wiki-spec.md
│   ├── api-contracts.md
│   ├── testing-strategy.md
│   └── SPEC.md
│
├── scripts/
│   ├── check_integrity.py         # 知识库完整性检查（make check-integrity）
│   └── check_coverage.py
│
├── .github/workflows/ci.yml       # CI 流水线
├── docker-compose.yml             # 三容器编排（db + backend + frontend + nginx）
├── Makefile                       # 常用命令快捷入口
└── README.md
```

---

## 二、后端模块详解

后端位于 [backend/](file:///workspace/backend)，采用 FastAPI 模块化设计。`main.py` 负责装配所有路由，各功能模块独立实现。

### 2.1 main.py — 应用入口与路由装配

**文件**：[backend/main.py](file:///workspace/backend/main.py)

**核心职责**：
- 初始化 FastAPI 应用，配置 CORS（允许所有来源，便于前后端分离部署）。
- 挂载请求日志中间件，统一捕获客户端 IP / UA。
- 注册统一异常处理器 `KaoyanError`，并兜底 `Exception` 防止泄漏敏感信息。
- 挂载启动事件：初始化数据库 + 输出 LLM 连接状态或 Mock 提示。
- **包含的核心路由**（见文件内路由函数）：

| 方法 | 路径 | 功能 |
|------|------|------|
| GET | `/health` | 健康检查（带限流） |
| GET | `/subjects` | 获取可用学科列表 |
| GET | `/concepts/{subject}` | 获取学科的概念列表（按章分组） |
| GET | `/concepts/{subject}/{concept_id}` | 获取概念详情 |
| GET | `/concepts/{subject}/{concept_id}/exercises` | 获取该概念相关习题 |
| GET | `/exercises/{subject}` | 获取学科所有习题（按难度） |
| POST | `/chat` | 非流式问答（`ChatRequest → ChatResponse`） |
| POST | `/chat/stream` | SSE 流式问答（`data: {...}\n\n`） |

**数据模型**：
- `ChatRequest`：`message: str` + `subject: Optional[str]`，message 含最大长度 1000 字、非法 HTML 关键字防御。
- `ChatResponse`：`answer: str` + `sources: List[str]`。

**设计要点**：
- 流式响应会在每个 chunk 前先推送一次 `sources`，用于前端显示参考来源；结尾推送 `done` 事件。
- 每个端点都包裹 `rate_limiter.check(client_ip)`。

### 2.2 config.py — 全局配置

**文件**：[backend/config.py](file:///workspace/backend/config.py)

```python
WIKI_PATH = "/root/kaoyan/wiki"          # 知识库根路径（Docker 中挂载）
LLM_API_KEY = os.getenv("LLM_API_KEY", "")
LLM_BASE_URL = os.getenv("LLM_BASE_URL", "https://api.openai.com/v1")
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4o-mini")
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://...")
JWT_SECRET / JWT_ALGORITHM / JWT_EXPIRE_MINUTES
SUBJECTS = ["math", "english", "politics", "ds", "arch", "net", "os"]
MOCK_MODE = not bool(LLM_API_KEY)       # 无 Key 时自动进入 Mock
```

> 环境变量来源：`.env`（由 `dotenv` 加载）或容器环境。

### 2.3 wiki_retriever.py — 知识库检索引擎

**文件**：[backend/wiki_retriever.py](file:///workspace/backend/wiki_retriever.py)

**核心能力**：

| 函数 | 功能 | 关键实现 |
|------|------|----------|
| `get_subjects()` | 扫描 `WIKI_PATH` 下存在 `SCHEMA.md` 的目录；无则回退到 `SUBJECTS` 常量 | 目录遍历 + 文件存在性 |
| `list_concepts(subject)` | 返回该学科 L3 中 `type=concept` 的条目列表（id/title/tags/related） | 解析 L3 所有 md 的 YAML Frontmatter |
| `get_concept_detail(subject, id)` | 返回单概念完整正文（Markdown 原文） | 按文件名匹配 id |
| `get_related_exercises(subject, id)` | 匹配 exercises 中相关题目（基于 tags 交集 + 关键词匹配） | 评分：`tag_match * 10 + chapter_match * 2 + keyword_match` |
| `retrieve_knowledge(query, subject)` | 对话上下文检索。遍历 L3 文件计算相关性，截取 top-3 作为上下文 | 中文 n-gram + YAML tags 加权评分，阈值 30 |
| `_parse_frontmatter(content)` | 解析 `---\nYAML\n---` 形式元数据 | 简单 split + PyYAML 安全解析 |

**缓存机制**：
- **FILE 缓存**：LRU + TTL 60s，容量 200 文件，避免频繁 IO。
- **L3 缓存**：按学科维度缓存 `(files_list, mtime_or_now)`。`mtime` 刷新时自动失效，并同步清除对应 FILE 缓存条目。容量 32 学科。

**相关性评分算法**（`_score_relevance`）：
1. 标题精确包含查询 → 100 分；正文精确包含 → 90 分。
2. 否则拆词为 tokens，提取 n-gram（2-4 字）扩大命中覆盖。
3. 加权：`title_match * 25 + tag_match * 10 + content_match * 5 + 覆盖率加分`。
4. 阈值 ≥30 进入结果集。

### 2.4 llm.py — 大模型调用封装

**文件**：[backend/llm.py](file:///workspace/backend/llm.py)

**双模式设计**：

| 模式 | 触发条件 | 行为 |
|------|---------|------|
| Mock | `LLM_API_KEY` 为空或缺失 | 返回检索到的知识库原文（或"知识库未找到"提示） |
| 真实 | 配置了 API Key | 调用 `{LLM_BASE_URL}/chat/completions`，流式/非流式 |

**关键数据结构**：
- `_build_prompt(context, question)`：拼装 `system + user` 两条消息，明确要求"仅基于知识库回答 + 中文 + LaTeX 公式"。
- `trim_context`：粗略 token 估计，中文字符 = 1 token、其他字符/2，超过上限截断并追加提示。

**API 调用流程**：

```
POST {LLM_BASE_URL}/chat/completions
Headers: Authorization: Bearer {LLM_API_KEY}
Body:    { model, messages, temperature=0.7, max_tokens=2000, (stream=true) }
```

- 同步调用：`_call_llm_sync` → 完整 `choices[0].message.content`。
- 异步流式：`_call_llm_stream` → 循环解析 `data: {...}` JSON chunks，逐 token yield。
- 错误处理：`401`、`429`、超时、网络错误均有中文友好提示；真实模式调用失败时**不会**回退到 Mock（只提示错误）。
- `_strip_think_tags`：剥离 `<think>…</think>` 推理文本，避免将模型内部推理展示给用户。

### 2.5 database.py — 数据模型与连接

**文件**：[backend/database.py](file:///workspace/backend/database.py)

**连接方式**：`create_async_engine(DATABASE_URL)` + `async_sessionmaker`，所有会话异步。

**表模型**（均继承自 `DeclarativeBase`）：

| 表名 | 实体 | 关键字段 | 用途 |
|------|------|---------|------|
| `users` | `User` | `id`, `phone`, `email`, `name`, `password_hash`, `role`, `created_at` | 注册用户（phone 唯一） |
| `diagnoses` | `Diagnosis` | `user_id`, `subject`, `score`, `correct_questions`, `weak_points(JSON)`, `report_text`, `created_at` | 诊断/模考记录（共用） |
| `error_books` | `ErrorBook` | `user_id`, `question_text`, `correct_answer`, `knowledge_point`, `error_type`, `review_interval`, `review_count`, `next_review_at`, `is_mastered` | 错题条目与复习调度 |
| `plans` | `Plan` | `user_id`, `subject`, `phase`, `target_score`, `daily_minutes`, `is_active` | 学习计划 |
| `plan_tasks` | `PlanTask` | `plan_id`, `task_type`, `knowledge_point`, `wiki_page_slug`, `estimated_minutes`, `is_completed`, `scheduled_date` | 计划任务（1 plan ↔ N tasks） |

### 2.6 auth.py — JWT 鉴权

**文件**：[backend/auth.py](file:///workspace/backend/auth.py)

**路由**（前缀 `/auth`）：

| 方法 | 路径 | 功能 |
|------|------|------|
| POST | `/auth/register` | 手机号 + 密码注册 → 返回 `{access_token, user_id}` |
| POST | `/auth/login` | 登录 → 返回同上 |
| GET | `/auth/me` | 需 Bearer Token → 返回当前用户信息 |

**密码**：`passlib[bcrypt]` 哈希；**Token**：`python-jose` + HS256，`sub=user_id`，默认有效期 7 天。

**依赖函数**：
- `get_current_user(credentials, session)`：用于需要登录的业务模块（诊断/错题/计划/辅导/模考/stats）。
- `get_optional_user(...)`：允许未登录访问但能识别用户（如 `tutor`）。

### 2.7 diagnosis.py — 学习诊断

**文件**：[backend/diagnosis.py](file:///workspace/backend/diagnosis.py)

**流程**：
1. 前端调 `POST /diagnosis/start`，后端根据学科知识库动态生成 `N` 道题（title → "简述 X 的核心概念"），保存空诊断记录。
2. 学生作答后 `POST /diagnosis/submit` 提交答案列表。
3. 评分：选择题完全匹配；开放题基于关键词交集（Mock 规则）或后续接入 LLM 评分（`_llm_grade` 已留接口）。
4. 薄弱点分析：按错题的 `knowledge_point` 聚合，写入 `weak_points(JSON)`。
5. 报告生成：`_generate_report` 按分数段 + 薄弱点生成 Markdown。
6. 做错的题目自动写入 `error_books` 表，进入错题复习循环。

**返回数据**：诊断 ID、score、正确数、weak_points 列表、report 文本。

### 2.8 error_book.py — 错题本与艾宾浩斯复习

**文件**：[backend/error_book.py](file:///workspace/backend/error_book.py)

**路由**：

| 方法 | 路径 | 功能 |
|------|------|------|
| GET | `/error-book/list` | 按学科/错误类型筛选，按下次复习时间排序 |
| GET | `/error-book/due-today` | 取出 `next_review_at ≤ now` 且未掌握的题目 |
| POST | `/error-book/review` | 提交一次复习结果（对/错）→ 更新间隔/计数/掌握状态 |
| GET | `/error-book/{id}/similar` | 从知识库反查相似习题（跨学科） |

**复习调度**：艾宾浩斯间隔序列 `[1, 2, 4, 7, 15]` 天。答对时推进一级；答错则重置回 1 天；连续答对 3 次 → `is_mastered=true`，停止调度。

**错误类型**：`concept / calculation / comprehension / method`，由 `_classify_error` 根据答案特征自动分类。

### 2.9 planner.py — 个性化学习计划

**文件**：[backend/planner.py](file:///workspace/backend/planner.py)

**路由**：

| 方法 | 路径 | 功能 |
|------|------|------|
| POST | `/plan/generate` | 基于学科+目标分数+日学时，生成计划；自动停用旧计划；phase 由最近一次诊断分数推导（≥80→冲刺，≥60→强化，其余→基础） |
| GET | `/plan/active` | 获取当前活跃计划 + 任务列表 + 完成百分比 |
| GET | `/plan/today` | 返回今日（按 scheduled_date 匹配）的未完成任务 |
| POST | `/plan/tasks/update` | 修改任务完成状态 |

**任务生成规则**：
- 从 `wiki_retriever.list_concepts` 拿到所有概念/方法/习题条目。
- 按 `daily_minutes` 换算每天 `daily_task_count = daily_minutes // 30` 个任务。
- 按顺序排期，预计总任务上限 50。
- 每个任务：`type=study|practice|...`、`knowledge_point=title`、`wiki_page_slug=id`、`estimated_minutes=30`。

### 2.10 tutor.py — AI 引导式辅导

**文件**：[backend/tutor.py](file:///workspace/backend/tutor.py)

**路由**：`POST /tutor/chat`

**交互模式**：
- 默认：`HINT_PROMPT`，AI 先给提示思路，不直接给答案；结合学生近期错题（未登录则仅用知识库）。
- `show_solution=true`：改用 `SOLUTION_PROMPT`，给出完整解题步骤。

**系统提示拼装**：`system prompt + 错题上下文 + 对话历史 + 知识库上下文 + 用户问题`，交由 LLM 统一推理。Mock 模式下由模板直接返回中文提示/解析。

### 2.11 exam.py — 模考

**文件**：[backend/exam.py](file:///workspace/backend/exam.py)

**路由**：

| 方法 | 路径 | 功能 |
|------|------|------|
| POST | `/exam/generate` | 按学科随机抽取章节分布均匀的 `N` 道题（choice/fill 混合），难度根据 phase 映射 |
| POST | `/exam/submit` | 提交答案，逐章统计正确数，计算总分，对比上一次考试输出提升 |
| GET | `/exam/history` | 用户历史考试列表（按创建时间倒序，limit 可配） |
| GET | `/exam/{id}/report` | 单场报告（含章节正确数与提升对比） |

**章节分配策略**（`_generate_exam_questions`）：
1. 读取 `SUBJECT_CHAPTERS[subject]` 获取该学科章节。
2. 每章均匀分配题目数。
3. 按章节 `tags` 从知识库概念匹配题目。
4. 打乱最终顺序返回。

### 2.12 stats.py — 数据看板数据源

**文件**：[backend/stats.py](file:///workspace/backend/stats.py)

**路由**：

| 方法 | 路径 | 功能 |
|------|------|------|
| GET | `/stats/dashboard` | 总览：诊断次数、平均分、错题总数、已掌握数、活跃计划、今日待办任务数 |
| GET | `/stats/radar?subject=math` | 知识雷达：按章节聚合近 5 次诊断正确率 |
| GET | `/stats/trend?subject=math` | 分数趋势：按日期输出历次诊断的分数曲线数据（前端用于 recharts 折线图） |

**实现依赖**：纯 SQLAlchemy 聚合查询（`func.count`、`func.avg`、时间窗口筛选），无缓存（MVP 阶段）。

### 2.13 exceptions.py / rate_limiter.py / logging_config.py

- **exceptions.py**：`KaoyanError`（基类，含 `message / status_code / detail`）+ `SubjectNotFoundError`、`InvalidInputError`、`LLMServiceError`、`RateLimitError`。
- **rate_limiter.py**：`RateLimiter(max_requests=60, window=60)`，按 `client_ip` 维护时间戳列表；超阈值抛 `RateLimitError` → HTTP 429。
- **logging_config.py**：`get_logger()` 单例，stdout 输出，INFO 以上，`asctime | level | message`。

### 2.14 tests/ — 后端测试

**位置**：[backend/tests/](file:///workspace/backend/tests)，使用 pytest。

| 文件 | 覆盖范围 |
|------|---------|
| `test_main.py` | 根路径、健康检查、subjects、chat 非/流式、异常输入 |
| `test_auth.py` | 注册/登录/me 循环、重复注册、无效 token |
| `test_wiki_retriever.py` | 学科扫描、概念列表、概念详情、相关性评分边界 |
| `test_llm.py` | Mock 模式下响应、prompt 组装、上下文截断、流式 chunk |
| `test_diagnosis.py` | 开始诊断、提交评分、薄弱点聚合、错误题目写入 error_book |
| `test_error_book.py` | 列表/筛选、due-today、复习后 interval 推进、similar lookup |
| `test_planner.py` | 计划生成、旧计划停用、任务完成更新 |
| `test_tutor.py` | 提示模式 vs 解答模式；用户错题上下文注入 |
| `test_exam.py` | 出题分布、提交评分、章节聚合、历史回溯 |
| `test_rate_limiter.py` | 阈值行为、窗口重置、多客户端互不影响 |
| `test_exceptions.py` | 异常类字段 / handler 映射 |

> CI 触发命令：`python -m pytest backend/tests/ -v`（见 `Makefile` 中 `test-backend`）。

---

## 三、前端模块详解

前端位于 [frontend/](file:///workspace/frontend)，基于 Next.js 16 + App Router + TypeScript + Tailwind CSS。所有页面挂载在 `/kaoyan/*`（由 `next.config.ts` 的 `basePath: '/kaoyan'` 控制）。

### 3.1 路由与页面

| 路径 | 页面文件 | 功能 | 登录要求 |
|------|---------|------|---------|
| `/kaoyan` | `src/app/page.tsx` | 问答首页（ChatInterface） | 否 |
| `/kaoyan/concepts` | `src/app/concepts/page.tsx` | 概念浏览（左侧 ConceptTree + 右侧 ConceptDetail） | 否 |
| `/kaoyan/diagnosis` | `src/app/diagnosis/page.tsx` | 诊断 → 作答 → 报告 | 是 |
| `/kaoyan/exam` | `src/app/exam/page.tsx` | 模考（倒计时、交卷、章节统计） | 是 |
| `/kaoyan/error-book` | `src/app/error-book/page.tsx` | 错题本（筛选/复习/相似推荐） | 是 |
| `/kaoyan/plan` | `src/app/plan/page.tsx` | 学习计划（生成 / 任务勾选 / 今日任务） | 是 |
| `/kaoyan/tutor` | `src/app/tutor/page.tsx` | AI 辅导（提示模式/完整解答切换） | 可选 |
| `/kaoyan/dashboard` | `src/app/dashboard/page.tsx` | 学习数据看板（recharts 雷达/折线） | 是 |
| `/kaoyan/login` | `src/app/login/page.tsx` | 注册/登录 Tab 切换 | 否 |

### 3.2 页面通信层 — src/lib/api.ts

**文件**：[frontend/src/lib/api.ts](file:///workspace/frontend/src/lib/api.ts)

**设计要点**：
- 所有请求发往 `/kaoyan/api/*`（由 `src/app/api/[...path]/route.ts` 代理到后端）。
- 函数式封装 + TypeScript 接口：`fetchConceptGroups`、`fetchConceptDetail`、`fetchRelatedExercises`、`sendChatMessageStream`、`register`、`login`、`fetchMe`、`startDiagnosis` / `submitDiagnosis` / `fetchDiagnosisHistory`、`fetchErrorList` / `fetchDueErrors` / `reviewError` / `fetchSimilarExercises`、`generatePlan` / `fetchActivePlan` / `fetchTodayTasks` / `updateTask`、`tutorChat`。

**流式问答实现**（`sendChatMessageStream`）：
1. `POST /kaoyan/api/chat/stream` 得到 ReadableStream。
2. 按 `\n` 拆行，解析 `data: {...}` JSON → 回调 `onChunk(text)` 逐 token 追加到 UI。
3. 第一个事件通常携带 `sources`，前端存储以便在消息气泡下方展示"参考来源"。
4. 超时 30s；HTTP 429 映射为"请求过于频繁"，非 2xx 走 `onError` 分支。

### 3.3 鉴权上下文 — src/lib/auth-context.tsx

**文件**：[frontend/src/lib/auth-context.tsx](file:///workspace/frontend/src/lib/auth-context.tsx)

- `AuthProvider` 组件：初始化读取 `localStorage['kaoyan_token']` → `fetchMe` 校验有效。
- Hook：`const { user, token, login, register, logout, isLoading } = useAuth();`
- 所有 `api.ts` 函数在需要时读取本地 token 或通过参数传入（后端路由最终用 `Authorization: Bearer <token>`）。

### 3.4 核心组件

| 组件 | 文件 | 职责 |
|------|------|------|
| `AppNav` | [components/AppNav.tsx](file:///workspace/frontend/src/components/AppNav.tsx) | 顶部导航，依据 `useAuth` 显示登录/登出按钮，路径高亮 |
| `ChatInterface` | [components/ChatInterface.tsx](file:///workspace/frontend/src/components/ChatInterface.tsx) | 问答主面板：学科切换、流式消息、错误态重试、"思考中"加载动画 |
| `ConceptTree` | [components/ConceptTree.tsx](file:///workspace/frontend/src/components/ConceptTree.tsx) | 概念树，按章节分组，支持展开折叠与关键词搜索 |
| `ConceptDetail` | [components/ConceptDetail.tsx](file:///workspace/frontend/src/components/ConceptDetail.tsx) | 展示概念正文（Markdown + KaTeX）、标签、来源锚点、相关习题列表 |
| `ConceptAnswerPanel` | [components/ConceptAnswerPanel.tsx](file:///workspace/frontend/src/components/ConceptAnswerPanel.tsx) | 概念详情页内的小问答面板 |
| `MessageBubble` | [components/MessageBubble.tsx](file:///workspace/frontend/src/components/MessageBubble.tsx) | 用户/助手消息气泡（样式不同），含 LaTeX 公式 |

### 3.5 Markdown + 公式渲染 — src/lib/render-md.ts

**文件**：`src/lib/render-md.ts`（前端内部实现）

- 使用 KaTeX（通过 CDN 注入，见 `layout.tsx` 的 `<link>`）。
- 识别行内 `$...$` 与块级 `$$...$$`，在安全的白名单 HTML 标签中渲染。
- 对代码块、列表、表格等基础 Markdown 语法做轻量解析；非信任 HTML 默认转义。

### 3.6 前端 API 代理 — src/app/api/[...path]/route.ts

**作用**：将 `/kaoyan/api/{path}` 的请求转发到 `http://backend:8090/{path}`（开发时通过环境变量配置），实现：
- 跨域回避（浏览器直接访问同域）。
- 统一携带 `Authorization` header。
- 流式透传（SSE 的 `Transfer-Encoding: chunked` 由后端→前端→浏览器保持）。

其他专用 route 文件（`chat/route.ts`、`chat/stream/route.ts`、`concepts/**`、`exercises/**`、`subjects/route.ts`）为早期实现的显式路由，当前与 catch-all 并存，提供显式结构。

### 3.7 前端测试 — src/test/

Vitest + @testing-library/react + jsdom，覆盖：`AppNav`、`ChatInterface`、`MessageBubble`、`DashboardPage`、`DiagnosisPage`、`ErrorBookPage`、`ExamPage`、`PlanPage`、`TutorPage`。

**Mock 策略**：`setup.ts` 中 mock Next.js Router、`fetch`、`lucide-react`、`recharts` 等 Node 环境不存在的依赖。

**执行命令**：`make test-frontend` → `cd frontend && npx vitest run`。

---

## 四、知识库体系（Wiki Knowledge Base）

知识库位于 [wiki/](file:///workspace/wiki)。它是整个系统的"真实之源"——AI 问答、概念浏览、习题练习、诊断出题，全部来源于此。

### 4.1 通用规范 — WIKI_SCHEMA.md

**文件**：[wiki/WIKI_SCHEMA.md](file:///workspace/wiki/WIKI_SCHEMA.md)

**核心定义**：

- **L1（Raw）**：原始材料，按教材章节分文件，只读、永不删除。
- **L2（Index）**：`INDEX.yaml`，记录 L1 内容的索引 + 概念关系，可追加。
- **L3（Generated）**：应用级最终文档，一概念一文件，可修改、可扩展。

**锚点 ID 规则**（永久不变）：
- L1：`RAW-{subject}-{来源}-P{页码}-C{序号}`，例 `RAW-math-同济高数上-P023-C07`。
- L2：`INDEX-{subject}-{类型}-{概念标识}`。
- L3：`L3-{subject}-{类型}-{文件名}`。

**扩展与不可变**：可新增学科（如 `physics`）、可在 L3 下新增子目录（如 `summary/`），但**不得**改变层数量、锚点 ID 格式、多源冲突处理原则。

### 4.2 学科目录结构

```
wiki/{subject}/
├── SCHEMA.md        # Domain 宪法（学科范围、页面类型、分块规则、命名规范）
├── AGENT.md         # Domain AI 行为约束
├── INDEX.yaml       # L2 索引（YAML，含概念-章节映射）
├── RAW/             # L1 原始材料（可能按章多文件）
│   ├── 1 绪论.md
│   ├── 2 线性表.md
│   └── ...
├── L3/              # L3 应用文档（按类型分子目录）
│   ├── concepts/
│   │   ├── 极限的概念与性质.md
│   │   └── ...
│   ├── methods/
│   └── exercises/
├── TEMPLATES/       # concept_template.md / method_template.md / exercise_template.md
└── _meta/
    └── concept_map.yaml   # 标准概念词表（用于跨模块一致性）
```

### 4.3 L3 文件格式

每个 L3 文件以 YAML Frontmatter 开头：

```yaml
---
id: "L3-math-concept-极限的概念与性质"
title: "极限的概念与性质"
type: "concept"              # concept / method / exercise
tags: ["高等数学", "极限", "连续性"]
difficulty: "中等"           # 简单 / 中等 / 困难
related: ["L3-math-concept-函数极限", "L3-math-method-洛必达法则"]
source_anchors: ["RAW-math-同济高数上-P023-C07"]
searchable: true
---
正文（Markdown + LaTeX）...
```

**关键字段**：
- `type`：决定该文件在 `list_concepts` / `get_related_exercises` / ... 中被哪类索引命中。
- `tags`：后端据此做章节分组（前端 `ConceptTree`）与习题关联。
- `source_anchors`：追溯该概念对应的 L1 原始材料段落，是"可溯源性"的核心机制。

### 4.4 当前学科覆盖状态

| 学科 | 目录 | L1 原始材料 | L3 应用文档 | 进度 |
|------|------|------------|------------|------|
| 数学 | `wiki/math/` | ✅ 按章齐备 | ✅ concepts/methods/exercises 齐全 | 已完成 |
| 数据结构 | `wiki/ds/` | ✅ | ✅ L3 完成 | 已完成 |
| 计算机组成原理 | `wiki/arch/` | ✅ RAW | 编译中 | 进行中 |
| 计算机网络 | `wiki/net/` | ✅ RAW | 编译中 | 进行中 |
| 操作系统 | `wiki/os/` | ✅ | ✅ L3 完成 | 已完成 |
| 英语 | `wiki/english/` | SCHEMA/INDEX | 占位 | 待启动 |
| 政治 | — | — | — | 待启动 |

### 4.5 AI 行为约束 — WIKI_AGENT.md / {subject}/AGENT.md

- **通用**：不编造内容、不输出超出知识库的命题、不替用户判断考试范围、用中文。
- **学科**：数学禁止"跳步"、禁止漏条件；408 专业课需标注章节。

---

## 五、接口契约（API 契约）

### 5.1 问答接口

**POST /api/chat**（非流式）：

```json
{
  "message": "什么是极限的 ε-δ 定义？",
  "subject": "math"
}
→ {
    "answer": "设函数 f(x) 在 x₀ 的某去心邻域内有定义...",
    "sources": ["math/L3/concepts/极限的概念与性质.md", ...]
  }
```

**POST /api/chat/stream**（Server-Sent Events）：

```
data: {"type": "sources", "sources": ["math/L3/..."]}

data: {"type": "chunk", "content": "设"}
data: {"type": "chunk", "content": "函数"}
...
data: {"type": "done"}
```

### 5.2 概念/习题浏览

- `GET /api/subjects` → `{subjects: [...], count}`
- `GET /api/concepts/{subject}` → `{subject, groups: {章节: [概念项]}, count}`
- `GET /api/concepts/{subject}/{id}` → 概念详情（含正文/tags/source_anchors/related）
- `GET /api/concepts/{subject}/{id}/exercises` → `{exercises, count}`
- `GET /api/exercises/{subject}` → 按难度分组的习题总览

### 5.3 认证

- `POST /api/auth/register`：`{phone, password, name}` → `{access_token, token_type, user_id}`
- `POST /api/auth/login`：`{phone, password}` → 同上
- `GET /api/auth/me`：需 `Authorization: Bearer <token>` → `{id, phone, name, role}`

### 5.4 诊断 / 模考 / 错题 / 计划 / 辅导 / 统计

均采用 REST JSON：请求体 JSON，响应 JSON。需要鉴权的接口一律带 `Authorization: Bearer <token>`，否则返回 HTTP 401。

---

## 六、运行与部署

### 6.1 本地开发

**前置条件**：Python 3.12+、Node.js 20+、npm 10+。

```bash
# 安装依赖
make setup
# 或手动：
#   pip install -r backend/requirements.txt
#   npm --prefix frontend install
#   cp backend/.env.example backend/.env   # 按需填入 API Key

# 后端（终端 1）
make dev-backend
# → uvicorn main:app --reload --port 8090

# 前端（终端 2）
make dev-frontend
# → npm run dev -- --port 3003

# 浏览器访问
#   http://localhost:3003/kaoyan
```

> 未配置 `LLM_API_KEY` 时，系统自动进入 Mock 模式，问答/辅导返回知识库原文或模板提示。可用于纯前端联调。

### 6.2 测试

```bash
# 后端
make test-backend     # cd backend && python -m pytest tests/ -v

# 前端
make test-frontend    # cd frontend && npx vitest run

# 全量
make test

# Lint
make lint

# 知识库完整性
make check-integrity  # python3 scripts/check_integrity.py
```

### 6.3 Docker 部署（生产）

根目录 [docker-compose.yml](file:///workspace/docker-compose.yml) 定义 4 个服务：

| 服务 | 镜像 | 端口/暴露 | 挂载 |
|------|------|----------|------|
| `db` | `postgres:16-alpine` | 内部 5432 | 命名卷 `postgres_data` |
| `backend` | `backend/Dockerfile` 构建 | 内部 8090 | `./wiki:/root/kaoyan/wiki:ro`（只读） |
| `frontend` | `frontend/Dockerfile` 构建 | 内部 3003 | — |
| `nginx` | `nginx:alpine` | 宿主 `8080:80` | `./nginx/nginx.conf` |

**一键部署**：
```bash
# 构建并启动
docker-compose up -d --build
# 访问
#   http://<host>:8080/kaoyan      → 前端
#   http://<host>:8080/api/*       → 后端
```

**Nginx 要点**（[nginx/nginx.conf](file:///workspace/nginx/nginx.conf)）：
- `/kaoyan/_next/static` → 一年强缓存 + `Cache-Control: public, immutable`。
- `/kaoyan` → `frontend:3003`，Upgrade 头透传以支持 SSE。
- `/api/` → `backend:8090`，`proxy_buffering off` 保证流式问答。
- 根路径 `301 /kaoyan`。

### 6.4 环境变量

**后端 `.env` 示例**（见 [backend/.env.example](file:///workspace/backend/.env.example)）：

```
LLM_API_KEY=sk-xxxx           # 留空启用 Mock
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o-mini
DATABASE_URL=postgresql+asyncpg://kaoyan:kaoyan_dev@localhost:5433/kaoyan
JWT_SECRET=dev-secret-change-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=10080
```

> Docker 部署中，DATABASE_URL 由 `KAOYAN_DB_URL` 覆盖（见 `docker-compose.yml` 中 `environment`），指向 compose 的 `db` 服务。

### 6.5 CI 流水线

文件：[.github/workflows/ci.yml](file:///workspace/.github/workflows/ci.yml)

| Job | 作用 |
|-----|------|
| `backend` | Python 3.12 → 安装依赖 → `pytest backend/tests/ -v` |
| `frontend` | Node 20 → `npm ci` → `npm run lint` → `npm run build` |

*Vitest 前端测试已在本地支持，CI 中 vitest 步骤以 TODO 形式预留*。

---

## 七、关键类与函数索引

### 7.1 后端（Python）

| 模块 | 关键类/函数 | 位置 |
|------|------------|------|
| 主应用 | `app`（FastAPI）、`ChatRequest`、`ChatResponse` | [backend/main.py](file:///workspace/backend/main.py) |
| 配置 | `WIKI_PATH`、`MOCK_MODE`、`LLM_*`、`SUBJECTS` | [backend/config.py](file:///workspace/backend/config.py) |
| 知识库检索 | `get_subjects`, `list_concepts`, `get_concept_detail`, `retrieve_knowledge`, `_score_relevance`, `_parse_frontmatter`, 缓存 `_FILE_CACHE`/`_l3_cache` | [backend/wiki_retriever.py](file:///workspace/backend/wiki_retriever.py) |
| LLM 调用 | `generate_response`, `generate_response_stream`, `_build_prompt`, `_mock_response`, `_call_llm_sync`, `_call_llm_stream`, `_strip_think_tags` | [backend/llm.py](file:///workspace/backend/llm.py) |
| 数据模型 | `User`, `Diagnosis`, `ErrorBook`, `Plan`, `PlanTask`, `init_db`, `get_session` | [backend/database.py](file:///workspace/backend/database.py) |
| 鉴权 | `AuthProvider`（前端）、`hash_password`、`create_token`、`get_current_user`、`get_optional_user` | [backend/auth.py](file:///workspace/backend/auth.py) |
| 诊断 | `_generate_questions`, `_grade_answer`, `_classify_error`, `_generate_report` | [backend/diagnosis.py](file:///workspace/backend/diagnosis.py) |
| 错题本 | `EBINGHAUS_INTERVALS`, `review` 间隔推进、`fetchSimilarExercises` | [backend/error_book.py](file:///workspace/backend/error_book.py) |
| 计划 | `_build_plan_tasks`, phase 按最近诊断分数推导 | [backend/planner.py](file:///workspace/backend/planner.py) |
| 辅导 | `HINT_PROMPT`、`SOLUTION_PROMPT`、上下文拼接 | [backend/tutor.py](file:///workspace/backend/tutor.py) |
| 模考 | `SUBJECT_CHAPTERS`, `_generate_exam_questions`, `_generate_exam_report` | [backend/exam.py](file:///workspace/backend/exam.py) |
| 统计 | `get_dashboard`, `get_radar_data`, `get_trend_data` | [backend/stats.py](file:///workspace/backend/stats.py) |
| 异常 | `KaoyanError` 及子类 | [backend/exceptions.py](file:///workspace/backend/exceptions.py) |
| 限流 | `RateLimiter`, `rate_limiter` 单例 | [backend/rate_limiter.py](file:///workspace/backend/rate_limiter.py) |
| 日志 | `get_logger` 单例 | [backend/logging_config.py](file:///workspace/backend/logging_config.py) |

### 7.2 前端（TypeScript/React）

| 模块 | 关键类/函数 | 位置 |
|------|------------|------|
| 问答主组件 | `ChatInterface`（`useState` 流式消息、`sendChatMessageStream` 回调驱动） | [frontend/src/components/ChatInterface.tsx](file:///workspace/frontend/src/components/ChatInterface.tsx) |
| 概念浏览 | `ConceptTree`（章节展开/搜索）、`ConceptDetail`（正文 + 相关习题 lazy load） | [frontend/src/components/ConceptTree.tsx](file:///workspace/frontend/src/components/ConceptTree.tsx), [frontend/src/components/ConceptDetail.tsx](file:///workspace/frontend/src/components/ConceptDetail.tsx) |
| 消息气泡 | `MessageBubble`（KaTeX + 块级公式样式） | [frontend/src/components/MessageBubble.tsx](file:///workspace/frontend/src/components/MessageBubble.tsx) |
| 导航 | `AppNav`（`NAV_ITEMS`, useAuth + usePathname） | [frontend/src/components/AppNav.tsx](file:///workspace/frontend/src/components/AppNav.tsx) |
| API 封装 | `sendChatMessageStream`, `fetchConceptGroups`, `register`, `login`, `startDiagnosis`, `fetchErrorList`, `generatePlan`, `tutorChat`, ... | [frontend/src/lib/api.ts](file:///workspace/frontend/src/lib/api.ts) |
| 鉴权 Hook | `AuthProvider`, `useAuth` | [frontend/src/lib/auth-context.tsx](file:///workspace/frontend/src/lib/auth-context.tsx) |
| 渲染工具 | `renderMarkdown`（简易 Markdown + KaTeX） | [frontend/src/lib/render-md.ts](file:///workspace/frontend/src/lib/render-md.ts) |
| 概念工具 | 章节排序、类型映射工具 | [frontend/src/lib/concept-utils.ts](file:///workspace/frontend/src/lib/concept-utils.ts) |

---

## 八、依赖关系图

### 8.1 后端模块依赖图

```
main.py (入口, 路由装配)
 ├─→ config.py            (配置常量)
 ├─→ wiki_retriever.py    (知识库检索, 读 config.WIKI_PATH)
 ├─→ llm.py               (LLM 调用, 读 config.LLM_*)
 │      └─── httpx        (外部网络)
 ├─→ database.py          (SQLAlchemy + asyncpg)
 │      └─── PostgreSQL   (外部数据库, 可选)
 ├─→ auth.py              (JWT, passlib, python-jose)
 │      └── database.py, config.py
 ├─→ diagnosis.py         (业务)
 │      ├── auth.py
 │      ├── database.py
 │      ├── wiki_retriever.py
 │      └── llm.py
 ├─→ error_book.py
 │      ├── auth.py, database.py, wiki_retriever.py
 ├─→ planner.py
 │      ├── auth.py, database.py, wiki_retriever.py
 ├─→ tutor.py
 │      ├── auth.py, database.py, wiki_retriever.py, llm.py, config.py
 ├─→ exam.py
 │      ├── auth.py, database.py, wiki_retriever.py
 ├─→ stats.py
 │      ├── auth.py, database.py
 ├─→ exceptions.py        (全局异常基类)
 ├─→ rate_limiter.py      (全局限流单例)
 └── logging_config.py    (全局日志单例)
```

### 8.2 前端模块依赖图

```
src/app/layout.tsx  ─┐
src/app/page.tsx     │
src/app/*/page.tsx   │  页面级组件
                     │
                     ▼
           ┌───────────────┐
           │ src/components│ → ChatInterface / AppNav / ConceptTree /
           └──────┬────────┘   ConceptDetail / MessageBubble / ...
                  │
          ┌───────▼────────┐
          │   src/lib       │
          │  ├── api.ts      │ ← 所有后端通信
          │  ├── auth-context.tsx
          │  ├── render-md.ts
          │  └── concept-utils.ts
          └──────┬──────────┘
                 │
       Next.js (App Router) + Tailwind CSS 4
       第三方: KaTeX / lucide-react / recharts
```

### 8.3 关键第三方依赖

**后端**（[backend/requirements.txt](file:///workspace/backend/requirements.txt)）：
- `fastapi`, `uvicorn[standard]` — Web 框架与服务器
- `PyYAML` — YAML Frontmatter 解析
- `httpx` — 异步/同步 HTTP 客户端（LLM 调用）
- `sqlalchemy[asyncio]`, `asyncpg` — 异步 ORM + PostgreSQL 驱动
- `python-jose[cryptography]`, `passlib[bcrypt]`, `bcrypt` — JWT + 密码哈希
- `python-dotenv` — 本地环境变量

**前端**（[frontend/package.json](file:///workspace/frontend/package.json)）：
- `next` 16, `react` 19, `react-dom` 19
- `katex` — LaTeX 渲染
- `lucide-react` — 图标
- `recharts` — 雷达/折线数据可视化
- 开发：`typescript`, `tailwindcss`, `vitest`, `@testing-library/react`, `eslint`

---

## 九、常见开发流程速查

| 你想做的事 | 怎么做 |
|-----------|--------|
| 新增一门学科 | 1）在 `wiki/` 下建 `{subject}/`，模仿 `math/` 补齐 SCHEMA/AGENT/INDEX/RAW → L3；2）修改 `backend/config.py` 的 `SUBJECTS`；3）前端 `SUBJECT_MAP` 补中文标签。 |
| 新增概念类型（L3） | 1）在学科 L3 下新建子目录；2）在 `wiki_retriever.py` 中 `_get_l3_files` 解析时新增 `type` 字段映射；3）在对应业务模块（concepts/exercises 等）加筛选条件。 |
| 修改 LLM 提示词 | 编辑 `backend/llm.py` 的 `_build_prompt` 或 `tutor.py` 的 `HINT_PROMPT`/`SOLUTION_PROMPT`。 |
| 新增后端接口 | 1）在对应业务模块（如 `stats.py`）用 `router = APIRouter(prefix="/xxx")` 写路由；2）在 `main.py` 中 `app.include_router(router)`；3）前端 `src/lib/api.ts` 中加对应函数；4）前端 `app/api/[...path]/route.ts` catch-all 自动支持。 |
| 新增前端页面 | 1）在 `src/app/{name}/page.tsx` 新建页面组件；2）在 `AppNav.tsx` 的 `NAV_ITEMS` 加条目；3）若需鉴权，页面内 `useAuth().user` 判断并重定向。 |
| 切换真实 LLM | 在 `backend/.env` 中写入 `LLM_API_KEY`、`LLM_BASE_URL`、`LLM_MODEL`；重启后端。 |
| 清理开发缓存 | `make clean`（删除 `__pycache__`、`frontend/.next`）。 |

---

*本 Wiki 最后更新基于仓库代码快照（2026-06 版）。如实际代码发生结构性变更，请同步刷新对应章节。*
