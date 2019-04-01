<template>
<section class="marketInfo app-container" style="margin-top:5px;position:relative;">
<el-row>
        <el-col :span='18'>           
            <el-breadcrumb separator='/' class='app-breadcrumb breads'>
                <el-breadcrumb-item class='firstbread'>协同办公</el-breadcrumb-item>
                <el-breadcrumb-item >市场信息</el-breadcrumb-item>              
            </el-breadcrumb>          
        </el-col>
    </el-row>
    <el-tabs type='border-card' >
        <el-tab-pane label='市场信息反馈' class="marketsInfo" >
            <!--  -->
            <!-- <div  ref="scrollTobar" v-bar style="height:550px">
              <div> -->
            <section  >
                     <h3>竞争数据</h3>
                     <el-card>
                    <el-form ref='form'  class="flexform" inline label-width='120px'  :model='Form' size='mini'>
                            <el-form-item label='机构名称'>
                                <el-input size='mini' v-model="Form.COMPANY" style='width:170px' value=''></el-input>
                            </el-form-item>
                            <el-form-item label='上月贷款合同量' >
                                <el-input size='mini' v-model="Form.CONTRACTNUM" style='width:170px' value=''></el-input>
                            </el-form-item>
                            <el-form-item label='本月贷款合同量' >
                                <el-input size='mini' v-model="Form.CONTRACTNOW" style='width:170px' value=''></el-input>
                            </el-form-item>
                            <el-form-item label='审批时效' >
                                <el-input size='mini' style='width:170px' v-model="Form.APPROVAL" value=''>
                                    <template slot='append'>小时/单</template>
                                </el-input>                              
                            </el-form-item>
                            <el-form-item label='放款时效' >
                                <el-input size='mini' v-model="Form.LOANAGING" style='width:170px' value=''>
                                    <template slot='append'>小时/单</template>
                                </el-input> 
                            </el-form-item>
                            <el-form-item label='自动化程度'>
                                <el-input size='mini' style='width:170px' v-model="Form.AUTO"  value=''></el-input>
                            </el-form-item>
                            <el-form-item label='服务感知' >
                                <el-select  v-model='Form.SERVICE' placeholder='感知等级' style='width:170px'>
                                    <el-option label='1级' value='1级'></el-option>
                                    <el-option label='2级' value='2级'></el-option>
                                    <el-option label='3级' value='3级'></el-option>
                                    <el-option label='4级' value='4级'></el-option>
							    </el-select>
                            </el-form-item>
                             <el-form-item label='风险感知' >
                                <el-select placeholder='感知等级' size='mini' style='width:170px' v-model='Form.RISK'> 
                                    <el-option label='1级' value='1级'></el-option>
                                    <el-option label='2级' value='2级'></el-option>
                                    <el-option label='3级' value='3级'></el-option>
                                    <el-option label='4级' value='4级'></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label='提示' >
                                <span style='color:#333'>等级越高服务和风险控制越好</span>
                            </el-form-item>
                    </el-form>
                    <el-form ref='form' :model='Form' label-width='130px'  size='mini'>
                        <el-form-item label='业务模式' size='mini' >
                             <el-input type='textarea' v-model='Form.MODE' value='' size='mini'  ></el-input>
                        </el-form-item>
                        <el-form-item label='覆盖范围' size='mini' >
                             <el-input type='textarea' value='' v-model='Form.RANGE' size='mini'  ></el-input>
                        </el-form-item>
                        <el-form-item label='竞争优势' size='mini' >
                             <el-input type='textarea' value='' v-model='Form.DESCRIPTION' size='mini'  ></el-input>
                        </el-form-item>
                        <el-form-item label='建议' size='mini' >
                             <el-input type='textarea' value='' v-model='Form.SUGGEST' size='mini'  ></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>  
                <h3 >产品信息</h3>                  
                <el-card style="position:relative">
                     <el-button type='primary' size='mini' style='top:10px;position:absolute'  @click="Info"  > 新增</el-button> 
               <div style="margin-top:35px">
                      <el-form  ref="form2" inline label-width='120px' class="flexform" v-for="domain in Forms.f1" :key="domain.key" :model="Forms"  size='mini' style='margin-top:10px'>
                        <el-form-item label="金融产品名称">
                            <el-input size='mini' style='width:170px' v-model="domain.PRODUCTNAME" value=''></el-input>
                        </el-form-item>
                        <el-form-item label='产品有效期'>
                            <el-col :span='11'>
                                <el-date-picker type='date' class="rangetime" v-model="domain.STARTTIME" style='width:170px' placeholder='开始日期'></el-date-picker>
                            </el-col>                           
                        </el-form-item>
                        <el-form-item label='产品有效期'>
                            <el-col :span='11'>
                                <el-date-picker type='date' class="rangetime" v-model="domain.ENDTIME"  style='width:170px' placeholder='结束日期'></el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label='首付比例' >
                            <el-input size='mini' v-model="domain.PROPORTION"  style='width:170px' value=''>
                               <template slot='append'>%</template>
                            </el-input>
                        </el-form-item>   
                        <el-form-item label='贷款金额'>
                            <el-input size='mini' v-model="domain.LOANMONEY"  style='width:170px' value=''>
                              <template slot='append'>元</template>
                            </el-input>
                        </el-form-item> 
                        <el-form-item label='期数'>
                            <el-input size='mini' v-model="domain.PERIOD"  style='width:170px' value=''>
                               <template slot='append'>期</template>
                            </el-input>
                        </el-form-item> 
                        <el-form-item label='利率'>
                            <el-input size='mini' v-model="domain.RATE"  style='width:170px' value=''>
                               <template slot='append'>%</template>
                            </el-input>
                        </el-form-item> 
                        <el-form-item label='尾款比例'>
                            <el-input size='mini' v-model="domain.TAIL"  style='width:170px' value=''>
                               <template slot='append'>%</template>
                            </el-input>
                        </el-form-item> 
                        <el-form-item label='GPS费用'>
                            <el-input size='mini' v-model="domain.GPS"  style='width:170px' value=''>
                               <template slot='append'>元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label='其他费用'>
                            <el-input size='mini' v-model="domain.OTHER"  style='width:170px' value=''>
                               <template slot='append'>元</template>
                            </el-input>
                        </el-form-item>  
                        <div style="width:100%">
                            <el-form-item label='准入资料' class="widthall" size='mini'  >
                             <el-input type='textarea' v-model="domain.ADMISSION"  value='' size='mini'  ></el-input>
                            </el-form-item>
                            <el-form-item label='产品描述' class="widthall" size='mini' >
                                <el-input type='textarea' v-model="domain.ADVANTAGE"  value='' size='mini'  ></el-input>
                            </el-form-item>
                            <el-form-item label='建议'  class="widthall" size='mini' >
                                <el-input type='textarea' v-model="domain.SUGGEST"  value='' size='mini'  ></el-input>
                            </el-form-item>
                            <el-button type='primary' size='mini'  @click.prevent='handeldel(domain)'>删除此条</el-button> 
                        </div>                                                                              
                    </el-form>                    
                        <!-- <el-button type='primary' size='mini' style="margin-top:20px" @click="add(Forms.f1)" >提 交</el-button> -->
                    </div>
                </el-card>
                <h3>商务政策</h3>
                <el-card>
                    <el-form   label-width='130px' :model='Form' size='mini' style='margin-top:10px'>
                            <el-form-item label='基础返利'>
                                <el-input size='mini' v-model='Form.REBATE' value=''></el-input>
                            </el-form-item>
                            <el-form-item label='其他返利' >
                                <el-input size='mini' type='textarea' v-model='Form.OTHERREBATE' value='' placeholder='返利额度、返利描述'></el-input>
                            </el-form-item>
                            <el-form-item label='商务政策' >
                                <el-input size='mini' type='textarea' v-model='Form.POLICYDESCRIPTION' value=''></el-input>
                            </el-form-item>
                            <el-form-item label='优势描述' >
                                <el-input size='mini'  value='' v-model='Form.ADVANTAGEDESCRIPTION' type='textarea'> </el-input>                              
                            </el-form-item>
                            <el-form-item label='建议' >
                                <el-input size='mini'  value='' type='textarea'></el-input> 
                            </el-form-item>                                                 
                    </el-form>
                </el-card>
                    <h3>其它信息</h3>
                    <el-card>
                    <el-form ref='form4'  label-width='130px' :model='Form' size='mini' style='margin-top:10px'>
                        <el-form-item label='信息描述' >
                            <el-input size='mini'  value='' type='textarea'></el-input> 
                        </el-form-item>
                    </el-form>
                </el-card>
                <h3>附件信息</h3>
                <el-card v-loading="listloading" element-loading-text="上传中..." >                   
            <div>
                 <h4 style='padding:10px 5px;margin-top:10px'>附件上传</h4>  
                 <p style="color:red"><i>*</i>请将需要上传的文件放在一个压缩包内上传</p>     
                <el-upload
				class='ensure ensureButt'
				ref="uploadfile"
               :action="importFileUrl"
               :headers="Uploadheader" 
               :file-list='filelist'	
               :show-file-list='true'  
               :auto-upload="false" 
               :on-success="uploadSuccess"            
				style="display:inline-block"			
