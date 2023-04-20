<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="datetime"
      title="选择完整时间"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>

<script>
import { DatetimePicker } from 'vant'
export default {
  components: {
    [DatetimePicker.name]: DatetimePicker,
  },
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
    }
  },
}
</script>

<style></style>
