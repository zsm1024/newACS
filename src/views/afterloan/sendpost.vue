<template>

  <div
    class='app-container'
    style="margin-top:5px;position:relative;"
  >
    <el-row>
      <el-col :span="11">
        <el-breadcrumb
          separator="/"
          class="app-breadcrumb"
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
          <el-breadcrumb-item>{{isDetail?'查看':'邮寄'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col
        v-if="!isDetail"
        :span="13"
        align="right"
        class="topmiddle topbtnbasic"
        style="margin:3px 0 8px 0;padding-right:0"
      >
        <div class="lxn_button">
          <el-button
            size="small"
            type="primary"
            class="btncolor"
            style="width:60px"
            :disabled="submitDisabled"
            @click="submit"
          >提交</el-button>
        </div>
      </el-col>
    </el-row>
    <div v-loading="isLoading">
      <el-row class="searchbar">
        <h1 class="title">客户信息</h1>
        <div class="lxn_formdata">
          <div style="width:447px">
            <p>申请编号：
              <span>{{docData.contract.camainno}}</span>
            </p>
            <p>VIN号：
              <span>{{docData.contract.vin}}</span>
            </p>
            <p>贷款金额：
              <span>{{docData.contract.loanmoney | numberFixed}}</span>
            </p>
          </div>
          <div style='width:321px'>
            <p>客户姓名：
              <span>{{docData.contract.borrowername}}</span>
            </p>
            <p>案件类别：
              <span>{{docData.contract.refData.categorynamename}}</span>
            </p>
            <p>归档状态：
              <span>{{docData.contract.refData.statusfilenamename}}</span>
            </p>
          </div>
          <div style="width:432px">
            <p>证件号码：
              <span>{{docData.contract.card}}</span>
            </p>
            <p>案件状态：
              <span>{{docData.contract.refData.statusnamename}}</span>
            </p>
            <p>最后邮寄期限：
              <span>{{docData.contract.limitdate | momentShort}}</span>
            </p>
          </div>
        </div>
      </el-row>
      <el-row class="yw_yj">
        <div
          class="rightbox"
          style="width:456px"
        >
          <el-row class="searchbar">
            <div class="formtitle">
              <p>
                <strong>邮寄信息</strong>
              </p>
            </div>
            <div class="senddetail">
              <div>
                <label>运单编号：</label>
                <span>{{docData.post.refData.pcompanynamename}}{{docData.post.postno?"/":""}}{{docData.post.postno}}</span>
              </div>
              <div>
                <label>邮寄人：</label>
                <span>{{docData.post.refData.puseridname}}</span>
              </div>
              <div>
                <label>邮寄时间：</label>
                <span>{{docData.post.pdate | momentShort}}</span>
              </div>
              <div>
                <label>备注：</label>
                <span style="word-break: break-all">{{docData.post.memo}}</span>
              </div>
            </div>
          </el-row>
        </div>
        <el-row
          class="searchbar leftbox"
          style="width:736px"
        >
          <div class="formtitle">
            <p>
              <strong>车辆信息</strong>
            </p>
          </div>
          <div
            class="lxn_formdata"
            v-if="isDetail"
          >
            <div style="width:447px">
              <p>车牌号：
                <span>{{docData.after.plateno}}</span>
              </p>
              <p>抵押登记时间：
                <span>{{docData.after.pledgedate | momentShort | timeFilter}}</span>
              </p>
            </div>
          </div>
          <el-form
            v-else
            :model="form"
            ref="formss"
            :rules="rules"
            size="medium"
            inline
            style="padding:16px 24px 4px 0"
          >
            <el-form-item
              label="车牌号"
              prop="haoma"
              label-width="80px"
            >
              <el-input
                v-model="form.haoma"
                size="small"
                style="width:256px;"
                :disabled="isTuihui"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="抵押登记时间"
              prop="time"
              label-width="95px"
            >
              <el-date-picker
                type="date"
                v-model="form.time"
                style="width:256px;"
                placeholder="选择日期"
                :disabled="isYingxiang || isTuihui"
                size="small"
                :picker-options="preTodayPicker"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </el-row>

        <el-row
          class="searchbar leftbox"
          style="width:736px"
          v-if="showBack && docData.backfilelist.length"
        >
          <div class="formtitle">
            <p>
              <strong>退件记录</strong>
            </p>
          </div>
          <div
            class="formtitle"
            style=""
          >
            <el-table
              :data="docData.backfilelist"
              style="width: 100%"
              class="refuse-table"
            >
              <el-table-column
                prop="name"
                label="文件名称"
                width="160"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="problemname"
                label="问题类型"
                width="130"
              >
              </el-table-column>
              <el-table-column
                prop="reason"
                label="问题描述"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="bspostno"
                label="运单编号"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="backdate"
                label="退件时间"
                width="150"
              >
              </el-table-column>
            </el-table>
          </div>
        </el-row>

        <el-row
          class="searchbar leftbox"
          style="width:736px"
        >
          <div
            v-if="isDetail"
            class="zhezhao"
          ></div>
          <div class="formtitle">
            <p>
              <strong>归档清单</strong>
            </p>
            <el-checkbox
              v-show="!isDetail"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
          </div>
          <div
            class="formtitle"
            style=""
          >
            <el-checkbox-group
              v-model="form.checkedCities"
              @change="handleCheckedCitiesChange"
              class="bill_group"
            >
              <el-checkbox
                :class="checkboxInput(city)"
                v-for="city in cities"
                :label="city.code"
                :key="city.code"
                :disabled="city.ischeck==1 || (mianLv && !picCode.includes(city.code)) || isDetail"
                class="bill"
              >
                <slot>
                  <div>
                    <span>{{city.name}}</span>
                    <el-input
                      v-if='city.code == otherCode'
                      v-model="form.otherContent"
                      :disabled="city.ischeck==1 || (mianLv && !picCode.includes(city.code)) || isDetail"
                      ref='otherContent'
                      size="mini"
                      style="width:270px;display:inline-block"
                    ></el-input>
                    <div
                      v-if="isDetail"
                      @click.prevent
                      class="zhezhao"
                    ></div>
                  </div>
                </slot>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-row>
        <el-row
          v-if="uploadImg"
          class="searchbar leftbox"
          style="width:736px"
        >
          <div class="formtitle">
            <p>
              <strong>机动车登记证书</strong>
            </p>
          </div>
          <div class="formtitle">
            <el-form
              :model="form"
              size="medium"
              style="padding:0 0 4px 0"
            >
              <el-form-item>
                <viewer :images="imgLists2">
                  <div
                    v-if="isAllowUpload"
                    style="width:120px;height:120px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:8px;margin-right:8px;text-align:center;"
                  >
                    <el-upload
                      class="avatar-uploader"
                      :show-file-list="false"
                      :on-error="handleError"
                      :before-upload="beforeAvatarUpload"
                      :action="acitonUrl"
                      :headers="uploadHeader"
                      :on-success="handleAvatarSuccess"
                    >
                      <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
                      <el-button
                        style=""
                        type="success"
                        size="small"
                        class="btncolor"
                      >本地上传</el-button>
                    </el-upload>
                    <el-button
                      style="margin-left:0;margin-top:8px"
                      type="success"
                      @click="appUpload"
                      size="small"
                      class="btncolor"
                    >拍摄照片</el-button>
                  </div>
                  <div
                    class="imagePost imgLIst"
                    v-for="(img,index) in form.imgList"
                    :key="index"
                    @mouseenter="enter(index)"
                    @mouseleave="leave(index)"
                  >
                    <img :src="img.url || (fileUrl+img.md5)" />
                    <span v-show="img.status==1 && img.status2==true">
                      <i
                        class="el-icon-delete"
                        @click="del(index)"
                      ></i>
                    </span>
                  </div>
                </viewer>
              </el-form-item>
              <el-form-item
                v-if="isAllowUpload"
                style="margin-bottom:0 !important"
                label=""
                prop="beizhi"
              >
                <p class="kzm">支持文件类型：.jpg .bmp .jpeg .png .gif</p>
              </el-form-item>
            </el-form>
          </div>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
import Moment from "moment/moment";
import mixin from "@/mixins/mixin";
import { getToken } from "@/utils/auth";
import Cookies from "js-cookie";
import { cardList, sendList, commonStatus, commonDeal } from "@/api/card";
import {
  collectPluck,
  apiCommonDeal,
  objectReplace,
  arrayGetSame,
  collectReplace,
  GUID
} from "@/utils/index";
import { docimgsave, orderdelimg } from "@/api/credit";
import { getBase64Image } from "@/utils";
import { docDetail, saveDoc } from "@/api/afterloan";
const FILE_URL = window.g.ApiUrl + "S120017/download?md5=";
var FILE_TYPE_CODE = "1101";
var FILE_TYPE_NAME = "机动车登记证书";
export default {
  mixins: [mixin],
  data() {
    return {
      submitDisabled: false,
      isDetail: false,
      checkAll: false,
      mianLv: false,
      showBack: true,
      isLoading: true,
      cities: [],
      isIndeterminate: true,
      isCancle: false, // 是否点击返回按钮
      uploadHeader: {
        Authorization: "Bearer " + getToken()
      },
      fileUrl: FILE_URL,
      acitonUrl: "",
      form: {
        haoma: "",
        time: "",
        checkedCities: [],
        checkedCitiesName: [],
        imgList: [],
        otherContent: ""
      },
      imgLists2: [],
      formLabelWidth: "80px",
      docData: {
        after: {},
        backfilelist: [],
        categorylist: {},
        contract: {
          refData: {}
        },
        othername: "",
        picturelist: [],
        post: {
          refData: {}
        },
        state: 0,
        status: 0
      },
      docId: "",
      id: "",
      otherCode: "9901", // 其他
      picCode: ["1101", "3601"], // 机动车登记证书code
      lvCode: "3601", // 免抵押绿本影像件code
      rules: {
        haoma: [{ required: true, message: "请输入车牌号", trigger: "change" }],
        time: [{ required: true, message: "请选择日期", trigger: "change" }]
      },
      rules2: {
        haoma: [{ required: true, message: "请输入车牌号", trigger: "change" }],
        time: [{ required: true, message: "请选择日期", trigger: "change" }]
      },
      rules3: {
        haoma: [{ required: true, message: "请输入车牌号", trigger: "change" }]
      },
      preTodayPicker: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  filters: {
    // 去除1991-1-1
    timeFilter: function(time) {
      console.log(time);
      return time ? Moment(time).format("YYYY-MM-DD") : "";
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(to);
    if (to.name == "doclist" && this.isCancle) {
    } else {
      localStorage.removeItem("sendpost_type");
      localStorage.removeItem("sendpost_status");
      localStorage.removeItem("sendpost_page");
      localStorage.removeItem("sendpost_pagesize");
    }
    next();
  },
  mounted() {
    this.initfunction();
    this.initImg();
  },
  methods: {
    checkboxInput: function(item) {
      if (item.code == this.otherCode) {
        return "checkboxInput";
      }
      return "";
    },
    handleChange(value) {},
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      if (res.success) {
        let f = {};
        f = {
          imgtype: FILE_TYPE_NAME,
          md5: res.data.md5,
          url: URL.createObjectURL(file.raw),
          guid: res.data.randomstr,
          randomStr: res.data.randomstr,
          status: 1
        };

        let para = {};
        para = {
          Md5: res.data.md5,
          RandomStr: res.data.randomstr,
          ImCategoryCode: FILE_TYPE_CODE,
          CamainId: this.id,
          Scene: "3",
          UploadFrom: "0",
          MidId: ""
        };
        docimgsave(para).then(res => {
          if (!res.data.success) {
            this.$message({
              type: "warning",
              message: res.data.message
            });
          } else {
            this.form.imgList.push(f);
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "上传失败，请联系管理员"
        });
      }
    },

    handleCheckAllChange(val) {
      var routeName = this.$route.name;
      var otherChecked = this.form.checkedCities.includes(this.otherCode);
      // 判断是否限制  是:只能选择登记证书和影像件 否：根据ischek!=1筛选
      if (["sendpostl", "sendposteditl"].includes(routeName)) {
        var currentLv = arrayGetSame(this.picCode, this.codes);
        if (val) {
          this.form.checkedCities = this.form.checkedCities.concat(currentLv);
          this.form.checkedCitiesName = [];
          this.form.checkedCities.forEach(code => {
            var c = this.cities.find(function(item) {
              return item.code == code;
            });
            this.form.checkedCitiesName.push(c.name);
          });
        } else {
          this.form.checkedCities.pop();
          this.form.checkedCitiesName = [];
          this.form.checkedCities.forEach(code => {
            var c = this.cities.find(function(item) {
              return item.code == code;
            });
            this.form.checkedCitiesName.push(c.name);
          });
        }
      } else {
        if (val) {
          this.form.checkedCities = this.codes.filter(item => {
            return item != this.otherCode;
          });
          this.form.checkedCitiesName = this.codeNames;
          if (otherChecked) {
            this.form.checkedCities.push(this.otherCode);
            var otherName = this.cities.filter(item => {
              return item.code == this.otherCode;
            })[0]["name"];
            this.form.checkedCitiesName.push(otherName);
          }
        } else {
          this.form.checkedCities = collectPluck(
            this.cities.filter(function(item) {
              return item.ischeck == 1;
            }),
            "code"
          );
          this.form.checkedCitiesName = collectPluck(
            this.cities.filter(function(item) {
              return item.ischeck == 1;
            }),
            "name"
          );
          if (otherChecked) {
            this.form.checkedCities.push(this.otherCode);
            var otherName = this.cities.filter(item => {
              return item.code == this.otherCode;
            })[0]["name"];
            this.form.checkedCitiesName.push(otherName);
          }
        }
      }
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = this.checkedBoxCount === this.allCheckBoxCount;
      this.isIndeterminate =
        checkedCount > 0 && this.checkedBoxCount < this.allCheckBoxCount;
      this.form.checkedCitiesName = [];
      this.form.checkedCities.forEach(code => {
        var c = this.cities.find(function(item) {
          return item.code == code;
        });
        this.form.checkedCitiesName.push(c.name);
      });
      if (this.form.checkedCities.includes(this.otherCode)) {
        this.$refs.otherContent[0].focus();
      } else {
        this.form.otherContent = "";
      }
    },
    // 检查表单
    checkFrom() {
      let status = true;
      if (this.isCheckForm) {
        this.$refs["formss"].validate((valid, s) => {
          status = valid;
        });
      }

      // 判断归档清单是否选择
      if (status) {
        this.form.checkedCities.length;
        var p1 = collectPluck(
          this.cities.filter(item => {
            return item.ischeck != 1;
          }),
          "code"
        );
        var sameArr = arrayGetSame(p1, this.form.checkedCities);
        if (sameArr.length == 0) {
          status = false;
          this.$message({
            type: "warning",
            message: "请选择归档清单"
          });
          return status;
        }
        var sameArr2 = arrayGetSame(this.form.checkedCities, this.picCode);
        if (sameArr2.length && this.form.imgList.length == 0) {
          status = false;
          this.$message({
            type: "warning",
            message: "请上传" + FILE_TYPE_NAME
          });
          return status;
        }
        if (
          this.form.checkedCities.includes(this.otherCode) &&
          this.form.otherContent.trim() == ""
        ) {
          status = false;
          this.$message({
            type: "warning",
            message: "请输入其他内容"
          });
          this.$refs.otherContent[0].focus();
        }
      }
      return status;
    },
    handleError(response, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败，请联系管理员"
      });
    },
    enter(index) {
      var tmp = this.form.imgList.slice(0);
      tmp[index].status2 = true;
      this.$set(this.form, "imgList", tmp);
    },
    leave(index) {
      var tmp = this.form.imgList.slice(0);
      tmp[index].status2 = false;
      this.$set(this.form, "imgList", tmp);
    },
    del(index) {
      let para =
        this.form.imgList[index].randomStr ||
        this.form.imgList[index].randomstr;

      orderdelimg(para).then(res => {
        if (res.data.success) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.form.imgList.splice(index, 1);
        } else {
          this.$message({
            message: "删除失败，请联系管理员",
            type: "warning"
          });
        }
      });
    },
    packageParams() {
      this.form.checkedCitiesName = [];
      var tmpCheckedCities = this.form.checkedCities.slice();
      tmpCheckedCities = tmpCheckedCities.filter(item => {
        return this.cities.some(i => {
          return i.code == item && i.ischeck != 1;
        });
      });
      var tmpCheckedCities2 = []; // 按归档清单排序
      this.cities.forEach(item => {
        if (tmpCheckedCities.includes(item.code)) {
          tmpCheckedCities2.push(item.code);
        }
      });
      tmpCheckedCities2.forEach(code => {
        var c = this.cities.find(function(item) {
          return item.code == code;
        });
        this.form.checkedCitiesName.push(c.name);
      });

      var params = {
        after: {
          plateno: this.form.haoma,
          pledgedate: this.form.time
            ? Moment(this.form.time).format("YYYY-MM-DD")
            : ""
        },
        postfile: {
          codes: tmpCheckedCities2.join(),
          names: this.form.checkedCitiesName.join(),
          camainno: this.docData.contract.camainno,
          dcpostid: this.docData.post.id,
          cacontractid: this.docData.contract.id
        },
        othername: tmpCheckedCities2.includes(this.otherCode)
          ? this.form.otherContent
          : "",
        ischecklv: ["sendpostl", "sendposteditl"].includes(this.$route.name)
          ? true
          : false
      };
      return params;
    },
    submit() {
      if (this.checkFrom()) {
        var para = this.packageParams();
        this.submitDisabled = true;
        saveDoc(para).then(res => {
          apiCommonDeal.call(
            this,
            res,
            data => {
              this.$message({
                message: "提交成功",
                type: "success"
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
      }
    },
    cancle() {
      this.isCancle = true;
      this.$router.push({
        path: "/dealer/afterloan/doclist/"
      });
    },
    initfunction() {
      var otherCode = this.otherCode;
      let routeName = this.$route.name;
      if (routeName == "sendpostdetail") {
        this.isDetail = true;
      }
      // 根据路由禁用某些功能
      if (["sendpost"].includes(routeName)) {
        this.id = this.$route.params.id;
        var para = { isedit: true, contractid: this.id, isnotpost: false };
        docDetail(para)
          .then(res => {
            apiCommonDeal.call(this, res, data => {
              this.docData = data;
              var categories = data.categorylist;
              var otherIndex = categories.findIndex(function(item) {
                return item.code == otherCode;
              });
              if (otherIndex != -1) {
                var otherObj = categories[otherIndex];
                categories.splice(otherIndex, 1);
                categories.push(otherObj);
              }
              this.cities = categories;

              var fileCode = arrayGetSame(
                collectPluck(categories, "code"),
                this.picCode
              );
              if (fileCode && fileCode.length) {
                FILE_TYPE_CODE = fileCode[0];
                FILE_TYPE_NAME = this.cities.find(item => {
                  return item.code == FILE_TYPE_CODE;
                })["name"];
              }

              var checkCollection = data.categorylist.filter(item => {
                return item.ischeck;
              });
              this.form.checkedCities = collectPluck(checkCollection, "code");

              this.form.haoma = data.after.plateno;
              //this.form.time = data.after.pledgedate;
              this.form.time =
                data.after.pledgedate == "1900/1/1 0:00:00"
                  ? ""
                  : data.after.pledgedate;
              this.form.otherContent = data.othername;
              this.form.imgList = data.picturelist;
              this.checkAll = this.allCheckBoxCount === this.checkedBoxCount;

              this.isIndeterminate =
                this.form.checkedCities.length > 0 &&
                this.checkedBoxCount < this.allCheckBoxCount;
              if (this.isCheckForm) {
                this.$set(this, "rules", this.rules2);
              } else {
                this.$set(this, "rules", {});
              }
              setTimeout(() => {
                this.$refs.formss.clearValidate();
              }, 0);
            });
          })
          .then(() => {
            this.isLoading = false;
          });
      } else {
        // 编辑、详情页
        this.id = this.$route.params.id;
        this.showBack = true;
        var isEdit = routeName == "sendpostdetail" ? false : true;
        var para = { isedit: isEdit, contractid: this.id, isnotpost: false };
        if (["sendpostl", "sendposteditl"].includes(routeName)) {
          para.isnotpost = true;
        }
        docDetail(para)
          .then(res => {
            apiCommonDeal.call(this, res, data => {
              this.docData = data;
              var categories = data.categorylist;
              var otherIndex = categories.findIndex(function(item) {
                return item.code == otherCode;
              });
              if (otherIndex != -1) {
                var otherObj = categories[otherIndex];
                categories.splice(otherIndex, 1);
                categories.push(otherObj);
              }
              this.cities = categories;

              var fileCode = arrayGetSame(
                collectPluck(categories, "code"),
                this.picCode
              );
              if (fileCode && fileCode.length) {
                FILE_TYPE_CODE = fileCode[0];
                FILE_TYPE_NAME = this.cities.find(item => {
                  return item.code == FILE_TYPE_CODE;
                })["name"];
              }

              var checkCollection = data.categorylist.filter(item => {
                return item.ischeck;
              });
              this.form.checkedCities = collectPluck(checkCollection, "code");
              this.form.haoma = data.after.plateno;
              this.form.otherContent = data.othername;
              this.form.time =
                data.after.pledgedate == "1900/1/1 0:00:00"
                  ? ""
                  : data.after.pledgedate;
              this.form.imgList = data.picturelist;
              this.checkAll = this.checkedBoxCount === this.allCheckBoxCount;
              this.isIndeterminate =
                this.form.checkedCities.length > 0 &&
                this.checkedBoxCount < this.allCheckBoxCount;
              if (this.isCheckForm) {
                if (this.isYingxiang) {
                  this.$set(this, "rules", this.rules3);
                } else {
                  this.$set(this, "rules", this.rules2);
                }
              } else {
                this.$set(this, "rules", {});
              }
              if (routeName != "sendpostdetail") {
                setTimeout(() => {
                  this.$refs.formss.clearValidate();
                }, 0);
              }
            });
          })
          .then(() => {
            this.isLoading = false;
          });
      }
      if (["sendpostl", "sendposteditl"].includes(routeName)) {
        this.mianLv = true;
      }
    },
    getMidSocket() {
      if (!this.$store.state.websocket.socket.isConnected) {
        this.$message({
          message: "没有安装中间件，请先安装中间件！！！！",
          type: "warning"
        });
        return false;
      }
      return true;
    },
    toDoWebsock() {
      var that = this;
      if (typeof this.websocketmessage === "string") {
        var objdata = JSON.parse(this.websocketmessage);
        if (objdata.Type === "PCCONNOK") {
          Cookies.set("MIDID", objdata.MidId);
        }
        // 高拍仪拍照成功，准备保存业务数据
        if (objdata.Type === "CAPOK") {
          console.log(objdata);

          var s = {};
          s.token = Cookies.get("Admin-Token");
          s.CID = that.id;
          s.MD5Data = objdata.Data;
          if (objdata.Data) {
            objdata.Data.forEach(function(ele, index) {
              let para = {};
              para = {
                Md5: ele.MD5,
                RandomStr: ele.GUID,
                ImCategoryCode: FILE_TYPE_CODE,
                CamainId: that.id,
                Scene: "3",
                UploadFrom: "0",
                MidId: Cookies.get("MIDID")
              };
              docimgsave(para).then(res => {
                if (!res.data.success) {
                  this.$message({
                    type: "warning",
                    message: res.data.message
                  });
                } else {
                  var predata = "PREVIEW " + JSON.stringify(s);
                  this.$store.dispatch("SocketConnect");
                  this.$store.dispatch("SocketSenddata", predata);
                }
              });
            });
            //todo 与上个方法代码冲突
            var predata = "PREVIEW " + JSON.stringify(s);
            this.$store.dispatch("SocketConnect");
            that.$store.dispatch("SocketSenddata", predata);
          }
        }
        // 预览图片
        if (objdata.Type === "PREVIEWRESULT") {
          if (!objdata.GUID) {
            return false;
          }
          let file = {};
          file = {
            imgtype: objdata.ImgType,
            url: "data:image/jpg;base64," + objdata.Data,
            guid: objdata.GUID,
            // status: objdata.States,
            status: 1,
            randomStr: objdata.GUID
          };
          if (!that.form.imgList.length) {
            that.form.imgList = [];
          }
          that.form.imgList.push(file);
          that.obj = that.form.imgList;
        }
        // 本地上传成功
        if (objdata.Type === "FILEOK") {
          if (!objdata.Result) {
            return false;
          }
          console.log(objdata);

          let file = {};
          file = {
            imgtype: objdata.ImgType,
            md5: objdata.MD5,
            url: "data:image/jpg;base64," + objdata.Data,
            guid: objdata.GUID,
            randomStr: objdata.GUID,
            status: 1
          };

          let para = {};
          para = {
            Md5: objdata.MD5,
            RandomStr: objdata.GUID,
            ImCategoryCode: FILE_TYPE_CODE,
            CamainId: that.id,
            Scene: "3",
            UploadFrom: "0",
            MidId: Cookies.get("MIDID")
          };
          docimgsave(para).then(res => {
            if (!res.data.success) {
              this.$message({
                type: "warning",
                message: res.data.message
              });
            } else {
              that.form.imgList.push(file);
            }
          });
        }
        // 准备上传本地图片
        if (objdata.Type === "STARTUPLOAD") {
          getBase64Image(that.file).then(function(result) {
            var str = result.split(",")[1];
            var n = 8240;
            var arr = [];
            var len = Math.ceil(str.length / n);
            for (var i = 0; i < len; i++) {
              if (str.length >= n) {
                var strCut = str.substring(0, n);
                arr.push(strCut);
                str = str.substring(n);
              } else {
                arr.push(str);
              }
            }
            arr.forEach(function(ele, index) {
              that.$store.state.websocket.socket.ws.send(
                "APPUPLOADDATA " + ele
              );
            });
            that.$store.state.websocket.socket.ws.send("UPLOADCOMPLETE ");
          });
        }
      } else {
        this.ceshiimg = window.URL.createObjectURL(this.websocketmessage);
      }
    },
    // 本地上传
    beforeAvatarUpload(file) {
      const isJPG = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/bmp",
        "image/gif"
      ].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message({
          type: "error",
          message: "上传格式不正确!"
        });
      }
      if (!isLt2M) {
        this.$message({
          type: "error",
          message: "文件大小不能超过20MB!"
        });
      }
      if (isJPG && isLt2M) {
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            this.acitonUrl =
              window.g.ApiUrl +
              "S120017/upload/?Md5=&sceneid=1200170001&randomstr=" +
              GUID();
            resolve();
          });
        });
        //this.localUpload(file);
        return true;
      }
      return false;
    },
    // 上传本地图片
    websocketSendFile(file) {
      var status = this.getMidSocket();
      if (!status) {
        return;
      }
      var that = this;
      var s = {};
      s.CID = that.id;
      s.SIZE = file.size;
      s.RATIO = "100";
      s.TYPE = FILE_TYPE_NAME;
      s.TOKEN = Cookies.get("Admin-Token"); // localStorage.getItem('Admin-Token')
      s.SUFFIX = file.type;
      var data = "PCUPLOAD " + JSON.stringify(s);
      this.file = file;
      this.$store.state.websocket.socket.ws.send(data);
    },
    // 本地上传图片
    localUpload(file) {
      this.websocketSendFile(file); // 中间件上传本地文件
    },
    // 高拍仪上传图片
    websocketSendFileApp() {
      var status = this.getMidSocket();
      if (!status) {
        return;
      }
      var that = this;
      var s = {};
      s.CID = that.id;
      s.RATIO = "100";
      s.TYPE = FILE_TYPE_CODE;
      s.TYPENAME = FILE_TYPE_NAME;
      s.VERSION = 1;
      s.TOKEN = Cookies.get("Admin-Token");
      s.APPID = Cookies.get("APPID");
      var data = "CAPPHOTO " + JSON.stringify(s);
      this.$store.state.websocket.socket.ws.send(data);
    },
    // 高拍仪上传图片
    appUpload() {
      this.websocketSendFileApp();
    },
    initImg() {
      var s = {};
      s.USERID = Cookies.get("userId"); // localStorage.getItem('userId')
      s.TOKEN = Cookies.get("Admin-Token");
      var data = "PCCONN " + JSON.stringify(s);
      this.$store.dispatch("SocketConnect");
      this.$store.dispatch("SocketSenddata", data);
    }
  },
  computed: {
    imgLists: function() {
      var list = this.form.imgList.slice(0);
      var picList = [];
      list.forEach(item => {
        var url = item.url || this.fileUrl + item.md5;
        picList.push(url);
      });
      return picList;
    },
    uploadImg: function() {
      let picItems = this.picCode;
      return picItems.some(code => {
        return this.form.checkedCities.includes(code);
      });
    },
    codes: function() {
      return collectPluck(this.cities, "code");
    },
    codeNames: function() {
      return collectPluck(this.cities, "name").filter(item => {
        return item.code != this.otherCode;
      });
    },
    isAllowUpload: function() {
      var isDetail = this.isDetail;
      // 绿本和绿本影像件只有在选中状态并且ischeck!=1即非原来选择的  才可以上传
      var activeCheckBotton = collectPluck(
        this.cities.filter(function(item) {
          return item.ischeck != 1;
        }),
        "code"
      );
      var allowCheck = arrayGetSame(activeCheckBotton, this.picCode).length;
      return !isDetail && allowCheck;
    },
    allCheckBoxCount: function() {
      // 排除其他选项
      return this.cities.filter(item => {
        return item.code != this.otherCode;
      }).length;
    },
    checkedBoxCount: function() {
      // 排除其他选项
      return this.form.checkedCities.filter(item => {
        return item != this.otherCode;
      }).length;
    },
    isCheckForm: function() {
      // 只有选择机动车登记证书或影像件时才会校验车辆信息
      var hasPic = this.cities.filter(item => {
        return (
          item.ischeck != 1 &&
          this.picCode.includes(item.code) &&
          this.form.checkedCities.includes(item.code)
        );
      }).length;
      return !!hasPic;
    },
    isYingxiang: function() {
      // 只有免抵押才只验证车牌号并禁用登记时间
      var yingxiang = this.cities.filter(item => {
        return item.code == "3601";
      }).length;
      return !!yingxiang;
    },
    isTuihui: function() {
      // 合同取消和审批拒绝状态禁止输入车牌号和登记时间  只有申请书和其他为上述两种状态
      // return this.cities.length == 2;
      // 根据状态判断
      return !["6", "9"].includes(this.docData.contract.status);
    }
  },
  watch: {
    "$store.state.websocket.socket.message": function() {
      var that = this;
      if (this.$store.state.websocket.socket.message) {
        that.websocketmessage = this.$store.state.websocket.socket.message;
        that.toDoWebsock();
      }
    },
    isCheckForm: function(value) {
      if (value) {
        if (this.isYingxiang) {
          this.$set(this, "rules", this.rules3);
        } else {
          this.$set(this, "rules", this.rules2);
        }
      } else {
        this.$set(this, "rules", {});
        this.$refs["formss"].clearValidate();
      }
    },
    imgLists: function(newV, oldV) {
      if (newV.join(",") == oldV.join(",")) {
      } else {
        this.imgLists2 = newV;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$title-color: #333;
$title-fontsize: 12px;
$sub-color: #666;
$sub-fontsize: 12px;

@mixin c-title {
  font-size: 14px;
  color: #333;
  font-weight: bold;
  padding: 10px 24px;
  border-bottom: 1px solid #e3e3e3;
}
.searchbar {
  padding-bottom: 0;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
.title {
  @include c-title;
}
.lxn_formdata {
  overflow: hidden;
  line-height: 24px;
  padding: 16px 0;
  div:nth-child(1) {
    padding-left: 24px;
  }
  div {
    float: left;
    p {
      color: $title-color;
      font-size: $title-fontsize;
      span {
        color: $sub-color;
        font-size: $sub-fontsize;
      }
    }
  }
}
.yw_yj {
  margin-top: 8px;
  overflow: hidden;
}
.leftbox {
  float: left;
}
.rightbox {
  float: right;
}
.formtitle {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @include c-title;
  p {
    span {
      padding: 1px 4px;
      background: #f0f2f5;
      border-radius: 2px;
      color: #999;
    }
  }
}
.senddetail {
  padding: 13px 24px;
  div {
    margin: 8px 0;
    label {
      color: $title-color;
      font-size: $title-fontsize;
      font-weight: normal;
    }
    span {
      color: $sub-color;
      font-size: $sub-fontsize;
      font-weight: normal;
    }
  }
}
.kzm {
  height: 17px;
  font-size: 12px;
  color: #999;
  font-weight: normal;
  line-height: 17px;
}
.avatar-uploader {
  font-size: 28px;
  color: #8c939d;
  width: 115px;
  float: left;
  text-align: center;
  margin: 8px 8px 8px 0;
  margin-top: 10px;
}
.imagePost {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  float: left;
  line-height: 120px;
  text-align: center;
  margin: 0 8px 8px 8px;
}
.imgLIst {
  position: relative;
}
.imgLIst img {
  width: 120px;
  height: 120px;
  display: block;
}
.imgLIst span {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 32px;
  line-height: 24px;
  text-align: right;
  padding-right: 8px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.85) 100%
  );
}
.imgLIst span i {
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.lxn_flex {
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.lxn_nav {
  overflow: hidden;
}
.lxn_nav div {
  width: 80px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background-color: rgba(51, 51, 51, 0.05);
  color: #000000;
  border-radius: 2px;
  position: relative;
  float: left;
  font-size: 12px;
  cursor: pointer;
  margin-right: 8px;
}
.lxn_nav div.active {
  background-color: #c6e6fd;
  color: #1890ff;
}
.lxn_nav div img {
  position: absolute;
  bottom: 0;
  right: 0;
  display: none;
}
.lxn_nav div.active img {
  display: block;
}
.tishi {
  height: 56px;
  line-height: 56px;
  padding: 0 24px;
  background-color: #f7f8f8;
  color: #333;
  font-size: 18px;
}
.tishiCont {
  border-top: 1px solid #e9e9e9;
  padding: 15px 24px;
  color: #333;
  line-height: 18px;
}
.bill_group {
  width: 100%;
}
.bill_group /deep/ .el-checkbox__label {
  font-size: 12px;
}
.bill {
  float: left;
  width: 25%;
  box-sizing: border-box;
  margin: 3px 0;
}
.bill:not(.checkboxInput) {
  padding: 3.5px 0;
}
.zhezhao {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
}
.checkboxInput {
  width: 50%;
}
// .bill_group /deep/ .is-disabled .el-checkbox__inner {
//   background-color: #fff !important;
//   border-color: #409eff !important;
// }
// .bill_group /deep/ .is-disabled .el-checkbox__inner::after {
//   border-color: #409eff !important;
// }
.searchbar /deep/ .el-form-item__label {
  font-size: $title-fontsize;
  color: $title-color;
  font-weight: normal;
}
.refuse-table /deep/ tbody .cell {
  font-weight: normal;
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

