---
id: L3-math-concept-变上限积分一型
title: 变上限积分一型
subject: math
type: concept
level: 3
tags: []
source_anchors:
  - RAW-math-高数-P084-concept
created: 2026-05-09
---

> 引用自 [[RAW-math-高数-P084-concept]]

# 变上限积分一型

# 变上限积分一型

## 元数据

| 属性 | 值 |
|------|-----|
| 章节 | 2026 张宇高数 18讲 - 第1讲 函数极限与连续 |
| 难度 | ★★☆☆☆ |
| 分类 | 等价无穷小 |


## 1 概念定义

### 变上限积分一型

当 $x \to 0$ 时，若函数 $f(x) \sim ax^m$（其中 $a \neq 0$，$m$ 为正整数），则：

$$\int_0^x f(t)\,dt \sim a\int_0^x t^m\,dt = \frac{a}{m+1}x^{m+1}$$

> **核心思想**：在等价无穷小意义下，积分运算与系数保持一致。


### 变上限积分二型

若 $\lim\limits_{x \to 0} f(x) = A \neq 0$，$\lim\limits_{x \to 0} h(x) = 0$，且在 $x \to 0$ 时 $h(x) \neq 0$，则：

$$\int_0^{h(x)} f(t)\,dt \sim A \cdot h(x)$$

> **核心思想**：当被积函数极限存在且非零时，积分结果等价于该常数与积分上限的乘积。


### 复合函数与变上限积分型

当 $x \to 0$ 时，$f(x) \sim ax^m$，$g(x) \sim bx^n$（其中 $ab \neq 0$，$m,n$ 为正整数），则：

$$\int_0^{g(x)} f(t)\,dt \sim \frac{a \cdot b^{m+1}}{m+1} \cdot x^{m+n+1}$$


## 2 核心公式

### 公式一：变上限积分一型

$$\boxed{\int_0^x f(t)\,dt \sim \frac{a}{m+1}x^{m+1} \quad \text{当 } f(x) \sim ax^m}$$

### 公式二：变上限积分二型

$$\boxed{\int_0^{h(x)} f(t)\,dt \sim A \cdot h(x) \quad \text{当 } \lim_{x \to 0}f(x) = A \neq 0}$$

### 公式三：复合函数型

$$\boxed{\int_0^{g(x)} f(t)\,dt \sim \frac{a \cdot b^{m+1}}{m+1} \cdot x^{m+n+1} \quad \text{当 } \begin{cases} f(x) \sim ax^m \\ g(x) \sim bx^n \end{cases}}$$


## 3 典型例题

### 例题：计算等价无穷小

**题目**：当 $x \to 0$ 时，求 $\displaystyle\int_0^{\sin x} e^{t^2}\,dt$ 的等价无穷小。

**解答**：

**第一步**：分析各部分的等价关系

- $e^{t^2} = 1 + t^2 + o(t^2)$，故 $e^{t^2} \sim 1$（当 $t \to 0$）
- $\sin x \sim x$（当 $x \to 0$）

**第二步**：应用变上限积分二型公式

由于 $\lim\limits_{t \to 0} e^{t^2} = 1 \neq 0$，$h(x) = \sin x \to 0$，根据公式二：

$$\int_0^{\sin x} e^{t^2}\,dt \sim 1 \cdot \sin x \sim x$$

**第三步**：结论

$$\int_0^{\sin x} e^{t^2}\,dt \sim x \quad (x \to 0)$$


## 4 常见错误

| 错误类型 | 错误示例 | 正确做法 |
|----------|----------|----------|
| 忘记积分系数 | $\int_0^x t\,dt \sim x$ | $\int_0^x t\,dt \sim \frac{x^2}{2}$ |
| 混淆上限函数 | $\int_0^{x^2} t\,dt \sim \frac{x^2}{2}$ | $\int_0^{x^2} t\,dt \sim \frac{(x^2)^2}{2} = \frac{x^4}{2}$ |
| 未判断条件 | 对非 $f \to 0$ 情形直接套用一型 | 先判断 $f(x)$ 的等价无穷小形式 |
| 忽略正实数情形 | 对 $m \in \mathbb{R}^+$ 直接用 $x \to 0$ | 当 $m$ 为正实数时，需 $x \to 0^+$ |


## 5 关联知识点

```mindmap
变上限积分一型
├── 等价无穷小
│   ├── 等价替换原则
│   └── 常见等价关系 (e^x-1~x, sin x~x, etc.)
├── 变上限积分
│   ├── 求导公式 ( Leibniz公式 )
│   └── 积分中值定理
├── 两个重要极限
│   ├── $\lim_{x \to 0}\frac{\sin x}{x} = 1$
│   └── $\lim_{x \to 0}(1+x)^{\frac{1}{x}} = e$
└── 泰勒公式
    └── 带佩亚诺余项的麦克劳林展开
```


## 6 备注与补充

> **注1**：对于变上限积分一型，若 $m$ 为正实数（而非正整数），则要求 $x \to 0^+$，此时命题依然成立。

> **注2**：变上限积分二型本质上是**积分第一中值定理**的极限形式：
> $$\lim_{x \to 0} \frac{\int_0^{h(x)} f(t)\,dt}{h(x)} = f(\xi) \to f(0) = A$$

> **注3**：复合函数型可视为一型和二型的组合应用。