---
id: L3-math-concept-高等数学-第149讲
title: 高等数学-第149讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P252-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P252-concept]]

# 高等数学-第149讲

**来源：** 高等数学第149讲

```markdown
# 高等数学-第149讲：多元函数积分学

## 核心概念定义
多元函数积分学是高等数学的一个重要分支，主要研究在多维空间中，如何计算函数在区域或曲面上积分。它包括第一型曲面积分和第二型曲面积分。若曲线L关于直线y=x对称，则存在类似的结果。

## 核心公式
```latex
\begin{align*}
\int_L f(x,y) \, ds &= \int_L [f(x,y) + f(v,x)] \, ds \\
\text{重心} (x,y,z) &= \frac{\iiint\limits_{\Sigma} (x,y,z) \, dS}{\iint\limits_{\Sigma} dS} \\
I_x &= \iiint\limits_{\Sigma} (x^2 + y^2 + z^2) \, dS \\
I_y &= \iiint\limits_{\Sigma} (y^2 + z^2 + x^2) \, dS \\
I_z &= \iiint\limits_{\Sigma} (z^2 + x^2 + y^2) \, dS \\
I_O &= \iiint\limits_{\Sigma} (x^2 + y^2 + z^2) \, dS
\end{align*}
```

## 典型例题
**例18.12** 设曲面Σ为空间圆周 $x^2 + y^2 + z^2 = 1$，求 $\iint\limits_{\Sigma} (x^2 + y^2 + z^2) \, dS$。

**解** 由轮换对称性知 $\iint\limits_{\Sigma} x^2 \, dS = \iint\limits_{\Sigma} y^2 \, dS = \iint\limits_{\Sigma} z^2 \, dS$，于是
$$
\iint\limits_{\Sigma} (x^2 + y^2 + z^2) \, dS = \iint\limits_{\Sigma} x^2 \, dS + \iint\limits_{\Sigma} y^2 \, dS + \iint\limits_{\Sigma} z^2 \, dS = 3 \iint\limits_{\Sigma} x^2 \, dS = 3 \iint\limits_{\Sigma} y^2 \, dS = 3 \iint\limits_{\Sigma} z^2 \, dS
$$
$$
= 3 \iint\limits_{\Sigma} (x^2 + y^2 + z^2) \, dS = 3 \cdot \frac{1}{3} \cdot 2\pi \cdot 1 = 2\pi
$$

## 常见错误
1. 忘记将曲面方程代入被积函数中。
2. 忽略曲面的对称性。
3. 计算面积时，没有考虑曲面的形状和方向。
4. 在计算转动惯量时，没有正确使用积分公式。
```