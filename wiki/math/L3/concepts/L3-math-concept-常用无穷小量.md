---
id: L3-math-concept-常用无穷小量
title: 常用无穷小量
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors:
  - RAW-math-高数-P119-concept
related: []
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P119-concept]]

# 常用无穷小量

# 常用无穷小量


**元数据**

- **章节**：2026 张宇高数 18讲(OCR) · 第1讲 · 函数极限与连续 · 三向解题法
- **难度**：★★☆☆☆
- **标签**：极限计算 · 等价替换 · 无穷小阶的比较


## 1. 概念定义

当自变量 $x \to x_0$（或 $x \to \infty$）时，若函数 $f(x) \to 0$，则称 $f(x)$ 为**无穷小量**。

> **等价无穷小**：若 $\lim \dfrac{f(x)}{g(x)} = 1$，则称 $f(x)$ 与 $g(x)$ 等价，记作 $f(x) \sim g(x)$。


## 2. 核心公式

### 2.1 常用等价无穷小（$x \to 0$）

| 序号 | 等价关系 |
| 1 | $\sin x \sim x$ |
| 2 | $\tan x \sim x$ |
| 3 | $\arcsin x \sim x$ |
| 4 | $\arctan x \sim x$ |
| 5 | $\ln(1+x) \sim x$ |
| 6 | $e^x - 1 \sim x$ |
| 7 | $a^x - 1 \sim x\ln a \quad (a>0)$ |
| 8 | $(1+x)^\alpha - 1 \sim \alpha x \quad (\alpha \in \mathbb{R})$ |
| 9 | $1 - \cos x \sim \dfrac{x^2}{2}$ |
| 10 | $x - \sin x \sim \dfrac{x^3}{6}$ |
| 11 | $\tan x - x \sim \dfrac{x^3}{3}$ |
| 12 | $\arcsin x - x \sim \dfrac{x^3}{6}$ |
| 13 | $x - \arctan x \sim \dfrac{x^3}{3}$ |

### 2.2 无穷小阶的比较

设 $\alpha(x), \beta(x)$ 均为无穷小量，则：

$$\lim_{x \to x_0} \frac{\alpha(x)}{\beta(x)} = \begin{cases} 0 &\Rightarrow \alpha \text{ 比 } \beta \text{ 高阶} \\ \infty &\Rightarrow \alpha \text{ 比 } \beta \text{ 低阶} \\ c \neq 0 &\Rightarrow \alpha \text{ 与 } \beta \text{ 同阶} \\ 1 &\Rightarrow \alpha \sim \beta \end{cases}$$

### 2.3 无穷小运算性质

- **加减**：高阶无穷小可忽略
- **乘除**：等价无穷小可相互替换
- **复合**：若 $u \to 0$，则 $\sin u \sim u$，$\ln(1+u) \sim u$ 等


## 3. 典型例题

### 例题

**求极限**：

$$\lim_{x \to 0} \frac{\sin x - \tan x}{(e^{x^2} - 1)\ln(1+2x)}$$

**解析**：

**第一步**：识别类型 → $\dfrac{0}{0}$ 型

**第二步**：对分子使用等价替换
$$\sin x - \tan x = \sin x - \frac{\sin x}{\cos x} = \sin x\left(1 - \frac{1}{\cos x}\right) = \sin x \cdot \frac{\cos x - 1}{\cos x}$$

当 $x \to 0$ 时，$\cos x \to 1$，故分母 $\cos x \to 1$，可忽略：
$$\sin x - \tan x \sim \sin x \cdot (\cos x - 1)$$

利用常用结论：
$$\sin x \sim x, \quad \cos x - 1 \sim -\frac{x^2}{2}$$

故：
$$\sin x - \tan x \sim x \cdot \left(-\frac{x^2}{2}\right) = -\frac{x^3}{2}$$

**第三步**：对分母使用等价替换
$$e^{x^2} - 1 \sim x^2, \quad \ln(1+2x) \sim 2x$$

故：
$$(e^{x^2} - 1)\ln(1+2x) \sim x^2 \cdot 2x = 2x^3$$

**第四步**：代入计算
$$\lim_{x \to 0} \frac{-\dfrac{x^3}{2}}{2x^3} = \lim_{x \to 0} \frac{-\dfrac{1}{2}}{2} = -\frac{1}{4}$$

**答案**：$\boxed{-\dfrac{1}{4}}$


## 4. 常见错误

| 序号 | 错误类型 | 错误示例 | 正确做法 |
| 1 | **滥用等价替换** | $x \to \infty$ 时令 $\sin x \sim x$ | 等价替换仅适用于 $x \to 0$ |
| 2 | **加减中乱替换** | $\lim\limits_{x\to0}\frac{\sin x - x}{x^3}$ 中将 $\sin x$ 替换为 $x$ | 分子整体考虑，或使用更高阶展开 |
| 3 | **忽略前提条件** | $\ln(1+x) \sim x$ 在 $x \to \infty$ 时使用 | 必须满足趋近于 0 |
| 4 | **阶数判断错误** | 认为 $1-\cos x \sim x$ | 应为 $1-\cos x \sim \dfrac{x^2}{2}$ |
| 5 | **复合函数替换不当** | $\ln\sin x \sim \ln x$（$x\to0^+$） | 需整体考虑：$\ln\sin x = \ln x + \ln\dfrac{\sin x}{x}$ |


## 5. 关联知识点

| 关联方向 | 知识点 | 说明 |
| **前置基础** | 函数极限的定义 | 理解 $\varepsilon$-$\delta$ 语言 |
| **并列知识** | 常用无穷大量 | 与无穷小量互为倒数关系 |
| **等价变形** | 等价替换原则 | 只能在乘除因子中替换 |
| **高阶工具** | 泰勒公式 | 无穷小量展开的统一框架 |
| **应用场景** | 洛必达法则 | $0/0$、$\infty/\infty$ 型的另一种解法 |
| **综合问题** | 间断点类型判定 | 利用无穷小性质判断极限存在性 |


**参考来源**：2026 张宇高数 18讲 · 第1讲 函数极限与连续 · 三向解题法