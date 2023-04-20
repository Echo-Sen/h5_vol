<template>
  <div>
   <Back :title="'我的帖子'"/>
    <div class="card" v-for="item in data" :key="item.id">
      <div class="card-header">
        <div class="avatar">
          <img :src="item.avatar" />
        </div>
        <!-- 删除 -->
        <div class="name">{{ item.username }}</div>
        <div @click="deleteCard(item.id)" class="fix">
          <van-icon size="25px" name="delete-o" />
        </div>
        <!-- 修改更新 -->
        <div @click="changeCard(item.id)" class="change">
          <van-icon size="25px" name="setting" />
        </div>
      </div>

      <hr />
      <div class="mid-container">
        <div class="card-text">{{ item.context }}</div>
        <!-- 单图 -->
        <div class="img-container" v-if="item.images !== ''">
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
    </div>
  </div>
</template>

<script>
import { getPersonData } from '@/api/community'
import { Image as VanImage, PullRefresh, Toast, Dialog } from 'vant'
import { deleteCard } from '@/api/community'
export default {
  data() {
    return {
      data: [], // 装返回的全部数据
      isLoading: false,
    }
  },
  components: {
    [VanImage.name]: VanImage,
    [PullRefresh.name]: PullRefresh,
    [Toast.name]: Toast,
    [Dialog.Component.name]: Dialog.Component,
  },
  mounted() {
    const time = this.getTime()
    getPersonData(time, 10).then((res) => {
       this.data = res.data.data
      // localStorage.setItem('communityData', JSON.stringify(res.data.data))
      console.log(res)
    })
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
    deleteCard(id) {
      Dialog.confirm({
        title: '警告',
        message: '您确认要删除帖子吗？',
      })
        .then(() => {
          deleteCard(id).then((res) => {
            if (res.data.status) {
              Toast.success(res.data.msg)
            }
            location.reload()
          })
        })
        .catch(() => {
          // on cancel
          Toast.fail('请求错误')
        })
    },
    changeCard(id) {
      const userInfo = JSON.parse(localStorage.getItem('userinfo')).username
      // 跳转并传输
      this.$router.push({ path: '/message/update', query: { id } })
    },
  },
}
</script>

<style scoped>
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
.img-container {
  
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
.van-image{
  margin-right: 5px;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.fix {
  margin-left: 130px;
  padding-right: 10px;
}
</style>
