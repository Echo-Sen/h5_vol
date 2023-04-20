<template>
  <div class="container" ref="container">
    <Back />
    <div ref="allHeight" v-for="item in activity" :key="item.id">
      <div class="bgc-img" ref="bgc_img">
        <img :src="item.img" alt="" />
      </div>
      <div class="content">
        <div class="card-body" ref="content">
          <div class="tip">{{ item.duration ? '进行中' : '已结束' }}</div>
          <div class="card-title">
            <h1>{{ item.title }}</h1>
          </div>
          <div class="card-content">
            <div><span>活动地点：</span>{{ item.place }}</div>
            <div><span>征集范围：</span>{{ item.scope }}</div>
            <div><span>征集人数：</span>{{ item.number }}</div>
            <div><span>发布单位：</span>{{ item.publisher }}</div>
            <div>
              <span>活动日期：</span>{{ item.start | transformTime }}至{{
                item.end | transformTime
              }}
            </div>
            <div><span>志愿时长：</span>{{ item.duration }}</div>
            <div><span>联系人：</span>{{ item.contact }}</div>
            <div><span>联系方式：</span>{{ item.contact_way }}</div>

            <div><span>活动说明：</span>{{ item.detail }}</div>
            <div><span>活动规则：</span>{{ item.rule }}</div>
          </div>
        </div>
      </div>

      <van-button
        ref="button"
        round
        class="able"
        size="large"
        type="primary"
        @click="signUp"
        >个人报名
      </van-button>
    </div>
  </div>
</template>

<script scoped>
import { Button, Toast } from 'vant'
import { isSignUp, SignUp } from '@/api/activity'
export default {
  data() {
    return {
      activity: [
        // {
        //   img: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1.png', // 图片
        //   time: 1,
        //   place: '公共场所', // 地点
        //   contact: '志愿指导老师', // 联系人
        //   contactWay: '138xxxxxxx', // 联系方式
        //   title: '人工智能学院“小红帽”常青藤',
        //   scope: '全部对象', // 征集对象
        //   number: '不限', // 征集人数
        //   publisher: '人工智能学院“小红帽”常青藤', //发布单位
        //   date: '2023-04-01至2023-04-30', // 时间
        //   detail: '活动说明111111111111111111111', //活动说明
        //   rule: '活动规则lalalalalalalalalalala', //活动规则
        //   venue: '主校大门口', //集合地点
        //   status: true, //活动进行状态, true 进行中， false 已结束
        //   id: 0,
        // },
      ],
      visible: true,
    }
  },
  filters: {
    // 转换时间格式
    transformTime(isoString) {
      // 数据中的更新时间转换
      const date = new Date(isoString)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hour = String(date.getHours() + 8).padStart(2, '0') // 加上 8 小时得到东八区时间
      const minute = String(date.getMinutes()).padStart(2, '0')
      const second = String(date.getSeconds()).padStart(2, '0')

      const transformTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      return transformTime
    },
  },
  components: {
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  mounted() {
    this.getData()
    // 自适应高度
    this.$nextTick(() => {
      this.changeHeight()
      this.isSignUp()
      // this.isSignUp()
    })
  },
  methods: {
    // 根据id获取信息
    getData() {
      const arr = JSON.parse(localStorage.getItem('activities'))
      arr.forEach((item) => {
        if (item.id == this.$route.query.id) {
          this.activity.push(item)
        }
      })
    },
    changeHeight() {
      const allHeight = this.$refs.allHeight[0].offsetHeight
      const height = this.$refs.content[0].offsetHeight
      if (height > 442) {
        this.$refs.button[0].style.marginTop = height - 442 + 'px'
      }
      this.$refs.container.style.minHeight = allHeight + 'px'
    },
    signUp() {
      if (!this.isLogin()) {
        return Toast.fail('请先登录')
      }
      const signUpButton = this.$refs.button
      const id = this.$route.query.id
      SignUp(id).then((res) => {
        if (res.data.status) {
          signUpButton[0].classList.remove('able')
          signUpButton[0].classList.add('disable')
          signUpButton[0].disabled = true
          signUpButton[0].innerText = '已报名'
          Toast.success('报名成功')
        } else {
          Toast.fail('请求失败')
        }
      })
    },
    // 进入页面查询是否已报名
    isSignUp() {
      if (this.isLogin()) {
        const id = this.$route.query.id
        const signUpButton = this.$refs.button
        console.log(id)
        isSignUp(id).then((res) => {
          if (res.data.isreg) {
            signUpButton[0].classList.remove('able')
            signUpButton[0].classList.add('disable')
            signUpButton[0].disabled = true
            signUpButton[0].innerText = '已报名'
          }
        })
      }
    },
  },
}
</script>

<style scoped>
.container {
  margin: 3px;
  min-height: 1000px;
  position: relative;
  text-align: center;
}
.bgc-img {
  height: 249px;
  width: 100%;
}
.bgc-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.content {
  height: 400px;
}
.content .card-body {
  position: absolute;
  z-index: 1;
  min-height: 300px;
  width: 90%;
  left: 0;
  right: 0;
  top: 220px;
  margin: auto;
  background-color: whitesmoke;
  text-align: left;
  border-radius: 5px;
  box-shadow: 2px 2px 9px #3b2e32;
  padding: 10px;
}
.content .card-body .card-title {
  margin-top: 10px;
  font-size: 12px;
  color: red;
  letter-spacing: 2px;
}

.card-content div {
  margin-top: 5px;
  font-size: 14px;
}

.van-button {
  position: relative;
  margin-top: -10px;
}
.van-button--large {
  width: 80%;
  height: 45px;
}

.tip {
  text-align: center;
  z-index: 1;
  border-radius: 5px;
  height: 28px;
  width: 68px;
  position: absolute;
  background: linear-gradient(to right, #8ec5fc, #3e9cfc);
  color: white;
  font-family: KaiTi, serif;
  font-size: 18px;
  right: 0px;
  top: 0px;
}
.able {
  background: linear-gradient(to bottom, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
}
/* 按钮禁止 */
.disable {
  background-color: gray;
  color: white;
  cursor: not-allowed;
}
</style>
