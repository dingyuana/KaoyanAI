<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:kaoyan-project-context -->
# 考研知识库问答系统 · 项目上下文

## 项目结构
```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # 问答首页
│   │   ├── layout.tsx                  # 布局（含 metadata）
│   │   └── api/chat/
│   │       ├── route.ts                # 非流式 API 代理
│   │       └── stream/route.ts        # 流式 SSE API 代理
│   ├── components/
│   │   ├── ChatInterface.tsx           # 问答面板
│   │   └── MessageBubble.tsx           # 消息气泡（KaTeX）
│   └── lib/
│       └── api.ts                      # SSE 客户端
├── package.json
├── next.config.ts
└── tsconfig.json
```

## 关键路由
- `/kaoyan` → 问答首页（page.tsx）
- `/kaoyan/api/chat/stream` → SSE 代理 → `localhost:8001/chat/stream`

## 组件依赖
- 公式渲染：`katex` (renderToString)
- 图标：`lucide-react`
- 后端代理：Fetch API + ReadableStream

## 开发命令
```bash
npm run dev    # 开发服务器 :3000
npm run build  # 生产构建
```

## 重要约束
- ❌ 不要直接连接 wiki 文件系统（通过后端 API 获取数据）
- ❌ 不要引入未在 package.json 中列出的新依赖
- ✅ Tailwind CSS 4 原子类
- ✅ 流式优先（SSE 协议）
- ✅ 暗色模式支持（`dark:` 前缀）
- ✅ 错误信息用中文
<!-- END:kaoyan-project-context -->
