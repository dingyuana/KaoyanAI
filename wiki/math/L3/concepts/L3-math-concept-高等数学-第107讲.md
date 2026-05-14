---
id: L3-math-concept-高等数学-第107讲
title: 高等数学-第107讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P206-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P206-concept]]

# 高等数学-第107讲

**来源：** 高等数学第107讲

```markdown
# 高等数学-第107讲：二重积分

## 核心概念定义
二重积分是计算平面区域上函数值的总和，通过将区域划分为无数小区域，并计算每个小区域上函数值的乘积再求和，最后取极限得到。

## 核心公式
```latex
\iint\limits_D f(x,y) \, dx \, dy = \lim_{n \to \infty} \sum_{i=1}^{n} \sum_{j=1}^{n} f(x_i, y_j) \Delta x \Delta y
```

## 典型例题
**例题**：设 \( D = \{(x,y) \mid (x-1)^2 + (y-1)^2 \leq 2, y \geq x \} \)，计算二重积分 \( \iint\limits_D (x-y) \, dx \, dy \)。

**解**：
法一：通过极坐标变换，得到 \( r \leq 2(\sin\theta + \cos\theta) \)，然后进行积分计算。

法二：通过变量代换 \( u = y-1 \)，将区域 \( D \) 转换为 \( D' \)，然后进行积分计算。

## 常见错误
1. 忽略积分区域的存在性，即在进行积分时未考虑积分区域的具体形状和范围。
2. 在进行变量代换时，未正确计算新的积分限。
3. 在计算二重积分时，未正确处理被积函数和积分区域之间的关系。