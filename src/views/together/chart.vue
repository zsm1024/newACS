/* eslint-disable */
<template>
  <section class="countList">
    <el-col id="chart" class="chartsImg">  
      <el-tabs  v-model="activeName"    @tab-click="handleClick">
        <el-tab-pane label="放款统计" name="1" v-loading="chartload">
            <div style="text-align:right;display:flex;justify-content: flex-end;">
              <el-col :span="3.5" style="margin-right:16px">
                <el-date-picker @change="choosemonth" v-model="value4" type="month" :clearable="false" placeholder="选择月份"></el-date-picker>
              </el-col>
          </div>       
           <div id="chart1" :style="{height:'320px'}"></div>
        </el-tab-pane>
        <el-tab-pane label="放款退件" name="2">
          <div style="text-align:right;display:flex;justify-content: flex-end;">
              <el-col :span="3.5"  style="margin-right:16px">
                <el-date-picker @change="choosemonth1" v-model="backvalue" type="month" :clearable="false" placeholder="选择月份"></el-date-picker>
              </el-col>
          </div>
          <div id="chart2" :style="{height:'320px'}"></div>
        </el-tab-pane>
        <el-tab-pane label="审批退件" name="3">
            <div style="text-align:right;display:flex;justify-content: flex-end;">
              <el-col :span="3.5" style="margin-right:16px">
                <el-date-picker @change="choosemonth2" v-model="ordervalue" type="month" :clearable="false" placeholder="选择月份"></el-date-picker>
              </el-col>
          </div>
          <div id="chart3" :style="{height:'320px'}"></div>
          </el-tab-pane>
      </el-tabs>
    </el-col> 
      <!--工具条-->
  </section>
