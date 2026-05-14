---
id: L3-math-concept-高等数学-第127讲
title: 高等数学-第127讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P228-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P228-concept]]

# 高等数学-第127讲

**来源：** 高等数学第127讲

```markdown
# 高等数学-第127讲：无穷级数

## 核心概念定义
无穷级数是数学分析中的一个重要概念，它由一系列数按照一定的顺序排列并求和得到。无穷级数分为收敛级数和发散级数，收敛级数在某种意义上可以看作是无限项的和。

## 核心公式
```latex
\begin{align*}
\sum_{n=1}^{\infty} a_n & \text{表示级数} \\
S_n &= \sum_{k=1}^{n} a_k \text{表示级数的前} n \text{项和} \\
\lim_{n \to \infty} S_n &= \text{级数的极限和}
\end{align*}
```

## 典型例题
**例16.36** 设级数 $\sum_{n=1}^{\infty} a_n$ 收敛，判断级数 $\sum_{n=1}^{\infty} \frac{a_n}{n^2+1}$ 的敛散性。

**解** 当 $n \to \infty$ 时，由于 $\frac{a_n}{n^2+1}$ 均收敛及正项级数的比较判别法知，级数 $\sum_{n=1}^{\infty} \frac{a_n}{n^2+1}$ 绝对收敛。

## 常见错误
1. 忽视级数收敛性的充分必要条件。
2. 错误应用比较判别法，未正确比较级数项的大小。
3. 在判断级数敛散性时，未考虑级数项的极限。
```