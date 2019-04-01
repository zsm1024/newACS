<template>
  <section>
    <div
      class='app-container'
      style="margin-top:5px;position:relative;"
    >
      <el-row>
        <el-col :span="17">
          <el-breadcrumb
            separator="/"
            class="app-breadcrumb"
          >
            <el-breadcrumb-item class="firstbread">信贷审批</el-breadcrumb-item>
            <el-breadcrumb-item>放款管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col
          :span="7"
          class="topsearch topbtnbasic"
          style="margin:3px 0 8px 0"
        >
          <el-form @submit.native.prevent>
            <el-autocomplete
              style="width:100%"
              :fetch-suggestions="querySearchAsync"
              @select="handleSelect"
              placeholder="姓名、申请编号、手机号、VIN号、发动机号"
              :value="filters.ApplicationNo"
              @focus="clearNormalFilter"
              v-model="filters.ApplicationNo"
              @keyup.enter.native="searchname"
              size="small"
            >
              <i
                slot="suffix"
                @click="searchname()"
                style="cursor:pointer"
                class="el-icon-search"
              ></i>
            </el-autocomplete>
          </el-form>
        </el-col>
      </el-row>
      <!--搜索-->
      <el-row class="searchbar custom-card-filter">
        <el-col :span='24'>
          <el-col :span='8'>
            <div class="blocktime">
              <span class="demonstration">提报时间</span>
              <el-date-picker
                v-model="value1"
                class="time250"
                unlink-panels
                format="yyyy-MM-dd"
                size="small"
                prefix-icon="el-icon-date"
                @change='changeValue1'
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span='8'>
            <div class="blocktime">
              <span class="demonstration">放款申请</span>
              <el-date-picker
                v-model="value2"
                class="time250"
                unlink-panels
                format="yyyy-MM-dd"
                @change='changeValue2'
                size="small"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-col>

        </el-col>
        <el-col :span='24'>
          <div class="blocktime">
            <span class="demonstration">案件状态</span>
            <filter-tag
              :current='filters.Status'
              @on-change='changeStatusorder'
              :tags="itemnav"
            ></filter-tag>
          </div>
        </el-col>
      </el-row>
      <!--列表-->
      <el-table
        :data='lists'
        highlight-current-row
        v-loading='listLoading'
        class="tablelist custom-card-grid"
        stripe
      >
        <!-- <el-table-column :prop="cols.field" :formatter="dateFormat" :label="cols.title" width='152' v-for="(cols, index) in cols" :key="index" align="center" >
			  </el-table-column> -->
        <el-table-column
          align='left'
          width='135'
          prop='camainno'
          label='申请编号'
        >
          <template slot-scope='scope'>
            <a
              v-if="scope.row.async_extend_mian"
              title="免抵押"
              class="mian-flag"
            ></a>
            <span
              class='linkurl underline'
              style="margin-left:0"
              @click="toDetail(scope.row.id)"
            >{{scope.row.camainno}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align='left'
          :formatter="filterzi"
          prop='borrowername'
          label='客户姓名'
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align='left'
          prop='loanmoney'
          label='贷款金额'
        >
        </el-table-column>
        <el-table-column
          align='left'
          width='60'
          prop='loanperiod'
          label='期数'
        >
        </el-table-column>
        <el-table-column
          align='left'
          width='158'
          prop='vin'
          label='VIN号'
        >
        </el-table-column>
        <el-table-column
          align='left'
          width='100'
          prop='refData.statusname'
          label='案件状态'
        >
          <template slot-scope='scope'>
            <span
              v-if="scope.row.status =='4' || scope.row.status =='11'"
              style="background-color:#FAAD14;width:75px;height:22px;display:inline-block;color:#ffffff;text-align:center;border-radius:3px"
            >{{scope.row.refData.statusname}}</span>
            <span
              v-else
              style="text-align:center;width:75px;height:22px;display:inline-block;color:#333333;"
            >{{scope.row.refData.statusname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align='left'
          width='125'
          :formatter="dateFormat"
          prop='applicationdate'
          label='申请提交时间'
        >
        </el-table-column>
        <el-table-column
          align='left'
          width='125'
          :formatter="dateFormat"
          prop='spedate'
          label='申请核准时间'
        >
        </el-table-column>
        <el-table-column
          align='left'
          width='135'
          :formatter="dateFormat"
          prop='submitdate'
          label='放款提交时间'
        >
        </el-table-column>
        <el-table-column
          label='操作'
          align='center'
          fixed="right"
          width='125'
        >
          <template slot-scope='scope'>

            <el-dropdown
              class=" linkurl"
              trigger="click"
            >
              <span
                class="el-dropdown-link "
                style="font-size:12px"
              >
                更多
              </span>
              <el-dropdown-menu
                slot="dropdown"
                class="moremenu"
              >
                <el-dropdown-item @click.native="toDetail(scope.row.id)">
                  <span v-if="scope.row.status == '11' || scope.row.status == '12'">申请放款</span>
                </el-dropdown-item>
                <el-dropdown-item @click.native="showSpecial(scope.row.id)">
                  <span>特殊业务</span>
                </el-dropdown-item>
                <el-dropdown-item @click.native="doCancel(scope)">
                  <span> 撤回申请</span>
                </el-dropdown-item>
                <el-dropdown-item @click.native="doFail(scope)">
                  <span>放弃申请</span>
                </el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>

          </template>
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
          :current="filters.PageIndex"
          :page-size="filters.PageSize"
          :total="total"
          @on-change="handleCurrentChange"
          @on-page-size-change="handleSizeChange"
          show-sizer
          show-total
        ></Page>
      </el-col>

    </div>

    <el-dialog
      title="申请特殊业务"
      :visible.sync="dialogFormVisible"
      center
      width="800px"
    >
      <el-table
        v-if="tableData.length>0"
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="refData.signedname"
          label="申请状态"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="refData.reasonname"
          label="申请原因"
          width="230"
        >
        </el-table-column>
        <el-table-column
          prop="cdate"
          label="申请日期"
        >
        </el-table-column>
      </el-table>
      <el-form
        :model="form"
        ref="ruleForm"
      >
        <el-form-item
          label="合同编号"
          :label-width="formLabelWidth"
          prop="name"
        >
          <span>{{specialdata.cacontractno}}</span>
        </el-form-item>
        <el-form-item
          label="经销商"
          :label-width="formLabelWidth"
        >
          <span>{{specialdata.DealerName}}</span>
        </el-form-item>
        <el-form-item
          label="客户姓名"
          :label-width="formLabelWidth"
        >
          <span>{{specialdata.name}}</span>
        </el-form-item>
        <el-form-item
          label="证件号码"
          :label-width="formLabelWidth"
        >
          <span>{{specialdata.card}}</span>
        </el-form-item>
        <el-form-item
          label="申请时间"
          :label-width="formLabelWidth"
        >
          <span>{{specialdata.cdate}}</span>
        </el-form-item>
        <el-form-item
          label="特殊原因"
          :label-width="formLabelWidth"
          prop="reason"
          :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
        >
          <el-select
            v-model="specialdata.reason"
            placeholder="请选择"
          >
            <el-option
              v-for="item in speciallist"
              :key="item.CODE"
              :label="item.NAME"
              :value="item.CODE"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="情况说明"
          :label-width="formLabelWidth"
          prop="Md5"
          :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
        >
          <el-col :span='8'>
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeader"
              :action="acitonUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleError"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-col>
          <el-col :span='10'>
            <span>支持扩展名：.jpg .bmp .jpeg .png .gif</span>
          </el-col>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="doCancelSpecial">取 消</el-button>
        <el-button
          type="primary"
          @click="dosubSpecial"
          :disabled="btndisable"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="选择放弃原因"
      :visible.sync="failshow"
    >

      <el-select
        v-model="reason"
        placeholder="请选择放弃原因"
      >
        <el-option
          v-for="item in reasonlist"
          :key="item.CODE"
          :label="item.NAME"
          :value="item.CODE"
        >
        </el-option>
      </el-select>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="failshow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="doCancelsub"
          :disabled="btndisable"
        >确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getToken } from "@/utils/auth";
import {
  postcontractGiveup,
  postcontractCancel,
  postLoanlist,
  postSpecialsub,
  getNewSpecial,
  getSpeciallist
} from "@/api/loanlist";
import { apiCommonDeal } from "@/utils/index";
import { getApplicationNo2 } from "@/api/credit";
import filterTag from "@/components/FilterTag/filtertag";
import { addMianFlag } from "@/utils/base.js";
export default {
  components: {
    filterTag
  },
  data() {
    return {
      btndisable: false,
      tableData: [],
      uploadHeader: {
        Authorization: "Bearer " + getToken()
      },
      acitonUrl:
        window.g.ApiUrl + "S120017/upload/?Md5=&sceneid=1200170006&randomstr=",
      ContractId: "",
      failshow: false,
      reason: "",
      reasonlist: [],
      speciallist: [],
      specialdata: {
        Md5: "",
        id: "",
        cacontractid: "",
        cacontractno: "",
        DealerName: "",
        name: "",
        card: "",
        cdate: "",
        reason: "",
        fileinfo: ""
      },
      imageUrl: "",
      id: this.$route.params.id,
      showbatch: false,
      lists: [],
      itemnav: [
        {
          code: 0,
          name: "全部"
        },
        {
          code: 1,
          name: "放款待提交"
        },
        {
          code: 2,
          name: "放款待审核"
        },
        {
          code: 3,
          name: "放款退回"
        },
        {
          code: 4,
          name: "合同取消"
        },
        {
          code: 5,
          name: "放款审核通过"
        }
      ],
      cols: [
        {
          title: "申请编号",
          field: "camainno"
        },
        {
          title: "客户姓名",
          field: "borrowername"
        },
        {
          title: "贷款金额",
          field: "loanmoney"
        },
        {
          title: "期数",
          field: "loanperiod"
        },
        {
          title: "VIN号",
          field: "vin"
        },
        {
          title: "案件状态",
          field: "refData.statusname"
        },
        {
          title: "案件提报时间",
          field: "submitdate"
        },
        {
          title: "案件审批时间",
          field: "spdate"
        },
        {
          title: "放款申请时间",
          field: "applicationdate"
        }
      ],
      total: 0,
      listLoading: false,
      sels: [],
      selLength: 0,
      filters: {
        ApplicationNo: "",
        Borrowername: null,
        Sdate: null,
        Edate: null,
        SSubmitDate: null,
        ESubmitDate: null,
        Status: 0,
        DealerId: null,
        PageIndex: 1,
        PageSize: 10
      },
      value1: "",
      value2: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      value: "",
      timer: null,
      form: {
        name: ""
      }
    };
  },
  computed: {
    // 计算搜索内容长度 中文一个字 非中文两个字才出发搜索
    noLength: function() {
      var len = 0;
      var applicationNo = this.filters.ApplicationNo;
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
  },
  methods: {
    changeValue1(tag) {
      this.filters.PageIndex = 1;
      this.filters.ApplicationNo = "";
      this.getlists();
    },
    changeValue2(tag) {
      this.filters.PageIndex = 1;
      this.filters.ApplicationNo = "";
      this.getlists();
    },
    changeStatusorder(tag) {
      this.filters.PageIndex = 1;
      this.filters.Status = tag.code;
      this.filters.ApplicationNo = "";
      this.getlists();
    },
    filterzi(row, column) {
      var data = row[column.property];
      if (!data) {
        data = "客户姓名";
      }
      return data;
    },
    SearchList() {
      this.filters.ApplicationNo = "";
      this.filters.PageIndex = 1;
      this.getlists();
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
    clearNormalFilter() {
      let isDefault = true;
      if (
        (this.value1 && this.value1.length != 0) ||
        (this.value2 && this.value2.length != 0) ||
        this.filters.Status != 0
      ) {
        isDefault = false;
      }
      this.value1 = "";
      this.value2 = "";
      this.filters.Status = 0;
      if (!isDefault) {
        this.filters.PageIndex = 1;
        this.getlists();
      }
    },
    handleSelect(item) {
      this.filters.ApplicationNo = item.applicationno;
      this.searchname();
    },
    dateFormat: function(row, column) {
      var moment = require("moment");
      var date = row[column.property];
      if (column.label === "申请提交时间") {
        return date ? moment(date).format("YYYY-MM-DD HH:mm") : "";
      } else if (column.label === "申请核准时间") {
        return date ? moment(date).format("YYYY-MM-DD HH:mm") : "";
      } else if (column.label === "放款提交时间") {
        return date ? moment(date).format("YYYY-MM-DD HH:mm") : "";
      } else {
        return date;
      }
    },
    doFail(scope) {
      this.reason = "";
      // eslint-disable-next-line
      this.reasonlist = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001KWQ5BC8O0000A43"
      ];
      this.ContractId = scope.row.id;
      this.failshow = true;
    },
    doCancelsub() {
      if (!this.reason) {
        this.$message({
          type: "error",
          message: "请选择放弃原因"
        });
        return false;
      }
      this.btndisable = true;
      var choosenItem = this.reasonlist.filter(
        item => item.CODE === this.reason
      )[0];
      let para = {};
      para = {
        ContractId: this.ContractId,
        Reason: choosenItem.NAME,
        ReasonCode: choosenItem.CODE
      };
      postcontractGiveup(para).then(res => {
        this.btndisable = false;
        if (res.data.success) {
          this.$message({
            type: "success",
            message: "操作成功！"
          });
          this.failshow = false;
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    },
    doCancel(scope) {
      let para = {};
      para = {
        ContractId: scope.row.id
      };
      this.$confirm("确定要撤回吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postcontractCancel(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "撤回成功！"
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
            message: "已取消撤回"
          });
        });
    },
    doCancelSpecial() {
      this.dialogFormVisible = false;
      this.$refs["ruleForm"].resetFields();
    },
    dosubSpecial() {
      var that = this;
      this.btndisable = true;
      let para = {};
      para = this.specialdata;
      postSpecialsub(para).then(res => {
        this.btndisable = false;
        if (res.data.success) {
          this.dialogFormVisible = false;
          that.$refs["ruleForm"].resetFields();
          this.$message({
            type: "success",
            message: "添加特殊业务成功"
          });
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    },
    searchname() {
      this.filters.PageIndex = 1;
      this.getlists();
    },
    changeStatus(item, index) {
      var that = this;
      this.$nextTick(function() {
        this.itemnav.forEach(function(item) {
          that.$set(item, "active", false);
        });
        that.$set(item, "active", true);
      });
      this.filters.Status = item.id;
      this.getlists();
    },
    toDetail(id) {
      this.$router.push({
        path: "/dealer/creditapproval/appliloan/" + id
      });
    },
    showSpecial(id) {
      // eslint-disable-next-line
      this.speciallist = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001HN6UKXHX0000A1X"
      ];
      this.specialdata.reason = "";
      this.imageUrl = "";
      getSpeciallist(id).then(res => {
        console.log(res.data);
        if (res.data.success) {
          this.tableData = res.data.data.data;
        }
      });
      getNewSpecial(id).then(res => {
        if (res.data.data) {
          this.specialdata.cacontractno = res.data.data.cacontractno;
          this.specialdata.DealerName = res.data.data.refData.DealerName;
          this.specialdata.name = res.data.data.name;
          this.specialdata.card = res.data.data.card;
          this.specialdata.cdate = res.data.data.cdate;
          this.specialdata.cacontractid = res.data.data.cacontractid;
          this.specialdata.id = res.data.data.id;
          this.dialogFormVisible = true;
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    },
    handleError(response, file, fileList) {
      this.$message({
        type: "success",
        message: "上传失败，请联系管理员"
      });
    },
    handleAvatarSuccess(res, file) {
      this.specialdata.Md5 = res.data.md5;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/png'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
    },
    handleSizeChange(val) {
      this.filters.PageSize = val;
      this.getlists();
    },
    handleCurrentChange(val) {
      this.filters.PageIndex = val;
      this.getlists();
    },
    getlists() {
      var moment = require("moment");
      if (this.value1 && this.value1 != null) {
        this.filters.Sdate = moment(this.value1[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.filters.Edate = moment(this.value1[1]).format(
          "YYYY-MM-DD 23:59:59"
        );
      } else {
        this.filters.Sdate = "";
        this.filters.Edate = "";
      }
      if (this.value2 && this.value2 != null) {
        this.filters.SSubmitDate = moment(this.value2[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.filters.ESubmitDate = moment(this.value2[1]).format(
          "YYYY-MM-DD 23:59:59"
        );
      } else {
        this.filters.SSubmitDate = "";
        this.filters.ESubmitDate = "";
      }
      let para = {};
      para = this.filters;
      this.listLoading = true;
      postLoanlist(para)
        .then(res => {
          apiCommonDeal.call(this, res, data => {
            this.total = data.recordsTotal;
            this.lists = data.data;
            this.cols = this.cols;
          });
          this.listLoading = false;
        })
        .then(() => {
          addMianFlag.call(this, this.lists, "camainno");
        });
    }
  },
  mounted() {
    this.getlists();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.demonstration {
  font-weight: bold;
}
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
.mian-flag {
  background: url("~@/assets/images/miandiya.png") no-repeat;
  background-size: cover;
  width: 24px;
  height: 24px;
  display: block;
  position: absolute;
  left: 0px;
  top: 0;
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

