<template>
  <div>
    <Back />
    <van-pull-refresh
      style="min-height: 100vh"
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="all">
          <!-- 头部 -->
          <div class="swipe-container">
            <h1
              style="
                background: linear-gradient(to right, #ff7f50, #6495ed);
                -webkit-background-clip: text;
                color: transparent;
              "
            >
              最新活动
            </h1>
            <h2 class="tip">进行中</h2>
            <div class="my-swipe">
              <van-swipe
                loop
                :autoplay="3000"
                :show-indicators="false"
                :touchable="true"
              >
                <van-swipe-item v-for="item in images" :key="item.index"
                  ><img :src="item.imgUrl"
                /></van-swipe-item>
              </van-swipe>
            </div>
          </div>
          <div class="title1">
            <span>s</span>
            全部活动
          </div>
          <div class="card-container">
            <!-- 卡片 -->
            <div
              class="card"
              v-for="item in activities"
              :key="item.id"
              @click="goDetail(item.id)"
            >
              <div class="tip card-tip">
                {{ item.duration ? '进行中' : '已结束' }}
              </div>
              <img :src="item.img" class="card-img" />
              <div class="card-body">
                <div class="card-title">
                  <h3 class="van-ellipsis">{{ item.title }}</h3>
                </div>
                <div class="card-content">
                  <div><span>征集范围：</span>{{ item.scope }}</div>
                  <div><span>征集人数：</span>{{ item.number }}</div>
                  <div class="van-ellipsis">
                    <span>发布单位：</span>{{ item.publisher }}
                  </div>
                  <div>
                    <span>活动日期：</span>{{ item.start | transformTime }}至{{
                      item.end | transformTime
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Swipe, SwipeItem, List, PullRefresh } from 'vant'
import { getActivities } from '@/api/activity'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
  },
  data() {
    return {
      activities: [
        // {
        //   img: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1.png',
        //   title: '人工智能学院“小红帽”常青藤',
        //   scope: '全部对象',
        //   number: '不限',
        //   publisher: '人工智能学院“小红帽”常青藤',
        //   date: '2023-04-01至2023-04-30',
        //   id: 0,
        // },
        // {
        //   img: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1.png',
        //   title: '人工智能学院“小红帽”常青藤',
        //   scope: '全部对象',
        //   number: '不限',
        //   publisher: '人工智能学院“小红帽”常青藤',
        //   date: '2023-04-01至2023-04-30',
        //   id: 1,
        // },
        // {
        //   img: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1.png',
        //   title: '人工智能学院“小红帽”常青藤',
        //   scope: '全部对象',
        //   number: '不限',
        //   publisher: '人工智能学院“小红帽”常青藤',
        //   date: '2023-04-01至2023-04-30',
        //   id: 2,
        // },
        // {
        //   img: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1.png',
        //   title: '人工智能学院“小红帽”常青藤',
        //   scope: '全部对象',
        //   number: '不限',
        //   publisher: '人工智能学院“小红帽”常青藤',
        //   date: '2023-04-01至2023-04-30',
        //   id: 3,
        // },
      ],
      images: [
        {
          imgUrl: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1.png',
          index: 0,
        },
        {
          imgUrl: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/2.png',
          index: 1,
        },
        {
          imgUrl:
            'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717071.jpeg',
          index: 2,
        },
        {
          imgUrl:
            'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717075.jpeg',
          index: 3,
        },
      ],
      isLoading: false,
      loading: false,
      finished: false,
      throttle: false, // 节流阀
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
  mounted() {
    this.activities = JSON.parse(localStorage.getItem('activities'))
    this.getData()
  },
  methods: {
    getTime() {
      // 当前时间
      let now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let day = now.getDate()
      let hours = now.getHours()
      let minutes = now.getMinutes()
      let seconds = now.getSeconds()

      if (month < 10) {
        month = '0' + month
      }

      if (day < 10) {
        day = '0' + day
      }

      if (hours < 10) {
        hours = '0' + hours
      }

      if (minutes < 10) {
        minutes = '0' + minutes
      }

      if (seconds < 10) {
        seconds = '0' + seconds
      }

      let formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      return formattedTime
    },

    getData() {
      const option = {
        created_at: this.getTime(),
        limit: 5,
      }
      getActivities(option).then((res) => {
        this.activities = res.data.data
        localStorage.setItem('activities', JSON.stringify(this.activities))
      })
    },
    goDetail(id) {
      this.$router.push({ path: '/activity/detail', query: { id } })
      console.log(id)
    },
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
    onLoad() {
      // 获取每条最早的时间
      const time = this.transformTime(
        this.activities[this.activities.length - 1].created_at
      )
      const option = {
        created_at: time,
        limit: 10,
      }
      getActivities(option).then((res) => {
        this.activities = [
          ...this.activities,
          ...res.data.data.filter((item) => {
            !this.activities.some((i) => {
              i.id === item.id
            })
          }),
        ]
        console.log(this.activities)
        this.loading = true
        // 如果返回数据为空则设置已完成
        this.finished = true
      })
    },
    // 下拉刷新
    async onRefresh() {
      if (!this.throttle) {
        // 开启节流阀
        this.throttle = true
        const map = new Map()
        const option = {
          created_at: this.getTime(),
          limit: 5,
        }
        getActivities(option)
          .then((res) => {
            for (const item of res.data.data) {
              map.set(item.id, item)
            }
            for (const item of this.activities) {
              if (!map.has(item.id)) {
                map.set(item.id, item)
              }
            }
            const mergeArray = [...map.values()]
            this.activities = mergeArray
            localStorage.setItem('activities', JSON.stringify(this.activities))
          })
          .then(() => {
            this.isLoading = false
            // 关闭节流阀
            this.throttle = false
          })
      }
    },
  },
}
</script>

<style scoped>
.all {
  /* background-color: pink; */
  margin: 10px;
}
.swipe-container {
  position: relative;
  text-align: center;
  height: 265px;

  border-radius: 10px;
  box-shadow: 2px 2px 20px #3b2e32;
}
.swipe-container::before,
.swipe-container::after {
  content: '';
  position: absolute;
  top: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgb(255, 42, 0);
}
.swipe-container::before {
  left: 5px;
  top: 5px;
}
.swipe-container::after {
  right: 5px;
  top: 5px;
}

.my-swipe {
  display: flex;
  justify-content: center;
  align-items: center;
}
.van-swipe {
  border-radius: 20px 20px 20px 20px; /* 设置圆角半径 */
  height: 210px;
  width: 340px;
  margin-bottom: 20px;
  margin-top: 10px;
}
.van-swipe .van-swipe-item img {
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 20px 20px;
}
.tip {
  z-index: 1;
  border-radius: 5px;
  height: 28px;
  width: 68px;
  position: absolute;
  background: linear-gradient(to right, #8ec5fc, #3e9cfc);
  color: white;
  font-family: KaiTi, serif;
  font-size: 18px;
  right: 8px;
  top: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-tip {
  top: 0;
  right: -1px;
}

.title1 {
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 35px;
  /* 渐变色 */
  background: linear-gradient(to bottom, #ff0000, #ffff00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.title1 span {
  font-size: 50px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  min-height: 100%;
}
.card {
  /* background-color: red; */
  height: 260px;
  width: 45%;
  margin-left: 13px;
  margin-bottom: 30px;
  box-shadow: 2px 2px 9px #3b2e32;
  position: relative;
}
.card-img {
  border-radius: 5px 5px 0 0;
  height: 100px;
  width: 100%;
  object-fit: cover;
}
.card-body {
  padding: 5px;
}
.card-content div {
  margin-top: 5px;
}
</style>
