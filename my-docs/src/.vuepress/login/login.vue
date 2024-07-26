<template>
    <div class="popup-container">
      <div class="popup-content">
        <h2>该文档仅「二哥编程星球」的付费用户可见</h2>
  
        <ol>
          <li>
            <a href="#"> 付费文档</a>：微服务实战项目PmHub、前后端分离项目技术派等高质量项目的付费文档，超200篇，永久查看权限哦。
          </li>
          <li>
            <a href="https://javabetter.cn/zhishixingqiu/mianshi.html">面试指南</a>：我们编撰了超 50 万字的面试指南，包含面试准备篇、求职名单篇、面经分享篇、职场修炼篇、技术提升篇、场景设计题篇等，帮你打通求职的任督二脉。
          </li>
          <li>
            <a href="#">专属问答</a>：向二哥和苍何发起 1v1 提问，内容不限于 offer 选择、学习路线制定、职业规划、技术疑难杂症解决等。
          </li>
          <li>
            <a href="https://javabetter.cn/zhishixingqiu/jianli.html">简历修改</a>：提供精心的简历修改服务，附赠星球 500 份优质简历模板，为你打造一份投了就有笔试和面试的高分简历。
          </li>
        </ol>
        <div class="qr-section">
          <img src="https://cdn.tobebetterjavaer.com/stutymore/image-20240627144800.png" alt="QR Code" />
        </div>
        <div class="steps">
          <p>步骤 1: [打开微信] -> [扫描上方二维码] -> [加入知识星球]</p>
          <!-- <p>步骤 2: [点击 <a href="#">链接地址</a>] -> [获得验证码]</p> -->
          <p>步骤 2: 访问星球置顶帖<a href="https://t.zsxq.com/91hPx">球友必看</a>，获取付费文档的语雀访问地址和密码</p>
          <p>步骤 3: 微信联系：binshen818 解锁文档并加入 VIP 交流群</p>
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
  }
  
  .popup-content {
    background: white;
    max-width: 700px;
    width: 100%;
    max-height: 100vh;
    padding-left: 20px;
    padding-right: 20px;
    text-align: left;
    font-size: 16px;
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
    width: calc(100% - 110px);
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
  