---
id: L3-math-concept-minXYa事件与并集的关系
title: minXYa事件与并集的关系
subject: math
type: concept
level: 3
tags: ['基础概念']
source_anchors: ['RAW-math-概率论-P010-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P010-concept]]

# minXYa事件与并集的关系

# min{X,Y}≤a 事件与并集的关系


## 元数据

- **章节**：2026 张宇概率论 9讲(OCR)
- **难度**：★★☆☆☆
- **标签**：随机事件、概率计算、最值关系


## 1. 概念定义

当涉及随机变量 $X$ 和 $Y$ 的**最大值** $\max\{X,Y\}$ 与**最小值** $\min\{X,Y\}$ 时，其事件表示与**集合的交、并、补运算**存在确定的对应关系。

核心思想：
- **max** 对应 **交运算**（两者都满足）
- **min** 对应 **并运算**（至少有一个满足）


## 2. 核心公式

### 2.1 基本等价关系

| 序号 | 公式 |
| (1) | $\displaystyle\{\max\{X,Y\} \leqslant a\} = \{X \leqslant a\} \cap \{Y \leqslant a\}$ |
| (2) | $\displaystyle\{\max\{X,Y\} > a\} = \{X > a\} \cup \{Y > a\}$ |
| (3) | $\displaystyle\{\min\{X,Y\} \leqslant a\} = \{X \leqslant a\} \cup \{Y \leqslant a\}$ |
| (4) | $\displaystyle\{\min\{X,Y\} > a\} = \{X > a\} \cap \{Y > a\}$ |

### 2.2 包含关系

| 序号 | 公式 |
| (5) | $\displaystyle\{\max\{X,Y\} \leqslant a\} \subseteq \{\min\{X,Y\} \leqslant a\}$ |
| (6) | $\displaystyle\{\min\{X,Y\} > a\} \subseteq \{\max\{X,Y\} > a\}$ |

### 2.3 恒等变换

| 序号 | 公式 |
| (7) | $\displaystyle\max\{X,Y\} = X + Y - \min\{X,Y\}$ |
| (8) | $\displaystyle\min\{X,Y\} = X + Y - \max\{X,Y\}$ |
| (9) | $\displaystyle\max\{X,Y\} + \min\{X,Y\} = X + Y$ |
| (10) | $\displaystyle\max\{X,Y\} - \min\{X,Y\} = |X - Y|$ |
| (11) | $\displaystyle\max\{X,Y\} \cdot \min\{X,Y\} = XY$ |

### 2.4 概率形式（补事件）

$$
P(\max\{X,Y\} \leqslant a) = 1 - P(\max\{X,Y\} > a)
$$

$$
P(\min\{X,Y\} \leqslant a) = 1 - P(\min\{X,Y\} > a)
$$


## 3. 典型例题

### 例 1.6

设 $X, Y$ 为连续型随机变量，且：
$$P\{X \geqslant 0, Y \geqslant 0\} = \frac{3}{5}, \quad P\{X \geqslant 0\} = P\{Y \geqslant 0\} = \frac{4}{5}$$

求下列事件的概率：
- (1) $A = \{\max\{X,Y\} \geqslant 0\}$
- (2) $B = \{\max\{X,Y\} \geqslant 0, \min\{X,Y\} < 0\}$

#### 【解】

**(1) 求 $P(A)$**

由公式 (2) 的逆用：
$$A = \{\max\{X,Y\} \geqslant 0\} = \{X \geqslant 0\} \cup \{Y \geqslant 0\}$$

应用加法公式：
$$P(A) = P\{X \geqslant 0\} + P\{Y \geqslant 0\} - P\{X \geqslant 0, Y \geqslant 0\}$$
$$= \frac{4}{5} + \frac{4}{5} - \frac{3}{5} = \frac{5}{5} = 1$$


**(2) 求 $P(B)$**

**方法一：全集分解**

由 $\Omega = \{\min\{X,Y\} < 0\} \cup \{\min\{X,Y\} \geqslant 0\}$，得：

$$A = A \cap \Omega = A \cap \left(\{\min\{X,Y\} < 0\} \cup \{\min\{X,Y\} \geqslant 0\}\right)$$
$$= \underbrace{\{\max\{X,Y\} \geqslant 0, \min\{X,Y\} < 0\}}_{B} \cup \underbrace{\{\max\{X,Y\} \geqslant 0, \min\{X,Y\} \geqslant 0\}}_{\{X \geqslant 0, Y \geqslant 0\}}$$
$$= B \cup \{X \geqslant 0, Y \geqslant 0\}$$

注意到 $B$ 与 $\{X \geqslant 0, Y \geqslant 0\}$ **互不相容**，故：
$$P(A) = P(B) + P\{X \geqslant 0, Y \geqslant 0\}$$

解得：
$$P(B) = P(A) - P\{X \geqslant 0, Y \geqslant 0\} = 1 - \frac{3}{5} = \frac{2}{5}$$


## 4. 常见错误

| 序号 | 错误类型 | 正确理解 |
| ❌ | 混淆 $\min$ 和 $\max$ 的运算 | $\min$ → **并集** $U$；$\max$ → **交集** $\cap$ |
| ❌ | 认为 $\{\max\{X,Y\} > a\}$ 是交集 | 应为 $\{X > a\} \cup \{Y > a\}$（至少有一个大于） |
| ❌ | 忽略容斥原理的直接应用 | $P(A \cup B) \neq P(A) + P(B)$，需减掉交集 |
| ❌ | 包含关系方向写反 | $\{\max \leqslant a\} \subseteq \{\min \leqslant a\}$，最大值小则最小值必然小 |
| ❌ | 使用恒等式时忽略条件 | $\|X - Y\| = \max - \min$ 要求 $X, Y$ 为实数 |


## 5. 关联知识点

| 关联知识点 | 说明 |
|-----------|------|
| [[随机事件与集合运算]] | 理解交、并、补的集合论基础 |
| [[概率的加法公式]] | $P(A \cup B) = P(A) + P(B) - P(AB)$ |
| [[全集分解公式]] | $P(A) = P(AB) + P(A\bar{B})$ |
| [[max/min 的函数形式]] | 将最值关系转化为代数运算 |
| [[对立事件概率]] | $P(\bar{A}) = 1 - P(A)$ 的应用 |


## 📌 记忆口诀

> **"max 小则都小（∩），min 大则都大（∩），min 小则至少有一小（∪），max 大则至少有一大（∪）"**


**参考来源**：2026 张宇概率论 9讲(OCR) - 第1讲 随机事件和概率
