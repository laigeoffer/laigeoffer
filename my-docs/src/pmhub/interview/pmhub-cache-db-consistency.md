---
title: PmHub如何保证缓存和数据库的一致性（👍必看）
shortTitle: PmHub保证缓存和数据库的一致性
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

你好呀，我是苍何！

欢迎来到面试系列！这篇文章主要讲 PmHub 中如何保证缓存和数据库的一致性。

这个基本是项目中用到缓存，就需要思考的问题，当然也是面试官最喜欢挑刺的问题了。

所以简历上直接写上这块，好让面试官挑刺，也是一种增加竞争力的方法。以下描述你可以直接写进简历，也可以根据你的理解进行优化。

通过采用 Cache Aside 模式，确保数据库更新后及时失效相关缓存，保证数据库和缓存的一致性

缓存的重要性
缓存大家都并不陌生，说白了就是一种存储机制，用于暂时保存数据，以加速数据的读取和访问。

数据库好好的为什么要用缓存？关键点在于缓存快啊，比如微信中的很大消息都是缓存在你本地手机的，（看到有自媒体博主发视频说能找回你 10 年前的微信聊天记录，大哥，前提是你 10 年不换手机？或者每次换手机你都能把所有聊天记录导出来？）

微信手机中的缓存是一种常见的本地缓存，对于开发来说本地缓存常用有以下这些：
* JDK 自带的 HashMap 和 ConcurrentHashMap
* Ehcache、Guava Cache、Spring Cache、Caffeine 等常见的本地缓存框架

除了本地缓存，还有常见的分布式缓存如常用的 Redis。本地缓存和分布式缓存很好区别，本地缓存和应用在同一个地方，而分布式缓存是可以独立部署在不同的服务器上的，比如 Redis 可以单机或者集群部署在不同的服务器上。

不管是本地缓存还是分布式缓存，都只有一个目的，那就是用空间换时间，用更多的存储空间来存储一些可能重复使用或计算的数据，从而减少数据的重新获取或计算的时间。

![缓存介绍](https://cdn.tobebetterjavaer.com/stutymore/缓存介绍.webp)

## 缓存一致性问题

你有没有想过一个问题，既然一份数据同时在缓存中和数据库中都有，那这两者到底哪个是最新数据呢？如何保证其数据一致性呢？


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