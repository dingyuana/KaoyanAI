---
id: L3-math-concept-导数与微分
title: 导数与微分
subject: math
type: concept
level: 3
tags: [高等数学, 基础概念, 导数, 微分]
related:
  - methods/正向思路.md
  - methods/盯住目标.md
source_anchors:
  - RAW-math-高数-P031-concept
created: 2026-05-09
---

# 导数与微分

## 导数的定义

### 概念

设函数 $y = f(x)$ 在点 $x_0$ 的某邻域内有定义，若极限

$$ \lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x} = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x} $$

存在，则称 $f(x)$ 在点 $x_0$ 处可导，并称此极限值为 $f(x)$ 在 $x_0$ 处的导数，记作：

$$ f'(x_0) = \lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0} $$

### 几何意义

导数 $f'(x_0)$ 表示曲线 $y = f(x)$ 在点 $(x_0, f(x_0))$ 处切线的斜率。

切线方程：$y - f(x_0) = f'(x_0)(x - x_0)$

### 单侧导数

- **左导数**：$f'_-(x_0) = \lim_{x \to x_0^-} \frac{f(x) - f(x_0)}{x - x_0}$
- **右导数**：$f'_+(x_0) = \lim_{x \to x_0^+} \frac{f(x) - f(x_0)}{x - x_0}$

$f(x)$ 在 $x_0$ 处可导 $\Leftrightarrow f'_-(x_0) = f'_+(x_0)$

## 可导与连续的关系

**定理**：若 $f(x)$ 在 $x_0$ 处可导，则 $f(x)$ 在 $x_0$ 处连续。

> **注意**：连续不一定可导（如 $y = |x|$ 在 $x = 0$ 处）。

## 求导法则

### 四则运算

| 法则 | 公式 |
|------|------|
| 加减 | $(u \pm v)' = u' \pm v'$ |
| 乘法 | $(uv)' = u'v + uv'$ |
| 除法 | $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$ |

### 复合函数求导（链式法则）

若 $y = f(u)$，$u = g(x)$，则：

$$ \frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx} $$

### 反函数求导

$$ [f^{-1}(y)]' = \frac{1}{f'(x)} \quad (f'(x) \neq 0) $$

### 隐函数求导

方程 $F(x, y) = 0$ 确定 $y = f(x)$，两边对 $x$ 求导，注意到 $y$ 是 $x$ 的函数。

## 高阶导数

$$ f^{(n)}(x) = \frac{d^n y}{dx^n} $$

### 莱布尼茨公式

$$ (uv)^{(n)} = \sum_{k=0}^{n} C_n^k u^{(k)} v^{(n-k)} $$

## 微分

### 定义

若 $\Delta y = f(x_0 + \Delta x) - f(x_0) = A\Delta x + o(\Delta x)$，则称 $f(x)$ 在 $x_0$ 处可微，并称 $dy = A\Delta x$ 为微分。

### 微分与导数的关系

$$ dy = f'(x_0) dx $$

> 导数是微分之比：$\frac{dy}{dx} = f'(x_0)$

## 关联概念

- **前置知识**：[[数列极限]] [[函数的定义与性质]] — 极限理论的应用
- **后续延伸**：[[积分的概念与计算]] — 求导的逆运算
- **相关方法**：[[正向思路]] — 按求导法则逐步计算
