<template>
  <section>
    <el-col id="chart">
      <!--  -->    
      <el-tabs  v-model="activeName" style="margin-top:20px"   @tab-click="handleClick">
        <el-tab-pane label="放款统计" name="1" v-loading="chartload">
            <p style="text-align:right">
            <span class="spandiv">
              <el-date-picker @change="choosemonth" v-model="value4" type="month" placeholder="选择月份"></el-date-picker>
              <i class="el-icon-search"  @click="changesearch"></i>
               <!-- <el-button type="primary" style="margin-right:40px" size="mini" icon="el-icon-search" @click="changesearch" ></el-button> -->
            </span>          
          </p>        
          <ve-line :data="chartData" :settings="chartSettings" :legend-visible='false' ref="chart1"></ve-line>
          
        </el-tab-pane>
        <el-tab-pane label="放款退件" name="2">
          <p style="text-align:right">
            <span class="spandiv">
          <el-date-picker @change="choosemonth1" v-model="backvalue" type="month" placeholder="选择月份"></el-date-picker>
           <i class="el-icon-search"  @click="changesearch1" ></i>
           <!-- <el-button type="primary" style="margin-right:40px"  icon="el-icon-search" @click="changesearch1" ></el-button>  -->
            </span>
          </p> 
            <ve-line :data="chartbackData" :settings="chartbackSettings" :legend-visible='false' ref="chart2"></ve-line>       
        </el-tab-pane>
        <el-tab-pane label="审批退件" name="3">
          <p style="text-align:right">
            <span class="spandiv">
         <el-date-picker @change="choosemonth2" v-model="ordervalue" type="month" placeholder="选择月份"></el-date-picker>
           <!-- <el-button type="primary" style="margin-right:40px" @click="changesearch2" >查询</el-button>   -->
           <i class="el-icon-search" @click="changesearch2" ></i>
            </span>
          </p>
            <ve-line :data="chartorderData" :settings="chartorder" :legend-visible='false' ref="chart3"></ve-line>  
          </el-tab-pane>
      </el-tabs>
    </el-col>
  </section>
</template>
<script>
import Moment from "moment/moment";
// import adddata from '@/api/data'
import { getCharData } from "@/api/together";
export default {
  data() {
    return {
      // datas:"",
      // backdatas:"",
      chartload:false,
      nowdate: "",
      value4: "",
      backvalue:"",
      ordervalue:"",
      firstDay:"",
      EndDay:"",
      activeName: "1",
      chartData: {
        columns: ["date", "放款统计"],
        rows: []
      },
      chartSettings: {
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
    },
    choosemonth1(val) {
      this.backvalue = val;
      this.backvalue = this.backvalue ? Moment(this.backvalue).format("YYYY-MM") : "";
    },
     choosemonth2(val) {
      this.ordervalue = val;
      this.ordervalue = this.ordervalue ? Moment(this.ordervalue).format("YYYY-MM") : "";
    },
    changesearch() {
      this.chartData.rows = [];
      this.getLOANCharDatas();
    },
    changesearch1() {
      this.chartbackData.rows = [];
      this.getLOANBACKCharDatas();
    },
     changesearch2() {
      this.chartorderData.rows = [];
      this.getorderDatas();
    },
    adddata() {   
       this.chartData.rows=[];
      if (this.datas && this.datas != null) {
       this.datas.forEach(el => {
          this.chartData.rows.push({ date: el.date, 放款统计: el.num });
        });
      } else {
        this.chartData.rows.push({ date: this.value4, 放款统计: "0" });
      }
    },
     getLOANCharDatas() {
       this.chartload=true
      let parmas = {
        sdate: this.value4,
        type: "LOAN"
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
       this.chartbackData.rows=[];
      if (this.backdatas && this.backdatas != null) {
       this.backdatas.forEach(el => {
          this.chartbackData.rows.push({ name: el.date, 放款退件: el.num });
        });
      } else {
        this.chartbackData.rows.push({ name: this.backvalue, 放款退件: "0" });
      }
    },
    getLOANBACKCharDatas() {
      let parmas = {
        sdate: this.backvalue,
        type: "LOANBACK"
      };
       getCharData(parmas).then(res => {
        if (res.data.success == 1) {      
          let data = res.data.data;
          this.backdatas = data;
          this.addbackdata()
        }
      });
    },
    addbackdata() {
       this.chartbackData.rows=[];
      if (this.backdatas && this.backdatas != null) {
       this.backdatas.forEach(el => {
          this.chartbackData.rows.push({ name: el.date, 放款退件: el.num });
        });
      } else {
        this.chartbackData.rows.push({ name: this.backvalue, 放款退件: "0" });
      }
    },
    //审批退案
    getorderDatas() {
      let parmas = {
        sdate: this.backvalue,
        type: "LOANBACK"
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
       this.chartorderData.rows=[];
      if (this.orderdatas && this.backdatas != null) {
       this.orderdatas.forEach(el => {
          this.chartorderData.rows.push({ case: el.date, 审批退件: el.num });
        });
      } else {
        this.chartorderData.rows.push({ case: this.ordervalue, 审批退件: "0" });
      }
    },
    handleClick(tab, event) {
    
    }
    // getAPPLICATIONBACK() {
    //   let parmas = {
    //     sdates: this.value4,
    //     type: "APPLICATIONBACK"
    //   };
    // },
    // getnums(){
    //   for(var i=1;i<=31;i++){
    //     this.chartData.rows.push({'date':i,'放款统计':i+20})
    //   }
    // }
  },
  mounted() {
    // this.getnums();
    this.getnowdate();
    this.getLOANCharDatas();
    this.getLOANBACKCharDatas()
    this.getorderDatas()
   
  },
  watch:{
    activeName(v){
       this.$nextTick(_ => {
       this.$refs[`chart${v}`].echarts.resize()
      })
    }
  }
};
</script>
<style>

#tab-second {
  margin-left: 24px;
}
.ve-line{height: 360px!important}
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
   #chart .el-tabs__nav-wrap:after{
     background-color: #fbfbfb;
    }
</style>
