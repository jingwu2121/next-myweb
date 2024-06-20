---
title: Understanding Diffusion2
date: 6/7/2024
---

# DDPM Math
## Forward process
[Some inspiration from this post](https://zhuanlan.zhihu.com/p/565901160) 
Forward is an adding noise process, so we simply modeling the process as

$$
x_t = a_t x_{t-1} + b_t \epsilon_t \quad \epsilon_1, \epsilon_2, ..., \epsilon_t \in N(0,I) \; i.i.d  \tag{1}
$$

$$
\begin{align}
x_1 =  a_1 x_0 + b_1 \epsilon_1 \\
x_2 = a_2 x_1 + b_2 \epsilon_2 \\
\dots  \\
x_t = a_t x_{t-1} + b_t \epsilon_t \\
\end{align} \tag{2}
$$

Elimination,

$$
x_t = (a_t a_{t-1} \dots a_{1})x_{0} + (a_{t}\dots a_{2}b_{1})\epsilon_{1} + (a_{t}\dots a_{3}b_{2})\epsilon_{2} + \dots \\
+ (a_{t}b_{t-1})\epsilon_{t-1} + b_{t}\epsilon_{t} \tag{3}
$$

A good observation is that, 

$$
\begin{align}
(a_t a_{t-1} \dots a_{1})^2 + (a_{t}\dots a_{2}b_{1})^2 + (a_{t}\dots a_{3}b_{2})^2 + \dots + (a_{t}b_{t-1})^2 + b_{t}^2  \\
= a_{t}^2(a_{t-1}^2(a_{t-2}^2 \dots (a_{2}^2(a_{1}^2+b_{1}^2) + b_{2}^2) +\dots +b_{t-2}^2) + b_{t-1}^2) + b_{t}^2 
\end{align}  \tag{4}
$$

If we make $a_{i}^2 + b_{i}^2 = 1$, Eq. (4) = 1, to follow the original paper, we rewrite the $a$ and $b$. Let $a_i^2 = \alpha_{i}$, $b_i^2 = \beta_{i}$, $\alpha_{i} = 1- \beta_{i}$, 

$$
\begin{align}
x_{t} = \sqrt{ \alpha_{t} } x_{t-1} + \sqrt{ 1 - \alpha_{t} } \epsilon_{t} 
\end{align} \quad (q(x_{t}|x_{t-1}))
\tag{5}
$$

Let $\bar{ \alpha}_{t} = (a_{t}a_{t-1}\dots a_{2}a_{1})^2$, for Eq. (3), since $\epsilon_{1}, \epsilon_{2},\dots, \epsilon_{t}$ are independent, $N(0,I)$, the mean of their sum is 0, variance is (covariance is 0 due to the independence)

$$
Var = (a_{t}\dots a_{2}b_{1})^2 + (a_{t}\dots a_{3}b_{2})^2 + \dots + (a_{t}b_{t-1})^2 + b_{t}^2 = 1 - \bar{\alpha} \tag{6}
$$

Thus, from $t=0$ to $t=t$, the forward process can be viewed as one step adding a gaussian noise $\bar{\epsilon}_{t}$ with $E[\bar{\epsilon}_{t}]=0$ and $V[\bar{\epsilon}_{t}] = 1 - \bar{\alpha}$

$$
\begin{align}
x_{t} = \sqrt{ \bar{\alpha_{t}} } x_{0} + \sqrt{ 1 - \bar{\alpha_{t}} } \bar{\epsilon_{t} }
\end{align} \quad  (q(x_{t}|x_{0}))
\tag{7}
$$

## Maximum Likelihood Loss Function Derivation 
Refer also to [Explanation from Hung-yi Lee](https://youtu.be/73qwu77ZsTM?si=Gg9bSF6I_edqW0p8) 
Rethink this problem, what we have are some samples $x_{1}, x_{2}, \dots, x_{m}$ sampled from the unknown distribution $p_{data}(x)$ that we hope to estimate. (it can be also considered as $f_X(x)$ in probability theory)  

We have a network parameterized with $\theta$, we hope the samples that we observed, i.e. $x_{1}, x_{2}, \dots, x_{m}$, have the biggest probability to happen. But currently, we have 2 unknown things, i.e. $\theta$ and $\frac{p_{\theta}(x)}{p(x_{i}|\theta)} $ (probability density function). 

If $p(x_{i}|\theta)$ is known, then we can simply do 

$$
\begin{align}
\theta^\star & = argmax_{\theta}\left( \prod_{i=1}^m p(x_{i}|\theta)  \right) \\
 & = argmax_{\theta}\left( \sum_{i=1}^m \log(p(x_{i}|\theta))  \right) \tag{When m is large, it is mean} \\
& \approx argmax_{\theta}\left( \frac{1}{m} \sum_{i=1}^m  \log(p(x_{i}|\theta))  \right)  \\  \tag{$x$: R.V.; $x \sim p_{data}(x)$ } 
& = argmax_{\theta}(\mathbb{E} [\log(p(x|\theta))] )  \\ 
& = argmax_{\theta} \int_{x} \log(p(x|\theta)) p_{data}(x) \, dx \\
& =  argmax_{\theta} \int_{x} \log(p(x|\theta)) p_{data}(x) \, dx \\
& - \int_{x} \log(p_{data}(x)) p_{data}(x) \, dx \\
& = argmax_{\theta} \int_{x} p_{data}(x) \log \frac{p(x|\theta)}{p_{data}(x)} dx \tag{8}
\end{align} 
$$

Recall KL divergence, it measures the difference between 2 distributions. [KL Divergence](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence) 

>$$
D_{KL}(P||Q) = \int_{x}p(x) log \frac{p(x)}{q(x)} dx
$$
> where, $p(x)$ and $q(x)$ are R.V. $P, Q$'s **probability density function**. 

Eq. (8) turns to,

$$
\begin{align}
\theta^\star & = argmax_{\theta} -D_{KL}(p_{data}(x)||p(x|\theta)) \tag{8}
\end{align} 
$$

But unfortunately, we don't know $p(x|\theta)$, so we are not able to perform the maximization above. So, we hope to find the lower bound to optimize. 
Back to VAE, we hope to maximize $\log p(x|\theta)$ 

$$
\begin{align}
\theta^\star & = argmax_{\theta}\log p(x|\theta) \\
& = argmax_{\theta} \log p(x|\theta) \int_{z}q(z|x) dz \qquad  \text{(integrate w.r.t $z$, the int is 1)} \\
& = argmax_{\theta} \int_{z}q(z|x) \log p(x|\theta) dz \\
& = argmax_{\theta} \int_{z}q(z|x) \log \frac{p(x,z|\theta)}{p(z|x, \theta)} dz \\
& = argmax_{\theta} \int_{z}q(z|x) \log \frac{p(x,z|\theta)}{q(z|x)} \frac{q(z|x)}{p(z|x, \theta)} dz \\
& = argmax_{\theta} \int_{z}q(z|x) \log \frac{p(x,z|\theta)}{q(z|x)} dz + \int_{z}q(z|x) \log \frac{q(z|x)}{p(z|x, \theta)} dz \\
& = argmax_{\theta} \int_{z}q(z|x) \log \frac{p(x,z|\theta)}{q(z|x)} dz + D_{KL}[q(z|x)||p(z|x,\theta)] \qquad \text{($D_{KL}\geq0$)} \\
& \geq argmax_{\theta} \int_{z}q(z|x) \log \frac{p(x,z|\theta)}{q(z|x)} dz \\
& = argmax_{\theta} \mathbb{E}_{q(z|x)} \left[\log \frac{p(x,z|\theta)}{q(z|x)}\right] \qquad \text{VAE Lower Bound}
\end{align}
$$

For DDPM, it is similar, the hidden states are the noisy states $x_{1}, x_{2,}..., x_T$, similarly, for DDPM,

$$
\begin{align}
\theta^\star & = argmax_{\theta} \mathbb{E}_{q(x_1,x_2,...,x_T|x)} \left[\log \frac{p(x_{0,}x_{1,}x_{2,}..., x_{T}|\theta)}{q(x_{1,}x_{2,}..., x_{T}|x)}\right] \\
& = argmax_{\theta} \mathbb{E}_{q(x_{1:T}|x)} \left[\log \frac{p(x_{0:T}|\theta)}{q(x_{1:T}|x_0)}\right] \qquad \text{Lower Bound}
\end{align}
$$

This Lower Bound can be simplified to 

$$
\mathbb{E}_{q} [ \underbrace{\log p(x_0|x_{1,}\theta)}_{L_{0}\text{Reconstruction term}}- \underbrace{D_{KL}(q(x_T|x_0)||p(x_T))}_{L_{T}(\text{Prior matching term})} - \sum_{t>1} \underbrace{D_{KL}(q(x_{t-1}|x_{t,}x_0)||p(x_{t-1}|x_{t,}\theta))}_{L_{t}\text{Denoising matching term}} ] \tag{9}
$$

### $L_T$
It has no trainable parameters, $q$ is encoder, and $x_T$ is gaussian noise that we randomly sampled. 

### $L_t$ 
This term is the similarity between $q$ and $p$, $q$ is a gaussian distribution with a fixed mean and variance. Here, we fix $p$ 's variance (For simple computation? I guess. In [Improved Denoising Diffusion Probabilistic Models](https://arxiv.org/pdf/2102.09672.pdf), they make variance also trainable). Only mean is trainable. So we hope to minimize the difference between 2 means, i.e. $|| \mu_{p} - \mu_q ||^2$. 

First, we compute $\mu_q$, more derivation see here [Understanding Diffusion Models: A Unified Perspective](http://arxiv.org/abs/2208.11970) 

$$
\begin{align}
q(x_{t-1}|x_{t,}x_{0}) & = \frac{q(x_{t-1},x_{t}|x_{0})}{q(x_{t}|x_{0})} = \underbrace{\frac{q(x_{t-1}|x_{0}) q(x_t|x_{t-1})}{q(x_{t}|x_{0})}}_{\text{Still Gaussian}} \\
& = ... \\
&  \propto N(x_{t-1}; \underbrace{\frac{\sqrt{\alpha_t}(1-\bar{\alpha}_{t-1})x_{t} + \sqrt{\bar{\alpha}_{t-1}}(1-\alpha_t)x_0}{1-\bar{\alpha}_{t}}}_{\mu_q(x_{t,}x_0)} ,  \underbrace{\frac{(1-\alpha_t)(1-\bar{\alpha}_{t-1})}{1 - \bar{\alpha_t}} I}_{\Sigma_q(t)})
\end{align} \tag{10}
$$

Thus, 

$$
\begin{align}
\mu_q(x_{t,}x_{0}) & = \frac{\sqrt{\alpha_t}(1-\bar{\alpha}_{t-1})x_{t} + \sqrt{\bar{\alpha}_{t-1}}(1-\alpha_t)x_0}{1-\bar{\alpha}_{t},} \tag{11} \\ 
\sigma^2_{q}(t) & = \frac{(1-\alpha_t)(1-\bar{\alpha}_{t-1})}{1 - \bar{\alpha_{t}}}\tag{12}
\end{align}
$$

We fix $\sigma^{2}_{\theta}(t)=\sigma^{2}_{q}(t)$, plug means and variances to KL divergence,  

$$
\begin{align}
\theta^\star & = argmin_{\theta} D_{KL}(q(x_{t-1}|x_{t,}x_0)||p(x_{t-1}|x_{t,}\theta)) \\
& =... \\
& = argmin_{\theta} \frac{1}{2\sigma^{2}_{q}(t)} [|| \mu_{\theta} - \mu_{q} ||^{2}]  \tag{13}
\end{align}
$$



From Eq. (13), we can design **3 different loss functions**  
- To predict $x_0$: $\hat x_{\theta}(x_{t}, t)$ 
	- We design $\mu_{\theta}(x_{t,}, t) = \frac{\sqrt{\alpha_t}(1-\bar{\alpha}_{t-1})x_{t} + \sqrt{\bar{\alpha}_{t-1}}(1-\alpha_t)\hat x_{\theta}(x_{t}, t)}{1-\bar{\alpha}_{t},}$, and plug back to Eq. (13), we obtain 
	
$$
\begin{align}
\theta^\star & = argmin_{\theta} D_{KL}(q(x_{t-1}|x_{t,}x_0)||p(x_{t-1}|x_{t,}\theta)) \\
& = argmin_{\theta} \frac{1}{2\sigma^{2}_{q}(t)}  \frac{\bar{\alpha}_{t-1} (1-\alpha_t)^2}{(1 - \bar{\alpha_{t}})^{2}}  [|| \hat x_{\theta}(x_{t}, t) - x_{0} ||^{2}]  \qquad \text{Simplify to} \\
& = ... \\
& = argmin_{\theta} \frac{1}{2} \left(\frac{\bar{\alpha}_{t-1}}{1 - \bar{\alpha}_{t-1}} - \frac{\bar{\alpha}_{t}}{1 - \bar{\alpha}_{t}}\right) \left[|| \hat x_{\theta}(x_{t}, t) - x_{0} ||^{2} \right] \tag{14}
\end{align} 
$$

- To predict $\bar{\epsilon}_{t}$: $\bar \epsilon_{\theta}(x_{t}, t)$. From Eq. (7), $x_{0} = \frac{x_{t} - \sqrt{ 1 - \bar{\alpha_{t}} } \bar{\epsilon_{t}}}{\sqrt{ \bar{\alpha_{t}}}}$, plug to $\mu_q(x_{t,}x_{0})$, we get $\mu_q(x_{t,}x_{0}) = \frac{1}{\sqrt{\alpha_t}}x_t - \frac{1 - \alpha_t}{\sqrt{1-\bar \alpha_t} \sqrt{\alpha_t}} \bar \epsilon_t$, so we design $\mu_p(x_{t,}x_{0}) = \frac{1}{\sqrt{\alpha_t}}x_t - \frac{1 - \alpha_t}{\sqrt{1-\bar \alpha_t} \sqrt{\alpha_t}} \bar \epsilon_\theta(x_t, t)$. Hence, 

$$
\begin{align}
\theta^\star & = argmin_{\theta} D_{KL}(q(x_{t-1}|x_{t,}x_0)||p(x_{t-1}|x_{t,}\theta)) \\
& = argmin_{\theta} \frac{1}{2\sigma^{2}_{q}(t)}  \frac{(1-\alpha_t)^2}{(1 - \bar{\alpha_{t}}) \alpha_{t} }  [|| \bar \epsilon_{\theta}(x_{t}, t) - \bar \epsilon_{t} ||^{2}]    \tag{15}
\end{align} 
$$

- To predict score function $s_\theta(x_t, t)$. Based on *Tweedie's Formula*: 
> Tweedie's Formula:
> 
> For a gaussian variable $z \sim N(z; \mu_z, \Sigma_z)$, $\mathbb{E} [\mu_z|z] = z + \Sigma_z \nabla_z \log p(z)$ 

For $q(x_t|x_0)$, we have $\mathbb{E} [\mu_{x_t}|x_t] = x_t + (1 - \bar{\alpha_{t}}) \nabla_{x_t} \log p(x_t)$, hence, 

$$
\begin{align*}
\sqrt{\bar \alpha_t} x_0 & = x_t + (1 - \bar{\alpha_{t}}) \nabla_{x_t} \log p(x_t) \\
x_0 &= \frac{x_t + (1 - \bar{\alpha_{t}}) \nabla_{x_t} \log p(x_t)}{\sqrt{\bar \alpha_t}}
\end{align*}
$$

Thus, $\mu_q(x_{t,}x_{0}) = \frac{1}{\sqrt{x_t}} x_t + \frac{1 - \alpha_{t}}{\sqrt{x_t}} \nabla_{x_t} \log p(x_t)$, and we design $\mu_\theta(x_{t,}x_{0}) = \frac{1}{\sqrt{x_t}} x_t + \frac{1 - \alpha_{t}}{\sqrt{x_t}} s_\theta(x_t, t)$, hence

$$
\begin{align}
\theta^\star & = argmin_{\theta} D_{KL}(q(x_{t-1}|x_{t,}x_0)||p(x_{t-1}|x_{t,}\theta)) \\
& = argmin_{\theta} \frac{1}{2\sigma^{2}_{q}(t)}  \frac{(1-\alpha_t)^2}{ \alpha_{t} }  [||  s_\theta(x_{t}, t) - \nabla_{x_t} \log p(x_t) ||^{2}]    \tag{16}
\end{align}
$$

We can drop the coefficients to train the model, it turns out that the 2nd way generates the best result ( $L_{simple}$ in the DDPM paper, Eq. (14)).  

## Sampling

Above is about training. When the model is trained, how do we generate the images from gaussian noises? 
1. Sample Gaussian noise $x_T \sim N(0,I)$ 
2. Compute $x_{t-1} =  \frac{1}{\sqrt{\alpha_t}}x_t - \frac{1 - \alpha_t}{\sqrt{1-\bar \alpha_t} \sqrt{\alpha_t}} \bar \epsilon_\theta(x_t, t)$, which is actually the mean $\mu_p(x_{t,}x_{0})$, i.e. <mark>the mean for process $p_\theta(x_{t-1}|x_t)$ </mark>, we need to add variance (A kind of explanation) to form a complete signal $x_{t-1}$. 
3. Sample variance $z \sim N(0,I)$, give it the variance $\sigma_q(t)$. $$x_{t-1} =  \frac{1}{\sqrt{\alpha_t}}x_t - \frac{1 - \alpha_t}{\sqrt{1-\bar \alpha_t} \sqrt{\alpha_t}} \bar \epsilon_\theta(x_t, t) + \sigma_q z  \tag{17} $$

## Intuition behind forward diffusion (Frequency domain) 
[CVPR2022 Diffusion Tutorial Part1](https://www.youtube.com/watch?v=cS6JQpEY9cs&t=697s) 
Here, we have $x_t = \sqrt{\bar \alpha_t} x_0 + \sqrt{1 - \bar \alpha_t} \epsilon$, we perform the Fourier transform, and obtain $F(x_t) = \sqrt{\bar \alpha_t} F(x_0) + \sqrt{1 - \bar \alpha_t} F(\epsilon)$. 

![image](/src/posts/images/Screenshot%20from%202023-12-11%2011-46-20.png)

- $t$ is small, $\bar \alpha_t \sim 1$: Noise is small, mainly perturb the high frequency component, affecting the details/low-level component. 
- $t$ is large, $\bar \alpha_t \sim 0$: Noise is large, noise affect low frequency component, i.e. coarse content. 

# Improved DDPM
2 main improvements:
- Making $\sigma_p(t)$ also trainable 
- Change the noise scheduling from *Linear* to *Cosine* 

# DDIM
[A good explanation](https://kexue.fm/archives/9181#mjx-eqn-eq%3Asigma%3D0) 
- Main Goal: Acceleration 
- Features:
	- Same objective function as DDPM
	- Acceleration: Use fewer steps for generation, i.e. backward process. 
	- Deterministic: Generation process becomes a deterministic process, i.e. given a gaussian noise $x_t$, the generated image is fixed. 
- Motivation
	- We can find that the forward process is only related to $q(x_t|x_0)$, so can we omit the intermediate steps? That is to say, we hope to derive the $q(x_{t-1}|x_{t,}x_{0})$, w/o $q(x_t|x_{t-1})$. 

## Forward Process
In DDPM, what we do is that we use Bayes' theorem $q(x_{t-1}|x_{t,}x_{0}) = \frac{q(x_{t-1}|x_{0}) q(x_t|x_{t-1})}{q(x_{t}|x_{0})}$ to compute $q(x_{t-1}|x_{t,}x_{0})$. However, it doesn't work here, since we have no knowledge of $q(x_t|x_{t-1})$. But we can find that

$$
\begin{equation}
\int_{x_t} q(x_{t-1} | x_t, x_0) q(x_t|x_0) d x_t = q(x_{t-1}|x_0)
\end{equation}  \qquad \tag{Marginal Distribution} 
$$

We set $q(x_{t-1} | x_t, x_0)$ as gaussian distribution, and we know $q(x_t|x_0)$ and $q(x_{t-1}|x_0)$. Solve the equation (See [Here](https://kexue.fm/archives/9181#mjx-eqn-eq%3Asigma%3D0) ) (Constructing a solution $q(x_{t-1} | x_t, x_0)$ ) 

$$
\begin{align*}
q(x_{t-1} | x_t, x_0) & = N\left(x_{t-1}; \sqrt{\bar \alpha_{t-1}} x_0 + \sqrt{1 - \bar \alpha_{t-1} - \sigma_t^2} \cdot \frac{x_t - \sqrt{\bar \alpha_t} x_0}{\sqrt{1 - \bar \alpha_t}}, \sigma_t^2 I\right) \\
\mu_q(x_t, x_0) & = \sqrt{\bar \alpha_{t-1}} x_0 + \sqrt{1 - \bar \alpha_{t-1} - \sigma_t^2} \cdot \frac{x_t - \sqrt{\bar \alpha_t} x_0}{\sqrt{1 - \bar \alpha_t}} \\
\sigma_t^2(t) & = \sigma^2_t
\end{align*}
$$

## Backward
We hope to minimize $L_{t-1}$, so we hope $q(x_{t-1} | x_t, x_0)$ and $p_\theta(x_{t-1} | x_t)$ are similar. So here we just construct (**variance is also fixed here**)

$$
\begin{equation}
  p_\theta(x_{t-1} | x_t) =
    \begin{cases}
      \hat x_\theta(x_1, 1) + \sigma_1^2 \epsilon_1 & \text{if bank $i$ issues ABs at time $t$}\\
      q(x_{t-1}|x_t, \hat x_\theta(x_t, t)) & \text{otherwise}
    \end{cases}       
\end{equation}
$$

where, 

$$
\hat x_\theta(x_t, t) = \frac{x_t - \sqrt{1 - \bar \alpha_t} \bar \epsilon_\theta(x_t, t)}{\sqrt{\bar \alpha_t}} \tag{Used to estimate $x_0$}
$$

The objective function stays the same. 

$$
L_{simple} = || \bar \epsilon_{\theta}(x_{t}, t) - \bar \epsilon_{t} ||^{2}
$$

## Sampling
Similarly, 

$$
x_{t-1} = \sqrt{\bar \alpha_{t-1}} \frac{x_t - \sqrt{1 - \bar \alpha_t} \bar \epsilon_\theta(x_t, t)}{\sqrt{\bar \alpha_t}} + \sqrt{1 - \bar \alpha_{t-1} - \sigma_t^2} \cdot \bar \epsilon_\theta(x_t, t) + \sigma_t \epsilon_t
$$

Different variance strategies form different algorithm,
- $\sigma_t = 0$: DDIM. Sampling process is deterministic, i.e. given $x_t$, we have a fixed $x_0$ 
- $\sigma_t = \sqrt{\frac{1 - \bar \alpha_{t-1}}{1 - \bar \alpha_t}} \sqrt{1 - \alpha_t}$: DDPM. 
- Usually, they use $\eta$ to control how the sampling process is deterministic (DDIM) or stochastic (DDPM) [A reddit link to explain this](https://www.reddit.com/r/StableDiffusion/comments/xpikmh/incrementing_ddim_eta_looks_like_its_telling_a/) 
	- $\eta = 0$: DDIM
	- $\eta = 1$: DDPM

# Latent Diffusion & Stable Diffusion

DDPM and DDIM are both working on the image fields, which is computationally expensive. 
- Latent Diffusion
	- Move images to latent space $z_0$ by introducing a pre-trained VAE
	- Have conditions
- Stable Diffusion: It is just an open source pre-trained version of latent diffusion.  