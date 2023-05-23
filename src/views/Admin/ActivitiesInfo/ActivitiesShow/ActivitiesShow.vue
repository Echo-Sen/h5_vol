<template>
  <div class="container">
    <!-- 这里的title改成活动名 -->
    <Back :title="''" />
    <Table :items="items" />
  </div>
</template>

<script>
import Table from '@/components/xlsx/xlsx.vue'
import { getActivityDetail } from '@/api/admin'
export default {
  name: 'App',
  components: {
    Table,
  },
  mounted() {
    this.getActivitiesData(this.$route.query.id)
  },
  data() {
    return {
      list: [],
      arr: [],
      items: [],
    }
  },
  methods: {
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
    getActivitiesData(id) {
      // 请求
      getActivityDetail(id).then((res) => {
        this.items = res.data.data
      })
    },
  },
}
</script>

<style scoped>
.container {
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
