---
id: L3-math-concept-概率论与数理统计-第40讲
title: 概率论与数理统计-第40讲
subject: math
type: concept
level: 3
tags: ['概率论与数理统计']
source_anchors: ['RAW-math-概率论-P063-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P063-concept]]

# 概率论与数理统计-第40讲

**来源：** 概率论与数理统计第40讲

```markdown
# 概率论与数理统计-第40讲：大数定律与中心极限定理

## 核心概念定义
大数定律描述了在大量重复实验中，随机变量序列的样本均值会逐渐接近其期望值。中心极限定理则表明，当样本量足够大时，样本均值的分布会趋近于正态分布。

## 核心公式
```latex
\begin{align*}
\text{大数定律：} & \lim_{n \to \infty} \frac{1}{n} \sum_{i=1}^{n} X_i = E(X) \\
\text{中心极限定理：} & \lim_{n \to \infty} \frac{1}{\sqrt{n}} \sum_{i=1}^{n} X_i \sim N(0,1)
\end{align*}
```

## 典型例题
**例7.2** 设随机变量序列 \(X_1, X_2, \ldots, X_n, \ldots\) 独立同分布，且 \(X_i\) 的概率密度为 \(f(x) = \frac{1}{\sqrt{2\pi}} e^{-\frac{x^2}{2}}\)，则当 \(n \to \infty\) 时，\(\frac{1}{n} \sum_{i=1}^{n} X_i\) 依概率收敛于什么值？

**解** 应选 (B) 6。

**例7.3** 设 \(X_1, X_2, \ldots, X_n\) 为来自总体 \(X\) 的简单随机样本，其中 \(P(X=0) = P(X=1) = \frac{1}{2}\)，\(\phi(x)\) 表示标准正态分布函数，则利用中心极限定理可得 \(P\left(\frac{X_1 + X_2 + \ldots + X_n - 5}{\sqrt{10}} \leq x\right)\) 的近似值为多少？

**解** 应选 (B) \(\Phi(1)\)。

## 常见错误
1. 忽略大数定律和中心极限定理的应用条件。
2. 在使用中心极限定理时，错误地估计标准差。
3. 在计算大数定律和中心极限定理的结果时，忽略极限过程。
