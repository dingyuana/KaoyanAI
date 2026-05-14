---
id: L3-math-concept-函数极限与连续
title: 函数极限与连续
subject: math
type: concept
level: 3
tags: ['高等数学']
source_anchors: ['RAW-math-高数-P057-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P057-concept]]

# 函数极限与连续

# 函数极限与连续

## 元数据

- **章节**：2026 张宇高数 18讲(OCR)
- **难度**：★★☆☆☆
- **知识点**：变上限积分型的无穷小阶数


## 1. 概念定义

**变上限积分型无穷小**：当 $x \to x_0$ 时，若被积函数与某幂函数等价，则变上限积分的阶数等于被积函数阶数加 1。

**核心思想**：积分运算提升无穷小的阶数 1 阶。


## 2. 核心公式

### 类型一：$f(x) \to 0$ 型

当 $x \to 0$ 时，若 $f(x) \sim ax^m$，其中 $a \neq 0$，$m$ 为正整数（或正实数，此时要求 $x \to 0^+$），则：

$$\int_0^x f(t)\,dt \sim \frac{a}{m+1}x^{m+1}$$

**特例**：

$$\int_0^x (e^t - 1)\,dt \sim \frac{1}{2}x^2$$


### 类型二：$f(x) \to A \neq 0$ 型

若 $\lim_{x \to 0} f(x) = A \neq 0$，$\lim_{x \to 0} h(x) = 0$，且 $h(x) \neq 0$，则：

$$\int_0^x f(t)\,dt \sim A \cdot x$$


### 类型三：复合函数型

当 $x \to 0$ 时，若 $f(x) \sim ax^m$，$g(x) \sim bx^n$，$ab \neq 0$，$m, n$ 为正整数，则：

$$\int_0^{g(x)} f(t)\,dt \sim \frac{a \cdot b^{m+1}}{m+1} \cdot x^{n(m+1)}$$


## 3. 典型例题

### 例题

> 当 $x \to 0$ 时，求 $\displaystyle \int_0^{x^2} (e^t - 1)\,dt$ 的等价无穷小。

**解析**：

当 $x \to 0$ 时，$e^t - 1 \sim t$，即 $f(t) \sim t$（此时 $a = 1, m = 1$）。

令 $u = t$，$g(x) = x^2$，则：

$$\int_0^{x^2} (e^t - 1)\,dt \sim \int_0^{x^2} t\,dt = \frac{1}{2}x^4$$

**答案**：$\displaystyle \int_0^{x^2} (e^t - 1)\,dt \sim \frac{1}{2}x^4$


## 4. 常见错误

| 错误类型 | 正确理解 |
|---------|---------|
| 忽略阶数提升 | 积分使阶数增加 1，不是保持不变 |
| 混淆被积变量与积分上限 | $\int_0^x f(t)\,dt$ 中 $x$ 是上限，$t$ 是积分变量 |
| $m$ 为实数时忽略限制 | 当 $m$ 为正实数（非整数）时，必须 $x \to 0^+$ |
| 直接套用公式忽略条件 | 类型二要求 $f(x) \to A \neq 0$，若 $A = 0$ 需用类型一 |


## 5. 关联知识点

1. **等价无穷小替换**：$\displaystyle e^t - 1 \sim t$ 当 $t \to 0$
2. **泰勒展开**：$e^t = 1 + t + \frac{t^2}{2} + o(t^2)$
3. **洛必达法则**：验证分子分母同阶
4. **导数定义**：$\frac{d}{dx}\int_0^x f(t)\,dt = f(x)$


## 附录：常用等价无穷小

$$x \to 0 \text{ 时：}$$
- $e^x - 1 \sim x$
- $\sin x \sim x$
- $\ln(1+x) \sim x$
- $\tan x \sim x$
- $\arcsin x \sim x$
- $\arctan x \sim x$