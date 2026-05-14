---
id: L3-math-concept-高等数学-第160讲
title: 高等数学-第160讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P265-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P265-concept]]

# 高等数学-第160讲

**来源：** 高等数学第160讲

```markdown
# 高等数学-第160讲：多元函数积分学

## 核心概念定义
多元函数积分学是研究多元函数在区域上的积分方法，包括二重积分和三重积分。它包括直接积分法和间接积分法，其中间接积分法包括换元积分法、分部积分法等。

## 核心公式
```latex
\begin{align*}
\iint\limits_D f(x,y) \, dx \, dy & \text{（二重积分）} \\
\iiint\limits_\Omega f(x,y,z) \, dx \, dy \, dz & \text{（三重积分）} \\
\end{align*}
```

## 典型例题
### 例18.30
**（1）求锥面∑的方程：**
设锥面∑上任一点为\( P(x,y,z) \)，其对应于准线上的点为\( P(1,y_0,z_0) \)。由\( OP \cdot OP_0 = \sqrt{x^2 + y^2 + z^2} \cdot \sqrt{1 + y_0^2 + z_0^2} \)，得\( z^2 = y_0^2 \)，则\( \sqrt{x^2 + y^2 + z^2} = y_0 \)，故锥面方程为\( x^2 + y^2 = z^2 \)，其中\( |y| \leq 1 \)，\( 0 \leq x \leq 1 \)，\( 0 \leq z \leq x \)。

**（2）计算曲面积分：**
\[ \iint\limits_{\Sigma} [2 + (-)() - f(x,y,z)] \, dS \]
其中，\(\Sigma\)取上侧。

**解：**
（此处省略具体计算过程，请参考原文）

### 例18.31
**计算曲面积分：**
\[ \iint\limits_{\Sigma} [x - y + 2y^2 + z - 2 + x] \, dS \]
其中，\(\Sigma\)是曲面\( |x-y+z| + |y-z+x| + |z-x+y| = 1 \)的外侧。

**解：**
（此处省略具体计算过程，请参考原文）

## 常见错误
1. 忽略积分区域和积分顺序。
2. 换元积分时，未正确计算雅可比行列式。
3. 使用高斯公式时，未正确确定积分区域和积分方向。