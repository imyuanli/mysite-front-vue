<template>
  <view>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>这是一段信息</span>
    </el-dialog>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    }
  }
};
</script>

<style scoped>

</style>