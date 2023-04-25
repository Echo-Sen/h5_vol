<template>
  <!-- <div class="container">
    <div ref="card" class="card" v-for="(item, index) in 5" :key="index">
      <div class="title">用户 | 投稿</div>
      <div class="content">内容</div>
      <div class="time">2023-4-21 10:20:20</div>
    </div>
  </div> -->
  <div><van-empty image="search" description="敬请期待..." /></div>
</template>

<script>
import { Empty  } from "vant";
export default {
  data() {
    return {
      
    }
  },
  components:{[Empty.name]:Empty },
  mounted() {
    // this.randomizeBackground()
  },
  methods: {
    randomizeBackground() {
      const cards = this.$refs.card
      const colors = [
        '#6C3483',
        '#FF5733',
        '#28B463',
        '#F1C40F',
        '#E74C3C',
        '#2E86C1',
        '#FFC300',
        '#C70039',
        '#FFC0CB',
        '#FF7F50',
        '#00FFFF',
        '#FF00FF ',
        '#FFFF00',
        '#7FFF00',
        '#00FF00',
      ]
      cards.forEach((card) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        card.style.backgroundColor = randomColor
      })
    },
  },
}
</script>

<style scoped>
.container {
  margin: 5px;

  /* background-image: url('@/assets/images/bgc.jpg'); */
  background-image: url('https://www.ctbu.edu.cn/__local/D/F0/B7/7A6FB72797F67E8D40DD026AC53_A855D1E2_30AC1.jpg');
  background-size: cover;
  min-height: 700px;
}
.card {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: red;
  opacity: 0.8;
}
.title {
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 14px;
  color: #000000;
}
.content {
  font-size: 18px;
  color: white;
}
.time{
  position: absolute;
   color: #000000;
   bottom: 10px;
   font-size: 14px;
   right: 10px;
}
</style>
