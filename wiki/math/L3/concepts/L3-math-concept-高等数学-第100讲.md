---
id: L3-math-concept-高等数学-第100讲
title: 高等数学-第100讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P199-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P199-concept]]

# 高等数学-第100讲

**来源：** 高等数学第100讲

```markdown
# 高等数学-第100讲：多元函数微分学

## 核心概念定义
多元函数微分学是研究多元函数的导数和微分的方法。它包括偏导数、全微分、方向导数和梯度等概念。

## 核心公式
```latex
\begin{align*}
\frac{\partial f}{\partial x} &= \lim_{\Delta x \to 0} \frac{f(x+\Delta x, y) - f(x, y)}{\Delta x} \\
\frac{\partial f}{\partial y} &= \lim_{\Delta y \to 0} \frac{f(x, y+\Delta y) - f(x, y)}{\Delta y} \\
df &= \frac{\partial f}{\partial x}dx + \frac{\partial f}{\partial y}dy
\end{align*}
```

## 典型例题
**例13.24** 设 \( f(x,y) \) 是一阶偏导数连续的正值函数，满足 \( f(x,y) + f(x,y) = 0 \)，若 \( f(0,y) = \tan y \)，\( f(0,0) = 1 \)，求 \( f(x,y) \)。

**解**：由题意，\( f(x,y) = -f(x,y) \)，即 \( \frac{\partial f}{\partial x} = -\frac{\partial f}{\partial y} \)，两边对 \( x \) 积分，有
\[ \ln[f(x,y)] = -x + \varphi(y) \]
也即 \( f(x,y) = e^{-x}e^{\varphi(y)} \)。

由 \( f(0,0) = 1 \)，有 \( 1 = 1 \cdot e^{\varphi(0)} \)，得 \( \varphi(0) = 0 \)，又 \( f'(0,y) = \frac{\partial f}{\partial y}(0, y) = e^{\varphi(0)} = \tan y \)，两边对 \( y \) 积分，有
\[ e^{\varphi(y)} = -\ln|\cos y| + C \]
令 \( y = 0 \)，有 \( e^{\varphi(0)} = -\ln 1 + C \)，解得 \( C = 1 \)，因此可得 \( e^{\varphi(1)} = 1 - \ln|\cos y| \)。

于是
\[ f(x,y) = e^{-x}(1 - \ln|\cos y|) \]

## 常见错误
1. 忽略偏导数的存在性条件。
2. 错误地应用拉格朗日乘数法。
3. 在求极值时，未考虑偏导数不存在的点。
4. 在求极值时，未正确使用判别法。