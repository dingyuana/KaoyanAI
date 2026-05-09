---
id: L3-math-concept-高等数学-第121讲
title: 高等数学-第121讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P222-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P222-concept]]

# 高等数学-第121讲

**来源：** 高等数学第121讲

```markdown
# 高等数学-第121讲：无穷级数

## 核心概念定义
无穷级数是数学分析中一种重要的极限概念，用于研究数列的极限性质。泰勒展开是一种将函数在某点附近表示为多项式的数学方法，常用于研究函数的局部性质。

## 核心公式
```latex
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n
```

## 典型例题
**例16.16** 判别级数 $\sum_{n=1}^{\infty} \frac{\cos n\pi}{n^2}$ 的敛散性。

**解** 由 $\cos n\pi = (-1)^n \leq 1$，得
```latex
\sum_{n=1}^{\infty} \frac{(-1)^n}{n^2} \leq \sum_{n=1}^{\infty} \frac{1}{n^2}
```
由于 $\sum_{n=1}^{\infty} \frac{1}{n^2}$ 收敛，故级数 $\sum_{n=1}^{\infty} \frac{\cos n\pi}{n^2}$ 收敛。

## 常见错误
1. 忽视函数的连续性和可导性条件。
2. 错误地使用级数收敛判别法。
3. 忽略级数项的符号变化。
```