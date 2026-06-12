# 考研知识库问答系统 · Makefile
#
# 常用命令快捷入口
# 首次使用: make setup
# 日常开发: make dev

.PHONY: help setup dev-backend dev-frontend dev test-backend test-frontend test lint clean

help: ## 显示帮助
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: ## 首次环境搭建
	@echo "==> 安装后端依赖..."
	cd backend && pip install -r requirements.txt
	@echo "==> 安装前端依赖..."
	cd frontend && npm install
	@echo "==> 配置环境变量..."
	@if [ ! -f backend/.env ]; then cp backend/.env.example backend/.env && echo "已创建 backend/.env，请编辑填入 API Key"; fi
	@echo "✅ 完成"

dev-backend: ## 启动后端开发服务器（端口 8090）
	cd backend && uvicorn main:app --reload --port 8090

dev-frontend: ## 启动前端开发服务器（端口 3003）
	cd frontend && npm run dev -- --port 3003

dev: ## 同时启动前后端（需要 tmux）
	@echo "请在两个终端分别运行:"
	@echo "  make dev-backend"
	@echo "  make dev-frontend"

test-backend: ## 运行后端测试
	cd backend && python3 -m pytest tests/ -v

test-frontend: ## 运行前端单元测试
	cd frontend && npx vitest run

test-e2e: ## 运行 E2E 浏览器测试（需先启动前后端）
	cd frontend && npx playwright test ../e2e/ --config=../e2e/playwright.config.ts

test: test-backend test-frontend ## 运行全部测试

lint: ## 运行代码检查
	cd frontend && npm run lint 2>/dev/null || true
	@echo "Python 类型检查: python3 -m mypy backend/ 2>/dev/null || echo '(需安装 mypy)'"

build-frontend: ## 构建前端生产版本
	cd frontend && npm run build

check-integrity: ## 知识库完整性检查
	python3 scripts/check_integrity.py

clean: ## 清理缓存文件
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete 2>/dev/null || true
	rm -rf frontend/.next
	@echo "✅ 缓存已清理"