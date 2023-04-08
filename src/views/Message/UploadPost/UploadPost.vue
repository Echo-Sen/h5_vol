<template>
  <div>
    <!-- 阻止表单默认提交 -->
    <form @submit.prevent>
      <textarea
        v-model="uploadFormData.context"
        class="context"
        id=""
        cols="50"
        rows="10"
        placeholder="请务必发布清晰照片，指明拾取或遗失位置"
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
      />
      <van-button type="primary" @click="submitForm">主要按钮</van-button>
    </form>
  </div>
</template>

<script>
import { Uploader } from 'vant'
import { uploadImgData, uploadFormData } from '@/api/Upload'
import { Button, Toast } from 'vant'
export default {
  data() {
    return {
      active: 0,
      fileList: [
        // {
        //   url: 'https://img01.yzcdn.cn/vant/leaf.jpg',
        //   isImage: true,
        //   status: 'true',
        //   message: '上传中',
        // },
        // // Uploader 根据文件后缀来判断是否为图片文件
        // // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // {
        //   url: 'https://img01.yzcdn.cn/vant/tree.jpg',
        //   status: 'true',
        //   message: '上传成功',
        // },
      ],
      // 表单数据
      uploadFormData: {
        context: '',
        images: [],
      },
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
      const userInfo = JSON.parse(localStorage.getItem('userinfo'))
      const token = JSON.parse(localStorage.getItem('userinfo')).sk
      const option = {
        user_id: userInfo.id,
        username: userInfo.username,
        context: this.uploadFormData.context,
        images: `${this.uploadFormData.images}`,
      }
      uploadFormData(option, token)
        .then((res) => {
          console.log(res)
          Toast.success('发布成功')
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async afterRead(file) {
      // base64
      const base64 = file.content
      // token
      const token = JSON.parse(localStorage.getItem('userinfo')).sk
      // console.log('base64', base64)
      // console.log('token', token)
      uploadImgData(token, base64)
        .then((res) => {
          this.uploadFormData.images.push(res.data.image)
          file.status = 'true'
          file.message = '上传成功'
        })
        .catch((error) => {
          console.log(error)
          file.status = 'false'
          file.message = '上传失败'
        })
      file.status = 'uploading'
      file.message = '上传中...'
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
