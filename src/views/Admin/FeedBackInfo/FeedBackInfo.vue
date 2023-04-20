<template>
  <div>
    <Back :title="'反馈信息'" />
    <div class="container">
      <div>
        <div v-if="list.length == 0">
          <!-- 懒加载、垂直居中、 -->
          <van-card lazy-load centered desc="综合传媒部6666666666">
            <template #footer>
              <div class="time" v-if="contact">联系人方式：138xxxxxxxxx</div>
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
  methods: {
    goDetail() {},
  },
}
</script>

<style scoped>
.container {
  height: 100px;
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
  font-size: 20px;
}
.van-card__footer {
  font-size: 18px;
}
.time {
  font-size: 15px;
  color: #bdbdbd;
}
</style>
