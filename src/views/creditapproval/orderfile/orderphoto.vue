<template>
  <section>
    <el-row style="margin-top:5px">
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
        :span="9"
        class="topbtnbasic"
        style="float:right"
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
          class="btncolor"
          style="width: 60px;padding: 8px 0;"
          @click="yanzheng"
          v-show="orderstatus!=4"
        >提交</el-button>
      </el-col>

    </el-row>
    <Affix>
      <el-row class="searchbar">
        <el-col
          :span="22"
          :offset="2"
        >
          <Steps
            :current="3"
            class="stepcolor"
          >
            <Step title="基本信息">
              <li
                @click="tojinrong()"
                style="width:100px;height:20px;margin-top:-25px;cursor:pointer"
              >基本信息</li>
            </Step>
            <Step title="客户信息">
              <li
                @click="totianxie()"
                style="width:100px;height:20px;margin-top:-25px;cursor:pointer"
              >客户信息</li>
            </Step>
            <Step title="协议签署">
              <li
                @click="tokehu()"
                style="width:100px;height:20px;margin-top:-25px;cursor:pointer"
              >协议签署</li>
            </Step>
            <Step title="影像资料">
              <li style="width:100px;height:20px;margin-top:-25px;cursor:pointer">影像资料</li>
            </Step>
          </Steps>
        </el-col>
      </el-row>
    </Affix>
    <el-row v-loading='!(!isInfoLoading && !isImageLoading)'>
      <el-col :span="20">
        <div
          class="middle"
          ref="scrollTobar"
          v-bar
        >
          <div>
            <el-row
              v-for="(item,index) in imglistll"
              :key="index"
            >
              <el-col
                :span="23"
            
             
                 style="background-color:#F0F3F7;color:#507ACD;font-size:14px;font-weight:bold;height:40px;line-height:40px;margin-top:8px;text-indent:16px;margin-left:24px"
              >
                <span><span
                    v-if="imglisttype.includes(item.cateCode)"
                    class="colorred"
                  >*</span>{{item.subTitle}}</span>
              </el-col>

              <div id="fourAnchor"></div>
              <el-col
                :span="23"
               style="margin-left:24px"
              >
                <p class="pline"></p>
              </el-col>
              <el-col
              style="background-color:#F7F7F7;padding-top:16px;padding-bottom:16px;padding-left:16px;margin-left:24px"
                :span="23"
                
              >
                <div style="float:left">
                  <ul class="imglistul">

                    <draggable
                      v-model="fileListimg[item.cateCode]"
                      :options="{group:'people'}"
                      @add="dragend(item.cateCode)"
                    >
                      <li
                        v-show="fileListimg[item.cateCode]?fileListimg[item.cateCode].length <1 : !fileListimg[item.cateCode]"
                        style="width:115px;height:115px;cursor:pointer;border:1px dashed #ccc;line-height:115px;text-align:center"
                      >
                        <span v-if="sbdisable">暂无图片</span>
                        <span v-else>请上传图片</span>
                      </li>
                    </draggable>
                    <draggable
                      v-model="fileListimg[item.cateCode]"
                      :options="{group:'people'}"
                      @add="dragend(item.cateCode)"
                    >
                      <li
                        style="position:relative;width:115px;height:115px;cursor:pointer;"
                        v-for="(file, key) in fileListimg[item.cateCode]"
                        :key="key"
                      >

                        <viewer>
                          <img
                            style="width:115px;height:115px;cursor:pointer;"
                            :src="file.url"
                            alt=""
                          >
                        </viewer>
                        <i v-show="file.isHistory!=1">
                          <a
                            href="javascript:;"
                            v-if="!sbdisable"
                            @click="delimg(file,fileListimg[item.cateCode],key)"
                          >
                            <img
                              :src="deletepng"
                              class="delete"
                            />
                          </a>
                        </i>
                      </li>

                    </draggable>
                  </ul>
                </div>
                <div
                  v-if="!sbdisable"
                  style=" width:115px;height:115px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px"
                >
                  <el-col
                    :span="24"
                    style="text-align:center;margin-top:20px"
                  >
                    <el-upload
                      :file-list="fileListimg[item.cateCode]"
                      action=""
                      :show-file-list="false"
                      :before-upload="beforeAvatarUpload"
                    >
                      <el-button
                        style=""
                        @click="clickimg(item.cateCode)"
                        type="success"
                        size="small"
                        class="btncolor"
                      >本地上传</el-button>
                    </el-upload>
                    <el-button
                      style="margin-left:0;margin-top:20px"
                      type="success"
                      @click="appUpload(item.cateCode,item.subTitle)"
                      size="small"
                      class="btncolor"
                    >拍摄照片</el-button>
                  </el-col>
                </div>
              </el-col>
            </el-row>

          </div>

        </div>
      </el-col>
      <!-- <div class="imgset" >
          <img :src="bopenleft" @click='toCollapse' alt="">
        </div> -->
      <el-col :span="4">
        <div class="rightSlider">
          <div class="imgtitle">
            <span>照片选择区</span>
          </div>
          <div
            class="middleimg"
            v-bar
          >
            <div>
              <ul style="text-align:center;margin-top:5px;">
                <draggable
                  v-model="fileList10"
                  :options="{group:'people'}"
                  @end="dragend"
                >
                  <li
                    v-if="fileList10.length==0"
                    style="width:115px;height:115px;cursor:pointer;border:1px dashed #ccc;line-height:115px;text-align:center;margin:0 auto"
                  >
                    <span v-if="sbdisable">暂无图片</span>
                    <span v-else>请使用高拍仪拍照</span>
                  </li>
                </draggable>
                <draggable
                  v-model="fileList10"
                  :options="{group:'people'}"
                  @end="dragend"
                >
                  <li
                    v-for="(file, key) in fileList10"
                    :key="key"
                  >

                    <img
                      style="width:150px;height:115px;cursor:pointer;"
                      :src="file.url"
                      alt=""
                    >
                  </li>

                </draggable>
              </ul>
            </div>
          </div>
          <!-- <div class="footer" v-if="!sbdisable">
             
                  <el-upload
                    
                    :file-list="fileList10"
                    action=""
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload10">
                    <el-button style="" type="success" size="mini" class="btncolor" >本地上传</el-button>
                  </el-upload> -->

          <!-- <el-button  type="success" style="margin-left:0;float:right" size="mini" @click="appUpload10" class="btncolor">拍摄照片</el-button> -->

          <!-- </div> -->

        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialoglist"
      width="55%"
      @close="toclose"
    >

      <el-table :data="datasend">
        <el-table-column
          property="refData.typename"
          label="类型"
          width="200"
        ></el-table-column>
        <el-table-column
          property="name"
          label="人员"
          width="150"
        ></el-table-column>
        <el-table-column
          property="phone"
          label="手机号"
          width="200"
        ></el-table-column>
        <el-table-column
          property="refData.castatusname"
          label="状态"
          width="200"
        ></el-table-column>
        <el-table-column
          property="faceResultCn"
          label="识别结果"
          width="200"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope='scope'>
            <el-button
              v-show="!showma"
              size="mini"
            >{{count}}s</el-button>
            <el-button
              v-show="showma"
              size="mini"
              @click="esign(scope.row)"
            >{{countname}}</el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </section>
