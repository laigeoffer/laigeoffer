---
title: PmHub架构师必备编码规范（🌟新人必看）
shortTitle: 架构师必备编码规范？
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

很多人自嘲自己为「码农」，但我不这样认为，我觉得我们应该是工程师，我们不是在写程序，我们是在建造数字摩天大楼。

架构是地基，应用是上层建筑，而要想建造好一个房子，重要的还有「砌墙的技术」，对于编程来说，我觉得，好的编码规范「砌墙的技术」是关键。

我们在后端开发的时候，如果没有一定的规范就可能会各自形成各自的风格，导致代码可维护性和可读性大大降低，特别是在团队协作开发的过程中，如果不形成统一的规范，会减低开发效率，代码的质量也不够高。

通过建立统一的标准和规范，提升协作效率，清晰的接口和模块定义，使前后端开发人员、不同模块的开发人员之间的协作更加顺畅和高效。

后端规范的制定和遵守，对项目的成功至关重要。它不仅提高了**开发效率**和**代码质量**，还增强了项目的可维护性和团队协作能力。通过长期坚持规范化的开发流程，可以显著提升项目的整体质量，减少开发和维护成本，确保项目的稳定性和安全性。规范化的开发实践，是每个成功的软件开发团队不可或缺的一部分。

这一章主要帮助大家学习并养成好的编码规范，**做好自我修养**。

# 1、基本约定
1.1、 源码（java/vue）、开发工具、jdk、mysql、redis、[rabbitmq](https://so.csdn.net/so/search?q=rabbitmq&spm=1001.2101.3001.7020)、nacos等存放路径禁止包含中文、空格、特殊字符等。
1.2、Java应用必须遵循《Java开发手册-黄山版》上约定 [Java开发手册(黄山版).pdf](https://sxsd.yuque.com/attachments/yuque/0/2022/pdf/29495295/1672197651636-b6381bdf-5444-4df3-bb75-5d27f4dc898d.pdf)
1.3、本规范指南的愿景是码出高效，码出质量。
1.4、所有系统application-local.yml等本地环境信息无需提交

# 2、开发工具统一
2.1、 IntelliJ IDEA（版本不限）
配套的必装的idea插件：[https://github.com/alibaba/p3c](https://github.com/alibaba/p3c)，所有人必须安装插件 
2.2、数据连接工具：navicat
2.3、接口文档及接口测试工具：Apifox 所有接口文档待系统上线后均需导出，存档 
2.4、JDK版本统一采用JDK8
2.5、代码版本管理统一使用：Git
2.6、代码仓库使用 GitHub，
# 3、Git规约
## 3.1、Git 提交规范

| 功能 | commit规范 | 示例 | 描述 |
| --- | --- | --- | --- |
| 新功能 | feat/module_name | feat/multi_merchant | 开发一个新功能 |
| bug修复 | bugfix/fix_name | bugfix/user | 修复某个功能模块的bug |
| 紧急修复 | hotfix/fix_name | hotfix/create_order | 紧急修复某个严重bug |
| 性能优化 | perf/name | pref/user_login | 优化某个功能的性能 |
| 格式调整 | style/name | style/log_print | 做一下不影响任何业务的优化，比如删掉不使用了的注释之类 |
| 重构 | refactor/name | refactor/user | 重构某个功能模块 |
| 测试 | test/name | test/user | 测试相关, 不涉及业务代码的更改 |
| 文档和注释 | docs/name | docs/user | 文档和注释相关 |
| 更新依赖等 | chore/name | chore/user | 更新依赖/修改脚手架配置等琐事 |


## 3.2、分支拉取规范

![image.png](https://cdn.tobebetterjavaer.com/stutymore/1716169800400-b85cd5c1-b699-4561-87e3-2884f9db3740.png)

对于已上线的系统，需从线上分支prod或者master分支拉取，对于未上线的系统，需从test分支拉取最新代码，相关分支 说明：

| 分支 | 是否受保护 | 说明 |
| --- | --- | --- |
| test | 是 | 测试环境分支 |
| pre | 是 | 预发布环境分支 |
| prod | 是 | 线上环境分支 |
| master | 是 | 存档分支，实时同步线上prod分之代码 |
| 其他分支 | 否 | 开发分支 |

代码提交规范：
commit信息补充完整，是解决什么问题或开发什么新功能，将自己分支的改动push到远程仓库，需要发布到测试环境， 需要到远程仓库发起合并请求，即”开发分支“-”test分支“，将合并请求链接发群里并@技术负责人，待负责人CR代码   后，方可合并，合并成功群里会有机器人通知，配合CI/CD，自动完成构建和部署。

# 4、数据库设计
4.1、 数据库使用 utf8mb4 字符集、存储引擎必须使用 InnoDB.  数据库名、表名、字段名统一使用小写字母或数字，切记不可以数字开始，库名跟项目名保持一致，表名如：b_业 务名称_表的作用表名不使用复数名词(反对orders)
4.2、表名避免过程用简写或者缩写，长度不超过 32 个字符   表、字段 必须加注释
4.3、 唯一索引名为 uk_字段名；普通索引名则为idx_字段名；表中索引数量不要超过6个 .  建立索引在选择性高的字段上，不要在sex、status上建
表中必须指定主键，且只有一个，主键的命名统一为: id

<PaidContentBanner />

