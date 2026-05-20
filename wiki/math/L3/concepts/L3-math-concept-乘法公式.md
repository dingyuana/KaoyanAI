---
id: L3-math-concept-乘法公式
title: 乘法公式
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors:
  - RAW-math-概率论-P018-concept
related: []
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P018-concept]]

# 乘法公式

# 乘法公式


**章节：** 2026 张宇概率论 9讲(OCR)  
**难度：** ★★☆☆☆  
**标签：** 概率论基础 | 条件概率 | 贝叶斯


## 概念定义

**乘法公式**是概率论中用于计算两个或多个事件同时发生概率的重要公式，本质上是条件概率的变形。其核心思想是：**将联合概率拆解为边缘概率与条件概率的乘积**。

根据研究对象的不同，乘法公式包含以下层次：

| 层次 | 名称 | 适用场景 |
|------|------|----------|
| 一级 | 乘法公式 | 两个事件的联合概率 |
| 二级 | 多重乘法公式 | 多个事件的联合概率 |
| 三级 | 全概率公式 | 将复杂事件分解为互不相容的简单事件 |
| 四级 | 贝叶斯公式 | 已知结果推断原因（执果索因）|


## 核心公式

### 1. 基本乘法公式

由条件概率 $P(A \mid B) = \dfrac{P(AB)}{P(B)}$ 变形可得：

$$\boxed{P(AB) = P(A) \cdot P(B \mid A) = P(B) \cdot P(A \mid B)}$$

**适用条件：** $P(A) > 0$，$P(B) > 0$

### 2. 推广：多重乘法公式

$$P(A_1 A_2 \cdots A_n) = P(A_1) \cdot P(A_2 \mid A_1) \cdot P(A_3 \mid A_1 A_2) \cdots P(A_n \mid A_1 A_2 \cdots A_{n-1})$$

### 3. 全概率公式

设 $A_1, A_2, \cdots, A_n$ 为**完备事件组**（两两互不相容，且 $\bigcup_{i=1}^{n} A_i = \Omega$），则：

$$\boxed{P(B) = \sum_{i=1}^{n} P(A_i) \cdot P(B \mid A_i)}$$

### 4. 贝叶斯公式（逆概率公式）

承接全概率公式，"执果索因"：

$$\boxed{P(A_k \mid B) = \frac{P(A_k) \cdot P(B \mid A_k)}{\sum_{i=1}^{n} P(A_i) \cdot P(B \mid A_i)}}$$


## 典型例题

> **例题** 设 $A, B, C$ 为随机事件，且 $A$ 与 $B$ 互不相容，$A$ 与 $C$ 互不相容，$B$ 与 $C$ 相互独立，$P(A) = P(B) = P(C) = \dfrac{1}{3}$，则
> $$P(B \cup C \mid A \cup B \cup C) = \underline{\quad\quad}$$

**解：**

由题意可得：
$$P(AB) = 0, \quad P(AC) = 0, \quad P(BC) = P(B)P(C) = \frac{1}{9}$$

**第一步：转化条件概率形式**

$$P(B \cup C \mid A \cup B \cup C) = \frac{P[(B \cup C) \cap (A \cup B \cup C)]}{P(A \cup B \cup C)}$$

**第二步：化简分子**

$$P[(B \cup C) \cap (A \cup B \cup C)] = P[(B \cap A) \cup (B \cap B) \cup (B \cap C) \cup (C \cap A) \cup (C \cap B) \cup (C \cap C)]$$
$$= P(AB \cup BB \cup BC \cup AC \cup CB \cup CC)$$
$$= P(AB) + P(B) + P(BC) + P(AC) + P(CB) + P(C)$$
$$= 0 + \frac{1}{3} + \frac{1}{9} + 0 + \frac{1}{9} + \frac{1}{3} = \frac{8}{9}$$

**第三步：计算分母**

$$P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(AB) - P(AC) - P(BC) + P(ABC)$$

注意：$ABC = \varnothing$（因为 $AB = \varnothing$），故 $P(ABC) = 0$

$$P(A \cup B \cup C) = \frac{1}{3} + \frac{1}{3} + \frac{1}{3} - 0 - 0 - \frac{1}{9} - 0 = \frac{8}{9}$$

**第四步：代入计算**

$$P(B \cup C \mid A \cup B \cup C) = \frac{\frac{8}{9}}{\frac{8}{9}} = \boxed{\frac{5}{8}}$$


## 常见错误

### ❌ 错误1：忽视条件概率的前提条件

> **错误表述：** 直接使用 $P(X \leq x \mid Y = y_0) = \dfrac{P(X \leq x, Y = y_0)}{P(Y = y_0)}$

> **问题分析：** 对于连续型随机变量，$P(Y = y_0) = 0$，分母为零，公式不成立。

> **正确做法：** 先求条件概率密度
> $$f_{X|Y}(x|y_0) = \frac{f(x, y_0)}{f_Y(y_0)}$$
> 再计算
> $$P(X \leq x \mid Y = y_0) = \int_{-\infty}^{x} f_{X|Y}(t|y_0) \, dt$$

### ❌ 错误2：混淆独立与互不相容

> **错误认知：** "互不相容"等同于"独立"

> **正确理解：** 
> - **互不相容**（互斥）：$P(AB) = 0$
> - **独立**：$P(AB) = P(A)P(B)$
> - 若 $P(A) > 0$ 且 $P(B) > 0$，则互不相容与独立**矛盾**

### ❌ 错误3：全概率公式漏掉某些完备事件

> **错误示例：** 完备事件组 $\{A_1, A_2\}$ 误写成 $P(B) = P(A_1)P(B \mid A_1)$

> **正确写法：** 必须包含所有基本事件 $P(B) = P(A_1)P(B \mid A_1) + P(A_2)P(B \mid A_2)$

### ❌ 错误4：贝叶斯公式分母写错

> **错误写法：** 直接写成 $P(A_k \mid B) = \dfrac{P(A_k)P(B \mid A_k)}{P(A_k)}$

> **正确写法：** 分母是**全概率**，即所有 $A_i$ 的贡献之和


## 关联知识点

| 序号 | 关联知识点 | 关系说明 |
|------|------------|----------|
| 1 | 条件概率 $P(A \mid B)$ | 乘法公式的基础 |
| 2 | 独立性 | 独立时 $P(AB) = P(A)P(B)$，乘法公式退化 |
| 3 | 完备事件组 | 全概率公式的适用前提 |
| 4 | 随机变量条件分布 | 乘法公式在连续型随机变量中的延拓 |
| 5 | 贝叶斯决策 | 贝叶斯公式的统计应用 |


**扩展阅读：**
- [[条件概率]]
- [[全概率公式与贝叶斯公式]]
- [[事件的独立性]]
