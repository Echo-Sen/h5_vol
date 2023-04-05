<template>
  <van-swipe
    loop
    class="my-swipe"
    :autoplay="3000"
    indicator-color="#1989fa"
    :touchable="true"
  >
    <van-swipe-item
      class="van-swipe-item1"
      v-for="item in images"
      :key="item.index"
      ><img :src="item.imgUrl"
    /></van-swipe-item>
  </van-swipe>
</template>

<script>
// 数据请求
import { getSwipeData } from '@/api/swipe'
import { Swipe, SwipeItem } from 'vant'
export default {
  data() {
    return {
      images: null,
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  mounted() {
    getSwipeData().then((res) => {
      this.images = res.data.img
    })
  },
}
</script>

<style scoped>
.van-swipe-item1 {
  height: unset;
}
.my-swipe {
  border-radius: 0px 0px 20px 20px; /* 设置圆角半径 */
}
.my-swipe .van-swipe-item img {
  height: 100%;
  width: 100%;
  border-radius: 0px 0px 20px 20px;
}
</style>
