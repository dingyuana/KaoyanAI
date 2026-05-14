# 考研知识库问答系统 · 中期开发计划

> 更新日期：2026-05-14
> 当前阶段：M4 — 功能完善与部署
> 本计划承接 `docs/08-midterm-goals.md` 中定义的中期开发目标，给出可执行的实施步骤。

---

## 一、项目阶段总览

```
MVP 阶段（已完成）
├── M0: 项目初始化     ✅ 2026-05-09
├── M1: 后端开发       ✅ 2026-05-09 ~ 05-13
├── M2: 前端开发       ✅ 2026-05-09 ~ 05-13
└── M3: 知识库建设     ✅ 2026-05-09 ~ 05-13 (942 文件)

中期阶段（当前）
├── M4: 功能完善与部署  ◀── 当前 (预计 3-4 周)
└── M5: 体验优化与扩展      (预计 2-3 周)

后期阶段（MVP 验证后）
├── M6: 测试推广
├── M7: 商业化上线
└── M8: 持续迭代
```

---

## 二、M4 — 功能完善与部署（3-4 周）

### 总体目标

将 MVP 原型变为可部署、可体验、质量可靠的正式产品。

### Sprint 4.1：LLM 真实集成 + 后端完善（第 1 周）

**任务**：

```
[M4.1.1] 真实 LLM 流式调用
  - 修改 llm.py：真实模式使用 httpx 流式调用 LLM API
  - 实现逐 token 推送 SSE（当前为整段返回）
  - 错误处理：API 超时/鉴权失败/K 响应异常
  - Context 构建优化：根据 token 预算动态截取

[M4.1.2] 后端错误处理完善
  - 统一异常处理（HTTPException → 自定义异常类）
  - 输入校验增强（空输入/超长输入/特殊字符）
  - 日志记录（请求/响应/错误）
  - Rate limiting 基础实现

[M4.1.3] 前端错误展示
  - 错误状态 UI（网络错误/后端错误/超时）
  - 重试按钮
  - 友好的中文错误提示
```

**文件影响**：`backend/llm.py`, `backend/main.py`, `frontend/src/components/ChatInterface.tsx`, `frontend/src/lib/api.ts`

**验收**：
- [ ] LLM 真实 API 流式调用正常
- [ ] 流式输出首字延迟 < 500ms
- [ ] 无知识库内容时返回"无法回答"
- [ ] API Key 错误时清晰提示

---

### Sprint 4.2：容器化 + 部署（第 2 周）

**任务**：

```
[M4.2.1] Docker 化后端
  - 创建 `backend/Dockerfile`
  - 多阶段构建（依赖缓存）
  - uvicorn 生产模式启动

[M4.2.2] Docker 化前端
  - 创建 `frontend/Dockerfile`
  - Next.js standalone 模式构建
  - 静态资源优化

[M4.2.3] Nginx 反向代理
  - 创建 `nginx/nginx.conf`
  - 静态文件缓存
  - API 反向代理到后端
  - 前端 SPA fallback

[M4.2.4] Docker Compose 编排
  - 创建 `docker-compose.yml`
  - service: frontend + backend + nginx
  - 网络配置（内部通信）
  - 健康检查

[M4.2.5] CI/CD 流水线
  - GitHub Actions: lint + test + build
  - 镜像构建 + push
  - 部署到云服务器
```

**文件影响**：`backend/Dockerfile`, `frontend/Dockerfile`, `nginx/nginx.conf`, `docker-compose.yml`, `.github/workflows/ci.yml`

**验收**：
- [ ] `docker-compose up -d` → 全部服务正常
- [ ] 外部通过 80 端口访问前端
- [ ] API 调用正常
- [ ] CI 流水线通过

---

### Sprint 4.3：测试体系建立（第 2 周，与部署并行）

**任务**：

```
[M4.3.1] 后端测试
  - pytest 配置（conftest.py）
  - wiki_retriever 测试（Mock 文件系统）
  - llm 测试（Mock API）
  - main 测试（TestClient）
  - 测试覆盖率配置

[M4.3.2] 前端测试
  - Vitest 配置
  - ChatInterface 组件测试
  - MessageBubble 渲染测试
  - API 客户端测试

[M4.3.3] 代码质量门禁
  - ESLint 规则完善
  - TypeScript 严格模式
  - Pre-commit hook
```

**文件影响**：`backend/tests/`, `frontend/src/__tests__/`, `.eslintrc.json`, `pre-commit-config.yaml`

**验收**：
- [ ] 后端测试覆盖率 > 60%
- [ ] 前端核心组件测试通过
- [ ] `npm run lint` 零错误
- [ ] TypeScript 编译零错误

---

### Sprint 4.4：概念浏览功能（第 3 周）

**任务**：

