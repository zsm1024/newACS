<template>
  <section>
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
            <span v-if="!borrowName">客户姓名</span>
            <span v-else>{{borrowName}}</span>
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
    <el-row
      id="navmenus"
      style="margin-top:5px"
    >
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
          class="btnnextcolor"
          @click="toNext()"
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
          :current="2"
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
            <li style="width:100px;height:20px;margin-top:-25px;cursor:pointer">协议签署</li>
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
    <div v-loading='!(!isInfoLoading && !isImageLoading && !isCaLoading)'>
      <el-row class="midcontent">
        <el-form
          ref="form"
          :inline="true"
          size="mini"
          label-position="left"
        >
          <!-- <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="titlezi">车辆信息</span>
          
        </div>
        <div  class="text item">
          <el-row>
            <el-col :span="8">
              <el-form-item label="品牌车型">
                <span>111</span>
              </el-form-item>
            </el-col>    
            <el-col :span="8">
              <el-form-item label="合同价格">
                <span>111</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">  
              <el-form-item label="金融产品">
                <span>111</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
            <el-form-item label="首付">
              <span>111</span>
            </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贷款期限">
                <span>111</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贷款金额">
                <span>111</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="月供金额">
              <span>111</span>
            </el-form-item>
          </el-row>
        </div>
      </el-card> -->
          <el-row>
            <el-col :span="16">
              <el-card class="box-card">
                <div
                  slot="header"
                  class="clearfix"
                >
                  <el-col :span="10">
                    <span class="titlezi">主借人：{{zhujierenlist.name}}</span>
                    <span>{{zhujierenlist.phone}}</span>
                  </el-col>
                  <el-col
                    :span="14"
                    style="padding-top:3px"
                  >
                    <el-col :span="8">
                      <span>人脸识别结果:</span><span :class="[(zhujierenlist.refData &&  zhujierenlist.refData.FaceResultcode !=1000) ? 'errorClass' : 'activeclass' ]">{{zhujierenlist.refData?zhujierenlist.refData.cardocrflagname:''}}<el-tooltip
                          v-if="zhujierenlist.refData &&  zhujierenlist.refData.FaceResultcode !=1000 "
                          class="item"
                          effect="dark"
                          :content="zhujierenlist.refData? zhujierenlist.refData.FaceResultCn :''"
                          placement="bottom"
                        ><i class="el-icon-question"></i></el-tooltip></span>
                    </el-col>
                    <el-col :span="12">
                      <span>电子签状态:</span><span :class="[zhujierenlist.caflag !='1' ? 'errorClass' : 'activeclass' ]">{{zhujierenlist.refData? zhujierenlist.refData.caflagname :''}} </span>
                    </el-col>
                    <el-col
                      :span="4"
                      style="margin-top:-5px;text-align:right"
                    >
                      <span v-if="!sbdisable">
                        <!-- <el-button type="text" size="mini" v-show="showma"  @click="esign('1')" >{{countname}}</el-button>
                <el-button v-show="!showma" size="mini"  >{{count}}s</el-button> -->
                      </span>
                    </el-col>
                  </el-col>
                </div>
                <div class="text item">
                  <el-row>
                    <el-row style="margin-bottom:5px;margin-left:5px">

                      <el-col :span="16"><span style="font-size:14px;font-weight:bold">身份证</span></el-col>
                      <el-col :span="8"><span style="font-size:14px;font-weight:bold">照片</span></el-col>
                    </el-row>
                    <el-row>

                      <el-col :span="16">
                        <div
                          style=" width:200px;height:132px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px"
                          @mouseenter="showzhutu"
                          @mouseleave="showzhuchu"
                        >
                          <el-col
                            :span="6"
                            style="text-align:center;margin-top:20px;position:relative"
                          >
                            <el-upload
                              v-if="!zhujieup"
                              :file-list="fileList21"
                              :action="acitonUrl21"
                              :on-success="handleAvatarSuccess"
                              :on-error="handleError"
                              :show-file-list="false"
                              :headers="uploadHeader"
                              :before-upload="beforeAvatarUpload21"
                            >
                              <div
                                slot="tip"
                                class="yulan"
                              >
                                <viewer>
                                  <img
                                    :src="fileimg21"
                                    alt=""
                                    style="width: 200px;height: 132px;margin-top: -38px;"
                                  >
                                </viewer>
                              </div>
                              <i v-show="upzhudata">
                                <el-button
                                  style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;"
                                  type="success"
                                  size="small"
                                  class="btncolor"
                                  v-show="showzhu"
                                >本地上传</el-button>
                              </i>
                            </el-upload>
                            <viewer v-else>
                              <img
                                :src="fileimg21"
                                alt=""
                                style="width: 200px;height: 132px;margin-top: -20px;"
                              >
                            </viewer>
                            <i v-show="upzhudata">
                              <el-button
                                v-if="!zhujieup"
                                v-show="showzhu"
                                style="margin-left:51px;position: absolute;top: 50px;left: 9px;"
                                type="success"
                                size="small"
                                @click="appUpload21"
                                class="btncolor"
                              >拍摄照片</el-button>
                            </i>
                          </el-col>
                        </div>
                        <div
                          style=" width:200px;height:132px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px"
                          @mouseenter="showzhuftu"
                          @mouseleave="showzhufchu"
                        >
                          <el-col
                            :span="6"
                            style="text-align:center;margin-top:20px;position:relative"
                          >
                            <el-upload
                              v-if="!zhujieup"
                              :file-list="fileList22"
                              action=""
                              :show-file-list="false"
                              :before-upload="beforeAvatarUpload22"
                            >
                              <div
                                slot="tip"
                                class="yulan"
                              >
                                <viewer>
                                  <img
                                    :src="fileimg22"
                                    alt=""
                                    style="width: 200px;height: 132px;margin-top: -38px;"
                                  >
                                </viewer>
                              </div>
                              <el-button
                                v-show="showfutu"
                                style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;"
                                type="success"
                                size="small"
                                class="btncolor"
                              >本地上传</el-button>
                            </el-upload>
                            <viewer v-else>
                              <img
                                :src="fileimg22"
                                alt=""
                                style="width: 200px;height: 132px;margin-top: -20px;"
                              >
                            </viewer>
                            <el-button
                              v-if="!zhujieup"
                              v-show="showfutu"
                              style="margin-left:51px;position: absolute;top: 50px;left: 9px;"
                              type="success"
                              size="small"
                              @click="appUpload22"
                              class="btncolor"
                            >拍摄照片</el-button>
                          </el-col>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div
                          style=" width:200px;height:132px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px"
                          @mouseenter="showzhufttu"
                          @mouseleave="showzhuftchu"
                        >
                          <el-col
                            :span="6"
                            style="text-align:center;margin-top:20px;position:relative"
                          >
                            <el-upload
                              v-if="!zhujieup"
                              :on-success="handleAvatarSuccess2"
                              :on-error="handleError"
                              :file-list="fileList2"
                              :action="acitonUrl21"
                              :show-file-list="false"
                              :headers="uploadHeader"
                              :before-upload="beforeAvatarUpload2"
                            >
                              <div
                                slot="tip"
                                class="yulan"
                              >
                                <viewer>
                                  <img
                                    :src="fileimg2"
                                    alt=""
                                    style="width: 200px;height: 132px;margin-top: -38px;"
                                  >
                                </viewer>
                              </div>
                              <i v-show="upzhudata">
                                <el-button
                                  style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;"
                                  type="success"
                                  size="small"
                                  class="btncolor"
                                  v-show="showfuttu"
                                >本地上传</el-button>
                              </i>
                            </el-upload>
                            <viewer v-else>
                              <img
                                :src="fileimg2"
                                alt=""
                                style="width: 200px;height: 132px;margin-top: -20px;"
                              >
                            </viewer>
                            <i v-show="upzhudata">
                              <el-button
                                v-if="!zhujieup"
                                style="margin-left:51px;position: absolute;top: 50px;left: 9px;"
                                type="success"
                                size="small"
                                @click="appUpload2"
                                class="btncolor"
                                v-show="showfuttu"
                              >拍摄照片</el-button>
                            </i>
                          </el-col>
                        </div>
                      </el-col>
                    </el-row>
                  </el-row>

                </div>
              </el-card>
              <el-card
                class="box-card"
                style="margin-top:10px"
                v-if="gstate"
              >
                <div
                  slot="header"
                  class="clearfix"
                >
                  <el-col :span="10">
                    <span class="titlezi">共借人： {{gongjielist.name}}</span>
                    <span>{{gongjielist.phone}}</span>
                  </el-col>
                  <el-col
                    :span="14"
                    style="padding-top:3px"
                  >
                    <el-col :span="8">

                      <span>人脸识别结果:</span><span :class="[(gongjielist.refData &&  gongjielist.refData.FaceResultcode !=1000) ? 'errorClass' : 'activeclass' ]">{{gongjielist.refData?gongjielist.refData.cardocrflagname:''}}<el-tooltip
                          v-if="gongjielist.refData &&  gongjielist.refData.FaceResultcode !=1000 "
                          class="item"
                          effect="dark"
                          :content="gongjielist.refData? gongjielist.refData.FaceResultCn :''"
                          placement="bottom"
                        ><i class="el-icon-question"></i></el-tooltip></span>
                    </el-col>
                    <el-col :span="12">
                      <span>电子签状态:</span><span :class="[gongjielist.caflag !='1' ? 'errorClass' : 'activeclass' ]">{{gongjielist.refData? gongjielist.refData.caflagname :''}} </span>
                    </el-col>
                    <el-col
                      :span="4"
                      style="margin-top:-5px;text-align:right"
                    >
                      <span v-if="!sbdisable">
                        <!-- <el-button type="text" size="mini" v-show="showma1"  @click="esign1('2')" >{{countname1}}</el-button>
                <el-button v-show="!showma1" size="mini"  >{{count1}}s</el-button> -->
                      </span>
                    </el-col>
                  </el-col>

                </div>
                <div class="text item">
                  <el-row>
                    <el-row>
                      <el-col :span="16"><span style="font-size:14px;font-weight:bold">身份证</span></el-col>
                      <el-col :span="8"><span style="font-size:14px;font-weight:bold">照片</span></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="16">
                        <div
                          style=" width:200px;height:132px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px"
                          @mouseenter="gongjiezhenru"
                          @mouseleave="gongjiezhenli"
                        >
                          <el-col
                            :span="6"
                            style="text-align:center;margin-top:20px;position:relative"
                          >
                            <el-upload
                              v-if="!gongjieup"
                              :file-list="fileList31"
                              action=""
                              :show-file-list="false"
                              :before-upload="beforeAvatarUpload31"
                            >
                              <div
                                slot="tip"
                                class="yulan"
                              >
                                <viewer>
                                  <img
                                    :src="fileimg31"
                                    alt=""
                                    style="width: 200px;height: 132px;margin-top: -38px;"
                                  >
                                </viewer>
                              </div>
                              <el-button
                                style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;"
                                type="success"
                                size="small"
                                class="btncolor"
                                v-show="gongjiezheng"
                              >本地上传</el-button>
                            </el-upload>
                            <viewer v-else>
                              <img
                                :src="fileimg31"
                                alt=""
                                style="width: 200px;height: 132px;margin-top: -20px;"
                              >
                            </viewer>
                            <el-button
                              v-if="!gongjieup"
                              style="margin-left:51px;position: absolute;top: 50px;left: 9px;"
                              type="success"
                              size="small"
                              @click="appUpload31"
                              class="btncolor"
                              v-show="gongjiezheng"
                            >拍摄照片</el-button>
                          </el-col>
                        </div>
                        <div
                          style=" width:200px;height:132px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px"
                          @mouseenter="gongjiebeiru"
                          @mouseleave="gongjiebeili"
                        >
                          <el-col
                            :span="6"
                            style="text-align:center;margin-top:20px;position:relative"
                          >
                            <el-upload
                              v-if="!gongjieup"
                              :file-list="fileList32"
                              action=""
                              :show-file-list="false"
                              :before-upload="beforeAvatarUpload32"
                            >
                              <div
                                slot="tip"
                                class="yulan"
                              >
                                <viewer>
                                  <img
                                    :src="fileimg32"
                                    alt=""
                                    style="width: 200px;height: 132px;margin-top: -38px;"
                                  >
                                </viewer>
                              </div>
                              <el-button
                                style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;"
                                type="success"
                                size="small"
                                class="btncolor"
                                v-show="gongjiebei"
                              >本地上传</el-button>
                            </el-upload>
                            <viewer v-else>
                              <img
                                :src="fileimg32"
                                alt=""
                                style="width: 200px;height: 132px;margin-top: -20px;"
                              >
                            </viewer>
                            <el-button
                              v-if="!gongjieup"
                              style="margin-left:51px;position: absolute;top: 50px;left: 9px;"
                              type="success"
                              size="small"
                              @click="appUpload32"
                              class="btncolor"
                              v-show="gongjiebei"
                            >拍摄照片</el-button>
                          </el-col>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div
                          style=" width:200px;height:132px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px"
                          @mouseenter="gongjietouru"
                          @mouseleave="gongjietouli"
                        >
                          <el-col
                            :span="6"
                            style="text-align:center;margin-top:20px;position:relative"
                          >
                            <el-upload
                              v-if="!gongjieup"
                              :file-list="fileList3"
                              action=""
                              :show-file-list="false"
                              :before-upload="beforeAvatarUpload3"
                            >
                              <div
                                slot="tip"
                                class="yulan"
                              >
                                <viewer>
                                  <img
                                    :src="fileimg3"
                                    alt=""
                                    style="width: 200px;height: 132px;margin-top: -38px;"
                                  >
                                </viewer>
                              </div>
                              <el-button
                                style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;"
                                type="success"
                                size="small"
                                class="btncolor"
                                v-show="gongjietou"
                              >本地上传</el-button>
                            </el-upload>
                            <viewer v-else>
                              <img
                                :src="fileimg3"
                                alt=""
                                style="width: 200px;height: 132px;margin-top: -20px;"
                              >
                            </viewer>
                            <el-button
                              v-if="!gongjieup"
                              style="margin-left:51px;position: absolute;top: 50px;left: 9px;"
                              type="success"
                              size="small"
                              @click="appUpload3"
                              class="btncolor"
                              v-show="gongjietou"
                            >拍摄照片</el-button>
                          </el-col>
                        </div>
                      </el-col>

                    </el-row>
                  </el-row>

                </div>
              </el-card>
              <el-card
                class="box-card"
                style="margin-top:10px"
                v-if="dstate"
              >
                <div
                  slot="header"
                  class="clearfix"
                >
                  <el-col :span="10">
                    <span class="titlezi">担保人： {{danbaolist.name}}</span>
                    <span>{{danbaolist.phone}}</span>
                  </el-col>
                  <el-col
                    :span="14"
                    style="padding-top:3px"
                  >
                    <el-col :span="8">

                      <span>人脸识别结果:</span><span :class="[(danbaolist.refData &&  danbaolist.refData.FaceResultcode !=1000) ? 'errorClass' : 'activeclass' ]">{{danbaolist.refData?danbaolist.refData.cardocrflagname:''}}<el-tooltip
                          v-if="danbaolist.refData &&  danbaolist.refData.FaceResultcode !=1000 "
                          class="item"
                          effect="dark"
                          :content="danbaolist.refData? danbaolist.refData.FaceResultCn :''"
                          placement="bottom"
                        ><i class="el-icon-question"></i></el-tooltip></span>
                    </el-col>
                    <el-col :span="12">
                      <span>电子签状态:</span><span :class="[danbaolist.caflag !='1' ? 'errorClass' : 'activeclass' ]">{{danbaolist.refData? danbaolist.refData.caflagname :''}} </span>
                    </el-col>
                    <el-col
                      :span="4"
                      style="margin-top:-5px;text-align:right"
                    >
                      <span v-if="!sbdisable">
                        <!-- <el-button type="text" size="mini" v-show="showma2"  @click="esign2('3')" >{{countname2}}</el-button>
                <el-button v-show="!showma2" size="mini"  >{{count2}}s</el-button> -->
                      </span>
                    </el-col>
                  </el-col>

                </div>
                <div class="text item">
                  <el-row>
                    <el-row>

                      <el-col :span="16"><span style="font-size:14px;font-weight:bold">身份证</span></el-col>
                      <el-col :span="8"><span style="font-size:14px;font-weight:bold">照片</span></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="16">
                        <div
                          style=" width:200px;height:132px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px"
                          @mouseenter="danbaobeiru"
                          @mouseleave="danbaobeili"
                        >
                          <el-col
                            :span="6"
                            style="text-align:center;margin-top:20px;position:relative"
                          >
                            <el-upload
                              v-if="!danbaoup"
                              :file-list="fileList51"
                              action=""
                              :show-file-list="false"
                              :before-upload="beforeAvatarUpload51"
                            >
                              <div
                                slot="tip"
                                class="yulan"
                              >
                                <viewer>
                                  <img
                                    :src="fileimg51"
                                    alt=""
                                    style="width: 200px;height: 132px;margin-top: -38px;"
                                  >
                                </viewer>
                              </div>
                              <el-button
                                style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;"
                                type="success"
                                size="small"
                                class="btncolor"
                                v-show="danbaobei"
                              >本地上传</el-button>
                            </el-upload>
                            <viewer v-else>
                              <img
                                :src="fileimg51"
                                alt=""
                                style="width: 200px;height: 132px;margin-top: -20px;"
                              >
                            </viewer>
                            <el-button
                              v-if="!danbaoup"
                              style="margin-left:51px;position: absolute;top: 50px;left: 9px;"
                              type="success"
                              size="small"
                              @click="appUpload51"
                              class="btncolor"
                              v-show="danbaobei"
                            >拍摄照片</el-button>
                          </el-col>
                        </div>
                        <div
                          style=" width:200px;height:132px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px"
                          @mouseenter="danbaotouru"
                          @mouseleave="danbaotouli"
                        >
                          <el-col
                            :span="6"
                            style="text-align:center;margin-top:20px;position:relative"
                          >
                            <el-upload
                              v-if="!danbaoup"
                              :file-list="fileList52"
                              action=""
                              :show-file-list="false"
                              :before-upload="beforeAvatarUpload52"
                            >
                              <div
                                slot="tip"
                                class="yulan"
                              >
                                <viewer>
                                  <img
                                    :src="fileimg52"
                                    alt=""
                                    style="width: 200px;height: 132px;margin-top: -38px;"
                                  >
                                </viewer>
                              </div>
                              <el-button
                                style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;"
                                type="success"
                                size="small"
                                class="btncolor"
                                v-show="danbaotou"
                              >本地上传</el-button>
                            </el-upload>
                            <viewer v-else>
                              <img
                                :src="fileimg52"
                                alt=""
                                style="width: 200px;height: 132px;margin-top: -20px;"
                              >
                            </viewer>
                            <el-button
                              v-if="!danbaoup"
                              style="margin-left:51px;position: absolute;top: 50px;left: 9px;"
                              type="success"
                              size="small"
                              @click="appUpload52"
                              class="btncolor"
                              v-show="danbaotou"
                            >拍摄照片</el-button>
                          </el-col>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div
                          style=" width:200px;height:132px;background-color: #FBFBFB;border: 1px dashed #D9D9D9;float:left;margin-left:5px"
                          @mouseenter="danbaozhenru"
                          @mouseleave="danbaozhenli"
                        >
                          <el-col
                            :span="6"
                            style="text-align:center;margin-top:20px;position:relative"
                          >
                            <el-upload
                              v-if="!danbaoup"
                              :file-list="fileList5"
                              action=""
                              :show-file-list="false"
                              :before-upload="beforeAvatarUpload5"
                            >
                              <div
                                slot="tip"
                                class="yulan"
                              >
                                <viewer>
                                  <img
                                    :src="fileimg5"
                                    alt=""
                                    style="width: 200px;height: 132px;margin-top: -38px;"
                                  >
                                </viewer>
                              </div>
                              <el-button
                                style="margin-left:51px;z-index: 100;position: absolute;top: 0px;left: 10px;"
                                type="success"
                                size="small"
                                class="btncolor"
                                v-show="danbaozhen"
                              >本地上传</el-button>
                            </el-upload>
                            <viewer v-else>
                              <img
                                :src="fileimg5"
                                alt=""
                                style="width: 200px;height: 132px;margin-top: -20px;"
                              >
                            </viewer>
                            <el-button
                              v-if="!danbaoup"
                              style="margin-left:51px;position: absolute;top: 50px;left: 9px;"
                              type="success"
                              size="small"
                              @click="appUpload5"
                              class="btncolor"
                              v-show="danbaozhen"
                            >拍摄照片</el-button>
                          </el-col>
                        </div>
                      </el-col>

                    </el-row>
                  </el-row>

                </div>
              </el-card>
              <el-card
                class="box-card"
                style="margin-top:10px"
                v-if="needSign"
              >
                <div
                  slot="header"
                  class="clearfix"
                >
                  <span class="titlezi">申请书</span><span class="shenqingq">请打印并签字后拍照上传</span>
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="toPrint"
                  >打印申请书</el-button>
                </div>
                <div class="text item">
                  <el-row>
                    <el-col :span="8">
                      <div style="width:798px">
                        <div style="float:left">
                          <ul class="imglistul">

                            <li
                              v-show="fileList4.length <1"
                              style="width:115px;height:115px;cursor:pointer;border:1px dashed #ccc;line-height:115px;text-align:center"
                            >
                              <span v-if="sbdisable">暂无申请书</span>
                              <span v-else>暂无申请书</span>
                            </li>

                            <li
                              style="position:relative;width:115px;height:115px;cursor:pointer;"
                              v-for="(file, key) in fileList4"
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
                                  @click="delimg(file,fileList4,key)"
                                >
                                  <img
                                    :src="deletepng"
                                    class="delete"
                                  />
                                </a>
                              </i>
                            </li>

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
                              :file-list="fileList4"
                              action=""
                              :show-file-list="false"
                              :before-upload="beforeAvatarUpload4"
                            >
                              <el-button
                                style=""
                                type="success"
                                size="small"
                                class="btncolor"
                              >本地上传</el-button>
                            </el-upload>
                            <el-button
                              style="margin-left:0;margin-top:20px"
                              type="success"
                              @click="appUpload4"
                              size="small"
                              class="btncolor"
                            >拍摄照片</el-button>
                          </el-col>
                        </div>

                      </div>

                    </el-col>
                  </el-row>

                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card
                class="box-card headerke"
                style="margin-left:10px;height:450px"
              >
                <img :src="xieyi" style="width:296px;height:306px" alt="" srcset="">
              </el-card>

            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <el-col
        :span="16"
        v-if="signfile"
      >
        <el-row style="background-color:#fff;margin-top:5px">
          <el-row>
            <el-col
              :span="24"
              style="padding-left:20px;padding-right:20px"
            >

              <div class="formtitle">
                <span class="borderright">签署文件</span>
              </div>
              <el-table
                :data="datalist"
                style="width: 100%"
              >

                <el-table-column
                  prop="refData.partytypename"
                  label="申请人类型"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="refData.filecategoryname"
                  label="类型"
                  width="180"
                >
                </el-table-column>
                <el-table-column label="文件">
                  <template slot-scope="scope">
                    <span
                      class="linkurl"
                      @click="toshowfile(scope.row.md5)"
                    >查看文件</span>
                  </template>
                </el-table-column>
              </el-table>

            </el-col>
          </el-row>
        </el-row>
      </el-col>
    </div>
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
import { getToken } from "@/utils/auth";
import xieyi from "@/assets/images/xieyi.png";
import zheng from "@/assets/images/add_txm.png";
import deletepng from "@/assets/images/delete.png";
import bei from "@/assets/images/add_ghm.png";
import tou from "@/assets/images/photo_disable.png";
import shen from "@/assets/images/btn_add_img.png";
import Cookies from "js-cookie";
import { getBase64Image, GUID } from "@/utils";
import {
  orderimgsave,
  orderCauserlist,
  orderSendsms,
  postPrintCommon,
  ordergetoldimage,
  postRevisepause,
  postConditionalapproval,
  orderInfo,
  getCurrentTaskCmd,
  orderSign,
  getCaFilesList,
  orderdelimg,
  orderSavesub
} from "@/api/credit";
export default {
  inject: ["reload"],
  data() {
    return {
      xieyi,
      orderstatus: false,
      isInfoLoading: true,
      isImageLoading: true,
      isCaLoading: true,
      upzhudata: true,
      showguiidmain: "",
      showguiid: "",
      uploadHeader: {
        Authorization: "Bearer " + getToken()
      },
      imglistll: [],
      acitonUrl21: "",
      deletepng,
      ershow: false,
      btndisable: false,
      zhujieup: false,
      gongjieup: false,
      danbaoup: false,
      signfile: false,
      datalist: [],
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
      guidimg: "",
      idcardimg: [],
      gongjielist: {},
      danbaolist: {},
      contentlist: { basicInfo: { category: "" } },
      btn1show: false,
      cleartype: "1",
      interval: null,
      showma2: true,
      countname2: "电子签",
      count2: "",
      timer2: null,
      showma1: true,
      countname1: "电子签",
      count1: "",
      timer1: null,
      showma: true,
      countname: "电子签",
      count: "",
      timer: null,
      zhujierenlist: {},
      gstate: false,
      dstate: false,
      navtitletogle: false,
      routeid: this.$route.params.id,
      btnlistenter: [],
      sbdisable: false,
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
      filelistype: "",
      websocketmessage: "",
      fileimg21: zheng,
      fileimg22: bei,
      fileimg4: shen,
      fileimg2: tou,
      fileimg31: zheng,
      fileimg32: bei,
      fileimg3: tou,
      fileimg51: zheng,
      fileimg52: bei,
      fileimg5: tou
    };
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    resizeEvent: function() {
      var offsetLeft = this.$parent.$el.offsetLeft;
    },
    scrollEvent: function(height = 0) {
      height = Number.isInteger(height) ? height : 0;
      scrollFunc();
      var that = this;
      var top = getScroll(window, true);
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop > 177) {
        that.navtitletogle = true;
      } else {
        that.navtitletogle = false;
      }
      if (scrollDirection == "left" || scrollDirection == "right") {
        var left = window.scrollX;
        this.$refs.topAffix.style.left = -left + "px";
      }
    },
    toSubmit() {
      var that = this
      let para = {};
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
    toshowfile(md5) {
      var url = window.g.ApiUrl + "s120017/download?md5=" + md5;
      window.open(url);
    },
    shenqingshuru() {
      this.shenqingtu = true;
    },
    shenqingshuli() {
      this.shenqingtu = false;
    },
    danbaotouru() {
      this.danbaotou = true;
    },
    danbaotouli() {
      this.danbaotou = false;
    },
    danbaobeiru() {
      this.danbaobei = true;
    },
    danbaobeili() {
      this.danbaobei = false;
    },
    danbaozhenru() {
      this.danbaozhen = true;
    },
    danbaozhenli() {
      this.danbaozhen = false;
    },
    gongjietouru() {
      this.gongjietou = true;
    },
    gongjietouli() {
      this.gongjietou = false;
    },
    gongjiebeiru() {
      this.gongjiebei = true;
    },
    gongjiebeili() {
      this.gongjiebei = false;
    },
    gongjiezhenru() {
      this.gongjiezheng = true;
    },
    gongjiezhenli() {
      this.gongjiezheng = false;
    },
    showzhufttu() {
      this.showfuttu = true;
    },
    showzhuftchu() {
      this.showfuttu = false;
    },
    showzhuftu() {
      this.showfutu = true;
    },
    showzhufchu() {
      this.showfutu = false;
    },
    showzhutu() {
      this.showzhu = true;
    },
    showzhuchu() {
      this.showzhu = false;
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
            this.reload();
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
            this.reload();
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
            this.reload();
          }
        });
      }
    },
    toPrint() {
      let para = {};
      para = {
        contractno: this.contentlist.basicInfo.id,
        grf: "",
        type: "application"
      };
      var tempWindow = window.open("", "_blank", "");
      postPrintCommon(para).then(res => {
        if (res.data.success) {
          var url =
            window.g.ApiUrl +
            "S310011/api/print/" +
            this.contentlist.basicInfo.id +
            "?grf=" +
            res.data.data.grf +
            "&type=inline&qtype=" +
            res.data.data.qtype +
            "&dataname=" +
            res.data.data.dataname +
            "&_token=Bearer " +
            Cookies.get("Admin-Token");
          // window.open(url)
          tempWindow.location.href = url;
        } else {
          tempWindow.close();
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
        console.log(res);
      });
    },
    esign(type) {
      var that = this;
      var s = {};
      let para1 = {};
      para1 = that.contentlist;
      orderSign(para1).then(res => {
        if (res.data.success) {
          s.CID = localStorage.getItem("orderId" + that.routeid);
          s.TOKEN = Cookies.get("Admin-Token");
          s.APPID = Cookies.get("APPID");
          s.Type = type;
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
                this.timer = null;
              }
            }, 1000);
          }
          this.interval = setInterval(function() {
            that.cleartype = type;
            that.initImg();
          }, 5000);
          let para = {};
          para = {
            CaCategory: "Camain",
            CamainId: localStorage.getItem("orderId" + that.routeid),
            ArtyType: type
          };
          orderSendsms(para).then(res => {
            console.log(789);
            if (res.data) {
              this.$message({
                message: "验证码发送成功！",
                type: "success"
              });
            }
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
    esign1(type) {
      var that = this;
      var s = {};
      let para1 = {};
      para1 = that.contentlist;
      orderSign(para1).then(res => {
        if (res.data.success) {
          s.CID = localStorage.getItem("orderId" + that.routeid);
          s.TOKEN = Cookies.get("Admin-Token");
          s.APPID = Cookies.get("APPID");
          s.Type = type;
          var data = "ESIGN " + JSON.stringify(s);
          this.$store.dispatch("SocketConnect");
          this.$store.dispatch("SocketSenddata", data);
          const TIME_COUNT = 60;
          if (!this.timer1) {
            this.count1 = TIME_COUNT;
            this.showma1 = false;
            this.timer1 = setInterval(() => {
              if (this.count1 > 0 && this.count1 <= TIME_COUNT) {
                this.count1--;
              } else {
                this.showma1 = true;
                this.countname1 = "重发";
                this.timer1 = null;
              }
            }, 1000);
          }
          this.interval = setInterval(function() {
            that.cleartype = type;
            that.initImg();
          }, 5000);
          let para = {};
          para = {
            CaCategory: "Camain",
            CamainId: localStorage.getItem("orderId" + that.routeid),
            ArtyType: type
          };
          orderSendsms(para).then(res => {
            console.log(789);
            if (res.data) {
              this.$message({
                message: "验证码发送成功！",
                type: "success"
              });
            }
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
    esign2(type) {
      var that = this;
      var s = {};
      let para1 = {};
      para1 = that.contentlist;
      orderSign(para1).then(res => {
        if (res.data.success) {
          s.CID = localStorage.getItem("orderId" + that.routeid);
          s.TOKEN = Cookies.get("Admin-Token");
          s.APPID = Cookies.get("APPID");
          s.Type = type;
          var data = "ESIGN " + JSON.stringify(s);
          this.$store.dispatch("SocketConnect");
          this.$store.dispatch("SocketSenddata", data);
          const TIME_COUNT = 60;
          if (!this.timer2) {
            this.count2 = TIME_COUNT;
            this.showma2 = false;
            this.timer2 = setInterval(() => {
              if (this.count2 > 0 && this.count2 <= TIME_COUNT) {
                this.count2--;
              } else {
                this.showma2 = true;
                this.countname2 = "重发";
                this.timer2 = null;
              }
            }, 1000);
          }
          this.interval = setInterval(function() {
            that.cleartype = type;
            that.initImg();
          }, 5000);
          let para = {};
          para = {
            CaCategory: "Camain",
            CamainId: localStorage.getItem("orderId" + that.routeid),
            ArtyType: type
          };
          orderSendsms(para).then(res => {
            console.log(789);
            if (res.data) {
              this.$message({
                message: "验证码发送成功！",
                type: "success"
              });
            }
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
    init() {
      var that = this;
      this.contentlist = JSON.parse(
        localStorage.getItem("contentlist" + that.routeid)
      );
      orderInfo(localStorage.getItem("orderId" + that.routeid))
        .then(res => {
          if(res.data.data.basicInfo.status < 2){
            that.orderstatus = true
          }
          if (res.data.data.basicInfo.category == "2") {
            that.ershow = true;
          }
          if (
            res.data.data.basicInfo.status == 4 ||
            res.data.data.basicInfo.status < 2
          ) {
            if (res.data.data.basicInfo.readonly) {
              that.sbdisable = true;
              that.zhujieup = true;
              that.gongjieup = true;
              that.danbaoup = true;
            } else {
              if (res.data.data.basicInfo.status == 4) {
                that.zhujieup = false;
                that.gongjieup = false;
                that.danbaoup = false;
                that.sbdisable = false;
                that.needSign = true;
              } else if (
                res.data.data.basicInfo.status <= 1 &&
                res.data.data.basicInfo.signstate == 0
              ) {
                that.zhujieup = false;
                that.gongjieup = false;
                that.danbaoup = false;
                that.sbdisable = false;
              } else if (
                res.data.data.basicInfo.status <= 1 &&
                res.data.data.basicInfo.signstate == 1
              ) {
                that.zhujieup = false;
                that.gongjieup = false;
                that.danbaoup = false;
                that.sbdisable = false;
              } else if (
                res.data.data.basicInfo.status <= 1 &&
                res.data.data.basicInfo.signstate == 3
              ) {
                that.zhujieup = false;
                that.gongjieup = false;
                that.danbaoup = false;
                that.sbdisable = false;
              }
            }
          } else {
            that.sbdisable = true;
            that.zhujieup = true;
            that.gongjieup = true;
            that.danbaoup = true;
          }

          this.initImg();
          if (
            (res.data.data.basicInfo.readonly === false &&
              res.data.data.basicInfo.status === 4) ||
            res.data.data.basicInfo.status === 6
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
    },
    initImg() {
      var that = this;
      var piclist = [];
      let capara = {};
      capara = {
        cacategory: "Camain",
        camainId: that.routeid
      };
      getCaFilesList(capara)
        .then(res => {
          if (res.data.success) {
            this.signfile = true;
            this.datalist = res.data.data.filter(item => item.md5);
          }
        })
        .then(() => {
          this.isCaLoading = false;
        });
      ordergetoldimage(localStorage.getItem("orderId" + that.routeid)).then(
        res => {
          if (res.data) {
            var imgdatalist = res.data.data.lPictures;
            that.imglistll = res.data.data.lPictures;
            console.log(res.data.data.lPictures);
            imgdatalist.forEach(currentItem => {
              currentItem.pictureList.forEach(danitem => {
                piclist.push({
                  imgtype: danitem.imCategoryCode,
                  md5: danitem.md5,
                  guid: danitem.randomStr
                });
              });
            });
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
        }
      );
      let para = {};
      para = {
        CaCategory: "Camain",
        CamainId: localStorage.getItem("orderId" + that.routeid)
      };
      orderCauserlist(para)
        .then(res => {
          if (res.data.success) {
            var zhujieren = res.data.data.data.data.filter(
              item => item.type === "1"
            )[0];
            var gongjieren = res.data.data.data.data.filter(
              item => item.type === "2"
            )[0];
            var danbaoren = res.data.data.data.data.filter(
              item => item.type === "3"
            )[0];

            if (zhujieren) {
              // // eslint-disable-next-line
              if (zhujieren.refData.casignstatus == "0") {
                that.sbdisable = true;
                that.zhujieup = true;
              }
              // eslint-disable-next-line
              if (zhujieren.refData.casignstatus == "3") {
                that.needSign = true;
              }

              // // eslint-disable-next-line
              if (zhujieren.refData.casignstatus == "1") {
                that.sbdisable = true;
                that.zhujieup = true;
              }
              if (this.contentlist.basicInfo.status <= 2) {
                // // eslint-disable-next-line
                if (zhujieren.refData.casignstatus == "2") {
                  that.needSign = false;
                  that.sbdisable = true;
                  that.zhujieup = true;
                }
              }
              if (this.contentlist.basicInfo.status == 4) {
                // // eslint-disable-next-line
                if (zhujieren.refData.casignstatus == "2") {
                  that.needSign = false;
                  that.sbdisable = true;
                  that.zhujieup = true;
                }
              }
            }
            if (gongjieren) {
              if (gongjieren.refData.casignstatus == "0") {
                that.sbdisable = true;
                that.gongjieup = true;
              }
              // eslint-disable-next-line
              if (gongjieren.refData.casignstatus == "3") {
                that.needSign = true;
              }
              // // eslint-disable-next-line
              if (gongjieren.refData.casignstatus == "1") {
                that.sbdisable = true;
                that.gongjieup = true;
              }
              if (this.contentlist.basicInfo.status <= 2) {
                // // eslint-disable-next-line
                if (gongjieren.refData.casignstatus == "2") {
                  that.needSign = false;
                  that.sbdisable = true;
                  that.gongjieup = true;
                }
              }
              if (this.contentlist.basicInfo.status == 4) {
                // // eslint-disable-next-line
                if (gongjieren.refData.casignstatus == "2") {
                  that.needSign = false;
                  that.sbdisable = true;
                  that.gongjieup = true;
                }
              }
            }
            if (danbaoren) {
              if (danbaoren.refData.casignstatus == "0") {
                that.sbdisable = true;
                that.danbaoup = true;
              }
              // eslint-disable-next-line
              if (danbaoren.refData.casignstatus == "3") {
                that.needSign = true;
              }
              // // eslint-disable-next-line
              if (danbaoren.refData.casignstatus == "1") {
                that.sbdisable = true;
                that.danbaoup = true;
              }
              if (this.contentlist.basicInfo.status <= 2) {
                // // eslint-disable-next-line
                if (danbaoren.refData.casignstatus == "2") {
                  that.needSign = false;
                  that.sbdisable = true;
                  that.danbaoup = true;
                }
              }
              if (this.contentlist.basicInfo.status == 4) {
                // // eslint-disable-next-line
                if (danbaoren.refData.casignstatus == "2") {
                  that.needSign = false;
                  that.sbdisable = true;
                  that.gongjieup = true;
                }
              }
            }

            if (res.data.data.needSignFile) {
              // that.needSign = true
            }
            if (zhujieren) {
              that.zhujierenlist = zhujieren;
              if (that.cleartype === "1") {
                if (zhujieren.caflag) {
                  clearInterval(that.interval);
                }
              }
            }
            if (gongjieren) {
              that.gstate = true;
              that.gongjielist = gongjieren;
              if (that.cleartype === "2") {
                if (zhujieren.caflag) {
                  clearInterval(that.interval);
                }
              }
            }
            if (danbaoren) {
              that.dstate = true;
              that.danbaolist = danbaoren;
              if (that.cleartype === "3") {
                if (zhujieren.caflag) {
                  clearInterval(that.interval);
                }
              }
            }
            // that.fileimg22 = window.g.ApiUrl + window.local.preimg + md5 + '?_token=Bearer ' + Cookies.get('Admin-Token')
          } else {
            clearInterval(this.interval);
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        })
        .then(() => {
          this.isImageLoading = false;
        });
    },
    toDoWebsock() {
      var that = this;
      if (typeof this.websocketmessage === "string") {
        var objdata = JSON.parse(this.websocketmessage);
        console.log(objdata);
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
          if (!objdata.Result) {
            return false;
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
          console.log(file);
          if (objdata.ImgType === "2403") {
            that.fileimg5 = file.url;
            that.fileList5.push(file);
          }
          if (objdata.ImgType === "01010301") {
            that.fileimg51 = file.url;
            that.fileList51.push(file);
          }
          if (objdata.ImgType === "01010302") {
            that.fileimg52 = file.url;
            that.fileList52.push(file);
          }
          if (objdata.ImgType === "2402") {
            that.fileimg3 = file.url;
            that.fileList3.push(file);
          }
          if (objdata.ImgType === "01010201") {
            that.fileimg31 = file.url;
            that.fileList31.push(file);
          }
          if (objdata.ImgType === "01010202") {
            that.fileimg32 = file.url;
            that.fileList32.push(file);
          }
          if (objdata.ImgType === "2401") {
            that.fileimg2 = file.url;
            that.fileList2.push(file);
          }
          if (objdata.ImgType === "01010101") {
            that.fileimg21 = file.url;
            that.fileList21.push(file);
          }
          if (objdata.ImgType === "01010102") {
            that.fileimg22 = file.url;
            that.fileList22.push(file);
          }
          if (objdata.ImgType === "0601") {
            that.fileimg4 = file.url;
            that.fileList4.push(file);
          }
        }
        if (objdata.Type === "FILEOK") {
          console.log(objdata);
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
            oldRandomStr: this.guid,
            RandomStr: objdata.GUID,
            ImCategoryCode: objdata.ImgType,
            CamainId: localStorage.getItem("orderId" + that.routeid),
            Scene: "1",
            UploadFrom: "0",
            MidId: Cookies.get("MIDID")
          };
          orderimgsave(para).then(res => {
            console.log(res);
          });
          if (that.filelistype === 5) {
            that.fileimg5 = file.url;
            that.fileList5.push(file);
          }
          if (that.filelistype === 51) {
            that.fileimg51 = file.url;
            that.fileList51.push(file);
          }
          if (that.filelistype === 52) {
            that.fileimg52 = file.url;
            that.fileList52.push(file);
          }
          if (that.filelistype === 3) {
            that.fileimg3 = file.url;
            that.fileList3.push(file);
          }
          if (that.filelistype === 31) {
            that.fileimg31 = file.url;
            that.fileList31.push(file);
          }
          if (that.filelistype === 32) {
            that.fileimg32 = file.url;
            that.fileList32.push(file);
          }
          if (that.filelistype === 2) {
            that.fileimg2 = file.url;
            that.fileList2.push(file);
          }
          if (that.filelistype === 4) {
            that.fileimg4 = file.url;
            that.fileList4.push(file);
          }
          if (that.filelistype === 21) {
            that.fileimg21 = file.url;
            that.fileList21.push(file);
          }
          if (that.filelistype === 22) {
            that.fileimg22 = file.url;
            that.fileList22.push(file);
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
      console.log(data);
      this.$store.state.websocket.socket.ws.send(data);
    },
    beforeAvatarUpload52(file) {
      var imgtype = "01010302";
      var type = 52;
      this.guidimg = this.fileList52[0] ? this.fileList52[0].guid : "";
      this.websocketSendFile(file, type, imgtype);
      return false;
    },
    appUpload52() {
      var imgtype = "01010302";
      var type = 52;
      var typename = "担保人身份证反面";
      this.guidimg = this.fileList52[0] ? this.fileList52[0].guid : "";
      this.websocketSendFileApp(type, imgtype, typename);
    },
    beforeAvatarUpload51(file) {
      var imgtype = "01010301";
      var type = 51;
      this.guidimg = this.fileList51[0] ? this.fileList51[0].guid : "";
      this.websocketSendFile(file, type, imgtype);
      return false;
    },
    appUpload51() {
      var imgtype = "01010301";
      var type = 51;
      var typename = "担保人身份证正面";
      this.guidimg = this.fileList51[0] ? this.fileList51[0].guid : "";
      this.websocketSendFileApp(type, imgtype, typename);
    },
    beforeAvatarUpload5(file) {
      var imgtype = "2403";
      var type = 5;
      this.guidimg = this.fileList5[0] ? this.fileList5[0].guid : "";
      this.websocketSendFile(file, type, imgtype);
      return false;
    },
    appUpload5() {
      var imgtype = "2403";
      var type = 5;
      var typename = "担保人照片";
      this.guidimg = this.fileList5[0] ? this.fileList5[0].guid : "";
      this.websocketSendFileApp(type, imgtype, typename);
    },
    beforeAvatarUpload32(file) {
      var imgtype = "01010202";
      var type = 32;
      this.guidimg = this.fileList32[0] ? this.fileList32[0].guid : "";
      this.websocketSendFile(file, type, imgtype);
      return false;
    },
    appUpload32() {
      var imgtype = "01010202";
      var type = 32;
      var typename = "共借人身份证反面";
      this.guidimg = this.fileList32[0] ? this.fileList32[0].guid : "";
      this.websocketSendFileApp(type, imgtype, typename);
    },
    beforeAvatarUpload31(file) {
      var imgtype = "01010201";
      var type = 31;
      this.guidimg = this.fileList31[0] ? this.fileList31[0].guid : "";
      this.websocketSendFile(file, type, imgtype);
      return false;
    },
    appUpload31() {
      var imgtype = "01010201";
      var type = 31;
      var typename = "共借人身份证正面";
      this.guidimg = this.fileList31[0] ? this.fileList31[0].guid : "";
      this.websocketSendFileApp(type, imgtype, typename);
    },
    beforeAvatarUpload3(file) {
      var imgtype = "2402";
      var type = 3;
      this.guidimg = this.fileList3[0] ? this.fileList3[0].guid : "";
      this.websocketSendFile(file, type, imgtype);
      return false;
    },
    appUpload3() {
      var imgtype = "2402";
      var type = 3;
      var typename = "共借人照片";
      this.guidimg = this.fileList3[0] ? this.fileList3[0].guid : "";
      this.websocketSendFileApp(type, imgtype, typename);
    },
    beforeAvatarUpload2(file) {
      this.upzhudata = false;
      this.showguiidmain = GUID();
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.acitonUrl21 =
            window.g.ApiUrl +
            "S120017/upload/?Md5=&sceneid=1200170001&randomstr=" +
            this.showguiidmain;
          resolve();
        });
      });
      // var imgtype = '2401'
      // var type = 2
      // this.guidimg = this.fileList2[0] ? this.fileList2[0].guid : ''
      // this.websocketSendFile(file, type, imgtype)
      // return false
    },
    appUpload2() {
      var imgtype = "2401";
      var type = 2;
      var typename = "主借人照片";
      this.guidimg = this.fileList2[0] ? this.fileList2[0].guid : "";
      this.websocketSendFileApp(type, imgtype, typename);
    },
    beforeAvatarUpload4(file) {
      var imgtype = "0601";
      var type = 4;
      this.guidimg = this.fileList4[0] ? this.fileList4[0].guid : "";
      this.websocketSendFile(file, type, imgtype);
      return false;
    },
    appUpload4() {
      var imgtype = "0601";
      var type = 4;
      var typename = "申请书";
      this.guidimg = this.fileList4[0] ? this.fileList4[0].guid : "";
      this.websocketSendFileApp(type, imgtype, typename);
    },
    beforeAvatarUpload21(file) {
      this.upzhudata = false;
      this.showguiid = GUID();
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.acitonUrl21 =
            window.g.ApiUrl +
            "S120017/upload/?Md5=&sceneid=1200170001&randomstr=" +
            this.showguiid;
          resolve();
        });
      });
      // var imgtype = '01010101'
      // var type = 21
      // console.log(type)
      // this.guidimg = this.fileList21[0] ? this.fileList21[0].guid : ''
      // this.websocketSendFile(file, type, imgtype)
      // return false
    },
    appUpload21() {
      var imgtype = "01010101";
      var typename = "主借人身份证正面";
      var type = 21;
      this.guidimg = this.fileList21[0] ? this.fileList21[0].guid : "";
      this.websocketSendFileApp(type, imgtype, typename);
    },
    handleAvatarSuccess2(res, file) {
      if (!res.success) {
        this.$message({
          type: "error",
          message: res.message
        });
        return;
      }
      let para = {};
      para = {
        Md5: res.data.md5,
        oldRandomStr: this.guid,
        RandomStr: res.data.randomstr,
        ImCategoryCode: "2401",
        CamainId: localStorage.getItem("orderId" + this.routeid),
        Scene: "1",
        UploadFrom: "0",
        MidId: "1200170004"
      };
      orderimgsave(para).then(res => {
        this.upzhudata = true;
        if (!res.data.success) {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
      this.fileimg2 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess(res, file) {
      if (!res.success) {
        this.$message({
          type: "error",
          message: res.message
        });
        return;
      }
      let para = {};
      para = {
        Md5: res.data.md5,
        oldRandomStr: this.guid,
        RandomStr: res.data.randomstr,
        ImCategoryCode: "01010101",
        CamainId: localStorage.getItem("orderId" + this.routeid),
        Scene: "1",
        UploadFrom: "0",
        MidId: "1200170004"
      };
      orderimgsave(para).then(res => {
        this.upzhudata = true;
        if (!res.data.success) {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
      this.fileimg21 = URL.createObjectURL(file.raw);
    },

    handleError(response, file, fileList) {
      this.upzhudata = true;
      this.$message({
        type: "error",
        message: "上传失败，请联系管理员"
      });
    },
    beforeAvatarUpload22(file) {
      var imgtype = "01010102";
      var type = 22;
      this.guidimg = this.fileList22[0] ? this.fileList22[0].guid : "";
      this.websocketSendFile(file, type, imgtype);
      return false;
    },
    appUpload22() {
      var imgtype = "01010102";
      var typename = "主借人身份证背面";
      var type = 22;
      this.guidimg = this.fileList22[0] ? this.fileList22[0].guid : "";
      this.websocketSendFileApp(type, imgtype, typename);
    },
    appUpload1() {},
    beforeAvatarUpload() {},
    toyingxiang() {
      var that = this;
      localStorage.setItem(
        "contentlist" + that.routeid,
        JSON.stringify(that.contentlist)
      );
      this.$router.push({
        path: "/dealer/creditapproval/orderphoto/" + that.routeid
      });
      // var that = this
      // if (!that.sbdisable) {
      //   let para = {}
      //   para = that.contentlist
      //   orderSavesub(para).then(res => {
      //     if (res.data.success) {
      //       that.$router.push({ path: '/dealer/creditapproval/orderphoto/' + that.routeid })
      //     } else {
      //       this.$message({
      //         // duration: 0,
      //         // showClose: true,
      //         message: res.data.message,
      //         type: 'warning'
      //       })
      //     }
      //   })
      // } else {
      //   this.$router.push({ path: '/dealer/creditapproval/orderphoto/' + this.routeid })
      // }
    },
    toNext() {
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
      //   console.log(123)
      //   that.$message({
      //     message: '主借人信息填写未完整！！！',
      //     type: 'success'
      //   })
      //   localStorage.setItem('rulefalse' + that.routeid, true)
      //   //this.$router.push({ path: '/dealer/creditapproval/identmain/' + this.routeid })
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
      //        console.log(456)
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
      //        console.log(789)
      //       that.$message({
      //         message: '紧急联系人信息填写未完整！！！',
      //         type: 'success'
      //       })
      //       localStorage.setItem('rulefalse' + that.routeid, true)
      //       localStorage.setItem('activetag' + that.routeid, ['1','2'])
      //       that.$router.push({ path: '/dealer/creditapproval/identmain/' + that.routeid })
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
      //   !danbaoren.caparty04 ||
      //   !danbaoren.caparty05 ||
      //   // (zhujieren.payment != 0 || !zhujieren.scale) ||
      //   !zhujieren.pincome ||
      //   !zhujieren.fincome ||
      //   !zhujieren.expenditure ||
      //   !zhujieren.phone
      // ) {
      //   that.$message({
      //     message: '主借人信息填写未完整！！！',
      //     type: 'success'
      //   })

      //   localStorage.setItem('activetag' + that.routeid, ['1','2'])
      //   localStorage.setItem('rulefalse' + that.routeid, true)
      //   that.$router.push({ path: '/dealer/creditapproval/identmain/' + that.routeid })
      //   return false
      // }

      // if(!this.contentlist.urgentPartys){
      //   that.$message({
      //     message: '紧急联系人信息填写未完整！！！',
      //     type: 'success'
      //   })
      //   localStorage.setItem('rulefalse' + that.routeid, true)
      //   localStorage.setItem('activetag' + that.routeid, ['1','2'])
      //   that.$router.push({ path: '/dealer/creditapproval/identmain/' + that.routeid })
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
      //         that.$router.push({ path: '/dealer/creditapproval/identmain/' + that.routeid })
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
      //     !danbaoren.caparty05 ||
      //     !danbaoren.pincome ||
      //     !danbaoren.fincome ||
      //     !danbaoren.expenditure ||
      //     !danbaoren.phone

      //   ) {
      //     that.$message({
      //       message: '保证人信息填写未完整！！！',
      //       type: 'success'
      //     })
      //     localStorage.setItem('sbtag' + that.routeid, 4)
      //     localStorage.setItem('activetag' + that.routeid, ['1','2','3','4'])
      //     localStorage.setItem('rulefalse' + that.routeid, true)
      //      that.$router.push({ path: '/dealer/creditapproval/identmain/' + that.routeid })
      //   }
      // }
      // console.log(gongjieren)
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
      //          that.$router.push({ path: '/dealer/creditapproval/identmain/' + that.routeid })
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
      //     !danbaoren.caparty05 ||
      //     !gongjieren.expenditure ||
      //     !gongjieren.phone
      //   ) {
      //     that.$message({
      //         message: '共借人信息填写未完整！！！',
      //         type: 'success'
      //       })
      //     localStorage.setItem('sbtag' + that.routeid, 3)
      //     localStorage.setItem('activetag' + that.routeid, ['1','2','3'])
      //     localStorage.setItem('rulefalse' + that.routeid, true)
      //     that.$router.push({ path: '/dealer/creditapproval/identmain/' + that.routeid })
      //     return false
      //   }
      // }

      localStorage.setItem(
        "contentlist" + that.routeid,
        JSON.stringify(that.contentlist)
      );

      this.$router.push({
        path: "/dealer/creditapproval/orderphoto/" + that.routeid
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
  beforeRouteLeave: function(to, from, next) {
    window.removeEventListener("scroll", this.scrollEvent);
    window.removeEventListener("resize", this.resizeEvent);
    next();
  },
  mounted() {
    var s = {};
    s.USERID = Cookies.get("userId"); // localStorage.getItem('userId')
    s.TOKEN = Cookies.get("Admin-Token");
    var data = "PCCONN " + JSON.stringify(s);
    this.$store.dispatch("SocketConnect");
    this.$store.dispatch("SocketSenddata", data);
    this.init();
    window.addEventListener("scroll", this.scrollEvent);
    window.addEventListener("resize", this.resizeEvent);
  },
  computed: {
    borrowName: function() {
      if (!this.contentlist.borrowers || !this.contentlist.borrowers.length) {
        return "";
      }
      var zhujieren = this.contentlist.borrowers.filter(
        item => item.type == 1
      )[0];
      if (zhujieren && zhujieren["name"]) {
        return zhujieren["name"];
      } else {
        return "";
      }
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

<style rel="stylesheet/scss" lang="scss" scoped >
.borderright {
  font-size: 18px;
  font-weight: bold;
}
.app-breadcrumb {
  line-height: 64px;
}
.shenqingq {
  color: #666;
  font-size: 12px;
  margin-left: 5px;
}
.headerke {
  & .el-card__header {
    background-color: #f7f8f8;
  }
}
.activeclass {
  color: #87d068;
}
.errorClass {
  color: #ff5500;
}
.rightzi li {
  font-size: 12px;
  height: 40px;
  line-height: 15px;
  list-style: disc;
  margin-left: 20px;
}
.el-form-item__label {
  width: 100%;
}
.el-form-item {
  margin-bottom: 10px;
}
.clearfix {
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
}
.clearfix span {
  font-size: 14px;
}
.titlezi {
  font-size: 18px !important;
  font-weight: bold;
}
.delete {
  position: absolute;
  top: -10px;
  right: -8px;
  width: 30px;
  height: 30px;
  z-index: 100;
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
  margin-left: 5px;
  width: 100%;
  margin-right: 5px;
  background-color: #fafafa;
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
  color: #5adacb;
  margin-bottom: 3px;
  text-align: center;
  padding: 7px;
  width: 36px;
  height: 100px;
  border: 1px solid #5adacb;
  border-radius: 4px 4px 0 0;
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
</style>