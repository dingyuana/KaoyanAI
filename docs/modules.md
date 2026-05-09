# 考研知识库问答系统 · 模块划分与接口定义

---

## 一、MVP 模块（M1-M3）

MVP 阶段只有3个模块，全是核心功能。

### M1：后端问答服务

**文件**: `backend/main.py` + `backend/search.py`

**职责**:
- 提供 `/api/v1/query`（问答）和 `/api/v1/subjects`（学科列表）
- glob 读取 `wiki/math/L3/` 下的 MD 文件
- 关键词匹配返回相关文件内容
- 调用 LLM API 生成回答

**接口**:

```python
# POST /api/v1/query
# 请求: {"question": "极限怎么求", "subject": "math"}
# 响应: {"answer": "...", "sources": [...], "status": "ok"}

# GET /api/v1/subjects
# 响应: {"subjects": [{"id": "math", "name": "数学", "status": "active"}]}
```

**验收**:
- [ ] glob 正确读取 `wiki/math/L3/**/*.md`
- [ ] 关键词匹配返回相关文档
- [ ] LLM 调用成功，返回回答
- [ ] 响应时间 < 3秒（不含 LLM 延迟）

---

### M2：前端问答界面

**文件**: `frontend/app/page.tsx` + `frontend/components/ChatPanel.tsx`

**职责**:
- 单页问答界面（学科选择 + 提问 + 回答展示）
- 调用后端 API 获取回答
- LaTeX 公式渲染（KaTeX）
- 引用来源展示

**验收**:
- [ ] 输入问题，发送后显示加载状态
- [ ] 回答展示（流式或非流式）
- [ ] LaTeX 公式正确渲染
- [ ] 显示来源文件名
- [ ] 移动端布局正常

---

### M3：Wiki 知识库框架

**文件**: `wiki/math/` 目录结构 + 5个L3文件

**职责**:
- 提供可检索的数学知识内容
- 格式符合 `docs/WIKI.md` 规范
- 包含 Frontmatter 和 Markdown 正文

**验收**:
- [ ] 目录结构正确（raw/L2/L3/TEMPLATES/INDEX.yaml）
- [ ] 5个L3文件存在（极限/导数/积分/微分方程/级数）
- [ ] 每个文件包含 Frontmatter
- [ ] 每个文件包含足够内容供 LLM 参考（≥500字）

---

## 二、Commercial 模块（M4-M8）

> 以下模块在 MVP 验证通过后逐步实现。

### M4：学科切换功能

- **组件**: `SubjectSwitcher.tsx`
- **接口**: `GET /api/v1/subjects`
- **验收**:
  - [ ] 支持数学/英语/政治切换
  - [ ] 切换后检索对应学科知识库

### M5：概念树浏览

- **接口**: `GET /api/v1/concepts`、`GET /api/v1/concept/:id`
- **组件**: `ConceptTree.tsx`、`ConceptDetail.tsx`
- **验收**:
  - [ ] 树形结构展示知识库目录
  - [ ] 点击概念查看详情
  - [ ] 详情页显示关联习题

### M6：检索增强

- **文件**: `backend/services/search.py`
- **实现**: PostgreSQL 全文搜索 + Qdrant 向量检索
- **验收**:
  - [ ] 关键词检索返回精确匹配
  - [ ] 语义检索返回相关文档
  - [ ] 混合排序，相关结果排在前列

### M7：用户系统

- **接口**: `/auth/login`、`/api/v1/history`、`/api/v1/favorites`
- **组件**: `LoginModal.tsx`、`HistoryList.tsx`
- **验收**:
  - [ ] 微信登录可用
  - [ ] 查询历史正确保存和展示

### M8：监控与部署

- **文件**: `k8s/` 目录、`docker-compose.yml`
- **实现**: Prometheus + Grafana 监控、K8s 部署
- **验收**:
  - [ ] 错误率、延迟、token 消耗可追踪
  - [ ] 蓝绿部署可用