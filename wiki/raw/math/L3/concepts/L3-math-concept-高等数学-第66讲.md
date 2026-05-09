---
id: L3-math-concept-高等数学-第66讲
title: 高等数学-第66讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P324-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P324-concept]]

# 高等数学-第66讲

**来源：** 高等数学第66讲

```markdown
# 高等数学-第66讲：一元函数积分学的计算

## 核心概念定义
一元函数积分学的计算主要涉及对一元函数进行积分，包括恒等变形法、换元法、分部积分法等，目的是找到原函数。

## 核心公式
```latex
\begin{align*}
\int f(x) \, dx &= F(x) + C, \quad \text{其中} \, F'(x) = f(x) \\
\int f(g(x))g'(x) \, dx &= \int f(u) \, du, \quad \text{其中} \, u = g(x) \\
\int x^n \, dx &= \frac{x^{n+1}}{n+1} + C, \quad n \neq -1
\end{align*}
```

## 典型例题
### 例9.1
求积分 $\int (2x^2 + 2x + 2) \, dx$。

**解：**
$$
\int (2x^2 + 2x + 2) \, dx = \frac{2x^3}{3} + x^2 + 2x + C
$$

### 例9.2
求积分 $\int \sqrt{a^2 - x^2} \, dx$，其中 $a > 0$。

**解：**
令 $x = a \sin u$，则 $dx = a \cos u \, du$，得到：
$$
\int \sqrt{a^2 - x^2} \, dx = \int a \cos u \sqrt{a^2 - a^2 \sin^2 u} \, du = a^2 \int \cos^2 u \, du
$$
（此处省略具体计算过程）

### 例9.3
求积分 $\int \frac{1}{x^2 + 1} \, dx$。

**解：**
令 $x = \tan t$，则 $dx = \sec^2 t \, dt$，得到：
$$
\int \frac{1}{x^2 + 1} \, dx = \int \frac{1}{\tan^2 t + 1} \sec^2 t \, dt = \int \frac{1}{\sec^2 t} \sec^2 t \, dt = \int 1 \, dt = t + C
$$
其中 $t = \arctan x$。

## 常见错误
1. 忘记加常数项 $C$。
2. 换元时未正确计算 $dx$。
3. 在积分过程中未正确应用积分公式。
4. 在计算过程中出现代数错误。