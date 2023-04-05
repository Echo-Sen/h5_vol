<template>
  <div class="copyright">
    <div class="icon">
      <img
        src="https://olrando.oss-cn-chengdu.aliyuncs.com/img/%E4%BC%9A%E5%BE%BD.png"
      />
    </div>
    <div class="text">
      <div class="title">"小红帽"常青藤青年志愿者服务队</div>
      <div class="dec">English name</div>
    </div>
  </div>
</template>
<style scoped>
.copyright {
  /* flex: 1; */
  display: flex;
}

.copyright .icon {
  width: 40px;
  height: 40px;
}

.copyright .icon img {
  width: 100%;
  height: 100%;
}

.copyright .text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  color: #fff;
}

.copyright .text .title {
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
}

.copyright .text .title .status {
  width: 50px;
  height: 20px;
  background-color: #16bc42;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  border-radius: 20px;
  margin-left: 10px;
}

.copyright .text .dec {
  font-size: 12px;
}
</style>
