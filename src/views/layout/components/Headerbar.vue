<template>
  <section
    id="headerbar-container"
    style="margin-left:calc((100% - 100vw)/2);min-width: calc(1200px + (100vw - 100%));"
  >
    <el-row
      style="padding-left:calc((100vw - 100%));min-width: calc(1200px + (100vw - 100%));"
      class="headerbar"
    >
      <el-row style="width:1200px;margin:0 auto">
        <el-col
          :span="3"
          class="headerleft"
        >
          <router-link to="/"><img
              :src="headerleftimg"
              alt=""
              title="点击返回首页"
              style="width:144px"
            ></router-link>
        </el-col>
        <el-col
          :span="19"
          class="headermiddle"
        >
          <ul>
            <li
              :class="{activenavtop:this.$route.matched[0].name =='creditapproval' }"
              @click="clicklink('creditapproval')"
            >
              <router-link :to="{path:'/dealer/creditapproval/orderlist'}"><span>信贷审批</span></router-link><i
                v-if="this.$route.matched[0].name =='creditapproval'"
                class="daosanjiao"
              ></i>
            </li>
            <li
              :class="{activenavtop:this.$route.matched[0].name =='afterloan' }"
              @click="clicklink('afterloan')"
            >
              <router-link :to="{path:'/dealer/afterloan'}"><span>贷后管理</span></router-link><i
                v-if="this.$route.matched[0].name =='afterloan'"
                class="daosanjiao"
              ></i>
            </li>
            <li
              :class="{activenavtop:this.$route.matched[0].name =='together' }"
              @click="clicklink('xietong')"
            >
              <router-link :to="{path:'/dealer/together'}"><span>协同办公</span></router-link><i
                v-if="this.$route.matched[0].name =='together'"
                class="daosanjiao"
              ></i>
            </li>
            <li
              @click="clicklink('commission')"
              :class="{activenavtop:this.$route.matched[0].name =='commission' }"
            >
              <router-link :to="{path:'/dealer/commission'}"><span>佣金结算</span></router-link><i
                v-if="this.$route.matched[0].name =='commission'"
                class="daosanjiao"
              ></i>
            </li>
            <li
              @click="clicklink('count')"
              :class="{activenavtop:this.$route.matched[0].name =='count' }"
            >
              <router-link :to="{path:'/dealer/count'}"><span>统计分析</span></router-link><i v-if="this.$route.matched[0].name =='count'"></i>
            </li>
            <li
              @click="clicklink('record')"
              :class="{activenavtop:this.$route.matched[0].name =='record' }"
            >
              <router-link :to="{path:'/dealer/record'}"><span>抵押备案</span></router-link><i
                v-if="this.$route.matched[0].name =='record'"
                class="daosanjiao"
              ></i>
            </li>
            <li
              @click="clicklink('sendcard')"
              :class="{activenavtop:this.$route.matched[0].name =='sendcard' }"
            >
              <router-link :to="{path:'/dealer/sendcard'}"><span>证件邮寄</span></router-link><i
                v-if="this.$route.matched[0].name =='sendcard'"
                class="daosanjiao"
              ></i>
            </li>
            <!-- <li :class="{activenavtop:fiveactive }" @click="clicklink('tongji')"><span>统计分析</span></li> -->
            <li
              :class="{activenavtop:this.$route.matched[0].name =='basicset' }"
              @click="clicklink('basicset')"
            >
              <router-link :to="{path:'/dealer/basicset'}"><span>基础设置</span></router-link><i
                v-if="this.$route.matched[0].name =='basicset'"
                class="daosanjiao"
              ></i>
            </li>

            <li style="float:right;padding:0">

              <el-dropdown
                :hide-on-click="false"
                trigger="hover"
                style="cursor:pointer;width:50px"
              >
                <div class="user-wrapper">
                  <el-badge
                    :value="errorcount"
                    :hidden="iscounthid"
                    class="mark"
                  >
                    <el-button
                      class="share-button"
                      size="small"
                      circle
                      icon="el-icon-bell"
                      type="primary"
                    ></el-button>

                  </el-badge>
                </div>
                <el-dropdown-menu
                  class="user-dropdownone"
                  slot="dropdown"
                >
                  <el-dropdown-item>
                    <span>今日录单数：{{todaycount}}</span>
                    <el-button
                      style="float:right"
                      type="warning"
                      icon="el-icon-refresh"
                      size="mini"
                      @click="toreupload"
                      circle
                    ></el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span>今日上传成功的影像：{{uploadcount}}</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span>今日上传失败的影像：{{errorcount}}</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span>上传失败的影像总数：{{totalerr}}</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span>磁盘剩余空间：{{diskspace}}</span>
                  </el-dropdown-item>
                  <!-- <el-dropdown-item >
                                  <span >当前网页百分比：{{detectZoom}}%</span>
                            </el-dropdown-item > -->
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li class="rest-edu-container">
              <el-dropdown
                :hide-on-click="false"
                trigger="hover"
                style="cursor:pointer;width:50px"
              >
                <div class="user-wrapper">

                  <el-button
                    class="share-button"
                    size="small"
                    circle
                    type="primary"
                    style="margin-top:9px;"
                  ><i class="rest-edu"></i></el-button>

                </div>
                <el-dropdown-menu
                  class="edu-dropdownone"
                  slot="dropdown"
                >
                  <el-dropdown-item>
                    剩余额度
                  </el-dropdown-item>

                  <el-dropdown-item
                    divided
                    v-if="dealerEdu.length"
                  >
                    <div :style="edustyle">
                      <div
                        v-for="edu in dealerEdu"
                        :key="edu.category"
                        style="text-align:center;height:60px;"
                        class="edu-per-item"
                      >

                        <el-progress
                          type="circle"
                          :percentage="edu.per"
                          :stroke-width="4"
                          :color="edu.color"
                          :width="60"
                          status="text"
                        >
                          <span class="rest-edu-name">{{edu.text}}</span>
                          <span class="rest-edu-per">{{edu.per}}%</span>
                        </el-progress>
                        <span class="edu-restmoney">￥{{edu.restedu}}</span>
                      </div>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item
                    style="font-size:12px;color:#999"
                    v-else
                  >
                    暂无
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>

        </el-col>

        <el-col
          :span="2"
          class="headerright"
        >
          <!-- <img :src="headerrightimg" alt="" @click="toOrder" style="vertical-align:middle;margin-top:-10px;cursor:pointer" > -->

          <el-dropdown
            trigger="hover"
            style="cursor:pointer;float:right;"
          >
            <div class="user-wrapper">
              <p>{{dealerinfo.code}}</p>

            </div>
            <el-dropdown-menu
              class="user-dropdown"
              slot="dropdown"
            >
              <el-dropdown-item style="word-break: unset!important;">

                <span>{{dealerinfo.userName}}</span>

              </el-dropdown-item>

              <el-dropdown-item
                @click.native="showMa"
                divided
              >
                <span>经销商二维码</span>
              </el-dropdown-item>
              <el-dropdown-item @click.native="upPass">
                <span>修改密码</span>
              </el-dropdown-item>

              <el-dropdown-item
                divided
                @click.native="logout"
              >
                <span style="display:block;">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-col>
      </el-row>
      <el-col
        :span="2"
        class="huijiu"
      >
        <img
          :src="jiuban"
          alt=""
          @click="qujiuban"
          style="vertical-align:middle;height:40px;float:right;cursor:pointer;width:45px"
        >
      </el-col>
    </el-row>
    <!-- <el-alert
          v-if="this.$route.matched[0].name == 'dashboard'"
          title="成功提示的文案"
          type="showinfo">
        </el-alert> -->
    <el-row
      class="navlist"
      v-if="(this.$route.matched[0].name != 'dashboard2'&&this.$route.matched[0].name != 'count2')"
      style="padding-left: calc((100vw - 100%));min-width: calc(1200px + (100vw - 100%));"
    >
      <el-row style="width:1200px;margin:0 auto">
        <el-col
          :span="17"
          :offset="3"
        >
          <ul v-if="this.$route.matched[0].name =='creditapproval'">
            <li>
              <router-link :to="{path:'/dealer/creditapproval/orderlist'}">订单管理</router-link><span
                v-if="this.$route.matched[1].meta.urlactive =='order'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/creditapproval/manlist'}">放款管理</router-link><span
                v-if="this.$route.matched[1].meta.urlactive =='loan'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/creditapproval/speciallist'}">特殊业务</router-link><span
                v-if="this.$route.matched[1].name =='speciallist'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/creditapproval/movepart'}">移动进件</router-link><span
                v-if="this.$route.matched[1].name =='movepart'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/creditapproval/assetslist'}">资产变更</router-link><span
                v-if="this.$route.matched[1].meta.urlactive =='assetslist'"
                class="activenavlist"
              ></span>
            </li>
            <!-- <li><router-link :to="{path:'/dealer/creditapproval/stayEndowment'}">客户留资</router-link><span v-if="this.$route.matched[1].name =='stayEndowment'" class="activenavlist"></span></li> -->
          </ul>
          <span v-if="daihouisold">
            <ul v-if="this.$route.matched[0].name =='afterloan'">
              <li>
                <router-link :to="{path:'/dealer/afterloan/doclistold'}">文档管理</router-link><span
                  v-if="this.$route.matched[1].meta.urlactive =='doc'"
                  class="activenavlist"
                ></span>
              </li>
              <li>
                <router-link :to="{path:'/dealer/afterloan/delaylistold'}">延期管理</router-link><span
                  v-if="this.$route.matched[1].meta.urlactive =='delay'"
                  class="activenavlist"
                ></span>
              </li>
              <!-- <li><router-link :to="{path:'/dealer/afterloan/borrowlist'}">借阅管理</router-link><span v-if="this.$route.matched[1].meta.urlactive =='borrow'" class="activenavlist"></span></li> -->
              <li>
                <router-link :to="{path:'/dealer/afterloan/insulistold'}">保险业务</router-link><span
                  v-if="this.$route.matched[1].meta.urlactive =='baoxianyewu'"
                  class="activenavlist"
                ></span>
              </li>
              <li>
                <router-link :to="{path:'/dealer/afterloan/mortlistold'}">解抵押</router-link><span
                  v-if="this.$route.matched[1].meta.urlactive == 'jiediya'"
                  class="activenavlist"
                ></span>
              </li>
            </ul>
          </span>
          <span v-else>
            <ul v-if="this.$route.matched[0].name =='afterloan'">
              <li>
                <router-link :to="{path:'/dealer/afterloan/doclist'}">文档管理</router-link><span
                  v-if="this.$route.matched[1].meta.urlactive =='doc'"
                  class="activenavlist"
                ></span>
              </li>
              <li>
                <router-link :to="{path:'/dealer/afterloan/delaylist'}">延期管理</router-link><span
                  v-if="this.$route.matched[1].meta.urlactive =='delay'"
                  class="activenavlist"
                ></span>
              </li>
              <!-- <li><router-link :to="{path:'/dealer/afterloan/borrowlist'}">借阅管理</router-link><span v-if="this.$route.matched[1].meta.urlactive =='borrow'" class="activenavlist"></span></li> -->
              <li>
                <router-link :to="{path:'/dealer/afterloan/insulist'}">保险业务</router-link><span
                  v-if="this.$route.matched[1].meta.urlactive =='baoxianyewu'"
                  class="activenavlist"
                ></span>
              </li>
              <li>
                <router-link :to="{path:'/dealer/afterloan/mortgage'}">解抵押</router-link><span
                  v-if="this.$route.matched[1].meta.urlactive == 'jiediya'"
                  class="activenavlist"
                ></span>
              </li>
            </ul>
          </span>
          <ul v-if="this.$route.matched[0].name =='commission'"
          >
            <li>
              <router-link :to="{path:'/dealer/commission/settlerebate'}">返利管理</router-link><span
                v-if="this.$route.matched[1].name == 'settlerebate'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/commission/quarterreward'}">季度优胜奖管理</router-link><span
                v-if="this.$route.matched[1].name =='quarterreward'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/commission/personalcom'}">个人佣金</router-link><span
                v-if="this.$route.matched[1].name =='personalcom'"
                class="activenavlist"
              ></span>
            </li>
          </ul>
          <ul v-if="this.$route.matched[0].name =='basicset'">
            <li>
              <router-link :to="{path:'/dealer/basicset/tooldown'}">系统工具下载</router-link><span
                v-if="this.$route.matched[1].name =='tooldown'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/basicset/saleslist'}">销售顾问管理</router-link><span
                v-if="this.$route.matched[1].name =='saleslist'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/basicset/saledirectslist'}">销售总监管理</router-link><span
                v-if="this.$route.matched[1].name =='saledirectslist'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/basicset/creditslist'}">信贷专员管理</router-link><span
                v-if="this.$route.matched[1].name =='creditslist'"
                class="activenavlist"
              ></span>
            </li>
            <!-- <li>
              <router-link :to="{path:'/dealer/basicset/userlist'}">用户管理</router-link><span
                v-if="this.$route.matched[1].name =='userlist'"
                class="activenavlist"
              ></span>
            </li> -->
            <li>
              <router-link :to="{path:'/dealer/basicset/appraiser'}">评估师</router-link><span
                v-if="this.$route.matched[1].name =='appraiser'"
                class="activenavlist"
              ></span>
            </li>
          </ul>
          <ul v-if="this.$route.matched[0].name =='together'">
            <li>
              <router-link :to="{path:'/dealer/together/notice'}">通知公告</router-link><span
                v-if="this.$route.matched[1].meta.urlactive=='notice'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/together/dataList'}">资料管理</router-link><span
                v-if="this.$route.matched[1].meta.urlactive =='dataList'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/together/marketInfo'}">市场信息</router-link><span
                v-if="this.$route.matched[1].name =='marketInfo'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/together/maillist'}">通讯录</router-link><span
                v-if="this.$route.matched[1].name =='maillist'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/together/video'}">案例展示</router-link><span
                v-if="this.$route.matched[1].meta.urlactive =='video'"
                class="activenavlist"
              ></span>
            </li>
            <!-- <li><router-link :to="{path:'/dealer/together/calc'}">算车贷</router-link><span v-if="this.$route.matched[1].meta.urlactive =='calc'" class="activenavlist"></span></li> -->
          </ul>
          <ul v-if="this.$route.matched[0].name =='record'">
            <li>
              <router-link :to="{path:'/dealer/record/recorder'}">备案管理</router-link><span
                v-if="this.$route.matched[1].meta.urlactive=='record'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/record/post'}">抵押管理</router-link><span
                v-if="this.$route.matched[1].meta.urlactive=='post'"
                class="activenavlist"
              ></span>
            </li>
          </ul>
          <ul v-if="this.$route.matched[0].name =='sendcard'">
            <li>
              <router-link :to="{path:'/dealer/sendcard/addcard'}">证件邮寄</router-link><span
                v-if="this.$route.matched[1].meta.urlactive=='addcard'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/sendcard/cardrec'}">证件接收</router-link><span
                v-if="this.$route.matched[1].meta.urlactive=='cardrec'"
                class="activenavlist"
              ></span>
            </li>
            <li>
              <router-link :to="{path:'/dealer/sendcard/cardlist'}">证件邮寄列表</router-link><span
                v-if="this.$route.matched[1].meta.urlactive =='cardlist'"
                class="activenavlist"
              ></span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-row>
    <el-dialog
      title="二维码"
      :visible.sync="dialogVisible"
      width="250px"
    >
      <div class="qrcode">

        <vue-qr
          :text="dealerinfo.orgId+'/'+dealerinfo.orgName"
          :size="200"
        ></vue-qr>

      </div>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible.sync="uppassdate"
      width="500px"
      center
    >
      <el-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
      >
        <el-form-item
          label="密码"
          prop="pass"
          :label-width="formLabelWidth"
        >
          <el-input v-model="ruleForm2.pass"></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkPass"
          :label-width="formLabelWidth"
        >
          <el-input v-model="ruleForm2.checkPass"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="uppassdate = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dopassdata('ruleForm2')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { detectZoom, fmoney } from "@/utils/index";
