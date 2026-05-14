---
id: L3-math-concept-高等数学-第28讲
title: 高等数学-第28讲
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-高数-P282-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P282-concept]]

# 高等数学-第28讲

**来源：** 高等数学第28讲

```markdown
# 高等数学-第28讲：数列极限

## 核心概念定义
数列极限是研究数列随着项数增加而趋向于某一固定值的性质。当数列的项数无限增加时，如果数列的值无限接近某个常数，则称这个常数是该数列的极限。

## 核心公式
```latex
\lim_{n \to \infty} a_n = L \quad \text{当且仅当} \quad \forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n > N, |a_n - L| < \epsilon
```

## 典型例题
**例2.10** 设正项数列 \(\{a_n\}\) 收敛于 0，若 \(a_n = \cos b_n - \cos a_n\)，\(a_n = \frac{1}{b_n}\)，且 \((1 - b_n)^2 = \cos b_n^2\)，则 \(\lim_{n \to \infty} b_n = \)？

**解** 应填 1。

**例2.11** 设 \(f(x) = \frac{1}{x}\)，\(g(x) = x\)，\(x\) 是有理数，\(u = g(x)\)，\(y = f(u)\)，则 \(\lim_{x \to 0} f(g(x)) = \)？

**解** 应选 (D) 不存在。

## 常见错误
1. 忽略数列收敛的必要条件，如正项数列必须单调有界。
2. 误用极限定理，如将复合函数的极限定理应用于不满足条件的函数。
3. 忽视数列单调性和有界性对极限存在性的影响。
```