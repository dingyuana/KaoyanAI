---
id: L3-math-concept-11xx型极限分析
title: 11xx型极限分析
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P025-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P025-concept]]

# 11xx型极限分析

# (1+1/x)^x 型极限分析

## 元数据

- **章节**：2026 张宇高数 18讲(OCR) — 第2讲 数列极限
- **难度**：★★☆☆☆
- **标签**：`数列极限` `重要极限` `e的定义` `单调有界`


## 1. 概念定义

### 基本形式

$(1+\frac{1}{x})^x$ 型极限是高等数学中最重要的极限之一，其标准形式为：

$$\lim_{x \to \infty}\left(1+\frac{1}{x}\right)^x = e$$

其中 $e$ 是自然对数的底数，约等于 $2.71828\cdots$

### 核心思想

当 $x \to \infty$ 时，**底数** $(1+\frac{1}{x}) \to 1$，而**指数** $x \to \infty$，形成 **"1^∞"** 型未定式。

> ⚠️ 关键：底数趋于1的速度与指数趋于无穷的速度需要精确平衡才能得到有意义的极限。

### 推广形式

对于更一般的情况：

$$\lim_{x \to \infty}\left(1+\frac{a}{x}\right)^x = e^a \quad (a \in \mathbb{R})$$


## 2. 核心公式

### 标准极限公式

$$\boxed{\lim_{n \to \infty}\left(1+\frac{1}{n}\right)^n = e}$$

### 指数推广公式

$$\boxed{\lim_{n \to \infty}\left(1+\frac{a}{n}\right)^n = e^a \quad (a \in \mathbb{R})}$$

### 对数变换公式（重要）

$$\lim_{n \to \infty}\left(1+\frac{1}{n}\right)^n = \exp\left(\lim_{n \to \infty} n\ln\left(1+\frac{1}{n}\right)\right) = e$$

### 收敛性判定

| 条件 | 结论 |
| $(1+a_n)^{b_n} \to 1$，且 $a_n \to 0$，$b_n \to \infty$ | 需具体分析 |
| $a_n \to 0^+$，$b_n \to \infty$ | 转化为 $\lim a_n b_n$ 的极限 |

**具体转化**：

$$\lim (1+a_n)^{b_n} = e^{\lim a_n b_n} \quad \text{当 } a_n \to 0 \text{ 且 } a_n b_n \text{ 存在极限时}$$


## 3. 典型例题

### 例题：判断数列极限类型

> 已知数列 $\{a_n\}$ 满足 $a_n > 0$ 且单调增加，判断下列说法正确的是：

**(A)** 若 $(1+a_n)^n \to 1$，则 $a_n \to +\infty$，数列 $\{a_n\}$ **发散**

**(B)** 考察数列 $a_n = \left(1+\frac{1}{n}\right)^n$，当 $n \to \infty$ 时，$a_n \to +\infty$，故 $\{a_n\}$ **发散**

**(C)** 若 $a_n \ln a_n \to 0$，且 $a_n > 0$ 单调增加，则 $a_n \to 1$，数列 $\{a_n\}$ **收敛**

**(D)** 当 $a_n \to 0$ 时，$a_n$ 的极限情况不确定，故 $\{a_n\}$ **可能收敛也可能发散**

### 解答

**分析选项(B)：**

$$a_n = \left(1+\frac{1}{n}\right)^n$$

这是标准的 $e$ 定义式：

$$\lim_{n \to \infty} a_n = \lim_{n \to \infty}\left(1+\frac{1}{n}\right)^n = e \approx 2.71828$$

**结论**：$a_n$ **收敛于 $e$**，选项(B)声称"发散"是**错误**的。

**分析选项(C)：**

已知条件：
- $a_n > 0$
- $a_n$ 单调增加
- $a_n \ln a_n \to 0$

令 $f(x) = x \ln x$，则 $f'(x) = \ln x + 1$。

当 $x \to 0^+$ 时，$x\ln x \to 0$；当 $x \to 1$ 时，$x\ln x \to 0$。

由于 $a_n$ 单调增加且 $a_n > 0$，若 $a_n \to L$，则 $L \in (0, +\infty]$。

