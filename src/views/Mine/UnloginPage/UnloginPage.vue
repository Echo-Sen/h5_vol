<template>
  <div>
    <div class="profile" @click="login">
      <div class="profile__avatar">
        <van-icon
          name=" icon-morentouxiang"
          class-prefix="iconfont"
          size="80"
        />
        <div class="profile__name">点击登录</div>
      </div>
    </div>
    <section>
      <ul>
        <li>
          <a href="#"><van-icon name="manager-o" />志愿者认证</a>
        </li>
        <li>
          <a href="#"><van-icon name="records" />志愿者报名</a>
        </li>
        <li>
          <a href="#"><van-icon name="guide-o" />使用指南</a>
        </li>
        <li>
          <a href="#"><van-icon name="search" />关于青队</a>
        </li>
        <li>
          <a href="#"><van-icon name="setting-o" />设置</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { oauthUrl } from '@/api/user'
export default {
  methods: {
    async login() {
      this.getOathUrl()
    },

    async getOathUrl() {
      const res = await oauthUrl()
      window.location.href = res.data.authorizeUrl
    },
  },
}
</script>

<style scoped>
/* 个人信息样式 */
.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #1ce569; */
  /* min-height: 100px; 可以根据实际情况调整高度 */
}

.profile__avatar {
  /* width: 80px; */
  /* height: 0px; */
  /* margin: 0 auto; */
  /* background-color: #e55454; */
  /* margin-top: 5%; */
}

.iconfont {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile__name {
  margin-top: -20%;

  font-size: 18px;
  text-align: center;
  color: #666;
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
section a {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  background-color: #f6f6f6;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
section a .van-icon {
  margin-right: 3px;
}

section a:hover {
  background-color: #e6e6e6;
}
</style>
