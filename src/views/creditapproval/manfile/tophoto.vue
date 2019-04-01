<template>
  <section>
    <el-row >
      <el-col :span="10" >
          
          <el-breadcrumb separator="/" class="app-breadcrumb">
              <el-breadcrumb-item class="firstbread">信贷审批</el-breadcrumb-item>
              <el-breadcrumb-item class="firstbread"><router-link :to="{path:'/dealer/creditapproval/manlist'}">放款业务</router-link></el-breadcrumb-item>
              <el-breadcrumb-item>个人贷款</el-breadcrumb-item>
          </el-breadcrumb>
          
      </el-col>
 
      <el-col :span="12" class="topsearch topbtnbasic" style="margin:3px 0 8px 0;float:right">
        <el-button type="success" v-show="showxiuding" size="small" v-for="(item,index) in btnlistenter" :disabled="btndisable" :key="index" class="btncolor" @click="btnenterto(item)" >{{item.cmddis}}</el-button>
         <el-button type="success" size="small" class="btnnextcolor"  v-show="!showxiuding"  v-if="!sbdisable" @click="zansave">暂存</el-button>
        <el-button type="success" size="small"  class="btncolor" v-show="!showxiuding"  v-if="!sbdisable" @click="toyingxiang">下一步</el-button>
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
            <Steps :current="1" class="stepcolor">
              <Step title="填写还款信息">
                <li @click="totianxie()" style="width:100px;height:20px;margin-top:-25px;cursor:pointer">填写还款信息</li>
              </Step>
              <Step title="客户授权">
              </Step>
              <Step title="上传影像资料">
                <li @click="toyingxiang()" style="width:100px;height:20px;margin-top:-25px;cursor:pointer">上传影像资料</li>
              </Step>
            </Steps>
        </el-col>
    </el-row>
    </Affix>
    <el-row class="midcontent">
      <el-form ref="form" :inline="true"  size="mini" label-position="left">
      <el-row >
        <el-col :span="16">
          <el-col :span="12">
          <el-card class="box-card" style="margin-top:10px;height:235px">
            <div slot="header" class="clearfix">
              <el-col :span="10">
              <span class="titlezi">主借人面签照片</span>
              
              </el-col>
              
            </div>
            <div class="text item">
              <el-row>
                <el-row style="margin-bottom:5px;margin-left:5px">
                  
                  
                  <el-col :span="8"><span style="font-size:14px;font-weight:bold">照片</span></el-col>
                </el-row>
                <el-row>
                  
                 
                  <el-col :span="8">
                    
                    <div  style=" width:200px;height:135px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px" @mouseenter="showzhufttu"  @mouseleave="showzhuftchu">
                    <el-col :span="6" style="text-align:center;margin-top:20px;position:relative">
                      
                      <el-upload
                        v-if="!sbdisablezhu"
                        :file-list="fileList2"
                        
                        action=""
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload2">
                        <div slot="tip" class="yulan">
                          <viewer>
                        <img :src="fileimg2" alt="" style="width: 200px;height: 135px;margin-top: -38px;">
                          </viewer>
                        </div>
                        <el-button  style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;" type="success" size="small" class="btncolor" v-show="showfuttu">本地上传</el-button>
                      </el-upload>
                      <viewer v-else >
                      <img :src="fileimg2"  alt="" style="width: 200px;height: 135px;margin-top: -20px;">
                      </viewer>
                      
                      <span class="spanzig" v-if="fileList2[0] && (fileList2[0].status == '3')">通过</span>
                      <span class="spanzid" v-if="fileList2[0] && (fileList2[0].status == '2')">待审核</span>
                      <span class="spanzit" v-if="fileList2[0] && (fileList2[0].status == '4')">退回</span>
                      <div v-if="!sbdisablezhu">
                      <el-button v-show="showfuttu"  style="margin-left:51px;position: absolute;top: 50px;left: 9px;" type="success" size="small" @click="appUpload2" class="btncolor" >拍摄照片</el-button>
                      </div>
                    </el-col>
                    </div>
                  </el-col>
                </el-row>
              </el-row>
  
            </div>
          </el-card>
          </el-col>
           <el-col :span="12" v-if="gongjieimg">
          <el-card class="box-card" style="margin-top:10px" >
            <div slot="header" class="clearfix">
              <el-col :span="10">
              <span class="titlezi">共借人面签照片</span>
              
              </el-col>
              
                
            </div>
            <div class="text item">
              <el-row>
                <el-row>
                
                  <el-col :span="8"><span style="font-size:14px;font-weight:bold">照片</span></el-col>
                </el-row>
                <el-row>
                  
                  <el-col :span="8">
                    
                    <div  style=" width:200px;height:135px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px" @mouseenter="gongjietouru"  @mouseleave="gongjietouli">
                    <el-col :span="6" style="text-align:center;margin-top:20px;position:relative">
                      <el-upload
                        v-if="!sbdisablegong"
                        :file-list="fileList3"
                        
                        action=""
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload3">
                        <div slot="tip" class="yulan">
                          <viewer>
                        <img :src="fileimg3" alt="" style="width: 200px;height: 135px;margin-top: -38px;">
                         </viewer>
                        </div>
                        <el-button  style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;" type="success" size="small" class="btncolor" v-show="gongjietou">本地上传</el-button>
                      </el-upload>
                      <viewer v-else>
                      <img :src="fileimg3"  alt="" style="width: 200px;height: 135px;margin-top: -20px;">
                      </viewer>
                      <span class="spanzig" v-if="fileList3[0] && (fileList3[0].status == '3')">通过</span>
                      <span class="spanzid" v-if="fileList3[0] && (fileList3[0].status == '2')">待审核</span>
                      <span class="spanzit" v-if="fileList3[0] && (fileList3[0].status == '4')">退回</span>
                      <div v-if="!sbdisablegong">
                      <el-button  style="margin-left:51px;position: absolute;top: 50px;left: 9px;" type="success" size="small" @click="appUpload3" class="btncolor" v-show="gongjietou">拍摄照片</el-button>
                      </div>
                    </el-col>
                    </div>
                  </el-col>
                  
                </el-row>
              </el-row>
  
            </div>
          </el-card>
           </el-col>
           <el-col :span="12" v-if="baozhengimg">
          <el-card class="box-card" style="margin-top:10px" >
            <div slot="header" class="clearfix">
              <el-col :span="10">
              <span class="titlezi">担保人面签照片</span>
              
              </el-col>
              
                
            </div>
            <div class="text item">
              <el-row>
                <el-row>
                
                  <el-col :span="8"><span style="font-size:14px;font-weight:bold">照片</span></el-col>
                </el-row>
                <el-row>
                  
                  <el-col :span="8">
                    <div  style=" width:200px;height:135px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px" @mouseenter="baozhengtouru"  @mouseleave="baozhengtouli">
                    <el-col :span="6" style="text-align:center;margin-top:20px;position:relative">
                      <el-upload
                        v-if="!sbdisabledan"
                        :file-list="fileList7"
                        
                        action=""
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload7">
                        <div slot="tip" class="yulan">
                          <viewer>
                        <img :src="fileimg7" alt="" style="width: 200px;height: 135px;margin-top: -38px;">
                        </viewer>
                        </div>
                        <el-button  style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;" type="success" size="small" class="btncolor" v-show="baozhengtou">本地上传</el-button>
                      </el-upload>
                      <viewer v-else>
                      <img :src="fileimg7"  alt="" style="width: 200px;height: 135px;margin-top: -20px;">
                      </viewer>
                      <span class="spanzig" v-if="fileList7[0] && (fileList7[0].status == '3')">通过</span>
                      <span class="spanzid" v-if="fileList7[0] && (fileList7[0].status == '2')">待审核</span>
                      <span class="spanzit" v-if="fileList7[0] && (fileList7[0].status == '4')">退回</span>
                      <div v-if="!sbdisabledan">
                      <el-button  style="margin-left:51px;position: absolute;top: 50px;left: 9px;" type="success" size="small" @click="appUpload7" class="btncolor" v-show="baozhengtou">拍摄照片</el-button>
                      </div>
                    </el-col>
                    </div>
                  </el-col>
                  
                </el-row>
              </el-row>
  
            </div>
          </el-card>
           </el-col>
           <el-col :span="12">
          <el-card class="box-card" style="margin-top:10px" >
            <div slot="header" class="clearfix">
              <el-col :span="10">
              <span class="titlezi">见证人面签照片</span>
              
              </el-col>
              
                
            </div>
            <div class="text item">
              <el-row>
                <el-row>
                  
                  <el-col :span="8"><span style="font-size:14px;font-weight:bold">照片</span></el-col>
                </el-row>
                <el-row>
                  
                  
                  <el-col :span="8">
                    
                    <div  style=" width:200px;height:135px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px" @mouseenter="danbaozhenru"  @mouseleave="danbaozhenli">
                    <el-col :span="6" style="text-align:center;margin-top:20px;position:relative">
                      <el-upload
                      v-if="!sbdisablejian"
                        :file-list="fileList5"
                        
                        action=""
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload5">
                        <div slot="tip" class="yulan">
                          <viewer>
                        <img :src="fileimg5" alt="" style="width: 200px;height: 135px;margin-top: -38px;">
                        </viewer>
                        </div>
                        <el-button  style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;" type="success" size="small" class="btncolor" v-show="danbaozhen">本地上传</el-button>
                      </el-upload>
                      <viewer v-else>
                      <img :src="fileimg5"  alt="" style="width: 200px;height: 135px;margin-top: -20px;">
                      </viewer>
                      <span class="spanzig" v-if="fileList5[0] && (fileList5[0].status == '3')">通过</span>
                      <span class="spanzid" v-if="fileList5[0] && (fileList5[0].status == '2')">待审核</span>
                      <span class="spanzit" v-if="fileList5[0] && (fileList5[0].status == '4')">退回</span>
                      <div v-if="!sbdisablejian">
                      <el-button  style="margin-left:51px;position: absolute;top: 50px;left: 9px;" type="success" size="small" @click="appUpload5" class="btncolor" v-show="danbaozhen">拍摄照片</el-button>
                      </div>
                    </el-col>
                    </div>
                  </el-col>
                </el-row>
              </el-row>
  
            </div>
          </el-card>
          </el-col>
           <div v-if="ruleForm.signstate!=2">
          <el-col :span="12" v-if="showPrint">
           
          <el-card class="box-card" style="margin-top:10px" >
            <div slot="header" class="clearfix">
              <span class="titlezi">汽车抵押贷款合同</span><span class="shenqingq">请打印并签字后拍照上传</span>
              <div style="height:20px"><el-button style="float: right; padding: 3px 0"  type="text" @click="hetong">打印汽车抵押贷款合同</el-button></div>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="8">
                    <div  style=" width:200px;height:136px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px" @mouseenter="shenqingshuru"  @mouseleave="shenqingshuli">
                    <el-col :span="6" style="text-align:center;margin-top:20px;position:relative">
                      <el-upload
                        v-if="!sbdisablehe"
                        :file-list="fileList4"
                        
                        action=""
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload4">
                        <div slot="tip" class="yulan">
                          <viewer>
                         <img :src="fileimg4" alt="" style="width: 200px;height: 135px;margin-top: -38px;">
                         </viewer>
                        </div>
                        
                        <el-button v-if="fileList4[0]?fileList4[0].status != '3':1" style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;" type="success" size="small" class="btncolor" v-show="shenqingtu">本地上传</el-button>
                      </el-upload>
                      <viewer v-else>
                      <img :src="fileimg4"  alt="" style="width: 200px;height: 135px;margin-top: -20px;">
                      </viewer>
                      <span class="spanzig" v-if="fileList4[0] && (fileList4[0].status == '3')">通过</span>
                      <span class="spanzid" v-if="fileList4[0] && (fileList4[0].status == '2')">待审核</span>
                      <span class="spanzit" v-if="fileList4[0] && (fileList4[0].status == '4')">退回</span>
                      <div  v-if="!sbdisablehe">
                      <el-button style="margin-left:51px;position: absolute;top: 50px;left: 9px;" type="success" size="small" @click="appUpload4" class="btncolor" v-if="fileList4[0]?fileList4[0].status != '3':1" v-show="shenqingtu">拍摄照片</el-button>
                      </div>
                    </el-col>
                    </div>
                  </el-col>
              </el-row>
  
            </div>
          </el-card>
          </el-col>
          <el-col :span="12" v-if="showPrint">
          <el-card class="box-card" style="margin-top:10px" >
            <div slot="header" class="clearfix">
              <span class="titlezi">银行划款授权书</span><span class="shenqingq">请打印并签字后拍照上传</span>
              <div style="height:20px"><el-button style="float: right; padding: 3px 0"  type="text" @click="huakuan">打印银行划款授权书</el-button></div>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="8">
                    <div  style=" width:200px;height:136px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px" @mouseenter="yinhangshuru"  @mouseleave="yinhangshuli">
                    <el-col :span="6" style="text-align:center;margin-top:20px;position:relative">
                      <el-upload
                        v-if="!sbdisablehua"
                        :file-list="fileList6"
                       
                        action=""
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload6">
                        <div slot="tip" class="yulan">
                          <viewer>
                         <img :src="fileimg6" alt="" style="width: 200px;height: 135px;margin-top: -38px;">
                         </viewer>
                        </div>
                        <el-button v-if="fileList6[0]?fileList6[0].status != '3':1" style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;" type="success" size="small" class="btncolor" v-show="yinhangtu">本地上传</el-button>
                      </el-upload>
                      <viewer v-else>
                      <img :src="fileimg6"  alt="" style="width: 200px;height: 135px;margin-top: -20px;">
                      </viewer>
                      <span class="spanzig" v-if="fileList6[0] && (fileList6[0].status == '3')">通过</span>
                      <span class="spanzid" v-if="fileList6[0] && (fileList6[0].status == '2')">待审核</span>
                      <span class="spanzit" v-if="fileList6[0] && (fileList6[0].status == '4')">退回</span>
                      <div v-if="!sbdisablehua">
                      <el-button  style="margin-left:51px;position: absolute;top: 50px;left: 9px;" type="success" size="small" @click="appUpload6" class="btncolor" v-if="fileList6[0]?fileList6[0].status != '3':1"  v-show="yinhangtu">拍摄照片</el-button>
                      </div>
                    </el-col>
                    </div>
                  </el-col>
              </el-row>
  
            </div>
          </el-card>
          </el-col>
          </div>
        </el-col>
        
        <el-col :span="8">
          <el-card class="box-card headerke" style="margin-left:10px;margin-top:10px;">
            <div slot="header" class="clearfix" style="">
              <span style="color:#333333;font-size:14px"><i class="el-icon-question"></i><span style="padding-left:5px">什么是“客户授权”</span></span>
            </div>
            <div class="text item" >
              <ul class="rightzi">
                <li><p><span>点击“发送校验码”，通过手机端完成以下操作；</span></p></li>
                <li><p>拍摄客户身份证人像面及国国徽面照片，系统将通过OCR功能自动识别客户信息； </p></li>
                <li><p>通过手机端进行人像比对，并完成电子签名；</p></li>
                <li><p>注：如手机端验证失败，可通过电脑端上传客户照片，身份证人像面及国徽面，打印申请书。</p></li>
              </ul>
            </div>
          </el-card>
 
        </el-col>
      </el-row>
      </el-form>
    </el-row>
    <el-col :span="16" v-if="signfile">
    <el-row style="background-color:#fff;margin-top:5px">
      <el-row>
        <el-col :span="20" :offset="2">
          
          <div class="formtitle">
            <span class="borderright">签署文件</span>
          </div>
          <el-table :data="datalist" style="width: 100%">
           
            <el-table-column prop="refData.partytypename" label="申请人类型" width="180">
            </el-table-column>
            <el-table-column prop="refData.filecategoryname" label="类型" width="180">
            </el-table-column>
            <el-table-column  label="文件">
              <template slot-scope="scope">
                <span class="linkurl" @click="toshowfile(scope.row.md5)">查看文件</span>
              </template>
            </el-table-column>
          </el-table>
          
        </el-col>
      </el-row>
    </el-row>
    </el-col>
  </section>
