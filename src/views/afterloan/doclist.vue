<template>
  <section
    class="doclist"
    style="margin-top:5px;position:relative;"
  >
    <el-row>
      <el-col :span='11'>
        <el-breadcrumb
          separator='/'
          class='app-breadcrumb'
        >
          <el-breadcrumb-item class='firstbread'>贷后管理</el-breadcrumb-item>
          <el-breadcrumb-item>文档管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col
        :span="7"
        class="topmiddle topbtnbasic"
        style="margin:3px 0 8px 0"
      >
        <el-button
          size="small"
          type="success"
          class="btncolor"
          @click="createWayBill"
          v-if="postId===''"
        >创建运单</el-button>
        <el-button
          size="small"
          type="success"
          class="btncolor"
          @click="sendlists"
          v-if="postId"
        >邮寄列表({{totalCount}})</el-button>
      </el-col>
      <el-col
        :span="6"
        class="topsearch topbtnbasic"
        style="margin:3px 0 8px 0"
      >
        <el-form @submit.native.prevent>
          <el-autocomplete
            style="width:100%"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
            placeholder="姓名、申请编号、手机号"
            :value="form.noOrName"
            @focus="clearNormalFilter"
            v-model="form.noOrName"
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
    <el-row class="searchbar custom-card-grid">
      <el-col :span='24'>
        <div class="blocktime">
          <span class="demonstration">案件类别</span>
          <filter-tag
            :current='form.type'
            @on-change='changeType'
            :tags="carType"
          ></filter-tag>
        </div>
      </el-col>
      <el-col :span='24'>
        <div class="blocktime blocktime_middle">
          <span class="demonstration">归档状态</span>
          <filter-tag
            :current='form.status'
            @on-change='changeStatus'
            :tags="serviceStatus"
          ></filter-tag>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data='doclists'
      stripe
      v-loading='listLoading'
      class='tablelist custom-card-filter'
    >
      <el-table-column
        width='160'
        label="申请编号"
      >
        <template slot-scope='scope'>
          <span
            class='linkurl underline'
            style="margin-left:0"
            @click="view(scope)"
          >{{scope.row.camainno}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width='113'
        label="客户姓名"
        show-overflow-tooltip
        prop="borrowername"
      ></el-table-column>
      <el-table-column
        width='113'
        label="案件类别"
        prop="refData.categoryname"
      ></el-table-column>
      <el-table-column
        width='152'
        label="案件状态"
        prop="refData.statusname"
      ></el-table-column>
      <el-table-column
        width='118'
        label="归档状态"
        prop="refData.caafterstatusfilename"
        align='center'
      >
        <template slot-scope='scope'>
          <span
            v-if="!['3','5'].includes(scope.row.caafterstatusfile)"
            style="background-color:#FAAD14;width:56px;height:22px;display:inline-block;color:#ffffff;text-align:center;border-radius:3px"
          >{{scope.row.refData.caafterstatusfilename}}</span>
          <span
            v-else
            style="text-align:center;width:56px;height:22px;display:inline-block;color:#606266;"
          >{{scope.row.refData.caafterstatusfilename}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width='92'
        label="邮寄到期天数"
        prop="remainday"
        align='right'
      ></el-table-column>
      <el-table-column
        width='122'
        label="最后邮寄期限"
        prop="caafterlimitdate"
      ></el-table-column>
      <el-table-column
        width='180'
        label="运单编号"
        show-overflow-tooltip
      >
        <template slot-scope='scope'>
          {{formatePost(scope)}}
        </template></el-table-column>
      <el-table-column
        align='center'
        label="操作"
        width="150"
      >
        <template slot-scope='scope'>
          <span
            class='linkurl'
            @click="send(scope)"
            v-if="!['3','5'].includes(scope.row.caafterstatusfile)"
          >邮寄</span>
          <span
            class='linkurl'
            @click="delay(scope)"
            v-if="!['3','5'].includes(scope.row.caafterstatusfile)"
          >延期申请</span>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col
      :span='24'
      style="text-align:right"
      class='toolbar'
      v-if="showPageBar"
    >
      <Page
        :current="docpage"
        :total="doctotal"
        :page-size="docpagesize"
        @on-change="handleCurrentChange"
        @on-page-size-change="handleSizeChange"
        show-sizer
        show-total
      ></Page>
    </el-col>
    <el-dialog
      title="创建运单"
      width="800px"
      :center=true
      :visible.sync="dialogFormVisible"
    >
      <el-row>
        <el-col
          :span="18"
          :offset="3"
        >
          <el-form
            :model="addform"
            label-position='right'
            label-width="124px"
            class="postno"
          >
            <div style="position: relative;">
              <span class="tagging">*</span>
              <el-form-item
                label="运单编号"
                prop="expresscom"
                style="margin-top:0 !important"
              >
                <el-input
                  placeholder=""
                  v-model="addform.expressno"
                  class="input-with-select"
                >
                  <el-select
                    v-model="addform.expresscom"
                    filterable
                    slot="prepend"
                    placeholder="请选择"
                    style="width:90px"
                  >
                    <el-option
                      v-for="express in expressComs"
                      :key="express.code"
                      :label="express.name"
                      :value="express.code"
                    >
                    </el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </div>
            <div style="position: relative;">
              <span
                style="left:64px"
                class="tagging"
              >*</span>
              <el-form-item
                label="邮寄人"
                prop="sendman"
                readonly=true
              >
                <el-input
                  v-model="addform.sendman"
                  disabled
                ></el-input>
              </el-form-item>
            </div>
            <div style="position: relative;">
              <span class="tagging">*</span>
              <el-form-item
                label="邮寄时间"
                prop="sendtime"
                style="width:100%"
              >
                <el-date-picker
                  v-model="addform.sendtime"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="preTodayPicker"
                >
                </el-date-picker>
              </el-form-item>
            </div>
            <el-form-item
              label="备注"
              prop="desc"
              class="bill-desc"
              style="margin-top: 0 !important;"
            >
              <el-input
                type="textarea"
                autosize
                maxlength=200
                v-model="addform.desc"
              ></el-input>
              <span
                v-show="isTextOver"
                class="text-over-error"
              >长度最多是200的字符串</span>
            </el-form-item>
            <el-form-item style="margin-top:16px !important;">
              <el-button
                size="small"
                type="success"
                class="btncolor"
                :loading="isLoading"
                @click="saveWayBill"
              >确 定</el-button>
              <el-button
                size="small"
                type="success"
                class="btncolor btncancle"
                @click="canclePost"
              >取 消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </section>
</template>

<script>
import Moment from "moment/moment";
import { getToken } from "@/utils/auth";
import mixin from "@/mixins/mixin";
import { getApplicationNo2 } from "@/api/credit";
import filterTag from "@/components/FilterTag/filtertag";
import {
  apiCommonDeal,
  objectOnly,
  objectExcept,
  collectReplace
} from "@/utils/index";
import {
  getDocList,
  getLastPost,
  getPostInfo,
  savePostInfo,
  checkPostFile
} from "@/api/afterloan";
import Cookies from "js-cookie";
var userid = Cookies.get("userId");
export default {
  components: {
    filterTag
  },
  mixins: [mixin],
  data() {
    return {
      uploadHeader: {
        Authorization: "Bearer " + getToken()
      },
      acitonUrl:
        window.g.ApiUrl + "S120017/upload/?Md5=&sceneid=1100310001&randomstr=",
      dialogFormVisible: false, //运单弹框
      dialogTableVisible: false, //选择邮寄人弹框
      listLoading: false,
      isLoading: false,
      docid: "",
      postNo: "",
      postId: false,
      totalCount: 0,
      serviceStatus: [],
      carType: [],
      expressComs: [],
      form: {
        noOrName: "", //编号、姓名
        type: "", //档案类别
        status: "" //归档状态
      },
      addform: {
        id: "", // 运单id
        expressno: "", // 快递单号
        expresscom: "", // 快递公司
        sendid: "", // 邮寄人id
        sendman: "", // 邮寄人
        sendtime: "", // 邮寄时间
        desc: "", // 备注
        sendimg: "", // 单据照片md5
        sendimgname: "", // 单据照片名称
        sendimgurl: "" //本地url
      },
      searchform: {
        nameOrPhone: ""
      },
      doclists: [],
      userlists: [],
      doctotal: 1,
      docpagesize: localStorage.sendpost_pagesize || 10,
      docpage: 1,
      preTodayPicker: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      timer: null
    };
  },
  beforeRouteLeave(to, from, next) {
    if (["sendpost", "sendpostl", "sendpostedit"].includes(to.name)) {
      localStorage.setItem("sendpost_type", this.form.type);
      localStorage.setItem("sendpost_status", this.form.status);
      localStorage.setItem("sendpost_page", this.docpage);
      localStorage.setItem("sendpost_pagesize", this.docpagesize);
    } else {
      localStorage.removeItem("sendpost_type");
      localStorage.removeItem("sendpost_status");
      localStorage.removeItem("sendpost_page");
      localStorage.removeItem("sendpost_pagesize");
    }
    next();
  },
  mounted() {
    this.getLocalStorage();
    this.getFilter();
    this.getdoclists();
    this.$set(this.addform, "sendtime", Moment().format("YYYY-MM-DD"));
  },
  methods: {
    formatePost(scope) {
      // 归档退回只显示归回单号
      if (scope.row.caafterstatusfile == 6) {
        return scope.row.bspostno;
      }
      return (
        scope.row.pcompany +
        (scope.row.pcompany && scope.row.postno ? "/" : "") +
        scope.row.postno
      );
    },
    getLocalStorage() {
      localStorage.sendpost_type &&
        (this.form.type = localStorage.sendpost_type);
      localStorage.sendpost_status &&
        (this.form.status = localStorage.sendpost_status);
      localStorage.sendpost_page &&
        (this.docpage = Number(localStorage.sendpost_page));
      localStorage.sendpost_pagesize &&
        (this.docpagesize = Number(localStorage.sendpost_pagesize));
    },
    changeType(tag) {
      this.form.type = tag.code;
      this.docpage = 1;
      this.form.noOrName = "";
      this.getdoclists();
    },
    changeStatus(tag) {
      this.form.status = tag.code;
      this.docpage = 1;
      this.form.noOrName = "";
      this.getdoclists();
    },
    uploadExpressFile(res, file) {
      this.$set(this.addform, "sendimgurl", URL.createObjectURL(file.raw));
      this.$set(this.addform, "sendimg", res.data.md5);
      this.$set(this.addform, "sendimgname", file.raw.name);
    },
    handleError(response, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败，请联系管理员"
      });
    },
    // 检查上传格式及大小
    checkUpload(file) {
      const allowTypes = [
        "image/jpeg",
        "image/jpg",
        "image/bmp",
        "image/png",
        "image/gif"
      ];
      const isJPG = allowTypes.indexOf(file.type) !== -1;
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message({
          type: "error",
          message: "请上传指定文件格式!"
        });
      }
      if (!isLt2M) {
        this.$message({
          type: "error",
          message: "文件大小不能超过10MB!"
        });
      }
      return isJPG && isLt2M;
    },
    handleCurrentChange(val) {
      this.docpage = val;
      this.getdoclists();
    },
    handleSizeChange(val) {
      console.log(val);

      this.docpagesize = val;
      this.getdoclists();
    },
    userHandleCurrentChange(val) {
      this.userpage = val;
      this.getdoclists();
    },
    userHandleSizeChange(val) {
      this.userpagesize = val;
      this.getdoclists();
    },
    dateFormat: function(row, column) {
      var moment = require("moment");
      var date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
    canclePost: function() {
      this.dialogFormVisible = false;
    },
    getdoclists() {
      let para = {
        PageIndex: this.docpage,
        PageSize: this.docpagesize,
        Status: this.form.status,
        Category: this.form.type,
        key: this.form.noOrName
      };
      this.listLoading = true;
      getDocList(para).then(res => {
        apiCommonDeal.call(this, res, data => {
          this.doclists = data.data;
          this.doclists = collectReplace(data.data, {
            caafterlimitdate: {
              key: "caafterlimitdate",
              fun: function(value) {
                return value ? Moment(value).format("YYYY-MM-DD") : "";
              }
            }
          });
          this.doctotal = data.recordsTotal;
        });
        this.listLoading = false;
      });
      getLastPost()
        .then(res => {
          if (res.data.success) {
            this.postNo = res.data.data.postno;
            this.postId = res.data.data.id;
            this.totalCount = res.data.data.totalpostlist;
          } else {
            this.postId = "";
          }
        })
        .catch(() => {});
    },
    SearchList() {
      this.form.noOrName = "";
      this.docpage = 1;
      this.getdoclists();
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
    searchname() {
      this.docpage = 1;
      this.getdoclists();
    },
    clearNormalFilter() {
      let isDefault = true;
      if (this.form.status !== "" || this.form.type !== "") {
        isDefault = false;
      }
      this.form.status = "";
      this.form.type = "";
      if (!isDefault) {
        this.docpage = 1;
        this.getdoclists();
      }
    },
    handleSelect(item) {
      this.form.noOrName = item.applicationno;
      this.searchname();
    },
    // 获取筛选项
    getFilter() {
      //归档状态
      var serviceStatus = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001HKP8G7470000A10"
      ].filter(item => {
        return !["7", "8"].includes(item.code);
      });
      serviceStatus.unshift({ code: "", name: "全部" });
      this.serviceStatus = serviceStatus;

      //案件类别
      var carType = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001HBTQVYCP0000A0E"
      ];
      carType.unshift({ code: "", name: "全部" });
      this.carType = carType;

      // 快递公司
      var expressComs = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001HKYK9DD40000A23"
      ];
      expressComs.unshift({ code: "", name: "请选择" });
      this.expressComs = expressComs;
      //获取经销商姓名
      this.addform.sendman = JSON.parse(
        localStorage.getItem("dealerinfo")
      ).orgName;
    },
    // 邮寄
    send(item) {
      let no = item.row.camainno;
      let id = item.row.id;
      if (item.row.caafterstatusfile == 5 || item.row.caafterstatusfile == 3) {
        this.$message({
          type: "warning",
          message: "已邮寄或归档！"
        });
        return;
      }
      var para = {
        camainno: no,
        dcpostid: this.postId
      };
      checkPostFile(para).then(res => {
        apiCommonDeal.call(this, res, data => {
          this.docid = "";
          var status = data;
          // 0非免抵押需要邮寄 1只有绿本影像件 2有绿本影像件和其他需要confirm确认 3编辑
          if (status == 0) {
            if (!this.postId) {
              this.dialogFormVisible = true;
              this.docid = id;
            } else {
              this.$router.push({
                path: "/dealer/afterloan/sendpost/" + id
              });
            }
          } else if (status == 1) {
            this.$router.push({
              path: "/dealer/afterloan/sendpostl/" + id
            });
          } else if (status == 2) {
            this.$confirm("是否只上传机动车登记证书影像件？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.$router.push({
                  path: "/dealer/afterloan/sendpostl/" + id
                });
              })
              .catch(() => {
                if (!this.postId) {
                  this.dialogFormVisible = true;
                  this.docid = id;
                } else {
                  this.$router.push({
                    path: "/dealer/afterloan/sendpost/" + id
                  });
                }
              });
          } else if (status == 3) {
            this.$router.push({
              path: "/dealer/afterloan/sendpostedit/" + id
            });
          }
        });
      });
    },
    // 查看
    view(item) {
      let id = item.row.id;
      this.$router.push({
        path: "/dealer/afterloan/sendpostdetail/" + id
      });
    },
    // 申请延期
    delay(item) {
      let no = item.row.camainno;
      if (item.row.caafterstatusfile == 5 || item.row.caafterstatusfile == 3) {
        this.$message({
          type: "warning",
          message: "已邮寄或归档！"
        });
        return;
      }
      this.$router.push({
        path: "/dealer/afterloan/delay/" + no
      });
    },
    // 编号、姓名搜索
    docListSearch() {
      //待定
      this.getdoclists();
    },
    // 手机姓名搜索
    userListSearch() {
      let para = {
        pageNum: this.userpage,
        pageSize: this.userpagesize,
        noOrName: this.searchform.nameOrPhone
      };
      return;
      this.userListLoading = true;
      sendList(para).then(res => {
        apiCommonDeal.call(this, res, data => {
          this.userlists = data.pageData;
          this.usertotal = data.pageCount;
        });
        this.userListLoading = false;
      });
    },
    // 创建运单
    createWayBill() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    // 检查表单
    checkFrom() {
      if (this.addform.expresscom == "") {
        this.$message({
          type: "warning",
          message: "请选择快递公司"
        });
        return false;
      }
      if (this.addform.expressno.trim() == "") {
        this.$message({
          type: "warning",
          message: "请输入运单编号"
        });
        return false;
      }

      if (!this.addform.sendtime) {
        this.$message({
          type: "warning",
          message: "请选择邮寄时间"
        });
        return false;
      }
      return true;
    },
    // 保存运单
    saveWayBill() {
      this.isLoading = true;
      if (this.checkFrom()) {
        this.isLoading = false;
        //调用接口 保存运单
        let para = {
          postno: this.addform.expressno,
          pdate: Moment(this.addform.sendtime).format("YYYY-MM-DD"),
          pcompany: this.addform.expresscom,
          postimgmd5: "ss", // 删除图片上传，故传固定值
          memo: this.addform.desc
        };
        savePostInfo(para).then(res => {
          apiCommonDeal.call(this, res, data => {
            this.postId = data.id;
            this.postNo = data.postno;
            this.dialogFormVisible = false;
            let id = this.docid;
            if (id) {
              this.$router.push({
                path: "/dealer/afterloan/sendpost/" + id
              });
            }
          });
        });
      }
      this.isLoading = false;
    },
    // 选择邮寄人
    dialogUserList() {
      return;
      this.dialogTableVisible = true;
      this.userListSearch();
    },
    sendlists() {
      if (this.postId) {
        this.$router.push({
          path: "/dealer/afterloan/sendpostlist/" + this.postId
        });
      } else {
        this.$message({
          type: "error",
          message: "请添加运单"
        });
      }
    },
    // 重置
    formreset() {
      this.form = this.$options.data().form;
    },
    //选择邮寄人
    add(scope) {
      this.$set(this.addform, "sendman", scope.row.name);
      this.$set(this.addform, "sendmanid", scope.row.id);
      this.dialogTableVisible = false;
    }
  },
  computed: {
    showPageBar: function() {
      return !!this.doctotal;
    },
    // 计算搜索内容长度 中文一个字 非中文两个字才出发搜索
    noLength: function() {
      var len = 0;
      var applicationNo = this.form.noOrName;
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
    },
    isTextOver: function() {
      return this.addform.desc.length >= 200;
    }
  },
  watch: {
    dialogFormVisible: function(value) {
      // 关闭弹框后还原数据
      if (!value) {
        var ori = this.$options.data().addform;
        this.addform = ori;
        this.addform.sendman = JSON.parse(
          localStorage.getItem("dealerinfo")
        ).orgName;
        this.addform.sendtime = Moment().format("YYYY-MM-DD");
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.doclist .btncolor {
  padding-left: 16px;
  padding-right: 16px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed;
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
  margin-bottom: 0px !important;
  margin-top: 8px;
}
.el-button {
  span {
    color: #fff !important;
  }
}
.postno /deep/ .el-form-item__label {
  color: #333 !important;
  font-size: 12px;
}
.topmiddle {
  line-height: 60px;
  padding-right: 8px;
}
.demonstration {
}
.btncancle {
  background: #fff;
  color: #666 !important;
  border: 1px solid #dcdfe6;
}
.desc {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: #999;
}
.tagging {
  position: absolute;
  left: 52px;
  top: 12px;
  font-size: 14px;
  color: #f00;
}
.text-over-error {
  color: #f00;
}
.doclist /deep/ .el-dialog__body {
  overflow: hidden;
}
.doclist /deep/ .el-dialog {
  width: 800px;
}
.doclist /deep/ .el-dialog--center .el-dialog__body {
  padding: 16px 0;
}
.postno /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.postno /deep/ .el-input-group__prepend > .el-select {
  width: 170px !important;
}
.tablelist /deep/ .el-table__row td div.cell {
  line-height: 24px;
}
.bill-desc /deep/ .el-form-item__content {
  line-height: normal;
  margin-top: 8px;
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

