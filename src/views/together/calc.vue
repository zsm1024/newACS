<template>
  <section>
    <el-row>
      <el-col :span='18'>
        <el-breadcrumb separator='/' class='app-breadcrumb'>
          <el-breadcrumb-item class='firstbread'>协同办公</el-breadcrumb-item>
          <el-breadcrumb-item>算车贷</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="midcontent is-always-shadow" type="flex" justify="center" v-loading='listLoading'>
      <el-col :span="11">
        <el-row>
          <el-col :span="21">
            <div class="formtitle">
              <span>经销商：保定东风路分店</span>
            </div>
          </el-col>
        </el-row>
        <el-form size="medium" :model="ruleForm" ref="ruleForm" label-position='top' label-width="50px">
          <el-row class="card_top">
            <el-col :span="21">
              <span class="card_title">
                <i class="card_number">1</i>输入数据</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="card_group">
              <el-row>
                <el-col>
                  <label for="">品牌</label>
                </el-col>
                <el-col>
                  <el-form-item prop="makerid">
                    <el-select @change="loadModel" size="small" filterable v-model="ruleForm.makerid" placeholder="请选择">
                      <el-option v-for="m in maker" :key="m.code" :label="m.name" :value="m.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12" class="card_group">
              <el-row>
                <el-col>
                  <label for="">车型</label>
                </el-col>
                <el-col>
                  <el-form-item prop="modelid">
                    <el-select @change="loadStyle" size="small" filterable v-model="ruleForm.modelid" placeholder="请选择">
                      <el-option v-for="m in model" :key="m.code" :label="m.brand" :value="m.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="card_group">
              <el-row>
                <el-col>
                  <label for="">款式</label>
                </el-col>
                <el-col>
                  <el-form-item prop="styleid">
                    <el-select @change="loadFinancial" size="small" filterable v-model="ruleForm.styleid" placeholder="请选择">
                      <el-option v-for="m in style" :key="m.id" :label="m.name" :value="m.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="card_group">
              <el-row>
                <el-col>
                  <label for="">车辆价格(元)</label>
                </el-col>
                <el-col>
                  <el-form-item prop="money">
                    <el-input ref="money" size="small" v-model="ruleForm.money"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12" class="card_group">
              <el-row>
                <el-col>
                  <label for="">金融产品</label>
                </el-col>
                <el-col>
                  <el-form-item prop="financialid">
                    <el-select size="small" filterable v-model="ruleForm.financialid" placeholder="请选择">
                      <el-option v-for="m in financial" :key="m.id" :label="m.name" :value="m.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="card_group">
              <el-row>
                <el-col>
                  <label for="">首付比例(%)</label>
                </el-col>
                <el-col>
                  <el-form-item prop="firstper">
                    <el-input size="small" maxlength="2" v-model="ruleForm.firstper" @keyup.native="formatFirstInt"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12" class="card_group">
              <el-row>
                <el-col>
                  <label for="">首付金额(元)</label>
                </el-col>
                <el-col>
                  <el-form-item prop="firstpay">
                    <el-input size="small" v-model="ruleForm.firstpay"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="card_group">
              <el-row>
                <el-col>
                  <label for="">尾款比例(%)</label>
                </el-col>
                <el-col>
                  <el-form-item prop="endper">
                    <el-input size="small" maxlength="2" v-model="ruleForm.endper" @keyup.native="formatEndInt"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12" class="card_group">
              <el-row>
                <el-col>
                  <label for="">尾款金额(元)</label>
                </el-col>
                <el-col>
                  <el-form-item prop="endpay">
                    <el-input size="small" v-model="ruleForm.endpay"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="card_group">
              <el-row>
                <el-col>
                  <label for="">贷款期限(期)</label>
                </el-col>
                <el-col>
                  <el-form-item prop="period">
                    <el-select size="small" filterable v-model="ruleForm.period" placeholder="请选择">
                      <el-option v-for="m in time" :key="m.code" :label="m.name" :value="m.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12" class="card_group">
              <el-row>
                <el-col>
                  <label for="">厂家贴息(元)</label>
                </el-col>
                <el-col>
                  <el-form-item prop="companysubsidy">
                    <el-input size="small" v-model="ruleForm.companysubsidy"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div style='margin:0 0 14px;'>
                <el-button type='primary' @click="submitCalc" size='mini'>开始计算</el-button>
                <div class="reset_container" @click="resetCalc">
                  <span class="reset">
                    重新填写
                  </span>
                </div>

              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="6" style="margin-left:20px">
        <el-row>
          <el-col :span="21">
            <div class="formtitle">
              <span>&nbsp;</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="card_top" style="padding-left:7px">
          <el-col :span="21">
            <span class="card_title">
              <i class="card_number">2</i>计算结果</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="width:300px;">
            <el-row class="result_head">
              <el-col :span="12" class="result_head_left">
                <span>类型</span>
              </el-col>
              <el-col :span="12" class="result_head_right">
                <span>结果</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col style="width:300px;">
            <el-row>
              <el-col class="result_group">
                <el-row class="result_item">
                  <el-col :span="12" class="result_title">
                    <span>贷款金额</span>
                  </el-col>
                  <el-col :span="12" class="result_content">
                    <span>{{calres.loanmoney}}元</span>
                  </el-col>
                </el-row>
                <el-row class="result_item">
                  <el-col :span="12" class="result_title">
                    <span>客户月供</span>
                  </el-col>
                  <el-col :span="12" class="result_content">
                    <span>{{calres.monthpay}}元</span>
                  </el-col>
                </el-row>
                <el-row class="result_item">
                  <el-col :span="12" class="result_title">
                    <span>客户总利息</span>
                  </el-col>
                  <el-col :span="12" class="result_content">
                    <span>{{calres.customerallinterest}}元</span>
                  </el-col>
                </el-row>
                <el-row class="result_item">
                  <el-col :span="12" class="result_title">
                    <span>客户利率</span>
                  </el-col>
                  <el-col :span="12" class="result_content">
                    <span>{{calres.customerrate}}</span>
                  </el-col>
                </el-row>
                <el-row class="result_item">
                  <el-col :span="12" class="result_title">
                    <span>客户总费率</span>
                  </el-col>
                  <el-col :span="12" class="result_content">
                    <span>{{calres.customerallrate}}</span>
                  </el-col>
                </el-row>
                <el-row class="result_item result_hr">

                </el-row>
                <el-row class="result_item">
                  <el-col :span="12" class="result_title">
                    <span>贴息总额</span>
                  </el-col>
                  <el-col :span="12" class="result_content">
                    <span>{{calres.subsidymoney}}元</span>
                  </el-col>
                </el-row>
                <el-row class="result_item">
                  <el-col :span="12" class="result_title">
                    <span>贴息比率</span>
                  </el-col>
                  <el-col :span="12" class="result_content">
                    <span>{{calres.subsidyrate}}</span>
                  </el-col>
                </el-row>
                <el-row class="result_item">
                  <el-col :span="12" class="result_title">
                    <span>金融返利</span>
                  </el-col>
                  <el-col :span="12" class="result_content">
                    <span>{{calres.financialrebate}}</span>
                  </el-col>
                </el-row>
                <el-row class="result_item">
                  <el-col :span="12" class="result_title">
                    <span>客户利息万元系数</span>
                  </el-col>
                  <el-col :span="12" class="result_content">
                    <span>{{calres.interestwan}}</span>
                  </el-col>
                </el-row>
                <el-row class="result_item">
                  <el-col :span="12" class="result_title">
                    <span>客户月供万元系数</span>
                  </el-col>
                  <el-col :span="12" class="result_content">
                    <span>{{calres.monthpaywan}}</span>
                  </el-col>
                </el-row>
                <el-row class="result_item">
                  <el-col :span="12" class="result_title">
                    <span>总补贴万元系数</span>
                  </el-col>
                  <el-col :span="12" class="result_content">
                    <span>{{calres.subsidywan}}</span>
                  </el-col>
                </el-row>
                <el-row class="result_item">
                  <el-col :span="12" class="result_title">
                    <span>经销商贴息金额</span>
                  </el-col>
                  <el-col :span="12" class="result_content">
                    <span>{{calres.dealersubsidy}}</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div>
                  <span class="result_desc">*计算结果仅供参考</span>
                </div>
              </el-col>
            </el-row>
          </el-col>

        </el-row>

      </el-col>
    </el-row>
  </section>
