<template>
  <div class='app-container' style="margin-top:5px;position:relative;">
    <el-row>
      <el-col :span="10">
        <el-breadcrumb
          separator="/"
          class="app-breadcrumb"
        >
          <el-breadcrumb-item class="firstbread">信贷审批</el-breadcrumb-item>
          <el-breadcrumb-item class="firstbread">
            <router-link style="font-weight: 100;color:#606266" :to="{path:'/dealer/creditapproval/manlist'}">放款业务</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>申请放款</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
 
      <el-col
        :span="12"
        class="topsearch topbtnbasic" style="margin:3px 0 8px 0;float:right"
      >
    
           <el-button
          type="success"
          v-show="showxiuding"
          size="small"
          v-for="(item,index) in btnlistenter"
          :disabled="btndisable"
          :key="index"
          class="btncolor"
          @click="btnenterto(item)"
        >{{item.cmddis}}</el-button>
      <el-button
      v-show="!showxiuding" 
       v-if="!sbdisable"
          type="success"
          size="small"
          class="btnnextcolor"
          style="width:60px"
          @click="zansave"
          :disabled="changeSave"
        >暂存</el-button>

        <el-button
         v-if="!sbdisable"
          type="success"
          size="small"
          class="btncolor"
          @click="tokehu"
        >下一步</el-button>
        <el-dropdown trigger="click">
          <el-button
            type="success"
            size="small"
            class="btncolor"
            style="width:73px!important;height:33px!important"
          >
            打印<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu
            slot="dropdown"
            class="dropdownprint"
          >
            <el-dropdown-item
              v-if="canPrint.includes('汽车抵押贷款合同')"
              @click.native="hetong"
            ><span>汽车抵押贷款合同</span></el-dropdown-item>
            <el-dropdown-item
              v-if="canPrint.includes('还款计划')"
              @click.native="huankuan"
            ><span> 还款计划 </span></el-dropdown-item>
            <el-dropdown-item
              v-if="canPrint.includes('二手车协议')"
              @click.native="ershou"
            ><span>二手车协议</span></el-dropdown-item>
            <el-dropdown-item
              v-if="canPrint.includes('附加贷')"
              @click.native="fujia"
            ><span>附加贷</span></el-dropdown-item>
            <el-dropdown-item
              v-if="canPrint.includes('购车确认声明')"
              @click.native="gouche"
            ><span>购车确认声明</span></el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row class="searchbar">
      <el-col
        :span="22"
        :offset="2"
      >
        <Steps
          :current="0"
          class="stepcolor"
        >
          <Step title="填写还款信息"></Step>
          <Step title="客户授权">
            <li
              @click="tokehu()"
              style="width:100px;height:20px;margin-top:-25px;cursor:pointer"
            >客户授权</li>
          </Step>
          <Step title="上传影像资料">
            <li
              @click="toyingxiang()"
              style="width:100px;height:20px;margin-top:-25px;cursor:pointer"
            >上传影像资料</li>
          </Step>
        </Steps>
      </el-col>
    </el-row>
    <el-row class="midcontent">
      <el-col
        :span="20"
        :offset="2"
        v-if="backFileList.length>0"
      >
        <div class="formtitle">
          <span style="border-left: 2px solid #CCA25D;font-size:16px;font-weight:bold;padding-left:6px">退件记录</span>
        </div>
        <el-table
          :data="backFileList"
          style="width: 100%"
        >
          <el-table-column
            prop="refData.imcategorycodename"
            label="类型名称"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="refData.problemname"
            label="问题类型"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="reason"
            label="问题描述"
            width="300"
          >
          </el-table-column>
          <el-table-column
            prop="cdate"
            label="退件时间"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="memo"
            label="补充说明"
          >
          </el-table-column>
        </el-table>
      </el-col>

      <el-col
        :span="20"
        :offset="2"
        v-if="specialList.length>0"
        style="float:none"
      >
        <div class="formtitle">
          <span style="border-left: 2px solid #CCA25D;font-size:16px;font-weight:bold;padding-left:6px">特殊申请</span>
        </div>
        <el-table
          :data="specialList"
          style="width: 100%"
        >

          <el-table-column
            prop="refData.reasonname"
            label="特殊原因"
            width="250"
          >
            <template slot-scope="scope">
              <span @click="showimg(scope.row.md5)">{{scope.row.refData.reasonname}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="cdate"
            label="申请时间"
          >
          </el-table-column>
          <el-table-column
            prop="refData.signedname"
            label="审批状态"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span
                @click="showimg(scope.row.md5)"
                class="showimg"
              >查看图片</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col style="margin-top:10px">

      </el-col>
      <el-row>
        <el-col
          :span="20"
          :offset="2"
        >

          <el-form
            label-position="right"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            :disabled="sbdisable"
          >
            <div class="formtitle">
              <span style="border-left: 2px solid #CCA25D;font-size:16px;font-weight:bold;padding-left:6px">合同基本信息</span>
              <span style="color:red;margin-left:20px">最低发票价格:{{ ruleForm.refData?ruleForm.refData.mininvoiceprice: ''}}</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="申请编号："
                  :label-width="formLabelWidth"
                >
                  <span>{{ruleForm.camainno}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="客户姓名："
                  :label-width="formLabelWidth"
                >
                  <span>{{ ruleForm.borrowername}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="经销商："
                  :label-width="formLabelWidth"
                >
                  <span>{{ ruleForm.refData?ruleForm.refData.signdealername: ''}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="案件类型："
                  :label-width="formLabelWidth"
                >
                  <span>{{ ruleForm.refData?ruleForm.refData.categoryname: ''}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="案件提报时间："
                  :label-width="formLabelWidth"
                >
                  <span>{{ruleForm.applicationdate}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="放款申请时间："
                  :label-width="formLabelWidth"
                >
                  <span>{{ruleForm.submitdate}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-col :span="24">
              <el-form-item
                label="放款模式："
                prop="loanClass"
                :rules="[
          { required: true, message: '请输入', trigger: 'blur' },
          ]"
                :label-width="formLabelWidth"
                v-if="fieldAccessState.loanclass!=0"
              >
                <el-select
                  filterable
                  v-model="ruleForm.loanClass"
                  :disabled="loanclassdis"
                  size="small"
                  placeholder=""
                >
                  <el-option
                    v-for="item in moshi"
                    :key="item.CODE"
                    :label="item.NAME"
                    :value="item.CODE"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="开票单位："
                prop="invoicecompany"
                :rules="[
          { required: true, message: '请输入', trigger: 'blur' },
          ]"
                :label-width="formLabelWidth"
                v-if="fieldAccessState.invoicecompany!=0"
              >
                <el-input
                  v-model="ruleForm.invoicecompany"
                  placeholder=""
                  :disabled="invoicecompanydis"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="VIN号："
                prop="vin"
                :rules="[
          { required: true, message: '请输入', trigger: 'blur' },
          ]"
                :label-width="formLabelWidth"
                v-if="fieldAccessState.vin!=0"
              >

                <Poptip
                popper-class="popclass"
                  trigger="focus"
                  title=""
                  placement="top-start"
                  :content="ruleForm.vin?ruleForm.vin.replace(/(.{4})/g,'$1 '): ''"
                >
                  <el-input
                    v-model="ruleForm.vin"
                    style="width:360px"
                    :disabled="vindis"
                    size="small"
                  ></el-input>
                </Poptip>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="发动机号："
                prop="engineno"
                :rules="[
          { required: true, message: '请输入', trigger: 'blur' },
          ]"
                :label-width="formLabelWidth"
                v-if="fieldAccessState.engineno!=0"
              >
                <Poptip
                popper-class="popclass"
                  trigger="focus"
                  title=""
                  placement="top-start"
                  :content="ruleForm.engineno?ruleForm.engineno.replace(/(.{4})/g,'$1 '): ''"
                >
                  <el-input
                    v-model="ruleForm.engineno"
                    style="width:360px"
                    :disabled="enginenodis"
                    size="small"
                  ></el-input>
                </Poptip>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="车辆型号："
                :label-width="formLabelWidth"
                v-if="fieldAccessState.vehicleimodel!=0"
              >
                <el-input
                  v-model="ruleForm.vehicleimodel"
                  :disabled="vehicleimodeldis"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="还款银行："
                prop="paymentbank"
                :rules="[
          { required: true, message: '请输入', trigger: 'blur' },
          ]"
                :label-width="formLabelWidth"
                v-if="fieldAccessState.paymentbank!=0"
              >
                <el-select
                  filterable
                  v-model="ruleForm.paymentbank"
                  :disabled="paymentbankdis"
                  size="small"
                  placeholder=""
                >
                  <el-option
                    v-for="item in banklist"
                    :key="item.CODE"
                    :label="item.NAME"
                    :value="item.CODE"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="还款账户："
                prop="paymentno"
                :rules="[
          { required: true, message: '请输入', trigger: 'blur' },
          ]"
                :label-width="formLabelWidth"
                v-if="fieldAccessState.paymentno!=0"
              >
               <Poptip
                    trigger="focus"
                    popper-class="popclass"
                    title=""
                    placement="top-start"
                    :content="ruleForm.paymentno?ruleForm.paymentno.replace(/(.{4})/g,'$1 '): ''"
                  >
                <el-input
                  placeholder=""
                  size="small"
                  style="width:360px"
                  maxlength= '19'
                 
                  v-model="ruleForm.paymentno"
                  :disabled="paymentnodis"
                ></el-input>
               </Poptip>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="省市："
                prop="area"
                :rules="[
          { required: true, message: '请输入', trigger: 'blur' },
          ]"
                :label-width="formLabelWidth"
                v-if="fieldAccessState.area!=0"
              >
                <el-cascader
                  v-model="ruleForm.area"
                  :disabled="areadis"
                  style="width:100%"
                  size="small"
                  :options="valuearea"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="开户人："
                prop="paymentaccount"
                :rules="[
          { required: true, message: '请输入', trigger: 'change' },
          ]"
                :label-width="formLabelWidth"
                v-if="fieldAccessState.paymentaccount!=0"
              >
                <el-select
                  v-model="ruleForm.paymentaccount"
                  :disabled="paymentaccountdis"
                  size="small"
                  placeholder=""
                >
                  <el-option
                    v-for="item in kaihulist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="保险开始日期："
                prop="insurancesdate"
                :rules="[
          { required: true, message: '请输入', trigger: 'blur' },
          ]"
                :label-width="formLabelWidth"
                v-if="fieldAccessState.insurancesdate!=0"
              >
                <el-date-picker
                  v-model="ruleForm.insurancesdate"
                  value-format="yyyy-MM-dd"
                  style="width:100%"
                  @change="toNextDay"
                  :disabled="insurancesdatedis"
                  size="small"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="保险结束日期："
                prop="insuranceedate"
                :rules="[
          { required: true, message: '请输入', trigger: 'blur' },
          ]"
                :label-width="formLabelWidth"
                v-if="fieldAccessState.insuranceedate!=0"
              >
                <el-date-picker
                  v-model="ruleForm.insuranceedate"
                  value-format="yyyy-MM-dd"
                  style="width:100%"
                  :disabled="insuranceedatedis"
                  size="small"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-row v-if="isgpsshow">
        <el-col
         v-if="rulecategory == 4" 
          :span="20"
          :offset="2"
        >
          <div class="formtitle">
            <span style="border-left: 2px solid #CCA25D;font-size:16px;font-weight:bold;padding-left:6px">GPS信息</span>

          </div>
             <el-form :model="gpsform" :disabled="sbdisable"  :rules="rules" ref="gpsform">
               <el-row>
              <el-col :span="12">
               
              <el-form-item label="车商联系人" prop="installname"  :rules="[
                { required: true, message: '请输入', trigger: 'blur' },
                ]" :label-width="formLabelWidth">
                <el-input v-model="gpsform.installname" size="small" autocomplete="off"></el-input>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="联系人电话" prop="addressphone"  :rules="[
                { required: true, message: '请输入', trigger: 'blur' },
                ]" :label-width="formLabelWidth">
                <el-input v-model="gpsform.addressphone" size="small" autocomplete="off"></el-input>
              </el-form-item>
               </el-col>
              </el-row>
              <el-row>
                 <el-col :span="12">
              <el-form-item label="安装地址" prop="address"  :rules="[
                { required: true, message: '请输入', trigger: 'blur' },
                ]" :label-width="formLabelWidth">
                <el-input v-model="gpsform.address" size="small" autocomplete="off"></el-input>
              </el-form-item>
               </el-col>
                <el-col :span="12">
              <el-form-item label="GPS供应商" prop="gpspro"  :rules="[
                { required: true, message: '请输入', trigger: 'change' },
                ]" :label-width="formLabelWidth">
                <el-select v-model="gpsform.gpspro" size="small" placeholder="请选择GPS供应商" @change="doselgpstype">
                  <el-option
                          v-for="item in gpstype"
                          :key="item.CODE"
                          :label="item.NAME"
                          :value="item.CODE"
                        >
                  </el-option>
                </el-select>
              </el-form-item>
              </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
              <el-form-item label="贷款期数"   :label-width="formLabelWidth">
                <el-input v-model="gpsform.loanperiod" size="small" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="GPS型号名称" prop="gpsname"  :rules="[
                { required: true, message: ' ', trigger: 'blur' },
                ]" :label-width="formLabelWidth">
                <el-input v-model="gpsform.gpsname" size="small"  :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
              </el-col>
              </el-row>
              
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="gpsform.remark"></el-input>
              </el-form-item>
            </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="20"
          :offset="2"
        >
          <div class="formtitle">
            <span style="border-left: 2px solid #CCA25D;font-size:16px;font-weight:bold;padding-left:6px">身份信息变更</span>

          </div>
          <el-table
            :data="dataCardList"
            style="width: 100%"
          >
            <el-table-column
              v-if="cardshowtrue"
              fixed="right"
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <el-button
                  @click="changeClick(scope.row)"
                  v-if="scope.row.cardtype == '00001'"
                  type="text"
                  size="small"
                >变更</el-button>

              </template>
            </el-table-column>
            <el-table-column
              prop="refData.typename"
              label="角色"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="refData.cardtypename"
              label="证件类型"
            >
            </el-table-column>
            <el-table-column
              prop="card"
              label="证件号码"
            >
            </el-table-column>
            <el-table-column label="有效期">
              <template slot-scope="scope">
                <span v-if="scope.row.carddate == ''"> 长期</span>
                <span
                  v-else-if="((new Date(scope.row.carddate)).getTime()<Date.now()) && scope.row.cardtype == '00001'"
                  style="color:red"
                >{{scope.row.carddate | datetoformat}}</span>
                <span v-else>{{scope.row.carddate | datetoformat}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="20"
          :offset="2"
        >
          <div class="formtitle">
            <span style="border-left: 2px solid #CCA25D;font-size:16px;font-weight:bold;padding-left:6px">变更信息</span>

          </div>
          <el-table
            :data="havechange"
            style="width: 100%"
          >
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <el-button
                  @click="showclick(scope.row)"
                  type="text"
                  size="small"
                >查看影像信息</el-button>

              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="客户姓名"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="refData.cardtypename"
              label="证件类型"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="card"
              label="证件号码"
            >
            </el-table-column>

            <el-table-column
              prop="carddate"
              label="有效期"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.carddate |datetoformat}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="newLongflag"
              :formatter="dateFormat"
              label="证件到期日(新)"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-row>
    <el-dialog
      title="影像信息"
      :visible.sync="showcardimg"
      width="720px"
      center
    >
      <el-form>
        <el-form-item
          label="影像信息："
          :label-width="formLabelWidth"
        >
          <span></span>

          <el-col :span='9'>

            <img
              :src="imgshowtu1"
              class="imagePost"
              alt=""
              v-if="imgshowtu1 !=''"
            >
            <i
              class="el-icon-plus avatar-uploader-icon"
              v-else
            ></i>

          </el-col>
          <el-col :span='7'>

            <img
              :src="imgshowtu2"
              class="imagePost"
              alt=""
              v-if="imgshowtu2 !=''"
            >
            <i
              class="el-icon-plus avatar-uploader-icon"
              v-else
            ></i>

          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="客户身份信息更改"
      :visible.sync="showChangeCard"
      width="720px"
      center
    >
      <span>
        <el-form>

          <el-row>
            <el-form-item
              label="长期有效："
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-checkbox
                v-model="changeinfo.longe"
                true-label="true"
                :label="1"
                @change="upcarddate"
              >长期</el-checkbox>
            </el-form-item>
            <el-form-item
              label="证件到期日："
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-date-picker
                :picker-options="pickerOptions0"
                type="date"
                :disabled="cdatedisable"
                value-format="yyyy-MM-dd"
                v-model="changeinfo.carddate"
                placeholder="选择日期"
                size="small"
                style="width: 75%;"
              ></el-date-picker>
            </el-form-item>
          </el-row>

          <el-form-item
            label="影像信息："
            :label-width="formLabelWidth"
          >
            <span></span>

            <el-col :span='9'>

              <el-upload
                class="avatar-uploader"
                :headers="uploadHeader"
                :action="uploadaction"
                :show-file-list="false"
                :before-upload="beforeupload"
                :on-success="hadleSuccess"
                :on-error="handleError"
              >
                <img
                  :src="imgtu"
                  class="imagePost"
                  alt=""
                  v-if="imgtu !=''"
                >
                <img
                  :src="zheng"
                  alt=""
                  v-else
                  srcset=""
                >
                <br />
                <span style="color:darkgoldenrod">身份证人像面</span>
              </el-upload>
            </el-col>
            <el-col :span='7'>
              <el-upload
                class="avatar-uploader"
                :headers="uploadHeader"
                :action="uploadaction1"
                :show-file-list="false"
                :before-upload="beforeupload1"
                :on-success="hadleSuccess1"
                :on-error="handleError"
              >
                <img
                  :src="imgtu1"
                  class="imagePost"
                  alt=""
                  v-if="imgtu1 !=''"
                >
                <img
                  :src="bei"
                  alt=""
                  v-else
                  srcset=""
                >

                <span style="color:darkgoldenrod">身份证国徽面</span>
              </el-upload>
            </el-col>
          </el-form-item>

        </el-form>
      </span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="showChangeCard = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="changeCardDis"
          @click="doChangeCard"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="图片"
      :visible.sync="dialogVisible"
      width="560px"
    >
      <img
        :src="imgurl"
        style="width:530px"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="信息确认"
      :visible.sync="showxinxi"
      width="720px"
      center
    >
      <span>
        <el-form :inline="true">
          <el-form-item
            label="客户姓名："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{ruleForm.borrowername}}</span>
          </el-form-item>
          <el-form-item
            label="开票单位："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{ruleForm.invoicecompany}}</span>
          </el-form-item>
          <el-form-item
            label="经销商："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{ ruleForm.refData?ruleForm.refData.signdealername: ''}}</span>
          </el-form-item>
          <el-form-item
            label="车辆车型："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{ruleForm.vehicleimodel}}</span>
          </el-form-item>
          <el-form-item
            label="还款账户："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{ruleForm.paymentno}}</span>
          </el-form-item>
          <el-form-item
            label="开户人："
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{this.kaihulist.filter(item => item.id === ruleForm.paymentaccount)[0]?this.kaihulist.filter(item => item.id === ruleForm.paymentaccount)[0].name :''}}</span>
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
  
  </div>
