# 考研知识库问答系统 · 贡献指南

> 欢迎贡献！本文档帮助新开发者快速参与项目。

---

## 一、项目简介

考研知识库问答系统是一个基于 LLM Wiki 三层架构的考研智能学习助手，为考研学生提供基于知识库的智能问答服务。

**当前支持学科**：数学、数据结构、计算机组成原理、计算机网络、操作系统

**技术栈**：
- 后端：Python 3.12 + FastAPI
- 前端：Next.js 16 + TypeScript + Tailwind CSS 4
- 知识库：Markdown + YAML Frontmatter（三层架构 L1/L2/L3）

---

## 二、本地开发环境搭建

### 前置条件

- Python 3.12+
- Node.js 20+
- npm 10+

### 步骤

```bash
# 1. 克隆仓库
git clone <repo-url>
cd kaoyan

# 2. 使用 Makefile 一键安装（推荐）
make setup

# 3. 或者手动安装
# 后端
cd backend
pip install -r requirements.txt

# 前端
cd frontend
npm install
```

### 启动开发服务器

**方式一：两个终端分别启动**

```bash
# 终端 1：后端
make dev-backend
# 或: cd backend && uvicorn main:app --reload --port 8000

# 终端 2：前端
make dev-frontend
# 或: cd frontend && npm run dev
```

**方式二：使用 Makefile 提示**

```bash
make dev
```

### 环境变量

```bash
# 复制示例配置文件
cp backend/.env.example backend/.env

# 编辑 .env 填入 LLM API Key（留空则使用 Mock 模式）
# LLM_API_KEY=your_api_key_here
# LLM_BASE_URL=https://api.openai.com/v1
# LLM_MODEL=gpt-4o-mini
```

### 访问

浏览器打开 http://localhost:3000/kaoyan

---

## 三、项目结构

```
kaoyan/
├── backend/             # FastAPI 后端
│   ├── main.py          # API 路由 + CORS
│   ├── config.py        # 配置管理
│   ├── wiki_retriever.py # 知识库检索
│   ├── llm.py           # LLM 调用（Mock/真实模式）
│   ├── exceptions.py    # 自定义异常
│   ├── rate_limiter.py  # 限流
│   └── tests/           # 后端测试
├── frontend/            # Next.js 前端
│   ├── src/
│   │   ├── app/         # 页面路由
│   │   ├── components/  # 组件
│   │   ├── lib/         # 工具函数
│   │   └── test/        # 前端测试
│   └── package.json
├── wiki/                # 知识库（Markdown）
│   ├── math/            # 数学
│   ├── ds/              # 数据结构
│   ├── arch/            # 组成原理
│   ├── net/             # 计算机网络
│   ├── os/              # 操作系统
│   ├── english/         # 英语（待建设）
│   └── politics/        # 政治（待建设）
├── docs/                # 开发文档
├── scripts/             # 工具脚本
└── Makefile             # 快捷命令
```

---

## 四、开发规范

### 代码风格

- **Python**：遵循 PEP 8，类型注解完整
- **TypeScript**：strict 模式，ESLint 检查
- **知识库**：遵循 `wiki/WIKI_SCHEMA.md` 通用规范和学科 `SCHEMA.md`

### 提交规范

提交信息格式：`type(scope): description`

示例：
```
feat(backend): 添加学科动态检测
fix(frontend): 修复学科切换时概念列表不刷新
wiki(ds): 编译数据结构 L3 概念文档
test(backend): 增加 wiki_retriever 测试
docs: 更新 README 项目结构
```

### 测试

```bash
# 运行全部测试
make test

# 仅后端
make test-backend

# 仅前端
make test-frontend
```

提交前请确保测试全部通过。

### 分支策略

- `main`：稳定版本
- `develop`：开发分支
- `feature/*`：功能分支
- `fix/*`：修复分支

---

## 五、知识库贡献指南

知识库采用 L1（原始材料）→ L2（索引）→ L3（应用文档）三层架构。

### 新增学科

1. 创建 `wiki/{subject}/` 目录
2. 编写 `SCHEMA.md`（基于 `wiki/math/SCHEMA.md` 改编）
3. 编写 `AGENT.md`（基于 `wiki/math/AGENT.md` 改编）
4. 创建 `INDEX.yaml`、`TEMPLATES/`、`_meta/`
5. 将原始材料放入 `RAW/` 目录
6. 从 RAW 编译 L3 应用文档

### 编译 L3 文档

```bash
# 运行完整性检查
make check-integrity
```

每份 L3 文档需包含：
- YAML Frontmatter（id/title/subject/type/tags/source_anchors）
- 正文遵循对应模板（concept/method/exercise）
- source_anchors 引用有效的 RAW 锚点

---

## 六、部署

开发阶段保持本地运行（`make dev`）。发布时使用 Docker：

```bash
docker-compose up -d
```

详见 `docs/07-plan.md`。

---

## 七、获取帮助

- 查看 `docs/` 目录下的开发文档
- 运行 `make help` 查看可用命令
- 提交 Issue 报告问题