<template>
  <div class="container">
    <!-- 用户授权页 -->
    <Back :title="'权限审核'" />
    <div class="content">
      <div class="item">
        <div class="info">
          <div class="key">申请人：</div>
          <div class="value">{{ list.name }}</div>
        </div>
        <div class="info">
          <div class="key">申请权限：</div>
          <div class="value">
            {{ list.role === 1 ? '超级管理员' : '管理员' }}
          </div>
        </div>
        <div class="info">
          <div class="key">申请理由：</div>
          <div class="value">{{ list.reason }}</div>
        </div>
      </div>
      <div class="foot">
        <!-- 返回字段判断是否已处理 -->
        <div class="active" v-if="list.status === 0">
          <div style="margin: 16px">
            <van-button
              class="approve"
              round
              block
              type="info"
              native-type="submit"
              @click="Agree(list.user_id, 1)"
              >同意</van-button
            >
          </div>
          <div style="margin: 16px">
            <van-button
              class="cancel"
              round
              block
              type="info"
              native-type="submit"
              @click="Refuse(list.user_id, 2)"
              >拒绝</van-button
            >
          </div>
        </div>
        <!-- 处理直接显示结果 -->
        <div class="result" v-else>
          <div class="result_approve" v-if="list.status === 1">已同意</div>
          <div class="result_cancel" v-else>已拒绝</div>
        </div>
      </div>
    </div>
    <van-empty
      v-if="list.length === 0"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无数据"
    />
  </div>
</template>

<script>
import { getPermissionList, dealApplyPermission } from '@/api/admin'
import { Empty, Button, Toast } from 'vant'
export default {
  data() {
    return {
      list: [],
    }
  },
  components: {
    [Empty.name]: Empty,
    [Button.name]: Button,
  },
  created() {
    this.getList()
  },
  methods: {
    // 回去详细信息
    getList() {
      getPermissionList().then((res) => {
        res.data.data.forEach((item) => {
          if (item.user_id == this.$route.query.id) {
            this.list = item
            return
          }
        })
      })
    },
    // 同意
    Agree(user_id, agree) {
      dealApplyPermission(user_id, agree).then((res) => {
        if (res.data.status === 1) {
          Toast.success(res.data.msg)
        } else {
          Toast.fail(res.data.msg)
        }
        location.reload()
      })
    },
    // 拒绝
    Refuse(user_id, refuse) {
      dealApplyPermission(user_id, refuse).then((res) => {
        if (res.data.status === 1) {
          Toast.success(res.data.msg)
        } else {
          Toast.fail(res.data.msg)
        }
        location.reload()
      })
    },
  },
}
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.container .content {
  /* border: 1px solid red; */
  flex: 1;
  background-color: #eee;
  padding: 10px 10px 0 10px;
  overflow-y: scroll;
  position: relative;
}
.item {
  padding: 16px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
}
.item .info {
  display: flex;
  margin-bottom: 5px;
  font-size: 13px;
}
.item .info .key {
  width: 80px;
}

.item .info .value {
  color: #777;
  display: flex;
  flex-wrap: wrap;
}

.result {
  position: absolute;
  top: 0px;
  right: 1px;
  font-size: 20px;
}
.result .result_approve {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  color: rgb(0, 138, 14);
  border: 3px solid rgb(0, 138, 14);
}
.result .result_cancel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  color: rgb(212, 3, 3);
  border: 3px solid rgb(212, 3, 3);
}
.approve {
  background: linear-gradient(to bottom, #4cd964, #34a853);
}
.cancel {
  background: linear-gradient(to bottom, #ff6666, #ff4d4d);
}
</style>