</template>
<script>
import Moment from "moment/moment";
import { commonDeal } from "@/api/card";
import {
  getMaker,
  getModel,
  getStyle,
  getPrice,
  getFinancialInfo,
  create
} from "@/api/together";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      maker: [], //品牌
      model: [], //车型
      style: [], //车款
      financial: [], //金融产品
      time: [
        {
          name: "请选择",
          code: ""
        },
        {
          name: "12",
          code: 12
        },
        {
          name: "18",
          code: 18
        },
        {
          name: "24",
          code: 24
        },
        {
          name: "36",
          code: 36
        }
      ],
      ruleForm: {
        makerid: "", //品牌
        modelid: "", //车型ID
        styleid: "", //车款id
        money: "", //车辆价格
        financialid: "", //金融产品id
        firstper: "", //首付比例
        firstpay: "", //首付金额
        endper: "", //尾款比例
        endpay: "", //尾款金额
        period: "", //贷款期数
        companysubsidy: 0 //金融公司贴息金额
      },
      calres: {
        actualrate: "", //折让后利率
        companysubsidy: "", //厂家贴息
        customerallinterest: "", //客户总利息
        customerallrate: "", //客户总费率
        customerrate: "", //客户利率
        dealersubsidy: "", //经销商贴息
        finalpay: "", //尾款金额
        finalpayrate: "", //尾款比例
        financialrebate: "", //金融返利
        firstpay: "", //首付
        interestwan: "", //客户利息万元系数
        loanmoney: "", //贷款额
        monthpay: "", //月供
        monthpaywan: "", //客户月供万元系数
        period: "", //期数
        subsidymoney: "", //贴息总额
        subsidywan: "", //总补贴万元系数
        subsidyrate: "" //贴息比率
      },
      listLoading: false
    };
  },
  methods: {
    //检测只能输入数字
    formatFirstInt(rr) {
      let value = rr.target.value;
      this.$set(
        this.ruleForm,
        "firstper",
        value.replace(/[^\.\d]/g, "").replace(".", "")
      );
      //计算首付金额
      this.$set(
        this.ruleForm,
        "firstpay",
        (this.ruleForm.money * this.ruleForm.firstper / 100).toFixed(2)
      );
    },
    formatEndInt(rr) {
      let value = rr.target.value;
      this.$set(
        this.ruleForm,
        "endper",
        value.replace(/[^\.\d]/g, "").replace(".", "")
      );
      //计算尾款金额
      this.$set(
        this.ruleForm,
        "endpay",
        (this.ruleForm.money * this.ruleForm.endper / 100).toFixed(2)
      );
    },
    //制造商
    loadMaker() {
      for (const key in this.ruleForm) {
        if (key == "companysubsidy") {
          this.$set(this.ruleForm, key, 0);
        } else {
          this.$set(this.ruleForm, key, "");
        }
      }
      for (const key in this.calres) {
        this.$set(this.calres, key, "");
      }
      this.maker = [];
      this.model = [];
      this.style = [];
      this.financial = [];
      getMaker().then(res => {
        commonDeal.call(this, res, () => {
          let maker = res.data.data;
          this.maker = maker;
        });
      });
    },
    //车型
    loadModel() {
      this.$set(this.ruleForm, "modelid", "");
      this.$set(this.ruleForm, "styleid", "");
      this.$set(this.ruleForm, "money", "");
      this.$set(this.ruleForm, "financialid", "");
      getModel(this.ruleForm.makerid).then(res => {
        commonDeal.call(this, res, () => {
          let model = res.data.data;
          this.model = model;
        });
      });
    },
    //车款
    loadStyle() {
      this.$set(this.ruleForm, "styleid", "");
      this.$set(this.ruleForm, "money", "");
      this.$set(this.ruleForm, "financialid", "");
      getStyle(this.ruleForm.modelid).then(res => {
        commonDeal.call(this, res, () => {
          let style = res.data.data;
          this.style = style;
        });
      });
    },
    //金融产品和价格
    loadFinancial() {
      this.$set(this.ruleForm, "money", "");
      this.$set(this.ruleForm, "financialid", "");
      let styleid = this.ruleForm.styleid;
      getPrice(styleid).then(res => {
        commonDeal.call(this, res, () => {
          let money = res.data.data[0].guideprice;
          this.ruleForm.money = money;
        });
      });
      getFinancialInfo(styleid).then(res => {
        commonDeal.call(this, res, () => {
          let financial = res.data.data;
          this.financial = financial;
        });
      });
    },
    errorDialog(message = "") {
      this.$message({
        type: "error",
        message: message
      });
    },
    checkFrom() {
      if (this.ruleForm.styleid == "") {
        this.errorDialog("请选择车款");
        return;
      }
      if (this.ruleForm.financialid == "") {
        this.errorDialog("请选择金融产品");
        return;
      }
      if (this.ruleForm.firstper == "") {
        this.errorDialog("请输入首付比例");
        return;
      }
      if (this.ruleForm.period == "") {
        this.errorDialog("请选择贷款期限");
        return;
      }
      if (this.ruleForm.companysubsidy === "") {
        this.errorDialog("请输入厂家贴息金额");
        return;
      }
      return true;
    },
    //计算
    submitCalc() {
      if (this.checkFrom()) {
        let para = {
          style: this.ruleForm.styleid,
          fnproduct: this.ruleForm.financialid,
          firstpay: this.ruleForm.firstpay,
          finalpay: this.ruleForm.endpay,
          money: this.ruleForm.money,
          period: this.ruleForm.period,
          companysubsidy: this.ruleForm.companysubsidy
        };
        console.log(para);
        this.listLoading = true;
        create(para).then(res => {
          commonDeal.call(this, res, () => {
            console.log(res);
            this.calres = res.data.data;
          });
        });
        this.listLoading = false;
      }
    },
    //清空内容
    resetCalc: function() {
      this.loadMaker();
    }
  },
  mounted() {
    this.loadMaker();
  }
};
</script>

