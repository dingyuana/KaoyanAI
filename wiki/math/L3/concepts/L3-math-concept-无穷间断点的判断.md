---
id: L3-math-concept-无穷间断点的判断
title: 无穷间断点的判断
subject: math
type: concept
level: 3
tags: ['高等数学']
source_anchors:
  - RAW-math-高数-P142-concept
related: []
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P142-concept]]

# 无穷间断点的判断

# 无穷间断点的判断


## 章节
2026 张宇高数 18讲(OCR)

## 难度
★★☆☆☆


## 概念定义

### 无穷间断点的定义

设函数 $f(x)$ 在 $x_0$ 的去心邻域内有定义，若 $\lim\limits_{x \to x_0} f(x) = \infty$（或 $+\infty$、$-\infty$），则称 $x_0$ 为 $f(x)$ 的**无穷间断点**，属于**第二类间断点**。

### 判断方法

1. **直接法**：计算 $\lim\limits_{x \to x_0} f(x)$，若结果为 $\infty$（包括 $+\infty$、$-\infty$），则为无穷间断点
2. **间接法**：观察函数表达式，当 $x \to x_0$ 时出现 $\frac{1}{0}$ 型（分母趋于零而分子不趋于零）


## 核心公式

### 无穷间断点的判定准则

$$
\text{若 } \lim\limits_{x \to x_0} f(x) = \infty \Longrightarrow x_0 \text{ 为无穷间断点}
$$

### 常见无穷小量等价关系（$x \to 0$）

| 类型 | 等价公式 |
| **三角函数** | $\sin x \sim x,\quad \tan x \sim x,\quad \arcsin x \sim x,\quad \arctan x \sim x$ |
| **指数对数** | $e^x - 1 \sim x,\quad \ln(1+x) \sim x$ |
| **对数变形** | $\ln(x + \sqrt{1+x^2}) \sim x$ |
| **指数差** | $a^x - 1 \sim x\ln a \quad (a > 0, a \neq 1)$ |
| **余弦差** | $1 - \cos x \sim \frac{x^2}{2}$ |
| **幂函数差** | $(1+x)^\alpha - 1 \sim \alpha x \quad (\alpha \neq 0)$ |

### 差函数型无穷小比较（$x \to 0$）

$$
\begin{aligned}
x - \sin x &\sim \frac{x^3}{6} \\
x - \arcsin x &\sim -\frac{x^3}{6} \\
x - \tan x &\sim -\frac{x^3}{3} \\
x - \arctan x &\sim \frac{x^3}{3} \\
x - \ln(1+x) &\sim \frac{x^2}{2} \\
e^x - 1 - x &\sim \frac{x^2}{2}
\end{aligned}
$$

### 复合函数型

设 $f(x) \sim ax^m,\quad g(x) \sim bx^n$，且 $ab \neq 0$，$m, n$ 为正整数，则：

$$
f[g(x)] \sim ab^n x^{mn}
$$


## 典型例题

### 例题

> **判断 $f(x) = \dfrac{x}{x-1}$ 在 $x = 1$ 处的间断点类型**

**解：**

计算极限：

$$
\lim_{x \to 1} \frac{x}{x-1} = \frac{1}{0} \quad \Rightarrow \quad \lim_{x \to 1^+} \frac{x}{x-1} = +\infty, \quad \lim_{x \to 1^-} \frac{x}{x-1} = -\infty
$$

由于左、右极限均为无穷大，故 $x = 1$ 为**第二类（无穷）间断点**。

**答案**：$\boxed{\text{选 (B) 第二类（无穷）间断点}}$


## 常见错误

| 序号 | 错误类型 | 正确理解 |
| 1 | **混淆间断点类型** | 无穷间断点属于第二类间断点，不是第一类（可去、跳跃） |
| 2 | **忽略符号方向** | $+\infty$ 和 $-\infty$ 都是无穷，仍属于无穷间断点 |
| 3 | **分子分母同时为零** | 需用洛必达法则或等价无穷小化简后再判断 |
| 4 | **等价无穷小使用不当** | 仅在乘除法中可替换，加减法中慎用（差函数型有专门公式） |
| 5 | **复合函数阶数错误** | $f[g(x)]$ 的阶数是 $m \times n$，而非 $m + n$ |
| 6 | **忽略前提条件** | 等价公式仅在 $x \to 0$ 时成立，需注意自变量趋向 |


## 关联知识点

- [[函数间断点的分类]]
- [[第一类间断点（可去间断点、跳跃间断点）]]
- [[第二类间断点]]
- [[洛必达法则]]
- [[等价无穷小替换]]
- [[无穷小量的阶的比较]]
- [[泰勒公式]]


## 附注

> 📌 **恒等变形技巧**：差函数型可用恒等变形创造
> - $x - \ln(1+\tan x) = x - \tan x + \tan x - \ln(1+\tan x)$
> - $\sin x + \ln(1-\sin x) = -\frac{1}{2}[\sin x - \ln(1-\sin x)]$


**标签**：#间断点 #无穷小量 #极限 #高数基础