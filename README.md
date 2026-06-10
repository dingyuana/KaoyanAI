# 考研知识库问答系统

> 基于 LLM Wiki 三层架构的考研知识库问答系统。
>
> **当前阶段**：M4 — 知识库扩展与功能完善。408 四门专业课 RAW 已就绪，进入 L3 编译阶段。

---

## 项目状态总览

| 维度 | 状态 |
|------|------|
| 后端 API | ✅ 已完成（模块化 FastAPI，含异常处理/日志/限流/LLM 流式） |
| 前端界面 | ✅ 已完成（Next.js 16 流式问答 + KaTeX） |
| 知识库（数学） | ✅ 已完成（737 个文件，255 个 L3 概念/方法/习题） |
| 知识库（408 专业课） | ⚠️ RAW 就绪（837 文件），**L3 编译中** |
| 真实 LLM 集成 | ✅ 已完成（流式调用，配置 API Key 即可启用） |
| Docker 部署 | ⏸ 开发阶段本地运行，发布时启用 |
| 测试 | ❌ 未完成 |
| 多学科扩展 | ⚠️ CS 四门课已接入，英语/政治待启动 |

---

## 项目目标

**产品方向**：考研数学知识库 + AI 问答，为考研学生提供基于知识库的智能问答、概念浏览和习题练习服务。

**阶段目标**：

| 阶段 | 目标 | 状态 |
|------|------|------|
| M0 - 项目初始化 | 代码骨架 + Wiki 基座规范 + 5 个 L3 概念 | ✅ 完成 |
| M1 - MVP 后端 | FastAPI 问答服务 + 知识库检索 + LLM 调用 | ✅ 完成 |
| M2 - MVP 前端 | Next.js 问答界面 + 流式输出 + 公式渲染 | ✅ 完成 |
| M3 - 知识库建设 | 数学 L3 编译 + 408 四门课 RAW 采集 | ✅ 完成（数学 255 L3，四门 CS 837 RAW） |
| **M4 - 知识库扩展** | **408 L3 编译 + 多学科适配 + 概念浏览 + 测试** | **⬅ 当前阶段** |
| M5 - 体验优化 | 英语/政治 L3 + 性能优化 | 待启动 |
| M6 - 发布与测试 | Docker 部署 + 真实用户测试 | 待启动 |

---

## 项目结构（实际）

```
kaoyan/
├── backend/                   # FastAPI 后端（模块化）
│   ├── main.py                # FastAPI 应用入口 + 路由
│   ├── config.py              # 配置管理（LLM/路径/学科）
│   ├── wiki_retriever.py      # 知识库检索（glob + 关键词）
│   ├── llm.py                 # LLM 调用封装（含 Mock 模式）
│   └── requirements.txt       # Python 依赖
│
├── frontend/                  # Next.js 16 前端
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # 首页问答界面
│   │   │   ├── layout.tsx            # 布局（含 metadata）
│   │   │   └── api/chat/             # Next.js API 路由（代理后端）
│   │   ├── components/
│   │   │   ├── ChatInterface.tsx      # 问答面板（流式、学科切换）
│   │   │   └── MessageBubble.tsx      # 消息气泡（含 KaTeX 渲染）
│   │   └── lib/
│   │       └── api.ts                # API 调用封装（SSE 客户端）
│   ├── package.json
│   └── next.config.ts
│
| wiki/                      # 知识库（1574+ 个 MD 文件）
│   ├── WIKI_SCHEMA.md         # Wiki 通用宪法
│   ├── WIKI_AGENT.md          # 通用 AI 行为约束
│   ├── math/                  # 数学学科（✅ 完成）
│   │   ├── SCHEMA.md          # 数学 Domain 宪法
│   │   ├── AGENT.md           # 数学 AI 约束
│   │   ├── INDEX.yaml         # L2 索引
│   │   ├── raw/               # L1 原始材料（465 个文件）
│   │   ├── L3/                # L3 应用文档（255 个文件）
│   │   │   ├── concepts/      # 概念文档（208 个）
│   │   │   ├── methods/       # 方法文档（17 个）
│   │   │   └── exercises/     # 习题文档（30 个）
│   │   ├── TEMPLATES/         # 模板
│   │   └── _meta/             # 元数据
│   ├── ds/                    # 数据结构（⚠️ RAW 就绪，L3 编译中）
│   ├── arch/                  # 计算机组成原理（⚠️ RAW 就绪，L3 编译中）
│   ├── net/                   # 计算机网络（⚠️ RAW 就绪，L3 编译中）
│   ├── os/                    # 操作系统（⚠️ RAW 就绪，L3 编译中）
│   ├── english/               # 占位（待扩展）
│   └── politics/              # 占位（待扩展）
│
├── docs/                      # 开发文档
│   ├── 01-requirements.md     # 需求分析
│   ├── 02-tech-spec.md        # 技术规格
│   ├── 03-architecture.md     # 系统架构
│   ├── 04-modules.md          # 模块划分
│   ├── 05-agent-rules.md      # AI 编程助手规则
│   ├── 06-spec-prompts.md     # 开发提示词模板
│   ├── 07-plan.md             # 开发计划
│   └── 08-midterm-goals.md    # 中期开发目标（当前阶段）
│
├── scripts/                   # 工具脚本（待填充）
├── process_linears_algebra.py # 线性代数处理脚本
└── README.md
```

---

## 技术栈（实际）

| 层 | 技术 | 说明 |
|---|------|------|
| 前端框架 | Next.js 16（App Router） | 最新版，SSR + 流式支持 |
| 前端样式 | Tailwind CSS 4 | 原子化 CSS，暗色模式 |
| 公式渲染 | KaTeX（客户端） | 行内/块级 LaTeX 渲染 |
| 后端框架 | FastAPI（模块化） | 异步路由 + SSE 流式 + 异常处理 + 限流 |
| 知识库检索 | glob + 关键词匹配（TTL 缓存） | 无数据库依赖 |
| LLM | OpenAI / Claude API | 流式调用已实现，需配置真实 API Key |
| 知识库 | Wiki Markdown 三层结构 | 7 学科，1574+ 个文件，L1/L2/L3 分层 |

---

## 快速开始

```bash
# 1. 启动后端
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8001

# 2. 启动前端（新终端）
cd frontend
npm install
npm run dev

# 3. 浏览器访问 http://localhost:3000/kaoyan
```

**环境变量**（后端 `.env`）：
- `LLM_API_KEY`：LLM API Key（留空则使用 Mock 模式）
- `LLM_BASE_URL`：API 地址（默认 OpenAI）
- `LLM_MODEL`：模型名（默认 gpt-4o-mini）

---

## 知识库架构

详见 `wiki/WIKI_SCHEMA.md`（通用规范）和 `wiki/math/SCHEMA.md`（数学 Domain 规范）。

核心原则：
- **基座与 Domain 分离**：`WIKI_SCHEMA.md` 是所有学科的通用宪法
- **三层结构**：L1（原始只读）→ L2（索引）→ L3（应用文档）
- **锚点 ID 永久不变**：每个知识块有唯一锚点，永不删除

---

## 决策机制（MVP 验证）

**通过条件**（满足任意 2 条）：
- 用户留存率 > 30%
- 平均每次会话 > 3 个问题
- 用户主动推荐给他人

**不通过条件**（满足任意 1 条）：
- 上线 2 周后日活 < 5 人
- 用户反馈"不如直接翻书"

---

## 贡献者

- 老丁（产品负责人，知识库材料提供者）
- 小丁（AI 助手，技术实现）
