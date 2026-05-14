---
id: L3-math-concept-高等数学-第14讲
title: 高等数学-第14讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P253-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P253-concept]]

# 高等数学-第14讲

**来源：** 高等数学第14讲

```markdown
# 高等数学-第14讲：二重积分

## 核心概念定义
二重积分是数学分析中的一种积分方法，用于计算平面区域上的二重变限积分。它将一个函数在一个二维平面区域上的积分转化为对该区域进行积分。

## 核心公式
$$
\iint_D f(x, y) \, dA = \int_{a}^{b} \left( \int_{c}^{d} f(x, y) \, dy \right) dx
$$
其中，\(D\) 是积分区域，\(a\) 和 \(b\) 是 \(x\) 的积分上下限，\(c\) 和 \(d\) 是 \(y\) 的积分上下限。

## 典型例题
**例题**：计算函数 \(f(x, y) = x^2 + y^2\) 在区域 \(D: x^2 + y^2 \leq 1\) 上的二重积分。

**解答**：
$$
\iint_D (x^2 + y^2) \, dA = \int_{-1}^{1} \left( \int_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}} (x^2 + y^2) \, dy \right) dx
$$
$$
= \int_{-1}^{1} \left[ x^2y + \frac{y^3}{3} \right]_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}} \, dx
$$
$$
= \int_{-1}^{1} \left( 2x^2 + \frac{2(1-x^2)}{3} \right) \, dx
$$
$$
= \left[ \frac{2x^3}{3} + \frac{2x}{3} - \frac{2x^5}{15} \right]_{-1}^{1}
$$
$$
= \frac{8}{15}
$$

## 常见错误
1. 忘记在积分过程中对变量进行适当的替换。
2. 错误地计算积分区域的边界。
3. 在计算积分时，忘记考虑积分的顺序。
4. 在计算积分时，未正确处理积分的上下限。
```