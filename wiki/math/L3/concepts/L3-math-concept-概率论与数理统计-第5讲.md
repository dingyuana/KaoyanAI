---
id: L3-math-concept-概率论与数理统计-第5讲
title: 概率论与数理统计-第5讲
subject: math
type: concept
level: 3
tags: ['概率论与数理统计']
source_anchors: ['RAW-math-概率论-P076-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P076-concept]]

# 概率论与数理统计-第5讲

**来源：** 概率论与数理统计第5讲

```markdown
# 概率论与数理统计-第5讲：多维随机变量函数的分布

## 核心概念定义
多维随机变量函数的分布是指给定一个多维随机变量，求其函数的分布。即已知多维随机变量的联合分布，求其函数的分布。

## 核心公式
```latex
f_Y(y) = \sum_{x \in \Omega} f_{X_1, X_2, ..., X_n}(x) \cdot \delta(y - g(x))
```
其中，$f_Y(y)$ 是函数 $g(X_1, X_2, ..., X_n)$ 的分布密度函数，$f_{X_1, X_2, ..., X_n}(x)$ 是多维随机变量 $X_1, X_2, ..., X_n$ 的联合分布密度函数，$\delta$ 是狄拉克δ函数。

## 典型例题
**例题**：设二维随机变量 $(X, Y)$ 的联合分布密度函数为
$$
f(x, y) = \begin{cases} 
2, & \text{if } 0 \leq x \leq 1, 0 \leq y \leq 1, \\
0, & \text{otherwise}.
\end{cases}
$$
求 $Z = X + Y$ 的分布密度函数。

**解答**：由公式可知，
$$
f_Z(z) = \int_{-\infty}^{\infty} f(x, z-x) \, dx.
$$
将 $f(x, y)$ 代入上式，得到
$$
f_Z(z) = \begin{cases} 
2, & \text{if } 0 \leq z \leq 2, \\
0, & \text{otherwise}.
\end{cases}
$$

## 常见错误
1. 忘记将函数 $g(X_1, X_2, ..., X_n)$ 的值域限制在多维随机变量的联合分布的定义域内。
2. 在计算分布密度函数时，未正确处理狄拉克δ函数。
3. 在求解典型例题时，未正确应用联合分布密度函数和函数的值域限制。
