<template>
  <section>
    <div class='app-container' style="margin-top:5px;position:relative;">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator="/" class="app-breadcrumb">
            <el-breadcrumb-item class="firstbread">佣金结算</el-breadcrumb-item>
            <el-breadcrumb-item>个人佣金</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="6" class="topsearch topbtnbasic" style="margin:3px 0 8px 0;">
        </el-col>
      </el-row>
      <!--搜索-->
      <el-row class="searchbar">
        <el-col :span='24'>
          <div class="blocktime">
            <ul class="btnul">
              <li>
                <el-button size="medium" type="text" class="btnfirst">返利名称 </el-button>
              </li>
              <li>
                <el-input size="small" v-model="filters.title" name="title"></el-input>
              </li>
            </ul>
          </div>
          <div class="blocktime">
            <span class="demonstration">合同激活</span>
            <el-date-picker v-model="filters.datetitle" format="yyyy - MM - dd " size="small" prefix-icon="el-icon-date" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="blocktime">
            <el-button size="small" type="success" class="btncolor" @click="getlists">查询</el-button>
          </div>
        </el-col>
        <el-col :span='24'>
        </el-col>
      </el-row>
      <!--列表-->
      <el-table :data='lists' highlight-current-row v-loading='listLoading' style='width: 100%;min-height:480px' stripe>
        <el-table-column align='center' width='150' label="返利名称" prop="commmissionname">
        </el-table-column>
        <el-table-column align='center' label="人员类型" prop="ptype">
        </el-table-column>
        <el-table-column align='center' label="姓名" prop="pname">
        </el-table-column>
        <el-table-column align='center' label="手机" prop="phonenum">
        </el-table-column>
        <el-table-column align='center' label="身份证" prop="idcardnum">
        </el-table-column>
        <el-table-column align='center' label="金额" prop="money">
        </el-table-column>
      </el-table>
      <!--选择总条数-->
      <!--工具条-->
      <el-col :span='4' :offset='20' class='toolbar'>
        <Page :current="page" :total="total" :page-size="pagesize" @on-change="handleCurrentChange" @on-page-size-change="handleSizeChange" simple></Page>
      </el-col>
    </div>
  </section>
</template>

<script>
  import {
    getPerson
  } from '@/api/commission'
  import Moment from 'moment/moment'
  export default {
    data() {
      return {
        id: this.$route.params.id,
        showbatch: false,
        lists: [],
        cols: [],
        total: 0,
        pagesize: 10,
        page: 1,
        listLoading: false,
        sels: [],
        selLength: 0,
        filters: {
          title: '',
          datetitle: ''
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pagesize = val
        this.getlists()
      },
      handleCurrentChange(val) {
        this.page = val
        this.getlists()
      },
      getlists() {
        let para = {}
        para = {
          page: this.page,
          title: this.filters.title,
          startDate: this.filters.datetitle[0] ? Moment(this.filters.datetitle[0]).format('YYYY-MM-DD') : '',
          endDate: this.filters.datetitle[1] ? Moment(this.filters.datetitle[1]).format('YYYY-MM-DD') : '',
          pagesize: this.pagesize
        }
        this.listLoading = true
        getPerson(para).then(res => {
           this.listLoading = false
          if (res.data.success) {
            this.total = res.data.result.recordsTotal
            this.lists = res.data.result.data
            this.cols = this.cols
           
           }else{
             this.$message({
              type: "error",
              message: res.data.message
            });
           }
        })
      }
    },
    mounted() {
      this.getlists()
    }
  }
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

