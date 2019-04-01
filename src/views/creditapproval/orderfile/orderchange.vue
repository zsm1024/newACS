<template>
  <section style="margin-top:5px;position:relative;margin-top:5px;position:relative;">
    <div ref="topAffix">
      <el-row>
        <el-col :span="17">
          <el-breadcrumb separator="/" class="app-breadcrumb">
            <el-breadcrumb-item class="firstbread">信贷审批</el-breadcrumb-item>
            <!-- <el-breadcrumb-item class="firstbread">
              <router-link style="color:inherit!important" :to="{path:'/dealer/creditapproval/orderlist'}">订单管理</router-link>
            </el-breadcrumb-item> -->
            <el-breadcrumb-item>资产变更</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

        <el-col :span="7" v-if="!sbdisable" class="topbtnbasic" style="margin:3px 0 8px 0;padding-right:3px">
          <el-button type="success" size="small" style="width:60px" class="btnnextcolor" :disabled="changeSave" @click="zhansave">暂存</el-button>
          <el-button type="success" size="small" style="width:60px" class="btncolor" :disabled="changeSave" @click="doSaveInfo">提交</el-button>
        </el-col>
      </el-row>
      
    </div>
    <el-row class="midcontent">
      <el-col :span="24" style="padding-right:24px">
        <div
          v-show="liuyancount>0"
          class="siderbarhref"
          ref="slide"
        >
          <ul>
            <el-badge
              :value="liuyancount"
              class="item"
            >
              <li
                class="liliu"
                style="height:50px"
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
        <el-form size="medium" :model="ruleForm" :rules="rules" ref="ruleForm" label-position='right' :disabled="sbdisable" label-width="120px">
   
         
 
          <el-row>
            <el-row>
              <el-col :span="20" :offset="1">
                <div class="formtitle">
                  
                  <span class="borderright">资产信息
                      <span
                        v-if="ruleForm.basic.category == '4'"
                        style="font-size:12px;padding-left:87px;color:red"
                      >全品牌乘用车“7座（不含）以上、新能源”限制上报 ; 全品牌LCV车型“车长6米（含）以上、载重4.5吨（含）以上、新能源”限制上报</span>
                  </span>
                  <!-- <p v-if="statusname" style="margin-left:70px"><el-tag size="small">{{statusname}}</el-tag></p> -->
                </div>
              </el-col>
              <!-- <el-col :span="24" v-if="ruleForm.basic.category == '4'">
               <el-col :span="21">
                <el-form-item label="车辆类别" style="text-align:left" prop="basic.type" :rules="[
                        { required: true, message: '请输入', trigger: 'change' },
                        
                      ]">
                  <el-select :class="{qxiaozi:qxiaozi}" v-model="ruleForm.basic.type" @change="catetypechange" size="small" placeholder=""  :loading="loading">
                    <el-option v-for="item in brandtype" :key="item.code" :label="item.name" :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-popover
                    placement="right"
                    width="300"
                    trigger="click">
                    <el-input @keyup.enter.native="searchname" size="small" v-model="brandname" placeholder="请输入车型"></el-input>
                   <el-table :data="disabledbrandlist">
                <el-table-column property="name" label="车型" width="260"></el-table-column>
                                           
                  
               
                   </el-table>
                   
                  <Page style="margin-top:5px;text-align:right" :current="filters.pageindex" :page-size="filters.pagesize" :total="filters.total" @on-change="handleCurrentChange" @on-page-size-change="handleSizeChange" simple></Page>
                <el-button slot="reference" @click="disabledcar" type="warning" size="small" style="margin-left:10px;margin-top:1px">禁止车型</el-button>
                </el-popover>
                </el-col>
              </el-col> -->
              <el-col :span="12" v-if="ruleForm.basic.category == '4'">
                <el-form-item label="品牌" prop="basic.MAKER" :rules="[
                        { required: true, message: '请输入', trigger: 'change' },
                        
                      ]">
                  <el-select :class="{qxiaozi:qxiaozi}" clearable v-model="ruleForm.basic.MAKER" @focus="makerspsearch" @change="makerspchange" size="small" placeholder="" :loading="loading" filterable :remote-method="remoteMethod" remote>
                    <el-option v-for="item in makerlistsp" :key="item.code" :label="item.name" :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-else>
                <el-form-item label="品牌" prop="basic.MAKER" :rules="[
                        { required: true, message: '请输入', trigger: 'change' },
                        
                      ]">
                  <el-select :class="{qxiaozi:qxiaozi}" v-model="ruleForm.basic.MAKER" @focus="makersearch" @change="makerchange" size="small" placeholder="" :loading="loading">
                    <el-option v-for="item in makerlist" :key="item.code" :label="item.name" :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="车型" style="text-align:left" prop="basic.BRAND" :rules="[
                        { required: true, message: '请输入', trigger: 'change' },
                        
                      ]">
                  <el-select :class="{qxiaozi:qxiaozi}" v-model="ruleForm.basic.BRAND" size="small" placeholder="" @change="brandchange" @focus="chexingsearch" :loading="loading">
                    <el-option v-for="item in chexinglist" :key="item.code" :label="item.name" :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="款式" prop="basic.STYLE" :rules="[
                        { required: true, message: '请输入', trigger: 'change' },
                        
                      ]">
                  <el-select @change="upproduct" :class="{kuanshizi:qxiaozi}" v-model="ruleForm.basic.STYLE" size="small" placeholder="" @focus="stylesearch" :loading="loading">
                    <el-option v-for="item in kuanshilist" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="指导价" prop="basic.GUIDEPRICE" :rules="[
                        { required: true, message: '请输入', trigger: 'blur' },
                        
                      ]">
                  <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.GUIDEPRICE" :disabled="true">
                    <i slot="suffix">元</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="车辆价格" prop="basic.INVOICEPRICE" :rules="[
                        { required: true, message: '请输入', trigger: 'blur' },
                        { validator: isvalidateMoney,  trigger: 'blur' },
                      ]">
                  <el-input :class="{qxiaozi:qxiaozi}" size="small" @blur="tojisuan('ALLMONEY')" v-model="ruleForm.basic.INVOICEPRICE">
                    <i slot="suffix">元</i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            
          </el-row>
          <el-row>
            <el-col :span="20" :offset="1">
              <div class="formtitle">
                <span class="borderright">金融产品
                    <!-- <span style="font-size:12px;padding-left:87px;color:red">{{ financialInfo?financialInfo.reasondetail : ''}}</span>
                <span style="color:red;font-size:12px;">{{spanzi}}</span> -->
                </span>
              </div>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产品" prop="basic.FNPRODUCT" :rules="[
                        { required: true, message: '请输入', trigger: 'change' },
                        
                      ]">
                <el-select :class="{qxiaozi:qxiaozi}" v-model="ruleForm.basic.FNPRODUCT" :loading="loading" @focus="productsearch" size="small" placeholder="" @change="upjinrong">
                  <el-option v-for="item in producelist" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车辆价格" prop="basic.INVOICEPRICE" :rules="[
                        { required: true, message: '请输入', trigger: 'blur' },
                        
                      ]">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.INVOICEPRICE" :disabled="true">
                  <i slot="suffix">元</i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="fujiatag">
            <el-col :span="24" v-if="!sbdisable">
              <el-form-item label="附加" @submit.native.prevent>
                <el-input size="small" :class="{qxiaozifu:qxiaozifu}"  @focus="fujiaadd" v-model="ruleForm.basic.VEHICLEEXS" readonly="readonly">
                  <i class="el-icon-error el-input__icon" v-if="ruleForm.basic.VEHICLEEXS" slot="suffix" @click="qkfujia">
                    </i>
                  <!-- <el-button slot="append" icon="el-icon-search" @click="fujiaadd"></el-button> -->
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-else>
              <el-form-item label="附加">
                <el-input size="small" :class="{qxiaozifu:qxiaozifu}" v-model="ruleForm.basic.VEHICLEEXS" :disabled="true">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="附加价格">
                <el-input :class="{qxiaozi:qxiaozi}" type="number" size="small" v-model="ruleForm.basic.VEHICLEEXPRICE" :disabled="true">
                  <i slot="suffix">元</i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同价格" prop="basic.jdata.allmoney" :rules="[
                        { required: true, message: '请输入', trigger: 'blur' },
                        
                      ]">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.allmoney" :disabled="true">
                  <i slot="suffix">元</i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="贷款期限" prop="basic.jdata.loanperiod" :rules="[
                        { required: true, message: '请输入', trigger: 'blur' },
                        
                      ]">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.loanperiod" @blur="tojisuan('loanperiod')"></el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.loanperiod!= ruleForm.basic.jdata.loanperiod )?financialInfoEx.loanperiod : ''}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="还款频率" prop="basic.jdata.paymentfrequency" :rules="[
                        { required: true, message: '请输入', trigger: 'blur' },
                        
                      ]">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.paymentfrequency" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="首付比例" prop="basic.jdata.downratio" :rules="[
                        { required: true, message: '请输入', trigger: 'blur' },
                        
                      ]">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.downratio" @blur="tojisuan('downratio')">
                  <i slot="suffix">%</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.downratio!= ruleForm.basic.jdata.downratio )?financialInfoEx.downratio+'%' : ''}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="首付金额" prop="basic.jdata.downamount" :rules="[
                        { required: true, message: '请输入', trigger: 'blur' },
                        
                      ]">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.downamount" @blur="tojisuan('downamount')">
                  <i slot="suffix">元</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.downamount!=ruleForm.basic.jdata.downamount) ?financialInfoEx.downamount : ''}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="isshowwei">
            <el-col :span="12">
              <el-form-item label="尾款比例">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.tailratio" @blur="tojisuan('tailratio')">
                  <i slot="suffix">%</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx &&financialInfoEx.tailratio!=ruleForm.basic.jdata.tailratio) ?financialInfoEx.tailratio+'%' : ''}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="尾款金额">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.tailamount" :disabled="true">
                  <i slot="suffix">元</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.tailamount != ruleForm.basic.jdata.tailamount)?financialInfoEx.tailamount : ''}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="厂商最高贴息额" v-if="isFullRate">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.firmDiscountPrice" :disabled="true">
                  <i slot="suffix">元</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.firmDiscountPrice !=ruleForm.basic.jdata.firmDiscountPrice)?financialInfoEx.firmDiscountPrice : ''}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="厂商实际贴息额" v-if="isFullRate">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.discountprice2" :disabled="true">
                  <i slot="suffix">元</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.discountprice2 != ruleForm.basic.jdata.discountprice2)?financialInfoEx.discountprice2 : ''}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="经销商贴息额" v-if="isFullRate">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.dealerdiscountprice" @blur="tojisuan('dealerdiscountprice')">
                  <i slot="suffix">元</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.dealerdiscountprice !=ruleForm.basic.jdata.dealerdiscountprice)?financialInfoEx.dealerdiscountprice : ''}}</span>
              </el-form-item>
              
            </el-col>
            <el-col :span="12" v-if="isFullRate">
              <el-form-item label="贴息总金额" >
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.discountprice" :disabled="true">
                  <i slot="suffix">元</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.discountprice != ruleForm.basic.jdata.discountprice )?financialInfoEx.discountprice : ''}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="月供金额" prop="basic.jdata.firstpayment" :rules="[
                        { required: true, message: '请输入', trigger: 'blur' },
                        
                      ]">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.firstpayment" :disabled="true">
                  <i slot="suffix">元</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.firstpayment !=ruleForm.basic.jdata.firstpayment)?financialInfoEx.firstpayment : ''}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="贷款金额" prop="basic.jdata.loanmoney" :rules="[
                        { required: true, message: '请输入', trigger: 'blur' },
                        
                      ]">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.loanmoney" @blur="tojisuan('loanmoney')">
                  <i slot="suffix">元</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.loanmoney != ruleForm.basic.jdata.loanmoney)?financialInfoEx.loanmoney : ''}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户利率">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.customerrate" :disabled="true">
                  <i slot="suffix">%</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.customerrate != ruleForm.basic.jdata.customerrate)?financialInfoEx.customerrate+'%' : ''}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="利息总金额">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.interest" :disabled="true">
                  <i slot="suffix">元</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.interest != ruleForm.basic.jdata.interest)?financialInfoEx.interest : ''}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="贴息比率">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.discount" :disabled="true">
                  <i slot="suffix">%</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.discount != ruleForm.basic.jdata.discount)?financialInfoEx.discount+'%' : ''}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总利率">
                <el-input :class="{qxiaozi:qxiaozi}" size="small" v-model="ruleForm.basic.jdata.actualrate" :disabled="true">
                  <i slot="suffix">%</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.actualrate != ruleForm.basic.jdata.actualrate)?financialInfoEx.actualrate : ''}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24" v-if="!isFullRate">
              <el-form-item label="贴息总金额">
                <el-input
                   :class="{qxiaozifu:qxiaozifu}"
                  size="small"
                  v-model.number="ruleForm.basic.jdata.discountprice"
                  :disabled="true"
                >
                  <i slot="suffix">元</i>
                </el-input>
                <span class="xiaozi">{{ (financialInfoEx && financialInfoEx.discountprice != ruleForm.basic.jdata.discountprice )?financialInfoEx.discountprice : ''}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="1">
              <div class="formtitle">
                <span class="borderright">变更证明
                  <el-upload
                  :before-remove="beforeremove"
                    :disabled="sbdisable"
                    :headers="uploadHeader"
                    :action="uploadaction"
                    :before-upload="beforeupload"
                    list-type="picture-card"
                    :on-success="handleAvatarSuccess"
                    :on-preview="handlePictureCardPreview"
                    :file-list="fileList"
                    >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" title="图像预览">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </span>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row style="background-color:#fff">
      <el-row>
        <el-col :span="20" :offset="1">
          <div class="formtitle">
            <span class="borderright">还款计划</span>
          </div>
          <el-table :data="datalist" style="width: 100%">
            <el-table-column prop="startno" label="开始期数" width="180">
            </el-table-column>
            <el-table-column prop="endno" label="结束期数" width="180">
            </el-table-column>
            <el-table-column prop="payment" label="月供">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-row>
    <el-dialog :title="fujiadaititle" :visible.sync="fujiatan">
      <el-row v-show="fujiadai">
        <el-table :data="fujialist" style="width: 100%">
          <el-table-column prop="exname" label="项目" width="250">
          </el-table-column>
          <el-table-column prop="exprice" label="金额" width="250">
            <template slot-scope="scope">
                <el-input
                  onkeyup="this.value=this.value.replace(/\D/g,'')"
                  onafterpaste="this.value=this.value.replace(/\D/g,'')"
                  size="small"
                  @blur="sbfujiajin(scope)"
                  v-model="scope.row.exprice"
                >
                  <i slot="suffix">元</i>
                </el-input>
</template>
          </el-table-column>
          <!-- <el-table-column
                prop="exratio"
                label="比例">
<template slot-scope="scope">
  <el-input size="small" @blur="sbfujiabi(scope)" v-model="scope.row.exratio">
    <i slot="suffix">%</i></el-input>
</template>
              </el-table-column> -->
        </el-table>
      </el-row>
      <div>
        <!-- <p style="color:red">
          1、附加贷仅适用于新车；<br /> 2、首付比例设定同金融产品，但以车辆开票价及附加品费用合计为基数计算；

          <br /> 3、附加品总额不能超过(车辆指导价或车辆售价中较低的金额）的15%；

          <br /> 4、贷款额限定为【(车辆指导价或车辆售价中较低的金额) + 附加价格】的80%；<br /> 5、购置税不能超（车辆开票价÷(1+16%)× 10%）。<br />
        </p> -->
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="fujiatan = false">取 消</el-button>
        <el-button
          type="success"
          class="btncolor"
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
      title="贴息调整"
      :visible.sync="showtiexi"
      width="800px"
      :show-close="false"
      center
    >
      <el-form :inline="true">

        <el-form-item
          label="贴息金额"
          :label-width="formLabelWidthtwo"
        >
          <el-input
           type="number"
            @blur="tiexisuan()"
            v-model="tiexichu"
            :maxlength="inputMaxL"
            @input="inputMaxL = /^\d+\.?\d{0,1}$/.test(tiexichu) ? null : tiexichu.length - 1"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="厂商最高承担贴息额"
          :label-width="formLabelWidthtwo"
        >
          <el-input
            v-model="ruleForm.basic.jdata.firmDiscountPrice"
            :disabled="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="客户利率"
          :label-width="formLabelWidthtwo"
        >
          <el-input
            v-model="ruleForm.basic.jdata.customerrate"
            :disabled="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="月供金额"
          :label-width="formLabelWidthtwo"
        >
          <el-input
            v-model="ruleForm.basic.jdata.firstpayment"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="利息总金额"
          :label-width="formLabelWidthtwo"
        >
          <el-input
            v-model="ruleForm.basic.jdata.interest"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="贴息比率"
          :label-width="formLabelWidthtwo"
        >
          <el-input
            v-model="ruleForm.basic.jdata.discount"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-row style="margin-bottom:5px">
          <el-col class="pline"></el-col>
        </el-row>
        <el-form-item
          label="原贴息金额"
          :label-width="formLabelWidthtwo"
        >
          <el-input
            v-model="ydiscountprice"
            :disabled="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="原厂商最高承担贴息额"
          :label-width="formLabelWidthtwo"
        >
          <el-input
            v-model="yfirmDiscountPrice"
            :disabled="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="原客户利率"
          :label-width="formLabelWidthtwo"
        >
          <el-input
            v-model="ycustomerrate"
            :disabled="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="原月供金额"
          :label-width="formLabelWidthtwo"
        >
          <el-input
            v-model="yfirstpayment"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="原利息总金额"
          :label-width="formLabelWidthtwo"
        >
          <el-input
            v-model="yinterest"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="原贴息比率"
          :label-width="formLabelWidthtwo"
        >
          <el-input
            v-model="ydiscount"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >

        <el-button
          type="primary"
          @click="quetiexi()"
        >确 定</el-button>
        <el-button @click="qxtiexi()">取消</el-button>
      </div>

    </el-dialog>

    <el-dialog
      title="信息确认"
      :visible.sync="showxinxi"
      width="720px"
      center
    >
      <span>
        <el-form :inline="true">
          <div style="text-align:center;color:red">请确认申请信息，协议签署后将不能再修改，确认签署吗？</div><br />
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
            :label-width="formLabelWidth"
            prop="name"
          >
            <span>{{fujiachanpin}}</span>
          </el-form-item>
          <el-form-item
            v-if="fujiajiage"
            label="附加价格："
            :label-width="formLabelWidth"
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
          type="success"
          class="btncolor"
          @click="toConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  var scrollAction = {
      x: "undefined",
      y: "undefined"
    },
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
  import { getToken } from '@/utils/auth'
  import {
    getSaleDirector
  } from "@/api/credit";
  import {
    getsaledirectslist
  } from "@/api/basic";
  import {
    isObjectValueEqual
  } from "@/utils/index";
  import yan from "@/assets/images/icon_liuyan.png";
  import msgfasong from "@/assets/images/msgfasong.png";
  import msgshow from "@/assets/images/msgshow.png";
   import { GUID } from '@/utils'
  import {
    getdisabledbrand,
    getProductlist,
    getSale,
    getCredit,
    orderInfo,
    getMaker,
    getBrand,
    getStyle,
    getAdditional,
    checkAdditional,
    upAdditional,
    orderSave,
    getCurrentTaskCmd,
    postRevisepause,
    postConditionalapproval,
    getMsglist,
    postaddMsg,
    getfinancialInfo,
    getSpMaker,
    orderSign,
    delAdditional,
    getAssetInfo,
    getAssetSubmit,
    getAssetSave,
    getAssetCreateveex,
    getPictureinfo,
    orderimgsave,
    docimgsave,
    getAssetDelimpicture,
    getOriginalinfo
  } from "@/api/credit";
  import {
    provinceAndCityData
  } from "element-china-area-data";
  export default {
    filters: {
      rounding(value) {
        return value.toFixed(2);
      }
    },
    inject: ["reload"],
    data() {
      // eslint-disable-next-line
      var isvalidateMoney = (rule, value, callback) => {
        if (value !== "") {
          if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value)) {
            callback(new Error("最多保留两位小数!"));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
         filters: {
          total: 0,
          pageindex: 1,
          pagesize: 5
        },
        statusname: '',
        brandname: '',
        showdisabelcar: false,
        disabledbrandlist: [],
        brandtype: [],
        showguiid: '',
        uploadHeader: {
          'Authorization': 'Bearer ' + getToken()
        },
        uploadaction: window.g.ApiUrl + 'S120017/upload?Md5=&sceneid=1200170001&randomstr=',
        fileList: [],
        fujiachange: false,
        dialogImageUrl: '',
        dialogVisible: false,
        changeinfo: {
          applicationno: "",               
          vehicle: "",               
          brand: "",                //类型：String  必有字段  备注：无
          maker: "",                //类型：String  必有字段  备注：无
          style: "",                //类型：String  必有字段  备注：无
          allmoney: 0,                //类型：Number  必有字段  备注：无
          fnproduct: "",                //类型：String  必有字段  备注：无
          loanperiod: 0,                //类型：Number  必有字段  备注：无
          downratio: 0,                //类型：Number  必有字段  备注：无
          loanmoney: 0,                //类型：Number  必有字段  备注：无
          assetchange: '',                //类型：String  必有字段  备注：无
          camainid : "",                //类型：String  必有字段  备注：无
          memo: "",                //类型：String  必有字段  备注：无
          invoiceprice: 0,                //类型：Number  必有字段  备注：无
          addition: 0,                //类型：Number  必有字段  备注：无
          id: ""                //类型：String  必有字段  备注：无
        },
        changeSave: false,
        ydiscountprice: '',
        yfirmDiscountPrice: '',
        ycustomerrate: '',
        yfirstpayment: '',
        yinterest: '',
        ydiscount: '',
        tiexitwo: "",
        inputMaxL: "",
        tiexichu: "",
        valuearea: [],
        fujiachanpin: "",
        fujiajiage: "",
        isFullRate: false,
        showtiexi: false,
        saledirectorlist: [],
        yan,
        arealist: [],
        btndisable: false,
        financialInfo: {},
        fujiadaititle: "",
        totype: "",
        formLabelWidthtwo: "155px",
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
        isvalidateMoney,
        spanzi: "",
        makerlistsp: [],
        loading: false,
        itemmsg: [],
        formdesc: "",
        modal3: false,
        qxiaozifu: false,
        qxiaozi: false,
        financialInfoEx: {},
        routeid: this.$route.params.id,
        fujialist: [],
        datalist: [],
        fujiadai: true,
        defaultData: {},
        fujiatag: true,
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
        liuyancount: "",
        ruleForm: {
          basic: {
            type: '',
            brancode: "",
            // 销售总监
            saledirector: "",
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
            // 品牌
            MAKER: "",
            // 车型
            BRAND: "",
            // 款式
            STYLE: "",
            // 指导价
            GUIDEPRICE: "",
            // 车辆价格
            INVOICEPRICE: 0,
            // 购车目的
            PURPOSE: "",
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
        msgimg: msgshow,
        msgfasong: msgfasong,
        msgshow: msgshow,
        tmpJisuan: {}
      };
    },
    computed: {
      currentJisuan: function() {
        return {
          INVOICEPRICE: this.ruleForm.basic.INVOICEPRICE,
          loanperiod: this.ruleForm.basic.jdata.loanperiod,
          downratio: this.ruleForm.basic.jdata.downratio,
          downamount: this.ruleForm.basic.jdata.downamount,
          loanmoney: this.ruleForm.basic.jdata.loanmoney,
          VEHICLEEXPRICE: this.ruleForm.basic.VEHICLEEXPRICE,
          discountprice: this.ruleForm.basic.jdata.discountprice,
          dealerdiscountprice: this.ruleForm.basic.jdata.dealerdiscountprice,
          tailratio: this.ruleForm.basic.jdata.tailratio
        };
      }
    },
    methods: {
      handleSizeChange(val) {
        this.filters.pageindex = val;
        this.disabledcar();
      },
      handleCurrentChange(val) {
        this.filters.pageindex = val;
        this.disabledcar();
      },
      searchname() {
        this.filters.pageindex = 1
        this.filters.pagesize = 5
        this.disabledcar()
      },
      disabledcar() {
        let para = {}
        para = {
          makerid: this.ruleForm.basic.MAKER,
          brandname: this.brandname,
          PageIndex: this.filters.pageindex,
          PageSize: this.filters.pagesize
        }
        getdisabledbrand(para).then(res => {
          if(res.data.success){
            this.showdisabelcar = true
            this.filters.total = res.data.data.recordsTotal;
            this.disabledbrandlist = res.data.data.data
          }else{
            this.$message({
              message: res.data.message,
              type: "warning"
            });
          }
        })
      },
      handleAvatarSuccess(res, file) {
        let para = {}
        para = {
          name:res.data.md5+'.'+res.data.suffix ,//文件名称md5+扩展名☆
          // storegroup:"" ,//文件存储组
          // storeseat:"" ,//文件存储位置
          imcategorycode:"9901" ,//文件类型 默认
          // groupkey:"" ,//图片配对标识
          camainid:this.routeid ,//案件id★
          scene:"1" ,//场景 默认☆
          // uploadfrom: "" ,//图片途径
          md5:res.data.md5,// MD5★
          size:res.data.size,// 文件大小★
          success: 1 ,//上传成功标志★
          suffix:res.data.suffix,// 文件扩展名★
          randomstr: res.data.randomstr,// 唯一随机串★
          MidId: 'direct',
        }
        docimgsave(para).then(res => {})
        file.randomstr = res.data.randomstr
        console.log(res)
        console.log(file)
        this.fileList.push(file)
      },
      beforeupload(file){
        this.showguiid = GUID()
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            this.uploadaction = window.g.ApiUrl + 'S120017/upload/?Md5=&sceneid=1200170001&randomstr='+ this.showguiid
            resolve()
          })
        })
      },
      beforeremove(file, fileList) {
        let para = {}
        para.camainid = this.contentlist.basicInfo.id
        para.randomstr = file.randomstr
        
        getAssetDelimpicture(para).then(res => {
       
          if(res.data.success){
            this.fileList = this.fileList.filter(res=>{
              return res.uid!=file.uid
            })
          }else{
            
            this.$message({
              message: res.data.message,
              type: "warning"
            });
            return false
          }
        })
        return false
        // console.log(file, fileList);
      },
      handleRemove(file, fileList) {
       return false
        // let para = {}
        // para.camainid = this.contentlist.basicInfo.id
        // para.randomstr = file.randomstr
        // getAssetDelimpicture(para).then(res => {
        // // if(!res.data.success){
        // //     console.log(12326661)
        // //     return false
        // //   }
        // })
       
        // console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      resizeEvent: function() {
        var left = window.scrollX;
        var offsetLeft = this.$parent.$el.offsetLeft;
        this.$refs.topAffix.style.left = offsetLeft - left + "px";
      },
      scrollEvent: function() {
        var that = this;
        scrollFunc();
        if (that.$route.matched[1].name === "orderchange") {
          var top = getScroll(window, true);
          if (top >= 95) {
            this.$refs.topAffix.style.top = "0px";
          } else {
            this.$refs.topAffix.style.top = 95 - top + "px";
          }
          if (scrollDirection == "left" || scrollDirection == "right") {
            var left = window.scrollX;
            this.$refs.topAffix.style.left =
              "calc(100vw - 100% - " + left + "px)";
          }
        }
      },
      qxtiexi() {
        this.ruleForm.basic.jdata.discountprice = this.ydiscountprice;
        this.tiexichu = this.ydiscountprice;
        this.tojisuan("discountprice");
        this.showtiexi = false;
      },
      quetiexi() {
        this.showtiexi = false;
      },
      tiexisuan() {
        if (this.tiexichu != this.ruleForm.basic.jdata.discountprice) {
          this.tiexitwo = this.ruleForm.basic.jdata.discountprice;
          this.ruleForm.basic.jdata.discountprice = this.tiexichu;
          this.tojisuan("discountprice");
        }
      },
      qutiexie() {
        this.tiexichu = this.ruleForm.basic.jdata.discountprice;
        this.ydiscountprice = this.ruleForm.basic.jdata.discountprice;
        this.yfirmDiscountPrice = this.ruleForm.basic.jdata.firmDiscountPrice
        this.ycustomerrate = this.ruleForm.basic.jdata.customerrate
        this.yfirstpayment = this.ruleForm.basic.jdata.firstpayment
        this.yinterest = this.ruleForm.basic.jdata.interest
        this.ydiscount = this.ruleForm.basic.jdata.discount
        this.showtiexi = true;
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
      remoteMethod(query) {
        let para = {}
        para.pre = query
        para.ppre = ''
        if(this.ruleForm.basic.type == '04'){
          para.ppre = 'lcv'
        }
        getSpMaker(para).then(res => {
          this.makerlistsp = res.data.data;
        });
      },
      sbmittext() {
        var that = this;
        let para = {};
        para = {
          orderId: this.changeinfo.id,
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
          para = this.changeinfo.id;
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
          let para = {}
          para = this.contentlist
          postRevisepause(para).then(res => {
            this.btndisable = false
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
        }
        if (status === 6) {
          let para = {}
          para = {
            dataid: this.contentlist.basicInfo.id,
            cmdid: item.id
          }
          postConditionalapproval(para).then(res => {
            this.btndisable = false
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
        }
      },
      zansaveb() {
        var that = this;
        that.changeSave = true
        let para = {};
        para = this.contentlist;
        if (localStorage.getItem("order" + that.routeid)) {
          para.basicInfo.state = 2;
        }
        orderSave(para).then(res => {
          that.changeSave = false
          if (res.data.success) {
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
      doSaveInfo(){
        if(this.ruleForm.basic.VEHICLEEXPRICE == 0){
          this.fujialist = []
        }
        
        var that = this;
        that.changeSave = true
        let para = {};
        para = {
          maker: this.ruleForm.basic.MAKER,
          applicationno: this.contentlist.basicInfo.applicationno,
          vehicle: this.contentlist.basicInfo.vehicle,               
          brand: this.ruleForm.basic.BRAND,
          style: this.ruleForm.basic.STYLE,
          allmoney: this.ruleForm.basic.jdata.allmoney,
          fnproduct: this.ruleForm.basic.FNPRODUCT,
          loanperiod: this.ruleForm.basic.jdata.loanperiod, 
          downratio: this.ruleForm.basic.jdata.downratio, 
          loanmoney: this.ruleForm.basic.jdata.loanmoney,
          assetchange: JSON.stringify(this.fujialist),                //类型：String  必有字段  备注：无
          camainid : this.contentlist.basicInfo.id,                //类型：String  必有字段  备注：无
          memo: this.ruleForm.basic.MEMO,
          invoiceprice: this.ruleForm.basic.INVOICEPRICE,
          addition: this.ruleForm.basic.VEHICLEEXPRICE,
          id: this.changeinfo.id,
          tailratio:this.ruleForm.basic.jdata.tailratio,
          tailamount: this.ruleForm.basic.jdata.tailamount,
         
        }
        this.changeinfo = para
        
        getAssetSubmit(para).then(res => {
          that.changeSave = false
          if(res.data.success){
            this.$message({
              type: "success",
              message: '提交成功'
            });
            this.sbdisable = true
            this.changeinfo = res.data.data.caAssetChange
            
          }else{
              this.$message({
              type: "error",
              message: res.data.message
            });
          }
            
          
        })
      },
      zhansave() {
        if(this.ruleForm.basic.VEHICLEEXPRICE == 0){
          this.fujialist = []
        }
        
        var that = this;
        that.changeSave = true
        let para = {};
        para = {
          maker: this.ruleForm.basic.MAKER,
          applicationno: this.contentlist.basicInfo.applicationno,
          vehicle: this.contentlist.basicInfo.vehicle,               
          brand: this.ruleForm.basic.BRAND,
          style: this.ruleForm.basic.STYLE,
          allmoney: this.ruleForm.basic.jdata.allmoney,
          fnproduct: this.ruleForm.basic.FNPRODUCT,
          loanperiod: this.ruleForm.basic.jdata.loanperiod, 
          downratio: this.ruleForm.basic.jdata.downratio, 
          loanmoney: this.ruleForm.basic.jdata.loanmoney,
          assetchange: JSON.stringify(this.fujialist),                //类型：String  必有字段  备注：无
          camainid : this.contentlist.basicInfo.id,                //类型：String  必有字段  备注：无
          memo: this.ruleForm.basic.MEMO,
          invoiceprice: this.ruleForm.basic.INVOICEPRICE,
          addition: this.ruleForm.basic.VEHICLEEXPRICE,
          id: this.changeinfo.id,
          tailratio:this.ruleForm.basic.jdata.tailratio,
          tailamount: this.ruleForm.basic.jdata.tailamount,
         
        }
        this.changeinfo = para

        getAssetSave(para).then(res => {
            that.changeSave = false
            if(res.data.success){
              this.$message({
                type: "success",
                message: '暂存成功'
              });
              this.changeinfo = res.data.data.caAssetChange
              console.log(this.changeinfo)
            }else{
               this.$message({
                type: "error",
                message: res.data.message
              });
            }
              
           
          })
       
       
      },
      toSave() {
        var that = this;
        that.changeSave = true
      },
      toNext() {
        var that = this;
        
        this.$router.push({
          path: "/dealer/creditapproval/changephoto/" + this.routeid
        });
      
      },


     
      showMsg(type) {
        this.totype = type;
        if (this.contentlist.basicInfo.category === "2") {
          this.maker = this.contentlist.oldVehicleInfo.maker;
          this.brand = this.contentlist.oldVehicleInfo.brand;
          this.stylename = this.contentlist.oldVehicleInfo.cardtype;
        } else {
          this.maker = this.contentlist.vehicleInfo.refData.makername;
          this.brand = this.contentlist.vehicleInfo.refData.brandname;
          this.stylename = this.contentlist.vehicleInfo.refData.stylename;
        }
        this.fujiachanpin = this.contentlist.financialInfo.vehicleexs
        this.fujiajiage = this.contentlist.financialInfo.vehicleexprice
        this.product = this.contentlist.financialInfo.refData.fnproductname;
        this.money = this.contentlist.financialInfo.loanmoney;
        this.period = this.contentlist.financialInfo.loanperiod;
        this.firstpayment = this.contentlist.financialInfo.firstpayment;
        if (this.contentlist.borrowers) {
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
        
        this.$router.push({
          path: "/dealer/creditapproval/changephoto/" + this.routeid
        });
  
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
        var paymentfrequency = "";
        
        if (type == "downratio") {
          that.ruleForm.basic.jdata.downratio = Number(
            parseFloat(that.ruleForm.basic.jdata.downratio).toFixed(2)
          );
        }

        para.info = this.ruleForm.basic.jdata;
        if (this.ruleForm.basic.FNPRODUCT) {
          // 对比当前和上次参数
          if (isObjectValueEqual(this.currentJisuan, this.tmpJisuan)) {
          
            return;
          }
          if (type == "ALLMONEY") {
            var parafujia = this.contentlist.financialInfo.id;
            // delAdditional(parafujia).then(res => {
            //   if (res.data.success) {
            //     console.log(res);
            //   }
            // });
            this.ruleForm.basic.jdata.VEHICLEEXPRICE = 0;
            this.ruleForm.basic.VEHICLEEXPRICE = 0;
            this.ruleForm.basic.VEHICLEEXS = "";
            this.ruleForm.basic.jdata.allmoney = Number(
              this.ruleForm.basic.INVOICEPRICE
            );
          }
          if (this.ruleForm.basic.jdata.paymentfrequency) {
            if (this.ruleForm.basic.jdata.paymentfrequency == "月") {
              this.ruleForm.basic.jdata.paymentfrequency = 1;
            } else {
              this.ruleForm.basic.jdata.paymentfrequency = 2;
            }
          }
          getfinancialInfo(para).then(res => {
            if (res.data.success) {
              this.ruleForm.basic.jdata = res.data.data;
              this.datalist = res.data.data.rentaldetail;
              if (this.ruleForm.basic.jdata.paymentfrequency == 1) {
                this.ruleForm.basic.jdata.paymentfrequency = "月";
              } else {
                this.ruleForm.basic.jdata.paymentfrequency = "年";
              }

              this.ruleForm.basic.jdata.discountprice2 = res.data.data.firm_actual_discount_price
              this.$set(
                this.ruleForm.basic.jdata,
                "dealerdiscountprice",
                res.data.data.dealer_discount_price
              );
              // 存入缓存
              this.tmpJisuan = this.currentJisuan;
            } else {
             
              if (this.ruleForm.basic.jdata.paymentfrequency == 1) {
                this.ruleForm.basic.jdata.paymentfrequency = "月";
              } else {
                this.ruleForm.basic.jdata.paymentfrequency = "年";
              }
              // 存入缓存
              this.tmpJisuan = this.currentJisuan;
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          });
        }
      },
      upjinrong(selval) {
        /* eslint-disable */
        var that = this;
        var choosenItem = this.producelist.filter(item => item.id === selval)[0];
        if (this.ruleForm.basic.VEHICLEEXPRICE) {
          that.qkfujia();
        }
        that.isshowwei = false;
        if (choosenItem.balloonTag) {
          that.isshowwei = true;
        }
        that.fujiatag = false;
        if (choosenItem.additionalTag) {
          that.fujiatag = true;
        }
        this.spanzi = choosenItem.tipMsg;
        let para = {};
        para.ChangeField = "FNPRODUCT";
        this.ruleForm.basic.jdata.VEHICLEEXPRICE = this.ruleForm.basic.VEHICLEEXPRICE;
        this.ruleForm.basic.jdata.FNPRODUCT = this.ruleForm.basic.FNPRODUCT;
        this.ruleForm.basic.jdata.INVOICEPRICE = this.ruleForm.basic.INVOICEPRICE;
        this.ruleForm.basic.jdata.allmoney =
          Number(this.ruleForm.basic.INVOICEPRICE) +
          Number(this.ruleForm.basic.VEHICLEEXPRICE);
        var paymentfrequency = "";
        if (this.ruleForm.basic.jdata.paymentfrequency) {
          if (this.ruleForm.basic.jdata.paymentfrequency == "月") {
            this.ruleForm.basic.jdata.paymentfrequency = 1;
          } else {
            this.ruleForm.basic.jdata.paymentfrequency = 2;
          }
        }
        para.info = this.ruleForm.basic.jdata;
        getfinancialInfo(para).then(res => {
          if (res.data.success) {
            if (res.data.data.isFullRate) {
              that.isFullRate = res.data.data.isFullRate != 0 ? true : false;
            } else {
              that.isFullRate = false;
            }
            this.ruleForm.basic.jdata = res.data.data;
            this.datalist = res.data.data.rentaldetail;
            if (this.ruleForm.basic.jdata.paymentfrequency == 1) {
              this.ruleForm.basic.jdata.paymentfrequency = "月";
            } else {
              this.ruleForm.basic.jdata.paymentfrequency = "年";
            }
            this.ruleForm.basic.jdata.discountprice2 = res.data.data.firm_actual_discount_price
            this.$set(
              this.ruleForm.basic.jdata,
              "dealerdiscountprice",
              res.data.data.dealer_discount_price
            );
            this.tmpJisuan = this.currentJisuan;
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        });
      },
      upproduct(selval) {
        /* eslint-disable */
        var parafujia = this.contentlist.financialInfo.id;
        // delAdditional(parafujia).then(res => {
        //   if (res.data.success) {
        //     console.log(res);
        //   }
        // });
        this.ruleForm.basic.jdata = this.defaultData;
        this.ruleForm.basic.FNPRODUCT = "";
        this.spanzi = "";
        this.datalist = [];
        this.ruleForm.basic.VEHICLEEXS = "";
        this.ruleForm.basic.VEHICLEEXPRICE = "";
        var choosenItem = this.kuanshilist.filter(item => item.id === selval)[0];
        this.ruleForm.basic.GUIDEPRICE = choosenItem.guidePrice;
        this.ruleForm.basic.INVOICEPRICE = choosenItem.guidePrice;
        this.ruleForm.basic.jdata.INVOICEPRICE = choosenItem.guidePrice;
        this.ruleForm.basic.jdata.allmoney =
          Number(this.ruleForm.basic.INVOICEPRICE) +
          Number(this.ruleForm.basic.VEHICLEEXPRICE);
        let para = {};
        this.ruleForm.basic.brancode = choosenItem.code;
        para.style = choosenItem.id;
        para.code = choosenItem.code;
        getProductlist(para).then(res => {
          this.producelist = res.data.data;
        });
      },
      productsearch() {
        console.log(123);
        console.log(this.ruleForm.basic.brancode);
        this.loading = true;
        if (!this.ruleForm.basic.STYLE) {
          this.loading = false;
          this.$message({
            type: "error",
            message: "请先选择款式！！！"
          });
        } else {
          let para = {};
          para.style = this.ruleForm.basic.STYLE;
          para.code = this.ruleForm.basic.brancode;
          getProductlist(para).then(res => {
            this.loading = false;
            this.producelist = res.data.data;
          });
        }
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
        var parafujia = this.contentlist.financialInfo.id;
        // delAdditional(parafujia).then(res => {
        //   if (res.data.success) {
        //     console.log(res);
        //   }
        // });
        this.spanzi = "";
        this.ruleForm.basic.STYLE = "";
        this.ruleForm.basic.jdata = this.defaultData;
        this.ruleForm.basic.FNPRODUCT = "";
        this.datalist = [];
        this.ruleForm.basic.VEHICLEEXS = "";
        this.ruleForm.basic.INVOICEPRICE = 0;
        this.ruleForm.basic.VEHICLEEXPRICE = 0;
        this.ruleForm.basic.jdata.allmoney = 0;
        this.ruleForm.basic.VEHICLEEXPRICE = "";
      },
      catetypechange() {
        var parafujia = this.contentlist.financialInfo.id;
        if(this.ruleForm.basic.type == '04'){
          this.ruleForm.basic.PURPOSE = "2";
        }else{
          this.ruleForm.basic.PURPOSE = "1";
        }
        this.spanzi = "";
        this.ruleForm.basic.VEHICLEEXS = "";
        this.ruleForm.basic.VEHICLEEXPRICE = "";
        this.datalist = [];
        this.ruleForm.basic.jdata = this.defaultData;
        this.ruleForm.basic.INVOICEPRICE = 0;
        this.ruleForm.basic.VEHICLEEXPRICE = 0;
        this.ruleForm.basic.jdata.allmoney = 0;
        this.ruleForm.basic.FNPRODUCT = "";
        this.ruleForm.basic.BRAND = "";
        this.ruleForm.basic.MAKER = "";
        this.ruleForm.basic.STYLE = "";
      },
      makerspchange() {
        this.spanzi = "";
        this.ruleForm.basic.VEHICLEEXS = "";
        this.ruleForm.basic.VEHICLEEXPRICE = "";
        this.datalist = [];
        this.ruleForm.basic.jdata = this.defaultData;
        this.ruleForm.basic.INVOICEPRICE = 0;
        this.ruleForm.basic.VEHICLEEXPRICE = 0;
        this.ruleForm.basic.jdata.allmoney = 0;
        this.ruleForm.basic.FNPRODUCT = "";
        this.ruleForm.basic.BRAND = "";
        this.ruleForm.basic.STYLE = "";
      },
      makerspsearch() {
        this.loading = true;
        // 获取当前选择品牌名，作为参数进行后续搜索
        var marker = this.ruleForm.basic.MAKER;
        var markerColl = this.makerlistsp.filter(item => {
          return item.code == marker;
        });
        var markerName =
          markerColl && markerColl.length ? markerColl[0]["name"] : "";
        let para = {}
        para.pre = markerName
        para.ppre = ''
        if(this.ruleForm.basic.type == '04'){
          para.ppre = 'lcv'
        }
        getSpMaker(para).then(res => {
          this.loading = false;
          this.makerlistsp = res.data.data;
        });
      },
      makerchange() {
        var parafujia = this.contentlist.financialInfo.id;
        // delAdditional(parafujia).then(res => {
        //   if (res.data.success) {
        //     console.log(res);
        //   }
        // });
        this.spanzi = "";
        this.ruleForm.basic.VEHICLEEXS = "";
        this.ruleForm.basic.VEHICLEEXPRICE = "";
        this.datalist = [];
        this.ruleForm.basic.jdata = this.defaultData;
        this.ruleForm.basic.INVOICEPRICE = 0;
        this.ruleForm.basic.VEHICLEEXPRICE = 0;
        this.ruleForm.basic.jdata.allmoney = 0;
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
      salesearch() {
        getSale().then(res => {
          this.sales = res.data.data;
        });
      },
      xindaisearch() {
        getCredit().then(res => {
          this.credits = res.data.data;
        });
      },
      sbfujiajin(scope) {
        var price = this.ruleForm.basic.INVOICEPRICE 
        this.fujialist.map((v, i) => {
          if (i === scope.$index) {
            v.exratio = (v.exprice * 100 / price).toFixed(1);
          }
        });
      },
      sbfujiabi(scope) {
        var price = this.ruleForm.basic.INVOICEPRICE 
        this.fujialist.map((v, i) => {
          if (i === scope.$index) {
            v.exprice = (v.exratio * price / 100).toFixed(0);
          }
        });
      },
      fujiasub() {
        
        let para = {};
        para.FinancialId = this.contentlist.financialInfo.id;
        para.Category = this.contentlist.basicInfo.category;
        para.ProductId = this.ruleForm.basic.FNPRODUCT;
        para.CarBrand = this.ruleForm.basic.BRAND
        para.StyleId = this.ruleForm.basic.STYLE
        para.CarPriceStr = this.ruleForm.basic.INVOICEPRICE
        para.GuidepriceStr = this.ruleForm.basic.GUIDEPRICE
        para.LoanMoneyStr = this.ruleForm.basic.jdata.loanmoney
        this.fujialist.forEach((item, index, array) => {
          if (item.exprice == "") {
            this.fujialist[index].exprice = 0;
          }
        });
        para.VehicleEx = this.fujialist;
        checkAdditional(para).then(res => {
          if (res.data.success) {
            this.fujiatan = false;
            this.fujiachange = true;
            // this.fujialist = this.fujialist.filter((item, index, array) => {
            //   return item.exprice > 0;
            // });
            var name = this.fujialist.map((item, index, array) => {
              return item.exname+'('+  item.exprice+')';
            });
            var id = this.fujialist.map((item, index, array) => {
              return item.excode;
            });
            this.ruleForm.basic.jdata.VEHICLEEXS = id.join(",");
            this.ruleForm.basic.VEHICLEEXS = name.join(",");
            var price = this.fujialist.map((item, index, array) => {
              return item.exprice;
            });
            
            if(price.length>0){
              this.ruleForm.basic.VEHICLEEXPRICE = price.reduce(function(
                num,
                item,
                index
              ) {
                return parseFloat(num) + parseFloat(item);
              });
            }else{
              this.ruleForm.basic.VEHICLEEXPRICE = 0
            }
            this.tojisuan("VEHICLEEXPRICE");
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        });
      },
      qkfujia() {
        var para = this.contentlist.financialInfo.id;
        this.fujialist =[]
        this.ruleForm.basic.jdata.INVOICEPRICE = this.ruleForm.basic.INVOICEPRICE;
        this.ruleForm.basic.jdata.VEHICLEEXS = "";
        this.ruleForm.basic.jdata.allmoney = 0;
        this.ruleForm.basic.jdata.VEHICLEEXPRICE = 0;
        this.ruleForm.basic.VEHICLEEXPRICE = 0;
        this.ruleForm.basic.VEHICLEEXS = "";
        this.tojisuan("VEHICLEEXPRICE");
      },
      fujiaadd() {
       
        var titleshow = this.ruleForm.basic.GUIDEPRICE<this.ruleForm.basic.INVOICEPRICE? this.ruleForm.basic.GUIDEPRICE:this.ruleForm.basic.INVOICEPRICE
        this.fujiadaititle =
          "附加贷产品(车辆价格)" + titleshow;
        var that = this;
        if (!this.fujiatag) {
          this.$message({
            type: "error",
            message: "该产品不支持附加贷产品！！"
          });
          return false;
        }
        // if(this.fujiachange){
          let parachange = {};
          parachange.model ={
            Category: this.contentlist.basicInfo.category,
            FinancialId: this.contentlist.financialInfo.id,
            ProductId: this.ruleForm.basic.FNPRODUCT,
            canPrice: this.ruleForm.basic.INVOICEPRICE,
            CarBrand: this.ruleForm.basic.BRAND,
            StyleId: this.ruleForm.basic.STYLE,
            CarPriceStr: this.ruleForm.basic.INVOICEPRICE,
            GuidepriceStr: this.ruleForm.basic.GUIDEPRICE
          }
          
          parachange.veexJson = this.fujialist.length>0?JSON.stringify(this.fujialist): '[]'
          getAssetCreateveex(parachange).then(res => {
            if (res.data.success) {
              this.fujiatan = true;
              this.fujiadai = true;
              this.fujialist = res.data.data;
            } else {
              this.fujiadai = false;
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          });
        // }else{
        //   let para = {};
        //   para.Category = this.contentlist.basicInfo.category;
        //   para.FinancialId = this.contentlist.financialInfo.id;
        //   para.ProductId = this.ruleForm.basic.FNPRODUCT;
        //   para.PriceStr = Math.floor(
        //     this.ruleForm.basic.INVOICEPRICE / window.local.xishu
        //   );
        //   getAdditional(para).then(res => {
        //     if (res.data.success) {
        //       this.fujiatan = true;
        //       this.fujiadai = true;
        //       this.fujialist = res.data.data.data;
        //     } else {
        //       this.fujiadai = false;
        //       this.$message({
        //         type: "error",
        //         message: res.data.message
        //       });
        //     }
        //   });
        // }
        
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
        var paymentfrequency = "";
        if (this.ruleForm.basic.jdata.paymentfrequency) {
          if (this.ruleForm.basic.jdata.paymentfrequency == "月") {
            paymentfrequency = 1;
          } else {
            paymentfrequency = 2;
          }
        }
        var makername = this.makerlist.filter(
          item => item.code === this.ruleForm.basic.MAKER
        )[0];
        var brandname = this.chexinglist.filter(
          item => item.code === this.ruleForm.basic.BRAND
        )[0];
        if (makername) {
          that.contentlist.basicInfo.refData.makername = makername.name;
        }
        if (brandname) {
          that.contentlist.basicInfo.refData.makername = brandname.name;
        }
        that.contentlist.basicInfo.dealer = this.ruleForm.basic.dealerid;
        that.contentlist.basicInfo.saledirector = this.ruleForm.basic.saledirector;
        that.contentlist.basicInfo.signdealer = this.ruleForm.basic.signdealerid;
        that.contentlist.basicInfo.applyuserp = this.ruleForm.basic.applyuserpid;
        that.contentlist.basicInfo.creditofficer = this.ruleForm.basic.CREDITOFFICER;
        that.contentlist.basicInfo.saleuser = this.ruleForm.basic.SALEUSER;
        that.contentlist.vehicleInfo.type = this.ruleForm.basic.type;
        that.contentlist.basicInfo.memo = this.ruleForm.basic.MEMO;
        that.contentlist.vehicleInfo.maker = this.ruleForm.basic.MAKER;
        that.contentlist.vehicleInfo.brand = this.ruleForm.basic.BRAND;
        that.contentlist.vehicleInfo.style = this.ruleForm.basic.STYLE;
        that.contentlist.vehicleInfo.guideprice = this.ruleForm.basic.GUIDEPRICE;
        that.contentlist.vehicleInfo.invoiceprice = this.ruleForm.basic.INVOICEPRICE;
        that.contentlist.vehicleInfo.purpose = this.ruleForm.basic.PURPOSE;
        that.contentlist.vehicleInfo.registration = this.ruleForm.basic.REGISTRATION[1];
        that.contentlist.financialInfo.fnproduct = this.ruleForm.basic.FNPRODUCT;
        that.contentlist.financialInfo.invoiceprice = this.ruleForm.basic.INVOICEPRICE;
        that.contentlist.financialInfo.vehicleexs = this.ruleForm.basic.VEHICLEEXS;
        that.contentlist.financialInfo.vehicleexprice = this.ruleForm.basic.VEHICLEEXPRICE;
        that.contentlist.financialInfo.allmoney = this.ruleForm.basic.jdata.allmoney;
        that.contentlist.vehicleInfo.allmoney = this.ruleForm.basic.jdata.allmoney;
        that.contentlist.financialInfo.loanperiod = this.ruleForm.basic.jdata.loanperiod;
        that.contentlist.financialInfo.paymentfrequency = paymentfrequency;
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
        that.contentlist.financialInfo.dealerdiscountprice = this.ruleForm.basic.jdata.dealerdiscountprice;
        localStorage.setItem(
          "contentlist" + this.routeid,
          JSON.stringify(that.contentlist)
        );
      },
      initfunction() {
        /* eslint-disable */
        var that = this;
        getPictureinfo(localStorage.getItem("orderId" + that.routeid)).then(res => {
          if (res.data.success) {
            var filearr = res.data.data? res.data.data:[]
           
            that.fileList = filearr.map(o=>{return{url:window.g.ApiUrl + "S120017/download?md5="+o.md5,randomstr:o.randomstr}});
            console.log(that.fileList)
          }
        })
        getAssetInfo(localStorage.getItem("orderId" + that.routeid)).then(res => {
          console.log(res.data.success>0)
          if (res.data.success) {
  
             if(res.data.data && res.data.data.caAssetChange){
             
                this.changeinfo = res.data.data.caAssetChange
                 let paramsg = {};
                paramsg = this.changeinfo.id;
                getMsglist(paramsg).then(resmsg => {
                  if (resmsg.data.data) {
                    if (resmsg.data.data.data.length > 0) {
                      this.liuyancount = resmsg.data.data.data.length;
                    }
                  }
                });
              }
              if(res.data.data.caVehicleEX){
                this.fujialist = res.data.data.caVehicleEX
              }
              localStorage.setItem(
                "orderold" + that.routeid,
                JSON.stringify(res.data.data)
              );
              if(res.data.data.basicInfo.readonly){
                this.sbdisable = true
              }
              that.statusname = res.data.data.basicInfo.refData.statusname
              that.financialInfo = res.data.data.financialInfo;
              that.financialInfoEx = res.data.data.financialInfoEx;
              if (that.financialInfoEx) {
                that.qxiaozi = true;
                that.qxiaozifu = true
              }
              let para = {};
              para = {
                type: 3
              };
              getSaleDirector().then(ress => {
                if (ress.data.data) {
                  this.saledirectorlist = ress.data.data.filter(
                    (item, index, array) => {
                      return item.isActive > 0;
                    }
                  );
                  this.ruleForm.basic.saledirector =
                    res.data.data.basicInfo.saledirector;
                }
              });
              that.datalist = res.data.data.rentaldetail;
              that.contentlist = res.data.data;
              this.ruleForm.basic.category = res.data.data.basicInfo.category;
              this.ruleForm.basic.DEALER =
                res.data.data.basicInfo.refData.dealername;
              this.ruleForm.basic.SIGNDEALER =
                res.data.data.basicInfo.refData.signdealername;
              this.ruleForm.basic.APPLYUSER =
                res.data.data.basicInfo.refData.applyusername;
              this.ruleForm.basic.APPLYUSERP = res.data.data.basicInfo.applyuserp;
              this.ruleForm.basic.ID = res.data.data.financialInfo.id;
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
              this.makerlistsp.push({
                code: res.data.data.vehicleInfo.maker,
                name: res.data.data.vehicleInfo.refData.makername
              });
              this.makerlist.push({
                code: res.data.data.vehicleInfo.maker,
                name: res.data.data.vehicleInfo.refData.makername
              });
              this.chexinglist.push({
                code: res.data.data.vehicleInfo.brand,
                name: res.data.data.vehicleInfo.refData.brandname
              });
              this.kuanshilist.push({
                id: res.data.data.vehicleInfo.style,
                name: res.data.data.vehicleInfo.refData.stylename
              });
              if (res.data.data.financialInfo.refData) {
                that.isFullRate = res.data.data.financialInfo.refData.isFullRate != 0 ? true : false;
              } else {
                that.isFullRate = false;
              }
              this.ruleForm.basic.MEMO = res.data.data.basicInfo.memo;
              this.ruleForm.basic.MAKER = res.data.data.vehicleInfo.maker;
              this.ruleForm.basic.BRAND = res.data.data.vehicleInfo.brand;
              this.ruleForm.basic.STYLE = res.data.data.vehicleInfo.style;
              this.ruleForm.basic.type = res.data.data.vehicleInfo.type;
              this.ruleForm.basic.GUIDEPRICE =
                res.data.data.vehicleInfo.guideprice;
              this.ruleForm.basic.INVOICEPRICE =
                res.data.data.financialInfo.invoiceprice;
              this.ruleForm.basic.PURPOSE = res.data.data.vehicleInfo.purpose;
              that.isshowwei = false;
              if (res.data.data.financialInfo.refData.BalloonTag == 1) {
                that.isshowwei = true;
              }
              that.fujiatag = false;
              if (
                res.data.data.financialInfo.vehicleexs ||
                res.data.data.financialInfo.refData.AdditionalTag == 1
              ) {
                that.fujiatag = true;
              }
              if (res.data.data.vehicleInfo.registration) {
                var provice = res.data.data.vehicleInfo.registration.substring(
                  0,
                  2
                );
                this.ruleForm.basic.REGISTRATION = [
                  provice,
                  res.data.data.vehicleInfo.registration
                ];
              }
              this.producelist.push({
                id: res.data.data.financialInfo.fnproduct,
                name: res.data.data.financialInfo.refData.fnproductname
              });
              var paymentfrequency = "";
              if (res.data.data.financialInfo.paymentfrequency) {
                if (res.data.data.financialInfo.paymentfrequency == 1) {
                  paymentfrequency = "月";
                } else {
                  paymentfrequency = "年";
                }
              }
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
              this.ruleForm.basic.jdata.paymentfrequency = paymentfrequency;
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
          }else{
            getOriginalinfo(localStorage.getItem("orderId" + that.routeid)).then(res => {
            if (res.data.success) {
              if(res.data.data.caAssetChange){
                console.log(6666666)
                this.changeinfo = res.data.data.caAssetChange
                 let paramsg = {};
                paramsg = this.changeinfo.id;
                getMsglist(paramsg).then(resmsg => {
                  if (resmsg.data.data) {
                    if (resmsg.data.data.data.length > 0) {
                      this.liuyancount = resmsg.data.data.data.length;
                    }
                  }
                });
              }
              localStorage.setItem(
                "orderold" + that.routeid,
                JSON.stringify(res.data.data)
              );
          
              that.statusname = res.data.data.basicInfo.refData.statusname
              that.financialInfo = res.data.data.financialInfo;
              that.financialInfoEx = res.data.data.financialInfoEx;
              if (that.financialInfoEx) {
                that.qxiaozi = true;
                that.qxiaozifu = true
              }
              let para = {};
              para = {
                type: 3
              };
              getSaleDirector().then(ress => {
                if (ress.data.data) {
                  this.saledirectorlist = ress.data.data.filter(
                    (item, index, array) => {
                      return item.isActive > 0;
                    }
                  );
                  this.ruleForm.basic.saledirector =
                    res.data.data.basicInfo.saledirector;
                }
              });
              that.datalist = res.data.data.rentaldetail;
              that.contentlist = res.data.data;
              this.ruleForm.basic.category = res.data.data.basicInfo.category;
              this.ruleForm.basic.DEALER =
                res.data.data.basicInfo.refData.dealername;
              this.ruleForm.basic.SIGNDEALER =
                res.data.data.basicInfo.refData.signdealername;
              this.ruleForm.basic.APPLYUSER =
                res.data.data.basicInfo.refData.applyusername;
              this.ruleForm.basic.APPLYUSERP = res.data.data.basicInfo.applyuserp;
              this.ruleForm.basic.ID = res.data.data.financialInfo.id;
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
              this.makerlistsp.push({
                code: res.data.data.vehicleInfo.maker,
                name: res.data.data.vehicleInfo.refData.makername
              });
              this.makerlist.push({
                code: res.data.data.vehicleInfo.maker,
                name: res.data.data.vehicleInfo.refData.makername
              });
              this.chexinglist.push({
                code: res.data.data.vehicleInfo.brand,
                name: res.data.data.vehicleInfo.refData.brandname
              });
              this.kuanshilist.push({
                id: res.data.data.vehicleInfo.style,
                name: res.data.data.vehicleInfo.refData.stylename
              });
              if (res.data.data.financialInfo.refData) {
                that.isFullRate = res.data.data.financialInfo.refData.isFullRate != 0 ? true : false;
                that.ruleForm.basic.jdata.firmDiscountPrice = res.data.data.financialInfo.refData.firmDiscountPrice
              } else {
                that.isFullRate = false;
              }
              that.ruleForm.basic.jdata.discountprice2 = res.data.data.financialInfo.discountprice2
              that.ruleForm.basic.jdata.dealerdiscountprice = res.data.data.financialInfo.dealerdiscountprice
              this.ruleForm.basic.MEMO = res.data.data.basicInfo.memo;
              this.ruleForm.basic.MAKER = res.data.data.vehicleInfo.maker;
              this.ruleForm.basic.BRAND = res.data.data.vehicleInfo.brand;
              this.ruleForm.basic.STYLE = res.data.data.vehicleInfo.style;
              this.ruleForm.basic.type = res.data.data.vehicleInfo.type;
              this.ruleForm.basic.GUIDEPRICE =
                res.data.data.vehicleInfo.guideprice;
              this.ruleForm.basic.INVOICEPRICE =
                res.data.data.financialInfo.invoiceprice;
              this.ruleForm.basic.PURPOSE = res.data.data.vehicleInfo.purpose;
              that.isshowwei = false;
              if (res.data.data.financialInfo.refData.BalloonTag == 1) {
                that.isshowwei = true;
              }
              that.fujiatag = false;
              if (
                res.data.data.financialInfo.vehicleexs ||
                res.data.data.financialInfo.refData.AdditionalTag == 1
              ) {
                that.fujiatag = true;
              }
              if (res.data.data.vehicleInfo.registration) {
                var provice = res.data.data.vehicleInfo.registration.substring(
                  0,
                  2
                );
                this.ruleForm.basic.REGISTRATION = [
                  provice,
                  res.data.data.vehicleInfo.registration
                ];
              }
              this.producelist.push({
                id: res.data.data.financialInfo.fnproduct,
                name: res.data.data.financialInfo.refData.fnproductname
              });
              var paymentfrequency = "";
              if (res.data.data.financialInfo.paymentfrequency) {
                if (res.data.data.financialInfo.paymentfrequency == 1) {
                  paymentfrequency = "月";
                } else {
                  paymentfrequency = "年";
                }
              }
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
              this.ruleForm.basic.jdata.paymentfrequency = paymentfrequency;
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
                let parachange = {};
                parachange.Category = this.contentlist.basicInfo.category;
                parachange.FinancialId = this.contentlist.financialInfo.id;
                parachange.ProductId = this.ruleForm.basic.FNPRODUCT;
                parachange.canPrice = this.ruleForm.basic.INVOICEPRICE;
                parachange.CarBrand = this.ruleForm.basic.BRAND
                parachange.StyleId = this.ruleForm.basic.STYLE
                parachange.CarPriceStr = this.ruleForm.basic.INVOICEPRICE
                parachange.GuidepriceStr = this.ruleForm.basic.GUIDEPRICE
            
                getAdditional(parachange).then(res => {
                  if (res.data.success) {
                    
                    this.fujialist = res.data.data.data;
                    console.log(this.fujialist)
                  }
                });
            } else {
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
           
          });
          }
        })
    
          
        
        // getCurrentTaskCmd(localStorage.getItem('orderId' + that.routeid)).then(res => {
        //   console.log(res)
        // })
        this.brandtype = JSON.parse(localStorage.getItem("CodeSource"))[
          "00001L4ZH74060000A0X"
        ];
        this.defaultData = JSON.parse(JSON.stringify(this.ruleForm.basic.jdata));
        this.gouchemudi = JSON.parse(localStorage.getItem("CodeSource"))[
          "00001HBJ23DU50000AC7"
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
        this.ruleForm.basic.PURPOSE = "1";
       
      },

      liuyanlist() {
       
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
      var that = this;
      var headerbar = document.getElementById("headerbar-container");
      headerbar.style.minWidth = "calc(1240px + (100vw - 100%))";
      window.addEventListener("resize", this.resizeEvent);
      window.addEventListener("scroll", this.scrollEvent);
      
      this.initfunction();
      this.liuyanlist();
    }
  };
</script>

<style scoped lang="scss">
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
  .shangpanzi {
    width: 100%;
  }
  .kuanshizi {
    width: 94%;
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
  .qxiaozifu {
    width: 93%;
  }
  .xiaozi {
    font-size: 12px;
  }
  .midcontent {
    // margin-top: 20px;
    background-color: #ffffff;
    margin-bottom: 10px;
    padding-bottom: 40px;
  }
  .searchbar {
    height: 50px;
    line-height: 50px;
  }
  .stepcolor {
    padding-top: 13px;
  }
  .topbtnbasic {
    text-align: right;
    height: 70px;
    line-height: 70px;
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
    height: 100px; // border: 1px solid #5881D8;
    border-radius: 5px 5px 0 0;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
    .app-breadcrumb.el-breadcrumb{
    line-height: 52px;
    height: 37px;
}
.topbtnbasic {
  text-align: right;
  // height: 70px;
  line-height: 32px;
  height: 32px;
}
  /* .numinput{
      width: 110px;
    } */
</style>