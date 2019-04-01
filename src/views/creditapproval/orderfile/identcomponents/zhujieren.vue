<template>
  <section
    class="zhujieren-container"
    style="padding:0 76px"
  >
    <el-form
      size="medium"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      :disabled="sbdisable"
      label-position='right'
      label-width="95px"
    >
      <div>
        <div
          v-if="isShowDel"
          class="del-button"
          @click="$emit('delG', idtype)"
        >{{idtype==2?'删除共借人':'删除保证人'}}</div>
        <div
          class="formtitle"
          :style="delStyle"
        >
          <span class="title">基本信息</span>
        </div>
        <el-row>
          <el-col
            :span="24"
            v-if="idtype != 1"
          >
            <el-form-item
              label="关系"
              prop="relationship"
              :rules="[
              { required: true, message: '请选择', trigger: 'blur' },
              
            ]"
            >
              <el-select
                v-model="ruleForm.relationship"
                size="mini"
                placeholder=""
              >
                <el-option
                  v-for="item in guanxi"
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
              label="证件类型"
              prop="cardtype"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-select
                v-model="ruleForm.cardtype"
                size="small"
                @change="currentSel"
                placeholder=""
                style="width:400px"
              >
                <el-option
                  v-for="item in idcardlist"
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
              label="证件号码"
              prop="card"
              :rules="[
          { required: true, message: '请输入', trigger: 'blur' },
          ]"
            >
              <Poptip
                trigger="focus"
                title=""
                popper-class="popclass"
                placement="top-start"
                :content="ruleForm.card?ruleForm.card.replace(/\s/g, '').replace(/(\d{6}){1}(\d{8}){0,1}(\d{4}){0,1}/g, '$1 $2 $3'): ''"
              >
                <el-input
                  v-model="ruleForm.card"
                  style="width:400px"
                  size="small"
                  @blur="ToCarddis"
                  :disabled="namecard"
                ></el-input>
              </Poptip>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="姓名"
              prop="name"
              :rules="[
          { required: true, message: '请输入', trigger: 'blur' },
          ]"
            >
              <el-input
                maxlength="12"
                v-model="ruleForm.name"
                @blur="toPinyin(ruleForm.name)"
                size="small"
                style="width:400px"
                :disabled="namecard"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="拼音/英文"
              prop="ename"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-input
                v-model="ruleForm.ename"
                size="small"
                style="width:400px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="证件到期日"
              prop="carddate"
              :rules="[
          { required: true, message: '请输入', trigger: 'blur' },
          ]"
            >
              <el-date-picker
                v-show="!cdatedisable"
                type="date"
                :disabled="cdatedisable"
                value-format="yyyy-MM-dd"
                v-model="ruleForm.carddate"
                placeholder="选择日期"
                size="small"
                style="width:318px"
              ></el-date-picker>
              <el-checkbox
                v-model="ruleForm.longe"
                true-label="true"
                :label="1"
                @change="upcarddate"
              >长期</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="出生年月"
              prop="birthday"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                v-model="ruleForm.birthday"
                style="width:400px"
                placeholder="选择日期"
                size="small"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="性别"
              prop="sex"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-select
                v-model="ruleForm.sex"
                size="small"
                placeholder="请选择"
                style="width:400px"
              >
                <el-option
                  key="M"
                  label="男"
                  value="M"
                >
                </el-option>
                <el-option
                  key="F"
                  label="女"
                  value="F"
                >
                </el-option>
                <el-option
                  key="3"
                  label="未知"
                  value="3"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="学历"
              prop="education"
              :rules="[
              { required: true, message: '请输入', trigger: 'change' },
              
            ]"
            >
              <el-select
                v-model="ruleForm.education"
                size="small"
                placeholder=""
                style="width:400px"
              >
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
          <el-col :span="12">
            <el-form-item
              label="婚姻状况"
              prop="marriagestatus"
              :rules="[
              { required: true, message: '请输入', trigger: 'change' },
              
            ]"
            >
              <el-select
                v-model="ruleForm.marriagestatus"
                @change="$emit('changemarri', ruleForm.marriagestatus)"
                size="small"
                placeholder=""
                style="width:400px"
              >
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
          <el-col :span="12">
            <el-form-item
              label="工作年限"
              prop="workinglife"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-input
                type="number"
                v-model="ruleForm.workinglife"
                size="small"
                style="width:400px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="户口所在地"
              prop="location"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-select
                v-model="ruleForm.location"
                size="small"
                placeholder="请选择"
                style="width:400px"
              >
                <el-option
                  key="00004"
                  label="本地"
                  value="00004"
                >
                </el-option>
                <el-option
                  key="00005"
                  label="非本地"
                  value="00005"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="家庭人数"
              prop="familysize"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-input
                onkeyup="this.value=this.value.replace(/\D|^0/g,'')"
                onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
                type="number"
                v-model="ruleForm.familysize"
                size="small"
                style="width:400px"
              ></el-input>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row>
          <el-col :span="12">
            <el-form-item
              label="手机号码"
              prop="phone"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              { min: 11, max: 11, message: '格式不正确', trigger: 'blur' }
            ]"
            >
              <Poptip
                trigger="focus"
                popper-class="popclass"
                title=""
                placement="top-start"
                :content="ruleForm.phone?ruleForm.phone.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3'): ''"
              >
                <el-input
                  size="small"
                  type="number"
                  style="width:400px"
                  oninput="if(value.length > 11)value = value.slice(0, 11)"
                  v-model="ruleForm.phone"
                ></el-input>
              </Poptip>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="国籍">
              <el-select
                v-model="ruleForm.nationality"
                size="small"
                placeholder=""
                style="width:400px"
              >
                <el-option
                  v-for="item in nationlist"
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
            <el-form-item label="备注">
              <el-input
                v-model="ruleForm.memo"
                maxlength="110"
                type="textarea"
                :rows="1"
                placeholder="请输入内容"
                style="width:400px"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col
          :span="20"
          :offset="2"
        >
          <p class="pline"></p>
        </el-col>
        <div class="formtitle">
          <span class="title">工作信息</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="单位名称"
              prop="company"
              :rules="[
                { required: true, message: '请输入', trigger: 'blur' },
                
              ]"
            >
              <el-autocomplete
                v-model="ruleForm.company"
                @select="querySelect(ruleForm.company)"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                style="width:305px;"
              ></el-autocomplete>
              <!-- <el-input size="small" v-model="ruleForm.company" style="width:88%"></el-input> -->
              <el-checkbox
                style="margin-right:0px"
                v-model="ruleForm.cheatflag"
                label="2"
              >疑似欺诈</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="单位类型"
              prop="caparty05"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-select
                filterable
                v-model="ruleForm.caparty05"
                size="small"
                placeholder=""
                style="width:400px"
              >
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
          <el-col :span="12">
            <el-form-item
              label="行业类型"
              prop="caparty01"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-select
                filterable
                v-model="ruleForm.caparty01"
                size="small"
                placeholder=""
                style="width:400px"
              >
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
          <el-col :span="12">
            <el-form-item
              label="职业类型"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-cascader
                style="width:400px"
                :options="zhiye"
                v-model="ruleForm.caparty03"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="雇员类型"
              prop="caparty02"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-select
                filterable
                v-model="ruleForm.caparty02"
                size="small"
                placeholder=""
                style="width:400px"
              >
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
          <el-col :span="12">
            <el-form-item
              label="职位"
              prop="caparty04"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-select
                filterable
                v-model="ruleForm.caparty04"
                size="small"
                placeholder=""
                style="width:400px"
              >
                <el-option
                  v-for="item in zhiwei"
                  :key="item.CODE"
                  :label="item.NAME"
                  :value="item.CODE"
                  style="width:400px"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="规模"
              prop="scale"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-input
                size="small"
                v-model="ruleForm.scale"
                style="width:400px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="本人月收入"
              prop="pincome"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-input
                size="small"
                type="number"
                v-model="ruleForm.pincome"
                style="width:400px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="家庭其他收入"
              prop="fincome"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-input
                size="small"
                type="number"
                v-model="ruleForm.fincome"
                style="width:400px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="家庭月支出"
              prop="expenditure"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-input
                size="small"
                type="number"
                v-model="ruleForm.expenditure"
                style="width:400px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="未结清贷款"
              type="number"
              prop="loan"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
              
            ]"
            >
              <el-input
                size="small"
                type="number"
                v-model="ruleForm.loan"
                style="width:400px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="每月还款额"
              type="number"
              prop="payment"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
            ]"
            >
              <el-input
                size="small"
                type="number"
                v-model="ruleForm.payment"
                style="width:400px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item
              label="公司电话"
              prop="phonec"
              :rules="[
              { required: true, message: '请输入', trigger: 'blur' },
            ]"
            >
              <el-input
                size="small"
                onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();"
                oninput="if(value.length > 25)value = value.slice(0, 25)"
                v-model="ruleForm.phonec"
                style="width:400px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="formtitle">
          <span class="title">地址信息
            <span
              style="position:absolute;right:0px;top:-10px"
              v-show="!sbdisable"
            >
              <el-button
                class="add-address"
                type="text"
                @click="newAddress"
              > 新增</el-button>
              <el-button
                class="sync-address"
                type="text"
                @click="zhujiedizhicopy"
                v-if="idtype != '1'"
              > 与主借人地址一致</el-button>
            </span>
          </span>
        </div>
        <el-row class="cardback">
          <div
            class="card-container"
            style="height:auto"
          >
            <el-col
              :span="12"
              v-for="(item,index) in ruleForm.addresses"
              class="card-box"
              :key="index"
            >
              <el-card
                class="cardnei"
                style="height:auto;margin-bottom:10px"
              >
                <div
                  slot="header"
                  v-if="item.addresstype=='00003' || item.addresstype=='00002'"
                  class=" borderbottom"
                >
                  <img
                    :src="coploc"
                    v-if="item.addresstype=='00003'"
                    alt=""
                    style="vertical-align: text-bottom;"
                  >
                  <img
                    :src="homeloc"
                    v-if="item.addresstype=='00002'"
                    alt=""
                    style="vertical-align: text-bottom;"
                  >
                  <span style="color:red">*</span>
                  <span
                    v-if="item.addresstype=='00002'"
                    style="padding-left:5px"
                  >家庭地址</span>
                  <span
                    v-if="item.addresstype=='00003'"
                    style="padding-left:5px"
                  >办公地址</span>
                  <el-button
                    class="sync-home-address"
                    type="text"
                    v-if="index==1"
                    @click="zhujiejiat"
                    v-show="!sbdisable"
                  >一键同家庭地址</el-button>
                </div>
                <div
                  slot="header"
                  v-else
                  class="clearfix borderbottom"
                >
                  <span style="padding-left:5px">联系地址</span>
                  <el-button
                    v-show="!sbdisable"
                    class="del-address"
                    type="text"
                    @click="handeldel(index,item.id)"
                  >删除</el-button>
                </div>
                <div class="text item">
                  <el-form-item
                    v-if="item.addresstype!=='00003' && item.addresstype!=='00002'"
                    label="地址类型"
                    style='margin-bottom:0px'
                    :prop="'addresses[' + index + '].addresstype'"
                    :rules="[
                  { required: true, message: '请输入', trigger: 'blur' }
                  ]"
                  >
                    <el-select
                      v-model="item.addresstype"
                      style="width:80%"
                      size="small"
                      placeholder="选择地址类型"
                    >
                      <el-option
                        v-for="item in dizhi"
                        :key="item.CODE"
                        :label="item.NAME"
                        :value="item.CODE"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="省市"
                    :prop="'addresses[' + index + '].area'"
                    :rules="[
                  { required: true, message: '请输入', trigger: 'change' }
                  ]"
                  >
                    <el-cascader
                      style="width:100%"
                      size="small"
                      :options="valuearea"
                      v-model="item.area"
                    >
                    </el-cascader>
                  </el-form-item>
                  <el-form-item
                    label="详细地址"
                    :prop="'addresses[' + index + '].address'"
                    :rules="[
                  { required: true, message: '请输入', trigger: 'blur' }
                  ]"
                  >
                    <el-autocomplete
                      v-model="item.address"
                      :fetch-suggestions="querySearchAddressAsync"
                      placeholder="请输入内容"
                      style="width:270px"
                    ></el-autocomplete>

                    <el-checkbox
                      style="margin-right:0px"
                      v-if='index<2'
                      v-model="item.isdefault"
                      true-label="1"
                      @change="selectChange(item,index)"
                      false-label="0"
                      label="1"
                    >邮寄地址</el-checkbox>
                  </el-form-item>
                  <el-row>
                    <el-col :span="11">
                      <el-form-item
                        label="邮政编码"
                        :prop="'addresses[' + index + '].postno'"
                        :rules="[
                      { required: true, message: '请输入', trigger: 'blur' }
                      ]"
                      >
                        <el-input
                          size="small"
                          v-model="item.postno"
                          placeholder="邮政编码"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="13">
                      <el-form-item
                        label="房产类型"
                        :prop="'addresses[' + index + '].propertytype'"
                        :rules="[
                      { required: true, message: '请输入', trigger: 'change' }
                      ]"
                      >
                        <el-select
                          v-model="item.propertytype"
                          size="small"
                          placeholder="房产类型"
                        >
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
                  <el-form-item
                    label="起始时间"
                    :prop="'addresses[' + index + '].cdate'"
                    :rules="[
                      { required: true, message: '请输入', trigger: 'blur' }
                      ]"
                  >
                    <el-date-picker
                      value-format="yyyy-MM-dd"
                      style="width:100%"
                      size="small"
                      v-model="item.cdate"
                      type="date"
                      placeholder="起始时间"
                    >
                    </el-date-picker>
                  </el-form-item>

                </div>
              </el-card>
            </el-col>
          </div>
          <div
            style="margin-top:10px;clear:both"
            v-if="idtype == 1"
          >
            <el-col
              :span="20"
              :offset="2"
            >
              <p class="pline"></p>
            </el-col>
          </div>
        </el-row>
        <div class="formtitle">
          <span class="title">其他信息</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="驾驶证件">
              <el-select
                filterable
                clearable
                v-model="ruleForm.driverlicense"
                size="small"
                placeholder=""
                style="width:400px"
              >
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
            <el-form-item
              label=""
              label-width="5px"
            >
              <el-input
                size="small"
                v-model="ruleForm.driverno"
                placeholder="档案编号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收入证明">
              <el-input
                size="small"
                v-model="ruleForm.operator1"
                placeholder="经办人"
                style="width:400px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label=""
              label-width="5px"
            >
              <el-input
                size="small"
                type="number"
                v-model="ruleForm.operator1phone"
                placeholder="联系电话"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="居住证明">
              <el-input
                size="small"
                v-model="ruleForm.operator2"
                placeholder="经办人"
                style="width:400px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label=""
              label-width="5px"
            >
              <el-input
                size="small"
                type="number"
                v-model="ruleForm.operator2phone"
                placeholder="联系电话"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </section>
