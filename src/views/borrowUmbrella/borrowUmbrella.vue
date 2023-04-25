<template>
  <div class="container">
    <div class="view"><img class="img" src="@/assets/images/img.png" /></div>
    <video
      :class="{ Video: !isFullscreen }"
      ref="videoPreview"
      style="height: 0px"
    ></video>
    <div class="btn-container">
      <img class="img" src="@/assets/images/cqt.webp" alt="" />
      <button @click="Photo(1)" class="btn left">
        <van-icon name="scan" />扫码借伞
      </button>
      <button @click="Photo(0)" class="btn right">
        <van-icon name="scan" />扫码还伞
      </button>
    </div>
    <van-notice-bar
      left-icon="volume-o"
      scrollable
      background="#ecf9ff"
      color="#1989fa"
      text="爱心雨伞遮挡风雨，不要忘记送我回家喔"
    />
    <div class="content"><FlowChart></FlowChart></div>
  </div>
</template>

<script>
import { BrowserQRCodeReader } from '@zxing/library'
import { postUmbrella } from '@/api/umbrella'
import { Toast, NoticeBar } from 'vant'
import FlowChart from '@/components/flowChart/flowChart.vue'
export default {
  name: 'ScanQRCode',
  data() {
    return {
      obj: '',
      upid: '',
      isFullscreen: false,
    }
  },
  components: {
    FlowChart,
    [NoticeBar.name]: NoticeBar,
  },
  mounted() {},
  methods: {
    // 上传借伞信息
    postBorrowUp() {
      const option = {
        upid: this.upid,
        type: 'borrow',
      }
      postUmbrella(option).then((res) => {
        if (res.data.status === 1) {
          // 成功
          Toast.success(res.data.msg)
        } else {
          Toast.fail(res.data.msg)
          return
        }
      })
    },

    postReturnUp() {
      const option = {
        upid: this.upid,
        type: 'return',
      }
      postUmbrella(option).then((res) => {
        if (res.data.status === 1) {
          // 成功
          Toast.success(res.data.msg)
        } else {
          Toast.fail(res.data.msg)
          return
        }
      })
    },
    // 进入全屏模式 传参：dom元素
    enterFullscreen(video) {
      // 自动全屏 三种方式适配不同浏览器
      if (video.requestFullscreen) {
        video.requestFullscreen()
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen()
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen()
      }
      this.isFullscreen = true
    },
    // 退出全屏模式 传参：dom元素
    exitFullscreen(document) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
      // 关闭视频流
      const stream = document.srcObject
      const tracks = stream.getTracks()
      tracks.forEach((track) => {
        track.stop()
      })
      document.srcObject = null
      this.isFullscreen = false
    },
    // 创建
    Photo(e) {
      // 获取 video 元素
      const video = this.$refs.videoPreview
      // 进入全屏模式
      this.enterFullscreen(video)
      // 创建二维码扫描器
      const codeReader = new BrowserQRCodeReader()
      // 打开摄像头并显示预览
      codeReader
        .getVideoInputDevices()
        .then((videoInputDevices) => {
          if (videoInputDevices.length > 0) {
            codeReader
              .decodeFromInputVideoDevice(videoInputDevices[0].deviceId, video)
              .then((result) => {
                const pattern = /upid:\s*([^,\}\s]+)/
                const match = result.text.match(pattern)
                this.upid = match[1]
                // 扫码成功退出全屏模式
                this.exitFullscreen(video)
              })
              .then(() => {
                // e:1借伞
                // e:0还伞
                if (e) {
                  this.postBorrowUp()
                } else {
                  this.postReturnUp()
                }
              })
              .catch((err) => {
                console.error(err)
              })
          } else {
            Toast.fail('没有可用的视频输入设备')
            console.error('没有可用的视频输入设备')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>

<style scoped>
.view {
  width: 100%;
  height: 220px;
  background-color: red;
  min-height: 200px;
  border-radius: 10px;
}
.btn {
  position: absolute;
  height: 50px;
  width: 100px;
  background-color: rgb(25, 222, 48);
  border-radius: 50px;
  color: white;
  font-size: 18px;
  z-index: 1;
}
.right {
  right: 50px;
}
.left {
  left: 50px;
}
.btn-container {
  width: 100%;
  height: 70px;
  background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.content {
  height: 300px;
  width: 100%;
  background: linear-gradient(to bottom, #4343ef, #87cefa);

  margin-top: 10px;
  border-radius: 10px;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.Video {
  display: none;
}
</style>
