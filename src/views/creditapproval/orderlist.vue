<template>
  <div
    class='app-container orderlist'
    style="margin-top:5px;position:relative;"
  >
    <el-row>
      <el-col :span="11">
        <el-breadcrumb
          separator="/"
          class="app-breadcrumb"
        >
          <el-breadcrumb-item class='firstbread'>信贷审批</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col
        :span="7"
        class="topmiddle topbtnbasic"
        style="padding-right:3px;margin:1px 0 8px 0"
      >
        <el-button
          @click="toOrder"
          v-if="isnew"
          class="topbutton"
        >本品新车</el-button>
        <el-button
          @click="toErorder"
          v-if="isold"
          class="topbutton"
        >二手车贷</el-button>
        <el-button
          @click="toAllorder"
          v-if="issp"
          class="topbutton"
        >全品牌sp</el-button>
      </el-col>
      <el-col
        :span="6"
        class="topsearch topbtnbasic"
        style="margin:1px 0 8px 0"
      >
        <el-form @submit.native.prevent>
          <el-autocomplete
            style="width:100%"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
            placeholder="姓名、申请编号、手机号"
            :value="applicationno"
            @focus="clearNormalFilter"
            v-model="applicationno"
            label="id"
            @keyup.enter.native="searchname"
            size="small"
          >
            <i
              slot="suffix"
              @click="searchname()"
              style="cursor:pointer"
              class="el-icon-search"
            ></i>
          </el-autocomplete>
        </el-form>
      </el-col>
    </el-row>
    <!--搜索-->
    <el-row class="searchbar custom-card-filter">
      <el-col :span='24'>
        <div class="blocktime">
          <span class="demonstration">提交时间</span>
          <el-date-picker
            v-model="value1"
            unlink-panels
            class="time250"
            size="small"
            prefix-icon="el-icon-date"
            type="daterange"
            @change='changeDate'
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span='24'>
        <div class="blocktime">
          <span class="demonstration">案件状态</span>
          <filter-tag
            :current='status'
            @on-change='changeStatusorder'
            :tags="itemnav"
          ></filter-tag>
        </div>
      </el-col>
    </el-row>
    <!--列表-->
    <el-table
      :data='lists'
      highlight-current-row
      v-loading='listLoading'
      class="tablelist custom-card-grid"
      stripe
    >
      <el-table-column
        align='left'
        label='申请编号'
        width="136"
      >
        <template slot-scope='scope'>
          <a
            title="免抵押"
            v-if="scope.row.async_extend_mian"
            class="mian-flag"
          ></a>
          <span
            v-if="scope.row.applicationno"
            class='linkurl underline'
            style="margin-left:0"
            @click="toDetail(scope)"
          >{{scope.row.applicationno}}</span>
          <span
            v-else
            class='linkurl underline'
            style="margin-left:0"
            @click="toDetail(scope)"
          >GW-A000000000</span>

        </template>
      </el-table-column>
      <el-table-column
        align='left'
        prop='refData.categoryname'
        label='申请类别'
      >
      </el-table-column>
      <el-table-column
        align='left'
        :formatter="filterzi"
        prop='borrower'
        label='借款人'
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align='left'
        prop='vehicle'
        label='车辆'
        width="180"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align='left'
        prop='refData.statusname'
        label='案件状态'
        width="150"
      >
        <template slot-scope='scope'>

          <span
            v-if="scope.row.status =='4' || scope.row.status =='6'"
            style="background-color:#FAAD14;width:68px;height:22px;display:inline-block;color:#ffffff;text-align:center;border-radius:3px"
          >{{scope.row.refData.statusname}}</span>
          <span
            v-else-if="scope.row.status =='1'"
            style="background-color:#CCCCCC;width:68px;height:22px;display:inline-block;color:#333333;text-align:center;border-radius:3px"
          >{{scope.row.refData.statusname}}</span>
          <span
            v-else
            style="text-align:center;width:68px;height:22px;display:inline-block;color:#333333;"
          >{{scope.row.refData.statusname}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align='left'
        :formatter="dateFormat"
        prop='submitdate'
        label='提交时间'
        width="130"
      >
      </el-table-column>
      <el-table-column
        align='left'
        prop='refData.saleusername'
        label='销售专员'
      >
      </el-table-column>
      <el-table-column
        align='left'
        prop='lastmsg'
        label='最新留言'
        width="190"
      >
        <template slot-scope='scope'>
          <el-popover
            placement="top"
            title=""
            width="200"
            trigger="hover"
            :content="scope.row.lastmsg"
          >
            <span slot="reference">{{scope.row.lastmsg |filtermemo}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label='操作'
        fixed="right"
        align='center'
        width='125'
      >
        <template slot-scope='scope'>

          <el-dropdown
            class=" linkurl"
            trigger="click"
          >
            <span
              class="el-dropdown-link "
              style="font-size:12px"
            >
              更多
            </span>
            <el-dropdown-menu
              slot="dropdown"
              class="moremenu"
            >
              <el-dropdown-item @click.native="toCopy(scope)">
                <div>复制</div>
              </el-dropdown-item>
              <el-dropdown-item @click.native="toDel(scope)">
                <div v-if="scope.row.status == 1">删除</div>
              </el-dropdown-item>
              <el-dropdown-item
                v-if="scope.row.refData.assetchange == '1'"
                @click.native="toChange(scope)"
              >
                <div>变更</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col
      :span='24'
      style="text-align:right"
      class='toolbar'
      v-if="!!total"
    >

      <Page
        :current="page"
        :page-size="pagesize"
        :total="total"
        @on-change="handleCurrentChange"
        @on-page-size-change="handleSizeChange"
        show-sizer
        show-total
      ></Page>
    </el-col>
  </div>
</template>

<script>
import {
  orderNewType,
  getOrder,
  orderNew,
  orderCopy,
  orderDel,
  getApplicationNo
} from "@/api/credit";
import { apiCommonDeal } from "@/utils/index";
import onedai from "@/assets/images/btn_bpxc.png";
import moredai from "@/assets/images/btn_more.png";
import filterTag from "@/components/FilterTag/filtertag";
import { addMianFlag } from "@/utils/base.js";
export default {
  components: {
    filterTag
  },
  inject: ["reload"],
  data() {
    return {
      appno: "",
      camainid: "",
      moreyewu: true,
      itemnav: [
        {
          code: 0,
          name: "全部"
        },
        {
          code: 1,
          name: "草稿"
        },
        {
          code: 2,
          name: "待处理"
        },
        {
          code: 3,
          name: "待审核"
        },
        {
          code: 4,
          name: "核准"
        },
        {
          code: 5,
          name: "拒绝"
        }
      ],
      value1: "",
      onedai,
      moredai,
      lists: [],
      cols: [
        {
          title: "申请编号",
          field: "applicationno"
        },
        {
          title: "借款人",
          field: "borrower"
        },
        {
          title: "车辆",
          field: "vehicle"
        },
        {
          title: "业务状态",
          field: "statusname"
        },
        {
          title: "最新消息",
          field: "lastmsg"
        },
        {
          title: "创建时间",
          field: "cdate"
        },
        {
          title: "提交时间",
          field: "submitdate"
        },
        {
          title: "备注",
          field: "memo"
        }
      ],
      isnew: false,
      isorg: false,
      isold: false,
      issp: false,
      total: 0,
      pagesize: 10,
      page: 1,
      status: 0,
      applicationno: "",
      sdate: "",
      edate: "",
      listLoading: false,
      timer: null
    };
  },
  filters: {
    filtermemo: function(value) {
      if (value && value.length > 14) {
        value = value.substring(0, 14) + "...";
      }
      return value;
    }
  },
  computed: {
    // 计算搜索内容长度 中文一个字 非中文两个字才出发搜索
    noLength: function() {
      var len = 0;
      var applicationNo = this.applicationno;
      for (var i = 0; i < applicationNo.length; i++) {
        if (
          applicationNo.charCodeAt(i) > 127 ||
          applicationNo.charCodeAt(i) == 94
        ) {
          len += 2;
        } else {
          len++;
        }
      }
      return len >= 2;
    }
  },
  methods: {
    changeDate() {
      this.page = 1;
      this.applicationno = "";
      this.appno = "";
      this.camainid = "";
      this.getlists();
    },
    changeStatusorder(tag) {
      this.page = 1;
      this.status = tag.code;
      this.applicationno = "";
      this.appno = "";
      this.camainid = "";
      this.getlists();
    },
    toChange(scope) {
      localStorage.setItem("orderId" + scope.row.id, scope.row.id);

      this.$router.push({
        path: "/dealer/creditapproval/orderchange/" + scope.row.id
      });
    },
    SearchList() {
      this.camainid = "";
      this.applicationno = "";
      this.pagesize = 10;
      this.page = 1;
      this.getlists();
    },
    querySearchAsync(queryString, cb) {
      var results = [];
      //节流防止多次提交，减轻服务器压力
      clearTimeout(this.timer);
      if (this.noLength) {
        this.timer = setTimeout(function() {
          getApplicationNo(queryString).then(res => {
            if (res.data.success) {
              results = res.data.data;
              results = results.map(obj => {
                obj.name.length == 2
                  ? (obj.name = obj.name[0] + "　" + obj.name[1])
                  : "";
                return {
                  ...obj,
                  value: obj.name + " " + obj.applicationno + " " + obj.phone
                };
              });
              cb(results);
            } else {
              this.$message({
                type: "error",
                message: "服务器错误！！，请联系管理员"
              });
            }
          });
        }, 300);
      } else {
        cb(results);
      }
    },
    clearNormalFilter() {
      let isDefault = true;
      if ((this.value1 && this.value1 !== "") || this.status != 0) {
        isDefault = false;
      }
      this.value1 = "";
      this.sdate = "";
      this.edate = "";
      this.status = 0;
      if (!isDefault) {
        this.page = 1;
        this.getlists();
      }
    },
    handleSelect(item) {
      // this.applicationno = item.card;
      this.appno = "";
      this.page = 1;
      this.camainid = item.id;
      // this.clearNormalFilter(); // 清除无关数据
      this.getlists();
    },
    toDel(scope) {
      let para = {};
      para = {
        id: scope.row.id
      };
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          orderDel(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getlists();
            } else {
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    toCopy(scope) {
      let para = {};
      para = {
        id: scope.row.id
      };
      this.$confirm("确定复制吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          orderCopy(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "复制成功！"
              });
              this.reload();
            } else {
              this.$message({
                type: "error",
                message: res.data.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消复制"
          });
        });
    },
    toDetail(scope) {
      localStorage.setItem("orderId" + scope.row.id, scope.row.id);
      if (scope.row.category == "1") {
        this.$router.push({
          path: "/dealer/creditapproval/personalorder/" + scope.row.id
        });
      }
      if (scope.row.category == "4") {
        this.$router.push({
          path: "/dealer/creditapproval/personalorder/" + scope.row.id
        });
      }
      if (scope.row.category == "2") {
        this.$router.push({
          path: "/dealer/creditapproval/secondorder/" + scope.row.id
        });
      }
    },
    toAllorder() {
      orderNewType(4).then(res => {
        if (res.data.success) {
          localStorage.setItem(
            "orderId" + res.data.data.orderId,
            res.data.data.orderId
          );
          localStorage.setItem(
            "order" + res.data.data.orderId,
            JSON.stringify(res.data.data)
          );
          this.$router.push({
            path:
              "/dealer/creditapproval/personalorder/" + res.data.data.orderId
          });
        } else {
          this.$message({
            type: "error",
            message: "服务器错误！！，请联系管理员"
          });
        }
      });
    },
    toJGorder() {
      this.$message({
        type: "error",
        message: "还不支持该功能，正在开发中！！"
      });
    },
    toErorder() {
      orderNewType(2).then(res => {
        if (res.data.success) {
          localStorage.setItem(
            "orderId" + res.data.data.orderId,
            res.data.data.orderId
          );
          localStorage.setItem(
            "order" + res.data.data.orderId,
            JSON.stringify(res.data.data)
          );
          this.$router.push({
            path: "/dealer/creditapproval/secondorder/" + res.data.data.orderId
          });
        } else {
          this.$message({
            type: "error",
            message: "服务器错误！！，请联系管理员"
          });
        }
      });
    },

    toAllorder() {
      orderNewType(4).then(res => {
        if (res.data.success) {
          localStorage.setItem(
            "orderId" + res.data.data.orderId,
            res.data.data.orderId
          );
          localStorage.setItem(
            "order" + res.data.data.orderId,
            JSON.stringify(res.data.data)
          );
          this.$router.push({
            path:
              "/dealer/creditapproval/personalorder/" + res.data.data.orderId
          });
        } else {
          this.$message({
            type: "error",
            message: "服务器错误！！，请联系管理员"
          });
        }
      });
    },
    toJGorder() {
      this.$message({
        type: "error",
        message: "还不支持该功能，正在开发中！！"
      });
    },
    toErorder() {
      orderNewType(2).then(res => {
        if (res.data.success) {
          localStorage.setItem(
            "orderId" + res.data.data.orderId,
            res.data.data.orderId
          );
          localStorage.setItem(
            "order" + res.data.data.orderId,
            JSON.stringify(res.data.data)
          );
          this.$router.push({
            path: "/dealer/creditapproval/secondorder/" + res.data.data.orderId
          });
        } else {
          this.$message({
            type: "error",
            message: "服务器错误！！，请联系管理员"
          });
        }
      });
    },
    toOrder() {
      orderNew().then(res => {
        if (res.data.success) {
          localStorage.setItem(
            "orderId" + res.data.data.orderId,
            res.data.data.orderId
          );
          localStorage.setItem(
            "order" + res.data.data.orderId,
            JSON.stringify(res.data.data)
          );
          this.$router.push({
            path:
              "/dealer/creditapproval/personalorder/" + res.data.data.orderId
          });
        } else {
          this.$message({
            type: "error",
            message: "服务器错误！！，请联系管理员"
          });
        }
      });
    },

    searchname() {
      this.appno = this.applicationno;
      this.camainid = "";
      this.page = 1;
      //this.clearNormalFilter(); // 清除无关数据
      this.getlists();
    },
    filterzi(row, column) {
      var data = row[column.property];
      if (!data) {
        data = "客户姓名";
      }
      return data;
    },
    dateFormat(row, column) {
      var moment = require("moment");
      var date = row[column.property];
      return date ? moment(date).format("YYYY-MM-DD HH:mm") : "";
    },
    changeStatus(item, index) {
      var that = this;
      this.$nextTick(function() {
        this.itemnav.forEach(function(item) {
          that.$set(item, "active", false);
        });
        that.$set(item, "active", true);
      });
      this.status = item.id;
      this.getlists();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlists();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlists();
    },
    getlists() {
      if (this.value1) {
        var moment = require("moment");
        this.sdate = moment(this.value1[0]).format("YYYY-MM-DD HH:mm:ss");
        this.edate = moment(this.value1[1]).format("YYYY-MM-DD 23:59:59");
      } else {
        this.sdate = "";
        this.edate = "";
      }
      let para = {};
      para = {
        camainid: this.camainid,
        applicationno: this.appno,
        status: this.status,
        sdate: this.sdate,
        edate: this.edate,
        PageIndex: this.page,
        PageSize: this.pagesize
      };
      this.listLoading = true;
      getOrder(para)
        .then(res => {
          this.listLoading = false;
          apiCommonDeal.call(this, res, data => {
            this.total = data.recordsTotal;
            this.lists = data.data;
            this.cols = this.cols;
          });
        })
        .then(() => {
          addMianFlag.call(this, this.lists, "applicationno");
        });
    }
  },
  mounted() {
    if (localStorage.getItem("dealerinfo")) {
      this.issp = JSON.parse(localStorage.getItem("dealerinfo")).enableSp;
      this.isnew = JSON.parse(localStorage.getItem("dealerinfo")).enable_new;
      this.isorg = JSON.parse(localStorage.getItem("dealerinfo")).enable_org;
      this.isold = JSON.parse(localStorage.getItem("dealerinfo")).enable_old;
    }
    this.getlists();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.demonstration {
  font-weight: bold;
}

.topbutton {
  height: 32px;
  font-size: 12px;
  text-align: center;
  background-color: #507acd;
  color: #ffffff;
  padding: 5px 16px;
  margin-right: 5px;
  margin-left: 0;
}
.topbutton:hover {
  background-color: #5881d8;
}
.topbutton:active {
  background-color: #3c60c5;
}
.yuanquan {
  color: red;
}
.hoverlink:hover {
  text-decoration: underline;
}
.btnbeizhu {
  position: absolute;
  bottom: 21px;
  z-index: 10;
  width: 76%;
  height: 20px;
  padding: 0;
  margin: 0;
  text-align: end;
  right: 28px;
  background-color: #e7f2ff;
  border-color: #e7f2ff;
  color: #4e8cee;
  top: -5px;
}
.btnbeizhu:hover {
  background-color: #e7f2ff;
  border-color: #e7f2ff;
  color: #4e8cee;
}
.btnxiaoxi {
  background-color: #fff2e8;
  border-color: #fff2e8;
  color: #fa541c;
  position: absolute;
  bottom: 21px;
  z-index: 10;
  width: 70%;
  height: 20px;
  padding: 0;
  margin: 0;
  text-align: end;
  right: -26px;
  top: -5px;
}
.mian-flag {
  background: url("~@/assets/images/miandiya.png") no-repeat;
  background-size: cover;
  width: 24px;
  height: 24px;
  display: block;
  position: absolute;
  left: 0px;
  top: 0;
  cursor: pointer;
}
.btnul li {
  font-size: 13px;
  line-height: 26px;
  cursor: pointer;
}
.unactive {
  margin-top: 5px;
  border: none;
}
.btnactive {
  color: #ffffff;
  background-color: #5881d8;
  margin-top: 5px;
  cursor: pointer;
  width: 58px;
  text-align: center;
  border: 1px solid #5881d8;
  border-radius: 4px;
}
.btnactive:hover {
  width: 58px;
}

.app-breadcrumb.el-breadcrumb {
  line-height: 52px;
  height: 37px;
}
.topbtnbasic {
  text-align: right;
  // height: 70px;
  line-height: 32px;
  height: 32px;
}
</style>


