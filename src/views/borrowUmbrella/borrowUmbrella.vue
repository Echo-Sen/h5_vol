<template>
  <div>
    <h1 class="title">
      <van-icon name="arrow-left" @click="back" class="back" />
    </h1>
    <div class="umbrella">
      <div class="umbrella__button-wrapper">
        <van-button type="primary" @click="borrowUmbrella">借伞</van-button>
      </div>
      <div class="umbrella__button-wrapper">
        <van-button type="default" @click="returnUmbrella">还伞</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Step, Steps } from 'vant';
export default {
  components:{
    [Steps.name]:Steps,
    [Step.name]:Step
  },
   data() {
    return {
      active: 1,
    };
  },
  methods: {
    borrowUmbrella() {
      // 点击借伞按钮的逻辑
      console.log('借伞')
    },
    back() {
      this.$router.back()
    },
    returnUmbrella() {
      // 点击还伞按钮的逻辑
      console.log('还伞');
    },
  },
}
</script>

<style scoped>
.umbrella {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(
    135deg,
    #d16ba5,
    #c777b9,
    #ba85cb,
    #ab93dd,
    #9ba1ef
  );
}

.umbrella__button-wrapper {
  margin: 20px;
}

.van-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 100px;
  border-radius: 50px;
  border: none;
  font-size: 30px;
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  outline: none;
}

/* 标题 */
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.van-button:active {
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
  transform: translateY(-5px);
}

.fa-umbrella {
  margin-right: 10px;
  font-size: 40px;
}
</style>
