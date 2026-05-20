---
id: L3-math-concept-积分的概念与计算
title: 积分的概念与计算
subject: math
type: concept
level: 3
tags: [高等数学, 基础概念, 积分]
related:
  - methods/正向思路.md
  - methods/盯住目标.md
source_anchors:
  - RAW-math-高数-积分
created: 2026-05-09
---

# 积分的概念与计算

## 不定积分

### 定义

若 $F'(x) = f(x)$，则称 $F(x)$ 为 $f(x)$ 的一个原函数。

$f(x)$ 的全体原函数称为不定积分：

$$ \int f(x)  dx = F(x) + C $$

### 基本积分公式

| 积分 | 结果 |
|------|------|
| $\int x^a dx$ | $\frac{x^{a+1}}{a+1} + C$ |
| $\int \frac{dx}{x}$ | $\ln|x| + C$ |
| $\int e^x dx$ | $e^x + C$ |
| $\int a^x dx$ | $\frac{a^x}{\ln a} + C$ |
| $\int \sin x dx$ | $-\cos x + C$ |
| $\int \cos x dx$ | $\sin x + C$ |

### 换元积分法

#### 第一类换元法（凑微分）

$$ \int f(\varphi(x)) \varphi'(x) dx = \int f(u) du $$

#### 第二类换元法

$$ \int f(x) dx = \int f(\varphi(t)) \varphi'(t) dt $$

常用代换：三角代换、倒代换、根式代换。

### 分部积分法

$$ \int u dv = uv - \int v du $$

适用场景：被积函数为幂函数×指数函数、幂函数×三角函数、对数函数×幂函数等。

## 定积分

### 定义（黎曼和）

$$ \int_a^b f(x) dx = \lim_{\lambda \to 0} \sum_{i=1}^{n} f(\xi_i) \Delta x_i $$

### 几何意义

- $f(x) \geq 0$：曲边梯形的面积
- $f(x) \leq 0$：面积的相反数

### Newton-Leibniz公式

若 $F(x)$ 是 $f(x)$ 的原函数，则：

$$ \int_a^b f(x) dx = F(b) - F(a) $$

## 定积分的计算

### 换元积分法

$$ \int_a^b f(x) dx = \int_{\alpha}^{\beta} f(\varphi(t)) \varphi'(t) dt $$

**注意**：换元必换限。

### 分部积分法

$$ \int_a^b u dv = uv|_a^b - \int_a^b v du $$

## 广义积分

### 无穷限广义积分

$$ \int_a^{+\infty} f(x) dx = \lim_{b \to +\infty} \int_a^b f(x) dx $$

### 无界函数广义积分

$$ \int_a^b f(x) dx = \lim_{\varepsilon \to 0^+} \int_{a+\varepsilon}^{b} f(x) dx $$

## 关联概念

- **前置知识**：[[导数与微分]] — 积分是求导的逆运算
- **后续延伸**：[[微分方程]] — 积分在微分方程中的应用
- **相关方法**：[[正向思路]] — 按积分法则逐步计算
