---
id: L3-math-concept-三重积分计算
title: 三重积分计算
subject: math
type: concept
level: 3
tags: ['高等数学']
source_anchors:
  - RAW-math-高数-P040-concept
related: []
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P040-concept]]

# 三重积分计算

# 三重积分计算


## 概念定义

三重积分是多元函数积分的延伸，用于计算三维立体区域上的积分。其物理意义可理解为求空间立体的**质量**（密度函数 $\rho(x,y,z)$ 在区域 $\Omega$ 上的积分）。

**数学定义：**
设 $f(x,y,z)$ 为定义在三维有界闭区域 $\Omega$ 上的有界函数，将 $\Omega$ 任意分割为 $n$ 个小区域 $\Delta v_1, \Delta v_2, \ldots, \Delta v_n$，取近似求和后取极限，若极限存在且唯一，则该极限值为函数 $f(x,y,z)$ 在区域 $\Omega$ 上的三重积分。


## 核心公式

### 1. 直角坐标系下的计算

#### 先积 $z$（最常用）

$$
\iiint_\Omega f(x,y,z)\,dV = \iint_{D_{xy}} \left[ \int_{z_1(x,y)}^{z_2(x,y)} f(x,y,z)\,dz \right] d\sigma_{xy}
$$

其中 $D_{xy}$ 为区域 $\Omega$ 在 $xy$ 平面的投影。

#### 先积 $x$ 或 $y$（投影法）

类似地可按其他顺序展开，核心是将三重积分转化为**一次二重积分 + 一次定积分**。

### 2. 柱面坐标系

令 $\begin{cases} x = r\cos\theta \\ y = r\sin\theta \\ z = z \end{cases}$，则 $dV = r\,dr\,d\theta\,dz$

$$
\iiint_\Omega f(x,y,z)\,dV = \int_{\theta_1}^{\theta_2} \int_{r_1(\theta)}^{r_2(\theta)} \int_{z_1(r,\theta)}^{z_2(r,\theta)} f(r\cos\theta, r\sin\theta, z) \cdot r\,dz\,dr\,d\theta
$$

**适用场景：** 积分区域在 $xy$ 平面的投影为圆、圆环、扇形等，且 $z$ 方向的边界与 $r,\theta$ 相关。

### 3. 球面坐标系

令 $\begin{cases} x = r\sin\varphi\cos\theta \\ y = r\sin\varphi\sin\theta \\ z = r\cos\varphi \end{cases}$，则 $dV = r^2\sin\varphi\,dr\,d\varphi\,d\theta$

$$
\iiint_\Omega f(x,y,z)\,dV = \int_{\theta_1}^{\theta_2} \int_{\varphi_1(\theta)}^{\varphi_2(\theta)} \int_{r_1(\varphi,\theta)}^{r_2(\varphi,\theta)} f(r\sin\varphi\cos\theta, r\sin\varphi\sin\theta, r\cos\varphi) \cdot r^2\sin\varphi\,dr\,d\varphi\,d\theta
$$

**适用场景：** 积分区域为球体、球锥、球冠等与球面相关的区域。


## 典型例题

> **例题：计算三重积分 $\displaystyle \iiint_\Omega z\,dV$，其中 $\Omega$ 为球体 $x^2+y^2+z^2 \leqslant 4$ 在第一卦限的部分。**

**解法一：直角坐标系**

由球面方程 $x^2+y^2+z^2 = 4$，得 $z = \sqrt{4-x^2-y^2}$。

投影区域 $D_{xy}$ 为 $x^2+y^2 \leqslant 4$ 在第一象限的圆域四分之一：

$$
\iint_{D_{xy}} \left[ \int_0^{\sqrt{4-x^2-y^2}} z\,dz \right] d\sigma
= \iint_{D_{xy}} \frac{1}{2}(4-x^2-y^2)\,d\sigma
$$

采用极坐标：$x = r\cos\theta, y = r\sin\theta$，则

$$
= \frac{1}{2} \int_0^{\pi/2} \int_0^2 (4-r^2)\cdot r\,dr\,d\theta
= \frac{1}{2} \cdot \frac{\pi}{2} \cdot \left[ 4\cdot\frac{r^2}{2} - \frac{r^4}{4} \right]_0^2
= \frac{\pi}{4} \cdot (8-4) = \pi
$$

**解法二：球面坐标系**

$\Omega$ 在球面坐标下：$0 \leqslant r \leqslant 2$，$0 \leqslant \varphi \leqslant \frac{\pi}{2}$，$0 \leqslant \theta \leqslant \frac{\pi}{2}$。

被积函数 $z = r\cos\varphi$，体积元 $dV = r^2\sin\varphi\,dr\,d\varphi\,d\theta$：

$$
\iiint_\Omega z\,dV = \int_0^{\pi/2} \int_0^{\pi/2} \int_0^2 r\cos\varphi \cdot r^2\sin\varphi\,dr\,d\varphi\,d\theta
= \int_0^{\pi/2} d\theta \cdot \int_0^{\pi/2} \cos\varphi\sin\varphi\,d\varphi \cdot \int_0^2 r^3\,dr
$$

$$
= \frac{\pi}{2} \cdot \frac{1}{2}\sin^2\varphi\Big|_0^{\pi/2} \cdot \frac{r^4}{4}\Big|_0^2
= \frac{\pi}{2} \cdot \frac{1}{2} \cdot 4 = \pi
$$

**答案：** $\displaystyle \iiint_\Omega z\,dV = \pi$


## 常见错误

| 错误类型 | 具体表现 | 正确做法 |
|---------|---------|---------|
| 坐标系选择不当 | 对球形区域使用直角坐标，增加计算难度 | 根据区域形状选择合适坐标系 |
| 积分限错误 | 球面坐标中 $\varphi$ 范围写错（应从 $z$ 轴开始） | $\varphi$ 是与 $z$ 轴正方向的夹角，$0 \leqslant \varphi \leqslant \pi$ |
| 体积元漏乘 | 球面坐标漏乘 $r^2\sin\varphi$，柱面坐标漏乘 $r$ | 牢记 $dV$ 在不同坐标系下的表达式 |
| 投影区域错误 | 将区域投影到错误平面，或投影区域边界找错 | 仔细分析区域的几何特征 |
| 积分次序选择不当 | 选择导致积分无法计算的次序 | 根据区域形状灵活选择积分次序 |


## 关联知识点

- **二重积分**：三重积分的基础，投影法将三重积分转化为二重积分
- **柱面坐标系与球面坐标系**：三重积分的重要计算工具
- **第一型曲面积分**：与三重积分可相互转化（高斯公式）
- **第二型曲面积分**：涉及通量的计算
- **重积分的几何应用**：求体积、曲面面积等


> **参考章节：** 2026 张宇高数 18讲(OCR)  
> **难度评级：** ★★☆☆☆（基础难度，需熟练掌握三种坐标系的转换）