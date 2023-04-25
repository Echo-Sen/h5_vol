<template>
  <div>
    <Back />
    <form onsubmit="return false">
      <textarea
        v-model="uploadFormData.context"
        class="context"
        id=""
        cols="50"
        rows="10"
        placeholder="快来和大家交流志愿服务心得吧！"
      ></textarea>
      <!-- 
      after-read：回调
      multiple：是否开启图片多选，部分安卓机型不支持
      max-count：最大支持六张照片 
      preview-full-image：支持预览图片
      accept：仅支持图片
      -->
      <van-uploader
        v-model="fileList"
        :after-read="afterRead"
        multiple
        upload-text="选择图片"
        max-count="6"
        accept="image/*"
        preview-full-image
        @delete="deleteImg($event, file)"
      />
      <van-button type="primary" @click="submitForm">发布</van-button>
    </form>
  </div>
</template>
<script>
import { uploadImgData, uploadFormData } from '@/api/upload'
import { Button, Toast, Uploader } from 'vant'
const AhoCorasick = require('ahocorasick')
export default {
  data() {
    return {
      active: 0,
      fileList: [], // 展示图片上传情况
      // 表单数据
      uploadFormData: {
        context: '',
        images: [],
      },
      disable: true, // 开启提交按钮
    }
  },
  components: {
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  methods: {
    // 提交表单
    async submitForm() {
      // 节流阀开启并且输入有字符
      if (this.disable && this.uploadFormData.context) {
        const userInfo = JSON.parse(localStorage.getItem('userinfo'))
        const imageStr = this.uploadFormData.images.join('|')
        const str = this.sensitiveWordsFilter(this.uploadFormData.context)
        const option = {
          context: str,
          images: imageStr,
        }
        uploadFormData(option)
          .then((res) => {
            if (res.data.status === 1) {
              // 禁用提交按钮
              this.disable = false
              Toast.success('发布成功')
              this.$router.push('/message')
            } else {
              Toast.fail(res.data.msg)
            }
          })
          .catch((error) => {
            console.log(error)
            Toast.fail('请求错误')
          })
      } else {
        Toast.fail('请勿反复提交')
      }
    },

    async afterRead(file) {
      // base64
      const base64 = file.content
      uploadImgData(base64)
        .then((res) => {
          this.uploadFormData.images.push(res.data.image)
          file.status = 'true'
          file.message = '上传成功'
        })
        .catch((error) => {
          // console.log(error)
          file.status = 'false'
          file.message = '上传失败'
        })
      file.status = 'uploading'
      file.message = '上传中...'
    },

    // 过滤敏感词 返回过滤后的字符
    sensitiveWordsFilter(str) {
      // 构建ac自动机
      const sensitiveWord = ['sb', '操', '妈', '傻逼','笨蛋','nt','草']
      let ac = new AhoCorasick(sensitiveWord)
      // 敏感字替换
      let results = ac.search(str)
      const newChar = '*'
      results.forEach((item) => {
        str = str.substr(0, item[0]) + newChar + str.substr(item[0] + 1)
      })
      return str
    },

    deleteImg(e, file) {
      console.log(e, file)
    },
  },
}
</script>

<style>
.context {
  margin: 5px;
  width: 100%;
  font-family: KaiTi, '楷体', STKaiti, '华文楷体', serif;
  border: none;
  caret-color: blue;
  font-size: 15px;
}
.uploadImg {
  height: 40px;
  width: 100%;
  /* background: red; */
}
.uploadImg .items {
  margin-right: 25px;
  height: 40px;
  width: 40px;
}
</style>
