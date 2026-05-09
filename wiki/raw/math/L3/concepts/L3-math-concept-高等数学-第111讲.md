---
id: L3-math-concept-高等数学-第111讲
title: 高等数学-第111讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P211-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P211-concept]]

# 高等数学-第111讲

**来源：** 高等数学第111讲

```markdown
# 高等数学-第111讲

## 欲今方程

### 核心概念定义
欲今方程，也称为伯努利方程，是一类特殊的二阶微分方程，其形式为 \( y'' + p(x)y' = q(x)y^n \)（其中 \( n \neq 0, 1 \)）。

### 核心公式
\[
\begin{align*}
y'' + p(x)y' &= q(x)y^n, \\
z &= y^{1-n}, \\
\frac{dz}{dx} &= (1-n)y^{-n}y', \\
\frac{dz}{dx} - n + p(x)z &= q(x).
\end{align*}
\]

### 典型例题
**例题**：求解微分方程 \( y'' - 2xy' = y^3 \)。

**解答**：
1. 令 \( z = y^{1-2} = y^{-1} \)，则 \( \frac{dz}{dx} = -y^{-2}y' \)。
2. 原方程变为 \( -y^{-2}y' - 2xy' = y^3 \)。
3. 整理得 \( \frac{dz}{dx} + 2xy' = -y^3 \)。
4. 这是一个一阶线性微分方程，解之得 \( z = e^{-\int 2x dx} \int e^{\int 2x dx} (-y^3) dy \)。
5. 最终解为 \( y = \frac{1}{z} \)。

### 常见错误
1. 在求解伯努利方程时，忘记将方程变形为标准形式。
2. 在求解一阶线性微分方程时，忘记使用积分因子。
3. 在求解可分离变量的微分方程时，忘记考虑所有可能的解，如 \( u = 0 \)。