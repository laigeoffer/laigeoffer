---
title: PmHub本地搭建MySQL
shortTitle: PmHub本地搭建MySQL
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
如果是正式的企业环境，我推荐还是本地安装，DB 数据本身大量和磁盘交互，而且需要数据库和业务系统隔离。


![macOS 下搭建 MySQL教程](https://cdn.tobebetterjavaer.com/stutymore/20240807215510.png)

![windows 下搭建 MySQL](https://cdn.tobebetterjavaer.com/stutymore/20240807215547.png)

因不同的系统搭建会有差异，大家也可以自定搜索搭建指南，这里仅列出常用的系统和方式。

windows 下搭建 MySQL
详见：windows下安装MySQL教程
macOS 下搭建 MySQL
详见：mac下安装MySQL
docker 搭建 MySQL

docker 是可以在不同的操作系统下使用的，通过 docker 安装也是最省事的，但生产上安装 MySQL 不建议 docker 安装。


<PaidContentBanner />
