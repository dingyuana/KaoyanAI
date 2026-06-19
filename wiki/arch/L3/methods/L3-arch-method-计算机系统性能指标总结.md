---
title: 计算机系统性能指标总结
subject: arch
type: method
level: 3
tags: [性能指标, CPI, MIPS, 吞吐量, 响应时间, 主频]
related:
  - concepts/L3-arch-concept-计算机性能指标.md
  - concepts/L3-arch-concept-计算机性能指标CPI.md
  - exercises/L3-arch-exercise-计算机系统概述习题.md
source: RAW/1 计算机系统概述/
created: 2026-06-19
---

# 计算机系统性能指标总结

## 适用场景

计算机系统概述的性能指标计算是408常考题型，包括：
- CPI（每指令周期数）计算
- CPU执行时间计算
- MIPS（每秒百万指令）计算
- 吞吐量和响应时间分析

## 方法步骤

### Step 1: 识别已知参数

从题目中提取以下信息：
- **主频 $f$**（Hz、MHz、GHz）
- **CPI**（每条指令的时钟周期数）
- **指令条数 $N$**
- **各类型指令的比例和CPI**

### Step 2: 选择合适公式

#### 基本公式

| 指标 | 公式 |
|------|------|
| 时钟周期 $T$ | $T = \frac{1}{f}$ |
| CPU执行时间 | $T_{CPU} = N \times CPI \times T = \frac{N \times CPI}{f}$ |
| MIPS | $MIPS = \frac{f}{CPI \times 10^6} = \frac{N}{T_{CPU} \times 10^6}$ |
| 平均CPI | $CPI_{avg} = \sum(比例_i \times CPI_i)$ |

#### 导出公式

- **执行时间与MIPS关系**：$T_{CPU} = \frac{N}{MIPS \times 10^6}$
- **加速比**：$S = \frac{T_{旧}}{T_{新}}$

### Step 3: 处理混合CPI情况

```
平均CPI = Σ(第i种指令的比例 × 第i种指令的CPI)
```

### Step 4: 单位换算

| 单位 | 换算关系 |
|------|---------|
| 频率 | 1GHz = 10^3MHz = 10^6kHz = 10^9Hz |
| 时间 | 1s = 10^3ms = 10^6μs = 10^9ns |
| MIPS | 1 MIPS = 10^6 指令/秒 |

## 示例

### 示例1：已知主频和CPI，求MIPS

**题目**：CPU主频800MHz，CPI=4，求MIPS。

**解答**：
$$MIPS = \frac{800 \times 10^6}{4 \times 10^6} = 200$$

**答案**：200 MIPS

### 示例2：已知MIPS和指令数，求执行时间

**题目**：程序有100万条指令，MIPS=100，求执行时间。

**解答**：
$$T_{CPU} = \frac{100 \times 10^6}{100 \times 10^6} = 1s$$

**答案**：1秒

### 示例3：混合CPI计算加速比

**题目**：某程序在A机器上执行需要10s，A机器主频1GHz，平均CPI=2。升级后B机器主频2GHz，平均CPI=3，求加速比。

**解答**：
1. A机器指令数：$N = \frac{10s \times 1GHz}{2} = 5 \times 10^9$ 条
2. B机器执行时间：$T_B = \frac{5 \times 10^9 \times 3}{2GHz} = 7.5s$
3. 加速比：$S = \frac{10}{7.5} \approx 1.33$

**答案**：加速比约为1.33

## 注意事项

1. **CPI与主频无关**：CPI由体系结构决定，改变主频不影响CPI
2. **指令数不变假设**：比较不同机器时，通常假设运行同一个程序
3. **比例使用小数**：0.4表示40%，不是40
4. **单位必须一致**：统一换算后再计算

## 失效情况

以下情况不适用本方法：
- 涉及Cache命中率等存储系统性能（需额外公式）
- 涉及流水线效率（需用流水线公式）
- 涉及I/O性能（需考虑I/O时间）
