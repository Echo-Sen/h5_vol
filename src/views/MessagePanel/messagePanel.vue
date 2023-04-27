<template>
  <div class="chat_commento">
    <!-- top -->
    <div class="chat_top">
      <span class="Text">ChatGPT</span>
      <van-loading
        v-show="!!throttle"
        class="loading"
        type="spinner"
        color="#1989fa"
        >请求中..</van-loading
      >
    </div>
    <!-- line -->
    <div class="line"></div>
    <!-- middle -->
    <div class="chat_middle" id="chat_middle_item" ref="myElement">
      <!-- 左边 -->
      <div v-for="(item, index) in Message" :key="index">
        <div class="chat_left clearfix" v-if="item.isbot">
          <div class="chat_left_item_1">
            <img src="@/assets/images/gpt.webp" />
          </div>
          <div class="chat_left_item_2">
            <div class="chat_time">{{ item.time }}</div>
            <div class="chat_left_content" v-html="item.msg"></div>
          </div>
        </div>
        <!--右边 -->
        <div class="chat_right" v-else>
          <div class="chat_right_item_1">
            <img class="avatar" :src="avatar" alt="avatar" />
          </div>
          <div class="chat_right_item_2">
            <div class="chat_right_time">{{ item.time }}</div>
            <div class="chat_right_content">
              {{ item.msg }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- line -->
    <div class="line"></div>
    <!-- foot -->
    <div class="chat_foot">
      <!-- context -->
      <textarea
        class="chat_context"
        id="chat_context_item"
        cols="30"
        rows="10"
        v-model="context"
        placeholder="请提问..."
        ref="input"
      ></textarea>

      <div class="chat_commit" @click="commit" id="button">发送</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast, Loading } from 'vant'
const HttpsProxyAgent = require('https-proxy-agent')
export default {
  data() {
    return {
      chat_context_item: null,
      context: '',
      Message: [],
      botMessage: [],
      throttle: false, // 节流阀
      avatar: '', // 头像
      inputTop: 0, // 输入框距离页面顶部的距离
      keyboardHeight: 0, // 软键盘的高度
    }
  },
  components: {
    [Loading.name]: Loading,
  },
  mounted() {
    const data = JSON.parse(localStorage.getItem('chatall'))
    const botmsg = JSON.parse(localStorage.getItem('chatbot'))
    if (localStorage.getItem('userinfo')) {
      this.avatar = JSON.parse(localStorage.getItem('userinfo')).avatar
    }

    if (data) {
      data.forEach((e) => {
        this.Message.push(e)
      })
      if (botmsg) {
        botmsg.forEach((e) => {
          this.botMessage.push(e)
        })
      }
      this.pullBottom()
      window.addEventListener('resize', this.onResize)
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    // 提交
    commit() {
      if (!this.throttle) {
        this.throttle = true
        let now = new Date()
        const hours = now.getHours().toString().padStart(2, '0') // 获取小时并补零
        const minutes = now.getMinutes().toString().padStart(2, '0') // 获取分钟并补零
        const timeString = `${hours}:${minutes}` // 拼接成时间字符串
        const option = {
          isbot: false,
          time: timeString,
          msg: this.handleInput(this.context),
        }
        if (option.msg === '') {
          Toast.fail('请输入内容')
          return
        }
        this.Message.push(option)
        const botMsg = { role: 'user', content: option.msg }
        this.botMessage.push(botMsg)
        this.pullBottom()
        this.context = ''
        this.botReturn()
      } else {
        Toast('请等待机器人回复')
      }
    },
    // 去除空格
    handleInput(input) {
      // 定义正则表达式，匹配是否含有空格和特殊字符
      const pattern = /^[^<>%^&*()+={}|[\]\\]+$/
      // 去除首尾空格
      input = input.trim()
      // 返回处理后的字符串
      return input
    },
    // 触底
    pullBottom() {
      this.$nextTick(() => {
        const myElement = this.$refs.myElement
        const height = this.$refs.myElement.scrollHeight
        myElement.scrollTop = height
      })
    },
    // 机器人回复
    botReturn() {
      const proxy = 'http://127.0.0.1:7890'
      const agent = new HttpsProxyAgent(proxy)
      // 设置API请求URL
      const apiUrl = 'https://api.openai.com/v1/chat/completions'
      // 设置请求参数
      const params = {
        model: 'gpt-3.5-turbo',
        messages: this.botMessage.slice(-3),
        max_tokens: 500,
        temperature: 0.5,
      }
      const LocalOptions = {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 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',
        },
        httpsAgent: agent, // 如果代理协议是https，则需要使用httpsAgent
        timeout: 1000 * 30, // 超时时间
      }
      axios
        .post(apiUrl, params, LocalOptions)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.choices[0].message.content)
            const obj = {
              role: 'assistant',
              content: res.data.choices[0].message.content,
            }
            this.botMessage.push(obj)
            localStorage.setItem('chatbot', JSON.stringify(this.botMessage))
            let now = new Date()
            const hours = now.getHours().toString().padStart(2, '0') // 获取小时并补零
            const minutes = now.getMinutes().toString().padStart(2, '0') // 获取分钟并补零
            const timeString = `${hours}:${minutes}` // 拼接成时间字符串
            const md = new markdownit()
            const result = md.render(res.data.choices[0].message.content)
            const option = {
              isbot: true,
              time: timeString,
              msg: result,
            }
            this.Message.push(option)
            localStorage.setItem('chatall', JSON.stringify(this.Message))
            this.pullBottom()
            this.throttle = false
          } else {
            this.throttle = false
          }
        })
        .catch((err) => {
          localStorage.setItem('chatall', JSON.stringify(this.Message))
          this.throttle = false
        })
    },

    onFocus() {
      // 获取输入框距离页面顶部的距离
      this.inputTop = this.$refs.input.getBoundingClientRect().top
    },
    onResize() {
      // 获取窗口可见区域的高度
      const windowHeight =
        document.documentElement.clientHeight || window.innerHeight

      // 计算软键盘的高度
      this.keyboardHeight =
        windowHeight - this.inputTop - this.$refs.input.offsetHeight
    },
  },
}
</script>

