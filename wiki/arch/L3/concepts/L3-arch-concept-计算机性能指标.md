---
id: L3-arch-concept-计算机性能指标
title: 计算机性能指标
subject: arch
type: concept
level: 3
tags: [CPI, MIPS, CPU执行时间, 主频, 性能指标]
related:
  - L3-arch-concept-冯诺依曼结构.md
  - L3-arch-method-CPU性能计算.md
  - L3-arch-exercise-性能计算习题.md
source_anchors:
  - RAW-arch-1计算机系统概述-1.3.1
  - RAW-arch-1计算机系统概述-CPI
  - RAW-arch-1计算机系统概述-CPU执行时间
  - RAW-arch-1计算机系统概述-MIPS
  - RAW-arch-1计算机系统概述-主频和CPU时钟周期
created: 2026-06-10
---

# 计算机性能指标

## 形式化定义

> 引用自 [[RAW-arch-1计算机系统概述-1.3.1]]：

计算机性能指标用于衡量计算机系统的速度、效率和能力，主要包括CPU执行时间、CPI、MIPS、主频等。

## 核心性能指标

### 1. 主频和CPU时钟周期

- **主频**：机器内部主时钟的频率，代表每秒执行的时钟周期数。值越大，CPU运行速度越快。
- **CPU时钟周期**：主频的倒数，是CPU中最小的时间单位，每个动作至少需要1个时钟周期。

$$ \text{时钟周期} = \frac{1}{\text{主频}} $$

如主频为 2.4GHz，则时钟周期 $= \frac{1}{2.4 \times 10^9} \approx 0.417\text{ns}$

### 2. CPI（Cycle Per Instruction）

- **定义**：执行一条指令所需要的时钟周期数
- **特性**：CPI与系统结构、指令集、计算机组织有关，**与时钟频率无关**

$$ CPI = \frac{\text{时钟周期数量}}{\text{指令数量}} $$

### 3. CPU执行时间

$$ \text{CPU执行时间} = \text{时钟周期数量} \times \text{时钟周期} = \frac{\text{时钟周期数量}}{\text{主频}} = \frac{\text{指令条数} \times CPI}{\text{主频}} $$

### 4. MIPS（Million Instructions Per Second）

$$ MIPS = \frac{\text{指令条数}}{\text{执行时间} \times 10^6} = \frac{\text{主频}}{CPI \times 10^6} $$

### 5. 其他性能指标

| 指标 | 含义 | 公式 |
|------|------|------|
| **MFLOPS** | 每秒百万次浮点运算 | 浮点操作数次数/(执行时间×$10^6$) |
| **GFLOPS** | 每秒十亿次浮点运算 | 浮点操作数次数/(执行时间×$10^9$) |
| **TFLOPS** | 每秒万亿次浮点运算 | 浮点操作数次数/(执行时间×$10^{12}$) |
| **字长** | 计算机一次整数运算能处理的二进制位数 | — |
| **数据通路带宽** | 数据总线一次能并行传送的信息位数 | — |
| **主存容量** | 主存储器能存储的信息总量 | — |
| **吞吐量** | 单位时间内完成的工作量 | — |
| **响应时间** | 从任务提交到完成的时间 | — |

## 单位换算

- 1KB = $2^{10}$B = 1024B，1B = 8bit
- 描述速率/频率时：1T = $10^3$G = $10^6$M = $10^9$K

## 典型应用场景

- 比较不同CPU的性能时，不能只看主频高低，还需考虑CPI
- 优化程序执行时间可减少指令条数、降低CPI或提高主频
- 考研常考：给定主频、CPI、指令条数，计算CPU执行时间或MIPS

## 关联概念

- **前置知识**：[冯·诺依曼结构](L3-arch-concept-冯诺依曼结构.md)
- **相关方法**：[CPU性能计算方法](L3-arch-method-CPU性能计算.md)
- **相关习题**：[性能计算习题](L3-arch-exercise-性能计算习题.md)