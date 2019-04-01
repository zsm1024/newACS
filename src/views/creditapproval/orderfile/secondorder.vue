<template>
  <section style="margin-top:5px;position:relative;">
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
            <img src="@/assets/images/usedcar.png">
            <span v-if="!userinfo.name">客户姓名</span>
            <span v-else>{{userinfo.name}}</span>
            <span v-if="!userinfoapplicationno">GW-A000000000</span>
            <span v-else>{{userinfoapplicationno}}</span>
          </div>
          <el-col
            class="topbtnbasic"
            style="margin:1px 0 8px 0"
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
              style="width: 60px"
              :disabled="changeSave"
              @click="zhansave"
            >暂存</el-button>
            <el-button
              v-if="!sbdisable"
              type="success"
              size="small"
              class="btnnextcolor"
              style="width: 60px"
              @click="totianxie"
            >下一步</el-button>
          </el-col>
        </div>
      </div>
    </div>
    <div>
      <el-row>
        <el-col :span="10">
          <el-breadcrumb
            separator="/"
            class="app-breadcrumb"
          >
            <el-breadcrumb-item class="firstbread">信贷审批</el-breadcrumb-item>
            <el-breadcrumb-item>
              <router-link
                style="color:#606266 !important;font-weight:400"
                :to="{path:'/dealer/creditapproval/orderlist'}"
              >订单管理</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>二手车贷</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col
          :span="7"
          class="topbtnbasic"
          style="margin:1px 0 8px 0;float:right"
        >
          <el-button
            type="success"
            class="btnnextcolor"
            size="small"
            v-show="btnlistenter.length"
            v-for="(item,index) in btnlistenter"
            :disabled="btndisable"
            :key="index"
            @click="btnenterto(item)"
          >{{item.cmddis}}</el-button>
          <el-button
            v-if="!sbdisable"
            type="success"
            size="small"
            :disabled="changeSave"
            class="btnnextcolor"
            style="width: 60px"
            @click="zhansave"
          >暂存</el-button>
          <el-button
            v-if="!sbdisable"
            type="success"
            size="small"
            class="btnnextcolor"
            style="width: 60px"
            @click="totianxie"
          >下一步</el-button>
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
            <Step title="基本信息">
              <li style="width:100px;height:20px;margin-top:-25px;cursor:pointer">基本信息</li>
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
              <li
                @click="toyingxiang()"
                style="width:100px;height:20px;margin-top:-25px;cursor:pointer"
              >影像资料</li>
            </Step>
          </Steps>
        </el-col>
      </el-row>
    </div>
    <div v-loading="isLoading">
      <el-row class="midcontent">
        <el-col :span="24">
          <div
            class="siderbarhref"
            ref="slide"
            v-show="liuyancount>0"
          >
            <ul>
              <el-badge
                :value="liuyancount"
                class="item"
              >
                <li
                  style="height:50px"
                  class="liliu"
                  @click="toliuyan"
                >
                  <img
                    class="liuyan"
                    :src="yan"
                    alt
                    srcset
                  >
                </li>
              </el-badge>
            </ul>
          </div>
          <el-form
            size="medium"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-position="right"
            :disabled="sbdisable"
            label-width="130px"
            class="conterdetail secondcalss"
          >
            <el-collapse v-model="activeNames">
              <el-collapse-item
                name="1"
                class="noline"
              >
                <template slot="title">
                  <span
                    class="titleleft"
                    style="color:#507ACD;font-weight: bold;font-size:14px"
                  >经销商信息</span>
                </template>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="信贷专员"
                      prop="basic.CREDITOFFICER"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                      
                    ]"
                    >
                      <el-select
                        size="small"
                        v-model="ruleForm.basic.CREDITOFFICER"
                        filterable
                        @focus="xindaisearch"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in credits"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="销售专员"
                      prop="basic.SALEUSER"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                      
                    ]"
                    >
                      <el-select
                        size="small"
                        v-model="ruleForm.basic.SALEUSER"
                        filterable
                        @focus="salesearch"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in sales"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="销售总监">
                      <el-select
                        size="small"
                        :loading="loading"
                        :class="{qxiaozi:qxiaozi}"
                        v-model="ruleForm.basic.saledirector"
                        filterable
                        @focus="saledirectsearch"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in saledirectorlist"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注">
                      <el-input
                        v-model="ruleForm.basic.MEMO"
                        type="textarea"
                        :rows="1"
                        placeholder="请输入内容"
                        maxlength="110"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item
                name="2"
                class="noline"
              >
                <template slot="title">
                  <span
                    class="titleleft"
                    style="color:#507ACD;font-weight: bold;font-size:14px"
                  >资产信息</span>
                </template>
                <el-row></el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="制造厂名称"
                      prop="basic.MAKER"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        v-model="ruleForm.basic.MAKER"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="车辆类型"
                      prop="basic.CARDTYPE"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        placeholder="例如：小型普通客车"
                        v-model="ruleForm.basic.CARDTYPE"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="品牌型号"
                      prop="basic.BRAND"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        placeholder="例如：大众朗行"
                        v-model="ruleForm.basic.BRAND"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="车辆配置"
                      prop="basic.CONFIGURE"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        placeholder="例如：豪华型"
                        v-model="ruleForm.basic.CONFIGURE"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="车身颜色"
                      prop="basic.COLOR"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        placeholder="例如：白"
                        v-model="ruleForm.basic.COLOR"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="车架号"
                      prop="basic.VIN"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        v-model="ruleForm.basic.VIN"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="发动机号"
                      prop="basic.ENGINENO"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        v-model="ruleForm.basic.ENGINENO"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="燃油种类"
                      prop="basic.FUELTYPE"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                    ]"
                    >
                      <el-select
                        v-model="ruleForm.basic.FUELTYPE"
                        size="small"
                        placeholder
                      >
                        <el-option
                          v-for="item in ranyou"
                          :key="item.CODE"
                          :label="item.NAME"
                          :value="item.CODE"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="排量"
                      prop="basic.DISPLACEMENT"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                    ]"
                    >
                      <el-input
                        size="small"
                        placeholder="例如：2.0T/L"
                        v-model="ruleForm.basic.DISPLACEMENT"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="变速器"
                      prop="basic.TRANSMISSION"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                    ]"
                    >
                      <el-select
                        v-model="ruleForm.basic.TRANSMISSION"
                        size="small"
                        placeholder
                      >
                        <el-option
                          v-for="item in biansqi"
                          :key="item.CODE"
                          :label="item.NAME"
                          :value="item.CODE"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="使用性质"
                      prop="basic.USETYPE"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                    ]"
                    >
                      <el-select
                        v-model="ruleForm.basic.USETYPE"
                        size="small"
                        placeholder
                      >
                        <el-option
                          v-for="item in xingzhi"
                          :key="item.CODE"
                          :label="item.NAME"
                          :value="item.CODE"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="核定载客"
                      prop="basic.SEATNUMBER"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        v-model="ruleForm.basic.SEATNUMBER"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >人</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="二手车销售价格"
                      prop="basic.INVOICEPRICE"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                      { validator: isvalidateMoney,  trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        @blur="tojisuan('ALLMONEY')"
                        v-model="ruleForm.basic.INVOICEPRICE"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >元</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="新车购车价格"
                      prop="basic.PRICENEW"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                      { validator: isvalidateMoney,  trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        v-model="ruleForm.basic.PRICENEW"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >元</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="8">
                    <el-form-item
                      label="第三方评估价格"
                      prop="basic.PRICETHIRDPARTY"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                      { validator: isvalidateMoney,  trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        v-model="ruleForm.basic.PRICETHIRDPARTY"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >元</i>
                      </el-input>
                    </el-form-item>
                  </el-col> -->
                </el-row>
              </el-collapse-item>
              <el-collapse-item
                name="2"
                class="noline"
              >
                <template slot="title">
                  <span
                    class="titleleft"
                    style="color:#507ACD;font-weight: bold;font-size:14px"
                  >车辆手续</span>
                </template>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="车牌号"
                      prop="basic.PLATENUMBER"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        v-model="ruleForm.basic.PLATENUMBER"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="评估师">
                      <el-select
                        v-model="ruleForm.basic.APPRAISER"
                        size="small"
                        placeholder
                      >
                        <el-option
                          v-for="item in pinggushi"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="售车人姓名"
                      prop="basic.SALERNAME"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        v-model="ruleForm.basic.SALERNAME"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="售车人电话"
                      prop="basic.SALERPHONE"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        v-model="ruleForm.basic.SALERPHONE"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="售车人地址"
                      prop="basic.SALERADDRESS"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        size="small"
                        v-model="ruleForm.basic.SALERADDRESS"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="表显里程"
                      prop="basic.MILEAGE"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                    ]"
                    >
                      <el-input
                        type="number"
                        @mousewheel.native.prevent
                        size="small"
                        placeholder="例如：10000公里"
                        v-model="ruleForm.basic.MILEAGE"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >公里</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="注册地"
                      prop="basic.REGISTERAREA"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                    ]"
                    >
                      <el-cascader
                        style="width:100%"
                        size="small"
                        :options="valuearea"
                        v-model="ruleForm.basic.REGISTERAREA"
                      ></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="首次登记日"
                      prop="basic.FIRSTDATE"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                    ]"
                    >
                      <el-date-picker
                        v-model="ruleForm.basic.FIRSTDATE"
                        size="small"
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        type="date"
                        placeholder="选择日期"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="一年内过户次数"
                      prop="basic.TRANSFERCOUNT"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                    ]"
                    >
                      <el-input
                        size="small"
                        v-model="ruleForm.basic.TRANSFERCOUNT"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      label="总过户次数"
                      prop="basic.ALLTRANSFERCOUNT"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                    ]"
                    >
                      <el-input
                        size="small"
                        v-model="ruleForm.basic.ALLTRANSFERCOUNT"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="购车目的"
                      prop="basic.PURPOSE"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                    ]"
                    >
                      <el-select
                        v-model="ruleForm.basic.PURPOSE"
                        size="small"
                        placeholder
                      >
                        <el-option
                          v-for="item in gouchemudi"
                          :key="item.CODE"
                          :label="item.NAME"
                          :value="item.CODE"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      label="上牌地点"
                      prop="basic.CARDADDRESS"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                    ]"
                    >
                      <el-cascader
                        style="width:100%"
                        size="small"
                        :options="valuearea"
                        v-model="ruleForm.basic.CARDADDRESS"
                      ></el-cascader>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      label="是否改装"
                      prop="basic.ISREFIT"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                    ]"
                    >
                      <el-radio
                        v-model="ruleForm.basic.ISREFIT"
                        label="1"
                      >是</el-radio>
                      <el-radio
                        v-model="ruleForm.basic.ISREFIT"
                        label="0"
                      >否</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item
                name="3"
                class="noline"
              >
                <template slot="title">
                  <!-- <span> -->
                  <span style="color:#507ACD;font-weight: bold;font-size:14px">金融产品</span>
                  <span style="font-size:12px;padding-left:87px;color:red" v-if="financialInfo.reasondetail">{{ financialInfo?financialInfo.reasondetail : ''}}</span>
                  <!-- <span
                  style="font-size:10px;padding-left:87px;color:red"
                >{{ financialInfo?financialInfo.reasondetail : ''}}</span> -->
                  <!-- </span> -->
                </template>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="产品"
                      prop="basic.FNPRODUCT"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'change' },
                      
                    ]"
                    >
                      <el-select
                        :class="{qxiaozi:qxiaozi}"
                        v-model="ruleForm.basic.FNPRODUCT"
                        :loading="loading"
                        @focus="productsearch"
                        size="small"
                        placeholder
                        @change="upjinrong"
                      >
                        <el-option
                          v-for="item in producelist"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                </el-row>
                <el-row v-show="fujiatag">
                  <el-col
                    :span="24"
                    v-if="!sbdisable"
                  >
                    <el-form-item label="附加">
                      <el-input
                        size="small"
                        class="fujia"
                        v-model="ruleForm.basic.VEHICLEEXS"
                        readonly="readonly"
                      >
                        <i
                          class="el-icon-error el-input__icon"
                          slot="suffix"
                          @click="qkfujia"
                        ></i>
                        <el-button
                          slot="append"
                          icon="el-icon-search"
                          @click="fujiaadd"
                        ></el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col
                    :span="24"
                    v-else
                  >
                    <el-form-item label="附加">
                      <el-input
                        size="small"
                        v-model="ruleForm.basic.VEHICLEEXS"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="附加价格">
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.VEHICLEEXPRICE"
                        :disabled="true"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >元</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="合同价格"
                      prop="basic.jdata.allmoney"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                      
                    ]"
                    >
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.allmoney"
                        :disabled="true"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >元</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="贷款期限"
                      prop="basic.jdata.loanperiod"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                      
                    ]"
                    >
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.loanperiod"
                        @blur="tojisuan('loanperiod')"
                      >
                       <i slot="suffix" >{{paymentfrelist.find(f=> f.id==ruleForm.basic.jdata.paymentfrequency)?paymentfrelist.find(f=> f.id==ruleForm.basic.jdata.paymentfrequency).name:''}}</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="贴息比率">
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.discount"
                        :disabled="true"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >%</i>
                      </el-input>
                      <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.discount != ruleForm.basic.jdata.discount)?financialInfoEx.discount+'%' : ''}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="首付比例"
                      prop="basic.jdata.downratio"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                      
                    ]"
                    >
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.downratio"
                        @blur="tojisuan('downratio')"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >%</i>
                      </el-input>
                      <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.downratio!= ruleForm.basic.jdata.downratio )?financialInfoEx.downratio+'%' : ''}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="首付金额"
                      prop="basic.jdata.downamount"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                      
                    ]"
                    >
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.downamount"
                        @blur="tojisuan('downamount')"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >元</i>
                      </el-input>
                      <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.downamount!=ruleForm.basic.jdata.downamount) ?financialInfoEx.downamount : ''}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-show="isshowwei">
                  <el-col :span="12">
                    <el-form-item label="尾款比例">
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.tailratio"
                        :disabled="true"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >%</i>
                      </el-input>
                      <span class="xiaozi">{{ (financialInfoEx &&financialInfoEx.tailratio!=ruleForm.basic.jdata.tailratio) ?financialInfoEx.tailratio+'%' : ''}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="尾款金额">
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.tailamount"
                        :disabled="true"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >元</i>
                      </el-input>
                      <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.tailamount != ruleForm.basic.jdata.tailamount)?financialInfoEx.tailamount : ''}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col
                    :span="12"
                    v-if="isFullRate"
                  >
                    <el-form-item label="厂商最高贴息额">
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.firmDiscountPrice"
                        :disabled="true"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >元</i>
                      </el-input>
                      <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.firmDiscountPrice !=ruleForm.basic.jdata.firmDiscountPrice)?financialInfoEx.firmDiscountPrice : ''}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col
                    :span="12"
                    v-if="isFullRate"
                  >
                    <el-form-item label="厂商实际贴息额">
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.discountprice2"
                        :disabled="true"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >元</i>
                      </el-input>
                      <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.discountprice2 != ruleForm.basic.jdata.discountprice2)?financialInfoEx.discountprice2 : ''}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row>
            <el-col :span="12"> -->
                <!-- <el-form-item label="经销商贴息额" v-if="isFullRate">
                <el-input
                  :class="{qxiaozi:qxiaozi}"
                  size="small"
                  v-model="ruleForm.basic.jdata.dealerdiscountprice"
                  @blur="tojisuan('dealerdiscountprice')"
                >
                  <i slot="suffix" class="moneyCompany">元</i>
                </el-input>
                <span
                  class="xiaozi"
                >{{ (financialInfoEx && financialInfoEx.dealerdiscountprice !=ruleForm.basic.jdata.dealerdiscountprice)?financialInfoEx.dealerdiscountprice : ''}}</span>
              </el-form-item>
              <el-form-item label="经销商贴息额" v-else>
                <el-input
                  :class="{qxiaozi:qxiaozi}"
                  size="small"
                  v-model="ruleForm.basic.jdata.dealerdiscountprice"
                  :disabled="true"
                >
                  <i slot="suffix" class="moneyCompany">元</i>
                </el-input>
                <span
                  class="xiaozi"
                >{{ (financialInfoEx && financialInfoEx.dealerdiscountprice !=ruleForm.basic.jdata.dealerdiscountprice)?financialInfoEx.dealerdiscountprice : ''}}</span>
              </el-form-item> -->
                <!-- </el-col>
            
          </el-row> -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="月供金额"
                      prop="basic.jdata.firstpayment"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                      
                    ]"
                    >
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.firstpayment"
                        :disabled="true"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >元</i>
                      </el-input>
                      <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.firstpayment !=ruleForm.basic.jdata.firstpayment)?financialInfoEx.firstpayment : ''}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="贷款金额"
                      prop="basic.jdata.loanmoney"
                      :rules="[
                      { required: true, message: '请输入', trigger: 'blur' },
                      
                    ]"
                    >
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.loanmoney"
                        @blur="tojisuan('loanmoney')"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >元</i>
                      </el-input>
                      <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.loanmoney != ruleForm.basic.jdata.loanmoney)?financialInfoEx.loanmoney : ''}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="客户利率">
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.customerrate"
                        :disabled="true"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >%</i>
                      </el-input>
                      <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.customerrate != ruleForm.basic.jdata.customerrate)?financialInfoEx.customerrate+'%' : ''}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="利息总金额">
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.interest"
                        :disabled="true"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >元</i>
                      </el-input>
                      <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.interest != ruleForm.basic.jdata.interest)?financialInfoEx.interest : ''}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                   <el-col :span="12">
                    <el-form-item label="贴息总金额">
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.discountprice"
                        :disabled="true"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >元</i>
                      </el-input>
                      <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.discountprice != ruleForm.basic.jdata.discountprice )?financialInfoEx.discountprice : ''}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="总利率">
                      <el-input
                        :class="{qxiaozi:qxiaozi}"
                        size="small"
                        v-model="ruleForm.basic.jdata.actualrate"
                        :disabled="true"
                      >
                        <i
                          slot="suffix"
                          class="moneyCompany"
                        >%</i>
                      </el-input>
                      <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.actualrate != ruleForm.basic.jdata.actualrate)?financialInfoEx.actualrate : ''}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                 
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-form>
        </el-col>
      </el-row>
      <el-row style="background-color:#fff;padding-bottom:8px;border-radius: 4px;">
        <el-row class="outlinetable">
          <el-collapse v-model="activeNames">
            <el-collapse-item
              name="4"
              class="noline"
            >
              <template slot="title">
                <span style="color:#507ACD;font-weight: bold;font-size:14px">还款计划</span>
              </template>
              <el-table
                :data="datalist"
                :header-cell-style="{background:'#F7F7F7',color:'#333'}"
                style="width:1152px;margin:0 auto"
              >
                <el-table-column width="158"></el-table-column>
                <el-table-column
                  prop="startno"
                  label="开始期数"
                  width="386"
                ></el-table-column>
                <el-table-column
                  prop="endno"
                  label="结束期数"
                  width="394"
                ></el-table-column>
                <el-table-column
                  prop="payment"
                  label="月供"
                ></el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-row>
      </el-row>
    </div>
    <el-dialog
      :title="fujiadaititle"
      :visible.sync="fujiatan"
    >
      <el-row v-show="fujiadai">
        <el-table
          :data="fujialist"
          style="width: 100%"
        >
          <el-table-column
            prop="exname"
            label="项目"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="exprice"
            label="金额"
            width="250"
          >
            <template slot-scope="scope">
              <el-input
                size="small"
                @blur="sbfujiajin(scope)"
                v-model="scope.row.exprice"
              >
                <i
                  slot="suffix"
                  class="moneyCompany"
                >元</i>
              </el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column
                prop="exratio"
                label="比例">
