<template>
  <div class="card">
    <div class="left-column">
      <img :src="avatar" alt="User Avatar" class="avatar" />
    </div>
    <div class="gender">
      <van-icon :color="gender" size="18px" name="manager" />
    </div>
    <div class="middle-column">
      <div class="name">{{ name }}</div>
      <div class="permissions">{{ permissions }}</div>
    </div>
    <div class="right-column" v-if="!isShow">
      <button class="button" @click="onButtonClick()">
        <van-popover
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference>
            <van-button type="primary" color="#F2CA27"
              ><van-icon name="ellipsis"
            /></van-button>
          </template>
        </van-popover>
      </button>
    </div>
  </div>
</template>

<script>
import { Popover } from 'vant'
export default {
  name: 'UserCard',
  components: {
    [Popover.name]: Popover,
  },
  computed: {
    isShow() {
      if (this.$route.path === '/permissionmanage') {
        return 1
      } else {
        return 0
      }
    },
  },
  data() {
    return {
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [{ text: '用户详情' }, { text: '权限管理' }],
    }
  },
  props: {
    avatar: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    permissions: {
      type: String,
      required: false,
    },
    onButtonClick: {
      type: Function,
      required: false,
    },
    id: {
      type: Number,
      required: false,
    },
  },
  methods: {
    onSelect(action) {
      console.log(this.id)
      if (action.text === '权限管理') {
        this.$router.push({ path: '/permissionmanage', query: { id: this.id } })
      } else {
      }
    },
  },
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 10px;
  background-color: #efefef;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.left-column {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.middle-column {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10px;
}

.name {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

.permissions {
  font-size: 14px;
  color: #9293a0;
}

.right-column {
  margin: 10px 20px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.van-button {
  border-radius: 50%;
}
</style>
