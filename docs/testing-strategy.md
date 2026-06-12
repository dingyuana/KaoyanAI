# 测试策略

> 本文档定义项目测试的范围、策略、规范和覆盖率目标。

---

## 1. 测试工具栈

| 层 | 工具 | 用途 |
|----|------|------|
| 后端 | pytest + TestClient | FastAPI 异步测试 |
| 前端 | Vitest + Testing Library | 组件测试 |
| 前端环境 | jsdom | 浏览器环境模拟 |
| Mock | unittest.mock / vi.mock | 外部依赖隔离 |
| 覆盖率 | pytest-cov (目标) / c8 (目标) | 覆盖率报告 |

---

## 2. 测试范围

### 2.1 后端测试（42 tests）

| 模块 | 文件 | 测试数 | 覆盖内容 |
|------|------|--------|---------|
| 异常类 | `test_exceptions.py` | 7 | 5 种自定义异常的 status_code / message / detail |
| LLM | `test_llm.py` | 6 | token 估算、上下文截断、Mock 响应、generate 接口 |
| 流式 LLM | `test_llm_stream.py` | 3 | 流式 chunk 输出、空上下文降级 |
| API 路由 | `test_main.py` | 16 | 所有 endpoint 状态码/响应结构/错误场景 |
| 知识库检索 | `test_wiki_retriever.py` | 10 | 相关度评分、n-gram、学科自动检测 |

### 2.2 前端测试（19 tests）

| 组件 | 文件 | 测试数 | 覆盖内容 |
|------|------|--------|---------|
| MessageBubble | `MessageBubble.test.tsx` | 7 | 用户/助手样式、LaTeX 渲染、左右对齐 |
| ChatInterface | `ChatInterface.test.tsx` | 12 | 空状态、输入、提交、流式展示、错误恢复、重试 |

---

## 3. Mock 策略

### 3.1 LLM 调用

后端通过 `MOCK_MODE` 标志控制：

- **MOCK_MODE = True**（无 API Key 时自动启用）：返回检索到的知识库内容片段，不调用真实 API
- **测试中使用 `@patch('llm.MOCK_MODE', True)`** 确保测试不依赖真实 API

```python
# 示例：测试 chat endpoint
@patch('llm.MOCK_MODE', True)
def test_chat_valid_message_returns_answer(self, client):
    resp = client.post("/chat", json={"message": "什么是极限？"})
    assert resp.status_code == 200
    assert "answer" in resp.json()
```

### 3.2 前端 API

前端测试通过 `vi.mock` 模拟 API 调用：

```typescript
// 示例：Mock SSE 流式响应
vi.mock('@/lib/api', () => ({
  sendChatMessageStream: vi.fn(),
}));
```

### 3.3 fetch 请求

前端测试中全局 mock fetch 以模拟学科列表加载：

```typescript
// setup.ts
global.fetch = () =>
  Promise.resolve({
    json: () => Promise.resolve({ subjects: ['math', 'ds', 'arch', 'net', 'os'], count: 5 }),
    ok: true,
  }) as Promise<Response>;
```

### 3.4 JSDOM 补丁

```typescript
// setup.ts - JSDOM 缺失的浏览器 API
Element.prototype.scrollIntoView = () => {};
```

---

## 4. 测试规范

### 4.1 命名规范

```
test_{功能}_{场景}
```

```python
# 后端
def test_concepts_math_ok(self):           # 正常场景
def test_concepts_unknown_returns_404(self):  # 异常场景
def test_stream_without_context(self):     # 边界场景
```

```typescript
// 前端
it('renders user message with correct styling');
it('calls sendChatMessageStream with correct params on submit');
it('shows retry button on error');
```

### 4.2 新增测试要求

提交代码时满足以下条件之一应补充测试：

- ✅ 新增 API endpoint
- ✅ 修改知识库检索逻辑
- ✅ 修改 LLM 调用逻辑
- ✅ 新增/修改前端组件
- ✅ 修复 Bug
- ❌ 纯文本/配置修改（README、文档）
- ❌ 知识库内容文件（.md）

### 4.3 测试隔离

- 每个测试应独立运行，不依赖其他测试的执行状态
- 使用 `conftest.py` 中的 fixture 共享 TestClient
- 前端测试使用 `beforeEach` / `afterEach` 重置 mock

---

## 5. 运行方式

```bash
# 全部测试
make test

# 仅后端
make test-backend
# cd backend && python3 -m pytest tests/ -v

# 仅前端
make test-frontend
# cd frontend && npx vitest run
```

---

## 6. 当前状态

| 指标 | 当前值 | 目标值 |
|------|--------|--------|
| 后端测试数 | 42 | ≥60 |
| 前端测试数 | 19 | ≥30 |
| 后端测试通过率 | 100% | 100% |
| 前端测试通过率 | 100% | 100% |
| API endpoint 覆盖率 | 80%（8/10 endpoints） | 100% |
| LLM 模块覆盖率 | ~70%（Mock/流式/边界） | ≥80% |

### 待覆盖的测试缺口

1. **限流模块**：`rate_limiter.py` 尚无单元测试
2. **日志模块**：`logging_config.py` 尚无测试
3. **前端概念浏览**：ConceptTree / ConceptDetail 尚无组件测试
4. **后端全局异常处理**：`general_error_handler` 未测试
5. **长知识库的超时场景**：检索超大文件时的行为