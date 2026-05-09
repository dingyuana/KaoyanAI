---
id: L3-math-concept-高等数学-第35讲
title: 高等数学-第35讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P290-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P290-concept]]

# 高等数学-第35讲

**来源：** 高等数学第35讲

```markdown
# 高等数学-第35讲：一元函数微分学的计算

## 核心概念定义
一元函数微分学的计算主要研究一元函数的导数及其高阶导数的计算方法，包括泰勒展开法、莱布尼茨公式法等。

## 核心公式
```latex
f^{(n)}(x) = \frac{d^n}{dx^n} f(x)
```

## 典型例题
**例题**：求函数 $f(x) = e^x \sin x$ 的三阶导数。

**解答**：
使用莱布尼茨公式法，我们有：
$$
f'''(x) = \frac{d^3}{dx^3} (e^x \sin x) = e^x \cos x + 3e^x \sin x + 3e^x \cos x - e^x \sin x
$$
化简得：
$$
f'''(x) = 4e^x \cos x + 2e^x \sin x
$$

## 常见错误
1. 忽略函数的奇偶性和周期性对导数的影响。
2. 在使用泰勒展开法时，未正确处理通分和恒等变形。
3. 在使用莱布尼茨公式法时，未正确处理乘积的导数。
```