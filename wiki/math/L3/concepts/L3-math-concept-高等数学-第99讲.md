---
id: L3-math-concept-高等数学-第99讲
title: 高等数学-第99讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P360-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P360-concept]]

# 高等数学-第99讲

**来源：** 高等数学第99讲

```markdown
# 高等数学-第99讲：多元函数微分学

## 核心概念定义
多元函数微分学是研究多元函数的导数和微分的方法，主要涉及偏导数、全微分、方向导数和梯度等概念。

## 核心公式
```latex
\frac{\partial z}{\partial x} = \frac{\partial z}{\partial u} \frac{\partial u}{\partial x} + \frac{\partial z}{\partial v} \frac{\partial v}{\partial x}
\frac{\partial z}{\partial y} = \frac{\partial z}{\partial u} \frac{\partial u}{\partial y} + \frac{\partial z}{\partial v} \frac{\partial v}{\partial y}
\frac{\partial^2 z}{\partial x^2} = \frac{\partial}{\partial x} \left( \frac{\partial z}{\partial x} \right)
\frac{\partial^2 z}{\partial y^2} = \frac{\partial}{\partial y} \left( \frac{\partial z}{\partial y} \right)
\frac{\partial^2 z}{\partial x \partial y} = \frac{\partial}{\partial y} \left( \frac{\partial z}{\partial x} \right)
```

## 典型例题
**例13.22** 设 \( z = z(x,y) \) 有二阶连续偏导数，用变换 \( u = x - 2y, v = x + ay \) 可把方程 \( \frac{\partial^2 z}{\partial x^2} + \frac{\partial^2 z}{\partial y^2} = 0 \) 化简为 \( u^2 = 0 \)，求常数 \( a \)。

**解**：由复合函数求导法得：
\[
\frac{\partial z}{\partial x} = \frac{\partial z}{\partial u} \frac{\partial u}{\partial x} + \frac{\partial z}{\partial v} \frac{\partial v}{\partial x}
\]
\[
\frac{\partial z}{\partial y} = \frac{\partial z}{\partial u} \frac{\partial u}{\partial y} + \frac{\partial z}{\partial v} \frac{\partial v}{\partial y}
\]
\[
\frac{\partial^2 z}{\partial x^2} = \frac{\partial}{\partial x} \left( \frac{\partial z}{\partial x} \right)
\]
\[
\frac{\partial^2 z}{\partial y^2} = \frac{\partial}{\partial y} \left( \frac{\partial z}{\partial y} \right)
\]
\[
\frac{\partial^2 z}{\partial x \partial y} = \frac{\partial}{\partial y} \left( \frac{\partial z}{\partial x} \right)
\]
代入方程得 \( (10 + 5a) \frac{\partial^2 z}{\partial u^2} + (6 + a - a^3) \frac{\partial^2 z}{\partial v^2} = 0 \)。当 \( 10 + 5a = 0 \) 即 \( a = -2 \) 时，\( a^2 = 4 \)。

## 常见错误
1. 忽略偏导数的连续性条件。
2. 错误地使用偏导数的定义。
3. 在计算偏导数时，错误地应用乘积规则或链式法则。