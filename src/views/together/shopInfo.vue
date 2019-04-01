<template> 
<!-- ref='tabPane2' style='overflow:auto' -->
    <section>
                 <el-form ref="active" label-width='130px' :model='active' size='mini' style='margin-top:10px'>
                     <el-form-item label='活动名称'>
                          <el-input size='mini'  value='' v-model='active.activename' placeholder='活动名称' ></el-input> 
                     </el-form-item>
                     <el-form-item label='活动时间'>
                          <el-date-picker type='daterange' v-model='rangetime' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期' style='width:100%' @change='changes' value-format='yyyy-MM-dd'></el-date-picker>
                     </el-form-item>
                     <el-form-item label='活动范围'>
                          <el-input size='mini'  value='' v-model='active.range' placeholder='省/市/区/县'></el-input> 
                     </el-form-item>
                     <el-form-item label='参与经销商'>
                          <el-input size='mini'  value='' v-model='active.partner' type='textarea' placeholder='参与经销商'></el-input> 
                     </el-form-item>
                     <el-form-item label='活动预测'>
                        <el-input size='mini' value='' v-model='active.prediction' placeholder='长城金融合同量'>
                            <template slot='append'>单</template>
                        </el-input>  
                     </el-form-item>
                     <el-form-item label='活动描述'>
                          <el-input size='mini'  value='' v-model='active.activedescription' type='textarea' placeholder='活动描述'></el-input> 
                     </el-form-item>
                     <el-form-item label='长城金融活动支持'>
                          <el-radio v-model='active.radio' label='需要' @change='changes1'>需要</el-radio>
                          <el-radio v-model='active.radio' label='不需要'  @change='changes2'>不需要</el-radio>
                     </el-form-item>
                     <div v-if='checkeds=="需要"'>
                        <el-form-item label='支持项目'>
                          <el-checkbox-group v-model='active.project'>
                              <el-checkbox label='活动物料设计'></el-checkbox>
                              <el-checkbox label='活动礼品支持'></el-checkbox>
                              <el-checkbox label='审批绿色通道'></el-checkbox>
                          </el-checkbox-group>
                          <span>其它 <el-input size='mini'  value='' v-model='active.OTHER' type='textarea' placeholder='其它需要支持的项目'></el-input></span>
                        </el-form-item> 
                        <el-form-item label='支持活动描述'>
                          <el-input size='mini'  value='' v-model='active.supportdescription' type='textarea' placeholder='支持活动描述'></el-input> 
                        </el-form-item>
                     </div>
                     <el-form-item label='联系人'>
                          <el-input size='mini'  value='' v-model='active.name' placeholder='联系人'></el-input> 
                    </el-form-item>
                    <el-form-item label='手机号'>
                          <el-input size='mini'  value='' v-model='active.phone'  placeholder='手机号'></el-input> 
                    </el-form-item>
                 </el-form>
                 <div  style='text-align:right;margin-top:40px'>
				    <el-button style='padding:10px'  type='primary' @click="cleanInfo(active)">清 空</el-button>
				    <el-button type='primary'  style='padding:10px' @click='subInfo'>提 交</el-button>
			    </div>
             </section>     
    </template>
<script>
import { Activity } from '@/api/together'
export default {
    data() {
        return {
            active: {
                activename: '',
                pange: '',
                startTime: '',
                endTime: '',
                range: '',
                partner: '',
                prediction: '',
                activedescription: '',
                issupport: '',
                name: '',
                phone: '',
                radio: '',
                project: [],
                supportdescription: '',
                OTHER:""
            },
            checkeds: '',
            rangetime: [],
            
        }
    },
    methods: {
        changes1(val) { 
        this.checkeds = val 
    },
    changes2(val) { 
        this.checkeds = val 
    },
        changes(val) {
            this.rangetime = val
            this.active.startTime = this.rangetime[0]
            this.active.endTime = this.rangetime[1]
        },
        subInfo(active){    
            this.active.project=this.active.project.toString()
            let para = {
            ACTIVITYNAME: this.active.activename,
            RANGE: this.active.range,
            STARTTIME: this.active.startTime,
            ENDTIME: this.active.endTime,
            PARTNER: this.active.partner,
            PREDICTION: this.active.prediction,
            ACTIVITYDESCRIPTION: this.active.activedescription,
            ISSUPPORT: this.active.radio,
            NAME: this.active.name,
            PHONE: this.active.phone,
            PROJECT: this.active.project.toString(),
            SUPPORTDESCRIPTION: this.active.supportdescription,
            OTHER:this.active.OTHER
            }
            Activity(para).then(res=>{
               let data =res.data
              if(data.success==1){
                this.$message({
                 type: 'success',  
                message:'提交成功',             
              });
              this.$refs['active'].resetFields()
              }else {
                this.$message.error({
                  message: res.data.message,
                });
              }
                console.log(res)
            })
        },
        clearInfo(active){
          this.$refs['active'].resetFields()
        }
    },
    mounted() {
    const h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 260
    // this.$refs.tabPane2.style.height = h + 'px'
  }
}
</script>
<style>
    
</style>

