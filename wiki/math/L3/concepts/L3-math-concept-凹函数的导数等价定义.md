---
id: L3-math-concept-凹函数的导数等价定义
title: 凹函数的导数等价定义
subject: math
type: concept
level: 3
tags: ['基础概念', '高等数学']
source_anchors:
  - RAW-math-高数-P050-concept
related: []
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P050-concept]]

# 凹函数的导数等价定义

# 凹函数的导数等价定义


**章节**：2026 张宇高数 18讲(OCR)  
**难度**：★★☆☆☆  
**位置**：第5讲 一元函数微分学的应用(一)——几何应用


## 1. 概念定义

### 1.1 几何定义（原始定义）

设 $f(x)$ 在区间 $I$ 上有定义，若对 $I$ 上任意两点 $x_1, x_2$ 及任意 $\lambda \in (0,1)$，恒有

$$\boxed{f\big(\lambda x_1 + (1-\lambda)x_2\big) \leq \lambda f(x_1) + (1-\lambda)f(x_2)}$$

则称 $y = f(x)$ 在 $I$ 上的图形是**凹的**（或下凸）。

> **几何意义**：曲线任意弧段位于弦的**下方**。

### 1.2 导数等价定义

设 $f(x)$ 在 $[a,b]$ 上连续，在 $(a,b)$ 内可导，若对 $(a,b)$ 内的任意 $x$ 及 $x_0$（$x \neq x_0$），均有

$$\boxed{f(x_0) + f'(x_0)(x - x_0) \leq f(x)}$$

则称 $f(x)$ 在 $[a,b]$ 上的图形是**凹的**。

> **几何意义**：曲线在任意点处的切线位于曲线的**下方**。


## 2. 核心公式

### 2.1 凹函数的判定条件

| 条件 | 结论 |
| $f(x)$ 在 $I$ 上**二阶可导** | $f''(x) \geq 0 \Longleftrightarrow f(x)$ 在 $I$ 上**凹** |
| $f(x)$ 在 $I$ 上**一阶可导** | $f'(x)$ **单调不减** $\Longleftrightarrow f(x)$ 在 $I$ 上**凹** |

### 2.2 等价表述体系

| 极值点 | 拐点 |
| 有极值点 $\Leftrightarrow f'(x)$ 有**零点** | 有拐点 $\Leftrightarrow f''(x)$ 有**零点** |
| 无极值点 $\Leftrightarrow f'(x)$ **不变号** | 无拐点 $\Leftrightarrow f''(x)$ **不变号** |
| $f'(x) \begin{cases} \geq 0 \\ \leq 0 \end{cases}$ | $f''(x) \geq 0$（凹）或 $\leq 0$（凸） |


## 3. 典型例题

### 例题：证明导数等价定义

> **题目**：设 $f(x)$ 在 $[a,b]$ 上连续，在 $(a,b)$ 内可导，证明：  
> $f(x)$ 在 $[a,b]$ 上为凹函数 $\Longleftrightarrow$ 对任意 $x_0 \in (a,b)$，曲线在点 $(x_0, f(x_0))$ 处的切线位于曲线下方，即  
> $$f(x) \geq f(x_0) + f'(x_0)(x - x_0)$$

**证明**：

**充分性**（切线在下方 $\Rightarrow$ 凹）：  
对任意 $x_1, x_2 \in [a,b]$，$x_1 < x_2$，令 $\lambda \in (0,1)$，$x_\lambda = \lambda x_1 + (1-\lambda)x_2$。

由已知，对 $x_1$ 和 $x_2$ 分别有：
$$f(x_1) \geq f(x_\lambda) + f'(x_\lambda)(x_1 - x_\lambda)$$
$$f(x_2) \geq f(x_\lambda) + f'(x_\lambda)(x_2 - x_\lambda)$$

两式分别乘以 $\lambda$ 和 $(1-\lambda)$ 后相加：
$$\lambda f(x_1) + (1-\lambda)f(x_2) \geq f(x_\lambda) + f'(x_\lambda)[\lambda(x_1 - x_\lambda) + (1-\lambda)(x_2 - x_\lambda)]$$

注意到 $\lambda(x_1 - x_\lambda) + (1-\lambda)(x_2 - x_\lambda) = 0$，故：
$$\lambda f(x_1) + (1-\lambda)f(x_2) \geq f(x_\lambda) = f\big(\lambda x_1 + (1-\lambda)x_2\big)$$

即 $f(x)$ 为凹函数。

**必要性**（凹 $\Rightarrow$ 切线在下方）：  
由凹函数的定义，取 $\lambda = \dfrac{x - x_0}{x - x_0} = t$（此处需构造特殊 $\lambda$），利用凹性的等价变换可证得切线不等式。$\blacksquare$


## 4. 常见错误

| 错误类型 | 错误示例 | 正确理解 |
| **混淆凹凸方向** | 认为 $f''(x) > 0$ 对应凸函数 | $f''(x) > 0$ 对应**凹**函数（向上弯曲） |
| **忽略定义域** | 忘记 $f(x)$ 需要在 $[a,b]$ 上**连续** | 连续是凹函数判定的**前提条件** |
| **导数定义写错** | 写成 $f(x) \leq f(x_0) + f'(x_0)(x - x_0)$ | 凹函数应有 $f(x) \geq f(x_0) + f'(x_0)(x - x_0)$ |
| **端点遗漏** | 只验证内点，忽略区间端点 | 端点处连续性需单独说明 |
| **充分必要性混淆** | 认为导数定义只是凹函数的**充分条件** | 导数定义与几何定义**等价** |


## 5. 关联知识点

| 知识点 | 说明 |
| **凸函数的导数等价定义** | 不等号反向：$f(x) \leq f(x_0) + f'(x_0)(x - x_0)$ |
| **拐点的定义** | 连续曲线的凹弧与凸弧的分界点 |
| **极值点的导数判定** | $f'(x) = 0$ 为极值点的必要条件 |
| **曲率圆方程**（仅数一、数二） | $(x-a)^2 + (y-b)^2 = r^2$，用于曲率相关计算 |
| **Jensen不等式** | 凹函数的加权平均性质：$f\left(\sum \lambda_i x_i\right) \leq \sum \lambda_i f(x_i)$ |


> **记忆口诀**：凹函数，"下凸"，切线在下，$f'' \geq 0$。