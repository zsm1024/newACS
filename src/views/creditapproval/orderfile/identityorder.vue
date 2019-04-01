<template>
  <section>
   <Affix>
    <el-row >
      <el-col :span="10" >
          
          <el-breadcrumb separator="/" class="app-breadcrumb">
              <el-breadcrumb-item class="firstbread">信贷审批</el-breadcrumb-item>
              <el-breadcrumb-item class="firstbread"><router-link :to="{path:'/dealer/creditapproval/orderlist'}">订单管理</router-link></el-breadcrumb-item>
              <el-breadcrumb-item>个人贷款</el-breadcrumb-item>
          </el-breadcrumb>
          
      </el-col>
      <el-col :span="7" class="topbtnbasic">
         <el-button type="success" size="medium" v-for="(item,index) in btnlistenter" :key="index" class="btncolor" @click="btnenterto(item)" >{{item.cmddis}}</el-button>
       </el-col>
      <el-col :span="7" v-if="!sbdisable" class="topbtnbasic">
          <el-button type="success" size="medium" @click="zhansave" class="btnnextcolor" >暂存</el-button>
          <el-button type="success" size="medium" class="btncolor" @click="toNext" >下一步</el-button>
      </el-col>
     
    </el-row>
    
     
    <el-row class="searchbar">
          <el-col :span="22" :offset="2">
               <Steps :current="1" class="stepcolor">
                  <Step title="金融产品设定">
                    <li  @click="tojinrong()" style="width:100px;height:20px;margin-top:-25px;cursor:pointer">测试</li>
                  </Step>
                  <Step title="填写身份信息">
                    <li  style="width:100px;height:20px;margin-top:-25px;cursor:pointer">测试</li>
                  </Step>
                  <Step title="客户授权">
                    <li  @click="tokehu()" style="width:100px;height:20px;margin-top:-25px;cursor:pointer">测试</li>
                  </Step>
                  <Step  title="完善其他信息">
                    <li @click="toyingxiang()" style="width:100px;height:20px;margin-top:-25px;cursor:pointer">测试</li>
                  </Step>
              </Steps>
          </el-col>
      </el-row>
      </Affix>
      <el-form  size="medium" :model="ruleForm" :rules="rules" ref="ruleForm" :disabled="sbdisable" label-position='right' label-width="120px">
      <div id="oneAnchor"></div>
      <el-row class="midcontent">
        <el-col :span="22" :offset="1" >
            <el-col :span="24" v-if="!sbdisable">
                <span class="titleright" ><span v-if="!gongjieren" class="titlerightzi" @click="addgongjie">添加共借人</span><span v-else class="titlerightzi" @click="delgongjie">删除共借人</span> <span v-if="!baozhengren" class="titlerightzir" @click="addbaozheng">添加保证人</span><span v-else class="titlerightzir" @click="delbaozheng">删除保证人</span></span>
            </el-col>
            <el-collapse v-model="activeNames" >
              <el-collapse-item name="1">
                <template slot="title">
                 <span class="titleleft"> 主借人信息</span>
                </template>
                <el-col :span="24" style="margin-top:5px">
                  <p class="pline"></p>
                </el-col>
                
                <div class="formtitle">
                  <span>基本信息</span>
                </div>
                <div>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="证件类型" 
                      prop="zhujie.CARDTYPE"
                      :rules="[
                        { required: true, message: '请输入证件类型', trigger: 'change' },
                        
                      ]"
                      >
                        <el-select v-model="ruleForm.zhujie.CARDTYPE" size="mini" style="width:85%" placeholder="" @change="currentSel">
                          <el-option
                            v-for="item in idcardlist"
                            :key="item.CODE"
                            :label="item.NAME"
                            :value="item.CODE">
                          </el-option>
                        </el-select>
                        
                        <el-button  size="mini" @click="ocrrenzheng('zhujie')" v-show="selItemShow"  v-loading.fullscreen.lock="fullscreenLoading" class="ocrclass">OCR识别</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">   
                      <el-form-item label="姓名" 
                      prop="zhujie.NAME"
                      :rules="[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        
                      ]"
                      >
                          <el-input v-model="ruleForm.zhujie.NAME" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="证件号码" 
                       prop="zhujie.CARD"
                      :rules="[
                        { required: true, message: '请输入证件号码', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input v-model="ruleForm.zhujie.CARD" size="small"></el-input> 
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="到期日" 
                      prop="zhujie.CARDDATE"
                      :rules="[
                        { required: true, message: '请输入到期日', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-date-picker type="date" v-model="ruleForm.zhujie.CARDDATE"  placeholder="选择日期" size="small" style="width: 70%;"></el-date-picker>
                        <el-checkbox v-model="ruleForm.zhujie.LONGE" :label="1">长期</el-checkbox>
                      </el-form-item>  
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">   
                      <el-form-item label="出生年月" 
                      prop="zhujie.BIRTHDAY"
                      :rules="[
                        { required: true, message: '请输入出生年月', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-date-picker type="date" v-model="ruleForm.zhujie.BIRTHDAY" style="width: 100%;" placeholder="选择日期" size="small" ></el-date-picker>
                        
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="性别" label-width="120px"
                       prop="zhujie.SEX"
                      :rules="[
                        { required: true, message: '请输入性别', trigger: 'blur' },
                        
                      ]"
                       >
                          <el-radio class="marginleft0" v-model="ruleForm.zhujie.SEX" size="mini" label="M">男</el-radio>
                          <el-radio class="marginleft0" v-model="ruleForm.zhujie.SEX" size="mini" label="F">女</el-radio>
                          <el-radio class="marginleft0" v-model="ruleForm.zhujie.SEX" size="mini" label="3">未知</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="英文姓名/拼音" 
                       prop="zhujie.ENAME"
                      :rules="[
                        { required: true, message: '请输入英文姓名/拼音', trigger: 'blur' },
                        
                      ]"
                       
                       >
                          <el-input v-model="ruleForm.zhujie.ENAME" size="small"></el-input>
                        </el-form-item> 
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">   
                      <el-form-item label="备注" >
                        <el-input 
                        v-model="ruleForm.zhujie.MEMO"
                        type="textarea"
                        :rows="1"
                        placeholder="请输入内容"
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="学历" 
                        prop="zhujie.EDUCATION"
                      :rules="[
                        { required: true, message: '请输入学历', trigger: 'change' },
                        
                      ]"
                       >
                         <el-select v-model="ruleForm.zhujie.EDUCATION" size="small" placeholder="">
                            <el-option 
                              v-for="item in xueli"
                              :key="item.CODE"
                              :label="item.NAME" 
                              :value="item.CODE"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="工作年限" 
                       prop="zhujie.WORKINGLIFE"
                      :rules="[
                        { required: true, message: '请输入工作年限', trigger: 'blur' },
                        
                      ]"
                       >
                          <el-input  v-model="ruleForm.zhujie.WORKINGLIFE" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">   
                      <el-form-item label="婚姻状态" 
                      prop="zhujie.MARRIAGESTATUS"
                      :rules="[
                        { required: true, message: '请输入婚姻状态', trigger: 'change' },
                        
                      ]"
                      >
                        <el-select v-model="ruleForm.zhujie.MARRIAGESTATUS" size="small" placeholder="">
                          <el-option 
                            v-for="item in hunyin"
                            :key="item.CODE"
                            :label="item.NAME" 
                            :value="item.CODE"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="户口本所在地" 
                       prop="zhujie.LOCATION"
                      :rules="[
                        { required: true, message: '请输入户口本所在地', trigger: 'blur' },
                        
                      ]"
                       >
                          <el-radio v-model="ruleForm.zhujie.LOCATION" label="00004">本地</el-radio>
                          <el-radio v-model="ruleForm.zhujie.LOCATION" label="00005">非本地</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="家庭人数" 
                       prop="zhujie.FAMILYSIZE"
                      :rules="[
                        { required: true, message: '请输入家庭人数', trigger: 'blur' },
                        
                      ]"
                       >
                            <el-input v-model="ruleForm.zhujie.FAMILYSIZE" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                  </el-row>




                    
                  <el-col :span="20" :offset="2">
                      <p class="pline"></p>
                  </el-col>
                  <div class="formtitle">
                    <span>工作信息</span>
                  </div>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="单位名称" 
                      prop="zhujie.COMPANY"
                      :rules="[
                        { required: true, message: '请输入单位名称', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small"  v-model="ruleForm.zhujie.COMPANY" style="width:88%"></el-input>
                        <el-checkbox v-model="ruleForm.zhujie.CHEATFLAG" label="2">疑似欺诈</el-checkbox>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="工作单位类型" 
                      prop="zhujie.CAPARTY05"
                      :rules="[
                        { required: true, message: '请输入工作单位类型', trigger: 'blur' },
                        
                      ]"
                      >
                       <el-select filterable v-model="ruleForm.zhujie.CAPARTY05" size="small" placeholder="">
                          <el-option 
                            v-for="item in gdtype"
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
                    <el-col :span="24">
                      <el-form-item label="行业类型" 
                      prop="zhujie.CAPARTY01"
                      :rules="[
                        { required: true, message: '请输入行业类型', trigger: 'blur' },
                        
                      ]"
                      >
                       <el-select filterable v-model="ruleForm.zhujie.CAPARTY01" size="small" placeholder="">
                          <el-option 
                            v-for="item in hangye"
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
                    <el-col :span="24">
                      <el-form-item label="职业类型" 
                      prop="zhujie.CAPARTY03"
                      :rules="[
                        { required: true, message: '请输入职业类型', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-cascader
                        style="width:100%" 
                        :options="zhiye" 
                        v-model="ruleForm.zhujie.CAPARTY03"
                        >

                        </el-cascader>
                       
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="雇员类型" 
                      prop="zhujie.CAPARTY02"
                      :rules="[
                        { required: true, message: '请输入雇员类型', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-select filterable v-model="ruleForm.zhujie.CAPARTY02" size="small" placeholder="">
                          <el-option 
                            v-for="item in guyuan"
                            :key="item.CODE"
                            :label="item.NAME" 
                            :value="item.CODE"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                  
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="职位" 
                      prop="zhujie.CAPARTY04"
                      :rules="[
                        { required: true, message: '请输入职位', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-select filterable v-model="ruleForm.zhujie.CAPARTY04" size="small" placeholder="">
                          <el-option 
                            v-for="item in zhiwei"
                            :key="item.CODE"
                            :label="item.NAME" 
                            :value="item.CODE"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  
                    <el-col :span="8">
                      <el-form-item label="规模" 
                      prop="zhujie.SCALE"
                      :rules="[
                        { required: true, message: '请输入规模', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.zhujie.SCALE"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="本人月收入" 
                      prop="zhujie.PINCOME"
                      :rules="[
                        { required: true, message: '请输入本人月收入', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.zhujie.PINCOME"></el-input>
                      </el-form-item>
                  
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="家庭其他收入" 
                      prop="zhujie.FINCOME"
                      :rules="[
                        { required: true, message: '请输入家庭其他收入', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.zhujie.FINCOME"></el-input>
                      </el-form-item>
                    </el-col>
                  
                    <el-col :span="8">
                      <el-form-item label="家庭月支出" 
                      prop="zhujie.EXPENDITURE"
                      :rules="[
                        { required: true, message: '请输入家庭月支出', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.zhujie.EXPENDITURE"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="未结清贷款" 
                      prop="zhujie.LOAN"
                      :rules="[
                        { required: true, message: '请输入未结清贷款', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" type="number" v-model="ruleForm.zhujie.LOAN"></el-input>
                      </el-form-item>
                  
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="每月还款额" 
                      prop="zhujie.PAYMENT"
                      :rules="[
                        { required: true, message: '请输入每月还款额', trigger: 'blur' },
                      ]"
                      >
                        <el-input size="small" type="number" v-model="ruleForm.zhujie.PAYMENT"></el-input>
                      </el-form-item>
                    </el-col>
                  
                    
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="电话" 
                      prop="zhujie.PHONE"
                      :rules="[
                        { required: true, validator: validatePhone, trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.zhujie.PHONE"></el-input>
                      </el-form-item>
                  
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="公司电话" 
                       prop="zhujie.PHONEC"
                      :rules="[
                        { required: true, message: '请输入公司电话', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.zhujie.PHONEC"></el-input>
                      </el-form-item>
                    </el-col>
                  
                    <el-col :span="8">
                      
                    </el-col>
                  </el-row>
                  <el-col :span="20" :offset="2">
                      <p class="pline"></p>
                  </el-col>
                  <div class="formtitle">
                    <span>地址信息</span>
                    <span><el-button style="float: right; padding: 3px 0; color: #64ecdf;" type="text" @click="handelAdd('zhujie')"> 新增</el-button></span>
                  </div>
                  <el-row class="cardback">
                    <el-col :span="12">
                      <el-card class="cardnei">
                        <div slot="header" class="clearfix borderbottom">
                          <img :src="homeloc" alt="" style="vertical-align: text-bottom;">
                          <span style="color:red">*</span><span style="padding-left:5px">家庭地址</span>
                          <el-button style="float: right; padding: 3px 0" type="text"></el-button>
                        </div>
                        <div  class="text item">
                          <el-form-item label="" label-width='0px'
                          prop = 'zhujie.zhujiedizhi.AREA[0]'
                           :rules = "[
                          { required: true, message: '请输入地址', trigger: 'change' }
                          ]"
                           >
                          <el-cascader
                            style="width:100%"
                            size="small"
                            :options="options"
                            v-model="ruleForm.zhujie.zhujiedizhi.AREA[0]"
                            @change="handleChange(0)">
                          </el-cascader>
                          </el-form-item>
                          <el-form-item label="" label-width='0px' 
                          prop = 'zhujie.zhujiedizhi.ADDRESS[0]'
                           :rules = "[
                          { required: true, message: '请输入详细地址', trigger: 'blur' }
                          ]"
                          >
                            <el-input size="small" style="width:75%" v-model="ruleForm.zhujie.zhujiedizhi.ADDRESS[0]" placeholder="详细地址"></el-input>
                            <el-checkbox 
                            v-model="ruleForm.zhujie.zhujiedizhi.ISDEFAULT[0]" true-label="1" false-label="0" label="1">邮寄地址</el-checkbox>
                          </el-form-item>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px'
                              prop = 'zhujie.zhujiedizhi.POSTNO[0]'
                              :rules = "[
                              { required: true, message: '请输入邮政编码', trigger: 'blur' }
                              ]"
                              >
                                <el-input size="small" v-model="ruleForm.zhujie.zhujiedizhi.POSTNO[0]" placeholder="邮政编码"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px' 
                              prop = 'zhujie.zhujiedizhi.PROPERTYTYPE[0]'
                              :rules = "[
                              { required: true, message: '请输入房产类型', trigger: 'change' }
                              ]"
                              >
                                <el-select v-model="ruleForm.zhujie.zhujiedizhi.PROPERTYTYPE[0]"  size="small" placeholder="房产类型">
                                  <el-option 
                                    v-for="item in fangchantype"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-form-item label="" label-width='0px' 
                          prop = 'zhujie.zhujiedizhi.CDATE[0]'
                              :rules = "[
                              { required: true, message: '请输入起始时间', trigger: 'blur' }
                              ]"
                          >
                            <el-date-picker
                              style="width:100%"
                              size="small"
                              v-model="ruleForm.zhujie.zhujiedizhi.CDATE[0]"
                              type="date"
                              placeholder="起始时间">
                            </el-date-picker>
                          </el-form-item>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="12" >
                      <el-card class="cardnei">
                        <div slot="header" class="clearfix borderbottom">
                          <img :src="coploc" alt="" style="vertical-align: text-bottom;">
                          <span style="color:red">*</span><span style="padding-left:5px">办公室地址</span>
                          <el-button style="float: right; padding: 3px 0;color:#5ADACB" @click="zhujiejiat" type="text">与家庭地址一样</el-button>
                        </div>
                        <div  class="text item">
                          <el-form-item label="" label-width='0px' 
                           prop = 'zhujie.zhujiedizhi.AREA[1]'
                           :rules = "[
                          { required: true, message: '请输入地址', trigger: 'change' }
                          ]"
                          >
                            <el-cascader
                              style="width:100%"
                              size="small"
                              :options="options"
                              v-model="ruleForm.zhujie.zhujiedizhi.AREA[1]"
                              @change="handleChange(1)">
                            </el-cascader>
                          </el-form-item>
                          <el-form-item label="" label-width='0px'
                          prop = 'zhujie.zhujiedizhi.ADDRESS[1]'
                           :rules = "[
                          { required: true, message: '请输入详细地址', trigger: 'blur' }
                          ]"
                           >
                            <el-input size="small" style="width:75%" v-model="ruleForm.zhujie.zhujiedizhi.ADDRESS[1]"  placeholder="详细地址"></el-input>
                            <el-checkbox v-model="ruleForm.zhujie.zhujiedizhi.ISDEFAULT[1]" true-label="1" false-label="0" label="1">邮寄地址</el-checkbox>
                          </el-form-item>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px'
                              prop = 'zhujie.zhujiedizhi.POSTNO[1]'
                              :rules = "[
                              { required: true, message: '请输入邮政编码', trigger: 'blur' }
                              ]"
                              >
                                <el-input size="small" v-model="ruleForm.zhujie.zhujiedizhi.POSTNO[1]" placeholder="邮政编码"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px' 
                               prop = 'zhujie.zhujiedizhi.PROPERTYTYPE[1]'
                                :rules = "[
                                { required: true, message: '请输入房产类型', trigger: 'change' }
                                ]"
                              >
                                <el-select v-model="ruleForm.zhujie.zhujiedizhi.PROPERTYTYPE[1]"  size="small" placeholder="房产类型">
                                  <el-option 
                                    v-for="item in fangchantype"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-form-item label="" label-width='0px' 
                                prop = 'zhujie.zhujiedizhi.CDATE[1]'
                                :rules = "[
                                { required: true, message: '请输入起始时间', trigger: 'blur' }
                                ]"
                          >
                            <el-date-picker
                              style="width:100%"
                              size="small"
                              v-model="ruleForm.zhujie.zhujiedizhi.CDATE[1]"
                              type="date"
                              placeholder="起始时间">
                            </el-date-picker>
                          </el-form-item>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                    <el-col :span="12" class="cardback" v-for="(sval,skey) in (dataLength-2)" :key='skey' v-if="(addcard.indexOf(sval)+1)==sval" >
                      <el-card class="cardnei">
                        <div slot="header" class="clearfix borderbottom">
                          
                          <el-form-item label="" label-width='0px' style='margin-bottom:0px'
                           :prop = "'zhujie.zhujiedizhi.ADDRESSTYPE[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入地址类型', trigger: 'change' }
                          ]"
                          >
                            <el-select v-model="ruleForm.zhujie.zhujiedizhi.ADDRESSTYPE[skey+2]" style="width:60%" size="small" placeholder="选择地址类型">
                               <el-option 
                                  v-for="item in dizhi"
                                  :key="item.CODE"
                                  :label="item.NAME" 
                                  :value="item.CODE"
                                >
                                </el-option>
                            </el-select>
                            <el-button style="float: right; padding: 3px 0;" type="text" @click="handeldel(sval,'zhujie')">移除</el-button>
                          </el-form-item>
                         
                        </div>
                        <div  class="text item">
                          <el-form-item label="" label-width='0px' 
                          :prop = "'zhujie.zhujiedizhi.AREA[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入地址', trigger: 'change' }
                          ]"
                          >
                            <el-cascader
                              style="width:100%"
                              size="small"
                              :options="options"
                              v-model="ruleForm.zhujie.zhujiedizhi.AREA[skey+2]"
                              @change="handleChange(skey+2)">
                            </el-cascader>
                          </el-form-item>
                          <el-form-item label="" label-width='0px' 
                           :prop = "'zhujie.zhujiedizhi.ADDRESS[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入详细地址', trigger: 'blur' }
                          ]"
                          >
                            <el-input size="small" v-model="ruleForm.zhujie.zhujiedizhi.ADDRESS[skey+2]" placeholder="详细地址"></el-input>
                            
                          </el-form-item>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px'
                              :prop = "'zhujie.zhujiedizhi.POSTNO[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入邮政编码', trigger: 'blur' }
                          ]"
                              >
                                <el-input size="small" v-model="ruleForm.zhujie.zhujiedizhi.POSTNO[skey+2]" placeholder="邮政编码"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px' 
                               :prop = "'zhujie.zhujiedizhi.PROPERTYTYPE[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入房产类型', trigger: 'change' }
                          ]"
                              >
                                <el-select v-model="ruleForm.zhujie .zhujiedizhi.PROPERTYTYPE[skey+2]"  size="small" placeholder="房产类型">
                                  <el-option 
                                    v-for="item in fangchantype"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-form-item label="" label-width='0px'
                          :prop = "'zhujie.zhujiedizhi.CDATE[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入起始时间', trigger: 'blur' }
                          ]"
                           >
                            <el-date-picker
                              style="width:100%"
                              size="small"
                              v-model="ruleForm.zhujie.zhujiedizhi.CDATE[skey+2]"
                              type="date"
                              placeholder="起始时间">
                            </el-date-picker>
                          </el-form-item>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="12" class="cardback" v-if="cardnum%2!=0">
                      <el-card class="cardadd">
                            <i  class="el-icon-plus"></i>
                      </el-card>
                    </el-col>
                    <el-col :span="20" :offset="2">
                      <p class="pline"></p>
                    </el-col>
                    <div class="formtitle">
                      <span>其他信息</span>
                    </div>
                    <el-row>
                      <el-col :span="12">
                      
                        <el-form-item label="驾驶证件" >
                          <el-select filterable v-model="ruleForm.zhujie.DRIVERLICENSE" size="small" placeholder="">
                          <el-option 
                            v-for="item in jiashizhengjian"
                            :key="item.CODE"
                            :label="item.NAME" 
                            :value="item.CODE"
                          >
                          </el-option>
                        </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="" >
                          <el-input size="small" v-model="ruleForm.zhujie.DRIVERNO" placeholder="档案编号"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="收入证明" >
                          <el-input size="small" v-model="ruleForm.zhujie.OPERATOR1" placeholder="经办人"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="" >
                          <el-input size="small" v-model="ruleForm.zhujie.OPERATOR1PHONE" placeholder="联系电话"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="居住证明" >
                          <el-input size="small" v-model="ruleForm.zhujie.OPERATOR2" placeholder="经办人"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="" >
                          <el-input size="small" v-model="ruleForm.zhujie.OPERATOR2PHONE" placeholder="联系电话"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                </div>
                
              </el-collapse-item>
            </el-collapse>
          
        </el-col>
      
       <Affix :offset-top="20" >
      <div class="siderbarhref">
          <ul>
            <li @click.prevent="custormAnchor('oneAnchor')" :class="{hrefactive: oneActive}">主借人信息<i :class="{xiesanjiao: oneActive}" ></i></li>
            <li @click.prevent="custormAnchor('twoAnchor')" :class="{hrefactive: twoActive}">紧急联系人<i :class="{xiesanjiao: twoActive}"></i></li>
            <li v-show="gongjieren" @click.prevent="custormAnchor('threeAnchor')" :class="{hrefactive: threeActive}">共借人信息<i :class="{xiesanjiao: threeActive}" ></i></li>
            <li v-show="baozhengren" @click.prevent="custormAnchor('fourAnchor')" :class="{hrefactive: fourActive}">保证人信息<i :class="{xiesanjiao: fourActive}" ></i></li>
          </ul>
      </div>

      </Affix>
      <Affix :offset-top="850">
          <div class="topbootom">
            <ul style="background-color:#ffffff;width:35px;height:92px;border-radius: 4px;box-shadow: 0 1px 4px 0 ">
              <li style="height:30px;line-height:30px;text-align:center;padding-top:3px;border-bottom:1px solid #FAFAFA;">
                <img :src="top" alt="" @click="toTop" >
              </li>
              <li style="height:30px;line-height:30px;text-align:center;padding-top:3px;border-bottom:1px solid #FAFAFA; ">
                <el-tooltip   effect="light" placement="left" >
                <div slot="content" >客服热线：400-6527-606<br/>工作时间：8:30-17:30</div>
                <el-button style="padding:0;border:none"><img :src="hotline" alt="" ></el-button>
                </el-tooltip>
          
              </li>
              <li :class="[isShowchuru ? 'showchu' : 'showru']"  @mouseenter="showwtru"  @mouseleave="showwtchu"><img :src="question" alt="" v-if="showwtt" ><span v-if="showwt">常见问题</span></li>
            </ul>
          </div>
        </Affix>
      </el-row>
      <div id="twoAnchor"></div>
      <el-row class="midcontent">
        <el-col :span="22" :offset="1" >
          <el-collapse v-model="activeNames" >
              <el-collapse-item name="2">
                <template slot="title">
                 <span class="titleleft"> 紧急联系人 <span style="font-size:12px;color: #999999;">至少填写两人</span></span> 
                </template>
                <el-col :span="24">
                  <p class="pline"></p>
                </el-col>
                <el-row>
                <el-col :span="24">
                  <el-button style="float: right; padding: 5px 5px;margin:5px" type="success" class="btncolor" @click="addjinji" > 新增</el-button>
                </el-col>
                </el-row>
                
                <el-row>
                  <el-col :span="12" class="cardback"  >
                    <el-card class="cardnei">
                          <div slot="header" class="clearfix borderbottom">
                          <span class="numjin">1</span>
                          </div>
                          <div  class="text item">
                              <el-form-item label="" label-width='0px' >
                                <el-select v-model="ruleForm.jinjinlianxi.RELATIONSHIP[0]"  size="small" placeholder="与申请人关系">
                                  <el-option 
                                    v-for="item in guanxi"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item label=""  label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.NAME[0]" placeholder="姓名"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="" label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.PHONE[0]" placeholder="联系电话"></el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item label=""  label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.COMPANY[0]" placeholder="公司名称"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="" label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.COMPANYPHONE[0]" placeholder="公司电话"></el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-form-item label="" label-width='0px' >
                                <el-select v-model="ruleForm.jinjinlianxi.CARDTYPE[0]"  size="small" placeholder="证件类型">
                                  <el-option 
                                    v-for="item in idcardlist"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item label=""  label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.CARD[0]" placeholder="证件号码"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="" label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.INCOME[0]" placeholder="月收入"></el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-form-item label="" label-width='0px' >
                                <el-input v-model="ruleForm.jinjinlianxi.HOMEADDRESS[0]" size="small" style="width:65%" placeholder="现居住地"></el-input>
                                
                              </el-form-item>
                          </div>
                    </el-card>
                  </el-col>
                  <el-col :span="12" class="cardback"  >
                    <el-card class="cardnei">
                          <div slot="header" class="clearfix borderbottom">
                          <span class="numjin">2</span>
                          </div>
                          <div  class="text item">
                              <el-form-item label="" label-width='0px' >
                               <el-select v-model="ruleForm.jinjinlianxi.RELATIONSHIP[1]"  size="small" placeholder="与申请人关系">
                                  <el-option 
                                    v-for="item in guanxi"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item label=""  label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.NAME[1]" placeholder="姓名"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="" label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.PHONE[1]" placeholder="联系电话"></el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item label=""  label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.COMPANY[1]"  placeholder="公司名称"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="" label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.COMPANYPHONE[1]" placeholder="公司电话"></el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-form-item label="" label-width='0px' >
                                <el-select v-model="ruleForm.jinjinlianxi.CARDTYPE[1]"  size="small" placeholder="证件类型">
                                  <el-option 
                                    v-for="item in idcardlist"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item label=""  label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.CARD[1]" placeholder="证件号码"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="" label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.INCOME[1]" placeholder="月收入"></el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-form-item label="" label-width='0px' >
                                <el-input size="small" v-model="ruleForm.jinjinlianxi.HOMEADDRESS[1]" style="width:65%" placeholder="现居住地"></el-input>
                                
                              </el-form-item>
                          </div>
                    </el-card>
                  </el-col>
                </el-row>

                <el-col :span="12" class="cardback"  v-for="(sval,skey) in (jinjiLength-2)" :key='skey' v-if="(jinjicard.indexOf(sval)+1)==sval">
                    <el-card class="cardnei">
                          <div slot="header" class="clearfix borderbottom">
                          <span class="numjin">{{skey+3}}</span>
                          </div>
                          <div  class="text item">
                              <el-form-item label="" label-width='0px' >
                                <el-select 
                                style="width:60%" v-model="ruleForm.jinjinlianxi.RELATIONSHIP[skey+2]"  size="small" placeholder="与申请人关系">
                                  <el-option 
                                    v-for="item in guanxi"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                                <el-button style="float: right; padding: 3px 0;" type="text" @click="handeldel(sval,'jinji')">移除</el-button>
                              </el-form-item>
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item label=""  label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.NAME[skey+2]" placeholder="姓名"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="" label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.PHONE[skey+2]" placeholder="联系电话"></el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item label=""  label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.COMPANY[skey+2]" placeholder="公司名称"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="" label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.COMPANYPHONE[skey+2]" placeholder="公司电话"></el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-form-item label="" label-width='0px' >
                                <el-select v-model="ruleForm.jinjinlianxi.CARDTYPE[skey+2]"  size="small" placeholder="证件类型">
                                  <el-option 
                                    v-for="item in idcardlist"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item label=""  label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.CARD[skey+2]" placeholder="证件号码"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="" label-width='0px'>
                                    <el-input size="small" v-model="ruleForm.jinjinlianxi.INCOME[skey+2]" placeholder="月收入"></el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-form-item label="" label-width='0px' >
                                <el-input size="small" v-model="ruleForm.jinjinlianxi.HOMEADDRESS[skey+2]" style="width:65%" placeholder="现居住地"></el-input>
                                
                              </el-form-item>
                          </div>
                    </el-card>
                  </el-col>
                  <el-col :span="12"  class="cardback" v-if="jinjinum%2!=0">
                      <el-card class="cardadd" style="height:403px">
                            <i  class="el-icon-plus"></i>
                      </el-card>
                    </el-col>
              </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <div id="threeAnchor"></div>
      <el-row class="midcontent" v-show="gongjieren">
        <el-col :span="22" :offset="1" >
          <el-collapse v-model="activeNames" >
            <el-collapse-item name="3">
              <template slot="title">
                 <span class="titleleft"> 共借人信息</span>
                </template>
                <el-col :span="24">
                  <p class="pline"></p>
                </el-col>
                <el-col :span="24">
                   
                </el-col>
                <div class="formtitle">
                  <span>基本信息</span>
                </div>
                <div>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="证件类型" 
                      prop="gongjieren.CARDTYPE"
                      :rules="[
                        { required: true, message: '请输入证件类型', trigger: 'change' },
                        
                      ]"
                      >
                        <el-select v-model="ruleForm.gongjieren.CARDTYPE" size="mini" style="width:85%" placeholder="" @change="currentSel">
                          <el-option
                            v-for="item in idcardlist"
                            :key="item.CODE"
                            :label="item.NAME"
                            :value="item.CODE">
                          </el-option>
                        </el-select>
                        
                        <el-button  size="mini" @click="ocrrenzheng('gongjie')" v-show="selItemShow"  v-loading.fullscreen.lock="fullscreenLoading" class="ocrclass">OCR识别</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">   
                      <el-form-item label="姓名" 
                      prop="gongjieren.NAME"
                      :rules="[
                        { required: true, message: '请输入电话', trigger: 'blur' },
                        
                      ]"
                      >
                          <el-input v-model="ruleForm.gongjieren.NAME" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="证件号码" 
                      prop="gongjieren.CARD"
                      :rules="[
                        { required: true, message: '请输入证件号码', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input v-model="ruleForm.gongjieren.CARD" size="small"></el-input> 
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="到期日" 
                      prop="gongjieren.CARDDATE"
                      :rules="[
                        { required: true, message: '请输入到期日', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-date-picker type="date" v-model="ruleForm.gongjieren.CARDDATE"  placeholder="选择日期" size="small" style="width: 65%;"></el-date-picker>
                          <el-checkbox v-model="ruleForm.gongjieren.LONGE" label="1">长期</el-checkbox>
                      </el-form-item>  
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">   
                      <el-form-item label="出生年月" 
                      prop="gongjieren.BIRTHDAY"
                      :rules="[
                        { required: true, message: '请输入出生年月', trigger: 'blur' },
                        
                      ]"
                      >
                       <el-date-picker type="date" v-model="ruleForm.gongjieren.BIRTHDAY"  placeholder="选择日期" size="small" ></el-date-picker>
                       
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="性别" 
                       prop="gongjieren.SEX"
                      :rules="[
                        { required: true, message: '请输入性别', trigger: 'blur' },
                        
                      ]"
                       >
                          <el-radio v-model="ruleForm.gongjieren.SEX" label="M">男</el-radio>
                          <el-radio v-model="ruleForm.gongjieren.SEX" label="F">女</el-radio>
                          <el-radio v-model="ruleForm.gongjieren.SEX" label="3">未知</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="英文姓名/拼音" 
                       prop="gongjieren.ENAME"
                      :rules="[
                        { required: true, message: '请输入英文姓名/拼音', trigger: 'blur' },
                        
                      ]"
                       >
                          <el-input v-model="ruleForm.gongjieren.ENAME" size="small"></el-input>
                        </el-form-item> 
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">   
                      <el-form-item label="备注" >
                        <el-input 
                        v-model="ruleForm.gongjieren.MEMO"
                        type="textarea"
                        :rows="1"
                        placeholder="请输入内容"
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="学历" 
                        prop="gongjieren.EDUCATION"
                      :rules="[
                        { required: true, message: '请输入学历', trigger: 'blur' },
                        
                      ]"
                       >
                         <el-select v-model="ruleForm.gongjieren.EDUCATION" size="small" placeholder="">
                            <el-option 
                              v-for="item in xueli"
                              :key="item.CODE"
                              :label="item.NAME" 
                              :value="item.CODE"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="工作年限"
                        prop="gongjieren.WORKINGLIFE"
                      :rules="[
                        { required: true, message: '请输入工作年限', trigger: 'blur' },
                        
                      ]"
                        >
                          <el-input  v-model="ruleForm.gongjieren.WORKINGLIFE" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">   
                      <el-form-item label="婚姻状态" 
                      prop="gongjieren.MARRIAGESTATUS"
                      :rules="[
                        { required: true, message: '请输入婚姻状态', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-select v-model="ruleForm.gongjieren.MARRIAGESTATUS" size="small" placeholder="">
                          <el-option 
                            v-for="item in hunyin"
                            :key="item.CODE"
                            :label="item.NAME" 
                            :value="item.CODE"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="户口本所在地"  prop="gongjieren.LOCATION"
                      :rules="[
                        { required: true, message: '请输入户口本所在地', trigger: 'blur' },
                        
                      ]">
                          <el-radio v-model="ruleForm.gongjieren.LOCATION" label="00004">本地</el-radio>
                          <el-radio v-model="ruleForm.gongjieren.LOCATION" label="00005">非本地</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="家庭人数" 
                       prop="gongjieren.FAMILYSIZE"
                      :rules="[
                        { required: true, message: '请输入家庭人数', trigger: 'blur' },
                        
                      ]"
                       >
                            <el-input v-model="ruleForm.gongjieren.FAMILYSIZE" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                  </el-row>
                  <el-col :span="20" :offset="2">
                      <p class="pline"></p>
                  </el-col>
                  <div class="formtitle">
                    <span>工作信息</span>
                  </div>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="单位名称" 
                      prop="gongjieren.COMPANY"
                      :rules="[
                        { required: true, message: '请输入单位名称', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small"  v-model="ruleForm.gongjieren.COMPANY" style="width:88%"></el-input>
                        <el-checkbox v-model="ruleForm.gongjieren.CHEATFLAG" label="2">疑似欺诈</el-checkbox>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="工作单位类型" 
                      prop="gongjieren.CAPARTY05"
                      :rules="[
                        { required: true, message: '请输入工作单位类型', trigger: 'blur' },
                        
                      ]"
                      >
                       <el-select filterable v-model="ruleForm.gongjieren.CAPARTY05" size="small" placeholder="">
                          <el-option 
                            v-for="item in gdtype"
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
                    <el-col :span="24">
                      <el-form-item label="行业类型" 
                       prop="gongjieren.CAPARTY01"
                      :rules="[
                        { required: true, message: '请输入行业类型', trigger: 'change' },
                        
                      ]"
                      >
                       <el-select filterable v-model="ruleForm.gongjieren.CAPARTY01" size="small" placeholder="">
                          <el-option 
                            v-for="item in hangye"
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
                    <el-col :span="24">
                      <el-form-item label="职业类型" 
                      prop="gongjieren.CAPARTY03"
                      :rules="[
                        { required: true, message: '请输入职业类型', trigger: 'change' },
                        
                      ]"
                      >
                        <el-cascader
                        style="width:100%" 
                        :options="zhiye" 
                        v-model="ruleForm.gongjieren.CAPARTY03"
                        >

                        </el-cascader>
                       
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="雇员类型" 
                      prop="gongjieren.CAPARTY02"
                      :rules="[
                        { required: true, message: '请输入雇员类型', trigger: 'change' },
                        
                      ]"
                      >
                        <el-select filterable v-model="ruleForm.gongjieren.CAPARTY02" size="small" placeholder="">
                          <el-option 
                            v-for="item in guyuan"
                            :key="item.CODE"
                            :label="item.NAME" 
                            :value="item.CODE"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                  
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="职位" 
                      prop="gongjieren.CAPARTY04"
                      :rules="[
                        { required: true, message: '请输入职位', trigger: 'change' },
                        
                      ]"
                      >
                        <el-select filterable v-model="ruleForm.gongjieren.CAPARTY04" size="small" placeholder="">
                          <el-option 
                            v-for="item in zhiwei"
                            :key="item.CODE"
                            :label="item.NAME" 
                            :value="item.CODE"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  
                    <el-col :span="8">
                      <el-form-item label="规模" 
                      prop="gongjieren.SCALE"
                      :rules="[
                        { required: true, message: '请输入规模', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.gongjieren.SCALE"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="本人月收入" 
                      prop="gongjieren.PINCOME"
                      :rules="[
                        { required: true, message: '请输入本人月收入', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.gongjieren.PINCOME"></el-input>
                      </el-form-item>
                  
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="家庭其他收入" 
                      prop="gongjieren.FINCOME"
                      :rules="[
                        { required: true, message: '请输入家庭其他收入', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.gongjieren.FINCOME"></el-input>
                      </el-form-item>
                    </el-col>
                  
                    <el-col :span="8">
                      <el-form-item label="家庭月支出"
                      prop="gongjieren.EXPENDITURE"
                      :rules="[
                        { required: true, message: '请输入家庭月支出', trigger: 'blur' },
                        
                      ]"
                       >
                        <el-input size="small" v-model="ruleForm.gongjieren.EXPENDITURE"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="未结清贷款" 
                       prop="gongjieren.LOAN"
                      :rules="[
                        { required: true, message: '请输入未结清贷款', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.gongjieren.LOAN"></el-input>
                      </el-form-item>
                  
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="每月还款额" 
                      prop="gongjieren.PAYMENT"
                      :rules="[
                        { required: true, message: '请输入每月还款额', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.gongjieren.PAYMENT"></el-input>
                      </el-form-item>
                    </el-col>
                  
                    
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="电话" 
                       prop="gongjieren.PHONE"
                      :rules="[
                        { required: true, message: '请输入电话', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.gongjieren.PHONE"></el-input>
                      </el-form-item>
                  
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="公司电话" >
                        <el-input size="small" v-model="ruleForm.gongjieren.PHONEC"></el-input>
                      </el-form-item>
                    </el-col>
                  
                    <el-col :span="8">
                      <el-form-item label="外部电话" >
                        <el-input size="small" v-model="ruleForm.gongjieren.PHONE2"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-col :span="20" :offset="2">
                      <p class="pline"></p>
                  </el-col>
                  <div class="formtitle">
                    <span>地址信息</span>
                    <span><el-button @click="gongjiezhu" style=" padding: 3px 0;color:#5ADACB" type="text">与主借人一致</el-button><el-button style="float: right; padding: 3px 0; color: #64ecdf;" type="text" @click="handelAdd('gongjie')"> 新增</el-button></span>
                  </div>
                  <el-row class="cardback">
                    <el-col :span="12">
                      <el-card class="cardnei">
                        <div slot="header" class="clearfix borderbottom">
                          <img :src="homeloc" alt="" style="vertical-align: text-bottom;">
                          <span style="color:red">*</span><span style="padding-left:5px">家庭地址</span>
                          <el-button style="float: right; padding: 3px 0" type="text"></el-button>
                        </div>
                        <div  class="text item">
                          <el-form-item label="" label-width='0px'
                          prop = 'gongjieren.zhujiedizhi.AREA[0]'
                           :rules = "[
                          { required: true, message: '请输入地址', trigger: 'change' }
                          ]"
                           >
                          <el-cascader
                            style="width:100%"
                            size="small"
                            :options="options"
                            v-model="ruleForm.gongjieren.zhujiedizhi.AREA[0]"
                            @change="handleChange(0)">
                          </el-cascader>
                          </el-form-item>
                          <el-form-item label="" label-width='0px' 
                          prop = 'gongjieren.zhujiedizhi.ADDRESS[0]'
                           :rules = "[
                          { required: true, message: '请输入详细地址', trigger: 'blur' }
                          ]"
                          >
                            <el-input size="small" style="width:75%" v-model="ruleForm.gongjieren.zhujiedizhi.ADDRESS[0]" placeholder="详细地址"></el-input>
                            <el-checkbox v-model="ruleForm.gongjieren.zhujiedizhi.ISDEFAULT[0]" true-label="1" false-label="0" label="1">邮寄地址</el-checkbox>
                          </el-form-item>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px'
                              prop = 'gongjieren.zhujiedizhi.POSTNO[0]'
                              :rules = "[
                              { required: true, message: '请输入邮政编码', trigger: 'blur' }
                              ]"
                              >
                                <el-input size="small" v-model="ruleForm.gongjieren.zhujiedizhi.POSTNO[0]" placeholder="邮政编码"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px' 
                              prop = 'gongjieren.zhujiedizhi.PROPERTYTYPE[0]'
                              :rules = "[
                              { required: true, message: '请输入房产类型', trigger: 'change' }
                              ]"
                              >
                                <el-select v-model="ruleForm.gongjieren.zhujiedizhi.PROPERTYTYPE[0]"  size="small" placeholder="房产类型">
                                  <el-option 
                                    v-for="item in fangchantype"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-form-item label="" label-width='0px' 
                          prop = 'gongjieren.zhujiedizhi.CDATE[0]'
                            :rules = "[
                            { required: true, message: '请输入起始时间', trigger: 'change' }
                            ]"
                          >
                            <el-date-picker
                              style="width:100%"
                              size="small"
                              v-model="ruleForm.gongjieren.zhujiedizhi.CDATE[0]"
                              type="datetime"
                              placeholder="起始时间">
                            </el-date-picker>
                          </el-form-item>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="12" >
                      <el-card class="cardnei">
                        <div slot="header" class="clearfix borderbottom">
                          <img :src="coploc" alt="" style="vertical-align: text-bottom;">
                          <span style="color:red">*</span><span style="padding-left:5px">办公室地址</span>
                          
                        </div>
                        <div  class="text item">
                          <el-form-item label="" label-width='0px' 
                            prop = 'gongjieren.zhujiedizhi.AREA[1]'
                           :rules = "[
                          { required: true, message: '请输入地址', trigger: 'change' }
                          ]"
                          >
                            <el-cascader
                              style="width:100%"
                              size="small"
                              :options="options"
                              v-model="ruleForm.gongjieren.zhujiedizhi.AREA[1]"
                              @change="handleChange(1)">
                            </el-cascader>
                          </el-form-item>
                          <el-form-item label="" label-width='0px'
                          prop = 'gongjieren.zhujiedizhi.ADDRESS[1]'
                           :rules = "[
                          { required: true, message: '请输入详细地址', trigger: 'blur' }
                          ]"
                           >
                            <el-input size="small" style="width:75%" v-model="ruleForm.gongjieren.zhujiedizhi.ADDRESS[1]"  placeholder="详细地址"></el-input>
                            <el-checkbox v-model="ruleForm.gongjieren.zhujiedizhi.ISDEFAULT[1]" true-label="1" false-label="0" label="1">邮寄地址</el-checkbox>
                          </el-form-item>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px'
                              prop = 'gongjieren.zhujiedizhi.POSTNO[1]'
                              :rules = "[
                              { required: true, message: '请输入邮政编码', trigger: 'blur' }
                              ]"
                              >
                                <el-input size="small" v-model="ruleForm.gongjieren.zhujiedizhi.POSTNO[1]" placeholder="邮政编码"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px' 
                              prop = 'gongjieren.zhujiedizhi.PROPERTYTYPE[1]'
                              :rules = "[
                              { required: true, message: '请输入房产类型', trigger: 'change' }
                              ]"
                               >
                                <el-select v-model="ruleForm.gongjieren.zhujiedizhi.PROPERTYTYPE[1]"  size="small" placeholder="房产类型">
                                  <el-option 
                                    v-for="item in fangchantype"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-form-item label="" label-width='0px' 
                          prop = 'gongjieren.zhujiedizhi.CDATE[1]'
                          :rules = "[
                          { required: true, message: '请输入起始时间', trigger: 'change' }
                          ]"
                          >
                            <el-date-picker
                              style="width:100%"
                              size="small"
                              v-model="ruleForm.gongjieren.zhujiedizhi.CDATE[1]"
                              type="datetime"
                              placeholder="起始时间">
                            </el-date-picker>
                          </el-form-item>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                    <el-col :span="12" class="cardback" v-for="(sval,skey) in (dataLengthg-2)" :key='skey' v-if="(addcardg.indexOf(sval)+1)==sval" >
                      <el-card class="cardnei">
                        <div slot="header" class="clearfix borderbottom">
                          
                          <el-form-item label="" label-width='0px' style='margin-bottom:0px'
                          :prop = "'gongjieren.zhujiedizhi.ADDRESSTYPE[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入地址类型', trigger: 'change' }
                          ]"
                          >
                            <el-select v-model="ruleForm.gongjieren.zhujiedizhi.ADDRESSTYPE[skey+2]" style="width:60%" size="small" placeholder="选择地址类型">
                               <el-option 
                                  v-for="item in dizhi"
                                  :key="item.CODE"
                                  :label="item.NAME" 
                                  :value="item.CODE"
                                >
                                </el-option>
                            </el-select>
                            <el-button style="float: right; padding: 3px 0;" type="text" @click="handeldel(sval,'gongjie')">移除</el-button>
                          </el-form-item>
                         
                        </div>
                        <div  class="text item">
                          <el-form-item label="" label-width='0px' 
                          :prop = "'gongjieren.zhujiedizhi.AREA[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入地址', trigger: 'change' }
                          ]"
                          >
                            <el-cascader
                              style="width:100%"
                              size="small"
                              :options="options"
                              v-model="ruleForm.gongjieren.zhujiedizhi.AREA[skey+2]"
                              @change="handleChange(skey+2)">
                            </el-cascader>
                          </el-form-item>
                          <el-form-item label="" label-width='0px'

                          :prop = "'gongjieren.zhujiedizhi.ADDRESS[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入详细地址', trigger: 'blur' }
                          ]" 
                          >
                            <el-input size="small" v-model="ruleForm.gongjieren.zhujiedizhi.ADDRESS[skey+2]" placeholder="详细地址"></el-input>
                            
                          </el-form-item>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px'
                              
                              :prop = "'gongjieren.zhujiedizhi.POSTNO[' + (skey + 2) + ']'"
                              :rules = "[
                              { required: true, message: '请输入邮政编码', trigger: 'blur' }
                              ]"
                              >
                                <el-input size="small" v-model="ruleForm.gongjieren.zhujiedizhi.POSTNO[skey+2]" placeholder="邮政编码"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px' 
                              :prop = "'gongjieren.zhujiedizhi.PROPERTYTYPE[' + (skey + 2) + ']'"
                              :rules = "[
                              { required: true, message: '请输入房产类型', trigger: 'change' }
                              ]"
                              >
                                <el-select v-model="ruleForm.gongjieren .zhujiedizhi.PROPERTYTYPE[skey+2]"  size="small" placeholder="房产类型">
                                  <el-option 
                                    v-for="item in fangchantype"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-form-item label="" label-width='0px' 
                          :prop = "'gongjieren.zhujiedizhi.CDATE[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入起始时间', trigger: 'blur' }
                          ]"
                          >
                            <el-date-picker
                              style="width:100%"
                              size="small"
                              v-model="ruleForm.gongjieren.zhujiedizhi.CDATE[skey+2]"
                              type="datetime"
                              placeholder="起始时间">
                            </el-date-picker>
                          </el-form-item>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="12" class="cardback" v-if="cardnumg%2!=0">
                      <el-card class="cardadd">
                            <i  class="el-icon-plus"></i>
                      </el-card>
                    </el-col>
                    
                    
                </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <div id="fourAnchor"></div>
      <el-row class="midcontent" v-show="baozhengren">
        <el-col :span="22" :offset="1" >
          <el-collapse v-model="activeNames" >
            <el-collapse-item name="4">
              <template slot="title">
                 <span class="titleleft"> 保证人信息</span>
                </template>
                <el-col :span="24">
                  <p class="pline"></p>
                </el-col>
                <el-col :span="24">
                    
                </el-col>
                <div class="formtitle">
                  <span>基本信息</span>
                </div>
                <div>
                <el-row>
                    <el-col :span="24">
                      <el-form-item label="证件类型" 
                      prop="baozhengren.CARDTYPE"
                      :rules="[
                        { required: true, message: '请输入证件类型', trigger: 'change' },
                        
                      ]"
                      >
                        <el-select v-model="ruleForm.baozhengren.CARDTYPE" size="mini" style="width:85%" placeholder="" @change="currentSel">
                          <el-option
                            v-for="item in idcardlist"
                            :key="item.CODE"
                            :label="item.NAME"
                            :value="item.CODE">
                          </el-option>
                        </el-select>
                        
                        <el-button  size="mini" @click="ocrrenzheng('baozheng')" v-show="selItemShow"  v-loading.fullscreen.lock="fullscreenLoading" class="ocrclass">OCR识别</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">   
                      <el-form-item label="姓名" 
                      prop="baozhengren.NAME"
                      :rules="[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        
                      ]"
                      >
                          <el-input v-model="ruleForm.baozhengren.NAME" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="证件号码" 
                       prop="baozhengren.CARD"
                      :rules="[
                        { required: true, message: '请输入证件号码', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input v-model="ruleForm.baozhengren.CARD" size="small"></el-input> 
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="到期日" 
                      prop="baozhengren.CARDDATE"
                      :rules="[
                        { required: true, message: '请输入到期日', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-date-picker type="date" v-model="ruleForm.baozhengren.CARDDATE"  placeholder="选择日期" size="small" style="width: 65%;"></el-date-picker>
                          <el-checkbox v-model="ruleForm.baozhengren.LONGE" label="1">长期</el-checkbox>
                      </el-form-item>  
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">   
                      <el-form-item label="出生年月" 
                      prop="baozhengren.BIRTHDAY"
                      :rules="[
                        { required: true, message: '请输入出生年月', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input v-model="ruleForm.baozhengren.BIRTHDAY" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="性别" 
                       prop="baozhengren.SEX"
                      :rules="[
                        { required: true, message: '请输入性别', trigger: 'blur' },
                        
                      ]"
                       >
                          <el-radio v-model="ruleForm.baozhengren.SEX" label="M">男</el-radio>
                          <el-radio v-model="ruleForm.baozhengren.SEX" label="F">女</el-radio>
                          <el-radio v-model="ruleForm.baozhengren.SEX" label="3">未知</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="英文姓名/拼音" 
                       prop="baozhengren.ENAME"
                      :rules="[
                        { required: true, message: '请输入英文姓名/拼音', trigger: 'blur' },
                        
                      ]"
                       >
                          <el-input v-model="ruleForm.baozhengren.ENAME" size="small"></el-input>
                        </el-form-item> 
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">   
                      <el-form-item label="备注" >
                        <el-input 
                        v-model="ruleForm.baozhengren.MEMO"
                        type="textarea"
                        :rows="1"
                        placeholder="请输入内容"
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="学历" 
                        prop="baozhengren.EDUCATION"
                      :rules="[
                        { required: true, message: '请输入学历', trigger: 'change' },
                        
                      ]"
                       >
                         <el-select v-model="ruleForm.baozhengren.EDUCATION" size="small" placeholder="">
                            <el-option 
                              v-for="item in xueli"
                              :key="item.CODE"
                              :label="item.NAME" 
                              :value="item.CODE"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="工作年限" 
                        prop="baozhengren.WORKINGLIFE"
                      :rules="[
                        { required: true, message: '请输入工作年限', trigger: 'blur' },
                        
                      ]"
                       >
                          <el-input  v-model="ruleForm.baozhengren.WORKINGLIFE" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">   
                      <el-form-item label="婚姻状态" 
                      prop="baozhengren.MARRIAGESTATUS"
                      :rules="[
                        { required: true, message: '请输入婚姻状态', trigger: 'change' },
                        
                      ]"
                      >
                        <el-select v-model="ruleForm.baozhengren.MARRIAGESTATUS" size="small" placeholder="">
                          <el-option 
                            v-for="item in hunyin"
                            :key="item.CODE"
                            :label="item.NAME" 
                            :value="item.CODE"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="户口本所在地" 
                       prop="baozhengren.LOCATION"
                      :rules="[
                        { required: true, message: '请输入户口本所在地', trigger: 'blur' },
                        
                      ]"
                       >
                          <el-radio v-model="ruleForm.baozhengren.LOCATION" label="00004">本地</el-radio>
                          <el-radio v-model="ruleForm.baozhengren.LOCATION" label="00005">非本地</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                       <el-form-item label="家庭人数" 
                        prop="baozhengren.FAMILYSIZE"
                      :rules="[
                        { required: true, message: '请输入家庭人数', trigger: 'blur' },
                        
                      ]"
                       >
                            <el-input v-model="ruleForm.baozhengren.FAMILYSIZE" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                  </el-row>
                  <el-col :span="20" :offset="2">
                      <p class="pline"></p>
                  </el-col>
                  <div class="formtitle">
                    <span>工作信息</span>
                  </div>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="单位名称" 
                      prop="baozhengren.COMPANY"
                      :rules="[
                        { required: true, message: '请输入单位名称', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small"  v-model="ruleForm.baozhengren.COMPANY" style="width:90%"></el-input>
                        <el-checkbox v-model="ruleForm.baozhengren.CHEATFLAG" label="2">疑似欺诈</el-checkbox>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                  <el-col :span="24">
                      <el-form-item label="工作单位类型" 
                      prop="baozhengren.CAPARTY05"
                      :rules="[
                        { required: true, message: '请输入工作单位类型', trigger: 'blur' },
                        
                      ]"
                      >
                       <el-select filterable v-model="ruleForm.baozhengren.CAPARTY05" size="small" placeholder="">
                          <el-option 
                            v-for="item in gdtype"
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
                    <el-col :span="24">
                      <el-form-item label="行业类型" 
                      prop="baozhengren.CAPARTY01"
                      :rules="[
                        { required: true, message: '请输入行业类型', trigger: 'blur' },
                        
                      ]"
                      >
                       <el-select filterable v-model="ruleForm.baozhengren.CAPARTY01" size="small" placeholder="">
                          <el-option 
                            v-for="item in hangye"
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
                    <el-col :span="24">
                      <el-form-item label="职业类型" 
                      prop="baozhengren.CAPARTY03"
                      :rules="[
                        { required: true, message: '请输入职业类型', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-cascader
                        style="width:100%" 
                        :options="zhiye" 
                        v-model="ruleForm.baozhengren.CAPARTY03"
                        >

                        </el-cascader>
                       
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="雇员类型" 
                      prop="baozhengren.CAPARTY02"
                      :rules="[
                        { required: true, message: '请输入雇员类型', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-select filterable v-model="ruleForm.baozhengren.CAPARTY02" size="small" placeholder="">
                          <el-option 
                            v-for="item in guyuan"
                            :key="item.CODE"
                            :label="item.NAME" 
                            :value="item.CODE"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                  
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="职位" 
                      prop="baozhengren.CAPARTY02"
                      :rules="[
                        { required: true, message: '请输入职位', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-select filterable v-model="ruleForm.baozhengren.CAPARTY04" size="small" placeholder="">
                          <el-option 
                            v-for="item in zhiwei"
                            :key="item.CODE"
                            :label="item.NAME" 
                            :value="item.CODE"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  
                    <el-col :span="8">
                      <el-form-item label="规模" 
                      prop="baozhengren.SCALE"
                      :rules="[
                        { required: true, message: '请输入规模', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.baozhengren.SCALE"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="本人月收入" 
                      prop="baozhengren.PINCOME"
                      :rules="[
                        { required: true, message: '请输入本人月收入', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.baozhengren.PINCOME"></el-input>
                      </el-form-item>
                  
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="家庭其他收入" 
                       prop="baozhengren.FINCOME"
                      :rules="[
                        { required: true, message: '请输入家庭其他收入', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.baozhengren.FINCOME"></el-input>
                      </el-form-item>
                    </el-col>
                  
                    <el-col :span="8">
                      <el-form-item label="家庭月支出" 
                      prop="baozhengren.EXPENDITURE"
                      :rules="[
                        { required: true, message: '请输入家庭月支出', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.baozhengren.EXPENDITURE"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="未结清贷款" 
                      prop="baozhengren.LOAN"
                      :rules="[
                        { required: true, message: '请输入未结清贷款', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.baozhengren.LOAN"></el-input>
                      </el-form-item>
                  
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="每月还款额"
                      prop="baozhengren.PAYMENT"
                      :rules="[
                        { required: true, message: '请输入每月还款额', trigger: 'blur' },
                      ]"
                       >
                        <el-input size="small" v-model="ruleForm.baozhengren.PAYMENT"></el-input>
                      </el-form-item>
                    </el-col>
                  
                    
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="电话" 
                      prop="baozhengren.PHONE"
                      :rules="[
                        { required: true, message: '请输入电话', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.baozhengren.PHONE"></el-input>
                      </el-form-item>
                  
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="公司电话" 
                      prop="baozhengren.PHONEC"
                      :rules="[
                        { required: true, message: '请输入公司电话', trigger: 'blur' },
                        
                      ]"
                      >
                        <el-input size="small" v-model="ruleForm.baozhengren.PHONEC"></el-input>
                      </el-form-item>
                    </el-col>
                  
                    <el-col :span="8">
                      <el-form-item label="外部电话" >
                        <el-input size="small" v-model="ruleForm.baozhengren.PHONE2"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-col :span="20" :offset="2">
                      <p class="pline"></p>
                  </el-col>
                  <div class="formtitle">
                    <span>地址信息</span>
                    <span><el-button style=" padding: 3px 0;color:#5ADACB" type="text" @click="baozhengzhu">与主借人一致</el-button><el-button style="float: right; padding: 3px 0; color: #64ecdf;" type="text" @click="handelAdd('baozheng')"> 新增</el-button></span>
                  </div>
                  <el-row class="cardback">
                    <el-col :span="12">
                      <el-card class="cardnei">
                        <div slot="header" class="clearfix borderbottom">
                          <img :src="homeloc" alt="" style="vertical-align: text-bottom;">
                          <span style="color:red">*</span><span style="padding-left:5px">家庭地址</span>
                          <el-button style="float: right; padding: 3px 0" type="text"></el-button>
                        </div>
                        <div  class="text item">
                          <el-form-item label="" label-width='0px'
                          prop = 'baozhengren.zhujiedizhi.AREA[0]'
                           :rules = "[
                          { required: true, message: '请输入地址', trigger: 'change' }
                          ]"
                           >
                          <el-cascader
                            style="width:100%"
                            size="small"
                            :options="options"
                            v-model="ruleForm.baozhengren.zhujiedizhi.AREA[0]"
                            @change="handleChange(0)">
                          </el-cascader>
                          </el-form-item>
                          <el-form-item label="" label-width='0px' 
                          prop = 'baozhengren.zhujiedizhi.ADDRESS[0]'
                           :rules = "[
                          { required: true, message: '请输入详细地址', trigger: 'blur' }
                          ]"
                          >
                            <el-input size="small" style="width:75%" v-model="ruleForm.baozhengren.zhujiedizhi.ADDRESS[0]" placeholder="详细地址"></el-input>
                            <el-checkbox v-model="ruleForm.baozhengren.zhujiedizhi.ISDEFAULT[0]" true-label="1" false-label="0" label="1">邮寄地址</el-checkbox>
                          </el-form-item>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px'
                              prop = 'baozhengren.zhujiedizhi.POSTNO[0]'
                              :rules = "[
                              { required: true, message: '请输入邮政编码', trigger: 'blur' }
                              ]"
                              >
                                <el-input size="small" v-model="ruleForm.baozhengren.zhujiedizhi.POSTNO[0]" placeholder="邮政编码"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px' 
                              prop = 'baozhengren.zhujiedizhi.PROPERTYTYPE[0]'
                              :rules = "[
                              { required: true, message: '请输入房产类型', trigger: 'change' }
                              ]"
                              >
                                <el-select v-model="ruleForm.baozhengren.zhujiedizhi.PROPERTYTYPE[0]"  size="small" placeholder="房产类型">
                                  <el-option 
                                    v-for="item in fangchantype"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-form-item label="" label-width='0px' 
                            prop = 'baozhengren.zhujiedizhi.CDATE[0]'
                            :rules = "[
                            { required: true, message: '请输入起始时间', trigger: 'blur' }
                            ]"
                          >
                            <el-date-picker
                              style="width:100%"
                              size="small"
                              v-model="ruleForm.baozhengren.zhujiedizhi.CDATE[0]"
                              type="datetime"
                              placeholder="起始时间">
                            </el-date-picker>
                          </el-form-item>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="12" >
                      <el-card class="cardnei">
                        <div slot="header" class="clearfix borderbottom">
                          <img :src="coploc" alt="" style="vertical-align: text-bottom;">
                          <span style="color:red">*</span><span style="padding-left:5px">办公室地址</span>
                        </div>
                        <div  class="text item">
                          <el-form-item label="" label-width='0px' 
                           prop = 'baozhengren.zhujiedizhi.AREA[1]'
                           :rules = "[
                          { required: true, message: '请输入地址', trigger: 'change' }
                          ]"
                          >
                            <el-cascader
                              style="width:100%"
                              size="small"
                              :options="options"
                              v-model="ruleForm.baozhengren.zhujiedizhi.AREA[1]"
                              @change="handleChange(1)">
                            </el-cascader>
                          </el-form-item>
                          <el-form-item label="" label-width='0px'
                          prop = 'baozhengren.zhujiedizhi.ADDRESS[1]'
                           :rules = "[
                          { required: true, message: '请输入详细地址', trigger: 'blur' }
                          ]"
                           >
                            <el-input size="small" style="width:75%" v-model="ruleForm.baozhengren.zhujiedizhi.ADDRESS[1]"  placeholder="详细地址"></el-input>
                            <el-checkbox v-model="ruleForm.baozhengren.zhujiedizhi.ISDEFAULT[1]" true-label="1" false-label="0" label="1">邮寄地址</el-checkbox>
                          </el-form-item>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px'
                              prop = 'baozhengren.zhujiedizhi.POSTNO[1]'
                              :rules = "[
                              { required: true, message: '请输入邮政编码', trigger: 'blur' }
                              ]"
                              >
                                <el-input size="small" v-model="ruleForm.baozhengren.zhujiedizhi.POSTNO[1]" placeholder="邮政编码"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px' 
                              prop = 'baozhengren.zhujiedizhi.PROPERTYTYPE[1]'
                                :rules = "[
                                { required: true, message: '请输入房产类型', trigger: 'change' }
                                ]"
                              >
                                <el-select v-model="ruleForm.baozhengren.zhujiedizhi.PROPERTYTYPE[1]"  size="small" placeholder="房产类型">
                                  <el-option 
                                    v-for="item in fangchantype"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-form-item label="" label-width='0px' 
                           prop = 'baozhengren.zhujiedizhi.CDATE[1]'
                                :rules = "[
                                { required: true, message: '请输入起始时间', trigger: 'blur' }
                                ]"
                          >
                            <el-date-picker
                              style="width:100%"
                              size="small"
                              v-model="ruleForm.baozhengren.zhujiedizhi.CDATE[1]"
                              type="datetime"
                              placeholder="起始时间">
                            </el-date-picker>
                          </el-form-item>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                    <el-col :span="12" class="cardback" v-for="(sval,skey) in (dataLengthb-2)" :key='skey' v-if="(addcardb.indexOf(sval)+1)==sval" >
                      <el-card class="cardnei">
                        <div slot="header" class="clearfix borderbottom">
                          
                          <el-form-item label="" label-width='0px' style='margin-bottom:0px'
                          :prop = "'baozhengren.zhujiedizhi.ADDRESSTYPE[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入地址类型', trigger: 'change' }
                          ]"
                          >
                            <el-select v-model="ruleForm.baozhengren.zhujiedizhi.ADDRESSTYPE[skey+2]" style="width:60%" size="small" placeholder="选择地址类型">
                               <el-option 
                                  v-for="item in dizhi"
                                  :key="item.CODE"
                                  :label="item.NAME" 
                                  :value="item.CODE"
                                >
                                </el-option>
                            </el-select>
                            <el-button style="float: right; padding: 3px 0;" type="text" @click="handeldel(sval,'baozheng')">移除</el-button>
                          </el-form-item>
                         
                        </div>
                        <div  class="text item">
                          <el-form-item label="" label-width='0px' 
                          :prop = "'baozhengren.zhujiedizhi.AREA[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入地址', trigger: 'change' }
                          ]"
                          >
                            <el-cascader
                              style="width:100%"
                              size="small"
                              :options="options"
                              v-model="ruleForm.baozhengren.zhujiedizhi.AREA[skey+2]"
                              @change="handleChange(skey+2)">
                            </el-cascader>
                          </el-form-item>
                          <el-form-item label="" label-width='0px' 
                          :prop = "'baozhengren.zhujiedizhi.ADDRESS[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入详细地址', trigger: 'blur' }
                          ]"
                          >
                            <el-input size="small" v-model="ruleForm.baozhengren.zhujiedizhi.ADDRESS[skey+2]" placeholder="详细地址"></el-input>
                            
                          </el-form-item>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px'
                              :prop = "'baozhengren.zhujiedizhi.POSTNO[' + (skey + 2) + ']'"
                              :rules = "[
                              { required: true, message: '请输入邮政编码', trigger: 'blur' }
                              ]"
                              >
                                <el-input size="small" v-model="ruleForm.baozhengren.zhujiedizhi.POSTNO[skey+2]" placeholder="邮政编码"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="" label-width='0px' 
                              :prop = "'baozhengren.zhujiedizhi.PROPERTYTYPE[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入房产类型', trigger: 'change' }
                          ]"
                              >
                                <el-select v-model="ruleForm.baozhengren .zhujiedizhi.PROPERTYTYPE[skey+2]"  size="small" placeholder="房产类型">
                                  <el-option 
                                    v-for="item in fangchantype"
                                    :key="item.CODE"
                                    :label="item.NAME" 
                                    :value="item.CODE"
                                  >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-form-item label="" label-width='0px'
                          :prop = "'baozhengren.zhujiedizhi.CDATE[' + (skey + 2) + ']'"
                           :rules = "[
                          { required: true, message: '请输入起始时间', trigger: 'blur' }
                          ]"
                           >
                            <el-date-picker
                              style="width:100%"
                              size="small"
                              v-model="ruleForm.baozhengren.zhujiedizhi.CDATE[skey+2]"
                              type="datetime"
                              placeholder="起始时间">
                            </el-date-picker>
                          </el-form-item>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="12" class="cardback" v-if="cardnumb%2!=0">
                      <el-card class="cardadd">
                            <i  class="el-icon-plus"></i>
                      </el-card>
                    </el-col>
                  
                    
                    
                </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      </el-form>
        <el-dialog
          title="图片"
          :visible.sync="dialogVisible"
          width="30%"
          >
          <span><img :src="newimg" alt=""></span>
         
        </el-dialog>
 <el-dialog
  title="正在通信"
  :visible.sync="ocrdialog"
  width="30%"
  >
  <div style="float:left;margin-right:20px"><img :src="imgsuccess" alt="">  
  </div>
  <div>
     已发送指令到手机端
    移动信贷！请用手机
    操作
  </div>
