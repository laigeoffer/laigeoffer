---
title: PmHub本地搭建Nacos环境
shortTitle: PmHub本地搭建Nacos环境
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

群里小伙伴反馈启动不起来项目，很大一部分是 Nacos 都没正常启动，因为 Nacos 有很多的配置信息，而服务启动又依赖于配置，所以启动 Nacos 可谓是重中之重，大家一定要注意。


Nacos 是分布式配置中心和服务注册中心，支持集群模式，我们本地就用单机模式好了（集群没必要哈）

请确保系统满足最小要求，否则会导致无法部署和启动。

## Nacos 下载

安装前，确保自己本地已经安装了 Java 环境。
官网下载地址：https://nacos.io/download/nacos-server/

最新的版本做了一些鉴权方面的优化，大家也可以下载

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
