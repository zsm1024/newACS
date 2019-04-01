<template>
  <div class="app-container addInsulist" style="margin-top:5px;position:relative;">
    <el-row>
      <el-col :span="11">
        <el-breadcrumb separator="/" class="app-breadcrumb">
          <el-breadcrumb-item class="firstbread">贷后管理</el-breadcrumb-item>
          <el-breadcrumb-item class="firstbread">
            <router-link
              style="color:#606266;font-weight: 100;"
              :to="{path:'/dealer/afterloan/insulist'}"
            >保险业务</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>保险申请</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col
        :span="13"
        align="right"
        class="topmiddle topbtnbasic"
        style="padding-right:0;margin:3px 0 8px 0"
      >
        <div class="lxn_button">
          <el-button
            type="success"
            size="small"
            class="btnnextcolor"
            style="width:60px"
            @click="submit(0)"
          >暂存</el-button>
          <el-button
            type="success"
            size="small"
            class="btncolor"
            style="width:60px"
            @click="submit(1)"
          >提交</el-button>
        </div>
      </el-col>
    </el-row>
    <div v-loading="isLoading">
      <el-row class="searchbar">
        <h1 class="title">客户信息</h1>
        <div class="lxn_formdata">
          <div style="width:447px">
            <p>
              申请编号：
              <span>{{data.camainno}}</span>
            </p>
            <p>
              案件类别：
              <span>{{data.cacontractcategory}}</span>
            </p>
          </div>
          <div style="width:321px">
            <p>
              客户姓名：
              <span>{{data.cacontractborrowername}}</span>
            </p>
            <p>
              案件状态：
              <span>{{data.cacontractstatus}}</span>
            </p>
            <!-- <p>激活时间：<span>{{data.cacontractactivedate}}</span></p> -->
          </div>
          <div style="width:432px">
            <p>
              证件号码：
              <span>{{data.cacontractcard}}</span>
            </p>
          </div>
        </div>
      </el-row>
      <el-row class="yw_yj">
        <el-row
          class="searchbar leftbox"
          style="width:736px;background-color: #F0F2F5;box-shadow:none"
        >
          <div class="top">
            <div class="formtitle">
              <p>
                <strong>保险业务</strong>
                <!-- <span>草稿</span> -->
              </p>
              <!-- <span class="time">{{newdatatime}}</span> -->
            </div>

            <div class="el-form-item lxn_flex">
              <label
                class="el-form-item__label"
                style="width: 118px;line-height:36px;font-size:12px;color: #333"
              >业务类型</label>
              <div>
                <div class="el-input lxn_nav">
                  <div
                    :class="form.status==1? 'active':''"
                    @click="form.status=1,resetForm('formdata')"
                  >
                    <span>保险理赔</span>
                    <img src="../../assets/images/xuanzhong.png">
                  </div>
                  <div
                    :class="form.status==2? 'active':''"
                    @click="form.status=2,resetForm('formdata')"
                  >
                    <span>保险批改</span>
                    <img src="../../assets/images/xuanzhong.png">
                  </div>
                  <div
                    :class="form.status==3? 'active':''"
                    @click="form.status=3,resetForm('formdata')"
                  >
                    <span>保险退保</span>
                    <img src="../../assets/images/xuanzhong.png">
                  </div>
                </div>
              </div>
            </div>
            <el-form
              :model="form"
              ref="formdata"
              size="medium"
              style="padding:0 24px 4px 0;overflow:hidden"
            >
              <el-col :span="12">
                <el-form-item
                  label="申请时间"
                  class="smallsize"
                  prop="jxsmobile"
                  :label-width="formLabelWidth"
                >
                  <el-date-picker
                    v-model="newdatatime"
                    type="date"
                    size="small"
                    style="width:100%"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="form.status==1">
                <div style="position: relative;">
                  <span v-if="form.status==1" class="tagging">*</span>
                  <el-form-item
                    label="报案号"
                    prop="reportno"
                    class="smallsize"
                    :label-width="formLabelWidth"
                  >
                    <el-input v-model="form.reportno" size="small"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12" v-if="form.status==1">
                <el-form-item
                  label="出险日期"
                  class="smallsize"
                  prop="reportdate"
                  :label-width="formLabelWidth"
                  :rules="[
                        { required: true, message: '请输入出险日期', trigger: 'input' },
                        ]"
                >
                  <el-date-picker
                    type="date"
                    v-model="form.reportdate"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="选择日期"
                    size="small"
                  ></el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item
                  label="经销商电话"
                  class="smallsize"
                  prop="jxsmobile"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.jxsmobile"
                    @input="form.jxsmobile.length>11?form.jxsmobile=form.jxsmobile.slice(0,11):form.jxsmobile"
                    type="number"
                    size="small"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24" v-if="form.status==1">
                <el-form-item
                  class="smallsize"
                  label="理赔原因"
                  prop="memo"
                  :label-width="formLabelWidth"
                >
                  <el-input maxlength="250" v-model="form.memo" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="form.status==2">
                <el-form-item
                  label="批改原因"
                  class="smallsize"
                  prop="memo"
                  :label-width="formLabelWidth"
                  :rules="[
                        { required: true, message: '请输入批改原因', trigger: 'input' },
                        ]"
                >
                  <el-input maxlength="250" v-model="form.memo" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="form.status==3">
                <el-form-item
                  label="退保原因"
                  class="smallsize"
                  prop="memo"
                  :label-width="formLabelWidth"
                  :rules="[
                        { required: true, message: '请输入退保原因', trigger: 'input' },
                        ]"
                >
                  <el-input maxlength="250" v-model="form.memo" size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <div class="el-form-item lxn_flex" style="margin:0;">
                  <label
                    class="el-form-item__label"
                    style="width: 118px;line-height:36px;font-size:12px;color: #333"
                  >授权书原件</label>
                  <div>
                    <el-radio-group v-model="isoriginal" class="smallradio">
                      <el-radio label="1">邮寄</el-radio>
                      <el-radio label="0">不邮寄</el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <div v-if="isoriginal == '1'">
                  <el-col :span="12">
                    <el-form-item label="收件人" :label-width="formLabelWidth" class="smallsize">
                      <el-input v-model="form.recperson" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="收件人电话" :label-width="formLabelWidth" class="smallsize">
                      <el-input
                        v-model="form.recmobile"
                        @input="form.recmobile.length>11?form.recmobile=form.recmobile.slice(0,11):form.recmobile"
                        type="number"
                        size="small"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="收件地址" class="smallsize" :label-width="formLabelWidth">
                      <el-input v-model="form.recaddress" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
              </el-col>
            </el-form>
          </div>
          <div class="botm">
            <div class="formtitle">
              <p>
                <strong>
                  <small style="color:#F3675C">*</small>保险业务图片
                </strong>
              </p>
            </div>
            <viewer :images="imgList">
              <div class="insulistImglist">
                <el-upload
                  v-show="imgList.length<30"
                  :class="[shows&&imgList.length<30?'empty':'', 'avatar-uploader']"
                  style="border: 1px solid #e8e8e8;border-radius: 4px"
                  :headers="uploadHeader"
                  :action="acitonUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :on-error="handleError"
                  :before-upload="beforeAvatarUpload"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div
                  class="imagePost imgLIst"
                  :key="index"
                  v-for="(img,index) in imgList"
                  @mouseenter="enter(index)"
                  @mouseleave="leave(index)"
                >
                  <img :src="img.url">
                  <span v-show="img.status">
                    <i class="el-icon-delete" @click="del(index)"></i>
                  </span>
                </div>
              </div>
            </viewer>
            <p v-if="shows&&imgList.length==0" style="color:#f56c6c;padding-left:24px">图片不能为空</p>
            <p class="kzm">支持扩展名：.jpg .bmp .jpeg .png .gif</p>
          </div>
        </el-row>
        <div class="rightbox" style="width:456px">
          <el-row class="searchbar">
            <div class="tishi">
              <!-- <i
                style="font-size:16px;color:#627182"
                class="el-icon-info"
              ></i>-->
              <strong>提示</strong>
            </div>
            <p class="tishiCont">1.交警队出具的事故认定书，如未报交警，则提供由保险公司出具的出险信息表、查勘记录、保险索赔书等；
              <br>2.事故中需我司授权理赔的车辆由保险公司出具的制式机打定损单并加盖理赔业务专用章；
              <br>3.无法在定损单上体现的需我司授权理赔的金额，包括施救费、物损费、人伤赔付等需单独提供凭证。
            </p>
          </el-row>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { addinsu, submitinsu, saveinsu, getlist, save } from "@/api/afterloan";
