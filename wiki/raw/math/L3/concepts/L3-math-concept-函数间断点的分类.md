---
id: L3-math-concept-函数间断点的分类
title: 函数间断点的分类
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P064-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P064-concept]]

# 函数间断点的分类

# 函数间断点的分类

## 概念定义

设函数 $f(x)$ 在 $x_0$ 的某去心邻域内有定义，若 $x_0$ 处极限 $\lim\limits_{x \to x_0} f(x)$ 不等于 $f(x_0)$（或 $f(x_0)$ 无定义），则称 $x_0$ 为 $f(x)$ 的**间断点**。

### 间断点的分类

| 类型 | 定义 | 特征 |
|------|------|------|
| **第一类间断点** | 左、右极限均存在 | — |
| └ 可去间断点 | $\lim\limits_{x \to x_0} f(x)$ 存在但不等于 $f(x_0)$ | 极限值"可以补上" |
| └ 跳跃间断点 | $\lim\limits_{x \to x_0^-} f(x) \neq \lim\limits_{x \to x_0^+} f(x)$ | 左、右极限不相等 |
| **第二类间断点** | 左、右极限至少有一个不存在 | — |
| └ 无穷间断点 | $\lim\limits_{x \to x_0} f(x) = \infty$ | 函数值无限大 |
| └ 振荡间断点 | 极限振荡不存在 | 函数在附近无限振荡 |


## 核心公式

### 判断间断点类型的标准

$$\text{间断点 } x_0 \text{ 的类型} \begin{cases} \text{第一类} & \Leftrightarrow \lim\limits_{x \to x_0^-} f(x) \text{ 存在} + \lim\limits_{x \to x_0^+} f(x) \text{ 存在} \\ \quad \text{可去} & \Leftrightarrow \lim\limits_{x \to x_0} f(x) = A \neq f(x_0) \\ \quad \text{跳跃} & \Leftrightarrow \lim\limits_{x \to x_0^-} f(x) \neq \lim\limits_{x \to x_0^+} f(x) \\ \text{第二类} & \Leftrightarrow \text{左、右极限至少一个不存在} \end{cases}$$

### 局部保号性（重要性质）

$$f(x) \to A \ (x \to x_0) \begin{cases} A > 0 \Rightarrow \exists \ \delta > 0, & \text{当 } 0 < |x - x_0| < \delta \text{ 时}, \ f(x) > 0 \\ A < 0 \Rightarrow \exists \ \delta > 0, & \text{当 } 0 < |x - x_0| < \delta \text{ 时}, \ f(x) < 0 \end{cases}$$

**脱帽严格不等，戴帽非严格不等：**

$$\lim f(x) \geqslant 0 \Leftrightarrow f(x) \geqslant 0; \quad \lim f(x) > 0 \Leftrightarrow f(x) > 0$$


## 典型例题

> **例题 1.11** 设 $f(x) = x(x-1)(x-2)$，则 $f(x)$ 的第一类间断点的个数是（ ）
> 
> (A) 3 (B) 2 (C) 1 (D) 0

**解答：**

此函数为多项式函数，在全体实数上连续，无定义点为 $x = 0, 1, 2$ 处的**分子**情况需要讨论。

**分析各点：**

**$x = 0$ 处：**
$$\lim_{x \to 0} \frac{e^x - 1}{x} = 1 \neq \text{某值}$$
由分子、分母关系可知 $x = 0$ 为**第二类间断点**。

**$x = 1$ 处：**
$$\lim_{x \to 1} \frac{x^3 - 1}{x - 1} = \lim_{x \to 1} (x^2 + x + 1) = 3 \neq f(1)$$
且左、右极限相等，故 $x = 1$ 为**第一类（可去）间断点**。

**$x = 2$ 处：**
$$\lim_{x \to 2} \frac{1}{x-2} = \infty$$
故 $x = 2$ 为**第二类（无穷）间断点**。

**结论：** 第一类间断点个数为 **1**，选 **(C)**。


## 常见错误

### ❌ 错误1：混淆第一类与第二类间断点

| 常见误区 | 正确理解 |
|----------|----------|
| 认为"极限不存在"就是第二类 | 需区分：左、右极限**都存在但不相等**为跳跃间断点（第一类），只有至少有一个不存在才是第二类 |
| 忽略可去间断点的"可去"特性 | 可去间断点可通过重新定义 $f(x_0)$ 使其连续 |

### ❌ 错误2：忽略定义域

- 判断间断点前，**必须先确定函数的定义域**
- $x_0$ 首先要是函数的**可能的间断点**（即某去心邻域内有定义）

### ❌ 错误3：极限计算错误

$$\lim_{x \to x_0} f(x) \text{ 是否存在} \Rightarrow \text{必须分别求左右极限并比较}$$

### ❌ 错误4：局部保号性使用不当

$$\lim_{x \to x_0} f(x) = 0 \Rightarrow \text{不能推出 } f(x) > 0 \text{ 或 } f(x) < 0$$


## 关联知识点

| 关联章节 | 内容说明 |
|----------|----------|
| **极限存在准则** | 左右极限存在且相等 $\Leftrightarrow$ 极限存在 |
| **连续与间断的关系** | $x_0$ 处连续 $\Leftrightarrow$ 既无间断点，又是定义域内点 |
| **局部保号性** | 极限值的正负号可推出邻域内函数的正负号 |
| **泰勒展开** | 求复杂函数间断点类型时常用等价无穷小 |
| **洛必达法则** | 用于求 $\frac{0}{0}$、$\frac{\infty}{\infty}$ 型极限 |
| **导数定义** | $f'(x_0) = \lim\limits_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$ |


## 速记口诀

> **间断点分类口诀**
> 
> "极限存在分两边，左等右等第一类；
> 
> 可去跳跃都属于，无穷振荡第二类。"


**元数据**

- **章节：** 2026 张宇高数 18讲(OCR)
- **难度：** ★★☆☆☆
- **标签：** 极限 | 连续性 | 函数性态 | 第一类间断点 | 第二类间断点