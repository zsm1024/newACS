<template>
  <section  class='app-container' style="margin-top:5px;position:relative;">   
      <el-row>
        <el-col :span='18'>           
            <el-breadcrumb separator='/' class='app-breadcrumb breads'>
                <el-breadcrumb-item class='firstbread'>协同办公</el-breadcrumb-item>
                <el-breadcrumb-item >通知公告</el-breadcrumb-item>              
            </el-breadcrumb>          
        </el-col>
    </el-row>
        <el-table :data='lists' class='listTable'  :row-class-name='tableRowClassName'  v-loading='listLoading' @row-click='handle' style='width: 100%' stripe>        
          <el-table-column label="标题">
            <template slot-scope="scope">              
                <span style="color:#333">{{ scope.row.cpnoticetitle }}</span>
                <span  class="isup">置顶</span>
              </template>
          </el-table-column>
          <el-table-column label="状态" prop="isread" :filters="allArr" width="80"   :filter-method="filterHandler">
          </el-table-column>
           <el-table-column label="时间" prop="cpnoticecreatetime" sortable width="150">
          </el-table-column>
         
        </el-table>
           <!--工具条-->
        <el-col :span='24'  style="text-align:right" class='toolbar'>  
           <Page :current="page" :page-size="pagesize" :total="total"  @on-change="handleCurrentChange" @on-page-size-change="handleSizeChange" show-sizer show-total></Page>         
        </el-col>
  </section>
</template>
<script>
import { notice,noticeread} from "@/api/together"
export default {
  data() {
    return {
      filters:[],
      allArr:[],
      isA: false,
      isB: true,
      paths: window.g.FilePath,
      lists: [],
      isreadList: [],
      isreadLists: '',
      listId: '',
      col: [
        { title: '标题', field: 'cpnoticetitle' },
        { title: '时间', field: 'cpnoticecreatetime', width: '150' },
        { title: '状态', field: 'isread', width: '80' }
      ],
      listLoading: false,
      total: 0,
      pagesize:10,
      page: 1
    }
  },
  methods: {
     filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
    viewNotic(item){
      let para = item;
      noticeread(para);
    },
    handle(row, event, colum) {
      this.$router.push({path:'togList',query:{id:row.cpnoticeid}})
      this.viewNotic(row.cpnoticeid)
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
      notice(para).then(res => {
        var moment = require('moment')
        let data = res.data.data.data
        this.lists = data;
        this.total=res.data.data.recordsTotal;
        this.listLoading=false;
        this.lists.forEach(element => {
          // element.cpnoticecreatetime =  moment(element.cpnoticecreatetime).format('YYYY-MM-DD  HH:mm:ss');
          element.cpnoticecreatetime =  moment(Date.parse(element.cpnoticecreatetime.split(" "))).format('YYYY-MM-DD HH:mm:ss');
          if (element.isread == '0' || element.isread == '未读') {
            this.isreadList.push(element.isread)
             this.isA = true;
          }
           if (element.isread == "1") {
            this.isB = true;
          }
          this.isreadLists = this.isreadList.length
          if (element.isread == '0') {
            element.isread = '未读'
          }
          if (element.isread == '1') {
            element.isread = '已读'
          }
          this.filters.push({text:element.isread,value:element.isread })
         
        })
       for(var i=0;i<this.filters.length;i++){
      　var flag = true;
      　　for(var j=0;j<this.allArr.length;j++){
      　　　　if(this.filters[i].text == this.allArr[j].text){
      　　　　　　flag = false;
      　　　　};
      　　}; 
            if(flag){
      　　　　this.allArr.push(this.filters[i]);
      　　};
        }
      })
    },
   
    tableRowClassName(row) {
      let a=row.row.isread
       if (a =="1"||a=="已读") {
          return 'warning-row';
        } else if (a =="0"||a=="未读") {
          return 'success-row';
        }
        return '';
    },
  },
  mounted() {
    this.getlist();
  }
}
</script>
<style>
.listTable .el-badge__content.is-fixed.is-dot {
  top: 5px !important;
  right: 0px !important;
}
 .el-table .warning-row td:nth-child(2){
    color: #666;
  }

  .el-table .success-row td:nth-child(2) {
    color: #108EE9;
  }

  .listTable .el-table__body tr{height:36px}
  .isup {
  color: #ffb22f;
  border-radius: 4px;
  border: 1px solid #ffb22f;
  padding: 1px 4px;
  margin-left: 8px;
  font-size: 12px;

}

 .listTable .el-table__row{cursor: pointer;}
.el-icon-arrow-down:before{position: relative;top: 4px;font-size: 20px}

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


