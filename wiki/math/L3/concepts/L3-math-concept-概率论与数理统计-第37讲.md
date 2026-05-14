---
id: L3-math-concept-概率论与数理统计-第37讲
title: 概率论与数理统计-第37讲
subject: math
type: concept
level: 3
tags: ['概率论与数理统计']
source_anchors: ['RAW-math-概率论-P059-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P059-concept]]

# 概率论与数理统计-第37讲

**来源：** 概率论与数理统计第37讲

```markdown
# 概率论与数理统计-第37讲

## 核心概念定义
数字着征：在二维正态分布下，若两个随机变量X和Y不相关，则它们独立。

切比雪夫不等式：设随机变量X的数学期望与方差均存在，则对任意ε>0，有
\[ P\{|X - EX| \geq \epsilon\} \leq \frac{DX}{\epsilon^2} \]

## 核心公式
\[ \text{Cov}(X, X+Y) = \text{Cov}(X, X) + \text{Cov}(X, Y) = DX + P_{XY} \sqrt{DX} \sqrt{DY} = 0 \]

\[ P\{|X - EX| \geq \epsilon\} \leq \frac{DX}{\epsilon^2} \]

## 典型例题
设随机变量 \( X_1, X_2, \ldots, X_n \) 独立同分布，记 \( E(X) = \mu \)（\( k = 1, 2, 3, 4 \)），则由切比雪夫不等式，对任意 \( \epsilon > 0 \)，有
\[ P\{|X - \mu| \geq \epsilon\} \leq \frac{1}{n} \]

## 常见错误
1. 忽略二维正态分布下不相关与独立的条件。
2. 在使用切比雪夫不等式时，错误地应用公式或计算错误。
3. 在计算切比雪夫不等式时，未正确识别 \( EX \) 和 \( DX \)。
```
