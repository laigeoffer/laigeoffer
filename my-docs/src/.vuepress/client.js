// .vuepress/client.ts

import { defineClientConfig, usePageData } from 'vuepress/client'
import { checkAuth } from './components/helper'
import GlobalDialog from './components/GlobalDialog.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ref, onMounted, h, provide, inject } from 'vue'
import { useRouter } from 'vue-router'

export default defineClientConfig({
  enhance({ app, router, siteData}) {
    // 注册 Element Plus
    app.use(ElementPlus)
    
    // 注册全局组件
    app.component('GlobalDialog', GlobalDialog)
  },
  setup() {
    // 全局导航守卫
    const router = useRouter()
    const globalDialogRef = inject('globalDialogRef')
    router.afterEach(async (to, from) => {
      // 获取当前页面的 frontmatter 数据
      const pageData = usePageData()
      const requiresAuth = pageData.value.frontmatter.requiresAuth
      console.log('页面完全加载完毕')
      console.log('requiresAuth:', requiresAuth)
      // 可以取到 requiresAuth 的值了，接下来需要根据这个属性打开知识星球弹窗
      if (requiresAuth && !checkAuth()) {
        // 查找 GlobalDialog 组件实例并打开对话框
        if (globalDialogRef.value) {
          globalDialogRef.value.open()
        } else {
          console.error('GlobalDialog component not found.')
        }
      }
    })
  },
  rootComponents: [
    {
      setup() {
        const globalDialogRef = ref(null)

        provide('globalDialogRef', globalDialogRef)

        onMounted(() => {
          // 通过 provide 将 globalDialogRef 提供给其他组件使用
        })

        return () => h(GlobalDialog, { ref: globalDialogRef })
      }
    }
  ],
})