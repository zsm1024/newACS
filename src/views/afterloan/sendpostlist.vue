<template>
  <section
    class="sendpostlist app-container"
    style="margin-top:5px;position:relative;"
  >
    <el-row>
      <el-col :span='11'>
        <el-breadcrumb
          separator='/'
          class='app-breadcrumb'
        >
          <el-breadcrumb-item class='firstbread'>贷后管理</el-breadcrumb-item>
          <el-breadcrumb-item class='firstbread'>
            <router-link
              style="color:#606266;font-weight: 100;"
              :to="{path:'/dealer/afterloan/doclist'}"
            >
              文档管理
            </router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>邮寄预览</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col
        :span="6"
        :offset="7"
        class="topsearch topbtnbasic"
        style="margin-top:3px;margin-bottom:8px;"
      >
        <el-button
          size="small"
          type="primary"
          style="width:60px"
          class="btncolor"
          :disabled="submitDisabled"
          @click="doSendpost"
        >邮寄</el-button>
      </el-col>
    </el-row>
    <div v-loading='!(!formLoading && !listLoading)'>
      <el-row class="searchbar">
        <el-col class="searchbar_title">
          <el-row>
            <el-col :span="12">
              <span style="position:relative;display: flex;align-items: center">
                <span class="searchbar_title_send">邮寄信息</span>
              </span>
            </el-col>
            <el-col
              :span="12"
              style="text-align:right"
            >
              <span
                @click="editSendpost"
                class="searchbar_title_edit"
              >编辑</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="searchbar_info">
          <el-row>
            <el-col :span="8">
              <div class="blocktime">
                <span class="demonstration">运单编号:</span>
                <span class="demonstration_content">{{postData.refData.pcompanynamename}}/{{postData.postno}}</span>

              </div>
            </el-col>
            <el-col :span="8">
              <div class="blocktime">
                <span class="demonstration">邮寄人:</span>
                <span class="demonstration_content">{{postData.refData.puseridname}}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="blocktime">
                <span class="demonstration">邮寄时间:</span>
                <span class="demonstration_content"> {{postData.pdate | momentShort}}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="blocktime">
                <span class="demonstration">备注:</span>
                <span
                  class="demonstration_content"
                  style="word-break: break-all"
                >{{postData.memo}}</span>
              </div>
            </el-col>
          </el-row>
        </el-col>

      </el-row>
      <el-row style="background-color:#fff;">
        <el-col>
          <el-row style="padding:16px 24px;">
            <el-col
              :span="8"
              style="width:311px;color:#333;font-size:12px;font-weight:bold;"
            >申请编号</el-col>
            <el-col
              :span="8"
              style="width:779px;color:#333;font-size:12px;font-weight:bold;"
            >归档清单</el-col>
            <el-col
              :span="8"
              style="width:60px;color:#333;font-size:12px;font-weight:bold;"
            >操作</el-col>
          </el-row>
          <el-row
            align="center"
            class="addPost"
            @click.native="addPost()"
          >
            <span>
              <span>+</span>
              <span style="margin-left:8px;">增加</span>
            </span>
          </el-row>
          <el-table
            :data='lists'
            :show-header=false
            style='width: 100%;min-height:400px'
          >
            <el-table-column
              width='323'
              label="申请编号"
              prop="camainno"
              class-name='applyno'
            ></el-table-column>
            <el-table-column
              width=''
              label="归档清单"
              prop="names"
            ></el-table-column>
            <el-table-column
              width="126"
              align='right'
              class-name='option'
              label="操作"
            >
              <template slot-scope='scope'>
                <span
                  class='linkurl'
                  @click="editdoc(scope)"
                >编辑</span>
                <span
                  class='linkurl'
                  @click="deldoc(scope)"
                >删除</span>
              </template>
            </el-table-column>
          </el-table>
          <!--工具条-->
          <el-col
            class='toolbar'
            v-if="showPageBar"
            :span='24'
            style="text-align:right;margin-bottom: 10px;"
          >
            <Page
              :current="page"
              :total="total"
              :page-size="pagesize"
              @on-change="handleCurrentChange"
              @on-page-size-change="handleSizeChange"
              show-sizer
              show-total
            ></Page>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="编辑运单"
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
            ref="ruleForm"
            label-position='right'
            label-width="124px"
            class="postno"
          >
            <div style="position: relative;">
              <span class="tagging">*</span>
              <el-form-item
                label="运单编号"
                prop="expresscom"
                style="margin-top:0px !important"
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
                class="tagging"
                style="left:64px"
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
              style="margin-top:0px !important"
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
            <el-form-item style="margin-top:16px !important">
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
                @click="dialogFormVisible = false"
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
import mixin from "@/mixins/mixin";
import { getToken } from "@/utils/auth";
import {
  getPostFileList,
  delPostFile,
  delPostFiles,
  savePostFiles,
  getLastPost,
  getPostInfo,
  savePostInfo
} from "@/api/afterloan";
import Cookies from "js-cookie";
import {
  apiCommonDeal,
  objectOnly,
  objectExcept,
  collectReplace
} from "@/utils/index";

