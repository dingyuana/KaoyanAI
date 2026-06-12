---
id: L3-arch-method-CPU性能计算
title: CPU性能计算方法
subject: arch
type: method
level: 3
tags: [CPU性能, CPI, MIPS, 执行时间]
related:
  - L3-arch-concept-计算机性能指标.md
  - L3-arch-exercise-性能计算习题.md
source: RAW-arch-1计算机系统概述-1.3.1, CPI, CPU执行时间, MIPS
created: 2026-06-10
---

# CPU性能计算方法

## 适用场景

已知CPU主频、CPI（或各类指令的比例和CPI）、指令条数等参数，计算CPU执行时间、MIPS、加速比等性能指标时使用。这是考研408计算机组成原理的必考内容。

## 方法步骤

### Step 1: 确定基本参数

收集以下参数：
- **主频 $f$**（单位：Hz或GHz）
- **CPI**：每条指令的平均时钟周期数
- **指令条数 $N$**：程序包含的指令总数

### Step 2: 计算时钟周期

$$ \text{时钟周期} = \frac{1}{\text{主频}} $$

例如：主频2.4GHz，时钟周期 $= \frac{1}{2.4 \times 10^9} \approx 0.417\text{ns}$

### Step 3: 计算CPU执行时间

$$ \text{CPU执行时间} = N \times CPI \times \text{时钟周期} = \frac{N \times CPI}{f} $$

### Step 4: 计算MIPS

$$ MIPS = \frac{f}{CPI \times 10^6} $$

### Step 5: 处理混合CPI的情况

如果指令分不同类型（各有不同CPI和比例）：

$$ \text{平均CPI} = \sum_{i=1}^{n} (\text{指令类型}_i\text{的比例} \times \text{指令类型}_i\text{的CPI}) $$

然后代入Step 3的公式。

## 示例

### 示例1：基本CPU性能计算

**题目**：某CPU主频为2GHz，某程序包含100万条指令，平均CPI为1.5，求CPU执行时间和MIPS。

**解题**：
1. 时钟周期 $= \frac{1}{2 \times 10^9} = 0.5\text{ns}$
2. 执行时间 $= 10^6 \times 1.5 \times 0.5 \times 10^{-9} = 0.75 \times 10^{-3}\text{s} = 0.75\text{ms}$
3. $MIPS = \frac{2 \times 10^9}{1.5 \times 10^6} \approx 1333$

**答案**：执行时间0.75ms，MIPS≈1333

### 示例2：混合CPI计算

**题目**：某CPU主频1.5GHz，程序中算术运算占40%（CPI=1），Load/Store占20%（CPI=2），分支指令占10%（CPI=3），其他占30%（CPI=2），求平均CPI。

**解题**：
平均CPI = 0.4×1 + 0.2×2 + 0.1×3 + 0.3×2 = 0.4 + 0.4 + 0.3 + 0.6 = 1.7

**答案**：平均CPI = 1.7

## 注意事项

1. **单位一致**：主频用Hz、时间用秒、MIPS注意$10^6$换算
2. **CPI与主频无关**：CPI由体系结构决定，不随主频变化
3. **指令条数vs时钟周期数**：CPU执行时间 = 时钟周期数 × 时钟周期 = 指令条数 × CPI × 时钟周期
4. **频率单位换算**：1T=$10^3$G=$10^6$M=$10^9$K（描述速率/频率时）