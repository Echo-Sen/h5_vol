<template>
  <div>
    <!-- 卡片开始 -->
    <div class="card" v-for="(item, index) in data" :key="index">
      <div class="card-header">
        <div class="avatar">
          <img :src="item.avatar" />
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
      <hr />
      <div class="mid-container">
        <div class="card-text">{{ item.msg }}</div>
        <van-image
          width="10rem"
          height="10rem"
          fit="contain"
          radius="10px"
          :src="item.img"
        >
          <!-- <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template> -->
          <template v-slot:error><van-icon name="replay" />加载失败</template>
        </van-image>
      </div>
      <div class="card-footer">
        <button class="like">
          <van-icon name="like-o" size="25px" />{{ `点赞(${item.upNum})` }}
        </button>
        <button class="chat">
          <van-icon name="comment-o" size="25px" /> {{ `评论(${item.comNum})` }}
        </button>

        <button class="share">
          <van-icon name="share-o" size="25px" />分享
        </button>
      </div>
    </div>
    <!-- 卡片结束 -->
  </div>
</template>

<script>
import { Image as VanImage } from 'vant'
import { getCommunityData } from '@/api/Community'
export default {
  data() {
    return {
      data: null,
    }
  },
  components: {
    [VanImage.name]: VanImage,
  },
  mounted() {
    getCommunityData().then((res) => {
      this.data = res.data.data
    })
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

.card-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.card-footer button:hover {
  background-color: #f0f0f0;
}
</style>
