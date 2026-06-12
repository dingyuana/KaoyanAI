# API 接口契约

> 本文档定义后端所有 API 接口的精确请求/响应格式和错误码。
> 前端开发严格按此契约对接。

---

## 通用约定

- Base URL: `http://localhost:8000`（开发） / 生产环境通过 `/kaoyan/api/*` 代理
- 请求/响应体：`application/json`
- 流式响应：`text/event-stream`
- 所有错误响应格式一致：
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "中文错误描述",
    "detail": {}
  }
}
```

---

## 1. 健康检查

```
GET /health
```

**200 响应**：
```json
{"status": "ok"}
```

---

## 2. 学科列表

```
GET /subjects
```

**200 响应**：
```json
{
  "subjects": ["math", "ds", "arch", "net", "os", "english", "politics"],
  "count": 7
}
```

学科标识说明：

| 标识 | 学科 | 知识库状态 |
|------|------|-----------|
| `math` | 数学 | ✅ 206 概念 + 17 方法 + 30 习题 |
| `ds` | 数据结构 | ✅ 26 概念 + 7 方法 + 6 习题 |
| `arch` | 计算机组成原理 | ✅ 43 概念 + 5 方法 + 5 习题 |
| `net` | 计算机网络 | ✅ 23 概念 + 5 方法 + 5 习题 |
| `os` | 操作系统 | ✅ 23 概念 + 6 方法 + 6 习题 |
| `english` | 英语 | 📁 目录已建立，内容待填充 |
| `politics` | 政治 | 📁 目录已建立，内容待填充 |

---

## 3. 概念列表（按章节分组）

```
GET /concepts/{subject}
```

**路径参数**：

| 参数 | 类型 | 可选值 |
|------|------|--------|
| `subject` | string | math, ds, arch, net, os |

**200 响应**：
```json
{
  "subject": "math",
  "groups": {
    "高等数学": [
      {"id": "L3-math-concept-函数极限", "title": "函数极限", "type": "concept", "tags": ["高等数学"], "related": []},
      {"id": "L3-math-concept-导数", "title": "导数", "type": "concept", "tags": ["高等数学"], "related": []}
    ],
    "线性代数": [
      {"id": "L3-math-concept-矩阵的秩", "title": "矩阵的秩", "type": "concept", "tags": ["线性代数"], "related": []}
    ]
  },
  "count": 206
}
```

**概念条目字段**：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 概念标识（文件名不含 .md），可用于详情查询 |
| `title` | string | 概念标题 |
| `type` | string | `concept` / `method` / `exercise` |
| `tags` | string[] | 标签列表 |
| `related` | string[] | 关联概念文件路径列表 |

**错误**：

- 404: 学科不存在 → `SUBJECT_NOT_FOUND`

---

## 4. 概念详情

```
GET /concepts/{subject}/{concept_id}
```

**路径参数**：

| 参数 | 类型 | 说明 |
|------|------|------|
| `subject` | string | 学科标识 |
| `concept_id` | string | 概念标识（文件名不含 .md 后缀，如 `L3-math-concept-函数极限`） |

**200 响应**：
```json
{
  "id": "L3-math-concept-函数极限",
  "title": "函数极限",
  "subject": "math",
  "type": "concept",
  "tags": ["高等数学"],
  "difficulty": "",
  "related": [],
  "source_anchors": ["RAW-math-高数-P056-concept"],
  "content": "# 函数极限\n\n## 形式化定义\n...（Markdown 正文，含 LaTeX公式）"
}
```

**字段说明**：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 唯一标识 |
| `title` | string | 标题 |
| `subject` | string | 所属学科 |
| `type` | string | `concept` / `method` / `exercise` |
| `tags` | string[] | 标签 |
| `difficulty` | string | 难度（习题用） |
| `related` | string[] | 关联文件路径 |
| `source_anchors` | string[] | L1 锚点引用列表 |
| `content` | string | Markdown 正文（含 LaTeX） |

**错误**：

- 400: 概念不存在 → `INVALID_INPUT`

---

## 5. 关联习题

```
GET /concepts/{subject}/{concept_id}/exercises
```

**200 响应**：
```json
{
  "subject": "ds",
  "concept_id": "二叉树",
  "exercises": [
    {
      "id": "树与二叉树练习题",
      "title": "树与二叉树练习题",
      "tags": ["二叉树", "遍历", "哈夫曼树", "408真题"],
      "difficulty": "中等",
      "score": 12
    }
  ],
  "count": 1
}
```

**字段说明**：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 习题文件标识 |
| `title` | string | 习题标题 |
| `tags` | string[] | 标签（含 `基础篇` / `强化篇` 分级） |
| `difficulty` | string | `简单` / `中等` / `困难` / `""` |
| `score` | int | 匹配度分数 |

---

## 6. 全部习题（按难度分组）

```
GET /exercises/{subject}
```

**200 响应**：
```json
{
  "count": 30,
  "subject": "math",
  "groups": {
    "基础篇": [
      {"id": "xxx", "title": "极限练习题", "tags": ["基础篇", "极限"], "difficulty": "简单"}
    ],
    "强化篇": [
      {"id": "yyy", "title": "多元函数微分习题", "tags": ["强化篇"], "difficulty": "困难"}
    ]
  }
}
```

分组键为 `基础篇` / `强化篇` / `其他`，仅包含有内容的分组。

---

## 7. 问答（非流式）

```
POST /chat
```

**请求体**：
```json
{
  "message": "什么是极限？",
  "subject": "math"
}
```

| 字段 | 类型 | 必填 | 约束 |
|------|------|------|------|
| `message` | string | 是 | 1-1000 字符，不含 `<script>` |
| `subject` | string | 否 | 学科标识，null=搜索全部学科 |

**200 响应**：
```json
{
  "answer": "极限是高等数学的核心概念，指的是当自变量趋近于某个值时，函数趋近的固定值。\n\n## 定义\n用一句话概括：\n> **无限接近，但永远达不到的那个\"目标值\"**\n\n...",
  "sources": [
    "math/L3/L3-math-concept-函数极限.md",
    "math/L3/L3-math-concept-极限保号性定理的证明.md"
  ]
}
```

**错误**：

| 状态码 | 错误码 | 场景 |
|--------|--------|------|
| 400 | `INVALID_INPUT` | 消息为空 / 超长 / 含非法字符 |
| 502 | `LLM_ERROR` | LLM API 调用失败 |

---

## 8. 问答（流式 SSE）

```
POST /chat/stream
```

**请求体**：同 `/chat`

**响应**：`text/event-stream`

**事件流格式**：

```
data: {"type":"sources","sources":["math/L3/L3-math-concept-函数极限.md"]}\n\n
data: {"type":"chunk","content":"极限是高等数学的核心概念，"}\n\n
data: {"type":"chunk","content":"指的是当自变量趋近于某个值时，"}\n\n
data: {"type":"chunk","content":"函数趋近的固定值。"}\n\n
data: {"type":"done"}\n\n
```

| 事件 | 说明 |
|------|------|
| `sources` | 知识库来源列表，在回答开始前推送一次 |
| `chunk` | 回答文本片段，逐 token/逐句推送 |
| `done` | 回答结束 |

**前端 SSE 消费示例**（TypeScript）：
```typescript
const response = await fetch('/kaoyan/api/chat/stream', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message, subject }),
});

