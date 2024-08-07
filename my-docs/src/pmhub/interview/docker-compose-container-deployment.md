---
title: PmHub用Docker Compose 容器化部署上线项目（👍必看）
shortTitle: PmHub用Docker-Compose上线
date: 2024-08-07 06:38:56
categories: 
  - PmHub
  - 面试系列
requiresAuth: true
description: PmHub 拆分了用户、流程、项目管理、认证等 4 个微服务，整合了 Redis 缓存、RocketMQ 消息队列、Docker 容器、Jenkins 自动化部署、Spring Security 安全框架、Nacos 服务注册和发现、Spring Boot Actuator 服务监控、Skywalking 链路追踪、Sentinel 熔断降级、Seata 分布式事务、Vue 前端框架等互联网开发中需要用到的绝大多数主流技术栈。
head:
  - - meta
    - name: keywords
      content: PmHub,Spring  Cloud,微服务,AI,知识星球,沉默王二,二哥的Java进阶之路,二哥的编程星球,Java进阶之路,编程,Java,IT,计算机专业,付费专栏,实战项目,分布式
---

你好，欢迎来到面试系列。这篇文章将会手把手教你如何通过容器化部署上线 PmHub，并写在简历上。

* 使用 Docker Compose 搭建项目环境，简化项目部署过程，降低环境差异性问题，提升资源隔离安全性

教程大纲：

![教程大纲](https://cdn.tobebetterjavaer.com/stutymore/20240807204054.png)

看到有小伙伴反馈说，面试的时候一被问到简历中的项目还没上线，就不继续问了，感觉挺奇葩的，要知道就校招来说，项目本身大部分都是练手的项目，上线也得花费很多的成本啊。

![群友反馈项目没上线就没下文](https://cdn.tobebetterjavaer.com/stutymore/image.webp)

就 Java 应用来说本身是很吃内存的，再者现在不拿个微服务项目挂简历又拿不出手，但一上线微服务，服务器资源耗费将会是之前的好几倍。就拿 PmHub 来说，之前单体的时候，1 核 2G 的服务器，跑的还可以。

但一换上微服务，即使升级为 4 核 8G， 服务还没全开的情况下，内存一样被打满，不得已把运行 CI/CD 的 Jenkins 给关了才得以「保命」。

## 项目上线流程

于我们而言，所说的上线，本质上就是将我们的项目部署好，然后提供一个可以访问的比较好记的简短的域名地址放在简历上，面试官想看，就可以直接看了。

大概流程我总结了如下：

![PmHub-项目上线流程](https://cdn.tobebetterjavaer.com/stutymore/yuque_diagram.jpg)

## 购买域名

一个成熟网站的第一步是购买域名，那么什么是域名？


<VPBanner
  title="以下为付费内容"
  content="为了让大家“无痛”掌握 PmHub，我们耗费了巨大心血，从项目立项，到代码编写、测试、部署，再到教程撰写，前后足足经历了 5 个月的时间，并且我们还计划再用 3 个月的时间，为大家再更新 60 篇预计 25 万字的硬核教程。希望大家能支持我们一把。"
  logo="https://cdn.tobebetterjavaer.com/stutymore/image-20240725123037.png"
  :actions='[
    {
      text: "加入二哥编程星球",
      link:"https://laigeoffer.cn/zsxq/",
    },
    {
      text: "了解 PmHub 付费教程",
      link: "https://laigeoffer.cn/pmhub/learn/",
      type: "default",
    },
  ]'
/>