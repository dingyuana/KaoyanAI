---
id: L3-math-concept-极限
title: 极限
subject: math
type: concept
level: 3
tags: [高等数学, 基础概念, 极限, 概率论与数理统计]
related:
  - concepts/数列极限.md
  - concepts/导数与微分.md
  - concepts/积分的概念与计算.md
created: 2026-05-15
---

# 极限

## 类型
concept

## 标签
- 高等数学
- 概率论与数理统计
- 微积分基础

## 来源
[[RAW-math-同济高数上-P001-C01]]
[[RAW-math-概率论-P001-C05]]

## 关联
- `INDEX-math-concept-数列极限`
- `INDEX-math-concept-导数与微分`
- `INDEX-math-concept-积分的概念与计算`

---

## 什么是极限

极限是高等数学的核心概念，指的是**当自变量趋近于某个值时，函数趋近的固定值**。

用一句话概括：**无限接近，但永远达不到的那个"目标值"**。

---

## 概率论中的极限

### 1. 事件概率的极限

$$P\left(\lim_{n \to \infty} A_n\right)$$

独立重复试验中，"频率趋近于概率"：
$$\lim_{n \to \infty} \frac{\text{成功次数}}{n} = p$$

### 2. 随机变量序列的极限

- **依概率收敛**：$X_n \xrightarrow{P} X$
- **几乎处处收敛**：$X_n \xrightarrow{a.s.} X$
- **分布收敛**：$X_n \xrightarrow{d} X$

---

## 典型例题

### 例题1：求概率极限

**题目**：设随机变量 $X_n \sim B(n, p)$，求 $\lim_{n \to \infty} P\left(\frac{X_n - np}{\sqrt{np(1-p)}} \leq x\right)$

**解答**：
由中心极限定理，当 $n \to \infty$ 时，
$$\frac{X_n - np}{\sqrt{np(1-p)}} \xrightarrow{d} N(0,1)$$
所以极限为标准正态分布的分布函数 $\Phi(x)$

---

### 例题2：证明依概率收敛

**题目**：设 $X_1, X_2, ..., X_n$ 独立同分布，$E(X_i) = \mu$，$D(X_i) = \sigma^2$，证明：$\bar{X}_n \xrightarrow{P} \mu$

**解答**：
由辛钦大数定律，依概率收敛到数学期望 $\mu$。

---

### 例题3：泊松近似

当 $n$ 很大、$p$ 很小时，二项分布 $B(n, p) \approx P(np)$：
$$\lim_{n \to \infty, p \to 0, np = \lambda} P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}$$

---

## 常见题型与解法

| 类型 | 方法 |
|:---|:---|
| $0/0$ 型未定式 | 洛必达法则 / 泰勒展开 |
| $\infty/\infty$ 型 | 洛必达 / 抓大头 |
| $1^\infty$ 型 | 取对数 + 改写 |
| 概率极限证明 | 大数定律 / 中心极限定理 |

---

## 常见错误

❌ **错误1：目标迷失**
表现：读题后不明确题目要求什么，回答不精准

❌ **错误2：方法选择错误**
表现：$0/0$ 型用洛必达但未验证条件，或多次洛必达后仍为未定式

❌ **错误3：细节疏忽**
表现：忽略定义域限制、无穷小阶数判断错误、泰勒展开阶数不够