</template>

<script>
import Cookies from "js-cookie";
import {
  orderimgsave,
  ordersortimg,
  orderdelimg,
  ordergetBuimage,
  orderInfo,
  orderCauserlist,
  orderSendsms,
  getCurrentTaskCmd,
  postRevisepause,
  postConditionalapproval,
  postPrintCommon,
  orderSavesub
} from "@/api/credit";
import { getBase64Image } from "@/utils";
import deletepng from "@/assets/images/delete.png";
import bopenleft from "@/assets/images/btn_open_left.png";
import bopenright from "@/assets/images/btn_open_right.png";
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  inject: ["reload"],
  data() {
    return {
      isInfoLoading: true,
      isImageLoading: true,
      orderstatus: 0,
      ershow: false,
      btndisable: false,
      imgTotype: "",
      interval: {},
      btnlistenter: [],
      countname: "电子签",
      showma: true,
      count: "",
      timer: null,
      routeid: this.$route.params.id,
      contentlist: {},
      imglistll: [],
      imglisttype: [],
      sbdisable: false,
      idcardimg: [],
      deletepng,
      imageUrl21: "",
      imageUrl22: "",
      datasend: [],
      dialoglist: false,
      filelistype: "",
      ceshiimg: [],
      oneActive: true,
      twoActive: false,
      threeActive: false,
      fourActive: false,
      fiveActive: false,
      sixActive: false,
      senveActive: false,
      eightActive: false,
      nineActive: false,
      tenActive: false,
      file: "",
      websocketmessage: "",
      bopenleft,
      bopenright,
      abc: "123",
      fileListimg: {},
      fileList: [],
      fileList2: [],
      fileList21: [],
      fileList22: [],
      fileList3: [],
      fileList31: [],
      fileList32: [],
      fileList4: [],
      fileList5: [],
      fileList6: [],
      fileList7: [],
      fileList8: [],
      fileList9: [],
      fileList10: [],
      fileList11: [],
      fileList111: [],
      fileList112: [],
      isCollapse: true,
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    toPrint() {
      let para = {};
      para = {
        contractno: this.contentlist.basicInfo.id,
        grf: "",
        type: "application"
      };
      postPrintCommon(para).then(res => {
        if (res.data.success) {
          var url =
            window.g.FilePrint +
            "api/print/" +
            res.data.data.dataid +
            "?grf=" +
            res.data.data.grf +
            "&type=inline&qtype=" +
            res.data.data.qtype +
            "&dataname=" +
            res.data.data.dataname;
          window.open(url);
        } else {
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
        console.log(res);
      });
    },
    btnenterto(item) {
      var that = this
      var tmpbtnlisten = []
      tmpbtnlisten = JSON.stringify(this.btnlistenter)
      this.btnlistenter.length = false
      if(this.btndisable){
        return
      }
      this.btndisable = true;
      var status = this.contentlist.basicInfo.status;
      if (status === 4) {
        let para = {};
        para = this.contentlist;
        postRevisepause(para).then(res => {
          this.btndisable = false;
          this.btnlistenter = JSON.parse(tmpbtnlisten)
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
      if (status === 6) {
        let para = {};
        para = {
          dataid: this.contentlist.basicInfo.id,
          cmdid: item.id
        };
        postConditionalapproval(para).then(res => {
          this.btndisable = false;
          this.btnlistenter = JSON.parse(tmpbtnlisten)
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
    yanzheng() {
      /* eslint-disable */
      var that = this;
      // if (
      //   !this.contentlist.basicInfo.dealer || !this.contentlist.basicInfo.signdealer ||
      //   !this.contentlist.basicInfo.applyuser ||
      //   !this.contentlist.basicInfo.creditofficer ||
      //   !this.contentlist.basicInfo.saleuser ||
      //   !that.contentlist.vehicleInfo.maker ||
      //   !that.contentlist.vehicleInfo.brand ||
      //   !that.contentlist.vehicleInfo.style ||
      //   !that.contentlist.vehicleInfo.guideprice ||
      //   !that.contentlist.vehicleInfo.invoiceprice ||
      //   !that.contentlist.vehicleInfo.purpose ||
      //   !that.contentlist.vehicleInfo.registration ||
      //   !that.contentlist.financialInfo.fnproduct ||
      //   !that.contentlist.financialInfo.invoiceprice ||
      //   !that.contentlist.financialInfo.allmoney ||
      //   !that.contentlist.financialInfo.loanperiod ||
      //   !that.contentlist.financialInfo.paymentfrequency ||
      //   !that.contentlist.financialInfo.downratio ||
      //   !that.contentlist.financialInfo.downamount ||
      //   !that.contentlist.financialInfo.firstpayment ||
      //   !that.contentlist.financialInfo.loanmoney
      // ) {
      //   that.$message({
      //     message: '金融产品未填写完整!!!',
      //     type: 'success'
      //   })
      //   localStorage.setItem('rulefalse' + that.routeid, true)
      //   this.$router.push({ path: '/dealer/creditapproval/personalorder/'  + this.routeid})
      //   return false
      // }
      // if (this.contentlist.borrowers == null) {

      //   that.$message({
      //     message: '主借人信息填写未完整！！！',
      //     type: 'success'
      //   })
      //   localStorage.setItem('rulefalse' + that.routeid, true)
      //   this.$router.push({ path: '/dealer/creditapproval/identmain/' + this.routeid })
      //   localStorage.setItem('activetag' + that.routeid, ['1','2'])
      //   return false
      // }

      // var zhujieren = this.contentlist.borrowers.filter(item => item.type == 1)[0]
      // var gongjieren = this.contentlist.borrowers.filter(item => item.type == 2)[0]
      // var danbaoren = this.contentlist.borrowers.filter(item => item.type == 3)[0]
      // var jijilianxiren = this.contentlist.urgentPartys

      // zhujieren.addresses.forEach(function(item,index,array){
      //   if (
      //     !item.area ||
      //     !item.addresstype ||
      //     !item.address ||
      //     !item.postno ||
      //     !item.propertytype ||
      //     !item.cdate
      //     ){

      //       that.$message({
      //         message: '主借人信息填写未完整！！！',
      //         type: 'success'
      //       })
      //       localStorage.setItem('rulefalse' + that.routeid, true)
      //       localStorage.setItem('activetag' + that.routeid, ['1','2'])
      //       this.$router.push({ path: '/dealer/creditapproval/identmain/' + this.routeid })
      //       return false
      //     }
      // })
      // jijilianxiren.forEach(function(item,index,array){
      //   if (
      //     !item.relationship ||
      //     !item.name ||
      //     !item.phone
      //     ){

      //       that.$message({
      //         message: '紧急联系人信息填写未完整！！！',
      //         type: 'success'
      //       })
      //       localStorage.setItem('rulefalse' + that.routeid, true)
      //       localStorage.setItem('activetag' + that.routeid, ['1','2'])
      //       this.$router.push({ path: '/dealer/creditapproval/identmain/' + this.routeid })
      //       return false
      //     }
      // })
      // if (
      //   !zhujieren.cardtype ||
      //   !zhujieren.name ||
      //   !zhujieren.card ||
      //   !zhujieren.carddate ||
      //   !zhujieren.birthday ||
      //   !zhujieren.sex ||
      //   !zhujieren.ename ||
      //   !zhujieren.education ||
      //   !zhujieren.workinglife ||
      //   !zhujieren.marriagestatus ||
      //   !zhujieren.location ||
      //   !zhujieren.familysize ||
      //   !zhujieren.company ||
      //   !zhujieren.caparty01 ||
      //   !zhujieren.caparty03 ||
      //   !zhujieren.caparty02 ||
      //   !zhujieren.caparty04 ||
      //   !zhujieren.scale ||
      //   !zhujieren.pincome ||
      //   !zhujieren.fincome ||
      //   !zhujieren.expenditure ||
      //   (zhujieren.payment != "0" && !zhujieren.payment ) ||
      //   (zhujieren.loan != "0" && !zhujieren.loan ) ||
      //   !zhujieren.phone ||
      //   !zhujieren.phone2
      // ) {
      //   that.$message({
      //     message: '主借人信息填写未完整！！！',
      //     type: 'success'
      //   })

      //   localStorage.setItem('activetag' + that.routeid, ['1','2'])
      //   localStorage.setItem('rulefalse' + that.routeid, true)
      //   this.$router.push({ path: '/dealer/creditapproval/identmain/' + this.routeid })
      //   return false
      // }

      // if(!this.contentlist.urgentPartys){
      //   that.$message({
      //     message: '紧急联系人信息填写未完整！！！',
      //     type: 'success'
      //   })
      //   localStorage.setItem('rulefalse' + that.routeid, true)
      //    localStorage.setItem('activetag' + that.routeid, ['1','2'])
      //   this.$router.push({ path: '/dealer/creditapproval/identmain/' + this.routeid })
      //   return false
      // }

      // if(danbaoren) {
      //   danbaoren.addresses.forEach(function(item,index,array){
      //     if (
      //       !item.area ||
      //       !item.addresstype ||
      //       !item.address ||
      //       !item.postno ||
      //       !item.propertytype ||
      //       !item.cdate
      //       ){
      //         that.$message({
      //           message: '保证人信息填写未完整！！！',
      //           type: 'success'
      //         })
      //         localStorage.setItem('sbtag' + that.routeid, 4)
      //         localStorage.setItem('activetag' + that.routeid, ['1','2','3','4'])
      //         localStorage.setItem('rulefalse' + that.routeid, true)
      //         this.$router.push({ path: '/dealer/creditapproval/identmain/' + this.routeid })
      //       }
      //   })
      //   if (
      //     !danbaoren.cardtype ||
      //     !danbaoren.name ||
      //     !danbaoren.card ||
      //     !danbaoren.carddate ||
      //     !danbaoren.birthday ||
      //     !danbaoren.sex ||
      //     !danbaoren.ename ||
      //     !danbaoren.education ||
      //     !danbaoren.workinglife ||
      //     !danbaoren.marriagestatus ||
      //     !danbaoren.location ||
      //     !danbaoren.familysize ||
      //     !danbaoren.company ||
      //     !danbaoren.caparty01 ||
      //     !danbaoren.caparty03 ||
      //     !danbaoren.caparty02 ||
      //     !danbaoren.caparty04 ||
      //     !danbaoren.scale ||
      //     !danbaoren.pincome ||
      //     !danbaoren.fincome ||
      //     !danbaoren.expenditure ||
      //     (danbaoren.payment != "0" && !danbaoren.payment ) ||
      //     (danbaoren.loan != "0" && !danbaoren.loan ) ||
      //     !danbaoren.phone ||
      //     !danbaoren.phone2
      //   ) {
      //     that.$message({
      //       message: '保证人信息填写未完整！！！',
      //       type: 'success'
      //     })
      //     localStorage.setItem('sbtag' + that.routeid, 4)
      //     localStorage.setItem('activetag' + that.routeid, ['1','2','3','4'])
      //     localStorage.setItem('rulefalse' + that.routeid, true)
      //     this.$router.push({ path: '/dealer/creditapproval/identmain/' + this.routeid })
      //   }
      // }
      // if(gongjieren) {
      //   gongjieren.addresses.forEach(function(item,index,array){
      //     if (
      //       !item.area ||
      //       !item.addresstype ||
      //       !item.address ||
      //       !item.postno ||
      //       !item.propertytype ||
      //       !item.cdate
      //       ){
      //         that.$message({
      //           message: '共借人信息填写未完整！！！',
      //           type: 'success'
      //         })
      //         localStorage.setItem('sbtag' + that.routeid, 3)
      //         localStorage.setItem('activetag' + that.routeid, ['1','2','3'])
      //         localStorage.setItem('rulefalse' + that.routeid, true)
      //         this.$router.push({ path: '/dealer/creditapproval/identmain/' + this.routeid })
      //         return false
      //       }
      //   })
      //   if (
      //     !gongjieren.cardtype ||
      //     !gongjieren.name ||
      //     !gongjieren.card ||
      //     !gongjieren.carddate ||
      //     !gongjieren.birthday ||
      //     !gongjieren.sex ||
      //     !gongjieren.ename ||
      //     !gongjieren.education ||
      //     !gongjieren.workinglife ||
      //     !gongjieren.marriagestatus ||
      //     !gongjieren.location ||
      //     !gongjieren.familysize ||
      //     !gongjieren.company ||
      //     !gongjieren.caparty01 ||
      //     !gongjieren.caparty03 ||
      //     !gongjieren.caparty02 ||
      //     !gongjieren.caparty04 ||
      //     !gongjieren.scale ||
      //     !gongjieren.pincome ||
      //     !gongjieren.fincome ||
      //     !gongjieren.expenditure ||
      //     (gongjieren.payment != "0" && !gongjieren.payment ) ||
      //     (gongjieren.loan != "0" && !gongjieren.loan ) ||
      //     !gongjieren.phone ||
      //     !gongjieren.phone2
      //   ) {
      //     that.$message({
      //         message: '共借人信息填写未完整！！！',
      //         type: 'success'
      //       })
      //     localStorage.setItem('sbtag' + that.routeid, 3)
      //     localStorage.setItem('activetag' + that.routeid, ['1','2','3'])
      //     localStorage.setItem('rulefalse' + that.routeid, true)
      //     this.$router.push({ path: '/dealer/creditapproval/identmain/' + this.routeid })
      //     return false
      //   }
      // }
      // let para = {}
      // para = that.contentlist
      //  orderSavesub(para).then(res => {
      //    if (res.data.success) {

      //    }
      //  })
      let para = {};
      that.contentlist = JSON.parse(
        localStorage.getItem("contentlist" + that.routeid)
      );
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
    tokehu() {
      this.$router.push({
        path: "/dealer/creditapproval/toauthphoto/" + this.routeid
      });
    },
    tojinrong() {
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
    totianxie() {
      this.$router.push({
        path: "/dealer/creditapproval/identmain/" + this.routeid
      });
    },
    delimg(file, list, key) {
      var that = this;
      let para = {};
      para = file.guid;
      orderdelimg(para).then(res => {
        if (res.data.success) {
          that.$message({
            message: "删除成功",
            type: "success"
          });
          list.splice(key, 1);
        } else {
          that.$message({
            message: "删除失败，请联系管理员",
            type: "warning"
          });
        }
      });
    },
    dragend(type) {
      var piclist = [];
      this.fileListimg[type].map((v, i) => {
        piclist.push({
          orderno: i,
          randomstr: v.guid
        });
      });
      ordersortimg({
        PictureList: piclist,
        CateCode: type
      }).then(res => {
        if (res.data.success) {
        } else {
          this.$message({
            message: "拖拽失败，请联系管理员",
            type: "warning"
          });
        }
      });
    },
    esign(dataone) {
      var that = this;
      var s = {};
      s.CID = localStorage.getItem("orderId" + that.routeid);
      s.TOKEN = Cookies.get("Admin-Token");
      s.APPID = Cookies.get("APPID");
      s.Type = dataone.type;
      var data = "ESIGN " + JSON.stringify(s);
      this.$store.dispatch("SocketConnect");
      this.$store.dispatch("SocketSenddata", data);

      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.showma = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.showma = true;
            this.countname = "重发";
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
      let para = {};
      para = {
        CaCategory: "Camain",
        CamainId: localStorage.getItem("orderId" + that.routeid),
        ArtyType: dataone.type
      };
      orderSendsms(para).then(res => {
        if (res.data) {
          this.$message({
            message: "验证码发送成功！",
            type: "success"
          });
        }
      });
    },
    toclose() {
      console.log(789);
      clearInterval(this.interval);
    },
    qianshu() {
      this.dialoglist = true;
      var that = this;
      let para = {};
      para = {
        CaCategory: "Camain",
        CamainId: localStorage.getItem("orderId" + that.routeid)
      };
      orderCauserlist(para).then(res => {
        if (res.data.success) {
          that.datasend = res.data.data.data;
        }
      });
      this.interval = setInterval(function() {
        orderCauserlist(para).then(res => {
          if (res.data.success) {
            that.datasend = res.data.data.data;
          }
        });
      }, 5000);
    },
    initImg() {
      /* eslint-disable */
      var that = this;
      var piclist = [];
      this.contentlist = JSON.parse(
        localStorage.getItem("contentlist" + that.routeid)
      );
      that.idcardimg = JSON.parse(
        localStorage.getItem("MD5Data_shenfen" + that.routeid)
      );
      if (that.idcardimg === null) {
        that.idcardimg = [];
      }
      orderInfo(localStorage.getItem("orderId" + that.routeid))
        .then(res => {
          that.orderstatus = res.data.data.basicInfo.status;
          if (res.data.data.basicInfo.category == "2") {
            that.ershow = true;
          }
          if (res.data.data.basicInfo.readonly) {
            that.sbdisable = true;
          } else {
            if (
              res.data.data.basicInfo.status == 4 ||
              (res.data.data.basicInfo.status <= 1 &&
                (res.data.data.basicInfo.signstate == 0 ||
                  res.data.data.basicInfo.signstate == 1 ||
                  res.data.data.basicInfo.signstate == 2)) ||
              res.data.data.basicInfo.signstate == 3 ||
              res.data.data.basicInfo.status == 2
            ) {
              that.sbdisable = false;
            } else {
              that.sbdisable = true;
            }
          }

          if (
            (res.data.data.basicInfo.readonly == false &&
              res.data.data.basicInfo.status == 4) ||
            res.data.data.basicInfo.status == 6
          ) {
            getCurrentTaskCmd(
              localStorage.getItem("orderId" + that.routeid)
            ).then(res => {
              that.btnlistenter = res.data.data;
            });
          }
        })
        .then(() => {
          this.isInfoLoading = false;
        });

      ordergetBuimage(localStorage.getItem("orderId" + that.routeid))
        .then(res => {
          if (res.data) {
            if (res.data.data) {
              var imgdatalist = res.data.data.lPictures;
              that.imglistll = res.data.data.lPictures;
              that.imglisttype = that.imglistll
                .filter(item => item.required == "1")
                .map(item => item.cateCode);
              let value = [];

              // 初始化排序，要不推拽不起作用
              for (value of that.imglistll) {
                this.$set(that.fileListimg, value.cateCode, []);
              }

              imgdatalist.forEach(currentItem => {
                currentItem.pictureList.forEach(danitem => {
                  piclist.push({
                    imgtype: danitem.imCategoryCode,
                    md5: danitem.md5,
                    guid: danitem.randomStr
                  });
                });
              });
            }

            that.idcardimg = that.idcardimg.concat(piclist);
            if (that.idcardimg.length > 0) {
              var s = {};
              s.token = Cookies.get("Admin-Token");
              s.CID = localStorage.getItem("orderId" + that.routeid);
              var md5data = that.idcardimg;
              s.MD5Data = md5data;
              var predata = "PREVIEW " + JSON.stringify(s);
              that.$store.dispatch("SocketConnect");
              that.$store.dispatch("SocketSenddata", predata);
            }
          }
        })
        .then(() => {
          this.isImageLoading = false;
        });
      // that.$store.state.websocket.socket.ws.send('PREVIEW ' + JSON.stringify(s))
    },
    toDoWebsock() {
      var that = this;
      if (typeof this.websocketmessage === "string") {
        var objdata = JSON.parse(this.websocketmessage);

        if (objdata.Type === "PCCONNOK") {
          Cookies.set("MIDID", objdata.MidId);
        }
        if (objdata.Type === "CAPOK") {
          var s = {};
          s.token = Cookies.get("Admin-Token");
          s.CID = localStorage.getItem("orderId" + that.routeid);
          s.MD5Data = objdata.Data;
          if (objdata.Data) {
            objdata.Data.forEach(function(ele, index) {
              let para = {};
              para = {
                Md5: ele.MD5,
                RandomStr: ele.GUID,
                ImCategoryCode: ele.ImgType,
                CamainId: localStorage.getItem("orderId" + that.routeid),
                Scene: "1",
                UploadFrom: "0",
                MidId: Cookies.get("MIDID")
              };
              orderimgsave(para).then(res => {});
            });
            var predata = "PREVIEW " + JSON.stringify(s);
            this.$store.dispatch("SocketConnect");
            that.$store.dispatch("SocketSenddata", predata);
          }
        }
        if (objdata.Type === "PREVIEWRESULT") {
          if (!objdata.GUID) {
            return false;
          }
          // if (!objdata.Result) {
          //   return false
          // }
          if (
            objdata.ImgType == "150101" ||
            objdata.ImgType == "150102" ||
            objdata.ImgType == "150103"
          ) {
            objdata.ImgType = "1501";
          }
          let file = {};
          file = {
            imgtype: objdata.ImgType,
            url: "data:image/jpg;base64," + objdata.Data,
            guid: objdata.GUID
          };
          that.imglistll.forEach(currentItem => {
            if (currentItem.cateCode == objdata.ImgType) {
              currentItem.pictureList.forEach(danitem => {
                file.isHistory = danitem.isHistory;
              });
            }
          });
          //  console.log(that.imglistll)
          if (!that.fileListimg[objdata.ImgType]) {
            this.$set(that.fileListimg, objdata.ImgType, false);
            that.fileListimg[objdata.ImgType] = [];
          }

          that.fileListimg[objdata.ImgType].push(file);

          that.obj = that.fileListimg;
          if (objdata.ImgType === "8888") {
            that.fileList10.push(file);
          }

          console.log(that.fileListimg);
        }
        if (objdata.Type === "FILEOK") {
          if (!objdata.Result) {
            return false;
          }
          let file = {};
          file = {
            imgtype: objdata.ImgType,
            md5: objdata.MD5,
            url: "data:image/jpg;base64," + objdata.Data,
            guid: objdata.GUID
          };
          let para = {};
          para = {
            Md5: objdata.MD5,
            RandomStr: objdata.GUID,
            ImCategoryCode: objdata.ImgType,
            CamainId: localStorage.getItem("orderId" + that.routeid),
            Scene: "1",
            UploadFrom: "0",
            MidId: Cookies.get("MIDID")
          };
          orderimgsave(para).then(res => {});
          if (!that.fileListimg[objdata.ImgType]) {
            this.$set(that.fileListimg, objdata.ImgType, false);
            that.fileListimg[objdata.ImgType] = [];
          }
          that.fileListimg[objdata.ImgType].push(file);

          if (that.filelistype === 10) {
            that.fileList10.push(file);
          }
        }
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
    websocketSendFile(file, type, imgtype) {
      this.getMidSocket();
      var that = this;
      var s = {};
      s.CID = localStorage.getItem("orderId" + that.routeid);
      s.SIZE = file.size;
      s.RATIO = "100";
      s.TYPE = imgtype;
      s.TOKEN = Cookies.get("Admin-Token"); // localStorage.getItem('Admin-Token')
      s.SUFFIX = file.type;
      var data = "PCUPLOAD " + JSON.stringify(s);
      this.file = file;
      this.filelistype = type;
      this.$store.state.websocket.socket.ws.send(data);
    },
    clickimg(type) {
      this.imgTotype = type;
    },
    beforeAvatarUpload(file) {
      var imgtype = this.imgTotype;
      var type = this.imgTotype;
      this.websocketSendFile(file, type, imgtype);
      return false;
      // console.log(file)
    },
    beforeAvatarUpload10(file) {
      var imgtype = "zhaopianx";
      var type = 10;
      this.websocketSendFile(file, type, imgtype);
      return false;
    },
    websocketSendFileApp(type, imgtype, typename) {
      this.getMidSocket();
      var that = this;
      var s = {};
      s.CID = localStorage.getItem("orderId" + that.routeid);
      s.RATIO = "100";
      s.TYPE = imgtype;
      s.TYPENAME = typename;
      s.VERSION = 1;
      s.TOKEN = Cookies.get("Admin-Token");
      s.APPID = Cookies.get("APPID");
      var data = "CAPPHOTO " + JSON.stringify(s);
      this.filelistype = type;
      this.$store.state.websocket.socket.ws.send(data);
    },
    appUpload(type, typename) {
      var imgtype = type;
      var type = type;
      var typename = typename;
      this.websocketSendFileApp(type, imgtype, typename);
    },
    appUpload10() {
      var imgtype = "zhaopianx";
      var type = 10;
      this.websocketSendFileApp(type, imgtype);
    },
    getMidSocket() {
      if (!this.$store.state.websocket.socket.isConnected) {
        this.$message({
          message: "请先启动影像中间件，再登录此系统重新操作！！！！",
          type: "warning"
        });
        return false;
      }
    }
  },
  mounted() {
    var s = {};
    s.USERID = Cookies.get("userId"); // localStorage.getItem('userId')
    s.TOKEN = Cookies.get("Admin-Token");
    var data = "PCCONN " + JSON.stringify(s);
    this.$store.dispatch("SocketConnect");
    this.$store.dispatch("SocketSenddata", data);
    this.initImg();
  },
  created() {
    var that = this;
    let key = "";
    for (key in this.imglistll) {
      this.$set(that.fileListimg, key, false);
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
  }
};
</script>

<style scoped>
.delete {
  position: absolute;
  top: -10px;
  right: -8px;
  width: 30px;
  height: 30px;
  z-index: 100;
}
.app-breadcrumb {
  line-height: 64px;
}
.active {
  color: #5adacb;
}
.circle {
  display: inline-block;
  margin-left: -7px;
  width: 13px;
  height: 13px;
  background-color: #efefef; /* Can be set to transparent */
  border: 3px solid #5adacb;
  border-radius: 100px;
  margin-right: -5px;
}
.redcolor {
  color: red;
}
.leftSlider ul {
  padding-top: 20px;
  text-align: center;
}
.leftSlider ul li {
  font-size: 14px;
  margin: 0 auto;
  width: 115px;
  border-left: 1px solid #ccc;
  height: 50px;
  line-height: 50px;
  text-align: left;
}
.footer {
  text-align: center;
}
.middleimg {
  padding-top: 10px;
  height: 535px;
}

.imgtitle {
  color:#507ACD;
  font-size: 14px;
  height: 54px;
  font-weight:bold;
  line-height: 54px;
  border-bottom: 1px dashed #cccccc;
  text-align: center;
}
.imgset {
  position: relative;
  top: 240px;
  left: -16px;
  cursor: pointer;
}
.imglistul li {
  margin-left: 5px;
  float: left;
}
.imgspan {
  margin-top: -50px;
}
.searchbar {
  height: 50px;
  line-height: 50px;
  margin-bottom: 8px;
}
.stepcolor {
  padding-top: 13px;
}
.topbtnbasic {
  text-align: right;
  height: 48px;
  line-height: 48px;
}
.leftSlider {
  height: 630px;
  background: #ffffff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  border-radius: 1px;
}
.middle {
  width: 100%;
  margin-right: 5px;
  background-color: #ffffff;
  height: 630px;
}
.rightSlider {
  height: 630px;
  background: #ffffff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  border-radius: 1px;
}
.formtitle {
  clear: both;
  font-size: 16px;
  padding-top: 10px;
  color: #333333;
}
.pline {
  clear: both;
  margin-top: 2px;
  margin-bottom: 5px;
  /* border: 0.5px dashed #cccccc; */
}
.colorred {
  color: red;
}
.siderbarhref {
  position: absolute;
  top: 85px;
  right: -36px;
  cursor: pointer;
}
.siderbarhref ul li {
  color: #5adacb;
  margin-bottom: 3px;
  text-align: center;
  padding: 7px;
  width: 36px;
  height: 100px;
  border: 1px solid #5adacb;
  border-radius: 4px 4px 0 0;
}
</style>