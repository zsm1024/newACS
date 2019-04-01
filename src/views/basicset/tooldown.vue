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
              <span class="spanzi">系统工具下载</span>
        </el-col>
        <el-col :span="24"  class="content">
          <div class="contenth1">
             <span class="headtitle">ACS影像组件下载</span>
          </div>
          
          <div class="contenth1" style="height:80px">
            <a :href="downlist.installUrl">
            <div class="downtitle">
              <img class="downtu" :src="download1" alt="" srcset="">
              <div class="downdiv">
                <span class="dzi1">完整版</span><br/>
              <span class="dzi2">适用于用户首次安装</span>
              </div>
            </div>
             </a>
             <a :href="downlist.nonInstallUrl">
            <div class="downtitle2">
              <img class="downtu" :src="download2" alt="" srcset="">
              <div class="downdiv">
                <span class="dzi1">精简版</span><br/>
                <span class="dzi2">适用于升级为新版系统后安装</span>
              </div>
            </div>
             </a>
          </div>
          <div class="contenth1">
             <span class="headtitle">版本信息</span>
          </div>
          <div class="zixia">
            <p class="downxiazi">最新版本：<span style="color:#FF3B30;font-weight:bold">{{downlist.version}}</span></p>
            <p class="downxiazi">更新日期：{{downlist.upDate}}</p>
            <p class="downxiazi">安装环境：Win10/Win8/Win7/Vista/WinXP</p>
          </div>
             
          <div class="contenth1">
             <span class="headtitle">安装教程</span>
          </div>
          <div class="zixia">
            <p class="downxiazi">完整版：下载并解压 ACS影像组件完整版.zip ,双击 setup.exe 开始安装。<router-link :to="{path:'/dealer/basicset/tooldown1'}"><span style="color:#1890FF;">完整版详细教程></span></router-link></p>
            <p class="downxiazi">精简版：下载并解压 ACS影像组件精简版.zip ,双击 GWMFC.FilesServer.exe 运行即可。</p>
            
          </div>
 
             
          <div class="contenth1">
             <span class="headtitle">常见问题</span>
          </div>
          <div class="zixia">
            <p class="downxiazi" style="color:#FF3B30;margin-bottom:9px">任务栏右下角没有影像件标识？</p>
            <p class="downxiazi">可能影像件尚未启动，请在【开始】菜单或【桌面】快捷方式中找到【长城滨银ACS影像组件】双击运行即可。</p>
            <p class="downxiazi" style="color:#FF3B30;margin-bottom:9px;margin-top:10px">图片上传失败？</p>
            <p class="downxiazi">可能被360安全卫士、Windows防火墙或QQ管家等安全软件拦截，需前往安全软件解除拦截。</p>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import download1 from '@/assets/images/todownload.png'
import download2 from '@/assets/images/todownload.png'
import { postTool } from '@/api/basic'
export default {
  data() {
    return {
      download1,
      download2,
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
.downtitle:active{
  background: #EB8B39;
}
.downtitle:hover{
  background: #FF9D48;
}
.downtitle2:hover{
  background: #86DB48;
}
.downtitle2:active{
  background: #5FBF1A;
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