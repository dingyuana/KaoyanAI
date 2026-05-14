---
id: L3-math-concept-概率论与数理统计-第45讲
title: 概率论与数理统计-第45讲
subject: math
type: concept
level: 3
tags: ['概率论与数理统计']
source_anchors: ['RAW-math-概率论-P068-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P068-concept]]

# 概率论与数理统计-第45讲

**来源：** 概率论与数理统计第45讲

```markdown
# 概率论与数理统计-第45讲

## 核心概念定义

t分布：设随机变量X~N(0,1),Y~χ²(n),X与Y相互独立，则随机变量t=XY/n服从自由度为n的t分布。

F分布：设随机变量X~χ²(n),Y~χ²(n²),且X与Y相互独立，则随机变量F=X/n²服从自由度为(n,n²)的F分布。

## 核心公式

LaTeX格式：

```latex
t = \frac{XY}{n}
F = \frac{X}{n^2}
```

## 典型例题

例8.4：设随机变量X~t(n),Y~F(1,n),给定α(0<a<0.5),常数c满足P{X>c}=α,则P{Y>c²}=( )

(A)α (B)1-α (C)2a (D)1-2a

解：由X~t(n),可得X²~F(1,n),从而P{Y>c²}=P{X²>c²}=P{X>c}+P{X<-c}=2a,故正确选项为(C)。

## 常见错误

1. 将t分布与正态分布混淆。
2. 将F分布与卡方分布混淆。
3. 在计算概率时，未考虑随机变量的独立性。
