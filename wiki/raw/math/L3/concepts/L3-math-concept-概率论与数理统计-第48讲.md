---
id: L3-math-concept-概率论与数理统计-第48讲
title: 概率论与数理统计-第48讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-概率论-P071-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P071-concept]]

# 概率论与数理统计-第48讲

**来源：** 概率论与数理统计第48讲

```markdown
# 概率论与数理统计-第48讲：参数估计与假设检验

## 核心概念定义
参数估计是利用样本信息对总体参数进行估计的方法。假设检验是判断样本所代表的总体是否具有某种特定分布或参数的方法。

## 核心公式
```latex
\begin{align*}
\hat{\mu} &= \bar{X}, \\
\hat{\sigma}^2 &= \frac{1}{n-1} \sum_{i=1}^{n} (X_i - \bar{X})^2, \\
\hat{\theta} &= \frac{1}{n} \sum_{i=1}^{n} X_i, \\
L(\theta) &= \prod_{i=1}^{n} f(x_i; \theta),
\end{align*}
```

## 典型例题
**例9.5** 设总体 \(X\) 的概率密度为 \(f(x; \theta) = \frac{1}{\theta} e^{-\frac{x}{\theta}}\)，其中 \(a(a>1)\) 是未知参数，\(X_1, X_2, \ldots, X_n\) 是来自总体 \(X\) 的简单随机样本，求 \(a\) 的最大似然估计量。

**解**：似然函数 \(L(\theta) = \left(\frac{1}{\theta}\right)^n e^{-\frac{1}{\theta} \sum_{i=1}^{n} X_i}\)。对数似然函数 \(l(\theta) = -n \ln(\theta) - \frac{1}{\theta} \sum_{i=1}^{n} X_i\)。求导并令导数为0，得 \(\hat{a} = \frac{1}{\bar{X}}\)。

## 常见错误
1. 误将似然函数的对数求导作为参数估计的步骤。
2. 误将样本均值作为总体均值的无偏估计量。
3. 误将样本方差作为总体方差的估计量。

```
