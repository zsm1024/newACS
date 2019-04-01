<template>
  <section>
    <el-col :span="24" style="margin-top:5px">
      <p class="pline"></p>
    </el-col>
    <el-form size="medium" :model="ruleForm" :rules="rules" ref="ruleForm" :disabled="sbdisable" label-position='right' label-width="120px">
      <div class="formtitle">
        <span>基本信息</span>
      </div>
      <div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="证件类型" prop="cardtype" :rules="[
                { required: true, message: '请输入证件类型', trigger: 'change' },
                
              ]">
              <el-select v-model="ruleForm.cardtype" size="mini" style="width:85%" placeholder="">
                <el-option v-for="item in idcardlist" :key="item.CODE" :label="item.NAME" :value="item.CODE">
                </el-option>
              </el-select>
              <el-button size="mini" class="ocrclass">OCR识别</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名" prop="name" :rules="[
            { required: true, message: '请输入姓名', trigger: 'blur' },
            ]">
              <el-input v-model="ruleForm.name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码" prop="card" :rules="[
            { required: true, message: '请输入证件号码', trigger: 'blur' },
            ]">
              <el-input v-model="ruleForm.card" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到期日" prop="carddata" :rules="[
            { required: true, message: '请输入到期日', trigger: 'blur' },
            ]">
              <el-date-picker type="date" v-model="ruleForm.carddata" placeholder="选择日期" size="small" style="width: 70%;"></el-date-picker>
              <el-checkbox v-model="ruleForm.longe" :label="1">长期</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="出生年月" prop="birthday" :rules="[
                { required: true, message: '请输入出生年月', trigger: 'blur' },
                
              ]">
              <el-date-picker type="date" v-model="ruleForm.birthday" style="width: 100%;" placeholder="选择日期" size="small"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" label-width="120px" prop="sex" :rules="[
                { required: true, message: '请输入性别', trigger: 'blur' },
                
              ]">
              <el-radio class="marginleft0" v-model="ruleForm.sex" size="mini" label="M">男</el-radio>
              <el-radio class="marginleft0" v-model="ruleForm.sex" size="mini" label="F">女</el-radio>
              <el-radio class="marginleft0" v-model="ruleForm.sex" size="mini" label="3">未知</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="英文姓名/拼音" prop="ename" :rules="[
                { required: true, message: '请输入英文姓名/拼音', trigger: 'blur' },
                
              ]">
              <el-input v-model="ruleForm.ename" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="备注">
              <el-input v-model="ruleForm.memo" type="textarea" :rows="1" placeholder="请输入内容">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学历" prop="education" :rules="[
                { required: true, message: '请输入学历', trigger: 'change' },
                
              ]">
              <el-select v-model="ruleForm.education" size="small" placeholder="">
                <el-option v-for="item in xueli" :key="item.CODE" :label="item.NAME" :value="item.CODE">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作年限" prop="workinglife" :rules="[
                { required: true, message: '请输入工作年限', trigger: 'blur' },
                
              ]">
              <el-input v-model="ruleForm.workinglife" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="婚姻状态" prop="marriagestatus" :rules="[
                { required: true, message: '请输入婚姻状态', trigger: 'change' },
                
              ]">
              <el-select v-model="ruleForm.marriagestatus" size="small" placeholder="">
                <el-option v-for="item in hunyin" :key="item.CODE" :label="item.NAME" :value="item.CODE">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="户口本所在地" prop="location" :rules="[
                { required: true, message: '请输入户口本所在地', trigger: 'blur' },
                
              ]">
              <el-radio v-model="ruleForm.location" label="00004">本地</el-radio>
              <el-radio v-model="ruleForm.location" label="00005">非本地</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="家庭人数" prop="familysize" :rules="[
                { required: true, message: '请输入家庭人数', trigger: 'blur' },
                
              ]">
              <el-input v-model="ruleForm.familysize" size="small"></el-input>
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
            <el-form-item label="单位名称" prop="company" :rules="[
                  { required: true, message: '请输入单位名称', trigger: 'blur' },
                  
                ]">
              <el-input size="small" v-model="ruleForm.company" style="width:88%"></el-input>
              <el-checkbox v-model="ruleForm.cheatflag" label="2">疑似欺诈</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="工作单位类型" prop="caparty05" :rules="[
                { required: true, message: '请输入工作单位类型', trigger: 'blur' },
                
              ]">
              <el-select filterable v-model="ruleForm.caparty05" size="small" placeholder="">
                <el-option v-for="item in gdtype" :key="item.CODE" :label="item.NAME" :value="item.CODE">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="行业类型" prop="caparty01" :rules="[
                { required: true, message: '请输入行业类型', trigger: 'blur' },
                
              ]">
              <el-select filterable v-model="ruleForm.caparty01" size="small" placeholder="">
                <el-option v-for="item in hangye" :key="item.CODE" :label="item.NAME" :value="item.CODE">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="职业类型" :rules="[
                { required: true, message: '请输入职业类型', trigger: 'blur' },
                
              ]">
              <el-cascader style="width:100%" :options="zhiye" v-model="ruleForm.caparty03">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="雇员类型" prop="caparty02" :rules="[
                { required: true, message: '请输入雇员类型', trigger: 'blur' },
                
              ]">
              <el-select filterable v-model="ruleForm.caparty02" size="small" placeholder="">
                <el-option v-for="item in guyuan" :key="item.CODE" :label="item.NAME" :value="item.CODE">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职位" prop="caparty04" :rules="[
                { required: true, message: '请输入职位', trigger: 'blur' },
                
              ]">
              <el-select filterable v-model="ruleForm.caparty04" size="small" placeholder="">
                <el-option v-for="item in zhiwei" :key="item.CODE" :label="item.NAME" :value="item.CODE">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规模" prop="scale" :rules="[
                { required: true, message: '请输入规模', trigger: 'blur' },
                
              ]">
              <el-input size="small" v-model="ruleForm.scale"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="本人月收入" prop="pincome" :rules="[
                { required: true, message: '请输入本人月收入', trigger: 'blur' },
                
              ]">
              <el-input size="small" v-model="ruleForm.pincome"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="家庭其他收入" prop="fincome" :rules="[
                { required: true, message: '请输入家庭其他收入', trigger: 'blur' },
                
              ]">
              <el-input size="small" v-model="ruleForm.fincome"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="家庭月支出" prop="expenditure" :rules="[
                { required: true, message: '请输入家庭月支出', trigger: 'blur' },
                
              ]">
              <el-input size="small" v-model="ruleForm.expenditure"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="未结清贷款" prop="loan" :rules="[
                { required: true, message: '请输入未结清贷款', trigger: 'blur' },
                
              ]">
              <el-input size="small" type="number" v-model="ruleForm.loan"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="每月还款额" prop="payment" :rules="[
                { required: true, message: '请输入每月还款额', trigger: 'blur' },
              ]">
              <el-input size="small" type="number" v-model="ruleForm.payment"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="电话" prop="phone" :rules="[
                { required: true, message: '请输入电话', trigger: 'blur' },
                
              ]">
              <el-input size="small" v-model="ruleForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司电话">
              <el-input size="small" v-model="ruleForm.phonec"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
          </el-col>
        </el-row>
        <div class="formtitle">
          <span>地址信息</span>
          <span><el-button style="float: right; padding: 3px 0; color: #64ecdf;" type="text" @click="newAddress" > 新增</el-button></span>
        </div>
        <el-row class="cardback">
          <div style="height:auto">
            <el-col :span="12" v-for="(item,index) in ruleForm.addresses" :key="index">
              <el-card class="cardnei" style="height:270px;margin-left:10px;margin-bottom:10px">
                <div slot="header" v-if='index<2' class=" borderbottom">
                  <img :src="coploc" v-if="index==1" alt="" style="vertical-align: text-bottom;">
                  <img :src="homeloc" v-if="index==0" alt="" style="vertical-align: text-bottom;">
                  <span style="color:red">*</span>
                  <span v-if="index==0" style="padding-left:5px">家庭地址</span>
                  <span v-if="index==1" style="padding-left:5px">办公地址</span>
                  <el-button style="float: right; padding: 3px 0" type="text" v-if="index==1" @click="zhujiejiat">与家庭地址一样</el-button>
                </div>
                <div slot="header" v-if='index>1' class="clearfix borderbottom">
                  <el-form-item label="地址类型" label-width='80px' style='margin-bottom:0px' :prop="'addresses[' + index + '].addresstype'" :rules="[
                    { required: true, message: '请输入地址类型', trigger: 'change' }
                    ]">
                    <el-select v-model="item.addresstype" style="width:80%" size="small" placeholder="选择地址类型">
                      <el-option v-for="item in dizhi" :key="item.CODE" :label="item.NAME" :value="item.CODE">
                      </el-option>
                    </el-select>
                    <el-button style="float: right; padding: 3px 0;" type="text" @click="handeldel(index,item.id)">移除</el-button>
                  </el-form-item>
                </div>
                <div class="text item">
                  <el-form-item label="地址" label-width='80px' :prop="'addresses[' + index + '].area'" :rules="[
                    { required: true, message: '请输入地址', trigger: 'change' }
                    ]">
                    <el-cascader style="width:100%" size="small" :options="options" v-model="item.area">
                    </el-cascader>
                  </el-form-item>
                  <el-form-item label="详细地址" label-width='80px' :prop="'addresses[' + index + '].address'" :rules="[
                    { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ]">
                    <el-input size="small" style="width:75%" v-model="item.address" placeholder="详细地址"></el-input>
                    <el-checkbox v-if='index<2' v-model="item.isdefault" true-label="1" false-label="0" label="1">邮寄地址</el-checkbox>
                  </el-form-item>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="邮政编码" label-width='80px' :prop="'addresses[' + index + '].postno'" :rules="[
                        { required: true, message: '请输入邮政编码', trigger: 'blur' }
                        ]">
                        <el-input size="small" v-model="item.postno" placeholder="邮政编码"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="房产类型" label-width='80px' :prop="'addresses[' + index + '].propertytype'" :rules="[
                        { required: true, message: '请输入房产类型', trigger: 'change' }
                        ]">
                        <el-select v-model="item.propertytype" size="small" placeholder="房产类型">
                          <el-option v-for="item in fangchantype" :key="item.CODE" :label="item.NAME" :value="item.CODE">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="起始时间" label-width='80px' :prop="'addresses[' + index + '].cdate'" :rules="[
                        { required: true, message: '请输入起始时间', trigger: 'blur' }
                        ]">
                    <el-date-picker style="width:100%" size="small" v-model="item.cdate" type="date" placeholder="起始时间">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-card>
            </el-col>
          </div>
          <div style="margin-top:10px;clear:both" v-if="idtype == 1">
            <el-col :span="20" :offset="2">
              <p class="pline"></p>
            </el-col>
            <div class="formtitle">
              <span>其他信息</span>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="驾驶证件">
                  <el-select filterable v-model="ruleForm.driverlicense" size="small" placeholder="">
                    <el-option v-for="item in jiashizhengjian" :key="item.CODE" :label="item.NAME" :value="item.CODE">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="">
                  <el-input size="small" v-model="ruleForm.driverno" placeholder="档案编号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="收入证明">
                  <el-input size="small" v-model="ruleForm.operator1" placeholder="经办人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="">
                  <el-input size="small" v-model="ruleForm.operator1phone" placeholder="联系电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="居住证明">
                  <el-input size="small" v-model="ruleForm.operator2" placeholder="经办人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="">
                  <el-input size="small" v-model="ruleForm.operator2phone" placeholder="联系电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </div>
    </el-form>
  </section>