</template>

<script>
import Cookies from "js-cookie";
import {
  orderInfo,
  deladdress,
  postUpCardOcr,
  orderimgsave
} from "@/api/credit";
import { toTree } from "@/utils";
import homeloc from "@/assets/images/icon_home_loc.png";
import coploc from "@/assets/images/icon_cop_loc.png";
import { provinceAndCityData } from "element-china-area-data";
export default {
  props: {
    idtype: Number,
    objectlist: Object
  },
  data() {
    return {
      souaddress: "",
      souwenzi: "",
      nationlist: [],
      valuearea: [],
      cdatedisable: false,
      showguanxi: false,
      namecard: false,
      dataLength: ["00002", "00003"],
      routeid: this.$route.params.id,
      selItemShow: true,
      sbdisable: false,
      aaaa: "",
      coploc,
      homeloc,
      gdtype: [],
      jiashiimg: [],
      idcardimg: [],
      contentlist: {},
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
      options: provinceAndCityData,
      ruleForm: {
        carddate: "",
        addresses: [
          {
            id: "",
            addresstype: "00002",
            area: [],
            propertytype: "",
            address: "",
            isdefault: "",
            postno: "",
            cdate: ""
          },
          {
            id: "",
            addresstype: "00003",
            area: [],
            propertytype: "",
            address: "",
            isdefault: "",
            postno: "",
            cdate: ""
          }
        ]
      },
      rules: {}
    };
  },
  methods: {
    toPinyin(name) {
      var pinyin = require("chinese-to-pinyin");
      var tpinyin = pinyin(name, { noTone: true });
      this.$set(this.ruleForm, "ename", tpinyin.toUpperCase());
    },
    querySearchAddressAsync(queryString, cb) {
      var that = this;
      var results = [];

      if (queryString) {
        //节流防止多次提交，减轻服务器压力
        clearTimeout(this.timer);

        this.timer = setTimeout(function() {
          window.jsonpCallback = function(data) {
            var reg = /[\u4e00-\u9fa5]/g;
       
            var result = data.s.map(obj => {
              return {
                ...obj,
                value: obj.split("$$")[1].split("$")[0]
              };
            });
            // 去重
            const res = new Map();
            var aaa = result.filter((a) => !res.has(a.value) && res.set(a.value, 1))
            cb(aaa);
          };

          that
            .$jsonp(
              "http://map.baidu.com/su?&wd=" +
                encodeURI(queryString.trim()) +
                "&cid=0&type=0&newmap=1&b=jsonpCallback&pc_ver=2"
            )
            .then(res => {
              if (res) {
                jsonpCallback(res);
              } else {
                console.error(err);
              }
            });
        }, 300);
      } else {
        cb(results);
        return;
      }
    },
    querySelect(item) {
      this.souwenzi = item;
    },
    querySearchAsync(queryString, cb) {
      var that = this;
      var results = [];

      if (this.souwenzi != queryString && queryString) {
        that.souwenzi = queryString;
        //节流防止多次提交，减轻服务器压力
        clearTimeout(this.timer);

        this.timer = setTimeout(function() {
          window.jsonpCallback = function(data) {
            var result = data.s.map(obj => {
              return {
                ...obj,
                value: obj
              };
            });

            cb(result);
          };

          that
            .$jsonp(
              "https://www.baidu.com/su?&wd=" +
                encodeURI(queryString.trim()) +
                "&p=3&cb=jsonpCallback"
            )
            .then(res => {
              if (err) {
                console.error(err.message);
              } else {
                jsonpCallback(res);
              }
            });
        }, 300);
      } else {
        this.souwenzi = queryString;
        cb(results);
        return;
      }
    },
    upcarddate(val) {
      this.$refs["ruleForm"].clearValidate("carddate");
      if (val) {
        this.ruleForm.carddate = "9999-01-01";
        this.cdatedisable = true;
      } else {
        this.ruleForm.carddate = "";
        this.cdatedisable = false;
      }
    },
    ToCarddis() {
      var UUserCard = this.ruleForm.card;
      if (UUserCard && UUserCard.length > 16) {
        var birthday =
          UUserCard.substring(6, 10) +
          "-" +
          UUserCard.substring(10, 12) +
          "-" +
          UUserCard.substring(12, 14);
        var sex = "3";
        if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
          sex = "M";
        } else {
          sex = "F";
        }
        if (this.ruleForm.cardtype == "00001") {
          this.$set(this.ruleForm, "birthday", birthday);
          this.$set(this.ruleForm, "sex", sex);
        }
      }

      // this.ruleForm.sex = sex
    },
    toDoWebsock() {
      var that = this;
      var moment = require("moment");
      if (typeof this.websocketmessage === "string") {
        var objdata = JSON.parse(this.websocketmessage);
        if (objdata.name) {
          var daoqidate = objdata.date.split("-");
          if (objdata.type === "010101") {
            this.ruleForm.name = objdata.name;
            this.ruleForm.card = objdata.idnum;
            this.ruleForm.carddate = moment(daoqidate[1]).format("YYYY-MM-DD");
            this.ruleForm.birthday = moment(objdata.birth).format("YYYY-MM-DD");
            if (objdata.sex === "男") {
              this.ruleForm.sex = "M";
            } else if (objdata.sex === "女") {
              this.ruleForm.sex = "F";
            } else {
              this.ruleForm.sex = "3";
            }
            let para = {};
            para = {
              CaCategory: "Camain",
              CamainId: localStorage.getItem("orderId" + that.routeid),
              ArtyType: "1"
            };
            postUpCardOcr(para).then(res => {});
          }
          if (objdata.type === "010102") {
            this.ruleForm.name = objdata.name;
            this.ruleForm.card = objdata.idnum;
            this.ruleForm.carddate = moment(daoqidate[1]).format("YYYY-MM-DD");
            this.ruleForm.birthday = moment(objdata.birth).format("YYYY-MM-DD");
            if (objdata.sex === "男") {
              this.ruleForm.sex = "M";
            } else if (objdata.sex === "女") {
              this.ruleForm.sex = "F";
            } else {
              this.ruleForm.sex = "3";
            }
            let para = {};
            para = {
              CaCategory: "Camain",
              CamainId: localStorage.getItem("orderId" + that.routeid),
              ArtyType: "2"
            };
            postUpCardOcr(para).then(res => {});
          }
          if (objdata.type === "010103") {
            this.ruleForm.name = objdata.name;
            this.ruleForm.card = objdata.idnum;
            this.ruleForm.carddate = moment(daoqidate[1]).format("YYYY-MM-DD");
            this.ruleForm.birthday = moment(objdata.birth).format("YYYY-MM-DD");
            if (objdata.sex === "男") {
              this.ruleForm.sex = "M";
            } else if (objdata.sex === "女") {
              this.ruleForm.sex = "F";
            } else {
              this.ruleForm.sex = "3";
            }
            let para = {};
            para = {
              CaCategory: "Camain",
              CamainId: localStorage.getItem("orderId" + that.routeid),
              ArtyType: "3"
            };
            postUpCardOcr(para).then(res => {});
          }
        }
        if (
          objdata.ImgType === "01010101" ||
          objdata.ImgType === "01010102" ||
          objdata.ImgType === "01010201" ||
          objdata.ImgType === "01010202" ||
          objdata.ImgType === "01010301" ||
          objdata.ImgType === "01010302"
        ) {
          if (objdata.MD5) {
            that.idcardimg.push({
              imgtype: objdata.ImgType,
              md5: objdata.MD5,
              guid: objdata.GUID
            });
            let para = {};
            para = {
              RandomStr: objdata.GUID,
              ImCategoryCode: objdata.ImgType,
              CamainId: localStorage.getItem("orderId" + that.routeid),
              Scene: "1",
              UploadFrom: "0",
              MidId: Cookies.get("MIDID")
            };
            orderimgsave(para).then(res => {});
            localStorage.setItem(
              "MD5Data_shenfen" + that.routeid,
              JSON.stringify(that.idcardimg)
            );
          }
        }
      }
    },
    currentSel(selval) {
      if (selval === "00001") {
        this.selItemShow = true;
      } else {
        this.selItemShow = false;
      }
    },
    ocrrenzheng() {
      var that = this;
      var s = {};
      var data;
      var typelei;
      if (that.idtype === 1) {
        if (!this.ruleForm.cardtype) {
          this.$message({
            message: "请先选择证件类型！！！",
            type: "warning"
          });
          return false;
        }
        typelei = "010101";
      } else if (that.idtype === 2) {
        if (!this.ruleForm.cardtype) {
          this.$message({
            message: "请先选择证件类型！！！",
            type: "warning"
          });
          return false;
        }
        typelei = "010102";
      } else if (that.idtype === 3) {
        if (!this.ruleForm.cardtype) {
          this.$message({
            message: "请先选择证件类型！！！",
            type: "warning"
          });
          return false;
        }
        typelei = "010103";
      }
      s.CID = localStorage.getItem("orderId" + that.routeid);
      s.RATIO = "100";
      s.TYPE = typelei;
      s.VERSION = 1;
      s.TOKEN = Cookies.get("Admin-Token");
      s.APPID = Cookies.get("APPID");
      data = "PCOCR " + JSON.stringify(s);
      this.$store.dispatch("SocketConnect");
      this.$store.dispatch("SocketSenddata", data);
    },
    selectChange(item, index) {
      if (index === 1) {
        this.ruleForm.addresses[0].isdefault = 0;
      } else {
        this.ruleForm.addresses[1].isdefault = 0;
      }
    },
    zhujiedizhicopy() {
      this.$emit("asyncdata");
      // return;
      var borrowersstr = JSON.stringify(
        this.objectlist.borrowers.filter(item => item.type == 1)[0]
      );
      var borrowersone = JSON.parse(borrowersstr);
      if (borrowersone) {
        if (borrowersone && borrowersone.addresses.length > 0) {
          borrowersone.addresses.forEach(function(item, index, array) {
            if (borrowersone.addresses[index].id) {
              borrowersone.addresses[index].id = "";
            }

            borrowersone.addresses[index].capartyid = "";
            if (item.area) {
              borrowersone.addresses[index].area = [
                item.area.substring(0, 2),
                item.area
              ];
            }
          });
        }
        this.ruleForm.addresses.forEach(function(item, index, array) {
          let para = {};
          para = {
            id: item.id
          };
         
            deladdress(para).then(res => {});
         
         
        });
        this.$set(this.ruleForm, "addresses", borrowersone.addresses);
      }
    },
    zhujiejiat() {
      this.$set(
        this.ruleForm.addresses[1],
        "area",
        this.ruleForm.addresses[0].area
      );
      this.$set(
        this.ruleForm.addresses[1],
        "address",
        this.ruleForm.addresses[0].address
      );
      this.$set(
        this.ruleForm.addresses[1],
        "propertytype",
        this.ruleForm.addresses[0].propertytype
      );
      this.$set(
        this.ruleForm.addresses[1],
        "postno",
        this.ruleForm.addresses[0].postno
      );
      this.$set(
        this.ruleForm.addresses[1],
        "cdate",
        this.ruleForm.addresses[0].cdate
      );
    },
    handeldel(index, id) {
      var that = this;
      if (!id) {
        this.ruleForm.addresses.splice(index, 1);
        return false;
      }
      if (id) {
        let para = {};
        para = {
          id: id
        };
        deladdress(para).then(res => {
          if (res.data.success) {
            this.ruleForm.addresses.splice(index, 1);
            orderInfo(that.routeid).then(res => {
              if (res.data) {
                localStorage.setItem(
                  "contentlist" + that.routeid,
                  JSON.stringify(res.data.data)
                );
                this.initfunction();
              }
            });
          } else {
            this.$message({
              type: "warning",
              message: "删除失败，请联系管理员！"
            });
          }
        });
      } else {
        this.ruleForm.addresses.splice(index, 1);
      }
    },
    newAddress() {
      this.ruleForm.addresses.push({
        id: "",
        area: [],
        addresstype: "",
        propertytype: "",
        address: "",
        isdefault: "",
        postno: "",
        cdate: ""
      });
    },
    initfunction() {
      /* eslint-disable */
      var that = this;
      let key = "";
      this.contentlist = JSON.parse(
        localStorage.getItem("contentlist" + that.routeid)
      );
      if (this.contentlist.basicInfo.readonly) {
        that.sbdisable = true;
      } else {
        if (
          this.objectlist.basicInfo.status == 4 ||
          (this.objectlist.basicInfo.status <= 1 &&
            this.objectlist.basicInfo.signstate == 0)
        ) {
          that.sbdisable = false;
        } else {
          that.sbdisable = true;
        }
      }
      if (this.objectlist.basicInfo.status == 4) {
        if (that.idtype == 1) {
          this.namecard = true;
        }
      }
      this.$set(this.ruleForm, "nationality", "00001");

      if (this.contentlist.borrowers) {
        var contentlist = this.contentlist.borrowers.filter(
          item => item.type == that.idtype
        )[0];

        if (contentlist) {
          this.ruleForm = contentlist;

          if (this.ruleForm) {
            if (!this.ruleForm.nationality) {
              this.$set(this.ruleForm, "nationality", "00001");
            }
            if (this.ruleForm.longe == "true") {
              this.cdatedisable = true;
            }
            if (this.ruleForm && this.ruleForm.caparty03) {
              this.ruleForm.caparty03 = [
                that.ruleForm.caparty03.substring(0, 5),
                that.ruleForm.caparty03
              ];
            } else {
              this.ruleForm.caparty03 = [];
            }
            if (this.ruleForm && this.ruleForm.addresses.length > 0) {
              this.ruleForm.addresses.forEach(function(item, index, array) {
                if (item.area) {
                  that.ruleForm.addresses[index].area = [
                    item.area.substring(0, 2),
                    item.area
                  ];
                } else {
                  that.ruleForm.addresses[index].area = [];
                }
              });
            } else {
              this.ruleForm.addresses.push(
                {
                  id: "",
                  addresstype: "00002",
                  area: [],
                  propertytype: "",
                  address: "",
                  isdefault: "",
                  postno: "",
                  cdate: ""
                },
                {
                  id: "",
                  addresstype: "00003",
                  area: [],
                  propertytype: "",
                  address: "",
                  isdefault: "",
                  postno: "",
                  cdate: ""
                }
              );
            }
            // 排序设置家庭地址和办公地址靠前
            var tmpAdd = this.ruleForm.addresses.slice(0);
            var tmpAddresses = [];
            var homeAddress = tmpAdd.filter(item => {
              return item.addresstype == "00002";
            });
            if (homeAddress && homeAddress.length) {
              tmpAddresses.push(homeAddress[0]);
            }
            var workAddress = tmpAdd.filter(item => {
              return item.addresstype == "00003";
            });
            if (workAddress && workAddress.length) {
              tmpAddresses.push(workAddress[0]);
            }
            var restAddress = tmpAdd.filter(item => {
              return !["00002", "00003"].includes(item.addresstype);
            });
            tmpAddresses = tmpAddresses.concat(restAddress);
            this.$set(this.ruleForm, "addresses", tmpAddresses);
          }
        }
      }
      this.idcardlist = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001H8RUUJY00000C0C"
      ];
      this.xueli = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001H8RUUJY00000C0B"
      ];
      this.hunyin = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001H8RUUJY00000C05"
      ];
      this.hangye = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001H8RUUJY70000C0U"
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
      var code = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001I19D00IV0000A1E"
      ];
      if (code) {
        code.map(e => {
          e.label = e.NAME;
          e.value = e.CODE;
        });

        this.zhiye = toTree(code);
      }

      this.guyuan = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001H8RUUJY70000C0W"
      ];
      this.zhiwei = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001HFWVAV5W0000A21"
      ];
      this.jiashizhengjian = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001HBHRFTIM0000A5U"
      ];

      if (this.contentlist.basicInfo.category == "4") {
        this.jiashizhengjian = this.jiashizhengjian.filter(
          item => item.name == "驾驶证"
        );
      }
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

      this.nationlist = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001H8RUUJY00000C0Q"
      ];

      this.fangchantype = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001H8RUUJY00000C0K"
      ];
      //移除家庭地址和办公地址
      this.dizhi = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001H8RUUJY00000C0J"
      ].filter(item => {
        return !["00002", "00003"].includes(item.code);
      });
      this.guanxi = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001H8RUUJY00000C06"
      ];
      this.gdtype = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001JQJWM06B0000AY2"
      ];
    }
  },
  mounted() {
    var s = {};
    s.USERID = Cookies.get("userId");
    s.TOKEN = Cookies.get("Admin-Token");
    var data = "PCCONN " + JSON.stringify(s);
    this.$store.dispatch("SocketConnect");
    this.$store.dispatch("SocketSenddata", data);
    this.initfunction();
  },
  created() {},
  computed: {
    isShowDel: function() {
      return [2, 3].includes(this.idtype) && !this.sbdisable;
    },
    delStyle: function() {
      if (this.isShowDel) {
        return {
          marginTop: "12px"
        };
      }
    }
  },
  watch: {
    objectlist: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.initfunction();
        }
      }
    },
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
.marginleft0 {
  margin-left: 0px;
}
.ocrclass {
  display: none;
}
.del-button {
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #cbac69;
  border-radius: 4px;
  border: 1px dashed #dcdfe6;
  margin-top: 12px;
  cursor: pointer;
}
.formtitle {
  clear: both;
  margin-left: 10px;
  margin: 16px 0 8px;
  font-size: 12px;
  color: #333333;
  font-weight: bold;
}
.formtitle > span.title {
  display: block;
  border-left: 2px solid #cca25d;
  padding-left: 4px;
  line-height: 12px;
  font-weight: bold;
  position: relative;
}
.card-container .card-box:nth-of-type(odd) .cardnei {
  margin-right: 5px;
}
.card-container .card-box:nth-of-type(even) .cardnei {
  margin-left: 5px;
}
.zhujieren-container /deep/ .el-input--medium .el-input__inner {
  height: 32px;
  line-height: 32px;
}
.zhujieren-container /deep/ input[type="number"]::-webkit-inner-spin-button,
.zhujieren-container /deep/ input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.zhujieren-container /deep/ .el-card__header {
  padding: 7px 16px !important;
  background: #f5f7fa;
  font-size: 14px;
  color: #333333;
}
.add-address {
  float: right;
  padding: 0;
  color: #1890ff;
  font-size: 12px;
  padding: 5px 8px;
}
.add-address:hover {
  background: #e3e3e3;
}
.sync-address {
  float: right;
  padding: 0;
  color: #1890ff;
  margin-right: 10px;
  font-size: 12px;
  padding: 5px 8px;
}
.sync-address:hover {
  background: #e3e3e3;
  border-radius: 2px;
}
.del-address {
  float: right;
  padding: 3px 0;
}
.del-address:hover {
  color: #ff3b30;
  text-decoration: underline;
}
.sync-home-address {
  float: right;
  padding: 3px 0;
  color: #1890ff;
  font-size: 12px;
}
.sync-home-address:hover {
  text-decoration: underline;
}
</style>;