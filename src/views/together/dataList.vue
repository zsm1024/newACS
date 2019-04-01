<template>
  <section class='app-container' style="margin-top:5px;position:relative;">
        <el-row>
           <el-col :span='18'>           
            <el-breadcrumb separator='/' class='app-breadcrumb breads'>
                <el-breadcrumb-item class='firstbread'>协同办公</el-breadcrumb-item>
                <el-breadcrumb-item>资料管理</el-breadcrumb-item>
            </el-breadcrumb>
            
        </el-col>
        </el-row>      
        <el-table :data='lists' class='listTable docTr'  highlight-current-row  v-loading='listLoading' @row-click='handle' style='width: 100%'  stripe @filter-change="handleFilterChange">
          <!-- <router-link :to="{path:'docList',query:{id:col.cpdownloadid}}">        -->
          <!-- <el-table-column   :prop='col.field' :label='col.title' :width='col.width' show-overflow-tooltip  v-for='(col, index) in col' :key='index'>
          </el-table-column> -->
          <el-table-column label="标题" style="margin-left:30px" prop="cpdownloadtitle">
          </el-table-column>
          <el-table-column label="资源类型" prop="cpdownloadresourcetype" :filters="newArr" width="110" :filter-method="docFilterHandler">
          </el-table-column>
          <el-table-column label="时间" prop="cpdownloadsatarttime" sortable width='180'>
          </el-table-column>
        </el-table>
            <!--工具条-->
        <el-col :span='24'  style="text-align:right" class='toolbar'>           
             <Page :current="page" :page-size="pagesize" :total="total"  @on-change="handleCurrentChange" @on-page-size-change="handleSizeChange" show-sizer show-total></Page>
        </el-col>
  </section>
</template>
<script>
import { download } from '@/api/together'
export default {
  data() {
    return {
      newArr:[],  
      arrays:[],   
      paths: window.g.FilePath,
      lists: [],
      isreadList: [],
      isreadLists: '',
      listId: '',
      col: [
        { title: '标题', field: 'cpdownloadtitle' },
        { title: '资源类型', field: 'cpdownloadresourcetype', width: '80' },
        { title: '时间', field: 'cpdownloadsatarttime', width: '150' },
      ],
      listLoading: false,
      total: 0,
      pagesize: 10,
      page: 1
    }
  },
  methods: {
    handleFilterChange(filters){
      console.log(filters)
      // this.getlist()
    },
    docFilterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
        
      },
    clickurl(item){
       window.open(item)
    },
    pdferr(errurl) {
      console.log(errurl)
    },
    handle(row, event, colum) {
      this.$router.push({path:'docList',query:{id:row.cpdownloadid}})
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getlist()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getlist()
    },
    getlist() {
       this.listLoading=true;
      let para = {
        PageSize:this.pagesize,
        PageIndex:this.page
      }
      download(para).then(res => {
        var moment = require('moment')
        let data = res.data.data.data
        this.lists = data;
        this.total=res.data.data.recordsTotal;
        this.listLoading=false;
        this.lists.forEach(el => {
          el.cpdownloadsatarttime =  moment(Date.parse(element.cpdownloadsatarttime.split(" "))).format('YYYY-MM-DD HH:mm:ss');
          this.arrays.push({text:el.cpdownloadresourcetype, value:el.cpdownloadresourcetype})
        });
        for(var i=0;i<this.arrays.length;i++){
      　var flag = true;
      　　for(var j=0;j<this.newArr.length;j++){
      　　　　if(this.arrays[i].text == this.newArr[j].text){
      　　　　　　flag = false;
      　　　　};
      　　}; 
            if(flag){
      　　　　this.newArr.push(this.arrays[i]);
      　　};
        }
      })
    },
  },
  mounted() {   
    this.getlist()
  }
}
</script>
<style>
  .listTable .el-badge__content.is-fixed.is-dot {top:5px!important; right:0px!important}
  .docTr .cell{margin-left: 30px;color:#333}
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


