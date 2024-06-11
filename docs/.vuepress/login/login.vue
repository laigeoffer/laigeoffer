<template>
    <div class="popup-container">
      <div class="popup-content">
        <h2>该文档仅「来个offer项目交流圈」星球用户可见</h2>
        <p>知识星球内容包括：</p>
  
        <ol>
          <li>
            <a href="#"> 付费文档</a>：PmHub、技术派等项目配套的120+篇教程查看权限
          </li>
          <li>
            <a href="#">面试指南</a>：校招、社招的 40 万+字面试求职攻略
          </li>
          <li>
            <a href="#">专属问答</a>：向我们 1v1 发起提问，内容不限于 offer 选择、学习路线、职业规划等
          </li>
          <li>
            <a href="#">简历修改</a>：提供简历修改服务，附赠星球 100+优质简历模板可供参考
          </li>
        </ol>
        <div class="qr-section">
          <img src="https://cdn.tobebetterjavaer.com/stutymore/二哥星球-laigeoffer分享码_优惠券.jpg" alt="QR Code" />
        </div>
        <div class="steps">
          <p>步骤 1: [打开微信] -> [扫描上方二维码] -> [加入知识星球]</p>
          <!-- <p>步骤 2: [点击 <a href="#">链接地址</a>] -> [获得验证码]</p> -->
          <p>步骤 2: 访问星球置顶帖球友必看，获取项目配套文档的语雀访问地址和密码</p>
          <p>步骤 3: 微信联系：binshen818，获得验证码此页面解锁文档</p>
        </div>
        <div class="input-section">
          <input type="text" v-model="verificationCode" placeholder="请输入解锁验证码" />
          <button @click="submitCode">提交</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { STORAGE_KEY } from './helper'
  
  export default {
    data() {
      return {
        verificationCode: ''
      };
    },
    methods: {
      submitCode() {
        if (this.verificationCode) {
          
          if(this.verificationCode === "laigeoffer-666") {
            // 验证码提交逻辑
            const data = JSON.stringify({
              name: this.verificationCode,
              time: new Date().getTime()
            })
          
            window.localStorage.setItem(STORAGE_KEY, data)
            // 关闭窗口
            this.$emit('close', true)
            // 可以在这里添加提交验证码的API调用
          } else {
            alert("验证码错误，请加入星球后获取");
          }
          
        } else {
            alert("请输入验证码");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .popup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .popup-content {
    background: white;
    border-radius: 8px;
    max-width: 700px;
    width: 100%;
    max-height: 100vh;
    overflow-y: auto;
    padding: 80px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: left;
  }
  
  .qr-section img {
    width: 100%;
    height: auto;
    max-width: 650px; /* 确保图片不会太大 */
  }
  
  .input-section {
    margin-top: 20px;
  }
  
  .input-section input {
    padding: 10px;
    width: calc(100% - 22px);
    margin-bottom: 10px;
  }
  
  .input-section button {
    padding: 10px 20px;
    background-color: #60C084;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  