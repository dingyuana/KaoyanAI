---
id: L3-math-concept-高等数学-第40讲
title: 高等数学-第40讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P296-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P296-concept]]

# 高等数学-第40讲

**来源：** 高等数学第40讲

```markdown
# 高等数学-第40讲：一元函数微分学的计算

## 核心概念定义
一元函数微分学是研究函数在某一点的局部性质，包括函数的导数、微分以及高阶导数等概念。它主要研究函数在某一点的切线斜率、函数在某一点的局部变化率等。

## 核心公式
```latex
\begin{align*}
f'(x) &= \lim_{\Delta x \to 0} \frac{f(x+\Delta x) - f(x)}{\Delta x} \\
f''(x) &= \lim_{\Delta x \to 0} \frac{f'(x+\Delta x) - f'(x)}{\Delta x}
\end{align*}
```

## 典型例题
**例4.8** 若 \( x = x(t) = e^t - t \)，则 \( \frac{d^2y}{dt^2} \) 为多少？

**解**：由 \( x = e^t - t \)，求导得 \( x'(t) = e^t - 1 \)。由 \( y = x(t) \)，求导得 \( y'(t) = x'(t) \)。再次求导得 \( y''(t) = x''(t) \)。因为 \( x''(t) = e^t \)，所以 \( \frac{d^2y}{dt^2} = e^t \)。

## 常见错误
1. 忽略函数的可导性，直接求导。
2. 求导时，未正确处理复合函数的导数。
3. 求导过程中，未正确处理反函数的导数。
```