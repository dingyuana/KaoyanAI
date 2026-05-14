---
id: L3-math-concept-高等数学-第157讲
title: 高等数学-第157讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P261-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P261-concept]]

# 高等数学-第157讲

**来源：** 高等数学第157讲

```markdown
# 高等数学-第157讲：多元函数积分学

## 核心概念定义
多元函数积分学是高等数学中研究多元函数积分的一门学科。它包括对多元函数进行定积分和曲面积分的计算方法。

## 核心公式
```latex
\iint_S \mathbf{F} \cdot d\mathbf{S} = \iint_D \mathbf{F}(\mathbf{r}(x, y)) \cdot \mathbf{r}_x \times \mathbf{r}_y \, dx \, dy
\iint_S \mathbf{F} \cdot d\mathbf{S} = \iint_D \mathbf{F}(\mathbf{r}(x, y)) \cdot \mathbf{r}_y \times \mathbf{r}_z \, dx \, dz
\iint_S \mathbf{F} \cdot d\mathbf{S} = \iint_D \mathbf{F}(\mathbf{r}(x, y)) \cdot \mathbf{r}_z \times \mathbf{r}_x \, dy \, dz
```

## 典型例题
**例18.26** 计算以下第二型曲面积分：
\[ \iint_{\Sigma} \mathbf{F} \cdot d\mathbf{S} = \iint_{\Sigma} (P \, dx + Q \, dy + R \, dz) \]
其中，\(\Sigma\) 为 \(z = x^2 + y^2\) 与 \(z = 1\) 所围区域 \(\Omega\) 的表面，方向向外。

**解**：由题设得，\(\Sigma\) 关于 \(yOz\) 面对称，且 \(|x|y^2z = |-x|y^2z\)，故
\[ \iint_{\Sigma} P \, dx + Q \, dy = 0 \]
\[ \iint_{\Sigma} R \, dz = -\iint_{\Sigma} P \, dx + Q \, dy = 0 \]

## 常见错误
1. 将第二型曲面积分与第一型曲面积分混淆。
2. 在计算第二型曲面积分时，忘记考虑曲面的方向。
3. 在将曲面积分转化为二重积分时，错误地处理了投影和微元。