<template>
  <div>
    <h1 class="title">
      <van-icon name="arrow-left" @click="back" class="back" />
    </h1>
    <form onsubmit="return false">
      <textarea
        class="context"
        id=""
        cols="50"
        rows="10"
        placeholder="请务必发布清晰照片，指明拾取或遗失位置"
        v-model="option.context"
      ></textarea>
      <!-- 
      after-read：回调
      multiple：是否开启图片多选，部分安卓机型不支持
      max-count：最大支持六张照片 
      preview-full-image：支持预览图片
      accept：仅支持图片
      -->
      <van-uploader
        v-model="option.images"
        :after-read="afterRead"
        multiple
        upload-text="选择图片"
        max-count="6"
        accept="image/*"
        preview-full-image
      />
      
      <van-button type="primary" @click="submitForm">发布</van-button>
    </form>
  </div>
</template>

<script>
import { updateFormData, uploadImgData } from '@/api/upload'
import { getCommunityData } from '@/api/community'
export default {
  data() {
    return {
      active: 0,
      // fileList: [], // 展示图片上传情况
      disable: true, // 开启提交按钮,
      option: {
        post_id: undefined,
        username: undefined,
        context: undefined,
        images: [],
      },
    }
  },
  component: {},
  mounted() {
    this.setOption()
    console.log(this.option)
    // updateFormData()
  },
  methods: {
    // 在提交表单之前，将本地全部的图片url 设置到option下的images

    // 提交表单
    async submitForm() {
      if (this.disable) {
        // 将数组全部变成字符串
        let imageStr = []
        this.option.images.forEach((item) => {
          // console.log(item);
          imageStr.push(item.url)
        })
        let img = imageStr.join('|')
        this.option.images = img
        updateFormData(this.option).then((res) => {
          console.log(res)
        })
        //   uploadFormData(option)
        //     .then((res) => {
        //       if (res.data.status === 1) {
        //         // 禁用提交按钮
        //         this.disable = false
        //         Toast.success('发布成功')
        //         this.$router.push('/message')
        //       } else {
        //         Toast.fail(res.data.msg)
        //       }
        //     })
        //     .catch((error) => {
        //       console.log(error)
        //       Toast.fail('请求错误')
        //     })
        // } else {
        //   Toast.fail('请勿反复提交')
      }
    },
    //上传图片的回调函数
    async afterRead(file) {
      // base64
      const base64 = file.content
      uploadImgData(base64)
        .then((res) => {
          this.option.images.pop(this.option.images.length - 1)
          this.option.images.push({ url: res.data.image })
          file.status = 'true'
          file.message = '上传成功'
          console.log(this.option)
        })
        .catch((error) => {
          // console.log(error)
          file.status = 'false'
          file.message = '上传失败'
        })
      file.status = 'uploading'
      file.message = '上传中...'
    },
    // 用户id等绑定在option中
    setOption() {
      const id = this.$route.query.id
      const arr = JSON.parse(localStorage.getItem('communityData'))
      arr.forEach((item) => {
        if (item.id == id) {
          this.option.post_id = id
          this.option.username = JSON.parse(
            localStorage.getItem('userinfo')
          ).username
          this.option.context = item.context
          const imageArr = item.images.split(',')
          imageArr.forEach((items) => {
            this.option.images.push({ url: items })
          })
        }
      })
    },
    back() {
      this.$router.back()
    },
  },
}
</script>

<style></style>
