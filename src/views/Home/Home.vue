<template>
  <div class="container">
    <!-- 轮播图 -->
    <Swipe />
    <!-- 新闻提示 -->
    <NoticeBar :text="'使用系统遇到问题？企业微信联系 邓森'" />
    <!--  -->
    <Gird />
    <!-- 分隔符 -->
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      动态
    </van-divider>
    <!-- 卡片 开始 -->
    <!-- 发布时间 -->
    <van-divider>发布时间：2023-04-02</van-divider>
    <div class="card">
      <img
        src="https://picsum.photos/500/300"
        alt="Card Image"
        class="card-img"
      />
      <div class="card-body">
        <h2 class="card-title">人工智能学院“小红帽”常青藤青年志愿者服务队123456</h2>
      </div>
    </div>

    <van-divider>发布时间：2023-04-02</van-divider>
    <div class="card">
      <img
        src="https://picsum.photos/500/300"
        alt="Card Image"
        class="card-img"
      />
      <div class="card-body">
        <h2 class="card-title">人工智能学院“小红帽”常青藤青年志愿者服务队</h2>
      </div>
    </div>
    <van-divider>发布时间：2023-04-02</van-divider>
    <div class="card">
      <img
        src="https://picsum.photos/500/300"
        alt="Card Image"
        class="card-img"
      />
      <div class="card-body">
        <h2 class="card-title">人工智能学院“小红帽”常青藤青年志愿者服务队</h2>
      </div>
    </div>
    <van-divider>发布时间：2023-04-02</van-divider>
    <div class="card">
      <img
        src="https://picsum.photos/500/300"
        alt="Card Image"
        class="card-img"
      />
      <div class="card-body">
        <h2 class="card-title">人工智能学院“小红帽”常青藤青年志愿者服务队</h2>
      </div>
    </div>
    <van-divider>发布时间：2023-04-02</van-divider>
    <div class="card">
      <img
        src="https://picsum.photos/500/300"
        alt="Card Image"
        class="card-img"
      />
      <div class="card-body">
        <h2 class="card-title">人工智能学院“小红帽”常青藤青年志愿者服务队123456</h2>
      </div>
    </div>
    <!-- 卡片结束 -->

    <!-- 底线开始 -->
    <van-divider>没有更多了</van-divider>
    <!-- 底线结束 -->
  </div>
</template>

<script>
import { Divider } from 'vant'
import Swipe from '@/components/Swipe/Swipe'
import NoticeBar from '@/components/NoticeBar/NoticeBar.vue'
import Header from '@/components/Header/Header.vue'
import Gird from '@/components/Grid/Grid.vue'
import { Card } from 'vant'
export default {
  name: 'Home',
  components: {
    Swipe,
    [Card.name]: Card,
    NoticeBar,
    Header,
    Gird,
    [Divider.name]: Divider,
  },
  mounted() {
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.container {
  min-height: 110%;
  padding: 5px;
}
.container .van-card {
  background-color: #dcdcdc;
  border-radius: 40px;
  margin: 10px;
}

.card {
  width: 350px;
  margin: 0 auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
}
.card-img {
  width: 100%;
  display: block;
  object-fit: cover;
  height: 150px;
}
.card-body {
  padding: 10px;
}
.card-title {
  width: 330px;
  font-size: 14px;
 font-family: KaiTi, STKaiti, "Microsoft YaHei", sans-serif;
//  文字单行显示，多余用省略号代替
  white-space: nowrap;// 禁止换行
  overflow: hidden;
  text-overflow: ellipsis;
  height: 20px;
  line-height: 20px;
}
</style>
