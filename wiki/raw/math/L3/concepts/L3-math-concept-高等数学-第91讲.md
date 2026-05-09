---
id: L3-math-concept-高等数学-第91讲
title: 高等数学-第91讲
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P352-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P352-concept]]

# 高等数学-第91讲

**来源：** 高等数学第91讲

```markdown
# 高等数学-第91讲：多元函数极限

## 核心概念定义
多元函数极限是研究当自变量趋于某一点时，函数值的变化趋势。本讲主要探讨二重极限、累次极限及其关系。

## 核心公式
```latex
\begin{align*}
\lim_{(x,y) \to (0,0)} f(x,y) &= \lim_{x \to 0} \lim_{y \to 0} f(x,y) \\
\lim_{x \to a} \lim_{y \to b} f(x,y) &= \lim_{y \to b} \lim_{x \to a} f(x,y)
\end{align*}
```

## 典型例题
### 例13.1
求 $\lim_{(x,y) \to (0,0)} \frac{x^2 - y^2}{x^2 + y^2}$。

**解**：因为 $\lim_{(x,y) \to (0,0)} \frac{x^2 - y^2}{x^2 + y^2}$ 不唯一，所以 $\lim_{(x,y) \to (0,0)} \frac{x^2 - y^2}{x^2 + y^2}$ 不存在。

### 例13.3
求 $\lim_{(x,y) \to (0,0)} \frac{xy}{x^2 + y^2}$。

**解**：当 $(x,y) \neq (0,0)$ 时，因为 $\lim_{(x,y) \to (0,0)} \frac{xy}{x^2 + y^2} = 0$，且 $\lim_{(x,y) \to (0,0)} \frac{x^2 + y^2}{x^2 + y^2} = 1$，所以 $\lim_{(x,y) \to (0,0)} \frac{xy}{x^2 + y^2} = 0$。

## 常见错误
1. 忽视特殊路径法在判别二重极限是否存在时的应用。
2. 计算累次极限时，未先固定一个变量，再计算另一个变量的极限。
3. 误认为二重极限存在时，累次极限也一定存在。