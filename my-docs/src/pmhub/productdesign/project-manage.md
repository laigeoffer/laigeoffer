---
title: PmHub 项目管理流程
shortTitle: PmHub项目管理流程
date: 2024-08-07 06:38:56
categories: 
  - PmHub
  - 开篇词
requiresAuth: true
description: PmHub 拆分了用户、流程、项目管理、认证等 4 个微服务，整合了 Redis 缓存、RocketMQ 消息队列、Docker 容器、Jenkins 自动化部署、Spring Security 安全框架、Nacos 服务注册和发现、Spring Boot Actuator 服务监控、Skywalking 链路追踪、Sentinel 熔断降级、Seata 分布式事务、Vue 前端框架等互联网开发中需要用到的绝大多数主流技术栈。
head:
  - - meta
    - name: keywords
      content: PmHub,Spring  Cloud,微服务,AI,知识星球,沉默王二,二哥的Java进阶之路,二哥的编程星球,Java进阶之路,编程,Java,IT,计算机专业,付费专栏,实战项目,分布式
---

大家好，我是苍何，目前是负责部门项目管理工作，这一篇我们来聊一聊软件项目的项目管理流程，学习完这一篇，能帮助你更快的在企业中上手项目并定位好自己的角色，别人一脸懵逼，你却早已遥遥领先✈。

之所以要管理，是因为通常一个项目需要多人协同共同完成，也会涉及多个岗位和角色，比如 UI、产品、开发、测试、运维等，那多人共同完成一个项目，没有完整的项目管理流程就会乱了套，东做东的，西做西的，最后可能会面临项目延期的风险。

由于 PmHub 项目就只有二哥和我两人，但我们同样遵循大厂的项目管理流程，该有的一个不能少，只是我们两充当了很多的角色而已。

在说 PmHub 项目管理流程之前，还是有必要给大家讲一下正规公司应有的项目管理流程。

企业级标准项目管理流程
先来看一张完整的项目管理流程图：

![项目管理流程图](https://cdn.tobebetterjavaer.com/stutymore/20240807225004.png)

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
