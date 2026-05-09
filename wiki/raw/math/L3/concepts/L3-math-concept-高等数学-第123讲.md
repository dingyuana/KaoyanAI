---
id: L3-math-concept-高等数学-第123讲
title: 高等数学-第123讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P224-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P224-concept]]

# 高等数学-第123讲

**来源：** 高等数学第123讲

```markdown
# 高等数学-第123讲：无穷级数

## 核心概念定义
无穷级数是数学分析中一种重要的数列极限形式，由无穷多个数按照一定的次序排列并求和。无穷级数分为收敛级数和发散级数，收敛级数具有有限的和。

## 核心公式
```latex
\lim_{n \to \infty} \frac{a_n}{b_n} = k \quad (0 \leq k < +\infty) \Rightarrow \sum_{n=1}^{\infty} (a_n - b_n) \text{ 收敛}
```

## 典型例题
**例16.23** 设两个数列 $\{a_n\}, \{b_n\}$，若 $\lim_{n \to \infty} (a_n - b_n) = k$，$k$ 为正常数，则 $\sum_{n=1}^{\infty} (a_n - b_n)$ 的敛散性为：

(A) 收敛

**解** 应选 (A)。

由于 $\lim_{n \to \infty} (a_n - b_n) - \lim_{n \to \infty} 2 = k - 2 = 0 \quad (0 \leq k < +\infty)$，又 $\sum_{n=1}^{\infty} 2$ 收敛，故由比较判别法的极限形式，有 $\sum_{n=1}^{\infty} (a_n - b_n)$ 收敛。

## 常见错误
1. 忽视级数收敛与发散的判别条件。
2. 错误使用比较判别法，未正确判断比较级数的敛散性。
3. 忽视级数敛散性与数列敛散性的关系。
```