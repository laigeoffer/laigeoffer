import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/zsxq/": [
    "",
  ],
  "/pmhub/": [
    {
      text: "🔥项目教程",
      collapsible: true,
      children: [
        "about",
        "why",
        "learn",
        "tech-architecture",
        "product-prototype",
        "api-doc",
        "real-interview",
      ],
    },
    {
      text: "快速开始",
      collapsible: true,
      prefix: "quickstart/",
      children: [
        "environment",
        "backend",
        "frontend",
        "docker",
        "nginx",
      ],
    },
  ],
});
