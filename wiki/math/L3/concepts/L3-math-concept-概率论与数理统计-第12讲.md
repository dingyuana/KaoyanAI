---
id: L3-math-concept-概率论与数理统计-第12讲
title: 概率论与数理统计-第12讲
subject: math
type: concept
level: 3
tags: ['概率论与数理统计']
source_anchors: ['RAW-math-概率论-P032-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P032-concept]]

# 概率论与数理统计-第12讲

**来源：** 概率论与数理统计第12讲

```markdown
# 概率论与数理统计-第12讲：随机事件和概率

## 核心概念定义
随机事件是指在一定条件下可能发生也可能不发生的事件。概率是衡量随机事件发生可能性大小的一个数值。

## 核心公式
```latex
\begin{align*}
P(A|B) &= \frac{P(AB)}{P(B)} \quad \text{（条件概率）} \\
P(A \cup B) &= P(A) + P(B) - P(AB) \quad \text{（互斥事件的并概率）} \\
P(A \cap B) &= P(A)P(B|A) \quad \text{（条件概率的另一种表述）} \\
P(B) &= \sum_{i=1}^{n} P(A_i)P(B|A_i) \quad \text{（全概率公式）} \\
P(A|B) &= \frac{P(B|A)P(A)}{P(B)} \quad \text{（贝叶斯公式）}
\end{align*}
```

## 典型例题
**例1.3** 设 \(A, B, C\) 为随机事件，且 \(A\) 与 \(B\) 互不相容，\(A\) 与 \(C\) 互不相容，\(B\) 与 \(C\) 相互独立，\(P(A) = P(B) = P(C) = \frac{1}{3}\)，则 \(P(B \cup C | A \cup B \cup C) = \)____

**解**：应填 \(\frac{5}{8}\)

由题意得，\(P(AB) = 0, P(AC) = 0, P(BC) = P(B)P(C) = \frac{1}{9}\)

\(P(B \cup C | A \cup B \cup C) = \frac{P(B \cup C)}{P(A \cup B \cup C)} = \frac{P(B) + P(C) - P(BC)}{P(A) + P(B) + P(C) - P(AB) - P(AC) - P(BC)} = \frac{\frac{1}{3} + \frac{1}{3} - \frac{1}{9}}{\frac{1}{3} + \frac{1}{3} + \frac{1}{3} - 0 - 0 - \frac{1}{9}} = \frac{5}{8}\)

## 常见错误
1. 忽略条件概率公式中的条件 \(P(B) > 0\)。
2. 在使用全概率公式和贝叶斯公式时，错误地处理了事件之间的关系。
3. 在计算概率时，没有正确地使用概率的性质，如单调性。
```
