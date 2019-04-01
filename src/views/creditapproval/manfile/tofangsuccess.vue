<template>

  <div class='app-container'>
      <el-row>
        <el-col :span="18" >
            
            <el-breadcrumb separator="/" class="app-breadcrumb">
                <el-breadcrumb-item class="firstbread">信贷审批</el-breadcrumb-item>
                <el-breadcrumb-item class="firstbread">放款管理</el-breadcrumb-item>
                <el-breadcrumb-item>个人贷款</el-breadcrumb-item>
            </el-breadcrumb>
            
        </el-col>
       
      </el-row>

      <el-row class="midcontent" style="background-color:#ffffff">
        
        <el-col :span="22" :offset="1" class="content">
            <el-col :span="24"  class="neir">
              
              <div class="showmessage">
                <div class="imgmessage"><img :src="icon_end" alt="" ></div>
                <div class="messageziup"><span>放款申请提交成功！</span></div>
                <div class="messagezidown"><span>请及时跟进放款状况。</span></div>
              </div>
              <div class="messagebutton">
                <el-button type="success" size="medium" @click="tolist" class="btnnextcolor" >放款管理</el-button>
              </div>
              
              
            </el-col>
            
              
            
        </el-col>
      </el-row>
  </div>
</template>

<script>
import { orderNew } from '@/api/credit'
import icon_end from '@/assets/images/icon_end.png'

export default {
  data() {
    return {
      icon_end
    }
  },
  methods: {
    tolist() {
      this.$router.push({ path: '/dealer/creditapproval/manlist' })
    },
    toOrder() {
      orderNew().then(res => {
        if (res.data.success) {
          localStorage.setItem('orderId' + res.data.data.orderId, res.data.data.orderId)
          localStorage.setItem('order' + res.data.data.orderId, JSON.stringify(res.data.data))
          this.$router.push({ path: '/dealer/creditapproval/personalorder/' + res.data.data.orderId })
        } else {
          this.$message({
            type: 'error',
            message: '服务器错误！！，请联系管理员'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.messageziup{
  margin-top: 10px;
  font-size: 14px;
  color: #404040;
}
.messagezidown{
  margin-top: 5px;
  font-size: 12px;
  color: #666666;
}
.imgmessage{
  margin-top: 20px
}
.messagebutton{
  margin-top: 30px;
}
.showmessage{
  width: 528px;
  height: 147px;
  background-color: #f3faf0;
  border:1px solid #f3faf0;
  border-radius: 4px;
  margin: 0 auto;
  
}
.midcontent{
  margin-top: 20px;
  background-color: #ffffff;
  margin-bottom: 20px;
  padding-bottom: 80px;
}

.content{
 
  margin-top: 20px;
}
.neir{
  margin-top: 70px;
  margin-bottom: 200px;
  text-align: center;
}
.marginleft50{
  margin-left: 50px;
}
.span1{
  color:#2f9dec;
  background-color:#dbeefc;
  cursor:pointer; 
}
.span2{
  color:#999999;
  background-color: #f5f5f5;
  cursor:pointer; 
}
</style>