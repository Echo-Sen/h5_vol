<template>
  <div>
    <Back :title="'反馈信息'" />
    <div class="container">
      <div>
        <div v-if="list.length !== 0">
          <!-- 懒加载、垂直居中、 -->
          <van-card
            lazy-load
            centered
            v-for="item in list"
            :key="item.id"
            :desc="item.context"
          >
            <template #footer>
              <div class="time" v-if="item.hasct == 0">
                {{ `联系人方式：${item.contact}` }}
              </div>
              <div v-else class="time">匿名</div>
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
import { Card, Empty } from 'vant'
import { GetFeedBackInfo } from '@/api/admin'
export default {
  data() {
    return {
      list: [],
      contact: '138xxxxxx',
    }
  },
  components: {
    [Card.name]: Card,
    [Empty.name]: Empty,
  },
  mounted() {
// 这里需要改成走本地缓存下拉刷新的形式
    this.goDetail()
  },
  methods: {
    goDetail() {
      GetFeedBackInfo().then((res) => {
        this.list = res.data.data
        // localStorage.setItem('feedBack', JSON.stringify(this.list))
      })
    },
  },
}
</script>

<style scoped>
.container {
  min-height: 100px;
  width: 100%;
  margin: 5px;
  /* background-color: red; */
}

.van-card {
  box-shadow: 0 0 10px rgba(0, -0.5, 0, 0.5);
  border-radius: 10px;
  margin-top: 10px;
}
.van-card__desc {
  font-size: 18px;
}
.van-card__footer {
  font-size: 18px;
  /* padding: 10px; */
}
.time {
  font-size: 15px;
  color: #bdbdbd;
}
</style>
