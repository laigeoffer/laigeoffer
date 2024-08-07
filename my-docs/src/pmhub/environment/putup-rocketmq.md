---
title: PmHub本地搭建RocketMQ环境
shortTitle: PmHub本地搭建RocketMQ环境
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

PmHub 在之前的版本，RocketMQ 是服务启动必须的环境依赖，但后面小伙伴们反馈太多启动问题，5.x 新版本又加了 proxy 概念，有些加了能启动，有些不加能启动，看是会对环境有很强的依赖，所以新的版本，我把 RocketMQ 默认关闭了。

这里仅贴出苍何已经验证过和群里小伙伴们已经验证过的搭建方案，对于还没验证的大家可以自行搜索哦。

## RocketMQ 介绍

那么什么是 RocketMQ 呢？

RocketMQ 是阿里开源的消息中间件，具有高性能、高可靠、高实时、分布式 的特点，底层是用 Java 语言开发的分布式组件。2016 年成为 Apache 的顶级项目，在阿里内部经历了多年的双十一的拷打，主打一个能抗能打。

* 官网地址：https://rocketmq.apache.org/
* 开源地址：https://github.com/apache/rocketmq

当然了如果你想对 RocketMQ 有更深入的理解也可以关注苍何公众号（微信搜“苍何”），会有深入浅出图解 RocketMQ，让你一次性掌握 RocketMQ 的底层原理。

![公众号：苍何](https://cdn.tobebetterjavaer.com/stutymore/image.webp)

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
