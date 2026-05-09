---
id: L3-math-concept-高等数学-第162讲
title: 高等数学-第162讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P267-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P267-concept]]

# 高等数学-第162讲

**来源：** 高等数学第162讲

```markdown
# 高等数学-第162讲：多元函数积分学

## 核心概念定义
多元函数积分学是高等数学中研究多元函数在区域上的积分方法，包括二重积分和三重积分。它主要用于计算区域面积、体积以及求解偏微分方程等。

## 核心公式
```latex
\[
\iint_D f(x,y) \, dx \, dy
\]
\[
\iiint_V f(x,y,z) \, dx \, dy \, dz
\]
```

## 典型例题
**例题**：计算由曲面 \(z = x^2 + y^2\) 和平面 \(z = 1\) 所围成的立体的体积。

**解答**：
首先确定积分区域 \(D\)，即 \(x^2 + y^2 \leq 1\)，\(0 \leq z \leq 1\)。然后利用三重积分计算体积：
```latex
V = \iiint_V 1 \, dx \, dy \, dz = \int_0^{2\pi} \int_0^1 \int_0^{1} r \, dz \, dr \, d\theta
```
计算得 \(V = \frac{\pi}{2}\)。

## 常见错误
1. 忽略积分区域的边界条件。
2. 计算积分时，积分变量的顺序错误。
3. 在计算二重积分或三重积分时，未正确处理被积函数的奇偶性。
```