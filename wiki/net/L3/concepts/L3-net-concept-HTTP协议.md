---
id: L3-net-concept-HTTP协议
title: HTTP超文本传输协议
subject: net
type: concept
level: 3
tags: [HTTP, 应用层, 万维网, 无状态]
related:
  - L3-net-concept-DNS域名系统.md
source_anchors: [RAW-net-6应用层-6.5.2超文本传输协议HTTP, RAW-net-6应用层-HTTP操作过程, RAW-net-6应用层-HTTP报文结构]
created: 2026-06-10
---

# HTTP超文本传输协议

## 形式化定义

> 引用自 [[RAW-net-6应用层-6.5.2超文本传输协议HTTP]]：

HTTP（HyperText Transfer Protocol）超文本传输协议，定义了浏览器向服务器请求Web页面的方式，以及服务器向浏览器传送页面的方式。

## HTTP特点

| 特性 | 说明 |
|------|------|
| **使用TCP** | HTTP使用面向连接的TCP作为传输层协议，保证数据的可靠传输（端口80） |
| **无连接** | HTTP协议本身是无连接的 |
| **无状态** | HTTP协议是无状态的，不需要保存客户的状态信息 |

## Cookie技术

Cookie是网站为了辨别用户身份、进行会话跟踪而存储在客户端上的数据。

Cookie的组成：
1. 在HTTP响应报文中的一个cookie首部行
2. 在HTTP请求报文中的一个cookie首部行
3. 在用户端系统中保留一个cookie文件（由浏览器管理）
4. 位于Web站点的一个后端数据库

## HTTP操作过程

1. 浏览器分析URL
2. 浏览器向DNS请求解析域名的IP地址
3. DNS返回IP地址
4. 浏览器与服务器建立TCP连接
5. 浏览器发送HTTP请求报文
6. 服务器发送HTTP响应报文
7. 释放TCP连接
8. 浏览器显示页面

## 持久连接与非持久连接

| 特性 | 非持久连接 | 持久连接 |
|------|-----------|---------|
| 连接标志 | Connection: close | Connection: keep-alive |
| 传输时间 | 文档传输时间 + 2×RTT | 共经历1个RTT延迟 |
| 特点 | 每次请求建立新连接 | 连接复用 |
| 默认方式 | HTTP/1.0 | HTTP/1.1 |

## HTTP报文结构

### 请求报文
```
请求行（方法 URL 版本）
首部行
空行
实体主体
```

### 响应报文
```
状态行（版本 状态码 短语）
首部行
空行
实体主体
```

### 常用HTTP方法
| 方法 | 说明 |
|------|------|
| GET | 请求读取URL标识的信息 |
| POST | 向服务器提交信息 |
| PUT | 上传文件 |
| DELETE | 删除文件 |

### 常见状态码
| 状态码 | 含义 |
|--------|------|
| 200 OK | 请求成功 |
| 301 Moved Permanently | 永久重定向 |
| 400 Bad Request | 请求语法错误 |
| 404 Not Found | 页面未找到 |
| 500 Internal Server Error | 服务器内部错误 |

## 关联概念

- **前置知识**：TCP协议
- **后续延伸**：网络安全

## 注意事项

1. HTTP使用TCP保证可靠传输，但本身是无连接的
2. HTTP/1.1默认使用持久连接
3. HTTP是无状态协议，Cookie用于维持状态