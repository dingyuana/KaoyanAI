---
id: L3-math-concept-概率论与数理统计-第22讲
title: 概率论与数理统计-第22讲
subject: math
type: concept
level: 3
tags: ['概率论与数理统计']
source_anchors: ['RAW-math-概率论-P043-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P043-concept]]

# 概率论与数理统计-第22讲

**来源：** 概率论与数理统计第22讲

```markdown
# 概率论与数理统计-第22讲：一维随机变量函数的分布

## 核心概念定义
一维随机变量函数的分布是指给定一个随机变量X，研究另一个随机变量Y（Y是X的函数）的概率分布。

## 核心公式
```latex
F_Y(y) = P\{Y \leq y\} = P\{g(X) \leq y\} = \int_{-\infty}^{\infty} f_X(x) \cdot \mathbb{1}_{[g^{-1}(y)] \leq x \leq g^{-1}(y)]} \, dx
```
若 \( y = g(x) \) 在 \( (a, b) \) 上严格单调可导，则存在 \( x = h(y) \) 是 \( y = g(x) \) 的可导反函数。

1. 若 \( y = g(x) \) 严格单调增加，则 \( f_Y(y) = f_X(h(y)) \cdot |h'(y)| \)。
2. 若 \( y = g(x) \) 严格单调减少，则 \( f_Y(y) = f_X(h(y)) \cdot |h'(y)| \)。

## 典型例题
**例3.1** 设随机变量 \( X \) 的概率分布为 \( P\{X = k\} = 2, k = 1, 2, 3, \ldots \)。若 \( Y \) 表示 \( X \) 被3除的余数，则 \( Y \) 的概率分布为：

- \( P(Y = 0) = 2P(X = 3k) = 2 \cdot 2 = 4 \)
- \( P(Y = 1) = 2P(X = 3k + 1) = 2 \cdot 2 = 4 \)
- \( P(Y = 2) = 2P(X = 3k + 2) = 2 \cdot 2 = 4 \)

**例3.2** 设随机变量 \( X \) 的概率密度为 \( f(x) = \frac{1}{\pi} e^{-x^2}, -\infty < x < +\infty \)，令 \( Y = e^X \)。求 \( Y \) 的概率密度。

**解**：函数 \( y = e^x \) 单调且反函数为 \( x = \ln y \)（\( y > 0 \)），因此 \( Y \) 的概率密度为：

\[ f_Y(y) = f_X(\ln y) \cdot \left| \frac{d}{dy} \ln y \right| = \frac{1}{\pi} e^{-(\ln y)^2} \cdot \frac{1}{y} = \frac{1}{\pi y} e^{-y^2} \]

## 常见错误
1. 忽略随机变量函数的单调性。
2. 错误地应用公式，未考虑函数的单调性和反函数的存在性。
3. 在计算概率密度时，未正确处理反函数的导数。
```
