# 考研知识库问答系统 · 中期开发计划

> 更新日期：2026-06-09
> 当前阶段：M4 — 知识库扩展与功能完善
> 本计划承接 `docs/08-midterm-goals.md` 中定义的中期开发目标，给出可执行的实施步骤。

---

## 一、项目阶段总览

```
MVP 阶段（已完成）
├── M0: 项目初始化       ✅
├── M1: 后端开发         ✅（含异常处理/日志/限流/LLM流式）
├── M2: 前端开发         ✅
└── M3: 知识库建设       ✅（数学 737 文件 + 408 四门课 RAW 837 文件）

中期阶段（当前）
├── M4: 知识库扩展与功能完善  ◀── 当前（预计 4-5 周）
│   ├── Sprint 4.1: 408 知识库 L3 编译（第 1-2 周）
│   ├── Sprint 4.2: 多学科后端适配（第 2 周）
│   ├── Sprint 4.3: 概念浏览功能（第 3 周）
│   ├── Sprint 4.4: 质量保障体系（第 4 周）
│   └── Sprint 4.5: 习题关联 + 开发者体验（第 5 周）
├── M5: 体验优化与扩展        （预计 2-3 周）
└── M6: 发布与测试            （预计 2 周）
```

### 关键决策

> **开发阶段不使用 Docker**：开发阶段保持本地运行（`uvicorn` + `npm run dev`），Docker 容器化仅在发布阶段（M6）启用。
> 现有 `docker-compose.yml` / `Dockerfile` 保留不动，M6 统一验证。

---

## 二、M4 — 知识库扩展与功能完善（4-5 周）

### 总体目标

将数学 + 408 计算机专业课知识库建设为可检索、可问答的完整体系，完善多学科支持和概念浏览功能。

---

### Sprint 4.1：408 知识库 L3 编译（第 1-2 周）

**背景**：数据结构（ds, 196 RAW）、组成原理（arch, 255 RAW）、网络（net, 200 RAW）、操作系统（os, 186 RAW）四门课的 RAW 材料和 INDEX 索引已就绪，需编译为可检索的 L3 应用文档。

**任务**：

```
[M4.1.1] L3 编译规则确认
  - 读取各学科 SCHEMA.md / AGENT.md / TEMPLATES/ 确立模板规则
  - 确认概念/方法/习题三种文档类型的模板差异
  - 明确锚点 ID 格式（L3-{学科}-{类型}-{标识}）

[M4.1.2] 数据结构 L3 编译
  - 8 章内容 → 每章至少 3 个概念文档 + 1 个方法文档 + 1 个习题文档
  - 目标：≥25 个 L3 概念 + 5 方法 + 5 习题
  - 重点章节：线性表、树与二叉树、图、排序、查找

[M4.1.3] 计算机组成原理 L3 编译
  - 目标：≥25 个 L3 概念 + 5 方法 + 5 习题
  - 重点：数据表示、存储系统、指令系统、CPU、总线与I/O

[M4.1.4] 计算机网络 L3 编译
  - 目标：≥20 个 L3 概念 + 5 方法 + 5 习题
  - 重点：体系结构、物理层、数据链路层、网络层、传输层、应用层

[M4.1.5] 操作系统 L3 编译
  - 目标：≥20 个 L3 概念 + 5 方法 + 5 习题
  - 重点：进程管理、内存管理、文件管理、I/O 管理

[M4.1.6] L3 完整性检查
  - 验证 Frontmatter 完整（id/title/type/tags/source_anchors）
  - 验证 source_anchors 指向有效 RAW 锚点
  - 验证 INDEX.yaml processed_to_L3 字段已更新
```

**工作方式**：

```
四门课可并行编译，每门课作为一个独立工作流：
  1. 读取 SCHEMA.md / AGENT.md 了解学科规范
  2. 加载 TEMPLATES/ 中对应模板
  3. 按 INDEX.yaml 章节顺序，逐章提取 RAW → 编译 L3
  4. 编译完成后更新 INDEX.yaml processed_to_L3
  5. 运行完整性检查
```

**文件影响**：`wiki/ds/L3/concepts/`, `wiki/ds/L3/methods/`, `wiki/ds/L3/exercises/` 及对应 arch/net/os 目录

