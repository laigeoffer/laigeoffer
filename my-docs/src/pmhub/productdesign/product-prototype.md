---
title: PmHub 产品原型设计
shortTitle: PmHub产品原型设计
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

> 产品原型设计是补充知识，如果以面试为目标，且时间不充裕可以选择性学习。

![教程目录](https://cdn.tobebetterjavaer.com/stutymore/20240807225336.png)

## 什么是原型

产品原型是产品开发过程中的一个重要环节，它是产品idea的可视化呈现。

原型是产品的早期模型或样本，用于展示产品的基本功能、界面布局和用户交互方式。它可以是简单的手绘草图，也可以是高保真的交互式模型。

说人话就是个假的模拟系统，他没有数据交互，也不用写代码，通过工具就可以画出来。

## 为什么要进行原型设计

一般来说正规的产品都会有原型设计，原型设计是产品的雏形，当然也是产品形态的定义。

当然也是产品经理和程序员以及测试沟通的桥梁，比如通常在公司，产品经理开 PRD 评审的时候，就会拿着原型，对着原型来看整个产品的设计。

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
