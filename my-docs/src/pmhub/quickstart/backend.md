---
title: 如何在本地运行PmHub后端代码？
shortTitle: 启动PmHub后端
categories: 
  - PmHub
  - 快速开始
author: 
  name: 苍何
  link: https://github.com/laigeoffer
requiresAuth: false
---

本地电脑上项目运行环境依赖组件以及版本信息如下：

* IntelliJ IDEA 尽量在 2019 以上版本，2021 版本及以上最好
* Git 代码版本管理工具
* JDK8+
* Maven（如果 IntelliJ IDEA 2021 版本及以上，内置了 Maven 组件）

添加苍何微信备注：pmhub，邀请你加入项目沟通群，和 3000+ 志同道合的程序员交流讨论。

![苍何微信](https://cdn.tobebetterjavaer.com/stutymore/%E6%A0%87%E5%87%86.png)


## 项目部署

### 环境准备

|    | 技术                | 名称               | 版本       | 官网                                                                                               |
|----|---------------------|------------------|------------|----------------------------------------------------------------------------------------------------|
| 1  | Spring Boot         | 基础框架           | 2.7.18     | [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)                   |
| 2  | SpringCloud         | 微服务框架         | 2021.0.8   | [https://spring.io/projects/spring-cloud](https://spring.io/projects/spring-cloud)                 |
| 3  | SpringCloud Alibaba | 阿里微服务框架     | 2021.0.5.0 | [https://github.com/alibaba/spring-cloud-alibaba](https://github.com/alibaba/spring-cloud-alibaba) |
| 4  | SpringCloud Gateway | 服务网关           | 3.1.8      | [https://spring.io/projects/spring-cloud-gateway](https://spring.io/projects/spring-cloud-gateway) |
| 5  | MyBatis-Plus        | 持久层框架         | 3.5.1      | [https://baomidou.com](https://baomidou.com)                                                       |
| 6  | Redis               | 分布式缓存数据库   | Latest     | [https://redis.io](https://redis.io)                                                               |
| 7  | RocketMQ            | 消息队列           | 2.2.3      | [https://rocketmq.apache.org](https://rocketmq.apache.org)                                         |
| 8  | HuTool              | 小而全的工具集项目 | 5.8.11     | [https://hutool.cn](https://hutool.cn)                                                             |
| 9  | Maven               | 项目构建管理       | 3.9.1      | [http://maven.apache.org](http://maven.apache.org)                                                 |
| 10 | Sentinel            | 流控防护框架       | 1.8.6      | [https://github.com/alibaba/Sentinel](https://github.com/alibaba/Sentinel)                         |
| 11 | Java                | 开发版本           | 1.8        | [https://www.oracle.com/java/technologies](https://www.oracle.com/java/technologies)               |

### 后端项目启动

真手把手教大家哦，不要怕，跟着我一步一步来就可以了。

#### 第一步，下载 pmhub 项目源码

①、使用 Git 命令

网络比较通畅的小伙伴可以直接从 GitHub 上拉取，命令如下：

```
git clone git@github.com:laigeoffer/pmhub.git
```

没那么通畅的小伙伴可以使用码云 Gitee 上的镜像仓库地址拉取（我们会每周同步一次）😄：

```
git clone https://gitee.com/laigeoffer/pmhub.git
```

②、直接下载压缩包

也可以直接下载 GitHub 上的压缩包，然后解压到本地。

- GitHub 地址：[https://github.com/laigeoffer/pmhub](https://github.com/laigeoffer/pmhub)
- 码云地址：[https://gitee.com/laigeoffer/pmhub](https://gitee.com/laigeoffer/pmhub)

![下载项目源码压缩包](https://cdn.tobebetterjavaer.com/images/20240324/76023993f091417a800ec7da19989e88.png)

③、直接通过 GitHub 桌面版

我个人一直比较喜欢使用 GitHub 桌面版来管理仓库，图形化界面操作起来也比较舒服。

![GitHub 桌面版操作仓库](https://cdn.tobebetterjavaer.com/images/20240324/27136b6558d84edb861461ca5452021d.png)

#### 第二步，使用 Intellij IDEA 导入项目

这一步应该就不需要我多讲了，相信大家都能搞定。

![idea 导入项目](https://cdn.tobebetterjavaer.com/images/20240324/62ee1affa2fd46ed89eaaa2d6931198b.png)

#### 第三步，导入数据库

推荐大家使用 [Navicat](https://javabetter.cn/nice-article/itmind/navicatmacyjpx.html) 这款图形化数据库管理工具。

①、创建数据库 laigeoffer-pmhub

> 也可以是其他名字，只要在配置文件里修改对应的数据库名即可。

![数据库文件](https://cdn.tobebetterjavaer.com/images/20240324/83b5e36a95e04e3d951641215ff16dcf.png)

②、导入数据库文件，路径在 pmhub/sql/pmhub_20240305.sql 和 pmhub/sql/pmhub_nacos_20240423.sql（如果数据库文件改了，这里没同步，你找到最新日期的就对了）

![注意文件路径](https://cdn.tobebetterjavaer.com/images/20240324/327783d299814ff8837ab5c3c64b3ff5.png)

可以直接右键在 terminal 终端中打开，然后通过 pwd 和 ls 命令查看文件的绝对路径。

![在 idea 中查看文件路径](https://cdn.tobebetterjavaer.com/images/20240324/24f0cbafe1fb4995827015c294196eb2.png)

拿到绝对路径后，就可以在 Navicat 中导入数据库文件了。

![在 navicat 中导入数据库文件](https://cdn.tobebetterjavaer.com/images/20240324/aa4cb8f705aa4f46a7d4835c9d26a596.png)

导入完成后，刷新一下就可以看到最新的数据库表了。

#### 第四步，基础环境准备

①、启动 Redis

如果你是 macOS 用户，可以直接在终端输入`redis-server`启动 Redis。

![启动 Redis](https://cdn.tobebetterjavaer.com/images/README/1711692102829.png)

如果你是 Windows 用户，可以直接双击 redis-server.exe 启动 Redis（我没有 Windows，没法截图啦）。

当然也可以直接通过 Docker 启动 Redis。

```shell
# 拉取 Redis 镜像:
docker pull redis
# 启动 Redis 容器:
docker run --name my-redis -d redis
```

②、启动 MySQL

可以选择本机直接安装 MySQL，也可以通过 Docker 的方式，但需要做好磁盘挂载，推荐本机安装，然后设置开机启动。

③、启动 Nacos

去[官网](https://nacos.io/download/nacos-server/)下载 Nacos。然后找到 `/conf/application.properties` 文件，修改数据库连接信息，参考 `pmhub/docker/nacos/conf/application.properties` 中的内容进行修改。

```
1. 如果数据库名也是 pmhub-nacos，那么只需要修改用户名和密码即可。
2. 如果用户名也是 root，那么只需要修改密码即可。
3. 如果密码也一样，那么就不需要修改了（不可能，绝对不可能这么巧😂）。
```

配置信息需要修改的地方看下图，本地启动可以把鉴权关了。

![修改nacos配置文件](https://cdn.tobebetterjavaer.com/stutymore/20240529173446.png)

①、如果你是 macOS 用户，可以直接在终端输入`sh startup.sh -m standalone`启动 Nacos。

②、如果你是 Windows 用户，可以直接双击 startup.cmd 启动 Nacos。

启动成功后访问 http://localhost:8848/nacos 即可看到 Nacos 控制台。默认用户名密码都是 nacos。

![nacos启动成功界面](https://cdn.tobebetterjavaer.com/stutymore/20240529173621.png)

#### 第五步，启动各个微服务

> 注意：如果遇到服务启动失败，可自行查看 nacos 配置是否做了修改，如数据库连接信息等。

①、启动 pmhub-gateway 网关服务

找到 pmhub-gateway 项目，右键 Run PmHubGatewayApplication.main()。

![pmhub-gateway启动成功](https://cdn.tobebetterjavaer.com/stutymore/20240529174025.png)

②、启动 pmhub-auth 认证服务

找到 pmhub-auth 项目，右键 Run PmHubAuthApplication.main()。

③、启动 pmhub-system 系统服务

找到 pmhub-system 项目（在 pmhub-modules 下），右键 Run PmHubSystemApplication.main()。
pmhub-system 启动前需要修改 nacos 中的 pmhub-system-dev.yml 配置文件，修改数据库连接信息为你自己的数据库。

![修改pmhub-system配置](img.png)

④、启动 pmhub-project 项目管理服务

找到 pmhub-project 项目（在 pmhub-modules 下），右键 Run PmHubProjectApplication.main()。

启动前需要修改 nacos 中的 pmhub-project-dev.yml 配置文件，修改数据库连接信息为你自己的数据库。

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




