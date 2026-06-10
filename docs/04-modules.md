# 考研知识库问答系统 · 模块划分与接口定义

> 更新日期：2026-05-14
> 反映项目实际模块结构（MVP 核心功能已完成，进入 M4 阶段）。

---

## 一、模块总览

```
kaoyan/
├── backend/              # 后端服务（FastAPI）
├── frontend/             # 前端应用（Next.js 16）
├── wiki/                 # 知识库（737 文件）
├── docs/                 # 开发文档
├── scripts/              # 工具脚本（待填充）
└── nginx/                # 反向代理配置（待创建）
```

---

## 二、后端模块

### B1：API 路由模块

| 属性 | 值 |
|------|-----|
| **文件** | `backend/main.py` |
| **框架** | FastAPI |
| **职责** | HTTP 路由、CORS、请求校验、SSE 流式响应 |
| **接口** | 6 个端点（详见下文） |
| **状态** | ✅ 完成 |
| **行数** | ~189 |

**接口清单**：

| 方法 | 路径 | 说明 | 状态 |
|------|------|------|------|
| GET | `/health` | 健康检查 | ✅ |
| GET | `/subjects` | 学科列表 | ✅ |
| GET | `/concepts/{subject}` | 概念列表 | ✅ |
| POST | `/chat` | 问答（非流式） | ✅ |
| POST | `/chat/stream` | 问答（流式 SSE） | ✅ |
| GET | `/` | API 信息 | ✅ |

---

### B2：知识库检索模块

| 属性 | 值 |
|------|-----|
| **文件** | `backend/wiki_retriever.py` |
| **职责** | 遍历 L3 目录、Frontmatter 解析、关键词匹配检索 |
| **依赖** | 无（仅 Python 标准库 + PyYAML） |
| **状态** | ✅ 完成 |
| **行数** | ~200 |

**关键函数**：

```python
def retrieve_knowledge(query: str, subject: Optional[str] = None) -> Dict[str, Any]
def list_concepts(subject: str) -> List[Dict[str, Any]]
def get_subjects() -> List[Dict[str, Any]]
def get_wiki_schema() -> Dict[str, str]
def get_subject_schema(subject: str) -> Dict[str, str]
```

---

### B3：LLM 集成模块

| 属性 | 值 |
|------|-----|
| **文件** | `backend/llm.py` |
| **职责** | LLM API 调用、Prompt 构建、Mock 模式 |
| **依赖** | httpx |
| **状态** | ✅ 完成（Mock 模式） / ⬅ M4.1 升级到真实流式 |
| **行数** | ~78 |

**关键函数**：

```python
def generate_response(context: str, question: str) -> str
def _mock_response(context: str, question: str) -> str
def _call_llm(context: str, question: str) -> str
```

**当前限制**：
- `_call_llm` 使用同步 httpx（应为异步）
- 真实模式返回整段而非流式
- 无 token 预算控制
- 所有限制将在 M4.1 修复

---

### B4：配置管理模块

| 属性 | 值 |
|------|-----|
| **文件** | `backend/config.py` |
| **职责** | Wiki 路径、LLM 配置、学科列表、Mock 模式开关 |
| **依赖** | 无 |
| **状态** | ✅ 完成 |
| **行数** | ~17 |

**配置项**：

```python
WIKI_PATH        # Wiki 文件系统根路径
LLM_API_KEY      # API Key（空=Mock）
LLM_BASE_URL     # LLM API 地址
LLM_MODEL        # 模型名
SUBJECTS         # 可用学科列表
MOCK_MODE        # 自动判断（Key 为空时 true）
```

---

## 三、前端模块

### F1：问答页面

| 属性 | 值 |
|------|-----|
| **文件** | `frontend/src/app/page.tsx` |
| **职责** | 问答首页布局 |
| **状态** | ✅ 完成 |

### F2：聊天界面组件

| 属性 | 值 |
|------|-----|
| **文件** | `frontend/src/components/ChatInterface.tsx` |
| **职责** | 消息列表管理、流式接收 SSE、学科切换、输入框 |
| **状态** | ✅ 完成 |

**功能要点**：
- 用户/助手消息列表
- SSE 流式接收（onChunk / onSources / onDone）
- 学科切换（数学激活，英语/政治禁用）
- 自动滚动到底部
- 输入框自动伸缩
- 加载状态指示

### F3：消息气泡组件

| 属性 | 值 |
|------|-----|
| **文件** | `frontend/src/components/MessageBubble.tsx` |
| **职责** | 消息渲染（含 KaTeX 公式） |
| **状态** | ✅ 完成 |

**功能要点**：
- 块级公式 `$$...$$` 渲染
- 行内公式 `$...$` 渲染
- 暗色模式适配
- 渲染错误降级（红色显示源码）

### F4：API 客户端

