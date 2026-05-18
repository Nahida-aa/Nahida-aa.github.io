---
title: 傅里叶变换
tags: [math, fourier]
lastUpdated: 2025-08-08
---

已知函数 $f(t)=f(t+T)$

令: $f_0 = \frac{1}{T} $, $\omega_0 = 2\pi f_0$

希望找到这个函数在 复指数基函数 下每个频率 $f_0, 2f_0, 3f_0, \cdots, nf_0$ 上的投影,
方法: 将 函数 $f(t)$ 投影到 复指数基函数： $e^{j2\pi nf_0t}$ 上, 即 进行 向量乘法:
$$
F(n) = \langle f(t), e^{j2\pi nf_0t} \rangle = \frac{1}{T}\int_{T}f(t)e^{-j2\pi nf_0t}dt
$$

此时得到了 函数$f(t)$ 在 复指数基函数 $e^{j2\pi nf_0t}$ 上每个频率的投影 $F(n)$, 则可以根据 每个 频率上的投影去复原原函数 $f(t)$:
$$
f(t)=\sum_{-\infty}^{\infty}F(n)e^{j2\pi nf_0t} \\
$$

整合:
$$
\begin{aligned}
f(t) &= \sum_{n=-\infty}^{\infty} (\frac{1}{T}\int_{T}f(t)e^{-j2\pi nf_0t}dt) e^{j2\pi nf_0t} \\
    &= \sum_{n=-\infty}^{\infty} (\int_{T}f(t)e^{-j2\pi nf_0t}dt) e^{j2\pi nf_0t} \frac{1}{T} \\
    &= \sum_{n=-\infty}^{\infty} \int_{T}f(t)e^{-j2\pi nf_0t}dt e^{j2\pi nf_0t} f_0  \\
\end{aligned}
$$

当 周期 逐渐增大, $T\rightarrow\infty$, 则 频率 $f_0\rightarrow df$, 频率 由离散的 $f_0$ 变为连续的 $f$, 则上式求和可以简化为积分:
$$
f(t) = \int_{-\infty}^{\infty} (\int_{-\infty}^{\infty} f(t)e^{-j2\pi ft} dt) e^{j2\pi ft}  df
$$
令 $\omega = 2\pi f$, 则:
$$
f(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty} (\int_{-\infty}^{\infty} f(t)e^{-j\omega t}dt) e^{j\omega t}  dw
$$
正变换:
$$
F(jw) = \int_{-\infty}^{\infty} f(t)e^{-j\omega t}dt
$$
逆变换:
$$
f(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty} F(jw)e^{j\omega t}dw
$$