>
            <el-button slot="trigger" size="small" type="primary"  style="padding:7px 9px">选取上传文件</el-button>
			<el-button style="margin-left: 10px; padding:7px 9px" size="small" type="success" @click="submitUpload">点击上传</el-button>	
		</el-upload>		
                    </div>                 
            </el-card>
            <div  style='text-align:center;margin:15px 0'>
                <el-button type='primary' size='mini'>取 消</el-button>
                <el-button type='primary' size='mini' @click="submitMarkInfo" >提 交</el-button>
			</div>
        </section>
        <!-- </div>
        </div> -->
        </el-tab-pane>
        <el-tab-pane label='店端活动反馈' >
             <ShopInfo></ShopInfo>
        </el-tab-pane>
        
    </el-tabs> 
</section>
</template>
<script>
import { Market } from "@/api/together";
import ShopInfo from "../together/shopInfo";
import { getToken } from "@/utils/auth";
export default {
  components: {
    ShopInfo
  },
  data() {
    return {
    listloading:false,
      importFileUrl: window.g.FileUpload + 'S120017/upload?Md5=&sceneid=1100310001&randomstr=',
      Uploadheader:{'authorization': 'Bearer '+getToken()},
      filelist:[],
      Form: {
        COMPANY: '',
        CONTRACTNUM: '',
        CONTRACTNOW: '',
        APPROVAL: '',
        LOANAGING: '',
        AUTO: '',
        SERVICE: '',
        RISK: '',
        MODE: '',
        RANGE: '',
        DESCRIPTION: '',
        SUGGEST: '',
        REBATE: '',
        OTHERREBATE: '',
        REBATEDESCRIPTION: '',
        POLICYDESCRIPTION: '',
        ADVANTAGEDESCRIPTION: ''
      },
      Forms: {
        f1: [
          {
            PRODUCTNAME: '',
            PROPORTION: '',
            STARTTIME: '',
            ENDTIME: '',
            LOANMONEY: '',
            PERIOD: '',
            RATE: '',
            TAIL: '',
            GPS: '',
            OTHER: '',
            ADMISSION: '',
            ADVANTAGE: '',
            SUGGEST: ''
          }
        ]
      },
      Forms1: {
        f1: ''
      },
    
      value1: '0',
      radio: '',
      checkeds: '',
      addcard: [],
      datas: [],
      checkList: [],
      card: 0,
      cardnum: 0,
      dataLength: 10,
      a: 0,
      as: '',
      MD5:"",
      Market: [],
      fileListStatue:true,
      Product: [],
      cols: [
        { title: '附件类型', field: 'fileType' },
        { title: '附件大小', field: 'createUser' },
        { title: '上传时间', field: 'createTime' },
        { title: '附件名称', field: 'name' }
      ]
    };
  },
  methods: {
    submitUpload() {
     this.$refs.uploadfile.submit();
      this.listloading = true;
    },
    uploadSuccess(response, file, fileList) {
      if (response.success==1) {
          this.MD5=response.data.md5
        this.listloading=false;
        this.$message({
          type: 'success',
          message: response.data.message,
          
        });
      this.fileListStatue = false;
       this.$refs.uploadfile.clearFiles();
      } else {
        this.$message.error({
          message: response.data.message,
        });
        }
    },
    Info() {
      this.a = this.a + 1;
      this.Forms.f1.push({
        PRODUCTNAME: '',
        PROPORTION: '',
        STARTTIME: '',
        ENDTIME: '',
        LOANMONEY: '',
        PERIOD: '',
        RATE: '',
        TAIL: '',
        GPS: '',
        OTHER: '',
        ADMISSION: '',
        ADVANTAGE: '',
        SUGGEST: ''
        // rangetime:[]
      });
    },
    handelAdd() {
      this.cardnum = this.cardnum + 1;
      if (this.addcard.indexOf('s') >= 0) {
        this.addcard.splice(
          this.addcard.indexOf('s'),
          1,
          this.addcard.indexOf('s') + 1
        );
        return;
      }
      if (this.card >= 10) {
        return;
      }
      this.card = this.card + 1;
      this.addcard.push(this.card);
    },
    handeldel(sval) {
      if (this.Forms.f1.length > 1) {
        var index = this.Forms.f1.indexOf(sval);
        if (index != -1) {
          this.Forms.f1.splice(index, 1);
        }
      }
    },
    submitMarkInfo() {
      this.Market = [];
      this.Market.push({
        COMPANY: this.Form.COMPANY,
        CONTRACTNUM: this.Form.CONTRACTNUM,
        CONTRACTNOW: this.Form.CONTRACTNOW,
        APPROVAL: this.Form.APPROVAL,
        LOANAGING: this.Form.LOANAGING,
        AUTO: this.Form.AUTO,
        SERVICE: this.Form.SERVICE,
        RISK: this.Form.RISK,
        MODE: this.Form.MODE,
        RANGE: this.Form.RANGE,
        DESCRIPTION: this.Form.DESCRIPTION,
        SUGGEST: this.Form.SUGGEST,
        REBATE: this.Form.REBATE,
        OTHERREBATE: this.Form.OTHERREBATE,
        REBATEDESCRIPTION: this.Form.REBATEDESCRIPTION,
        POLICYDESCRIPTION: this.Form.POLICYDESCRIPTION,
        ADVANTAGEDESCRIPTION: this.Form.ADVANTAGEDESCRIPTION,
        FILEMD5:this.MD5
      });
      // this.Product.push()
      let para = {
        Market: this.Market[0],
        Product: this.Forms.f1
      };
      Market(para).then(res => {
        let data =res.data
      if (data.success==1) {
        this.$message({
          message:'提交成功',
          type: 'success',
        });
        // this.fileListStatue = false;
        this.$refs.form.clearFiles();
        this.$refs.form1.clearFiles();
        this.$refs.form2.clearFiles();
        this.$refs.form3.clearFiles();
        this.$refs.form4.clearFiles();
      } else {
        this.$message.error({
          message: res.data.message,
        });
        }
      });
    }
  },
  mounted() {
    const h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 260;
    // this.$refs.tabPane1.style.height = h + 'px';
  }
};
</script>
<style>
.marketsInfo h3 {
  padding: 12px 0;
}
.widthall {
  display: flex !important;
}
.widthall .el-form-item__content {
  width: 100% !important;
}
.flexform{ margin-top:10px;display:flex;flex-wrap: wrap}
.marketInfo .el-textarea__inner {line-height: 0.9!important}
.marketInfo  label{font-weight: 0}
.app-breadcrumb.el-breadcrumb{
    line-height: 52px !important;
    height: 37px !important;
    margin-top:0 !important;
    padding-bottom:8px 
}
.topbtnbasic {
  text-align: right;
  line-height: 32px;
  height: 32px;
}
/* .rangetime.el-date-editor.el-input{width:104px!important} */
/* .rangetime  .el-input--prefix .el-input__inner{padding-left:25px!important} */
</style>



