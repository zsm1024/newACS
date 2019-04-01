/* eslint-disable */
<template>
  <section class="countList app-container" style="margin-top:5px;position:relative;">
       <el-col :span="18">
          <el-breadcrumb separator="/" class="app-breadcrumb breads">
            <el-breadcrumb-item >统计分析</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
    <el-col id="chart" class="chartsImg">  
      <el-tabs  v-model="activeName"    @tab-click="handleClick">
        <el-tab-pane label="放款统计" name="1" v-loading="chartload">
            <div style="text-align:right;display:flex;justify-content: flex-end;">
              <el-col :span="3.5"  :class="[options.length=='1'?'classc':'classd']" >
                <el-date-picker @change="choosemonth" v-model="value4" type="month" :clearable="false" placeholder="选择月份"></el-date-picker>
              </el-col>
              <el-col style="width:280px;margin:0 24px 0 8px" :class="[options.length=='1'?'classa':'classb']" >
                <el-select  v-model="value"  placeholder="经销商" clearable @change="changeJXS">
                     <el-option
                      v-for="(item,$index) in options"
                      :key="$index"
                      :label="item.name"
                      :value="item.id"
                      >
                      </el-option>
                </el-select>
              </el-col>
          </div> 
          <div id="myCharts" :style="{width:'1200px',height:'300px'}"></div>       
          <p class="lineStr"></p>
          <el-col class="chartsImg">
            <span
              class="exportEx"
              @click="exportsList('放款统计',value4,jxs)"
            >导出EXCEL</span>
            <el-table
              :data='lists'
              highlight-current-row
              style='width: 100%;'
              stripe
            >
              <el-table-column
                :prop='col.field'
                :label='col.title'
                :width='col.width'
                show-overflow-tooltip
                v-for='(col, index) in col'
                :key='index'
              ></el-table-column>
            </el-table>
            <el-col
              v-if="!!page"
              :span='24'
              style="text-align:right"
              class='toolbar'
            >
              <Page
                :current="page"
                :page-size="pagesize"
                :total="total"
                @on-change="handleCurrentChange"
                @on-page-size-change="handleSizeChange"
                show-sizer
                show-total
              ></Page>
            </el-col>
          </el-col>
        </el-tab-pane>
        <el-tab-pane
          label="放款退件"
          name="2"
        >
          <div style="text-align:right;display:flex;justify-content: flex-end;">
            <el-col
              :span="3.5"
              :class="[options.length=='1'?'classc':'classd']"
            >
              <el-date-picker
                @change="choosemonth1"
                v-model="backvalue"
                type="month"
                :clearable="false"
                placeholder="选择月份"
              ></el-date-picker>
            </el-col>
            <el-col
              style="width:280px;margin:0 24px 0 8px"
              :class="[options.length=='1'?'classa':'classb']"
            >
              <el-select
                v-model="value1"
                placeholder="经销商"
                clearable
                @change="changeBACKJXS"
              >
                <el-option
                  v-for="(item,$index) in options"
                  :key="$index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </div>
          <div
            id="backchart"
            :style="{width:'1200px',height:'300px'}"
          ></div>
          <p class="lineStr"></p>
          <el-col class="chartsImg">
            <span
              class="exportEx"
              @click="exportsList('放款退件',backvalue,value1)"
            >导出EXCEL</span>
            <el-table
              :data='backlists'
              highlight-current-row
              style='width: 100%;'
              stripe
            >
              <el-table-column
                :prop='col.field'
                :label='col.title'
                :width='col.width'
                show-overflow-tooltip
                v-for='(col, index) in backcol'
                :key='index'
              ></el-table-column>
            </el-table>
            <el-col
              v-if="!!backpage"
              :span='24'
              style="text-align:right"
              class='toolbar'
            >
              <!--          -->
              <Page
                :current="backpage"
                :page-size="backpagesize"
                :total="backtotal"
                @on-change="backhandleCurrentChange"
                @on-page-size-change="backhandleSizeChange"
                show-sizer
                show-total
              ></Page>
            </el-col>
          </el-col>
        </el-tab-pane>
        <el-tab-pane
          label="审批退件"
          name="3"
        >
          <div style="text-align:right;display:flex;justify-content: flex-end;">
            <el-col
              :span="3.5"
              :class="[options.length=='1'?'classc':'classd']"
            >
              <el-date-picker
                @change="choosemonth2"
                v-model="ordervalue"
                type="month"
                :clearable="false"
                placeholder="选择月份"
              ></el-date-picker>
            </el-col>
            <el-col
              style="width:280px;margin:0 24px 0 8px"
              :class="[options.length=='1'?'classa':'classb']"
            >
              <el-select
                v-model="value2"
                placeholder="经销商"
                clearable
                @change="changeAppJXS"
              >
                <el-option
                  v-for="(item,$index) in options"
                  :key="$index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </div>
          <div
            id="orderchart"
            :style="{width:'1200px',height:'300px'}"
          ></div>
          <p class="lineStr"></p>
          <el-col class="chartsImg">
            <span
              class="exportEx"
              @click="exportsList('审批退件',ordervalue,value2)"
            >导出EXCEL</span>
            <el-table
              :data='applists'
              highlight-current-row
              style='width: 100%;'
              stripe
            >
              <el-table-column
                :prop='col.field'
                :label='col.title'
                :width='col.width'
                show-overflow-tooltip
                v-for='(col, index) in ordercol'
                :key='index'
              ></el-table-column>
            </el-table>
            <el-col
              v-if="!!apppage"
              :span='24'
              style="text-align:right"
              class='toolbar'
            >

              <Page
                :current="apppage"
                :page-size="apppagesize"
                :total="apptotal"
                @on-change="apphandleCurrentChange"
                @on-page-size-change="apphandleSizeChange"
                show-sizer
                show-total
              ></Page>
            </el-col>
          </el-col>
        </el-tab-pane>
      </el-tabs>
    </el-col>

    <!--工具条-->

    <!-- <div>
      
    </div> -->
  </section>
