<template>
  <div>
    <Back :title="'管理控制台'" />
    <div class="container">
      <div class="header">
        <img
          class="header-img"
          src="https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717075.jpeg"
          alt=""
        />
      </div>
      <van-grid :column-num="3" icon-size="40px" clickable>
        <van-grid-item
          icon-prefix="iconfont"
          icon=" icon-icon-quanxian"
          to="/applypermission"
          text="权限审批"
        />
        <van-grid-item
          icon-prefix="iconfont"
          icon=" icon-icon_xinyong_xianxing_jijin-207"
          to="/activitieslist"
          text="活动报名"
        />
        <van-grid-item
          icon-prefix="iconfont"
          to="/feedbackinfo"
          icon=" icon-fankui"
          text="意见反馈"
        />
        <van-grid-item
          icon-prefix="iconfont"
          to="/borrowingInfopage"
          icon=" icon-umbrella"
          text="爱心雨伞"
        />
        <van-grid-item
          icon-prefix="iconfont"
          to="/alluserinfo"
          icon=" icon-xiaoyuanzixun-01"
          text="用户信息"
        />

        <van-grid-item
          icon-prefix="iconfont"
          to="/activiesmanage"
          icon=" icon-fabu-"
          text="活动管理"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vant'
export default {
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  data() {
    return {
      value: '',
    }
  },
}
</script>

<style scoped>
.container {
  position: relative;
  margin: 10px;
  min-height: 100px;
  width: 100%;
}
.header {
  z-index: 1;
  position: absolute;
  height: 200px;
  width: 100%;
}
.header-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}
.van-grid {
  display: flex;
  position: absolute;
  top: 200px;
  width: 100%;
}
</style>
