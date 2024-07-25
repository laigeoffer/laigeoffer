import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: '🔥项目教程',
    children: [
      {
        text: 'PmHub',
        link: '/pmhub/about',
      },
      {
        text: '技术派',
        link: 'https://paicoding.com/article/detail/15',
      },
    ],
  },
  {
    text: '🚀在线体验',
    children: [
      {
        text: 'PmHub',
        link: 'https://pmhub.laigeoffer.cn',
      },
      {
        text: '技术派',
        link: 'https://paicoding.com/',
      },
    ],
  },
  {
    text: '🌈加入学习群',
    link: '/zsxq/',
  },
  {
    text: '珍藏资源',
    children: [
      { text: '⬇️PDF下载', link: '/resource/pdftoc/' },
      { text: '🔓破解合集', link: '/pages/pojieheji/' },
    ],
  },
  {
    text: '后端技术',
    link: '/technology/mq/', //目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
    children: [
      { text: '消息队列', link: '/technology/mq/' },
      { text: '微服务', link: '/pages/weifuwu/' },
      { text: '云原生', link: '/pages/yunyuansheng/' },
      { text: '大模型&AIGC', link: '/pages/aigc/' },
    ],
  },
]);
