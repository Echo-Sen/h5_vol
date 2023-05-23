<template>
  <div>
    <!-- 借伞信息页 -->
    <Back :title="'借伞信息'" />
    <!-- header -->
    <div class="title-container">
      <div class="left-title active" ref="left_div" @click="leftClick">
        <div class="active_line">已借伞</div>
      </div>
      <div class="right-title" ref="right_div" @click="rightClick">已逾期</div>
    </div>
    <!-- content -->
    <div class="content" v-if="inDue && currentId === 1">
      <table>
        <thead>
          <tr>
            <th>姓名</th>
            <th>性别</th>
            <!-- <th>学号</th> -->
            <th>借伞时间</th>
            <th>还伞</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in inDue" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.gender ? '女' : '男' }}</td>
            <!-- <td>{{ item.studentNum }}</td> -->
            <td>{{ item.borrow_time | transformTime(item.borrow_time) }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="content" v-else-if="overDue.length && currentId === 2">
      <table>
        <thead>
          <tr>
            <th>姓名</th>
            <th>性别</th>
            <!-- <th>学号</th> -->
            <th>借伞时间</th>
            <th>逾期天数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in overDue" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.gender ? '女' : '男' }}</td>
            <!-- <td>{{ item.studentNum }}</td> -->
            <td>{{ item.borrow_time | transformTime(item.borrow_time) }}</td>
            <td>{{ item.borrow_time | OverHours(item.borrow_time) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <van-empty
      v-else
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无数据"
    />
  </div>
</template>

<script>
import { Empty } from 'vant'
import { GetUmbrellaData } from '@/api/admin'
export default {
  data() {
    return {
      currentId: 1,
      inDue: [],
      // 逾期名单
      overDue: [],
      threshold: 48 * 60 * 60 * 1000, // 48小时的毫秒数
      now: new Date(), //当前时间
    }
  },
  components: {
    [Empty.name]: Empty,
  },
  mounted() {
    this.GetData()
  },
  methods: {
    leftClick() {
      const l_div = this.$refs.left_div
      const r_div = this.$refs.right_div
      if (!l_div.classList.contains('active')) {
        l_div.classList.add('active')
        r_div.classList.remove('active')
        this.currentId = 1
      }
      // 切换类名，通过 CSS 实现文本效果的切换
    },
    rightClick() {
      const l_div = this.$refs.left_div
      const r_div = this.$refs.right_div

      if (!r_div.classList.contains('active')) {
        r_div.classList.add('active')
        l_div.classList.remove('active')
        this.currentId = 2
      }
    },
    GetData() {
      GetUmbrellaData(20).then((res) => {
        this.list = res.data.data
        this.list.forEach((item) => {
          const result = this.isOverThreshold(item)
          if (result) {
            // 逾期用户
            this.overDue.push(item)
          } else {
            this.inDue.push(item)
          }
        })
      })
    },
    // 是否逾期
    isOverThreshold({ status, borrow_time }) {
      const diff = this.now.getTime() - new Date(borrow_time).getTime()
      return status === '未还' && diff > this.threshold
    },
  },
  filters: {
    transformTime(isoString) {
      // 数据中的更新时间转换
      const date = new Date(isoString)
      const transformTime = date.toLocaleString()
      return transformTime
    },
    // 计算逾期的小时数
    OverHours(borrow_time) {
      const diff = this.now.getTime() - new Date(borrow_time).getTime()
      return diff / 1000 / 60 / 60
    },
  },
}
</script>

<style scoped>
.container {
  margin-left: 10px;
  margin-right: 10px;
  min-height: 100px;
  background-color: skyblue;
}
.title-container {
  display: flex;
}
.left-title {
  width: 50%;
  color: #000;
  font-size: 24px;
  text-align: center;
}
.right-title {
  width: 50%;
  text-align: center;
}
.title-container .active {
  color: red;
  border-bottom: 3px solid red;
}
.right-title {
  color: #000;
  font-size: 24px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #000;
  padding: 5px;
  text-align: left;
}
.content {
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
