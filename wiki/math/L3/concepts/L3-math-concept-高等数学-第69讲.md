---
id: L3-math-concept-高等数学-第69讲
title: 高等数学-第69讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P327-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P327-concept]]

# 高等数学-第69讲

**来源：** 高等数学第69讲

```markdown
# 高等数学-第69讲：一元函数积分学的计算

## 核心概念定义
一元函数积分学是研究如何计算函数在某一区间上的积分的方法。它包括不定积分和定积分。不定积分是寻找原函数的过程，而定积分则是计算函数在某一区间上的累积效应。

## 核心公式
```latex
\int f(x) \, dx = F(x) + C
```
其中，\( F(x) \) 是 \( f(x) \) 的一个原函数，\( C \) 是积分常数。

对于反常积分，有：
```latex
\int_a^b f(x) \, dx = \lim_{t \to b^-} \int_a^t f(x) \, dx
```

## 典型例题
**例9.13** 求不定积分 \( \int 2\sin x \, dx \)

**解** 法一：\( 2\sin x \, dx = -2\cos x + C \)

法二：设 \( 2\sin x + 2\cos x = (2A + B)\sin x + (2B - A)\cos x \)，解得 \( A = 0, B = 1 \)，所以
\[ \int (2\sin x + 2\cos x) \, dx = 2\cos x + C \]

**例9.14** 求不定积分 \( \int \frac{1}{1 + 2\sin x} \, dx \)

**解** 令 \( \tan x = t \)，则 \( dx = \frac{dt}{1 + t^2} \)，\( \cos x = \frac{1}{\sqrt{1 + t^2}} \)，所以
\[ \int \frac{1}{1 + 2\sin x} \, dx = \int \frac{1}{1 + 2t} \cdot \frac{dt}{1 + t^2} = \int \frac{1}{(1 + t)(1 + 2t)} \, dt \]

## 常见错误
1. 忘记添加积分常数 \( C \)。
2. 在使用换元法时，没有正确处理 \( dx \) 的变化。
3. 在计算反常积分时，没有正确处理极限。
4. 在使用牛顿-莱布尼茨公式时，没有正确处理瑕点。