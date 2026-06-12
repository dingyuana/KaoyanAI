---
id: L3-os-method-银行家算法
title: 银行家算法
subject: os
type: method
level: 3
tags: [银行家算法, 死锁避免, 安全性算法, 考研408]
related:
  - L3-os-concept-死锁.md
  - L3-os-exercise-银行家算法.md
source_anchors:
  - RAW-os-2进程与线程-2.4.3
  - RAW-os-2进程与线程-安全性算法和银行家算法举例
created: 2026-06-10
---

# 银行家算法

## 适用场景

当系统中有多个进程竞争有限资源时，银行家算法用于**死锁避免**。操作系统在分配资源前，检查分配后系统是否处于安全状态，仅当安全时才分配资源。

## 方法步骤

### 第一步：数据结构初始化

定义四个数据结构：
- **Available[m]**：系统可用各类资源的数量（m种资源类型）
- **Max[n][m]**：每个进程对各资源的最大需求
- **Allocation[n][m]**：已分配给每个进程的各资源数量
- **Need[n][m]**：每个进程还需要的各资源数量（Need = Max - Allocation）

### 第二步：资源请求检查

当进程Pi请求资源Request[j]时：

1. 若Request[j] ≤ Need[i][j]，转2；否则出错（超过声明需求）
2. 若Request[j] ≤ Available[j]，转3；否则进程等待
3. **试探性分配**：
   ```
   Available[j] -= Request[j]
   Allocation[i][j] += Request[j]
   Need[i][j] -= Request[j]
   ```
4. 执行**安全性算法**检查是否安全：
   - 安全 → 正式分配
   - 不安全 → 回滚分配，进程等待

### 第三步：安全性算法

1. 设置Work = Available，Finish[n] = {false}
2. 找满足 Finish[i]=false 且 Need[i] ≤ Work 的进程Pi
3. 若找到：
   - Work += Allocation[i]
   - Finish[i] = true
   - 重复步骤2
4. 若所有进程的Finish[i]=true，则系统处于安全状态；否则不安全

## 示例

**问题**：系统中有5个进程P0-P4，3类资源A(10个)、B(5个)、C(7个)。

当前状态：
```
          Max       Allocation      Need      Available
        A  B  C     A  B  C       A  B  C      A  B  C
P0      7  5  3     0  1  0       7  4  3      3  3  2
P1      3  2  2     2  0  0       1  2  2
P2      9  0  2     3  0  2       6  0  0
P3      2  2  2     2  1  1       0  1  1
P4      4  3  3     0  0  2       4  3  1
```

**安全性检查**：
1. Work=[3,3,2] → P1(Need=[1,2,2])满足 → Work=[5,3,2]
2. Work=[5,3,2] → P3(Need=[0,1,1])满足 → Work=[7,4,3]
3. Work=[7,4,3] → P4(Need=[4,3,1])满足 → Work=[7,4,5]
4. Work=[7,4,5] → P0(Need=[7,4,3])满足 → Work=[7,5,5]
5. Work=[7,5,5] → P2(Need=[6,0,0])满足 → Work=[10,5,7]

安全序列：P1→P3→P4→P0→P2，系统安全。

## 注意事项

1. 银行家算法是**死锁避免**算法，不是死锁预防
2. 需要预先知道每个进程的最大资源需求
3. 安全性算法的核心是找到一组安全序列
4. 不安全状态不一定死锁，但死锁一定在不安全状态

## 失效情况

- 进程数量多、资源种类多时，算法复杂度高
- 需要进程事先声明最大需求（实际系统难实现）
- 替代方法：死锁检测+解除（允许死锁发生，检测到后解除）