<template>

  <div class='app-container' style="margin-top:5px;position:relative;">
      <el-row>
        <el-col :span="18" >
            
            <el-breadcrumb separator="/" class="app-breadcrumb">
                <el-breadcrumb-item class="firstbread">基础设置</el-breadcrumb-item>
                <el-breadcrumb-item>系统工具下载</el-breadcrumb-item>
            </el-breadcrumb>
            
        </el-col>
       
      </el-row>
      <el-row class="midcontent">
        <el-col :span="24"  class="contenttitle">
              <span class="spanzi">完整版详细教程</span>
              <span class="fanhuizi"><router-link :to="{path:'/dealer/basicset/tooldown'}">返回系统工具下载</router-link></span>
        </el-col>
       <el-col :span="24"  class="content">
         <div class="conimg" ><router-link :to="{path:'/dealer/basicset/tooldown1'}"><img style="width:100px;height:40px" @mouseover="back = backalldj" @mouseout="back = backall" :src="back" alt=""></router-link></div>
         
       </el-col>
       <el-col>
         <div>
           <img :src="conimg" style="width:1200px" alt="">
         </div>
       </el-col>
      </el-row>
  </div>
</template>

<script>
import download1 from '@/assets/images/download1.png'
import download2 from '@/assets/images/download2.png'
import conimg from '@/assets/images/conimg.png'
import backall from '@/assets/images/backfen.png'
import backalldj from '@/assets/images/backfendj.png'
import { postTool } from '@/api/basic'
export default {
  data() {
    return {
      slidelist: [
        '../static/images/slide1.png',
        '../static/images/slide2.png',
        '../static/images/slide3.png',
        '../static/images/slide4.png',
        '../static/images/slide5.png',
        '../static/images/slide6.png',
        '../static/images/slide7.png',
        '../static/images/slide8.png',
        '../static/images/slide9.png',
        '../static/images/slide10.png'
      ],
      back:backall,
      conimg,
      download1,
      download2,
      backall,
      backalldj,
      xpurl: '',
      downlist: []
    }
  },
  methods: {
    getDown() {
      postTool().then(res => {
          if (res.data.success) {
            var url = res.data.data.installUrl
            var site = res.data.data.installUrl.lastIndexOf("\/")
            this.xpurl = url.substring(0, site) + '/imageMid_XP.zip'
            this.downlist = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: '服务器连接失败，请联系管理员'
            })
          }
      })
    }
  },
  mounted() {
    this.getDown()
  }
}
</script>

<style scoped>

.conimg{
  margin-top: 10px;
  margin-bottom:10px;
}
.fanhuizi{
  margin-right: 24px;
  float: right;
  width:112px;
  height:20px;
  font-size:14px;
  font-family:MicrosoftYaHei;
  color:rgba(88,129,216,1);
  line-height:20px;
}
.zixia{
  margin-left: 24px;
  margin-top: 10px;
}
.downxiazi {

  height:20px;
  font-size:14px;
  font-family:MicrosoftYaHei;
  color:rgba(51,51,51,1);
  line-height:20px;
  margin-top: 3px;
}
.downdiv{
  margin-top: 19px;
  float: left;
  margin-left: 16px
}
.downtu{
  float: left;
  margin-top: 19px;
  margin-left: 24px;
}
.dzi1{
  width:42px;
  height:20px;
  font-size:14px;
  font-family:MicrosoftYaHei-Bold;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:20px;
}
.dzi2{
  width:108px;
  height:18px;
  font-size:12px;
  font-family:MicrosoftYaHei;
  color:rgba(255,255,255,1);
  line-height:18px;
}
.downtitle2{
  margin-left:24px;
  
  float: left;
  width:270px;
  height:78px;
  background:rgba(112,203,47,1);
  border-radius:4px;
}
.downtitle{
   float: left;
  
  width:270px;
  height:78px;
  background:rgba(240,152,78,1);
  border-radius:4px;
}
.contenth1{
  clear: both;
  margin-top: 16px;
  padding-left: 24px;
}
.headtitle{
  
  width:113px;
  height:24px;
  font-size:14px;
  font-family:MicrosoftYaHei-Bold;
  font-weight:bold;
  color:rgba(51,51,51,1);
  line-height:24px;
}
.midcontent{
  margin-top: 20px;
  background-color: #ffffff;
  margin-bottom: 20px;
  padding-bottom: 80px;
}
.contenttitle{
  margin-top: 30px;
}
.spanzi{
  font-weight:500;
  font-size: 18px;
  color: #333333;
  line-height: 27px;
  padding-left: 24px;
}
.content{
  padding-right:68px;
  padding-left:68px;
  border-top: 0.5px dotted #E3E3E3;
  margin-top: 20px;
}
.neir{
  margin-top: 80px;
  margin-bottom: 200px;
}
.marginleft50{
  margin-left: 50px;
}
.span1{
  color:#2f9dec;
  background-color:#dbeefc;
  cursor:pointer; 
}
.span2{
  color:#999999;
  background-color: #f5f5f5;
  cursor:pointer; 
}
.app-breadcrumb.el-breadcrumb{
  line-height: 52px;
  height: 37px;
}
</style>