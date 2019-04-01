<template>

  <div class='app-container' style="margin-top:5px;position:relative;">
    <el-row>
      <el-col :span="18">

        <el-breadcrumb
          separator="/"
          class="app-breadcrumb"
        >
          <el-breadcrumb-item class='firstbread'>信贷审批</el-breadcrumb-item>
          <el-breadcrumb-item>移动进件</el-breadcrumb-item>
        </el-breadcrumb>

      </el-col>
      <el-col
        :span="6"
        class="topsearch topbtnbasic" style="margin:3px 0 8px 0"
      >
        <el-input
          placeholder="借款人姓名"
          suffix-icon="el-icon-search"
          class="searchinput"
          size="small"
          v-model="name"
          @keyup.enter.native="searchname"
        >
        </el-input>
      </el-col>
    </el-row>

    <!--列表-->
    <el-table
      :data='lists'
      highlight-current-row
      v-loading='listLoading'
      @selection-change="handleSelectionChange"
      class="tablelist custom-card-grid"
      stripe
    >

      <el-table-column
        align='left'
        :prop='col.field'
        :label='col.title'
        v-for='(col, index) in cols'
        :key='index'
      >
      </el-table-column>
      <el-table-column
        label='操作'
        align='center'
        width='200'
      >
        <template slot-scope='scope'>
          <span
            class='linkurl'
            @click="tozhuan(scope.row)"
          >转换订单</span>

          <span
            class='linkurl'
            @click="todel(scope.row)"
          >删除</span>
        </template>
      </el-table-column>

    </el-table>

    <!--工具条-->
    <el-col
      :span='24'
      style="text-align:right"
      class='toolbar'
      v-if="!!total"
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
import { getMove, moveDel, moveToacs } from "@/api/move";
export default {
  data() {
    return {
      name: "",
      id: this.$route.params.id,
      showbatch: false,
      lists: [],
      cols: [
        { title: "经销商", field: "jxsname" },
        { title: "借款人", field: "username" },
        { title: "车辆信息", field: "carinfo" },
        { title: "申请时间", field: "applicationdate" }
      ],
      total: 0,
      pagesize: 10,
      page: 1,
      listLoading: false,
      sels: [],
      selLength: 0
    };
  },
  methods: {
    tozhuan(row) {
      let para = {};
      para = {
        id: row.id
      };
      this.$confirm("确定转换订单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          moveToacs(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: res.data.data
              });
              this.getlists();
              this.listLoading = false;
            } else {
              this.listLoading = false;
              this.$message({
                type: "error",
                message: "转换失败，请联系管理员"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消转换"
          });
        });
    },
    todel(row) {
      let para = {};
      para = {
        id: row.id
      };
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          moveDel(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getlists();
            } else {
              this.$message({
                type: "error",
                message: "添加失败，请联系管理员"
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
    searchname() {
      this.getlists();
    },
    handleSelectionChange(val) {
      if (val.length > 0) {
        this.showbatch = true;
      } else {
        this.showbatch = false;
      }
      this.selLength = val.length;
      this.sels = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlists();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlists();
    },
    getlists() {
      let para = {};
      para = {
        PageIndex: this.page,
        PageSize: this.pagesize,
        name: this.name
      };
      this.listLoading = true;

      getMove(para).then(res => {
        if (res.data.success) {
          this.total = res.data.data.recordsTotal;
          this.lists = res.data.data.data;
          this.cols = this.cols;
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
        this.listLoading = false;
      });
    }
  },
  mounted() {
    this.getlists();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb{
    line-height: 52px;
    height: 37px;
}
.topbtnbasic {
  text-align: right;
  line-height: 32px;
  height: 32px;
}
</style>

