<template>
  <section>
    <el-row>
      <el-col :span='18'>
        <el-breadcrumb
          separator='/'
          class='app-breadcrumb'
        >
          <el-breadcrumb-item class='firstbread'>证件邮寄</el-breadcrumb-item>
          <el-breadcrumb-item>证件接收</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!--搜索-->
    <el-form
      ref="form"
      :model="form"
      label-width="90px"
      inline
      class="searchbar custom-card-filter"
    >
      <el-form-item label="证件名称">
        <el-select
          v-model="form.card"
          size="small"
          class="selectsearch"
          style="width:250px"
          placeholder="请选择"
          @change="page=1;getlists()"
        >
          <el-option
            v-for="card in cards"
            :key="card.ID"
            :label="card.NAME"
            :value="card.ID"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="寄出日期">
        <el-date-picker
          v-model="form.date"
          format="yyyy-MM-dd "
          size="small"
          style="width:250px"
          prefix-icon="el-icon-date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="page=1;getlists()"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        style="width:100%"
        label="证件状态"
      >
        <filter-tag
          :current='form.status'
          @on-change='changeStatus'
          :tags="status"
        ></filter-tag>
      </el-form-item>
    </el-form>
    <el-table
      :data='lists'
      highlight-current-row
      class="tablelist custom-card-grid"
      v-loading='listLoading'
    >
      <el-table-column
        align='left'
        width='200'
        label="证件名称"
        prop="documentname"
      ></el-table-column>
      <el-table-column
        align='left'
        width='250'
        label="邮寄经销商"
        prop="senddealer"
      ></el-table-column>
      <el-table-column
        align='left'
        width='200'
        label="联络人"
        prop="sendperson"
      ></el-table-column>
      <el-table-column
        align='left'
        width='200'
        label="手机号"
        prop="sendphone"
      ></el-table-column>
      <el-table-column
        align='left'
        width='100'
        label="寄出日期"
        prop="senddate"
      ></el-table-column>
      <el-table-column
        align='center'
        label="操作"
      >
        <template slot-scope='scope'>
          <span
            v-if='scope.row.MAILSTATUS==1'
            class='linkurl'
            @click="view(scope)"
          >查看</span>
          <span
            v-else
            class='linkurl'
            @click="doRevceive(scope)"
          >接收</span>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col
      :span='24'
      style="text-align:right"
      v-if="!!total"
      class='toolbar'
    >
      <Page
        :current="page"
        :total="total"
        :page-size="pagesize"
        @on-change="handleCurrentChange"
        @on-page-size-change="handleSizeChange"
        show-sizer
        show-total
      ></Page>
    </el-col>
  </section>
</template>
<script>
import Moment from "moment/moment";
import { cardList, receiveList, commonStatus, commonDeal } from "@/api/card";
import Cookies from "js-cookie";

import filterTag from "@/components/FilterTag/filtertag";
var userid = Cookies.get("userId");
//var userid = "sccdjc2";
export default {
  components: {
    filterTag
  },
  data() {
    return {
      status: [
        {
          name: "全部",
          code: ""
        },
        {
          name: "待接收",
          code: 0
        },
        {
          name: "已接收",
          code: 1
        }
      ],
      form: {
        card: "",
        status: "",
        date: ""
      },
      cards: [],
      lists: [],
      total: 0,
      pagesize: 10,
      page: 1,
      listLoading: false
    };
  },
  methods: {
    changeStatus(tag) {
      this.form.status = tag.code;
      this.page = 1;
      this.getlists();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlists();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlists();
    },
    dateFormat: function(row, column) {
      var moment = require("moment");
      var date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
    getlists() {
      let para = {
        pageNum: this.page - 1,
        pageSize: this.pagesize,
        userid: userid,
        mailstatus: this.form.status,
        documentid: this.form.card,
        //dealerid: "000000084AFB00000U9D", // 经销商id
        begindate: Boolean(this.form.date)
          ? Moment(this.form.date[0]).format("YYYY-MM-DD")
          : "",
        enddate: Boolean(this.form.date)
          ? Moment(this.form.date[1]).format("YYYY-MM-DD")
          : ""
      };
      this.listLoading = true;
      receiveList(para).then(res => {
        commonDeal.call(this, res, () => {
          this.total = res.data.data.pageCount;
          let lists = res.data.data.pageData;
          this.lists = lists
            .concat(lists)
            .concat(lists)
            .slice(0, 10);
          for (const i in lists) {
            let list = lists[i];
            if (Boolean(list.senddate)) {
              this.lists[i].senddate = Moment(list.senddate).format(
                "YYYY-MM-DD"
              );
            } else {
              this.lists[i].senddate = "";
            }
          }
          this.listLoading = false;
        });
        this.listLoading = false;
      });
    },
    // 获取筛选项
    getFilter() {
      cardList().then(res => {
        let documentList = res.data.data;
        documentList.unshift({ ID: "", NAME: "全部" });
        this.cards = documentList;
      });
    },
    // 查看
    view(item) {
      let cardId = item.row.ID;
      this.$router.push({
        path: "/dealer/sendcard/cardDetail/" + cardId
      });
    },
    // 接收
    doRevceive(item) {
      let cardId = item.row.ID;
      this.$router.push({
        path: "/dealer/sendcard/receCard/" + cardId
      });
    }
  },
  mounted() {
    this.getFilter();
    this.getlists();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-form-item {
  margin-bottom: 0px !important;
  margin-top: 10px;
}
.el-button {
  span {
    color: #fff !important;
  }
}
.el-form-item__label {
  color: #000000 !important;
}
.tablelist /deep/ .el-table__row td div.cell {
  line-height: 24px;
}
</style>

