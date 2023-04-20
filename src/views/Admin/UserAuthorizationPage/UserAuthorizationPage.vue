<template>
  <div>
    <div class="container">
      <Back :title="'权限审批'" />
      <!-- 1 -->
      <div @click="goDetail">
        <div v-if="list.length == 0">
          <!-- 懒加载、垂直居中、 -->
          <van-card
            lazy-load
            centered
            desc="我需要申请部长权限"
            title="部长权限申请"
          >
            <template #footer>
              <div class="time">申请时间：2023.4.18</div>
              <div class="no-active">待处理</div>
            </template>
          </van-card>
        </div>
        <van-empty
          v-else
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无数据"
        />
      </div>
      <!-- 2 -->
      <div>
        <div v-if="list.length == 0">
          <!-- 懒加载、垂直居中、 -->
          <van-card
            lazy-load
            centered
            desc="我需要申请部长权限"
            title="部长权限申请"
          >
            <template #footer>
              <div class="time">申请时间：2023.4.18</div>
              <div class="no-active">待处理</div>
            </template>
          </van-card>
        </div>
        <van-empty
          v-else
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无数据"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Empty, Card, Tag, Lazyload } from 'vant'
export default {
  data() {
    return {
      list: [],
    }
  },
  components: {
    [Empty.name]: Empty,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Lazyload.name]: Lazyload,
  },
  methods: {
    goDetail() {
      // 拿到Id传入
      this.$router.push('/applypermissiondetail')
    },
  },
}
</script>

<style>
.container {
  margin: 5px;
}
.van-card {
  box-shadow: 0 0 10px rgba(0, -0.5, 0, 0.5);
  border-radius: 10px;
  margin-top: 10px;
}
.van-card__title {
  font-size: 18px;
  line-height: 30px;
}
.van-card__desc {
  font-size: 16px;
}
.van-card__footer {
  font-size: 18px;
  display: flex;
  justify-content: space-between;
}
.time {
  font-size: 15px;
}
.no-active {
  color: red;
}
.active {
  color: green;
}
</style>
