---
id: L3-os-exercise-PV操作经典习题
title: PV操作经典同步互斥习题
subject: os
type: exercise
level: 3
tags: [PV操作, 同步, 互斥, 信号量, 408真题]
difficulty: 困难
related:
  - L3-os-concept-信号量与PV操作.md
  - L3-os-concept-进程同步互斥.md
  - L3-os-method-PV操作实现同步互斥.md
created: 2026-06-10
---

# PV操作经典同步互斥习题

## 题目列表

### 题目1：生产者-消费者问题
**来源**：408真题
**难度**：中等
**考点**：有限缓冲区的生产者消费者同步

**题目**：
系统中有多个生产者和多个消费者，共享一个大小为 n 的环形缓冲区。请用信号量机制实现生产者和消费者之间的同步与互斥。

要求：
- 生产者将产品放入缓冲区，消费者从缓冲区取出产品
- 缓冲区满时生产者等待，缓冲区空时消费者等待
- 多个生产者和消费者不能同时操作缓冲区

**解析**：

```c
// 信号量定义
semaphore mutex = 1;       // 互斥访问缓冲区
semaphore empty = n;       // 空闲缓冲区数量
semaphore full = 0;        // 已用缓冲区数量

// 生产者进程
void producer() {
    while (true) {
        produce_item();          // 生产一个产品
        P(empty);                // 申请一个空缓冲区
        P(mutex);                // 互斥访问缓冲区
        buffer[in] = item;       // 放入缓冲区
        in = (in + 1) % n;
        V(mutex);                // 释放互斥
        V(full);                 // 增加一个满缓冲区
    }
}

// 消费者进程
void consumer() {
    while (true) {
        P(full);                 // 申请一个满缓冲区
        P(mutex);                // 互斥访问缓冲区
        item = buffer[out];      // 从缓冲区取出
        out = (out + 1) % n;
        V(mutex);                // 释放互斥
        V(empty);                // 增加一个空缓冲区
        consume_item(item);      // 消费产品
    }
}
```

**关键点**：
- P(empty) 和 P(full) 必须在 P(mutex) 之前，否则可能死锁
- 生产者和消费者对称设计

---

### 题目2：读者-写者问题（读者优先）
**来源**：408真题
**难度**：中等
**考点**：读者优先的读写同步

**题目**：
多个读者和写者共享一个数据区。读者可以同时读取，但写者必须独占访问。实现读者优先的同步机制（只要有一个读者在读，后续读者可直接进入，写者必须等待所有读者离开）。

**解析**：

```c
semaphore rw_mutex = 1;    // 读写互斥信号量
semaphore mutex = 1;       // 保护 read_count
int read_count = 0;        // 当前读者数量

// 读者
void reader() {
    while (true) {
        P(mutex);
        read_count++;
        if (read_count == 1) P(rw_mutex);  // 第一个读者锁住写者
        V(mutex);
        
        // 读取数据...
        read_data();
        
        P(mutex);
        read_count--;
        if (read_count == 0) V(rw_mutex);  // 最后一个读者释放写者
        V(mutex);
    }
}

// 写者
void writer() {
    while (true) {
        P(rw_mutex);           // 申请写权限
        write_data();          // 写入数据
        V(rw_mutex);           // 释放写权限
    }
}
```

**关键点**：
- 读者优先：只要有人在读，写者就一直被阻塞
- 可能导致写者饥饿（大量读者持续进入）

---

### 题目3：哲学家进餐问题
**来源**：408真题
**难度**：困难
**考点**：避免死锁的同步设计

**题目**：
5 个哲学家围坐圆桌，每两人之间放一根筷子。哲学家思考时不需要筷子，进餐时必须同时拿取左右两根筷子。请设计无死锁的 PV 操作方案。

**解析**：

```c
// 方案：限制最多4人同时进餐 + 奇偶拿筷顺序

semaphore chopstick[5] = {1, 1, 1, 1, 1};
semaphore eat_limit = 4;    // 最多4人同时进餐

// 哲学家 i (0~4)
void philosopher(int i) {
    while (true) {
        think();
        
        P(eat_limit);           // 限制并发进餐人数
        
        // 奇偶拿筷策略：避免循环等待
        if (i % 2 == 0) {
            P(chopstick[i]);           // 先拿左筷
            P(chopstick[(i+1) % 5]);   // 再拿右筷
        } else {
            P(chopstick[(i+1) % 5]);   // 先拿右筷
            P(chopstick[i]);           // 再拿左筷
        }
        
        eat();
        
        V(chopstick[i]);               // 放下左筷
        V(chopstick[(i+1) % 5]);       // 放下右筷
        V(eat_limit);
    }
}
```

**关键点**：
- 方案一：限制最多4人同时进餐 → 至少1人能拿到两根筷子
- 方案二：奇偶拿筷顺序 → 破坏循环等待条件
- 两种方案都能防止死锁

## 考点分布
| 考点 | 题目数量 | 占比 |
|------|---------|------|
| 生产者消费者 | 1 | 33% |
| 读者写者 | 1 | 33% |
| 哲学家进餐 | 1 | 33% |

## 学习建议
1. 牢记 PV 操作的模板代码
2. 理解信号量初始值的意义
3. PV 操作的顺序不能随意调换