const reader = response.body!.getReader();
const decoder = new TextDecoder();
let buffer = '';

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  buffer += decoder.decode(value, { stream: true });
  const lines = buffer.split('\n');
  buffer = lines.pop() || '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('data:')) continue;
    const event = JSON.parse(trimmed.slice(5));
    switch (event.type) {
      case 'sources': /* event.sources */ break;
      case 'chunk':   /* event.content */  break;
      case 'done':    /* 完成 */           break;
    }
  }
}
```

---

## 9. 错误码全表

| 错误码 | HTTP | 含义 | 触发条件 |
|--------|------|------|----------|
| `SUBJECT_NOT_FOUND` | 404 | 学科不存在 | 请求的 subject 不在 `get_subjects()` 返回值中 |
| `INVALID_INPUT` | 400 | 输入校验失败 | 空消息 / 超 1000 字 / 含 `<script>` / 概念 ID 不存在 |
| `LLM_ERROR` | 502 | LLM 服务异常 | API 超时 / 鉴权失败 / 连接失败 / 响应异常 |
| `RATE_LIMITED` | 429 | 请求过于频繁 | 同一 IP 超出限流阈值 |
| `INTERNAL_ERROR` | 500 | 服务器内部错误 | 未捕获的异常 |

---

## 10. 前端 API 代理路由

前端通过 Next.js API Route 代理到后端，避免 CORS 问题。

| 前端路径 | 后端目标 |
|----------|---------|
| `POST /kaoyan/api/chat/stream` | `POST :8000/chat/stream` |
| `POST /kaoyan/api/chat` | `POST :8000/chat` |
| `GET /kaoyan/api/subjects` | `GET :8000/subjects` |
| `GET /kaoyan/api/concepts/{subject}` | `GET :8000/concepts/{subject}` |
| `GET /kaoyan/api/concepts/{subject}/{id}/exercises` | `GET :8000/concepts/{subject}/{id}/exercises` |
| `GET /kaoyan/api/exercises/{subject}` | `GET :8000/exercises/{subject}` |

后端地址默认为 `http://localhost:8000`，可通过环境变量 `BACKEND_URL` 配置。
