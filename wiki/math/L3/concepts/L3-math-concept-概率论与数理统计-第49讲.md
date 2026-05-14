---
id: L3-math-concept-概率论与数理统计-第49讲
title: 概率论与数理统计-第49讲
subject: math
type: concept
level: 3
tags: ['概率论与数理统计']
source_anchors: ['RAW-math-概率论-P072-concept']
created: 2026-05-09
---

> 引用自 [[RAW-math-概率论-P072-concept]]

# 概率论与数理统计-第49讲

**来源：** 概率论与数理统计第49讲

```markdown
# 概率论与数理统计-第49讲：参数估计与假设检验

## 核心概念定义
参数估计是利用样本信息对总体参数进行估计的方法。假设检验则是根据样本数据判断总体参数是否属于某个假设范围的方法。

## 核心公式
```latex
D(\hat{\theta}) = \lim_{n \to \infty} P\{| \hat{\theta} - \theta | \geq \epsilon \} = 0 \quad \text{或} \quad \lim_{n \to \infty} P\{| \hat{\theta} - \theta_k | \geq \epsilon \} = 1
```

## 典型例题
**例9.7** 设 \(X_1, X_2, \ldots, X_n\) 独立同分布，\(X_i\) 可取且只可取4个不同数值，且相应的取值概率分别为 \(p_1, p_2, p_3, p_4\)。记 \(N_i\) 为从总体抽取的 \(n\) 个样本中出现4个不同数值所对应的个数。

(1) 确定系数 \(a_1, a_2, a_3, a_4\)，使 \(T = 2a_1N_1 + 2a_2N_2 + 2a_3N_3 + 2a_4N_4\) 为 \(\theta\) 的无偏估计。

(2) 若 \(N_1 + N_2 + N_3 + N_4 = n\)，求 \(\theta\) 的最大似然估计值。

**解**：

(1) 由于 \(N_i \sim B(n, p)\)，\(i = 1, 2, 3, 4\)，因此 \(E(N_i) = np\)，从而有
\[ E(T) = \sum_{i=1}^4 a_i E(N_i) = a_1n(1-\theta) + a_2n(\theta_1-\theta_2) + a_3n(\theta_2-\theta_3) + a_4n(\theta_3-\theta_4) \]
若使 \(T\) 为 \(\theta\) 的无偏估计，即要求
\[ E(T) = \theta \]
解得
\[ a_1 = 0, a_2 = a_3 = a_4 = 1 \]
即 \(T = N_1 + N_2 + N_3 + N_4\) 是 \(\theta\) 的无偏估计。

(2) 由题意，有 \(N_1 + N_2 + N_3 + N_4 = n\)，且似然函数为
\[ L(\theta) = (1-\theta)^{n_1}(\theta_1-\theta_2)^{n_2}(\theta_2-\theta_3)^{n_3}(\theta_3-\theta_4)^{n_4} = (1-\theta)^2 \]
取对数得
\[ \ln L(\theta) = n_1 \ln(1-\theta) + n_2 \ln(\theta_1-\theta_2) + n_3 \ln(\theta_2-\theta_3) + n_4 \ln(\theta_3-\theta_4) \]
对 \(\theta\) 求导，有
\[ \frac{d}{d\theta} \ln L(\theta) = \frac{n_1}{1-\theta} + \frac{n_2}{\theta_1-\theta_2} + \frac{n_3}{\theta_2-\theta_3} + \frac{n_4}{\theta_3-\theta_4} \]
令 \(\frac{d}{d\theta} \ln L(\theta) = 0\)，解得
\[ \theta = \frac{n_1 + n_2 + n_3 + n_4}{n_1 + n_2 + n_3 + n_4} \]
则 \(\theta\) 的最大似然估计值为
\[ \hat{\theta} = \frac{n_1 + n_2 + n_3 + n_4}{n_1 + n_2 + n_3 + n_4} \]

## 常见错误
1. 在求无偏估计时，未正确计算期望值。
2. 在求最大似然估计时，未正确计算似然函数及其导数。
3. 在使用大数定律时，未正确理解其含义和应用条件。
