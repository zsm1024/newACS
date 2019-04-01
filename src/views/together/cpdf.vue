<template>
  <div class="cpdf">
   <div class="center">
     <div class="contor">
      <el-button @click="prev">上一页</el-button>
      <el-button @click="next">下一页</el-button>    
      <span>Page: <span v-text="page_num"></span> / <span v-text="page_count"></span></span>
          
      <el-button @click="addscale" icon="plus"></el-button>
      <el-button @click="minus" icon="minus"></el-button>
      <el-button id="prev" @click="closepdf">关闭</el-button>
     </div>
     <canvas class="canvasstyle" id="the-canvas"></canvas>
   </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    
})
</script>
