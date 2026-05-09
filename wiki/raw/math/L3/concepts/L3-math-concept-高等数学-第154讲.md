---
id: L3-math-concept-高等数学-第154讲
title: 高等数学-第154讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P258-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P258-concept]]

# 高等数学-第154讲

**来源：** 高等数学第154讲

```markdown
# 高等数学-第154讲：多元函数积分学

## 核心概念定义

多元函数积分学是研究多元函数在区域上的积分方法。对于给定的函数 \( f(x, y) \) 和区域 \( D \)，多元函数积分学主要研究如何计算 \( \iint_D f(x, y) \, dA \)。

## 核心公式

\[
\iint_D f(x, y) \, dA = \int_a^b \left( \int_{g(x)}^{h(x)} f(x, y) \, dy \right) dx
\]

其中，\( a \) 和 \( b \) 是 \( x \) 的积分上下限，\( g(x) \) 和 \( h(x) \) 是 \( y \) 的积分上下限。

## 典型例题

**例18.20** 设 \( L \) 从点 \( A(-\pi, 0) \) 沿曲线 \( y = \cos x \) 到点 \( B(2, 0) \)，则 \( \oint_L (Pdx + Qdy) \) 的值为多少？

**解**：由于 \( P = \frac{\partial Q}{\partial x} \) 和 \( Q = \frac{\partial P}{\partial y} \)，故 \( \oint_L (Pdx + Qdy) = 0 \)。但考虑到 \( P \) 和 \( Q \) 在点 \( (0, 0) \) 处不连续，因此需要取一条从 \( A \) 到 \( B \) 的上半圆弧 \( L_1 \) 来计算积分。

\[
\oint_L (Pdx + Qdy) = \oint_{L_1} (Pdx + Qdy) = \int_{-\pi}^0 (P(\cos t, \sin t) \cos t - Q(\cos t, \sin t) \sin t) dt
\]

经过计算，可得 \( \oint_L (Pdx + Qdy) = -\pi \)。

## 常见错误

1. 忽略函数在区域边界上的连续性。
2. 错误地使用格林公式或斯托克斯公式。
3. 忽略路径无关性定理的应用条件。
```