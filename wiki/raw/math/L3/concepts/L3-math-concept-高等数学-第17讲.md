---
id: L3-math-concept-高等数学-第17讲
title: 高等数学-第17讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P270-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P270-concept]]

# 高等数学-第17讲

**来源：** 高等数学第17讲

```markdown
# 高等数学-第17讲：多元函数积分学的预备知识

## 核心概念定义

多元函数积分学是高等数学的一个重要分支，主要研究多元函数在区域上的积分方法及其应用。它包括二重积分和三重积分，是解决实际问题的重要数学工具。

## 核心公式

```latex
\[
\iint_D f(x, y) \, dx \, dy = \lim_{n \to \infty} \sum_{i=1}^{n} \sum_{j=1}^{n} f(x_i^*, y_j^*) \Delta x \Delta y
\]
\[
\iiint_V f(x, y, z) \, dx \, dy \, dz = \lim_{n \to \infty} \sum_{i=1}^{n} \sum_{j=1}^{n} \sum_{k=1}^{n} f(x_i^*, y_j^*, z_k^*) \Delta x \Delta y \Delta z
\]
```

## 典型例题

**例题**：计算区域 \( D: \{(x, y) \mid 0 \leq x \leq 1, 0 \leq y \leq x \} \) 上的二重积分 \( \iint_D (x^2 + y^2) \, dx \, dy \)。

**解答**：

首先，确定积分区域 \( D \) 的边界，然后使用二重积分的定义进行计算：

```latex
\[
\iint_D (x^2 + y^2) \, dx \, dy = \int_0^1 \int_0^x (x^2 + y^2) \, dy \, dx
\]

计算内层积分：

```latex
\[
\int_0^x (x^2 + y^2) \, dy = x^2y + \frac{y^3}{3} \Bigg|_0^x = x^3 + \frac{x^3}{3} = \frac{4x^3}{3}
\]

然后计算外层积分：

```latex
\[
\int_0^1 \frac{4x^3}{3} \, dx = \frac{4}{3} \cdot \frac{x^4}{4} \Bigg|_0^1 = \frac{1}{3}
\]

所以，\( \iint_D (x^2 + y^2) \, dx \, dy = \frac{1}{3} \)。
```

## 常见错误

1. 忽略积分区域的边界条件。
2. 在计算二重积分时，内层积分的变量与外层积分的变量混淆。
3. 在计算三重积分时，没有正确处理不同维度的积分变量。
4. 忽略了被积函数在积分区域内的连续性条件。