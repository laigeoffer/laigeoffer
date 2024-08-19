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

先来看一下 PmHub 的模块划分：

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

|    | 技术                  | 名称        | 版本         | 官网        |
|----|---------------------|-----------|------------|------------------------------------|
| 1  | Spring Boot         | 基础框架      | 2.7.18     | [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)                   |
| 2  | SpringCloud         | 微服务框架     | 2021.0.8   | [https://spring.io/projects/spring-cloud](https://spring.io/projects/spring-cloud)                 |
| 3  | SpringCloud Alibaba | 阿里微服务框架   | 2021.0.5.0 | [https://github.com/alibaba/spring-cloud-alibaba](https://github.com/alibaba/spring-cloud-alibaba) |
| 4  | SpringCloud Gateway | 服务网关      | 3.1.8      | [https://spring.io/projects/spring-cloud-gateway](https://spring.io/projects/spring-cloud-gateway) |
| 5  | MyBatis-Plus        | 持久层框架     | 3.5.1      | [https://baomidou.com](https://baomidou.com)                                                       |
| 6  | Redis               | 分布式缓存数据库  | Latest     | [https://redis.io](https://redis.io)                                                               |
| 7  | RocketMQ            | 消息队列      | 2.2.3      | [https://rocketmq.apache.org](https://rocketmq.apache.org)                                         |
| 8  | HuTool              | 小而全的工具集项目 | 5.8.11     | [https://hutool.cn](https://hutool.cn)                                                             |
| 9  | Maven               | 项目构建管理    | 3.9.1      | [http://maven.apache.org](http://maven.apache.org)                                                 |
| 10 | Sentinel            | 流控防护框架    | 1.8.6      | [https://github.com/alibaba/Sentinel](https://github.com/alibaba/Sentinel)                         |
| 11 | Java                | 开发版本      | 1.8        | [https://www.oracle.com/java/technologies](https://www.oracle.com/java/technologies)    |
| 12 | MySQL              | 数据库       | 8.0        | [https://www.mysql.com](https://www.mysql.com)  |

好，接下来我们来看一下 PmHub 的前置环境该如何安装，重点说一说 MySQL、Redis、RocketMQ 和 Nacos。

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

可以到[ Nacos 官网](https://nacos.io/download/nacos-server/)下载 Nacos Server，我下载解压后的目录如下所示：

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

安装 NameServer。

```bash
docker run -d -p 9876:9876 --name rmqnamesrv foxiswho/rocketmq:server-4.5.1
```

安装 Brocker。

1）新建配置目录。

```bash
mkdir -p ${HOME}/docker/software/rocketmq/conf
```

2）新建配置文件 broker.conf。

```bash
brokerClusterName = DefaultCluster
brokerName = broker-a
brokerId = 0
deleteWhen = 04
fileReservedTime = 48
brokerRole = ASYNC_MASTER
flushDiskType = ASYNC_FLUSH
# 此处为本地ip, 如果部署服务器, 需要填写服务器外网ip
brokerIP1 = xx.xx.xx.xx
```

3）创建容器。

```bash
docker run -d \
-p 10911:10911 \
-p 10909:10909 \
--name rmqbroker \
--link rmqnamesrv:namesrv \
-v ${HOME}/docker/software/rocketmq/conf/broker.conf:/etc/rocketmq/broker.conf \
-e "NAMESRV_ADDR=namesrv:9876" \
-e "JAVA_OPTS=-Duser.home=/opt" \
-e "JAVA_OPT_EXT=-server -Xms512m -Xmx512m" \
foxiswho/rocketmq:broker-4.5.1
```

安装 RocketMQ 控制台。

```bash
docker pull pangliang/rocketmq-console-ng
docker run -d \
--link rmqnamesrv:namesrv \
-e "JAVA_OPTS=-Drocketmq.config.namesrvAddr=namesrv:9876 -Drocketmq.config.isVIPChannel=false" \
--name rmqconsole \
-p 8088:8080 \
-t pangliang/rocketmq-console-ng
```

运行成功，稍等几秒启动时间，浏览器输入 localhost:8088 查看控制台。
