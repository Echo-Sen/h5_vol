<template>
  <div class="container">
    <!-- 用户授权页 -->
    <Back :title="'权限审核'" />
    <div class="content">
      <div class="item">
        <div class="info">
          <div class="key">申请人：</div>
          <div class="value">邓森</div>
        </div>
        <div class="info">
          <div class="key">申请权限：</div>
          <div class="value">超级管理员</div>
        </div>
        <div class="info">
          <div class="key">申请理由：</div>
          <div class="value">我需要超级管理员权限发布活动</div>
        </div>
      </div>
      <div class="foot">
        <!-- 返回字段判断是否已处理 -->
        <div class="active" v-if="isDispose">
          <div style="margin: 16px">
            <van-button
              class="approve"
              round
              block
              type="info"
              native-type="submit"
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
              >拒绝</van-button
            >
          </div>
        </div>
        <!-- 处理直接显示结果 -->
        <div class="result" v-else>
          <div class="result_approve" v-if="true">已同意</div>
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
import { Empty, Button } from 'vant'
export default {
  data() {
    return {
      list: [{}],
      isDispose: true, //是否已处理申请
    }
  },
  components: {
    [Empty.name]: Empty,
    [Button.name]: Button,
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
