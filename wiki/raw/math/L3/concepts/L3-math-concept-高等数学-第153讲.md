---
id: L3-math-concept-高等数学-第153讲
title: 高等数学-第153讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P257-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P257-concept]]

# 高等数学-第153讲

**来源：** 高等数学第153讲

```markdown
# 高等数学-第153讲：多元函数积分学

## 核心概念定义
多元函数积分学是高等数学的一个重要分支，主要研究多元函数在空间区域上的积分问题。它包括二重积分、三重积分以及曲线积分和曲面积分等内容。

## 核心公式
```latex
\begin{align*}
\iint\limits_D f(x,y) \, dx \, dy & \text{（二重积分）} \\
\iiint\limits_V f(x,y,z) \, dx \, dy \, dz & \text{（三重积分）} \\
\int_C f(x,y) \, ds & \text{（曲线积分）} \\
\iint\limits_S f(x,y,z) \, dS & \text{（曲面积分）}
\end{align*}
```

## 典型例题
**例题**：计算由曲面 \(z = x^2 + y^2\) 和平面 \(z = 1\) 所围成的立体的体积。

**解答**：
\[
V = \iiint\limits_{x^2 + y^2 \leq 1, \, z \leq 1} \, dV = \int_{-1}^1 \int_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}} \int_0^{x^2 + y^2} \, dz \, dy \, dx = \frac{\pi}{2}
\]

## 常见错误
1. 忽视积分区域的界限。
2. 在计算积分时，错误地处理了变量。
3. 对于不同类型的积分（如曲线积分和曲面积分），没有正确使用相应的公式。
4. 在计算三重积分时，没有正确处理积分次序。
```