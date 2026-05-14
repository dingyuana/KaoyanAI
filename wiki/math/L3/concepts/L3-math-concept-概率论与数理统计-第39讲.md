---
id: L3-math-concept-概率论与数理统计-第39讲
title: 概率论与数理统计-第39讲
subject: math
type: concept
level: 3
tags: ['概率论与数理统计']
source_anchors: ['RAW-math-概率论-P061-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P061-concept]]

# 概率论与数理统计-第39讲

**来源：** 概率论与数理统计第39讲

```markdown
# 概率论与数理统计-第39讲：大数定律与中心极限定理

## 核心概念定义
1. **依概率收敛**：设随机变量X与随机变量序列{X_n}(n=1,2,3,…)，如果对任意的ε>0, 有lim P{|X_n - X| ≥ ε} = 0 或 lim P{|X_n - X| < ε} = 1，则称随机变量序列{X_n}依概率收敛于随机变量X，记为lim X_n = X(P) 或 X_n → X (n→∞)。
2. **大数定律**：描述了在大量重复试验中，随机现象的频率会逐渐稳定在某个常数附近。
3. **中心极限定理**：描述了在大量独立同分布的随机变量中，它们的和的分布会趋近于正态分布。

## 核心公式
```latex
\begin{align*}
\text{切比雪夫大数定律} & : \lim_{n \to \infty} \frac{1}{n} \sum_{i=1}^n X_i = E(X) \quad \text{对任意} \epsilon > 0, \quad P\left(\left|\frac{1}{n} \sum_{i=1}^n X_i - E(X)\right| < \epsilon\right) = 1 \\
\text{伯努利大数定律} & : \lim_{n \to \infty} \frac{\mu}{n} = p \quad \text{对任意} \epsilon > 0, \quad P\left(\left|\frac{\mu}{n} - p\right| < \epsilon\right) = 1 \\
\text{辛钦大数定律} & : \lim_{n \to \infty} \frac{1}{n} \sum_{i=1}^n X_i = E(X) \quad \text{对任意} \epsilon > 0, \quad P\left(\left|\frac{1}{n} \sum_{i=1}^n X_i - E(X)\right| < \epsilon\right) = 1
\end{align*}
```

## 典型例题
**例7.1**：设{X_n}是一随机变量序列，X_n(n=1,2,…)的概率密度为f_n(x)=π(1+n^2x^2), -∞<x<+∞，证明：X_n → 0 (n→∞)。

**解**：对任意给定的ε>0, 由于P(X_n - 0 < ε) = P(X_n < ε) = "Q+n^2kx=-arctan(ne)"，故lim P(X_n < ε) = lim 2arctan(ne) = 1，所以X_n → 0 (n→∞)。

## 常见错误
1. 忽略随机变量序列的独立性。
2. 错误地应用大数定律和中心极限定理。
3. 忽略随机变量的期望和方差的存在性。
```