| 属性 | 值 |
|------|-----|
| **文件** | `frontend/src/lib/api.ts` |
| **职责** | SSE 流式客户端封装 |
| **状态** | ✅ 完成 |

### F5：API Route（代理）

| 属性 | 值 |
|------|-----|
| **文件** | `frontend/src/app/api/chat/route.ts` + `frontend/src/app/api/chat/stream/route.ts` |
| **职责** | Next.js API Route 代理到后端 FastAPI |
| **状态** | ✅ 完成 |

---

## 四、知识库模块

### W1：Wiki 通用规范

| 文件 | 职责 | 状态 |
|------|------|------|
| `wiki/WIKI_SCHEMA.md` | 总宪法（所有学科通用） | ✅ 完成 |
| `wiki/WIKI_AGENT.md` | 通用 AI 行为约束 | ✅ 完成 |

### W2：数学学科知识库

| 组成部分 | 数量 | 状态 |
|---------|------|------|
| `math/SCHEMA.md` | Domain 宪法 | ✅ 完成 |
| `math/AGENT.md` | Domain AI 约束 | ✅ 完成 |
| `math/INDEX.yaml` | L2 索引 | ✅ 完成 |
| `math/raw/` | L1 原始材料 | ✅ 465 文件 |
| `math/L3/concepts/` | L3 概念文档 | ✅ 208 文件 |
| `math/L3/methods/` | L3 方法文档 | ✅ 17 文件 |
| `math/L3/exercises/` | L3 习题文档 | ✅ 30 文件 |
| `math/TEMPLATES/` | 文件模板 | ✅ 完成 |
| `math/_meta/concept_map.yaml` | 概念词表 | ✅ 完成 |

### W3：408 计算机专业课知识库（新增）

| 学科 | RAW 文件 | L3 文件 | 状态 |
|------|----------|---------|------|
| `ds/` 数据结构 | 196 | 0 | ⚠️ M4.1 编译中 |
| `arch/` 组成原理 | 255 | 0 | ⚠️ M4.1 编译中 |
| `net/` 计算机网络 | 200 | 0 | ⚠️ M4.1 编译中 |
| `os/` 操作系统 | 186 | 0 | ⚠️ M4.1 编译中 |

各学科目录结构同数学（SCHEMA.md / AGENT.md / INDEX.yaml / RAW / L3 / TEMPLATES / _meta）。

### W4：其他学科

| 学科 | 状态 | 备注 |
|------|------|------|
| `english/` | 📁 空目录 | 待 M5.3 扩展 |
| `politics/` | 📁 空目录 | 待 M5.3 扩展 |

---

## 五、待建模块

### P1：概念浏览模块（M4.3）

| 文件 | 职责 |
|------|------|
| `frontend/src/components/ConceptTree.tsx` | 概念树组件（7 学科） |
| `frontend/src/components/ConceptDetail.tsx` | 概念详情 |
| `frontend/src/app/concepts/page.tsx` | 概念浏览页面 |

### P2：测试模块（M4.4）

| 文件 | 职责 |
|------|------|
| `backend/tests/` | 后端测试 |
| `frontend/src/__tests__/` | 前端测试 |

### P3：习题关联模块（M4.5）

| 文件 | 职责 |
|------|------|
| 已有习题 30 个 L3 文件 | 习题数据 |
| INDEX.yaml related 字段 | 关联关系 |

### P4：部署模块（M6 — 发布阶段启用）

| 文件 | 职责 |
|------|------|
| `docker-compose.yml` | 一键启动编排（已有，M6 验证） |
| `backend/Dockerfile` | 后端容器化（已有） |
| `frontend/Dockerfile` | 前端容器化（standalone，已有） |
| `nginx/nginx.conf` | 反向代理配置（已有） |
| `.github/workflows/ci.yml` | CI/CD 流水线（待创建） |

> ⚠️ 开发阶段不使用 Docker，保持本地运行（uvicorn + npm run dev）。

### P5：多学科模块（M5）

| 文件 | 职责 |
|------|------|
| `wiki/english/SCHEMA.md` | 英语宪法 |
| `wiki/politics/SCHEMA.md` | 政治宪法 |
| 英语/政治 L3 文件 | 初始内容 |

---

## 六、接口变更计划

| 接口 | 当前状态 | M4/M5 变更 |
|------|---------|-----------|
| `POST /chat/stream` | ✅ 真实 LLM 流式（已有） | 无需变更 |
| `GET /concepts/{subject}` | ✅ 章节分组（已有） | 确认支持 7 学科 |
| `GET /subjects` | ✅ 自动检测（已有） | SUBJECTS 列表扩展至 7 学科 |
| `GET /concepts/{subject}/{id}/exercises` | ✅ 关联习题（已有） | 前端展示 |
| `GET /exercises/{subject}` | ✅ 习题列表（已有） | 前端展示 |