import { getToken } from "@/utils/auth";
import {
  isEmpty,
  objectReplace,
  objectOnly,
  objectExcept
} from "@/utils/index";
export default {
  data() {
    return {
      isLoading: true,
      formdesc: "",
      uploadHeader: {
        Authorization: "Bearer " + getToken()
      },
      acitonUrl:
        window.g.ApiUrl + "S120017/upload/?Md5=&sceneid=1100310001&randomstr=",
      form: {
        reportno: "", //报案号
        reportdate: "", //报案日期
        jxsmobile: "", //经销商电话
        memo: "", //备注
        inmd5: [],
        status: 1,
        recperson: "", //收件人
        recmobile: "", //电话
        recaddress: "" //地址
      },
      formLabelWidth: "118px",
      imageUrl: "",
      formdesc: "",
      imgList: [],
      shows: false,
      data: {},
      isoriginal: "0", //是否邮寄1邮寄0不邮寄
      newdatatime: "" //当前时间点
    };
  },
  mounted() {
    this.datail();
  },
  methods: {
    mouseovermsg() {
      console.log(25454);
    },
    handleChange(value) {},
    handleAvatarSuccess(res, file) {
      var i = this.inx;
      var obj = {
        status: false,
        url: URL.createObjectURL(file.raw)
      };
      if (res.success == 1) {
        this.imgList.push(obj);
        this.form.inmd5.push(res.data.md5);
      } else {
        this.$message({
          type: "error",
          message: res.message
        });
      }
    },
    beforeAvatarUpload(file) {
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
    handleError(response, file, fileList) {
      this.$message({
        type: "error",
        message: res.data.message
      });
    },
    enter(index) {
      this.imgList[index].status = true;
    },
    leave(index) {
      this.imgList[index].status = false;
    },
    del(index) {
      this.imgList.splice(index, 1);
      this.form.inmd5.splice(index, 1);
    },
    submit(index) {
      let oldpara = objectReplace(this.form, { status: "type" });
      oldpara.inmd5 = oldpara.inmd5.join(",");
      var para;
      if (this.form.status != 1) {
        para = objectExcept(oldpara, ["reportno", "reportdate"]);
      } else {
        para = oldpara;
      }
      if (para.inmd5 == "" && index == 1) {
        this.$message({
          type: "error",
          message: "请上传保险业务图片"
        });
      } else {
        para.isoriginal = this.isoriginal;
        para.camainno = this.data.camainno;
        para.contractno = this.data.contractno;
        para.id = this.data.id;
        if (index == 1) {
          //提交
          submitinsu(para).then(res => {
            if (res.data.success) {
              this.data = res.data.data;
              this.$message({
                type: "success",
                message: "提交成功！"
              });
              this.$router.push({
                path: "/dealer/afterloan/insulist"
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          });
        } else {
          //暂存
          saveinsu(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "暂存成功！"
              });
              this.$router.push({
                path: "/dealer/afterloan/editinsulist/" + para.id
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          });
        }
      }
    },
    resetForm(formdata) {
      this.$refs[formdata].resetFields();
      this.shows = false;
    },
    datail() {
      var moment = require("moment");
      this.newdatatime = moment().format("YYYY-MM-DD HH:mm:ss");
      var para = this.$route.params.id;
      addinsu(para)
        .then(res => {
          this.listLoading = false;
          if (res.data.success) {
            this.data = res.data.data;
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        })
        .then(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.title {
  font-size: 14px;
  padding: 10px 0 10px 24px;
  border-bottom: 1px solid rgba(216, 216, 216, 1);
  color: rgba(0, 0, 0, 0.85);
}
.searchbar {
  position: relative;
  padding-bottom: 0;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
.lxn_formdata {
  overflow: hidden;
  line-height: 24px;
  padding: 16px 0;
  position: relative;
  div:nth-child(1) {
    padding-left: 24px;
  }
  div {
    float: left;
    p {
      color: #333;
      font-size: 12px;
      span {
        color: #666;
        font-size: 12px;
      }
    }
  }
}
.insulistImglist {
  padding: 16px 0px 0px 16px;
  overflow: hidden;
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
  padding: 10px 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid rgba(216, 216, 216, 1);
  p {
    strong {
      font-size: 14px;
      color: #333;
    }
    span {
      padding: 1px 4px;
      background: rgba(240, 242, 245, 1);
      border-radius: 2px;
      color: RGBA(153, 153, 153, 1);
    }
  }
  span {
    color: RGBA(0, 0, 0, 0.65);
  }
}
.kzm {
  padding-left: 24px;
  height: 17px;
  font-size: 12px;
  color: rgba(153, 153, 153, 1);
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
  margin: 0 24px 8px 0;
}
.imgLIst {
  position: relative;
  img {
    width: 120px;
    height: 120px;
    display: block;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
  }
  span {
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
    i {
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
.lxn_flex {
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.lxn_nav {
  overflow: hidden;
  div {
    width: 80px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: RGBA(51, 51, 51, 0.05);
    color: #000000;
    border-radius: 2px;
    position: relative;
    float: left;
    font-size: 12px;
    cursor: pointer;
    margin-right: 8px;
    &.active {
      background-color: #c6e6fd;
      color: #1890ff;
      img {
        display: block;
      }
    }
    img {
      position: absolute;
      bottom: 0;
      right: 0;
      display: none;
    }
  }
}
.tishi {
  height: 42px;
  line-height: 42px;
  padding: 0 24px;
  color: #333;
  strong {
    font-size: 14px;
  }
}
.tishiCont {
  border-top: 1px solid #e9e9e9;
  padding: 15px 24px;
  color: #666;
  line-height: 18px;
}

.reply {
  word-break: break-all;
  /* 支持IE和chrome，FF不支持*/
  word-wrap: break-word;
  /* 以上三个浏览器均支持 */
  position: relative;
  margin: 0.672rem 3.1rem 1.096rem 0;
  padding: 0.408rem 0.816rem;
  border: 1px solid rgba(#9ea7fc, 0.35);
  border-radius: 0.5rem;
  background-color: rgba(#65b6f7, 0.03);
  &:after {
    content: "";
    width: 0px;
    height: 0px;
    border-color: transparent transparent #faf8f3 transparent;
    border-style: solid;
    border-width: 6px;
    position: absolute;
    top: -11px;
    border-radius: 3px;
    left: 18px;
    right: auto;
  }
  &:before {
    content: "";
    width: 0px;
    height: 0px;
    border-color: transparent transparent rgba(#9ea7fc, 0.35) transparent;
    border-style: solid;
    border-width: 7px;
    position: absolute;
    top: -14px;
    border-radius: 3px;
    left: 17px;
    right: auto;
  }
}
.tagging {
  position: absolute;
  left: 54px;
  top: 7px;
  font-size: 14px;
  color: #f00;
}
.top {
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  background-color: #fff;
}
.botm {
  padding-bottom: 16px;
  margin-top: 10px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  background-color: #fff;
}
.top,
.botm {
  border-radius: 4px;
}
.empty {
  border-color: #f56c6c !important;
}
.addInsulist /deep/ .el-form-item.is-success .el-input__inner {
  border-color: #c0c4cc !important;
}
.addInsulist /deep/ .ivu-modal-close {
  right: 7px;
  top: -4px;
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
.smallradio /deep/ span {
  font-size: 12px;
}
.smallsize /deep/ label {
  font-size: 12px;
  color: #333;
}
</style>

