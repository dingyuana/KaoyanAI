# 考研知识库问答系统 · 模块划分与接口定义

> 本文档分为两部分：**MVP 模块**（当前）和 **Commercial 模块**（后期）。

---

# 第一部分：MVP 模块

MVP 只有一个模块：`完整问答流程`。

## M1: 完整问答流程

### 前端部分（frontend/index.html）

- **文件**: `frontend/index.html`
- **职责**: 单页问答界面
- **验收**:
  - [ ] 输入框输入问题，发送按钮可点击
  - [ ] 回答以流式方式逐步显示
  - [ ] 数学公式正确渲染（KaTeX）
  - [ ] 引用来源以文件名+摘录形式展示
  - [ ] 学科切换 UI 存在但暂时只支持数学
  - [ ] 移动端布局正常

### 后端部分（backend/main.py）

- **文件**: `backend/main.py`（单文件，包含所有路由和服务）
- **职责**: 接收请求、检索知识库、调用LLM、返回流式回答
- **接口**:

  ```python
  # 问答
  @app.post("/api/v1/query")
  async def query(question: str, subject: str = "math"):
      # glob读MD → 关键词匹配 → 截取相关段落
      # → 调用LLM → 返回SSE流
      pass

  # 学科列表
  @app.get("/api/v1/subjects")
  async def get_subjects():
      return {"subjects": [{"id": "math", "name": "数学", "status": "active"}]}
  ```

- **验收**:
  - [ ] 正确读取 `wiki/math/*.md` 文件
  - [ ] 关键词匹配返回相关文件
  - [ ] LLM调用成功，流式返回
  - [ ] 无知识库内容时返回"无法回答"
  - [ ] 响应时间 < 5秒（不含LLM延迟）

### 知识库部分（wiki/math/*.md）

- **文件**: `wiki/math/*.md`（20-30个概念文件）
- **职责**: 提供可检索的数学知识内容
- **格式**: 每个文件包含概念名称、定义、示例、公式
- **验收**:
  - [ ] 至少5个核心概念文件（极限/导数/积分/微分方程/级数）
  - [ ] 每个文件包含足够内容供LLM参考
  - [ ] 文件名为中文概念名（如"极限.md"）

### 部署部分

- **文件**: `nginx/nginx.conf`, `docker-compose.yml`
- **职责**: 一键启动全部服务
- **验收**:
  - [ ] `docker-compose up` 启动成功
  - [ ] Nginx 反向代理正确（静态文件 + API）
  - [ ] 可通过 http://服务器IP 访问

---

# 第二部分：Commercial 模块

> 以下模块在 MVP 验证通过后逐步实现。

## 前端模块

### M2: 学科切换模块

- **组件**: `SubjectSwitcher`
- **状态**: `useSubjectStore` (Zustand)
- **接口**: 无后端接口，纯前端状态管理
- **验收**:
  - [ ] 点击切换，3个Tab高亮正确
  - [ ] 切换后，后续API请求带上正确subject参数
  - [ ] 切换时，保留未发送的输入内容

### M3: 概念浏览模块

- **组件**: `ConceptTree`, `ConceptDetail`
- **接口**: `GET /api/v1/concepts`, `GET /api/v1/concept/:id`
- **验收**:
  - [ ] 树形结构正确展开/收起
  - [ ] 点击概念显示详情（Markdown渲染）
  - [ ] 详情页显示关联习题

### M4: 用户模块

- **组件**: `LoginModal`, `HistoryList`, `FavoritesList`
- **接口**: `POST /auth/login`, `GET /api/v1/history`, `POST /api/v1/favorites`
- **验收**:
  - [ ] 微信扫码登录可用
  - [ ] 历史记录正确保存和展示

## 后端模块

### M5: 查询路由模块

- **文件**: `backend/app/api/query.py`
- **依赖**: SearchService, LLMService
- **接口**: `POST /api/v1/query`
- **验收**:
  - [ ] 接收 subject + question，返回流式回答
  - [ ] subject无效时返回400
  - [ ] 超时30秒后优雅降级

### M6: 检索引擎模块

- **文件**: `backend/app/services/search.py`
- **实现**: Elasticsearch + Milvus 混合检索
- **关键方法**:
  ```python
  async def search(query: str, subject: str, top_k: int = 5) -> List[SearchResult]
  ```
- **验收**:
  - [ ] 关键词检索返回精确匹配
  - [ ] 语义检索返回相关文档
  - [ ] 混合排序后，相关结果排在前列

### M7: LLM服务模块

- **文件**: `backend/app/services/llm.py`
- **关键方法**:
  ```python
  async def generate_answer(
      question: str,
      context: str,
      subject: str,
      stream: bool = True
  ) -> AsyncIterator[str]
  ```
- **验收**:
  - [ ] 基于context回答，不编造
  - [ ] 流式输出正常
  - [ ] 缓存命中时跳过LLM调用

### M8: 知识库同步模块（离线）

- **文件**: `scripts/sync_kb.py`
- **触发**: GitHub Actions / 手动
- **流程**: Hermes更新 → 重新索引ES → 重新向量化Milvus
- **验收**:
  - [ ] 新知识入库后，5分钟内可检索
  - [ ] 旧知识更新后，旧索引被覆盖