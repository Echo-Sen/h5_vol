<template>
  <van-notice-bar
    scrollable
    left-icon="volume-o"
    :text="text || '正在加紧开发中'"
  />
</template>

<script>
import { NoticeBar } from 'vant'
export default {
  props: ['text'],
  components: {
    [NoticeBar.name]: NoticeBar,
  },
}
</script>

<style></style>
