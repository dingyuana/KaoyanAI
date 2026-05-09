---
id: L3-math-concept-高等数学-第145讲
title: 高等数学-第145讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P248-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P248-concept]]

# 高等数学-第145讲

**来源：** 高等数学第145讲

```markdown
# 高等数学-第145讲：多元函数积分学

## 核心概念定义
多元函数积分学是研究多元函数在空间区域上的积分方法，包括二重积分和三重积分。它广泛应用于物理学、工程学等领域。

## 核心公式
```latex
\[
\iint\limits_{\Omega} f(x, y) \, d\sigma = \iint\limits_{D_{xy}} f(x, y) \, dx \, dy
\]
\[
\iiint\limits_{\Omega} f(x, y, z) \, dV = \iiint\limits_{D_{xyz}} f(x, y, z) \, dx \, dy \, dz
\]
```

## 典型例题
**例18.7** 已知物体占有空间闭区域Ω由 \(z = \sqrt{x^2 + y^2}\) 与 \(z = \sqrt{a^2 - x^2 - y^2}\) (\(a > 0\)) 围成，在点 \((x, y, z)\) 的密度是 \(p(x, y, z) = \sqrt{x^2 + y^2 + z^2}\)，求该物体的质量。

**解**：Ω在球坐标系下可以表示为 \(\{(r, \theta, \phi) | 0 \leq r \leq a, 0 \leq \theta < 2\pi, 0 \leq \phi \leq \pi\}\)，所以
\[
m = \iiint\limits_{\Omega} p(x, y, z) \, dV = \int_0^{2\pi} \int_0^{\pi} \int_0^a r^3 \sin \phi \, dr \, d\phi \, d\theta = \frac{4}{3}\pi a^3
\]

## 常见错误
1. 忽略积分区域的边界条件。
2. 错误地将二重积分和三重积分的积分顺序。
3. 忽略积分区域的对称性。