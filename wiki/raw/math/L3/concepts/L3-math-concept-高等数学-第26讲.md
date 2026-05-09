---
id: L3-math-concept-高等数学-第26讲
title: 高等数学-第26讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P280-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P280-concept]]

# 高等数学-第26讲

**来源：** 高等数学第26讲

```markdown
# 高等数学-第26讲：数列极限

## 核心概念定义
数列极限是指当数列的项数n无限增大时，数列的项x_n无限接近某个确定的值A，记作lim(x_n) = A。

## 核心公式
$$
\lim_{n \to \infty} x_n = A
$$

## 典型例题
**例2.3**：若 \( 0 < x_n < 1 \)，且 \( x_{n+1} = 1 - \sqrt{1 - x_n} \) (n=1,2,…), 求：
1. \( \lim_{n \to \infty} x_n \);
2. \( \lim_{n \to \infty} \frac{x_{n+1} - x_n}{x_n + x_{n+1}} \)。

**解**：
1. 由 \( x_{n+1} = 1 - \sqrt{1 - x_n} \) = \( 1 + \frac{1}{2}x_n} \) < \( x_n \)，0 < \( x_n \) < 1, 知数列 \( \{x_n\} \) 单调减少且有下界，故数列 \( \{x_n\} \) 收敛。
设 \( \lim_{n \to \infty} x_n = a \)，则有 \( a = 1 - \sqrt{1 - a} \)，解得 \( a = 0 \) (a=1舍去)，故 \( \lim_{n \to \infty} x_n = 0 \)。
2. 由(1)可知，\( \lim_{n \to \infty} \frac{x_{n+1} - x_n}{x_n + x_{n+1}} = \lim_{n \to \infty} \frac{\frac{1}{2}x_n}{2x_n} = \frac{1}{4} \)。

## 常见错误
1. 忽略数列有界性，导致错误判断数列收敛性。
2. 错误地使用拉格朗日中值定理，导致错误计算数列极限。
3. 忽略数列单调性，导致错误判断数列收敛性。
```