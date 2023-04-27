<template>
  <div class="container">
    <Back />
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
            <template v-slot:error><van-icon name="replay" />加载失败</template>
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
          <span>{{ `点赞 (${item.likes})` }}</span>
        </button>
        <button
          style="display: flex; align-items: center"
          class="chat"
          @click="goComments(item.id)"
        >
          <van-icon name="comment-o" size="25px" />
          <span>{{ `评论 (${item.comments})` }}</span>
        </button>
        <button style="display: flex; align-items: center" class="share">
          <van-icon name="share-o" size="25px" /><span>{{
            `分享 (${item.reposts})`
          }}</span>
        </button>
      </div>
    </div>
    <div class="comment-content">
      <!-- 评论区域 -->
      <div class="title-container"><span class="title">评论区</span></div>
      <div class="comment-card" v-for="(item, index) in comments" :key="index">
        <div class="card-header">
          <div class="avatar avatar-comment">
            <img :src="item.avatar" />
          </div>
          <div class="name">{{ item.username }}</div>
          <div class="time">
            {{ item.updated_at | transformTime(item.updated_at) }}
          </div>
          <button @click="replay(item.id)" class="replay">回复</button>
        </div>
        <div class="comment-context">{{ item.context }}</div>
      </div>
      <div style="height: 8rem"></div>
      <div class="chat_foot">
        <!-- context -->
        <van-sticky :offset-top="60">
          <textarea
            class="chat_context"
            id="chat_context_item"
            cols="20"
            rows="10"
            v-model="context"
            placeholder="输入你想评论的内容"
            ref="input"
          ></textarea>

          <div class="chat_commit" @click="commit" id="button">发送</div>
        </van-sticky>
      </div>
    </div>
  </div>
</template>

<script>
import {
  List,
  Image as VanImage,
  PullRefresh,
  ShareSheet,
  ImagePreview,
  Sticky,
  Toast,
} from 'vant'
import {
  postLiked,
  postIsLike,
  GetCommentsData,
  POstCommentsData,
} from '@/api/community'
export default {
  data() {
    return {
      id: undefined, // 该页面id
      data: [], // 该页面全部评论数据
      liked: false, // 判断是否点赞
      comments: [],
      context: '', // 输入框内容
    }
  },
  components: {
    [VanImage.name]: VanImage,
    [PullRefresh.name]: PullRefresh,
    [ShareSheet.name]: ShareSheet,
    [List.name]: List,
    [ImagePreview.Component.name]: ImagePreview.Component,
    [Sticky.name]: Sticky,
  },
  mounted() {
    this.id = this.$route.query.id
    this.GetComments()
    this.setOnlyData()
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
    // 评论发送
    commit() {
      const option = {
        post_id: this.id,
        context: this.context,
      }
      POstCommentsData(option).then((res) => {
        if (res.data.status == 1) {
          Toast.success(res.data.msg)
          location.reload()
        } else {
          Toast.fail(res.data.msg)
        }
      })
    },
    // 获取评论信息
    GetComments() {
      GetCommentsData(this.id).then((res) => {
        // this.comments = [
        //   ...this.comments,
        //   ...res.data.data.filter((item) => {
        //     !this.comments.some((i) => {
        //       i.id === item.id
        //     })
        //   }),
        // ]
        res.data.data.forEach((item) => {
          this.comments.unshift(item)
        })
      })
    },
    // 设置当前页的内容
    setOnlyData() {
      const array = JSON.parse(localStorage.getItem('communityData'))
      array.forEach((item) => {
        if (item.id == this.id) {
          this.data.push(item)
          return
        }
      })
    },
    // 点赞
    async clickLikes() {
      // 获取icon
      const likeIcon = this.$refs['likeDiv' + this.id][0].children[0]
      if (likeIcon.classList.contains('liked')) {
        likeIcon.classList.remove('liked')
        this.data.find((item) => {
          if (item.id == this.id) {
            item.likes -= 1
            postLiked(id)
          }
        })
      } else {
        likeIcon.classList.add('liked')
        //更改id对应的likes
        this.data.find((item) => {
          if (item.id == this.id) {
            item.likes += 1
            postLiked(this.id)
          }
        })
      }
    },
    replay(id) {
      const input = this.$refs.input
      // 将光标置于输入框中
      input.focus()
      // 打开键盘
      input.select()

      
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
}
.card-header {
  display: flex;
  /* align-items: center; */
  line-height: 20px;
  padding: 10px;
  position: relative;
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
/* 回复 */
.replay {
  position: absolute;
  right: 20px;
  top: 20px;
}

/* 评论区域 */
.title-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  font-size: 20px;
}
.comment-content {
  min-height: 100px;
  width: 100%;
  /* background-color: skyblue; */
  border-radius: 10px;
}
.comment-card {
  min-height: 100px;
  width: 100%;
  border-radius: 10px;
  /* background-color: red; */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  background-color: #fff;
}
.comment-context {
  padding: 10px;
}
.chat_foot {
  width: 100%;
  height: 120px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: fixed;
  bottom: 0px;
}
.chat_context {
  width: 100%;
  height: 100px;
  font-size: 17px;
  box-sizing: border-box;
  outline: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-radius: 10px;
  border-width: 0px;
  padding: 16px;
}
.chat_commit {
  width: 80px;
  height: 30px;
  color: white;
  background-color: #be79df;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  bottom: 50px;
  margin-right: 10px;
}
.chat_context {
  resize: none;
}
.chat_context::placeholder {
  color: black;
  font-weight: 500k;
}
.line {
  width: 100%;
  border-top: 1px;
  border-color: #f4f5f7;
  border-style: solid;
}
.loading {
  z-index: 1;
  display: inline;
}
</style>
