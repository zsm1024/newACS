<template>
  <section style="padding:0 76px">
    <el-form
      size="medium"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      :disabled="sbdisable"
      label-position='right'
      label-width="120px"
    >

      <el-row>
        <el-col :span="24">
          <el-button
            class="add-jinji"
            type="text"
            @click="addjinji"
            v-if="!sbdisable"
          > 新增</el-button>
          <el-button
            class="add-jinji"
            style="padding:4px 8px;height:12px;"
            type="text"
            v-else
          ></el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="12"
          class="cardback"
          v-for="(item,index) in ruleForm.urgentPartys"
          :key="index"
        >
          <el-card
            class="cardnei"
            style="height:auto;margin-bottom:10px"
          >
            <div
              slot="header"
              class="clearfix borderbottom"
            >
              <span class="numjin">紧急联系人{{index+1}}</span>
              <el-button
                v-if="index>1"
                style="float: right; padding: 3px 0;"
                type="text"
                @click="handeldel(index,item.id)"
              >移除</el-button>
            </div>
            <div class="text item">
              <el-row>
                <el-col>
                  <el-form-item
                    label="关系"
                    label-width='80px'
                    :prop="'urgentPartys[' + index + '].relationship'"
                    :rules="[
                    { required: true, message: '请输入', trigger: 'change' },
                    
                  ]"
                  >
                    <el-select
                      v-model="item.relationship"
                      size="small"
                      placeholder="与申请人关系"
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
              </el-row>

              <el-row>
                <el-col :span="11">
                  <el-form-item
                    label="姓名"
                    label-width='80px'
                    :prop="'urgentPartys[' + index + '].name'"
                    :rules="[
                        { required: true, message: '请输入', trigger: 'blur' },
                        
                      ]"
                  >
                    <el-input
                      size="small"
                      v-model="item.name"
                      placeholder="姓名"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-form-item
                    label="手机号"
                    label-width='75px'
                    :prop="'urgentPartys[' + index + '].phone'"
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
                    :content="item.phone?item.phone.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3'): ''"
                  >
                    <el-input
                      size="small"
                      oninput="if(value.length > 11)value = value.slice(0, 11)"
                      type="number"
                      v-model="item.phone"
                      placeholder="手机号码"
                    ></el-input>
                  </Poptip>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item
                    label="公司名称"
                    label-width='80px'
                  >
                    <el-input
                      size="small"
                      v-model="item.company"
                      placeholder="公司名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-form-item
                    label="公司电话"
                    label-width='75px'
                  >
                  <Poptip
                    trigger="focus"
                    popper-class="popclass"
                    title=""
                    placement="top-start"
                    :content="item.companyphone?item.companyphone.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3'): ''"
                  >
                    <el-input
                      size="small"
                      onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" 
                      onblur="this.v();"
                      oninput="if(value.length > 25)value = value.slice(0, 25)"
                      v-model="item.companyphone"
                      placeholder="公司电话"
                    ></el-input>
                  </Poptip>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <span
                    v-if="item.relationship == '00006'"
                    style="position:absolute;color:#f56c6c;margin-top:7px;margin-left:11px;"
                  >*</span>
                  <el-form-item
                    label="证件类型"
                    label-width='80px'
                  >

                    <el-select
                      v-model="item.cardtype"
                      size="small"
                      placeholder="证件类型"
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
                <el-col :span="13">
                  <span
                    v-if="item.relationship == '00006'"
                    style="position:absolute;color:#f56c6c;margin-top:7px;margin-left:6px;"
                  >*</span>
                  <el-form-item
                    label="证件号码"
                    label-width='75px'
                  >
                    <el-input
                      size="small"
                      style="width:170px"
                      v-model="item.card"
                      placeholder="证件号码"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <span
                    v-if="item.relationship == '00006'"
                    style="position:absolute;color:#f56c6c;margin-top:7px;margin-left:24px;"
                  >*</span>
                  <el-form-item
                    label="月收入"
                    label-width='80px'
                  >
                    <el-input
                      size="small"
                      v-model="item.income"
                      placeholder="月收入"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-form-item
                    label="现居住地"
                    label-width='75px'
                  >
                    <el-input
                      v-model="item.homeaddress"
                      size="small"
                      placeholder="现居住地"
                    ></el-input>

                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>

<script>
import { delurpart, orderInfo } from "@/api/credit";
export default {
  props: {
    objectlist: Object,
    changema: String
  },
  data() {
    return {
      fuqiindex: [],
      routeid: this.$route.params.id,
      sbdisable: false,
      guanxi: [],
      contentlist: {},
      ruleForm: {
        urgentPartys: [
          {
            id: "",
            relationship: "",
            name: "",
            phone: "",
            company: "",
            companyphone: "",
            cardtype: "",
            card: "",
            income: 0,
            homeaddress: ""
          },
          {
            id: "",
            relationship: "",
            name: "",
            phone: "",
            company: "",
            companyphone: "",
            cardtype: "",
            card: "",
            income: 0,
            homeaddress: ""
          }
        ]
      },
      rules: {},
      idcardlist: []
    };
  },
  methods: {
    handeldel(index, id) {
      var that = this;
      if (!id) {
        this.ruleForm.urgentPartys.splice(index, 1);
        return false;
      }
      if (id) {
        let para = {};
        para = {
          id: id
        };
        delurpart(para).then(res => {
          if (res.data.success) {
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
        this.ruleForm.urgentPartys.splice(index, 1);
      }
    },
    addjinji() {
      this.ruleForm.urgentPartys.push({
        id: "",
        relationship: "",
        name: "",
        phone: "",
        company: "",
        companyphone: "",
        cardtype: "",
        card: "",
        income: 0,
        homeaddress: ""
      });
    },
    initfunction() {
      /* eslint-disable */
      var that = this;
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
      if (
        this.contentlist.urgentPartys &&
        this.contentlist.urgentPartys.length > 0
      ) {
        this.ruleForm.urgentPartys = this.contentlist.urgentPartys;
      }
      this.guanxi = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001H8RUUJY00000C06"
      ];
      this.idcardlist = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001H8RUUJY00000C0C"
      ];
    }
  },
  mounted() {
    this.initfunction();
  },
  created() {},
  watch: {
    changema:{
      handler(newValue, oldValue) {
        if (newValue) {
          if(newValue=='00001'){
            this.ruleForm.urgentPartys[0].relationship ='00006'
     
          }else{
            this.ruleForm.urgentPartys[0].relationship =''
          }
          
          
        }
      }
    },
    objectlist: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.initfunction();
        }
      }
    }
  }
};
</script>

<style scoped>
.numjin {
  color: #333333;
  font-size: 14px;
  border-radius: 2px;
  display: inline-block;
  height: 18px;
  text-align: center;
  line-height: 19px;
}
.cardback:nth-of-type(odd) .cardnei {
  margin-right: 5px;
}
.cardback:nth-of-type(even) .cardnei {
  margin-left: 5px;
}
.add-jinji {
  float: right;
  padding: 9px 8px;
  color: #1890ff;
  font-size: 12px;
  margin: 2px 0;
  height: 32px;
}
.add-jinji:hover {
  background: #e3e3e3;
  border-radius: 2px;
}
.cardback /deep/ .el-card__header {
  padding: 7px 16px !important;
  background: #f5f7fa;
}
</style>