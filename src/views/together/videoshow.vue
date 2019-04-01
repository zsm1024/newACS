<template>
<section class="app-container" style="margin-top:5px;position:relative;">
  <el-row>
        <el-col :span='18' >           
            <el-breadcrumb separator='/' class='app-breadcrumb'>
                <el-breadcrumb-item class='firstbread'>协同办公</el-breadcrumb-item>
                <el-breadcrumb-item  class='firstbread'>案例展示</el-breadcrumb-item>
                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
            </el-breadcrumb>
            
        </el-col>
    </el-row>
    <div>
       <div style="min-height:480px;background:#fff" v-loading='listLoading'>     
        <el-row style='display:flex;height:80px;border-bottom:1px solid #e3e3e3'>       
          <div style="margin-left:24px;flex:3">
               <p style='text-align:left;margin-top:24px;color:#333' class="PTile" >{{title}}</p>
            <el-col style="margin:8px 0 16px 0px;color:#666" class="TipMsg"><span class="TipMsg"  :title="cdate" >{{cdate}}</span></el-col>
          <!-- @click="view" -->
          </div>
          <div>
            <el-col class="icondownload" style="margin-top:24px;margin-right:24px"><i class="el-icon-download" style="cursor:pointer;" @click="clickdownload(resourse)" title="下载">本地下载</i></el-col>
          </div>
        </el-row>
        <p style='color:#333;margin-top:10px;font-size:14px;margin:16px 24px 0 24px' v-html="content">{{content}}</p>
    </div>
    </div>
    </section>
</template>
<script>
import { noticecontent,casecontent } from "@/api/together";
export default {
  data() {
    return {
      listLoading:false,
      downloadpaths: window.g.ApiUrl,
      title: '',
      content: '',
      resourse:"",
      suusername:"",
      id: this.$route.query.id,
      cdate:"",
    }
  },
  methods: {
    getshow(){
      this.listLoading=true
      let para=this.id
      casecontent(para).then(res =>{
        let data =res.data.data.data[0]
        this.title=data.title;
        this.cdate=data.cdate;
        // this.user=data.title;
        this.content=data.content;
        this.content=this.HTMLDecode(this.content)
        this.resourse=data.resourse;
        this.pdf=data.pdf;
        this.suusername=data.suusername
        this.listLoading=false
        })
    },
    HTMLDecode(e){
        var t=document.createElement("div");
        t.innerHTML=e;var a=t.innerText||t.textContent;
        return t=null,a
    },
       clickdownload(item){
          let k = this.downloadpaths + "s120017/downloaddoc?id="+this.resourse
          window.open(k)
        },
        view(){
           let l = this.downloadpaths + "s120017/downloaddoc?id="+this.pdf
          window.open(l)
        }
  },
  mounted() {
    this.getshow()
  }
}
</script>
<style>
.icondownload{
width:106px;
height:32px;
background:rgba(247,247,247,1);
border-radius:4px;
border:1px solid #D9D9D9}
.icondownload i{width:106px;
height:32px;
font-size:14px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(24,144,255,1);
line-height:32px;
text-align: center}
.icondownload:hover{background:#5881D8 }
.icondownload:hover i{color: #fff}
.conDe a{color:rgba(24,144,255,1);}
.app-breadcrumb.el-breadcrumb{
        line-height: 52px !important;
        height: 37px !important;
    margin-top:0 !important;
        padding-bottom:8px 
    }
</style>