import { getInfoSalers, getAllCredit } from "@/api/basic";
import { orderNew, getUserInfo, getCrediterdu } from "@/api/credit";
import Cookies from "js-cookie";
import { mapGetters } from "vuex";
import jiuban from "@/assets/images/jiuban.png";
import unjoin from "@/assets/images/unjoin.png";
import join from "@/assets/images/join.png";
import headerleftimg from "@/assets/images/logo.svg";
import headerrightimg from "@/assets/images/icon_ld.png";
import share from "@/assets/images/share.png";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      daihouisold: window.local.daihouisold,
      share,
      detectZoom: "100",
      iscounthid: true,
      totalerr: 0,
      todaycount: 0,
      uploadcount: 0,
      errorcount: 0,
      diskspace: 0,
      dealerEdu: [],
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      shenbt: 0,
      shengmoney: 0,
      showedu: false,
      dealerinfo: {},
      uppassdate: false,
      iplist: [],
      formLabelWidth: "120px",
      websocketmessage: null,
      websock: null,
      dialogVisible: false,
      qrcodeimg: "",
      join,
      jiuban,
      unjoin,
      headerleftimg,
      headerrightimg,
      ruleForm2: {
        pass: "",
        checkPass: ""
      }
    };
  },
  computed: {
    ...mapGetters(["name", "roles"]),
    edustyle: function() {
      let width = 92 * this.dealerEdu.length;
      return {
        height: "95px",
        "padding-top": "10px",
        width: width + "px"
      };
    }
  },
  filters: {
    filtermemo: function(value) {
      if (value && value.length > 10) {
        value = value.substring(0, 10) + "...";
      }
      return value;
    }
  },
  methods: {
    toreupload() {
      if (!this.$store.state.websocket.socket.isConnected) {
        this.$message({
          message: "没有安装中间件，请先安装中间件！！！！",
          type: "warning"
        });
        return false;
      }
      var s = {};
      s.TOKEN = Cookies.get("Admin-Token");
      var data = "REUPLOAD  " + JSON.stringify(s);
      this.$store.dispatch("SocketConnect");
      this.$store.dispatch("SocketSenddata", data);
      this.$message({
        type: "success",
        message: "发送中间件重新上传请求成功"
      });
    },
    showMa() {
      this.dialogVisible = true;
    },
    getuser() {
      getInfoSalers().then(res => {
        if (res.data.success) {
          Cookies.set("userId", res.data.data.code);
          localStorage.setItem("dealerinfo", JSON.stringify(res.data.data));
          this.dealerinfo = res.data.data;
        }
      });
    },
    dopassdata(formname) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    upPass() {
      this.$message({
        type: "error",
        message: "正在开发中"
      });
      // this.uppassdate = true
      // console.log(123)
    },
    toOrder() {
      orderNew().then(res => {
        if (res.data.success) {
          localStorage.setItem(
            "orderId" + res.data.data.orderId,
            res.data.data.orderId
          );
          localStorage.setItem(
            "order" + res.data.data.orderId,
            JSON.stringify(res.data.data)
          );
          this.$router.push({
            path:
              "/dealer/creditapproval/personalorder/" + res.data.data.orderId
          });
        } else {
          this.$message({
            type: "error",
            message: "服务器错误！！，请联系管理员"
          });
        }
      });
    },
    qujiuban() {
      window.location.href = "/";
    },
    clicklink(type) {},
    toDoWebsock() {
      // console.log(JSON.parse(this.websocketmessage))
      if (typeof this.websocketmessage === "string") {
        var objdata = JSON.parse(this.websocketmessage);
        console.log(objdata);
        if (objdata.Type === "PCCONNOK") {
          this.qrcodeimg = "data:image/jpg;base64," + objdata.QrCodeData;
          this.iplist = objdata.Data.IP.split(",");
          Cookies.set("MIDID", objdata.MidId);
        }
        if (objdata.Type === "MWINFO") {
          if (objdata.Data.ERRORCOUNT > 0) {
            this.iscounthid = false;
          }
          this.todaycount = objdata.Data.TODAYCOUNT;
          this.uploadcount = objdata.Data.UPLOADCOUNT;
          this.errorcount = objdata.Data.ERRORCOUNT;
          this.diskspace = objdata.Data.DISKSPACE;
          this.totalerr = objdata.Data.TOTALERR;
        }
        if (objdata.Type === "APPLOGIN") {
          Cookies.set("APPID", objdata.Data.APPID);
          Cookies.set("APPNAME", objdata.Data.APPNAME);
          this.dialogVisible = false;
          this.$message({
            message: "恭喜你，登录成功",
            type: "success",
            duration: 5 * 1000
          });
        }
      } else {
        this.ceshiimg = window.URL.createObjectURL(this.websocketmessage);
      }
    },
    doOpenSao() {
      var s = {};
      s.USERID = "admin"; // Cookies.get('userId')
      s.TOKEN = Cookies.get("Admin-Token");
      var data = "PCCONN " + JSON.stringify(s);
      this.$store.dispatch("SocketConnect");
      this.$store.dispatch("SocketSenddata", data);

      this.dialogVisible = true;
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        localStorage.clear();
        location.href = "/login.html"; // 为了重新实例化vue-router对象 避免bug
      });
    },
    init() {
      this.detectZoom = detectZoom();
      var s = {};
      s.USERID = Cookies.get("userId"); // Cookies.get('userId')
      s.TOKEN = Cookies.get("Admin-Token");
      var data = "PCCONN " + JSON.stringify(s);
      this.$store.dispatch("SocketConnect");
      this.$store.dispatch("SocketSenddata", data);

      getCrediterdu().then(res => {
        if (res.data.success) {
          this.shengmoney = res.data.data.havingmoney;
          this.shenbt =
            Math.round(
              (res.data.data.havingmoney / res.data.data.allmoney) * 10000
            ) / 100;
          this.showedu = true;
        }
      });

      getAllCredit().then(res => {
        var typies = [
          {
            category: 1,
            text: "新车",
            color: "#55C6D7"
          },
          {
            category: 2,
            text: "二手车",
            color: "#CDC021"
          },
          {
            category: 4,
            text: "全品牌",
            color: "#5B92FA"
          }
        ];
        if (res.data.success) {
          var data = res.data.data.data;
          typies.forEach((item, index) => {
            let cItem = data.filter(i => {
              return i.category == item.category;
            });
            if (cItem && cItem.length) {
              cItem = cItem[0];
              typies[index]["ok"] = true;
              typies[index]["restedu"] = fmoney(cItem["havemoney"], 2);
              typies[index]["per"] = Number(
                Number((cItem["havemoney"] / cItem["money"]) * 100).toFixed()
              );
              // 模拟数据 Number(Number(Math.random() * 100).toFixed())
            }
          });
          typies = typies.filter(item => {
            return item.ok;
          });
          this.dealerEdu = typies;
        }
      });
    }
  },
  watch: {
    "$store.state.websocket.socket.message": function() {
      var that = this;
      if (this.$store.state.websocket.socket.message) {
        that.websocketmessage = this.$store.state.websocket.socket.message;
        that.toDoWebsock();
      }
    }
  },
  mounted() {
    this.getuser();
    this.init();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.huijiu {
  width: 35px;
  height: 30px;
  position: absolute;
  z-index: 100;
  top: 0px;
  right: 0;
}
.qrcode {
  text-align: center;
  display: flex;
}
.qrcode li {
  list-style: none;
  flex: 1;
  margin-left: 10px;
}
.activenavtop {
  opacity: 1 !important;
}
.activenavlist {
  width: 100%;
  height: 2px;
  background: linear-gradient(
    135deg,
    rgba(88, 129, 216, 1) 0%,
    rgba(60, 96, 197, 1) 100%
  );
  display: inherit;
}
.daosanjiao {
  display: block;
  overflow: hidden;
  width: 0px;
  height: 0px;
  border-top: 4px solid transparent;
  border-right: 8px solid transparent;
  border-left: 8px solid transparent;
  border-bottom: 8px solid #ffffff;
  margin-left: 19px;
  margin-top: 16px;
}
.headerbar {
  width: 100%;
  height: 50px;
  background-color: #435eaa;
  // background: url('~imgs/bg_nav.jpg') no-repeat;
  background-size: cover;
}
.headerleft {
  height: 50px;
  line-height: 69px;
}
.headermiddle {
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
}
.headermiddle ul li {
  font-family: ".PingFang-SC-Regular";
  float: left;
  list-style: none;
  padding-left: 10px;
  padding-right: 10px;
  opacity: 0.7;
  & span {
    width: 70px;
    height: 22px;
    display: block;
    color: #ffffff;
    font-size: 16px;
  }
}
.headermiddle ul li span:hover {
  color: #fff;
  opacity: 1;
}
.headerright {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.user-container {
  margin-left: 5px;
}
.user-dropdown {
  top: 33px !important;
  width: 200px;
}
.user-dropdownone {
  top: 33px !important;
  width: 220px;
}
.el-dropdown {
  // top:-5px!important;
  padding-left: 10px;
}
.edu-dropdownone {
  top: 33px !important;
  min-width: 100px;
}
.user-wrapper {
  display: flex;
  align-items: center;
}
.user-wrapper p {
  color: #ffffff;
  height: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.el-icon-caret-bottom {
  color: #ffffff;
}
.navlist {
  background: #ffffff;
  height: 40px;
  line-height: 40px;
  & ul li {
    float: left;
    list-style: none;
    font-size: 14px;
    color: #7c7c7c;
    padding-left: 20px;
    padding-right: 20px;
  }
}
.navlist ul li:hover {
  color: RGBA(88, 129, 216, 1);
}
.headermiddle ul li:hover {
  opacity: 1;
}
.rest-edu-container {
  float: right !important;
  padding: 0px;
}
.rest-edu {
  display: block;
}
.rest-edu::after {
  content: "";
  width: 12px;
  height: 13px;
  display: block;
  background: url(~@/assets/images/restedu.png) no-repeat;
  background-size: cover;
}
.rest-edu-name {
  display: block;
  font-size: 12px;
  color: #999;
  margin-bottom: 3px;
}
.rest-edu-per {
  display: block;
  font-size: 14px;
  color: #333;
}
.edu-per-item {
  display: inline-block;
  width: 92px;
  line-height: 18px;
}
.edu-restmoney {
  text-align: center;
  display: block;
  font-size: 12px;
  overflow: hidden;
  color: #333;
}
.edu-per-item /deep/ .el-progress-circle {
  transform: rotateY(180deg);
}
</style>