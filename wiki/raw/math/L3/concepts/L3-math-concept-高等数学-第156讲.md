---
id: L3-math-concept-高等数学-第156讲
title: 高等数学-第156讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P260-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P260-concept]]

# 高等数学-第156讲

**来源：** 高等数学第156讲

```markdown
# 高等数学-第156讲：多元函数积分学

## 核心概念定义
多元函数积分学是研究多元函数在区域上的积分方法，包括第一型曲面积分和第二型曲面积分。第一型曲面积分关注的是曲面积分的结果，第二型曲面积分关注的是曲面积分与区域的关系。

## 核心公式
```latex
\begin{align*}
\iint_S \mathbf{F} \cdot d\mathbf{S} &= \iint_D \left( \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z} \right) dS, \\
\iint_S P \, dx + Q \, dy + R \, dz &= \iint_D \left( P \frac{\partial z}{\partial x} + Q \frac{\partial z}{\partial y} + R \right) dS.
\end{align*}
```

## 典型例题
**例18.23** 设曲线L是从点A(1,-1)沿曲线\(x^2+y^2=-2y(y\geq-1)\)到点B(-1,-1)的有向曲线，f(x)是连续函数，计算
\[ \int_L (x^2+y^2) \, dx + (2x+y) \, dy. \]

**解**：有向曲线L的参数方程为\(x=-1-m(t)\)（\(t\)从0变到\(\pi\)），于是
\[ \int_L (x^2+y^2) \, dx + (2x+y) \, dy = \int_0^\pi (-1-m(t))^2 \, (-m) \, dt + \int_0^\pi (-1-m(t)+2m) \, (-m) \, dt. \]
计算得
\[ \int_L (x^2+y^2) \, dx + (2x+y) \, dy = 27\pi - 4. \]

## 常见错误
1. 忘记将曲线积分转换为参数方程形式。
2. 在计算第二型曲面积分时，忘记使用曲面积分的定义。
3. 在使用斯托克斯公式时，忘记将向量场转换为参数方程形式。