</template>

<script>
import zheng from "@/assets/images/pic_sfz_txm.png";
import bei from "@/assets/images/pic_sfz_ghm.png";
import { GUID } from "@/utils";
import { getToken } from "@/utils/auth";
import Cookies from "js-cookie";
import {
  getLoanCurrentTaskCmd,
  getPrintBtn,
  postContractSign,
  postContractSave,
  postContractSubmit,
  getArtys,
  postWfSubmit,
  getLoaninfo,
  getPartyInfo,
  getChangecardInfo,
  UpdateChangeCardInfo,
  postContractSaveCheck
} from "@/api/loanlist";
import { orderimgsave, postPrintCommon,orderSignStatus,getGpsinfo,postGpsinfo } from "@/api/credit";
import { provinceAndCityData } from "element-china-area-data";
export default {
  inject: ["reload"],
  data() {
    return {
      isgpsshow: false,
      gpsresinfo:{},
      gpstype: [],
      gpsform:{
        installname:'',
        addressphone:'',
        address: '',
        gpspro: '',
        loanperiod: '',
        gpsname: '',
        remark: '',
        selectedproduct:''
      },
      gpsshow:false,
      showguiid: "",
      showguiid1: "",
      dataimg2: {},
      dataimg1: {},
      zheng,
      bei,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      partyid: "",
      usertype: "",
      imgshowtu1: "",
      imgshowtu2: "",
      havechange: [],
      showcardimg: false,
      changeSave: false,
      changeCardDis: false,
      cardshowtrue: false,
      imgtu1: "",
      imgtu: "",
      uploadHeader: {
        Authorization: "Bearer " + getToken()
      },
      uploadaction:
        window.g.ApiUrl + "S120017/upload?Md5=&sceneid=1200170001&randomstr=",
      uploadaction1:
        window.g.ApiUrl + "S120017/upload?Md5=&sceneid=1200170001&randomstr=",
      cdatedisable: false,
      changeinfo: [],
      showChangeCard: false,
      dataCardList: [],
      valuearea: [],
      moshi: [],
      btndisable: false,
      totype: "",
      showxinxi: false,
      showxiuding: false,
      btnlistenter: [],
      canPrint: [],
      dialogVisible: false,
      imgurl: "",
      contractId: "",
      backFileList: [],
      specialList: [],
      loanclassdis: false,
      invoicecompanydis: false,
      vindis: false,
      enginenodis: false,
      vehicleimodeldis: false,
      paymentbankdis: false,
      paymentnodis: false,
      areadis: false,
      paymentaccountdis: false,
      insurancesdatedis: false,
      insuranceedatedis: false,
      fieldAccessState: {},
      kaihulist: [],
      banklist: [],
      sbdisable: false,
      rulecategory:'',
      ruleForm: {},
      rules: {},
      routeid: this.$route.params.id,
      regilist: provinceAndCityData,
      formLabelWidth: "140px",
      id: this.$route.params.id,
      input5: ""
    };
  },
  methods: {
    doselgpstype() {
      console.log(this.gpsresinfo.gpsproducts)
      let changename = this.gpsresinfo.gpsproducts.find((element)=>element.supplier ==this.gpsform.gpspro)
      this.gpsform.gpsname = changename.name
      this.gpsform.selectedproduct = changename
    },
    doAllgpssub(){
      if(this.isgpsshow){
        let para = {}
        para = this.gpsresinfo
        para.installname = this.gpsform.installname
        para.addressphone = this.gpsform.addressphone
        para.address = this.gpsform.address
        para.loanperiod = this.gpsform.loanperiod
        para.remark = this.gpsform.remark
        para.vin = this.ruleForm.vin
        para.selectedproduct = this.gpsform.selectedproduct 
        postGpsinfo(para).then(res => {
          if(res.data.success){
          
          }else{
            this.$message({
              type: "error",
              message: res.data.message
            });
            return
          }
        })
      }

    },
    doGpsSub(gpsform) {
     
      this.$refs[gpsform].validate((valid) => {
        if (valid) {
          let para = {}
          para = this.gpsresinfo
          para.installname = this.gpsform.installname
          para.addressphone = this.gpsform.addressphone
          para.address = this.gpsform.address
          para.loanperiod = this.gpsform.loanperiod
          para.remark = this.gpsform.remark
          para.selectedproduct = this.gpsform.selectedproduct 
          postGpsinfo(para).then(res => {
            if(res.data.success){
               this.gpsshow = false;
              this.$message({
                type: "success",
                message: '操作成功'
              });
            }else{
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    gpspai() {
      this.gpsshow = true;
      let para = this.contractId
      getGpsinfo(para).then(res => {
        if(res.data.success){
          let resinfo=res.data.data
          this.gpsresinfo = res.data.data
          this.gpsform.installname = resinfo.installname
          this.gpsform.addressphone = resinfo.addressphone
          this.gpsform.address = resinfo.address
          this.gpsform.loanperiod = resinfo.loanperiod
          this.gpsform.remark = resinfo.remark
          this.gpsform.selectedproduct =resinfo.selectedproduct
          if(resinfo.selectedproduct){
            this.gpsform.gpspro = resinfo.selectedproduct.supplier
            this.gpsform.gpsname = resinfo.selectedproduct.name
          }
        }else{
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      })
    },
    beforeupload() {
      this.showguiid = GUID();
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.uploadaction =
            window.g.ApiUrl +
            "S120017/upload/?Md5=&sceneid=1200170001&randomstr=" +
            this.showguiid;
          resolve();
        });
      });
    },
    beforeupload1() {
      this.showguiid1 = GUID();
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.uploadaction1 =
            window.g.ApiUrl +
            "S120017/upload/?Md5=&sceneid=1200170001&randomstr=" +
            this.showguiid1;
          resolve();
        });
      });
    },

    dateFormat1: function(row, column) {
      var name = row[column.property];
      return name ? row["carddate"] : "长期";
    },
    dateFormat: function(row, column) {
      var moment = require("moment");
      var name = row[column.property];
      return name == 1
        ? "长期"
        : moment(row["newcarddate"]).format("YYYY-MM-DD");
    },

    showclick(row) {
      this.showcardimg = true;
      if (row.cardimage) {
        var tu = row.cardimage.split(",");
        this.imgshowtu1 = window.g.ApiUrl + "S120017/download?md5=" + tu[0];
        this.imgshowtu2 = window.g.ApiUrl + "S120017/download?md5=" + tu[1];
      }
    },
    hadleSuccess1(response, file, fileList) {
      // this.form.mD5 = ''
      this.changeinfo.md52 = response.data.md5;
      this.changeinfo.randomstr1 = response.data.randomstr
      this.dataimg2 = response.data;
      this.imgtu1 = URL.createObjectURL(file.raw);
      console.log(response.data.md5);
      this.$message({
        type: "success",
        message: "上传成功"
      });
    },
    hadleSuccess(response, file, fileList) {
      // this.form.mD5 = ''
      this.changeinfo.md51 = response.data.md5;
      this.changeinfo.randomstr2 = response.data.randomstr
      this.dataimg1 = response.data;
      this.imgtu = URL.createObjectURL(file.raw);
      console.log(response.data.md5);
      this.$message({
        type: "success",
        message: "上传成功"
      });
    },
    handleError(response, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败，请联系管理员"
      });
    },
    upcarddate(val) {
      if (val) {
        if (this.changeinfo.carddate) {
          this.changeinfo.carddate = "";
        }
        this.cdatedisable = true;
      } else {
        this.cdatedisable = false;
      }
    },
    doChangeCard() {
      var that = this;
      this.changeCardDis = true;
      let para = {};
      para.partyid = this.partyid; //#endregion
      para.usertype = this.usertype; //#endregion
      para.contractid = this.ruleForm.id; //#endregion
      para.camainid = this.ruleForm.camainid; //#endregion
      para.newvalidflag = this.changeinfo.longe ? true : "false"; //#endregion
      para.newexpireddate = this.changeinfo.carddate; //#endregion
      this.changeinfo.md51 = this.changeinfo.md51 ? this.changeinfo.md51 : "";
      this.changeinfo.md52 = this.changeinfo.md52 ? this.changeinfo.md52 : "";

      if (!this.changeinfo.md51 || !this.changeinfo.md52) {
        that.changeCardDis = false;
        this.$message({
          type: "error",
          message: "请上传身份证影像信息"
        });
        return;
      }
      para.newcardimage = this.changeinfo.md51 + "," + this.changeinfo.md52;
      if (this.changeinfo.longe || this.changeinfo.carddate) {
        UpdateChangeCardInfo(para).then(res => {
          that.changeCardDis = false;
          if (res.data.success) {
            let paraimg = {};
            paraimg = {
              name: this.changeinfo.md51 + "." + this.dataimg1.suffix,
              size: this.dataimg1.size,
              Md5: this.changeinfo.md51,
              RandomStr: this.changeinfo.randomstr1,
              ImCategoryCode: "9901",
              CamainId: that.routeid,
              Scene: "2",
              UploadFrom: "0",
              IsCap: 0,
              MidId: "direct",
              Success: 1
            };
            orderimgsave(paraimg).then(res => {
            }).then(res=>{
              let paraimg2 = {};
              paraimg2 = {
                name: this.changeinfo.md51 + "." + this.dataimg2.suffix,
                size: this.dataimg2.size,
                Md5: this.changeinfo.md52,
                RandomStr: this.changeinfo.randomstr2,
                ImCategoryCode: "9901",
                CamainId: that.routeid,
                Scene: "2",
                UploadFrom: "0",
                IsCap: 0,
                MidId: "direct",
                Success: 1
              };
             
              orderimgsave(paraimg2).then(res => {
                
              });
            });
            
            let parainfo = {};
            parainfo = this.ruleForm.camainid;

            getChangecardInfo(parainfo).then(res => {
              if (res.data.success) {
                this.havechange = res.data.data;
              }
            });
            that.showChangeCard = false;
            this.$message({
              type: "success",
              message: "操作成功"
            });
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        });
      } else {
        that.changeCardDis = false;
        this.$message({
          type: "error",
          message: "必须选择日期"
        });
        return;
      }
    },
    changeClick(row) {
      this.showChangeCard = true;
      var that = this;

      if (this.changeinfo.carddate) {
        this.changeinfo.carddate = "";
      }
      this.changeinfo.longe = false;
      this.cdatedisable = false;
      this.changeinfo.md51 = "";
      this.changeinfo.md52 = "";
      this.imgtu = "";
      this.imgtu1 = "";
      this.partyid = row.id;
      this.usertype = row.type;
    },
    showmsg(type) {
      this.totype = type;
      this.showxinxi = true;
    },
    toConfirm() {
      var that = this;
      var value = JSON.stringify(this.ruleForm);
      let para = {};
      para = JSON.parse(value);
      para.area = this.ruleForm.area[1];
      // var str = this.ruleForm.paymentno;
      // if (str) {
      //   var newstr = str.replace(/\s+/g, "");
      // }

      // para.paymentno = newstr;
      // this.ruleForm.paymentno = newstr;
      postContractSign(para).then(res => {
        if(!res){
          return
        }
        if (res.data.success) {
          localStorage.setItem(
            "contract" + this.routeid,
            JSON.stringify(this.ruleForm)
          );
          orderSignStatus(that.routeid).then(ress=>{
            if (ress.data.success) {
            }else{
              this.$message({
                message: ress.data.message,
                type: "warning"
              });
            }
          })
          if (that.totype == "1") {
            this.$router.push({
              path: "/dealer/creditapproval/yingxiang/" + this.routeid
            });
          } else {
            this.$router.push({
              path: "/dealer/creditapproval/tophoto/" + this.routeid
            });
          }
        } else {
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    },
    setNum(data) {
      data = data
        .replace(/\s/g, "")
        .replace(/[^\d]/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
      this.$set(this.ruleForm, "paymentno", data);
    },
    validateNum(index) {
      this.setNum(index);
    },
    btnenterto(item) {
      var that = this;
      this.$prompt("请输入", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          that.btndisable = true;
          let para = {};
          var base = JSON.stringify(that.ruleForm);
          var baseInfo = JSON.parse(base);
          this.doAllgpssub()
          // var str = this.ruleForm.paymentno;
          // if (str) {
          //   var newstr = str.replace(/\s+/g, "");
          // }

          // baseInfo.paymentno = newstr;
          baseInfo.area = that.ruleForm.area[1];
          var WfCmd = {
            CmdType: item.cmdtype,
            ID: item.id
          };
          para = {
            basicInfo: baseInfo,
            WfCmd: WfCmd,
            Comment: value
          };
          postWfSubmit(para).then(res => {
            that.btndisable = false;
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    toNextDay() {
      var moment = require("moment");
      this.ruleForm.insuranceedate = moment(this.ruleForm.insurancesdate)
        .add(1, "year")
        .subtract(1, "days")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    showimg(md5) {
      this.imgurl = window.g.ApiUrl + "s120017/download?md5=" + md5;
      this.dialogVisible = true;
    },
    toyingxiang() {
      if (!this.sbdisable) {
        this.showmsg(1);
      } else {
        // var str = this.ruleForm.paymentno;
        // if (str) {
        //   var newstr = str.replace(/\s+/g, "");
        // }

        // this.ruleForm.paymentno = newstr;
        localStorage.setItem(
          "contract" + this.routeid,
          JSON.stringify(this.ruleForm)
        );
        this.$router.push({
          path: "/dealer/creditapproval/yingxiang/" + this.routeid
        });
      }
    },
    tokehu() {
      if (!this.sbdisable) {
        let para = {};
        // var str = this.ruleForm.paymentno;
        // if (str) {
        //   var newstr = str.replace(/\s+/g, "");
        // }
        this.doAllgpssub()
        para = {
          camainid: this.ruleForm.camainid,
          camainno: this.ruleForm.camainno,
          dealer: this.ruleForm.dealer,
          signdealer: this.ruleForm.signdealer,
          category: this.ruleForm.category,
          status: this.ruleForm.status,
          insurancesdate: this.ruleForm.insurancesdate,
          insuranceedate: this.ruleForm.insuranceedate,
          applicationdate: this.ruleForm.applicationdate,
          submitdate: this.ruleForm.submitdate,
          loanmoney: this.ruleForm.loanmoney,
          loanperiod: this.ruleForm.loanperiod,
          paymentbank: this.ruleForm.paymentbank,
          paymentaccount: this.ruleForm.paymentaccount,
          paymentno: this.ruleForm.paymentno,
          paymentbranch: this.ruleForm.paymentbranch,
          vin: this.ruleForm.vin,
          engineno: this.ruleForm.engineno,
          applyuser: this.ruleForm.applyuser,
          vehicleimodel: this.ruleForm.vehicleimodel,
          area: this.ruleForm.area[1],
          invoicecompany: this.ruleForm.invoicecompany,
          id: this.ruleForm.id
        };

        postContractSaveCheck(para).then(res => {
          if (res.data.success) {
            this.showmsg(2);
          } else {
            if (res.data.code == "0001") {
              this.$confirm(res.data.message, "提示", {
                confirmButtonText: "继续",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  this.showmsg(2);
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消操作"
                  });
                });
            } else {
              this.$message({
                message: res.data.message,
                type: "warning"
              });
            }
          }
        });
      } else {
        // var str = this.ruleForm.paymentno;
        // if (str) {
        //   var newstr = str.replace(/\s+/g, "");
        // }

        // this.ruleForm.paymentno = newstr;
        localStorage.setItem(
          "contract" + this.routeid,
          JSON.stringify(this.ruleForm)
        );
        this.$router.push({
          path: "/dealer/creditapproval/tophoto/" + this.routeid
        });
      }
    },
    zansave() {
      var that = this;
      that.changeSave = true;
      var moment = require("moment");
      var value = JSON.stringify(this.ruleForm);
      let para = {};
      let parap = {}
      para = JSON.parse(value);
      para.area = this.ruleForm.area[1];
      this.doAllgpssub()
      // var str = this.ruleForm.paymentno;
      // if (str) {
      //   var newstr = str.replace(/\s+/g, "");
      // }

      // para.paymentno = newstr;
      parap = {
          camainid: this.ruleForm.camainid,
          camainno: this.ruleForm.camainno,
          dealer: this.ruleForm.dealer,
          signdealer: this.ruleForm.signdealer,
          category: this.ruleForm.category,
          status: this.ruleForm.status,
          insurancesdate: this.ruleForm.insurancesdate,
          insuranceedate: this.ruleForm.insuranceedate,
          applicationdate: this.ruleForm.applicationdate,
          submitdate: this.ruleForm.submitdate,
          loanmoney: this.ruleForm.loanmoney,
          loanperiod: this.ruleForm.loanperiod,
          paymentbank: this.ruleForm.paymentbank,
          paymentaccount: this.ruleForm.paymentaccount,
          paymentno: this.ruleForm.paymentno,
          paymentbranch: this.ruleForm.paymentbranch,
          vin: this.ruleForm.vin,
          engineno: this.ruleForm.engineno,
          applyuser: this.ruleForm.applyuser,
          vehicleimodel: this.ruleForm.vehicleimodel,
          area: this.ruleForm.area[1],
          invoicecompany: this.ruleForm.invoicecompany,
          id: this.ruleForm.id
      };
      postContractSaveCheck(parap).then(res => {
          if (res.data.success) {
            postContractSave(para).then(res => {
              that.changeSave = false;
              if (res.data.success) {
                this.$message({
                  message: "暂存成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: res.data.message,
                  type: "warning"
                });
              }
            });
          } else {
            if (res.data.code == "0001") {
              this.$confirm(res.data.message, "提示", {
                confirmButtonText: "继续",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  postContractSave(para).then(res => {
                    that.changeSave = false;
                    if (res.data.success) {
                      this.$message({
                        message: "暂存成功",
                        type: "success"
                      });
                    } else {
                      this.$message({
                        message: res.data.message,
                        type: "warning"
                      });
                    }
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消操作"
                  });
                });
            } else {
              this.$message({
                message: res.data.message,
                type: "warning"
              });
            }
          }
        });
    },
    consubmit() {
      var that = this;
      var value = JSON.stringify(this.ruleForm);
      let para = {};
      para = JSON.parse(value);
      para.area = this.ruleForm.area[1];
      // var str = this.ruleForm.paymentno;
      // if (str) {
      //   var newstr = str.replace(/\s+/g, "");
      // }

      // para.paymentno = newstr;
      postContractSubmit(para).then(res => {
        if (res.data.success) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.$router.push({
            path: "/dealer/creditapproval/tofangsuccess/" + that.routeid
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    },
    hetong() {
      let para = {};
      para = {
        contractno: this.ruleForm.camainno,
        type: "contract"
      };
      var tempWindow = window.open("", "_blank", "");
      postPrintCommon(para).then(res => {
        if (res.data.success) {
          var url =
            window.g.ApiUrl +
            "S310011/api/print/" +
            res.data.data.dataid +
            "?grf=" +
            res.data.data.grf +
            "&type=inline&qtype=" +
            res.data.data.qtype +
            "&dataname=" +
            res.data.data.dataname +
            "&_token=Bearer " +
            Cookies.get("Admin-Token");
          tempWindow.location.href = url;
        } else {
          tempWindow.close();
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    },
    gouche() {
      let para = {};
      para = {
        contractno: this.ruleForm.camainno,
        grf: "00001KEFWKGZ6000HADW",
        type: "common"
      };
      var tempWindow = window.open("", "_blank", "");
      postPrintCommon(para).then(res => {
        if (res.data.success) {
          var url =
            window.g.ApiUrl +
            "S310011/api/print/" +
            this.ruleForm.camainno +
            "?grf=" +
            res.data.data.grf +
            "&type=inline&qtype=" +
            res.data.data.qtype +
            "&dataname=" +
            res.data.data.dataname +
            "&_token=Bearer " +
            Cookies.get("Admin-Token");
          tempWindow.location.href = url;
          // var aa = window.open(url)
          // console.log(aa)
        } else {
          tempWindow.close();
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    },
    fujia() {
      let para = {};
      para = {
        contractno: this.ruleForm.camainno,
        grf: "00001JUV7PFX8000HA15",
        type: "common"
      };
      var tempWindow = window.open("", "_blank", "");
      postPrintCommon(para).then(res => {
        if (res.data.success) {
          var url =
            window.g.ApiUrl +
            "S310011/api/print/" +
            this.ruleForm.camainno +
            "?grf=" +
            res.data.data.grf +
            "&type=inline&qtype=" +
            res.data.data.qtype +
            "&dataname=" +
            res.data.data.dataname +
            "&_token=Bearer " +
            Cookies.get("Admin-Token");
          tempWindow.location.href = url;
        } else {
          tempWindow.close();
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    },
    ershou() {
      let para = {};
      para = {
        contractno: this.ruleForm.camainno,
        grf: "00001JO5FPMU7418ZAL1",
        type: "common"
      };
      var tempWindow = window.open("", "_blank", "");
      postPrintCommon(para).then(res => {
        if (res.data.success) {
          var url =
            window.g.ApiUrl +
            "S310011/api/print/" +
            this.ruleForm.camainno +
            "?grf=" +
            res.data.data.grf +
            "&type=inline&qtype=" +
            res.data.data.qtype +
            "&dataname=" +
            res.data.data.dataname +
            "&_token=Bearer " +
            Cookies.get("Admin-Token");
          tempWindow.location.href = url;
        } else {
          tempWindow.close();
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    },
    huankuan() {
      let para = {};
      para = {
        contractno: this.ruleForm.camainno,
        grf: "00001K7FVG4LA418ZAKO",
        type: "common"
      };
      var tempWindow = window.open("", "_blank", "");
      postPrintCommon(para).then(res => {
        if (res.data.success) {
          var url =
            window.g.ApiUrl +
            "S310011/api/print/" +
            this.ruleForm.camainno +
            "?grf=" +
            res.data.data.grf +
            "&type=inline&qtype=" +
            res.data.data.qtype +
            "&dataname=" +
            res.data.data.dataname +
            "&_token=Bearer " +
            Cookies.get("Admin-Token");

          tempWindow.location.href = url;
        } else {
          tempWindow.close();
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    },
    huakuan() {
      let para = {};
      para = {
        contractno: this.ruleForm.camainno,
        type: "transfer"
      };
      var tempWindow = window.open("", "_blank", "");
      postPrintCommon(para).then(res => {
        if (res.data.success) {
          var url =
            window.g.ApiUrl +
            "S310011/api/print/" +
            this.ruleForm.camainno +
            "?grf=" +
            res.data.data.grf +
            "&type=inline&qtype=" +
            res.data.data.qtype +
            "&dataname=" +
            res.data.data.dataname +
            "&_token=Bearer " +
            Cookies.get("Admin-Token");
          tempWindow.location.href = url;
        } else {
          tempWindow.close();
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    },
    init() {
      var that = this;
      // eslint-disable-next-line
      this.banklist = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001HI9K2U890000A0S"
      ];
      this.moshi = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001L4P0E1XJ0000A0D"
      ];
      this.arealist = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001HLABTHDE0000A1H"
      ];
      this.gpstype = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001NN68LHZ40000A14"
      ];

      var area = this.arealist.filter(item => item.pcode == "0");
      var city = this.arealist.filter(item => item.pcode != "0");

      area.forEach(function(valuearea, indexarea, arrayarea) {
        valuearea.children = [];
        valuearea.value = valuearea.code;
        valuearea.label = valuearea.name;
        city.forEach(function(value, index, array) {
          if (value.pcode == valuearea.code) {
            value.value = value.code;
            value.label = value.name.split("/").pop();
            valuearea.children.push(value);
          }
        });
      });

      that.valuearea = area;
      let para = {};
      para = this.routeid;

      getPrintBtn(para).then(res => {
        if (res.data.success) {
          this.canPrint = res.data.data;
        }
      });

      getLoaninfo(para).then(res => {
        if (res.data.success) {
          this.contractId = res.data.data.contractId;
          this.isgpsshow = res.data.data.gpsflag
          if(res.data.data.gpsflag){
            // gps
            let paragps = res.data.data.contractId;
            getGpsinfo(paragps).then(resgps => {
              if(resgps.data.success){
                let resinfo=resgps.data.data
                that.gpsresinfo = resgps.data.data
                that.gpsform.installname = resinfo.installname
                that.gpsform.addressphone = resinfo.addressphone
                that.gpsform.address = resinfo.address
                that.gpsform.loanperiod = resinfo.loanperiod
                that.gpsform.remark = resinfo.remark
                that.gpsform.selectedproduct =resinfo.selectedproduct
                if(resinfo.selectedproduct){
                  that.gpsform.gpspro = resinfo.selectedproduct.supplier
                  that.gpsform.gpsname = resinfo.selectedproduct.name
                }
              }else{
                this.$message({
                  type: "error",
                  message: resgps.data.message
                });
              }
            })
            // gps
          }

          this.backFileList = res.data.data.backFileList.data;
          this.specialList = res.data.data.specialList.data;
          this.ruleForm = res.data.data.basicInfo;
          this.rulecategory = res.data.data.basicInfo.category
          if (this.ruleForm.status == 4 || this.ruleForm.status == 11) {
            this.cardshowtrue = true;
          } else {
            this.cardshowtrue = false;
          }
          let parainfo = {};
          parainfo = res.data.data.basicInfo.camainid;
          getPartyInfo(parainfo).then(ress => {
            if (ress.data.success) {
              this.dataCardList = ress.data.data;
              // this.dataCardList[0].carddate = ''
            }
          });

          getChangecardInfo(parainfo).then(res => {
            if (res.data.success) {
              this.havechange = res.data.data;
            }
          });

          // if (this.ruleForm && this.ruleForm.paymentno) {
          //   this.ruleForm.paymentno = this.ruleForm.paymentno
          //     .replace(/\s/g, "")
          //     .replace(/(.{4})/g, "$1 ");
          // }
          if (this.ruleForm.status == 4) {
            getLoanCurrentTaskCmd(para).then(res => {
              if (res.data.success) {
                that.btnlistenter = res.data.data;
                that.showxiuding = true;
              }
            });
          }
          if (
            this.ruleForm.status == 11 ||
            this.ruleForm.status == 12 ||
            this.ruleForm.status == 4
          ) {
            that.sbdisable = false;
          } else {
            that.sbdisable = true;
          }
          this.fieldAccessState = res.data.data.fieldAccessState;
          if (this.fieldAccessState.invoicecompany == 2) {
            that.invoicecompanydis = true;
          }
          if (this.fieldAccessState.vin == 2) {
            that.vindis = true;
          }
          if (this.fieldAccessState.engineno == 2) {
            that.enginenodis = true;
          }
          if (this.fieldAccessState.vehicleimodel == 2) {
            that.vehicleimodeldis = true;
          }
          if (this.fieldAccessState.loanclass == 2) {
            that.loanclassdis = true;
          }
          if (this.fieldAccessState.paymentbank == 2) {
            that.paymentbankdis = true;
          }
          if (this.fieldAccessState.paymentno == 2) {
            that.paymentnodis = true;
          }
          if (this.fieldAccessState.area == 2) {
            that.areadis = true;
          }
          if (this.fieldAccessState.paymentaccount == 2) {
            that.paymentaccountdis = true;
          }
          if (this.fieldAccessState.insurancesdate == 2) {
            that.insurancesdatedis = true;
          }
          if (this.fieldAccessState.insuranceedate == 2) {
            that.insuranceedatedis = true;
          }
          getArtys(res.data.data.contractId).then(resa => {
            this.kaihulist = resa.data.data.data;
          });
          if (res.data.data.basicInfo.insuranceedate == "0001-01-01 00:00:00") {
            this.ruleForm.insuranceedate = "";
          }
          if (res.data.data.basicInfo.insurancesdate == "0001-01-01 00:00:00") {
            this.ruleForm.insurancesdate = "";
          }
          if (res.data.data.basicInfo.submitdate == "0001-01-01 00:00:00") {
            this.ruleForm.submitdate = "";
          }
          if (
            res.data.data.basicInfo.applicationdate == "0001-01-01 00:00:00"
          ) {
            this.ruleForm.applicationdate = "";
          }
          if (
            res.data.data.basicInfo.area &&
            res.data.data.basicInfo.area.length > 0
          ) {
            console.log(res.data.data.basicInfo.area);
            this.ruleForm.area = [
              this.ruleForm.area.substring(0, 2),
              this.ruleForm.area
            ];
          } else {
            that.ruleForm.area = [];
          }
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    }
  },
  filters: {
    datetoformat: function(value) {
      var moment = require("moment");
      value = moment(value).format("YYYY-MM-DD");

      return value;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.imagePost {
  width: 192px;
  height: 122px;
}
.showimg {
  color: #108ee9;
  cursor: pointer;
}
.dropdownprint {
  top: 136px !important;
}
.midcontent {
  padding-top: 30px;
  margin-top: 8x;
  background-color: #ffffff;
  margin-bottom:8px;
  padding-bottom: 80px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #cccccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #cccccc;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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