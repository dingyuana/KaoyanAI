---
id: L3-math-concept-高等数学-第78讲
title: 高等数学-第78讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P337-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P337-concept]]

# 高等数学-第78讲

**来源：** 高等数学第78讲

```markdown
# 高等数学-第78讲：一元函数积分学的应用(二)——积分等式与积分不等式

## 核心概念定义

1. **定积分等式问题**：涉及定积分的性质和运算，包括与字母无关性、线性性、方向性、可加性等。
2. **积分等式**：利用定积分的性质，将复杂的积分问题转化为简单的积分问题。
3. **积分不等式**：研究定积分与函数值之间的关系，以及积分与区间的关系。

## 核心公式

```latex
\begin{align*}
&\int f(x) \, dx = F(x) + C, \quad \text{（牛顿-莱布尼茨公式）} \\
&\int_a^b f(x) \, dx = \int_a^c f(x) \, dx + \int_c^b f(x) \, dx, \quad \text{（可加性）} \\
&\int_a^b f(x) \, dx = -\int_b^a f(x) \, dx, \quad \text{（方向性）} \\
&\int_a^b [kf(x) + g(x)] \, dx = k\int_a^b f(x) \, dx + \int_a^b g(x) \, dx, \quad \text{（线性性）}
\end{align*}
```

## 典型例题

**例11.1** 求极限 $\lim_{h \to 0} \frac{1}{h} \int_0^h f(x) \, dx$，其中函数 $f(x)$ 在 $[-1,1]$ 上连续。

**解**：利用牛顿-莱布尼茨公式，有
$$
\lim_{h \to 0} \frac{1}{h} \int_0^h f(x) \, dx = \lim_{h \to 0} \frac{F(h) - F(0)}{h} = f(0),
$$
其中 $F(x)$ 是 $f(x)$ 的一个原函数。

## 常见错误

1. 忽略定积分的线性性，错误地处理积分中的常数项。
2. 忽略定积分的方向性，错误地处理积分区间的上下限。
3. 忽略定积分的可加性，错误地处理分段函数的积分。
4. 忽略定积分与函数值之间的关系，错误地处理积分不等式。