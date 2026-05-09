---
id: L3-math-concept-高等数学-第150讲
title: 高等数学-第150讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P254-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P254-concept]]

# 高等数学-第150讲

**来源：** 高等数学第150讲

```markdown
# 高等数学-第150讲：多元函数积分学

## 核心概念定义
多元函数积分学是研究多元函数在区域上的积分方法，包括二重积分、三重积分以及曲线积分和曲面积分。它广泛应用于物理学、工程学等领域。

## 核心公式
```latex
\[
\iint\limits_D f(x,y) \, dx \, dy
\]
\[
\iiint\limits_V f(x,y,z) \, dx \, dy \, dz
\]
\[
\oint\limits_C P(x,y) \, dx + Q(x,y) \, dy
\]
\[
\iint\limits_S f(x,y,z) \, dS
\]
```

## 典型例题
**例18.13** 设曲面∑为球面 \(x^2+y^2+z^2=a^2\)，则计算曲面积分 \(\iint\limits_{\Sigma} f(x,y,z) \, dS\)。

**解**：利用球面的对称性，得到
\[
\iint\limits_{\Sigma} f(x,y,z) \, dS = \iint\limits_{\Sigma} f(x,y,z) \, dS
\]
通过计算得到积分结果。

**例18.14** 设曲面∑为球面 \((x-a)^2+(y-b)^2+(z-c)^2=R^2\)，计算曲面积分 \(\iint\limits_{\Sigma} f(x+y+2z) \, dS\)。

**解**：通过平移和对称性，得到
\[
\iint\limits_{\Sigma} f(x+y+2z) \, dS = -4\pi R^2
\]

**例18.15** 设空间曲面∑: \(z=\sqrt{x^2+y^2}\)，\(z=2\sqrt{x^2+y^2}\)，\(z=2\) 被柱面 \(x^2+y^2=1\) 所截部分的面积分别为 \(S_1\)，\(S_2\)，\(S_3\)，则 \(S_1\)，\(S_2\)，\(S_3\) 的大小关系为？

**解**：应选 (B) \(S_1 > S_2 > S_3\)。

## 常见错误
1. 忽略对称性，导致计算错误。
2. 混淆二重积分和三重积分的计算方法。
3. 在计算曲线积分和曲面积分时，未正确处理参数方程或曲面方程。
```