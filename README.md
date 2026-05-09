# 考研知识库问答系统

> 基于 LLM Wiki 三层架构的考研知识库问答系统。

## 项目目标

**MVP 验证**：考研数学知识库 + AI 问答 产品方向是否成立。

## 技术栈

| 层 | 工具 |
|---|------|
| 前端 | Next.js 14（App Router）|
| 后端 | FastAPI（单文件）|
| 检索 | glob + 关键词匹配 |
| LLM | Claude / GPT API |
| 知识库 | Wiki Markdown（L1→L2→L3 三层）|

## 知识库架构

### 核心决策：基座与 Domain 分离

Wiki 规范分为**通用基座**和**学科专属**两层，分离后互不影响：

```
wiki/
├── WIKI_SCHEMA.md          # ⭐ 总宪法（所有学科通用，MVP后不动）
├── WIKI_AGENT.md           # ⭐ 通用AI行为约束（所有学科通用）
│
├── math/                   # 数学学科（MVP先行）
│   ├── SCHEMA.md           # Domain宪法（数学专属规则）
│   ├── AGENT.md            # Domain AI约束（数学专属）
│   ├── INDEX.yaml          # L2 索引
│   ├── RAW/                # L1 原始材料（待补充）
│   ├── L3/                 # L3 最终文档（待生成）
│   ├── TEMPLATES/          # 文件模板
│   └── _meta/
│       └── concept_map.yaml  # 标准概念词表
│
├── english/                 # 占位（后期扩展）
└── politics/               # 占位（后期扩展）
```

### 三层结构

```
L1 (Raw)     → 原始材料，永久只读
              锚点ID: RAW-{subject}-{来源}-P{页码}-C{序号}

L2 (Index)   → L1 的索引目录，只描述特征，不承载内容

L3 (Generated)→ 最终应用文档，一概念一文件
              锚点引用L1: source_anchors: [RAW-math-同济高数上-P023-C07]
```

详见 `wiki/WIKI_SCHEMA.md` 和 `wiki/math/SCHEMA.md`。

## 开发计划

| 阶段 | 目标 | 状态 |
|------|------|------|
| M0 | 项目初始化 + Wiki基座规范 | ✅ 完成 |
| M1 | 后端开发 | 待开发 |
| M2 | 前端开发 | 待开发 |
| M3 | 部署上线 | 待开发 |
| M4 | 反馈迭代 | 待开发 |
| M5-M8 | Commercial | 待开发 |

## 项目结构

```
kaoyan/
├── wiki/                   # Wiki知识库（MVP核心）
│   ├── WIKI_SCHEMA.md
│   ├── WIKI_AGENT.md
│   └── math/
│       ├── SCHEMA.md
│       ├── AGENT.md
│       └── ...
├── frontend/               # Next.js 前端（待开发）
├── backend/                # FastAPI 后端（待开发）
└── docs/                   # 规范文档
    ├── SPEC.md             # MVP规格
    ├── plan.md            # 开发计划
    └── requirements.md    # 需求分析
```

## 快速开始

```bash
# 初始化 Next.js 前端
cd frontend && npm install && npm run dev

# 启动 FastAPI 后端
cd backend && pip install -r requirements.txt && uvicorn main:app --reload

# 访问 http://localhost:3000
```

## 决策机制（MVP验证）

**通过条件**（满足任意2条）：
- 用户留存率 > 30%
- 平均每次会话 > 3 个问题
- 用户主动推荐给他人

**不通过条件**（满足任意1条）：
- 上线2周后日活 < 5人
- 用户反馈"不如直接翻书"

## 贡献者

- 老丁（产品负责人，知识库材料提供者）
- 小丁（AI助手，技术实现）
