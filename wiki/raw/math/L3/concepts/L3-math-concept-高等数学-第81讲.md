---
id: L3-math-concept-高等数学-第81讲
title: 高等数学-第81讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P341-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P341-concept]]

# 高等数学-第81讲

**来源：** 高等数学第81讲

```markdown
# 高等数学-第81讲：一元函数积分学的应用（二）——积分等式与积分不等式

## 核心概念定义
1. 华里士公式：用于计算定积分中的幂函数积分。
2. 积分中值定理：若函数在区间上连续，则存在一点，使得该点的函数值等于整个区间的积分平均值。
3. 定积分的换元积分法：通过变量替换简化积分计算。

## 核心公式
```latex
\begin{align*}
\int x^n dx &= \frac{x^{n+1}}{n+1} + C, \quad n \neq -1 \\
\int_a^b f(x) dx &= f(\xi) (b-a), \quad \xi \in [a, b] \\
\int_a^b f(x)g(x) dx &= f(\xi) \int_a^b g(x) dx, \quad \xi \in [a, b]
\end{align*}
```

## 典型例题
**例11.9** 设数列{a}的通项为 $a_n = \int_0^1 x^n dx$，$n=2,3,\ldots$，计算 $a_n$。

**解**：
$$
a_n = \int_0^1 x^n dx = \frac{x^{n+1}}{n+1} \bigg|_0^1 = \frac{1}{n+1}
$$

**例11.10** 已知函数 $f(x)$ 在 $[0, \pi]$ 上可导，且 $\int_0^\pi f(x) \cos x dx = 0$，证明存在 $\xi \in (0, \pi)$，使得 $f'(\xi) = f(\xi) \tan \xi$。

**证明**：
记 $F(x) = f(x) \cos x$，根据推广的积分中值定理，存在 $\xi \in (0, \pi)$，使得 $F(\xi) = \frac{1}{\pi} \int_0^\pi F(x) dx = 0$。

又因为 $F'(x) = f'(x) \cos x - f(x) \sin x$，根据罗尔定理，存在 $\xi \in (0, \pi)$，使得 $F'(\xi) = 0$，即 $f'(\xi) \cos \xi - f(\xi) \sin \xi = 0$。

因为 $\cos \xi \neq 0$，所以 $f'(\xi) = f(\xi) \tan \xi$。

## 常见错误
1. 忘记积分常数 $C$。
2. 在应用积分中值定理时，未正确确定积分区间。
3. 在换元积分法中，未正确计算新变量的积分。