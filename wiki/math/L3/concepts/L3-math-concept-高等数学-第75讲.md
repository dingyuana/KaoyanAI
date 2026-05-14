---
id: L3-math-concept-高等数学-第75讲
title: 高等数学-第75讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P334-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P334-concept]]

# 高等数学-第75讲

**来源：** 高等数学第75讲

```markdown
# 高等数学-第75讲：一元函数和积分的应用（一）——几何应用

## 核心概念定义
一元函数的几何应用主要包括计算曲线的弧长、平面图形的面积以及曲线绕坐标轴旋转所形成的旋转体的体积。

## 核心公式
```latex
s = \int_{\alpha}^{\beta} \sqrt{1 + \left(\frac{dy}{dx}\right)^2} \, dx
```
```latex
S = \int_{\alpha}^{\beta} f(x) \, dx
```
```latex
V = \pi \int_{\alpha}^{\beta} [f(x)]^2 \, dx
```

## 典型例题
**例10.1** 求心形线 \( r = a(1 + \cos \theta) \) （\( a > 0 \)）的弧长。

**解**：使用弧长公式 \( s = \int_{\alpha}^{\beta} \sqrt{1 + \left(\frac{dy}{dx}\right)^2} \, dx \)，计算得到 \( s = 8a \)。

**例10.2** 求阿基米德螺线 \( r = a\theta \) （\( a > 0, 0 \leq \theta \leq 2\pi \)）与 \( Ox \) 轴所围图形的面积。

**解**：使用面积公式 \( S = \int_{\alpha}^{\beta} f(x) \, dx \)，计算得到 \( S = 2\pi a^2 \)。

**例10.3** 求三叶玫瑰线 \( r = a\sin 3\theta \) （\( a > 0 \)）所围图形的面积。

**解**：使用面积公式 \( S = \int_{\alpha}^{\beta} f(x) \, dx \)，计算得到 \( S = \frac{4}{3}\pi a^2 \)。

## 常见错误
1. 忘记在弧长公式中计算导数。
2. 在计算旋转体体积时，错误地使用了积分区间。
3. 在计算面积和体积时，未正确处理函数的奇偶性。