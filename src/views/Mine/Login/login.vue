<template>
  <div>
    <van-button color="skyblue" plain hairline type="primary" @click="goBack"
      >取消登录</van-button
    >
    <van-button color="red" plain hairline @click="login" type="primary"
      >确认登录</van-button
    >
  </div>
</template>

<script>
import { Button } from 'vant'
import { oauthUser } from '@/api/user'
export default {
  data() {
    return {
      res: ' ',
    }
  },
  components: {
    [Button.name]: Button,
  },
  methods: {
    goBack() {
      this.$router.push({ path: '/my' })
    },
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
      console.log(res);
      window.location.href = 'http://www.ctbucqt.cn:8080/my'
    },
  },
}
</script>

<style scoped></style>
