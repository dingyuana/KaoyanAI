---
id: L3-net-concept-TCP三次握手
title: TCP三次握手与四次挥手
subject: net
type: concept
level: 3
tags: [TCP, 三次握手, 四次挥手, 连接管理, 传输层]
related:
  - L3-net-concept-TCP协议概述.md
  - L3-net-concept-TCP拥塞控制.md
source_anchors: [RAW-net-5传输层-5.3.3 TCP连接（三次握手）, RAW-net-5传输层-5.3.3 TCP连接释放（四次握手）, RAW-net-5传输层-TCP三次握手, RAW-net-5传输层-TCP四次握手]
created: 2026-06-10
---

# TCP三次握手与四次挥手

## 形式化定义

> 引用自 [[RAW-net-5传输层-5.3.3 TCP连接（三次握手）]] 和 [[RAW-net-5传输层-5.3.3 TCP连接释放（四次握手）]]：

TCP三次握手是建立TCP连接的过程，四次挥手是释放TCP连接的过程。这两个过程共同构成了TCP的连接管理机制。

## TCP三次握手

### 握手过程

```
客户端                        服务器
   |                            |
   |------SYN=1, seq=x--------->|  第一次握手
   |                            |
   |<---SYN=1, ACK=1, ack=x+1, seq=y---|  第二次握手
   |                            |
   |------ACK=1, seq=x+1, ack=y+1----->|  第三次握手
   |                            |
```

### 状态转换

| 步骤 | 发送方 | 接收方 | 报文 | 状态变化 |
|------|--------|--------|------|---------|
| **第一次握手** | 客户端 | 服务器 | SYN=1, seq=x | CLOSED→SYN-SENT |
| **第二次握手** | 服务器 | 客户端 | SYN=1, ACK=1, ack=x+1, seq=y | LISTEN→SYN-RCVD |
| **第三次握手** | 客户端 | 服务器 | ACK=1, seq=x+1, ack=y+1 | SYN-SENT→ESTABLISHED, SYN-RCVD→ESTABLISHED |

### 要点
1. SYN=1的报文段不能携带数据，但需要消耗一个序号
2. 第二次握手中，服务器同时发送SYN和ACK
3. 第三次握手中，客户端可以对服务器确认报文进行确认，可以携带数据
4. 服务器在第二次握手后分配缓存和变量，客户端在第三次握手后分配缓存和变量

## TCP四次挥手（连接释放）

### 挥手过程

```
客户端                        服务器
   |                            |
   |------FIN=1, seq=u--------->|  第一次挥手
   |                            |
   |<------ACK=1, ack=u+1, seq=v-----|  第二次挥手
   |                            |
   |<------FIN=1, ACK=1, seq=w, ack=u+1---|  第三次挥手
   |                            |
   |------ACK=1, ack=w+1, seq=u+1----->|  第四次挥手
   |                            |
```

### 状态转换

| 步骤 | 发送方 | 接收方 | 报文 | 状态变化 |
|------|--------|--------|------|---------|
| **第一次挥手** | 客户端 | 服务器 | FIN=1, seq=u | ESTABLISHED→FIN-WAIT-1 |
| **第二次挥手** | 服务器 | 客户端 | ACK=1, ack=u+1, seq=v | ESTABLISHED→CLOSE-WAIT, FIN-WAIT-1→FIN-WAIT-2 |
| **第三次挥手** | 服务器 | 客户端 | FIN=1, ack=u+1, seq=w | CLOSE-WAIT→LAST-ACK |
| **第四次挥手** | 客户端 | 服务器 | ACK=1, ack=w+1, seq=u+1 | FIN-WAIT-2→TIME-WAIT→CLOSED, LAST-ACK→CLOSED |

### 要点
1. 第一次挥手后，客户端不能再发送数据（但可以接收数据）
2. 第二次挥手后，TCP连接进入**半关闭状态**
3. 第三次挥手时，服务器可能已经发送了更多数据（seq=w≥v）
4. 第四次挥手后，客户端进入TIME-WAIT状态，等待**2MSL**（最大报文段寿命）

## 关联概念

- **前置知识**：[TCP协议概述](L3-net-concept-TCP协议概述.md)
- **后续延伸**：[TCP拥塞控制](L3-net-concept-TCP拥塞控制.md)

## 注意事项

1. 第三次握手可以携带数据，前两次不能
2. TIME-WAIT状态等待2MSL是为了确保最后一个ACK能被服务器收到
3. 服务器可能遭受SYN洪泛攻击（半连接攻击）
4. TCP连接释放需要四次交互，而建立只需要三次