---
id: L3-ds-concept-KMP算法
title: KMP算法
subject: ds
type: concept
level: 3
tags: [KMP, 模式匹配, next数组, 串]
related:
  - L3-ds-concept-串的基本概念.md
  - L3-ds-method-串的模式匹配算法.md
source_anchors:
  - RAW-ds-4串-模式匹配算法-KMP算法
created: 2026-06-10
---

# KMP算法

## 形式化定义

**KMP算法**：一种改进的字符串模式匹配算法，由 Knuth、Morris 和 Pratt 共同提出。其核心是利用匹配失败后的信息，尽量减少模式串与主串的匹配次数，达到 $O(m+n)$ 的时间复杂度。

## 核心思想

- 在 BF 算法中，每次匹配失败主串指针都要回溯
- KMP 算法利用 **next 数组** 记录模式串自身的信息
- 匹配失败时，模式串向右滑动尽可能远的距离，主串指针不回溯

## next 数组

```c
void get_next(String T, int next[]) {
    int i = 1, j = 0;
    next[1] = 0;
    while (i < T.length) {
        if (j == 0 || T.ch[i] == T.ch[j]) {
            ++i;
            ++j;
            next[i] = j;
        } else {
            j = next[j];
        }
    }
}
```

**next[i] 的含义**：当模式串中第 $i$ 个字符匹配失败时，下一次用模式串的第 `next[i]` 个字符与主串的当前位置进行比较。

## KMP匹配算法

```c
int Index_KMP(String S, String T, int next[]) {
    int i = 1, j = 1;
    while (i <= S.length && j <= T.length) {
        if (j == 0 || S.ch[i] == T.ch[j]) {
            ++i;
            ++j;
        } else {
            j = next[j];
        }
    }
    if (j > T.length)
        return i - T.length;
    else
        return 0;
}
```

## 复杂度分析

| 指标 | 值 |
|------|-----|
| 时间复杂度 | $O(m + n)$ |
| 空间复杂度 | $O(m)$ |

其中 $m$ 为模式串长度，$n$ 为主串长度。

## 核心要点

1. **主串指针永不回溯** — 这是 KMP 算法高效的根本原因
2. **next 数组只与模式串有关**，与主串无关
3. 时间复杂度从 BF 的 $O(mn)$ 降低到 $O(m+n)$

## 常见考法

### 考法1：手工计算 next 数组
**解题步骤**：
1. `next[1] = 0`
2. 从第2个字符开始，找其前面的子串的最长相等前后缀长度加1

### 考法2：KMP 匹配过程的模拟
**解题步骤**：
1. 准备好 next 数组
2. 按匹配规则模拟，匹配失败时 j = next[j]

## 关联概念

- **前置知识**：[串的基本概念](L3-ds-concept-串的基本概念.md)
- **对比学习**：[串的模式匹配算法](L3-ds-method-串的模式匹配算法.md) — 包含 BF 和 KMP 的对比

## 注意事项

1. 字符串索引通常从1开始（本书约定），从0开始需要调整next数组
2. KMP的next数组有多种定义版本，注意考试中使用的定义
3. KMP算法在模式串中重复子串较多时效率优势明显