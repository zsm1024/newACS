<template>
  <section>
    <div class='app-container' style="margin-top:5px;position:relative;">
      <el-row>
        <el-col :span="18">

          <el-breadcrumb
            separator="/"
            class="app-breadcrumb"
          >
            <el-breadcrumb-item class="firstbread">信贷审批</el-breadcrumb-item>
            <el-breadcrumb-item>特殊业务</el-breadcrumb-item>
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

      <!--搜索-->

      <!--列表-->
      <el-table
        :data='lists'
        highlight-current-row
        v-loading='listLoading'
        class="tablelist custom-card-grid"
        stripe
      >

        <el-table-column
          align='left'
          width='150'
          label="申请编号"
          prop="applicationno"
        >
        </el-table-column>
        <el-table-column
          align='left'
          label="主借人"
          prop="borrower"
        >
        </el-table-column>
        <el-table-column
          align='left'
          label="业务名称"
          prop="wfname"
        >
        </el-table-column>
        <el-table-column
          align='left'
          label="特殊原因"
          prop="specialreason"
        >
        </el-table-column>
        <el-table-column
          align='left'
          label="启动人"
          prop="starter"
        >
        </el-table-column>

      </el-table>
      <!--选择总条数-->

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
  </section>
</template>

<script>
import { specialtask } from "@/api/move";

export default {
  data() {
    return {
      id: this.$route.params.id,
      name: "",
      showbatch: false,
      lists: [],
      cols: [],
      total: 0,
      pagesize: 10,
      page: 1,
      listLoading: false,
      sels: [],
      selLength: 0,
      value1: "",
      value2: ""
    };
  },
  methods: {
    searchname() {
      this.getlists();
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

      specialtask(para).then(res => {
        if (res.data.success) {
          this.total = res.data.data.recordsTotal;
          this.lists = res.data.data.data;
          this.cols = this.cols;
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
  // height: 70px;
  line-height: 32px;
  height: 32px;
}
</style>

