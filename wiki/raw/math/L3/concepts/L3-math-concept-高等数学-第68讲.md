---
id: L3-math-concept-高等数学-第68讲
title: 高等数学-第68讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P326-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P326-concept]]

# 高等数学-第68讲

**来源：** 高等数学第68讲

```markdown
# 高等数学-第68讲：一元有理函数积分

## 核心概念定义
一元有理函数积分是指形如 $\frac{P(x)}{Q(x)}$ 的函数的积分，其中 $P(x)$ 和 $Q(x)$ 分别是 $x$ 的多项式，且 $Q(x)$ 的次数大于 $P(x)$ 的次数。这类积分可以通过部分分式分解和三角换元等方法进行计算。

## 核心公式
```latex
\int \frac{P(x)}{Q(x)} \, dx = \int \frac{P(x)}{D(x)} \, dx + \int \frac{P(x)}{D(x)} \, dx
```

## 典型例题
**例9.10** 计算不定积分 $\int \frac{x+1}{x^2-2x+2} \, dx$。

**解**：令 $u = x^2 - 2x + 2$，则 $du = (2x - 2) \, dx$。原积分可转化为：
$$
\int \frac{x+1}{x^2-2x+2} \, dx = \frac{1}{2} \int \frac{2x-1}{x^2-2x+2} \, dx = \frac{1}{2} \int \frac{du}{u}
$$
解得：
$$
\int \frac{x+1}{x^2-2x+2} \, dx = \frac{1}{2} \ln |x^2-2x+2| + C
$$

## 常见错误
1. 忘记对有理函数进行部分分式分解。
2. 在进行三角换元时，未正确处理三角函数的导数。
3. 在计算积分时，未正确处理常数项。