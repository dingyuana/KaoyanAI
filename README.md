# 考研知识库问答系统

> 基于 LLM Wiki 三层架构的考研知识库问答系统。
>
> **当前阶段**：MVP 核心功能已交付，知识库初具规模，进入功能完善与部署上线阶段。

---

## 项目状态总览

| 维度 | 状态 |
|------|------|
| 后端 API | ✅ 已完成（模块化 FastAPI） |
| 前端界面 | ✅ 已完成（Next.js 流式问答） |
| 知识库（数学） | ✅ 已完成（737 个文件，255 个 L3 概念/方法/习题） |
| 真实 LLM 集成 | ⚠️ Mock 模式，待接入真实 API Key |
| 部署配置 | ❌ 未完成 |
| 测试 | ❌ 未完成 |
| 多学科扩展（英语/政治） | ⬜ 待启动 |

---

## 项目目标

**产品方向**：考研数学知识库 + AI 问答，为考研学生提供基于知识库的智能问答、概念浏览和习题练习服务。

**阶段目标**：

| 阶段 | 目标 | 状态 |
|------|------|------|
| M0 - 项目初始化 | 代码骨架 + Wiki 基座规范 + 5 个 L3 概念 | ✅ 完成 |
| M1 - MVP 后端 | FastAPI 问答服务 + 知识库检索 + LLM 调用 | ✅ 完成 |
| M2 - MVP 前端 | Next.js 问答界面 + 流式输出 + 公式渲染 | ✅ 完成 |
| M3 - 知识库建设 | 数学 L3 概念/方法/习题文件 | ✅ 完成（超额：255 个 L3 文件） |
| **M4 - 功能完善** | **真实 LLM 集成 + 概念浏览 + 部署 + 测试** | **⬅ 当前阶段** |
| M5 - 多学科扩展 | 英语、政治学科接入 | 待启动 |
| M6 - 用户系统 | 登录、历史记录、收藏夹 | 待启动 |
| M7 - 商业化 | 性能优化、监控、上线 | 待启动 |

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
| wiki/                      # 知识库（737 个 MD 文件）
│   ├── WIKI_SCHEMA.md         # Wiki 通用宪法
│   ├── WIKI_AGENT.md          # 通用 AI 行为约束
│   ├── math/                  # 数学学科知识库（MVP）
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
| 后端框架 | FastAPI（模块化） | 异步路由 + SSE 流式 |
| 知识库检索 | glob + 关键词匹配 | 无数据库依赖 |
| LLM | Claude / GPT API（Mock 中） | 按需切换，当前 Mock 模式 |
| 知识库 | Wiki Markdown 三层结构 | 737 个文件，L1/L2/L3 分层 |

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
