<template>
  <div class="waiting-countdown">
    <p>{{ countdown }} 秒后自动跳转...</p>
  </div>
</template>

<script>
import { Button } from 'vant'
import { oauthUser } from '@/api/user'
export default {
  mounted() {
    this.login()
    // 开始倒计时
    this.interval = setInterval(() => {
      this.countdown--
      if (this.countdown === 0) {
        clearInterval(this.interval) // 倒计时结束时清除定时器
        window.location.href = 'http://www.ctbucqt.cn:8080/my'
      }
    }, 1000)
  },
  destroyed() {
    clearInterval(this.interval) // 离开页面时清除定时器
  },
  data() {
    return {
      res: ' ',
      countdown: 3, // 设置初始倒计时时间
    }
  },
  components: {
    [Button.name]: Button,
  },
  methods: {
    login() {
      if (this.isCode()) {
        this.getOathUser()
      }
    },
    isCode() {
      return window.location.href.includes('code=')
    },
    async getOathUser() {
      const code = window.location.href.split('code=')[1].split('#')[0]
      const res = await oauthUser(code)
      this.res = res.data
      localStorage.setItem('userinfo', JSON.stringify(res.data))
      localStorage.setItem(
        'token_expires_at',
        JSON.stringify(Date.now() + 24 * 60 * 60 * 1000)
      ) // 1天后过期
    },
  },
}
</script>

<style scoped></style>
