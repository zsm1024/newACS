<template>
  <div
    class="app-container insulist"
    style="margin-top:5px;position:relative;"
  >
    <el-row>
      <el-col :span="11">
        <el-breadcrumb
          separator="/"
          class="app-breadcrumb"
        >
          <el-breadcrumb-item class="firstbread">贷后管理</el-breadcrumb-item>
          <el-breadcrumb-item>保险业务</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col
        :span="7"
        align="right"
        class="topmiddle topbtnbasic"
        style="padding-right:0;margin:3px 0 8px 0"
      >
        <span
          class="add"
          @click="dialogTableVisible = true"
        >新增申请</span>
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
      <el-col :span="24">
        <div class="blocktime">
          <strong class="demonstration">业务类型</strong>
          <filter-tag
            :current="businessStatus"
            @on-change="changebusinessStatus"
            :tags="business"
          ></filter-tag>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="blocktime">
          <strong class="demonstration">案件状态</strong>
          <filter-tag
            :current="applyStatus"
            @on-change="changeapplyStatus"
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
      v-loading="listLoading"
    >
      <el-table-column
        label="申请编号"
        width="160"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.status=='1'"
            class="linkurl underline"
            style="margin-left:0"
            @click="edit(scope.row.id)"
          >{{scope.row.camainno}}</span>
          <span
            v-else
            class="linkurl underline"
            style="margin-left:0"
            @click="look(scope.row.id)"
          >{{scope.row.camainno}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cacontractborrowername"
        label="客户姓名"
        width="88"
      ></el-table-column>
      <el-table-column
        prop="refData.typename"
        label="业务类型"
        width="108"
      ></el-table-column>
      <el-table-column
        prop="refData.statusexname"
        label="案件状态"
        width="108"
      >
        <template slot-scope='scope'>
          <span
            v-if="scope.row.status == 1"
            style="background-color:#E3E3E3;width:56px;height:24px;display:inline-block;color:#666;text-align:center;border-radius:3px"
          >{{scope.row.refData.statusexname == "未处理"?'未提交':scope.row.refData.statusexname}}</span>
          <span
            v-else
            style="text-align:center;width:56px;height:24px;display:inline-block;color:#606266;"
          >{{scope.row.refData.statusexname == "未处理"?'未提交':scope.row.refData.statusexname}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="refData.statusexname"
        label="案件状态"
        width="78"
      ></el-table-column> -->
      <el-table-column
        prop="appdate"
        label="申请时间"
        width="160"
      ></el-table-column>

      <el-table-column
        prop="postno"
        label="快递单号"
        width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="邮寄授权书原件"
        width="140"
      >
        <template slot-scope='scope'>
          <span v-if="scope.row.isoriginal == 1">邮寄</span>
          <span v-else>不邮寄</span>
        </template>
        <!-- <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.isoriginal"
            true-label="1"
            disabled
          ></el-checkbox>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="reportno"
        class-name="reportno"
        label="报案号"
        width="160"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        width="90"
      >
        <template slot-scope="scope">
          <!-- <span class='linkurl' v-if="scope.row.status=='1'" @click="edit(scope.row.id)">编辑</span>
          <span class='linkurl' v-if="scope.row.status !='1'" @click="look(scope.row.id)">查看</span>-->
          <span
            class="linkurl"
            v-if="scope.row.type=='1' && scope.row.statusex=='32'"
            @click="printing(scope.row.id,scope.row.camainno,scope.row.type,scope.row.statusex)"
          >打印</span>
          <span
            class="linkurl"
            v-if="scope.row.status=='1'"
            @click="delList(scope.row.id)"
          >删除</span>
        </template>
      </el-table-column>
    </el-table>
    <!--新增条件-->
    <el-dialog
      title="案件选择"
      :visible.sync="dialogTableVisible"
      center
      top="0"
      style="padding:10vh 0"
    >
      <div style="padding:0 20px">
        <el-form @submit.native.prevent>
          <el-input
            placeholder="请输入申请编号/客户姓名"
            v-model="anjianSeach"
            @keyup.enter.native="anjianpage=1,getcontracts()"
            size="small"
          >
            <i
              slot="suffix"
              @click="anjianpage=1,getcontracts()"
              style="cursor:pointer;line-height:32px;"
              class="el-icon-search"
            ></i>
          </el-input>
        </el-form>
      </div>
      <el-table
        :data="gridData"
        height="440"
        :cell-class-name="getCellClass"
        :header-cell-class-name="getCellClass"
      >
        <el-table-column
          property="camainno"
          label="申请编号"
          width="190"
        ></el-table-column>
        <el-table-column
          property="borrowername"
          label="客户姓名"
        ></el-table-column>
        <el-table-column
          property="card"
          label="证件号码"
          width="220"
        ></el-table-column>
        <el-table-column
          property="refData.statusname"
          label="案件状态"
          width="100"
        ></el-table-column>
        <el-table-column
          label="操作　　"
          fixed="right"
          align="right"
        >
          <template slot-scope="scope">
            <span
              class="linkurl linkurls"
              @click="add(scope.row.id)"
            >选择</span>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col
        :span="24"
        style="text-align:right;padding-right:20px"
        class="toolbar"
        v-show="!!anjiantotal"
      >
        <Page
          :current="anjianpage"
          :page-size="anjianpagesize"
          :total="anjiantotal"
          @on-change="anjianhandleCurrentChange"
          @on-page-size-change="anjianhandleSizeChange"
          show-sizer
          show-total
        ></Page>
      </el-col>
    </el-dialog>
    <!--工具条-->
    <el-col
      :span="24"
      style="text-align:right"
      class="toolbar"
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
import { insuList, matching, del, getcontract } from "@/api/afterloan";
import { postPrintInsurance, getApplicationNo2 } from "@/api/credit";
import filterTag from "@/components/FilterTag/filtertag";
import { collectReplace } from "@/utils/index";
export default {
  components: {
    filterTag
  },
  data() {
    return {
      apply: [], //申请状态列表
      business: [], //案件状态列表
      businessStatus: "", //案件状态
      applyStatus: "", //申请状态
      applicationno: "", //搜索内容
      tableData: [],
      total: 0,
      pagesize: 10,
      page: 1,
      /*新增案件 */
      gridData: [],
      anjianSeach: "", //新增案件晒选
      anjiantotal: 0,
      anjianpagesize: 10,
      anjianpage: 1,
      dialogTableVisible: false,
      listLoading: false,
      timer: null
    };
  },
  mounted() {
    this.getlists(); //获取保险列表
    this.getcontracts(); //获取案件列表
    this.status(); //获取筛选状态
  },
  methods: {
    //获取数据
    getlists() {
      var businessStatus = "";
      var applyStatus = "";
      this.applicationno = "";
      this.anjianSeach = "";
      if (this.businessStatus == "") {
        businessStatus = 0;
      } else {
        businessStatus = this.businessStatus;
      }
      if (this.applyStatus == "") {
        applyStatus = 0;
      } else {
        applyStatus = this.applyStatus;
      }
      let para = {
        PageIndex: this.page,
        PageSize: this.pagesize,
        AppStatus: applyStatus,
        Status: businessStatus
      };
      this.listLoading = true;
      insuList(para).then(res => {
        this.listLoading = false;
        if (res.data.success) {
          this.total = res.data.data.recordsTotal;
          this.tableData = collectReplace(res.data.data.data, {
            appdate: {
              key: "appdate",
              fun: function(value) {
                if (value == "0001-01-01 00:00:00") {
                  return "";
                } else {
                  return value;
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
    //获取状态
    status() {
      this.apply = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001JBGE21TW0000A05"
      ];
      var item = {
        code: "",
        name: "全部"
      };
      this.apply.unshift(item);
      for(var i=0;i<this.apply.length;i++){
        if(this.apply[i].code=='1'){
          this.apply[i].name = '未提交'
        }
      }
      this.business = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001HX7P986J0000A1J"
      ];
      this.business.unshift(item);
    },
    changeapplyStatus(tag) {
      this.applyStatus = tag.code;
      this.page = 1;
      this.getlists();
    },
    changebusinessStatus(tag) {
      this.businessStatus = tag.code;
      this.page = 1;
      this.getlists();
    },
    //获取案件
    getcontracts() {
      this.businessStatus = "";
      this.applyStatus = "";
      let para = {
        PageIndex: this.anjianpage,
        PageSize: this.anjianpagesize,
        key: this.anjianSeach
      };
      getcontract(para).then(res => {
        this.listLoading = false;
        if (res.data.success) {
          this.anjiantotal = res.data.data.recordsTotal;
          this.gridData = res.data.data.data;
          console.log("anjian", this.gridData);
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
      if (this.businessStatus != "" || this.applyStatus != "") {
        isDefault = false;
      }
      this.businessStatus = "";
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
      let para = {
        PageIndex: this.page,
        PageSize: this.pagesize,
        key: this.applicationno
      };
      matching(para).then(res => {
        this.listLoading = false;
        if (res.data.success) {
          this.total = res.data.data.recordsTotal;
          this.tableData = res.data.data.data;
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    },
    //打印
    printing(Id, Gw, type, statusex) {
      if (type == "1" && statusex == "32") {
        var para = {
          OrderId: Id
        };
        postPrintInsurance(para).then(res => {
          if (res.data.success) {
            var url =
              window.g.ApiUrl +
              "S120017/download/" +
              res.data.data +
              "/" +
              Gw +
              ".pdf";
            window.open(url, "_blank");
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
        });
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
    anjianhandleSizeChange(val) {
      this.anjianpagesize = val;
      this.getcontracts();
    },
    anjianhandleCurrentChange(val) {
      this.anjianpage = val;
      this.getcontracts();
    },
    add(id) {
      this.$router.push({
        path: "/dealer/afterloan/addinsulist/" + id
      });
    },
    //删除
    delList(id) {
      console.log(id);
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          del(id).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getlists();
            } else {
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    look(id) {
      this.$router.push({
        path: "/dealer/afterloan/lookinsulist/" + id
      });
    },
    edit(id) {
      this.$router.push({
        path: "/dealer/afterloan/editinsulist/" + id
      });
    },
    getCellClass({ row, column, columnIndex }) {
      return "getCellClass";
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
  width: 82px;
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
  width: 470px;
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
.insulist /deep/ .el-dialog__body {
  overflow: hidden;
}
.insulist /deep/ .el-dialog {
  width: 800px;
}
.insulist /deep/ .el-dialog--center .el-dialog__body {
  padding: 20px 0 20px;
}
/*.insulist /deep/ .getCellClass > .cell {
  padding-left: 24px !important;
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

