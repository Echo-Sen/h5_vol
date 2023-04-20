<template>
  <div>
    <Back :title="'我的活动'" />
    <div class="container">
      <div class="title-container">
        <div class="left-title active" ref="left_div" @click="leftClick">
          <div class="active_line">进行中</div>
        </div>
        <div class="right-title" ref="right_div" @click="rightClick">
          已结束
        </div>
      </div>
      <!-- 进行中 -->
      <div class="left-content" v-if="currentId === 1 ? true : false">
        <div v-if="progressData">
          <!-- 懒加载、垂直居中、 -->
          <van-card
            lazy-load
            centered
            desc="描述信息啦啦啦啦啦啦啦啦啦"
            title="活动标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
          >
            <template #footer>
              <van-button size="normal" @click="Cancellation">取消报名</van-button>
            </template>
          </van-card>
        </div>
        <van-empty
          v-else
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无数据"
        />
      </div>
      <div class="right-content" v-else>
        <div v-if="overData.length">12346</div>
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
      currentId: 1,
      progressData: [],
      overData: [],
    }
  },
  methods: {
    leftClick() {
      const l_div = this.$refs.left_div
      const r_div = this.$refs.right_div
      if (!l_div.classList.contains('active')) {
        l_div.classList.add('active')
        r_div.classList.remove('active')
        this.currentId = 1
      }
      // 切换类名，通过 CSS 实现文本效果的切换
    },
    rightClick() {
      const l_div = this.$refs.left_div
      const r_div = this.$refs.right_div

      if (!r_div.classList.contains('active')) {
        r_div.classList.add('active')
        l_div.classList.remove('active')
        this.currentId = 2
      }
    },
    Cancellation() {
      console.log('取消');
    }
  },
  components: {
    [Empty.name]: Empty,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Lazyload.name]: Lazyload,
  },
}
</script>

<style scoped> 
.container {
  margin-left: 10px;
  margin-right: 10px;
  min-height: 100px;
  background-color: skyblue;
}
.title-container {
  display: flex;
}
.left-title {
  width: 50%;
  color: #000;
  font-size: 24px;
  text-align: center;
}
.right-title {
  width: 50%;
  text-align: center;
}
.title-container .active {
  color: red;
  border-bottom: 3px solid red;
}
.right-title {
  color: #000;
  font-size: 24px;
}
</style>
