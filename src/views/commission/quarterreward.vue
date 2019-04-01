<template>
<section>
  <div class='app-container' style="margin-top:5px;position:relative;">
      <el-row>
        <el-col :span="18" >
            
            <el-breadcrumb separator="/" class="app-breadcrumb">
                <el-breadcrumb-item class="firstbread">佣金结算</el-breadcrumb-item>
                <el-breadcrumb-item>季度优胜奖管理</el-breadcrumb-item>
            </el-breadcrumb>
            
        </el-col>
        <el-col :span="6" class="topsearch topbtnbasic" style="margin:3px 0 8px 0;padding-right:0">
          
        </el-col>
      </el-row>
 
      <!--搜索-->
      <el-row class="searchbar">
          <el-col :span='24'>
            <div class="blocktime">
                <span class="demonstration">年度</span>
                <el-date-picker
                  size="small"
                  v-model="filters.year"
                  @change='getlists()'
                  type="year"
                  placeholder="选择年">
                </el-date-picker>
            </div>
            <div class="blocktime">
              <ul class="btnul">
                <li><el-button size="medium" type="text" class="btnfirst" style="margin-left:26px">季度 </el-button></li>
               
                <li>
                    <el-select size="small" @change='getlists()' v-model="filters.quarter" class="selectsearch" style="width:183px" placeholder="请选择">
                      <el-option 
                        v-for="item in optionone"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      >
                      </el-option>
                    </el-select>

                </li>
              </ul>
            </div>
            
          </el-col>
          <el-col :span='24'>
            <div class="blocktime">
              <span class="demonstration">案件状态</span>
              <filter-tag
                :current='filters.state'
                @on-change='changeStatusorder'
                :tags="optiontwo"
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
              label="年度"
              prop="year">
            </el-table-column>
            <el-table-column
              align='center'
              label="季度"
              prop="qname">
            </el-table-column>
            <el-table-column
              align='center'
              label="季度优胜奖名称"
              prop="awardname">
            </el-table-column>
            <el-table-column
              align='center'
              label="总得分"
              prop="totalscore">
            </el-table-column>
            <el-table-column
              align='center'
              label="金额"
              prop="money">
            </el-table-column>
             <el-table-column label='操作'  align='center'  width='200' >
                <template  slot-scope='scope'>
                    <span class='linkurl' v-if="scope.row.status == '0001' " @click="sendConfrim(scope)">确认</span>
                    <span class='linkurl' v-if="scope.row.status == '0002' || scope.row.status == '0005' " @click="sendPost(scope)">邮寄</span>
                    <span class='linkurl'  @click="doAccount(scope)">到账</span>
                </template>
            </el-table-column>
                   
            
        </el-table>
        <!--选择总条数-->
        <el-dialog title="邮寄信息" :visible.sync="dialogActiveVisible" width="80%" >
          <el-row>
            <el-form label-width="80px">
              <el-button type="primary" style="margin-bottom:10px" @click="doSendPost">确认邮寄</el-button>
             
              
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
                prop="name"
                label="流程节点"
                width="180">
                
              </el-table-column>
              <el-table-column
               align="center"
                prop="cdate"
                label="操作时间"
                width="180">
                
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
               <table class="tablelist">
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
        <el-button type="primary" @click="doConfirm">确认（须有回执附件）</el-button>
        <el-row>
          <el-col :span="15">
                <span>注意:以下信息需要填写回执后打印盖章后并通过上传附件功能将回执传至系统.</span>
          </el-col>
          <el-col :span="9">
                <el-upload
                  ref="upload"
                  :headers="uploadHeader"
                  class="upload-demo"
                  :action="acitonUrl"
                  :on-preview="handlePreview"
                  :on-success="hadleSuccess"
                  :on-remove="handleRemove"
                  :before-upload="beforeUpload"
                  :before-remove="beforeRemove"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button slot="trigger" size="small"  type="primary">选取文件</el-button> 
                </el-upload>
          </el-col>
        </el-row>
        
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
import { getQuarter, getPoststate, getQuarterList, getTwfList, PostSendPost, GetSendPost, PostSendConfirm, PostAccount } from '@/api/commission'
import Moment from 'moment/moment'
import filterTag from "@/components/FilterTag/filtertag";
export default {
  components: {
    filterTag
  },
  data() {
    return {
      totalmoney: '',
      uploadHeader: {
        'Authorization': 'Bearer ' + getToken()
      },
      acitonUrl: window.g.ApiUrl + window.local.localUploadUrl,
      fileid: '',
      optionone: [],
      optiontwo: [],
      qaid: '',
      filters: {
        state: '',
        year: '',
        quarter: ''
      },
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
      value1: '',
      value2: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogActiveVisible: false,
      twflist: [],
      posts: [],
      tableData6: [],
      fileList: []
    }
  },
  methods: {
    changeStatusorder(tag) {
      this.page = 1
      this.filters.state = tag.code;
      this.getlists();
    },
    doPrint() {
      var url = window.g.lsUrl + window.local.localPrintUrl + this.qaid + '?_token=Bearer ' + getToken()
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
        PostAccount(para).then(res => {
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
      PostSendConfirm(para).then(res => {
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

        if (sums === this.totalmoney.toFixed(2)) {
          PostSendPost(para).then(res => {
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
        } else {
          this.$message({
            type: 'error',
            message: '填写金额之和与应开篇金额不相等，请重新填写'
          })
        }
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
      this.totalmoney = scope.row.money
      this.qaid = scope.row.id
      let para = {}
      para = {
        qasubid: scope.row.id
      }
      getTwfList(para).then(res => {
        this.twflist = res.data.result.data
      })
      if (scope.row.status === '0005') {
        GetSendPost(para).then(res => {
          this.posts = res.data.result.data
          that.posts.forEach(function(value, index) {
            that.posts[index]['readonly'] = true
          })
        })
      } else {
        this.posts = []
      }
    },
    initgetquarter() {
      getQuarter().then(res => {
        this.optionone = res.data.result.data
      })
    },
    initgetpoststate() {
      getPoststate().then(res => {
        this.optiontwo = res.data.result.data
      })
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
    beforeUpload: function(file) {
      const isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        alert('上传模板大小不能超过 100MB!')
      }
      return isLt2M
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
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
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
        state: this.filters.state,
        year: this.filters.year ? Moment(this.filters.year).format('YYYY') : '',
        quarter: this.filters.quarter,
        page: this.page,
        pagesize: this.pagesize
      }
      this.listLoading = true

      getQuarterList(para).then(res => {
        this.listLoading = false
        if ( res && res.data.success) {
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
    this.initgetquarter()
    this.initgetpoststate()
    this.getlists()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.demonstration {
  font-weight: bold;
}
.tablelist{border-collapse: collapse;width:100%;border:1px solid #E1E6EB; border-left:none;}
.tablelist thead th{line-height:20px;padding:8px 12px; border-bottom:1px solid #E1E6EB; border-left:1px solid #E1E6EB; white-space: nowrap; text-align:center; font-weight:normal !important;letter-spacing:1px;}
.tablelist tbody td{text-align: center;line-height:20px;padding:8px 10px;font-size:13px;border-bottom:1px solid #E1E6EB; border-left:1px solid #E1E6EB;}
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

