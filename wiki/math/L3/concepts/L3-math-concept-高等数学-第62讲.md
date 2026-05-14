---
id: L3-math-concept-高等数学-第62讲
title: 高等数学-第62讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P320-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P320-concept]]

# 高等数学-第62讲

**来源：** 高等数学第62讲

```markdown
# 高等数学-第62讲：一元函数积分学的概念与性质

## 核心概念定义
一元函数积分学是研究函数在某一区间上的积分及其性质的理论。它包括定积分和不定积分，其中定积分可以看作是求函数在区间上所有小区间上积分和的极限。

## 核心公式
```latex
\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i) \Delta x
```

## 典型例题
**例8.2** 设 \( a \in (0,1) \)，则 \(\int_0^a \frac{1}{n} \, dn = \)？

**解** 应选(C)。

由于 \( a > 0 \)，于是 \(\int_0^a \frac{1}{n} \, dn = \sum_{n=1}^{\infty} \frac{1}{n} \cdot a = a \ln a\)。

由夹逼准则，知 \(\int_0^a \frac{1}{n} \, dn = \ln a\)。

## 常见错误
1. 忽略定积分的极限过程。
2. 在放缩过程中，未能正确选择放缩区间。
3. 在处理变量型积分时，未能正确应用夹逼准则。
4. 在处理极坐标系分割型积分时，未能正确应用极坐标变换。
```