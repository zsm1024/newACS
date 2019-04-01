<template>
  <section
    class="identmain"
    style="margin-top:5px;position:relative;"
  >
    <div
      class="navtitle"
      v-show="navtitletogle"
    >
      <div
        class="navtitle"
        ref="topAffix"
        style="box-shadow: none"
      >

        <div class="flexbuton">
          <div class="titleBox">
            <img
              src="@/assets/images/fullbrand.png"
              v-if="contentlist.basicInfo.category == '4'"
            >
            <img
              src="@/assets/images/usedcar.png"
              v-else-if="contentlist.basicInfo.category == '2'"
            >
            <img
              src="@/assets/images/newcar.png"
              v-else
            >
            <span v-if="!name">客户姓名</span>
            <span v-else>{{name}}</span>
            <span v-if="!contentlist.basicInfo.applicationno">GW-A000000000</span>
            <span v-else>{{contentlist.basicInfo.applicationno}}</span>
          </div>
          <el-col
            class="topbtnbasic"
            style="margin:1px 0 8px 0;height:32px;line-height:32px"
          >
            <el-button
              type="success"
              size="small"
              v-show="btnlistenter.length"
              v-for="(item,index) in btnlistenter"
              :disabled="btndisable"
              :key="index"
              class="btnnextcolor"
              @click="btnenterto(item)"
            >{{item.cmddis}}</el-button>
            <el-button
              v-if="!sbdisable"
              type="success"
              size="small"
              class="btnnextcolor"
              style="width: 60px;"
              :disabled="changeSave"
              @click="zhansave"
            >暂存</el-button>
            <el-button
              v-if="!sbdisable"
              type="success"
              size="small"
              class="btnnextcolor"
              style="width: 60px;"
              @click="toNext"
            >下一步</el-button>
            <el-button
              v-show="orderstatus"
              type="success"
              size="medium"
              class="btncolor"
              style="width: 60px;padding: 8px 0;"
              @click="toSubmit"
            >提交</el-button>
          </el-col>
        </div>
      </div>
    </div>
    <div>
      <el-row id="navmenus">
        <el-col
          :span="10"
          style="height:48px"
        >
          <el-breadcrumb
            separator="/"
            class="app-breadcrumb"
          >
            <el-breadcrumb-item class="firstbread">信贷审批</el-breadcrumb-item>
            <el-breadcrumb-item class="firstbread">
              <router-link
                style="color:#606266 !important;font-weight:normal"
                :to="{path:'/dealer/creditapproval/orderlist'}"
              >订单管理</router-link>
            </el-breadcrumb-item>

            <el-breadcrumb-item v-if="ershow">二手车贷</el-breadcrumb-item>
            <el-breadcrumb-item v-else>个人贷款</el-breadcrumb-item>

          </el-breadcrumb>

        </el-col>

        <el-col
          :span="7"
          style="float:right"
          class="topbtnbasic"
        >
          <el-button
            type="success"
            size="small"
            v-for="(item,index) in btnlistenter"
            :disabled="btndisable"
            :key="index"
            v-show="btnlistenter.length"
            class="btnnextcolor"
            @click="btnenterto(item)"
          >{{item.cmddis}}</el-button>
          <el-button
            v-if="!sbdisable"
            :disabled="changeSave"
            type="success"
            size="medium"
            @click="zhansave"
            style="width: 60px;padding: 8px 0;"
            class="btnnextcolor"
          >暂存</el-button>
          <el-button
            v-if="!sbdisable"
            :disabled="nextSave"
            type="success"
            size="medium"
            class="btnnextcolor"
            style="width: 60px;padding: 8px 0;"
            @click="toNext"
          >下一步</el-button>
          <el-button
            v-show="orderstatus"
            type="success"
            size="medium"
            class="btncolor"
            style="width: 60px;padding: 8px 0;"
            @click="toSubmit"
          >提交</el-button>
        </el-col>

      </el-row>

      <el-row class="searchbar">
        <el-col
          :span="22"
          :offset="2"
        >
          <Steps
            :current="1"
            class="stepcolor"
          >
            <Step title="基本信息">
              <li
                @click="tojinrong()"
                style="width:100px;height:20px;margin-top:-25px;cursor:pointer"
              >基本信息</li>
            </Step>
            <Step title="客户信息">
              <li style="width:100px;height:20px;margin-top:-25px;cursor:pointer">客户信息</li>
            </Step>
            <Step title="协议签署">
              <li
                @click="tokehu()"
                style="width:100px;height:20px;margin-top:-25px;cursor:pointer"
              >协议签署</li>
            </Step>
            <Step title="影像资料">
              <li
                @click="toyingxiang()"
                style="width:100px;height:20px;margin-top:-25px;cursor:pointer"
              >影像资料</li>
            </Step>
          </Steps>
        </el-col>
      </el-row>
    </div>
    <div class="identmain2">
      <div id="oneAnchor"></div>
      <el-row
        class="midcontent oneloading"
        style="padding-top:16px;"
        v-loading="isLoading"
      >
        <el-col
          :span="24"
          style="padding-right:24px;padding-left:24px"
        >
          <el-collapse
            v-model="activeNames"
            class="zhujieren-coll"
          >
            <el-collapse-item name="1">
              <template slot="title">
                <span class="titleleft"> 主借人信息</span>

              </template>
              <zhujieren
                ref="childlist"
                :idtype="1"
                :objectlist="contentlist"
                @changemarri="changemarri"
              ></zhujieren>
            </el-collapse-item>
          </el-collapse>

        </el-col>

        <!-- <Affix :offset-top="20" > -->
        <div
          v-show="liuyancount>0"
          class="siderbarhref"
          ref="slide"
        >
          <ul>
            <el-badge
              :value="liuyancount"
              class="item"
            >
              <li
                class="liliu"
                @click="toliuyan"
              ><img
                  class="liuyan"
                  :src="yan"
                  alt=""
                  srcset=""
                ></li>
            </el-badge>
          </ul>
        </div>
        <!-- </Affix> -->
      </el-row>
      <div id="twoAnchor"></div>
      <el-row class="midcontent">
        <el-col
          :span="24"
          style="padding-right:24px;padding-left:24px"
        >
          <el-collapse v-model="activeNames">
            <el-collapse-item name="2">
              <template slot="title">
                <span class="titleleft"> 紧急联系人
                  <!-- <span style="font-size:12px;color: #999999;">至少填写两人</span> -->
                </span>
              </template>
              <el-col :span="24">

              </el-col>
              <jinji
                :changema="changema"
                ref="jinjilist"
                :objectlist="contentlist"
              ></jinji>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <div
        id="threeAnchor"
        v-if="!(sbdisable&&!gongjieren)"
      ></div>
      <el-row
        class="midcontent"
        v-if="!(sbdisable&&!gongjieren)"
      >
        <el-col
          :span="24"
          style="padding-right:24px;padding-left:24px"
        >
          <el-collapse
            v-model="activeNames"
            @change="toggleGongjie"
          >
            <el-collapse-item name="3">
              <template slot="title">
                <span class="titleleft">{{gongjieTip}}</span>
              </template>
              <zhujieren
                v-if="gongjieren"
                @changemarri="changemarri"
                ref="gchildlist"
                :idtype="2"
                :objectlist="contentlist"
                @delG="delG"
                @asyncdata="asyncdata"
              ></zhujieren>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <div
        id="fourAnchor"
        v-if="!(sbdisable&&!baozhengren)"
      ></div>
      <el-row
        class="midcontent"
        v-if="!(sbdisable&&!baozhengren)"
      >
        <el-col
          :span="24"
          style="padding-right:24px;padding-left:24px"
        >
          <el-collapse
            v-model="activeNames"
            @change="toggleBaozheng"
          >
            <el-collapse-item name="4">
              <template slot="title">
                <span class="titleleft"> {{baozhengTip}}</span>
              </template>
              <zhujieren
                v-if="baozhengren"
                @changemarri="changemarri"
                ref="bchildlist"
                :idtype="3"
                :objectlist="contentlist"
                @delG="delG"
                @asyncdata="asyncdata"
              ></zhujieren>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="信息确认"
      :visible.sync="showxinxi"
      width="720px"
      center
    >
      <span>
        <el-form :inline="true">
          <div style="text-align:center;color:red">请确认申请信息，协议签署后将不能再修改，确认签署吗？</div><br />
          <el-form-item
            label="品牌："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{maker}}</span>
          </el-form-item>
          <el-form-item
            label="车型："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{brand}}</span>
          </el-form-item>
          <el-form-item
            label="款式："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{stylename}}</span>
          </el-form-item>
          <el-form-item
            label="产品："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{product}}</span>
          </el-form-item>
          <el-form-item
            label="贷款金额："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{money}}</span>
          </el-form-item>
          <el-form-item
            label="贷款期限："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{period}}</span>
          </el-form-item>
          <el-form-item
            label="月还款金额首期："
            label-width="130"
            prop="name"
          >
            <span>{{firstpayment}}</span>
          </el-form-item>
          <el-form-item
            label="借款人姓名："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{name}}</span>
          </el-form-item>
          <el-form-item
            label="证件号码："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{idcard}}</span>
          </el-form-item>

          <el-form-item
            label="个人电话："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{perphone}}</span>
          </el-form-item>
          <el-form-item
            label="公司电话："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{telphone}}</span>
          </el-form-item>
          <el-form-item
            v-if="fujiachanpin"
            label="附加产品："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{fujiachanpin}}</span>
          </el-form-item>
          <el-form-item
            v-if="fujiajiage"
            label="附加价格："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{fujiajiage}}</span>
          </el-form-item>
        </el-form>
      </span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="showxinxi = false">取 消</el-button>
        <el-button
          type="primary"
          @click="toConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
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
          >
            <p
              class="msgtitleword"
              v-if="item.isdealer == '0'"
            >审批专员
              <span>{{item.cdate}}</span>
            </p>
            <p
              class="msgtitleword"
              v-else
              align="right"
            >信贷专员
              <span>{{item.cdate}}</span>
            </p>
            <p :class="[item.isdealer == '0'?'replyleft':'replyright' ,'reply']">{{item.msg}}</p>
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
          src="../../../assets/images/msgnone.png"
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
  </section>
