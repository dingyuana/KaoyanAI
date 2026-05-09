---
id: L3-math-concept-高等数学-第110讲
title: 高等数学-第110讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P210-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P210-concept]]

# 高等数学-第110讲

**来源：** 高等数学第110讲

```markdown
# 高等数学-第110讲：曲线弧长计算

## 核心概念定义
1. 曲线弧长：曲线上的两点间的曲线长度。
2. 一阶线性微分方程：形如dy/dx + P(x)y = Q(x)的微分方程。
3. 弧长计算公式：对于曲线y = y(x)在区间[a, b]上的弧长，公式为 \( L = \int_a^b \sqrt{1 + (y'(x))^2} \, dx \)。

## 核心公式
```latex
L = \int_a^b \sqrt{1 + (y'(x))^2} \, dx
```

## 典型例题
**例题**：求曲线 \( y = -2x + 2 \) 在区间 [1, e] 上的弧长。

**解**：
1. 计算导数：\( y' = -2 \)。
2. 代入弧长公式：\( L = \int_1^e \sqrt{1 + (-2)^2} \, dx = \int_1^e \sqrt{5} \, dx \)。
3. 计算积分：\( L = \sqrt{5} \cdot (x \big|_1^e) = \sqrt{5} \cdot (e - 1) \)。

## 常见错误
1. 忽略曲线的导数计算。
2. 错误应用弧长计算公式。
3. 在积分计算中出错，如积分上下限或积分函数的选择错误。