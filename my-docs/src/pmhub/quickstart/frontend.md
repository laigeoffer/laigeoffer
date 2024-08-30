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

首先安装 Nodejs 环境，Nodejs 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。使用了事件驱动、非阻塞式 I/O 的模型，使其成为前端最主流的开发环境。

PmHub 的前端项目是基于 Vue.js 框架开发的，所以需要安装 Nodejs 环境。

另外，Node.js 附带了一个强大的包管理工具 npm（Node Package Manager），我们可以通过 npm 快速安装各种第三方包。

我本地的 Nodejs 版本是 20.16.0，见下图。

![二哥的 PmHub：Node.js 版本](https://cdn.tobebetterjavaer.com/stutymore/frontend-20240830182820.png)

打开下述链接 🔗 访问 Nodejs 下载页面：[https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)

Node.js 官方提供了多种安装方式，我这里推荐大家使用 installer 安装包，比较不动脑子，直接双击安装。

![二哥的 PmHub：Node.js 官方](https://cdn.tobebetterjavaer.com/stutymore/frontend-20240830183739.png)

安装完成后，可以输入 `node -v` 检查是否安装成功。

## 启动 PmHub 前端项目

微服务版的 PmHub 前端服务在这个地址中：[https://github.com/laigeoffer/pmhub/tree/master/pmhub-ui](https://github.com/laigeoffer/pmhub/tree/master/pmhub-ui)

可以直接根据 [readme](https://github.com/laigeoffer/pmhub/blob/master/pmhub-ui/README.md) 中的说明进行安装启动，这里就不再重复说明。

启动后的效果如下图所示：

![二哥的 PmHub：前端首页](https://cdn.tobebetterjavaer.com/stutymore/README-20240830180441.png)