---
id: L3-math-concept-高等数学-第83讲
title: 高等数学-第83讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P343-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P343-concept]]

# 高等数学-第83讲

**来源：** 高等数学第83讲

```markdown
# 高等数学-第83讲：一元函数积分学的应用（二）——积分等式与积分不等式

## 核心概念定义
一元函数积分学的应用主要包括利用积分等式和积分不等式解决实际问题。积分等式是指通过积分变换，将一个积分表达式转化为另一个积分表达式，从而简化计算。积分不等式则是指利用积分的性质，对函数在一定区间上的积分值进行估计。

## 核心公式
```latex
\int_a^b f(x) \, dx = \int_a^b f(a+b-x) \, dx \quad \text{（积分等式）}
\int_a^b f(x) \, dx \geq 0 \quad \text{（当} f(x) \geq 0 \text{时）}
\int_a^b f(x) \, dx \leq 0 \quad \text{（当} f(x) \leq 0 \text{时）}
```

## 典型例题
### 例题1
计算下列积分：
(1) $\int_0^4 \sqrt{4x-x^2} \, dx$;
(2) $\int_0^2 (2x+1) \sqrt{2x-x^2} \, dx$.

### 解答
(1) 原式 $= \int_0^2 \sqrt{4x-x^2} \, dx + \int_2^4 \sqrt{4x-x^2} \, dx$
$= 2\int_0^2 \sqrt{4x-x^2} \, dx$
$= 2\int_0^2 \sqrt{4-4x+x^2} \, dx$
$= 2\int_0^2 \sqrt{(2-x)^2} \, dx$
$= 2\int_0^2 (2-x) \, dx$
$= 2\left[ 2x - \frac{x^2}{2} \right]_0^2$
$= 2\left[ 4 - 2 \right]$
$= 4$.

(2) 原式 $= \int_0^1 (2x+1) \sqrt{2x-x^2} \, dx + \int_1^2 (2x+1) \sqrt{2x-x^2} \, dx$
$= \int_0^1 (2x+1) \sqrt{2x-x^2} \, dx + \int_0^1 (2x+1) \sqrt{2x-x^2} \, dx$
$= 2\int_0^1 (2x+1) \sqrt{2x-x^2} \, dx$
$= 2\int_0^1 (2x+1) \sqrt{1-(x-1)^2} \, dx$
$= 2\int_0^1 (2x+1) \sqrt{1-(x-1)^2} \, dx$
$= 2\left[ \frac{1}{2} \left( (2x+1)^2 - (x-1)^2 \right) \right]_0^1$
$= 2\left[ \frac{1}{2} \left( 9 - 1 \right) \right]$
$= 8$.

## 常见错误
1. 忽略积分等式的应用，导致计算复杂。
2. 忽略积分不等式的性质，导致估计错误。
3. 在进行积分变换时，未正确处理变量替换。