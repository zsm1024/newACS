<template>
  <section>
    <el-row>
      <el-col :span="10">
        <el-breadcrumb separator="/" class="app-breadcrumb">
          <el-breadcrumb-item class="firstbread">信贷审批</el-breadcrumb-item>
          <el-breadcrumb-item class="firstbread">
            <router-link :to="{path:'/dealer/creditapproval/manlist'}">放款管理</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>个人贷款</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      
       <el-col :span="12" class="topsearch topbtnbasic" style="margin:3px 0 8px 0;float:right">
         <el-button type="success" v-show="showxiuding" size="small" v-for="(item,index) in btnlistenter" :key="index" :disabled="btndisable" class="btncolor" @click="btnenterto(item)" >{{item.cmddis}}</el-button>
         <span v-if="!sbdisable">
          <el-button type="success" size="small" v-if="!showxiuding" class="btnnextcolor" @click="zansave">暂存</el-button>
          <el-button type="success" size="small" v-if="!showxiuding" class="btncolor" @click="consubmit">提交</el-button>
         </span>
        <el-dropdown trigger="click">
          <el-button type="success" size="small" class="btncolor">
            打印<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="dropdownprint">
            <el-dropdown-item v-if="canPrint.includes('汽车抵押贷款合同')" @click.native="hetong"><span >汽车抵押贷款合同</span></el-dropdown-item>
            <el-dropdown-item v-if="canPrint.includes('还款计划')" @click.native="huankuan"><span  > 还款计划 </span></el-dropdown-item>
            <el-dropdown-item v-if="canPrint.includes('二手车协议')" @click.native="ershou"><span >二手车协议</span></el-dropdown-item>
            <el-dropdown-item v-if="canPrint.includes('附加贷')" @click.native="fujia"><span >附加贷</span></el-dropdown-item>
            <el-dropdown-item v-if="canPrint.includes('购车确认声明')" @click.native="gouche"><span >购车确认声明</span></el-dropdown-item>
            
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <Affix>
      <el-row class="searchbar">
        <el-col :span="22" :offset="2">
            <Steps :current="2" class="stepcolor">
              <Step title="填写还款信息">
                <li @click="totianxie()" style="width:100px;height:20px;margin-top:-25px;cursor:pointer">填写还款信息</li>
              </Step>
              <Step title="客户授权">
                <li @click="tokehu()" style="width:100px;height:20px;margin-top:-25px;cursor:pointer">客户授权</li>
              </Step>
              <Step title="上传影像资料">
                <li @click="toyingxiang()" style="width:100px;height:20px;margin-top:-25px;cursor:pointer">上传影像资料</li>
              </Step>
            </Steps>
        </el-col>
      </el-row>
    </Affix>
    <el-row>
      <el-col :span="20">
        <div class="middle" ref="scrollTobar" v-bar>
          <div>
            <el-row v-for="(item,index) in imglistll" :key="index">
              <el-col :span="21" :offset="1" class="formtitle">
                <span><span v-if="imglisttype.includes(item.cateCode)" class="colorred">*</span>{{item.subTitle}}</span>
              </el-col>
              <div id="fourAnchor"></div>
              <el-col :span="21" :offset="1">
                <p class="pline"></p>
              </el-col>
              <el-col :span="21" :offset="1">
                <div style="float:left">
                  <ul class="imglistul">
                    <draggable v-model="fileListimg[item.cateCode]" :options="{group:'people'}" @add="dragend(item.cateCode)">
                      <li v-show="fileListimg[item.cateCode]?fileListimg[item.cateCode].length <1 : !fileListimg[item.cateCode]" style="width:115px;height:115px;cursor:pointer;border:1px dashed #ccc;line-height:115px;text-align:center">
                        <span v-if="sbdisable">暂无图片</span>
                        <span v-else>请拖拽到此处</span>
                      </li>
                    </draggable>
                    <draggable v-model="fileListimg[item.cateCode]" :options="{group:'people'}" @add="dragend(item.cateCode)">
                      <li style="position:relative;width:115px;height:115px;cursor:pointer;" v-for="(file, key) in fileListimg[item.cateCode]" :key="key">
                        <viewer>
                          <img style="width:115px;height:115px;cursor:pointer;" :src="file.url" alt="">
                        </viewer>
               
                        <span class="spanzig" v-if="file.status == '3'">通过</span>
                        <span class="spanzid" v-if="file.status == '2'">待审核</span>
                        <span class="spanzit" v-if="file.status == '4'">退回</span>
                        <a href="javascipt:;" v-if="!sbdisable" v-show="file.status != '2' && file.status != '3' && file.status != '4'" @click="delimg(file,fileListimg[item.cateCode],key)">
                          <img :src="deletepng" class="delete" />
                        </a>
                      </li>
                    </draggable>
                  </ul>
                </div>
               
                <div v-if="!sbdisable " style=" width:115px;height:115px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px">
                  <el-col :span="24" style="text-align:center;margin-top:20px"  v-if="fileListimg[item.cateCode][0]? fileListimg[item.cateCode][0].status!='3' :1">
                    <el-upload :file-list="fileListimg[item.cateCode]"  action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
                      <el-button style="" @click="clickimg(item.cateCode)" type="success" size="small" class="btncolor">本地上传</el-button>
                    </el-upload>
                    <el-button style="margin-left:0;margin-top:20px" type="success" @click="appUpload(item.cateCode,item.subTitle)" size="small" class="btncolor">拍摄照片</el-button>
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
            <i class="el-icon-picture"></i><span>照片选择区</span>
          </div>
          <div class="middleimg" v-bar>
            <div>
              <ul style="text-align:center;margin-top:5px;">
                <draggable v-model="fileList10" :options="{group:'people'}" @add="dragend('8888')">
                  <li v-if="fileList10.length==0" style="width:115px;height:115px;cursor:pointer;border:1px dashed #ccc;line-height:115px;text-align:center;margin:0 auto">
                    <span v-if="sbdisable">暂无图片</span>
                    <span v-else>请拖拽到此处</span>
                  </li>
                </draggable>
                <draggable v-model="fileList10" :options="{group:'people'}" @add="dragend('8888')">
                  <li v-for="(file, key) in fileList10" :key="key">
                    <img style="width:150px;height:115px;cursor:pointer;" :src="file.url" alt="">
                  </li>
                </draggable>
              </ul>
            </div>
          </div>
          <div class="footer" v-if="!sbdisable">
            <!-- <el-upload  :file-list="fileList10" action="" :show-file-list="false" :before-upload="beforeAvatarUpload10">
              <el-button style="" type="success" size="mini" class="btncolor">本地上传</el-button>
            </el-upload> -->
            <!-- <el-button type="success" style="margin-left:0;float:right" size="mini" @click="appUpload10" class="btncolor">拍摄照片</el-button> -->
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialoglist" width="55%" @close="toclose">
      <el-table :data="datasend">
        <el-table-column property="refData.typename" label="类型" width="200"></el-table-column>
        <el-table-column property="name" label="人员" width="150"></el-table-column>
        <el-table-column property="phone" label="手机号" width="200"></el-table-column>
        <el-table-column property="refData.castatusname" label="状态" width="200"></el-table-column>
        <el-table-column property="faceResultCn" label="识别结果" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope='scope'>
              <el-button v-show="!showma" size="mini"  >{{count}}s</el-button>
              <el-button v-show="showma" size="mini" @click="esign(scope.row)" >{{countname}}</el-button>
