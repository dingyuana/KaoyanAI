---
id: L3-arch-concept-Cache一致性
title: Cache的一致性问题
subject: arch
type: concept
level: 3
tags: [Cache, 写策略, 一致性, 全写法, 回写法]
related:
  - L3-arch-concept-Cache.md
  - L3-arch-concept-Cache映射方式.md
  - L3-arch-concept-Cache替换算法.md
source_anchors:
  - RAW-arch-3存储系统-3.5.5
  - RAW-arch-3存储系统-Cache写命中
  - RAW-arch-3存储系统-Cache写没命中
created: 2026-06-10
---

# Cache的一致性问题

## 形式化定义

> 引用自 [[RAW-arch-3存储系统-3.5.5]]：

更新策略要解决的问题：如果CPU要向内存写入数据，如何保证Cache中和内存中的内容的一致性？

## 写命中策略

当CPU写操作在Cache中命中时，有两种策略可选：

| 策略 | 描述 | 特点 |
|------|------|------|
| **全写法（写直达法）** | 同时写Cache和主存 | 可靠性高，但写操作慢，总线流量大 |
| **回写法** | 只写Cache不写主存，替换时再写回主存 | 速度快，但需要脏位标记 |

## 写未命中策略

当CPU写操作在Cache中未命中时，有两种策略：

| 策略 | 描述 |
|------|------|
| **写分配法** | 先把主存块调入Cache，然后在Cache中写入 |
| **非写分配法** | 直接写主存，不将该块调入Cache |

## 四种策略搭配

| 组合 | 命中策略 | 未命中策略 | 适用场景 |
|------|---------|-----------|---------|
| 组合1 | 全写法 | 非写分配法 | 简单系统 |
| 组合2 | 全写法 | 写分配法 | 较少使用 |
| 组合3 | 回写法 | 写分配法 | **最常见搭配** |
| 组合4 | 回写法 | 非写分配法 | 较少使用 |

## 典型应用场景

- 组合3（回写法+写分配法）是现代处理器Cache最常用的写策略
- 多核处理器中还需要额外的缓存一致性协议（如MESI协议）

## 关联概念

- **前置知识**：[Cache](L3-arch-concept-Cache.md)
- **相关概念**：[Cache映射方式](L3-arch-concept-Cache映射方式.md)、[Cache替换算法](L3-arch-concept-Cache替换算法.md)