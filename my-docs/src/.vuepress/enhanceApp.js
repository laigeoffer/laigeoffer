// .vuepress/enhanceApp.js

import { checkAuth } from './login/helper'
import Login from './login/login'

export default ({ Vue }) => {
  console.log('EnhanceApp file loaded'); // 添加调试信息
  Vue.mixin({
    mounted() {
      console.log('Component mounted'); // 添加调试信息
      const requiresAuth = this.$page.frontmatter.requiresAuth;
      console.log('requiresAuth:', requiresAuth); // 添加调试信息

      const doCheck = () => {
        if (requiresAuth && !checkAuth()) {
          console.log('Showing login dialog'); // 添加调试信息
          this.$dlg.modal(Login, {
            width: 700,
            height: 600,
            title: '温馨提示：',
            singletonKey: 'employee-login',
            maxButton: false,
            closeButton: false,
            callback: data => {
              if (data === true) {
                // 登录后的处理逻辑
              }
            }
          });
        }
      };

      if (this.$dlg) {
        doCheck();
      } else {
        import('v-dialogs').then(resp => {
          Vue.use(resp.default);
          this.$nextTick(() => {
            doCheck();
          });
        });
      }
    }
  });
}