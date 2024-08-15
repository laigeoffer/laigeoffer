import { defineClientConfig } from "vuepress/client";
import PaidContentBanner from "./components/PaidContentBanner.vue";
import ZsxqContentBanner from "./components/ZsxqContentBanner.vue";
import ZsxqNoQrcodeBanner from "./components/ZsxqNoQrcodeBanner.vue";

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.component("PaidContentBanner", PaidContentBanner);
    app.component("ZsxqContentBanner", ZsxqContentBanner);
    app.component("ZsxqNoQrcodeBanner", ZsxqNoQrcodeBanner);
  },
});