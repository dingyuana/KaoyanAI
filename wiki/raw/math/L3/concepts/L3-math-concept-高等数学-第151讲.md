---
id: L3-math-concept-高等数学-第151讲
title: 高等数学-第151讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P255-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P255-concept]]

# 高等数学-第151讲

**来源：** 高等数学第151讲

```markdown
# 高等数学-第151讲：多元函数和分学（仅数学一）

## 2. 第二型曲面积分

### 概念
第二型曲面积分，也称为通量积分，是计算向量场通过曲面的通量。

### 核心公式
\[
\iint_S \mathbf{F} \cdot d\mathbf{S} = \iint_S (P \, dx + Q \, dy + R \, dz)
\]

### 典型例题
**例题**：计算向量场 \(\mathbf{F}(x, y, z) = (x, y, z)\) 通过曲面 \(S: z = x^2 + y^2\) 的通量。

**解答**：
1. 将曲面 \(S\) 投影到 \(xy\)-平面上，得到 \(D_{xy}: x^2 + y^2 \leq z\)。
2. 计算曲面积分：
   \[
   \iint_S \mathbf{F} \cdot d\mathbf{S} = \iint_{D_{xy}} (x, y, z) \cdot (1, 0, 1) \, dx \, dy = \iint_{D_{xy}} (x + z) \, dx \, dy
   \]
3. 由于 \(z = x^2 + y^2\)，代入上式：
   \[
   \iint_{D_{xy}} (x + x^2 + y^2) \, dx \, dy
   \]
4. 通过极坐标变换计算积分。

### 常见错误
1. 忘记将曲面积分转换为二重积分。
2. 错误地应用了高斯公式或斯托克斯公式。
3. 在计算过程中忽略了曲面的方向。
```