<template slot-scope="scope">
  <el-input size="small" @blur="sbfujiabi(scope)" v-model="scope.row.exratio">
    <i slot="suffix" class="moneyCompany">%</i></el-input>
</template>
          </el-table-column>-->
        </el-table>
      </el-row>
      <div>
        <!-- <p style="color:red">
          1、附加贷仅适用于新车；<br /> 2、首付比例设定同金融产品，但以车辆开票价及附加品费用合计为基数计算；

          <br /> 3、附加品总额不能超过(车辆指导价或车辆售价中较低的金额）的15%；

          <br /> 4、贷款额限定为【(车辆指导价或车辆售价中较低的金额) + 附加价格】的80%；<br /> 5、购置税不能超（车辆开票价÷(1+16%)× 10%）。<br />
        </p>-->
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="fujiatan = false">取 消</el-button>
        <el-button
          type="primary"
          @click="fujiasub"
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
            >
              审批专员 &nbsp;
              <span>{{item.cdate}}</span>
            </p>
            <p
              class="msgtitleword"
              v-else
              align="right"
            >
              信贷专员 &nbsp;
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
    <el-dialog
      title="信息确认"
      :visible.sync="showxinxi"
      width="720px"
      center
    >
      <span>
        <el-form :inline="true">
          <div style="text-align:center;color:red">请确认申请信息，协议签署后将不能再修改，确认签署吗？</div>
          <br>
          <el-form-item
            label="品牌："
            label-width="130px"
            prop="name"
          >
            <span>{{maker}}</span>
          </el-form-item>
          <el-form-item
            label="车型："
            label-width="130px"
            prop="name"
          >
            <span>{{brand}}</span>
          </el-form-item>
          <el-form-item
            label="款式："
            label-width="130px"
            prop="name"
          >
            <span>{{stylename}}</span>
          </el-form-item>
          <el-form-item
            label="产品："
            label-width="130px"
            prop="name"
          >
            <span>{{product}}</span>
          </el-form-item>
          <el-form-item
            label="贷款金额："
            label-width="130px"
            prop="name"
          >
            <span>{{money}}</span>
          </el-form-item>
          <el-form-item
            label="贷款期限："
            label-width="130px"
            prop="name"
          >
            <span>{{period}}</span>
          </el-form-item>
          <el-form-item
            label="月还款金额首期："
            label-width="130px"
            prop="name"
          >
            <span>{{firstpayment}}</span>
          </el-form-item>
          <el-form-item
            label="借款人姓名："
            label-width="130px"
            prop="name"
          >
            <span>{{name}}</span>
          </el-form-item>
          <el-form-item
            label="证件号码："
            label-width="130px"
            prop="name"
          >
            <span>{{idcard}}</span>
          </el-form-item>

          <el-form-item
            label="个人电话："
            label-width="130px"
            prop="name"
          >
            <span>{{perphone}}</span>
          </el-form-item>
          <el-form-item
            label="公司电话："
            label-width="130px"
            prop="name"
          >
            <span>{{telphone}}</span>
          </el-form-item>
          <el-form-item
            v-if="fujiachanpin"
            label="附加产品："
            label-width="130px"
            prop="name"
          >
            <span>{{fujiachanpin}}</span>
          </el-form-item>
          <el-form-item
            v-if="fujiajiage"
            label="附加价格："
            label-width="130px"
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
import { getSaleDirector } from "@/api/credit";
import { getsaledirectslist } from "@/api/basic";
import { isObjectValueEqual, collectFirst } from "@/utils/index";
import yan from "@/assets/images/icon_liuyan.png";
import msgfasong from "@/assets/images/msgfasong.png";
import msgshow from "@/assets/images/msgshow.png";
import {
  getProductlist,
  getSale,
  getCredit,
  orderInfo,
  getMaker,
  getBrand,
  getStyle,
  getAdditional,
  upAdditional,
  orderSave,
  getCurrentTaskCmd,
  postRevisepause,
  postConditionalapproval,
  getMsglist,
  postaddMsg,
  orderSavesub,
  getfinancialInfo,
  getApplist,
  getProductlistTwo,
  orderSign,
  delAdditional
} from "@/api/credit";
import { provinceAndCityData } from "element-china-area-data";
export default {
  inject: ["reload"],
  data() {
    // eslint-disable-next-line
    var isvalidateMoney = (rule, value, callback) => {
      if (value !== "") {
        if (
          !/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value)
        ) {
          callback(new Error("最多保留两位小数!"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      isLoading: true,
      activeNames: ["1", "2", "3", "4"],
      paymentfrelist: [
        {
          name: "月",
          id: "1"
        },
        {
          name: "年",
          id: "2"
        }
      ],
      isFullRate: false,
      changeSave: false,
      fujiadaititle: "",
      valuearea: [],
      fujiajiage: "",
      fujiachanpin: "",
      saledirectorlist: [],
      yan,
      financialInfo: {},
      btndisable: false,
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
      liuyancount: "",
      isvalidateMoney,
      pinggushi: [],
      ranyou: [],
      xingzhi: [],
      biansqi: [],
      loading: false,
      itemmsg: [],
      formdesc: "",
      modal3: false,
      btnlistenter: [],
      qxiaozi: false,
      financialInfoEx: {},
      routeid: this.$route.params.id,
      fujialist: [],
      datalist: [],
      fujiadai: true,
      defaultData: {},
      fujiatag: false,
      isshowwei: true,
      contentlist: {},
      regilist: provinceAndCityData,
      sbdisable: false,
      fujiatan: false,
      gouchemudi: "",
      producelist: [],
      kuanshilist: [],
      chexinglist: [],
      brandlist: [],
      makerlist: [],
      credits: [],
      sales: [],
      formLabelWidth: "100px",
      value: "",
      value5: [],
      checked: "",
      ruleForm: {
        basic: {
          type: "",
          // 销售总监
          saledirector: "",
          // 制造厂品牌
          MAKER: "",
          // 车辆类型
          CARDTYPE: "",
          // 品牌车型
          BRAND: "",
          // 车辆配置
          CONFIGURE: "",
          // 车辆颜色
          COLOR: "",
          // 车架号
          VIN: "",
          // 发动机号
          ENGINENO: "",
          // 燃油种类
          FUELTYPE: "",
          // 排量
          DISPLACEMENT: "",
          // 变速器
          TRANSMISSION: "",
          // 使用性质
          USETYPE: "",
          // 核定载客
          SEATNUMBER: "",
          // 二手车销售价格
          INVOICEPRICE: 0,
          // 新车购车价格
          PRICENEW: 0,
          PRICETHIRDPARTY: 0,
          // 车牌号
          PLATENUMBER: "",
          // 评估师
          APPRAISER: "",
          // 售车人姓名
          SALERNAME: "",
          // 售车人联系电话
          SALERPHONE: "",
          // 售车人联系地址
          SALERADDRESS: "",
          // 表显里程（公里）
          MILEAGE: "",
          // 注册地
          REGISTERAREA: [],
          // 首次登记日
          FIRSTDATE: "",
          // 一年内过户次数
          TRANSFERCOUNT: "",
          // 总过户次数
          ALLTRANSFERCOUNT: "",
          // 购车目的
          PURPOSE: "",
          // 上牌地点
          CARDADDRESS: [],
          // 是否改装
          ISREFIT: "",
          dealerid: "",
          signdealerid: "",
          applyuserid: "",
          applyuserpid: "",
          // 一级经销商
          DEALER: "",
          // 二级经销商
          SIGNDEALER: "",
          // 当前用户
          APPLYUSER: "",
          // 信贷专员姓名
          CREDITOFFICER: "",
          // 销售专员
          SALEUSER: "",
          // 经销商
          ACTULDEALER: "",
          // 信贷专员电话
          APPLYUSERP: "",
          // 备注
          MEMO: "",
          // 款式
          STYLE: "",
          // 指导价
          GUIDEPRICE: "",
          // 上牌地点
          REGISTRATION: [],
          ID: "",
          APPLICATIONNO: localStorage.getItem("orderId" + this.routeid),
          // 产品
          FNPRODUCT: "",
          // 附加
          VEHICLEEXS: "",
          ALLMONEY: "",
          // 附加价格
          VEHICLEEXPRICE: 0,
          jdata: {
            dealerdiscountprice: 0,
            discountprice2: 0,
            firmDiscountPrice: 0,
            PAYMENTFREQUENCYNAME: "",
            FNPRODUCT09: "",
            FNPRODUCT10: "",
            FNPRODUCT12: "",
            VEHICLEEXS: "",
            FNPRODUCT: "",
            APPLICATIONNO: localStorage.getItem("orderId" + this.routeid),
            INVOICEPRICE: 0,
            VEHICLEEXPRICE: 0,
            // 合同价格
            allmoney: 0,
            // 贷款期限
            loanperiod: 0,
            // 还款频率
            paymentfrequency: 0,
            // 首付比例
            downratio: 0,
            // 首付金额
            downamount: 0,
            // 尾款比例
            tailratio: 0,
            // 尾款金额
            tailamount: 0,
            // 月供金额
            firstpayment: 0,
            // 贷款金额
            loanmoney: 0,
            // 客户利率
            customerrate: 0,
            // 利息总金额
            interest: 0,
            // 贴息比率
            discount: 0,
            // 贴息比率
            discountprice: 0,
            // 总利率
            actualrate: 0
          }
        }
      },
      rules: {},
      tmpJisuan: {},
      msgimg: msgshow,
      msgfasong: msgfasong,
      msgshow: msgshow,
      navtitletogle: false,
      userinfo: {},
      userinfoapplicationno: "",
      nextSubmit: false
    };
  },
  computed: {
    currentJisuan: function() {
      return {
        INVOICEPRICE: this.ruleForm.basic.INVOICEPRICE, // 二手车销售价格
        VEHICLEEXPRICE: this.ruleForm.basic.VEHICLEEXPRICE, // 附加价格
        loanperiod: this.ruleForm.basic.jdata.loanperiod, // 贷款期限
        downratio: this.ruleForm.basic.jdata.downratio, // 首付比例
        downamount: this.ruleForm.basic.jdata.downamount, // 首付金额
        loanmoney: this.ruleForm.basic.jdata.loanmoney, // 贷款金额
        dealerdiscountprice: this.ruleForm.basic.jdata.dealerdiscountprice
      };
    }
  },
  methods: {
    toSubmit() {
      this.nextSubmit = true;
      setTimeout(() => {
        this.nextSubmit = false;
      }, 2000);
    },
    resizeEvent: function() {
      var left = window.scrollX;
      var offsetLeft = this.$parent.$el.offsetLeft;
      //this.$refs.topAffix.style.left = offsetLeft - left + "px";
    },
    scrollEvent: function() {
      var that = this;
      scrollFunc();

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
    },
    orderSign() {
      var that = this;
      let para1 = {};
      para1 = that.contentlist;
      orderSign(para1).then(rese => {
        if (rese.data.success) {
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
    toConfirm() {
      this.showxinxi = false;
      this.orderSign();
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
    btnenterto(item) {
      this.btndisable = true;
      this.nextdo();
      var status = this.contentlist.basicInfo.status;
      if (status === 4) {
        let para = {};
        para = this.contentlist;
        postRevisepause(para).then(res => {
          this.btndisable = false;
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
    zansaveb() {
      var that = this;
      let para = {};
      that.changeSave = true;
      para = this.contentlist;
      if (localStorage.getItem("order" + that.routeid)) {
        para.basicInfo.state = 2;
      }
      orderSave(para).then(res => {
        that.changeSave = false;
        if (res.data.success) {
          that.contentlist = res.data.data;

          localStorage.removeItem("order" + that.routeid);
          localStorage.setItem(
            "orderId" + that.routeid,
            that.contentlist.orderId
          );
          this.$message({
            message: "暂存成功！！",
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "warning"
          });
        }
      });
    },
    zhansave() {
      this.nextdo();
      this.zansaveb();
    },
    toNext() {
      this.nextdo();
      this.$router.push({
        path: "/dealer/creditapproval/identmain/" + this.routeid
      });
    },
    tojinrong() {
      this.nextdo();
      this.$router.push({
        path: "/dealer/creditapproval/personalorder/" + this.routeid
      });
    },
    totianxie() {
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
            that.contentlist = res.data.data;
            localStorage.removeItem("order" + that.routeid);
            localStorage.setItem(
              "orderId" + that.routeid,
              that.contentlist.orderId
            );
            this.$router.push({
              path: "/dealer/creditapproval/identmain/" + this.routeid
            });
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
        });
      } else {
        this.$router.push({
          path: "/dealer/creditapproval/identmain/" + this.routeid
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
            if (that.contentlist.basicInfo.signstate == 0) {
              this.showMsg(1);
            } else {
              this.$message({
                message: res.data.message,
                type: "warning"
              });
              this.$router.push({
                path: "/dealer/creditapproval/toauthphoto/" + this.routeid
              });
            }
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
    showMsg(type) {
      this.totype = type;
      if (this.contentlist.basicInfo.category === "2") {
        this.maker = this.contentlist.oldVehicleInfo.maker;
        this.brand = this.contentlist.oldVehicleInfo.brand;
        this.stylename = this.contentlist.oldVehicleInfo.cardtype;
        this.fujiachanpin = this.contentlist.oldVehicleInfo.vehicleexs;
        this.fujiajiage = this.contentlist.oldVehicleInfo.vehicleexprice;
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
      if (this.contentlist.borrowers.filter(item => item.type == 1)) {
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

      this.showxinxi = true;
    },
    toyingxiang() {
      var that = this;
      this.nextdo();
      if (!that.sbdisable) {
        let para = {};
        para = that.contentlist;
        orderSave(para).then(res => {
          if (res.data.success) {
            localStorage.removeItem("order" + that.routeid);
            localStorage.setItem(
              "orderId" + that.routeid,
              that.contentlist.orderId
            );
            // eslint-disable-next-line
            if (that.contentlist.basicInfo.signstate == 0) {
              this.showMsg(2);
            } else {
              this.$message({
                message: "订单状态不对，请联系管理员",
                type: "warning"
              });
              this.$router.push({
                path: "/dealer/creditapproval/orderphoto/" + this.routeid
              });
            }
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
    tojisuan(type) {
      /* eslint-disable */
      var that = this;
      let para = {};
      para.ChangeField = type;
      this.ruleForm.basic.jdata.VEHICLEEXPRICE = this.ruleForm.basic.VEHICLEEXPRICE;
      this.ruleForm.basic.jdata.INVOICEPRICE = this.ruleForm.basic.INVOICEPRICE;
      this.ruleForm.basic.jdata.FNPRODUCT = this.ruleForm.basic.FNPRODUCT;
      this.ruleForm.basic.jdata.allmoney =
        Number(this.ruleForm.basic.INVOICEPRICE) +
        Number(this.ruleForm.basic.VEHICLEEXPRICE);
      if (type == "ALLMONEY") {
        var parafujia = this.contentlist.financialInfo.id;
        delAdditional(parafujia).then(res => {
          if (res.data.success) {
            console.log(res);
          }
        });

        this.ruleForm.basic.jdata.VEHICLEEXPRICE = 0;
        this.ruleForm.basic.VEHICLEEXPRICE = 0;
        this.ruleForm.basic.VEHICLEEXS = "";
        this.ruleForm.basic.jdata.allmoney = Number(
          this.ruleForm.basic.INVOICEPRICE
        );
      }
      para.info = this.ruleForm.basic.jdata;
      // 对比当前和上次参数
      if (isObjectValueEqual(this.currentJisuan, this.tmpJisuan)) {
        return;
      }
      getfinancialInfo(para).then(res => {
        this.ruleForm.basic.jdata = res.data.data;
        this.datalist = res.data.data.rentaldetail;
        this.ruleForm.basic.jdata.discountprice2 =
          res.data.data.firm_actual_discount_price;
        this.$set(
          this.ruleForm.basic.jdata,
          "dealerdiscountprice",
          res.data.data.dealer_discount_price
        );
        // 存入缓存
        this.tmpJisuan = this.currentJisuan;
      });
    },
    upjinrong(selval) {
      /* eslint-disable */
      var that = this;
      var choosenItem = this.producelist.filter(item => item.id === selval)[0];
      that.isshowwei = false;
      if (choosenItem.balloonTag) {
        that.isshowwei = true;
      }
      that.fujiatag = false;
      if (choosenItem.additionalTag) {
        that.fujiatag = false;
      }
      let para = {};
      para.ChangeField = "FNPRODUCT";
      this.ruleForm.basic.jdata.VEHICLEEXPRICE = this.ruleForm.basic.VEHICLEEXPRICE;
      this.ruleForm.basic.jdata.FNPRODUCT = this.ruleForm.basic.FNPRODUCT;
      this.ruleForm.basic.jdata.INVOICEPRICE = this.ruleForm.basic.INVOICEPRICE;
      this.ruleForm.basic.jdata.allmoney =
        Number(this.ruleForm.basic.INVOICEPRICE) +
        Number(this.ruleForm.basic.VEHICLEEXPRICE);
      para.info = this.ruleForm.basic.jdata;
      getfinancialInfo(para).then(res => {
        this.ruleForm.basic.jdata = res.data.data;
        this.datalist = res.data.data.rentaldetail;
        this.ruleForm.basic.jdata.discountprice2 =
          res.data.data.firm_actual_discount_price;
        this.$set(
          this.ruleForm.basic.jdata,
          "dealerdiscountprice",
          res.data.data.dealer_discount_price
        );
        // 存入缓存
        this.tmpJisuan = this.currentJisuan;
      });
    },
    upproduct(selval) {
      /* eslint-disable */
      this.ruleForm.basic.jdata = this.defaultData;
      this.ruleForm.basic.FNPRODUCT = "";
      this.datalist = [];
      this.ruleForm.basic.VEHICLEEXS = "";
      this.ruleForm.basic.VEHICLEEXPRICE = "";
      var choosenItem = this.kuanshilist.filter(item => item.id === selval)[0];
      this.ruleForm.basic.GUIDEPRICE = choosenItem.guidePrice;
      this.ruleForm.basic.INVOICEPRICE = choosenItem.guidePrice;
      this.ruleForm.basic.jdata.INVOICEPRICE = choosenItem.guidePrice;
      let para = {};
      para = 2;
      getProductlistTwo(para).then(res => {
        this.producelist = res.data.data;
      });
    },
    productsearch() {
      this.loading = true;
      let para = {};
      para = 2;
      getProductlistTwo(para).then(res => {
        this.loading = false;
        this.producelist = res.data.data;
      });
    },
    stylesearch() {
      if (!this.ruleForm.basic.BRAND) {
        this.$message({
          type: "error",
          message: "请先选择车型！！！"
        });
      } else {
        getStyle(this.ruleForm.basic.BRAND).then(res => {
          this.kuanshilist = res.data.data;
        });
      }
    },
    chexingsearch() {
      this.loading = true;
      if (!this.ruleForm.basic.MAKER) {
        this.loading = false;
        this.$message({
          type: "error",
          message: "请先选择品牌！！！"
        });
      } else {
        let parabrand = {};
        parabrand = {
          makerId: this.ruleForm.basic.MAKER,
          category: this.ruleForm.basic.category,
          brandType: this.ruleForm.basic.type
        };
        getBrand(parabrand).then(res => {
          this.loading = false;
          this.chexinglist = res.data.data;
        });
      }
    },
    brandchange() {
      this.ruleForm.basic.STYLE = "";
      this.ruleForm.basic.jdata = this.defaultData;
      this.ruleForm.basic.FNPRODUCT = "";
      this.datalist = [];
      this.ruleForm.basic.VEHICLEEXS = "";
      this.ruleForm.basic.VEHICLEEXPRICE = "";
    },
    makerchange() {
      this.ruleForm.basic.VEHICLEEXS = "";
      this.ruleForm.basic.VEHICLEEXPRICE = "";
      this.datalist = [];
      this.ruleForm.basic.jdata = this.defaultData;
      this.ruleForm.basic.FNPRODUCT = "";
      this.ruleForm.basic.BRAND = "";
      this.ruleForm.basic.STYLE = "";
    },
    makersearch() {
      this.loading = true;
      getMaker().then(res => {
        this.loading = false;
        this.makerlist = res.data.data;
      });
    },
    salesearch() {
      getSale().then(res => {
        this.sales = res.data.data;
      });
    },
    saledirectsearch() {
      let para = {};
      para = {
        type: 3
      };

      getSaleDirector().then(res => {
        if (res.data.data) {
          this.saledirectorlist = res.data.data.filter((item, index, array) => {
            return item.isActive > 0;
          });
        }
      });
    },
    xindaisearch() {
      getCredit().then(res => {
        this.credits = res.data.data;
      });
    },
    sbfujiajin(scope) {
      var price = Math.floor(
        this.ruleForm.basic.INVOICEPRICE / window.local.xishu
      );
      this.fujialist.map((v, i) => {
        if (i === scope.$index) {
          v.exratio = ((v.exprice * 100) / price).toFixed(1);
        }
      });
    },
    sbfujiabi(scope) {
      var price = Math.floor(
        this.ruleForm.basic.INVOICEPRICE / window.local.xishu
      );
      this.fujialist.map((v, i) => {
        if (i === scope.$index) {
          v.exprice = ((v.exratio * price) / 100).toFixed(0);
        }
      });
    },
    fujiasub() {
      this.fujiatan = false;
      let para = {};
      para.FinancialId = this.contentlist.financialInfo.id;
      para.VehicleEx = this.fujialist;
      upAdditional(para).then(res => {
        if (res.data.success) {
          this.fujialist = this.fujialist.filter((item, index, array) => {
            return item.exprice > 0;
          });
          var name = this.fujialist.map((item, index, array) => {
            return item.exname + "(" + item.exprice + ")";
          });
          var id = this.fujialist.map((item, index, array) => {
            return item.excode;
          });
          this.ruleForm.basic.jdata.VEHICLEEXS = id.join(",");
          this.ruleForm.basic.VEHICLEEXS = name.join(",");
          var price = this.fujialist.map((item, index, array) => {
            return item.exprice;
          });
          this.ruleForm.basic.VEHICLEEXPRICE = price.reduce(function(
            num,
            item,
            index
          ) {
            return parseFloat(num) + parseFloat(item);
          });
          this.tojisuan("VEHICLEEXPRICE");
        }
      });
    },
    qkfujia() {
      var para = this.contentlist.financialInfo.id;
      delAdditional(para).then(res => {
        if (res.data.success) {
          console.log(res);
        }
      });
      this.ruleForm.basic.jdata.INVOICEPRICE = this.ruleForm.basic.INVOICEPRICE;
      this.ruleForm.basic.jdata.VEHICLEEXS = "";
      this.ruleForm.basic.jdata.VEHICLEEXPRICE = 0;
      this.ruleForm.basic.VEHICLEEXPRICE = 0;
      this.ruleForm.basic.VEHICLEEXS = "";
      this.tojisuan("VEHICLEEXPRICE");
    },
    fujiaadd() {
      var titleshow =
        this.ruleForm.basic.GUIDEPRICE < this.ruleForm.basic.INVOICEPRICE
          ? this.ruleForm.basic.GUIDEPRICE
          : this.ruleForm.basic.INVOICEPRICE;
      this.fujiadaititle = "附加贷产品(车辆价格)" + titleshow;
      var that = this;
      if (!this.fujiatag) {
        this.$message({
          type: "error",
          message: "该产品不支持附加贷产品！！"
        });
        return false;
      }
      let para = {};
      para.Category = this.contentlist.basicInfo.category;
      para.FinancialId = this.contentlist.financialInfo.id;
      para.ProductId = this.ruleForm.basic.FNPRODUCT;
      para.PriceStr = this.ruleForm.basic.INVOICEPRICE;
      getAdditional(para).then(res => {
        if (res.data.success) {
          this.fujiatan = true;
          this.fujiadai = true;
          this.fujialist = res.data.data.data;
        } else {
          this.fujiadai = false;
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    },
    nextdo() {
      var that = this;
      if (!this.ruleForm.basic.DEALER) {
        this.$message({
          type: "error",
          message: "数据错误！！请联系管理员"
        });
        return false;
      }
      if (!that.contentlist.oldVehicleInfo) {
        that.contentlist.oldVehicleInfo = {};
      }

      that.contentlist.basicInfo.dealer = this.ruleForm.basic.dealerid;
      that.contentlist.basicInfo.saledirector = this.ruleForm.basic.saledirector;
      that.contentlist.basicInfo.signdealer = this.ruleForm.basic.signdealerid;
      that.contentlist.basicInfo.applyuserp = this.ruleForm.basic.applyuserpid;
      that.contentlist.basicInfo.creditofficer = this.ruleForm.basic.CREDITOFFICER;
      that.contentlist.basicInfo.saleuser = this.ruleForm.basic.SALEUSER;
      that.contentlist.basicInfo.memo = this.ruleForm.basic.MEMO;

      that.contentlist.oldVehicleInfo.maker = this.ruleForm.basic.MAKER;
      that.contentlist.oldVehicleInfo.cardtype = this.ruleForm.basic.CARDTYPE;
      that.contentlist.oldVehicleInfo.brand = this.ruleForm.basic.BRAND;
      that.contentlist.oldVehicleInfo.configure = this.ruleForm.basic.CONFIGURE;
      that.contentlist.oldVehicleInfo.color = this.ruleForm.basic.COLOR;
      that.contentlist.oldVehicleInfo.vin = this.ruleForm.basic.VIN;
      that.contentlist.oldVehicleInfo.engineno = this.ruleForm.basic.ENGINENO
        ? this.ruleForm.basic.ENGINENO
        : 0;
      that.contentlist.oldVehicleInfo.fueltype = this.ruleForm.basic.FUELTYPE;
      that.contentlist.oldVehicleInfo.displacement = this.ruleForm.basic.DISPLACEMENT;
      that.contentlist.oldVehicleInfo.transmission = this.ruleForm.basic.TRANSMISSION;
      that.contentlist.oldVehicleInfo.usetype = this.ruleForm.basic.USETYPE;
      that.contentlist.oldVehicleInfo.seatnumber = this.ruleForm.basic
        .SEATNUMBER
        ? this.ruleForm.basic.SEATNUMBER
        : 0;
      that.contentlist.oldVehicleInfo.invoiceprice = this.ruleForm.basic
        .INVOICEPRICE
        ? this.ruleForm.basic.INVOICEPRICE
        : 0;
      that.contentlist.oldVehicleInfo.pricenew = this.ruleForm.basic.PRICENEW
        ? this.ruleForm.basic.PRICENEW
        : 0;
      // that.contentlist.oldVehicleInfo.pricethirdparty = this.ruleForm.basic
      //   .PRICETHIRDPARTY
      //   ? this.ruleForm.basic.PRICETHIRDPARTY
      //   : 0;
      that.contentlist.oldVehicleInfo.platenumber = this.ruleForm.basic
        .PLATENUMBER
        ? this.ruleForm.basic.PLATENUMBER
        : 0;
      that.contentlist.oldVehicleInfo.appraiser = this.ruleForm.basic.APPRAISER;
      that.contentlist.oldVehicleInfo.salername = this.ruleForm.basic.SALERNAME;
      that.contentlist.oldVehicleInfo.salerphone = this.ruleForm.basic.SALERPHONE;
      that.contentlist.oldVehicleInfo.saleraddress = this.ruleForm.basic.SALERADDRESS;
      that.contentlist.oldVehicleInfo.mileage = this.ruleForm.basic.MILEAGE
        ? this.ruleForm.basic.MILEAGE
        : 0;
      that.contentlist.oldVehicleInfo.registerarea = this.ruleForm.basic.REGISTERAREA[1];
      that.contentlist.oldVehicleInfo.firstdate = this.ruleForm.basic.FIRSTDATE;
      that.contentlist.oldVehicleInfo.transfercount = this.ruleForm.basic
        .TRANSFERCOUNT
        ? this.ruleForm.basic.TRANSFERCOUNT
        : 0;
      that.contentlist.oldVehicleInfo.alltransfercount = this.ruleForm.basic
        .ALLTRANSFERCOUNT
        ? this.ruleForm.basic.ALLTRANSFERCOUNT
        : 0;
      that.contentlist.oldVehicleInfo.purpose = this.ruleForm.basic.PURPOSE;
      that.contentlist.oldVehicleInfo.cardaddress = this.ruleForm.basic.CARDADDRESS[1];
      that.contentlist.oldVehicleInfo.isrefit = this.ruleForm.basic.ISREFIT;
      that.contentlist.financialInfo.fnproduct = this.ruleForm.basic.FNPRODUCT;
      that.contentlist.financialInfo.invoiceprice = this.ruleForm.basic.INVOICEPRICE;
      that.contentlist.financialInfo.vehicleexs = this.ruleForm.basic.VEHICLEEXS;
      that.contentlist.financialInfo.vehicleexprice = this.ruleForm.basic.VEHICLEEXPRICE;
      that.contentlist.financialInfo.allmoney = this.ruleForm.basic.jdata.allmoney;
      that.contentlist.financialInfo.loanperiod = this.ruleForm.basic.jdata.loanperiod;
      that.contentlist.financialInfo.paymentfrequency = this.ruleForm.basic.jdata.paymentfrequency;
      that.contentlist.financialInfo.downratio = this.ruleForm.basic.jdata.downratio;
      that.contentlist.financialInfo.downamount = this.ruleForm.basic.jdata.downamount;
      that.contentlist.financialInfo.tailratio = this.ruleForm.basic.jdata.tailratio;
      that.contentlist.financialInfo.tailamount = this.ruleForm.basic.jdata.tailamount;
      that.contentlist.financialInfo.firstpayment = this.ruleForm.basic.jdata.firstpayment;
      that.contentlist.financialInfo.loanmoney = this.ruleForm.basic.jdata.loanmoney;
      that.contentlist.financialInfo.customerrate = this.ruleForm.basic.jdata.customerrate;
      that.contentlist.financialInfo.interest = this.ruleForm.basic.jdata.interest;
      that.contentlist.financialInfo.discount = this.ruleForm.basic.jdata.discount;
      that.contentlist.financialInfo.discountprice = this.ruleForm.basic.jdata.discountprice;
      that.contentlist.financialInfo.actualrate = this.ruleForm.basic.jdata.actualrate;
      that.contentlist.financialInfo.discountprice2 = this.ruleForm.basic.jdata.discountprice2;
      that.contentlist.financialInfo.dealerdiscountprice = this.ruleForm.basic.jdata.dealerdiscountprice;
      localStorage.setItem(
        "contentlist" + this.routeid,
        JSON.stringify(that.contentlist)
      );
    },
    initfunction() {
      /* eslint-disable */
      var that = this;

      if (localStorage.getItem("order" + that.routeid)) {
        that.financialInfoEx = "";
        var ordernew = JSON.parse(localStorage.getItem("order" + that.routeid));
        this.contentlist = ordernew;
        this.ruleForm.basic.dealerid = ordernew.basicInfo.dealer;
        this.ruleForm.basic.saledirector = ordernew.basicInfo.saledirector;
        this.ruleForm.basic.signdealerid = ordernew.basicInfo.signdealer;
        this.ruleForm.basic.applyuserid = ordernew.basicInfo.applyuser;
        this.ruleForm.basic.applyuserpid = ordernew.basicInfo.applyuserp;
        this.ruleForm.basic.DEALER = ordernew.basicInfo.refData.dealername;
        this.ruleForm.basic.SIGNDEALER =
          ordernew.basicInfo.refData.signdealername;
        this.ruleForm.basic.APPLYUSER =
          ordernew.basicInfo.refData.applyusername;
        this.ruleForm.basic.APPLYUSERP = ordernew.basicInfo.applyuserp;
        if (ordernew.vehicleInfo) {
          if (ordernew.vehicleInfo.registration) {
            var provice = ordernew.vehicleInfo.registration.substring(0, 2);
            this.ruleForm.basic.REGISTRATION = [
              provice + "0000",
              ordernew.vehicleInfo.registration
            ];
          }
        }

        if (localStorage.getItem("orderold" + that.routeid)) {
          var orderold = JSON.parse(
            localStorage.getItem("orderold" + that.routeid)
          );
          this.ruleForm.basic.ID = orderold.financialInfo.id;
          let para = {};
          para = {
            type: 3
          };

          getSaleDirector().then(res => {
            if (res.data.data) {
              this.saledirectorlist = res.data.data.filter(
                (item, index, array) => {
                  return item.isActive > 0;
                }
              );
            }
            console.log(res.data.data.data);
          });
          getSale().then(res => {
            this.sales = res.data.data;
          });
          if (orderold.basicInfo.saleuser) {
            this.ruleForm.basic.SALEUSER = orderold.basicInfo.saleuser;
          }
          getCredit().then(res => {
            this.credits = res.data.data;
          });
          if (orderold.basicInfo.creditofficer) {
            this.ruleForm.basic.CREDITOFFICER =
              orderold.basicInfo.creditofficer;
          }
          getMaker().then(res => {
            this.makerlist = res.data.data;
          });
          if (orderold.oldVehicleInfo.maker) {
            let parabrand = {};
            parabrand = {
              makerId: orderold.oldVehicleInfo.maker,
              category: this.ruleForm.basic.category,
              brandType: this.ruleForm.basic.type
            };
            getBrand(parabrand).then(res => {
              this.chexinglist = res.data.data;
            });
          }
          if (orderold.oldVehicleInfo.brand) {
            getStyle(orderold.oldVehicleInfo.brand).then(res => {
              this.kuanshilist = res.data.data;
            });
          }
          this.ruleForm.basic.MEMO = orderold.basicInfo.memo;
          this.ruleForm.basic.ID = that.contentlist.oldVehicleInfo.id;
          this.ruleForm.basic.MAKER = that.contentlist.oldVehicleInfo.maker;
          this.ruleForm.basic.CARDTYPE =
            that.contentlist.oldVehicleInfo.cardtype;
          this.ruleForm.basic.BRAND = that.contentlist.oldVehicleInfo.brand;
          this.ruleForm.basic.CONFIGURE =
            that.contentlist.oldVehicleInfo.configure;
          this.ruleForm.basic.COLOR = that.contentlist.oldVehicleInfo.color;
          this.ruleForm.basic.VIN = that.contentlist.oldVehicleInfo.vin;
          this.ruleForm.basic.ENGINENO =
            that.contentlist.oldVehicleInfo.engineno;
          this.ruleForm.basic.FUELTYPE =
            that.contentlist.oldVehicleInfo.fueltype;
          this.ruleForm.basic.DISPLACEMENT =
            that.contentlist.oldVehicleInfo.displacement;
          this.ruleForm.basic.TRANSMISSION =
            that.contentlist.oldVehicleInfo.transmission;
          this.ruleForm.basic.USETYPE = that.contentlist.oldVehicleInfo.usetype;
          this.ruleForm.basic.SEATNUMBER =
            that.contentlist.oldVehicleInfo.seatnumber;
          this.ruleForm.basic.INVOICEPRICE =
            that.contentlist.oldVehicleInfo.invoiceprice;
          this.ruleForm.basic.PRICENEW =
            that.contentlist.oldVehicleInfo.pricenew;
          // this.ruleForm.basic.PRICETHIRDPARTY =
          //   that.contentlist.oldVehicleInfo.pricethirdparty;
          this.ruleForm.basic.PLATENUMBER =
            that.contentlist.oldVehicleInfo.platenumber;
          this.ruleForm.basic.APPRAISER =
            that.contentlist.oldVehicleInfo.appraiser;
          this.ruleForm.basic.SALERNAME =
            that.contentlist.oldVehicleInfo.salername;
          this.ruleForm.basic.SALERPHONE =
            that.contentlist.oldVehicleInfo.salerphone;
          this.ruleForm.basic.SALERADDRESS =
            that.contentlist.oldVehicleInfo.saleraddress;
          this.ruleForm.basic.MILEAGE = that.contentlist.oldVehicleInfo.mileage;
          this.ruleForm.basic.FIRSTDATE =
            that.contentlist.oldVehicleInfo.firstdate;
          this.ruleForm.basic.TRANSFERCOUNT =
            that.contentlist.oldVehicleInfo.transfercount;
          this.ruleForm.basic.ALLTRANSFERCOUNT =
            that.contentlist.oldVehicleInfo.alltransfercount;
          this.ruleForm.basic.PURPOSE = that.contentlist.oldVehicleInfo.purpose;
          this.ruleForm.basic.ISREFIT = that.contentlist.oldVehicleInfo.isrefit;

          if (orderold.oldVehicleInfo.registerarea) {
            var provice = orderold.oldVehicleInfo.registerarea.substring(0, 2);
            this.ruleForm.basic.REGISTERAREA = [
              provice,
              orderold.oldVehicleInfo.registerarea
            ];
          }
          if (orderold.oldVehicleInfo.cardaddress) {
            var provice = orderold.oldVehicleInfo.cardaddress.substring(0, 2);
            this.ruleForm.basic.CARDADDRESS = [
              provice,
              orderold.oldVehicleInfo.cardaddress
            ];
          }

          para = 2;
          getProductlist(para).then(res => {
            this.producelist = res.data.data;
          });

          that.isshowwei = false;
          if (orderold.financialInfo.refData.BalloonTag) {
            that.isshowwei = true;
          }
          that.fujiatag = false;
          if (orderold.financialInfo.vehicleexs) {
            that.fujiatag = false;
          }
          this.ruleForm.basic.FNPRODUCT = orderold.financialInfo.fnproduct;
          this.ruleForm.basic.VEHICLEEXS = orderold.financialInfo.vehicleexs;
          this.ruleForm.basic.VEHICLEEXPRICE =
            orderold.financialInfo.vehicleexprice;
          this.ruleForm.basic.jdata.allmoney = orderold.financialInfo.allmoney;
          this.ruleForm.basic.jdata.loanperiod =
            orderold.financialInfo.loanperiod;
          this.ruleForm.basic.jdata.paymentfrequency =
            orderold.financialInfo.paymentfrequency;
          this.ruleForm.basic.jdata.downratio =
            orderold.financialInfo.downratio;
          this.ruleForm.basic.jdata.downamount =
            orderold.financialInfo.downamount;
          this.ruleForm.basic.jdata.tailratio =
            orderold.financialInfo.tailratio;
          this.ruleForm.basic.jdata.tailamount =
            orderold.financialInfo.tailamount;
          this.ruleForm.basic.jdata.firstpayment =
            orderold.financialInfo.firstpayment;
          this.ruleForm.basic.jdata.loanmoney =
            orderold.financialInfo.loanmoney;
          this.ruleForm.basic.jdata.customerrate =
            orderold.financialInfo.customerrate;
          this.ruleForm.basic.jdata.interest = orderold.financialInfo.interest;
          this.ruleForm.basic.jdata.discount = orderold.financialInfo.discount;
          this.ruleForm.basic.jdata.discountprice =
            orderold.financialInfo.discountprice;
          this.ruleForm.basic.jdata.actualrate =
            orderold.financialInfo.actualrate;
        }
        this.isLoading = false;
      } else {
        orderInfo(localStorage.getItem("orderId" + that.routeid))
          .then(res => {
            if (res.data) {
              this.userinfoapplicationno =
                res.data.data.basicInfo.applicationno;
              this.userinfo = collectFirst(
                res.data.data.borrowers,
                "type",
                "1"
              );
              localStorage.setItem(
                "orderold" + that.routeid,
                JSON.stringify(res.data.data)
              );
              if (res.data.data.basicInfo.readonly) {
                that.sbdisable = true;
              } else {
                if (
                  res.data.data.basicInfo.status == 4 ||
                  res.data.data.basicInfo.signstate == 0
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
              that.financialInfo = res.data.data.financialInfo;
              that.financialInfoEx = res.data.data.financialInfoEx;
              if (that.financialInfoEx) {
                that.qxiaozi = true;
              }
              that.datalist = res.data.data.rentaldetail;
              that.contentlist = res.data.data;
              let para = {};
              para = {
                type: 3
              };

              // getsaledirectslist(para).then(ress => {
              //   this.saledirectorlist = ress.data.data.data.filter((item, index, array) => {
              //     return item.isActive > 0
              //   })
              //   this.ruleForm.basic.saledirector = res.data.data.basicInfo.saledirector
              // })
              this.saledirectorlist.push({
                id: res.data.data.basicInfo.saledirector,
                name: res.data.data.basicInfo.refData.saledirectorname
              });
              this.ruleForm.basic.saledirector =
                res.data.data.basicInfo.saledirector;

              this.ruleForm.basic.DEALER =
                res.data.data.basicInfo.refData.dealername;
              this.ruleForm.basic.SIGNDEALER =
                res.data.data.basicInfo.refData.signdealername;
              this.ruleForm.basic.APPLYUSER =
                res.data.data.basicInfo.refData.applyusername;
              this.ruleForm.basic.APPLYUSERP =
                res.data.data.basicInfo.applyuserp;
              this.ruleForm.basic.ID = res.data.data.oldVehicleInfo.id;
              this.sales.push({
                id: res.data.data.basicInfo.saleuser,
                name: res.data.data.basicInfo.refData.saleusername,
                phone: ""
              });
              if (res.data.data.basicInfo.saleuser) {
                this.ruleForm.basic.SALEUSER = res.data.data.basicInfo.saleuser;
              }
              this.credits.push({
                id: res.data.data.basicInfo.creditofficer,
                name: res.data.data.basicInfo.refData.creditofficername,
                phone: ""
              });
              if (res.data.data.basicInfo.creditofficer) {
                this.ruleForm.basic.CREDITOFFICER =
                  res.data.data.basicInfo.creditofficer;
              }
              if (res.data.data.financialInfo.refData) {
                that.isFullRate =
                  res.data.data.financialInfo.refData.isFullRate != 0
                    ? true
                    : false;
                that.ruleForm.basic.jdata.firmDiscountPrice =
                  res.data.data.financialInfo.refData.firmDiscountPrice;
              } else {
                that.isFullRate = false;
              }
              that.ruleForm.basic.jdata.discountprice2 =
                res.data.data.financialInfo.discountprice2;
              that.ruleForm.basic.jdata.dealerdiscountprice =
                res.data.data.financialInfo.dealerdiscountprice;
              this.ruleForm.basic.MEMO = res.data.data.basicInfo.memo;
              // this.ruleForm.basic.ID = that.contentlist.oldVehicleInfo.ID
              this.ruleForm.basic.MAKER = that.contentlist.oldVehicleInfo.maker;
              this.ruleForm.basic.CARDTYPE =
                that.contentlist.oldVehicleInfo.cardtype;
              this.ruleForm.basic.BRAND = that.contentlist.oldVehicleInfo.brand;
              this.ruleForm.basic.CONFIGURE =
                that.contentlist.oldVehicleInfo.configure;
              this.ruleForm.basic.COLOR = that.contentlist.oldVehicleInfo.color;
              this.ruleForm.basic.VIN = that.contentlist.oldVehicleInfo.vin;
              this.ruleForm.basic.ENGINENO =
                that.contentlist.oldVehicleInfo.engineno;
              this.ruleForm.basic.FUELTYPE =
                that.contentlist.oldVehicleInfo.fueltype;
              this.ruleForm.basic.DISPLACEMENT =
                that.contentlist.oldVehicleInfo.displacement;
              this.ruleForm.basic.TRANSMISSION =
                that.contentlist.oldVehicleInfo.transmission;
              this.ruleForm.basic.USETYPE =
                that.contentlist.oldVehicleInfo.usetype;
              this.ruleForm.basic.SEATNUMBER =
                that.contentlist.oldVehicleInfo.seatnumber;
              this.ruleForm.basic.INVOICEPRICE =
                that.contentlist.oldVehicleInfo.invoiceprice;
              this.ruleForm.basic.PRICENEW =
                that.contentlist.oldVehicleInfo.pricenew;
              // this.ruleForm.basic.PRICETHIRDPARTY =
              //   that.contentlist.oldVehicleInfo.pricethirdparty;
              this.ruleForm.basic.PLATENUMBER =
                that.contentlist.oldVehicleInfo.platenumber;
              this.ruleForm.basic.APPRAISER =
                that.contentlist.oldVehicleInfo.appraiser;
              this.ruleForm.basic.SALERNAME =
                that.contentlist.oldVehicleInfo.salername;
              this.ruleForm.basic.SALERPHONE =
                that.contentlist.oldVehicleInfo.salerphone;
              this.ruleForm.basic.SALERADDRESS =
                that.contentlist.oldVehicleInfo.saleraddress;
              this.ruleForm.basic.MILEAGE =
                that.contentlist.oldVehicleInfo.mileage;
              this.ruleForm.basic.FIRSTDATE =
                that.contentlist.oldVehicleInfo.firstdate;
              this.ruleForm.basic.TRANSFERCOUNT =
                that.contentlist.oldVehicleInfo.transfercount;
              this.ruleForm.basic.ALLTRANSFERCOUNT =
                that.contentlist.oldVehicleInfo.alltransfercount;
              this.ruleForm.basic.PURPOSE =
                that.contentlist.oldVehicleInfo.purpose;
              this.ruleForm.basic.ISREFIT =
                that.contentlist.oldVehicleInfo.isrefit;
              if (that.contentlist.oldVehicleInfo.registerarea) {
                var provice = that.contentlist.oldVehicleInfo.registerarea.substring(
                  0,
                  2
                );
                this.ruleForm.basic.REGISTERAREA = [
                  provice,
                  that.contentlist.oldVehicleInfo.registerarea
                ];
              }
              if (that.contentlist.oldVehicleInfo.cardaddress) {
                var provice = that.contentlist.oldVehicleInfo.cardaddress.substring(
                  0,
                  2
                );
                this.ruleForm.basic.CARDADDRESS = [
                  provice,
                  that.contentlist.oldVehicleInfo.cardaddress
                ];
              }
              this.producelist.push({
                id: res.data.data.financialInfo.fnproduct,
                name: res.data.data.financialInfo.refData.fnproductname
              });

              this.ruleForm.basic.FNPRODUCT =
                res.data.data.financialInfo.fnproduct;
              this.ruleForm.basic.VEHICLEEXS =
                res.data.data.financialInfo.vehicleexs;
              this.ruleForm.basic.VEHICLEEXPRICE =
                res.data.data.financialInfo.vehicleexprice;
              this.ruleForm.basic.jdata.allmoney =
                res.data.data.financialInfo.allmoney;
              this.ruleForm.basic.jdata.loanperiod =
                res.data.data.financialInfo.loanperiod;
              this.ruleForm.basic.jdata.paymentfrequency =
                res.data.data.financialInfo.paymentfrequency;
              this.ruleForm.basic.jdata.downratio =
                res.data.data.financialInfo.downratio;
              this.ruleForm.basic.jdata.downamount =
                res.data.data.financialInfo.downamount;
              this.ruleForm.basic.jdata.tailratio =
                res.data.data.financialInfo.tailratio;
              this.ruleForm.basic.jdata.tailamount =
                res.data.data.financialInfo.tailamount;
              this.ruleForm.basic.jdata.firstpayment =
                res.data.data.financialInfo.firstpayment;
              this.ruleForm.basic.jdata.loanmoney =
                res.data.data.financialInfo.loanmoney;
              this.ruleForm.basic.jdata.customerrate =
                res.data.data.financialInfo.customerrate;
              this.ruleForm.basic.jdata.interest =
                res.data.data.financialInfo.interest;
              this.ruleForm.basic.jdata.discount =
                res.data.data.financialInfo.discount;
              this.ruleForm.basic.jdata.discountprice =
                res.data.data.financialInfo.discountprice;
              this.ruleForm.basic.jdata.actualrate =
                res.data.data.financialInfo.actualrate;
              that.isshowwei = false;
              if (res.data.data.financialInfo.refData.BalloonTag == 1) {
                that.isshowwei = true;
              }
              that.fujiatag = false;
              if (
                res.data.data.financialInfo.vehicleexs ||
                res.data.data.financialInfo.refData.AdditionalTag == 1
              ) {
                that.fujiatag = false;
              }
            }
            this.toRule();
          })
          .then(() => {
            this.isLoading = false;
          });
      }
      getApplist().then(res => {
        this.pinggushi = res.data.data;
      });
      this.defaultData = JSON.parse(JSON.stringify(this.ruleForm.basic.jdata));
      this.gouchemudi = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001HBJ23DU50000AC7"
      ];
      this.ranyou = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001HZ6IA8IW0000A1L"
      ];
      this.xingzhi = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001J3T883KU0000A19"
      ];
      this.biansqi = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001JF87T94H0000AOI"
      ];
      this.arealist = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001HLABTHDE0000A1H"
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
      this.ruleForm.basic.ISREFIT = "0";
      this.ruleForm.basic.USETYPE = "2";
      this.ruleForm.basic.PURPOSE = "1";
      if (localStorage.getItem("order" + that.routeid)) {
        this.toRule();
      }
    },
    toRule() {
      var that = this;
      if (localStorage.getItem("rulefalse" + that.routeid)) {
        that.$refs["ruleForm"].validate(valid => {
          if (valid) {
            localStorage.removeItem("rulefalse" + that.routeid);
          } else {
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
    }
  },
  beforeRouteLeave: function(to, from, next) {
    if (to.name != "identmain") {
      var headerbar = document.getElementById("headerbar-container");
      headerbar.style.minWidth = "calc(1200px + (100vw - 100%))";
    }
    window.removeEventListener("resize", this.resizeEvent);
    window.removeEventListener("scroll", this.scrollEvent);
    next();
  },
  mounted() {
    window.addEventListener("resize", this.resizeEvent);
    window.addEventListener("scroll", this.scrollEvent);
    this.liuyanlist();
    this.initfunction();
  }
};
</script>

<style scoped lang="scss" scoped>
.liliu {
  width: 34px !important;
  height: 23px !important;
}
.liuyan {
  width: 34px;
  height: 34px;
  margin-left: -7px;
  margin-top: -11px;
}
.borderright {
  border-left: 2px solid #cca25d;
  padding-left: 6px;
  margin-left: -10px;
  padding-right: 10px;
  font-weight: bold;
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
.qxiaozi {
  width: 85%;
}
.xiaozi {
  font-size: 12px;
}
.midcontent {
  background-color: #ffffff;
  padding: 16px 0 0;
  border-radius: 4px;
}
.searchbar {
  height: 50px;
  line-height: 50px;
  border-radius: 4px;
  margin-bottom: 8px;
}
.stepcolor {
  padding-top: 13px;
}
.topbtnbasic {
  text-align: right;
  // height: 70px;
  line-height: 32px;
  height: 32px;
}
.topbtnbasic /deep/ .el-button--success.is-disabled {
  background-color: #5881d8;
  border-color: #5881d8;
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
  width: 100%;
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
.siderbarhref {
  position: absolute;
  top: 85px;
  right: -36px;
  cursor: pointer;
}
.siderbarhref ul li {
  color: #000000;
  background-color: #fff;
  margin-bottom: 3px;
  text-align: center;
  padding: 7px;
  width: 36px;
  height: 100px;
  // border: 1px solid #5881D8;
  border-radius: 5px 5px 0 0;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}

.app-breadcrumb.el-breadcrumb {
  line-height: 52px;
  height: 37px;
}
.outlinetable {
  padding-bottom: 0;
}
.noline /deep/ .el-collapse-item__header {
  border: none;
  width: 1152px;
  height: 40px;
  background-color: #f0f3f7;
  margin: 0 auto 8px;
  line-height: 40px;
  padding-left: 16px;
  overflow: hidden;
}
.conterdetail /deep/ .el-collapse-item__wrap {
  width: 100%;
  padding: 0 76px 0 54px;
  box-sizing: border-box;
}
.noline /deep/ .el-icon-arrow-right:before {
  color: #5881d8;
  font-size: 14px;
  font-weight: bold;
}
.noline /deep/ .el-collapse-item__arrow {
  margin-right: 16px;
}
.moneyCompany {
  margin: 5px;
  font-style: normal;
}
.el-button + .el-button {
  margin-left: 5px;
}
.outlinetable /deep/ .el-collapse-item__content,
.noline /deep/ .el-collapse-item__content {
  padding-bottom: 0;
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
/* .numinput{
    width: 110px;
  } */
</style>