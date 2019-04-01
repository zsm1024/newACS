<template>
  <section class="app-main" style="width:1200px;margin:0 auto; height:auto; 
    min-height:86.3%; ">
    <el-col :span="24"  style="margin-bottom:20px">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
     
    </transition>
     </el-col>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
