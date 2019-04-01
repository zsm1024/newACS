<template>
 <section>
  <el-row class="dashboard">
    <el-col :span="6" class="box-card">
      <el-card class="box-card colorone">
        <el-col :span="12">
          <div>
              <span class="onesize">{{orderNum}}</span>
          </div>
          <div>
              <span class="onename">订单待处理</span>
          </div>
        </el-col>
        <el-col :span="12">
          <el-col :span="5" :offset="16" class="top20">
            <img :src="btnhomedd" alt="">
          </el-col>          
        </el-col>     
      </el-card>
    </el-col>
    <el-col :span="6" class="box-card leftWidth" >
      <el-card class="box-card colortwo">
        <el-col :span="12">
            <div>
                <span class="onesize">{{loanNum}}</span>
            </div>
            <div>
                <span class="onename">放款退回</span>
            </div>

          </el-col>
          <el-col :span="12">
            <el-col :span="5" :offset="16" class="top20">
            <img :src="btnhomefk" alt="">
          </el-col>
          </el-col>
      </el-card>
    </el-col>
    <el-col :span="6" class="box-card leftWidth">
      <el-card class="box-card colorthree">
        <el-col :span="12">
          <div>
              <span class="onesize">{{docmentNum}}</span>
          </div>
          <div>
              <span class="onename">归档到期提醒</span>
          </div>
        </el-col>
        <el-col :span="12">
            <el-col :span="5" :offset="16" class="top20">
            <img :src="btnhomecq" alt="">
            </el-col> 
        </el-col>
      </el-card>
    </el-col>
    <el-col :span="6" class="box-card leftWidth">
      <el-card class="box-card colorfour">
        <el-col :span="12">
          <div>
              <span class="onesize">{{mortgageNum}}</span>
          </div>
          <div>
              <span class="onename">解抵押待确认</span>
          </div>
        </el-col>
        <el-col :span="12">
           <el-col :span="5" :offset="16" class="top20">
            <img  :src="btnhomegt" alt="">
            </el-col> 
        </el-col>
      </el-card>
        
    </el-col>       
  </el-row> 
    <el-row style="display:flex;margin-top:16px" >
      <el-col  style="position:relative;background:#fff;width:592px" class="shadows"> 
          <el-tabs v-model="activeName" @tab-click="handleClick" style="height:420px" >       
              <el-tab-pane label='通知公告' name='second'>                                                
                  <ul class="liststy">
                    <router-link v-for="(item,index) in noticeList" :key="index" :class="{'class-a':isA,'class-b':isB}" style="width:100%" tag="li" :to="{path:'/dealer/together/togList',query:{id:item.cpnoticeid}}" @click="viewNotic(item.cpnoticeid)"><p>{{item.cpnoticetitle}}<span :class="{'isup':isB}">置顶</span></p><span style="width:80px;margin-right:16px">{{item.cpnoticecreatetime}}</span></router-link>
                  </ul>
              <p style="text-align:right">
                      <el-button type="text" style=" padding: 3px 0;margin-right:16px" ><router-link :to="{path:'/dealer/together/notice'}">更多></router-link> </el-button>
              </p>     
              </el-tab-pane> 
              <el-tab-pane label='资料文档' name='third'>           
                <ul class="liststy" v-for="(item,index) in docList" :key="index" >
                    <router-link class="class-b" style="width:100%" tag="li" :to="{path:'/dealer/together/docList',query:{id:item.cpdownloadid}}"><p>{{item.cpdownloadtitle}}</p><span style="width:80px;margin-right:16px">{{item.cpdownloadsatarttime}}</span></router-link>
                </ul> 
                <p style="text-align:right">
                      <el-button style=" padding: 3px 0;margin-right:16px" type="text"><router-link :to="{path:'/dealer/together/dataList'}"> 更多></router-link> </el-button>
                </p>      
              </el-tab-pane>        
          </el-tabs>
        </el-col>
      <el-col  style="background:#fff;width:592px;height:420px;margin-left:16px" class="shadows">
          <chart></chart>
      </el-col>
    </el-row>
  <div style="background:#e3e3e3">
    <el-row style="background:#fff;margin-top:15px;border-radius:4px 4px 0 0">
    <el-col>
          <div style="display: flex;justify-content: space-between;">
            <p class="demonstration" style="margin:10px 24px;color:#303133;font-size:14px">案例展示</p>
            <el-button style=" padding: 3px 0;margin-right:20px;float:right" type="text"><router-link :to="{path:'/dealer/together/video'}">更多></router-link> </el-button>
          </div>
    </el-col>
  </el-row>
  <p class="lineStr"></p>
  <el-row style="background:#fff;height:300px;display:flex;border-radius:0 0 4px 4px">
      <el-col  class="pictureLis"  v-show="picture"  v-for="(item,index) in picture" :key="index" >
        <el-card :body-style="{ padding: '0px!important' }" >
          <router-link :to="{path:'/dealer/together/videoshow',query:{id:item.id}}"> 
          <img class="imgs" style="width:100%;display:inline-block" :src="downpaths +'s120017/downloaddoc?id='+ item.picture"/>
          <div style="height: 22px;font-size: 16px;margin-left: 16px;margin-top: 12px; margin-bottom: 8px;width:240px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
              <span :title="item.title">{{item.title}}</span>       
          </div>
          <div style="height: 17px;margin-bottom: 33px; margin-left: 16px;">
            <span>{{item.cdate}}</span>
          </div>
        </router-link>      
        </el-card>
    </el-col>  
  </el-row>
  </div>
    
