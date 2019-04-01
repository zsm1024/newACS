<template>
<section class="marketInfo app-container" style="margin-top:5px;position:relative;">
  <el-row>
        <el-col :span='18'>           
            <el-breadcrumb separator='/' class='app-breadcrumb breads'>
                <el-breadcrumb-item class='firstbread'>协同办公</el-breadcrumb-item>
                <el-breadcrumb-item  class='firstbread'>资料管理</el-breadcrumb-item>
                <el-breadcrumb-item>案例展示</el-breadcrumb-item>
            </el-breadcrumb>           
        </el-col>
    </el-row>
    <el-card v-loading="loading2" class="videocon">
        <el-row class="videocon" style="margin-bottom:47px">
            <el-col :span="6"  v-for="(item,index) in data" :key="index">        
                <div @click="clickview(item.id)" class="divs">
                     <el-card :body-style="{height:'100%'}">
                         <router-link :to="{path:'videoshow',query:{id:item.id}}" >
                             <img :src="downpaths +'s120017/downloaddoc?id='+ item.picture"/>
                              <!--  -->
                            <p style="overflow:hidden;text-overflow:ellipsis;white-space: nowrap;padding-left:16px;font-size:16px;color:#333;height:22px;width:254px;line-height:22px;margin-top:12px;">{{item.title}}</p>
                             <p style="overflow:hidden;text-overflow:ellipsis;white-space: nowrap;padding-left:16px;color:#999;margin:8px 0 33px 0">{{item.cdate}}</p>
                              <!-- <span style="flex:2;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;padding-left:10px">{</span><span style="flex:1;text-align:right;padding-right:10pxoverflow:hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.cdate}}</span> -->
                            
                         </router-link>                                              
                </el-card>
                </div>              
            </el-col>
        </el-row>
    </el-card>
</section>
     <!-- :offset='index > 0? 1:0' -->
</template>
<script>
import { Case } from '@/api/together'
export default {
    data() {
        return{
          loading2:false,
            a:'',
            data:[],
            downpaths: window.g.ApiUrl,
        }
    },
     methods: {
        clickview(item){
            // window.open("http://"+item)
            // console.log(item)
        },
       getinfo(){
         this.loading2=true;
           Case().then(res => {
              let data = res.data.data.data
              this.data=data.reverse()
              this.loading2=false;
           })
        }
    },
    mounted() {
        this.getinfo()
    },
}
</script>
<style>
    .divs{height:100%;width:100%;}
    .divs:hover{cursor: pointer;box-shadow:0 1px 10px #f0f0f0}
    .videocon{display: flex;flex-wrap: wrap;border-radius:0}
    .videocon .el-col{width:280px;margin: 16px 0 0 16px}
    /* .videocon .el-card{height:100%;background: rgba(250,250,250,1);} */
    .videocon img{display: inline-block;height: 168px;width: 100%;}
    .videocon .el-card__body{padding:0!important}
    .videocon h3{padding: 2px;height:15%;width: 100%;text-align: center;color:#333;overflow: hidden}
    .el-table--enable-row-hover .el-table__body tr:hover>td:first-child{color:#1890FF!important }
    .videocon .el-card.is-always-shadow{box-shadow:0px 0px 5px 0px rgba(0,0,0,0.19); background:rgba(250,250,250,1);border-radius:6px;} 
    .videocon.is-always-shadow{background:rgba(255,255,255,1);box-shadow:0px 2px 20px 0px rgba(0,0,0,0.02);border-radius:4px; }
    .app-breadcrumb.el-breadcrumb{
        line-height: 52px !important;
        height: 37px !important;
    margin-top:0 !important;
        padding-bottom:8px 
    }
</style>
