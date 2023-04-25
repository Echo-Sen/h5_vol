<template>
  <div class="container">
    <!-- 这里的title改成活动名 -->
    <Back :title="''" />
    <Table :items="items" />
  </div>
</template>

<script>
import Table from '@/components/xlsx/xlsx.vue'

export default {
  name: 'App',
  components: {
    Table,
  },
  data() {
    return {
      items: [
        {
          name: '邓森',
          sex: '男',
          studentNum: 2021413598,
        },
        {
          name: '邓森',
          sex: '男',
          studentNum: 2021413598,
        },
        {
          name: '邓森',
          sex: '男',
          studentNum: 2021413598,
        },
        {
          name: '邓森',
          sex: '男',
          studentNum: 2021413598,
        },
        {
          name: '邓森',
          sex: '男',
          studentNum: 2021413598,
        },
        {
          name: '邓森',
          sex: '男',
          studentNum: 2021413598,
        },
      ],
    }
  },
}
</script>

<style scoped>
.container {
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
