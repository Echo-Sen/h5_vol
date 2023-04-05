<template>
  <div>
    <!-- 登录状态 -->
    <IsLoginPage v-if="token" />
    <!-- 未登录状态 -->
    <UnLoginPage v-else />
  </div>
</template>

<script>
import IsLoginPage from './IsLoginPage/IsLoginPage.vue'
import UnLoginPage from './UnloginPage/UnloginPage.vue'
export default {
  components: {
    UnLoginPage,
    IsLoginPage,
  },
  data() {
    return {
      token: true,
    }
  },
}
</script>

<style></style>
