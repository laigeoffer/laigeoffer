---
title: PmHub 的常见问题 Q&A
head:
  - - meta
    - name: keywords
      content: PmHub,pmhub,二哥的pmhub,常见问题,常见问题解答,pmhub常见问题,pmhub常见问题解答
categories: 
  - PmHub
  - 开篇词
author: 
  name: 苍何
  link: https://github.com/freestylefly
---

接下来，我们会把 pmhub 在上线后遇到的一些实际问题整理到这里，以便帮助大家解决更多 pmhub 实际开发过程中的问题。

## Q：不少小伙伴问过我这样一个问题，现在把 PmHub 写到简历上来得及吗？

A：根据星球中已经在面试的小伙伴反馈，基础不错的话，5-10 天的冲刺就可以参加面试了，因为我们的教程写得足够通俗易懂，并且把面试中常见的问题都总结了模板和套路。

如果基础比较差的话，一个月到两个月肯定是能够拿下的，因为我们会在星球中提供一对一的答疑服务，帮助大家解决学习过程中遇到的问题。

并且我们还会组建一个 25 届秋招特训营，让大家互相鼓励，互相监督，一起进步。

这些举措能在最大程度上降低大家的学习成本，提高学习效率。

## Q：里面这么多代码设计方案，学生能看明白么？
A：我们的教程是经过深思熟虑的，一部分讲解技术实现细节，通过这部分教程能够让大家快速掌握核心技术；另外一部分会讲如何从零到一实现 PmHub，包括如何从单体拆分到微服务。

结合这两种相辅相成的教程，可以帮助大家最大力度地吸收 PmHub 中的优秀代码方案。

## Q：如何把 PmHub 项目写到我的简历上？

A：我们会根据多年的面试经验，总结出一份 PmHub 项目的模板，包括项目介绍、项目技术栈、项目亮点、项目收获等，大家可以根据这个模板来撰写简历。

![](https://cdn.tobebetterjavaer.com/stutymore/qa-20240815135156.png)

并且我们还提供了简历精修服务，可以帮助大家把简历写得更加专业，更加有吸引力。

![](https://cdn.tobebetterjavaer.com/stutymore/qa-20240815135213.png)

后期我们还会收集球友们关于 PmHub 的真实项目经历，放到星球的精选简历模板中，供大家学习和借鉴。

![](https://cdn.tobebetterjavaer.com/stutymore/qa-20240815135226.png)

## Q：工作几年的有必要看 PmHub 吗？
A：我觉得很有必要，尤其是那些想要跳槽拿到更大 offer 的小伙伴，以及那些想在技术上有所突破的小伙伴。

因为 PmHub 项目中的技术栈非常全面，包括 SpringCloud Alibaba、LLM、Redis、RocketMQ、Docker、Jenkins、Spring Security、Nacos、Spring Boot Actuator、Skywalking、Sentinel、Seata、Vue 等等，这些技术在互联网行业中非常常见，掌握这些技术，对于你的职业发展绝对是有帮助的。

## Q：mq 无法启动怎么办？

A：很多小伙伴群里反馈 mq 启动问题，因为 rocketmq 自身原因比较复杂，启动和配置是需要花费一些时间的，教程中的又 mac 和 windows 以及小伙伴贴出的教程，但是不要担心，默认我已经把 mq 依赖关闭，现在可以放心的先启动啦。

## Q：为什么我的配置文件打开全是乱码呢？

![PmHub IDEA 打开后，配置文件 application.properties 乱码](https://cdn.tobebetterjavaer.com/stutymore/qa-20240819184637.png)

A：找到 setting ➡️ file encodings，然后找到 default encoding for properties files：修改为 UTF-8，之前如果是 ISO-8859-1 的话，调整一下。

![IDEA 调整 properties 的编码](https://cdn.tobebetterjavaer.com/stutymore/qa-20240819184711.png)

<PaidContentBanner />