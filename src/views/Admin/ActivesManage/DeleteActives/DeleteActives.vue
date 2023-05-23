<template>
  <div>
    <!-- 进行中 -->
    <div class="left-content">
      <div>
        <!-- 懒加载、垂直居中、 -->
        <van-card
          v-for="item in activities"
          :key="item.id"
          lazy-load
          centered
          :desc="item.detail"
          :title="item.title"
          :thumb="item.img"
        >
          <template #footer>
            <van-button size="normal" @click="delActivity(item.id)"
              >删除活动</van-button
            >
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Empty, Card, Tag, Lazyload, Toast, Dialog } from 'vant'
import { getActivities } from '@/api/activity'
import { DelActive } from '@/api/admin'
export default {
  data() {
    return {
      activities: undefined,
    }
  },
  components: {
    [Empty.name]: Empty,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Lazyload.name]: Lazyload,
  },
  mounted() {
    this.getData()
  },
  methods: {
    delActivity(id) {
      Dialog.confirm({
        title: '警告',
        message: '您确定要删除活动',
      })
        .then(() => {
          DelActive(id).then((res) => {
            if (res.data.status == 1) {
              Toast.success(res.data.msg)
              location.reload()
            } else {
              Toast.fail(res.data.msg)
              location.reload()
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    // 当前时间
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
        limit: 10,
      }
      getActivities(option).then((res) => {
        this.activities = res.data.data
      })
    },
  },
}
</script>

<style scoped>
.container {
  margin-left: 10px;
  margin-right: 10px;
  min-height: 100px;
  /* background-color: skyblue; */
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

.van-card {
  box-shadow: 0 0 3px rgba(0, -0.5, 0, 0.5);
  margin: 5px;
}
.van-card__title {
  font-size: 18px;
  color: red;
  line-height: 30px;
}
.van-card__desc {
  font-size: 14px;
  margin-top: 10px;
}
</style>
