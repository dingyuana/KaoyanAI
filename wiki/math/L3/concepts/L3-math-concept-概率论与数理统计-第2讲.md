---
id: L3-math-concept-概率论与数理统计-第2讲
title: 概率论与数理统计-第2讲
subject: math
type: concept
level: 3
tags: ['概率论与数理统计']
source_anchors: ['RAW-math-概率论-P051-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P051-concept]]

# 概率论与数理统计-第2讲

**来源：** 概率论与数理统计第2讲

```markdown
# 概率论与数理统计-第2讲：一维随机变量及其分布

## 核心概念定义
一维随机变量是指取值仅与一个随机试验的结果相关的随机变量。一维随机变量的分布描述了该随机变量取各个可能值的概率。

## 核心公式
```latex
P\{X = x\} = f_X(x), \quad x \in \mathbb{R}
```
其中，$f_X(x)$ 表示随机变量 $X$ 的概率密度函数。

## 典型例题
**例题**：设随机变量 $X$ 服从参数为 $\lambda$ 的指数分布，求 $P\{X > 1\}$。

**解答**：
由于 $X$ 服从指数分布，其概率密度函数为：
$$
f_X(x) = \begin{cases} 
\lambda e^{-\lambda x}, & x \geq 0 \\
0, & x < 0 
\end{cases}
$$
因此，
$$
P\{X > 1\} = \int_1^\infty \lambda e^{-\lambda x} \, dx = e^{-\lambda}
$$

## 常见错误
1. 将概率密度函数与概率混淆，错误地使用概率密度函数计算概率。
2. 在计算概率时，未正确使用概率密度函数或分布函数。
3. 忽略随机变量的取值范围，导致计算错误。
```