</template>

<script>
var scrollAction = { x: "undefined", y: "undefined" },
  scrollDirection;
function scrollFunc() {
  if (typeof scrollAction.x == "undefined") {
    scrollAction.x = window.pageXOffset;
    scrollAction.y = window.pageYOffset;
  }
  var diffX = scrollAction.x - window.pageXOffset;
  var diffY = scrollAction.y - window.pageYOffset;
  if (diffX < 0) {
    // Scroll right
    scrollDirection = "right";
  } else if (diffX > 0) {
    // Scroll left
    scrollDirection = "left";
  } else if (diffY < 0) {
    // Scroll down
    scrollDirection = "down";
  } else if (diffY > 0) {
    // Scroll up
    scrollDirection = "up";
  } else {
    // First scroll event
  }
  scrollAction.x = window.pageXOffset;
  scrollAction.y = window.pageYOffset;
}
function getScroll(target, top) {
  const prop = top ? "pageYOffset" : "pageXOffset";
  const method = top ? "scrollTop" : "scrollLeft";
  let ret = target[prop];
  if (typeof ret !== "number") {
    ret = window.document.documentElement[method];
  }
  return ret;
}
import { zhujieren, jinji, gongjieren, baozhengren } from "./identcomponents";
import msgfasong from "@/assets/images/msgfasong.png";
import msgshow from "@/assets/images/msgshow.png";
import {
  orderSave,
  delparty,
  postRevisepause,
  postConditionalapproval,
  orderSign,
  getCurrentTaskCmd,
  postaddMsg,
  getMsglist,
  orderInfo,
  orderSavesub,
  orderSignStatus
} from "@/api/credit";
import btnbg from "@/assets/images/Btn_bg.png";
import top from "@/assets/images/icon_top.png";
import del from "@/assets/images/del.png";
import yan from "@/assets/images/icon_liuyan.png";
import hotline from "@/assets/images/icon_hotline.png";
import question from "@/assets/images/icon_question.png";
export default {
  components: {
    zhujieren,
    gongjieren,
    baozhengren,
    jinji
  },
  inject: ["reload"],
  data() {
    return {
      orderstatus: false,
      changema: "",
      isLoading: true,
      msgimg: msgshow,
      msgfasong: msgfasong,
      msgshow: msgshow,
      nextSave: false,
      nextSubmit: false,
      changeSave: false,
      fujiajiage: "",
      fujiachanpin: "",
      seldeltwo: true,
      seldel: true,
      del,
      yan,
      ershow: false,
      btndisable: false,
      btnbg,
      liuyancount: "",
      formdesc: "",
      modal3: false,
      itemmsg: [],
      totype: "",
      formLabelWidth: "130px",
      maker: "",
      brand: "",
      stylename: "",
      product: "",
      money: "",
      period: "",
      firstpayment: "",
      name: "",
      idcard: "",
      idcardtype: "",
      perphone: "",
      telphone: "",
      showxinxi: false,
      routeid: this.$route.params.id,
      question,
      hotline,
      top,
      btnlistenter: [],
      sbdisable: true,
      isShowchuru: true,
      showwtt: true,
      showwt: false,
      contentlist: { basicInfo: { category: "" } },
      activeNames: ["1", "2"],
      zhujieren: true,
      gongjieren: false,
      baozhengren: false,
      navtitletogle: false,
      ruleForm: {},
      rules: {}
    };
  },
  methods: {
    resizeEvent: function() {
      // var left = window.scrollX;
      var offsetLeft = this.$parent.$el.offsetLeft;
      // this.$refs.topAffix.style.left = offsetLeft - left + "px";
    },
    scrollEvent: function(height = 0) {
      height = Number.isInteger(height) ? height : 0;
      scrollFunc();
      var that = this;
      if (that.$route.matched[1].name === "identmain") {
        var top = getScroll(window, true);
        var scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;

        if (scrollTop > 177) {
          that.navtitletogle = true;
          that.$refs.slide.style.top = scrollTop - 92 + "px";
        } else {
          that.navtitletogle = false;
          that.$refs.slide.style.top = 85 + "px";
        }
        if (scrollDirection == "left" || scrollDirection == "right") {
          var left = window.scrollX;
          this.$refs.topAffix.style.left = -left + "px";
        }
      }
    },
    showzhuftu1() {
      this.seldeltwo = false;
    },
    showzhufchu1() {
      this.seldeltwo = true;
    },
    showzhuftu() {
      this.seldel = false;
    },
    showzhufchu() {
      this.seldel = true;
    },
    sbmittext() {
      var that = this;
      let para = {};
      para = {
        orderId: this.contentlist.basicInfo.id,
        msg: this.formdesc
      };
      this.formdesc = "";
      postaddMsg(para).then(res => {
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
      if (this.modal3) {
        this.modal3 = false;
      } else {
        this.modal3 = true;
        let para = {};
        para = this.contentlist.basicInfo.id;
        getMsglist(para).then(res => {
          if (res.data.data) {
            this.itemmsg = res.data.data.data;
          }
        });
      }
    },
    toConfirm() {
      this.showxinxi = false;
      this.orderSign();
    },
    orderSign() {
      var that = this;
      let para1 = {};
      para1 = that.contentlist;
      orderSign(para1).then(rese => {
        if (rese.data.success) {
          orderSignStatus(that.contentlist.orderId).then(ress=>{
            if (ress.data.success) {
            }else{
              this.$message({
                message: ress.data.message,
                type: "warning"
              });
            }
          })
          localStorage.removeItem("order" + that.routeid);
          localStorage.setItem(
            "orderId" + that.routeid,
            that.contentlist.orderId
          );
          that.contentlist = rese.data.data;
          localStorage.setItem(
            "contentlist" + that.routeid,
            JSON.stringify(rese.data.data)
          );
          localStorage.setItem(
            "orderold" + that.routeid,
            JSON.stringify(that.contentlist)
          );

          // eslint-disable-next-line
          if (that.totype == 1) {
            this.$router.push({
              path: "/dealer/creditapproval/toauthphoto/" + that.routeid
            });
          } else {
            this.$router.push({
              path: "/dealer/creditapproval/orderphoto/" + that.routeid
            });
          }
        } else {
          this.$message({
            message: rese.data.message,
            type: "warning"
          });
          return false;
        }
      });
    },
    showMsg(type) {
      this.totype = type;
      if (this.contentlist.basicInfo.category === "2") {
        this.maker = this.contentlist.oldVehicleInfo.maker;
        this.brand = this.contentlist.oldVehicleInfo.brand;
        this.stylename = this.contentlist.oldVehicleInfo.cardtype;
      } else {
        this.maker = this.contentlist.vehicleInfo.refData.makername;
        this.brand = this.contentlist.vehicleInfo.refData.brandname;
        this.stylename = this.contentlist.vehicleInfo.refData.stylename;
      }
      this.fujiachanpin = this.contentlist.financialInfo.vehicleexs;
      this.fujiajiage = this.contentlist.financialInfo.vehicleexprice;
      this.product = this.contentlist.financialInfo.refData.fnproductname;
      this.money = this.contentlist.financialInfo.loanmoney;
      this.period = this.contentlist.financialInfo.loanperiod;
      this.firstpayment = this.contentlist.financialInfo.firstpayment;
      if (this.contentlist.borrowers) {
        var borrowername = this.contentlist.borrowers.filter(
          item => item.type == 1
        )[0];
      }

      if (borrowername) {
        this.name = borrowername.name;
        this.idcard = borrowername.card;
        this.perphone = borrowername.phone;
        this.telphone = borrowername.phonec;
      }
      this.$confirm(
          "<div class='message-box'><div class='message-box-top'>提示</div><div class='message-box-bottom'>请仔细确认申请信息，点击“确认”后申请信息将锁定不能修改</div></div>",
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
            customClass: "order-messagebox",
            dangerouslyUseHTMLString: true,
            showClose: false
          }
        )
          .then(() => {
            this.orderSign();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
    },
    btnenterto(item) {
      var that = this;
      var tmpbtnlisten = [];
      tmpbtnlisten = JSON.stringify(this.btnlistenter);
      this.btnlistenter.length = false;
      if (this.btndisable) {
        return;
      }
      this.btndisable = true;
      this.nextdo();
      var status = this.contentlist.basicInfo.status;

      if (status === 4) {
        let para = {};
        para = this.contentlist;
        postRevisepause(para).then(res => {
          this.btndisable = false;
          this.btnlistenter = JSON.parse(tmpbtnlisten);
          if (res.data.success) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
        });
      }
      if (status === 6) {
        let para = {};
        para = {
          dataid: this.contentlist.basicInfo.id,
          cmdid: item.id
        };
        postConditionalapproval(para).then(res => {
          this.btndisable = false;
          this.btnlistenter = JSON.parse(tmpbtnlisten);
          if (res.data.success) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.reload();
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
        });
      }
    },
    toNext() {
      var that = this;
      that.nextSave = true;
      this.nextdo();
      if (!that.sbdisable) {
        let para = {};
        para = this.contentlist;
        if (localStorage.getItem("order" + that.routeid)) {
          para.basicInfo.state = 2;
        }
        orderSave(para).then(res => {
          that.nextSave = false;
          if (res.data.success) {
            localStorage.removeItem("order" + that.routeid);
            localStorage.setItem(
              "orderId" + that.routeid,
              that.contentlist.orderId
            );
            that.contentlist = res.data.data;
            localStorage.setItem(
              "contentlist" + that.routeid,
              JSON.stringify(res.data.data)
            );
            localStorage.setItem(
              "orderold" + that.routeid,
              JSON.stringify(that.contentlist)
            );
            // eslint-disable-next-line
            // if (that.contentlist.basicInfo.signstate == 0) {
            this.showMsg(1);
            // } else {
            //   this.$message({
            //     message: '订单状态不对，请联系管理员',
            //     type: 'warning'
            //   })
            //   this.$router.push({ path: '/dealer/creditapproval/toauthphoto/' + this.routeid })
            // }
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
        });
      } else {
        this.$router.push({
          path: "/dealer/creditapproval/toauthphoto/" + this.routeid
        });
      }
    },
    toSubmit() {
      var that = this;
      let para = {};
      this.nextdo();
      para = that.contentlist;
      orderSavesub(para).then(res => {
        if (res.data.success) {
          this.$router.push({
            path: "/dealer/creditapproval/ordersuccess/" + that.routeid
          });
        } else {
          this.$message({
            // duration: 0,
            // showClose: true,
            message: res.data.message,
            type: "warning"
          });
        }
      });
    },
    tojinrong() {
      /* eslint-disable */
      if (this.contentlist.basicInfo.category == "1") {
        this.$router.push({
          path: "/dealer/creditapproval/personalorder/" + this.routeid
        });
      } else if (this.contentlist.basicInfo.category == "2") {
        this.$router.push({
          path: "/dealer/creditapproval/secondorder/" + this.routeid
        });
      } else if (this.contentlist.basicInfo.category == "4") {
        this.$router.push({
          path: "/dealer/creditapproval/personalorder/" + this.routeid
        });
      }
    },
    tokehu() {
      var that = this;
      this.nextdo();
      if (!that.sbdisable) {
        let para = {};
        para = this.contentlist;
        if (localStorage.getItem("order" + that.routeid)) {
          para.basicInfo.state = 2;
        }
        orderSave(para).then(res => {
          if (res.data.success) {
            localStorage.removeItem("order" + that.routeid);
            localStorage.setItem(
              "orderId" + that.routeid,
              that.contentlist.orderId
            );
            that.contentlist = res.data.data;
            localStorage.setItem(
              "contentlist" + that.routeid,
              JSON.stringify(res.data.data)
            );
            localStorage.setItem(
              "orderold" + that.routeid,
              JSON.stringify(that.contentlist)
            );
            // eslint-disable-next-line
            // if (that.contentlist.basicInfo.signstate == 0 ) {
            this.showMsg(1);
            // }
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
        });
      } else {
        this.$router.push({
          path: "/dealer/creditapproval/toauthphoto/" + this.routeid
        });
      }
    },
    nextdo() {
      var zhujielistjson = JSON.stringify(this.$refs.childlist.ruleForm);
      var zhujielist = JSON.parse(zhujielistjson);
      zhujielist.type = 1;
      if (
        zhujielist &&
        zhujielist.caparty03 &&
        zhujielist.caparty03.length > 0
      ) {
        zhujielist.caparty03 = zhujielist.caparty03[1];
      } else {
        zhujielist.caparty03 = "";
      }
      if (
        zhujielist &&
        zhujielist.addresses &&
        zhujielist.addresses.length > 0
      ) {
        zhujielist.addresses.forEach(function(item, index, array) {
          if (item.area) {
            zhujielist.addresses[index].area = item.area[1];
          } else {
            zhujielist.addresses[index].area = [];
          }
        });
      }
      this.contentlist.borrowers = [zhujielist];

      if (this.gongjieren) {
        var gongjielistjson = JSON.stringify(this.$refs.gchildlist.ruleForm);
        var gongjielist = JSON.parse(gongjielistjson);
        gongjielist.type = 2;
        if (
          gongjielist &&
          gongjielist.caparty03 &&
          gongjielist.caparty03.length > 0
        ) {
          gongjielist.caparty03 = gongjielist.caparty03[1];
        } else {
          gongjielist.caparty03 = "";
        }
        if (
          gongjielist &&
          gongjielist.addresses &&
          gongjielist.addresses.length > 0
        ) {
          gongjielist.addresses.forEach(function(item, index, array) {
            if (item.area) {
              gongjielist.addresses[index].area = item.area[1];
            } else {
              gongjielist.addresses[index].area = [];
            }
          });
        }
        this.contentlist.borrowers = [zhujielist, gongjielist];
      }
      if (this.baozhengren) {
        var baozhenglistjson = JSON.stringify(this.$refs.bchildlist.ruleForm);
        var baozhenglist = JSON.parse(baozhenglistjson);
        baozhenglist.type = 3;
        if (
          baozhenglist &&
          baozhenglist.caparty03 &&
          baozhenglist.caparty03.length > 0
        ) {
          baozhenglist.caparty03 = baozhenglist.caparty03[1];
        } else {
          baozhenglist.caparty03 = "";
        }
        if (
          baozhenglist &&
          baozhenglist.addresses &&
          baozhenglist.addresses.length > 0
        ) {
          baozhenglist.addresses.forEach(function(item, index, array) {
            if (item.area) {
              baozhenglist.addresses[index].area = item.area[1];
            } else {
              baozhenglist.addresses[index].area = [];
            }
          });
        }
        if (gongjielist) {
          this.contentlist.borrowers = [zhujielist, gongjielist, baozhenglist];
        } else {
          this.contentlist.borrowers = [zhujielist, baozhenglist];
        }
      }
      if (this.$refs.jinjilist) {
        var jinjilistjson = JSON.stringify(
          this.$refs.jinjilist.ruleForm.urgentPartys
        );
        var jinjilist = JSON.parse(jinjilistjson);
        if (jinjilist) {
          this.contentlist.urgentPartys = jinjilist;
        }
      }
    },
    zhansave() {
      var that = this;
      that.changeSave = true;
      this.nextdo();
      let para = {};
      para = this.contentlist;
      if (localStorage.getItem("order" + that.routeid)) {
        para.basicInfo.state = 2;
      }
      this.zhujieren = false;
      orderSave(para).then(res => {
        that.changeSave = false;

        if (res.data.success) {
          this.zhujieren = true;
          localStorage.removeItem("order" + that.routeid);
          localStorage.setItem(
            "orderId" + that.routeid,
            that.contentlist.orderId
          );

          that.contentlist = res.data.data;
          localStorage.setItem(
            "contentlist" + that.routeid,
            JSON.stringify(res.data.data)
          );
          localStorage.setItem(
            "orderold" + that.routeid,
            JSON.stringify(that.contentlist)
          );
          this.$message({
            message: "暂存成功！！！",
            type: "success"
          });
          // this.$router.push({ path: '/dealer/creditapproval/toauthphoto/' + this.routeid })
        } else {
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    },
    asyncdata: function() {
      this.nextdo();
      localStorage.setItem(
        "contentlist" + this.routeid,
        JSON.stringify(this.contentlist)
      );
    },
    toyingxiang() {
      var that = this;
      this.nextdo();
      if (!that.sbdisable) {
        let para = {};
        para = this.contentlist;
        if (localStorage.getItem("order" + that.routeid)) {
          para.basicInfo.state = 2;
        }
        orderSave(para).then(res => {
          if (res.data.success) {
            localStorage.removeItem("order" + that.routeid);
            localStorage.setItem(
              "orderId" + that.routeid,
              that.contentlist.orderId
            );
            that.contentlist = res.data.data;
            localStorage.setItem(
              "contentlist" + that.routeid,
              JSON.stringify(res.data.data)
            );
            localStorage.setItem(
              "orderold" + that.routeid,
              JSON.stringify(that.contentlist)
            );
            // eslint-disable-next-line
            // if (that.contentlist.basicInfo.signstate == 0 ) {
            this.showMsg(2);
            // }
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
        });
      } else {
        this.$router.push({
          path: "/dealer/creditapproval/orderphoto/" + this.routeid
        });
      }
    },
    showwtru() {
      this.isShowchuru = false;
      this.showwtt = false;
      this.showwt = true;
    },
    showwtchu() {
      this.isShowchuru = true;
      this.showwtt = true;
      this.showwt = false;
    },
    toTop() {
      document.documentElement.scrollTop = 0;
    },
    delgongjie() {
      this.$confirm("确定删除共借人吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delgongjie2();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delgongjie2() {
      

      var gongjieren = this.contentlist.borrowers.filter(
        item => item.type == 2
      )[0];
  
      if (gongjieren && gongjieren.id) {
        let para = {};
        para = {
          id: gongjieren.id
        };
        delparty(para).then(res => {
          if (res.data.success) {
            this.gid = false;
            this.gongjieren = false;
            //this.activeNames = ["1", "2"];
            var gongjieindex = this.activeNames.findIndex(item => item == 3);
            if (gongjieindex != -1) {
              this.activeNames.splice(gongjieindex, 1);
            }
            this.contentlist.borrowers.splice(
              this.contentlist.borrowers.findIndex(item => item.type == 2),
              1
            );
            localStorage.setItem(
              "contentlist" + this.routeid,
              JSON.stringify(this.contentlist)
            );
          } else {
            this.$message({
              type: "warning",
              message: res.data.message
            });
          }
        });
      }
    },
    delbaozheng() {
      this.$confirm("确定删除保证人吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delbaozheng2();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delbaozheng2() {
      

      var danbaoren = this.contentlist.borrowers.filter(
        item => item.type == 3
      )[0];
      
      if (danbaoren && danbaoren.id) {
        let para = {};
        para = {
          id: danbaoren.id
        };
        delparty(para).then(res => {
          if (res.data.success) {
            this.did = false;
            this.baozhengren = false;
            //this.activeNames = ["1", "2"];
            var baozhengindex = this.activeNames.findIndex(item => item == 4);
            if (baozhengindex != -1) {
              this.activeNames.splice(baozhengindex, 1);
            }
            this.contentlist.borrowers.splice(
              this.contentlist.borrowers.findIndex(item => item.type == 3),
              1
            );
            localStorage.setItem(
              "contentlist" + this.routeid,
              JSON.stringify(this.contentlist)
            );
          } else {
            this.$message({
              type: "warning",
              message: res.data.message
            });
          }
        });
      }
    },
    addgongjie() {
      this.nextdo();
      localStorage.setItem(
        "contentlist" + this.routeid,
        JSON.stringify(this.contentlist)
      );
      this.gid = true;
      this.gongjieren = true;
      setTimeout(function() {
        document.getElementById("threeAnchor").scrollIntoView();
        document.documentElement.scrollTop -= 55;
      }, 200);
      //this.activeNames = ["3"];
      return;
    },
    addbaozheng() {
      this.nextdo();
      localStorage.setItem(
        "contentlist" + this.routeid,
        JSON.stringify(this.contentlist)
      );
      this.did = true;
      this.baozhengren = true;
      setTimeout(function() {
        document.getElementById("fourAnchor").scrollIntoView();
        document.documentElement.scrollTop -= 55;
      }, 200);
      //this.activeNames = ["4"];
      return;
    },
    toggleGongjie(activeNames) {
      if (activeNames.includes("3")) {
        this.addgongjie();
      } else {
        this.$refs.gchildlist.$refs.ruleForm.validate((a, b) => {
          var count = 0; // 验证未通过数量
          for (const key in b) {
            if (b.hasOwnProperty(key)) {
              count++;
            }
          }
          this.nextdo();
          var addressesLength = 0; // 地址信息数组长度
          var gongjie = this.contentlist.borrowers.filter(item => {
            return item.type == 2;
          })[0];
          if (gongjie) {
            addressesLength = gongjie.addresses.length;
          }
          //36是基础必填字段（自己数） 6是新增联系地址的必填字段（自己数）
          if ((addressesLength - 2) * 6 + 36 == count) {
            this.delgongjie2();
          }
        });
        this.$refs.gchildlist.$refs.ruleForm.clearValidate();
      }
    },
    toggleBaozheng(activeNames) {
      if (activeNames.includes("4")) {
        this.addbaozheng();
      } else {
        this.$refs.bchildlist.$refs.ruleForm.validate((a, b) => {
          var count = 0;
          for (const key in b) {
            if (b.hasOwnProperty(key)) {
              count++;
            }
          }
          this.nextdo();
          var addressesLength = 0;
          var baozheng = this.contentlist.borrowers.filter(item => {
            return item.type == 3;
          })[0];
          if (baozheng) {
            addressesLength = baozheng.addresses.length;
          }
          // 36是基础必填字段（自己数） 6是新增联系地址的必填字段（自己数）
          if ((addressesLength - 2) * 6 + 36 == count) {
            this.delbaozheng2();
          }
        });
        this.$refs.gchildlist.$refs.ruleForm.clearValidate();
      }
    },
    initfunction() {
      /* eslint-disable */
      var that = this;

      orderInfo(that.routeid)
        .then(res => {
          if (res.data.success) {
            this.contentlist = res.data.data;
          } else {
            this.contentlist = JSON.parse(
              localStorage.getItem("contentlist" + that.routeid)
            );
          }
          if (this.contentlist.basicInfo.category == "2") {
            that.ershow = true;
          }

          if (this.contentlist.basicInfo.status < 2) {
            that.orderstatus = true;
          }
          if (this.contentlist.basicInfo.readonly) {
            that.sbdisable = true;
          } else {
            if (
              this.contentlist.basicInfo.status == 4 ||
              (this.contentlist.basicInfo.status <= 1 &&
                this.contentlist.basicInfo.signstate == 0)
            ) {
              that.sbdisable = false;
            } else {
              that.sbdisable = true;
            }
          }
          if (
            (this.contentlist.basicInfo.readonly == false &&
              this.contentlist.basicInfo.status == 4) ||
            this.contentlist.basicInfo.status == 6
          ) {
            getCurrentTaskCmd(
              localStorage.getItem("orderId" + that.routeid)
            ).then(res => {
              that.btnlistenter = res.data.data;
            });
          }

          if (this.contentlist.borrowers) {
            var borrowername = this.contentlist.borrowers.filter(
              item => item.type == 1
            )[0];
            that.name = borrowername ? borrowername.name : "";
            var gongjieren = this.contentlist.borrowers.filter(
              item => item.type == 2
            )[0];
            var danbaoren = this.contentlist.borrowers.filter(
              item => item.type == 3
            )[0];
            if (gongjieren) {
              this.gid = true;
              this.gongjieren = true;
              this.activeNames.push("3");
            }
            if (danbaoren) {
              this.baozhengren = true;
              this.did = true;
              this.activeNames.push("4");
            }
          }
        })
        .then(() => {
          this.$refs.childlist.$refs.ruleForm.clearValidate();
          this.$refs.gchildlist &&
            this.$refs.gchildlist.$refs.ruleForm.clearValidate();
          this.$refs.bchildlist &&
            this.$refs.bchildlist.$refs.ruleForm.clearValidate();
          this.isLoading = false;
        });
      that.toRule();
    },
    toRule() {
      var that = this;
      if (localStorage.getItem("rulefalse" + that.routeid)) {
        that.$refs["ruleForm"].validate(valid => {
          if (valid) {
            localStorage.removeItem("sbtag" + that.routeid);
            localStorage.removeItem("activetag" + that.routeid);
            localStorage.removeItem("rulefalse" + that.routeid);
          } else {
            if (localStorage.getItem("activetag" + that.routeid)) {
              this.activeNames = localStorage
                .getItem("activetag" + that.routeid)
                .split(",");
            }

            if (localStorage.getItem("sbtag" + that.routeid) == 3) {
              this.gid = true;
              this.gongjieren = true;
            }
            if (localStorage.getItem("sbtag" + that.routeid) == 4) {
              this.baozhengren = true;
              this.did = true;
            }
            localStorage.removeItem("sbtag" + that.routeid);
            localStorage.removeItem("activetag" + that.routeid);
            localStorage.removeItem("rulefalse" + that.routeid);
            return false;
          }
        });
      }
    },
    liuyanlist() {
      let para = {};
      para = this.routeid;
      getMsglist(para).then(res => {
        if (res.data.data) {
          if (res.data.data.data.length > 0) {
            this.liuyancount = res.data.data.data.length;
            if (this.liuyancount) {
              var headerbar = document.getElementById("headerbar-container");
              headerbar.style.minWidth = "calc(1240px + (100vw - 100%))";
            }
          }
        }
      });
    },
    changemarri(item) {
      this.changema = item;
    },
    delG(typeid) {
      if (typeid == 2) {
        this.delgongjie();
      } else if (typeid == 3) {
        this.delbaozheng();
      }
    }
  },
  beforeRouteLeave: function(to, from, next) {
    if (["personalorder", "secondorder"].indexOf(to.name) == -1) {
      var headerbar = document.getElementById("headerbar-container");
      headerbar.style.minWidth = "calc(1200px + (100vw - 100%))";
    }
    window.removeEventListener("scroll", this.scrollEvent);
    window.removeEventListener("resize", this.resizeEvent);
    next();
  },
  mounted() {
    this.resizeEvent();
    window.addEventListener("scroll", this.scrollEvent);
    window.addEventListener("resize", this.resizeEvent);
    this.liuyanlist();
    this.initfunction();
  },
  created() {},
  computed: {
    gongjieTip: function() {
      return this.gongjieren ? "共借人信息" : "共借人信息(选填)";
    },
    baozhengTip: function() {
      return this.baozhengren ? "保证人信息" : "保证人信息(选填)";
    }
  },
  watch: {}
};
</script>

<style scoped lang="scss">
.liliu {
  width: 34px !important;
  height: 34px !important;
}
.liuyan {
  width: 34px;
  height: 34px;
  margin-left: -7px;
  margin-top: -11px;
}
.app-breadcrumb {
  line-height: 64px;
}
.reply {
  word-break: break-all; /* 支持IE和chrome，FF不支持*/
  word-wrap: break-word; /* 以上三个浏览器均支持 */
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
.ocrclass {
  color: #3a8ee6;
  border-color: #3a8ee6;
  outline: 0;
}
.showru {
  background-color: #ebf9fb;
  color: #5881d8;
  height: 30px;
  line-height: 11px;
  text-align: center;
  padding-top: 8px;
}
.showchu {
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding-top: 3px;
}
.numjin {
  background: #cbcfe2;
  border-radius: 2px;
  display: inline-block;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 19px;
}
.cardadd {
  border: 1px dashed #cccccc;
  text-align: center;
  height: 303px;
  line-height: 303px;
  width: 95%;
  margin: 7px;
}
.borderbottom {
  padding-bottom: 10px;
  border-bottom: 1px solid #f9f9f9;
}
.cardback {
  background-color: #f3f6f8;
}
.cardnei {
  margin: 10px;
}
.text {
  font-size: 14px;
}

// .item {
//   margin-bottom: 18px;
// }

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.hrefactive {
  background-color: #5881d8 !important;
  color: #ffffff !important;
  border-top-right-radius: 12px !important;
  border-top: none !important;
  width: 38px !important;
  padding: 10px 10px 7px 7px !important;
  border-left: none;
}
// .xiesanjiao{
//   // display: block;
//   // overflow: hidden;
//   // width: 0px;
//   // height: 0px;
//   // border-top: 8px solid transparent;
//   // border-right: 8px solid #5881D8;
//   // border-left: 4px solid transparent;
//   // border-bottom: 8px solid  transparent;
//   // top: -52px;
//   // position: relative;
//   // left: -19px;
// }
.topbootom {
  position: absolute;
  bottom: 0px;
  right: -35px;
  cursor: pointer;
}

.siderbarhref {
  position: absolute;
  top: 85px;
  right: -38px;
  cursor: pointer;
}
.siderbarhref ul li {
  line-height: 15px;
  color: #fff;
  background-color: #a3b9e6;
  margin-bottom: 3px;
  text-align: center;
  padding: 10px 7px 7px 7px;
  width: 34px;
  height: 110px;
  border-radius: 8px 8px 0 0;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 12px;
  border-top-left-radius: 0px;
  border-top: 1px solid #ccc;
}
.upsider li {
  background-color: #dcdee3 !important;
  color: #444444 !important;
}
.titlerightzi {
  cursor: pointer;
  padding-right: 10px;
}
.titlerightzir {
  cursor: pointer;
  padding-right: 10px;
}
.titleright {
  float: right;
  padding-right: 5px;
  font-size: 14px;
  color: #5881d8;
}
.midcontent /deep/ .el-collapse-item__header {
  background: #f0f3f7;
  height: 40px;
}
.titleleft {
  padding-left: 16px;
  color: #507acd;
  font-size: 14px;
  font-weight: bold;
}
.midcontent {
  // margin-top: 10px;
  background-color: #ffffff;
  // padding-bottom: 30px;
  padding-top: 6px;
}
.identmain2 > .midcontent:last-child {
  padding-bottom: 16px;
}
.searchbar {
  height: 50px;
  line-height: 50px;
}
.stepcolor {
  padding-top: 13px;
}
.topbtnbasic {
  text-align: right;
  height: 48px;
  line-height: 48px;
}

.formtitle {
  clear: both;
  font-size: 16px;
  padding-top: 10px;
  color: #333333;
  padding-bottom: 15px;
}
.pline {
  clear: both;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 0.5px dashed #cccccc;
}
table {
  table-layout: fixed;
  empty-cells: show;
  border-collapse: collapse;
  margin: 0 auto;
}
.intable th {
  background-repeat: repeat-x;
  height: 30px;
  background-color: #f7f7f7;
}
.intable td {
  height: 50px;
}
.intable {
  width: 100%;
  border: 1px solid #e9e9e9;
  color: #666;
}
.intable td,
.intable th {
  border: 1px solid #e9e9e9;
  padding: 0 1em 0;
}
.poptable {
  width: 380px;
  border: 1px solid #e9e9e9;
  color: #666;
}
.poptable th {
  background-repeat: repeat-x;
  background-color: #f7f7f7;
}
.poptable td,
.poptable th {
  border: 1px solid #e9e9e9;
  height: 30px;
  padding: 0 1em 0;
}
table tr.alter {
  background-color: #f5fafe;
}
.numinput {
  width: 110px;
}
.identmain /deep/ .el-form-item__label {
  color: #333;
  font-size: 12px;
  font-weight: normal;
}
.identmain /deep/ .el-icon-arrow-right:before {
  color: #5881d8;
}
.identmain /deep/ .el-button--success.is-disabled {
  background-color: #5881d8;
  border-color: #5881d8;
}
.identmain /deep/ .el-collapse-item__content {
  padding-bottom: 0;
}
.zhujieren-coll /deep/ .el-collapse-item__wrap {
  overflow: inherit;
}

/*头部悬浮*/
.navtitle {
  position: fixed;
  width: 100%;
  height: 56px;
  line-height: 56px;
  background-color: #fff;
  z-index: 100;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  left: 0;
  top: 0;
  min-width: 1200px;
}
.titleBox {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #333;
  position: absolute;
  left: 0;
  top: 0;
}
.titleBox span {
  line-height: initial;
}
.titleBox img {
  margin: 0 6px 0 5px;
}
.flexbuton {
  width: 1200px;
  position: absolute;
  top: 12px;
  left: 50%;
  margin-left: -590px;
}
.order-messagebox .message-box .message-box-top {
  color: #333;
  font-size: 16px;
}
.order-messagebox .message-box .message-box-bottom {
  color: #666;
  font-size: 14px;
  padding-top: 2px;
}
.el-message-box__status{
  top: 25%!important;
}
.order-messagebox /deep/ .el-message-box__status {
  top: 26%!important;
  font-size: 22px !important;
}
.order-messagebox .el-message-box__content {
  padding-top: 0;
}
.order-messagebox .el-message-box__btns {
  padding: 8px 36px 12px;
}
</style>