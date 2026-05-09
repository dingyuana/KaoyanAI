---
id: L3-math-concept-高等数学-第46讲
title: 高等数学-第46讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P302-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P302-concept]]

# 高等数学-第46讲

**来源：** 高等数学第46讲

```markdown
# 高等数学-第46讲：二元函数微分学的应用(二)

## 核心概念定义
二元函数微分学的应用主要包括中值定理、微分等式与微分不等式的应用。中值定理用于证明函数在某点的导数存在，微分等式用于求解函数的导数，微分不等式用于研究函数的增长或衰减情况。

## 核心公式
```latex
\begin{align*}
f'(x) &= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} \\
Lagrange \, MVT: & \quad f(b) - f(a) = f'(\xi)(b-a) \quad \text{for some} \, \xi \in (a, b) \\
Cauchy \, MVT: & \quad \frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(\xi)}{g'(\xi)} \quad \text{for some} \, \xi \in (a, b)
\end{align*}
```

## 典型例题
**例题**：证明函数$f(x) = x^3 - 3x$在$x=1$处的导数为0。

**解答**：
1. 计算$f'(x)$：$f'(x) = 3x^2 - 3$。
2. 代入$x=1$：$f'(1) = 3(1)^2 - 3 = 0$。

因此，$f'(1) = 0$。

## 常见错误
1. 忘记使用微分中值定理的条件。
2. 在应用微分等式时，错误地选择中值点。
3. 在处理微分不等式时，错误地估计函数的增长或衰减情况。
4. 在寻找原函数时，错误地使用导数公式。