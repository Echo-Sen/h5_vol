<template>
  <div class="container">
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        label="申请权限"
        :value="value"
        placeholder="请选择"
        required
        :rules="[{ required: true, message: '请选择权限' }]"
        v-model="value"
        size="large"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          title="权限组"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>
      <van-field
        v-model="message"
        :rules="[{ required: true, message: '请填写申请理由' }]"
        rows="2"
        autosize
        size="large"
        label="申请理由"
        required
        type="textarea"
        maxlength="50"
        placeholder="请输入理由"
        show-word-limit
      />
      <div style="margin: 10px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Popup, Area, Picker, Toast } from 'vant'
import { ApplyPermission } from '@/api/premission'
export default {
  data() {
    return {
      value: '',
      showPicker: false,
      message: '',
      columns: ['超级管理员', '管理员'],
    }
  },
  components: {
    [Field.name]: Field,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [Area.name]: Area,
    [Picker.name]: Picker,
    [Toast.name]: Toast,
  },

  methods: {
    onConfirm(value) {
      this.value = value
      this.showPicker = false
    },

    onCancel() {
      Toast('取消')
      this.showPicker = false
    },
    onSubmit() {
      if (this.value == '超级管理员') {
        ApplyPermission(1, this.message).then((res) => {
          if (res.data.status === 1) {
            Toast.success(res.data.msg)
            this.message = ''
            this.value = ''
          } else {
            Toast.fail(res.data.msg)
          }
        })
      } else if (this.value == '管理员') {
        ApplyPermission(2, this.message).then((res) => {
          if (res.data.status === 1) {
            Toast.success(res.data.msg)
            this.message = ''
            this.value = ''
          } else {
            Toast.fail(res.data.msg)
          }
        })
      }
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
