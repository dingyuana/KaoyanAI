---
id: L3-math-concept-高等数学-第22讲
title: 高等数学-第22讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P276-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P276-concept]]

# 高等数学-第22讲

**来源：** 高等数学第22讲

```markdown
# 高等数学-第22讲：函数极限与连续

## 核心概念定义
函数极限：当自变量x趋向于某一值时，函数f(x)的值趋向于某一确定的值a，则称a为函数f(x)在x趋向于该值时的极限。
函数连续：如果函数在某一点连续，那么在该点的极限存在，并且等于函数在该点的函数值。

## 核心公式
```latex
\lim_{x \to a} f(x) = L \quad \text{当且仅当} \quad \lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L
```

## 典型例题
**例1.7** 计算 $\lim_{n \to \infty} \left( \sqrt{2n} - \sqrt{2n-1} \right)$。

**解**：应填 $\ln 2$。

对函数 $f(x) = \sqrt{x}$ 在区间 $[1, 2n]$ 上应用拉格朗日中值定理，有
$$
f(2n) - f(1) = f'(\xi)(2n - 1) \quad \text{其中} \quad \xi \in (1, 2n)
$$
即
$$
\sqrt{2n} - \sqrt{2n-1} = \frac{1}{2\sqrt{\xi}}(2n - 1)
$$
当 $n \to \infty$ 时，$\xi \to 2$，所以
$$
\lim_{n \to \infty} \left( \sqrt{2n} - \sqrt{2n-1} \right) = \lim_{n \to \infty} \frac{1}{2\sqrt{\xi}}(2n - 1) = \frac{1}{2\sqrt{2}} = \ln 2
```

## 常见错误
1. 忽视函数在极限点处的定义。
2. 在处理无穷大与无穷小的乘除运算时，没有正确地化归为经典形式。
3. 在使用拉格朗日中值定理时，没有正确地应用。
4. 在处理函数的差时，没有正确地应用平方差公式或差平方公式。