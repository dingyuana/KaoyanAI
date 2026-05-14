---
id: L3-math-concept-高等数学-第19讲
title: 高等数学-第19讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P272-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P272-concept]]

# 高等数学-第19讲

**来源：** 高等数学第19讲

```markdown
# 高等数学-第19讲：函数极限与连续

## 核心概念定义

函数极限与连续是高等数学中研究函数在一点附近行为的重要概念。函数极限描述了当自变量趋近于某一点时，函数值的变化趋势；函数连续性则描述了函数在某一点附近是否可以无缝连接。

## 核心公式

```latex
\lim_{x \to a} f(x) = L \quad \text{若对于任意}\epsilon > 0, \exists \delta > 0, \text{使得当} 0 < |x - a| < \delta \text{时，有} |f(x) - L| < \epsilon
```

## 典型例题

**例1.1** 计算 \(\lim_{x \to 0} \frac{\sin x}{x}\)

**解**：由于 \(\lim_{x \to 0} \sin x = 0\) 且 \(\lim_{x \to 0} x = 0\)，根据极限的乘法法则，有：

\[
\lim_{x \to 0} \frac{\sin x}{x} = \frac{\lim_{x \to 0} \sin x}{\lim_{x \to 0} x} = \frac{0}{0}
\]

这是一个未定式，可以使用洛必达法则求解：

\[
\lim_{x \to 0} \frac{\sin x}{x} = \lim_{x \to 0} \frac{\cos x}{1} = \cos 0 = 1
\]

## 常见错误

1. 忽视函数极限存在的条件，错误地判断极限是否存在。
2. 在计算极限时，没有正确处理未定式，导致错误的结果。
3. 在判断函数连续性时，没有正确理解间断点的类型，导致错误地判断函数是否连续。