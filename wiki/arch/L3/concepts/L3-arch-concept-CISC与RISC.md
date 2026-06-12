---
id: L3-arch-concept-CISC与RISC
title: CISC与RISC的比较
subject: arch
type: concept
level: 3
tags: [CISC, RISC, 指令系统]
related:
  - L3-arch-concept-指令格式与寻址方式.md
  - L3-arch-concept-扩展操作码.md
source_anchors:
  - RAW-arch-4指令系统-CISC
  - RAW-arch-4指令系统-RISC
  - RAW-arch-4指令系统-CISC与RISC比较
created: 2026-06-10
---

# CISC与RISC的比较

## 形式化定义

> 引用自 [[RAW-arch-4指令系统-CISC]] / [[RAW-arch-4指令系统-RISC]] / [[RAW-arch-4指令系统-CISC与RISC比较]]：

**CISC**（Complex Instruction Set Computer）—— 复杂指令系统计算机
**RISC**（Reduced Instruction Set Computer）—— 精简指令系统计算机

## 对比表格

| 对比项 | CISC | RISC |
|--------|------|------|
| 指令系统 | 复杂、庞大 | 简单、精简 |
| 指令数目 | 一般大于200条 | 一般小于100条 |
| 指令字长 | 不固定 | 定长 |
| 可访存指令 | 不加限制 | 只有Load/Store指令 |
| 各种指令执行时间 | 相差较大 | 绝大多数在一个周期内完成 |
| 各种指令使用频度 | 相差很大 | 都比较常用 |
| 通用寄存器数量 | 较少 | 多 |
| 目标代码 | 难以用优化编译生成高效代码 | 采用优化编译，代码较高效 |
| 控制方式 | 绝大多数为微程序控制 | 绝大多数为组合逻辑控制 |
| 指令流水线 | 可以通过一定方式实现 | 必须实现 |

## RISC相比于CISC的优点

1. **更能充分利用VLSI芯片的面积**
2. **更能提高运算速度**
3. **便于设计**，可降低成本，提高可靠性
4. **有利于编译程序代码优化**
5. x86处理器属于CISC

## 核心要点

1. CISC的代表：x86架构；RISC的代表：ARM、MIPS、RISC-V
2. RISC采用Load/Store架构，只有加载和存储指令访问内存
3. RISC必须实现流水线，且绝大多数指令一周期完成
4. 现代CISC处理器（如x86）内部也采用RISC微操作设计

## 常见考法

### 考法1：CISC与RISC对比
**题目**：以下哪个不属于RISC的特点？
A. 指令条数少  B. 采用微程序控制  C. 采用Load/Store架构  D. 指令定长
**答案**：B（RISC采用组合逻辑控制）

### 考法2：指令访存限制
**题目**：RISC中只有哪两种指令可以访问内存？
**答案**：Load（加载）和Store（存储）指令

## 关联概念

- **前置知识**：[指令格式与寻址方式](L3-arch-concept-指令格式与寻址方式.md)
- **后续延伸**：[指令流水线](L3-arch-concept-指令流水线.md)

## 注意事项

1. x86虽然是CISC，但现代x86内部将复杂指令翻译为微操作（类似RISC的核心）
2. RISC的"精简"是指指令种类少、格式规整，而非功能弱