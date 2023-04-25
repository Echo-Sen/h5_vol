<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>学号</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.sex }}</td>
          <td>{{ item.studentNum }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
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
</style>
