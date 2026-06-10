---
id: L3-arch-concept-Cache
title: Cache高速缓冲存储器
subject: arch
type: concept
level: 3
tags: [Cache, 存储系统, 局部性原理, 计算机组成原理]
related:
  - L3-arch-concept-Cache映射方式.md
  - L3-arch-concept-Cache替换算法.md
  - L3-arch-concept-Cache一致性.md
  - L3-arch-concept-SRAM与DRAM.md
source_anchors:
  - RAW-arch-3存储系统-3.5
  - RAW-arch-3存储系统-Cache的性能分析
created: 2026-06-10
---

# Cache高速缓冲存储器

## 形式化定义

> 引用自 [[RAW-arch-3存储系统-3.5]]：

Cache（高速缓冲存储器）是存在于主存与CPU之间的一级存储器，CPU可以直接对其存取数据，从而减少访问主存的等待时间，提高系统运行速度。

## 工作原理

### 局部性原理

Cache能够提升存储速度的根本原因是**程序访问的局部性原理**：

| 局部性类型 | 定义 | 典型示例 |
|-----------|------|---------|
| **时间局部性** | 某条指令/数据一旦被执行/访问，不久后可能再次被执行/访问 | 循环代码 |
| **空间局部性** | 访问某个存储单元后，其附近的存储单元也将被访问 | 数组的顺序访问 |

### 信息交互单位

- **CPU与Cache/主存**之间：以**字**为单位
- **Cache与主存**之间：以**块**为单位
- 一个块通常由若干字组成

### 读写过程

**读操作**：CPU先访问Cache，若命中则直接读取；若未命中则从主存读取数据块装入Cache，同时送给CPU。

**写操作**：根据写策略不同，分为写命中与写未命中的多种处理方式（参见Cache一致性概念）。

## 关键参数

### Cache命中率

$$ \text{Cache命中率} = \frac{\text{Cache的总命中次数}}{\text{Cache的总命中次数} + \text{访问主存的总次数}} $$

### 系统平均访问时间

$$ \text{系统平均访问时间} = H \times T_{cache} + (1-H) \times T_{mem} $$

其中 $H$ 为命中率，$T_{cache}$ 为Cache访问时间，$T_{mem}$ 为主存访问时间。

### 性能效率

$$ \text{性能效率} = \frac{\text{访问Cache的时间}}{\text{系统平均访问时间}} $$

## 典型应用场景

- CPU内部的一级缓存(L1)、二级缓存(L2)、三级缓存(L3)
- 采用指令Cache与数据Cache分离，主要目的是**减少指令流水线资源冲突**
- TLB（快表）也是一种特殊形式的Cache

## 关键问题

实现Cache需要解决以下问题：
1. **地址映射**：主存块放到Cache的哪个位置？
2. **替换算法**：Cache满了如何处理？
3. **更新策略**：如何保证Cache和主存内容的一致性？

## 关联概念

- **前置知识**：[SRAM与DRAM](L3-arch-concept-SRAM与DRAM.md) — Cache通常由SRAM实现
- **后续延伸**：[Cache映射方式](L3-arch-concept-Cache映射方式.md)、[Cache替换算法](L3-arch-concept-Cache替换算法.md)、[Cache一致性](L3-arch-concept-Cache一致性.md)