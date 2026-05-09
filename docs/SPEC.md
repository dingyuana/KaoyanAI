# 考研知识库问答系统 · MVP 规格说明

> 本文件定义 MVP 阶段的功能范围、技术选型和验收标准。
> 所有开发工作必须遵循此规格。

---

## 1. MVP 目标

**验证**："考研数学知识库 + AI 问答"这一产品方向是否成立。

**判断标准**（上线2周后评估）：
- 真实用户（≥10人）愿意持续使用
- 平均每次会话 ≥ 3 个问题
- 用户反馈"比翻书查资料更快"

---

## 2. MVP 功能范围

### 2.1 核心功能（必须实现）

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 知识问答 | 用户输入问题 → AI 基于知识库回答 → 流式展示 | P0 |
| 引用来源 | 每条回答附带来源文件名 | P0 |
| 数学渲染 | LaTeX 公式正确显示 | P0 |
| 学科切换 | 数据结构预留，暂时只开数学 | P0 |

### 2.2 辅助功能（可选）

以下功能在核心功能稳定后再考虑：

- 概念树浏览
- 习题关联展示
- 用户登录/历史记录
- 多学科（英语/政治）

---

## 3. 技术选型（MVP）

### 前端

| 选项 | 选择 | 理由 |
|------|------|------|
| 框架 | Next.js 14（App Router） | 从第一天按商业产品做 |
| UI库 | Tailwind CSS | 轻量、定制灵活 |
| 数学渲染 | KaTeX（客户端渲染） | CDN引入，无需服务端配置 |
| 状态管理 | React useState | MVP阶段不需要全局状态库 |
| 部署 | Vercel | Next.js 官方支持，免费额度够用 |

### 后端

| 选项 | 选择 | 理由 |
|------|------|------|
| 语言/框架 | Python FastAPI（单文件） | MVP够用，后续可拆 |
| 端口 | 8000 | 标准FastAPI默认 |
| 检索 | glob 读 MD + 关键词匹配 | 无数据库依赖 |
| 缓存 | 无 | MVP阶段跳过 |
| 部署 | Railway / Render | Git推送即部署 |

### 知识库

| 选项 | 选择 | 理由 |
|------|------|------|
| 格式 | Markdown 文件 | Hermes 直接生成，人类可读 |
| 结构 | L1（raw/）→ L2 → L3 | 三层结构，清晰可追溯 |
| 索引 | INDEX.yaml（Hermes维护） | 自动生成，无需手动 |
| 数量 | 20-30个 L3 文件 | 覆盖核心章节，可手动补充 |

### LLM

| 选项 | 选择 | 理由 |
|------|------|------|
| 模型 | Claude 3.5 Sonnet 或 GPT-4o | 按调用量付费 |
| 调用方式 | 官方 SDK（非流式先上） | MVP先跑通，后续优化流式 |
| 上下文 | 从检索结果截取相关内容 | 不依赖模型微调 |

---

## 4. 接口规范

### 4.1 问答接口

```yaml
POST /api/v1/query
描述: 知识库问答
请求体:
  question: string    # 用户问题
  subject: string     # 学科: math（暂时）
响应:
  answer: string      # 回答内容
  sources:
    - file: string    # 来源文件名
      excerpt: string # 相关段落（最多200字）
  status: string       # "ok" | "no_context"
```

### 4.2 学科列表

```yaml
GET /api/v1/subjects
响应:
  subjects:
    - id: string
      name: string
      status: string   # "active" | "coming_soon"
```

---

## 5. MVP 目录结构

```
/root/kaoyan/
├── frontend/                    # Next.js 前端
│   ├── app/
│   │   ├── page.tsx            # 首页（问答界面）
│   │   └── layout.tsx          # 布局
│   ├── components/
│   │   ├── ChatPanel.tsx       # 问答面板
│   │   └── SubjectSwitcher.tsx # 学科切换
│   ├── lib/
│   │   └── api.ts              # API 调用封装
│   └── package.json
│
├── backend/                    # FastAPI 后端
│   ├── main.py                 # 单文件（路由 + 服务）
│   ├── search.py               # 检索服务
│   └── requirements.txt
│
├── wiki/                       # 知识库（Hermes 管理）
│   ├── math/
│   │   ├── raw/               # L1 原始材料
│   │   ├── L2/                # L2 章节切片
│   │   ├── L3/                # L3 结构化知识
│   │   │   ├── concepts/      # 概念
│   │   │   ├── methods/       # 方法
│   │   │   └── exercises/     # 习题
│   │   ├── TEMPLATES/          # 文件模板
│   │   └── INDEX.yaml          # 索引
│   ├── english/                # （Commercial 阶段）
│   └── politics/               # （Commercial 阶段）
│
├── docs/                       # 工程规范
│   ├── SPEC.md                 # 本文件（MVP规格）
│   ├── requirements.md         # 需求分析
│   ├── plan.md                 # 开发计划
│   ├── modules.md              # 模块定义
│   └── WIKI.md                 # Wiki框架规范
│
└── scripts/                    # 工具脚本
    └── sync_index.py           # 同步索引脚本
```

---

## 6. MVP 验收标准

- [ ] 前端部署到 Vercel，可通过 URL 访问
- [ ] 输入数学问题，返回基于知识库的回答
- [ ] 回答中的 LaTeX 公式正确渲染
- [ ] 每条回答显示来源文件名
- [ ] 知识库无相关内容时，AI 说明"无法回答"
- [ ] 移动端布局正常
- [ ] 10个真实用户连续使用3天无崩溃

---

## 7. MVP 不做的事

以下内容在 MVP 阶段**不做**，Commercial 阶段再考虑：

- ❌ 多学科（英语/政治）
- ❌ 用户登录系统
- ❌ 查询历史记录
- ❌ 概念树浏览
- ❌ Elasticsearch / 向量数据库
- ❌ Redis 缓存
- ❌ Kubernetes 部署
- ❌ 监控告警

---

*规格制定：2026-05-09*  
*下次审视：MVP上线后2周*