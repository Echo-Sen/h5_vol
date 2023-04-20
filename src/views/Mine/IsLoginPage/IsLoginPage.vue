<template>
  <!-- 登录状态 -->
  <div>
    <router-view></router-view>
    <header>
      <img :src="userInfo.avatar" alt="头像" />
      <h1>{{ userInfo.name }}</h1>
    </header>
    <section>
      <ul>
        <li>
          <router-link class="a" to=""
            ><van-icon name="manager-o" />志愿者认证</router-link
          >
        </li>
        <li>
          <router-link class="a" to="/volsignup"
            ><van-icon name="records" />志愿者报名</router-link
          >
        </li>
        <li>
          <router-link class="a" to="/published"
            ><van-icon name="coupon-o" />我的帖子</router-link
          >
        </li>
        <li>
          <router-link class="a" to=""
            ><van-icon name="guide-o" />使用指南</router-link
          >
        </li>
        <li>
          <router-link class="a" to="/permission"
            ><van-icon name="search" />权限申请</router-link
          >
        </li>
        <li>
          <router-link class="a" to=""
            ><van-icon name="setting-o" />设置</router-link
          >
        </li>
        <li>
          <router-link class="a" to="/admin"
            ><van-icon name="setting-o" />后台管理</router-link
          >
        </li>
        <li @click="logOut">
          <router-link class="a" to=""
            ><van-icon name="setting-o" />退出登录</router-link
          >
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: '',
        mobile: '',
        gender: '', //性别 男：0，女：1
        avatar: '', // 头像
      },
    }
  },
  mounted() {
    if (localStorage.getItem('userinfo')) {
      this.setInfo()
    }
  },
  methods: {
    setInfo() {
      const resUserInfo = JSON.parse(window.localStorage.getItem('userinfo'))
      this.userInfo.name = resUserInfo.name
      this.userInfo.mobile = resUserInfo.mobile
      this.userInfo.gender = resUserInfo.gender
      this.userInfo.avatar = resUserInfo.avatar
    },
    logOut() {
      localStorage.removeItem('userinfo')
      localStorage.removeItem('token_expires_at')
      location.reload()
    },
  },
}
</script>

<style scoped>
/* 设置头部样式 */
header {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
header img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
}
header h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

/* 设置主体样式 */
section {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
section ul {
  list-style: none;
  padding: 0;
}
section li {
  margin-bottom: 10px;
}
section .a {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  background-color: #f6f6f6;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
section .a .van-icon {
  margin-right: 3px;
}

section a:hover {
  background-color: #e6e6e6;
}
</style>
