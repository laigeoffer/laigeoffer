<template>
    <el-dialog :visible.sync="visible" title="温馨提示：" width="700px">
      <ZSXQ @close="handleClose" />
    </el-dialog>
  </template>
  
  <script>
  // 导入 zsxq 组件
  import ZSXQ from './ZSXQ.vue'
  
  export default {
    components: { ZSXQ },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      open() {
        this.visible = true
      },
      handleClose() {
        this.visible = false
      }
    }
  }
  </script>
  
  <style scoped>
  /* 你的样式 */
  </style>