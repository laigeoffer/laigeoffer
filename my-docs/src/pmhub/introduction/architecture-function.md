---
title: PmHub 架构及功能概览（🌟新人必看）
shortTitle: PmHub 架构及功能概览
tags: 
  - pmhub
  - 微服务
  - 分布式
  - 项目管理
requiresAuth: ture
categories: 
  - PmHub
  - 开篇词
---

你可能会觉得架构离自己还挺遥远，那是架构师该关心的事儿，自己只需要做好本分的 CRUD 即可。

曾几何时，我也和你一样的想法，但今时不同往日，竞争激烈是一方面，更重要的是要求能力**进一步提高**了。

我们会先让大家快速了解 PmHub **的架构及功能**，然后再进行 PmHub 架构选型设计的**经验实战**，针对不同目标，完全可以针对性的学习。

## PmHub 架构

### 单体版本
单体版本采用传统的分包 SOA 设计架构，即不同的业务放在不同的包，并抽离出公共组件及系统框架层面组件分包放置。
```
pmhub
├── pmhub-admin -- 核心配置，如：国际化、mybatis、日志、swagger及配置文件
├── pmhub-common -- 通用组件都放在这个模块，各模块公共方法、注解、配置、常量、模型转换、异常、过滤器，全局预防 xss 脚本攻击
├── pmhub-workflow -- 流程管理模块，包含流程分类、表单设计、流程设计、部署管理
├── pmhub-framework -- 关于框架相关功能都在这个模块，如多数据源配置，限流处理、MybatisPlus、redis、连接池配置等
├── pmhub-generator -- 代码生成相关控制器及配置
├── pmhub-oa -- 企微绑定以及第三方 OA 系统绑定，统一登录认证中心
├── pmhub-project -- 涉及项目管理，任务管理、项目设置，任务流转等
├── pmhub-quartz -- 定时任务调度中心
├── pmhub-system -- 对应系统管理模块，含用户管理、角色管理、日志管理等
├── pmhub-ui -- 前端项目源码
```

![image.png](https://cdn.nlark.com/yuque/0/2024/png/29495295/1720148477541-161d097a-23d5-48e4-bb4c-08a58e06458f.png#averageHue=%235a532c&clientId=ue003cb06-8710-4&from=paste&height=393&id=u9014dae6&originHeight=786&originWidth=1933&originalType=binary&ratio=2&rotation=0&showTitle=false&size=253258&status=done&style=none&taskId=u9b219608-1774-4662-b44f-e099eb450eb&title=&width=966.5)

相信大家对于技术派有过深入了解的话，对 PmHub 的单体版本估计上手会更快，一个 run 方法运行直接搞定。

故而，我们主要针对微服务版本展开；

<PaidContentBanner />