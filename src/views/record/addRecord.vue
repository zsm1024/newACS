<template>
<section>
  <el-row>
    <el-col :span='18' >           
      <el-breadcrumb separator='/' class='app-breadcrumb'>
          <el-breadcrumb-item class='firstbread'>备案邮寄</el-breadcrumb-item>
          <el-breadcrumb-item>备案资料申请</el-breadcrumb-item>
      </el-breadcrumb>           
    </el-col>
  </el-row> 
  <div style="background-color: #fff; padding:10px 40px;">
    <el-form ref="form" :model="form" label-width="140px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="车管所所在地：" :rules="[{ required: true}]"> 
            <el-cascader
              style="width:100%"
              size="small"
              :options="options"
              :disabled="look"
              v-model="selectedOptions"

              @change="handleChange">

            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车管所名称：" size="small" :rules="[{ required: true}]">
            <el-input :disabled="look" v-model="form.carhuse_name" placeholder="请输入完整的车管所名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="备案原因：" size="small">
            <el-select :disabled="look" v-model="form.why" placeholder="请选择" @focus="status('00001M0XXGALI0000A0P',1)">
              <el-option
                v-for="item in why_list"
                :key="item.code"
                :label="item.name"
                :value="item.code"
                :disabled="Boolean(item.disabled)">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="期望备案时间：" size="small">
            <el-date-picker
              v-model="form.expect_time"
              type="date"
              :disabled="look"
              @change="timess"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="line"></div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人：" size="small" :rules="[{ required: true}]">
            <el-input :disabled="look" v-model="form.contact"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号：" size="small" :rules="[{ required: true}]">
            <el-input :disabled="look" v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮寄地址：" :rules="[{ required: true}]"> 
            <el-cascader
              style="width:100%"
               size="small"
              :options="optionsd"
              :disabled="look"
              v-model="selectedOptionsd"

              @change="handleChanged">

            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="填写详细地址：" size="small" :rules="[{ required: true}]">
            <el-input :disabled="look" v-model="form.mail_address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="特殊说明：" size="small">
          <el-input :disabled="look" v-model="form.instructions"  :autosize="{ minRows:2}" type="textarea" :rows="3" placeholder="请输入内容">
                </el-input>
          </el-form-item> 
        </el-col>
      </el-row>
      <div class="line"></div>
      <!--添加-->
      
      <el-row v-show="!look">
        <el-col :span="8">
          <el-form-item label="备案所需资料：">
            <span class="color" @click="add" v-if="!look">添加</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="cardback">
      <div style="height:auto">
        <el-col :span="24" v-for="(item,index) in form.file" :key="index">
        <el-button v-show="index>0 && !look" style="float:right;padding: 3px 0;" type="text" @click="remove(index,item.id)">移除</el-button>
          <div style="clear:both"></div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="文件类型：" size="small" :rules="[{ required: true}]">
                <el-select :disabled="look" v-model="item.filetype" placeholder="请选择" @focus="status('00001LZMHPZ9U0000A17',2)">
                  <el-option
                    v-for="item in type_list"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                    :disabled="Boolean(item.disabled)">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文件：" size="small" :rules="[{ required: true}]">
                <el-select :disabled="look" v-model="item.filename" placeholder="请选择" @focus="status('00001LZMII3880000A1N',3)">
                  <el-option
                    v-for="item in upfile_nameList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                    :disabled="Boolean(item.disabled)">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="数量：" size="small" :rules="[{ required: true}]">
                <el-input :disabled="look" v-model="item.filenum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="模板：">
                
                <el-upload
                  :disabled="look"
                  class="avatar-uploader"
                  :headers="uploadHeader"
                  :action="acitonUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :on-error="handleError"
                  :before-upload="beforeAvatarUpload">
                  <span style="color:#409EFF; cursor: pointer;" @click="img_show(item.template,item.name)">{{item.name}}</span>
                  <i v-if="!item.name && !look" @click="inx =index" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备注：" size="small">
              <el-input :disabled="look" v-model="item.remark" :autosize="{ minRows:2}" type="textarea" :rows="3" placeholder="请输入内容">
                    </el-input>
              </el-form-item> 
            </el-col>
            <el-col :span="12">
              <el-form-item label="盖章要求：" size="small">
                <el-select :disabled="look" v-model="item.stamp" placeholder="请选择" @focus="status('00001LZMJABEU0000A23',4)">
                  <el-option
                    v-for="item in gzyq_list"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                    :disabled="Boolean(item.disabled)">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </div>
      </el-row>
    </el-form>   
    <div class="fixed" v-if="img" @click="img = false"> 
      <img :src="imageUrl" class="avatar" @click.stop/>
    </div>
    <el-row style="text-align:center">
      <el-button class="submit" @click="submit('0')" type="primary" round v-if="!look">提交</el-button>
      <el-button class="submit" @click="submit('-2')" type="primary" round v-if="!look">保存</el-button>
    </el-row>
  </div>
