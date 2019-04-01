<template>
<el-col :span="20" :offset="2">
  <el-menu class="navbar" mode="horizontal" style="background-color:#f7f7f7">
    <breadcrumb></breadcrumb>
  </el-menu>
</el-col>
</template>

<script>

import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    Breadcrumb
  },

  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu--horizontal{
    border-bottom:none!important;
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
}
</style>

