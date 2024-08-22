---
title: 如何在本地运行微服务实战项目PmHub的后端代码？
shortTitle: 启动PmHub后端
categories: 
  - PmHub
  - 快速开始
author: 
  name: 苍何
  link: https://github.com/laigeoffer
---

PmHub 的[前置环境](https://laigeoffer.cn/pmhub/quickstart/environment.html)安装完成后，就可以在本地启动 PmHub 的后端服务了。

真手把手教大家哦，不要怕，跟着我一步一步来就可以了。

## 第一步，下载 pmhub 项目源码

### ①、使用 Git 命令

网络比较通畅的小伙伴可以直接从 GitHub 上拉取，命令如下：

```
git clone git@github.com:laigeoffer/pmhub.git
```

没那么通畅的小伙伴可以使用码云 Gitee 上的镜像仓库地址拉取（我们会每周同步一次）😄：

```
git clone https://gitee.com/laigeoffer/pmhub.git
```

### ②、直接下载压缩包

也可以直接下载 GitHub 上的压缩包，然后解压到本地。

- GitHub 地址：[https://github.com/laigeoffer/pmhub](https://github.com/laigeoffer/pmhub)
- 码云地址：[https://gitee.com/laigeoffer/pmhub](https://gitee.com/laigeoffer/pmhub)

![下载项目源码压缩包](https://cdn.tobebetterjavaer.com/images/20240324/76023993f091417a800ec7da19989e88.png)

### ③、直接通过 GitHub 桌面版

我个人一直比较喜欢使用 GitHub 桌面版来管理仓库，图形化界面操作起来也比较舒服。

![GitHub 桌面版操作仓库](https://cdn.tobebetterjavaer.com/images/20240324/27136b6558d84edb861461ca5452021d.png)

## 第二步，使用 Intellij IDEA 导入项目

导入后的目录结构如下所示：

![PmHub 的目录结构图](https://cdn.tobebetterjavaer.com/stutymore/backend-20240822135628.png)

## 第三步，启动 PmHub 的各个微服务

### ①、启动 pmhub-gateway 网关服务

注意启动前需要先修改 Nacos 的用户名和密码，路径如下图所示，把 discovery 和 config 下的两处 username 和 password 修改为你本地 Nacos 服务的默认用户名和密码，我的都是 nacos 

![二哥的 pmhub：修改 Nacos 的用户名和密码](https://cdn.tobebetterjavaer.com/stutymore/backend-20240822135708.png)

修改完成后，打开 PmHubGatewayApplication，然后运行它，如果没有报错的话，会在控制台看到类似下面的信息。

![pmhub-gateway启动成功](https://cdn.tobebetterjavaer.com/stutymore/backend-20240822135755.png)

### ②、启动 pmhub-auth 认证服务

也是先修改 Nacos 的用户名和密码。然后运行 PmHubAuthApplication。

### ③、启动 pmhub-system 系统服务

也是先修改 Nacos 的用户名和密码。

![pmhub-system中 Nacos 的用户名和密码修改](https://cdn.tobebetterjavaer.com/stutymore/backend-20240822140138.png)

然后还需要在 Nacos 后台服务中修改 pmhub-system-dev.yml 配置文件中的 MySQL 连接信息。

Nacos 后台服务地址：[http://localhost:8848/nacos/](http://localhost:8848/nacos/)

点击【编辑】：

![](https://cdn.tobebetterjavaer.com/stutymore/backend-20240822140405.png)

修改 MySQL 的用户名和密码：

![](https://cdn.tobebetterjavaer.com/stutymore/backend-20240822140450.png)

然后确认发布。

之后在 pmhub-system 项目（在 pmhub-modules 下），右键 `Run PmHubSystemApplication.main()`。

![运行PmHubSystemApplication](https://cdn.tobebetterjavaer.com/stutymore/backend-20240822140620.png)

### ④、启动 pmhub-project 项目管理服务

重复 pmhub-system 的步骤，还是先修改 Nacos 的用户名和密码，然后修改 pmhub-project-dev.yml 配置文件中的 MySQL 连接信息。

再在 pmhub-project 项目（在 pmhub-modules 下），右键 `Run PmHubProjectApplication.main()`。

⑤、启动 pmhub-workflow 流程管理服务

找到 pmhub-workflow 项目（在 pmhub-modules 下），右键 Run PmHubWorkflowApplication.main()。

启动前需要修改 nacos 中的 pmhub-workflow-dev.yml 配置文件，修改数据库连接信息为你自己的数据库。

⑥、启动 pmhub-gen 代码生成服务

找到 pmhub-gen 项目（在 pmhub-modules 下），右键 Run PmHubGenApplication.main()。

启动前需要修改 nacos 中的 pmhub-gen-dev.yml 配置文件，修改数据库连接信息为你自己的数据库。

⑦、启动 pmhub-job 定时任务调度服务

找到 pmhub-job 项目（在 pmhub-modules 下），右键 Run PmHubJobApplication.main()。

启动前需要修改 nacos 中的 pmhub-job-dev.yml 配置文件，修改数据库连接信息为你自己的数据库。

⑧、启动 pmhub-monitor 监控服务

找到 pmhub-monitor 项目，右键 Run PmHubMonitorApplication.main()。

启动前需要修改 nacos 中的 pmhub-monitor-dev.yml 配置文件，修改监控后台的用户名和密码，以及首页展示标题。

启动成功后可访问：http://localhost:6888/wallboard

可以在线实时查案各个服务的状态以及日志：

![主界面](https://cdn.tobebetterjavaer.com/stutymore/image.webp)


### 前端项目启动

请参考 pmhub-ui 项目的 README.md 文档，[前端工程结构说明](https://github.com/laigeoffer/pmhub/blob/master/pmhub-ui/README.md)，或者直接点击进入，[前端快速启动说明](https://laigeoffer.cn/pages/083160/)

### Swagger 地址

http://localhost:1024/dev-api/swagger-ui/index.html

### 服务器部署（Docker 方式）

请参考 [项目手册](https://laigeoffer.cn/)

## 技术选型

后端技术栈

|        技术         | 说明                                 | 官网                                                                                                                       |
|:-------------------:|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
|      讯飞星火       | 讯飞星火大模型                       | [https://www.xfyun.cn/doc/spark/Web.html](https://www.xfyun.cn/doc/spark/Web.html#_1-%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E) |
|       chatgpt       | chatgpt                              | [https://openai.com/blog/chatgpt](https://openai.com/blog/chatgpt)                                                         |
|       docker        | 应用容器引擎                         | [https://www.docker.com](https://www.docker.com)                                                                           |
|    elasticsearch    | 近实时文本搜索                       | [https://www.elastic.co/cn/elasticsearch/service](https://www.elastic.co/cn/elasticsearch/service)                         |
|        guava        | google 开源的 java 工具集            | [https://github.com/google/guava](https://github.com/google/guava)                                                         |
| hibernate-validator | 验证框架                             | [hibernate.org/validator/](hibernate.org/validator/)                                                                       |
|      hikariCP       | 数据库连接                           | [https://github.com/brettwooldridge/HikariCP](https://github.com/brettwooldridge/HikariCP)                                 |
|        https        | 证书                                 | [https://letsencrypt.org/](https://letsencrypt.org/)                                                                       |
|      ip2region      | ip 地址                              | [https://github.com/zoujingli/ip2region](https://github.com/zoujingli/ip2region)                                           |
|       jackson       | json/xml 处理                        | [https://www.jackson.com](https://www.jackson.com)                                                                         |
|         jwt         | jwt 登录                             | [https://jwt.io](https://jwt.io)                                                                                           |
|      liquibase      | 数据库版本管理                       | [https://www.liquibase.com](https://www.liquibase.com)                                                                     |
|       lombok        | Java 语言增强库                      | [https://projectlombok.org](https://projectlombok.org)                                                                     |
|       mongodb       | NoSql 数据库                         | [https://www.mongodb.com/](https://www.mongodb.com/)                                                                       |
| mybatis PageHelper  | 数据库翻页插件                       | [https://github.com/pagehelper/Mybatis-PageHelper](https://github.com/pagehelper/Mybatis-PageHelper)                       |
|    mybatis-plus     | 数据库 orm 框架                      | [https://baomidou.com/](https://baomidou.com/)                                                                             |
|        nginx        | 服务器                               | [https://nginx.org](https://nginx.org)                                                                                     |
|         oss         | 对象存储                             | [https://help.aliyun.com/document_detail/31883.html](https://help.aliyun.com/document_detail/31883.html)                   |
|     quick-media     | 多媒体处理                           | [https://github.com/liuyueyi/quick-media](https://github.com/liuyueyi/quick-media)                                         |
|        redis        | 内存数据存储                         | [https://redis.io](https://redis.io)                                                                                       |
|      rocketmq       | 消息队列                             | [https://rocketmq.apache.org/](https://rocketmq.apache.org/)                                                               |
|   sensitive-word    | 敏感词                               | [https://github.com/houbb/sensitive-word](https://github.com/houbb/sensitive-word)                                         |
| Spring & SpringMVC  | Java 全栈应用程序框架和 WEB 容器实现 | [https://spring.io/](https://spring.io/)                                                                                   |
|     SpringBoot      | Spring 应用简化集成开发框架          | [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)                                           |
|     SpringCloud     | 微服务框架                           | [https://spring.io/projects/spring-cloud](https://spring.io/projects/spring-cloud)                                         |
|       swagger       | API 文档生成工具                     | [https://swagger.io](https://swagger.io)                                                                                   |
|      thymeleaf      | html5 模板引擎                       | [https://www.thymeleaf.org](https://www.thymeleaf.org)                                                                     |
|      websocket      | 长连接                               | [https://docs.spring.io/spring/reference/web/websocket.html](https://docs.spring.io/spring/reference/web/websocket.html)   |




