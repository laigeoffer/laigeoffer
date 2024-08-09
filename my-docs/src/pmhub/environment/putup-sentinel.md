---
title: PmHub本地搭建Sentinel环境
shortTitle: PmHub本地搭建Sentinel环境
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

注意：启动 Sentinel 控制台需要 JDK 版本为 1.8 及以上版本。

下载地址：https://github.com/alibaba/Sentinel/releases
文档地址：https://sentinelguard.io/zh-cn/docs
我下载的是 1.8.7 这个版本，大家也可以根据需要自行下载，但最好下载稳定发行版。

![Sentinel下载](https://cdn.tobebetterjavaer.com/stutymore/image.webp)

<PaidContentBanner />
