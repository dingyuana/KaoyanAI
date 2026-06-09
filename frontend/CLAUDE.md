@AGENTS.md

# 🎯 AI 协作核心准则 (AI Collaboration Rules)

> **本文件是 OpenCode 执行层的强制执行规范。作为 AI 编程助手，你必须在每次开发活动中严格遵守以下四大原则。**

## 1. 先想再写 (Think Before Coding)

在任何编码前，先用自然语言简要描述你的实现逻辑和变更点。严禁在未明确需求的情况下"瞎蒙"或直接输出代码。你是执行者，不是架构师。

## 2. 简单至上 (Simplicity First)

优先使用最简实现，严禁过度设计或引入不必要的依赖。能用原生语法解决的绝不引入第三方库；能用3行代码解决的绝不写成30行。不引入不必要的抽象、设计模式、依赖库。

## 3. 精准改动 (Surgical Changes)

**严格锁定修改范围**。仅修改当前任务明确要求的文件与代码行。严禁"顺便重构"、"顺手优化格式"或修改无关模块。不改缩进、不改格式、不改命名、不重构无关代码。一次改动只解决一个问题。禁止无关联的 diff 噪音。

## 4. 目标驱动 (Goal-Driven Execution)

每一行生成的代码都必须能回答"这服务于哪个具体需求"。没有明确业务目标的代码一行都不要留。如果需求模糊，必须向 Human Manager 提问确认后再动手。验收标准就是完成目标。

---

# 📋 项目概览与技术栈 (Project Overview & Tech Stack)

**项目**: 研光（yan-guang）— 考研 AI 知识库问答系统

**当前阶段**: M4 — 真实 LLM 接入 + 部署 + 测试

**核心功能**: 基于三层 Wiki Markdown 知识库的考研数学问答 MVP

**技术栈**:
- **框架**: Next.js 16 (App Router) + TypeScript
- **运行时**: React 19 (package.json: `"react": "19.2.4"`, `"react-dom": "19.2.4"`)
- **样式**: Tailwind CSS 4（原子化设计，禁止手写复杂CSS）
- **包管理器**: pnpm（严禁使用 npm 或 yarn）
- **测试**: vitest + @testing-library/react + @testing-library/jest-dom + jsdom
- **构建工具**: Vite (开发/测试), Next.js (生产构建)

## 常用命令
| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动 Next.js 开发服务器 (:3000) |
| `pnpm build` | 生产构建 |
| `pnpm start` | 启动生产服务器 |
| `pnpm lint` | ESLint 代码检查（提交前必须通过） |
| `pnpm test` | 运行 vitest 单元测试（新增功能必须同步编写测试） |

## 关键依赖
- **katex** — 公式渲染（SSR: `renderToString`）
- **lucide-react** — 图标库
- **next 16.2.6** — 框架
- **tailwindcss 4** — 原子化样式

---

# 📝 代码风格与规范 (Code Style & Standards)

- **模块化**: 统一使用 ES Modules (`import/export`)，**绝对禁止**使用 CommonJS (`require`)
- **命名约定**:
  - 组件文件名使用 `PascalCase` (如 `ChatInterface.tsx`)
  - 工具函数与变量使用 `camelCase` (如 `formatDate`)
  - 常量使用 `UPPER_SNAKE_CASE`
- **类型安全**: 禁止使用 `any` 类型，遇到未知类型请使用 `unknown` 并做类型收窄
- **注释要求**: 仅在复杂逻辑处添加注释，解释"为什么这么做"，而不是解释"代码是什么"
- **组件风格**: 函数组件 + hooks，禁用 class 组件

---

# 🛡️ 项目特殊约束 (Project-Specific Constraints)

## 架构约束
- ❌ 不要直接连接 Wiki 文件系统（通过后端 FastAPI `:8001` 获取数据）
- ❌ 不要引入未在 `package.json` 中列出的新依赖
- ✅ 流式优先（SSE 协议：`/api/chat/stream` 代理 → `localhost:8001/chat/stream`）
- ✅ 暗色模式支持（`dark:` 前缀）
- ✅ 错误信息用中文
- ✅ Next.js App Router（`src/app/` 目录结构）
- ✅ Tailwind CSS 4 + Vite（开发热更新）

## 路由结构
```
/kaoyan                     → 问答首页（page.tsx）
/kaoyan/api/chat/stream     → SSE 代理 → localhost:8001/chat/stream
/kaoyan/api/chat            → 非流式 API 代理
```

## 组件目录（`src/components/`）
- `ChatInterface.tsx` — 问答面板
- `MessageBubble.tsx` — 消息气泡（含 KaTeX 公式渲染）

## 关键文件
- `src/lib/api.ts` — SSE 客户端封装
- `src/app/layout.tsx` — 根布局（metadata 配置）

---

# ⚠️ 禁区与红线 (Strict Prohibitions)

- **禁止修改配置文件**: 严禁随意修改 `.env`、`package.json`（除非明确要求安装依赖）、`tsconfig.json`、`next.config.ts`
- **禁止硬编码**: 所有 API 密钥、敏感信息必须从环境变量读取，严禁写在业务代码中
- **禁止破坏性变更**: 修改公共组件或工具函数时，必须确保向下兼容，不能影响现有业务
- **禁止冗余依赖**: 能用 React 内置 API（`useState`/`useEffect`/`useRef`/`useCallback`）解决的，不引入第三方 hooks 库

---

# ✅ Git 提交规范

- 每次提交前必须审核代码（diff review），确认无误后再 commit
- 审核要点：类型安全、空值处理、API 对齐、现有模式一致性
- 提交信息格式：`[类型] 简短描述`（如 `[feat] 添加流式 SSE 重试机制`）
