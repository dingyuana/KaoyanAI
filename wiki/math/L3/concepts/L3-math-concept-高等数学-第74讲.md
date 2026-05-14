---
id: L3-math-concept-高等数学-第74讲
title: 高等数学-第74讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P333-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P333-concept]]

# 高等数学-第74讲

**来源：** 高等数学第74讲

```markdown
# 高等数学-第74讲：一元函数积分学的应用(一)——儿何应用

## 核心概念定义
一元函数积分学在几何中的应用主要包括计算平面图形的面积、绕轴旋转体的体积以及曲线的弧长等。

## 核心公式
```latex
\begin{align*}
\text{所围面积} & : \iint_D dA, \quad D \text{为平面区域} \\
\text{绕轴体积} & : \int_A 2\pi x f(x) \, dx, \quad A \text{为平面区域，} f(x) \text{为函数} \\
\text{弧长} & : \int_a^b \sqrt{1 + \left(\frac{dy}{dx}\right)^2} \, dx
\end{align*}
```

## 典型例题
**例10.1** 求心形线 \( r = a(1 - \cos\theta) \)（\( a > 0, 0 \leq \theta \leq 2\pi \)）的弧长、所围图形的面积以及绕Ox轴旋转得到的旋转体的体积。

## 常见错误
1. 忘记将极坐标转换为直角坐标进行计算。
2. 在计算绕轴体积时，错误地使用了函数 \( f(x) \) 而不是 \( f(y) \)。
3. 在计算弧长时，错误地使用了 \( \sqrt{1 + \left(\frac{dx}{dy}\right)^2} \) 而不是 \( \sqrt{1 + \left(\frac{dy}{dx}\right)^2} \)。
```