<template>
  <div class="feedback-container">
    <Back :title="'意见反馈'" />
    <van-form @submit="onSubmit">
      <div class="textarea-wrapper">
        <textarea
          class="textarea"
          placeholder="请输入您的建议"
          v-model="successMSg"
        ></textarea>
      </div>
      <van-field name="switch" label="匿名提交">
        <template #input>
          <van-switch v-model="switchChecked" size="20" />
        </template>
      </van-field>

      <div v-if="!switchChecked">
        <van-field
          v-model="contact"
          name="联系方式"
          label="联系方式"
          placeholder="请输入您的联系方式"
          colon
          :rules="[{ pattern, required: true, message: '最大输入16位' }]"
        />
      </div>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Field, Form, Switch, Toast } from 'vant'
import { feedBackPost } from '@/api/feedBack'
import { isLogin } from '@/utils/Login'
export default {
  components: {
    [Field.name]: Field,
    [Form.name]: Form,
    [Switch.name]: Switch,
    [Toast.name]: Toast,
  },
  data() {
    return {
      contact: '',
      switchChecked: 0,
      successMSg: '',
      isPost: false,
      pattern: /^.{0,16}$/,
    }
  },
  methods: {
    async onSubmit() {
      if (isLogin()) {
        if (!this.isPost) {
          if (this.switchChecked) {
            this.contact = ''
            this.name = ''
          }
          const option = {
            contact: this.contact,
            hasct: Number(this.switchChecked),
            context: this.successMSg,
          }
          feedBackPost(option).then((res) => {
            // 调用函数
            console.log(res)
            if (res.data.status) {
              Toast.success({
                message: '提交成功',
              })
              this.isPost = true
            } else {
              Toast.fail({
                message: '请求失败',
              })
            }
            console.log(option)
          })
        } else {
          Toast.fail({
            message: '请勿反复提交',
          })
        }
      } else{
        Toast.fail('请先登录')
      }
    },
  },
}
</script>

<style scoped>
.feedback-container {
}
.textarea-wrapper {
  position: relative;
  margin: 20px 0;
}

.textarea {
  display: block;
  width: 100%;
  height: 120px;
  padding: 10px;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  resize: none;
  font-family: KaiTi, '楷体', STKaiti, '华文楷体', serif;
  caret-color: #409eff;
}

.textarea:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}
.van-button {
  background-image: linear-gradient(to right, #bc95c6 0%, #7dc4cc 100%);
}
</style>
