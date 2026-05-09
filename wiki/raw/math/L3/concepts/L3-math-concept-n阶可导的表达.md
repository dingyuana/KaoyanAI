---
id: L3-math-concept-n阶可导的表达
title: n阶可导的表达
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P029-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P029-concept]]

# n阶可导的表达

# n阶可导的表达


## 1. 概念定义

**n阶可导**是指函数 $f(x)$ 在某点 $x_0$ 处不仅一阶导数存在，且二阶、三阶……直至 $n$ 阶导数均存在。

从本质上说，**微分学的核心思想**是将函数增量 $f(x_0+\Delta x) - f(x_0)$ 表示为一个**多项式**与一个**高阶无穷小余项**的和，多项式次数越高，对函数性质的刻画越精确。


## 2. 核心公式

### 2.1 一阶可导（可微）等价表达式

$$f(x_0 + \Delta x) - f(x_0) = f'(x_0)\Delta x + o(\Delta x), \quad \Delta x \to 0$$

> 这表明：可导 ⟺ 可微，二者等价。

### 2.2 n阶可导的泰勒表达式

$$f(x_0 + \Delta x) - f(x_0) = f'(x_0)\Delta x + \frac{f''(x_0)}{2!}(\Delta x)^2 + \cdots + \frac{f^{(n)}(x_0)}{n!}(\Delta x)^n + o((\Delta x)^n), \quad \Delta x \to 0$$

### 2.3 各阶可导的完整表达体系

| 阶数 | 增量表达式 | 余项阶数 |
| **0阶（连续）** | $f(x_0+\Delta x)-f(x_0) = o(1)$ | $\Delta x \to 0$ |
| **1阶（可导）** | $f(x_0+\Delta x)-f(x_0) = f'(x_0)\Delta x + o(\Delta x)$ | $\Delta x \to 0$ |
| **2阶** | $= f'(x_0)\Delta x + \frac{f''(x_0)}{2!}(\Delta x)^2 + o((\Delta x)^2)$ | $(\Delta x)^2 \to 0$ |
| **n阶** | $= \sum_{k=1}^{n} \frac{f^{(k)}(x_0)}{k!}(\Delta x)^k + o((\Delta x)^n)$ | $(\Delta x)^n \to 0$ |


## 3. 典型例题

> **例题** 设函数 $f(x)$ 在区间 $(-1,1)$ 内有定义，且在 $x=0$ 处连续。判断下列命题的正确性：
>
> (1) 若 $\lim\limits_{x \to 0} \frac{f(x) - f(0)}{x} = 0$，则 $f(x)$ 在 $x=0$ 处可导；
>
> (2) 若 $\lim\limits_{x \to 0} \frac{f(x) - f(0)}{x^2} = 0$，则 $f(x)$ 在 $x=0$ 处可导；
>
> (3) 若 $f(x)$ 在 $x=0$ 处可导，则 $\lim\limits_{x \to 0} \frac{f(x) - f(0) - f'(0)x}{x} = 0$。

**解答：**

**(1) 正确。**

$$\lim_{x \to 0} \frac{f(x) - f(0)}{x} = 0 \quad \Rightarrow \quad \lim_{x \to 0} \frac{f(x) - f(0)}{x} = f'(0) = 0$$

由可导的 $\varepsilon$ 定义知，$f(x)$ 在 $x=0$ 处**可导**（导数为 0）。

**(2) 错误。**

$$\lim_{x \to 0} \frac{f(x) - f(0)}{x^2} = 0$$

这只能说明 $f(x) - f(0) = o(x^2)$，即 $f(x) - f(0) = o(x)$，只能推出 $f(x)$ 在 $x=0$ 处**连续**，不能推出**可导**。

**(3) 正确。**

由可导的泰勒表达式（一阶展开）：
$$f(x) = f(0) + f'(0)x + o(x), \quad x \to 0$$

因此：
$$\frac{f(x) - f(0) - f'(0)x}{x} = \frac{o(x)}{x} \to 0, \quad x \to 0$$


## 4. 常见错误

### ❌ 错误1：混淆可导与可微的表述

**错误认为**：一点处可导和可微是不同概念。

**正确理解**：对于一元函数，**可导 ⟺ 可微**，二者完全等价。


### ❌ 错误2：忽略余项的阶数

**错误写法**：
$$f(x_0 + \Delta x) - f(x_0) = f'(x_0)\Delta x + \frac{f''(x_0)}{2!}(\Delta x)^2 + o(\Delta x)$$

**问题**：当 $f''(x_0)$ 存在时，余项应为 $o((\Delta x)^2)$，而非 $o(\Delta x)$。


### ❌ 错误3：将导数的极限形式写错

**错误写法**：
$$f'(x_0) = \lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0} \quad \text{（正确）}$$
$$f'(x_0) = \lim_{x \to 0} \frac{f(x_0 + x) - f(x_0)}{x^2} \quad \text{（错误）}$$

**正确理解**：分母必须是**一次**自变量增量 $x - x_0$，不能是二次。


### ❌ 错误4：误用高阶条件推低阶结论

**错误推理**：
$$\lim_{x \to 0} \frac{f(x) - f(0)}{x^2} = 0 \Rightarrow f'(0) = 0 \Rightarrow f \text{ 可导}$$

**正确理解**：$o(x^2)$ 只保证连续，不能保证可导；可导需要 $o(x)$。


## 5. 关联知识点

| 知识点 | 关联说明 |
| **泰勒公式** | n阶可导是泰勒公式展开的前提条件 |
| **微分定义** | $dy = f'(x_0)dx$ 是可导（可微）的几何含义 |
| **导数定义** | $\displaystyle f'(x_0) = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$ |
| **连续与可导的关系** | 可导 ⟹ 连续，但连续 ⟹̸ 可导 |
| **高阶无穷小** | $o((\Delta x)^n)$ 的运算规则 |


> **章节**：2026 张宇高数 18讲 (OCR)  
> **难度**：★★☆☆☆