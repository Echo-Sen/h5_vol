<template>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
    ><div class="fixed-box" @click="UploadPost">
      <van-icon color="#fff" size="40px" name="plus" />
    </div>
    <!-- 卡片开始 -->
    <div class="card" v-for="item in data" :key="item.id">
      <div class="card-header">
        <div class="avatar">
          <img :src="userInfo.avatar" />
        </div>
        <div class="name">{{ item.username }}</div>
      </div>
      <hr />
      <div class="mid-container">
        <div class="card-text">{{ item.context }}</div>
        <!-- 单图 -->
        <div>
          <van-image
            width="10rem"
            height="10rem"
            fit="contain"
            radius="10px"
            src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg"
          >
            <template v-slot:error><van-icon name="replay" />加载失败</template>
          </van-image>
        </div>
      </div>
      <div class="card-footer">
        <button class="like">
          <van-icon name="like-o" size="25px" />{{ `点赞(${item.likes})` }}
        </button>
        <button class="chat">
          <van-icon name="comment-o" size="25px" />
          {{ `评论(${item.comments})` }}
        </button>

        <button class="share">
          <van-icon name="share-o" size="25px" />{{ `分享(${item.reposts})` }}
        </button>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import { Image as VanImage } from 'vant'
import { getCommunityData } from '@/api/Community'
import { PullRefresh, Toast } from 'vant'
export default {
  data() {
    return {
      isLoading: false,
      data: [],
      userInfo: {
        name: '',
        avatar: '', // 头像
      },
      isFirstLoad: true,
      imgs: null,
    }
  },

  components: {
    [VanImage.name]: VanImage,
    [PullRefresh.name]: PullRefresh,
  },
  mounted() {
    // 暂时用来渲染头像
    this.setInfo()
    // 获取本地缓存的历史数据
    // 获取社区数据
    this.data = JSON.parse(localStorage.getItem('communityData'))

    // getCommunityData(this.getTime(), 10).then((res) => {
    //   this.data = res.data.data
    //   localStorage.setItem('communityData', JSON.stringify(res.data.data))
    // })
  },
  methods: {
    // 获取当前时间
    getTime() {
      // 数据中的更新时间转换
      // const date = new Date(isoString)

      // const year = date.getFullYear()
      // const month = String(date.getMonth() + 1).padStart(2, '0')
      // const day = String(date.getDate()).padStart(2, '0')
      // const hour = String(date.getHours() + 8).padStart(2, '0') // 加上 8 小时得到东八区时间
      // const minute = String(date.getMinutes()).padStart(2, '0')
      // const second = String(date.getSeconds()).padStart(2, '0')

      // const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      // let formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
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
    // 本地获取用户信息
    setInfo() {
      const resUserInfo = JSON.parse(window.localStorage.getItem('userinfo'))
      this.userInfo.name = resUserInfo.name
      this.userInfo.avatar = resUserInfo.avatar
    },
    // 跳转上传页面
    UploadPost() {
      this.$router.push('/uploadpost')
    },
    // 图片上传回调
    async onRefresh() {
      const map = new Map()

      getCommunityData(this.getTime(), 10)
        .then((res) => {
          for (const item of res.data.data) {
            map.set(item.id, item)
          }
          for (const item of this.data) {
            if (!map.has(item.id)) {
              map.set(item.id, item)
            }
          }
          const mergeArray = [...map.values()]
          this.data = mergeArray
          localStorage.setItem('communityData', JSON.stringify(mergeArray))
        })
        .then(() => {
          this.isLoading = false
        })
    },
  },
  watch: {
    data() {
      if (!this.isFirstLoad) {
        // 因为深度的问题，数组里面的数组变化可能不会自动更新需要强制渲染
        this.$forceUpdate()
      }
    },
  },
}
</script>

<style>
.card {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  margin-bottom: 15px;
}

.card-header {
  display: flex;
  align-items: center;
  padding: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.mid-container {
  width: 90%;
  padding: 10px;
}
.mid-container .card-text {
  font-size: 14px;
  font-family: SimSun, '宋体', sans-serif;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  font-weight: bold;
}

.card-image {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.card-image .van-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin-right: 5px;
}

.card-footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
}

.card-footer button {
  border-radius: 5px;
  align-items: center;
  border: none;
  padding: 5px 10px;
  font-weight: bold;
  background-color: #fff;
  /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); */
}

.card-footer button:hover {
  background-color: #f0f0f0;
}
.fixed-box {
  z-index: 10;
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 70px;
  height: 70px;
  background-color: #ff292c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, -0.5, 0, 0.5);
}
</style>
