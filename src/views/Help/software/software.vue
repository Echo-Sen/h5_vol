<template>
  <div class="container">
    <Back />
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        label="求助软件"
        :value="form.value"
        placeholder="请选择求助软件"
        required
        :rules="[{ required: true, message: '请选择权限' }]"
        v-model="form.value"
        size="large"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          title="软件组"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>

      <!--  -->
      <van-field
        v-model="form.name"
        label="姓名"
        required
        placeholder="请输入您的姓名"
        :rules="nameRules"
      />
      <van-field
        v-model="form.number"
        label="学号"
        required
        placeholder="请输入您的学号"
        :rules="numberRules"
      />
      <van-field
        v-model="form.phone"
        label="联系方式"
        required
        placeholder="请输入您的联系方式"
        :rules="phoneRules"
      />
      <van-field
        v-model="form.message"
        :rules="[{ required: true, message: '请填写您遇到的问题' }]"
        rows="2"
        autosize
        size="large"
        label="问题"
        required
        type="textarea"
        maxlength="50"
        placeholder="请简单叙述您遇到的问题"
        show-word-limit
      />
      <van-button round block type="info" native-type="submit">提交</van-button>
    </van-form>
  </div>
</template>

<script>
import { Form, Button, Field, Popup, Picker, Toast } from 'vant'
export default {
  data() {
    return {
      columns: ['PS', 'PR', 'AE'],
      form: {
        value: '',
        name: '',
        number: '',
        phone: '',
        message: '',
      },

      showPicker: false,
      nameRules: [
        { pattern: /^[\u4e00-\u9fa5]+$/, message: '姓名只能输入中文' },
      ],
      numberRules: [
        { pattern: /^2\d{9}$/, message: '学号必须以2开头，共10位数字' },
      ],
      phoneRules: [
        { pattern: /^1[3-9]\d{9}$/, message: '联系方式必须是合法的电话号码' },
      ],
    }
  },
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
  },
  methods: {
    onSubmit() {
      // 表单提交逻辑
    },
    onConfirm(value) {
      this.form.value = value
      this.showPicker = false
    },

    onCancel() {
      this.showPicker = false
    },
    onSubmit() {
      // const option = {
      //  this.form
      // }
      console.log(this.form)
    },
  },
}
</script>

<style scoped>
.container {
  margin: 10px;
  /* background-color: red; */
}
.van-button {
  background-image: linear-gradient(to right, #bc95c6 0%, #7dc4cc 100%);
}
</style>
