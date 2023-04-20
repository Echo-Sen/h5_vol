<template>
  <div v-if="!isIOS">
    <van-sticky :offset-top="0">
      <h1 class="title">
        <van-icon name="arrow-left" @click="back" class="back" />
        <span
          style="
            background: linear-gradient(to right, #6190e8, #a7bfe8);
            -webkit-background-clip: text;
            color: transparent;
          "
          >{{ title }}</span
        >
      </h1>
    </van-sticky>
  </div>
</template>

<script>
import { Sticky } from 'vant'
export default {
  props: ['title'],
  data() {
    return {
      isIOS: false,
    }
  },
  components: {
    [Sticky.name]: Sticky,
  },
  methods: {
    // 页面回退
    back() {
      this.$router.back()
    },
  },
  mounted() {
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent)

    if (isIOS) {
      this.isIOS = true
    }
  },
}
</script>

<style scoped>
/* 标题 */
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 标题居中 */
.title span {
  margin: 0 auto;
}
/* 回退 */
.back {
  align-self: center;
}
</style>
