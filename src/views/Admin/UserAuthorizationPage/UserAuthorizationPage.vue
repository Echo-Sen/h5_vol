<template>
  <div>
    <div class="container">
      <Back :title="'权限审批'" />
      <!-- 1 -->
      <div>
        <div v-if="list">
          <!-- 懒加载、垂直居中、 -->
          <van-card
            v-for="item in list"
            :key="item.id"
            lazy-load
            centered
            @click="goDetail(item.user_id)"
            :desc="item.reason"
            :title="`${item.role === 1 ? '超级管理员' : '管理员'}权限申请`"
          >
            <template #footer>
              <div class="time">
                申请时间：{{ item.created_at | transformTime(item.created_at) }}
              </div>
              <div class="no-active" v-if="item.status === 0">待处理</div>
              <div class="active" v-else>已处理</div>
            </template>
          </van-card>
        </div>
        <van-empty
          v-else
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无数据"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Empty, Card, Tag, Lazyload } from 'vant'
import { getPermissionList } from '@/api/admin'
export default {
  data() {
    return {
      list: undefined,
    }
  },
  components: {
    [Empty.name]: Empty,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Lazyload.name]: Lazyload,
  },
  mounted() {
    this.getList()
  },
  methods: {
    goDetail(id) {
      // 拿到Id传入
      this.$router.push({ path: '/applypermissiondetail', query: { id } })
    },
    getList() {
      getPermissionList().then((res) => {
        this.list = res.data.data
      })
    },
  },
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

<style>
.container {
  margin: 5px;
}
.van-card {
  box-shadow: 0 0 10px rgba(0, -0.5, 0, 0.5);
  border-radius: 10px;
  margin-top: 10px;
}
.van-card__title {
  font-size: 18px;
  line-height: 30px;
}
.van-card__desc {
  font-size: 16px;
}
.van-card__footer {
  font-size: 18px;
  display: flex;
  justify-content: space-between;
}
.time {
  font-size: 15px;
}
.no-active {
  color: red;
}
.active {
  color: green;
}
</style>