<el-dialog
  center
  title="标签自定义"
  :visible.sync="dialogVisible"
  width="60%"
  >
  <el-form >
     <el-form-item label="当前标签(点击不放拖动调整顺序): " :label-width="formLabelWidth" >
      <draggable >
        <el-tag
        type="info"
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
        </el-tag>
      </draggable>
    </el-form-item>
    <el-form-item label="为你推荐: " :label-width="formLabelWidth" >
        <el-tag     
        type="info"
        :key="tag"
        v-for="tag in addTags"
        :disable-transitions="false"
        
        >
        <span  @click="doAddTag(tag)">
        {{tag}}
        </span>
        </el-tag>  
    </el-form-item>
  </el-form>
</el-dialog>
    <BackTop :height="100" :bottom="76" :right="16" id="changeshowup">
        <div class="ivu-back-top-inner" style="width:40px;height:36px;"><i class="ivu-icon ivu-icon-ios-arrow-up" style="padding: 5px 9px;"></i></div>
    </BackTop>
    <el-popover placement="left-end" class="ask-question" id="changeshowask" trigger="hover"  popper-class="popclass">
      <div  class="showqq">
        <div class="popup"><img :src="qqmx" style="width:22px;height:22px" alt="" srcset=""><span>金融IT支持</span></div>
        <div class="popdown">
          <p><span style="color:#333333">QQ 客服：<span style="color:#CBAC69;font-weight:bold">1991847367</span></span></p>
          <p><span style="color:#333333">在线时间：8:30-17:30</span></p>
          <p><img :src="qqewm" style="padding-left:40px;width:150px;height:100px" alt=""></p>
          <p><span style="margin-left:30px;color:#666666">扫一扫二维码，加我QQ</span></p>
        </div>
      </div>
      <div slot="reference" size="mini"><img :src="qqxx" style="margin-top:8px;width:22px;height:22px;text-align:center" alt="" srcset=""></div>
    </el-popover>
  </section>
</template>

<script>
//获取窗口可视范围的高度
function getClientHeight(){  
    var clientHeight=0;  
    if(document.body.clientHeight&&document.documentElement.clientHeight){  
        var clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }else{  
        var clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }  
    return clientHeight;  
}
//文档的总高度
function getScrollHeight(){
　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}
//浏览器视口的高度
function getScrollTop(){  
    var scrollTop=0;  
    if(document.documentElement&&document.documentElement.scrollTop){  
        scrollTop=document.documentElement.scrollTop;  
    }else if(document.body){  
        scrollTop=document.body.scrollTop;  
    }  
    return scrollTop;  
}
import chart from "../together/chart";
import {
  notice,
  noticeread,
  download,
  getPendingTask,
  Case
} from "@/api/together";
import { mapGetters } from "vuex";
import qqmx from "@/assets/images/qqmx.png";
import qqxx from "@/assets/images/qqxx.png";
import btnhomedd from "@/assets/images/btn_home_fkdtj.svg";
import btnhomefk from "@/assets/images/btn_home_fkth.svg";
import btnhomegt from "@/assets/images/btn_home_gddqtx.svg";
import btnhomecq from "@/assets/images/btn_home_jdy.svg";
import draggable from "vuedraggable";

