---
id: L3-math-concept-高等数学-第159讲
title: 高等数学-第159讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P263-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P263-concept]]

# 高等数学-第159讲

**来源：** 高等数学第159讲

```markdown
# 高等数学-第159讲：多元函数积分学

## 核心概念定义
多元函数积分学是研究多元函数在给定区域上的积分方法。它包括对曲面积分、曲面积分的应用等。

## 核心公式
```latex
\int_S \mathrm{d}S = \int_{D_{xy}} \sqrt{1 + \left(\frac{\partial z}{\partial x}\right)^2 + \left(\frac{\partial z}{\partial y}\right)^2} \mathrm{d}x \mathrm{d}y
```

## 典型例题
**例题1**：求曲面 $\Sigma: z = \sqrt{x^2 + y^2}$ 下侧为正时的正向单位法向量。

**解**：因为 $\frac{\partial z}{\partial x} = \frac{x}{\sqrt{x^2 + y^2}}$，$\frac{\partial z}{\partial y} = \frac{y}{\sqrt{x^2 + y^2}}$，且下侧为正，所以其正向单位法向量为 $\left(\frac{x}{\sqrt{x^2 + y^2}}, \frac{y}{\sqrt{x^2 + y^2}}, -1\right)$。

## 常见错误
1. 忘记计算曲面元素 $\mathrm{d}S$。
2. 错误判断曲面的正侧。
3. 错误计算单位法向量。
```