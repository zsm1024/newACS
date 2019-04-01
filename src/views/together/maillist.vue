<template>
<section class="marketInfo app-container" style="margin-top:5px;position:relative;" >
   <el-row>
        <el-col :span='18' >           
            <el-breadcrumb separator='/' class='app-breadcrumb breads'>
                <el-breadcrumb-item class='firstbread'>协同办公</el-breadcrumb-item>
                <el-breadcrumb-item >通讯录</el-breadcrumb-item>              
            </el-breadcrumb>          
        </el-col>
    </el-row>
   <PdfView></PdfView> 
</section>
</template>
<script>
import PdfView from "../together/PdfView"
export default {
    components:{
    PdfView
    },
}
</script>
<style >
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
</style>
>
