---
id: L3-math-concept-极限保号性定理的证明
title: 极限保号性定理的证明
subject: math
type: concept
level: 3
tags: ['基础概念', '高等数学']
source_anchors:
  - RAW-math-高数-P148-concept
related: []
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P148-concept]]

# 极限保号性定理的证明

# 极限保号性定理

## 基本信息

| 属性 | 内容 |
|------|------|
| 章节 | 2026 张宇高数 18讲 - 第1讲 函数极限与连续 |
| 难度 | ★★☆☆☆ |


## 1. 概念定义

**极限保号性定理** 是描述函数极限值与函数本身符号之间关系的定理，包含两个方向：

- **正向保号**：极限为正 $\Rightarrow$ 函数在邻域内为正
- **逆向保号**：函数非负 $\Rightarrow$ 极限非负


## 2. 核心公式

### 定理内容

**(1) 正向保号性**

若 $\lim\limits_{x \to x_0} f(x) = A$，且 $A > 0$，则存在 $\delta > 0$，使得当 $0 < |x - x_0| < \delta$ 时，有 $f(x) > 0$。

**(2) 逆向保号性**

若 $\lim\limits_{x \to x_0} f(x) = A$，且存在 $x_0$ 的某去心邻域使得 $f(x) \geqslant 0$，则 $A \geqslant 0$。

### 证明框架

**(1) 的证明：**

由极限定义，取 $\varepsilon = \dfrac{A}{2} > 0$，存在 $\delta > 0$，使得：
$$|f(x) - A| < \frac{A}{2}$$

从而：
$$f(x) > A - \frac{A}{2} = \frac{A}{2} > 0 \quad \blacksquare$$

**(2) 的证明（反证法，仅证 $A \geqslant 0$ 的情况）：**

假设 $A < 0$，则由 (1) 可知，在 $x_0$ 的某去心邻域中有 $f(x) < 0$。

这与已知条件 $f(x) \geqslant 0$ 矛盾，故假设不成立，即 $A \geqslant 0$。$\blacksquare$


## 3. 典型例题

### 例题 1.13（数列保号性）

> 设 $f(x)$ **单调减少**，且 $\lim\limits_{x \to +\infty} f(x) = 0$，证明 $f(x) \geqslant 0$。

**证明：**

由 $f(x)$ 单调减少，知对任意 $t > 0$，有 $f(x) \geqslant f(x + t)$。

取 $u = x + t$，则 $u > x$，令 $t \to 0^+$，即 $u \to x^+$，有：
$$f(x) = \lim_{t \to 0^+} f(x) \geqslant \lim_{t \to 0^+} f(x + t) = \lim_{u \to x^+} f(u) = 0$$

故 $f(x) \geqslant 0$。$\blacksquare$

**推论：** 同理，设数列 $\{x_n\}$ 单调减少，$\lim\limits_{n \to \infty} x_n = 0$，则 $x_n \geqslant 0$。


### 例题 1.14（最小距离函数）

> 设 $x \geqslant 0$，记 $x$ 到 $2k$（$k = 0, 1, 2, \ldots$）的最小距离为 $f(x)$。
> 
> (1) 证明 $f(x)$ 以 2 为周期，写出 $[0, 2]$ 上的表达式并画出图像；
> 
> (2) 求 $\displaystyle \int_{0}^{7} f(x) \, dx$。

**分析思路（文字表述 $\xrightarrow{\text{翻译}}$ 数学表述）：**

$$f(x) = \min\{|x - 2k|\}, \quad k = 0, 1, 2, \ldots$$

即 $f(x)$ 表示 $x$ 到 $\{0, 2, 4, 6, \ldots\}$ 的最小距离。

**解答：**

**(1)** 先理解表达式含义。在 $[0, 2]$ 上：
- 若 $0 \leqslant x \leqslant 1$：距离 0 更近，$f(x) = x$
- 若 $1 \leqslant x \leqslant 2$：距离 2 更近，$f(x) = 2 - x$

周期性证明：
$$f(x + 2) = \min\{|(x + 2) - 2k|\} = \min\{|x - 2(k-1)|\} = f(x), \quad k = 1, 2, \ldots$$

故 $f(x)$ 以 2 为周期。

**$[0, 2]$ 上表达式：**
$$f(x) = \begin{cases} x, & 0 \leqslant x \leqslant 1 \\ 2 - x, & 1 < x \leqslant 2 \end{cases}$$

**图像：**（呈"V"字形，周期延拓）

**(2)** 由周期性：
$$\int_{0}^{7} f(x) \, dx = 3 \cdot \int_{0}^{2} f(x) \, dx + \int_{0}^{1} f(x) \, dx$$

其中 $\displaystyle \int_{0}^{2} f(x) \, dx = \int_{0}^{1} x \, dx + \int_{1}^{2} (2-x) \, dx = \frac{1}{2} + \frac{1}{2} = 1$

故 $\displaystyle \int_{0}^{7} f(x) \, dx = 3 \times 1 + \frac{1}{2} = \frac{7}{2}$。$\blacksquare$


## 4. 常见错误

| 序号 | 错误类型 | 正确理解 |
|------|----------|----------|
| 1 | **混淆充分性与必要性** | 保号性定理是单向的：$A > 0 \Rightarrow f(x) > 0$，但反过来不一定成立 |
| 2 | **忽略"去心邻域"条件** | 极限只与 $x_0$ 附近的点有关，不要求 $f(x_0)$ 有定义 |
| 3 | **取 $\varepsilon$ 错误** | 应取 $\varepsilon = \dfrac{A}{2}$（或任意小于 $A$ 的正数），而非 $A$ 本身 |
| 4 | **符号遗漏** | 逆向保号性需 $f(x) \geqslant 0$（非严格不等号），极限 $A$ 才能保证 $\geqslant 0$ |
| 5 | **例 1.14 中周期计算** | $f(x+2)$ 时需调整下标：$\|(x+2)-2k\| = \|x-2(k-1)\|$，不能写成 $\|x-2k\|$ |


## 5. 关联知识点

| 序号 | 知识点 | 关联说明 |
|------|--------|----------|
| 1 | **极限定义（$\varepsilon$-$\delta$ 语言）** | 保号性定理是极限定义的自然推论 |
| 2 | **夹逼准则** | 与保号性同为求极限的重要工具 |
| 3 | **单调有界准则** | 例 1.13 的核心工具：单调 $\Rightarrow$ 极限存在 |
| 4 | **函数的周期性** | 例 1.14 涉及的周期函数性质 |
| 5 | **定积分的几何意义** | 例 1.14(2)：$f(x)$ 图像与 $x$ 轴围成面积 |


## 参考文献

- 张宇，《2026 考研数学高等数学 18 讲》，第 1 讲：函数极限与连续