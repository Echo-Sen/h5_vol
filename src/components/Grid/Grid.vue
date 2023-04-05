<template>
  <van-grid icon-size="50px" :column-num="3" clickable>
    <van-grid-item icon="comment" text="资讯" to="/"> </van-grid-item>
    <van-grid-item icon="umbrella-circle" text="爱心雨伞" to="/" />
    <van-grid-item icon="fire" text="志愿风采" to="/" />
    <van-grid-item icon="photo-o" text="志愿服务项目" to="/" />
    <van-grid-item icon="photo-o" text="pspr培训报名" to="/" />
    <van-grid-item icon="photo-o" text="志愿活动报名" to="/" />
  </van-grid>
</template>
<script>
import { Grid, GridItem } from 'vant'
export default {
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
}
</script>

<style scoped></style>
