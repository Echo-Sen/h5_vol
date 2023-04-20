<template>
  <div class="container">
    <Back />
    <div class="top"></div>
    <div class="bottom">
      <div class="software">
        <div class="software-title">
          <h1>软件帮</h1>
          <span>校园互助，点我求助</span>
        </div>
        <img src="@/assets/images/购物安全.png" alt="" />
      </div>
      <div class="bottom-three">
        <div class="left">
          <div class="idle">
            <img src="@/assets/images/杂物的快递箱.png" alt="" />
            <div class="idle-title">
              <h1>我的闲置</h1>
              <span>闲置出售、捐赠</span>
            </div>
          </div>
          <div class="expressage">
            <img src="@/assets/images/配送快递服务.png" alt="" />
            <div class="expressage-title">
              <h1>我的快递</h1>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="helping">
            <img src="@/assets/images/信息反馈.png" alt="" />
            <div class="helping-title">
              <h1>我的互助</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  margin: 5px;
  height: 700px;
  width: 100%;
  background-color: #c0e0fded;
}
.top {
  height: 20%;
}
.bottom {
  background-color: #fff;
  height: 80%;
  width: 100%;
  border-radius: 30px 30px 0 0;
  padding-top: 10px;
}

.software {
  height: 150px;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #c0e0fded;
  border-radius: 10px;
}

.bottom-three {
  display: flex;
}
.bottom-three .left {
  display: flex;

  flex-direction: column;
  width: 40%;
  margin: 20px;
}
.bottom-three .left .idle {
  background-color: #c0e0fded;
  height: 140px;
  width: 140px;
  border-radius: 10px;
}
.bottom-three .left .expressage {
  background-color: #c0e0fded;
  height: 130px;
  width: 140px;
  margin-top: 10px;
  border-radius: 10px;
}
.bottom-three .right {
  flex-grow: 1;
}
.bottom-three .right .helping {
  background-color: #c0e0fded;
  width: 155px;
  height: 280px;
  margin-top: 20px;
  border-radius: 10px;
}
/* 软件帮 */
.software-title {
  padding: 30px;
  display: inline-block;
}
.software img {
  display: inline-block;
  height: 100%;
  width: 120px;
  margin-bottom: 60px;
  object-fit: cover;
}
.software-title h1 {
  color: #002452;
  font-size: 40px;
}
.software-title span {
  color: #002452;
  font-size: 15px;
}
/* 我的闲置 */
.idle-title {
  margin-left: 20px;
  /* margin-top: 60px; */
}
.idle img {
  height: 60%;
  width: 70%;
  margin-left: 20px;
  object-fit: cover;
}
.idle-title h1 {
  font-size: 24px;
  color: #002452;
}
.idle-title span {
  color: #002452;
  font-size: 15px;
}
/* 我的快递 */
.expressage-title {
  margin-left: 20px;
  /* margin-top: 60px; */
}
.expressage img {
  margin-top: 10px;
  margin-left: 15px;
  height: 60%;
  width: 80%;
  object-fit: cover;
}
.expressage-title h1 {
  font-size: 24px;
  color: #002452;
}
/* 我的互助 */
.helping img {
  height: 70%;
  width: 100%;
  object-fit: cover;
}
.helping-title {
  /* padding-top: 220px; */
  padding-left: 30px;
}
.helping-title h1 {
  font-size: 24px;
  color: #002452;
}
</style>
