<template>
  <div class="box">
    <router-view />
    <div style="height: 5rem"></div>
    <van-tabbar
      route
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
    >
      <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="newspaper-o" replace to="/message"
        >失物招领</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" replace to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    }
  },
  components: {},
}
</script>

<style>
.box {
  min-height: 100vh;
  background-color: rgba(128, 128, 128, 0.02);
}
.box .van-tabbar-item {
  background-color: rgba(128, 128, 128, 0.06);
}
</style>