**验收**：
- [ ] 每门课 ≥20 个 L3 概念文件 + 5 个方法文件 + 5 个习题文件
- [ ] L3 文件 Frontmatter 完整、锚点可追溯
- [ ] `wiki_retriever.py` 可直接检索新学科内容
- [ ] `GET /concepts/{subject}` 返回 CS 学科概念列表

---

### Sprint 4.2：多学科后端适配（第 2 周，可与 4.1 并行）

**任务**：

```
[M4.2.1] 后端学科配置扩展
  - config.py: SUBJECTS 列表从 ["math", "english", "politics"] 扩展为全量
  - SUBJECTS = ["math", "english", "politics", "ds", "arch", "net", "os"]
  - 保留 get_subjects() 自动检测逻辑（基于目录中有无 SCHEMA.md）

[M4.2.2] 学科校验逻辑更新
  - main.py 中 subject 校验：从硬编码列表改为调用 get_subjects() 动态检测
  - 不存在的学科返回友好中文错误

[M4.2.3] 前端学科切换 UI 更新
  - ChatInterface.tsx: 7 学科图标/名称映射
  - 计算机学科使用对应图标
  - 学科无 L3 内容时前端展示"暂无内容"提示

[M4.2.4] 跨学科检索验证
  - 验证切换学科后知识库路由正确
  - 验证 CS 学科问答能命中对应 L3 内容
  - 验证数学学科不受影响
```

**文件影响**：`backend/config.py`, `backend/main.py`, `frontend/src/components/ChatInterface.tsx`

**验收**：
- [ ] 前端 7 学科切换正常
- [ ] 各学科问答正确路由到对应 L3 目录
- [ ] 无知识库学科友好降级
- [ ] 数学功能不受影响

---

### Sprint 4.3：概念浏览功能（第 3 周）

**任务**：

```
[M4.3.1] ConceptTree 组件
  - 树形结构展示（按章节/知识领域组织概念列表）
  - 展开/收起动画
  - 搜索过滤（按名称/章节）
  - 当前概念高亮
  - 适应 7 学科数据

[M4.3.2] ConceptDetail 组件
  - Markdown 渲染（含 KaTeX 公式）
  - 来源锚点展示
  - 关联习题入口（调用已有 get_related_exercises API）
  - 暗色模式适配

[M4.3.3] 概念浏览路由与页面
  - `/kaoyan/concepts` 概念列表页（含学科选择器）
  - `/kaoyan/concepts/[subject]` 学科概念列表
  - `/kaoyan/concepts/[subject]/[id]` 概念详情页
  - 侧边栏 + 主内容区布局
  - 与聊天界面导航切换

[M4.3.4] 概念浏览后端增强
  - 后端 `/concepts/{subject}` 已有 chapter 分组，确认是否满足前端需求
  - 若不足：增加返回层级深度
```

**文件影响**：
- 新增：`frontend/src/components/ConceptTree.tsx`, `frontend/src/components/ConceptDetail.tsx`
- 新增：`frontend/src/app/concepts/page.tsx`, `frontend/src/app/concepts/[subject]/page.tsx`, `frontend/src/app/concepts/[subject]/[id]/page.tsx`
- 可能修改：`backend/main.py`（概念接口增强）

**验收**：
- [ ] 概念树正确展示 7 学科概念
- [ ] 搜索功能正常工作
- [ ] 概念详情 LaTeX 正确渲染
- [ ] 与问答界面可切换

---

### Sprint 4.4：质量保障体系（第 4 周）

**任务**：

```
[M4.4.1] 后端测试
  - pytest 配置（conftest.py + 临时目录 fixture）
  - wiki_retriever 测试（Mock 文件系统 + 关键词匹配）
  - llm 测试（Mock API 响应）
  - main 测试（TestClient + 异常场景）
  - 测试覆盖率配置（pytest-cov）

[M4.4.2] 前端测试
  - Vitest 配置验证（已安装依赖）
  - ChatInterface 组件测试（消息发送/流式接收/学科切换）
  - MessageBubble 渲染测试（含 KaTeX 渲染）
  - API 客户端测试（Mock SSE）

[M4.4.3] 代码质量门禁
  - ESLint 规则完善（已有 eslint-config-next）
  - TypeScript 严格模式无报错验证
  - 前端 build 验证
  - Python 类型注解基本覆盖
```

**文件影响**：`backend/tests/`, `frontend/src/__tests__/`

