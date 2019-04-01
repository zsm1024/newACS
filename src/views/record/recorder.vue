<template>
  <section>
    <el-row>
      <el-col :span="18">
        <el-breadcrumb separator="/" class="app-breadcrumb">
          <el-breadcrumb-item class="firstbread">抵押备案</el-breadcrumb-item>
          <el-breadcrumb-item>备案资料管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6" align="right" class="topmiddle" style="padding-right:0">
        <span class="add" @click="add_date">新增</span>
      </el-col>
    </el-row>
    <!--搜索-->
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="overflow:hidden"
      inline
      class="searchbar recorderseach custom-card-filter"
      :span="24"
    >
      <el-form-item class="blocktime">
        <span class="demonstration">提交时间</span>
        <el-date-picker
          v-model="form.datetitle"
          format="yyyy-MM-dd"
          size="small"
          style="width:250px"
          prefix-icon="el-icon-date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="blocktime" style="width:100%">
        <strong class="demonstration">业务状态</strong>
        <filter-tag :current="form.status" @on-change="changebusinessStatus" :tags="types"></filter-tag>
      </el-form-item>
    </el-form>
    <el-table
      :data="lists"
      highlight-current-row
      v-loading="listLoading"
      class="tablelist custom-card-grid"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column align="center" width="150" label="申请时间" prop="cdate"></el-table-column>
      <el-table-column align="center" width="150" label="备案原因" prop="recordreason"></el-table-column>
      <el-table-column align="center" width="150" label="期望备案时间" prop="expectrecordtime"></el-table-column>
      <el-table-column align="center" width="80" label="联系人" prop="linkman"></el-table-column>
      <el-table-column align="center" width="80" label="业务状态" prop="state"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.state == '退回'||scope.row.state == '草稿'">
            <span class="linkurl" @click="del(scope.row.id)">删除</span>
            <span class="linkurl" @click="view(scope.row.id)">查看</span>
            <span class="linkurl" @click="addFile(scope.row.id)">补充文件</span>
          </div>
          <div v-else>
            <span class="linkurl" @click="view(scope.row.id)">查看</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" label="内部留言">
        <template slot-scope="scope" v-if="scope.row.state != '已办'">
          <span
            v-show="scope.row.state=='退回'||scope.row.state=='草稿'"
            class="linkurl"
            @click="huifu_tog = true,huifu_cont='',msgid=scope.row.id"
          >回复</span>
          <span class="linkurl" @click="dialogTableVisible = true,msgList(scope.row.id)">查看</span>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" style="text-align:right" class="toolbar" v-show="total > 0">
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
    <el-dialog title :visible.sync="dialogView" width="80%"></el-dialog>
    <!--回复相关-->
    <div class="fixed" v-if="huifu_tog">
      <div class="hfbox">
        <p>回复</p>
        <el-form ref="form" label-width="60px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注：">
                <el-input
                  type="textarea"
                  v-model="huifu_cont"
                  maxlength="200"
                  placeholder="最多输入200字"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="cz_buton">
          <span @click="cancel">取消</span>
          <span @click="determine">确定</span>
        </div>
      </div>
    </div>
    <!--对话列表-->
    <el-dialog title="留言记录" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="cdate" label="日期" width="170"></el-table-column>
        <el-table-column property="cname" label="姓名" width="200"></el-table-column>
        <el-table-column property="content" label="内容"></el-table-column>
      </el-table>
      <div class="cz_buton" style="margin-top:10px">
        <span @click="dialogTableVisible = false">关闭</span>
        <span @click="dialogTableVisible = false,huifu_tog = true,huifu_cont=''">回复</span>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import {
  beianStatus,
  recorderList,
  delRecordApply,
  getMESSAGEList,
  saveMESSAGE
} from "@/api/record";
import Cookies from "js-cookie";
import Moment from "moment/moment";
import { postaddMsg } from "@/api/credit";
import filterTag from "@/components/FilterTag/filtertag";
export default {
  components: {
    filterTag
  },
  data() {
    return {
      types: [], //状态数组
      msgid: "", //回复的id
      form: {
        status: "",
        datetitle: ""
      },
      lists: [],
      total: 0,
      pagesize: 10,
      page: 1,
      listLoading: false,
      dialogView: false,
      huifu_cont: "", //恢复内容
      huifu_tog: false, //回复状态
      //对话部分
      gridData: [],
      dialogTableVisible: false
    };
  },
  methods: {
    changebusinessStatus(tag) {
      this.form.status = tag.code;
      this.page = 1;
      this.getlists();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlists();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlists();
    },
    dateFormat: function(row, column) {
      var moment = require("moment");
      var date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
    //获取状态
    status() {
      let para = "00001LZ1RXSQV0000A2W";
      let that = this;
      beianStatus(para).then(res => {
        //console.log(res)
        that.types = res.data.data;
        var item = {
          code: "",
          name: "全部"
        };
        that.types.unshift(item);
      });
    },
    //获取数据列表
    getlists() {
      let para = {
        ID: "1123123",
        USERID: Cookies.get("userId"),
        CUSER: Cookies.get("userId"),

        // USERID:'admin',
        // CUSER:'admin',

        pageNum: this.page - 1,
        pageSize: this.pagesize,
        STATE: this.form.status,
        StartDate: this.form.datetitle[0]
          ? Moment(this.form.datetitle[0]).format("YYYY-MM-DD")
          : "",
        EndDate: this.form.datetitle[1]
          ? Moment(this.form.datetitle[1]).format("YYYY-MM-DD")
          : ""
      };
      console.log(para);
      this.listLoading = true;
      recorderList(para).then(res => {
        this.listLoading = false;
        if (res.data.success) {
          this.total = res.data.data.pageCount;
          this.lists = res.data.data.pageData;
          for (let i = 0; i < this.lists.length; i++) {
            if (
              this.lists[i].expectrecordtime != null &&
              this.lists[i].expectrecordtime != ""
            ) {
              this.lists[i].expectrecordtime = this.lists[
                i
              ].expectrecordtime.split(" ")[0];
            }
          }
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }

        console.log("res", res);
      });
    },
    filters: {
      formatDate(time) {
        var moment = require("moment");
        if (time === undefined) {
          return "";
        }
        return moment(time).format("YYYY-MM-DD");
      }
    },
    //新增
    add_date() {
      this.$router.push({
        path: "/dealer/record/addRecord/" + 0 + "/" + 0
      });
    },
    //查看
    view(id) {
      this.$router.push({
        path: "/dealer/record/addRecord/" + 1 + "/" + id
      });
      // this.dialogView=true
    },
    //补充
    addFile(id) {
      this.$router.push({
        path: "/dealer/record/addRecord/" + 0 + "/" + id
      });
      // this.dialogView=true
    },
    //删除
    del(id) {
      let para = {};
      para = {
        id: id,
        cuser: "1123123"
      };
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delRecordApply(para).then(res => {
            console.log("del", res);
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "删除成功！"
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
    //修改
    xiugai(date) {
      console.log(date);
    },
    //获取留言列表
    msgList(id) {
      getMESSAGEList(0, id).then(res => {
        console.log(res);
        this.msgid = id;
        this.gridData = res.data.data;
      });
    },
    //取消回复
    cancel() {
      this.$message({
        message: "取消回复",
        type: "warning"
      });
      this.huifu_tog = false;
    },
    //确定回复
    determine() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      var nowDate = year + "-" + month + "-" + day;
      if (this.huifu_cont == "") {
        this.$message({
          message: "回复内容不能为空",
          type: "warning"
        });
        return;
      } else {
        let para = {};
        para.id = "";
        para.MSGTYPE = "2";
        para.CONTENT = this.huifu_cont;
        para.CDATE = nowDate;
        para.CNAME = JSON.parse(localStorage.getItem("dealerinfo")).orgName;
        para.USERID = Cookies.get("userId");
        para.CUSER = Cookies.get("userId");

        // para.CUSER='admin'
        // para.USERID='admin'

        para.RECORDID = this.msgid;
        para.SOMORTGAGEMATERIALID = "";

        saveMESSAGE(para).then(res => {
          console.log("留言", res);
        });
        this.$message({
          message: "成功回复",
          type: "success"
        });
        this.huifu_tog = false;
      }
    }
  },
  mounted() {
    this.getlists();
    this.status(); //获取状态
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .el-date-editor{
//   width: 300px
// }
.recorderseach .el-form-item {
  margin-bottom: 0px !important;
  margin-top: 10px !important;
}
.el-button {
  span {
    color: #fff !important;
  }
}
.el-form-item__label {
  color: #000000 !important;
}
.fixed {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  z-index: 1;
}
.hfbox {
  width: 500px;
  padding: 10px 16px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
}
.hfbox p {
  padding: 2px 0 6px;
  border-bottom: 1px solid #bbb;
}
// .el-form-item{
//   margin:0
// }
.cz_buton {
  text-align: right;
}
.cz_buton span {
  display: inline-block;
  padding: 4px 20px;
  margin-left: 10px;
  cursor: pointer;
}
.cz_buton span:first-child {
  background-color: #bbb;
}
.cz_buton span:last-child {
  background-color: #6db8ef;
  color: #fff;
}
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
.tablelist /deep/ .el-table__row td .cell {
  line-height: 24px;
}
</style>

