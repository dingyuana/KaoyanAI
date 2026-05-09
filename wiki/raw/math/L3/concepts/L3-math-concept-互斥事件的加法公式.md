---
id: L3-math-concept-互斥事件的加法公式
title: 互斥事件的加法公式
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-概率论-P020-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P020-concept]]

# 互斥事件的加法公式

# 互斥事件的加法公式

## 基本信息

- **章节**：2026 张宇概率论 9讲(OCR)
- **难度**：★★☆☆☆


## 1. 概念定义

### 互斥事件

若事件 $A$ 与事件 $B$ **不可能同时发生**，即 $AB = \varnothing$，则称事件 $A$ 与 $B$ 为**互斥事件**（互不相容事件）。

### 加法公式

对于互斥事件 $A$ 和 $B$，它们的和事件概率等于各自概率之和：

$$P(A \cup B) = P(A) + P(B)$$


## 2. 核心公式

### 基础公式

#### (1) 互斥事件加法公式

> 若 $A$、$B$ 互斥，即 $AB = \varnothing$，则：

$$\boxed{P(A \cup B) = P(A) + P(B)}$$

#### (2) 一般加法公式（容斥原理）

> 对于任意事件 $A$、$B$：

$$\boxed{P(A \cup B) = P(A) + P(B) - P(AB)}$$

#### (3) 三个事件的加法公式

$$\boxed{P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(AB) - P(BC) - P(AC) + P(ABC)}$$

#### (4) n个互斥事件的加法公式

> 若 $A_1, A_2, \ldots, A_n$ 两两互斥，则：

$$\boxed{P(A_1 \cup A_2 \cup \cdots \cup A_n) = \sum_{i=1}^{n} P(A_i)}$$

### 常用等价变形

#### (5) 差事件的概率

$$P(A - B) = P(AB^c) = P(A) - P(AB)$$

#### (6) 对立事件概率

$$P(\bar{A}) = 1 - P(A)$$


## 3. 典型例题

### 例题 1.2

设 $A$、$B$、$C$ 为三个随机事件，且

$$P(A) = P(B) = P(C) = \frac{1}{4}, \quad P(AB) = 0, \quad P(AC) = P(BC) = \frac{1}{12}$$

则 $A$、$B$、$C$ 中**恰有一个事件发生**的概率为（　）

(A) $\dfrac{1}{4}$　　(B) $\dfrac{1}{2}$　　(C) $\dfrac{1}{12}$　　(D) $\dfrac{5}{12}$

### 【解】

**分析**：恰有一个事件发生 = $A\bar{B}\bar{C} \cup \bar{A}B\bar{C} \cup \bar{A}\bar{B}C$

**方法**：利用互斥分解

由于 $P(AB) = 0$，而 $P(AB) \geq P(ABC) = 0$，故 $P(ABC) = 0$。

**第一步**：将每个"恰有一个发生"的事件写成差的形式：

$$P(A\bar{B}\bar{C}) = P(A - B - C) = P(A) - P(AB) - P(AC) + P(ABC)$$

**第二步**：分别计算三项

$$P(A\bar{B}\bar{C}) = \frac{1}{4} - 0 - \frac{1}{12} + 0 = \frac{1}{6}$$

$$P(\bar{A}B\bar{C}) = \frac{1}{4} - 0 - \frac{1}{12} + 0 = \frac{1}{6}$$

$$P(\bar{A}\bar{B}C) = \frac{1}{4} - \frac{1}{12} - \frac{1}{12} + 0 = \frac{1}{12}$$

**第三步**：求和

$$P = \frac{1}{6} + \frac{1}{6} + \frac{1}{12} = \frac{2}{12} + \frac{2}{12} + \frac{1}{12} = \frac{5}{12}$$

**答案**：$\boxed{\text{(D)}}$


## 4. 常见错误

| 错误类型 | 错误示例 | 正确做法 |
|---------|---------|---------|
| **混淆互斥与独立** | 对互斥事件使用 $P(A \cup B) = P(A) + P(B) - P(A)P(B)$ | 互斥事件 $AB = \varnothing$，直接 $P(A \cup B) = P(A) + P(B)$ |
| **漏减交集** | 对非互斥事件直接写 $P(A \cup B) = P(A) + P(B)$ | 必须减去 $P(AB)$：$P(A \cup B) = P(A) + P(B) - P(AB)$ |
| **遗漏容斥项** | 三个事件直接相加：$P(A \cup B \cup C) = P(A) + P(B) + P(C)$ | 必须加上 $P(ABC)$：$P = \sum P - \sum P(\text{两两}) + P(ABC)$ |
| **忽略 $P(ABC) = 0$** | 不知道 $P(AB) = 0$ 时 $P(ABC) = 0$ | 由 $ABC \subseteq AB$，若 $P(AB) = 0$ 则 $P(ABC) = 0$ |


## 5. 关联知识点

```
概率论基础
├── 随机事件与样本空间
├── 概率的公理化定义
├── 条件概率
│   └── P(A|B) = P(AB)/P(B)
├── 乘法公式
│   └── P(AB) = P(A)P(B|A)
├── 全概率公式
│   └── P(A) = Σ P(Bi)P(A|Bi)
├── 贝叶斯公式
│   └── P(Bj|A) = P(Bj)P(A|Bj) / Σ P(Bi)P(A|Bi)
└── 独立性与互斥性
    ├── 事件的独立性
    └── 互斥事件的加法公式 ← 当前知识点
```

### 核心区别

| 概念 | 互斥 (Mutually Exclusive) | 独立 (Independent) |
|------|--------------------------|-------------------|
| **定义** | $AB = \varnothing$ | $P(AB) = P(A)P(B)$ |
| **关系** | 不能同时发生 | 一个发生不影响另一个 |
| **典型例子** | 掷骰子：出现1点和出现2点 | 两次独立掷硬币 |


## 6. 解题方法总结

### 互斥思想求概率的三步法

1. **$D_1$ 常规操作**：直接写出所求概率表达式
2. **$D_2$ 转换等价表述**：将复杂事件分解为互斥的简单事件之和
3. **$D_3$ 引入符号**：设辅助事件简化计算

### 常用分解公式

$$A \cup B = A \cup (B - A) = A \cup (B\bar{A})$$

$$A = AB \cup A\bar{B}$$

$$A \cup B \cup C = AB \cup A\bar{B}C \cup \bar{A}\bar{B}C$$