export default {
  name: "dashboard",
  components: {
    draggable,
    chart
  },
  data() {
    return {
      qqewm: '../static/images/qq_ewm.png',
      qqmx,
      qqxx,
      orderNum: "0",
      loanNum: "0",
      docmentNum: "0",
      delayNum: "0",
      insuranceNum: "0",
      mortgageNum:"0",
      btnhomedd,
      btnhomefk,
      btnhomegt,
      btnhomecq,
      value: "",
      pdfload: false,
      picture: [],
      isA: false,
      isB: true,
      noticeList: [],
      docList: [],
      fileList: [],
      activeName: "second",
      value: "",
      iconList: [],
      dialogVisible: false,
      pagesize: 9,
      downpaths: window.g.ApiUrl,
      page: 1,
      dynamicTags: ["订单管理", "放款管理", "归档退回"],
      addTags: ["超期管理", "文档管理", "借阅管理", "保险业务"],
      formLabelWidth: "230px",
      col: [
        // { name: '移动进件', src: '', num: '50' },
        { name: "订单管理", src: "", num: "" },
        { name: "放款管理", src: "", num: "" },
        { name: "文档管理", src: "", num: "" },
        { name: "延期管理", src: "", num: "" },
        { name: "保险业务", src: "", num: "" }
      ],
      isreadList: [],
      nums: "",
      swiperOption: {
        slidersPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 3,
        height: 200,
        width: 400,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
    // return {
    //   activeName: "second",
    // btnhome,
    // btnhomedd,
    // btnhomefk,
    // btnhomegt,
    // btnhomecq,
    // iconewm,
    // value: '',
    // dialogVisible: false,
    // dynamicTags: ['订单管理', '放款管理', '归档退回'],
    // addTags: ['超期管理', '文档管理', '借阅管理', '保险业务'],
    // formLabelWidth: '230px'
    // }
  },
  computed: {
    ...mapGetters(["name", "roles"])
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    viewNotic(item) {
      let para = item;
      noticeread(para);
    },
    getNoticList() {
      let para = {
        PageSize: this.pagesize,
        PageIndex: this.page
      };
      notice(para).then(res => {
        var moment = require('moment')
        let data = res.data.data.data;
        this.noticeList = data;
        this.noticeList.forEach(element => {
          element.cpnoticecreatetime = moment(Date.parse(element.cpnoticecreatetime.split(" ").shift())).format('YYYY-MM-DD');
          if (element.isread == "0" || element.isread == "未读") {
            this.isreadList.push(element.isread);
            this.isA = true;
          }
          if (element.cpnoticeistop == "1") {
            this.isB = true;
          }
          this.nums = this.isreadList.length;
        });
      });
    },
    getlist() {
      this.listLoading = true;
      let para = {
        PageSize: this.pagesize,
        PageIndex: this.page
      };
      download(para).then(res => {
        var moment = require('moment')
        let data = res.data.data.data;
        this.docList = data;
        this.docList.forEach(el => {
          el.cpdownloadsatarttime = moment(Date.parse(el.cpdownloadsatarttime.split(" ").shift())).format('YYYY-MM-DD');
        });
        this.listLoading = false;
      });
    },
    getPending() {
      this.pdfload = true;
      let para = {
        a: "2"
      };
      getPendingTask(para).then(res => {
        let data = res.data.data;
        this.orderNum = data.orderNum;
        this.loanNum = data.loanNum;
        this.docmentNum = data.docmentNum;
        this.delayNum = data.delayNum;
        this.insuranceNum = data.insuranceNum;
        this.mortgageNum=data.mortgageNum;
      });
    },
    // icons() {

    //   this.getPending();
    //   for (var i = 0; i < this.col.length; i++) {
    //     var j = i + 1;
    //     this.col[i].src = require("../../assets/images/home_icon_" +
    //       j +
    //       ".png");
    //   }
    //    this.pdfload=false;
    // },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.addTags.push(tag);
    },
    doAddTag(tag) {
      this.addTags.splice(this.addTags.indexOf(tag), 1);
      this.dynamicTags.push(tag);
    },
    showdia() {
      this.dialogVisible = true;
    },
    getinfo() {
      Case().then(res => {
        let data = res.data.data.data;
        this.picture = data;
        this.picture = this.picture.slice(data.length-4,data.length).reverse();
      });
    },
    
    scrollEvent: function(height = 0) {
      var that = this
     
      if (that.$route.matched[1].name === "dashboard") {
         // 窗口可视范围的高度
    var height=getClientHeight(),
        // 窗口滚动条高度
        theight=getScrollTop(),
        // 窗口可视范围的高度
        rheight=getScrollHeight(),
        // 滚动条距离底部的高度
        bheight=rheight-theight-height;
        var box = document.getElementById("changeshowask")
        var box1 = document.getElementById("changeshowup")
        if(bheight <= '120'){
          box1.style.bottom = '200px'
          box.style.bottom = '150px'
        }else{
          box1.style.bottom = '76px'
          box.style.bottom = '32px'
        }
      }
    },
  },
  beforeRouteLeave: function(to, from, next) {
    window.removeEventListener("scroll", this.scrollEvent)
    next();
  },
  created() {
    this.chartData = {
      columns: ["date", "balance", "age", "ss"],
      rows: [
        { date: "1月1日", balance: 123, age: 3, ss: 150 },
        { date: "1月2日", balance: 1223, age: 6, ss: 250 },
        { date: "1月3日", balance: 2123, age: 9, ss: 3503 },
        { date: "1月4日", balance: 4123, age: 12, ss: 4502 },
        { date: "1月5日", balance: 3123, age: 15, ss: 5502 },
        { date: "1月6日", balance: 7123, age: 20, ss: 6502 }
      ]
    };
    this.chartSettings = {
      // metrics:['balance'],
      area: true,
      label: {
        normal: {
          show: true
        }
      }
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollEvent);
    this.getPending();
    this.getNoticList();
    this.getlist();
    this.getinfo();
  }
  //   handleClose(tag) {
  //     this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
  //     this.addTags.push(tag)
  //   },
  //   doAddTag(tag) {
  //     this.addTags.splice(this.addTags.indexOf(tag), 1)
  //     this.dynamicTags.push(tag)
  //   },
  //   showdia() {
  //     this.dialogVisible = true
  //   }
  // },
  // created() {
  //   this.chartData = {
  //     columns: ['date', 'balance', 'age'],
  //     rows: [
  //       { 'date': '1月1日', 'balance': 123, 'age': 3 },
  //       { 'date': '1月2日', 'balance': 1223, 'age': 6 },
  //       { 'date': '1月3日', 'balance': 2123, 'age': 9 },
  //       { 'date': '1月4日', 'balance': 4123, 'age': 12 },
  //       { 'date': '1月5日', 'balance': 3123, 'age': 15 },
  //       { 'date': '1月6日', 'balance': 7123, 'age': 20 }
  //     ]
  //   }
  // this.chartSettings = {
  //   label: {
  //     normal: {
  //       show: true
  //     }
  //   }
  // }
  // }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.popdown{
  margin-top:8px;
  margin-left: 15px;
}
.popdown p{
  font-size: 14px;
  margin-top: 8px;
}
.popup{
  width: 190px;
  margin-left: 15px;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid #E3E3E3;
}
.popup span{
  font-size: 14px;
  margin-left: 8px;
  font-size:14px;
  font-weight:bold;
  color:rgba(203,172,105,1);
  vertical-align: middle;
}
.popup img{
  vertical-align: middle;
}
.showqq{
  
  width:225px;
  height:254px;
  background:rgba(255,255,255,1);

}
.ask-question:hover{
  background-color: rgba(0,0,0,.7);
}
.top:hover{
  background-color: rgba(0,0,0,.7);
}
.ask-question:active{
  background-color: rgba(0,0,0,.7);
}
.top:active{
  background-color: rgba(0,0,0,.7);
}
.ask-question{
  width: 40px;
  height: 36px;
  cursor: pointer;
  text-align: center;
  background-color: rgba(0,0,0,.6);
  color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  position: fixed;
  bottom: 32px;
  right: 16px;
  transition: opacity .2s ease-in-out;
}
.top{
    background-color: rgba(0,0,0,.6);
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
    transition: all .2s ease-in-out;
}
.el-tag {
  margin-right: 10px;
  cursor: pointer;
}
.dashboard {
  margin-top: 16px;
}
.box-card {
  // margin: 20px 5px 5px 5px;
  height: 100px;
  width: 288px;
}
.down-card {
  margin: 25px 5px 5px 5px;
}
.colorone {
  background-color: #70c1b3;
  color: #ffffff;
}
.onesize {
  font-size: 34px;
  font-weight: bold;
}
.onename {
  font-size: 14px;
}
.colortwo {
  background-color: #b2dbbf;
  color: #ffffff;
}
.colorthree {
  background-color: #F3FFBD;
  color: #768049!important
}
.colorfour {
  background-color: #eb547c;
  color: #ffffff;
}
.imgset {
  position: absolute;
  top: 21px;
  right: -28px;
  cursor: pointer;
}
.roundbutton {
  width: 180px;
  text-align: left;
  background-color: #f9f9f9;
}
.roundbutton:hover {
  background-color: #00a5ff;
  color: #ffffff;
}
.buttonul {
  margin-bottom: 39px;
}
.buttonul li {
  padding-bottom: 25px;
  text-align: center;
}
.buttonspan {
  margin-left: 25px !important;
}

.clearfix span {
  font-size: 16px;
  color: #333333;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebebeb;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-icon-more {
  color: #b6b6b6;
}
.hoverlink:hover {
  color: #78e1d4;
}
.cardtime {
  height: 340px;
  overflow-y: auto;
}
/*滚动条样式*/
.cardtime::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.cardtime::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.cardtime::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.footercenter {
  font-size: 14px;
  color: #9c9eb5;
  text-align: center;
  margin: 24px 0;
}
.top20 {
  padding-top: 20px;
}
.onename {
  font-size: 14px;
}
.colortwo {
  background-color: #b2dbbf;
  color: #ffffff;
}
.colorthree {
  background-color: #f3ffbd;
  color: #000000;
}
.colorfour {
  background-color: #eb547c;
  color: #ffffff;
}
.imgset {
  position: absolute;
  top: 21px;
  right: -28px;
  cursor: pointer;
}
.roundbutton {
  width: 180px;
  text-align: left;
  background-color: #f9f9f9;
}
.roundbutton:hover {
  background-color: #00a5ff;
  color: #ffffff;
}
.buttonul {
  margin-bottom: 39px;
}
.buttonul li {
  padding-bottom: 25px;
  text-align: center;
}
.buttonspan {
  margin-left: 25px !important;
}

.clearfix span {
  font-size: 16px;
  color: #333333;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebebeb;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-icon-more {
  color: #b6b6b6;
}
.hoverlink:hover {
  color: #78e1d4;
}
.cardtime {
  height: 340px;
  width: 100%;
  max-width: 400px;
}

.top20 {
  padding-top: 20px;
}
.el-icon-mobile-phone {
  font-size: 30px;
  color: #94ffe7;
  font-weight: bolder;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 100px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
// .liststy{background: #f0f0f0}
.liststy .class-b {
  height: 18px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  margin-bottom: 16px;
}

.liststy > li:hover {
  color: #108ee9;
}
.liststy > li p {
  width: 80%;
  text-indent: 16px;
  overflow: hidden;
  height: 18px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.isup {
  color: #ffb22f;
  border-radius: 4px;
  border: 1px solid #ffb22f;
  padding: 0px 4px;
  margin-left: 8px;
  font-size: 12px;
}
.liststy .class-a {
  color: #333;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-tabs__nav-wrap::after {
  background-color: none !important;
}
.el-carousel__item[data-v-50698a54]:nth-child(2n + 1) {
  box-shadow: 0px 3px 18px 2px rgba(0, 0, 0, 0.7);
  padding-top: 10;
  border-radius: 6px;
}
.el-carousel__container {
  position: relative;
  height: 300px;
  margin-top: 16px;
  border-radius: 6px;
}
.imgs {
  height: 168px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.pictureLis {
  width: 280px;
  height: 260px;
  margin-left: 16px;
  margin-top: 16px;
}
.leftWidth {
  margin-left: 16px;
}
.dashboard .el-card {
  border: none;
}
.shadows {
  box-shadow: 0px 12px 34px 0px rgba(214, 222, 230, 1);
  border-radius: 4px;
}
.el-picker-panel {
  left: 937px !important;
}
</style>