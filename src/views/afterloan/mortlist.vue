<template>

  <div
    class='app-container mortlist'
    style="margin-top:5px;position:relative;"
  >
    <el-row>
      <el-col :span="11">
        <el-breadcrumb
          separator="/"
          class="app-breadcrumb"
        >
          <el-breadcrumb-item class='firstbread'>贷后管理</el-breadcrumb-item>
          <el-breadcrumb-item>解抵押</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col
        :span="7"
        align="right"
        class="topmiddle topbtnbasic"
        style="padding-right:0;margin:3px 0 8px 0"
      >
      </el-col>
      <el-col
        :span="6"
        class="topmiddle topbtnbasic"
        style="padding-right:0;margin:3px 0 8px 0"
      >
        <el-form @submit.native.prevent>
          <el-autocomplete
            style="width:100%"
            v-model="applicationno"
            :value="applicationno"
            placeholder="姓名、申请编号、手机号"
            :fetch-suggestions="querySearchAsync"
            @focus="clearNormalFilter"
            @keyup.enter.native="searchname"
            @select="handleSelect"
            size="small"
          >
            <i
              slot="suffix"
              @click="searchname"
              style="cursor:pointer;line-height:32px;"
              class="el-icon-search"
            ></i>
          </el-autocomplete>
        </el-form>
      </el-col>

    </el-row>
    <!--搜索-->
    <el-row class="searchbar custom-card-filter">
      <el-col :span='24'>
        <div class="blocktime">
          <strong class="demonstration">解抵押状态</strong>
          <filter-tag
            :current='applyStatus'
            @on-change='changeapplyStatus'
            :tags="apply"
          ></filter-tag>
        </div>
      </el-col>
    </el-row>

    <!--列表-->
    <el-table
      class="lxn_table tablelist custom-card-grid"
      :data="tableData"
      stripe
      v-loading='listLoading'
    >
      <el-table-column label="申请编号"
            width="220">
        <template slot-scope="scope">
          <span
            class="linkurl underline"
            style="margin-left:0"
            @click="lookdetail(scope.row.id,scope.row.caafterstatusmortg)"
          >{{scope.row.camainno}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="borrowername"
        label="客户姓名"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="refData.areaname"
        label="省市"
        width="180"
        show-overflow-tooltip
      >
      </el-table-column>
      <!-- <el-table-column prop="refData.signdealername" label="二级经销商" width="248">
      </el-table-column> -->
      <el-table-column
        prop="refData.caafterstatusmortgname"
        label="解抵押状态"
        align="center"
        width="140"
      >
      <template slot-scope='scope'>
          <span
            v-if="scope.row.caafterstatusmortg == '2' || scope.row.caafterstatusmortg == '5'"
            style="background-color:#FAAD14;height:24px;padding:0 4px;min-width:56px;display:inline-block;color:#ffffff;text-align:center;border-radius:3px"
          >{{scope.row.refData.caafterstatusmortgname}}</span>
          <span
            v-else
          >{{scope.row.refData.caafterstatusmortgname}}</span>
        </template>
      </el-table-column>
      <el-table-column
      width="80"
      >
      </el-table-column>
      <el-table-column
        prop="refData.categoryname"
        label="案件类别"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="refData.statusname"
        label="案件状态"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="closedate"
        label="结清日期"
        width="100"
      >
      </el-table-column>
      <!-- <el-table-column label='操作' fixed="right" align='center'  width='105'>
              <template slot-scope='scope'>
                <span class='linkurl' @click="jiediya(scope.row.id)">解抵押</span>
              </template>
            </el-table-column>   -->
    </el-table>
    <!--工具条-->
    <el-col
      :span='24'
      style="text-align:right"
      class='toolbar'
      v-show="!!total"
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
  </div>
</template>

<script>
import { mortgetlist, mortmatching } from "@/api/afterloan";
import { collectReplace, objectExcept } from "@/utils/index";
import { getApplicationNo2 } from "@/api/credit";
import filterTag from "@/components/FilterTag/filtertag";
export default {
  components: {
    filterTag
  },
  data() {
    return {
      apply: [], //解抵押状态列表
      applyStatus: "", //申请状态
      applicationno: "", //搜索内容
      tableData: [], //列表
      total: 0,
      pagesize: 10,
      page: 1,
      listLoading: false,
      timer: null
    };
  },

  mounted() {
    var newArray = JSON.parse(localStorage.getItem("CodeSource"))[
      "00001HVDARIKT0000A1Z"
    ];
    this.apply = newArray.filter(now => {
      return now.NAME != "退回解抵押";
    });
    var item = {
      code: "",
      name: "全部"
    };
    this.apply.unshift(item);
    this.getlists();
  },
  methods: {
    changeapplyStatus(tag) {
      this.applyStatus = tag.code;
      this.page = 1;
      this.getlists();
    },
    //获取列表
    getlists() {
      var applyStatus = "";
      this.applicationno = "";
      if (this.applyStatus == "") {
        applyStatus = 0;
      } else {
        applyStatus = parseInt(this.applyStatus);
      }
      let para = {
        PageIndex: this.page,
        PageSize: this.pagesize,
        Status: applyStatus
      };
      this.listLoading = true;
      mortgetlist(para).then(res => {
        this.listLoading = false;
        if (res.data.success) {
          this.total = res.data.data.recordsTotal;
          this.tableData = collectReplace(res.data.data.data, {
            closedate: {
              key: "closedate",
              fun: function(value) {
                if (value != null && value != "") {
                  return value.split(" ")[0];
                }
              }
            }
          });
          console.log(this.tableData);
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    },
    querySearchAsync(queryString, cb) {
      var results = [];
      //节流防止多次提交，减轻服务器压力
      clearTimeout(this.timer);
      if (this.noLength) {
        this.timer = setTimeout(function() {
          getApplicationNo2(queryString).then(res => {
            if (res.data.success) {
              results = res.data.data;
              results = results.map(obj => {
                obj.name.length == 2
                  ? (obj.name = obj.name[0] + "　" + obj.name[1])
                  : "";
                return {
                  ...obj,
                  value: obj.name + " " + obj.applicationno + " " + obj.phone
                };
              });
              cb(results);
            } else {
              this.$message({
                type: "error",
                message: "服务器错误！！，请联系管理员"
              });
            }
          });
        }, 300);
      } else {
        cb(results);
      }
    },
    handleSelect(item) {
      this.applicationno = item.applicationno;
      this.searchname();
    },
    //模糊搜索
    clearNormalFilter() {
      let isDefault = true;
      if (this.applyStatus !== "") {
        isDefault = false;
      }
      this.applyStatus = "";
      if (!isDefault) {
        this.page = 1;
        this.getlists();
      }
    },
    searchname() {
      this.page = 1;
      this.searchlists();
    },
    searchlists() {
      //模糊搜索
      this.page = 1;
      this.applyStatus = "";
      let para = {
        PageIndex: this.page,
        PageSize: this.pagesize,
        key: this.applicationno
      };
      mortmatching(para).then(res => {
        this.listLoading = false;
        if (res.data.success) {
          this.total = res.data.data.recordsTotal;
          this.tableData = collectReplace(res.data.data.data, {
            closedate: {
              key: "closedate",
              fun: function(value) {
                if (value != null && value != "") {
                  return value.split(" ")[0];
                }
              }
            }
          });
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    },
    lookdetail(id,i) {
        if(i !=6 && i !=1){
          this.jiediya(id)
        }else{
          var text = ''
          if( i == 6){
            text='因客户资质良好，满足免抵押条件，不需进行解抵押操作。'
          }else if( i == 1){
            text='待解抵押状态下，因尚未邮寄资料，不可进行解抵押操作。'
          }
          this.$confirm(text, "提示", {
          confirmButtonText: "确定",
          showCancelButton:false,
          type: "warning"
        })
        }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlists();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlists();
    },
    jiediya(id) {
      this.$router.push({
        path: "/dealer/afterloan/mortview/" + id
      });
    }
  },
  computed: {
    // 计算搜索内容长度 中文一个字 非中文两个字才出发搜索
    noLength: function() {
      var len = 0;
      var applicationNo = this.applicationno;
      for (var i = 0; i < applicationNo.length; i++) {
        if (
          applicationNo.charCodeAt(i) > 127 ||
          applicationNo.charCodeAt(i) == 94
        ) {
          len += 2;
        } else {
          len++;
        }
      }
      return len >= 2;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.topmiddle {
  line-height: 60px;
}
.add {
  width: 88px;
  height: 32px;
  background: linear-gradient(
    135deg,
    rgba(88, 129, 216, 1) 0%,
    rgba(60, 96, 197, 1) 100%
  );
  cursor: pointer;
  display: inline-block;
  margin-right: 8px;
  color: #fff;
  text-align: center;
  line-height: 32px;
  border-radius: 4px;
}
/*搜索*/
.blocktime {
  padding: 0 24px;
  box-sizing: border-box;
  margin-left: 0;
}
.btnul li {
  margin-left: 0;
}
.el-button--medium {
  padding: 8px 0;
}
.el-button--small {
  padding: 9px 0;
  width: 65px;
  display: inline-block;
  text-align: center;
}
.lxn_button {
  margin: 15px 0 0 24px;
  float: left;
}
.linkurls {
  margin-right: 24px;
}
.mortlist /deep/ .el-dialog__body {
  overflow: hidden;
}
.mortlist /deep/ .el-dialog {
  width: 800px;
}
.mortlist /deep/ .el-dialog--center .el-dialog__body {
  padding: 20px 0 20px;
}
.lxn_table /deep/ .el-table__row td .cell {
  line-height: 24px;
}
/*.mortlist /deep/ .el-table_2_column_12 >.cell{
  padding-left: 24px
}*/
.app-breadcrumb.el-breadcrumb {
  line-height: 52px;
  height: 37px;
}
.topbtnbasic {
  text-align: right;
  // height: 70px;
  line-height: 32px;
  height: 32px;
}
</style>