若 $L > 1$，则 $a_n \ln a_n \to +\infty$（矛盾）
若 $L = 0$，则 $a_n \ln a_n \to 0$（可能）
若 $L = 1$，则 $a_n \ln a_n \to 0$（可能）

但由于 $a_n$ 单调增加，若 $a_n \to 0$，则 $a_n$ 恒为小正数，单调增加最终必趋于0或某个正常数。

**结论**：$a_n \to 1$，选项(C)正确。

### ✅ 答案

**正确选项**：**(C)**


## 4. 常见错误

### ❌ 错误1：混淆极限类型

> **错误**：认为 $\left(1+\frac{1}{n}\right)^n$ 发散

**原因**：只看到指数 $n \to \infty$，忽略了底数 $\left(1+\frac{1}{n}\right) \to 1$ 的速度恰好使极限收敛。

**正确理解**：这是 **"1^∞"** 型未定式，其极限存在且等于 $e$。


### ❌ 错误2：直接使用极限四则运算

> **错误**：$\lim \left(1+\frac{1}{n}\right)^n = (\lim 1 + \lim \frac{1}{n})^n = 1^n = 1$

**原因**：**指数也是变量**，不能将极限四则运算应用到指数上。

**正确做法**：使用取对数法或夹逼准则。


### ❌ 错误3：忽视单调性条件

> **错误**：从 $a_n \ln a_n \to 0$ 直接推断 $a_n \to 0$ 或 $a_n \to 1$

**原因**：极限 $x\ln x \to 0$ 有两种情况：$x \to 0^+$ 或 $x \to 1$

**正确做法**：需要结合其他条件（如单调性、有界性）综合判断。


### ❌ 错误4：推广公式使用不当

> **错误**：$\lim\left(1+\frac{1}{n}\right)^n = \lim\left(1+\frac{1}{n^2}\right)^{n^2} = e$，所以 $\lim\left(1+\frac{1}{n^2}\right)^n = e$

**原因**：指数不匹配，原公式要求 **指数 = 底数分母的变量**。

**正确做法**：

$$\lim_{n \to \infty}\left(1+\frac{1}{n^2}\right)^n = \lim_{n \to \infty} \exp\left(n \cdot \frac{1}{n^2}\right) = \exp\left(\frac{1}{n}\right) \to 1 \neq e$$


## 5. 关联知识点

### 📚 前置知识

| 知识点 | 关联程度 |
| 数列极限的定义（ε-N语言） | ⭐⭐⭐ |
| 重要极限 $\lim_{x \to 0}\frac{\sin x}{x} = 1$ | ⭐⭐ |
| 无穷小量与无穷大量 | ⭐⭐⭐ |
| 单调有界准则 | ⭐⭐⭐⭐ |

### 📚 后续延伸

| 知识点 | 关联程度 |
| e的定义（级数形式）$e = \sum_{n=0}^{\infty}\frac{1}{n!}$ | ⭐⭐⭐ |
| $e^x$ 的麦克劳林展开 | ⭐⭐ |
| 连续复利与指数增长模型 | ⭐⭐ |
| 欧拉公式 $e^{ix} = \cos x + i\sin x$ | ⭐ |

### 🔗 典型变形汇总

| 类型 | 形式 | 极限 |
| 标准型 | $\left(1+\frac{1}{n}\right)^n$ | $e$ |
| 倒数型 | $\left(1-\frac{1}{n}\right)^n$ | $\frac{1}{e}$ |
| 系数型 | $\left(1+\frac{a}{n}\right)^n$ | $e^a$ |
| 复合型 | $\left(1+\frac{1}{n+1}\right)^n$ | $e^{-1}$ |
| 幂指型 | $\left(1+\frac{1}{n}\right)^{n+1}$ | $e$ |
| 指数嵌套型 | $\left(1+\frac{1}{n}\right)^{n^2}$ | $+\infty$ |


## 📝 知识点总结

> $(1+\frac{1}{x})^x$ 型极限是"1^∞"未定式的标准处理范式，其核心结论 $\lim\left(1+\frac{1}{n}\right)^n = e$ 是高等数学中最重要的极限之一。解题关键是识别极限类型，并通过取对数或夹逼准则转化为可计算的极限形式。