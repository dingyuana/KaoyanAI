---
id: L3-math-concept-高等数学-第144讲
title: 高等数学-第144讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P247-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P247-concept]]

# 高等数学-第144讲

**来源：** 高等数学第144讲

```markdown
# 高等数学-第144讲

## 核心概念定义
多元函数积分学是高等数学中研究多元函数积分的一门学科，主要包括三重积分的直角坐标系、柱面坐标系和球面坐标系积分法。

## 核心公式
### 直角坐标系
\[ \iiint_{\Omega} f(x,y,z) \, dv = \int_{x_1}^{x_2} \int_{y_1}^{y_2} \int_{z_1}^{z_2} f(x,y,z) \, dz \, dy \, dx \]

### 柱面坐标系
\[ \iiint_{\Omega} f(r, \theta, z) \, dv = \int_{\theta_1}^{\theta_2} \int_{r_1}^{r_2} \int_{z_1}^{z_2} f(r, \theta, z) r \, dz \, dr \, d\theta \]

### 球面坐标系
\[ \iiint_{\Omega} f(r, \theta, \phi) \, dv = \int_{\phi_1}^{\phi_2} \int_{\theta_1}^{\theta_2} \int_{r_1}^{r_2} f(r, \theta, \phi) r^2 \sin \phi \, dr \, d\theta \, d\phi \]

## 典型例题
设有界闭区域Ω由曲线 \(x^2 + y^2 = 2z\) 绕z轴旋转而成的曲面与平面z=4围成，计算三重积分 \( \iiint_{\Omega} (x^2 + y^2 + 2) \, dv \)。

## 常见错误
1. 忘记将直角坐标系下的积分转化为柱面坐标系或球面坐标系。
2. 在柱面坐标系或球面坐标系下，忘记乘以相应的雅可比行列式。
3. 在计算过程中，忘记考虑积分区域的边界条件。
```