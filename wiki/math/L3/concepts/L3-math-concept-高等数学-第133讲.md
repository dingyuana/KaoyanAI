---
id: L3-math-concept-高等数学-第133讲
title: 高等数学-第133讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P235-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P235-concept]]

# 高等数学-第133讲

**来源：** 高等数学第133讲

```markdown
# 高等数学-第133讲

## 核心概念定义
狄利克雷收敛定理：设f(x)是以2π为周期的可积函数，若在[-π,π]上f(x)连续或只有有限个第一类间断点，且至多只有有限个极值点，则f(x)的傅里叶级数在[-π,π]上处处收敛。对于连续点，级数和函数S(x)等于f(x)；对于间断点，S(x)等于f(x)左极限与右极限的平均值；对于x=±π，S(x)等于f(x)的左极限。

正弦级数和余弦级数：当f(x)为奇函数时，其傅里叶级数展开为正弦级数；当f(x)为偶函数时，其傅里叶级数展开为余弦级数。

## 核心公式
```latex
S(x) = \begin{cases} 
f(x) & \text{if } x \text{ is continuous} \\
\frac{f(x^-) + f(x^+)}{2} & \text{if } x \text{ is a point of discontinuity} \\
f(-\pi) & \text{if } x = \pm \pi
\end{cases}
```

## 典型例题
**例16.54** 设 \( f(x) = \begin{cases} -2, & x = 0 \\ 2, & x = \pi \end{cases} \)，令 \( S(x) = -2b_1 \sin(x) + \sum_{n=2}^{\infty} b_n \sin(nx) \)，则 \( S(-2) = \)？

**解** 应选(C)。

由题意知，S(x)是f(x)的周期为2的正弦级数展开式，根据狄利克雷收敛定理，得 \( S(-2) = S(-4) = -S(4) = -(4) = -4 \)。

**例16.55** 已知函数 \( f(x) = x + 1 \)，若其傅里叶展开式为 \( S(x) = -2 + \sum_{n=1}^{\infty} \cos(nx) \)，则 \( \lim_{n \to \infty} 3\sin(3\pi n) = \)？

**解** 应填 \( 0 \)。

## 常见错误
1. 忽略狄利克雷收敛定理的应用条件。
2. 错误地应用正弦级数和余弦级数的展开公式。
3. 在计算傅里叶系数时，未正确处理奇偶函数的性质。
4. 在计算级数和函数时，未正确处理间断点和端点的情况。
```