</template>

<script>
  import zheng from '@/assets/images/add_txm.png'
  import bei from '@/assets/images/add_ghm.png'
  import tou from '@/assets/images/photo_disable.png'
  import shen from '@/assets/images/btn_add_img.png'
  import Cookies from 'js-cookie'
  import { getBase64Image } from '@/utils'
  import {
    getLoaninfo,
    postWfSubmit,
    getLoanCurrentTaskCmd,
    getPrintBtn,
    contractgetoldimage,
    postContractSave,
    postContractSubmit
  } from '@/api/loanlist'
  import { orderimgsave, postPrintCommon, getCaFilesList } from '@/api/credit'
  export default {
    inject: ['reload'],
    data() {
      return {
        btndisable: false,
        sbdisable: false,
        showxiuding: false,
        btnlistenter: [],
        datalist: [],
        signfile: false,
        canPrint: [],
        showPrint: true,
        ruleForm: {},
        baozhengtou:false,
        baozhengimg:false,
        gongjieimg: false,
        yinhangtu: false,
        shenqingtu: false,
        danbaotou: false,
        danbaobei: false,
        danbaozhen: false,
        gongjietou: false,
        gongjiebei: false,
        gongjiezheng: false,
        showfuttu: false,
        showfutu: false,
        showzhu: false,
        needSign: false,
        guidimg: '',
        idcardimg: [],
        gongjielist: {},
        danbaolist: {},
        contentlist: {},
        btn1show: false,
        cleartype: '1',
        interval: null,
        showma2: true,
        countname2: '电子签',
        count2: '',
        timer2: null,
        showma1: true,
        countname1: '电子签',
        count1: '',
        timer1: null,
        showma: true,
        countname: '电子签',
        count: '',
        timer: null,
        zhujierenlist: {},
        gstate: false,
        dstate: false,
        routeid: this.$route.params.id,
        btnlistenter: [],
        sbdisablezhu: false,
        sbdisablegong: false,
        sbdisabledan: false,
        sbdisablejian: false,
        sbdisablehe: false,
        sbdisablehua: false,
        fileList: [],
        fileList21: [],
        fileList22: [],
        fileList2: [],
        fileList31: [],
        fileList32: [],
        fileList3: [],
        fileList51: [],
        fileList52: [],
        fileList5: [],
        fileList4: [],
        fileList6: [],
        fileList7: [],
        filelistype: '',
        websocketmessage: '',
        fileimg21: zheng,
        fileimg22: bei,
        fileimg4: shen,
        fileimg2: tou,
        fileimg31: zheng,
        fileimg32: bei,
        fileimg3: tou,
        fileimg51: zheng,
        fileimg52: bei,
        fileimg5: tou,
        fileimg6: shen,
        fileimg7: tou
      }
    },
    destroyed() {
      clearInterval(this.interval)
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
      toshowfile(md5) {
        var url = window.g.ApiUrl + 's120017/download?md5=' + md5
        window.open(url)
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
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$router.push({ path: '/dealer/creditapproval/tofangsuccess/' + that.routeid })
          } else {
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
      hetong() {
        let para = {}
        para = {
          contractno: this.ruleForm.camainno,
          type: 'contract'
        }
        var tempWindow = window.open('', '_blank', '');
        postPrintCommon(para).then(res => {
          console.log(res)
          if (res.data.success) {
            var url = window.g.ApiUrl + 'S310011/api/print/' + res.data.data.dataid + '?grf=' + res.data.data.grf + '&type=inline&qtype=' + res.data.data.qtype + '&dataname=' + res.data.data.dataname + '&_token=Bearer ' + Cookies.get('Admin-Token')
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
      baozhengtouli() {
        this.baozhengtou = false
      },
      baozhengtouru() {
        this.baozhengtou = true
      },
      yinhangshuru() {
        this.yinhangtu = true
      },
      yinhangshuli() {
        this.yinhangtu = false
      },
      shenqingshuru() {
        this.shenqingtu = true
      },
      shenqingshuli() {
        this.shenqingtu = false
      },
      danbaotouru() {
        this.danbaotou = true
      },
      danbaotouli() {
        this.danbaotou = false
      },
      danbaobeiru() {
        this.danbaobei = true
      },
      danbaobeili() {
        this.danbaobei = false
      },
      danbaozhenru() {
        this.danbaozhen = true
      },
      danbaozhenli() {
        this.danbaozhen = false
      },
      gongjietouru() {
        this.gongjietou = true
      },
      gongjietouli() {
        this.gongjietou = false
      },
      gongjiebeiru() {
        this.gongjiebei = true
      },
      gongjiebeili() {
        this.gongjiebei = false
      },
      gongjiezhenru() {
        this.gongjiezheng = true
      },
      gongjiezhenli() {
        this.gongjiezheng = false
      },
      showzhufttu() {
        this.showfuttu = true
      },
      showzhuftchu() {
        this.showfuttu = false
      },
      showzhuftu() {
        this.showfutu = true
      },
      showzhufchu() {
        this.showfutu = false
      },
      showzhutu() {
        this.showzhu = true
      },
      showzhuchu() {
        this.showzhu = false
      },
      toPrint() {
        let para = {}
        para = {
          contractno: this.contentlist.basicInfo.id,
          grf: '',
          type: 'application'
        }
        var tempWindow = window.open('', '_blank', '');
        postPrintCommon(para).then(res => {
          if (res.data.success) {
            var url = window.g.ApiUrl + 'S310011/api/print/' + this.contentlist.basicInfo.id + '?grf=' + res.data.data.grf + '&type=inline&qtype=' + res.data.data.qtype + '&dataname=' + res.data.data.dataname + '&_token=Bearer ' + Cookies.get('Admin-Token')
            tempWindow.location.href = url;
          } else {
            tempWindow.close()
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
          console.log(res)
        })
      },
      init() {
        this.initImg()
      },
      initImg() {
        var that = this
        var piclist = []

        
       

         this.ruleForm = JSON.parse(localStorage.getItem('contract' + this.routeid))
        let para = {}
        para = this.routeid
        getLoaninfo(para).then(res => {
          if (res.data.success) {
            this.ruleForm = res.data.data.basicInfo
          } else {
            this.ruleForm = JSON.parse(localStorage.getItem('contract' + this.routeid))
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
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
          if (this.ruleForm.status == 11 || this.ruleForm.status == 12 || this.ruleForm.status == 4 ) {
            if (this.ruleForm.signstate == 2) {
              that.sbdisablezhu= true
              that.sbdisablegong= true
              that.sbdisabledan= true
              that.sbdisablejian= true
              that.sbdisablehe= true
              that.sbdisablehua= true
              that.sbdisable = true
              that.showPrint = false
            }
            if (this.ruleForm.signstate == 3) {
              that.sbdisablezhu= false
              that.sbdisablegong= false
              that.sbdisabledan= false
              that.sbdisablejian= false
              that.sbdisablehe= false
              that.sbdisablehua= false
              that.sbdisable = false
              that.showPrint = true
            }
            if (this.ruleForm.signstate == 0) {
              that.sbdisablezhu= false
              that.sbdisablegong= false
              that.sbdisabledan= false
              that.sbdisablejian= false
              that.sbdisablehe= false
              that.sbdisablehua= false
              that.sbdisable = false
              that.showPrint = false
            }
            if (this.ruleForm.signstate == 1) {
              that.sbdisablezhu= true
              that.sbdisablegong= true
              that.sbdisabledan= true
              that.sbdisablejian= true
              that.sbdisablehe= true
              that.sbdisablehua= true
              that.sbdisable = false
              that.showPrint = false
            }
          } else {
            that.sbdisablezhu= true
            that.sbdisablegong= true
            that.sbdisabledan= true
            that.sbdisablejian= true
            that.sbdisablehe= true
            that.sbdisablehua= true
            that.sbdisable = true
            // that.showPrint = false
          }
        })
       
        
        let capara = {}
        capara = {
          cacategory: 'Cacontract',
          camainId: this.ruleForm.camainid
        }
        getCaFilesList(capara).then(res => {
          if(res.data.success) { 
            that.signfile = true
            that.datalist = res.data.data.filter(item => item.md5)
            if(that.datalist && that.datalist.length>0) {
              // that.showPrint = true
            }
          }  
        })
        // eslint-disable-next-line
        // if ((this.ruleForm.status == 11 || this.ruleForm.status == 12) && (this.ruleForm.signstate == 0 || this.ruleForm.signstate == 1 || this.ruleForm.signstate == 3)) {
        //   that.sbdisable = false
        // } else {
        //   that.sbdisable = true
        // }
        // // eslint-disable-next-line
        // if (this.ruleForm.signstate != 2) {
        //   this.showPrint = true
        // }
        contractgetoldimage(that.routeid).then(res => {
          if (res.data) {
            var imgdatalist = res.data.data.lPictures
            
            imgdatalist.forEach(currentItem => {
              if (currentItem.cateCode === '050102') {
                that.gongjieimg = true
              }
              if (currentItem.cateCode === '050103') {
                that.baozhengimg = true
              }
              if (currentItem.pictureList.length > 0) {
                piclist.push({
                  imgtype: currentItem.pictureList[0].imCategoryCode,
                  md5: currentItem.pictureList[0].md5,
                  guid: currentItem.pictureList[0].randomStr,
                  States: currentItem.pictureList[0].status
                })
              }
              // currentItem.pictureList.forEach(danitem => {
              //   console.log(danitem)
              //   console.log(123)
              //   piclist.push({
              //     imgtype: danitem.imCategoryCode,
              //     md5: danitem.md5,
              //     guid: danitem.randomStr
              //   })
              // })
            })
            that.idcardimg = that.idcardimg.concat(piclist)
           
            if (that.idcardimg.length > 0) {
              var s = {}
              s.token = Cookies.get('Admin-Token')
               console.log(that.routeid)
              s.CID = that.routeid
              var md5data = that.idcardimg
              s.MD5Data = md5data
              var predata = 'PREVIEW ' + JSON.stringify(s)
              that.$store.dispatch('SocketConnect')
              that.$store.dispatch('SocketSenddata', predata)
            }
          }
        })
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
            if (!objdata.Result) {
              return false
            }
            let file = {}
            file = {
              imgtype: objdata.ImgType,
              url: 'data:image/jpg;base64,' + objdata.Data,
              guid: objdata.GUID,
              status: objdata.States
            }
            if (objdata.ImgType === '0801') {
              that.fileimg6 = file.url
              that.fileList6.push(file)
            }
            if (objdata.ImgType === '050104') {
              if(file.status == '3') {
                that.sbdisablejian = true
              }
              that.fileimg5 = file.url
              that.fileList5.push(file)
            }
            if (objdata.ImgType === '01010301') {
              that.fileimg51 = file.url
              that.fileList51.push(file)
            }
            if (objdata.ImgType === '01010302') {
              that.fileimg52 = file.url
              that.fileList52.push(file)
            }
            if (objdata.ImgType === '050102') {
              if(file.status == '3') {
                that.sbdisablegong = true
              }
              that.fileimg3 = file.url
              that.fileList3.push(file)
            }
            if (objdata.ImgType === '050103') {
              if(file.status == '3') {
                that.sbdisabledan = true
              }
              that.fileimg7 = file.url
              that.fileList7.push(file)
            }
            if (objdata.ImgType === '01010201') {
              that.fileimg31 = file.url
              that.fileList31.push(file)
            }
            if (objdata.ImgType === '01010202') {
              that.fileimg32 = file.url
              that.fileList32.push(file)
            }
            if (objdata.ImgType === '050101') {
              if(file.status == '3') {
                that.sbdisablezhu = true
              }
              that.fileimg2 = file.url
              that.fileList2.push(file)
            }
            if (objdata.ImgType === '01010101') {
              that.fileimg21 = file.url
              that.fileList21.push(file)
            }
            if (objdata.ImgType === '01010102') {
              that.fileimg22 = file.url
              that.fileList22.push(file)
            }
            if (objdata.ImgType === '0201') {
              if(file.status == '3') {
                that.sbdisablejian = true
              }
              that.fileimg4 = file.url
              that.fileList4.push(file)
            }
          }
          if (objdata.Type === 'FILEOK') {
            console.log(objdata)
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
              oldRandomStr: this.guid,
              RandomStr: objdata.GUID,
              ImCategoryCode: objdata.ImgType,
              CamainId: that.routeid,
              Scene: '2',
              UploadFrom: '0',
              MidId: Cookies.get('MIDID')
            }
            orderimgsave(para).then(res => {
              console.log(res)
            })
            if (that.filelistype === 6) {
              that.fileimg6 = file.url
              that.fileList6.push(file)
            }
            if (that.filelistype === 5) {
              that.fileimg5 = file.url
              that.fileList5.push(file)
            }
            if (that.filelistype === 51) {
              that.fileimg51 = file.url
              that.fileList51.push(file)
            }
            if (that.filelistype === 52) {
              that.fileimg52 = file.url
              that.fileList52.push(file)
            }
            if (that.filelistype === 3) {
              that.fileimg3 = file.url
              that.fileList3.push(file)
            }
            if (that.filelistype === 7) {
              that.fileimg7 = file.url
              that.fileList7.push(file)
            }
            if (that.filelistype === 31) {
              that.fileimg31 = file.url
              that.fileList31.push(file)
            }
            if (that.filelistype === 32) {
              that.fileimg32 = file.url
              that.fileList32.push(file)
            }
            if (that.filelistype === 2) {
              that.fileimg2 = file.url
              that.fileList2.push(file)
            }
            if (that.filelistype === 4) {
              that.fileimg4 = file.url
              that.fileList4.push(file)
            }
            if (that.filelistype === 21) {
              that.fileimg21 = file.url
              that.fileList21.push(file)
            }
            if (that.filelistype === 22) {
              that.fileimg22 = file.url
              that.fileList22.push(file)
            }
          }
          if (objdata.Type === 'STARTUPLOAD') {
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
        s.CID = that.routeid
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
      websocketSendFileApp(type, imgtype,typename) {
        this.getMidSocket() 
        var that = this
        var s = {}
        s.CID = that.routeid
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
      beforeAvatarUpload52(file) {
        var imgtype = '01010302'
        var type = 52
        this.guidimg = this.fileList52[0] ? this.fileList52[0].guid : ''
        this.websocketSendFile(file, type, imgtype)
        return false
      },
      appUpload52() {
        var imgtype = '01010302'
        var type = 52
        this.guidimg = this.fileList52[0] ? this.fileList52[0].guid : ''
        this.websocketSendFileApp(type, imgtype)
      },
      beforeAvatarUpload51(file) {
        var imgtype = '01010301'
        var type = 51
        this.guidimg = this.fileList51[0] ? this.fileList51[0].guid : ''
        this.websocketSendFile(file, type, imgtype)
        return false
      },
      appUpload51() {
        var imgtype = '01010301'
        var type = 51
        this.guidimg = this.fileList51[0] ? this.fileList51[0].guid : ''
        this.websocketSendFileApp(type, imgtype)
      },
      beforeAvatarUpload5(file) {
        var imgtype = '050104'
        var type = 5
        this.guidimg = this.fileList5[0] ? this.fileList5[0].guid : ''
        this.websocketSendFile(file, type, imgtype)
        return false
      },
      appUpload5() {
        var imgtype = '050104'
        var type = 5
        var typename= '见证人面签照片'
        this.guidimg = this.fileList5[0] ? this.fileList5[0].guid : ''
        this.websocketSendFileApp(type, imgtype, typename)
      },
      beforeAvatarUpload32(file) {
        var imgtype = '01010202'
        var type = 32
        this.guidimg = this.fileList32[0] ? this.fileList32[0].guid : ''
        this.websocketSendFile(file, type, imgtype)
        return false
      },
      appUpload32() {
        var imgtype = '01010202'
        var type = 32
        this.guidimg = this.fileList32[0] ? this.fileList32[0].guid : ''
        this.websocketSendFileApp(type, imgtype)
      },
      beforeAvatarUpload31(file) {
        var imgtype = '01010201'
        var type = 31
        this.guidimg = this.fileList31[0] ? this.fileList31[0].guid : ''
        this.websocketSendFile(file, type, imgtype)
        return false
      },
      appUpload31() {
        var imgtype = '01010201'
        var type = 31
        this.guidimg = this.fileList31[0] ? this.fileList31[0].guid : ''
        this.websocketSendFileApp(type, imgtype)
      },
      beforeAvatarUpload7(file) {
        var imgtype = '050103'
        var type = 7
        this.guidimg = this.fileList7[0] ? this.fileList7[0].guid : ''
        this.websocketSendFile(file, type, imgtype)
        return false
      },
      appUpload7() {
        var imgtype = '050103'
        var type = 7
        var typename= '担保人面签照片'
        this.guidimg = this.fileList7[0] ? this.fileList7[0].guid : ''
        this.websocketSendFileApp(type, imgtype, typename)
      },
      beforeAvatarUpload3(file) {
        var imgtype = '050102'
        var type = 3
        this.guidimg = this.fileList3[0] ? this.fileList3[0].guid : ''
        this.websocketSendFile(file, type, imgtype)
        return false
      },
      appUpload3() {
        var imgtype = '050102'
        var type = 3
        var typename= '共借人面签照片'
        this.guidimg = this.fileList3[0] ? this.fileList3[0].guid : ''
        this.websocketSendFileApp(type, imgtype,typename)
      },
      beforeAvatarUpload2(file) {
        var imgtype = '050101'
        var type = 2
        this.guidimg = this.fileList2[0] ? this.fileList2[0].guid : ''
        this.websocketSendFile(file, type, imgtype)
        return false
      },
      appUpload2() {
        var imgtype = '050101'
        var type = 2
        var typename= '主借人面签照片'
        this.guidimg = this.fileList2[0] ? this.fileList2[0].guid : ''
        this.websocketSendFileApp(type, imgtype,typename)
      },
      beforeAvatarUpload6(file) {
        var imgtype = '0801'
        var type = 6
        this.guidimg = this.fileList6[0] ? this.fileList6[0].guid : ''
        this.websocketSendFile(file, type, imgtype)
        return false
      },
      appUpload6() {
        var imgtype = '0801'
        var type = 6
        var typename= '银行划款授权书'
        this.guidimg = this.fileList6[0] ? this.fileList6[0].guid : ''
        this.websocketSendFileApp(type, imgtype,typename)
      },
      beforeAvatarUpload4(file) {
        var imgtype = '0201'
        var type = 4
        this.guidimg = this.fileList4[0] ? this.fileList4[0].guid : ''
        this.websocketSendFile(file, type, imgtype)
        return false
      },
      appUpload4() {
        var imgtype = '0201'
        var type = 4
        var typename = '汽车抵押贷款合同'
        this.guidimg = this.fileList4[0] ? this.fileList4[0].guid : ''
        this.websocketSendFileApp(type, imgtype, typename)
      },
      beforeAvatarUpload21(file) {
        var imgtype = '01010101'
        var type = 21
        this.guidimg = this.fileList21[0] ? this.fileList21[0].guid : ''
        this.websocketSendFile(file, type, imgtype)
        return false
      },
      appUpload21() {
        var imgtype = '01010101'
        var type = 21
        this.guidimg = this.fileList21[0] ? this.fileList21[0].guid : ''
        this.websocketSendFileApp(type, imgtype)
      },
      beforeAvatarUpload22(file) {
        var imgtype = '01010102'
        var type = 22
        this.guidimg = this.fileList22[0] ? this.fileList22[0].guid : ''
        this.websocketSendFile(file, type, imgtype)
        return false
      },
      appUpload22() {
        var imgtype = '01010102'
        var type = 22
        this.guidimg = this.fileList22[0] ? this.fileList22[0].guid : ''
        this.websocketSendFileApp(type, imgtype)
      },
      appUpload1() {

      },
      beforeAvatarUpload() {

      },
      toyingxiang() {
        this.$router.push({
          path: '/dealer/creditapproval/yingxiang/' + this.routeid
        })
      },
      toNext() {
        /* eslint-disable */
        // var that = this
        // localStorage.setItem('contentlist' + that.routeid, JSON.stringify(that.contentlist))
        // this.$router.push({ path: '/dealer/creditapproval/orderphoto/'+ that.routeid}) 
      },
      tojinrong() {
        if (this.contentlist.basicInfo.category == "1") {
          this.$router.push({ path: '/dealer/creditapproval/personalorder/' + this.routeid })
        } else if (this.contentlist.basicInfo.category == "2") {
          this.$router.push({ path: '/dealer/creditapproval/secondorder/' + this.routeid })
        } else if (this.contentlist.basicInfo.category == "4") {
          this.$router.push({ path: '/dealer/creditapproval/personalorder/' + this.routeid })
        }
      },
      totianxie() {
        this.$router.push({
          path: '/dealer/creditapproval/appliloan/' + this.routeid
        })
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
      this.init()
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

<style rel="stylesheet/scss" lang="scss" scoped>
.spanzig{
  position: absolute;
  top: -15px;
  left: 0px;
  width: 30px;
  height: 20px;
  z-index: 100;
  background: #fff;
  color: green;
}
.spanzid{
  position: absolute;
  top: -15px;
  left: 0px;
  width: 40px;
  height: 20px;
  z-index: 100;
  background: #fff;
  color: chocolate;
}
.spanzit{
  position: absolute;
  top: -15px;
  left: 0px;
  width: 30px;
  height: 20px;
  z-index: 100;
  background: #fff;
  color: red;
}
.shenqingq{
  color: #666;
  font-size: 12px;
  margin-left: 5px;
}
.headerke {
  & .el-card__header{
    background-color: #f7f8f8
  }
}
.activeclass{
  color:#87D068;
}
.errorClass{
  color:#FF5500;
}
.rightzi li{
  font-size: 12px;
  height: 40px;
  line-height: 15px;
  list-style:disc ;
  margin-left:20px;
}
.el-form-item__label{
  width: 100%
}
.el-form-item{
  margin-bottom: 10px
}
.clearfix{
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px
}
.clearfix span{
  font-size: 14px
}
.titlezi {
  font-size: 16px!important;
  font-weight:bold;
}
.delete {
    position: absolute;
    top: -10px;
    right: -8px;
    width:30px;
    height: 30px;
    z-index: 100
}
.active{
  color:#5881D8;
}
.circle {
    display: inline-block;
    margin-left: -7px;
    width: 13px;
    height: 13px;
    background-color: #efefef; /* Can be set to transparent */
    border: 3px solid  #5881D8;
    border-radius: 100px;
    margin-right: -5px;
}
.redcolor{
  color:red;
  
}
.leftSlider ul{
  padding-top:20px;
  text-align: center
}
.leftSlider ul li{
  font-size: 14px;
  margin: 0 auto;
  width: 115px;
  border-left:1px solid #ccc;
  height: 50px;
  line-height: 50px;
  text-align: left;
}
.footer{
  text-align: center;
}
.middleimg{
  height: 535px;
}

.imgtitle{
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px dashed #cccccc;
  text-align: center;
}
.imgset{
  position: relative;
  top:240px;
  left: -16px;
  cursor: pointer;
}
.imglistul li{
  margin-left: 5px;
  float: left;
}
.imgspan{
  margin-top: -50px;
}
.searchbar{
  height: 50px;
  line-height: 50px;
  margin-bottom:0px;
}
.stepcolor{
  padding-top: 13px;
}
.topbtnbasic{
  text-align: right;
  height: 70px;
  line-height: 70px;
}
.leftSlider{
  height: 630px;
  background: #FFFFFF;
  box-shadow: 0 0 6px 0 rgba(0,0,0,0.05);
  border-radius: 1px;
}
.middle {
  margin-left: 5px;
  width: 100%;
  margin-right: 5px;
  background-color: #fafafa;
  height: 630px;
}
.rightSlider{
  height: 630px;
  background: #FFFFFF;
  box-shadow: 0 0 6px 0 rgba(0,0,0,0.05);
  border-radius: 1px;
}
.formtitle{
  clear:both;
  font-size: 16px;
  padding-top: 10px;
  color: #333333;
  
}
.pline{
  clear: both;
  margin-top: 2px;
  margin-bottom: 5px;
  border: 0.5px dashed #cccccc;
}
.colorred{
  color:red;
}
.siderbarhref{
  position: absolute;
  top:85px;
  right: -36px;
  cursor: pointer;
}
.siderbarhref ul li{
  color:  #5ADACB;
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