<style scoped>
.chat_commento {
  width: 100%;
  height: 600px;
  margin: auto;
  border-radius: 10px;
  border: 2px solid #f4f5f7;
  background-color: #f7f9fb;
}
.clearfix::after {
  content: '';
  display: block;
  clear: both;
  width: 0;
  height: 0;
  line-height: 0;
  visibility: hidden;
}
/* top */
.chat_top {
  width: 100%;
  height: 50px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  padding-left: 20px;
  font-size: 20px;
  line-height: 50px;
  box-sizing: border-box;
  font-weight: 550;
  border-width: 0px;
  display: inline;
}
.chat_top .Text {
  background: linear-gradient(to right, #ff6b6b, #556270);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
/* middle */
/* 左边 */
.chat_middle {
  width: 100%;
  height: 500px;
  position: relative;
  box-sizing: border-box;
  overflow: auto;
  border-width: 0px;
}

.chat_left {
  width: 100%;
  min-height: 120px;
  margin-top: 20px;
}
.chat_left_item_1 {
  width: 35px;
  height: 35px;
  background-color: #fff;
  float: left;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  line-height: 50px;
  color: white;
  border-radius: 25px;
}
.chat_left_item_1 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.chat_left_item_2 {
  width: 55%;
  min-height: 100px;
  float: left;
  margin-top: 10px;
}
.chat_left_item_2 .chat_left_chat {
  float: left;
}
.chat_left_item_2 .chat_left_content {
  padding: 15px;
  margin-top: 10px;
  background-color: #f4f5f7;
  display: inline-block;
  border-radius: 10px;
  border-top-left-radius: 0px;
  width: 230px;
  overflow: scroll;
  line-height: 20px;
  font-size: 14px;
}

pre code {
  width: 100%;
}
pre .language-javascript {
}
/* 右边 */
.chat_right {
  width: 100%;
  height: 120px;
  margin-top: 20px;
}
.chat_right_item_1 {
  width: 35px;
  height: 35px;
  float: right;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  line-height: 50px;
  color: white;
  border-radius: 25px;
}
.chat_right_item_2 {
  width: 55%;
  height: 100px;
  float: right;
  margin-top: 10px;
}
.chat_right_time {
  width: 100%;
  text-align: right;
}
.chat_right_content {
  float: right;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
  border-top-right-radius: 0px;
  background-color: #be79df;
  color: white;
  max-width: 230px;
  overflow: scroll;
  line-height: 20px;
  font-size: 14px;
}
.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* foot */
.chat_foot {
  width: 100%;
  height: 120px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;
}
.chat_context {
  width: 100%;
  height: 100%;
  font-size: 17px;
  box-sizing: border-box;
  outline: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-radius: 10px;
  border-width: 0px;
  padding: 16px;
}
.chat_commit {
  width: 80px;
  height: 30px;
  color: white;
  background-color: #be79df;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  bottom: 50px;
  margin-right: 10px;
}
.chat_context {
  resize: none;
}
.chat_context::placeholder {
  color: black;
  font-weight: 500k;
}
.line {
  width: 100%;
  border-top: 1px;
  border-color: #f4f5f7;
  border-style: solid;
}
.loading {
  z-index: 1;
  display: inline;
}
</style>
