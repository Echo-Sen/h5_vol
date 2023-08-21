<template>
  <div class="container">
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
        <div class="fixed-box" @click="UploadPost">
          <van-icon color="#fff" size="40px" name="plus" />
        </div>
        <!-- 卡片开始 -->
        <div class="card" v-for="item in data" :key="item.id">
          <div class="card-header">
            <div class="avatar">
              <img :src="item.avatar" />
            </div>
            <div class="name">{{ item.username }}</div>
            <div class="time">
              {{ item.updated_at | transformTime(item.updated_at) }}
            </div>
          </div>

          <hr />
          <div class="mid-container">
            <div class="card-text">{{ item.context }}</div>
            <!-- 单图 -->
            <div v-if="item.images !== ''">
              <van-image
                v-for="(imgUrl, imgIndex) in item.images.split('|')"
                :key="imgIndex"
                @click="preview(item.images.split('|'), imgIndex)"
                width="10rem"
                height="10rem"
                fit="contain"
                radius="10px"
                :src="imgUrl"
              >
                <template v-slot:error
                  ><van-icon name="replay" />加载失败</template
                >
              </van-image>
            </div>
          </div>
          <div class="card-footer">
            <button
              :ref="`likeDiv${item.id}`"
              @click="clickLikes(item.id)"
              style="display: flex; align-items: center"
              class="like"
            >
              <van-icon name="like-o" size="25px" />
              <span>{{ ` ${item.likes}` }}</span>
            </button>
            <button
              style="display: flex; align-items: center"
              class="chat"
              @click="goComments(item.id)"
            >
              <van-icon name="comment-o" size="25px" />
              <span>{{ ` ${item.comments}` }}</span>
            </button>
            <button style="display: flex; align-items: center" class="share">
              <van-icon name="share-o" size="25px" /><span>{{
                ` ${item.reposts}`
              }}</span>
            </button>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {
  List,
  Image as VanImage,
  PullRefresh,
  ShareSheet,
  ImagePreview,
} from 'vant'
import { postLiked, postIsLike,getCommunityData } from '@/api/community'
export default {
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      data: [], // 装返回的全部数据
      userInfo: {
        avatar: '', // 头像
      },
      isFirstLoad: true, //是否是第一次进入页面
      imgs: null, // 用于渲染的Img
      liked: false, // 是否点赞
      throttle: false, // 下拉刷新的节流阀
      isCurrent: '', //判断是否是当前id
      commentsData: [], // 全部评论数据
    }
  },

  components: {
    [VanImage.name]: VanImage,
    [PullRefresh.name]: PullRefresh,
    [ShareSheet.name]: ShareSheet,
    [List.name]: List,
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  mounted() {
    // 获取本地缓存的历史数据
    // 获取社区数据

    // 本地不存在缓存时调用 默认每次十条数据
    if (!localStorage.getItem('communityData')) {
      getCommunityData(this.getTime(), 10).then((res) => {
        this.data = res.data.data
        localStorage.setItem('communityData', JSON.stringify(res.data.data))
      })
    } else {
      this.data = JSON.parse(localStorage.getItem('communityData'))
    }

    this.$nextTick(() => {
      // 个人对帖子的点赞情况
      if (localStorage.getItem('userinfo')) {
        this.data.find((item) => {
          const likeIcon = this.$refs['likeDiv' + item.id][0].children[0]
          postIsLike(item.id).then((res) => {
            if (res.data.islike) {
              likeIcon.classList.add('liked')
            }
          })
        })
      } else {
        console.log('未登录')
      }
    })
  },
  methods: {
    // 转换时间格式
    transformTime(isoString) {
      // 数据中的更新时间转换
      const date = new Date(isoString)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hour = String(date.getHours()).padStart(2, '0')
      const minute = String(date.getMinutes()).padStart(2, '0')
      const second = String(date.getSeconds()).padStart(2, '0')

      const transformTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      return transformTime
    },
    // 获取当前时间
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
    // 跳转上传页面
    UploadPost() {
      this.$router.push('/uploadpost')
    },
    // 合并不同ID的数组对象
    mergeObjectsByDifferentId(arr1, arr2) {
      const mergedSet = new Set([...arr1, ...arr2])
      return Array.from(mergedSet)
    },
    // 下拉刷新的回调
    async onRefresh() {
      if (!this.throttle) {
        // 开启节流阀
        this.throttle = true
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
            // 关闭节流阀
            this.throttle = false
          })
      }
    },
    // 触底回调
    onLoad() {
      this.loading = true
      // 获取每条消息的最早时间
      const time = this.transformTime(
        this.data[this.data.length - 1].created_at
      )
      getCommunityData(time, 10).then((res) => {
        // 追加过滤相同id的数组对象
        this.data = this.mergeObjectsByDifferentId(this.data, res.data.data)
        localStorage.setItem('communityData', JSON.stringify(this.data))
        this.loading = false
        if (res.data.data.length === 0) {
          // 如果返回数据为空则设置已完成
          this.finished = true
        }
      })
    },
    // 点赞
    async clickLikes(id) {
      // 获取icon
      const likeIcon = this.$refs['likeDiv' + id][0].children[0]
      if (likeIcon.classList.contains('liked')) {
        likeIcon.classList.remove('liked')
        this.data.find((item) => {
          if (item.id === id) {
            item.likes -= 1
            postLiked(id)
          }
        })
      } else {
        likeIcon.classList.add('liked')
        //更改id对应的likes
        this.data.find((item) => {
          if (item.id === id) {
            item.likes += 1
            postLiked(id)
          }
        })
      }
    },
    // 图片缩放比例
    preview(arr, position) {
      ImagePreview({
        images: arr,
        startPosition: position,
        maxZoom: 3,
        minZoom: 1 / 3,
      })
    },

    // 评论点击
    goComments(id) {
      this.$router.push({ path: '/comment', query: { id } })
    },
  },
  // 深层数据更新强制渲染
  watch: {
    data() {
      if (!this.isFirstLoad) {
        // 因为深度的问题，数组中的数组变化可能不会自动更新需要强制渲染
        this.$forceUpdate()
      }
    },
  },
  // 过滤器
  filters: {
    transformTime(isoString) {
      // 数据中的更新时间转换
      const date = new Date(isoString)
      const transformTime = date.toLocaleString()
      return transformTime
    },
  },
}
</script>

<style scoped>
.container {
  margin: 8px;
}
.card {
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  margin-bottom: 15px;
  position: relative;
}

.card-header {
  display: flex;
  /* align-items: center; */
  line-height: 20px;
  padding: 10px;
  /* background: linear-gradient(to bottom right, #f4f4f4, #eaeaea); */
}

.avatar {
  width: 40px;
  height: 40px;
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
.van-image {
  margin-right: 5px;
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

.card-footer .van-icon {
  margin-right: 5px;
}
.card-footer button {
  border-radius: 5px;
  align-items: center;
  border: none;
  padding: 5px 10px;
  font-weight: bold;
  background-color: #fff;
}

.fixed-box {
  z-index: 10;
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #ff292c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, -0.5, 0, 0.5);
}

/* 爱心变红 */
.liked {
  color: red;
}
.time {
  font-size: 10x;
  position: absolute;
  top: 35px;
  left: 60px;
}
</style>
