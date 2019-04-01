<template>
  <div :class="[data.mortgageinfo.caafterstatusmortg == '3'?'':'disblecolor', 'app-container', 'mortview']" style="margin-top:5px;position:relative;">
    <el-row>
      <el-col :span="11">
        <el-breadcrumb
          separator="/"
          class="app-breadcrumb"
        >
          <el-breadcrumb-item class="firstbread">贷后管理</el-breadcrumb-item>
          <el-breadcrumb-item class='firstbread'>
            <router-link
              style="color:#606266;font-weight: 100;"
              :to="{path:'/dealer/afterloan/mortgage'}"
            >解抵押</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{data.mortgageinfo.refData.caafterstatusmortgname}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col
        :span="13"
        align="right"
        class="topmiddle topbtnbasic" style="padding-right:0;margin:3px 0 8px 0"

      >
        <div class="lxn_button" v-if="data.mortgageinfo.caafterstatusmortg != '3'">
          <el-button
            size="small"
            type="success"
            v-if="agreed"
            class="btncolor"
            style="width:60px"
            @click="submit(1)"
          >确定</el-button>
          <el-button
            size="small"
            type="success"
            style="width:60px"
            v-else
            class="bunNocolor"
            @click="submit(2)"
          >确定</el-button>
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
              <span>{{data.mortgageinfo.camainno}}</span>
            </p>
            <p>
              解抵押状态：
              <span>{{data.mortgageinfo.refData.caafterstatusmortgname}}</span>
            </p>
            <p>
              贷款金额：
              <span>{{data.mortgageinfo.loanmoney}}元</span>
            </p>
          </div>
          <div style="width:321px">
            <p>
              客户姓名：
              <span>{{data.mortgageinfo.borrowername}}</span>
            </p>
            <p>
              案件类别：
              <span>{{data.mortgageinfo.refData.categoryname}}</span>
            </p>
            <p>
              结清时间：
              <span>{{data.mortgageinfo.closedate}}</span>
            </p>
          </div>
          <div style="width:432px">
            <p>
              电话号码：
              <span>{{data.mortgageinfo.customerphone}}</span>
            </p>
            <p>
              案件状态：
              <span>{{data.mortgageinfo.refData.statusname}}</span>
            </p>
          </div>
        </div>
      </el-row>
      <el-row class="yw_yj">
        <el-row
          class="searchbar leftbox"
          style="width:736px;background-color:#F0F2F5;box-shadow:none"
        >
          <!-- <div
            class="top"
            style="margin-bottom:10px;"
            v-show="data.pictureList.length >0"
          >
            <div class="formtitle">
              <p>
                <strong>机动车登记证书</strong>
              </p>
            </div>
            <div class="imgList">
              <div
                v-for="(img,index) in data.pictureList"
                :key="index"
                class="imagePost"
              >
                <img
                  :src="imageUrl+img.id"
                  width="100%"
                  height="100%"
                >
                <a
                  target="_blank"
                  :href="imageUrl+img.id"
                  class="download_mortviewimg"
                >下载</a>
              </div>
            </div>
          </div> -->
          <div class="right">
            <div class="formtitle">
              <p>
                <strong>资料清单</strong>
                <small style="color:#666;font-size:12px">请确认是否收到该客户的以下资料</small>
              </p>
            </div>
            <div class="lxn_check">
              <el-checkbox-group
                v-for="city in data.categoryList"
                v-model="city.ischeck"
                :key="city.code"
                disabled
              >
                <el-checkbox class="bill">{{city.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div style="padding: 0 24px;background:rgba(245,247,250,1);border-bottom-right-radius: 4px;border-bottom-left-radius">
              <el-checkbox
                v-model="agreed"
                class="lable"
                v-if="data.mortgageinfo.caafterstatusmortg != '3'"
              >
                <span class="cont">我司已确认收到该客户的机动车登记证书以及全套解抵押资料，承诺妥善保管，并尽快为客户办理完毕解抵押手续！</span>
              </el-checkbox>
            </div>
          </div>
        </el-row>
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
            <ul
              class="lxn_formdata"
              style="padding:16px 24px"
            >
              <li>
                <p>
                  运单编号：
                  <span>{{data.moRecord.postno}}</span>
                </p>
                <p>
                  备注：
                  <span>{{data.moRecord.memo}}</span>
                </p>
              </li>
            </ul>
          </el-row>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mortget, mortsureinfo } from "@/api/afterloan";
import { collectReplace , collectWhere } from "@/utils/index";
export default {
  data() {
    return {
      agreed: false,
      isLoading: true,
      data: {
        categoryList: [],
        moRecord: {
          refData: {}
        },
        mortgageinfo: {
          refData: {}
        },
        pictureList: []
      },
      imageUrl: window.g.ApiUrl + "S120017/downloadacs/"
    };
  },

  mounted() {
    this.getdata();
  },
  methods: {
    submit(i) {
      if (i == 1) {
        var para = this.$route.params.id;
        mortsureinfo(para).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "解抵押成功"
            });
            this.$router.push({
                path: "/dealer/afterloan/mortgage"
              });
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "请确认条例说明"
        });
      }
    },
    getdata() {
      this.listLoading = true;
      var para = this.$route.params.id;
      mortget(para)
        .then(res => {
          this.listLoading = false;
          if (res.data.success) {
            this.data = res.data.data;
            var loanmoney = this.data.mortgageinfo.loanmoney;
            var closedate = this.data.mortgageinfo.closedate;
            if (closedate != null && closedate != "") {
              this.data.mortgageinfo.closedate = closedate.split(" ")[0];
            }
            if (loanmoney != null && loanmoney != "") {
              this.data.mortgageinfo.loanmoney = loanmoney.substring(
                0,
                loanmoney.indexOf(".") + 3
              );
            }
            if (this.data.mortgageinfo.caafterstatusmortg == "3") {
              this.agreed = true;
            }
            // if(this.data.mortgageinfo.caafterstatusmortg == "2" || this.data.mortgageinfo.caafterstatusmortg == "3"){
            //   this.data.categoryList = collectWhere(this.data.categoryList, 'ischeck', '1')
            // }
              this.data.categoryList = collectWhere(this.data.categoryList, 'ischeck', '1')
              this.data.categoryList = collectReplace(this.data.categoryList, {
              ischeck:{
              key:'ischeck',
              fun:function(ischeck){
                if(ischeck == 1){
                  return true
                }else{
                  return false
                }
              }
              }
            })
            
          } else {
            this.$message({
              type: "error",
              message: res.data.message
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
.searchbar {
  padding-bottom: 0;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
.title {
  font-size: 14px;
  padding: 10px 0 10px 24px;
  color: #333;
  border-bottom: 1px solid rgba(216, 216, 216, 1);
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
      font-size: 12px;
      background: rgba(240, 242, 245, 1);
      border-radius: 2px;
      color: #666;
    }
  }
  span {
    color: RGBA(0, 0, 0, 0.65);
  }
}
.top,
.right {
  background-color: #fff;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
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
  border: 1px solid rgba(233, 233, 233, 1);
  position: relative;

  .download_mortviewimg {
    position: absolute;
    right: 0;
    top: 0;
  }
}
.lxn_check {
  overflow: hidden;
  padding: 12px 24px;
}
.bill {
  float: left;
  width: 25%;
  margin: 3px 0;
}
.lable {
  display: flex;
  padding: 13px 0;
}
.cont {
  color: #333;
  margin-top: -3px;
  display: block;
  font-size: 12px;
}
.bunNocolor {
  background-color:rgba(245,247,250,1);;
  border-color: rgb(220,223,230);
  color: #C0C4CC;
}
.mortview /deep/ .lxn_check .el-checkbox__label {
  font-size: 12px
}
.disblecolor /deep/ .lxn_check .el-checkbox__label {
  color: #666 !important;
  font-size: 12px
}
.disblecolor /deep/ .lxn_check span.el-checkbox__inner {
  background-color: #fff !important;
  border-color: #409eff !important;
}
.disblecolor /deep/ .lxn_check .el-checkbox__inner::after {
  border-color: #409eff !important;
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

