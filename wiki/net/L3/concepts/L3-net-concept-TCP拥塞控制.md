---
id: L3-net-concept-TCP拥塞控制
title: TCP流量控制与拥塞控制
subject: net
type: concept
level: 3
tags: [TCP, 拥塞控制, 流量控制, 滑动窗口, 慢开始]
related:
  - L3-net-concept-TCP协议概述.md
  - L3-net-concept-TCP三次握手.md
  - L3-net-method-TCP拥塞控制分析.md
source_anchors: [RAW-net-5传输层-5.3.5 TCP流量控制, RAW-net-5传输层-5.3.6 TCP拥塞控制算法, RAW-net-5传输层-TCP慢开始, RAW-net-5传输层-TCP拥塞避免, RAW-net-5传输层-TCP快重传和快恢复]
created: 2026-06-10
---

# TCP流量控制与拥塞控制

## 形式化定义

> 引用自 [[RAW-net-5传输层-5.3.5 TCP流量控制]] 和 [[RAW-net-5传输层-5.3.6 TCP拥塞控制算法]]：

**流量控制**：使发送方的发送速率与接收方应用程序的读取速率相匹配。**拥塞控制**：防止过多的数据注入网络，保证网络中的路由器或链路不致过载。

## 流量控制

### 滑动窗口机制
- TCP利用滑动窗口机制实现对发送方的流量控制
- 窗口单位是**字节**

### 窗口计算
发送窗口上限 = $\min(rwnd, cwnd)$

| 窗口类型 | 说明 |
|---------|------|
| **拥塞窗口 cwnd** | 发送方根据当前网络拥塞程度估计而确认的窗口值 |
| **接收窗口 rwnd** | 接收方根据自己接收缓存的大小，动态调整的发送方窗口大小 |

## 拥塞控制算法

TCP拥塞控制包含四种算法：慢开始、拥塞避免、快重传、快恢复。

### 慢开始（Slow Start）

| 条件 | 行为 |
|------|------|
| cwnd < ssthresh | 使用慢开始算法 |
| 增长方式 | cwnd按指数规律增长（每经过一个RTT，cwnd加倍） |

### 拥塞避免（Congestion Avoidance）

| 条件 | 行为 |
|------|------|
| cwnd ≥ ssthresh | 使用拥塞避免算法 |
| 增长方式 | cwnd每次增加1（线性增长） |
| 超时处理 | ssthresh = cwnd/2，cwnd=1，重新慢开始 |

### 快重传（Fast Retransmit）

| 条件 | 行为 |
|------|------|
| 连续收到3个冗余ACK | 直接重传对方尚未收到的报文段 |
| 优点 | 不必等待重传计时器超时 |

### 快恢复（Fast Recovery）

| 条件 | 行为 |
|------|------|
| 连续收到3个冗余ACK | 执行"乘法减小"算法 |
| 操作 | ssthresh = cwnd/2，cwnd = ssthresh |
| 后续 | 从拥塞避免阶段开始 |

## 拥塞控制状态转换

```
cwnd指数增长                  cwnd线性增长
  慢开始  ─────────→  拥塞避免  ────────→ ...
    ↑                        ↑
    │          超时           │  3个冗余ACK
    │   (ssthresh=cwnd/2     │  (ssthresh=cwnd/2
    │    cwnd=1)             │   cwnd=ssthresh)
    └─────────────────────────┘
               快恢复
```

## 关联概念

- **前置知识**：[TCP协议概述](L3-net-concept-TCP协议概述.md)
- **后续延伸**：[TCP拥塞控制分析方法](L3-net-method-TCP拥塞控制分析.md)

## 注意事项

1. 流量控制和拥塞控制是不同的概念：流量控制解决端到端问题，拥塞控制解决网络整体问题
2. 发送方窗口由min(cwnd, rwnd)决定
3. 超时是判断网络拥塞的主要依据
4. 快重传和快恢复通常成对出现