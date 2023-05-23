<template>
  <div class="container">
    <div class="view"><img class="img" src="@/assets/images/爱心雨伞.jpg" /></div>
    <div
      :class="{ noShow: !isFullscreen }"
      ref="videoPreview"
      class="bgc-f4f4f4"
    >
      <div class="video-show" />
      <video id="video" ref="video" class="video vjs-fluid" autoplay />
      <span class="change" @click="change">
        <i class="el-icon-refresh" />
      </span>
    </div>
    <div class="btn-container">
      <img class="img" src="@/assets/images/cqt.webp" alt="" />
      <button @click="ClickScan(1)" class="btn left">
        <van-icon name="scan" />扫码借伞
      </button>
      <button @click="ClickScan(0)" class="btn right">
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
// 看到这个没，这个是一个小插件，能在手机上打开控制台，你打印的控制台信息和报错都能在这显示，具体方法自己百度
// import Vconsole from "vconsole";
import { BrowserMultiFormatReader } from '@zxing/library'
import { postUmbrella } from '@/api/umbrella'
import { Toast, NoticeBar } from 'vant'
import FlowChart from '@/components/flowChart/flowChart.vue'
export default {
  name: 'QrCodeSearch',
  components: {
    FlowChart,
    [NoticeBar.name]: NoticeBar,
  },
  data() {
    return {
      loadingShow: false,
      // 这个就是从@zxing/library导出来的方法，new一个实例
      codeReader: new BrowserMultiFormatReader(),
      // 这个，用来储存扫码得到的结果
      textContent: null,
      // 这个，就是当前调用的摄像头的索引，为什么是6，我会在后面说的
      num: 0,
      // 这个就是扫描到的摄像头的数量
      videoLength: '',
      isFullscreen: false,
      upid: undefined,
    }
  },
  methods: {
    ClickScan(e) {
      console.log(e)
      const video = this.$refs.videoPreview
      // 让我们调用这个方法尝试打开摄像头
      this.enterFullscreen(video)
      this.openScan(e)
    },
    // 开打开打
    async openScan(e) {
      const that = this
      // 这个就是data里的哪个new出来的玩意，调用里面的方法
      that.codeReader.listVideoInputDevices().then((videoInputDevices) => {
        // 记录一下扫描到的摄像头数量，这个videoInputDevices是个数组，里面有扫描到的摄像头数据
        this.videoLength = videoInputDevices.length
        console.log(videoInputDevices)
        // 这步我们来决定一下调用第几个摄像头，看到这个num没，这就是data里的
        const firstDeviceId = videoInputDevices[that.num].deviceId
        // 这调用另一个方法
        that.decodeFromInputVideoFunc(
          firstDeviceId,
          videoInputDevices.length,
          e
        )
      })
      // 失败回调，为什么这里的失败回调这么写，后面会说的
      // .catch((err) => {
      //   this.num = 1
      //   that.openScan()
      //   console.error(err)
      // })
    },
    //这就是在openScan里调的另一个方法，传入想调用的摄像头id和摄像头数量
    decodeFromInputVideoFunc(firstDeviceId, length, status) {
      const that = this
      that.codeReader.reset() // 重置
      that.textContent = null // 重置
      that.codeReader.decodeFromVideoDevice(
        firstDeviceId,
        'video',
        (result, err) => {
          that.textContent = null
          // 扫描成功 这个result就是扫描结果
          if (result) {
            that.textContent = result
            // 对扫描结果做些什么
            // 扫码成功退出全屏模式
            this.exitFullscreen(video)
            console.log(that.textContent)
            const pattern = /upid:\s*([^,\}\s]+)/
            const match = result.text.match(pattern)
            this.upid = match[1]
            console.log('upid:', this.upid)
            if (status) {
              this.postBorrowUp()
            } else {
              this.postReturnUp()
            }
            
          }
        }
      )
    },
    // 点击切换前后摄像头
    change() {
      console.log('镜头切换')
      // const that = this
      // if (this.videoLength > 2) {
      //   if (this.num < 2) {
      //     this.num = 6
      //   } else {
      //     this.num = 1
      //   }
      //   that.textContent = null
      //   that.codeReader && that.codeReader.reset()
      //   that.openScan()
      // } else {
      //   if (that.num === 0) {
      //     that.num = 1
      //   } else {
      //     that.num = 0
      //   }
      //   that.textContent = null
      //   that.codeReader && that.codeReader.reset()
      //   that.openScan()
      // }
    },
    // 还伞
    postReturnUp() {
      const option = {
        upid: this.upid,
        type: 'return',
      }
      postUmbrella(option).then((res) => {
        if (res.data.status === 1) {
          // 成功
          console.log(res)
          Toast.success(res.data.msg)
        } else {
          Toast.fail(res.data.msg)
          return
        }
      }).then(() =>{
        location.reload()
      })
    },
    // 借伞
    // 上传借伞信息
    postBorrowUp() {
      const option = {
        upid: this.upid,
        type: 'borrow',
      }
      postUmbrella(option).then((res) => {
        if (res.data.status === 1) {
          // 成功
          console.log(res)
          Toast.success(res.data.msg)
        } else {
          Toast.fail(res.data.msg)
          return
        }
      }).then(() =>{
        location.reload()
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
  },
}
</script>

<style scoped>
.video {
  width: 100vw;
  height: 100vh;
}
.video-show {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vw;
  background: linear-gradient(to left, #fff, #fff) left top no-repeat,
    linear-gradient(to bottom, #fff, #fff) left top no-repeat,
    linear-gradient(to left, #fff, #fff) right top no-repeat,
    linear-gradient(to bottom, #fff, #fff) right top no-repeat,
    linear-gradient(to left, #fff, #fff) left bottom no-repeat,
    linear-gradient(to bottom, #fff, #fff) left bottom no-repeat,
    linear-gradient(to left, #fff, #fff) right bottom no-repeat,
    linear-gradient(to left, #fff, #fff) right bottom no-repeat;
  background-size: 2px 20px, 20px 2px, 2px 20px, 20px 2px;
}
.tip {
  width: 10vw;
  height: 10vw;
  background-color: rgb(45, 236, 45);
  border: 1px solid #ffffff;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.bgc-f4f4f4 {
  background-color: #363636;
}

.noShow {
  display: none;
}
.change {
  z-index: 100;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-align: center;
  background-color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  line-height: 60px;
  /* align-content: center; */
}
.el-icon-refresh {
  color: #000;
  font-size: 25px;
}
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
</style>
