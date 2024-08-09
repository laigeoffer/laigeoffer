---
title: PmHub 架构方案设计（👍强烈推荐）
shortTitle: PmHub架构方案设计
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

通常对于有经验的程序员来说，接到 PRD 需求后，并不会立即就写代码开发，而是会先进行架构方案设计，系分评审等工作，最后才是撸代码。

接下来我将 PmHub 的架构方案设计给大家简单剖析一遍。
架构选型
PmHub 开源项目一共经历了 2 次技术架构选型，因为一开始它是个单体 SpringBoot 版本应用，其采用 SOA 模块化架构设计，即按照不同的业务范围分不同的 Moudle，这也是单体应用中现在常见的设计思路。
后面我把他升级到了微服务版本，架构复杂性自然也飙升了一截。需要考虑服务网关、服务调用、服务认证、服务注册、熔断降级、监控及分布式事务等一系列问题。
经过慎重的思考和架构选型，最终确定如下系统选型和架构：



<PaidContentBanner />
