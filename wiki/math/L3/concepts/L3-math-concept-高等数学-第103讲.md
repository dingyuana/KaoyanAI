---
id: L3-math-concept-高等数学-第103讲
title: 高等数学-第103讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P202-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P202-concept]]

# 高等数学-第103讲

**来源：** 高等数学第103讲

```markdown
# 高等数学-第103讲：二重积分

## 核心概念定义
二重积分是计算二维平面区域上函数值的总和，通过将区域划分为无数个小区域，计算每个小区域的积分和，然后取极限得到整个区域的积分。

## 核心公式
```latex
\iint_D f(x,y) \, dx \, dy = \lim_{n \to \infty} \sum_{i=1}^{n} \sum_{j=1}^{n} f(x_i, y_j) \Delta x \Delta y
```

## 典型例题
**例14.1** 计算二重积分 $\iint_D (x^2 + y^2) \, dx \, dy$，其中 $D = \{(x,y) | 0 \leq x \leq 1, 0 \leq y \leq 1\}$。

**解** 应填 $2/3$。

**例14.2** 计算二重积分 $\iint_D \frac{1}{x} \, dx \, dy$，其中 $D = \{(x,y) | 0 \leq x \leq 1, 0 \leq y \leq 1\}$。

**解** 应填 $1$。

## 常见错误
1. 忘记将二重积分转换为累次积分。
2. 交换积分次序时，边界条件处理错误。
3. 在使用对称性时，未正确识别对称轴或对称中心。
4. 计算积分时，未正确处理积分区域。
```