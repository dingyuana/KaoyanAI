---
id: L3-math-concept-概率论与数理统计-第21讲
title: 概率论与数理统计-第21讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-概率论-P042-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P042-concept]]

# 概率论与数理统计-第21讲

**来源：** 概率论与数理统计第21讲

```markdown
# 概率论与数理统计-第21讲：一维随机变量函数的分布

## 核心概念定义
一维随机变量函数的分布是指给定一个随机变量X，求另一个随机变量Y（Y是X的函数）的概率分布。根据X和Y的分布类型，可以分为离散型到离散型、连续型到连续型（或混合型）、连续型到离散型等不同情况。

## 核心公式
```latex
F_Y(y) = P\{Y \leq y\} = P\{g(X) \leq y\} = \int_{-\infty}^{+\infty} f_X(x) \cdot \frac{1}{|g'(x)|} \cdot \mathbb{1}_{g(x) \leq y} \, dx
```

## 典型例题
设随机变量X的概率分布为：
\[ P\{X = x\} = \begin{cases} 
\frac{1}{2}, & \text{if } x = 1 \\
\frac{1}{4}, & \text{if } x = 2 \\
\frac{1}{4}, & \text{if } x = 3 
\end{cases} \]
求Y = X^2的概率分布。

## 常见错误
1. 忽略函数的可逆性，错误地应用分布函数法。
2. 在计算连续型随机变量函数的分布时，忘记考虑函数的导数。
3. 在合并相同值的概率时，没有正确处理概率的加法。
```
