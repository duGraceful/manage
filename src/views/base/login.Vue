<template class="flex-center">
  <div class="flex-center flex-col">
    <div>登录</div>
    <el-form label-position="right" label-width="80px">
      <el-form-item label="账号">
        <el-input class="login-text" v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input class="login-text" v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="goIndex">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formLabelAlign: {
        name: null,
        region: null,
        type: null
      }
    }
  },
  methods: {
    goIndex() {
      this.$router.push('/index')
    }
  }
}
</script>
<style scoped>
.login-text {
  width: 300px;
}
</style>