</template>
<script>
import { getToken } from "@/utils/auth";
import Moment from "moment/moment";
import {
  getCharData,
  dealerlist,
  loanlist,
  loanbacklist,
  applicationbacklist,
  loanlistexport
} from "@/api/together";
import { chart } from "./chart";
export default {
  data() {
    return {
      colors: ["#5881D8"],
      name: "放款统计",
      lists: [],
      backlists: [],
      applists: [],
      value: "",
      options: [],
      jxs: JSON.parse(localStorage.getItem("dealerinfo")).orgId,
      value1: "",
      options1: [],
      jxs1: JSON.parse(localStorage.getItem("dealerinfo")).orgId,
      value2: "",
      options2: [],
      jxs2: JSON.parse(localStorage.getItem("dealerinfo")).orgId,
      col: [
        { title: "放款日期", field: "activedate" },
        { title: "客户姓名", field: "borrowername" },
        { title: "车辆", field: "carname" },
        { title: "经销商", field: "dealer" },
        { title: "申请号", field: "applicationno" },
        { title: "车架号", field: "vin" },
        { title: "合同价格", field: "price" },
        { title: "贷款金额", field: "loanmoney" },
        { title: "期数", field: "loanperiod" },
        { title: "贴息金额", field: "subsidy" }
      ],
      backcol: [
        { title: "申请时间", field: "activedate" },
        { title: "退件时间", field: "applicationdate" },
        { title: "经销商", field: "dealer" },
        { title: "申请号", field: "applicationno" },
        { title: "案件类别", field: "filetype" },
        { title: "客户姓名", field: "borrowername" },
        { title: "文件类型", field: "filetype" },
        { title: "问题类型", field: "questiontype" },
        { title: "问题描述", field: "question" }
      ],
      ordercol: [
        { title: "申请号", field: "applicationno" },
        { title: "大区", field: "region" },
        { title: "大区经理", field: "name" },
        { title: "城市", field: "city" },
        { title: "经销商", field: "dealer" },
        { title: "主借人", field: "borrowername" },
        { title: "金融产品", field: "fnproduct" },
        { title: "首付比例", field: "downratio" },
        { title: "贷款金额", field: "loanmoney" },
        { title: "留言类型", field: "messagetype" },
        { title: "留言原因", field: "reason" },
        { title: "留言内容", field: "msg" },
        { title: "留言时间", field: "messagetime" }
      ],
      total: 0,
      pagesize: 10,
      page: 1,
      backtotal: 0,
      backpagesize: 10,
      backpage: 1,
      apptotal: 0,
      apppagesize: 10,
      apppage: 1,
      chartload: false,
      nowdate: "",
      value4: "",
      backvalue: "",
      ordervalue: "",
      firstDay: "",
      EndDay: "",
      activeName: "1"
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getloanList();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getloanList();
    },
    backhandleCurrentChange(val) {
      this.backpage = val;
      this.getloanbackList();
    },
    backhandleSizeChange(val) {
      this.backpagesize = val;
      this.getloanbackList();
    },
    apphandleCurrentChange(val) {
      this.apppage = val;
      this.getapplicationbacklist();
    },
    apphandleSizeChange(val) {
      this.apppagesize = val;
      this.getapplicationbacklist();
    },
    changeJXS(val) {
      this.jxs = val;
      if (!val) {
        this.jxs = JSON.parse(localStorage.getItem("dealerinfo")).orgId;
      }
      this.getLOANCharDatas();
      this.getloanList();
    },
    changeBACKJXS(val) {
      this.jxs1 = val;
      if (!val) {
        this.jxs1 = JSON.parse(localStorage.getItem("dealerinfo")).orgId;
      }
      this.getLOANBACKCharDatas();
      this.getloanbackList();
    },
    changeAppJXS(val) {
      this.jxs2 = val;
      if (!val) {
        this.jxs2 = JSON.parse(localStorage.getItem("dealerinfo")).orgId;
      }
      // this.chartorderData.rows = [];
      this.getorderDatas();
      this.getapplicationbacklist();
    },
    getdealerlist() {
      let para = {};
      dealerlist(para).then(res => {
        let data = res.data.data;
        this.options = data;
      });
    },
    getloanList() {
      this.lists = [];
      let parmas = {
        sdate: this.value4,
        type: "LOAN",
        dealerid: this.jxs,
        PageIndex: this.page,
        PageSize: this.pagesize
      };
      loanlist(parmas).then(res => {
        let data = res.data.data;
        if (res.data.success == 1) {
          this.lists = data.data;
          this.total = data.recordsTotal;
        } else {
          this.total = 0;
        }
      });
    },
    exportsList(item, time, name) {
      if (!name) {
        name = " ";
      }
      // window.open(window.g.ApiUrl+"S100011/statistical/loanlistexport/"+time+ "/"+name+"/?_token=Bearer "+getToken())
      window.open(
        window.g.ApiUrl +
          "S100011/statistical/loanlistexport/" +
          time +
          "/" +
          name +
          "/?_token=Bearer " +
          getToken()
      );
    },
    getnowdate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = new Date(year, month, 0);
      month = month < 10 ? "0" + month : month;
      var mydate = year.toString() + "-" + month.toString();
      this.firstDay = year.toString() + "-" + month.toString() + "-01";
      this.EndDay =
        year.toString() + "-" + month.toString() + "-" + day.getDate();
      this.value4 = mydate;
      this.backvalue = mydate;
      this.ordervalue = mydate;
    },
    choosemonth(val) {
      this.value4 = val;
      this.value4 = this.value4 ? Moment(this.value4).format("YYYY-MM") : "";
      this.getLOANCharDatas();
      this.getloanList();
    },
    choosemonth1(val) {
      this.backvalue = val;
      this.backvalue = this.backvalue
        ? Moment(this.backvalue).format("YYYY-MM")
        : "";
      this.getloanbackList();
      this.getLOANBACKCharDatas();
    },
    choosemonth2(val) {
      this.ordervalue = val;
      this.ordervalue = this.ordervalue
        ? Moment(this.ordervalue).format("YYYY-MM")
        : "";
      this.getapplicationbacklist();
      this.getorderDatas();
    },
    getLOANCharDatas() {
      this.chartload = true;
      let parmas = {
        sdate: this.value4,
        type: "LOAN",
        dealerid: this.jxs
      };
      getCharData(parmas).then(res => {
        if (res.data.success == 1) {
          let data = res.data.data;
          this.datas = data;
          if (res.data.data == null) {
            res.data.data = [];
            let a = [];
            let b = [0];
            a.push(this.value4);
            chart("myCharts", a, b);
          } else {
            let a = [];
            let b = [];
            data.forEach(el => {
              a.push(el.date);
              b.push(el.num);
            });
            chart("myCharts", a, b);
          }
          this.chartload = false;
        }
      });
    },
    //放款退件
    getLOANBACKCharDatas() {
      let parmas = {
        sdate: this.backvalue,
        type: "LOANBACK",
        dealerid: this.jxs1
      };
      getCharData(parmas).then(res => {
        if (res.data.success == 1) {
          let data = res.data.data;
          if (res.data.data == null) {
            let a = [];
            let b = [0];
            a.push(this.backvalue);
            chart("backchart", a, b);
          } else {
            let a = [];
            let b = [];
            res.data.data.forEach(el => {
              a.push(el.date);
              b.push(el.num);
            });
            chart("backchart", a, b);
          }
        }
      });
    },
    getloanbackList() {
      this.backlists = [];
      let parmas = {
        sdate: this.backvalue,
        type: " LOANBACK",
        dealerid: this.jxs1,
        PageIndex: this.backpage,
        PageSize: this.backpagesize
      };
      loanbacklist(parmas).then(res => {
        if (res.data.success == 1) {
          let data = res.data.data;
          this.backlists = data.data;
          this.backtotal = data.recordsTotal;
        } else {
          this.backtotal = 0;
        }
      });
    },
    //审批退案
    getapplicationbacklist() {
      this.applists = [];
      let parmas = {
        sdate: this.ordervalue,
        type: "APPLICATIONBACK",
        dealerid: this.jxs2,
        PageIndex: this.apppage,
        PageSize: this.apppagesize
      };
      applicationbacklist(parmas).then(res => {
        if (res.data.success == 1) {
          let data = res.data.data;
          this.applists = data.data;
          this.apptotal = data.recordsTotal;
        } else {
          this.apptotal = 0;
        }
      });
    },
    getorderDatas() {
      let parmas = {
        sdate: this.ordervalue,
        type: "APPLICATIONBACK",
        dealerid: this.jxs2
      };
      getCharData(parmas).then(res => {
        if (res.data.success == 1) {
          let data = res.data.data;
          if (res.data.data == null) {
            res.data.data = [];
            let a = [];
            let b = [0];
            a.push(this.ordervalue);
            chart("orderchart", a, b);
          } else {
            let a = [];
            let b = [];
            res.data.data.forEach(el => {
              a.push(el.date);
              b.push(el.num);
            });
            chart("orderchart", a, b);
          }
        }
      });
    },

    handleClick(tab, event) {
      if (tab.label == "放款退件") {
        this.getLOANBACKCharDatas();
        this.getloanbackList();
        this.name = "放款退件";
      }
      if (tab.label == "审批退件") {
        this.getorderDatas();
        this.getapplicationbacklist();
        this.name = "审批退件";
      }
    }
  },
  mounted() {
    this.getnowdate();
    this.getLOANCharDatas();
    this.getdealerlist();
    this.getloanList();
  }
};
</script>
<style scoped>
#tab-second {
  margin-left: 24px;
}

