---
id: L3-math-concept-概率论与数理统计-第24讲
title: 概率论与数理统计-第24讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-概率论-P045-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P045-concept]]

# 概率论与数理统计-第24讲

**来源：** 概率论与数理统计第24讲

```markdown
# 概率论与数理统计-第24讲：多维随机变量及其分布

## 核心概念定义
多维随机变量是指同时涉及多个随机变量的随机现象。多维随机变量的分布描述了这些变量同时取值的概率分布。

## 核心公式
```latex
\begin{align*}
X_1, X_2 &\sim N(\mu_1, \sigma_1^2, \mu_2, \sigma_2^2; \rho) \\
X_1 + kX_2 &\sim N(k\mu_1, k^2\sigma_1^2) \\
Y = aX_1 + bX_2 &\sim N(a\mu_1 + b\mu_2, a^2\sigma_1^2 + b^2\sigma_2^2) \\
P\{2X_1 + Y < a\} &= P\{X_1 > Y\} \\
\end{align*}
```

## 典型例题
**例4.2** 设随机变量 \(X, Y\) 相互独立，且 \(X \sim N(0, 2)\)，\(Y \sim N(-2, 2)\)。若 \(P\{2X + Y < a\} = P\{X > Y\}\)，则 \(a = \)？

**解**：应选 (B) \(-2 + \sqrt{10}\)。

## 常见错误
1. 忽略随机变量之间的相关性。
2. 错误地应用多维正态分布的性质。
3. 在求解边缘分布和条件分布时，未正确处理积分或求和。
```
