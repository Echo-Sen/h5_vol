<template>
  <div class="container">
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item v-model="value1" :options="option1" />
    </van-dropdown-menu>
    <!-- 全部用户 -->
    <div v-if="value1 === 0">
      <InfoCard
        v-for="item in list"
        :key="item.id"
        :avatar="item.avatar"
        :name="item.name"
        :permissions="item.role ? item.role : ''"
        :onButtonClick="onButtonClick"
        :id="item.id"
        :gender="item.gender ? 'pink' : 'skyblue'"
      />
    </div>
    <!-- 管理员用户 -->
    <div v-else>
      <InfoCard
        v-for="item in AdminList"
        :key="item.id"
        :avatar="item.avatar"
        :name="item.name"
        :permissions="
          item.role ? (item.role == 1 ? '超级管理员' : '管理员') : ''
        "
        :onButtonClick="onButtonClick"
        :gender="item.gender ? 'pink' : 'skyblue'"
        :id="item.id"
      />
    </div>
  </div>
</template>

<script>
import { GetAllUserInfo, GetManageInfo } from '@/api/admin'
import { DropdownMenu, DropdownItem } from 'vant'
import InfoCard from '@/components/UserInfoCard/UserInfoCard.vue'
export default {
  data() {
    return {
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部用户', value: 0 },
        { text: '管理员', value: 1 },
      ],
      AdminList: [], //超级管理员
      list: [], // 全部用户
    }
  },
  components: {
    InfoCard,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  mounted() {
    this.GetData()
    this.GetManageData()
  },
  methods: {
    // 全部人信息
    GetData() {
      GetAllUserInfo().then((res) => {
        this.list = res.data.data
        localStorage.setItem('UserList', JSON.stringify(this.list))
      })
    },
    // 管理员信息
    GetManageData() {
      GetManageInfo().then((res) => {
        this.AdminList = res.data.data
        localStorage.setItem('AdminList', JSON.stringify(this.AdminList))
      })
    },
    onButtonClick() {},
  },
}
</script>

<style>
.container {
  margin: 5px;
  min-height: 100px;
  width: 100%;
}
</style>
