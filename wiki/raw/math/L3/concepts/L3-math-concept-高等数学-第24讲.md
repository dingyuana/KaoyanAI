---
id: L3-math-concept-高等数学-第24讲
title: 高等数学-第24讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P278-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P278-concept]]

# 高等数学-第24讲

**来源：** 高等数学第24讲

```markdown
# 高等数学-第24讲：函数极限与画续

## 核心概念定义
函数极限是指当自变量x趋近于某一点时，函数f(x)的值趋近于某一确定的常数A。画续是指利用极限的性质，将函数在间断点附近的值“续”接起来，使其在定义域内连续。

## 核心公式
```latex
\lim_{x \to a} f(x) = A \quad \text{当且仅当} \quad \forall \epsilon > 0, \exists \delta > 0, \text{使得} |f(x) - A| < \epsilon \text{当} 0 < |x - a| < \delta
```

## 典型例题
**例1.13** 设f(x)单调减少，$\lim_{x \to \infty} f(x) = 0$，证明$f(x) \geq 0$。

**【证】** 由f(x)单调减少，知对任意t > 0，有$f(x) \geq f(x+t)$，则
$$
\lim_{x \to \infty} f(x) = \lim_{x \to \infty} f(x+t) = \lim_{u \to \infty} f(u) = 0.
$$

**例1.14** 设$x \geq 0$，记$x$到$2k$的最小距离为$f(x)$，$k = 0, 1, 2, \ldots$。

(1) 证明$f(x)$以2为周期，写出其在$[0, 2]$上的表达式并画出$f(x)$的图像；
(2) 求$\int_0^\infty f(x) \, dx$。

**【解】** (1) 当$x \geq 0$时，
$$
f(x+2) = \min\{|(x+2)-2k|\} = \min\{|x-2(k-1)|\} = f(x) \quad (k=1, 2, \ldots)
$$
故$f(x)$是以2为周期的函数，其在$[0, 2]$上的表达式为
$$
f(x) = \begin{cases}
x & \text{若} 0 \leq x < 1 \\
2-x & \text{若} 1 \leq x \leq 2
\end{cases}
$$
故$f(x)$的图像如图所示。

(2) 当$2n \leq x < 2n+2$时，
$$
\int_{2n}^{2n+2} f(x) \, dx = \int_{2n}^{2n+1} x \, dx + \int_{2n+1}^{2n+2} (2-x) \, dx = \frac{1}{2} + \frac{1}{2} = 1
$$
故
$$
\int_0^\infty f(x) \, dx = \sum_{n=0}^\infty \int_{2n}^{2n+2} f(x) \, dx = \sum_{n=0}^\infty 1 = \infty
$$

## 常见错误
1. 忽略函数的连续性，直接计算极限；
2. 在证明函数极限时，没有正确使用夹逼准则；
3. 在证明函数单调有界时，没有正确使用单调有界准则。