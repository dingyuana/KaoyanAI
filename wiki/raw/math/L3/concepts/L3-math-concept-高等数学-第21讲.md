---
id: L3-math-concept-高等数学-第21讲
title: 高等数学-第21讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P275-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P275-concept]]

# 高等数学-第21讲

**来源：** 高等数学第21讲

```markdown
# 高等数学-第21讲：函数极限与无穷小

## 核心概念定义
函数极限与无穷小是高等数学中研究函数变化趋势的重要概念。函数极限描述了当自变量趋近于某一值时，函数值的变化趋势；无穷小则描述了函数值趋近于零的快慢程度。

## 核心公式
```latex
\begin{align*}
\lim_{x \to 0} f(x) &= \lim_{x \to 0} \cos x - 1 \approx -2 \\
\lim_{x \to 0} \frac{f(x)}{g(x)} &= \lim_{x \to 0} \frac{-2}{2} = -1 \\
\lim_{x \to 0} \int_0^x f(t) \, dt &= \lim_{x \to 0} \int_0^x a^n \, dt = \frac{a^n}{n} \\
\lim_{x \to 0} \int_0^x f(t) \, dt &= \lim_{x \to 0} \int_0^x A^n \, dt = \frac{A^n}{n} \\
\lim_{x \to 0} \int_0^x f(t) \, dt &= \lim_{x \to 0} \int_0^x a^n \, dt = \frac{a^n}{n} \\
\lim_{x \to 0} \int_0^x f(t) \, dt &= \lim_{x \to 0} \int_0^x A^n \, dt = \frac{A^n}{n} \\
\lim_{x \to 0} \int_0^x f(t) \, dt &= \lim_{x \to 0} \int_0^x a^n \, dt = \frac{a^n}{n} \\
\lim_{x \to 0} \int_0^x f(t) \, dt &= \lim_{x \to 0} \int_0^x A^n \, dt = \frac{A^n}{n} \\
\end{align*}
```

## 典型例题
**例1.5** 设函数$f(x),g(x)$在$x=0$的某去心邻域内有定义且恒不为0，若当$x \to 0$时，$f(x)$是$g(x)$的高阶无穷小，则当$x \to 0$时，有( )。

(A) $f(x) + g(x) = 0$  
(B) $f(x)g(x) = o(f^2(x))$  
(C) $f(x) = o(e^x - 1)$  
(D) $f(x) = o(g^2(x))$

**解** 应选(C)。

**例1.6** 已知函数$f(x) = \frac{m+2}{x}$ 在$(0, +\infty)$上有界，则$m$的取值范围是( )。

(A) $-1 < m < 3$  
(B) $1 < m \leq 3$  
(C) $0 < m \leq 3$  
(D) $m > 3$

**解** 应选(B)。

## 常见错误
1. 忽略无穷小的阶数，错误地认为两个无穷小相等。
2. 在计算极限时，未正确处理无穷小与无穷大的关系。
3. 在处理变上限积分型极限时，未正确应用洛必达法则或泰勒公式。
4. 在比较无穷大量阶时，未正确使用极限的性质。