// .vuepress/client.ts

import { defineClientConfig, usePageData } from 'vuepress/client'
import GlobalDialog from './components/GlobalDialog.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default defineClientConfig({
  enhance({ app, router, siteData}) {
    // 注册 Element Plus
    app.use(ElementPlus)
    
    // 注册全局组件
    app.component('GlobalDialog', GlobalDialog)
  },
  setup() {
    
  },
  rootComponents: [
    {
      setup() {
      }
    }
  ],
})