</el-dialog>
  </section>
</template>

<script>
import Cookies from 'js-cookie'
import { orderimgsave, orderSave, delparty, deladdress, delurpart, getCurrentTaskCmd, postRevisepause, postConditionalapproval, postUpCardOcr } from '@/api/credit'
import { toTree } from '@/utils'
import hotline from '@/assets/images/icon_hotline.png'
import imgsuccess from '@/assets/images/img_success.png'
import question from '@/assets/images/icon_question.png'
import top from '@/assets/images/icon_top.png'
import sfzbm from '@/assets/images/pic_sfz_ghm.png'
import sfzzm from '@/assets/images/pic_sfz_txm.png'
import coploc from '@/assets/images/icon_cop_loc.png'
import homeloc from '@/assets/images/icon_home_loc.png'
import { provinceAndCityData } from 'element-china-area-data'
export default {
  data() {
    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('号码不能为空!!'))
      }
      if (!phoneReg.test(value)) {
        callback(new Error('格式有误,请重新输入！！！'))
      } else {
        callback()
      }
    }
    return {
      validatePhone,
      gdtype: [],
      btnlistenter: [],
      routeid: this.$route.params.id,
      did: false,
      gid: false,
      sbdisable: false,
      contentlist: {},
      gongjieren: false,
      baozhengren: false,
      imgsuccess,
      jiashiimg: [],
      idcardimg: [],
      ocrdialog: false,
      selItemShow: true,
      guanxi: [],
      dizhi: [],
      fangchantype: [],
      jiashizhengjian: [],
      zhiwei: [],
      guyuan: [],
      zhiye: [],
      hangye: [],
      xueli: [],
      hunyin: [],
      idcardlist: [],
      websocketmessage: null,
      fullscreenLoading: false,
      newimg: '',
      dialogVisible: false,
      isShowchuru: true,
      showwtt: true,
      showwt: false,
      hotline,
      question,
      top,
      fourActive: false,
      threeActive: false,
      twoActive: false,
      oneActive: true,
      imageUrl: '',
      sfzzm,
      sfzbm,
      showInfo: false,
      jinjicardnum: 0,
      jinjinum: 0,
      jinjicard: [],
      addcard: [],
      card: 0,
      cardnum: 0,
      addcardg: [],
      cardg: 0,
      cardnumg: 0,
      addcardb: [],
      cardb: 0,
      cardnumb: 0,
      dataLength: 10,
      dataLengthg: 10,
      dataLengthb: 10,
      jinjiLength: 10,
      options: provinceAndCityData,
      selectedOptions: {},
      selectedVal: {},
      activeNames: ['1', '2'],
      coploc,
      homeloc,
      formLabelWidth: '100px',
      value: '',
      value5: [],
      checked: '',
      ruleForm: {
        zhujie: {
          id: '',
          // 主借人
          zhujiedizhi: {
            id: {},
            // 地址类型
            ADDRESSTYPE: {},
            // 省市
            AREA: {},
            // 地址
            ADDRESS: {},
            // 邮寄地址
            ISDEFAULT: [],
            // 邮政编码
            POSTNO: {},
            // 房产类型
            PROPERTYTYPE: {},
            // 起始时间
            CDATE: {}
          },
          // 证件类型
          CARDTYPE: '',
          // 备注
          MEMO: '',
          // 姓名
          NAME: '',
          // 英文姓名
          ENAME: '',
          // 证件号码
          CARD: '',
          // 到期日
          CARDDATE: '',
          // 长期有效
          LONGE: 0,
          // 出生日期
          BIRTHDAY: '',
          // 性别
          SEX: '',

          // 学历
          EDUCATION: '',
          // 婚姻状况
          MARRIAGESTATUS: '',
          // 工作年限
          WORKINGLIFE: 0,
          // 户口所在地
          LOCATION: '',
          // 家庭人数
          FAMILYSIZE: 0,
          // 单位名称
          COMPANY: '',
          // 疑似欺诈
          CHEATFLAG: '',
          // 行业类型
          CAPARTY01: '',
          // 职业类型
          CAPARTY03: [],
          // 雇员类型
          CAPARTY02: '',
          // 职位
          CAPARTY04: '',
          CAPARTY05: '',
          // 规模
          SCALE: 0,
          // 本人月收入
          PINCOME: 0,
          // 家庭其他收入
          FINCOME: 0,
          // 家庭月支出
          EXPENDITURE: 0,
          // 未结清贷款
          LOAN: 0,
          // 每月还款额
          PAYMENT: 0,
          // 电话
          PHONE: '',
          // 公司电话
          PHONEC: '',
          // 外部电话
          PHONE2: '',
          // 驾驶证件
          DRIVERLICENSE: '',
          // 档案编号
          DRIVERNO: '',
          // 收入证明经办人
          OPERATOR1: '',
          // 经办人联系方式1
          OPERATOR1PHONE: '',
          // 居住证明经办人
          OPERATOR2: '',
          // 经办人联系方式2
          OPERATOR2PHONE: ''
        },
        jinjinlianxi: {
          id: {},
          // 与申请人关系
          RELATIONSHIP: {},
          // 姓名
          NAME: {},
          // 手机
          PHONE: {},
          // 公司名称
          COMPANY: {},
          // 公司电话
          COMPANYPHONE: {},
          // 证件类型
          CARDTYPE: {},
          // 证件号码
          CARD: {},
          // 月收入
          INCOME: {},
          //  现居住地
          HOMEADDRESS: {}
        },
        gongjieren: {
          id: '',
          // 共借人
          zhujiedizhi: {
            id: {},
            // 地址类型
            ADDRESSTYPE: {},
            // 省市
            AREA: {},
            // 地址
            ADDRESS: {},
            // 邮寄地址
            ISDEFAULT: {},
            // 邮政编码
            POSTNO: {},
            // 房产类型
            PROPERTYTYPE: {},
            // 起始时间
            CDATE: {}
          },
          // 证件类型
          CARDTYPE: '',
          // 备注
          MEMO: '',
          // 姓名
          NAME: '',
          // 英文姓名
          ENAME: '',
          // 证件号码
          CARD: '',
          // 到期日
          CARDDATE: '',
          // 长期有效
          LONGE: '',
          // 出生日期
          BIRTHDAY: '',
          // 性别
          SEX: '',

          // 学历
          EDUCATION: '',
          // 婚姻状况
          MARRIAGESTATUS: '',
          // 工作年限
          WORKINGLIFE: 0,
          // 户口所在地
          LOCATION: '',
          // 家庭人数
          FAMILYSIZE: 0,
          // 单位名称
          COMPANY: '',
          // 疑似欺诈
          CHEATFLAG: '',
          // 行业类型
          CAPARTY01: '',
          // 职业类型
          CAPARTY03: [],
          // 雇员类型
          CAPARTY02: '',
          // 职位
          CAPARTY04: '',
          CAPARTY05: '',
          // 规模
          SCALE: 0,
          // 本人月收入
          PINCOME: 0,
          // 家庭其他收入
          FINCOME: 0,
          // 家庭月支出
          EXPENDITURE: 0,
          // 未结清贷款
          LOAN: 0,
          // 每月还款额
          PAYMENT: 0,
          // 电话
          PHONE: '',
          // 公司电话
          PHONEC: '',
          // 外部电话
          PHONE2: '',
          // 驾驶证件
          DRIVERLICENSE: '',
          // 档案编号
          DRIVERNO: '',
          // 收入证明经办人
          OPERATOR1: '',
          // 经办人联系方式1
          OPERATOR1PHONE: '',
          // 居住证明经办人
          OPERATOR2: '',
          // 经办人联系方式2
          OPERATOR2PHONE: ''
        },
        baozhengren: {
          id: [],
          // 保证人
          zhujiedizhi: {
            id: {},
            // 地址类型
            ADDRESSTYPE: {},
            // 省市
            AREA: {},
            // 地址
            ADDRESS: {},
            // 邮寄地址
            ISDEFAULT: {},
            // 邮政编码
            POSTNO: {},
            // 房产类型
            PROPERTYTYPE: {},
            // 起始时间
            CDATE: {}
          },
          // 证件类型
          CARDTYPE: '',
          // 备注
          MEMO: '',
          // 姓名
          NAME: '',
          // 英文姓名
          ENAME: '',
          // 证件号码
          CARD: '',
          // 到期日
          CARDDATE: '',
          // 长期有效
          LONGE: '',
          // 出生日期
          BIRTHDAY: '',
          // 性别
          SEX: '',

          // 学历
          EDUCATION: '',
          // 婚姻状况
          MARRIAGESTATUS: '',
          // 工作年限
          WORKINGLIFE: 0,
          // 户口所在地
          LOCATION: '',
          // 家庭人数
          FAMILYSIZE: 0,
          // 单位名称
          COMPANY: '',
          // 疑似欺诈
          CHEATFLAG: '',
          // 行业类型
          CAPARTY01: '',
          // 职业类型
          CAPARTY03: [],
          // 雇员类型
          CAPARTY02: '',
          // 职位
          CAPARTY04: '',
          CAPARTY05: '',
          // 规模
          SCALE: 0,
          // 本人月收入
          PINCOME: 0,
          // 家庭其他收入
          FINCOME: 0,
          // 家庭月支出
          EXPENDITURE: 0,
          // 未结清贷款
          LOAN: 0,
          // 每月还款额
          PAYMENT: 0,
          // 电话
          PHONE: '',
          // 公司电话
          PHONEC: '',
          // 外部电话
          PHONE2: '',
          // 驾驶证件
          DRIVERLICENSE: '',
          // 档案编号
          DRIVERNO: '',
          // 收入证明经办人
          OPERATOR1: '',
          // 经办人联系方式1
          OPERATOR1PHONE: '',
          // 居住证明经办人
          OPERATOR2: '',
          // 经办人联系方式2
          OPERATOR2PHONE: ''
        }
      },
      rules: {
      }
    }
  },
  methods: {
    btnenterto(item) {
      var status = this.contentlist.basicInfo.status
      if (status === 4) {
        let para = {}
        para = this.contentlist
        postRevisepause(para).then(res => {
          if (res.data.success) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      }
      if (status === 6) {
        let para = {}
        para = {
          dataid: this.contentlist.basicInfo.id,
          cmdid: item.id
        }
        postConditionalapproval(para).then(res => {
          if (res.data.success) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      }
    },
    zansaveb() {
      var that = this
      let para = {}
      para = this.contentlist
      if (localStorage.getItem('order' + that.routeid)) {
        para.basicInfo.state = 2
      }
      orderSave(para).then(res => {
        if (res.data.success) {
          localStorage.removeItem('order' + that.routeid)
          localStorage.setItem('orderId' + that.routeid, that.contentlist.orderId)
          that.contentlist = res.data.data
          localStorage.setItem('contentlist' + that.routeid, JSON.stringify(res.data.data))
          this.$message({
            message: '暂存成功！！',
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
    zhansave() {
      this.nextdo()
      this.zansaveb()
    },
    toNext() {
      var that = this
      this.nextdo()
      if (!that.sbdisable) {
        let para = {}
        para = this.contentlist
        if (localStorage.getItem('order' + that.routeid)) {
          para.basicInfo.state = 2
        }
        orderSave(para).then(res => {
          if (res.data.success) {
            localStorage.removeItem('order' + that.routeid)
            localStorage.setItem('orderId' + that.routeid, that.contentlist.orderId)
            that.contentlist = res.data.data
            localStorage.setItem('contentlist' + that.routeid, JSON.stringify(res.data.data))
            localStorage.setItem('orderold' + that.routeid, JSON.stringify(that.contentlist))
            this.$router.push({ path: '/dealer/creditapproval/toauthphoto/' + this.routeid })
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      } else {
        this.$router.push({ path: '/dealer/creditapproval/toauthphoto/' + this.routeid })
      }
    },
    tojinrong() {
      this.nextdo()
      this.$router.push({ path: '/dealer/creditapproval/personalorder/' + this.routeid })
    },
    tokehu() {
      var that = this
      this.nextdo()
      if (!that.sbdisable) {
        let para = {}
        para = this.contentlist
        if (localStorage.getItem('order' + that.routeid)) {
          para.basicInfo.state = 2
        }
        orderSave(para).then(res => {
          if (res.data.success) {
            localStorage.removeItem('order' + that.routeid)
            localStorage.setItem('orderId' + that.routeid, that.contentlist.orderId)
            console.log(res.data.data)
            that.contentlist = res.data.data
            localStorage.setItem('contentlist' + that.routeid, JSON.stringify(res.data.data))
            localStorage.setItem('orderold' + that.routeid, JSON.stringify(that.contentlist))
            this.$router.push({ path: '/dealer/creditapproval/toauthphoto/' + this.routeid })
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      } else {
        this.$router.push({ path: '/dealer/creditapproval/toauthphoto/' + this.routeid })
      }
    },
    toyingxiang() {
      var that = this
      this.nextdo()
      if (!that.sbdisable) {
        let para = {}
        para = this.contentlist
        if (localStorage.getItem('order' + that.routeid)) {
          para.basicInfo.state = 2
        }
        orderSave(para).then(res => {
          if (res.data.success) {
            localStorage.removeItem('order' + that.routeid)
            localStorage.setItem('orderId' + that.routeid, that.contentlist.orderId)
            console.log(res.data.data)
            that.contentlist = res.data.data
            localStorage.setItem('contentlist' + that.routeid, JSON.stringify(res.data.data))
            localStorage.setItem('orderold' + that.routeid, JSON.stringify(that.contentlist))
            this.$router.push({ path: '/dealer/creditapproval/orderphoto/' + this.routeid })
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      } else {
        this.$router.push({ path: '/dealer/creditapproval/orderphoto/' + this.routeid })
      }
    },
    baozhengzhu() {
      this.$set(this.ruleForm.baozhengren, 'zhujiedizhi', this.ruleForm.zhujie.zhujiedizhi)
    },
    gongjiezhu() {
      this.$set(this.ruleForm.gongjieren, 'zhujiedizhi', this.ruleForm.zhujie.zhujiedizhi)
    },
    zhujiejiat() {
      this.$set(this.ruleForm.zhujie.zhujiedizhi.AREA, 1, this.ruleForm.zhujie.zhujiedizhi.AREA[0])
      this.$set(this.ruleForm.zhujie.zhujiedizhi.ADDRESS, 1, this.ruleForm.zhujie.zhujiedizhi.ADDRESS[0])
      this.$set(this.ruleForm.zhujie.zhujiedizhi.PROPERTYTYPE, 1, this.ruleForm.zhujie.zhujiedizhi.PROPERTYTYPE[0])
      this.$set(this.ruleForm.zhujie.zhujiedizhi.POSTNO, 1, this.ruleForm.zhujie.zhujiedizhi.POSTNO[0])
      this.$set(this.ruleForm.zhujie.zhujiedizhi.CDATE, 1, this.ruleForm.zhujie.zhujiedizhi.CDATE[0])
    },
    toDoWebsock() {
      var that = this
      var moment = require('moment')
      if (typeof this.websocketmessage === 'string') {
        var objdata = JSON.parse(this.websocketmessage)
        if (objdata.idnum) {
          that.ocrdialog = false
        }
        if (objdata.name) {
          var daoqidate = objdata.date.split('-')
          if (objdata.type === '010101') {
            this.ruleForm.zhujie.NAME = objdata.name
            this.ruleForm.zhujie.CARD = objdata.idnum
            this.ruleForm.zhujie.CARDDATE = moment(daoqidate[1]).format('YYYY-MM-DD')
            this.ruleForm.zhujie.BIRTHDAY = moment(objdata.birth).format('YYYY-MM-DD')
            if (objdata.sex === '男') {
              this.ruleForm.zhujie.SEX = 'M'
            } else if (objdata.sex === '女') {
              this.ruleForm.zhujie.SEX = 'F'
            } else {
              this.ruleForm.zhujie.SEX = '3'
            }
            let para = {}
            para = {
              CaCategory: 'Camain',
              CamainId: localStorage.getItem('orderId' + that.routeid),
              ArtyType: '1'
            }
            postUpCardOcr(para).then(res => {
            })
          }
          if (objdata.type === '010102') {
            this.ruleForm.gongjieren.NAME = objdata.name
            this.ruleForm.gongjieren.CARD = objdata.idnum
            this.ruleForm.gongjieren.CARDDATE = moment(daoqidate[1]).format('YYYY-MM-DD')
            this.ruleForm.gongjieren.BIRTHDAY = moment(objdata.birth).format('YYYY-MM-DD')
            if (objdata.sex === '男') {
              this.ruleForm.gongjieren.SEX = 'M'
            } else if (objdata.sex === '女') {
              this.ruleForm.gongjieren.SEX = 'F'
            } else {
              this.ruleForm.gongjieren.SEX = '3'
            }
            let para = {}
            para = {
              CaCategory: 'Camain',
              CamainId: localStorage.getItem('orderId' + that.routeid),
              ArtyType: '2'
            }
            postUpCardOcr(para).then(res => {
            })
          }
          if (objdata.type === '010103') {
            this.ruleForm.baozhengren.NAME = objdata.name
            this.ruleForm.baozhengren.CARD = objdata.idnum
            this.ruleForm.baozhengren.CARDDATE = moment(daoqidate[1]).format('YYYY-MM-DD')
            this.ruleForm.baozhengren.BIRTHDAY = moment(objdata.birth).format('YYYY-MM-DD')
            if (objdata.sex === '男') {
              this.ruleForm.baozhengren.SEX = 'M'
            } else if (objdata.sex === '女') {
              this.ruleForm.baozhengren.SEX = 'F'
            } else {
              this.ruleForm.baozhengren.SEX = '3'
            }
            let para = {}
            para = {
              CaCategory: 'Camain',
              CamainId: localStorage.getItem('orderId' + that.routeid),
              ArtyType: '3'
            }
            postUpCardOcr(para).then(res => {
            })
          }
        }
        if (objdata.ImgType === '01010101' || objdata.ImgType === '01010102' || objdata.ImgType === '01010201' || objdata.ImgType === '01010202' || objdata.ImgType === '01010301' || objdata.ImgType === '01010302') {
          if (objdata.MD5) {
            that.idcardimg.push({
              imgtype: objdata.ImgType,
              md5: objdata.MD5,
              guid: objdata.GUID
            })
            let para = {}
            para = {
              RandomStr: objdata.GUID,
              ImCategoryCode: objdata.ImgType,
              CamainId: localStorage.getItem('orderId' + that.routeid),
              Scene: '1',
              UploadFrom: '0',
              MidId: Cookies.get('MIDID')
            }
            orderimgsave(para).then(res => {
            })
            localStorage.setItem('MD5Data_shenfen' + that.routeid, JSON.stringify(that.idcardimg))
          }
        }
      }
    },
    currentSel(selval) {
      if (selval === '00001') {
        this.selItemShow = true
      } else {
        this.selItemShow = false
      }
    },
    ocrrenzheng(type) {
      var that = this
      var s = {}
      var data
      var typelei
      if (type === 'zhujie') {
        if (!this.ruleForm.zhujie.CARDTYPE) {
          this.$message({
            message: '请先选择证件类型！！！',
            type: 'warning'
          })
          return false
        }
        typelei = '010101'
      } else if (type === 'gongjie') {
        if (!this.ruleForm.gongjieren.CARDTYPE) {
          this.$message({
            message: '请先选择证件类型！！！',
            type: 'warning'
          })
          return false
        }
        typelei = '010102'
      } else if (type === 'baozheng') {
        if (!this.ruleForm.baozhengren.CARDTYPE) {
          this.$message({
            message: '请先选择证件类型！！！',
            type: 'warning'
          })
          return false
        }
        typelei = '010103'
      }
      s.CID = localStorage.getItem('orderId' + that.routeid)
      s.RATIO = '100'
      s.TYPE = typelei
      s.VERSION = 1
      s.TOKEN = Cookies.get('Admin-Token')
      s.APPID = Cookies.get('APPID')
      data = 'PCOCR ' + JSON.stringify(s)
      this.$store.dispatch('SocketConnect')
      this.$store.dispatch('SocketSenddata', data)
    },
    showwtru() {
      this.isShowchuru = false
      this.showwtt = false
      this.showwt = true
    },
    showwtchu() {
      this.isShowchuru = true
      this.showwtt = true
      this.showwt = false
    },
    toTop() {
      document.documentElement.scrollTop = 0
    },
    custormAnchor(anchorName) {
      let anchorElement = ''
      // 找到锚点
      anchorElement = document.getElementById(anchorName)
      if (anchorName === 'fourAnchor') {
        this.activeNames = ['4']
        this.fourActive = true
        this.threeActive = false
        this.twoActive = false
        this.oneActive = false
      }
      if (anchorName === 'threeAnchor') {
        this.activeNames = ['3']
        this.fourActive = false
        this.threeActive = true
        this.twoActive = false
        this.oneActive = false
      }
      if (anchorName === 'twoAnchor') {
        this.activeNames = ['2']
        this.fourActive = false
        this.threeActive = false
        this.twoActive = true
        this.oneActive = false
      }
      if (anchorName === 'oneAnchor') {
        this.activeNames = ['1']
        this.fourActive = false
        this.threeActive = false
        this.twoActive = false
        this.oneActive = true
      }
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) { anchorElement.scrollIntoView() }
    },
    showUploadInfo() {
      this.showInfo = true
    },
    beforeAvatarUpload(file) {
    },
    handleAvatarSuccess(res, file) {

    },
    addjinji() {
      this.jinjinum = this.jinjinum + 1
      if (this.jinjicard.indexOf('s') >= 0) {
        this.jinjicard.splice(this.jinjicard.indexOf('s'), 1, this.jinjicard.indexOf('s') + 1)
        return
      }
      if (this.jinjicardnum >= 10) {
        return
      }
      this.jinjicardnum = this.jinjicardnum + 1
      this.jinjicard.push(this.jinjicardnum)
    },
    handeldel(sval, type) {
      /* eslint-disable */
       var zhujieren = []
       var gongjieren = []
       var danbaoren = []
       
      if(this.contentlist.borrowers){
        zhujieren = this.contentlist.borrowers.filter(item => item.type == 1)[0]
        gongjieren = this.contentlist.borrowers.filter(item => item.type == 2)[0]
        danbaoren = this.contentlist.borrowers.filter(item => item.type == 3)[0]  
      }
      
      var jijilianxiren = this.contentlist.urgentPartys
      
      
      if (type === 'zhujie') {
        if(zhujieren.length>0){
          var delid = ''
          zhujieren.addresses.map(function(value, index, arr) {
            if(index == sval+1){
            delid = value['id']
            }
          })
          if(delid) {
            let para = {}
            para = {
              id: delid
            }
            deladdress(para).then(res => {
              if (res.data.success) {
                this.cardnum = this.cardnum - 1
                var index = this.addcard.indexOf(sval)
                this.addcard.splice(index, 1, 's')
              }else{
                this.$message({
                  type: 'warning',
                  message: '删除失败，请联系管理员！'
                })
              }
            })
          }else{
            this.cardnum = this.cardnum - 1
            var index = this.addcard.indexOf(sval)
            this.addcard.splice(index, 1, 's')
          }
        }else{
          this.cardnum = this.cardnum - 1
          var index = this.addcard.indexOf(sval)
          this.addcard.splice(index, 1, 's')
        }
      } else if (type === 'gongjie') {
        if(gongjieren.length>0){
          var delid = ''
          gongjieren.addresses.map(function(value, index, arr) {
            if(index == sval+1){
            delid = value['id']
            }
          })
          if(delid) {
            let para = {}
            para = {
              id: delid
            }
            deladdress(para).then(res => {
              if (res.data.success) {
                this.cardnumg = this.cardnumg - 1
                let index = ''
                index = this.addcardg.indexOf(sval)
                this.addcardg.splice(index, 1, 's')
              }else{
                this.$message({
                  type: 'warning',
                  message: '删除失败，请联系管理员！'
                })
              }
            })
          }else{
            this.cardnumg = this.cardnumg - 1
            let index = ''
            index = this.addcardg.indexOf(sval)
            this.addcardg.splice(index, 1, 's')
          }
        }else{
          this.cardnumg = this.cardnumg - 1
          let index = ''
          index = this.addcardg.indexOf(sval)
          this.addcardg.splice(index, 1, 's')
        }
        
      } else if (type === 'baozheng') {
        if(danbaoren.length>0){
          var delid = ''
          danbaoren.addresses.map(function(value, index, arr) {
            if(index == sval+1){
            delid = value['id']
            }
          })
          if(delid) {
            let para = {}
            para = {
              id: delid
            }
            deladdress(para).then(res => {
              if (res.data.success) {
                this.cardnumb = this.cardnumb - 1
                let index = ''
                index = this.addcardb.indexOf(sval)
                this.addcardb.splice(index, 1, 's')
              }else{
                this.$message({
                  type: 'warning',
                  message: '删除失败，请联系管理员！'
                })
              }
            })
          }else{
            this.cardnumb = this.cardnumb - 1
            let index = ''
            index = this.addcardb.indexOf(sval)
            this.addcardb.splice(index, 1, 's')
          }
        }else{
          this.cardnumb = this.cardnumb - 1
          let index = ''
          index = this.addcardb.indexOf(sval)
          this.addcardb.splice(index, 1, 's')
        }
        
      } else if (type === 'jinji') {
        if(jijilianxiren){
          console.log(jijilianxiren)
          var delid = ''
          jijilianxiren.map(function(value, index, arr) {
            if(index == sval+1){
            delid = value['id']
            }
          })
          if(delid) {
            let para = {}
            para = {
              id: delid
            }
            delurpart(para).then(res => {
              if (res.data.success) {
                this.jinjinum = this.jinjinum - 1
                let index = ''
                index = this.jinjicard.indexOf(sval)
                this.jinjicard.splice(index, 1, 's')
              }else{
                this.$message({
                  type: 'warning',
                  message: '删除失败，请联系管理员！'
                })
              }
            })
          }else{
            this.jinjinum = this.jinjinum - 1
          let index = ''
          index = this.jinjicard.indexOf(sval)
          this.jinjicard.splice(index, 1, 's')
          }
        }else{
          this.jinjinum = this.jinjinum - 1
          let index = ''
          index = this.jinjicard.indexOf(sval)
          this.jinjicard.splice(index, 1, 's')
        }
        
      }
    },
    handelAdd(type) {
      if (type === 'zhujie') {
        this.cardnum = this.cardnum + 1
        if (this.addcard.indexOf('s') >= 0) {
          this.addcard.splice(this.addcard.indexOf('s'), 1, this.addcard.indexOf('s') + 1)
          return
        }
        if (this.card >= 10) {
          return
        }
        this.card = this.card + 1
        this.addcard.push(this.card)
      } else if (type === 'gongjie') {
        this.cardnumg = this.cardnumg + 1
        if (this.addcardg.indexOf('s') >= 0) {
          this.addcardg.splice(this.addcardg.indexOf('s'), 1, this.addcardg.indexOf('s') + 1)
          return
        }
        if (this.cardg >= 10) {
          return
        }
        this.cardg = this.cardg + 1
        this.addcardg.push(this.cardg)
      } else if (type === 'baozheng') {
        this.cardnumb = this.cardnumb + 1
        if (this.addcardb.indexOf('s') >= 0) {
          this.addcardb.splice(this.addcardb.indexOf('s'), 1, this.addcardb.indexOf('s') + 1)
          return
        }
        if (this.cardb >= 10) {
          return
        }
        this.cardb = this.cardb + 1
        this.addcardb.push(this.cardb)
      }
    },
    handleChange(key) {
      // var that = this
      // that.selectedVal[key] = []
      // this.selectedOptions[key].forEach(function(val, k) {
      //   that.selectedVal[key][k] = CodeToText[val]
      // })
      // console.log(this.selectedVal)
      // console.log(this.selectedOptions)
    },
    delgongjie() {
      /* eslint-disable */
      this.gid = false
      this.gongjieren = false
      this.activeNames = ['1', '2']
      var gongjieren = this.contentlist.borrowers.filter(item => item.type == 2)[0]
      if(gongjieren){
          let para = {}
          para = {
            id: gongjieren.id
          }
         delparty(para).then(res => {
           if (res.data.success) {
           }else{
            this.$message({
              type: 'success',
              message: '删除失败，请联系管理员！'
            })
           }
         })
      }
    },
    delbaozheng() {
      this.did = false
      this.baozhengren = false
      this.activeNames = ['1', '2']
      var danbaoren = this.contentlist.borrowers.filter(item => item.type == 3)[0]
      if(danbaoren){
          let para = {}
          para = {
            id: danbaoren.id
          }
         delparty(para).then(res => {
           if (res.data.success) {
           }else{
            this.$message({
              type: 'success',
              message: '删除失败，请联系管理员！'
            })
           }
         })
      }
    },
    addgongjie() {
      this.gid = true
      this.gongjieren = true
      this.activeNames = ['3']
      return
    },
    addbaozheng() {
      this.did = true
      this.baozhengren = true
      this.activeNames = ['4']
      return
    },
    onScroll() {
      if (this.$route.matched[1].name === 'identityorder') {
        // var fourAnchor = document.getElementById('fourAnchor').offsetTop
        // var threeAnchor = document.getElementById('threeAnchor').offsetTop
        // var twoAnchor = document.getElementById('twoAnchor').offsetTop
        // var oneAnchor = document.getElementById('oneAnchor').offsetTop
        // if ((document.documentElement.scrollTop - 150) < fourAnchor && fourAnchor < (document.documentElement.scrollTop + 50)) {
        //   this.fourActive = true
        //   this.threeActive = false
        //   this.twoActive = false
        //   this.oneActive = false
        // }
        // if ((document.documentElement.scrollTop - 100) < threeAnchor && threeAnchor < (document.documentElement.scrollTop + 50)) {
        //   this.fourActive = false
        //   this.threeActive = true
        //   this.twoActive = false
        //   this.oneActive = false
        // }
        // if ((document.documentElement.scrollTop - 150) < twoAnchor && twoAnchor < (document.documentElement.scrollTop)) {
        //   this.fourActive = false
        //   this.threeActive = false
        //   this.twoActive = true
        //   this.oneActive = false
        // }
        // if ((document.documentElement.scrollTop - 40) < oneAnchor && oneAnchor < (document.documentElement.scrollTop)) {
        //   this.fourActive = false
        //   this.threeActive = false
        //   this.twoActive = false
        //   this.oneActive = true
        // }
      }
    },
    nextdo() {
      /* eslint-disable */
      var that = this
      var zhujieren = {}
      var gongjieren = {}
      var danbaoren = {}
      var jijilianxiren = this.contentlist.urgentPartys
      console.log(this.contentlist)
      if(this.contentlist.borrowers){
        zhujieren = this.contentlist.borrowers.filter(item => item.type == 1)[0]

        gongjieren = this.contentlist.borrowers.filter(item => item.type == 2)[0]

        danbaoren = this.contentlist.borrowers.filter(item => item.type == 3)[0]
      }
 
    console.log(zhujieren)

      var dizhi = []
       for(var index in that.ruleForm.zhujie.zhujiedizhi.AREA){
         dizhi.push({
           'id': zhujieren.addresses && zhujieren.addresses[index] ? zhujieren.addresses[index].id : '',
           'area': that.ruleForm.zhujie.zhujiedizhi.AREA[index][1],
           'addresstype': that.ruleForm.zhujie.zhujiedizhi.ADDRESSTYPE[index],
           'address': that.ruleForm.zhujie.zhujiedizhi.ADDRESS[index],
           'isdefault': that.ruleForm.zhujie.zhujiedizhi.ISDEFAULT[index],
           'postno': that.ruleForm.zhujie.zhujiedizhi.POSTNO[index],
           'propertytype': that.ruleForm.zhujie.zhujiedizhi.PROPERTYTYPE[index],
           'cdate': that.ruleForm.zhujie.zhujiedizhi.CDATE[index],
         })
       }
       if( dizhi[0] ) {
          dizhi[0].addresstype = '00002'
       }
       if( dizhi[1] ) {
        dizhi[1].addresstype = '00003'
       }
       zhujieren = {
        id: zhujieren?zhujieren.id:'',
        cardtype: this.ruleForm.zhujie.CARDTYPE, 
        name: this.ruleForm.zhujie.NAME,
        card: this.ruleForm.zhujie.CARD,
        carddate: this.ruleForm.zhujie.CARDDATE,
        longe: this.ruleForm.zhujie.LONGE,
        birthday: this.ruleForm.zhujie.BIRTHDAY,
        sex: this.ruleForm.zhujie.SEX,
        ename: this.ruleForm.zhujie.ENAME,
        memo: this.ruleForm.zhujie.MEMO,
        education: this.ruleForm.zhujie.EDUCATION,
        workinglife: this.ruleForm.zhujie.WORKINGLIFE,
        marriagestatus: this.ruleForm.zhujie.MARRIAGESTATUS,
        location: this.ruleForm.zhujie.LOCATION,
        familysize: this.ruleForm.zhujie.FAMILYSIZE,
        company: this.ruleForm.zhujie.COMPANY,
        cheatflag: this.ruleForm.zhujie.CHEATFLAG? "1": "0",
        caparty01: this.ruleForm.zhujie.CAPARTY01,
        caparty03: this.ruleForm.zhujie.CAPARTY03[1],
        caparty02: this.ruleForm.zhujie.CAPARTY02,
        caparty04: this.ruleForm.zhujie.CAPARTY04,
        caparty05: this.ruleForm.zhujie.CAPARTY05,
        scale: this.ruleForm.zhujie.SCALE,
        pincome: this.ruleForm.zhujie.PINCOME,
        fincome: this.ruleForm.zhujie.FINCOME,
        expenditure: this.ruleForm.zhujie.EXPENDITURE,
        loan: this.ruleForm.zhujie.LOAN,
        payment: this.ruleForm.zhujie.PAYMENT,
        phone: this.ruleForm.zhujie.PHONE,
        phonec: this.ruleForm.zhujie.PHONEC,
        phone2: this.ruleForm.zhujie.PHONE2,
        addresses: dizhi,
        driverlicense: this.ruleForm.zhujie.DRIVERLICENSE, 
        driverno: this.ruleForm.zhujie.DRIVERNO,
        operator1: this.ruleForm.zhujie.OPERATOR1,
        operator1phone: this.ruleForm.zhujie.OPERATOR1PHONE,
        operator2: this.ruleForm.zhujie.OPERATOR2,
        operator2phone: this.ruleForm.zhujie.OPERATOR2PHONE,
        type: 1
       }
       var jinji = []
       for(var index in that.ruleForm.jinjinlianxi.RELATIONSHIP){
         
        jinji.push({
          'id': jijilianxiren && jijilianxiren.length > 0? jijilianxiren[index].id: '',
          'relationship': that.ruleForm.jinjinlianxi.RELATIONSHIP[index],
          'name': that.ruleForm.jinjinlianxi.NAME[index],
          'phone': that.ruleForm.jinjinlianxi.PHONE[index],
          'company': that.ruleForm.jinjinlianxi.COMPANY[index],
          'companyphone': that.ruleForm.jinjinlianxi.COMPANYPHONE[index],
          'cardtype': that.ruleForm.jinjinlianxi.CARDTYPE[index],
          'card': that.ruleForm.jinjinlianxi.CARD[index],
          'income': that.ruleForm.jinjinlianxi.INCOME[index],
          'homeaddress': that.ruleForm.jinjinlianxi.HOMEADDRESS[index],
        })
      }
      this.contentlist.urgentPartys = jinji
      
      // 共借人
      if(this.gid){
        var gdizhi = []
        for(var index in that.ruleForm.gongjieren.zhujiedizhi.AREA){
          
          gdizhi.push({
            'id': gongjieren.addresses&& gongjieren.addresses.length > 0? gongjieren.addresses[index].id: '',
            'area': that.ruleForm.gongjieren.zhujiedizhi.AREA[index][1],
            'addresstype': that.ruleForm.gongjieren.zhujiedizhi.ADDRESSTYPE[index],
            'address': that.ruleForm.gongjieren.zhujiedizhi.ADDRESS[index],
            'isdefault': that.ruleForm.gongjieren.zhujiedizhi.ISDEFAULT[index],
            'postno': that.ruleForm.gongjieren.zhujiedizhi.POSTNO[index],
            'propertytype': that.ruleForm.gongjieren.zhujiedizhi.PROPERTYTYPE[index],
            'cdate': that.ruleForm.gongjieren.zhujiedizhi.CDATE[index],
          })
        }
        if( gdizhi[0] ) {
          gdizhi[0].addresstype = '00002'
        }
        if( gdizhi[1] ) {
          gdizhi[1].addresstype = '00003'
        }
        gongjieren = {
          id: gongjieren?gongjieren.id:'',
          cardtype: this.ruleForm.gongjieren.CARDTYPE, 
          name: this.ruleForm.gongjieren.NAME,
          card: this.ruleForm.gongjieren.CARD,
          carddate: this.ruleForm.gongjieren.CARDDATE,
          longe: this.ruleForm.gongjieren.LONGE,
          birthday: this.ruleForm.gongjieren.BIRTHDAY,
          sex: this.ruleForm.gongjieren.SEX,
          ename: this.ruleForm.gongjieren.ENAME,
          memo: this.ruleForm.gongjieren.MEMO,
          education: this.ruleForm.gongjieren.EDUCATION,
          workinglife: this.ruleForm.gongjieren.WORKINGLIFE,
          marriagestatus: this.ruleForm.gongjieren.MARRIAGESTATUS,
          location: this.ruleForm.gongjieren.LOCATION,
          familysize: this.ruleForm.gongjieren.FAMILYSIZE,
          company: this.ruleForm.gongjieren.COMPANY,
          cheatflag: this.ruleForm.gongjieren.CHEATFLAG? "1": "0",
          caparty01: this.ruleForm.gongjieren.CAPARTY01,
          caparty03: this.ruleForm.gongjieren.CAPARTY03[1],
          caparty02: this.ruleForm.gongjieren.CAPARTY02,
          caparty04: this.ruleForm.gongjieren.CAPARTY04,
          caparty05: this.ruleForm.gongjieren.CAPARTY05,
          scale: this.ruleForm.gongjieren.SCALE,
          pincome: this.ruleForm.gongjieren.PINCOME,
          fincome: this.ruleForm.gongjieren.FINCOME,
          expenditure: this.ruleForm.gongjieren.EXPENDITURE,
          loan: this.ruleForm.gongjieren.LOAN,
          payment: this.ruleForm.gongjieren.PAYMENT,
          phone: this.ruleForm.gongjieren.PHONE,
          phonec: this.ruleForm.gongjieren.PHONEC,
          phone2: this.ruleForm.gongjieren.PHONE2,
          addresses: gdizhi,
          type: 2
        }
      }

  
      // 保证人
      if(this.did){
        var ddizhi = []
        for(var index in that.ruleForm.baozhengren.zhujiedizhi.AREA){
          
          ddizhi.push({
            'id': baozhengren.addresses && baozhengren.addresses.length > 0?baozhengren.addresses[index].id:'',
            'area': that.ruleForm.baozhengren.zhujiedizhi.AREA[index][1],
            'addresstype': that.ruleForm.baozhengren.zhujiedizhi.ADDRESSTYPE[index],
            'address': that.ruleForm.baozhengren.zhujiedizhi.ADDRESS[index],
            'isdefault': that.ruleForm.baozhengren.zhujiedizhi.ISDEFAULT[index],
            'postno': that.ruleForm.baozhengren.zhujiedizhi.POSTNO[index],
            'propertytype': that.ruleForm.baozhengren.zhujiedizhi.PROPERTYTYPE[index],
            'cdate': that.ruleForm.baozhengren.zhujiedizhi.CDATE[index],
          })
        }
        if( ddizhi[0] ) {
          ddizhi[0].addresstype = '00002'
        }
        if( ddizhi[1] ) {
          ddizhi[1].addresstype = '00003'
        }
        
        danbaoren = {
          id: danbaoren?danbaoren.id: '', 
          cardtype: this.ruleForm.baozhengren.CARDTYPE, 
          name: this.ruleForm.baozhengren.NAME,
          card: this.ruleForm.baozhengren.CARD,
          carddate: this.ruleForm.baozhengren.CARDDATE,
          longe: this.ruleForm.baozhengren.LONGE,
          birthday: this.ruleForm.baozhengren.BIRTHDAY,
          sex: this.ruleForm.baozhengren.SEX,
          ename: this.ruleForm.baozhengren.ENAME,
          memo: this.ruleForm.baozhengren.MEMO,
          education: this.ruleForm.baozhengren.EDUCATION,
          workinglife: this.ruleForm.baozhengren.WORKINGLIFE,
          marriagestatus: this.ruleForm.baozhengren.MARRIAGESTATUS,
          location: this.ruleForm.baozhengren.LOCATION,
          familysize: this.ruleForm.baozhengren.FAMILYSIZE,
          company: this.ruleForm.baozhengren.COMPANY,
          cheatflag: this.ruleForm.baozhengren.CHEATFLAG? "1": "0",
          caparty01: this.ruleForm.baozhengren.CAPARTY01,
          caparty03: this.ruleForm.baozhengren.CAPARTY03[1],
          caparty02: this.ruleForm.baozhengren.CAPARTY02,
          caparty04: this.ruleForm.baozhengren.CAPARTY04,
          caparty05: this.ruleForm.baozhengren.CAPARTY05,
          scale: this.ruleForm.baozhengren.SCALE,
          pincome: this.ruleForm.baozhengren.PINCOME,
          fincome: this.ruleForm.baozhengren.FINCOME,
          expenditure: this.ruleForm.baozhengren.EXPENDITURE,
          loan: this.ruleForm.baozhengren.LOAN,
          payment: this.ruleForm.baozhengren.PAYMENT,
          phone: this.ruleForm.baozhengren.PHONE,
          phonec: this.ruleForm.baozhengren.PHONEC,
          phone2: this.ruleForm.baozhengren.PHONE2,
          addresses: ddizhi,
          type: 3
        }
      }
      this.contentlist.borrowers= []
      
     
      this.contentlist.borrowers.push(zhujieren)
 
      if(this.gid){
        this.contentlist.borrowers.push(gongjieren)
      }
      if(this.did){
        this.contentlist.borrowers.push(danbaoren)
      }
      console.log(that.contentlist)
      localStorage.setItem('contentlist' + that.routeid, JSON.stringify(that.contentlist))
      localStorage.setItem('orderold' + that.routeid, JSON.stringify(that.contentlist))
      localStorage.setItem('MD5Data_shenfen' + that.routeid, JSON.stringify(that.idcardimg))
    },
    initfunction() {
      /* eslint-disable */
      var that = this
      
      this.contentlist = JSON.parse(localStorage.getItem('contentlist' + that.routeid))
      this.idcardlist = JSON.parse(localStorage.getItem('CodeSource'))['00001H8RUUJY00000C0C']
      this.xueli = JSON.parse(localStorage.getItem('CodeSource'))['00001H8RUUJY00000C0B']
      this.hunyin = JSON.parse(localStorage.getItem('CodeSource'))['00001H8RUUJY00000C05']
      this.hangye = JSON.parse(localStorage.getItem('CodeSource'))['00001H8RUUJY70000C0U']

      var code = JSON.parse(localStorage.getItem('CodeSource'))['00001I19D00IV0000A1E']
      code.map(e=>{
        e.label =e.NAME
        e.value = e.CODE
      })
      
      this.zhiye = toTree(code)

      this.guyuan = JSON.parse(localStorage.getItem('CodeSource'))['00001H8RUUJY70000C0W']

      this.zhiwei = JSON.parse(localStorage.getItem('CodeSource'))['00001HFWVAV5W0000A21']

      this.jiashizhengjian = JSON.parse(localStorage.getItem('CodeSource'))['00001HBHRFTIM0000A5U']

      this.fangchantype = JSON.parse(localStorage.getItem('CodeSource'))['00001H8RUUJY00000C0K']

      this.dizhi = JSON.parse(localStorage.getItem('CodeSource'))['00001H8RUUJY00000C0J']

      this.guanxi = JSON.parse(localStorage.getItem('CodeSource'))['00001H8RUUJY00000C06']
      this.gdtype = JSON.parse(localStorage.getItem('CodeSource'))['00001JQJWM06B0000AY2']
     
      // orderInfo(localStorage.getItem('orderId')).then(res => {
       if(localStorage.getItem('orderold' + that.routeid)){
        var orderold = JSON.parse(localStorage.getItem('orderold' + that.routeid))

        if (orderold.basicInfo.readonly) {
          that.sbdisable = true
        } else {
          that.sbdisable = false
        }
        if((orderold.basicInfo.readonly == false && orderold.basicInfo.status == 4) || orderold.basicInfo.status==6) {
          getCurrentTaskCmd(localStorage.getItem('orderId' + that.routeid)).then(res => {
            console.log(res)
            that.btnlistenter = res.data.data
          })
        }
        that.contentlist.borrowers = orderold.borrowers
        var zhujieren = orderold.borrowers.filter(item => item.type == 1)[0]
        var gongjieren = orderold.borrowers.filter(item => item.type == 2)[0]
        var danbaoren = orderold.borrowers.filter(item => item.type == 3)[0]  
        var jijilianxiren = orderold.urgentPartys
        // that.jinjicard = orderold.urgentPartys
        that.jinjiLength = orderold.urgentPartys.length
        // console.log(123)
        // console.log(that.jinjiLength )
        if(zhujieren) {

        this.ruleForm.zhujie.id = zhujieren.id
        this.ruleForm.zhujie.CARDTYPE = zhujieren.cardtype
        this.ruleForm.zhujie.NAME = zhujieren.name
        this.ruleForm.zhujie.CARD = zhujieren.card
        this.ruleForm.zhujie.CARDDATE = zhujieren.carddate
        this.ruleForm.zhujie.LONGE = zhujieren.LONGE
        this.ruleForm.zhujie.BIRTHDAY = zhujieren.birthday
        this.ruleForm.zhujie.SEX = zhujieren.sex
        this.ruleForm.zhujie.ENAME = zhujieren.ename
        this.ruleForm.zhujie.MEMO = zhujieren.memo
        this.ruleForm.zhujie.EDUCATION = zhujieren.education
        this.ruleForm.zhujie.WORKINGLIFE = zhujieren.workinglife
        this.ruleForm.zhujie.MARRIAGESTATUS = zhujieren.marriagestatus
        this.ruleForm.zhujie.LOCATION = zhujieren.location
        this.ruleForm.zhujie.FAMILYSIZE = zhujieren.familysize
        this.ruleForm.zhujie.COMPANY = zhujieren.company
        this.ruleForm.zhujie.CHEATFLAG = zhujieren.cheatflag == "0" ? false : true
        this.ruleForm.zhujie.CAPARTY01 = zhujieren.caparty01
        if (zhujieren.caparty03) {
          this.ruleForm.zhujie.CAPARTY03 = [zhujieren.caparty03.substring(0,5),zhujieren.caparty03]
        }
        this.ruleForm.zhujie.CAPARTY02 = zhujieren.caparty02
        this.ruleForm.zhujie.CAPARTY04 = zhujieren.caparty04
        this.ruleForm.zhujie.CAPARTY05 = zhujieren.caparty05
        this.ruleForm.zhujie.SCALE = zhujieren.scale
        this.ruleForm.zhujie.PINCOME = zhujieren.pincome
        this.ruleForm.zhujie.FINCOME = zhujieren.fincome
        this.ruleForm.zhujie.EXPENDITURE = zhujieren.expenditure
        this.ruleForm.zhujie.LOAN = zhujieren.loan
        this.ruleForm.zhujie.PAYMENT = zhujieren.payment
        this.ruleForm.zhujie.PHONE = zhujieren.phone
        this.ruleForm.zhujie.PHONEC = zhujieren.phonec
        this.ruleForm.zhujie.PHONE2 = zhujieren.phone2
        var jiatingdizi = zhujieren.addresses.filter(item => item.addresstype == '00002')[0]
        var bangongdizi = zhujieren.addresses.filter(item => item.addresstype == '00003')[0]
        var qitadizhi = zhujieren.addresses.filter(item => item.addresstype != '00003' && item.addresstype !='00002')
        if(jiatingdizi){
          this.ruleForm.zhujie.zhujiedizhi.ADDRESSTYPE[0] = '00002'
          this.ruleForm.zhujie.zhujiedizhi.AREA[0] = [jiatingdizi.area.substring(0,2)+'0000', jiatingdizi.area ]
          this.ruleForm.zhujie.zhujiedizhi.ADDRESS[0] = jiatingdizi.address
          this.ruleForm.zhujie.zhujiedizhi.id[0] = jiatingdizi.id
          this.ruleForm.zhujie.zhujiedizhi.ISDEFAULT[0] = jiatingdizi.isdefault
          this.ruleForm.zhujie.zhujiedizhi.POSTNO[0] = jiatingdizi.postno
          this.ruleForm.zhujie.zhujiedizhi.PROPERTYTYPE[0] = jiatingdizi.propertytype
          
          this.$set(this.ruleForm.zhujie.zhujiedizhi.CDATE, 0, false)
          this.ruleForm.zhujie.zhujiedizhi.CDATE[0] = jiatingdizi.cdate
          
        }
        
        if(bangongdizi) {
          this.ruleForm.zhujie.zhujiedizhi.ADDRESSTYPE[1] = '00003'
          this.ruleForm.zhujie.zhujiedizhi.AREA[1] = [bangongdizi.area.substring(0,2)+'0000', bangongdizi.area ]
          this.ruleForm.zhujie.zhujiedizhi.ADDRESS[1] = bangongdizi.address
          this.ruleForm.zhujie.zhujiedizhi.id[1] = bangongdizi.id
          this.ruleForm.zhujie.zhujiedizhi.POSTNO[1] = bangongdizi.postno
          this.ruleForm.zhujie.zhujiedizhi.PROPERTYTYPE[1] = bangongdizi.propertytype
          this.$set(this.ruleForm.zhujie.zhujiedizhi.CDATE, 1, false)
          this.ruleForm.zhujie.zhujiedizhi.CDATE[1] = bangongdizi.cdate
          
        }
        if(qitadizhi.length>0){
          that.addcard = qitadizhi
          qitadizhi.unshift(1,2)
          qitadizhi.forEach(function(item,index,array){
            if(index>1){
              that.ruleForm.zhujie.zhujiedizhi.ADDRESSTYPE[index] =item.addresstype
              that.ruleForm.zhujie.zhujiedizhi.AREA[index] = [item.area.substring(0,2)+'0000', item.area ]
              that.ruleForm.zhujie.zhujiedizhi.ADDRESS[index] = item.address
              that.ruleForm.zhujie.zhujiedizhi.id[index] = item.id
              that.ruleForm.zhujie.zhujiedizhi.POSTNO[index] = item.postno
              that.ruleForm.zhujie.zhujiedizhi.PROPERTYTYPE[index] = item.propertytype
              that.$set(that.ruleForm.zhujie.zhujiedizhi.CDATE, index, false)
              that.ruleForm.zhujie.zhujiedizhi.CDATE[index] = item.cdate
              
            } 　　
          }) 
        }

        this.ruleForm.zhujie.DRIVERLICENSE = zhujieren.driverlicense
        this.ruleForm.zhujie.DRIVERNO = zhujieren.driverno
        this.ruleForm.zhujie.OPERATOR1 = zhujieren.operator1
        this.ruleForm.zhujie.OPERATOR1PHONE = zhujieren.operator1phone
        this.ruleForm.zhujie.OPERATOR2 = zhujieren.operator2
        this.ruleForm.zhujie.OPERATOR2PHONE = zhujieren.operator2phone
        }
        // 紧急联系人
          jijilianxiren.forEach(function(item,index,array){
                        
              that.jinjicard.push(index+1)
            
              that.$set(that.ruleForm.jinjinlianxi.RELATIONSHIP, index, item.relationship)
              that.$set(that.ruleForm.jinjinlianxi.CARDTYPE, index,item.cardtype)
              // that.ruleForm.jinjinlianxi.RELATIONSHIP[index] =item.relationship
              that.ruleForm.jinjinlianxi.NAME[index] = item.name
              that.ruleForm.jinjinlianxi.PHONE[index] = item.phone
              that.ruleForm.jinjinlianxi.id[index] = item.id
              that.ruleForm.jinjinlianxi.COMPANY[index] = item.company
              that.ruleForm.jinjinlianxi.COMPANYPHONE[index] = item.companyphone
              // that.ruleForm.jinjinlianxi.CARDTYPE[index] = item.cardtype
              that.ruleForm.jinjinlianxi.CARD[index] = item.card
              that.ruleForm.jinjinlianxi.INCOME[index] = item.income
              that.ruleForm.jinjinlianxi.HOMEADDRESS[index] = item.homeaddress
          　　
          })
          console.log(that.jinjicard)

        // 共借人
        if(gongjieren) {
          this.gid = true
          this.gongjieren = true
          this.ruleForm.gongjieren.id = gongjieren.id
          this.ruleForm.gongjieren.CARDTYPE = gongjieren.cardtype
          this.ruleForm.gongjieren.NAME = gongjieren.name
          this.ruleForm.gongjieren.CARD = gongjieren.card
          this.ruleForm.gongjieren.CARDDATE = gongjieren.carddate
          this.ruleForm.gongjieren.LONGE = gongjieren.LONGE
          this.ruleForm.gongjieren.BIRTHDAY = gongjieren.birthday
          this.ruleForm.gongjieren.SEX = gongjieren.sex
          this.ruleForm.gongjieren.ENAME = gongjieren.ename
          this.ruleForm.gongjieren.MEMO = gongjieren.memo
          this.ruleForm.gongjieren.EDUCATION = gongjieren.education
          this.ruleForm.gongjieren.WORKINGLIFE = gongjieren.workinglife
          this.ruleForm.gongjieren.MARRIAGESTATUS = gongjieren.marriagestatus
          this.ruleForm.gongjieren.LOCATION = gongjieren.location
          this.ruleForm.gongjieren.FAMILYSIZE = gongjieren.familysize
          this.ruleForm.gongjieren.COMPANY = gongjieren.company
          this.ruleForm.gongjieren.CHEATFLAG = gongjieren.cheatflag == "0" ? false : true
          this.ruleForm.gongjieren.CAPARTY01 = gongjieren.caparty01
          if(gongjieren.caparty03){
            this.ruleForm.gongjieren.CAPARTY03 = [gongjieren.caparty03.substring(0,5),gongjieren.caparty03]
          }
          this.ruleForm.gongjieren.CAPARTY02 = gongjieren.caparty02
          this.ruleForm.gongjieren.CAPARTY04 = gongjieren.caparty04
          this.ruleForm.gongjieren.CAPARTY05 = gongjieren.caparty05
          this.ruleForm.gongjieren.SCALE = gongjieren.scale
          this.ruleForm.gongjieren.PINCOME = gongjieren.pincome
          this.ruleForm.gongjieren.FINCOME = gongjieren.fincome
          this.ruleForm.gongjieren.EXPENDITURE = gongjieren.expenditure
          this.ruleForm.gongjieren.LOAN = gongjieren.loan
          this.ruleForm.gongjieren.PAYMENT = gongjieren.payment
          this.ruleForm.gongjieren.PHONE = gongjieren.phone
          this.ruleForm.gongjieren.PHONEC = gongjieren.phonec
          this.ruleForm.gongjieren.PHONE2 = gongjieren.phone2
          var gjiatingdizi = gongjieren.addresses.filter(item => item.addresstype == '00002')[0]
          var gbangongdizi = gongjieren.addresses.filter(item => item.addresstype == '00003')[0]
          var gqitadizhi = gongjieren.addresses.filter(item => item.addresstype != '00003' && item.addresstype !='00002')
         
          if(gjiatingdizi){
            this.ruleForm.gongjieren.zhujiedizhi.ADDRESSTYPE[0] = '00002'
            this.ruleForm.gongjieren.zhujiedizhi.AREA[0] = [gjiatingdizi.area.substring(0,2)+'0000', gjiatingdizi.area ]
            this.ruleForm.gongjieren.zhujiedizhi.id[0] = gjiatingdizi.id
            this.ruleForm.gongjieren.zhujiedizhi.ADDRESS[0] = gjiatingdizi.address
            this.ruleForm.gongjieren.zhujiedizhi.ISDEFAULT[0] = gjiatingdizi.isdefault
            this.ruleForm.gongjieren.zhujiedizhi.POSTNO[0] = gjiatingdizi.postno
            this.ruleForm.gongjieren.zhujiedizhi.PROPERTYTYPE[0] = gjiatingdizi.propertytype
            this.$set(this.ruleForm.gongjieren.zhujiedizhi.CDATE, 0, false)
            this.ruleForm.gongjieren.zhujiedizhi.CDATE[0] = gjiatingdizi.cdate
          }
          if(gbangongdizi) {
            this.ruleForm.gongjieren.zhujiedizhi.ADDRESSTYPE[1] = '00003'
            this.ruleForm.gongjieren.zhujiedizhi.AREA[1] = [gbangongdizi.area.substring(0,2)+'0000', gbangongdizi.area ]
            this.ruleForm.gongjieren.zhujiedizhi.ADDRESS[1] = gbangongdizi.address
            this.ruleForm.gongjieren.zhujiedizhi.id[1] = gbangongdizi.id
            this.ruleForm.gongjieren.zhujiedizhi.POSTNO[1] = gbangongdizi.postno
            this.ruleForm.gongjieren.zhujiedizhi.PROPERTYTYPE[1] = gbangongdizi.propertytype
             that.$set(that.ruleForm.gongjieren.zhujiedizhi.CDATE, 1, false)
            this.ruleForm.gongjieren.zhujiedizhi.CDATE[1] = gbangongdizi.cdate
          }
          
    
          
          if(gqitadizhi.length>0){
            that.addcard = gqitadizhi
            gqitadizhi.unshift(1,2)
            gqitadizhi.forEach(function(item,index,array){
              if(index>1){
                that.ruleForm.gongjieren.zhujiedizhi.ADDRESSTYPE[index] =item.addresstype
                that.ruleForm.gongjieren.zhujiedizhi.AREA[index] = [item.area.substring(0,2)+'0000', item.area ]
                that.ruleForm.gongjieren.zhujiedizhi.ADDRESS[index] = item.address
                that.ruleForm.gongjieren.zhujiedizhi.id[index] = item.id
                that.ruleForm.gongjieren.zhujiedizhi.POSTNO[index] = item.postno
                that.ruleForm.gongjieren.zhujiedizhi.PROPERTYTYPE[index] = item.propertytype
                 that.$set(that.ruleForm.gongjieren.zhujiedizhi.CDATE, index, false)
                that.ruleForm.gongjieren.zhujiedizhi.CDATE[index] = item.cdate
              } 　　
            }) 
          }



        }



        // 保证人
        if(danbaoren) {
          this.baozhengren = true
          this.did = true
          this.ruleForm.baozhengren.id = danbaoren.id
          this.ruleForm.baozhengren.CARDTYPE = danbaoren.cardtype
          this.ruleForm.baozhengren.NAME = danbaoren.name
          this.ruleForm.baozhengren.CARD = danbaoren.card
          this.ruleForm.baozhengren.CARDDATE = danbaoren.carddate
          this.ruleForm.baozhengren.LONGE = danbaoren.LONGE
          this.ruleForm.baozhengren.BIRTHDAY = danbaoren.birthday
          this.ruleForm.baozhengren.SEX = danbaoren.sex
          this.ruleForm.baozhengren.ENAME = danbaoren.ename
          this.ruleForm.baozhengren.MEMO = danbaoren.memo
          this.ruleForm.baozhengren.EDUCATION = danbaoren.education
          this.ruleForm.baozhengren.WORKINGLIFE = danbaoren.workinglife
          this.ruleForm.baozhengren.MARRIAGESTATUS = danbaoren.marriagestatus
          this.ruleForm.baozhengren.LOCATION = danbaoren.location
          this.ruleForm.baozhengren.FAMILYSIZE = danbaoren.familysize
          this.ruleForm.baozhengren.COMPANY = danbaoren.company
          this.ruleForm.baozhengren.CHEATFLAG = danbaoren.cheatflag == "0" ? false : true
          this.ruleForm.baozhengren.CAPARTY01 = danbaoren.caparty01
          if(danbaoren.caparty03){
            this.ruleForm.baozhengren.CAPARTY03 = [danbaoren.caparty03.substring(0,5),danbaoren.caparty03]
          }
          this.ruleForm.baozhengren.CAPARTY02 = danbaoren.caparty02
          this.ruleForm.baozhengren.CAPARTY04 = danbaoren.caparty04
          this.ruleForm.baozhengren.CAPARTY05 = danbaoren.caparty05
          this.ruleForm.baozhengren.SCALE = danbaoren.scale
          this.ruleForm.baozhengren.PINCOME = danbaoren.pincome
          this.ruleForm.baozhengren.FINCOME = danbaoren.fincome
          this.ruleForm.baozhengren.EXPENDITURE = danbaoren.expenditure
          this.ruleForm.baozhengren.LOAN = danbaoren.loan
          this.ruleForm.baozhengren.PAYMENT = danbaoren.payment
          this.ruleForm.baozhengren.PHONE = danbaoren.phone
          this.ruleForm.baozhengren.PHONEC = danbaoren.phonec
          this.ruleForm.baozhengren.PHONE2 = danbaoren.phone2
          var djiatingdizi = danbaoren.addresses.filter(item => item.addresstype == '00002')[0]
          var dbangongdizi = danbaoren.addresses.filter(item => item.addresstype == '00003')[0]
          var dqitadizhi = danbaoren.addresses.filter(item => item.addresstype != '00003' && item.addresstype !='00002')
          
          if(djiatingdizi){
            this.ruleForm.baozhengren.zhujiedizhi.ADDRESSTYPE[0] = '00002'
            this.ruleForm.baozhengren.zhujiedizhi.AREA[0] = [djiatingdizi.area.substring(0,2)+'0000', djiatingdizi.area ]
            this.ruleForm.baozhengren.zhujiedizhi.id[0] = djiatingdizi.id
            this.ruleForm.baozhengren.zhujiedizhi.ADDRESS[0] = djiatingdizi.address
            this.ruleForm.baozhengren.zhujiedizhi.ISDEFAULT[0] = djiatingdizi.isdefault
            this.ruleForm.baozhengren.zhujiedizhi.POSTNO[0] = djiatingdizi.postno
            this.ruleForm.baozhengren.zhujiedizhi.PROPERTYTYPE[0] = djiatingdizi.propertytype
            that.$set(that.ruleForm.baozhengren.zhujiedizhi.CDATE, 0, false)
            this.ruleForm.baozhengren.zhujiedizhi.CDATE[0] = djiatingdizi.cdate
          }
          if(dbangongdizi) {
            this.ruleForm.baozhengren.zhujiedizhi.ADDRESSTYPE[1] = '00003'
            this.ruleForm.baozhengren.zhujiedizhi.AREA[1] = [dbangongdizi.area.substring(0,2)+'0000', dbangongdizi.area ]
            this.ruleForm.baozhengren.zhujiedizhi.ADDRESS[1] = dbangongdizi.address
            this.ruleForm.baozhengren.zhujiedizhi.id[0] = djiatingdizi.id
            this.ruleForm.baozhengren.zhujiedizhi.POSTNO[1] = dbangongdizi.postno
            this.ruleForm.baozhengren.zhujiedizhi.PROPERTYTYPE[1] = dbangongdizi.propertytype
            that.$set(that.ruleForm.baozhengren.zhujiedizhi.CDATE, 1, false)
            this.ruleForm.baozhengren.zhujiedizhi.CDATE[1] = dbangongdizi.cdate
          }
          
    
          
          if(dqitadizhi.length>0){
            that.addcard = dqitadizhi
            dqitadizhi.unshift(1,2)
            dqitadizhi.forEach(function(item,index,array){
              if(index>1){
                that.ruleForm.baozhengren.zhujiedizhi.ADDRESSTYPE[index] =item.addresstype
                that.ruleForm.baozhengren.zhujiedizhi.AREA[index] = [item.area.substring(0,2)+'0000', item.area ]
                that.ruleForm.baozhengren.zhujiedizhi.ADDRESS[index] = item.address
                that.ruleForm.baozhengren.zhujiedizhi.id[index] = item.id
                that.ruleForm.baozhengren.zhujiedizhi.POSTNO[index] = item.postno
                that.ruleForm.baozhengren.zhujiedizhi.PROPERTYTYPE[index] = item.propertytype
                that.$set(that.ruleForm.baozhengren.zhujiedizhi.CDATE, index, false)
                that.ruleForm.baozhengren.zhujiedizhi.CDATE[index] = item.cdate
              } 　　
            }) 
          }



        }
       
        
       }
       that.toRule()
      // })
    },
    toRule() {
      var that = this
      if(localStorage.getItem('rulefalse' + that.routeid)) {
        that.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            localStorage.removeItem('sbtag' + that.routeid)
            localStorage.removeItem('activetag' + that.routeid)
            localStorage.removeItem('rulefalse' + that.routeid)
          } else {
            if (localStorage.getItem('activetag' + that.routeid)) {
              this.activeNames =localStorage.getItem('activetag' + that.routeid).split(',')
            }
            
            if(localStorage.getItem('sbtag' + that.routeid) == 3) {
              this.gid = true
              this.gongjieren = true
            }
            if(localStorage.getItem('sbtag' + that.routeid) == 4) {
              this.baozhengren = true
              this.did = true
            }
            localStorage.removeItem('sbtag' + that.routeid)
            localStorage.removeItem('activetag' + that.routeid)
            localStorage.removeItem('rulefalse' + that.routeid)
            return false;
          }
        });
      } 
    },
  },
  mounted() {
    var s = {}
    s.USERID = Cookies.get('userId') // localStorage.getItem('userId')
    s.TOKEN = Cookies.get('Admin-Token')
    var data = 'PCCONN ' + JSON.stringify(s)
    this.$store.dispatch('SocketConnect')
    this.$store.dispatch('SocketSenddata', data)
    this.initfunction()
    // window.addEventListener('scroll', this.onScroll)
  },
  created() {
    let key = ''
    for (key in this.dataLength) {
      this.$set(this.selectedOptions, key, false)
      this.$set(this.ruleForm.zhujie.zhujiedizhi.AREA, key, false)
      this.$set(this.ruleForm.zhujie.zhujiedizhi.PROPERTYTYPE, key, false)
      this.$set(this.ruleForm.zhujie.zhujiedizhi.ADDRESS, key, false)
      this.$set(this.ruleForm.zhujie.zhujiedizhi.ISDEFAULT, key, false)
      this.$set(this.ruleForm.zhujie.zhujiedizhi.POSTNO, key, false)
      this.$set(this.ruleForm.zhujie.zhujiedizhi.CDATE, key, false)

      this.$set(this.ruleForm.gongjieren.zhujiedizhi.AREA, key, false)
      this.$set(this.ruleForm.gongjieren.zhujiedizhi.PROPERTYTYPE, key, false)
      this.$set(this.ruleForm.gongjieren.zhujiedizhi.ADDRESS, key, false)
      this.$set(this.ruleForm.gongjieren.zhujiedizhi.ISDEFAULT, key, false)
      this.$set(this.ruleForm.gongjieren.zhujiedizhi.POSTNO, key, false)
      this.$set(this.ruleForm.gongjieren.zhujiedizhi.CDATE, key, false)

      this.$set(this.ruleForm.baozhengren.zhujiedizhi.AREA, key, false)
      this.$set(this.ruleForm.baozhengren.zhujiedizhi.PROPERTYTYPE, key, false)
      this.$set(this.ruleForm.baozhengren.zhujiedizhi.ADDRESS, key, false)
      this.$set(this.ruleForm.baozhengren.zhujiedizhi.ISDEFAULT, key, false)
      this.$set(this.ruleForm.baozhengren.zhujiedizhi.POSTNO, key, false)
      this.$set(this.ruleForm.baozhengren.zhujiedizhi.CDATE, key, false)

      this.$set(this.ruleForm.jinjinlianxi.RELATIONSHIP, key, false)
      this.$set(this.ruleForm.jinjinlianxi.NAME, key, false)
      this.$set(this.ruleForm.jinjinlianxi.PHONE, key, false)
      this.$set(this.ruleForm.jinjinlianxi.COMPANY, key, false)
      this.$set(this.ruleForm.jinjinlianxi.COMPANYPHONE, key, false)
      this.$set(this.ruleForm.jinjinlianxi.CARDTYPE, key, false)
      this.$set(this.ruleForm.jinjinlianxi.CARD, key, false)
      this.$set(this.ruleForm.jinjinlianxi.INCOME, key, false)
      this.$set(this.ruleForm.jinjinlianxi.HOMEADDRESS, key, false)
      
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
.ocrclass{
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
}
.showru{
  background-color: #EBF9FB ;
  color:#3DC8DD;
  height:30px;
  line-height:11px;
  text-align:center;
  padding-top:8px; 
}
.showchu{
  height:30px;
  line-height:30px;
  text-align:center;
  padding-top:3px; 
}
.numjin{
    background: #CBCFE2;
    border-radius: 2px;
    display: inline-block;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 19px;
}
.cardadd{
  
  border:1px dashed #cccccc;
  text-align: center;
  height: 303px;
  line-height: 303px;
  width: 95%;
  margin: 7px;
}
.borderbottom{
  padding-bottom: 10px;
  border-bottom: 1px solid #F9F9F9;
}
.cardback{
 
  background-color: #F3F6F8;
}
.cardnei{
  margin: 10px;
}
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
.hrefactive{
  background-color: #30DBC7;
  color:#ffffff!important;
}
.xiesanjiao{
  display: block;
  overflow: hidden;
  width: 0px;
  height: 0px;
  border-top: 8px solid transparent;
  border-right: 8px solid #30DBC7; 
  border-left: 4px solid transparent;
  border-bottom: 8px solid  transparent;
  top: -52px;
  position: relative;
  left: -19px;
}
.topbootom{
  position: absolute;
  bottom:50px;
  right: -100px;
  cursor: pointer;
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
.titlerightzi{
   cursor: pointer;
   padding-right: 10px;
}
.titlerightzir{
  cursor: pointer;
  padding-right: 10px;
}
.titleright{
  float:right;
  padding-right: 5px;
  font-size: 14px;
  color: #5ADACB;
}
.titleleft{
  border-left: 1px solid #3DC8DD;
  padding-left: 5px;
  color:#6cc6fb;
  font-size: 16px;
}
.midcontent{
  margin-top: 20px;
  background-color: #ffffff;
  margin-bottom: 20px;
  padding-bottom: 30px;
  padding-top: 10px;
  
}
.btncolor{
  background-color: #64ecdf;
  border: 1px solid #64ecdf;
}
.btnnextcolor{
  background-color: #f5fcfb;
  border: 1px solid #64ecdf;
  color: #64ecdf;
}
.searchbar{
  height: 50px;
  line-height: 50px;
}
.stepcolor{
  padding-top: 13px;
}
.topbtnbasic{
  text-align: right;
  height: 70px;
  line-height: 70px;
}

.formtitle{
  clear:both;
  font-size: 16px;
  padding-top: 10px;
  color: #333333;
  padding-bottom: 15px;
}
.pline{
  clear: both;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 0.5px dashed #cccccc;
}
table{ 
  table-layout:fixed; 
  empty-cells:show; 
  border-collapse: collapse; 
  margin:0 auto; 
} 
.intable th { 
  background-repeat:repeat-x; 
  height:30px; 
  background-color: #F7F7F7;
} 
.intable td {
  height:50px;
} 
.intable{
  width: 100%;
  border:1px solid #E9E9E9;
  color:#666; 
}
.intable td,.intable th{ 
  border:1px solid #E9E9E9; 
  padding:0 1em 0; 
}
.poptable{
  width: 380px;
  border:1px solid #E9E9E9;
  color:#666; 
}
.poptable th { 
  background-repeat:repeat-x; 
  background-color: #F7F7F7;
} 
.poptable td,.poptable th{ 
  border:1px solid #E9E9E9; 
  height:30px; 
  padding:0 1em 0; 
}
table tr.alter{ 
  background-color:#f5fafe; 
}
.numinput{
  width: 110px;
}
.marginleft0{
  margin-left: 0px;
}
</style>