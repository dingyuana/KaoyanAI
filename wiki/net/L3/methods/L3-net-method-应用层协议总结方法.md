---
title: 应用层协议总结方法
subject: net
type: method
level: 3
tags: [应用层, HTTP, DNS, FTP, SMTP, 域名系统]
related:
  - concepts/L3-net-concept-HTTP协议.md
  - concepts/L3-net-concept-DNS域名系统.md
  - concepts/L3-net-concept-电子邮件系统.md
source: RAW/6 应用层/
created: 2026-06-19
---

# 应用层协议总结方法

## 适用场景

应用层协议是408计算机网络的常考内容，需要掌握：
- DNS域名解析过程
- HTTP协议（持久连接、非持久连接）
- FTP协议（控制连接、数据连接）
- 电子邮件协议（SMTP、POP3、IMAP）

## DNS域名解析

### 递归查询 vs 迭代查询

| 类型 | 特点 | 客户端负担 |
|------|------|-----------|
| 递归查询 | DNS服务器代替客户端查询 | 小 |
| 迭代查询 | DNS服务器返回其他DNS地址 | 大 |

### DNS记录类型

| 类型 | 作用 | 备注 |
|------|------|------|
| A | 域名→IPv4地址 | 最常见 |
| AAAA | 域名→IPv6地址 | IPv6 |
| CNAME | 别名→正式名 |  alias → canonical |
| MX | 邮件交换器 | 邮件服务器优先级 |
| NS | 域名服务器 | 指定权威服务器 |
| SOA | 起始授权记录 | 域名管理信息 |

## HTTP协议

### HTTP 1.0 vs 1.1

| 特性 | HTTP 1.0 | HTTP 1.1 |
|------|---------|---------|
| 持久连接 | 非持久 | 默认持久 |
| 管道化 | 不支持 | 支持 |
| 缓存 | 基础 | 强缓存/协商缓存 |
| 断点续传 | 不支持 | 支持 |

### HTTP请求方法

| 方法 | 作用 | 幂等性 |
|------|------|--------|
| GET | 获取资源 | 幂等 |
| POST | 提交数据 | 非幂等 |
| PUT | 上传资源 | 幂等 |
| DELETE | 删除资源 | 幂等 |
| HEAD | 获取元数据 | 幂等 |

### 状态码

| 类别 | 含义 | 示例 |
|------|------|------|
| 1xx | 信息 | 100 Continue |
| 2xx | 成功 | 200 OK, 204 No Content |
| 3xx | 重定向 | 301 Moved, 304 Not Modified |
| 4xx | 客户端错误 | 400 Bad Request, 404 Not Found |
| 5xx | 服务器错误 | 500 Internal Error, 503 Service Unavailable |

## FTP协议

### 连接类型

| 连接 | 端口 | 方向 | 作用 |
|------|------|------|------|
| 控制连接 | 21 | 始终保持 | 传输命令和响应 |
| 数据连接 | 20（主动）/ 随机（被动） | 按需建立 | 传输数据 |

### FTP命令

- USER：用户名
- PASS：密码
- LIST：列目录
- RETR：下载
- STOR：上传
- QUIT：退出

## 电子邮件协议

### 协议对比

| 协议 | 端口 | 特点 |
|------|------|------|
| SMTP | 25 | 发送邮件，推模型 |
| POP3 | 110 | 拉模型，下载后删除 |
| IMAP | 143 | 同步，在服务器管理 |

### 邮件格式

```
From: sender@example.com
To: receiver@example.com
Subject: 邮件主题
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8

邮件正文...
```

## 学习建议

1. **DNS递归vs迭代**：理解客户端和服务器的负担分配
2. **HTTP持久连接**：1.1默认复用TCP连接
3. **FTP两个连接**：控制连接21，数据连接20
4. **邮件协议区别**：SMTP发送，POP3/IMAP接收
