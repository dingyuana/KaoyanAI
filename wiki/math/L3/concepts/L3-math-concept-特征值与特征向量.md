---
id: L3-math-concept-特征值与特征向量
title: 特征值与特征向量
subject: math
type: concept
level: 3
tags: ['线性代数']
source_anchors:
  - RAW-math-线代-P013-concept
related: []
created: 2026-05-09
---

> 引用自 [[RAW-math-线代-P013-concept]]

# 特征值与特征向量

来源: 2026张宇《线代9讲》

  - 特征值
  - 特征向量
  - 矩阵
  - 特征多项式
  - 相似矩阵
  - 线性代数
  - 矩阵方程
  - 伴随矩阵
  - 逆矩阵
  - processed/math/2026张宇《线代9讲》/2026张宇《线代9讲》-markitdown.md

# 特征值与特征向量

## 概念定义

设 $A$ 为 $n\times n$ 矩阵（可取实数或复数域），若存在标量 $\lambda$ 与非零向量 $\boldsymbol{\xi}\in\mathbb{R}^n$（或 $\mathbb{C}^n$）满足

\[
A\boldsymbol{\xi} = \lambda \boldsymbol{\xi},
\]

则称 $\lambda$ 为 **特征值**（eigenvalue），$\boldsymbol{\xi}$ 为对应的 **特征向量**（eigenvector）。

等价的定义有两种：

1. **特征向量定义**  
   \[
   (\lambda E - A)\boldsymbol{\xi} = \mathbf{0},\qquad \boldsymbol{\xi}\neq\mathbf{0}.
   \]
2. **特征方程（特征多项式）**  
   \[
   f(\lambda) = |\lambda E - A| = 0.
   \]
   特征方程的根即为矩阵 $A$ 的全部特征值（计重数）。

> **几何重数 vs 代数重数**  
> - **代数重数** $m_a(\lambda)$：特征值 $\lambda$ 在特征多项式中出现的次数。  
> - **几何重数** $m_g(\lambda)$：$\ker(\lambda E - A)$ 的维数，即线性无关特征向量的最大个数。  
> 恒有 $1\le m_g(\lambda)\le m_a(\lambda)$。


## 核心公式（LaTeX）

### 1. 特征方程与特征多项式

\[
\boxed{|\,\lambda E - A\,| = 0}
\qquad\text{（特征多项式 }f(\lambda)=|\lambda E-A|\text{）}
\]

### 2. 特征向量满足的线性方程组

\[
\boxed{(\lambda_i E - A)\,\mathbf{x} = \mathbf{0}},\qquad \mathbf{x}\neq\mathbf{0}.
\]

### 3. 常用矩阵的特征值变换表

| 矩阵 | 特征值 | 对应特征向量 |
|------|--------|--------------|
| $A$ | $\lambda$ | $\boldsymbol{\xi}$ |
| $kA$（$k\in\mathbb{F}$） | $k\lambda$ | $\boldsymbol{\xi}$ |
| $A^{-1}$（$A$ 可逆） | $\displaystyle \lambda^{-1}$ | $\boldsymbol{\xi}$ |
| $A^{*}$（伴随矩阵） | $\displaystyle \frac{|A|}{\lambda}$（$A$ 可逆） | $\boldsymbol{\xi}$ |
| $f(A)=a_0E+a_1A+\dots+a_mA^m$ | $f(\lambda)=a_0+a_1\lambda+\dots+a_m\lambda^m$ | $\boldsymbol{\xi}$ |
| $P^{-1}AP$（$P$ 可逆） | $\lambda$ | $P^{-1}\boldsymbol{\xi}$ |
| $A^{\mathsf T}$ | $\lambda$ | **不一定** 同 $\boldsymbol{\xi}$（解空间不同） |
| $A^m$ | $\lambda^m$ | $\boldsymbol{\xi}$ |
| 行和为 $s$ 的矩阵 | $s$ | $(1,1,\dots,1)^{\mathsf T}$ |

### 4. 重要性质公式

- **Cayley‑Hamilton 定理**  
  \[
  f(A)=A^n + a_{n-1}A^{n-1}+ \dots + a_1A + a_0E = 0.
  \]

- **归零准则（Zero‑Criterion）**  
  1. 若 $f(A)=\mathbf{0}$，则对任意特征值 $\lambda$ 有 $f(\lambda)=0$（仅给出取值范围）。  
  2. 特征多项式 $f(\lambda)=|\lambda E - A|$ 本身满足 $f(A)=\mathbf{0}$。

- **AB=BA 且 $A$ 有 $n$ 个互异特征值**  
  $\Rightarrow$ $A$ 的特征向量全部是 $B$ 的特征向量。

- **秩的和小于 $n$**  
  若 $r(A)+r(B)<n$，则 $Ax=0$ 与 $Bx=0$ 必有公共非零解 $\boldsymbol{\xi}$（即 $A$ 与 $B$ 共享一个特征向量，对应特征值 $0$）。

- **行和为常数 $s$**  
  $A\mathbf{1}=s\mathbf{1}$，其中 $\mathbf{1}=(1,\dots,1)^{\mathsf T}$，故 $s$ 为 $A$ 的一个特征值，$\mathbf{1}$ 为对应的特征向量。  
  同理，$A^m\mathbf{1}=s^m\mathbf{1}$，所以 $A^m$ 的特征值为 $s^m$。

- **矩阵方程 $AB=-2B$**  
  $B$ 的每一列都是 $A$ 的属于特征值 $\lambda=-2$ 的特征向量。

- **矩阵方程 $C A^{\mathsf T}=2C$**  
  $C$ 的每一列都是 $A$ 的属于特征值 $\lambda=2$ 的特征向量（取转置后可得 $A C^{\mathsf T}=2C^{\mathsf T}$）。


