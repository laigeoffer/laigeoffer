---
title: PmHub 的前置环境准备：MySQL、Redis、RocketMQ、Nacos
shortTitle: PmHub 的前置环境准备
description: PmHub 的前置环境准备，包括 MySQL、Redis、RocketMQ、Nacos 等。
head:
  - - meta
    - name: keywords
      content: PmHub,pmhub,二哥的pmhub,MySQL,Redis,RocketMQ,Nacos,环境准备
categories: 
  - PmHub
  - 快速开始
author: 
  name: 苍何
  link: https://github.com/freestylefly
---

在本地启动 PmHub 的后端服务和前端服务之前，需要先在本地安装好 MySQL、Redis 和 Nacos。

当然 [JDK](https://javabetter.cn/overview/jdk-install-config.html)、[Maven](https://javabetter.cn/maven/maven.html)、[IDEA](https://javabetter.cn/overview/IDEA-install-config.html) 就属于更基础的前置条件了，这里就不再赘述。

好，来看一下 PmHub 的模块划分：

```
com.laigeoffer.pmhub     
├── pmhub-ui              // 前端框架 [1024]
├── pmhub-gateway         // 网关模块 [6880]
├── pmhub-auth            // 认证中心 [6800]
├── pmhub-api             // 接口模块
│       └── pmhub-api-system                          // 系统接口
├── pmhub-base          // 通用模块
│       └── pmhub-base-core                           // 核心模块
│       └── pmhub-base-datasource                     // 多数据源
│       └── pmhub-base-seata                          // 分布式事务
│       └── pmhub-base-security                       // 安全模块
│       └── pmhub-base-swagger                        // 系统接口
├── pmhub-modules         // 业务模块
│       └── pmhub-system                              // 系统模块 [6801]
│       └── pmhub-gen                                 // 代码生成 [6802]
│       └── pmhub-job                                 // 定时任务 [6803]
│       └── pmhub-project                             // 项目服务 [6806]
│       └── pmhub-workflow                            // 流程服务 [6808]
├── pmhub-monitor             						  // 监控中心 [6888]                 
├──pom.xml                                            // 公共依赖
```

再来看一下 PmHub 的版本依赖约定：

|    | 技术     | 名称        | 版本         | 官网        |
|----|-------|-----------|------------|---|
| 1 | Java                | 开发版本      | 1.8        | [https://www.oracle.com/java/technologies](https://www.oracle.com/java/technologies)    |                                                   
| 2  | Maven               | 项目构建管理    | 3.9.1      | [http://maven.apache.org](http://maven.apache.org)|
| 3 | MySQL              | 数据库       | 8.0        | [https://www.mysql.com](https://www.mysql.com)  |                                                   
| 4  | Redis               | 分布式缓存中间件  | Latest     | [https://redis.io](https://redis.io)      |
| 5  | Nacos               | 微服务配置中心和注册中心  |  2.3.2     | [https://nacos.io/docs/v2.3/what-is-nacos/](https://nacos.io/docs/v2.3/what-is-nacos/)|
| 6  | Spring Boot         | 基础框架      | 2.7.18     | [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot) | 
| 7  | SpringCloud         | 微服务框架     | 2021.0.8   | [https://spring.io/projects/spring-cloud](https://spring.io/projects/spring-cloud) |
| 8  | SpringCloud Alibaba | 阿里微服务框架   | 2021.0.5.0 | [https://github.com/alibaba/spring-cloud-alibaba](https://github.com/alibaba/spring-cloud-alibaba) |
| 9  | SpringCloud Gateway | 服务网关      | 3.1.8      | [https://spring.io/projects/spring-cloud-gateway](https://spring.io/projects/spring-cloud-gateway) |
| 10  | MyBatis-Plus        | 持久层框架     | 3.5.1      | [https://baomidou.com](https://baomidou.com)   |
| 11  | RocketMQ            | 消息队列      | 2.2.3      | [https://rocketmq.apache.org](https://rocketmq.apache.org)    |        
| 12  | HuTool              | 小而全的工具集项目 | 5.8.11     | [https://hutool.cn](https://hutool.cn)           |
| 13 | Sentinel            | 流控防护框架    | 1.8.6      | [https://github.com/alibaba/Sentinel](https://github.com/alibaba/Sentinel) |
| 14 | Docker| 容器|latest| [https://www.docker.com](https://www.docker.com)|


接下来我们来看一下 PmHub 的前置环境该如何安装，重点说一说 MySQL、Redis、Nacos 和 RocketMQ。

其中 MySQL、Redis 和 Nacos 是必须要先启动的，RocketMQ 是可选的。

## MySQL 准备

本地环境的安装推荐看二哥的 Java 进阶之路上这篇：[MySQL 的安装、启动、连接(Windows、macOS 和 Linux)](https://javabetter.cn/mysql/install.html)，讲的很详细。

安装成功后，执行 `mysql --version` 可以查看 MySQL 的版本。

![二哥的Java 进阶之路：macOS 上的 MySQL 版本](https://cdn.tobebetterjavaer.com/stutymore/environment-20240819162754.png)

这里再介绍一种 Docker 安装的方式（前提是已经安装了 Docker），主打的就是有问题铲了重装（但不建议）。

第一步，拉取 MySQL 镜像（5.7 版本够用了）：

```bash
docker pull mysql:5.7
```

第二步，启动 MySQL 容器：

```bash 
# 将容器的 3306 端口映射到主机的 3306 端口，这样就可以通过主机的 IP 地址和端口号访问 MySQL 服务。
# 指定容器的名称为 mysql，方便后续管理和操作
docker run -p 3306:3306 --name mysql \
# 将主机的 /home/mysql/log 目录挂载到容器的 /var/log/mysql 目录，用于存储 MySQL 的日志文件。
 -v /home/mysql/log:/var/log/mysql \
 # 将主机的 /home/mysql/data 目录挂载到容器的 /var/lib/mysql 目录，用于存储 MySQL 的数据文件。
 -v /home/mysql/data:/var/lib/mysql \
 # 将主机的 /home/mysql/conf 目录挂载到容器的 /etc/mysql 目录，用于存储 MySQL 的配置文件。
 -v /home/mysql/conf:/etc/mysql \
 # 将主机的 /home/mysql/mysql-files 目录挂载到容器的 /var/lib/mysql-files 目录，用于存储 MySQL 的文件数据。
 -v /home/mysql/mysql-files:/var/lib/mysql-files \
 # 设置 MySQL 的 root 用户密码为 root。这个参数使用了环境变量来传递密码信息。
 -e MYSOL_ROOT_PASSWORD=123456 \
 # 以后台模式运行 MySQL 容器，
 -d 
 # 内存限制
 --memory
 # 内存保留
 --memory-reservation
```

第三步，创建 MySQL 开发账号。

>为了安全起见，通常需要创建一个开发账号，特别是生产环境，不允许直接通过 root 账户来连接。

```bash
#切换到mysql库，mysql库里存放着user表
use mysql;
#查看user表现有
select host,user password from user;
#创建开发阶段所需临时用户：dev，自定义密码，尽量复杂化
create user 'dev'@'%' identified by '设置密码';

#如果密码设置错了还可以修改
ALTER USER 'dev'@'%' IDENTIFIED BY '设置密码';

#给开发用户分配访问权限，暂时允许任何主机连接，授权用户除了将权限授予其他账户的能力
GRANT ALL PRIVILEGES ON *.* TO 'dev'@'%';

# 修改后刷新权限
flush privileges;
#退出mysql数据库
exit;

mysql -u dev -p
```

### PmHub 的 MySQL 数据文件初始化

推荐大家使用 [Navicat](https://www.navicat.com.cn/products/navicat-premium-lite) 这款图形化数据库管理工具直接导入数据，目前已有免费的 lite 版本，不用破解。

#### ①、创建数据库 laigeoffer-pmhub

>也可以是其他名字，只要在配置文件里修改对应的数据库名即可。

![二哥的微服务项目PmHub：PmHub 表](https://cdn.tobebetterjavaer.com/images/20240324/83b5e36a95e04e3d951641215ff16dcf.png)

#### ②、导入数据库文件

Spring Boot 单体版本的 SQL 路径是 `/pmhub/pmhub-boot/sql/pmhub_20240305.sql`。

![PmHub：Spring Boot 单体版本的 SQL](https://cdn.tobebetterjavaer.com/stutymore/environment-20240819164124.png)

可以直接右键在 terminal 终端中打开，然后通过 pwd 和 ls 命令查看文件的绝对路径。拿到绝对路径后，就可以在 Navicat 中导入数据库文件了。

![PmHub：在 navicat 中导入 SQL 文件](https://cdn.tobebetterjavaer.com/images/20240324/aa4cb8f705aa4f46a7d4835c9d26a596.png)

导入完成后，刷新一下就可以看到最新的数据库表了。

微服务版本的 SQL 文件路径是 `/pmhub/sql/pmhub-*.sql`。

![PmHub：微服务版本下的 SQL 文件](https://cdn.tobebetterjavaer.com/stutymore/environment-20240819164245.png)

学习单体的导单体的，学习微服务的导微服务的，微服务的导入成功后应该会有 6 个数据库。

![二哥的 PmHub：6 个数据库](https://cdn.tobebetterjavaer.com/stutymore/environment-20240819172751.png)

## Redis 准备

Redis 的安装推荐看：[Redis 的安装，macOS、Windows 和 Linux](https://javabetter.cn/redis/install.html)

然后就是启动 Redis。

①、如果是 macOS 用户，可以直接在终端输入`redis-server`启动 Redis。

![二哥的 Java 进阶之路：macOS 下启动 Redis](https://cdn.tobebetterjavaer.com/images/README/1711692102829.png)

②、如果你是 Windows 用户，可以直接双击 redis-server.exe 启动 Redis。

③、当然也可以直接通过 Docker 拉取和启动 Redis 镜像。

```shell
# 拉取 Redis 镜像:
docker pull redis
# 启动 Redis 容器:
docker run --name my-redis -d redis
```


<ZsxqNoQrcodeBanner />

## Nacos 准备

::: tip
1、Nacos 是微服务环境下的配置中心和服务注册中，非常重要，所以在启动 PmHub 之前一定要在本地先启动 Nacos。

2、Nacos 是微服务场景下的服务发现和配置中心，之前没了解过的小伙伴可以看一下官方文档：[Nacos 官网](https://nacos.io/docs/v2.3/what-is-nacos/)。

3、简单解释一下：比如说现在有两个微服务 service-consumer 和 service-provider，它们两个服务之间如果需要通信的话，就需要先把 service-provider 注册到 Nacos，然后 service-consumer 才能通过 svcID 调用 service-provider 提供的服务。

![Nacos 官网](https://cdn.tobebetterjavaer.com/stutymore/environment-20240819183012.png)

4、在 PmHub 中，我们也会把对应的服务比如说 pmhub-gateway、pmhub-auth、pmhub-project、pmhub-workflow 等等注册到 Nacos 中。

5、除此之外，我们也会把 PmHub 的配置信息移交给 Nacos 并且持久到 MySQL 中。

![PmHub 的配置信息](https://cdn.tobebetterjavaer.com/stutymore/environment-20240819185338.png)
:::

可以到[ Nacos 官网](https://nacos.io/download/nacos-server/)下载 Nacos Server（建议 2.3.2 版本），我下载解压后的目录如下所示：

![二哥的 Java 进阶之路：Nacos 解压后](https://cdn.tobebetterjavaer.com/stutymore/environment-20240819185752.png)

当然也可以直接通过 docker 安装：

```bash
docker run \
-d -p 8848:8848 \
-p 9848:9848 \
--name nacos2 \
-e MODE=standalone \
-e TIME_ZONE='Asia/Shanghai' \
nacos/nacos-server:v2.1.1
```

PmHub 将 Nacos 中的配置信息都持久化到 MySQL 中了，这样就可以避免每次 Nacos 重启后配置信息丢失。

Nacos 的默认配置文件在 `/conf/application.properties` 中。

![二哥的 Java 进阶之路：nacos 的默认配置文件](https://cdn.tobebetterjavaer.com/stutymore/environment-20240819190624.png)

这里，我们需要对 Nacos 默认配置中的 MySQL 链接信息配置下，就像我们在单体项目中配置 MySQL 的链接信息一样。

你也可以直接复制 `pmhub/docker/nacos/conf/application.properties` 覆盖 Nacos 的配置文件（最好提前做一次备份，养成好习惯）。

![二哥的 PmHub：Nacos 的配置信息](https://cdn.tobebetterjavaer.com/stutymore/environment-20240819191117.png)

我对 Nacos 的配置信息做一些简单的介绍和说明，方便大家理解。

首先是 Nacos 中 DB（也就是 MySQL）的配置信息，主要是做 Nacos 的持久化：

```properties
spring.datasource.platform=mysql
db.num=1
db.url.0=jdbc:mysql://pmhub-mysql:3306/pmhub-nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user=root
db.password=laigeoffer-pmhub
```

1. 如果你的 Nacos 配置信息数据库名也是 pmhub-nacos，那么只需要修改 url（本地一般是 127.0.0.1）、用户名和密码即可。
2. 如果用户名也是 root，那么只需要修改密码即可。
3. 如果密码也一样，那么就不需要修改了（不可能，绝对不可能这么巧😂）。

然后是这部分，直接看注释吧，我就不废话了。

```properties
# 当服务为空时，是否自动清理
nacos.naming.empty-service.auto-clean=true
# 空服务清理的初始延迟时间（毫秒）
nacos.naming.empty-service.clean.initial-delay-ms=50000
# 空服务清理的周期时间（毫秒）
nacos.naming.empty-service.clean.period-time-ms=30000

# 允许暴露的 Web 端点（用于监控和管理）
management.endpoints.web.exposure.include=*

# 禁用 Elastic 的指标导出
management.metrics.export.elastic.enabled=false
# 禁用 Influx 的指标导出
management.metrics.export.influx.enabled=false

# 启用 Tomcat 的访问日志
server.tomcat.accesslog.enabled=true
# Tomcat 访问日志的格式
server.tomcat.accesslog.pattern=%h %l %u %t "%r" %s %b %D %{User-Agent}i %{Request-Source}i
# 设置 Tomcat 的基目录
server.tomcat.basedir=file:.

# 定义忽略安全验证的 URL 列表
nacos.security.ignore.urls=/,/error,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-ui/public/**,/v1/auth/**,/v1/console/health/**,/actuator/**,/v1/console/server/**
# 禁用 Istio MCP 服务器功能
nacos.istio.mcp.server.enabled=false
```

最后是鉴权部分的配置：

```properties
# 是否开启鉴权功能
nacos.core.auth.enabled=true
# 鉴权类型
nacos.core.auth.system.type=nacos
# 默认鉴权插件用于生成用户登陆临时accessToken所使用的密钥，使用默认值有安全风险
nacos.core.auth.plugin.nacos.token.secret.key=SecretKey01234567890123456789012112345678901234567890123456789012345678
# 用户登陆临时accessToken的过期时间，2.1.0及以上版本使用
nacos.core.auth.plugin.nacos.token.expire.seconds=18000
# 是否使用useragent白名单，主要用于适配老版本升级，置为true时有安全风险
nacos.core.auth.enable.userAgentAuthWhite=false
# 用于替换useragent白名单的身份识别key，使用默认值有安全风险（2.2.1后无默认值）
nacos.core.auth.server.identity.key=serverIdentity-laigeoffer-pmhub
# 用于替换useragent白名单的身份识别value，使用默认值有安全风险
nacos.core.auth.server.identity.value=security-laigeoffer-pmhub-666
# 启用 Nacos 的核心认证缓存机制
nacos.core.auth.caching.enabled=true
```

配置完成后，我们来启动 Nacos。

①、如果你是 macOS 用户，可以直接在终端输入`sh startup.sh -m standalone`启动 Nacos。

![二哥的 PmHub：启动macOS 下的 Nacos](https://cdn.tobebetterjavaer.com/stutymore/environment-20240819193412.png)

②、如果你是 Windows 用户，可以直接双击 startup.cmd 启动 Nacos。

启动成功后访问 [http://localhost:8848/nacos](http://localhost:8848/nacos) 即可看到 Nacos 控制台。

>默认用户名密码都是 nacos

![nacos启动成功界面](https://cdn.tobebetterjavaer.com/stutymore/20240529173621.png)

点击详情，可以看到对应配置的详细信息。

![二哥的 PmHub：配置详情](https://cdn.tobebetterjavaer.com/stutymore/environment-20240819193750.png)


## RocketMQ 准备

::: tip
之前的 PmHub 版本中，RocketMQ 是必须先启动的前置条件，但后面一些球友反馈 RocketMQ 在启动的时候遇到很多问题，尤其是 RocketMQ 5.x 版本中又新增了 很多新的东西，比如说 proxy。

所以最新的 PmHub 版本中，我把 RocketMQ 改为非必须启动项目了，最大程度减轻大家上手微服务实战项目的难度。
:::

RocketMQ 是阿里开源的一个消息中间件，具有高性能、高可靠、高实时、分布式的特点，底层是用 Java 语言开发的。2016 年成为 Apache 的顶级开源项目，在阿里内部也经历了多年双十一的拷打，主打一个能抗能打。

- 官网地址：[https://rocketmq.apache.org/](https://rocketmq.apache.org/)
- 开源地址：[https://github.com/apache/rocketmq](https://github.com/apache/rocketmq)

在 PmHub 中，我们就会使用 RocketMQ 进行任务下发，项目经理新建任务并设置好开始时间和执行人，到了指定时间，RocketMQ 就将消息发送给任务执行人。

![PmHub 新建任务通过 RocketMQ 定时下发](https://cdn.tobebetterjavaer.com/stutymore/environment-20240821141606.png)

### 二进制包安装

第一步，下载二进制包（已经编译完成可以直接运行的）：[https://rocketmq.apache.org/zh/docs/quickStart/01quickstart](https://rocketmq.apache.org/zh/docs/quickStart/01quickstart)，并解压：

![二哥的 PmHub：下载 RocketMQ](https://cdn.tobebetterjavaer.com/stutymore/environment-20240821143354.png)

第二步，启动 NameServer。NameServer 是 RocketMQ 的核心组件之一，负责管理 Topic 和 Broker 的路由信息。

```bash
nohup sh bin/mqnamesrv &
```

可以通过 `ps -ef | grep mqnamesrv` 查看是否启动成功。

![二哥的 PmHub：mqnamesrv 是否启动](https://cdn.tobebetterjavaer.com/stutymore/environment-20240821144034.png)

也可以通过查看日志文件 `tail nohup.out` 查看是否启动成功。

![二哥的 PmHub：nohup.out](https://cdn.tobebetterjavaer.com/stutymore/environment-20240821144437.png)

第三步，启动 Broker+Proxy。Broker 负责存储和转发消息，是 RocketMQ 中的另一个重要组件。Proxy 是用于支持新协议（如 gRPC）的扩展功能，以便与其他系统（例如 Apache Pulsar、Kafka 等）进行集成。

```bash
nohup sh bin/mqbroker -n localhost:9876 --enable-proxy &
```

同样可以通过 `tail -f nohup.out` 查看是否启动成功。

![二哥的 PmHub：启动 Broker+Proxy](https://cdn.tobebetterjavaer.com/stutymore/environment-20240821145224.png)

`tail -f ~/logs/rocketmqlogs/proxy.log` 也可以查看 Proxy 的日志。

![二哥的 PmHub：查看 Proxy 日志](https://cdn.tobebetterjavaer.com/stutymore/environment-20240821145327.png)

这段日志的大体含义，我简单解释下，这样大家会对 RocketMQ 的启动过程有一个大致的了解：

①、`grpc server has built. port: 8081`

这条日志表明 gRPC 服务器已成功构建，监听的端口是 8081。日志中的 tlsKeyPath 和 tlsCertPath 是 TLS（传输层安全性）的相关配置，表示 TLS 密钥和证书路径。threadPool 是 gRPC 服务器使用的线程池大小。

②、`Server is running in TLS permissive mode`

这条日志表示服务器正在以 TLS 宽松模式运行。宽松模式通常意味着服务器接受未加密和加密的连接请求。

③、`Using OpenSSL provider`

表示 gRPC 服务器使用的是 OpenSSL 作为其加密提供程序，OpenSSL 是一种常见的加密库，用于处理 SSL/TLS 协议。

④、`The broker[broker-a, 192.168.31.31:10911] boot success. serializeType=JSON and name server is localhost:9876`

这表示 RocketMQ 的 Broker 实例（标识为 broker-a，地址为 `192.168.31.31:10911`）已成功启动。Broker 使用 JSON 作为序列化方式，并且与 `NameServer localhost:9876` 连接成功。

⑤、`user specified name server address: localhost:9876`

表示用户明确指定了 NameServer 的地址为 localhost:9876。

⑥、`ocketmq-proxy startup successfully`

表示 RocketMQ 的 Proxy 组件已成功启动，代理服务现在已经可以正常工作。

至此，一个单节点副本的 RocketMQ 集群已经部署起来了。

## 小结

搭建环境对于初学者来说，其实是最难的，因为总会发生很多莫名其妙的问题，大家在遇到问题的时候也不要惊慌，可以在我们的 PmHub 交流群里提问，我的微信是 itwangersb

你也可以加入我们的知识星球，以获取 PmHub 更多的教程和帮助。

<PaidContentBanner />