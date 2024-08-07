import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "来个offer",
  description: "二哥编程星球的实战项目聚集地，联合苍何，助力每一个渴望进步的小伙伴拿到更好的 offer 💪🏻，目前已推出前后端分离项目技术派、微服务项目PmHub等。",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,

  head: [
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "沉默王二" }],
    [
      "meta",
      {
        "http-equiv": "Cache-Control",
        content: "no-cache, no-store, must-revalidate",
      },
    ],
    ["meta", { "http-equiv": "Pragma", content: "no-cache" }],
    ["meta", { "http-equiv": "Expires", content: "0" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "Java, pmhub,沉默王二,微服务,数据库, MySQL, Spring, Redis, MyBatis, SpringBoot, RocketMQ, Docker, Jenkins, Spring Security, Nacos,Skywalking,Sentinel,Seata,SpringCloud",
      },
    ],
    [
      "script",{},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?1bf37757658079324c657f14cf50284d";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_3180624_7cy10l7jqqh.css",
      },
    ],
  ],
});