export default {
  mixins: [mixin],
  data() {
    return {
      uploadHeader: {
        Authorization: "Bearer " + getToken()
      },
      acitonUrl:
        window.g.ApiUrl + "S120017/upload/?Md5=&sceneid=1100310001&randomstr=",
      imageUrl: window.g.ApiUrl + "S120017/download?md5=",
      lists: [],
      total: 1,
      pagesize: 10,
      page: 1,
      formLoading: true,
      listLoading: true,
      isLoading: false,
      dialogFormVisible: false, //运单弹框
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
      postId: "",
      postData: {
        refData: {}
      },
      expressComs: [],
      submitDisabled: false,
      preTodayPicker: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  mounted() {
    this.initFunction();
    this.getlists();
  },
  methods: {
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
      this.page = val;
      this.getlists();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlists();
    },
    getlists() {
      let para = {
        PageIndex: this.page,
        PageSize: this.pagesize,
        postid: this.postId
      };
      this.listLoading = true;
      getPostFileList(para).then(res => {
        apiCommonDeal.call(this, res, data => {
          this.lists = data.data;
          this.total = data.recordsTotal;
        });
        this.listLoading = false;
      });
    },
    // 删除
    deldoc(item) {
      this.$confirm("此操作将删除当前邮寄信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = item.row.id;
          delPostFile(id).then(res => {
            apiCommonDeal.call(this, res, data => {
              this.page = 1;
              this.getlists();
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑
    editdoc(item) {
      let id = item.row.cacontractid;
      this.$router.push({
        path: "/dealer/afterloan/sendpostedit/" + id
      });
    },
    // 取消
    cancleSendpost() {
      console.log("取消");
      this.$router.push({
        path: "/dealer/afterloan/doclist/"
      });
    },
    // 邮寄
    doSendpost() {
      console.log("邮寄");
      if (this.lists.length == 0) {
        this.$message({
          type: "warning",
          message: "没有邮寄的文件！"
        });
        return;
      }
      this.submitDisabled = true;
      savePostFiles(this.postId).then(res => {
        apiCommonDeal.call(
          this,
          res,
          data => {
            this.$message({
              type: "success",
              message: "邮寄成功!"
            });
            this.$router.push({
              path: "/dealer/afterloan/doclist"
            });
          },
          () => {
            this.$message({
              type: "error",
              message: res.data.message
            });
            this.submitDisabled = false;
          }
        );
      });
    },
    // 编辑
    editSendpost() {
      this.dialogFormVisible = true;
      getPostInfo(this.postId).then(res => {
        apiCommonDeal.call(this, res, data => {
          let form = {
            id: data.id,
            expressno: data.postno,
            expresscom: data.pcompany,
            sendid: data.puserid,
            sendman: this.addform.sendman,
            sendtime: Moment(data.pdate).format("YYYY-MM-DD"),
            desc: data.memo,
            sendimg: data.postimgmd5,
            sendimgname: "",
            sendimgurl: this.imageUrl + data.postimgmd5
          };
          this.$set(this, "addform", form);
        });
      });
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
          memo: this.addform.desc,
          id: this.postId
        };
        savePostInfo(para).then(res => {
          apiCommonDeal.call(this, res, data => {
            var expressComName = this.expressComs.filter(item => {
              return item.code == this.addform.expresscom;
            })[0]["name"];
            this.$set(
              this.postData.refData,
              "pcompanynamename",
              expressComName
            );
            this.$set(this.postData, "postno", this.addform.expressno);
            this.$set(
              this.postData,
              "pdate",
              Moment(this.addform.sendtime).format("YYYY-MM-DD")
            );
            this.$set(this.postData, "memo", this.addform.desc);
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "保存成功!"
            });
          });
        });
      }
      this.isLoading = false;
    },
    // 删除
    delSendpost() {
      this.$confirm("此操作将删除当前页面所有邮寄信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delPostFiles(this.postId).then(res => {
            apiCommonDeal.call(this, res, data => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.$router.push({
                path: "/dealer/afterloan/doclist/"
              });
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //添加邮寄
    addPost() {
      this.$router.push({
        path: "/dealer/afterloan/doclist/"
      });
    },
    initFunction() {
      this.postId = this.$route.params.id;
      getLastPost()
        .then(res => {
          apiCommonDeal.call(this, res, data => {
            this.postData = data;
          });
        })
        .then(() => {
          this.formLoading = false;
        });
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
    }
  },
  computed: {
    showPageBar: function() {
      return !!this.total;
    },
    isTextOver: function() {
      return this.addform.desc.length >= 200;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
.searchbar {
}
.searchbar_title {
  padding: 8px 24px;
  border-bottom: 1px solid #e3e3e3;
}
.searchbar_title_send {
  font-size: 14px;
  font-weight: 700;
  color: #000;
}
.searchbar_title_edit {
  display: inline-block;
  width: 24px;
  height: 16px;
  background-size: 100%;
  font-size: 12px;
  color: #1890ff;
  cursor: pointer;
  margin-left: 10px;
}
.searchbar_info {
  padding: 0 5px 16px;
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
.el-form-item__label {
  color: #000000 !important;
}
.topmiddle {
  line-height: 60px;
  padding-right: 8px;
}
.blocktime_middle {
  margin-left: 48px;
}
.blocktime_right {
  margin-left: 48px;
}
.demonstration {
  color: #333;
  font-weight: normal;
  font-size: 12px;
  margin-right: 5px;
}
.demonstration_content {
  color: #666;
  font-size: 12px;
}
.desc {
  div {
    color: #f00 !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.slide_div {
  display: inline-block;
  width: 50px;
  margin-left: 8px;
  cursor: pointer;
}
.slideup {
  position: relative;
  color: #1890ff;
  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border: #1890ff solid;
    border-width: 1px 1px 0 0;
    transform: rotate(135deg);
    margin-bottom: 10px;
    position: absolute;
    top: 3px;
    left: 30px;
    transition: all 0.2s;
  }
}
.slidedown {
  position: relative;
  color: #1890ff;
  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border: #1890ff solid;
    border-width: 1px 1px 0 0;
    transform: rotate(-45deg);
    margin-bottom: 10px;
    position: absolute;
    top: 7px;
    left: 30px;
    transition: all 0.2s;
  }
}
.day {
  display: inline-block;
  .day_item {
    height: 22px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    color: #435eaa;
    padding: 0px 8px;
    margin-right: 3px;
    &:last-of-type {
      margin-right: 98x;
    }
  }

  .day_active {
    background: #5881d8;
    border-radius: 4px;
    color: #fff;
  }
}
.btncancle {
  background: #fff;
  color: #666 !important;
  border: 1px solid #dcdfe6;
}
.tagging {
  position: absolute;
  left: 52px;
  top: 12px;
  font-size: 14px;
  color: #f00;
}
.addPost {
  margin: 0 24px;
  border: 1px dashed #dcdfe6;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #cbac69;
  cursor: pointer;
}
.addPost:hover {
  border: 1px dashed #cbac69;
}
.text-over-error {
  color: #f00;
}
.sendpostlist /deep/ .applyno .cell {
}
.sendpostlist /deep/ .option .cell {
  padding-right: 26px;
}
.sendpostlist /deep/ .el-dialog--center .el-dialog__body {
  padding: 16px 0;
}
.postno /deep/ .el-input-group__prepend > .el-select {
  width: 170px !important;
}
.postno /deep/ .el-input-group__prepend {
  background-color: unset;
}
.postno /deep/ .el-form-item__label {
  color: #333 !important;
  font-size: 12px;
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