</template>
<script>
import {chart} from '../count/chart'
import { getToken } from '@/utils/auth'
import Moment from "moment/moment";
// import adddata from '@/api/data'
import { getCharData,dealerlist,loanlist,loanbacklist,applicationbacklist,loanlistexport } from "@/api/together";
export default {
  data() {
    return {
      colors:['#5881D8'],
      name:'放款统计',
      lists:[],
      backlists:[],
      applists:[],
      value:"",
      options:[],
      value1:"",
      options1:[],
      value2:"",
      options2:[],
      col:[
        { title: '放款日期', field: 'activedate' },
        { title: '客户姓名', field: 'borrowername' },
        { title: '车辆', field: 'carname'},
        { title: '经销商', field: 'dealer'},
        { title: '申请号', field: 'applicationno'},
        { title: '车架号', field: 'vin'},
        { title: '合同价格', field: 'price'},
        { title: '贷款金额', field: 'loanmoney'},
        { title: '期数', field: 'loanperiod'},
        { title: '贴息金额', field: 'subsidy'}
      ],
      backcol:[
        { title: '申请时间', field: 'activedate' },
        { title: '退件时间', field: 'applicationdate' },
        { title: '经销商', field: 'dealer'},
        { title: '申请号', field: 'applicationno'},
        { title: '案件类别', field: 'filetype'},
        { title: '客户姓名', field: 'borrowername'},
        { title: '文件类型', field: 'filetype'},
        { title: '问题类型', field: 'questiontype'},
        { title: '问题描述', field: 'question'}
      ],
      total: 0,
      pagesize:10,
      page: 1,
      backtotal: 0,
      backpagesize:10,
      backpage: 1,
      apptotal: 0,
      apppagesize:10,
      apppage: 1,
      chartload:false,
      nowdate: "",
      value4: "",
      backvalue:"",
      ordervalue:"",
      firstDay:"",
      EndDay:"",
      activeName: "1",
      chartData: {
        width:"560px",
        columns: ["date", "放款统计"],
        rows: [],
      },
      chartSettings: { 
        yAxis: {
           offset:40,
          },
        
        area: true,
        label: {
          normal: {
            show: true          
          }
        } ,      
      },
       chartbackData: {
        columns: ["name", "放款退件"],
        rows: []
      },    
      chartbackSettings: {
        area: true,
        label: {
          normal: {
            show: true
          }
        },       
      },
      chartorderData: {
        columns: ["case", "审批退件"],
        rows: []
      },    
      chartorder: {
        area: true,
        label: {
          normal: {
            show: true,
          }
        },     
      }
    };
  },
  methods: {
    getdealerlist(){
      let para={};
      dealerlist(para).then(res=>{
        let data =res.data.data
        this.options=data
        this.value=data[0].name
        this.value1=data[0].name
        this.value2=data[0].name
        this.getLOANCharDatas()
      })
    },
    getnowdate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day =new Date(year,month,0);
      month = month < 10 ? "0" + month : month;
      var mydate = year.toString() + "-" + month.toString();
      this.firstDay= year.toString() + "-" + month.toString()+'-01';
      this.EndDay=year.toString() + "-" + month.toString()+'-'+day.getDate();
      this.value4 = mydate;
      this.backvalue = mydate;
      this.ordervalue=mydate;
    },
    choosemonth(val) {
      this.value4 = val;
      this.value4 = this.value4 ? Moment(this.value4).format("YYYY-MM") : "";
      this.getLOANCharDatas();
    },
    choosemonth1(val) {
      this.backvalue = val;
      this.backvalue = this.backvalue ? Moment(this.backvalue).format("YYYY-MM") : "";    
      this.getLOANBACKCharDatas() 
    },
     choosemonth2(val) {
      this.ordervalue = val;
      this.ordervalue = this.ordervalue ? Moment(this.ordervalue).format("YYYY-MM") : "";
      this.getorderDatas();
    },
    adddata() {   
      if (this.datas && this.datas != null) {
        let a = [];
        let b = [];
       this.datas.forEach(el => {
        a.push(el.date);
        b.push(el.num);
        });     
        chart("chart1",a,b)
      } else {
        let a = [];
        let b = [0];
        a.push(this.value4);
        chart("chart1",a,b)
      }
    },
     getLOANCharDatas() {
      this.chartload=true
      let parmas = {
        sdate: this.value4,
        type: "LOAN",
        dealerid:JSON.parse(localStorage.getItem("dealerinfo")).orgId,
      };
      getCharData(parmas).then(res => {
        if (res.data.success == 1) {
          let data = res.data.data;
          this.datas = data;
          this.adddata();
          this.chartload=false;        
        }
      });
    },
    addbackdata() {
      if (this.backdatas && this.backdatas != null) {
        let a = [];
        let b = [];
       this.backdatas.forEach(el => {
        a.push(el.date);
        b.push(el.num);
        });
        chart("chart2",a,b)
      } else { 
        let a = [];
        let b = [0];
        a.push(this.backvalue); 
         chart("chart2",a,b)  
      }
    },
    getLOANBACKCharDatas() {
      let parmas = {
        sdate: this.backvalue,
        type: "LOANBACK",
        dealerid:JSON.parse(localStorage.getItem("dealerinfo")).orgId,
      };
       getCharData(parmas).then(res => {
        if (res.data.success == 1) {      
          let data = res.data.data;
          this.backdatas = data;
          this.addbackdata()
        }
      });
    },
    //审批退案
    getorderDatas() {
      let parmas = {
        sdate: this.ordervalue,
        type: "APPLICATIONBACK",
        dealerid:JSON.parse(localStorage.getItem("dealerinfo")).orgId,

      };
       getCharData(parmas).then(res => {
        if (res.data.success == 1) {      
          let data = res.data.data;
          this.backdatas = data;       
          this.addorderdata()
        }
      });
    },
     addorderdata() {
      if (this.ordervalue && this.backdatas != null) {
        let a = [];
        let b = [];      
        this.backdatas.forEach(el => {
        a.push(el.date);
        b.push(el.num);
        }); 
        chart("chart3",a,b)
      } else {
         let a = [];
        let b = [0];
         a.push(this.ordervalue);
         chart("chart3",a,b)  
      }
    },
    handleClick(tab, event) {
      if(tab.label=='放款退件'){
        this.getLOANBACKCharDatas();
         this.name='放款退件'
      }
      console.log(tab.label)
      if(tab.label=='审批退件'){
        this.getorderDatas();
        this.name='审批退件'
      }
    }
  },
  created(){

  },
  mounted() {
    this.getnowdate();
    this.getdealerlist(); 
  },
};
</script>
<style>

#tab-second {
  margin-left: 24px;
}

.spandiv{ 
  display: inline-block;
    height: 100%;
    background: #fff;
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.2);
    margin-right: 24px;
    margin-top: 5px;
    border-radius:4px
    }
  .spandiv .el-input__inner,.spandiv .el-input__inner:hover {
    border-color: #fff;
    }
.spandiv i{
font-size: 16px;
    color: #666;
    cursor: pointer;
    padding-right: 10px;
    }
   /* #chart .el-tabs__nav-wrap:after{
     background-color: #e4e7ed;
    } */
    .chartTitle{display: flex;justify-content:space-between;}
    .chartsImg{background: #fff;border-radius: 4px;height:100%}
   .countList{height:100%} 
 .countList thead .cell{color: #000;font-size:14px}
 .chartsImg .el-input__inner{height:32px;line-height:32px}
 .chartsImg .el-input__icon{line-height:32px }
 .chartsImg .el-date-editor.el-input{width:128px}
 
</style>