**验收**：
- [ ] 后端测试覆盖率 > 60%（核心模块）
- [ ] 前端核心组件测试通过
- [ ] `npm run lint` 零错误
- [ ] TypeScript 编译零错误
- [ ] `npm run build` 通过

---

### Sprint 4.5：习题关联 + 开发者体验（第 5 周）

**任务**：

```
[M4.5.1] 习题关联前端展示
  - 概念详情页底部展示关联习题列表（调用已有 API）
  - 习题列表页展示涉及的概念
  - 习题按类型/难度筛选 UI

[M4.5.2] 文档更新
  - 更新 README.md 反映 7 学科现状
  - 更新 docs/* 与代码实际结构一致
  - `.env.example` 文件

[M4.5.3] 开发者体验
  - Makefile（快捷命令：dev-backend / dev-frontend / test / lint）
  - 贡献指南（CONTRIBUTING.md）
  - 本地开发文档（5 分钟内启动指南）

[M4.5.4] 知识库完整性脚本
  - scripts/check_integrity.py：遍历 L3 文档验证 source_anchors
  - scripts/check_coverage.py：计算 L2→L3 覆盖率
```

**文件影响**：`Makefile`, `.env.example`, `CONTRIBUTING.md`, `scripts/`, `docs/`

**验收**：
- [ ] 概念详情页显示关联习题
- [ ] 新开发者 5 分钟本地启动
- [ ] 文档与实际代码结构一致
- [ ] Makefile 常用命令可用

---

## 三、M5 — 体验优化与扩展（2-3 周）

### Sprint 5.1：英语/政治知识库（第 1 周）

```
[M5.1.1] 英语学科知识库框架
  - 英语 SCHEMA.md / AGENT.md（基于数学模板改编）
  - 至少 5 个初始 L3 文件（词汇/语法/阅读/写作/翻译）

[M5.1.2] 政治学科知识库框架
  - 政治 SCHEMA.md / AGENT.md
  - 至少 5 个初始 L3 文件（马原/毛概/史纲/思修/时政）
```

### Sprint 5.2：性能优化（第 2 周）

```
[M5.2.1] 知识库检索缓存验证（已有 TTL cache，验证是否够用）
[M5.2.2] 索引预加载（启动时加载 INDEX.yaml 到内存）
[M5.2.3] 前端骨架屏 + 加载态优化
[M5.2.4] 前端 basePath 与环境配置
```

---

## 四、M6 — 发布与测试（2 周）

### Sprint 6.1：Docker 发布部署（第 1 周）

```
[M6.1.1] 验证现有 docker-compose.yml 可用
  - backend/Dockerfile 多阶段构建
  - frontend/Dockerfile Next.js standalone 构建
  - nginx/nginx.conf 反向代理配置
  - docker-compose.yml 全栈编排

[M6.1.2] CI/CD 流水线
  - GitHub Actions: lint + test + build
  - 镜像构建验证

[M6.1.3] 生产环境部署
  - 云服务器（1C2G）部署
  - 域名 + HTTPS 配置
  - 健康检查 + 自动重启
```

### Sprint 6.2：用户测试（第 2 周）

```
[M6.2.1] 邀请 10-20 名真实用户（知乎/小红书/微信群推广）
[M6.2.2] 收集用户反馈
[M6.2.3] P0/P1 Bug 修复
[M6.2.4] MVP 验证评估
```

---

## 五、开发环境说明

### 5.1 本地启动（开发阶段）

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

# 数学概念列表
curl http://localhost:8001/concepts/math | jq '.count'

# 数据结构概念列表（L3 完成后）
curl http://localhost:8001/concepts/ds | jq '.count'

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
| `pyyaml` 被 try-import（`wiki_retriever.py`） | 未在 requirements.txt 中强制执行 | M4.4 |
| 前端 API 地址硬编码 `localhost:8001` | 无法跨环境 | M5.2 |
| 无请求日志 | 调试困难 | ✅ 已实现（logging_config.py） |
| 空 `scripts/` 目录 | 无工具脚本 | M4.5 |
| 前端 basePath 硬编码 `/kaoyan` | 环境切换需要改代码 | M5.2 |
| 408 四门课 RAW 就绪但无 L3 | 无法检索和问答 | M4.1（当前 Sprint） |
| 后端 SUBJECTS 列表未包含 CS 学科 | 前端看不到新学科 | M4.2 |
