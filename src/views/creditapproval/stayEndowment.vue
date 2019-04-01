<template>
  <section>
    <div class='app-container'>
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator="/" class="app-breadcrumb">
            <el-breadcrumb-item class="firstbread">信贷审批</el-breadcrumb-item>
            <el-breadcrumb-item>放款管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="6" class="topsearch">
          <el-autocomplete style="width:100%" placeholder="请输入关键字" :value="searchcont" v-model="searchcont" @keyup.enter.native="searchname" size="small">
            <i slot="suffix" @click="searchname" style="cursor:pointer" class="el-icon-search"></i>
          </el-autocomplete>
        </el-col>
      </el-row>
      <!--搜索-->
      <el-row class="searchbar">
        <el-col :span='24'>
          <el-col :span='8'>
            <div class="blocktime">
              <span class="demonstration">提交时间</span>
              <el-date-picker v-model="value1" style="width:265px" unlink-panels format="yyyy-MM-dd" size="small" prefix-icon="el-icon-date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span='7'>
             <div class="blocktime">
              <ul class="btnul">
                <li>
                  <el-button size="medium" type="text" class="btnfirst">
                    <span style="color:#666"> 经销商</span>
                  </el-button>
                </li>

                <li>
                  <el-select v-model="jxsname" size="small" class="selectsearch" style="width:200px" placeholder="请选择">
                    <el-option v-for="item in itemnav" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>

                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span='9'>
            <div class="blocktime">
              <ul class="btnul">
                <li>
                  <el-button size="medium" type="text" class="btnfirst">
                    <span style="color:#666"> 状态</span>
                  </el-button>
                </li>

                <li>
                  <el-select v-model="status" size="small" class="selectsearch" style="width:200px" placeholder="请选择">
                    <el-option v-for="item in itemnav" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>

                </li>
              </ul>
            </div>
            <div class="blocktime" style="margin-left:8px">
              <el-button size="small" type="success" class="btncolor">查询</el-button>
              <span style="color:#666;font-size: 14px;margin-left:8px">导出EXCEL</span>
            </div>
          </el-col>

        </el-col>

      </el-row>
      <!--列表-->
      <el-table :data='lists' highlight-current-row v-loading='listLoading' class="tablelist" stripe>
        <el-table-column align='left' width='100' prop='appno' label='申请编号'>
        </el-table-column>
        <el-table-column align='left' prop='name' label='客户姓名'>
        </el-table-column>
        <el-table-column align='left' width='100' prop='phone' label='手机号'>
        </el-table-column>
        <el-table-column align='left' width='152' prop='cardid' label='身份证号'>
        </el-table-column>
        <el-table-column align='left' width='110' prop='brandmodelstyle' label='车辆信息'>
        </el-table-column>
        <el-table-column align='left' width='100' prop='provincecity' label='购车地点'>
        </el-table-column>
        <el-table-column align='left' width='152' prop='suorgname' label='经销商'>
        </el-table-column>
        <el-table-column align='left' prop='estimatecount' label='测算次数'>
        </el-table-column>
        <el-table-column align='left' prop='result' label='测算结果'>
        </el-table-column>
         <el-table-column align='left' width='152' prop='cdate' label='测算时间'>
        </el-table-column>
        <el-table-column label='操作' align='center' fixed="right" width='90'>
          <template slot-scope='scope'>

            <span v-if="scope.row.exportflag=='未导出'" class='linkurl' @click="toDetail(scope.row.id)">未导出</span>
            <span v-else class='linkurl' style="color:#666" @click="toDetail(scope.row.id)">已导出</span> 
          </template>
        </el-table-column>
      </el-table>
      <!--选择总条数-->

      <!--工具条-->
      <el-col :span='24' style="text-align:right" class='toolbar'>

        <Page :current="PageIndex" :page-size="PageSize" :total="total" @on-change="handleCurrentChange" @on-page-size-change="handleSizeChange" show-sizer show-total></Page>
      </el-col>

    </div>
   
  </section>
</template>

<script>
import { getToken } from "@/utils/auth";
import { liuzigetCCSInfo } from "@/api/credit";
export default {
  data() {
    return {
      showbatch: false,
      status:'',
      jxsname:'',
      searchcont:'',
      lists: [
        {
          appno:'T0326458',
          name:'李丽',
          phone:'13483267099',
          cardid:'130633199408094899',
          brandmodelstyle:'2017款H9',
          provincecity:'河北省保定市',
          suorgname:'保定五洲经销商',
          estimatecount:'3',
          result:'成功',
          cdate:'2018-12-09 10:20:30',
          exportflag:'已导出'
        },
        {
          appno:'T032895',
          name:'庞统',
          phone:'13483267099',
          cardid:'130633199408094899',
          brandmodelstyle:'2017款WEY7S',
          provincecity:'河北省保定市',
          suorgname:'保定五洲经销商',
          estimatecount:'3',
          result:'成功',
          cdate:'2018-12-09 10:20:30',
          exportflag:'未导出'
        }
      ], 
      itemnav: [
        {
          id: '00',
          name: "未导出"
        },
        {
          id: '01',
          name: "已导出"
        },
      ],
      total:2,
      PageIndex:1,
      listLoading: false,
      PageSize:10,
      value1: "",
    };
  },
  computed: {
  },
  methods: {
     handleCurrentChange(val) {
      this.page = val
      this.getlists()
    },
     handleSizeChange(val) {
      this.pagesize = val
      this.getlists()
    },
    dateFormat: function(row, column) {
      var moment = require("moment");
      var date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
    getlists() {
      let para = {};
      para ={
        stime:'',
        etime:'',
        dealer:'',
        export_flag:'',
        page_index:0,
        page_size:10
      }
      this.listLoading = true;
      liuzigetCCSInfo(para).then(res => {
        if (res.data.data) {
          this.total = res.data.data.recordsTotal;
          this.lists = res.data.data.data;
        } else {
          this.$message({
            type: "error",
            message: "服务器错误！！，请联系管理员"
          });
        }
        this.listLoading = false;
      });
    },
    toDetail(){},
    searchname(){},
  },
  mounted() {
    this.getlists();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #cccccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #cccccc;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-form-item {
  margin-bottom: 10px;
}
.btnul li {
  font-size: 13px;
  line-height: 26px;
  cursor: pointer;
}
.unactive {
  margin-top: 5px;
  border: none;
}
.btnactive {
  color: #ffffff;
  background-color: #5881d8;
  margin-top: 5px;
  cursor: pointer;
  width: 80px;
  text-align: center;
  border: 1px solid #5881d8;
  border-radius: 4px;
}
.btnactive:hover {
  width: 80px;
}
</style>

