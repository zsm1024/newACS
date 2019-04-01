<template>
  <div class="app-container" style="margin-top:5px;position:relative;">
    <el-row>
      <el-col :span="11">
        <el-breadcrumb
          separator="/"
          class="app-breadcrumb"
        >
          <el-breadcrumb-item class="firstbread">贷后管理</el-breadcrumb-item>
          <el-breadcrumb-item>
            <router-link
              style="color:#606266;font-weight: 100;cursor: pointer;"
              :to="{path:'/dealer/afterloan/insulist'}"
            >保险业务</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="data.statusex=='32'">核准</el-breadcrumb-item>
          <el-breadcrumb-item v-else-if="data.statusex=='31'">拒绝</el-breadcrumb-item>
          <el-breadcrumb-item v-else-if="data.statusex=='2'">待处理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col
        :span="13"
        align="right"
        class="topmiddle topbtnbasic" style="padding-right:0;margin:3px 0 8px 0"
      >
        <div class="lxn_button">
          <el-button
            type="success"
            size="small"
            style="width:60px"
            class="btncolor"
            v-if="data.type=='1' && data.statusex=='32'"
            @click="printing(data.id,data.camainno)"
          >打印</el-button>
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
              <span>{{data.refData.cacontractcategoryname}}</span>
            </p>
          </div>
          <div style="width:321px">
            <p>
              客户姓名：
              <span>{{data.cacontractborrowername}}</span>
            </p>
            <p>
              案件状态：
              <span>{{data.refData.cacontractstatusname}}</span>
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
        <el-badge
          :value="liuyan_num"
          :max="99"
          class="item liuyan"
          v-if="itemmsg.length > 0"
        >
          <img
            @click="toliuyan"
            src="../../assets/images/icon_liuyan.png"
          >
        </el-badge>
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
                <!-- <span v-if="data.status=='1'">草稿</span>
                <span
                  class="ycl"
                  v-if="data.status=='3'"
                >已完成</span>
                <span
                  class="dcl"
                  v-if="data.status=='2'"
                >已提交</span> -->
              </p>
            </div>
            <ul
              class="lxn_formdata"
              style="padding:16px 24px"
            >
              <li>
                <p>
                  业务类型：
                  <span>{{data.refData.typename}}</span>
                </p>
                <p v-show="data.type=='1'">
                  报案号：
                  <span>{{data.reportno}}</span>
                </p>
                <p v-show="data.type=='1'">
                  出险日期：
                  <span>{{data.reportdate}}</span>
                </p>
                <p>
                  经销商电话：
                  <span>{{data.jxsmobile}}</span>
                </p>
                <p style="display:flex">
                  <span v-if="data.type=='1'" style="white-space: nowrap;color:#333">理赔原因：</span>
                  <span v-else-if="data.type=='2'" style="white-space: nowrap;color:#333">批改原因：</span>
                  <span v-else style="white-space: nowrap;color:#333">退保原因：</span>
                  <span>{{data.memo}}</span>
                </p>
              </li>
              <li>
                <p>
                  授权书原件：
                  <span v-if="data.isoriginal=='1'">邮寄</span>
                  <span v-else>不邮寄</span>
                </p>
              </li>
              <li v-if="data.isoriginal=='1'"> 
                <p>
                  收件人：
                  <span>{{data.recperson}}</span>
                </p>
                <p>
                  收件人电话：
                  <span>{{data.recmobile}}</span>
                </p>
                <p>
                  收件地址：
                  <span>{{data.recaddress}}</span>
                </p>
                <p>
                  运单编号：
                  <span>{{data.refData.postcompanyname}}/{{data.postno}}</span>
                </p>
              </li>
            </ul>
          </div>

          <div
            class="center"
            v-if="shangchuanimgList.length!=0"
          >
            <div class="formtitle">
              <p>
                <strong>保险业务图片</strong>
              </p>
            </div>
            <viewer :images="shangchuanimgList">
              <div class="imgList">
                <img
                  v-for="(img,index) in shangchuanimgList"
                  :key="index"
                  :src="imageUrl+img"
                  class="imagePost"
                >
              </div>
            </viewer>
          </div>

          <div
            class="botm"
            v-if="huichuanimgList.length!=0"
          >
            <div class="formtitle">
              <p>
                <strong>业务回传图片</strong>
              </p>
            </div>
            <viewer :images="huichuanimgList">
              <div class="imgList">
                <img
                  v-for="(img,index) in huichuanimgList"
                  :key="index"
                  :src="imageUrl+img"
                  class="imagePost"
                >
              </div>
            </viewer>
          </div>
        </el-row>
        <div
          class="rightbox"
          style="width:456px"
        >
          <el-row class="searchbar">
            <div class="tishi">
              <!-- <i
                style="font-size:16px;color:#627182"
                class="el-icon-info"
              ></i> -->
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
    <Modal
      v-model="modal3"
      width="420"
      :mask="false"
      footer-hide
      draggable
      scrollable
    >
      <div class="msgtitle">留言</div>
      <div
        v-if="itemmsg.length>0"
        ref="scrollTobar"
        v-bar
        style="height:418px"
      >
        <div style="padding:0 20px">
          <div
            v-for="(item,index) in itemmsg"
            :key="index"
            style="overflow:hidden;margin-top:12px;"
            :class="[item.fromtype == 0? 'msgtitleword' : '' ]"
          >
            <p
              v-if="item.fromtype != '0'"
            >审批专员 &nbsp;
              <span>{{item.cdate}}</span>
            </p>
            <p
              v-else
              align="right"
            >信贷专员 &nbsp;
              <span>{{item.cdate}}</span>
            </p>
            <p :class="[item.fromtype != '0'?'replyleft':'replyright' ,'reply']">{{item.msg}}</p>
          </div>
        </div>
      </div>
      <div class="msginput">
        <el-input
          type="textarea"
          :autosize="{ minRows:1, maxRows:3}"
          maxlength="120"
          class="msgcont"
          v-model="formdesc"
        ></el-input>
        <span style="color:#CCC">{{formdesc.length}}/120</span>
        <img
          v-if="!!!formdesc.length"
          src="../../assets/images/msgnone.png"
        >
        <img
          v-else
          :src="msgshow"
          @mouseover="msgshow = msgfasong"
          @mouseleave="msgshow = msgimg"
          @click="sbmittext"
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import { look, getlist, save } from "@/api/afterloan";
import msgfasong from "@/assets/images/msgfasong.png";
import msgshow from "@/assets/images/msgshow.png";
import { postPrintInsurance } from "@/api/credit";
export default {
  data() {
    return {
      liuyan_num: 0, //留言数量
      itemmsg: [],
      modal3: false,
      isLoading: true,
      data: {
        refData: {}
      }, //页面数据
      formdesc: "",
      shangchuanimgList: "",
      huichuanimgList: "",
      imageUrl: window.g.ApiUrl + "S120017/download?md5=",
      msgimg: msgshow,
      msgfasong: msgfasong,
      msgshow: msgshow
    };
  },

  mounted() {
    this.modal3 = true;
    this.datail();
  },
  methods: {
    //回复留言
    sbmittext() {
      var that = this;
      let para = {};
      para = {
        inappmainid: this.$route.params.id,
        type: this.data.type,
        instatus: this.data.status,
        msg: this.formdesc
      };
      this.formdesc = "";
      save(para).then(res => {
        if (res.data.success) {
          this.$message({
            message: "回复成功！！",
            type: "success"
          });
          that.toliuyan();
        } else {
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    },
    toliuyan() {
      console.log(4444)
      if (this.modal3) {
        this.modal3 = false;
      } else {
        this.modal3 = true;
        }
        var para = this.$route.params.id;
        getlist(para).then(res => {
          console.log(res)
          if (res.data.success) {
            this.itemmsg = res.data.data.data;
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      
    },
    submit() {},
    datail() {
      this.liuyan_num = this.liuyan_num == 0 ? "" : this.liuyan_num;
      this.toliuyan();
      var para = this.$route.params.id;
      look(para)
        .then(res => {
          this.listLoading = false;
          if (res.data.success) {
            this.data = res.data.data;
            if (this.type == "1") {
              this.data.reportdate = this.data.reportdate.split(" ")[0];
            }
            if (res.data.data.inmd5 != "" && res.data.data.inmd5 != null) {
              this.shangchuanimgList = res.data.data.inmd5.split(",");
            }
            if (res.data.data.backmd5 != "" && res.data.data.backmd5 != null) {
              this.huichuanimgList = res.data.data.backmd5.split(",");
              for (var i = 0; i < this.huichuanimgList.length; i++) {
                if (
                  this.huichuanimgList[i] == "" ||
                  typeof this.huichuanimgList[i] == "undefined"
                ) {
                  this.huichuanimgList.splice(i, 1);
                  i = i - 1;
                }
              }
            }
            if (this.data.reportdate != null && this.data.reportdate != "") {
              this.data.reportdate = this.data.reportdate.split(" ")[0];
            }
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
    },
    //打印
    printing(Id, Gw) {
      var para = {
        OrderId: Id
      };
      postPrintInsurance(para).then(res => {
        if (res.data.success) {
          var url =
            window.g.ApiUrl +
            "S120017/download/" +
            res.data.data +
            "/" +
            Gw +
            ".pdf";
          window.open(url, "_blank");
        } else {
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.title {
  font-size: 14px;
  padding:10px 0 10px 24px;
  border-bottom: 1px solid rgba(216, 216, 216, 1);
  color: rgba(0,0,0, .85)
}
.searchbar {
  position: relative;
  padding-bottom: 0;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  .liuyan {
    position: absolute;
    right: -34px;
    top: 72px;
    cursor: pointer;
  }
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
  }
  p {
    color: #333;
    font-size: 12px;
    span {
      color: #666;
      font-size: 12px;
    }
  }
}
.yw_yj {
  margin-top: 8px;
  overflow: hidden;
}
.liuyans /deep/ .ivu-modal-content {
  padding-top: 20px;
}
.liuyans /deep/ .ivu-modal-close {
  z-index: 10;
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
    span.ycl {
      padding: 0 4px;
      background: rgba(230, 247, 255, 1);
      border: 1px solid rgba(145, 213, 255, 1);
      border-radius: 2px;
      color: #1890ff;
    }
    span.dcl {
      padding: 0 4px;
      background: rgba(255, 251, 230, 1);
      border-radius: 2px;
      border: 1px solid rgba(255, 229, 143, 1);
      color: #faad14;
    }
  }
  span {
    color: #666;
  }
}
.imgList {
  padding: 16px 24px 8px;
  overflow: hidden;
}
.imagePost {
  width: 120px;
  height: 120px;
  float: left;
  margin: 0 8px 8px 0;
  border: 1px solid #E9E9E9;
  border-radius: 4px
}
.top,
.center,
.botm {
  margin-bottom: 10px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  border-radius: 4px
}
.botm {
  margin-bottom: 0;
}
.tishi {
  height:42px;
  line-height:42px;
  padding: 0 24px;
  color: #333;
  font-size: 18px;
  strong{
    font-size: 14px;
    color: #333;
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
  margin: 0.672rem 9.1rem 1.096rem 0;
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
.liuyan /deep/ .el-badge__content {
  line-height: 16px;
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
.msgtitleword{
      margin-left: -20px;
    width: 100%;
}
</style>

