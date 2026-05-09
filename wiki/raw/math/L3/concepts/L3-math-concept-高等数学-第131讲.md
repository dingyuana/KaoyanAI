---
id: L3-math-concept-高等数学-第131讲
title: 高等数学-第131讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P233-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P233-concept]]

# 高等数学-第131讲

**来源：** 高等数学第131讲

```markdown
# 高等数学-第131讲：函数展开成幂级数

## 核心概念定义
函数展开成幂级数是指将一个函数在某一点附近表示为幂级数的形式。这是幂级数求和函数的逆问题，通过恒等变形和经典形式化归，可以将函数展开为幂级数。

## 核心公式
```latex
\begin{align*}
\ln(a+bx) & = \sum_{n=1}^{\infty} \frac{(-1)^{n-1}}{n} \left(\frac{b}{a}\right)^n x^n, \quad a>0 \\
\ln(1+ax+bx^2) & = \ln(1+cx) + \ln(1+dx), \quad a=c+d, b=cd \\
\sin(2x) & = 2\sin(x)\cos(x) \\
\cos(2x) & = \cos^2(x) - \sin^2(x)
\end{align*}
```

## 典型例题
**例16.50** 将函数 \( y = \ln(1-x-2x^2) \) 展开成 \( x \) 的幂级数，并指出其收敛区间。

**解**：由 \( \ln(1-x-2x^2) = \ln(1+x) + \ln(1-2x) \)，且 \( \ln(1+x) = \sum_{n=1}^{\infty} \frac{(-1)^{n-1}}{n} x^n \)，\( \ln(1-2x) = -\sum_{n=1}^{\infty} \frac{2^n}{n} x^n \)，于是有 \( \ln(1-x-2x^2) = \sum_{n=1}^{\infty} \frac{(-1)^{n-1}}{n} x^n - \sum_{n=1}^{\infty} \frac{2^n}{n} x^n \)，其收敛区间为 \( [-1, 1) \)。

**例16.51** 已知幂级数 \( \sum_{n=1}^{\infty} a_n x^n \) 的和函数为 \( \ln(2+x) \)，则 \( a_n = \)？

**解**：应选 \( (A) \)。依题意，有 \( a_1 = \ln 2 \)，\( a_2 = 2 \)，\( n = 1, 2, \ldots \)，进而 \( a_2 = 2a_1 - 2014 \)，\( n = 1, 2, \ldots \)，则 \( a_n = -2^n + 2 \)。

## 常见错误
1. 忘记幂级数的收敛区间。
2. 在进行恒等变形时，未正确化归经典形式。
3. 在展开函数时，未正确应用已知的恒等变形公式。