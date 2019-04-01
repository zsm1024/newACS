<template>
<section>
  <div class='app-container' style="margin-top:5px;position:relative;">
      <el-row>
        <el-col :span="18" >
            
            <el-breadcrumb separator="/" class="app-breadcrumb">
                <el-breadcrumb-item class="firstbread">佣金结算</el-breadcrumb-item>
                <el-breadcrumb-item>返利管理</el-breadcrumb-item>
            </el-breadcrumb>
            
        </el-col>
        <el-col :span="6" class="topsearch topbtnbasic" style="margin:3px 0 8px 0;">
          
        </el-col>
      </el-row>
 
      <!--搜索-->
      <el-row class="searchbar">
          <el-col :span='24'>
            <div class="blocktime">
                <span class="demonstration">合同激活</span>
                <el-date-picker
                  v-model="filters.datetitle"
                  format="yyyy - MM - dd "
                  size="small"
                  @change='getlists()'
                  prefix-icon="el-icon-date"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </div>
            
          </el-col>
          <el-col :span='24'>
            <div class="blocktime">
              <span class="demonstration">案件状态</span>
              <filter-tag
                :current='filters.status'
                @on-change='changeStatusorder'
                :tags="options"
              ></filter-tag>
            </div>
          </el-col>
      </el-row>  
            <!--列表-->
        <el-table :data='lists' highlight-current-row v-loading='listLoading'  style='width: 100%;min-height:480px' stripe>
           
           
           <el-table-column
              align='center'  
              width='150'
              label="状态"
              prop="name">
            </el-table-column>

            <el-table-column
              align='center'
              label="合同激活开始时间"
              :formatter="dateFormat"
              prop="sdate">
            </el-table-column>
            <el-table-column
              align='center'
              :formatter="dateFormat"
              label="合同激活截止时间"
              prop="edate">
            </el-table-column>
            <el-table-column
              align='center'
              label="返利名称"
              prop="title">
            </el-table-column>
            <el-table-column
            width="140px"
              align='center'
              label="基本服务费（元）"
              prop="commission">
            </el-table-column>
            <el-table-column
            width="138px"
              align='center'
              label="应发总计金额（元）应开票金额"
              prop="realmoney">
            </el-table-column>
            
             <el-table-column label='操作'  align='center'  width='200' >
                <template  slot-scope='scope'>
                    <span class='linkurl' @click="showinfo(scope)" >查看</span>
                    <span class='linkurl' v-if="scope.row.status == '0001'" @click="sendConfrim(scope)">确认</span>
                    <span class='linkurl' v-if="scope.row.status == '0002' || scope.row.status == '0005' " @click="sendPost(scope)">邮寄</span>
                    <span class='linkurl'  @click="doAccount(scope)">到账</span>
                </template>
            </el-table-column>
                   
            
        </el-table>
        <!--选择总条数-->
        <el-dialog title="邮寄信息" :visible.sync="dialogActiveVisible" width="80%" >
          <el-row>
            <el-form label-width="80px">
              <el-button type="primary" @click="doSendPost" style="margin-bottom:10px">确认邮寄</el-button>
             
              
              <el-button type="success" class="btncolor" @click="addSendInfo" >增加邮寄信息</el-button>
              
              
              
            </el-form>
            <el-col style="margin-bottom:5px;">
              <div style="margin-top:5px;margin-bottom:5px"><el-button size="small" >流程记录</el-button></div>
            <el-table
              border
              :data="twflist"
              style="width: 100%">
              <el-table-column
                align="center"
                prop="node"
                label="流程节点"
                width="180">
                
              </el-table-column>
              <el-table-column
               align="center"
                prop="cdate"
                label="操作时间"
                width="180">
                <template slot-scope="scope">
                  {{scope.row.cdate | formatDate}}                  
                </template>
              </el-table-column>
              <el-table-column
               align="center"
                prop="receiptno"
                label="退回发票号">
                
              </el-table-column>
              <el-table-column
               align="center"
                prop="remark"
                label="备注">
               
              </el-table-column>
              
            </el-table>
            </el-col>
            
            <div style="margin-top:5px;margin-bottom:5px"><el-button size="small" > 邮寄信息</el-button></div>
            <div >
               <table class="tablelist1">
                 <thead >
                  <tr>
                    <th>发票号</th>
                    <th>快递单号</th>
                    <th>发票开具销售方名称</th>
                    <th>发票金额</th>
                    <th>操作</th>
                  </tr>
                 
                 </thead>
                 
                  <tr v-for="(post, key) in posts" :key='key'>
                    <td> <el-input v-model="post.receiptno"  :readonly="post.readonly"></el-input></td>
                    <td > <el-input  v-model="post.expressno" :readonly="post.readonly"></el-input></td>    
                    <td ><el-input  v-model="post.dealer" :readonly="post.readonly"></el-input></td>
                    <td > <el-input  v-model="post.receiptmoney" :readonly="post.readonly"></el-input></td> 
                    <td style="text-align:center"> <el-button type="danger" v-show="!post.readonly" @click="deleteSendInfo(key)" >移除</el-button></td>    
                  </tr>
                  
                </table>
               
               
                
               
            </div>
             
          </el-row>
        </el-dialog>
        <!--选择总条数-->
        <el-dialog title="确认信息" :visible.sync="dialogFormVisible" width="70%" >
        <el-button type="warning"  @click="doPrint" >打印</el-button>
        <el-button type="primary" @click="doConfirm" >确认（须有回执附件）</el-button>
        <el-row>
          <el-col :span="15">
                <span>注意:以下信息需要填写回执后打印盖章后并通过上传附件功能将回执传至系统.</span>
          </el-col>
          <el-col :span="9">
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  :headers="uploadHeader"
                  :action="acitonUrl"
                  :on-success="hadleSuccess"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-error="handleError"
                  :before-remove="beforeRemove"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button size="small" type="primary">选取文件</el-button>
                </el-upload>
          </el-col>
        </el-row>
 
        </el-dialog>

        <el-dialog title="查看返利明细" :visible.sync="dialogTableVisible" width="65%" >
          <el-form ref="form"  :inline="true" >
            <el-row>
              <el-col :span="18" :offset="1">
                  <el-button style="padding:10px" type='warning' size="mini">返</el-button><span style="color:#000;font-size:20px;margin-left:10px;">{{fanliinfo.TITLE}}</span>
              </el-col>
              <el-col :span="2" :offset="2">
                  <el-button type="success" size="mini" class="btncolor" style="margin-left:20px" @click="doExport">导出</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18" :offset="2">
                <el-col :span="10" >
                <el-form-item label="合同激活：">
                  <span>{{fanliinfo.sdate | formatDate}} 至 {{fanliinfo.edate | formatDate}}</span>
                </el-form-item>
                </el-col>
                <el-col :span="12" >
                <el-form-item label="经销商：">
                  <span>{{fanliinfo.dealername}}</span>
                </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="3" :offset="1" style="padding-top:15px">
                <span > 发放总金额</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18" :offset="2">
                <el-col :span="10" >
                <el-form-item label="合同数量：">
                   <span>{{fanliinfo.contractnum}}</span>
                </el-form-item>
                </el-col>
                <el-col :span="12" >
                <el-form-item label="车辆价格：">
                  <span>{{fanliinfo.totalmoney}}</span>
                </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="2" :offset="1">
                <span>{{fanliinfo.realmoney}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18" :offset="2">
                <el-col :span="10" >
                <el-form-item label="贷款金额：">
                  <span>{{fanliinfo.loanmoney}}</span>
                </el-form-item>
                </el-col>
                <el-col :span="12" >
                <el-form-item label="基本服务费：">
                  <span>{{fanliinfo.commission}}</span>
                </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18" :offset="2">
                <el-col :span="10" >
                <el-form-item label="激励金额：">
                  <span>{{fanliinfo.motivatemoney}}</span>
                </el-form-item>
                </el-col>
                <el-col :span="10" >
                <el-form-item label="调整原因：">
                  <span>{{fanliinfo.adjustreason}}</span>
                </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18" :offset="2">
                <el-form-item label="附件（调整项）：">
                  <ul>
                    <li  v-for="(attach,index) in attachs" :key="index" @click="getAttach(attach.id)">{{attach.name}}</li>
                  </ul>
                  
                </el-form-item>
             </el-col>
            </el-row>
          </el-form>
          <el-table
            :data="tableData6"
            border
            style="width: 100%">
            
            <el-table-column
              prop="customer"
              label="客户姓名">
            </el-table-column>
            <el-table-column
              prop="contractno"
              label="合同号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="activedate"
              :formatter="dateFormat"
              label="激活日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="vin"
              label="车架号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="money"
              sortable
              label="车价">
            </el-table-column>
            <el-table-column
              prop="loanmoney"
              sortable
              label="贷款金额">
            </el-table-column>
            <el-table-column
              prop="commission"
              sortable
              label="服务费">
            </el-table-column>
          </el-table>
          <el-col :span='6' :offset='18' >
            
             <Page :current="pagelist" :total="totallist" :page-size="pagesizelist" @on-change="handleCurrentChangelist" @on-page-size-change="handleSizeChangelist" simple></Page>
          </el-col>
        </el-dialog>
        <!--工具条-->
        <el-col :span='4' :offset='20' class='toolbar'>
            
             <Page :current="page" :total="total" :page-size="pagesize" @on-change="handleCurrentChange" @on-page-size-change="handleSizeChange" simple></Page>
        </el-col>

  </div>
</section>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getFanliStatus, getFanliLists, getFanliInfo, getFanliAttachs, getFanliInfoList, PostFanliConfrim, PostFanliHistory, PostFanliDoConfirm, PostFanliGetexpresslist, PostFanliConfirmReceivemoney } from '@/api/commission'
import Moment from 'moment/moment'
import filterTag from "@/components/FilterTag/filtertag";
export default {
  components: {
    filterTag
  },
  data() {
    return {
      totalmoney: '',
      pagelist: 1,
      totallist: 0,
      pagesizelist: 7,
      uploadHeader: {
        'Authorization': 'Bearer ' + getToken()
      },
      dealerid: '',
      attachs: '',
      fanliinfo: '',
      acitonUrl: window.g.ApiUrl + window.local.localUploadUrl,
      fileid: '',
      options: [],
      value: '',
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
        datetitle: '',
        status: ''
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogActiveVisible: false,
      twflist: [],
      posts: [],
      tableData: [],
      tableData6: [],
      fileList: []
    }
  },
  methods: {
    changeStatusorder(tag) {
      this.page = 1
      this.filters.status = tag.code;
      this.getlists();
    },
    dateFormat: function(row, column) {
      var moment = require('moment')
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD')
    },
    doPrint() {
      var url = window.g.lsUrl + window.local.localFanPrintUrl + this.qaid + '?_token=Bearer ' + getToken()
      window.open(url)
      // var tempForm = document.createElement('form')
      // tempForm.action = window.g.ApiUrl + window.local.localPrintUrl + this.qaid
      // tempForm.method = 'post'
      // tempForm.target = '_blank'
      // document.body.appendChild(tempForm)
      // var tempInput = document.createElement('input')
      // tempInput.type = 'hidden'
      // tempInput.name = '_Authorization'
      // tempInput.value = 'Bearer ' + getToken()
      // tempForm.appendChild(tempInput)
      // tempForm.submit()
      // document.body.removeChild(tempForm)
    },
    getAttach(id) {
      var url = window.g.lsUrl + window.local.localFanDownloadUrl + id + '?_token=Bearer ' + getToken()
      window.open(url)
      // var tempForm = document.createElement('form')
      // tempForm.action = window.g.ApiUrl + window.local.localFanDownloadUrl + id
      // tempForm.method = 'post'
      // document.body.appendChild(tempForm)
      // var tempInput = document.createElement('input')
      // tempInput.type = 'hidden'
      // tempInput.name = '_Authorization'
      // tempInput.value = 'Bearer ' + getToken()
      // tempForm.appendChild(tempInput)
      // tempForm.submit()
      // document.body.removeChild(tempForm)
    },
    doAccount(scope) {
      this.$confirm('你确认返利到账了吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let para = {}
        para = {
          qasubid: scope.row.id
        }
        PostFanliConfirmReceivemoney(para).then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getlists()
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    doExport() {
      var url = window.g.lsUrl + window.local.localFanExportUrl + this.qaid + '/' + this.dealerid + '?_token=Bearer ' + getToken()
      window.open(url)
      // var tempForm = document.createElement('form')
      // tempForm.action = window.g.ApiUrl + window.local.localFanExportUrl + this.qaid + '/' + this.dealerid
      // tempForm.method = 'post'
      // document.body.appendChild(tempForm)
      // var tempInput = document.createElement('input')
      // tempInput.type = 'hidden'
      // tempInput.name = '_Authorization'
      // tempInput.value = 'Bearer ' + getToken()
      // tempForm.appendChild(tempInput)
      // tempForm.submit()
      // document.body.removeChild(tempForm)
    },
    doConfirm() {
      if (!this.fileid) {
        this.$message({
          type: 'error',
          message: '请先上传文件！！'
        })
        return false
      }
      let para = {}
      para = {
        id: this.qaid,
        fileId: this.fileid
      }
      PostFanliConfrim(para).then(res => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '确认成功'
          })
          this.getlists()
          this.dialogFormVisible = false
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    sendConfrim(scope) {
      this.qaid = scope.row.id
      this.dialogFormVisible = true
      // 测试用
      // this.fileid = 123123123123
    },
    showinfo(scope) {
      this.dialogTableVisible = true
      this.qaid = scope.row.id
      let para = {}
      para = {
        id: scope.row.id
      }
      getFanliInfo(para).then(res => {
        this.fanliinfo = res.data.result.data[0]
        this.dealerid = this.fanliinfo.dealer
        this.getFanliPageList()
      })
      getFanliAttachs(para).then(res => {
        this.attachs = res.data.result.data
      })
    },
    initgetfanlistate() {
      getFanliStatus().then(res => {
        this.options = res.data.result.data
      })
    },
    doSendPost() {
      let para = {}
      para = {
        qaid: this.qaid,
        expresslist: this.posts
      }
      if (this.posts.length > 0) {
        const values = this.posts.map(function(item) {
          if (!item.readonly) {
            return Number(item['receiptmoney'])
          }
        })
        if (!values.every(value => isNaN(value))) {
          var sums = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums = sums.toFixed(2)
        }

        // if (sums === this.totalmoney.toFixed(2)) {
          PostFanliDoConfirm(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.getlists()
              this.dialogActiveVisible = false
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
            }
          })
        // } else {
        //   this.$message({
        //     type: 'error',
        //     message: '填写金额之和与应开篇金额不相等，请重新填写'
        //   })
        // }
      } else {
        this.$message({
          type: 'error',
          message: '未填写邮寄信息,请先填写邮寄信息'
        })
      }
    },
    sendPost(scope) {
      var that = this
      this.dialogActiveVisible = true
      this.totalmoney = scope.row.commission
      this.qaid = scope.row.id
      let para = {}
      para = {
        id: scope.row.id
      }
      let fanli = {}
      fanli = {
        id: scope.row.id,
        page: 1,
        pagesize: 100
      }
      PostFanliHistory(fanli).then(res => {
        this.twflist = res.data.result.data
      })
      if (scope.row.status === '0005') {
        PostFanliGetexpresslist(para).then(res => {
          this.posts = res.data.result.data
          that.posts.forEach(function(value, index) {
            that.posts[index]['readonly'] = true
          })
        })
      } else {
        this.posts = []
      }
    },
    deleteSendInfo(scope) {
      this.posts.splice(scope, 1)
    },
    addSendInfo() {
      this.posts.push({
        id: '',
        receiptno: '',
        expressno: '',
        dealer: '',
        receiptmoney: '',
        readonly: false
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    hadleSuccess(response, file, fileList) {
      this.fileid = response.result.data.id
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    handleError(response, file, fileList) {
      this.$message({
        type: 'success',
        message: '上传失败，请联系管理员'
      })
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
    },
    beforeRemove(file, fileList) {
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (column.property === 'MONEY' || column.property === 'LOANMONEY' || column.property === 'COMMISSION') {
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] = sums[index].toFixed(2)
          }
        } else {
          sums[index] = '--'
        }
      })

      return sums
    },
    getFanliPageList() {
      let paralist = {}
      paralist = {
        page: this.pagelist,
        pagesize: this.pagesizelist,
        id: this.qaid,
        fileId: this.dealerid
      }
      getFanliInfoList(paralist).then(reslist => {
        console.log(reslist.data.result.recordsTotal)
        this.totallist = reslist.data.result.recordsTotal
        this.tableData6 = reslist.data.result.data
      })
    },
    handleSizeChangelist(val) {
      this.pagesizelist = val
      this.getFanliPageList()
    },
    handleCurrentChangelist(val) {
      this.pagelist = val
      this.getFanliPageList()
    },
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
        pagesize: this.pagesize,
        status: this.filters.status,
        startDate: this.filters.datetitle[0] ? Moment(this.filters.datetitle[0]).format('YYYY-MM-DD') : '',
        endDate: this.filters.datetitle[1] ? Moment(this.filters.datetitle[1]).format('YYYY-MM-DD') : ''
      }
      this.listLoading = true

      getFanliLists(para).then(res => {
        this.listLoading = false
        if (res && res.data.success) {
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
  filters: {
    formatDate(time) {
      var moment = require('moment')
      if (time === undefined) {
        return ''
      }
      return moment(time).format('YYYY-MM-DD')
    }
  },
  mounted() {
    this.initgetfanlistate()
    this.getlists()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.demonstration {
  font-weight: bold;
}
.el-form-item {
    margin-bottom: 0px !important;
}
.tablelist1{border-collapse: collapse;width:100%;border:1px solid #E1E6EB; border-left:none;}
.tablelist1 thead th{line-height:20px;padding:8px 12px; border-bottom:1px solid #E1E6EB; border-left:1px solid #E1E6EB; white-space: nowrap; text-align:center; font-weight:normal !important;letter-spacing:1px;}
.tablelist1 tbody td{text-align: center;line-height:20px;padding:8px 10px;font-size:13px;border-bottom:1px solid #E1E6EB; border-left:1px solid #E1E6EB;}
.el-button{
   span{
     color:#fff!important;
   }
  
}
.el-form-item__label {
    color: #000000!important;
}
.pline{
  clear: both;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px dashed #000000;
}
p{
  text-indent: 2em;
  span{
    color:red;
  }
}
.ziti{
  text-indent: 74px;
}
.pright{
  float: right;
  text-align: center;
}
.ml5{
  margin-left: 40px;
}
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

