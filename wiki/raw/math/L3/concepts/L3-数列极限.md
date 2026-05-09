---
id: L3-math-concept-数列极限
title: 数列极限
subject: math
type: concept
level: 3
tags: [高等数学, 基础概念, 极限]
related:
  - methods/正向思路.md
  - methods/反向思路.md
  - methods/三向解题法详解.md
created: 2026-05-09
---

# 数列极限

## 形式化定义

### 数列

按一定次序排列的无穷多个数：

$$ \{a_n\} = a_1, a_2, a_3, \ldots, a_n, \ldots $$

### 数列极限的 $\varepsilon-N$ 定义

若存在常数 $a$，对于 $\forall \varepsilon > 0$，$\exists N \in \mathbb{N}^+$，当 $n > N$ 时，恒有

$$ |a_n - a| < \varepsilon $$

则称数列 $\{a_n\}$ **收敛**，$a$ 为其极限，记作：

$$ \lim_{n \to \infty} a_n = a $$

> **核心本质**：极限描述的是数列在 $n$ 足够大时的"最终归宿"。

## 收敛数列的性质

### 唯一性

若数列 $\{a_n\}$ 收敛，则其极限唯一。

### 有界性

收敛数列必有界：$\exists M > 0$，使 $|a_n| \leq M$。

### 保号性

若 $\lim_{n \to \infty} a_n = a > 0$，则 $\exists N$，当 $n > N$ 时，$a_n > 0$。

### 四则运算

若 $\lim a_n = a$，$\lim b_n = b$，则：
- $\lim(a_n \pm b_n) = a \pm b$
- $\lim(a_n \cdot b_n) = a \cdot b$
- $\lim\frac{a_n}{b_n} = \frac{a}{b}$（要求 $b \neq 0$）

## 数列极限的判别方法

### 夹逼准则

若 $a_n \leq b_n \leq c_n$，且 $\lim a_n = \lim c_n = a$，则 $\lim b_n = a$。

### 单调有界准则

单调递增有上界的数列必收敛；单调递减有下界的数列必收敛。

### Stolz 定理

设 $\{b_n\}$ 单调递增且 $b_n \to \infty$，则：

$$ \lim_{n \to \infty} \frac{a_n}{b_n} = \lim_{n \to \infty} \frac{a_n - a_{n-1}}{b_n - b_{n-1}} $$

## 常见题型

### $\frac{\infty}{\infty}$ 型

常用方法：分子分母同除最高次幂

$$ \lim_{n \to \infty} \frac{a_0 n^k + \cdots}{b_0 n^m + \cdots} = \begin{cases} 0, & k < m \\ \frac{a_0}{b_0}, & k = m \\ \infty, & k > m \end{cases} $$

### 分子分母有根号

有理化或分子分母同除

### 连乘形式

取对数转化为求和

## 关联概念

- **前置知识**：[[函数]] — 数列是定义在正整数集上的函数
- **后续延伸**：[[函数的定义与性质]] — 函数极限的类比
- **相关方法**：[[正向思路]] — 用已知极限公式逐步推导
