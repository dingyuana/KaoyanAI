---
id: L3-net-method-TCP拥塞控制分析
title: TCP拥塞控制状态分析方法
subject: net
type: method
level: 3
tags: [TCP拥塞控制, 慢开始, 拥塞避免, 快重传, 传输层]
related:
  - L3-net-concept-TCP拥塞控制.md
  - L3-net-exercise-TCP综合习题.md
source_anchors: [RAW-net-5传输层-5.3.6 TCP拥塞控制算法, RAW-net-5传输层-TCP慢开始, RAW-net-5传输层-TCP拥塞避免, RAW-net-5传输层-TCP快重传和快恢复]
created: 2026-06-10
---

# TCP拥塞控制状态分析方法

## 适用场景

当需要分析TCP发送方拥塞窗口（cwnd）随时间的变化过程，判断当前处于哪种拥塞控制阶段，以及在给定条件下计算发送窗口大小时使用。

## 方法步骤

### Step 1: 确定初始状态
- 初始 cwnd = 1（MSS）
- 初始 ssthresh（慢开始门限）= 通常为 16 或题目给定值
- 初始状态 = 慢开始

### Step 2: 判断当前阶段

根据 cwnd 与 ssthresh 的关系判断：

| 条件 | 当前阶段 | 增长方式 |
|------|---------|---------|
| cwnd < ssthresh | 慢开始 | 每经过一个RTT，cwnd加倍 |
| cwnd ≥ ssthresh | 拥塞避免 | 每经过一个RTT，cwnd加1 |

### Step 3: 处理事件

| 事件 | 操作 |
|------|------|
| **超时（丢包）** | ssthresh = cwnd/2（取整），cwnd = 1，重新进入慢开始 |
| **收到3个冗余ACK** | 执行快重传；ssthresh = cwnd/2，cwnd = ssthresh，进入拥塞避免（快恢复） |

### Step 4: 画出cwnd变化曲线

按RTT为横坐标，cwnd为纵坐标，画出阶梯状增长曲线。

## 示例

### 示例1：慢开始 + 拥塞避免
**题目**：ssthresh=16，画出cwnd随RTT的变化曲线（无丢包）

**解题**：
| RTT | cwnd | 阶段 | 说明 |
|-----|------|------|------|
| 1 | 1 | 慢开始 | 初始 |
| 2 | 2 | 慢开始 | 加倍 |
| 3 | 4 | 慢开始 | 加倍 |
| 4 | 8 | 慢开始 | 加倍 |
| 5 | 16 | 慢开始 | cwnd=ssthresh |
| 6 | 17 | 拥塞避免 | 加1 |
| 7 | 18 | 拥塞避免 | 加1 |
| 8 | 19 | 拥塞避免 | 加1 |

### 示例2：出现超时
**题目**：在RTT=8时cwnd=24时发生超时

**解题**：
1. ssthresh = 24/2 = 12
2. cwnd = 1，重新慢开始
3. RTT=9: cwnd=1, RTT=10: cwnd=2, RTT=11: cwnd=4, RTT=12: cwnd=8
4. RTT=13: cwnd=12(cwnd=ssthresh)
5. RTT=14: cwnd=13(进入拥塞避免)

## 注意事项

1. 超时和3个冗余ACK的处理方式不同
2. 超时后cwnd=1，快恢复后cwnd=ssthresh
3. 慢开始是指数增长，拥塞避免是线性增长
4. "乘法减小"指ssthresh减半，适用于超时和快恢复