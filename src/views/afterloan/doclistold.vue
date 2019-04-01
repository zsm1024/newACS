<template>

  <div class='app-container'>
      <el-row class="toplinkbottom10">
        <el-col :span="11" >
            
            <el-breadcrumb separator="/" class="app-breadcrumb">
                <el-breadcrumb-item>贷后管理</el-breadcrumb-item>
                <el-breadcrumb-item>文档管理</el-breadcrumb-item>
            </el-breadcrumb>
            
        </el-col>
  
 
      </el-row>
      <div style="overflow:hidden;width:100%;height:800px;margin-top:10px">
        <div style="margin-left: -50px;margin-top: -40px;">
            <iframe ref="iframe" src="/?code=0416&src=newpc" scrolling="no" width="100%" height="800px"  ></iframe>
        </div>
      </div>
  

  </div>
</template>

<script>
import onedai from '@/assets/images/btn_grdk.png'
import moredai from '@/assets/images/btn_more.png'
export default {
  data() {
    return {
      onedai,
      moredai
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

