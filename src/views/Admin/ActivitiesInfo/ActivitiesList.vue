<template>
  <div>
    <div v-if="progressData">
      <!-- 懒加载、垂直居中、 -->
      <van-card
        lazy-load
        centered
        :desc="item.detail"
        :title="item.title"
        :thumb="item.img"
        v-for="item in activities"
        :key="item.id"
      >
        <template #footer>
          <div class="footer">
            <div class="time">
              发布时间：{{ item.created_at | transformTime(item.created_at) }}
            </div>
            <van-button size="normal" @click="showInfo(item.id)"
              >查看报名名单</van-button
            >
          </div>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { Empty, Card, Tag, Lazyload } from 'vant'
import { getActivities } from '@/api/activity'
export default {
  data() {
    return {
      currentId: 1,
      progressData: [],
      overData: [],
      activities: [],
    }
  },
  components: {
    [Empty.name]: Empty,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Lazyload.name]: Lazyload,
  },
  mounted() {
    this.getActivitiesData()
  },

  methods: {
    showInfo(id) {
      this.$router.push({ path: '/activitiesshow', query: { id } })
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
    // 获取活动信息
    getActivitiesData() {
      // 每次获取10条
      const option = {
        created_at: this.getTime(),
        limit: 10,
      }
      getActivities(option).then((res) => {
        this.activities = res.data.data
      })
    },
  },
  // 过滤
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
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.time {
  font-size: 14px;
}
</style>
