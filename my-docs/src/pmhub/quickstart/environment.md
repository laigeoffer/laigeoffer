---
title: PmHub 的前置环境准备：MySQL、Redis、RocketMQ、Nacos
shortTitle: PmHub 的前置环境准备
categories: 
  - PmHub
  - 快速开始
author: 
  name: 苍何
  link: https://github.com/freestylefly
requiresAuth: false
---

::: tip 🚀 如何把PmHub项目“吃透”？

嗨嗨嗨，如果你正在为项目经历发愁，简历上只能写一些烂大街的项目，甚至连写什么都不知道，投出去的简历石沉大海，面试机会寥寥无几，那么请毫不犹豫地加入[来个 offer 编程星球](https://laigeoffer.cn/zsxq/)。我们将为你解决燃眉之急：

1、**<span style="color:red;">付费文档</span>**：微服务实战项目[PmHub](https://laigeoffer.cn/learn/)、前后端分离项目[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)等高质量项目的付费文档，超 60 万字，注意是一次付费享受永久查看权限哦😯。

2、**<span style="color:red;">面试指南</span>**：我们还编撰了超 50 万字的[Java面试指南](https://javabetter.cn/zhishixingqiu/mianshi.html)，包含面试准备篇、求职名单篇、面经分享篇、职场修炼篇、技术提升篇、场景设计题篇等，帮你打通求职的任督二脉，真正地吊打“面试官”。

3、**<span style="color:red;">专属问答</span>**：向二哥和苍何发起 1v1 提问，内容不限于 offer 选择、学习路线制定、职业规划、技术疑难杂症解决等。

4、**<span style="color:red;">简历修改</span>**：提供精心的[简历修改服务](https://javabetter.cn/zhishixingqiu/jianli.html)（已修改超 3000 份），附赠星球 500 份优质简历模板，为你打造一份投了就有笔试或者面试的高分简历。

5、**<span style="color:red;">学习环境</span>**：打造一个沉浸式的学习环境，营造一种高考冲刺、大学考研的氛围，对秋招、春招、社招的同学格外有用！

:::

## 模块划分

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


## 版本依赖约定


|    | 技术                  | 名称        | 版本         | 官网                                                                                                 |
|----|---------------------|-----------|------------|----------------------------------------------------------------------------------------------------|
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
| 11 | Java                | 开发版本      | 1.8        | [https://www.oracle.com/java/technologies](https://www.oracle.com/java/technologies)    


## MySQL 5.7.x

1、启动 MySQL 实例

::: tip
当然如果是正式的企业环境，我推荐还是本地安装，DB 数据本身大量和磁盘交互，而且需要数据库和业务系统隔离。
:::

这里介绍通过简易版方式安装（docker），主打的就是有问题铲了重装。

拉取 MySQL 镜像：

```bash
docker pull mysql:5.7
```

启动 MySQL 容器：

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

为了安全起见，通常需要自定义一个开发账号，然后赋予权限，特别是线上环境，不允许直接通过 root 账户来连接。

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





2、数据库初始化

推荐大家使用 [Navicat](https://javabetter.cn/nice-article/itmind/navicatmacyjpx.html) 这款图形化数据库管理工具直接导入厨具。

①、创建数据库 laigeoffer-pmhub

>也可以是其他名字，只要在配置文件里修改对应的数据库名即可。

![](https://cdn.tobebetterjavaer.com/images/20240324/83b5e36a95e04e3d951641215ff16dcf.png)


②、导入数据库文件，路径在 pmhub/sql/pmhub_20240305.sql 和 pmhub/sql/pmhub_nacos_20240423.sql

![](https://cdn.tobebetterjavaer.com/images/20240324/327783d299814ff8837ab5c3c64b3ff5.png)

可以直接右键在 terminal 终端中打开，然后通过 pwd 和 ls 命令查看文件的绝对路径。

![](https://cdn.tobebetterjavaer.com/images/20240324/24f0cbafe1fb4995827015c294196eb2.png)

拿到绝对路径后，就可以在 Navicat 中导入数据库文件了。

![](https://cdn.tobebetterjavaer.com/images/20240324/aa4cb8f705aa4f46a7d4835c9d26a596.png)

导入完成后，刷新一下就可以看到最新的数据库表了。



## Redis Latest


①、如果你是 macOS 用户，可以直接在终端输入`redis-server`启动 Redis。

![](https://cdn.tobebetterjavaer.com/images/README/1711692102829.png)

②、如果你是 Windows 用户，可以直接双击 redis-server.exe 启动 Redis。

③、当然也可以直接通过 Docker 启动 Redis。

```shell
# 拉取 Redis 镜像:
docker pull redis
# 启动 Redis 容器:
docker run --name my-redis -d redis
```

## RocketMQ 4.5.1

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



## Nacos 持久化

::: tip
Nacos 持久化的目的是为了防止每次 Nacos 服务挂了，配置都不见了，要重新配置。
:::

[官网](https://nacos.io/download/nacos-server/)下载 Nacos，找到 /conf/application.properties 文件，修改数据库连接信息。可以直接复制 pmhub/docker/nacos/conf/application.properties 内容。

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

修改下数据库配置信息为你自己的数据库，本地启动可以把鉴权关了。

```
1. 如果数据库名也是 laigeoffer-pmhub，那么只需要修改用户名和密码即可。
2. 如果用户名也是 root，那么只需要修改密码即可。
3. 如果密码也一样，那么就不需要修改了（不可能，绝对不可能这么巧😂）。
```

![修改nacos配置文件](https://cdn.tobebetterjavaer.com/stutymore/20240529173446.png)

①、如果你是 macOS 用户，可以直接在终端输入`sh startup.sh -m standalone`启动 Nacos。

②、如果你是 Windows 用户，可以直接双击 startup.cmd 启动 Nacos。

启动成功后访问 http://localhost:8848/nacos 即可看到 Nacos 控制台。默认用户名密码都是 nacos。

![nacos启动成功界面](https://cdn.tobebetterjavaer.com/stutymore/20240529173621.png)




