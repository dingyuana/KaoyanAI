---
id: L3-math-concept-高等数学-第82讲
title: 高等数学-第82讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P342-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P342-concept]]

# 高等数学-第82讲

**来源：** 高等数学第82讲

```markdown
# 高等数学-第82讲：一元画数积今学的左用(二)——积今等式与积今不管式

## 核心概念定义
一元画数积今学的左用（二）主要讨论了定积分的换元积分法和分部积分法，以及它们在解决定积分问题中的应用。换元积分法通过变量替换改变积分形式，而分部积分法则通过微分和积分的相互转换来简化积分问题。

## 核心公式
```latex
\begin{align*}
\int_a^b f(x) \, dx &= \int_{\phi(a)}^{\phi(b)} f(\phi(t)) \phi'(t) \, dt, \quad \text{（换元积分法）} \\
\int u \, dv &= uv - \int v \, du, \quad \text{（分部积分法）}
\end{align*}
```

## 典型例题
**例题1：** 计算积分 $\int (x-1)^2 \, dx$。

**解：** 使用分部积分法，令 $u = x-1$，则 $du = dx$，$dv = (x-1) \, dx$，$v = \frac{(x-1)^2}{2}$。代入分部积分公式得：
```latex
\int (x-1)^2 \, dx = \frac{(x-1)^3}{2} - \int \frac{(x-1)^3}{2} \, dx = \frac{(x-1)^3}{2} - \frac{1}{2} \cdot \frac{(x-1)^4}{4} + C.
```

## 常见错误
1. 忘记换元后的积分限。
2. 在分部积分法中，选择 $u$ 和 $dv$ 的顺序不当。
3. 在使用换元积分法时，没有正确地计算 $\phi'(t)$。
4. 在解决定积分问题时，没有正确识别和使用换元积分法和分部积分法。
```markdown
```