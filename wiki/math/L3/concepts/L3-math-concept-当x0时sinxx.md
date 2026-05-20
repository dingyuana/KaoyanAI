---
id: L3-math-concept-当x0时sinxx
title: 当x0时sinxx
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors:
  - RAW-math-高数-P122-concept
related: []
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P122-concept]]

# 当x0时sinxx

# 当 $x \to 0$ 时 $\sin x \sim x$（等价无穷小）


## 元数据

| 字段 | 内容 |
|------|------|
| 章节 | 2026 张宇高数 18讲(OCR) |
| 难度 | ★★☆☆☆ |


## 1. 概念定义

**等价无穷小**是指两个无穷小量之比的极限为1，即：

$$若 \lim_{x \to x_0} \frac{\alpha(x)}{\beta(x)} = 1，则 \alpha(x) \sim \beta(x)$$

最基本的等价无穷小关系是：当 $x \to 0$ 时，$\sin x$ 与 $x$ 是**等价无穷小**。

> **几何意义**：在 $x = 0$ 附近，正弦函数的图像与 $y = x$ （过原点的直线）几乎重合，曲线的切线就是 $y = x$。


## 2. 核心公式

### 2.1 普通函数型等价无穷小

当 $x \to 0$ 时：

| 序号 | 等价关系 |
| (1) | $\sin x \sim x$ |
| (2) | $\tan x \sim x$ |
| (3) | $\arcsin x \sim x$ |
| (4) | $\arctan x \sim x$ |
| (5) | $e^x - 1 \sim x$ |
| (6) | $\ln(1 + x) \sim x$ |
| (7) | $\ln(x + \sqrt{1 + x^2}) \sim x$ |
| (8) | $a^x - 1 \sim x \ln a \quad (a > 0, a \neq 1)$ |
| (9) | $1 - \cos x \sim \dfrac{x^2}{2}$ |
| (10) | $1 - \cos^a x \sim \dfrac{a}{2}x^2 \quad (a \neq 0)$ |
| (11) | $(1 + x)^a - 1 \sim ax \quad (a \neq 0)$ |

### 2.2 差函数型等价无穷小

当 $x \to 0$ 时：

| 序号 | 等价关系 |
| (1) | $x - \ln(1 + x) \sim \dfrac{x^2}{2}$ |
| (2) | $x - \arcsin x \sim -\dfrac{x^3}{6}$ |
| (3) | $x - \tan x \sim -\dfrac{x^3}{3}$ |
| (4) | $x - \arctan x \sim \dfrac{x^3}{3}$ |
| (5) | $x - \ln(1 + \sin x) \sim \dfrac{x^2}{2}$ |
| (6) | $e^x - 1 - x \sim \dfrac{x^2}{2}$ |

### 2.3 复合函数型等价无穷小

当 $x \to 0$ 时，若 $f(x) \sim ax^m$，$g(x) \sim bx^n$，且 $ab \neq 0$，$m, n$ 为正整数，则：

$$f[g(x)] \sim ab^n \cdot x^{mn}$$

> **注**：若 $m, n$ 为正实数，该命题在 $x \to 0^+$ 时亦成立。


## 3. 典型例题

### 例题

> 当 $x \to 0$ 时，$\ln(1 + f(x)) \sim ax^k$，且已知 $e^{f(x)} - 1 \sim x^2$，求常数 $a$ 和 $k$。

**解**：

由 $e^{f(x)} - 1 \sim x^2$，令 $t = f(x)$，则 $e^t - 1 \sim t$（因为 $t \to 0$），故：

$$t = f(x) \sim x^2$$

又因为 $x \to 0$ 时，$\ln(1 + f(x)) \sim f(x) \sim x^2$，所以：

$$\ln(1 + f(x)) \sim x^2$$

即 $a = 1$，$k = 2$。


## 4. 常见错误

| 序号 | 错误类型 | 正确理解 |
| 1 | **滥用等价替换** | 等价无穷小只能在乘除法中直接替换，加减法中不能随便使用 |
| 2 | **忽略条件** | $\sin x \sim x$ 仅在 $x \to 0$ 时成立，$x \to \infty$ 时不成立 |
| 3 | **高阶混淆** | $1 - \cos x \sim \dfrac{x^2}{2}$，不是 $x$ |
| 4 | **指数函数错误** | $e^x - 1 \sim x$，但 $e^{x^2} - 1 \sim x^2$，不能混淆 |
| 5 | **差函数直接替换** | $x - \sin x$ 不能直接用 $x - x = 0$，应该用更高阶展开 |


## 5. 关联知识点

| 关联类型 | 知识点名称 | 说明 |
| 🔗 前置基础 | 函数的极限 | 等价无穷小的定义依赖于极限概念 |
| 🔗 前置基础 | 洛必达法则 | 可用于验证等价无穷小关系 |
| 🔗 核心应用 | 泰勒公式 | 等价无穷小是泰勒展开的特殊情况 |
| 🔗 核心应用 | 函数展开成幂级数 | 求极限时的标准操作 |
| 🔗 综合应用 | 无穷小的阶的比较 | 判断谁是更高阶的无穷小 |
| 🔗 进阶内容 | 麦克劳林公式 | 等价无穷小的系统化工具 |


## 附录：常用恒等变形技巧

在处理差函数型问题时，可利用以下恒等变形：

1. **创造差函数**：
   $$x - \ln(1 + \tan x) = x - \tan x + \tan x - \ln(1 + \tan x)$$

2. **配对组合**：
   $$\sin x + \ln(1 - \sin x) = x - x + \sin x + \ln(1 - \sin x) \approx -\frac{x^2}{2}$$

3. **分离重组**：
   $$f(x) - \tan x = [f(x) - x] + [x - \tan x]$$

> **技巧提示**：遇到复杂函数时，尝试拆分为已知等价关系的组合。