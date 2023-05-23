<template>
  <div class="container">
    <div class="img"><img src="@/assets/images/志愿活动.webp" alt=""></div>
    <van-button @click="goPublish" round block type="info" >发布活动</van-button>
    <van-button @click="goDelete" round block type="info" >删除活动</van-button>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  components: {
    [Button.name]: Button,
  },
  methods: {
    goPublish() {
      this.$router.push('/publishactivesDetail')
    },
    goDelete() {
      this.$router.push('/deleteactiviesDetail')
    },
  },
}
</script>

<style scoped>
.container {
  margin: 10px;
}

.img img{
    width: 100%;
  height: 100%;
  object-fit: cover;
}
.van-button {
  margin-bottom: 10px;
  margin-top: 20px;
  background-image: linear-gradient(to right, #bc95c6 0%, #7dc4cc 100%);
}
.van-button__text{

}
</style>
