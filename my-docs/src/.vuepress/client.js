import { defineClientConfig } from "vuepress/client";
import PaidContentBanner from "./components/PaidContentBanner.vue";

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.component("PaidContentBanner", PaidContentBanner);
  },
});