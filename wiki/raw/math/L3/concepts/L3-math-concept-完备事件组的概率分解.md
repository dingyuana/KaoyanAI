---
id: L3-math-concept-完备事件组的概率分解
title: 完备事件组的概率分解
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-概率论-P025-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P025-concept]]

# 完备事件组的概率分解

# 完备事件组的概率分解


**章节**：2026 张宇概率论 9讲(OCR)

**难度**：★★☆☆☆


## 一、概念定义

### 完备事件组

若事件 $B_1, B_2, \ldots, B_n$ 满足以下两个条件：
1. **两两互斥**：$B_i B_j = \varnothing$（当 $i \neq j$ 时）
2. **构成样本空间**：$B_1 \cup B_2 \cup \cdots \cup B_n = \Omega$

则称 $\{B_1, B_2, \ldots, B_n\}$ 为**完备事件组**（或**划分**）。

### 概率分解公式

设 $\{B_1, B_2, \ldots, B_n\}$ 为完备事件组，则任意事件 $A$ 可以分解为：

$$A = AB_1 \cup AB_2 \cup \cdots \cup AB_n$$

由于 $AB_i$ 两两互斥，故：

$$\boxed{P(A) = \sum_{i=1}^{n} P(AB_i)}$$


## 二、核心公式

### 1. 加法公式（两事件）

$$P(A \cup B) = P(A) + P(B) - P(AB)$$

### 2. 完备事件组分解

若 $B_1, B_2, B_3$ 为完备事件组，则：
$$P(A) = P(AB_1) + P(AB_2) + P(AB_3)$$

### 3. 条件概率与乘法公式

$$P(AB) = P(A)P(B|A) = P(B)P(A|B)$$

### 4. 互斥事件的概率

若 $A_1, A_2, \ldots, A_n$ 两两互斥，则：
$$P(A_1 \cup A_2 \cup \cdots \cup A_n) = \sum_{i=1}^{n} P(A_i)$$

### 5. 三事件加法公式

$$P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(AB) - P(AC) - P(BC) + P(ABC)$$

### 6. 差公式

$$P(A - B) = P(A) - P(AB)$$


## 三、典型例题

### 例题 1.2

设 $A, B, C$ 为三个随机事件，且：

$$P(A) = P(B) = P(C) = \frac{1}{4}, \quad P(AB) = 0, \quad P(AC) = P(BC) = \frac{1}{12}$$

则 $A, B, C$ 中**恰有一个事件发生**的概率为 $\underline{\hspace{2cm}}$

**选项**：(A) $\frac{1}{4}$　(B) $\frac{1}{3}$　(C) $\frac{1}{12}$　(D) $\frac{5}{12}$


### 【解】

**方法一：直接计算**

恰有一个事件发生等价于：
$$A\bar{B}\bar{C} \cup \bar{A}B\bar{C} \cup \bar{A}\bar{B}C$$

这三个事件互斥，所以：
$$P = P(A\bar{B}\bar{C}) + P(\bar{A}B\bar{C}) + P(\bar{A}\bar{B}C)$$

计算各项：
$$P(A\bar{B}\bar{C}) = P(A) - P(AB) - P(AC) + P(ABC) = \frac{1}{4} - 0 - \frac{1}{12} + 0 = \frac{1}{6}$$

$$P(\bar{A}B\bar{C}) = P(B) - P(AB) - P(BC) + P(ABC) = \frac{1}{4} - 0 - \frac{1}{12} + 0 = \frac{1}{6}$$

$$P(\bar{A}\bar{B}C) = P(C) - P(AC) - P(BC) + P(ABC) = \frac{1}{4} - \frac{1}{12} - \frac{1}{12} + 0 = \frac{1}{6}$$

故：
$$P = \frac{1}{6} + \frac{1}{6} + \frac{1}{6} = \frac{1}{2}$$

**方法二：补事件法**

由 $P(AB) = 0$ 可知 $P(ABC) = 0$，利用容斥原理：

$$P(A \cup B \cup C) = \frac{1}{4} + \frac{1}{4} + \frac{1}{4} - 0 - \frac{1}{12} - \frac{1}{12} + 0 = \frac{1}{2}$$

恰有一个发生的概率：
$$P = P(A \cup B \cup C) - P(\text{恰有两个}) = \frac{1}{2} - \frac{1}{12} = \frac{5}{12}$$

> **答案**：$\boxed{\text{(D) } \frac{5}{12}}$


## 四、常见错误

| 错误类型 | 具体表现 | 正确做法 |
|---------|---------|---------|
| **混淆互斥与独立** | 错误地认为 $P(AB) = P(A)P(B)$（当 $A, B$ 互斥时） | 互斥时 $P(AB) = 0$；独立时才用乘法公式 |
| **遗漏容斥项** | 计算 $P(A \cup B \cup C)$ 时遗漏交叉项 | 牢记完整的容斥公式 |
| **忽略互斥条件** | 在 $A_i$ 不互斥时直接使用 $P(\cup A_i) = \sum P(A_i)$ | 先验证互斥条件，或使用容斥原理 |
| **分解不完整** | 将 $A$ 分解为 $AB_1 \cup AB_2$ 后遗漏 $AB_3$ 等项 | 确保完备事件组的所有部分都被包含 |
| **条件概率误用** | 将 $P(AB) = P(A)P(B)$ 用于所有事件对 | 仅当 $A, B$ **独立**时此式才成立 |


## 五、关联知识点

| 知识点 | 说明 |
|-------|------|
| **条件概率** | $P(B\|A) = \dfrac{P(AB)}{P(A)}$ |
| **事件的独立性** | $P(AB) = P(A)P(B)$ |
| **全概率公式** | $P(A) = \sum P(B_i)P(A\|B_i)$ |
| **贝叶斯公式** | $P(B_j\|A) = \dfrac{P(B_j)P(A\|B_j)}{\sum P(B_i)P(A\|B_i)}$ |
| **随机变量的分布** | 离散型与连续型随机变量的概率分布 |


> **学习提示**：完备事件组的概率分解是连接"事件概率"与"随机变量"的桥梁，核心思想是**化整为零、分而治之**。在解题时，首先识别完备事件组，然后对目标事件进行分解，最后利用加法或乘法公式求和。
