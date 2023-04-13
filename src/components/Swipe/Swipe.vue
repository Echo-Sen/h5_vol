<template>
  <van-swipe
    loop
    class="my-swipe"
    :autoplay="3000"
    indicator-color="#1989fa"
    :touchable="true"
  >
    <van-swipe-item
      v-for="item in images"
      :key="item.index"
      ><img :src="item.imgUrl"
    /></van-swipe-item>
  </van-swipe>
</template>

<script>
// 数据请求
import { Swipe, SwipeItem } from 'vant'
export default {
  data() {
    return {
      images: [
        {
          imgUrl: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/duiqi.jpg',
          index: 0
        },
        {
          imgUrl: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717068.jpeg',
          index: 1
        },
        {
          imgUrl: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717071.jpeg',
          index: 2
        },
        {
          imgUrl: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717075.jpeg',
          index: 3
        }
      ],
    }
  },
props:['borrowUmbrella'],
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  mounted() {
  },
}
</script>

<style scoped>
.van-swipe-item {
  height: unset;
}
.my-swipe {
  border-radius: 0px 0px 20px 20px; /* 设置圆角半径 */
}
.my-swipe .van-swipe-item img {
  height: 100%;
  width: 100%;
  border-radius: 20px 20px 20px 20px;
}
</style>
