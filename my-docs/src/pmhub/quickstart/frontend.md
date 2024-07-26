---
title: 如何在本地运行PmHub前端代码？
shortTitle: 启动PmHub前端
categories: 
  - PmHub
  - 快速开始
author: 
  name: 苍何
  link: https://github.com/freestylefly
requiresAuth: false
---
## 安装 Nodejs

PmHub 项目前端安装 16.18.1 版本的 Nodejs。


### 1. 电脑中没安装过 Nodejs

打开下述链接 🔗 访问 Nodejs 下载页面：[https://nodejs.org/download/release/v16.20.1/](https://nodejs.org/download/release/v16.18.1/)

根据不同的操作系统下载安装不同的包。下载完成后，双击打开对应的安装软件包，应该就可以通过鼠标点点点的方式进行安装。

![node安装](https://cdn.tobebetterjavaer.com/stutymore/1690616158906-316c912b-8ee6-40cc-9049-a0119db4d12d.png)

安装完成后，终端输入 node -v 检查是否安装成功，输入命令返回以下信息表示安装成功。

![查看node版本](https://cdn.tobebetterjavaer.com/stutymore/20240530175738.png)

### 2. 电脑中已安装过 Nodejs

如果电脑中已经存在 Nodejs 环境，检查版本是否在 16.18.1 或以上，如果不是需要安装 Nodejs 多版本控制组件，下载多个 Nodejs 共存，并通过命令切换。

1）MacOS 苹果电脑教程。

```bash
# 安装 n 组件
npm install -g n

# 安装完成后，查看 n -V
n -V
```

下载多版本 Nodejs 组件。

```bash
# 安装 16.20.0 版本的 Nodejs
n 16.20.0

# 安装完成后，执行切换
sudo n 16.20.0

# 切换成功后，输入 node -v 查看版本是否正确
node -v

```
2）Windows 电脑教程。

TODO 待补充。


## 启动前端项目

第一步，推荐使用 VSCode 打开 pmhub-ui 项目。

![](https://cdn.tobebetterjavaer.com/stutymore/README-20240329133716.png)

第二步，打开终端，执行 `npm install` 安装依赖：

项目依赖 Nodejs 环境，需要提前安装。此处略过。

![](https://cdn.tobebetterjavaer.com/stutymore/README-20240324122950.png)

不建议直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题。

```bash
npm install --registry=https://registry.npmmirror.com
```

如果出现 `npm ERR! code EIDLETIMEOUT` 错误，一般是因为网络问题导致的，可以重新再执行一次 `npm install`。

第三步，安装完依赖后，执行 `npm run dev` 启动项目：

如果 Nodejs 版本过新，可能会出现`Error: error:0308010C:digital envelope routines::unsupported`这个问题。

![](https://cdn.tobebetterjavaer.com/stutymore/README-20240324123352.png)

①、如果你是 Windows 用户，可以在 cmd 命令行中输入以下命令：

```bash
set NODE_OPTIONS=--openssl-legacy-provider
```

也可以在 PowerShell 中输入以下命令：

```bash
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

②、如果你是 macOS 用户，可以在终端中输入以下命令：

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

之后再次执行 `npm run dev` 即可正常启动项目。

![](https://cdn.tobebetterjavaer.com/stutymore/README-20240324123905.png)

浏览器会自动打开 `http://localhost:1024`，即可看到 pmhub-ui 项目登录页面。

![](https://cdn.tobebetterjavaer.com/stutymore/README-20240324124027.png)

第四步，微信搜索「苍何」，关注我们的公众号，回复 `pmhub` 获取账号和密码，帮我们增加一个粉丝，哈哈哈，开源不易，请满足一下我的虚荣心（😁）。

![](https://cdn.tobebetterjavaer.com/stutymore/README-20240330204001.png)

第五步，输入账号密码登录，即可看到 pmhub-ui 项目主页。

## pmhub-ui 发布说明

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
````


