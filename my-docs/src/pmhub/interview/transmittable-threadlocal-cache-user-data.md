---
title: PmHub整合TransmittableThreadLocal (TTL)缓存用户数据（👍必看）
shortTitle: PmHub整合TTL缓存用户数据
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

你好，欢迎来到面试系列！这篇文章主要教你如何将 PmHub 中使用到的 TTL 写进简历，其中会先进行 ThreadLocal 等基础知识的讲解，再到实战项目的代码解析，最后我们设计了模拟面试针对于该问题，做了面试连环问。

你可以直接将以下技术点写在简历上，这部分知识比较多，可以慢慢消化哦。

* 基于 TransmittableThreadLocal (TTL) 自定义请求头拦截器，将Header 数据封装到线程变量中方便获取，减少用户信息数据库查询次数，同时验证当前用户有效期自动刷新有效期。

本教程大纲：

![本教程大纲](https://cdn.tobebetterjavaer.com/stutymore/20240807204705.png)

## 理论知识

TransmittableThreadLocal (TTL)是增强版的 ThreadLocal，所以要想搞清楚 TTL，先需要温习一下 ThreadLocal 的基础知识。

### ThreadLocal 简介

ThreadLocal 是什么？

ThreadLocal 是Java中 lang 包下的一个类，是用来解决多线程下共享变量并发问题的，所谓共享变量即同一个变量在不同线程下赋予不同值。

ThreadLocal 会在多线程环境中为每个线程维护独立的**变量副本**，让每个线程都拥有自己的数据副本，避免了多个线程同时访问同一个变量的冲突问题。

![什么是ThreadLocal](https://cdn.tobebetterjavaer.com/stutymore/20200930144753491.webp)

ThreadLocal和 Synchronized 区别？

Synchronized 是基于锁机制的，用于控制对共享资源的访问，确保线程间数据的一致性和安全性，实现线程间的互斥访问。

为了你更好的理解 Synchronized 锁，我特意找了一个原理图：

![来源于Blog.dreamtobe.cn](https://cdn.tobebetterjavaer.com/stutymore/1ee05c7e58684348b31667e9fa119069.webp)


所以说， Synchronized是时间换空间让多个线程排队访问，ThreadLocal是空间换时间为每个线程提供了一份变量的副本，从而实现线程隔离。（可以直接和面试官这样说👊）

### ThreadLocal 使用场景

1、用户会话信息
在 web 应用中，每个请求通常会在独立的线程中处理。可以使用 ThreadLocal 存储每个用户的会话信息，避免不同请求线程之间的数据混淆。

```java
public class UserContext {
    private static ThreadLocal<String> userHolder = ThreadLocal.withInitial(() -> null);

    public static void setUser(String user) {
        userHolder.set(user);
    }

    public static String getUser() {
        return userHolder.get();
    }

    public static void clear() {
        userHolder.remove();
    }
}

// 在某个请求处理线程中使用
UserContext.setUser("UserA");
String currentUser = UserContext.getUser();
System.out.println("Current User: " + currentUser);
UserContext.clear();

```



2、数据库连接管理
在线程中保存数据库连接，使得每个线程都有自己的数据库连接实例，避免了连接共享问题，提高了性能。


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