---
id: L3-math-concept-maxXYa事件与交集的关系
title: maxXYa事件与交集的关系
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-概率论-P008-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P008-concept]]

# maxXYa事件与交集的关系

# max/min 随机变量与事件的关系

## 元数据

- **章节**：2026 张宇概率论 9讲(OCR)
- **难度**：★★☆☆☆
- **核心内容**：利用最值关系式处理随机事件概率


## 1. 概念定义

当处理涉及 $\max\{X,Y\}$ 和 $\min\{X,Y\}$ 的事件概率时，需要将这些最值事件转化为对应的随机事件集合的交并关系。

**核心思想**：
- $\max$ 对应 **交集**（"都满足"）
- $\min$ 对应 **并集**（"至少有一个满足"）


## 2. 核心公式

### 2.1 最值事件与集合关系

| 序号 | 公式 | 集合含义 |
| ① | $\{\max\{X,Y\} \leq a\} = \{X \leq a\} \cap \{Y \leq a\}$ | 两者都 ≤ a |
| ② | $\{\max\{X,Y} > a\} = \{X > a\} \cup \{Y > a\}$ | 至少一个 > a |
| ③ | $\{\min\{X,Y\} \leq a\} = \{X \leq a\} \cup \{Y \leq a\}$ | 至少一个 ≤ a |
| ④ | $\{\min\{X,Y} > a\} = \{X > a\} \cap \{Y > a\}$ | 两者都 > a |

### 2.2 余概率转化

$$P(\max\{X,Y\} \leq a) = 1 - P(\max\{X,Y\} > a)$$

$$P(\min\{X,Y\} \leq a) = 1 - P(\min\{X,Y\} > a)$$

### 2.3 最值函数关系

| 序号 | 公式 | 说明 |
| ⑨ | $\max\{X,Y\} + \min\{X,Y\} = X + Y$ | 和的关系 |
| ⑩ | $\max\{X,Y\} - \min\{X,Y\} = |X - Y|$ | 差的关系 |
| ⑪ | $\max\{X,Y\} \cdot \min\{X,Y\} = X \cdot Y$ | 积的关系 |

### 2.4 包含关系

$$\{\max\{X,Y\} \leq a\} \subseteq \{\min\{X,Y\} \leq a\}$$

$$\{\min\{X,Y\} > a\} \subseteq \{\max\{X,Y\} > a\}$$

### 2.5 最值函数显式表达

$$\max\{X,Y\} = \frac{X + Y + |X - Y|}{2}$$

$$\min\{X,Y\} = \frac{X + Y - |X - Y|}{2}$$


## 3. 典型例题

### 例1.6

设 $X, Y$ 为连续型随机变量，且 $P\{X \geq 0, Y \geq 0\} = \frac{3}{5}$，$P\{X \geq 0\} = P\{Y \geq 0\} = \frac{4}{5}$，求：

**(1)** $A = \{\max\{X,Y\} \geq 0\}$ 的概率

**(2)** $B = \{\max\{X,Y\} \geq 0, \min\{X,Y\} < 0\}$ 的概率

### 【解】

**(1)** 由于
$$A = \{\max\{X,Y\} \geq 0\} = \{X \geq 0\} \cup \{Y \geq 0\}$$

由加法公式：
$$P(A) = P\{X \geq 0\} + P\{Y \geq 0\} - P\{X \geq 0, Y \geq 0\}$$

$$P(A) = \frac{4}{5} + \frac{4}{5} - \frac{3}{5} = \frac{5}{5} = 1$$

**(2)** 由全集分解：
$$A = \{\max\{X,Y\} \geq 0\} = \{\max\{X,Y\} \geq 0\} \cap \Omega$$
$$= \{\max\{X,Y\} \geq 0\} \cap (\{\min\{X,Y\} < 0\} \cup \{\min\{X,Y\} \geq 0\})$$
$$= \{\max\{X,Y\} \geq 0, \min\{X,Y\} < 0\} \cup \{\max\{X,Y\} \geq 0, \min\{X,Y\} \geq 0\}$$
$$= B \cup \{X \geq 0, Y \geq 0\}$$

由于 $B$ 与 $\{X \geq 0, Y \geq 0\}$ 互不相容，且 $\{X \geq 0, Y \geq 0\} \subseteq A$，故：
$$P(A) = P(B) + P\{X \geq 0, Y \geq 0\}$$

$$1 = P(B) + \frac{3}{5}$$

$$\therefore P(B) = 1 - \frac{3}{5} = \frac{2}{5}$$


## 4. 常见错误

### ❌ 错误一：混淆 max/min 的集合对应关系

| 关系 | 正确 | 错误 |
|-----|------|------|
| $\max$ ≤ a | $\{X \leq a\} \cap \{Y \leq a\}$ | $\{X \leq a\} \cup \{Y \leq a\}$ |
| $\min$ ≤ a | $\{X \leq a\} \cup \{Y \leq a\}$ | $\{X \leq a\} \cap \{Y \leq a\}$ |

> **记忆口诀**："max 取交，min 取并"

### ❌ 错误二：忽略德·摩根定律的逆用

$$\{\max\{X,Y\} > a\} \neq \{X > a\} \cap \{Y > a\}$$

正确应为：
$$\{\max\{X,Y\} > a\} = \{X > a\} \cup \{Y > a\}$$

### ❌ 错误三：直接展开混合事件

对于复合事件 $\{\max\{X,Y\} \geq 0, \min\{X,Y\} < 0\}$，不能直接写成简单集合运算，需使用**全集分解**技巧。

### ❌ 错误四：忘记容斥公式

计算 $P(\{X \geq 0\} \cup \{Y \geq 0\})$ 时，遗漏减去交集概率。


## 5. 关联知识点

| 知识点 | 关联说明 |
|-------|---------|
| **随机事件运算** | 交、并、补的集合运算 |
| **德·摩根定律** | $\overline{A \cap B} = \bar{A} \cup \bar{B}$ |
| **概率加法公式** | $P(A \cup B) = P(A) + P(B) - P(AB)$ |
| **全集分解** | $A = A \cap (B \cup \bar{B})$ |
| **随机变量分布函数** | $F(a) = P(X \leq a)$ 与 $\max/\min$ 的联系 |
| **伯努利不等式** | 涉及多个事件至少发生一个的概率估计 |


## 6. 方法论总结

```
处理 max/min 事件概率的解题流程：

1. 判断事件类型
   ├── max{...} ≤ a  → 转化为交集
   ├── max{...} > a  → 转化为并集
   ├── min{...} ≤ a  → 转化为并集
   └── min{...} > a  → 转化为交集

2. 优先使用补事件转化
   P(max ≤ a) = 1 - P(max > a)

3. 复合事件使用全集分解
   A ∩ (B ∪ B̄) = (A ∩ B) ∪ (A ∩ B̄)

4. 结合加法公式计算
```


> **重点提示**：②～④公式中，左边有 max(min)，右边无 max(min)，注意这种转化技巧！