</template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </section>
</template>

<script>
  import {
    postWfSubmit,
    getLoanCurrentTaskCmd,
    getPrintBtn,
    postContractSave,
    postContractSubmit,
    contractgethouimage,
    getLoaninfo
  } from '@/api/loanlist'
  import Cookies from 'js-cookie'
  import {
    orderimgsave,
    ordersortimg,
    orderdelimg,
    orderCauserlist,
    orderSendsms,
    postRevisepause,
    postConditionalapproval,
    postPrintCommon
  } from '@/api/credit'
  import {
    getBase64Image
  } from '@/utils'
  import deletepng from '@/assets/images/delete.png'
  import bopenleft from '@/assets/images/btn_open_left.png'
  import bopenright from '@/assets/images/btn_open_right.png'
  import draggable from 'vuedraggable'
  export default {
    components: {
      draggable
    },
    inject: ['reload'],
    data() {
      return {
        btndisable: false,
        showxiuding: false,
        btnlistenter: [],
        canPrint: [],
        ruleForm: {},
        imgTotype: '',
        interval: {},
        btnlistenter: [],
        countname: '电子签',
        showma: true,
        count: '',
        timer: null,
        routeid: this.$route.params.id,
        contentlist: {},
        imglistll: [],
        imglisttype: [],
        sbdisable: false,
        idcardimg: [],
        deletepng,
        imageUrl21: '',
        imageUrl22: '',
        datasend: [],
        dialoglist: false,
        filelistype: '',
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
        file: '',
        websocketmessage: '',
        bopenleft,
        bopenright,
        abc: '123',
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
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      btnenterto(item) {
        var that = this
        console.log(item)
        this.$prompt('请输入', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          that.btndisable = true
          let para = {}
          var base = JSON.stringify(that.ruleForm)
          var baseInfo = JSON.parse(base)
          if((typeof that.ruleForm.area) == 'string'){
            baseInfo.area =that.ruleForm.area
          }else{
            baseInfo.area = that.ruleForm.area[1]
          }
          var WfCmd = {
            CmdType: item.cmdtype,
            ID: item.id
          }
          para = {
            basicInfo: baseInfo,
            WfCmd: WfCmd,
            Comment: value
          }
          postWfSubmit(para).then(res => {
            that.btndisable = false
            if (res.data.success) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.reload()
            } else {
              this.$message({
                message: res.data.message,
                type: 'warning'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      zansave() {
        this.ruleForm = JSON.parse(localStorage.getItem('contract' + this.routeid))
        var value = JSON.stringify(this.ruleForm)
        let para = {}
        para = JSON.parse(value)
        para.area = this.ruleForm.area[1]
        postContractSave(para).then(res => {
          if (res.data.success) {
            this.$message({
              message: '暂存成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      },
      consubmit() {
        var that = this
        this.ruleForm = JSON.parse(localStorage.getItem('contract' + this.routeid))
        var value = JSON.stringify(this.ruleForm)
        let para = {}
        para = JSON.parse(value)
        para.area = this.ruleForm.area[1]
        postContractSubmit(para).then(res => {
          if (res.data.success) {
            this.$router.push({ path: '/dealer/creditapproval/tofangsuccess/' + that.routeid })
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      },
      hetong() {
        let para = {}
        para = {
          contractno: this.ruleForm.camainno,
          type: 'contract'
        }
        var tempWindow = window.open('', '_blank', '');
        postPrintCommon(para).then(res => {
          if (res.data.success) {
            var url = window.g.ApiUrl + 'S310011/api/print/'  + res.data.data.dataid +  '?grf=' + res.data.data.grf + '&type=inline&qtype=' + res.data.data.qtype + '&dataname=' + res.data.data.dataname + '&_token=Bearer ' + Cookies.get('Admin-Token')
            tempWindow.location.href = url;
          } else {
            tempWindow.close()
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      },
      gouche() {
        let para = {}
        para = {
          contractno: this.ruleForm.camainno,
          grf: '00001KEFWKGZ6000HADW',
          type: 'common'
        }
        var tempWindow = window.open('', '_blank', '');
        postPrintCommon(para).then(res => {
          if (res.data.success) {
            var url = window.g.ApiUrl + 'S310011/api/print/' + this.ruleForm.camainno + '?grf=' + res.data.data.grf + '&type=inline&qtype=' + res.data.data.qtype + '&dataname=' + res.data.data.dataname + '&_token=Bearer ' + Cookies.get('Admin-Token')
             tempWindow.location.href = url;
          } else {
            tempWindow.close()
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      },
      fujia() {
        let para = {}
        para = {
          contractno: this.ruleForm.camainno,
          grf: '00001JUV7PFX8000HA15',
          type: 'common'
        }
        var tempWindow = window.open('', '_blank', '');
        postPrintCommon(para).then(res => {
          if (res.data.success) {
            var url = window.g.ApiUrl + 'S310011/api/print/' + this.ruleForm.camainno + '?grf=' + res.data.data.grf + '&type=inline&qtype=' + res.data.data.qtype + '&dataname=' + res.data.data.dataname + '&_token=Bearer ' + Cookies.get('Admin-Token')
            tempWindow.location.href = url;
          } else {
            tempWindow.close()
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      },
      ershou() {
        let para = {}
        para = {
          contractno: this.ruleForm.camainno,
          grf: '00001JO5FPMU7418ZAL1',
          type: 'common'
        }
        var tempWindow = window.open('', '_blank', '');
        postPrintCommon(para).then(res => {
          if (res.data.success) {
            var url = window.g.ApiUrl + 'S310011/api/print/' + this.ruleForm.camainno + '?grf=' + res.data.data.grf + '&type=inline&qtype=' + res.data.data.qtype + '&dataname=' + res.data.data.dataname + '&_token=Bearer ' + Cookies.get('Admin-Token')
            tempWindow.location.href = url;
          } else {
            tempWindow.close()
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      },
      huankuan() {
        let para = {}
        para = {
          contractno: this.ruleForm.camainno,
          grf: '00001K7FVG4LA418ZAKO',
          type: 'common'
        }
        var tempWindow = window.open('', '_blank', '');
        postPrintCommon(para).then(res => {
          if (res.data.success) {
            var url = window.g.ApiUrl + 'S310011/api/print/' + this.ruleForm.camainno + '?grf=' + res.data.data.grf + '&type=inline&qtype=' + res.data.data.qtype + '&dataname=' + res.data.data.dataname + '&_token=Bearer ' + Cookies.get('Admin-Token')
            tempWindow.location.href = url;
          } else {
            tempWindow.close()
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      },
      huakuan() {
        let para = {}
        para = {
          contractno: this.ruleForm.camainno,
          type: 'transfer'
        }
        var tempWindow = window.open('', '_blank', '');
        postPrintCommon(para).then(res => {
          if (res.data.success) {
            var url = window.g.ApiUrl + 'S310011/api/print/' + this.ruleForm.camainno + '?grf=' + res.data.data.grf + '&type=inline&qtype=' + res.data.data.qtype + '&dataname=' + res.data.data.dataname + '&_token=Bearer ' + Cookies.get('Admin-Token')
           tempWindow.location.href = url;
          } else {
            tempWindow.close()
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      },
   
      yanzheng() {
        /* eslint-disable */
        this.$router.push({
          path: '/dealer/creditapproval/ordersuccess/'
        })
      },
      tokehu() {
        this.$router.push({
          path: '/dealer/creditapproval/tophoto/' + this.routeid
        })
      },
      tojinrong() {
        if (this.contentlist.basicInfo.category == "1") {
          this.$router.push({
            path: '/dealer/creditapproval/personalorder/' + this.routeid
          })
        } else if (this.contentlist.basicInfo.category == "2") {
          this.$router.push({
            path: '/dealer/creditapproval/secondorder/' + this.routeid
          })
        }
      },
      totianxie() {
        this.$router.push({
          path: '/dealer/creditapproval/appliloan/' + this.routeid
        })
      },
      delimg(file, list, key) {
        var that = this
        let para = {}
        para = file.guid
        orderdelimg(para).then(res => {
          if (res.data.success) {
            that.$message({
              message: '删除成功',
              type: 'success'
            })
            list.splice(key, 1)
          } else {
            that.$message({
              message: '删除失败，请联系管理员',
              type: 'warning'
            })
          }
        })
      },
      dragend(type) {
        var piclist = []
        this.fileListimg[type].map((v, i) => {
          piclist.push({
            orderno: i,
            randomstr: v.guid
          })
        })
        ordersortimg({
          PictureList: piclist,
          CateCode: type
        }).then(res => {
          if (res.data.success) {
          } else {
            // this.$message({
            //   message: '拖拽失败，请联系管理员',
            //   type: 'warning'
            // })
          }
        })
      },
      esign(dataone) {
        var that = this
        var s = {}
        s.CID = localStorage.getItem('orderId' + that.routeid)
        s.TOKEN = Cookies.get('Admin-Token')
        s.APPID = Cookies.get('APPID')
        s.Type = dataone.type
        var data = 'ESIGN ' + JSON.stringify(s)
        this.$store.dispatch('SocketConnect')
        this.$store.dispatch('SocketSenddata', data)
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.showma = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.showma = true;
              this.countname = '重发'
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
        let para = {}
        para = {
          CaCategory: 'Camain',
          CamainId: localStorage.getItem('orderId' + that.routeid),
          ArtyType: dataone.type
        }
        orderSendsms(para).then(res => {
          if (res.data) {
            this.$message({
              message: '验证码发送成功！',
              type: 'success'
            })
          }
        })
      },
      toclose() {
        console.log(789)
        clearInterval(this.interval);
      },
      qianshu() {
        this.dialoglist = true
        var that = this
        let para = {}
        para = {
          CaCategory: "Camain",
          CamainId: localStorage.getItem('orderId' + that.routeid)
        }
        orderCauserlist(para).then(res => {
          if (res.data.success) {
            that.datasend = res.data.data.data
          }
        })
        this.interval = setInterval(function() {
          orderCauserlist(para).then(res => {
            if (res.data.success) {
              that.datasend = res.data.data.data
            }
          })
        }, 5000);
      },
      initImg() {
        /* eslint-disable */
        var that = this
        var piclist = []
        if (that.idcardimg === null) {
          that.idcardimg = []
        }
        let paraid = {};
        paraid = this.routeid;
        getLoaninfo(paraid).then(res => {
          if (res.data.success) {
            this.ruleForm = res.data.data.basicInfo;
          }}).then(res=>{

         
        let para = {}
        para = this.routeid
        if(this.ruleForm.status == 4) {
          getLoanCurrentTaskCmd(para).then(res => {
            if (res.data.success) {
              that.btnlistenter = res.data.data
              that.showxiuding = true
            }
          })
        }
        getPrintBtn(para).then(res => {
          if (res.data.success) {
            this.canPrint = res.data.data
          }
        })
        // eslint-disable-next-line
        if (this.ruleForm.status == 11 || this.ruleForm.status == 12 || this.ruleForm.status == 4) {
          that.sbdisable = false
        } else {
          that.sbdisable = true
        }
        // orderInfo(localStorage.getItem('orderId' + that.routeid)).then(res => {
        //   if (res.data.data.basicInfo.status <= 2 || res.data.data.basicInfo.status === 4) {
        //     that.sbdisable = false
        //   } else {
        //     that.sbdisable = true 
        //   }
        //   if((res.data.data.basicInfo.readonly == false && res.data.data.basicInfo.status == 4) || res.data.data.basicInfo.status==6) {
        //     getCurrentTaskCmd(localStorage.getItem('orderId' + that.routeid)).then(res => {
        //       that.btnlistenter = res.data.data
        //     })
        //   }
        // })
        contractgethouimage(that.routeid).then(res => {
          console.log(res.data.data)
          if (res.data) {
            if (res.data.data) {
              var imgdatalist = res.data.data.lPictures
              that.imglistll = res.data.data.lPictures
              that.imglisttype = that.imglistll.filter(item => item.required == '1').map(item => item.cateCode)
              let value = []
              // 初始化排序，要不推拽不起作用
              for (value of that.imglistll) {
                this.$set(that.fileListimg, value.cateCode, [])
              }
              imgdatalist.forEach(currentItem => {
                currentItem.pictureList.forEach(danitem => {
                  piclist.push({
                    imgtype: danitem.imCategoryCode,
                    md5: danitem.md5,
                    guid: danitem.randomStr,
                    States: danitem.status
                  })
                })
              })
            }
            that.idcardimg = that.idcardimg.concat(piclist)
            if (that.idcardimg.length > 0) {
              var s = {}
              s.token = Cookies.get('Admin-Token')
              s.CID = that.routeid
              var md5data = that.idcardimg
              s.MD5Data = md5data
              var predata = 'PREVIEW ' + JSON.stringify(s)
              that.$store.dispatch('SocketConnect')
              that.$store.dispatch('SocketSenddata', predata)
            }
          }
        })
         })
        // that.$store.state.websocket.socket.ws.send('PREVIEW ' + JSON.stringify(s))
      },
      toDoWebsock() {
        var that = this
        if (typeof this.websocketmessage === 'string') {
          var objdata = JSON.parse(this.websocketmessage)
          console.log(objdata)
          if (objdata.Type === 'PCCONNOK') {
            Cookies.set('MIDID', objdata.MidId)
          }
          if (objdata.Type === 'CAPOK') {
            var s = {}
            s.token = Cookies.get('Admin-Token')
            s.CID = that.routeid
            s.MD5Data = objdata.Data
            if(objdata.Data) {
              objdata.Data.forEach(function(ele, index) {
                let para = {}
                para = {
                  Md5: ele.MD5,
                  RandomStr: ele.GUID,
                  ImCategoryCode: ele.ImgType,
                  CamainId: that.routeid,
                  Scene: '2',
                  UploadFrom: '0',
                  MidId: Cookies.get('MIDID')
                }
                orderimgsave(para).then(res => {})
              })
              var predata = 'PREVIEW ' + JSON.stringify(s)
              this.$store.dispatch('SocketConnect')
              that.$store.dispatch('SocketSenddata', predata)
            }
            
            
          }
          if (objdata.Type === 'PREVIEWRESULT') {
            if (!objdata.GUID) {
              return false
            }
            // if (!objdata.Result) {
            //   return false
            // }
            let file = {}
            file = {
              imgtype: objdata.ImgType,
              url: 'data:image/jpg;base64,' + objdata.Data,
              guid: objdata.GUID,
              status: objdata.States
            }
            if (!that.fileListimg[objdata.ImgType]) {
              this.$set(that.fileListimg, objdata.ImgType, false)
              that.fileListimg[objdata.ImgType] = []
            }
           
            that.fileListimg[objdata.ImgType].push(file)
            that.obj = that.fileListimg
            if (objdata.ImgType === '8888') {
              that.fileList10.push(file)
            }
            console.log(that.fileListimg)
          }
          if (objdata.Type === 'FILEOK') {
            if (!objdata.Result) {
              return false
            }
            let file = {}
            file = {
              imgtype: objdata.ImgType,
              md5: objdata.MD5,
              url: 'data:image/jpg;base64,' + objdata.Data,
              guid: objdata.GUID
            }
            let para = {}
            para = {
              Md5: objdata.MD5,
              RandomStr: objdata.GUID,
              ImCategoryCode: objdata.ImgType,
              CamainId: that.routeid,
              Scene: '2',
              UploadFrom: '0',
              MidId: Cookies.get('MIDID')
            }
            orderimgsave(para).then(res => {})
            if (!that.fileListimg[objdata.ImgType]) {
              this.$set(that.fileListimg, objdata.ImgType, false)
              that.fileListimg[objdata.ImgType] = []
            }
            that.fileListimg[objdata.ImgType].push(file)
            if (that.filelistype === 10) {
              that.fileList10.push(file)
            }
          }
          if (objdata.Type === 'STARTUPLOAD') {
            console.log(123)
            getBase64Image(that.file).then(function(result) {
              var str = result.split(',')[1]
              var n = 8240
              var arr = []
              var len = Math.ceil(str.length / n)
              for (var i = 0; i < len; i++) {
                if (str.length >= n) {
                  var strCut = str.substring(0, n)
                  arr.push(strCut)
                  str = str.substring(n)
                } else {
                  arr.push(str)
                }
              }
              arr.forEach(function(ele, index) {
                that.$store.state.websocket.socket.ws.send('APPUPLOADDATA ' + ele)
              })
              that.$store.state.websocket.socket.ws.send('UPLOADCOMPLETE ')
            })
          }
        } else {
          this.ceshiimg = window.URL.createObjectURL(this.websocketmessage)
        }
      },
      websocketSendFile(file, type, imgtype) {
        this.getMidSocket() 
        var that = this
        var s = {}
        s.CID =  that.routeid
        s.SIZE = file.size
        s.RATIO = '100'
        s.TYPE = imgtype
        s.TOKEN = Cookies.get('Admin-Token') // localStorage.getItem('Admin-Token')
        s.SUFFIX = file.type
        var data = 'PCUPLOAD ' + JSON.stringify(s)
        this.file = file
        this.filelistype = type
        this.$store.state.websocket.socket.ws.send(data)
      },
      clickimg(type) {
        this.imgTotype = type
      },
      beforeAvatarUpload(file) {
        var imgtype = this.imgTotype
        var type = this.imgTotype
        this.websocketSendFile(file, type, imgtype)
        return false
        // console.log(file)
      },
      beforeAvatarUpload10(file) {
        var imgtype = 'zhaopianx'
        var type = 10
        this.websocketSendFile(file, type, imgtype)
        return false
      },
      websocketSendFileApp(type, imgtype,typename) {
        this.getMidSocket() 
        var that = this
        var s = {}
        s.CID =  that.routeid
        s.RATIO = '100'
        s.TYPE = imgtype
        s.TYPENAME = typename
        s.VERSION = 1
        s.TOKEN = Cookies.get('Admin-Token')
        s.APPID = Cookies.get('APPID')
        var data = 'CAPPHOTO ' + JSON.stringify(s)
        this.filelistype = type
        this.$store.state.websocket.socket.ws.send(data)
      },
      appUpload(type,typename) {
        var imgtype = type
        var type = type
        var typename = typename
        this.websocketSendFileApp(type, imgtype, typename)
      },
      appUpload10() {
        var imgtype = 'zhaopianx'
        var type = 10
        this.websocketSendFileApp(type, imgtype)
      },
      getMidSocket() {
        if(!this.$store.state.websocket.socket.isConnected){
          this.$message({
            message: '没有安装中间件，请先安装中间件！！！！',
            type: 'warning'
          })
          return false
        }
      }
    },
    mounted() {
      var s = {}
      s.USERID = Cookies.get('userId') // localStorage.getItem('userId')
      s.TOKEN = Cookies.get('Admin-Token')
      var data = 'PCCONN ' + JSON.stringify(s)
      this.$store.dispatch('SocketConnect')
      this.$store.dispatch('SocketSenddata', data)
      this.initImg()
    },
    created() {
      var that = this
      let key = ''
      for (key in this.imglistll) {
        this.$set(that.fileListimg, key, false)
      }
    },
    watch: {
      '$store.state.websocket.socket.message': function() {
        var that = this
        if (this.$store.state.websocket.socket.message) {
          that.websocketmessage = this.$store.state.websocket.socket.message
          that.toDoWebsock()
        }
      }
    }
  }
</script>

<style scoped>
  .spanzig{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 30px;
    height: 20px;
    z-index: 100;
    background: #fff;
    color: green;
  }
  .spanzid{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 40px;
    height: 20px;
    z-index: 100;
    background: #fff;
    color: chocolate;
  }
  .spanzit{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 30px;
    height: 20px;
    z-index: 100;
    background: #fff;
    color: red;
  }
  .delete {
    position: absolute;
    top: -10px;
    right: -8px;
    width: 30px;
    height: 30px;
    z-index: 100
  }
  .active {
    color: #5ADACB;
  }
  .circle {
    display: inline-block;
    margin-left: -7px;
    width: 13px;
    height: 13px;
    background-color: #efefef;
    /* Can be set to transparent */
    border: 3px solid #5ADACB;
    border-radius: 100px;
    margin-right: -5px;
  }
  .redcolor {
    color: red;
  }
  .leftSlider ul {
    padding-top: 20px;
    text-align: center
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
    height: 535px;
  }
  .imgtitle {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
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
  }
  .stepcolor {
    padding-top: 13px;
  }
  .topbtnbasic {
    text-align: right;
    height: 70px;
    line-height: 70px;
  }
  .leftSlider {
    height: 630px;
    background: #FFFFFF;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
    border-radius: 1px;
  }
  .middle {
    margin-left: 5px;
    width: 100%;
    margin-right: 5px;
    background-color: #fafafa;
    height: 630px;
  }
  .rightSlider {
    height: 630px;
    background: #FFFFFF;
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
    border: 0.5px dashed #cccccc;
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
    color: #5ADACB;
    margin-bottom: 3px;
    text-align: center;
    padding: 7px;
    width: 36px;
    height: 100px;
    border: 1px solid #5ADACB;
    border-radius: 4px 4px 0 0;
  }
  .app-breadcrumb.el-breadcrumb{
    line-height: 52px;
    height: 37px;
}
.topbtnbasic {
  text-align: right;
  line-height: 32px;
  height: 32px;
}
</style>