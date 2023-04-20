<template>
  <div>
    <div class="umbrella">
      <Back />

      <div class="umbrella__button-wrapper">
        <van-button type="primary" @click="borrowUmbrella">一键借伞</van-button>
      </div>
      <div class="umbrella__button-wrapper">
        <van-button type="default" @click="returnUmbrella">一键还伞</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { postUmbrella } from '@/api/umbrella'
import { isLogin } from '@/utils/Login'
export default {
  components: {
    [Toast.name]: Toast,
  },
  data() {
    return {}
  },
  methods: {
    onConfirm(value) {
      this.value = value
      this.showPicker = false
    },
    borrowUmbrella() {
      // 点击借伞按钮的逻辑
      if (isLogin()) {
        const upid = this.$route.query.upid
        const option = {
          upid: upid,
          type: 'borrow',
        }
        postUmbrella(option).then((res) => {
          if (res.data.status) {
            Toast({
              message: '借伞成功',
              icon: 'umbrella-circle',
            })
          } else {
            Toast.fail({
              message: '已借出',
            })
          }
        })
      } else {
        Toast.fail('请先登录')
      }
    },
    back() {
      this.$router.back()
    },
    returnUmbrella() {
      if (isLogin()) {
        const upid = this.$route.query.upid
        // 点击还伞按钮的逻辑
        const option = {
          upid: upid,
          type: 'return',
        }
        postUmbrella(option).then((res) => {
          if (res.data.status) {
            Toast({
              message: '还伞成功',
              icon: 'umbrella-circle',
            })
          } else {
            Toast.fail({
              message: '已归还',
            })
          }
        })
      } else {
        Toast.fail('请先登录')
      }
    },
  },
}
</script>

<style scoped>
.umbrella {
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  /* align-items: center; */
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  /* background: linear-gradient(
    135deg,
    #d16ba5,
    #c777b9,
    #ba85cb,
    #ab93dd,
    #9ba1ef
  ); */
  /* background: linear-gradient(to bottom, #66cccc, #0099cc); */
  /* background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%); */
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  /* background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%); */
  /* background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%); */
}

.umbrella .van-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  /* background-color:transparent ; */
}
.van-steps .van-step {
  width: 100px;
}
.umbrella__button-wrapper {
  align-self: center;
  justify-self: center;
  margin: 50px;
}

.van-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 70px;
  border-radius: 50px;
  border: none;
  font-size: 30px;
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  outline: none;
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
