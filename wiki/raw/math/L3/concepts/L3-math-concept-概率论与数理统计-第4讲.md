---
id: L3-math-concept-概率论与数理统计-第4讲
title: 概率论与数理统计-第4讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-概率论-P073-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P073-concept]]

# 概率论与数理统计-第4讲

**来源：** 概率论与数理统计第4讲

```markdown
# 概率论与数理统计-第4讲：多维随机变量及其分布

## 核心概念定义
多维随机变量是指同时取多个数值的随机变量。多维随机变量的分布描述了这些随机变量同时取值的概率分布情况。常见的多维随机变量包括二维随机变量和n维随机变量。

## 核心公式
```latex
P(X_1 \leq x_1, X_2 \leq x_2, ..., X_n \leq x_n) = \iint\cdots\int_{x_1 \leq X_1 \leq x_1, x_2 \leq X_2 \leq x_2, ..., x_n \leq X_n \leq x_n} f(x_1, x_2, ..., x_n) \, dx_1 \, dx_2 \cdots dx_n
```

## 典型例题
**例题**：设二维随机变量$(X, Y)$的联合概率密度函数为$f(x, y) = \frac{1}{2}e^{-\frac{x^2 + y^2}{2}}$，求$P(X + Y \leq 1)$。

**解答**：
首先，我们需要找到$X + Y$的概率密度函数。由于$X$和$Y$是独立的，我们有：
$$
f_{X+Y}(z) = \int_{-\infty}^{\infty} f_X(z - y) f_Y(y) \, dy
$$
将$f_X(x) = \frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}}$和$f_Y(y) = \frac{1}{\sqrt{2\pi}}e^{-\frac{y^2}{2}}$代入上式，得到：
$$
f_{X+Y}(z) = \frac{1}{2\pi}e^{-\frac{z^2}{2}}
$$
然后，计算$P(X + Y \leq 1)$：
$$
P(X + Y \leq 1) = \int_{-\infty}^{1} \int_{-\infty}^{1-z} \frac{1}{2\pi}e^{-\frac{z^2 + y^2}{2}} \, dy \, dz
$$
计算上述积分，得到$P(X + Y \leq 1) = \frac{1}{2}$。

## 常见错误
1. 忽略多维随机变量之间的相关性。
2. 错误地使用一维随机变量的概率密度函数计算多维随机变量的概率。
3. 在计算多维随机变量的概率时，忘记考虑变量的边界条件。
```
