---
id: L3-math-concept-概率论与数理统计-第8讲
title: 概率论与数理统计-第8讲
subject: math
type: concept
level: 3
tags: ['概率论与数理统计']
source_anchors: ['RAW-math-概率论-P079-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P079-concept]]

# 概率论与数理统计-第8讲

**来源：** 概率论与数理统计第8讲

```markdown
# 概率论与数理统计-第8讲：统计量及其分布

## 核心概念定义

统计量是从样本数据中计算出来的用于估计总体参数的量。统计量的分布描述了统计量的概率分布情况。

## 核心公式

$$
\begin{align*}
X &= \frac{\sum_{i=1}^{n}X_i}{n} & \text{（样本均值）} \\
S^2 &= \frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{X})^2 & \text{（样本方差）} \\
\sigma^2 &= \frac{1}{n}\sum_{i=1}^{n}(X_i - \mu)^2 & \text{（总体方差）} \\
\end{align*}
$$

## 典型例题

**例题**：从正态分布总体 $N(\mu, \sigma^2)$ 中抽取一个样本 $X_1, X_2, ..., X_n$，求样本均值 $\bar{X}$ 的分布。

**解答**：样本均值 $\bar{X}$ 服从正态分布 $N(\mu, \frac{\sigma^2}{n})$。

## 常见错误

1. 将样本均值 $\bar{X}$ 与总体均值 $\mu$ 混淆。
2. 计算样本方差时，分母使用 $n$ 而不是 $n-1$。
3. 在计算统计量的分布时，未考虑样本量对分布的影响。
```
