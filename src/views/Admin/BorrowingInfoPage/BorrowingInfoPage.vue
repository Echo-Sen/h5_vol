<template>
  <div>
    <!-- 借伞信息页 -->
    <Back :title="'借伞信息'" />
    <!-- header -->
    <div class="title-container">
      <div class="left-title active" ref="left_div" @click="leftClick">
        <div class="active_line">已借伞</div>
      </div>
      <div class="right-title" ref="right_div" @click="rightClick">已逾期</div>
    </div>
    <!-- content -->
    <van-empty
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无数据"
    />
  </div>
</template>

<script>
import { Empty } from "vant";
export default {
  data() {
    return {
      currentId: 1,
      progressData: [],
      overData: [],
    }
  },
  components:{
    [Empty.name]:Empty
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
