---
id: L3-math-concept-高等数学-第155讲
title: 高等数学-第155讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P259-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P259-concept]]

# 高等数学-第155讲

**来源：** 高等数学第155讲

```markdown
# 高等数学-第155讲：多元函数积分学

## 核心概念定义
多元函数积分学是研究多元函数在区域上的积分方法，包括二重积分和三重积分。在单连通区域内，若两个连续偏导数的函数的积分与路径无关，则该函数称为全微分函数。

## 核心公式
```latex
\[
\oint_C P \, dx + Q \, dy = 0
\]
\[
\iint_D \left( P \, dx + Q \, dy \right) = \iint_D \left( \frac{\partial u}{\partial x} \, dx + \frac{\partial u}{\partial y} \, dy \right)
\]
\[
\iint_D \left( P \, dx + Q \, dy \right) = \iint_D \left( \frac{\partial v}{\partial x} \, dx + \frac{\partial v}{\partial y} \, dy \right)
\]
```

## 典型例题
已知函数 \( f(x) \) 具有一阶连续导数，且 \( f(1) = 1 \)。设 \( L \) 是绕原点一周的任意正向闭曲线，若 \( \oint_L \frac{y}{x^2 + y^2} \, dx + \frac{x}{x^2 + y^2} \, dy = a \)，则 \( a = \)？

【解】应选(D)。

设 \( C \) 是任意一条不包含原点的封闭曲线，由题设可知 \( \oint_C \frac{y}{x^2 + y^2} \, dx + \frac{x}{x^2 + y^2} \, dy = 0 \)，所以 \( \oint_C \left( \frac{y}{x^2 + y^2} \, dx + \frac{x}{x^2 + y^2} \, dy \right) = 0 \)。从而 \( a = 0 \)。

## 常见错误
1. 忽略函数的连续性和可微性条件。
2. 误将积分与路径无关的条件应用于非单连通区域。
3. 误将全微分方程的解法应用于非全微分方程。
4. 误将凑微分法应用于非全微分方程。
```