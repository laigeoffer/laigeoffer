---
title: 如何在云服务器上使用 Docker部署PmHub？
shortTitle: Docker部署PmHub
categories: 
  - PmHub
  - 快速开始
author: 
  name: 苍何
  link: https://github.com/freestylefly
requiresAuth: false
---

采用的是 docker-compose 部署，部署步骤如下：


## 本地准备

因服务器构建太耗费资源，所以可以本地构建前端资源后上传到远程。

```bash
npm run build:prod
```

## 下载项目

```java
git clone git@github.com:laigeoffer/pmhub.git

# 进去目录
cd /这里是你的下载目录/pmhub-cloud/

```

## 打包构建项目

```bash
# 切换到目录
cd /这里是你的下载目录/pmhub-cloud/pmhub
# 包构建项目
mvn -T 1C clean package -Dmaven.test.skip=true -Dmaven.compile.fork=true

```

## 阿里云开启安全组

![image.png](https://cdn.tobebetterjavaer.com/stutymore/1716722906304-d6f071f4-daa4-4eec-b7b0-dbda24ddfa29.png)



## 拷贝 jar 包

可以上传 jar 到服务器，也可以直接服务器上构建后执行

```bash
# 去docker目录
cd /这里是你的下载目录/pmhub-cloud/pmhub/docker

# 执行拷贝
sh copy.sh

```

## 开启服务器防火墙

```bash
 sh deploy.sh port

# 查看防火墙是否开启
ufw status
```

## 启动基础环境

```bash
# 进去目录
cd /这里是你的下载目录/pmhub-cloud/pmhub/docker

# 启动基础环境（必须）
sh deploy.sh base
```




::: danger
每一个微服务启动都比较耗费资源，如果资源不够的可以单个单个启动，其中执行 sh deploy.sh base 的内部命令为：
```bash
# 启动基础环境（必须）分别启动 MySQL、Redis、nacos 容器
base(){
	docker-compose up -d pmhub-mysql pmhub-redis pmhub-nacos
}

```
:::



::: warning
👊 nacos 的配置中的 MySQL 要用容器内部端口 3306，而不应该是宿主机映射端口。
访问 nacos：[http://你的服务器地址:8848/nacos](http://你的服务器地址:8848/nacos)
用户名：nacos
密码：你设置的密码


nacos 默认不开启鉴权，需要单独开启鉴权，具体看配置文件
进入容器： docker exec -it pmhub-nacos /bin/bash 
配置更新需要先 stop 容器，然后重新用 docker-compose 重新启动
:::
docker exec -it pmhub-gateway /bin/bash 


## 启动网关和认证中心

```bash

# 进去目录
cd /这里是你的下载目录/pmhub-cloud/pmhub/docker

# 启动
sh deploy.sh important

# 查看是否启动
docker ps

# 查看启动日志
docker logs pmhub-gateway


```

![image.png](https://cdn.tobebetterjavaer.com/stutymore/1716735254077-c38e63e1-61b5-4928-87b0-783426b70c8b.png)

:::warning
重新构建：
 docker-compose build --no-cache 
:::

## 启动应用服务

```bash
# 会依次启动 pmhub-system pmhub-project pmhub-workflow
sh deploy.sh modules
```

## nginx 启动

Nginx 我建议不要用 docker 安装

```java
cd /etc/nginx/nginx.conf
```

```bash
# 1、检查配置是否正确
nginx -t

# 2、使配置生效
nginx -s reload

# 3、重启
systemctl restart nginx

# 4、查看Nginx状态
systemctl status nginx

# 5、查询Nginx进程：
ps -ef | grep nginx
查看进程id
ps -C nginx -o pid

```

```bash
# 进入Nginx配置目录
cd /etc/nginx/vhosts
```

修改 Nginx 文件中的前端地址

```bash
/这里是你的下载目录/pmhub-cloud/pmhub/docker/nginx/html/dist

```

::: tip
如果用docker启动一直有问题，也可以试试用 jar 包的方式启动，当然也可以添加苍何微信，在群里面大家一起交流。
:::

## 用 jar 包方式依次启动

::: warning
注意：
这个用 jar 包方式启动，如果终端关闭，对应的服务也会停止。
需要需要用 docker 方式
:::

1、pmhub-gateway

```bash
# 定位到jar目录
cd /这里是你的下载目录/pmhub-cloud/pmhub/docker/pmhub/gateway/jar

# 后台启动
java -jar pmhub-gateway.jar & 

# 查看是否启动
netstat -tuln | grep 6880
或者
ps aux | grep pmhub-gateway.jar

# 如何关闭服务
kill 12345

```

2、启动 pmhub-auth

```bash
# 定位到jar目录
cd /这里是你的下载目录/pmhub-cloud/pmhub/docker/pmhub/auth/jar

# 后台启动
java -jar pmhub-auth.jar & 

# 查看是否启动
ps aux | grep pmhub-auth.jar


```

如果启动报错，大概率是 nacos 鉴权问题导致，需要修改文件重新构建
参考其配置：/这里是你的下载目录/pmhub-cloud/pmhub/pmhub-gateway/src/main/resources

![image.png](https://cdn.tobebetterjavaer.com/stutymore/1716804163147-2468eece-dd3d-4dc0-aa29-bd8e86770954.png)


如何让 nacos 开启服务间不用鉴权功能因版本问题还在完善中

3、启动 pmhub-system

```bash
# 定位到jar目录
cd /这里是你的下载目录/pmhub-cloud/pmhub/docker/pmhub/modules/system/jar

# 后台启动
java -jar pmhub-system.jar & 

# 查看是否启动
ps aux | grep pmhub-system.jar


```

4、启动 pmhub-project

```bash
# 定位到jar目录
cd /这里是你的下载目录/pmhub-cloud/pmhub/docker/pmhub/modules/project/jar

# 后台启动
java -jar pmhub-project.jar & 

# 查看是否启动
ps aux | grep pmhub-project.jar


```

4、启动 pmhub-workflow

```bash
# 定位到jar目录
cd /这里是你的下载目录/pmhub-cloud/pmhub/docker/pmhub/modules/workflow/jar

# 后台启动
java -jar pmhub-workflow.jar & 

# 查看是否启动
ps aux | grep pmhub-workflow.jar

```
