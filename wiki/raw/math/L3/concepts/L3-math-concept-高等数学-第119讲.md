---
id: L3-math-concept-高等数学-第119讲
title: 高等数学-第119讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P219-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P219-concept]]

# 高等数学-第119讲

**来源：** 高等数学第119讲

```markdown
# 高等数学-第119讲：无穷级数

## 核心概念定义
无穷级数是数学分析中研究的一种数列的极限形式，由无穷多个数按照一定的次序排列并求和得到。无穷级数分为收敛级数和发散级数，收敛级数有确定的和，发散级数则没有。

## 核心公式
```latex
\begin{align*}
\sum_{n=1}^{\infty} a_n & \text{表示级数} \\
\lim_{n \to \infty} \sum_{k=1}^{n} a_k & \text{表示级数的和} \\
\end{align*}
```

## 典型例题
**例16.5** 判别级数 $\sum_{n=1}^{\infty} \frac{1}{n^2}$ 的敛散性。
**解**：由于 $\sum_{n=1}^{\infty} \frac{1}{n^2}$ 是一个收敛的p级数（$p>1$），故级数收敛。

**例16.6** 判别级数 $\sum_{n=1}^{\infty} \frac{1}{n \ln n}$ 的敛散性。
**解**：由于 $\ln(n!) < n \ln n$，故级数发散。

## 常见错误
1. 忽视级数收敛性的判定条件。
2. 错误地使用比较判别法，没有正确比较级数。
3. 在计算级数和时，没有注意级数项的极限。
```