---
title: PmHub 需求分析及可行性分析
shortTitle: PmHub需求分析及可行性分析
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

正式开始之前，先叨叨几句，在 AI 时代，基础的技术变得一文不值，你问 ChatGPT 基本都能给你很完美的答案，在经济下行周期，我们又该如何应对？我觉得作为技术人员，要想在新时代获得更滋润，最主要的路径是往业务发展，成为既能做业务分析和产品设计，又能做开发工作的人才，成为绝大多数不算特别复杂的软件项目骨干。

大家好，我是苍何。

欢迎跟着苍老师在 P 站学微服务😂

在产品设计篇的第一节中，我们讲述了如何进行产品分析的术，以具体的例子进行了深入的分析，可谓是干货满满。那么这一节呢，我们来讲一讲需求分析及可行性分析，当然了，会结合 PmHub 来深入讲解，大家扶好，准备发车啦。

什么是可行性分析，大白话就是「可干否」，需求分析就是「要干啥」。做任何项目和产品之前，可行性分析和需求分析往往走在最前面。

## 可行性分析

柳传志“三不干”：没钱赚的事我们不干；有钱赚但投不起钱的事不干；有钱赚也投得起钱但没有可靠的人选，这样的事也不干。

可行性分析有 4 要素：经济、技术、社会环境、人

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
