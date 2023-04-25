<template>
  <div>
    <div v-if="progressData">
      <!-- 懒加载、垂直居中、 -->
      <van-card
        lazy-load
        centered
        desc="描述信息啦啦啦啦啦啦啦啦啦"
        title="喜迎二十大"
        thumb="https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717071.jpeg"
        v-for="(item, index) in 5"
        :key="index"
      >
        <template #footer>
          <van-button size="normal" @click="showInfo">查看报名名单</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { Empty, Card, Tag, Lazyload } from 'vant'
export default {
  data() {
    return {
      currentId: 1,
      progressData: [],
      overData: [],
    }
  },
  components: {
    [Empty.name]: Empty,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Lazyload.name]: Lazyload,
  },
  methods: {
    showInfo() {
      // const id = this.$route.query.id
      this.$router.push({ path: '/activitiesshow' })
    },
  },
}
</script>

<style scoped>
.van-card {
  box-shadow: 0 0 3px rgba(0, -0.5, 0, 0.5);
  margin: 5px;
}
.van-card__title {
  font-size: 18px;
  color: red;
  line-height: 30px;
}
.van-card__desc {
  font-size: 14px;
  margin-top: 10px;
}
</style>