</section>
</template>
<script>
import {
    beianStatus,
    addRecord,
    getRecordInfo,
    delRecordFile
  } from '@/api/record'
import Cookies from 'js-cookie'
import { getToken } from '@/utils/auth'
import { regionData,CodeToText } from 'element-china-area-data'
export default {
    data(){
      return{
        id:'',//详情id
        look:'',//1为查看，2为编辑
        options: regionData,
 
        selectedOptions: [],
        optionsd: regionData,
 
        selectedOptionsd: [],
         uploadHeader: {
          'Authorization': 'Bearer ' + getToken()
        },
        acitonUrl: window.g.ApiUrl + 'S120017/upload/?Md5=&sceneid=1100310001&randomstr=',
        form:{
          id:'',
          carhuse_name:'',//车管所名称
          why:'',//原因
          expect_time:'',//期望备案时间
          contact:'',//联系人
          phone:'',//手机号
          mail_address:'',//邮寄地址
          instructions:'',//特殊说明
          distributorid:'',//经销商id
          distributorname:'',//经销商名字
          //添加文件数组
          file:[
            {
              id:'',
              recordid:'',//申请备案id
              filetype:'',//文件类型
              filename:'',//文件名称
              name:'',//文件名称
              filenum:'',//数量
              stamp:'',//盖章要求
              remark:'',//备注
              template:'',//模板
              uploadtype:'1',//上传类型
              dmvid:'',//车管所id
              somortgagematerialid:'',//抵押资料申请id
              //imageUrl:'',//图片预览路径
            }
          ],
        },
        //备案原因列表
        why_list:[],
        //上传文件的类型的列表
        upfile_nameList:[
          {
                value: '营业执照正本，注册资金12亿，右上角编号：BH1751782',
                label: '营业执照正本，注册资金12亿，右上角编号：BH1751782',
                disabled:0
            },
        ],     
        //文件类型、
        type_list:[
           {
                value: '原件',
                label: '原件',
                disabled:0
            },
        ],    
        //盖章要求列表
        gzyq_list:[
           {
                value: '公章（1个）',
                label: '公章（1个）',
                disabled:0
            },
        ],
        inx:0,
        img:false,//文件的展示
        imageUrl:'',
      }
    },
    methods: {
      timess(){
        console.log(this.form.expect_time)
      },
      handleChange(value) {
        console.log(CodeToText[value[0]])
        console.log(CodeToText[value[1]])
        console.log(CodeToText[value[2]])
        console.log(this.selectedOptions)
      },
       handleChanged(value) {
        console.log(CodeToText[value[0]])
        console.log(CodeToText[value[1]])
        console.log(CodeToText[value[2]])
        console.log(this.selectedOptionsd)
      },
      handleAvatarSuccess(res, file) {
        var i = this.inx;
        console.log(i)
        this.form.file[i].template = res.data.md5
        this.form.file[i].name=file.name
        //this.form.file[i].imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
      },
      handleError(response, file, fileList) {
        this.$message({
          type: 'error',
          message:res.data.message
        })
      },
      //添加资料数组
      add(){
        this.form.file.push({
          id:'',
          recordid:'',//申请备案id
          filetype:'',//文件类型
          filename:'',//文件名称
          name:'',//文件名称
          filenum:'',//数量
          stamp:'',//盖章要求
          remark:'',//备注
          template:'',//模板
          uploadtype:'1',//上传类型
          dmvid:'',//车管所id
          somortgagematerialid:'',//抵押资料申请id
          //imageUrl:'',//图片预览路径
        })
      },
      //删除添加的数组资粮
      remove(i,id){
        this.form.file.splice(i,1)
        if(id=='')return;
        delRecordFile(id).then(res => {
          console.log(res)
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.getlists()
          } else {
            this.$message({
              type: 'error',
              message:res.data.message
            })
          }
        })
      },
       //展示文件
      img_show(url,name){
        if(this.look==true){
          //this.img=true
          this.imageUrl = window.g.ApiUrl + "S120017/download?md5="+url 
          window.location.href=this.imageUrl +"/"+name 
        }
      },
      //获取状态
      status(para,i){
        beianStatus(para).then(res => {
          if(i==1){
            this.why_list = res.data.data//备案原因
          }else if(i==2){
            this.type_list = res.data.data//文件类型
          }else if(i==3){
            this.upfile_nameList = res.data.data//文件 
          }else if(i==4){
            this.gzyq_list = res.data.data//盖章要求
          }          
        })
      },
      //提交
      submit(i){
          var date = new Date();
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          if (month < 10) {
              month = "0" + month;
          }
          if (day < 10) {
              day = "0" + day;
          }
          var nowDate = year + "-" + month + "-" + day;
          console.log(nowDate)
          let para={}
          para.ID=this.form.id
          para.STATE=i
          para.CDATE=nowDate
          para.ISRECORD='1'
         
          para.USERID=Cookies.get('userId')
          para.CUSER=Cookies.get('userId')

          // para.CUSER='admin'
          // para.USERID='admin'

          console.log(this.selectedOptions)
          console.log(this.selectedOptionsd)
          para.EXPECTRECORDTIME=this.form.expect_time//期望时间
          para.RECORDREASON=this.form.why//备案原因
          para.DMVNAME=this.form.carhuse_name//车管所名称
          para.LINKMAN=this.form.contact//联系人
          para.PHONE=this.form.phone//联系人手机号
          para.MAILLINGADDRESS=this.form.mail_address//邮寄地址
          para.REMARK=this.form.instructions//备注
          //车管所
          para.CITY=this.selectedOptions[1]//城市
          para.PROVINCE=this.selectedOptions[0]//省份  
          para.REGION=this.selectedOptions[2]//区县
          //邮寄地址
          para.MAILCITY=this.selectedOptionsd[1]//城市
          para.MAILPROVINCE=this.selectedOptionsd[0]//省份  
          para.MAILREGION=this.selectedOptionsd[2]//区县
          para.sorecordfileList=this.form.file
          if(i==-2){
            addRecord(para).then(res => {
              console.log(res)
              if (res.data.success) {
                this.$message({
                  type: 'success',
                  message: '保存成功！'
                })
                this.$router.push({ 
                  path: '/dealer/record'
                })
              } else {
                this.$message({
                  type: 'error', 
                  message:res.data.message
                })
              }
            })
          }else{
            if(this.selectedOptions[1]==''||this.form.carhuse_name==''||this.form.contact==''||this.form.phone==''||this.selectedOptions[1]==''||this.form.mail_address==''||this.form.file[0].filetype ==''||this.form.file[0].filename ==''||this.form.file[0].filenum ==''){
              this.$message({
                message: '请填写必要内容',
                type: 'warning'
              })
            }else{
              addRecord(para).then(res => {
                console.log(res)
                if (res.data.success) {
                  this.$message({
                    type: 'success',
                    message: '提交成功！'
                  })
                  this.$router.push({ 
                    path: '/dealer/record'
                  })
                } else {
                  this.$message({
                    type: 'error', 
                    message:res.data.message
                  })
                }
              })
            }  
          }  
      },  
      //获取数据
      getData(){
        var that =this
        console.log(this.id)
        var para = this.id
        getRecordInfo(para).then(res => {
          console.log("asdfasdfa",res)
          var data = res.data.data
          that.form.id=data.id
          that.selectedOptions=[data.province,data.city,data.region]//省市区
          that.selectedOptionsd=[data.mailprovince,data.mailcity,data.mailregion]//邮寄地址
          that.form.file=data.sorecordfileList//file对象
          that.form.distributorid=data.distributorid//经销商id
          that.form.distributorname =data.distributorname//经销商名字
          that.form.expect_time=data.expectrecordtime//期望时间
          that.form.why=data.recordreason//备案原因
          that.form.carhuse_name=data.dmvname
          that.form.contact=data.linkman//联系人
          that.form.phone=data.phone//联系人手机号
          that.form.mail_address=data.maillingaddress//邮寄地址
          that.form.instructions=data.remark//备注
        })
      },
      statuss(){
        this.status('00001M0XXGALI0000A0P',1)
        this.status('00001LZMHPZ9U0000A17',2)
        this.status('00001LZMII3880000A1N',3)
        this.status('00001LZMJABEU0000A23',4)
      }
    },
     mounted() {
       this.statuss()
      console.log("aaa",this.$route.params)
      var status = this.$route.params.look
      this.id = this.$route.params.id
      console.log(status,this.id)
      if(status==1){
        this.look=true
      }else{
        this.look=false
      }
      if(this.id!=0){
        this.getData()
      }      
      console.log(this.look)
    }
  }
</script>
<style scoped>
.el-date-editor{
  width: 100%;
}
.color{
  color:#409EFF;
  cursor: pointer;
}
.avatar-uploader{
  position: absolute
}
.fixed{
  position: fixed;
  background-color:rgba(0,0,0,.5);
  width:100%;
  height: 100%; 
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  z-index: 2;
}
.line{
  border-top: 1px dashed #ccc;
  margin-bottom: 15px
}
.fixed img{
  width: 75%;
  max-height: 90%
}
.submit{
  width: 206px;
  margin:10px 26px 19px;
}
.avatar-uploader{
  left: 0;
  top: 0
}
</style>