</template>

<script>
  import {
    deladdress
  } from '@/api/credit'
  import {
    toTree
  } from '@/utils'
  import homeloc from '@/assets/images/icon_home_loc.png'
  import coploc from '@/assets/images/icon_cop_loc.png'
  import {
    provinceAndCityData
  } from 'element-china-area-data'
  export default {
    props: {
      idtype: Number
    },
    data() {
      return {
        dataLength: ['00001', '00002'],
        routeid: this.$route.params.id,
        sbdisable: false,
        aaaa: '',
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
          addresses: [
            {
              id: '',
              addresstype: '00001',
              area: [],
              propertytype: '',
              address: '',
              isdefault: '',
              postno: '',
              cdate: ''
            },
            {
              id: '',
              addresstype: '00002',
              area: [],
              propertytype: '',
              address: '',
              isdefault: '',
              postno: '',
              cdate: ''
            }
          ]
        },
        rules: {}
      }
    },
    methods: {
      zhujiejiat() {
        this.$set(this.ruleForm.addresses[1], 'area', this.ruleForm.addresses[0].area)
        this.$set(this.ruleForm.addresses[1], 'address', this.ruleForm.addresses[0].address)
        this.$set(this.ruleForm.addresses[1], 'propertytype', this.ruleForm.addresses[0].propertytype)
        this.$set(this.ruleForm.addresses[1], 'postno', this.ruleForm.addresses[0].postno)
        this.$set(this.ruleForm.addresses[1], 'cdate', this.ruleForm.addresses[0].cdate)
      },
      handeldel(index, id) {
        if (!id) {
          this.ruleForm.addresses.splice(index, 1)
          return false
        }
        if (id) {
          let para = {}
          para = {
            id: id
          }
          deladdress(para).then(res => {
            if (res.data.success) {
              this.ruleForm.addresses.splice(index, 1)
            } else {
              this.$message({
                type: 'warning',
                message: '删除失败，请联系管理员！'
              })
            }
          })
        } else {
          this.ruleForm.addresses.splice(index, 1)
        }
      },
      newAddress() {
        this.ruleForm.addresses.push({
          id: '',
          area: [],
          addresstype: '',
          propertytype: '',
          address: '',
          isdefault: '',
          postno: '',
          cdate: ''
        })
      },
      initfunction() {
        /* eslint-disable */
        var that = this
        let key = ''
        // this.contentlist = JSON.parse(localStorage.getItem('contentlist' + that.routeid))
        // if (this.contentlist.basicInfo.readonly) {
        //   that.sbdisable = true
        // } else {
        //   that.sbdisable = false
        // }
        // if (this.contentlist.borrowers) {
        //   this.ruleForm = this.contentlist.borrowers.filter(item => item.type == that.idtype)[0]
        // console.log(that.idtype)
        //  console.log( this.ruleForm )
        //   if (this.ruleForm) {
        //     console.log(123)
        //     if(this.ruleForm && this.ruleForm.caparty03){    
        //       this.ruleForm.caparty03 = [that.ruleForm.caparty03.substring(0,5),that.ruleForm.caparty03]
        //     }
        //     if(this.ruleForm && this.ruleForm.addresses.length>0){
        //       this.ruleForm.addresses.forEach(function(item,index,array){
        //         that.ruleForm.addresses[index].area = [item.area.substring(0,2)+'0000', item.area ]
        //       })
        //     } 
        //   }
        // }
        this.idcardlist = JSON.parse(localStorage.getItem('CodeSource'))['00001H8RUUJY00000C0C']
        this.xueli = JSON.parse(localStorage.getItem('CodeSource'))['00001H8RUUJY00000C0B']
        this.hunyin = JSON.parse(localStorage.getItem('CodeSource'))['00001H8RUUJY00000C05']
        this.hangye = JSON.parse(localStorage.getItem('CodeSource'))['00001H8RUUJY70000C0U']
        var code = JSON.parse(localStorage.getItem('CodeSource'))['00001I19D00IV0000A1E']
        code.map(e => {
          e.label = e.NAME
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
      }
    },
    mounted() {
      this.initfunction()
    },
    created() {}
  }
</script>

<style scoped>
  .marginleft0 {
    margin-left: 0px;
  }
</style>