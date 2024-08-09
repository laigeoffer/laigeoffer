---
title: PmHub的性能监控和分布式追踪整合Skywalking（👍必看）
shortTitle: PmHub整合Skywalking
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

你好，欢迎来到面试系列！这篇文章主要讲 PmHub 中如何使用 Skywalking 进行性能监控和分布式追踪，期间会先从基础知识开始，到项目实战以及如何 0-1 集成，并给出如何用 tranceid 来定位分布式链路问题，最后会有关于这部分的面试题，让你一次性掌握 Skywalking 的实战使用。

以下描述你可以直接写进简历，也可以根据你的理解进行优化。

* 使用 Skywalking 实现了对 PmHub 的性能监控和分布式追踪，集成钉钉、邮件等通知渠道，使系统的整体响应时间降低了约30%，确保了系统运行的高可靠性和可维护性。

本教程大纲：

![本教程大纲](https://cdn.tobebetterjavaer.com/stutymore/20240807204404.png)：

## 分布式链路追踪概述

在微服务系统中，A 服务调用 B 服务，B 又调用 C 服务，C 又调用 D 服务，会使得链路变得很复杂，

一个由客户端发起的请求在后端系统中会经过多个不同的的服务节点调用来协同产生最后的请求结果，每一个前段请求都会形成一条复杂的分布式服务调用链路，链路中的任何一环出现高延时或错误都会引起整个请求最后的失败。

![链路追踪解决的问题](https://cdn.tobebetterjavaer.com/stutymore/download.webp)

在分布式系统中，必须有人专门做这个事才行。

目前，能做这个事情的比较流行的有 Sleuth、Skywalking 以及 ZipKin。但可惜 Sleuth 官宣要「盖头换面」😂

![Sleuth 官宣要「盖头换面](https://cdn.tobebetterjavaer.com/stutymore/download.webp)

以下是一些行业内比较成熟的其他分布式链路追踪技术解决方案。

![比较成熟的其他分布式链路追踪技术解决方案](https://cdn.tobebetterjavaer.com/stutymore/download.webp)

## 分布式链路追踪原理

假定三个微服务调用的链路如下图所示：Service 1 调用 Service 2，Service 2 调用 Service 3 和 Service 4

![图片来源尚硅谷](https://cdn.tobebetterjavaer.com/stutymore/download.webp)

那么一条链路追踪会在每个服务调用的时候加上Trace ID 和 Span ID

链路通过TraceId唯一标识，

Span标识发起的请求信息，各span通过parent id 关联起来 (Span:表示调用链路来源，通俗的理解span就是一次请求信息。

![链路追踪原理（图片来源尚硅谷）](https://cdn.tobebetterjavaer.com/stutymore/download.webp)

一条链路通过Trace Id唯一标识，Span标识发起的请求信息，各span通过parent id 关联起来。

<PaidContentBanner />