---
id: L3-math-concept-升幂降幂技巧
title: 升幂降幂技巧
subject: math
type: concept
level: 3
tags: ['解题方法']
source_anchors: ['RAW-math-高数-P072-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P072-concept]]

# 升幂降幂技巧

# 升幂降幂技巧

## 概念定义

**升幂降幂技巧**是微分学证明中常用的化简技巧，通过将函数 $f(x)$ 的导数形式与积分形式相互转化，使表达式回归到经典形式（如 $[F(x)]' = 0$），从而便于应用中值定理。

- **降幂**：将 $f(x)$ 改写为 $f'(x)$ 的形式
- **升幂**：将 $f(x)$ 改写为 $\int_a^x f(t)\,dt$ 的形式


## 核心公式

### 1. 降幂公式

$$f(x) \cdot e^{x} = \left[f'(x) \cdot e^{x}\right] - f'(x) \cdot e^{x} + f(x) \cdot e^{x} = \left[f'(x) + f(x)\right] \cdot e^{x}$$

更一般地：

$$\left[f'(x) \cdot e^{x}\right]' = \left[f''(x) + f'(x)\right] \cdot e^{x}$$

### 2. 升幂公式

对于积分形式的构造函数：

$$\frac{d}{dx}\left[f(x) \cdot \int_a^x g(t)\,dt\right] = f'(x) \int_a^x g(t)\,dt + f(x) \cdot g(x)$$

### 3. 构造辅助函数

| 目标形式 | 构造方法 |
|---------|---------|
| $[f'(x) - x]' = 0$ | $F(x) = f'(x) - x$ |
| $[f(x) - x^2]' = 0$ | $F(x) = f(x) - x^2$ |
| $[f'(x) \cdot g(x) - f(x) \cdot g'(x)]' = 0$ | $F(x) = f(x) \cdot g(b) - g(x) \cdot f(a)$ |


## 典型例题

**例题**（双向思路）

已知函数 $f(x)$ 和 $g(x)$ 在 $[a,b]$ 上连续，在 $(a,b)$ 内可导，且 $g'(x) \neq 0$，证明：存在 $\xi \in (a,b)$，使得

$$\frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(\xi)}{g'(\xi)}$$

**证明**：

将目标式化为等价形式：

$$\left[f(b) - f(\xi)\right] \cdot g(\xi) - \left[g(b) - g(\xi)\right] \cdot f(\xi) = 0$$

令辅助函数：

$$F(x) = \left[f(x) - f(a)\right] \cdot \left[g(b) - g(x)\right]$$

验证：

$$F(a) = 0, \quad F(b) = 0$$

由 Rolle 定理，存在 $\xi \in (a,b)$，使得 $F'(\xi) = 0$：

$$F'(\xi) = f'(\xi)\left[g(b) - g(\xi)\right] - g'(\xi)\left[f(\xi) - f(a)\right] = 0$$

整理得：

$$\frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(\xi)}{g'(\xi)}$$

$\blacksquare$


## 常见错误

1. **构造错误**：构造的辅助函数必须同时满足端点值相等（$F(a) = F(b)$），否则无法使用 Rolle 定理

2. **方向判断失误**：
   - $P_1$（反向思路）：从待证结论出发逆向构造
   - $P_2$（双向思路）：从条件和结论双向出发寻找联系
   - 应先判断题目属于哪种思路，再选择构造方法

3. **忽略条件**：$g'(x) \neq 0$ 保证 $g(b) \neq g(a)$，分母不为零

4. **升幂/降幂选择不当**：不是所有题目都需要升幂降幂，常规方法能解决时不必强行使用


## 关联知识点

| 知识点 | 说明 |
|-------|------|
| **Rolle 定理** | 升幂降幂技巧构造的函数最终服务于 Rolle 定理 |
| **拉格朗日中值定理** | Cauchy 中值定理的特殊情形 |
| **Cauchy 中值定理** | 本技巧的核心应用场景 |
| **导数的四则运算** | $[f(x)g(x)]' = f'(x)g(x) + f(x)g'(x)$ |
| **积分基本定理** | $F(x) = \int_a^x f(t)\,dt \Rightarrow F'(x) = f(x)$ |


## 记忆口诀

> **升幂降幂莫慌张，反向移项回归零**
> **构造辅助验端点，Rolle 定理解证明**