## 典型例题

### 例 7.4（矩阵方程求特征值与特征向量）

**题目**  
已知 $A$ 为 $3\times3$ 实矩阵，且满足  

1. $(A+2E)B = 0$, 其中 $B$ 为可逆矩阵；  
2. $C A^{\mathsf T}=2C$, 其中 $C\neq0$。  

求 $A$ 的特征值与对应的特征向量。

**解答**

1. **从 $(A+2E)B=0$ 得到 $\lambda=-2$。**  

   将 $B$ 按列分块 $B=[\beta_1,\beta_2,\beta_3]$，则  
   \[
   (A+2E)B=0\;\Longrightarrow\;AB=-2B.
   \]  
   对每列 $\beta_i$ 有  
   \[
   A\beta_i = -2\,\beta_i,\qquad i=1,2,3.
   \]  
   因此 $\beta_i$ 均为 $A$ 的属于特征值 $\lambda=-2$ 的特征向量。  
   由于 $\beta_1,\beta_2$ 线性无关，说明 $\lambda=-2$ 的几何重数至少为 $2$，故 $\lambda=-2$ 必为 **二重特征值**（代数重数为 $2$）。

2. **从 $C A^{\mathsf T}=2C$ 得到 $\lambda=2$。**  

   对等式取转置得到  
   \[
   A\,C^{\mathsf T}=2\,C^{\mathsf T}.
   \]  
   设 $C^{\mathsf T}=[\gamma_1,\gamma_2,\gamma_3]$，则  
   \[
   A\gamma_i = 2\,\gamma_i,\qquad i=1,2,3.
   \]  
   因此 $\gamma_i$ 为 $A$ 的属于特征值 $\lambda=2$ 的特征向量。  
   题目暗示 $C$ 的列向量相互成比例（故只提供一个线性无关方向），所以 $\lambda=2$ 为 **单根**（代数重数 $1$）。

3. **汇总**  

   \[
   \boxed{\lambda_1=\lambda_2=-2,\qquad \lambda_3=2.}
   \]

   对应的特征向量：

   - 对 $\lambda=-2$：任意非零线性组合  
     \[
     \boldsymbol{\xi}_{-2}=k_1\beta_1+k_2\beta_2,\qquad (k_1,k_2)\neq(0,0);
     \]
   - 对 $\lambda=2$：任意非零列向量 $\boldsymbol{\xi}_{2}= \gamma$（例如 $C$ 的任意非零列）。

**关键思路**  
- 将矩阵方程转化为“$A$ 乘以某个向量等于常数乘以同一向量”，从而直接得到特征值-特征向量对。  
- 通过列分块把矩阵方程拆解为向量方程。  
- 判断特征值的代数重数（由方程系数决定）与几何重数（由线性无关向量的个数决定）。


## 常见错误

| 错误 | 说明 | 正确认识 |
|------|------|----------|
| 误把 $λ^2=1$ 当成 $λ=±1$ | 若 $A^2=E$，则 $λ^2=1$，但 $λ$ 只取 $\{1,-1\}$ 中的某几个值，可能全部为 $1$、全部为 $-1$ 或混合。 | 只确定 **取值范围**，不能武断具体值。 |
| 认为 $A$ 与 $A^{\mathsf T}$ 的特征向量相同 | 两者特征值相同，但方程 $(\lambda E-A)x=0$ 与 $(\lambda E-A^{\mathsf T})x=0$ 解空间不同。 | 只有当 $A$ 为对称矩阵时，两者的特征向量才可取为同一组正交基。 |
| 把不同特征值的特征向量直接相加 | 若 $\xi_1,\xi_2$ 对应 $\lambda_1\neq\lambda_2$，则 $k_1\xi_1+k_2\xi_2$（$k_1,k_2\neq0$）不再是 $A$ 的特征向量。 | 线性组合只有在同属同一特征值时仍为特征向量。 |
| 误以为 $k$ 重特征值必有 $k$ 个线性无关特征向量 | 几何重数可能小于代数重数（$m_g(\lambda)<m_a(\lambda)$），导致不可对角化。 | 必须实际求解 $(\lambda E-A)x=0$ 的秩来确定几何重数。 |
| 忽略 $A$ 可逆性直接使用 $λ^{-1}$ | $A^{-1}$ 的特征值公式要求 $A$ 可逆，即 $\lambda\neq0$。 | 确认 $A$ 可逆或 $\lambda\neq0$ 后方可使用。 |
| 错误使用秩的和推断特征值 | $r(A)+r(B)<n$ 只保证 $Ax=0$ 与 $Bx=0$ 有公共非零解，不能推出 $A$ 与 $B$ 共享其他特征值。 | 只能得出关于 **零特征值** 的共享结论。 |
| 对 $f(A)=0$ 直接推出 $f(\lambda)=0$ 且 $\lambda$ 必为根 | 归零准则说明 $f(\lambda)=0$ 只给出 **可能取值**，需要结合其他信息确定实际特征值。 | 需结合矩阵的具体结构或已知特征值范围进行判断。 |


## 关联知识点

- [[特征多项式]]  
- [[特征向量]]  
- [[矩阵的行列式]]  
- [[矩阵的逆]]  
- [[伴随矩阵]]  
- [[矩阵的转置]]  
- [[相似矩阵]]  
- [[矩阵的对角化]]  
- [[Cayley‑Hamilton 定理]]  
- [[代数重数与几何重数]]  
- [[正交特征向量]]  
- [[矩阵方程]]  
- [[秩与零空间]]  
- [[特征值的几何意义]]  
- [[行和常数与特征值]]  
