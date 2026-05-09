---
id: L3-math-concept-概率论与数理统计-第18讲
title: 概率论与数理统计-第18讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-概率论-P038-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P038-concept]]

# 概率论与数理统计-第18讲

**来源：** 概率论与数理统计第18讲

```markdown
# 概率论与数理统计-第18讲：一维随机变量及其分布

## 核心概念定义
一维随机变量是指取值在实数域上的随机变量。一维随机变量的分布描述了随机变量取不同值的概率。

## 核心公式
```latex
P\{M=m\} = \frac{m(n-m)}{n!}, \quad m=0,1,\ldots,n
```
```latex
P\{X=k\} = p(1-p)^{k-1}, \quad k=1,2,\ldots
```
```latex
P\{X=x\} = \frac{{N \choose k} {M \choose n-k}}{N \choose n}, \quad \max\{0, n-N+M\} \leq k \leq \min\{n, M\}
```
```latex
P\{X=k\} = \frac{\lambda^k e^{-\lambda}}{k!}, \quad k=0,1,\ldots
```

## 典型例题
**例2.4** 在伯努利试验序列中，$P(A)=\frac{1}{2}$，第2次出现A即停止。令$X$为试验次数，求$X$的分布律及$EX, DX$。

**解** 记$p=P(A)=\frac{1}{2}$，令$X_1$表示第1次出现A的试验次数，$X_2$表示第2次出现A的试验次数，将总过程分解为2个子过程，且因试验为独立重复进行，故这2个子过程依然是独立同分布的，于是就有$X=X_1+X_2$，且
$$
P\{X_1=k, X_2=k\} = p(1-p)^{k-1}
$$
$$
\text{其中，} k=1,2,\ldots
$$
故 $P\{X=k\} = \sum_{i=1}^k P\{X_1=i, X_2=k-i\} = \sum_{i=1}^k p^i (1-p)^{k-i} = p^k (1-p)^{k-1}$
$$
\text{于是我们可以知道，这是2个独立同分布的几何分布的} X_i \text{之和的分布。}
$$
由$EX_1=\frac{1}{p}, DX_1=\frac{1-p}{p^2}, EX_2=\frac{1}{p}, DX_2=\frac{1-p}{p^2}$，得$EX=2=\frac{2}{p}, DX=2=\frac{2(1-p)}{p^2}$。

## 常见错误
1. 混淆概率分布的定义和计算公式。
2. 在计算概率分布时，未考虑边界条件。
3. 在使用泊松分布近似二项分布时，未注意适用条件。
