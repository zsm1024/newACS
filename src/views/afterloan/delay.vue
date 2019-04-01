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
              :to="{path:'/dealer/afterloan/delaylist'}"
            >
              延期管理
            </router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{isEdit?"草稿":(isDetail?'查看':'延期申请')}}</el-breadcrumb-item>
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
            type="success"
            class="btnnextcolor"
            size="small"
            style="width:60px"
            @click="doCancle"
            v-if="isEdit"
          >删除</el-button>
          <el-button
            type="success"
            size="small"
            class="btnnextcolor"
            style="width:60px"
            @click="doTmpSave"
          >暂存</el-button>
          <el-button
            size="small"
            style="width:60px"
            type="primary"
            class="btncolor"
            :disabled="submitDisabled"
            @click="doSave"
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
              <span>{{delayData.contract.camainno}}</span>
            </p>
            <p>VIN号：
              <span>{{delayData.contract.vin}}</span>
            </p>
            <p>贷款金额：
              <span>{{delayData.contract.loanmoney | numberFixed}}</span>
            </p>
          </div>
          <div style='width:321px'>
            <p>客户姓名：
              <span>{{delayData.contract.borrowername}}</span>
            </p>
            <p>案件类别：
              <span>{{delayData.contract.refData.categoryname}}</span>
            </p>
            <p>归档状态：
              <span>{{delayData.contract.refData.caafterstatusfilename}}</span>
            </p>
          </div>
          <div style="width:432px">
            <p>证件号码：
              <span>{{delayData.contract.card}}</span>
            </p>
            <p>案件状态：
              <span>{{delayData.contract.refData.statusname}}</span>
            </p>
            <p>最后邮寄期限：
              <span>{{delayData.contract.caafterlimitdate | momentShort}}</span>
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
                <strong>延期记录</strong>
              </p>
            </div>
            <div class="senddetail">
              <div>
                <label>延期次数：</label>
                <span>{{delayData.delayApp.dtimes}}</span>
              </div>
              <div>
                <label>累计天数：</label>
                <span>{{delayData.delayApp.totaldays}}</span>
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
              <strong>延期申请</strong>
            </p>
          </div>
          <div
            class="lxn_formdata"
            style="padding-right:24px;"
            v-if="isDetail"
          >
            <div>
              <p>申请时间：
                <span>{{form.cdate}}</span>
              </p>
              <p>延期天数：
                <span>{{form.number}}</span>
              </p>
              <p style="display:flex"><span style="color: #333;white-space: nowrap;">延期原因：</span>
                <span>{{form.desc}}</span>
              </p>
            </div>
          </div>
          <el-form
            v-else
            :model="form"
            ref="form"
            :rules="rules"
            size="medium"
            class="delay-box"
            inline
            style="padding:16px 24px 4px 0"
          >
            <el-form-item
              label="申请时间"
              prop="cdate"
              label-width="90px"
            >
              <el-date-picker
                v-model="form.cdate"
                type="date"
                disabled
                style="width:256px;"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="延期天数"
              prop="number"
              label-width="80px"
            >
              <el-input
                v-model="form.number"
                type="number"
                style="width:256px"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="延期原因"
              prop="desc"
              label-width="90px"
              class="desc"
            >
              <el-input
                type="textarea"
                autosize
                v-model="form.desc"
                style="width:608px"
                size="small"
              ></el-input>
            </el-form-item>
          </el-form>
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
              <strong>申请文件</strong>
            </p>
            <el-checkbox
              v-show="!isDetail"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
          </div>
          <div class="formtitle">
            <el-checkbox-group
              v-model="form.checkedCities"
              @change="handleCheckedCitiesChange"
              class="bill_group"
            >
              <el-checkbox
                v-for="city in cities"
                :label="city.code"
                :disabled="isDetail"
                :key="city.code"
                class="bill"
              >{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-row>

      </el-row>
    </div>
  </div>
</template>

<script>
import moment from "moment/moment";
import { getToken } from "@/utils/auth";
import { collectPluck, apiCommonDeal, objectReplace } from "@/utils/index";
import { createDelay, delayDetail, saveDelay, delDelay } from "@/api/afterloan";
import mixin from "@/mixins/mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      submitDisabled: false,
      checkAll: false,
      isDetail: false,
      isEdit: false,
      isLoading: true,
      delayId: "",
      camainNo: "",
      cities: [],
      isIndeterminate: true,
      uploadHeader: {
        Authorization: "Bearer " + getToken()
      },
      acitonUrl:
        window.g.ApiUrl + "S120017/upload/?Md5=&sceneid=1100310001&randomstr=",
      form: {
        cdate: "",
        number: "",
        desc: "",
        checkedCities: []
      },
      formLabelWidth: "118px",
      delayData: {
        contract: {
          refData: {}
        },
        categoryList: {},
        delayApp: {}
      },
      imgList: [],
      rules: {
        number: [{ required: true, message: "请输入天数", trigger: "change" }],
        desc: [{ required: true, message: "请输入原因", trigger: "change" }]
      }
    };
  },
  mounted() {
    this.initfunction();
  },
  methods: {
    handleCheckAllChange(val) {
      this.form.checkedCities = val ? this.codes : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 检查表单
    checkFrom() {
      let status = false;
      this.$refs["form"].validate((valid, s) => {
        status = valid;
      });
      if (status && this.form.checkedCities.length == 0) {
        status = false;
        this.$message({
          type: "warning",
          message: "请选择申请文件"
        });
      }
      return status;
    },
    doCancle() {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = this.delayId;
          delDelay(id).then(res => {
            apiCommonDeal.call(this, res, data => {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.$router.push({
                path: "/dealer/afterloan/delaylist"
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
    doTmpSave() {
      var para = {
        reason: this.form.desc,
        days: this.form.number,
        delayfile: this.form.checkedCities.join(),
        cacontractno: this.camainNo,
        id: this.delayId,
        submit: false
      };
      saveDelay(para).then(res => {
        apiCommonDeal.call(this, res, data => {
          this.$message({
            message: "暂存成功",
            type: "success"
          });
        });
      });
    },
    doSave() {
      if (this.checkFrom()) {
        let routeName = this.$route.name;

        var para = {
          reason: this.form.desc,
          days: String(this.form.number),
          delayfile: this.form.checkedCities.join(),
          cacontractno: this.camainNo,
          id: this.delayId,
          submit: true
        };
        this.submitDisabled = true;
        saveDelay(para).then(res => {
          apiCommonDeal.call(
            this,
            res,
            data => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              if (routeName == "delay") {
                this.$router.push({
                  path: "/dealer/afterloan/doclist"
                });
              } else {
                this.$router.push({
                  path: "/dealer/afterloan/delaylist"
                });
              }
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
    initfunction() {
      let routeName = this.$route.name;
      // 根据路由禁用某些功能
      if (routeName === "delaydetail") {
        this.isDetail = true;
      } else if (routeName === "delayedit") {
        this.isEdit = true;
      }
      if (["delaydetail", "delayedit"].includes(routeName)) {
        this.delayId = this.$route.params.id;
        delayDetail(this.delayId)
          .then(res => {
            apiCommonDeal.call(this, res, data => {
              this.delayData = data;
              this.cities = data.categoryList;
              var checkCollection = data.categoryList.filter(item => {
                return item.ischeck;
              });
              this.form.checkedCities = collectPluck(checkCollection, "code");
              this.form.number = data.delayApp.days;
              this.form.desc = data.delayApp.reason;

              this.form.cdate = moment(data.delayApp.cdate).format(
                "YYYY-MM-DD"
              );

              this.camainNo = this.delayData.contract.camainno;
              this.checkAll =
                this.form.checkedCities.length === this.cities.length;
              this.isIndeterminate =
                this.form.checkedCities.length > 0 &&
                this.form.checkedCities.length < this.cities.length;
            });
          })
          .then(() => {
            this.isLoading = false;
          });
      } else {
        this.camainNo = this.$route.params.no;
        createDelay(this.camainNo)
          .then(res => {
            apiCommonDeal.call(this, res, data => {
              this.delayData = data;
              this.delayId = data.delayApp.id;
              this.cities = data.categoryList;
              this.form.cdate = moment().format("YYYY-MM-DD");
              var checkCollection = data.categoryList.filter(item => {
                return item.ischeck;
              });
              this.form.checkedCities = collectPluck(checkCollection, "code");
              this.checkAll =
                this.form.checkedCities.length === this.cities.length;
              this.isIndeterminate =
                this.form.checkedCities.length > 0 &&
                this.form.checkedCities.length < this.cities.length;
            });
          })
          .then(() => {
            this.isLoading = false;
          });
      }
    }
  },
  computed: {
    codes: function() {
      return collectPluck(this.cities, "code");
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
  span {
    color: rgba(0, 0, 0, 0.65);
  }
}
.delay-box /deep/ input[type="number"]::-webkit-inner-spin-button,
.delay-box /deep/ input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.delay-box /deep/ .el-date-editor .el-input__inner {
  height: 32px;
  line-height: 32px;
}
.delay-box /deep/ .el-form-item__label {
  color: $title-color;
  font-size: $title-fontsize;
  font-weight: normal;
}
.delay-box /deep/ input[type="number"] {
  -moz-appearance: textfield;
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
  line-height: 17px;
}
.avatar-uploader,
.imagePost {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  float: left;
  line-height: 120px;
  text-align: center;
  margin: 0 8px 8px 0;
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
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 120px;
}
.imgLIst span i {
  color: #fff;
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
.desc /deep/ .el-form-item__content {
  line-height: unset;
  margin-top: 4px;
}
.bill {
  float: left;
  width: 25%;
  box-sizing: border-box;
  margin: 3px 0;
}
.zhezhao {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
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

