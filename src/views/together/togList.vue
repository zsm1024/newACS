<template>
<section class="app-container" style="margin-top:5px;position:relative;">
  <el-row>
        <el-col :span='18' >           
            <el-breadcrumb separator='/' class='app-breadcrumb'>
                <el-breadcrumb-item class='firstbread'>协同办公</el-breadcrumb-item>
                <el-breadcrumb-item  class='firstbread'>通知公告</el-breadcrumb-item>
                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
            </el-breadcrumb>          
        </el-col>
    </el-row>
    <div v-loading='listLoading'  style="min-height:480px;background:#fff">     
        <el-row style='display:flex;height:80px;border-bottom:1px solid #e3e3e3'>
          <div style="margin-left:24px;flex:3;" >
            <p style='text-align:left;margin-top:24px;color:#333' class="PTile" >{{title}}</p>
            <el-col style="margin:8px 0 16px 0;color:#666" class="TipMsg"><span  class="TipMsg" :title="user">{{user}}</span><span  class="TipMsg" :title="time" style="margin-left:10px">{{time}}</span></el-col>
          </div>
          <div>
            <el-col class="icondownload" style="margin-top:24px;margin-right:24px" ><i class="el-icon-download"  @click="view" title="下载">本地下载</i></el-col>
          </div>        
        </el-row>
        <!-- <p class="CoLine"></p> -->
        <p style='color:#333;font-size:14px;margin:16px 24px 0 24px' class="conDe" v-html="content" >{{content}}</p>
    </div>
    </section>
</template>
<script>
import { noticecontent } from "@/api/together";
export default {
  data() {
    return {
     listLoading:false,
      downpaths: window.g.ApiUrl,
      title: '',
      time: '',
      content: '',
      user: '',
      ids: this.$route.query.id,
      UPLOADFILE: ''
    }
  },
  methods: {
    getcontent() {
      this.listLoading=true
      let params = this.ids
      noticecontent(params).then(res => {
        let data = res.data.data[0]
        this.title = data.TITLE
        this.time = data.CREATETIME
        this.content = data.CONTENT
        this.content=this.HTMLDecode(this.content)
        this.user = data.NAME
        this.UPLOADFILE = data.UPLOADFILE
        this.listLoading=false
      })
    },
     HTMLDecode(e){
        var t=document.createElement("div")
        t.innerHTML=e;var a=t.innerText||t.textContent
        return t=null,a
    },
    view() {
      let k = this.downpaths + "s120017/downloaddoc?id="+this.UPLOADFILE
      window.open(k)
    }
  },
  mounted() {
    this.getcontent()
  }
}
</script>
<style>
.icondownload{
cursor: pointer;
width:106px;
height:32px;
background:rgba(247,247,247,1);
border-radius:4px;
/* border:1px solid #D9D9D9 */
}
.icondownload:hover{
 background:linear-gradient(45deg,rgba(80,122,205,1) 0%,rgba(67,94,170,1) 100%);}
.icondownload i{width:106px;
height:32px;
font-size:14px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(24,144,255,1);
line-height:32px;
text-align: center}
.icondownload i:hover{color:#fff }
.conDe a{color:rgba(24,144,255,1);}
.PTile{
height:18px;
font-size:18px;
font-family:PingFangSC-Medium;
font-weight:600;
color:rgba(51,51,51,1);
line-height:18px;
}
.TipMsg{display: inline-block;height: 12px;line-height: 12px;font-size: 12px}
.app-breadcrumb.el-breadcrumb{
        line-height: 52px !important;
        height: 37px !important;
    margin-top:0 !important;
        padding-bottom:8px 
    }
</style>