.ve-line {
  height: 360px !important;
}
.spandiv {
  display: inline-block;
  height: 100%;
  background: #fff;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  margin-right: 24px;
  margin-top: 5px;
  border-radius: 4px;
}
.spandiv .el-input__inner,
.spandiv .el-input__inner:hover {
  border-color: #fff;
}
.spandiv i {
  font-size: 16px;
  color: #666;
  cursor: pointer;
  padding-right: 10px;
}
.chartTitle {
  display: flex;
  justify-content: flex-end;
}

.chartsImg {
  background: #fff;
  margin-top: 2px;
}
#chart.chartsImg {
  border-radius: 0;
}
.countList thead .cell {
  color: #000;
  font-size: 14px;
}
.exportEx {
  color: #666;
  height: 16px;
  line-height: 16px;
  margin: 16px 0px 16px 0;
  padding-right: 24px;
  display: inline-block;
  width: 1200px;
  text-align: right;
}
.exportEx:hover {
  color: #5881d8;
}
.classa {
  display: none;
}
.classb {
  display: inline-block;
}
.classc {
  margin-right: 24px;
}
.classd {
  margin-right: 0;
}
/* .has-gutter */
.app-breadcrumb.el-breadcrumb{
    line-height: 52px !important;
    height: 37px !important;
    margin-top: 0 !important;
}
</style>
