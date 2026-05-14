---
id: L3-math-concept-高等数学-第27讲
title: 高等数学-第27讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P281-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P281-concept]]

# 高等数学-第27讲

**来源：** 高等数学第27讲

```markdown
# 高等数学-第27讲：数列极限

## 核心概念定义
数列极限是指当数列的项数无限增大时，数列的值趋向于某一固定值。如果对于任意小的正数ε，都存在一个正整数N，使得当n>N时，数列的项与这个固定值的差的绝对值小于ε，则称数列收敛于这个固定值。

## 核心公式
$$
\lim_{n \to \infty} x_n = a \quad \text{若且仅若} \quad \forall \epsilon > 0, \exists N \in \mathbb{N}, \text{使得} \quad n > N \Rightarrow |x_n - a| < \epsilon
$$

## 典型例题
**例1：** 设数列$\{a_n\}$满足$a_1 = 1$，且$a_{n+1} = \frac{1}{2}a_n + \frac{1}{3}$，求$\lim_{n \to \infty} a_n$。

**解：** 由题意，$a_{n+1} - \frac{2}{3} = \frac{1}{2}(a_n - \frac{2}{3})$，令$b_n = a_n - \frac{2}{3}$，则$b_{n+1} = \frac{1}{2}b_n$。因此，$\lim_{n \to \infty} b_n = 0$，从而$\lim_{n \to \infty} a_n = \frac{2}{3}$。

## 常见错误
1. 忽视数列极限的定义，直接猜测数列的极限值。
2. 在证明数列极限时，没有正确使用夹逼准则或单调有界准则。
3. 在处理数列极限问题时，没有注意到数列的通项公式可能存在不连续点或未定义点。
```