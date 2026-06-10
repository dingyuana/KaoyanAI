---
id: L3-net-concept-MAC地址与ARP协议
title: MAC地址与ARP协议
subject: net
type: concept
level: 3
tags: [MAC地址, ARP, 数据链路层, 地址解析]
related:
  - L3-net-concept-CSMA-CD协议.md
source_anchors: [RAW-net-3数据链路层-3.6.2 MAC地址, RAW-net-3数据链路层-3.6.2 ARP（address resolution protocol）协议, RAW-net-3数据链路层-ARP主要内容, RAW-net-3数据链路层-ARP过程]
created: 2026-06-10
---

# MAC地址与ARP协议

## 形式化定义

> 引用自 [[RAW-net-3数据链路层-3.6.2 MAC地址]] 和 [[RAW-net-3数据链路层-3.6.2 ARP协议]]：

MAC地址（Media Access Control Address）是以太网中用于标识网络设备接口的硬件地址，长度为48位（6字节）。ARP协议（Address Resolution Protocol）用于将IP地址解析为MAC地址。

## MAC地址

### 基本概述
- MAC地址长度为48bit（6字节），通常表示为12个十六进制数（如 00-1A-2B-3C-4D-5E）
- 前24位是厂商代码（OUI），后24位是厂商分配的扩展标识符
- MAC地址具有**全球唯一性**
- 硬件地址只具有本地意义

### IEEE 802局域网的MAC地址发送顺序
- 第一个字节的最低位是I/G位：0表示单播地址，1表示组播/广播地址
- 广播MAC地址：ff-ff-ff-ff-ff-ff

### IEEE 802.11局域网的MAC地址格式
- 无线局域网帧中有3个地址字段：RA（接收端地址）、TA（发送端地址）、DA（目的地址）

## ARP协议

### ARP作用
- 实现IP地址到MAC地址的映射
- ARP的作用范围是：**逐段链路或逐个网络（子网）**

### ARP特点
| 特性 | 说明 |
|------|------|
| ARP请求 | **广播发送**（目的MAC地址为 ff-ff-ff-ff-ff-ff） |
| ARP响应 | **单播发送** |
| 内容 | 请求获取目标IP地址对应的MAC地址 |
| 缓存 | 使用ARP高速缓存存储IP-MAC映射 |

### ARP工作过程

**目的主机在本局域网：**
1. 先在ARP高速缓存中查看有无目的IP地址与MAC地址的映射
2. 有：直接写入MAC帧发送
3. 无：广播ARP请求分组，获得ARP响应后写入缓存

**目的主机不在本局域网：**
1. 将IP分组发送给本局域网的路由器
2. 通过ARP获得路由器的IP地址和硬件地址的映射关系

### ARP协议的重要性质
- 路由器在收到分组后，剥离链路层协议头，在转发前加上新链路层协议头
- 路由器转发时需重新封装源硬件地址和目的硬件地址
- ARP协议工作在数据链路层和网络层之间

## 关联概念

- **前置知识**：以太网帧格式
- **后续延伸**：以太网交换机

## 注意事项

1. MAC地址是数据链路层的地址，IP地址是网络层的地址
2. ARP请求是广播，ARP响应是单播
3. 路由器转发时会重新封装MAC地址
4. ARP高速缓存会老化更新