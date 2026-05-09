---
id: L3-math-concept-概率论与数理统计-第44讲
title: 概率论与数理统计-第44讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-概率论-P067-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P067-concept]]

# 概率论与数理统计-第44讲

**来源：** 概率论与数理统计第44讲

```markdown
# 概率论与数理统计-第44讲：统计量及其分布

## 核心概念定义
- 统计量：从样本中计算得到的用于估计总体参数的量。
- 分布：随机变量取值的概率分布。

## 核心公式
```latex
\begin{align*}
X_1 + X_2 &\sim \chi^2(n + n_2) \quad \text{若} \ X_1 \sim \chi^2(n), \ X_2 \sim \chi^2(n_2), \ X_1 \text{与} X_2 \text{相互独立} \\
E(X) &= n \quad \text{若} \ X \sim \chi^2(n) \\
D(X) &= 2n \quad \text{若} \ X \sim \chi^2(n)
\end{align*}
```

## 典型例题
**例8.3** 设 \(X, X_2\) 是来自总体 \(X\) 的简单随机样本，且 \(X\) 的分布函数为 \(F(x) = [2e^{-x^2}, -\infty < x < +\infty]\)，则 \(XX\) 服从( )。

(A) \(F(1,2)\)

(B) \(F(2,1)\)

(C) \(F(2,2)\)

(D) \(F(0,2)\)

**解** 应选(C)。

由题设知，\(X\) 的概率密度为 \(f(x) = -e^{-x^2}, -\infty < x < +\infty\)，令 \(Y = 2|X|\)，则 \(Y\) 的分布函数为

\(F_Y(y) = P{Y \leq y} = P{2|X| \leq y}\)。

当 \(y < 0\) 时，\(F_Y(y) = 0\)；

当 \(y \geq 0\) 时，

\(E_Y(y) = P{2|X| \leq y} = P{-\sqrt{y/2} < X < \sqrt{y/2}} - 2\int_{-\infty}^{\sqrt{y/2}} e^{-x^2} \, dx = 1 - 2\int_{-\infty}^{\sqrt{y/2}} e^{-x^2} \, dx\)。

于是 \(Y\) 的分布函数为 \(F_Y(y) = 1 - 2\int_{-\infty}^{\sqrt{y/2}} e^{-x^2} \, dx\)，\(Y\) 的概率密度为 \(f_Y(y) = \frac{d}{dy} F_Y(y)\)。

故 \(2|X| \sim \chi^2(2)\)，又由于 \(|X_1|\) 与 \(|X_2|\) 是相互独立的，因此 \(XX \sim \chi^2(4)\)。

## 常见错误
- 忽略随机变量相互独立的条件。
- 错误地应用分布的可加性。
- 忽略随机变量的分布类型。
```
