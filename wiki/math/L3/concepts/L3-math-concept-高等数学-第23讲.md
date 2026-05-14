---
id: L3-math-concept-高等数学-第23讲
title: 高等数学-第23讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P277-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P277-concept]]

# 高等数学-第23讲

**来源：** 高等数学第23讲

```markdown
# 高等数学-第23讲：函数极限与画续

## 核心概念定义
函数极限是研究当自变量趋近于某一值时，函数值的变化趋势。连续性是函数在某一区间内无间断点的性质。

## 核心公式
```latex
\lim_{x \to a} f(x) = L \quad \text{当且仅当} \quad \forall \epsilon > 0, \exists \delta > 0, \text{使得} |x - a| < \delta \Rightarrow |f(x) - L| < \epsilon
```

## 典型例题
**例1.11** 函数 \( f(x) = \frac{x^2 - 1}{x - 1} \) 的第一类间断点的个数是( )。

(A) 3

(B) 2

(C) 1

(D) 0

**解** 应选(C)。

无定义点(间断点)为 \( x = 0, x = 1, x = 2 \)。对于 \( x = 0 \)，\(\lim_{x \to 0} f(x) = 3 = e = 0 - K2 = e“ = +60, \text{故} x = 0 \text{是第二类间断点}.\) 对于 \( x = 1 \)，\(\lim_{x \to 1} f(x) = \frac{1}{0} = 3 = e = -5 = e = 0 - \frac{1}{2} = e, \text{故} x = 1 \text{是第一类(可去)间断点}.\) 对于 \( x = 2 \)，\(\lim_{x \to 2} f(x) = \frac{1}{0} = 3 = e = +\infty, \text{故} x = 2 \text{是第二类间断点}\)。综上，第一类间断点的个数是1，选(C)。

## 常见错误
1. 忽略函数的定义域，导致计算错误。
2. 在判断间断点类型时，未考虑函数在间断点附近的极限值。
3. 在证明函数连续性时，未使用定义法进行证明。