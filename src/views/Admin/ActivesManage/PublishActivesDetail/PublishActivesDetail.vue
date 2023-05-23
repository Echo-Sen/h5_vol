<template>
  <div class="container">
    <Back :title="'活动发布'" />
    <van-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
      onsubmit="return false"
    >
      <van-field
        v-model="form.location"
        placeholder="请输入地点"
        label="地点"
        required
      />
      <van-field
        v-model="form.title"
        placeholder="请输入标题"
        label="标题"
        required
      />
      <van-field
        v-model="form.scope"
        placeholder="请输入征集范围"
        label="征集范围"
        required
      />
      <van-field
        v-model="form.number"
        label="征集人数"
        placeholder="请输入征集人数"
        type="number"
        required
        :min="1"
      />
      <van-field
        v-model="form.publisher"
        placeholder="请输入发布单位"
        label="发布单位"
        required
      />
      <van-field
        readonly
        clickable
        required
        name="datetimePicker"
        :value="currentDateStart"
        v-model="form.dateStart"
        label="开始时间"
        placeholder="点击选择开始时间"
        @click="showPicker1 = true"
      />
      <van-popup v-model="showPicker1" position="bottom">
        <van-datetime-picker
          type="datetime"
          v-model="currentDateStart"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirmStart"
          @cancel="showPicker1 = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        required
        name="datetimePicker"
        :value="currentDateEnd"
        v-model="form.dateEnd"
        label="截止时间"
        placeholder="点击选择截止时间"
        @click="showPicker2 = true"
      />
      <van-popup v-model="showPicker2" position="bottom">
        <van-datetime-picker
          type="datetime"
          v-model="currentDateEnd"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirmEnd"
          @cancel="showPicker2 = false"
        />
      </van-popup>

      <van-field
        v-model="form.hours"
        label="志愿时长"
        placeholder="请输入志愿时长"
        type="number"
        required
        :min="1"
      />
      <van-field
        v-model="form.contact"
        placeholder="请输入联系人"
        label="联系人"
        required
      />
      <van-field
        v-model="form.phone"
        label="联系方式"
        placeholder="请输入联系方式"
        type="tel"
        required
        :rules="[{ pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号码' }]"
      />
      <van-field
        v-model="form.rule"
        placeholder="请输入活动规则"
        label="活动规则"
        type="textarea"
      />
      <van-field
        v-model="form.description"
        placeholder="请输入活动说明"
        label="活动说明"
        type="textarea"
      />
      <van-uploader
        v-model="fileList"
        multiple
        upload-text="选择活动宣传图"
        max-count="1"
        accept="image/*"
        preview-full-image
        :after-read="afterRead"
      />
      <van-button round block @click="onsubmit" type="info" native-type="submit"
        >提交</van-button
      >
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Toast, Uploader, DatetimePicker, Popup } from 'vant'
import { uploadImgData } from '@/api/upload'
import { AddActive } from '@/api/admin'
export default {
  data() {
    return {
      form: {
        location: '',
        scope: '',
        number: null,
        // publisher: '',自定义发布方
        dateStart: '',
        dateEnd: '',
        hours: null,
        contact: '',
        phone: '',
        description: '',
        img: '',
        title: '',
        rule: '',
      },
      rules: {
        location: [{ required: true, message: '请填写地点' }],
        scope: [{ required: true, message: '请填写征集范围' }],
        number: [
          { required: true, message: '请填写征集人数' },
          { type: 'number', message: '征集人数必须为数字' },
          { min: 1, message: '征集人数必须大于等于1' },
        ],
        publisher: [{ required: true, message: '请填写发布单位' }],
        date: [{ required: true, message: '请选择活动日期' }],
        hours: [
          { required: true, message: '请填写志愿时长' },
          { type: 'number', message: '志愿时长必须为数字' },
          { min: 1, message: '志愿时长必须大于等于1' },
        ],
        contact: [{ required: true, message: '请填写联系人' }],
        phone: [
          { required: true, message: '请填写联系方式' },
          {
            pattern: /^1[0-9]{10}$/,
            message: '请输入正确的手机号码',
          },
        ],
      },
      fileList: [],
      showPicker1: false,
      showPicker2: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDateStart: new Date(),
      currentDateEnd: new Date(),
    }
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Uploader.name]: Uploader,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
        } else {
          Toast('请检查填写内容')
        }
      })
    },
    onsubmit() {
      const option = {
        img: this.form.img,
        title: this.form.title, // 标题
        scope: this.form.scope, // 范围
        place: this.form.location, // 地址
        number: this.form.number, // 人数
        contact: this.form.contact, // 联系人
        contact_way: this.form.phone, // 联系方式
        detail: this.form.description, // 描述
        rule: this.form.rule, //规则
        duration: this.form.hours, //志愿时长
        start: this.form.dateStart, // 起始时间
        end: this.form.dateEnd, //截止时间
      }
      AddActive(option)
        .then((res) => {
          // 上传图片和返回消息处理
          Toast.success('发布成功')
        })
        .catch((error) => {
Toast.fail('发布失败')
        })
      location.reload()
    },
    // 上传图片
    async afterRead(file) {
      // base64
      const base64 = file.content
      uploadImgData(base64)
        .then((res) => {
          this.form.img = ''
          this.form.img = res.data.image
          file.status = 'true'
          file.message = '上传成功'
        })
        .catch((error) => {
          file.status = 'false'
          file.message = '上传失败'
        })
      file.status = 'uploading'
      file.message = '上传中...'
    },
    onConfirmStart(time) {
      this.form.dateStart = this.formatDate(time, '%Y-%m-%d %H:%M:%S')
      this.showPicker1 = false
    },
    onConfirmEnd(time) {
      this.form.dateEnd = this.formatDate(time, '%Y-%m-%d %H:%M:%S')
      this.showPicker2 = false
    },
    // 时间格式化
    formatDate(date, format) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')

      return format
        .replace('%Y', year)
        .replace('%m', month)
        .replace('%d', day)
        .replace('%H', hours)
        .replace('%M', minutes)
        .replace('%S', seconds)
    },
  },
}
</script>

<style scoped>
.container {
  margin: 5px;
}
.van-button {
  background-image: linear-gradient(to right, #bc95c6 0%, #7dc4cc 100%);
}
</style>
