---
id: L3-arch-concept-计算机性能指标CPI
title: 计算机性能指标（CPI、MIPS、CPU执行时间）
subject: arch
type: concept
level: 3
tags: [CPI, MIPS, 性能指标, 系统概述]
related:
  - L3-arch-concept-冯诺依曼结构.md
  - L3-arch-concept-指令流水线.md
source_anchors:
  - RAW-arch-1计算机系统概述-CPI
  - RAW-arch-1计算机系统概述-MIPS
  - RAW-arch-1计算机系统概述-CPU执行时间
created: 2026-06-10
---

# 计算机性能指标

## 形式化定义

> 引用自 [[RAW-arch-1计算机系统概述-CPI]] / [[RAW-arch-1计算机系统概述-MIPS]] / [[RAW-arch-1计算机系统概述-CPU执行时间]]：

**CPI**（Cycles Per Instruction）：执行一条指令所需要的时钟周期数。

$$CPI = \frac{\text{时钟周期数量}}{\text{指令数量}}$$

**CPU执行时间**：
$$\text{执行时间} = \text{时钟周期数量} \times \text{时钟周期} = \frac{\text{时钟周期数量}}{\text{主频}} = \frac{\text{指令条数} \times CPI}{\text{主频}}$$

**MIPS**（Million Instructions Per Second）：
$$MIPS = \frac{\text{指令条数}}{\text{执行时间} \times 10^6} = \frac{\text{主频}}{CPI \times 10^6}$$

## 直观解释

计算机性能指标用来衡量计算机"快不快"。CPI表示每条指令平均需要多少个时钟周期，主频是时钟每秒振动的次数（如3.0GHz），CPU执行时间就是程序实际运行的时间。如果主频高且CPI小，计算机就跑得快。

## 核心要点

1. **CPI**：与系统结构、指令集、计算机组织有关，**与时钟频率无关**
2. **CPU执行时间三要素**：指令条数 × CPI × 时钟周期（或 ÷ 主频）
3. **MIPS**：每秒百万条指令，数值越大性能越好（但不完整，因不同指令复杂度不同）
4. **MFLOPS/GFLOPS/TFLOPS**：衡量浮点运算能力的指标
5. 主频单位换算：1THz = 1000GHz = 10⁶MHz = 10⁹kHz

## 常见考法

### 考法1：CPU执行时间计算
**题目**：某程序有10⁶条指令，平均CPI=2，主频为1GHz，求CPU执行时间。
**解题步骤**：
1. 时钟周期 = 1/主频 = 1/(1×10⁹)s = 1ns
2. 总时钟周期数 = 10⁶ × 2 = 2×10⁶
3. CPU执行时间 = 2×10⁶ × 1ns = 2ms
**答案**：2ms

### 考法2：MIPS计算
**题目**：主频2GHz，CPI=4，求MIPS。
**解题步骤**：
MIPS = 主频/(CPI×10⁶) = 2000/(4) = 500
**答案**：500 MIPS

## 关联概念

- **前置知识**：[冯·诺依曼结构](L3-arch-concept-冯诺依曼结构.md)
- **后续延伸**：[指令流水线](L3-arch-concept-指令流水线.md)

## 注意事项

1. CPI与主频无关，改变主频不影响CPI
2. 指令字长、机器字长、存储字长是不同的概念，不要混淆
3. 描述浮点数操作速度用MFLOPS，描述指令执行速度用MIPS