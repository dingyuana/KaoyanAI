---
id: L3-math-concept-高等数学-第72讲
title: 高等数学-第72讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P331-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P331-concept]]

# 高等数学-第72讲

**来源：** 高等数学第72讲

```markdown
# 高等数学-第72讲：一元函数积分学的应用（一）——儿何应用

## 核心概念定义
一元函数积分学的几何应用主要涉及利用积分计算图形的几何量，如面积、体积等。通过积分，我们可以将复杂的几何问题转化为求定积分的问题。

## 核心公式
```latex
\begin{align*}
\text{面积}:
& s = \int_{a}^{b} f(x) \, dx, \quad \text{直角坐标系下} \\
& s = \int_{0}^{2\pi} r^2(\theta) \, d\theta, \quad \text{极坐标系下} \\
& s = \int_{a}^{b} y \, dt, \quad \text{参数方程下} \\
\text{旋转体体积}:
& V = \pi \int_{a}^{b} [f(x)]^2 \, dx, \quad \text{绕x轴旋转} \\
& V = 2\pi \int_{a}^{b} x f(x) \, dx, \quad \text{绕y轴旋转} \\
& V = \pi \int_{a}^{b} [f(x)]^2 \, dx, \quad \text{绕直线} Ax + By + C = 0 \text{旋转}
\end{align*}
```

## 典型例题
**例题1：** 计算由曲线 \( y = x^2 \) 和直线 \( x = 1 \) 所围成的图形绕x轴旋转一周所得旋转体的体积。

**解答：**
\[ V = \pi \int_{0}^{1} [x^2]^2 \, dx = \pi \int_{0}^{1} x^4 \, dx = \frac{\pi}{5} \]

## 常见错误
1. 忘记在积分公式中代入正确的函数表达式。
2. 在计算旋转体体积时，错误地使用了绕x轴或y轴旋转的公式。
3. 在计算绕定直线旋转的旋转体体积时，错误地使用了公式。
4. 在计算面积和体积时，未正确处理参数方程或极坐标方程。