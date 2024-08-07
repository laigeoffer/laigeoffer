---
title: PmHub自定义注解加 AOP 实现服务接口鉴权和内部认证（👍必看）
shortTitle: 自定义注解接口鉴权
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

欢迎来到面试系列！这篇文章主要讲 PmHub 如何实现自定义鉴权和认证，里面会涉及到很多的技术知识点，也是面试经常问的，结合项目掌握好本篇，对咱们会有很大的帮助。

以下描述你可以直接写进简历，也可以根据你的理解进行优化。
* 自定义注解加 AOP 实现服务接口鉴权和内部认证

文章大纲：

![本文大纲](https://cdn.tobebetterjavaer.com/stutymore/20240807203611.png)
## 注解

### 何谓注解？

在Java中，注解（Annotation）是一种特殊的语法，用@符号开头，是 Java5 开始引入的新特性，可以看作是一种特殊的注释，主要用于修饰类、方法或者变量，提供某些信息供程序在编译或者运行时使用。

拿熟悉 的@Override 注解来看。

JDK 内置了很多注解（比如 @Override、@Deprecated），其他框架如 Spring 也内置了不少注解，我们也可以自定义注解。

注解的作用
注解的主要作用是提供元数据，具体可以用于以下几个方面：

* 编译时检查：如@Override可以帮助编译器检查该方法是否正确重写了父类的方法。
* 代码生成：如@Entity可以告诉框架生成对应的数据库表。
* 运行时处理：如@Deprecated可以在运行时提醒开发者某个方法或类已经不建议使用。


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