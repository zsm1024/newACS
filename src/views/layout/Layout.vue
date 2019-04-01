<template>
  
  <div style="height:100%">
    <div  style="height:100%">
        <headerbar></headerbar>
      
        <!-- <navbar></navbar> -->
        <app-main ></app-main>
        
        <el-footer v-if="this.$route.matched[0].name =='dashboard2'" style="background-color:#1C2329;clear:both;height:136px;margin-left: calc((100% - 100vw)/2);padding-left: calc((100vw - 100%));min-width: calc(1200px + (100vw - 100%));">
          <el-row style="width:1200px;margin:0 auto; color:#fff;">
            <el-col :span="14" class="footercenter" style="padding-top:50px">
                ©2017-2025 天津长城滨银汽车金融有限公司 版权所有<br />
                <span>客服热线 400-6527-606</span>
            </el-col>
            <el-col :span="10" style="padding-top:20px">
              <div style="float:right">
                <div class="div1" style="float:left;margin-right:20px;text-align:center" v-if="hosturl">
                  <img :src="erweibak" alt="" style="width:80px;height:80px"><br />
                  车贷e通APP
                 
                </div>
                <div class="div1" style="float:left;margin-right:20px;text-align:center" v-else>
                  <img :src="app" alt="" style="width:80px;height:80px"><br />
                  车贷e通APP
                </div>
                <div class="div1" style="float:left;margin-right:10px;text-align:center">
                  <img :src="erwei" alt="" style="width:80px;height:80px"><br />
                  微信公众号
                </div>
                
              </div>
              
            </el-col>
          </el-row>
        </el-footer>
      
    </div>
  </div>
</template>

<script>
import {
    detectZoom
  } from "@/utils/index";
import { getVersionInfo } from '@/api/basic'
import erweibak from '@/assets/images/pic_ceshi.png'
import erwei from '@/assets/images/pic_ewm.png'
// import app from '@/assets/images/pic_app.png'
import { Headerbar, Navbar, AppMain } from './components'
export default {
  name: 'layout',
  components: {
    Headerbar,
    Navbar,
    AppMain
  },
  data() {
      return {
        hosturl: false,
        erweibak,
        erwei: '../static/images/pic_ewm.png',
        app: '../static/images/pic_app.png'
      }
  },
  methods:{
    initfun() {
      // if(detectZoom()>100 || detectZoom()<100){
      //   this.$message({
      //     message: "当前网页已缩放，建议按ctrl+0 使页面恢复100大小比例！！",
      //     type: "warning"
      //   });
      // }
      // console.log(window.location.host)
      if( window.location.host =='acstest.gwmfc.com' ) {
        this.hosturl = true
      }else {
        this.hosturl = false
      }
    }
  },
  mounted() {
    this.initfun();
  },
  created() {
    // window.$CodeSource = []
    this.$nextTick(() => {
    let para = {}
    para.version = localStorage.getItem('version')?localStorage.getItem('version'): '1'
    
    getVersionInfo(para).then(res => {
      
      var CodeSource = {};
      
      if(res.data.data) {
        if(res.data.data.modellist) {
          window.$CodeSource = []
          res.data.data.modellist.forEach(function(item, index, array) {
            item.NAME = item.name
            item.CODE = item.code
            CodeSource[item.typeid] = CodeSource[item.typeid] || [];
            CodeSource[item.typeid].push(item);
          });
          localStorage.setItem('CodeSource', JSON.stringify(CodeSource))
          $CodeSource = CodeSource
        }
        localStorage.setItem('version', res.data.data.version)
      }
     
    })
    
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .div1 img{
      cursor: pointer;
      transition: all 0.6s;
    }
    .div1 img:hover{
      transform: scale(1.6);
    }
</style>