```
[M4.4.1] 概念列表接口增强
  - 支持按章节分组
  - 支持搜索/筛选
  - 返回概念层级结构

[M4.4.2] ConceptTree 组件
  - 树形结构展示（按章节/子模块）
  - 展开/收起动画
  - 搜索过滤
  - 当前概念高亮

[M4.4.3] ConceptDetail 组件
  - Markdown 渲染（含 KaTeX）
  - 来源锚点展示
  - 关联习题入口
  - 暗色模式适配

[M4.4.4] 概念浏览路由
  - `/kaoyan/concepts` → 概念列表页
  - 侧边栏 + 主内容区布局
  - 与聊天界面导航切换
```

**文件影响**：`frontend/src/components/ConceptTree.tsx`, `frontend/src/components/ConceptDetail.tsx`, `frontend/src/app/concepts/page.tsx`, `backend/main.py`

**验收**：
- [ ] 概念树正确展示 421 个概念
- [ ] 搜索功能正常工作
- [ ] 概念详情 LaTeX 正确渲染
- [ ] 与问答界面可切换

---

### Sprint 4.5：文档更新 + 开发者体验（第 4 周）

**任务**：

```
[M4.5.1] 文档更新
  - 确保所有文档与代码一致
  - `.env.example` 文件
  - Makefile（快捷命令）

[M4.5.2] 开发者体验
  - 贡献指南（CONTRIBUTING.md）
  - 本地开发环境一键启动脚本
  - Wiki 操作指南

[M4.5.3] 知识库关联增强
  - INDEX.yaml related 字段读取
  - 概念-习题关联数据预处理
```

**文件影响**：`Makefile`, `.env.example`, `CONTRIBUTING.md`, `docs/`

**验收**：
- [ ] 新开发者 5 分钟本地启动
- [ ] 文档与实际代码结构一致
- [ ] Makefile 常用命令可用

---

## 三、M5 — 体验优化与扩展（2-3 周）

### Sprint 5.1：习题关联（第 1 周）

```
[M5.1.1] 习题-概念关联接口
[M5.1.2] 概念详情页展示关联习题
[M5.1.3] 习题列表页展示涉及概念
[M5.1.4] 习题分类筛选 UI
```

### Sprint 5.2：性能优化（第 1 周，与 5.1 并行）

```
[M5.2.1] 知识库检索缓存（内存/Redis）
[M5.2.2] 索引预加载（启动时加载 INDEX.yaml 到内存）
[M5.2.3] 前端骨架屏 + 加载态优化
[M5.2.4] API 响应压缩
```

### Sprint 5.3：多学科扩展（第 2-3 周）

```
[M5.3.1] 英语学科知识库框架
  - 英语 SCHEMA.md / AGENT.md
  - 5 个初始 L3 文件（词汇/语法/阅读/写作/翻译）

[M5.3.2] 政治学科知识库框架
  - 政治 SCHEMA.md / AGENT.md
  - 5 个初始 L3 文件（马原/毛概/史纲/思修/时政）

[M5.3.3] 多学科验证
  - 切换学科正确路由
  - 学科无内容提示
```

---

## 四、M6 — 测试推广（2 周）

### Sprint 6.1：用户测试（第 1 周）

```
[M6.1.1] 部署正式环境
[M6.1.2] 知乎/小红书/微信群推广
[M6.1.3] 邀请 10-20 名真实用户
[M6.1.4] 使用数据埋点（基础版）
```

### Sprint 6.2：反馈迭代（第 2 周）

```
[M6.2.1] 收集用户反馈
[M6.2.2] P0/P1 Bug 修复
[M6.2.3] 用户体验改进
[M6.2.4] MVP 验证评估
```

---

## 五、当前开发环境说明

### 5.1 本地启动

```bash
# 终端 1：后端
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8001

# 终端 2：前端
cd frontend
npm install
npm run dev

# 访问 http://localhost:3000/kaoyan
```

### 5.2 环境变量

后端支持的环境变量（`backend/.env`）：

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `LLM_API_KEY` | 空 | API Key，空=Mock 模式 |
| `LLM_BASE_URL` | `https://api.openai.com/v1` | API 地址 |
| `LLM_MODEL` | `gpt-4o-mini` | 模型名 |

### 5.3 验证清单

启动后验证：
```bash
# 健康检查
curl http://localhost:8001/health

# 学科列表
curl http://localhost:8001/subjects

# 概念列表
curl http://localhost:8001/concepts/math | jq '.count'

# 问答
curl -X POST http://localhost:8001/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"什么是极限？"}'
```

---

## 六、技术债务

| 债务项 | 影响 | 计划处理时间 |
|--------|------|------------|
| 不存在 `.env.example` | 新开发者需阅读代码了解配置 | M4.5 |
| `pyyaml` 被 try-import（`wiki_retriever.py`） | 未在 requirements.txt 中强制执行 | M4.1 |
| 前端 API 地址硬编码 `localhost:8001` | 无法跨环境 | M4.2 |
| Mock 模式 SSE 逐行模拟 | 不能代表真实 LLM 体验 | M4.1 |
| 无请求日志 | 调试困难 | M4.1 |
| 空 `scripts/` 目录 | 无工具脚本 | M4.5 |
| 前端 basePath 硬编码 `/kaoyan` | 环境切换需要改代码 | M4.2 |
