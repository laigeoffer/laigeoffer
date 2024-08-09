---
title: PmHub本地搭建SkyWalking环境
shortTitle: PmHub本地搭建SkyWalking环境
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

下载地址：https://skywalking.apache.org/downloads/

可以选择最新的版本下载。

![下载版本](https://cdn.tobebetterjavaer.com/stutymore/image.webp)

不下载最新版本，可能有不知道的 bug 和坑。下载好后的目录结构：

![目录](https://cdn.tobebetterjavaer.com/stutymore/image.webp)

skywalking8.7.0之后的版本，agent的相关代码被抽离出skywalking当中，需要自行下载agent，从官网下载与之相对应的：https://skywalking.apache.org/downloads/
如何选择对应的 agent 版本，可以在官网上找到：

<PaidContentBanner />