<style scoped lang="scss" scoped>
.midcontent {
  margin-top: 20px;
  background-color: #ffffff;
  margin-bottom: 20px;
  padding-bottom: 80px;
}
.btncolor {
  background-color: #64ecdf;
  border: 1px solid #64ecdf;
}
.formtitle {
  clear: both;
  font-size: 16px;
  padding-top: 10px;
  color: #333333;
  padding-bottom: 15px;
  padding-left: 5px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
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
.card_group {
  background: RGBA(247, 247, 247, 1);
  //background: #ccc;
  padding: 0 5px;
  border-radius: 5px;
  margin-bottom: 14px;
}
.card_title {
  padding: 0 5px;
}
.card_number {
  width: 16px;
  height: 16px;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  background: linear-gradient(
    45deg,
    rgba(80, 122, 205, 1) 0%,
    rgba(67, 94, 170, 1) 100%
  );
  display: inline-block;
  text-align: center;
  line-height: 16px;
  font-family: Arial;
  margin-right: 10px;
}
.result_group {
  box-sizing: border-box;
  border: 2px solid RGBA(232, 232, 232, 1);
  border-top: none;
  padding: 2px 0;
}
.result_hr {
  height: 1px;
  border-top: 1px solid RGBA(232, 232, 232, 1);
  margin: 0 10px !important;
}
.result_head {
  background: RGBA(88, 129, 216, 1);
  color: #fff;
  height: 40px;
  line-height: 40px;
  border-radius: 4px 4px 0px 0px;
}
.result_head_left {
  text-align: left;
  padding-left: 12px;
}
.result_head_right {
  text-align: right;
  padding-right: 12px;
}
.result_item {
  margin: 15px 0;
}
.result_title {
  text-align: left;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  line-height: 15px;
  font-weight: normal;
  padding-left: 10px;
}
.result_content {
  font-size: 14px;
  line-height: 15px;
  font-weight: normal;
  font-family: MicrosoftYaHei;
  text-align: right;
  color: RGBA(255, 128, 70, 1);
  padding-right: 10px;
}
.card_top {
  margin: 10px 0 20px;
}
.result_desc {
  font-family: MicrosoftYaHei;
  color: rgba(153, 153, 153, 1);
  line-height: 19px;
  float: right;
  margin: 5px 0;
}
.reset_container {
  position: relative;
  display: inline-block;
  margin-left: 35px;
}
.reset {
  cursor: pointer;
}
.reset:before {
  content: "";
  background: url("/src/assets/images/shuaxin@3x.png") no-repeat bottom right /
    16px 16px;
  position: absolute;
  left: -20px;
  z-index: 2;
  width: 18px;
  height: 18px;
  border: 1px dashed #666;
}
/* .numinput{
    width: 110px;
  } */
</style>
