<template>
  <section style="margin-top:5px;position:relative;">
    <el-row>
      <el-col :span='11'>
        <el-breadcrumb
          separator='/'
          class='app-breadcrumb'
        >
          <el-breadcrumb-item class='firstbread'>贷后管理</el-breadcrumb-item>
          <el-breadcrumb-item>延期管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col
        :span="6"
        :offset="7"
        class="topsearch topbtnbasic"
        style="margin-top:3px;margin-bottom:8px;"
      >
        <el-form @submit.native.prevent>
          <el-autocomplete
            style="width:100%"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
            placeholder="姓名、申请编号、手机号"
            :value="form.documentno"
            @focus="clearNormalFilter"
            v-model="form.documentno"
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
    <el-row class="searchbar custom-card-filter">
      <el-col :span='10'>
        <div class="blocktime">
          <span class="demonstration">延期天数</span>
          <ul class="day">
            <li
              class="day_item"
              :class="[day_item==-1 ? 'day_active' : '']"
              @click="choseDay(-1)"
            >
              <span>全部</span>
            </li>
            <li
              class="day_item"
              :class="[day_item==0 ? 'day_active' : '']"
              @click="choseDay(0)"
            >
              <span>3天</span>
            </li>
            <li
              class="day_item"
              :class="[day_item==1 ? 'day_active' : '']"
              @click="choseDay(1)"
            >
              <span>一周</span>
            </li>
            <li
              class="day_item"
              :class="[day_item==2 ? 'day_active' : '']"
              @click="choseDay(2)"
            >
              <span>一个月</span>
            </li>
            <!-- <li
              class="day_item"
              :class="[day_item==3 ? 'day_active' : '']"
              @click="choseDay(3)"
            >
              <span>自定义</span>
            </li> -->
            <!-- v-show="day_item==3" -->

            <li
              class="day_item day_item_diy"
              style="position:relative"
              @mouseenter="mouseEnter"
              @mouseleave="mouseLeave"
            >
              <el-input
                v-model="form.delaydiy"
                ref='diyday'
                @focus="changeDiy"
                @blur="form.delayday = form.delaydiy"
                @keyup.enter.native="diySearch"
                size="mini"
                type="number"
                style="width:60px;z-index:100;"
              ><span slot="suffix">天
                </span></el-input>
              <div
                class="outer-border"
                v-show="isOuterBorder"
              >
                <el-button
                  size="small"
                  style="width:60px;position: absolute;bottom:10px;left:17px;"
                  type="primary"
                  class="btncolor"
                  @click="diySearch"
                >确定</el-button>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span='8'>
        <div class="blocktime">
          <span class="demonstration">申请时间</span>
          <el-date-picker
            v-model="form.date"
            style="width:250px"
            format="yyyy-MM-dd"
            size="small"
            prefix-icon="el-icon-date"
            type="daterange"
            @change='page=1;form.documentno="";getlists()'
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
            >
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span='24'>
        <div class="blocktime">
          <span class="demonstration">案件状态</span>
          <filter-tag
            :current='form.status'
            @on-change='changeStatus'
            :tags="status"
          ></filter-tag>
        </div>
      </el-col>

    </el-row>
    <el-table
      :data='lists'
      stripe
      v-loading='listLoading'
      class="tablelist custom-card-grid"
    >
      <el-table-column
        width='153'
        label="申请编号"
      >
        <template slot-scope='scope'>
          <span
            class='linkurl underline'
            style="margin-left:0"
            @click="view(scope)"
          >{{scope.row.cacontractno}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width='88'
        label="客户姓名"
        prop="cacontractborrowername"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        width='90'
        label="申请时间"
        prop="cdate"
        :formatter="formateCdate"
      ></el-table-column>
      <el-table-column
        width='98'
        label="延期天数"
        prop="days"
        align='right'
      ></el-table-column>
      <el-table-column
        width='88'
        label="累计天数"
        prop="totaldays"
        align='right'
      ></el-table-column>
      <el-table-column
        width='96'
        label="案件状态"
        prop="refData.statusname"
        align='center'
      >
        <template slot-scope='scope'>
          <span
            v-if="scope.row.status==1"
            style="background-color:#E3E3E3;width:36px;height:22px;display:inline-block;color:#666;text-align:center;border-radius:3px"
          >{{scope.row.refData.statusname}}</span>
          <span
            v-else
            style="text-align:center;width:36px;height:22px;display:inline-block;color:#606266;"
          >{{scope.row.refData.statusname}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width='287'
        label="延期原因"
        show-overflow-tooltip
        prop="reason"
        class-name="desc"
      ></el-table-column>
      <el-table-column
        width='200'
        label="拒绝理由"
        show-overflow-tooltip
        prop="refusereason"
        :formatter="formateReason"
        class-name="desc"
      ></el-table-column>
      <el-table-column
        width='100'
        align='center'
        label="操作"
      >
        <template slot-scope='scope'>
          <span
            v-if="scope.row.status == 1"
            class='linkurl'
            @click="del(scope)"
          >删除</span>
        </template>
      </el-table-column>
    </el-table>
    <el-col
      :span='24'
      style="text-align:right"
      class='toolbar'
      v-if="showPageBar"
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
import {
  apiCommonDeal,
  objectOnly,
  objectExcept,
  collectReplace
} from "@/utils/index";
import { getDelayList, delDelay } from "@/api/afterloan";
import Cookies from "js-cookie";
import { getApplicationNo2 } from "@/api/credit";
import filterTag from "@/components/FilterTag/filtertag";
var userid = Cookies.get("userId");
export default {
  components: {
    filterTag
  },
  data() {
    return {
      status: [],
      form: {
        documentno: "",
        status: "",
        date: [],
        delayday: "", //延期天数
        delaydiy: "" //自定义天数 不提交表单
      },
      day_item: -1, // 延期天数 0=>3天 1=>一周 2=>一个月 3=>自定义
      day_show: false, // 延期天数是否展示
      lists: [],
      total: 1,
      pagesize: 10,
      page: 1,
      listLoading: false,
      isOuterBorder: false,
      outerTimer: null
    };
  },
  mounted() {
    this.getFilter();
    this.getlists();
  },
  methods: {
    changeStatus(tag) {
      this.form.status = tag.code;
      this.page = 1;
      this.form.documentno = "";
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
    getlists() {
      let para = {
        PageIndex: this.page,
        PageSize: this.pagesize,
        startappdate:
          this.form.date && this.form.date.length
            ? Moment(this.form.date[0]).format("YYYY-MM-DD ") + "00:00:00"
            : "",
        endappdate:
          this.form.date && this.form.date.length
            ? Moment(this.form.date[1]).format("YYYY-MM-DD ") + "23:59:59"
            : "",
        status: this.form.status,
        key: this.form.documentno,
        days: this.form.delayday
      };
      this.listLoading = true;
      getDelayList(para).then(res => {
        apiCommonDeal.call(this, res, data => {
          this.lists = data.data;
          this.total = data.recordsTotal;
        });
        this.listLoading = false;
      });
    },
    SearchList() {
      this.form.documentno = "";
      this.page = 1;
      this.getlists();
    },
    querySearchAsync(queryString, cb) {
      var results = [];
      //节流防止多次提交，减轻服务器压力
      clearTimeout(this.timer);
      if (this.noLength) {
        this.timer = setTimeout(function() {
          getApplicationNo2(queryString).then(res => {
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
    searchname() {
      this.page = 1;
      this.getlists();
    },
    diySearch() {
      if (this.form.delaydiy) {
        this.day_item = 3;
        this.form.delayday = this.form.delaydiy;
        this.getlists();
      }
    },
    changeDiy() {
      //this.day_item = 3;
    },
    mouseEnter() {
      clearTimeout(this.outerTimer);
      this.outerTimer = setTimeout(() => {
        this.isOuterBorder = true;
        setTimeout(() => {
          this.$refs.diyday.focus();
        }, 0);
      }, 100);
    },
    mouseLeave() {
      clearTimeout(this.outerTimer);
      this.isOuterBorder = false;
      setTimeout(() => {
        this.$refs.diyday.blur();
      }, 0);
    },
    clearNormalFilter() {
      let isDefault = true;
      if (
        (this.form.date && this.form.date.length != 0) ||
        this.form.status !== "" ||
        this.day_item != -1
      ) {
        isDefault = false;
      }
      this.form.date = "";
      this.form.status = "";
      this.form.delayday = "";
      this.form.delaydiy = "";
      this.day_item = -1;
      if (!isDefault) {
        this.page = 1;
        this.getlists();
      }
    },
    handleSelect(item) {
      this.form.documentno = item.applicationno;
      this.searchname();
    },
    // 获取筛选项
    getFilter() {
      var status = JSON.parse(localStorage.getItem("CodeSource"))[
        "00001HL1CKRF40000AA1"
      ].filter(item => {
        return item.code != 2;
      });
      status.unshift({ code: "", name: "全部" });
      this.status = status;
    },
    // 查看
    view(item) {
      let id = item.row.id;
      if (item.row.status == 1) {
        this.$router.push({
          path: "/dealer/afterloan/delayedit/" + id
        });
      } else {
        this.$router.push({
          path: "/dealer/afterloan/delaydetail/" + id
        });
      }
    },
    // 编辑
    edit(item) {
      let id = item.row.id;
      this.$router.push({
        path: "/dealer/afterloan/delayedit/" + id
      });
    },
    // 删除
    del(item) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = item.row.id;
          delDelay(id).then(res => {
            apiCommonDeal.call(this, res, data => {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getlists();
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编号、姓名搜索
    searchname() {
      this.page = 1;
      this.getlists();
    },
    //展开
    slideDown() {
      this.day_show = !this.day_show;
    },
    // 重置
    formreset() {
      this.form = this.$options.data().form;
      this.day_item = -1;
    },
    choseDay(item) {
      this.day_item = item;
      switch (item) {
        case -1:
          this.form.delayday = "";
          break;
        case 0:
          this.form.delayday = 3;
          break;
        case 1:
          this.form.delayday = 7;
          break;
        case 2:
          this.form.delayday = 30;
          break;
        case 3:
          setTimeout(() => {
            this.$refs.diyday.focus();
          }, 0);
          this.form.delayday = this.form.delaydiy;
          break;
      }
      // 全部、3天、一周、一个月点击后进行搜索
      if ([-1, 0, 1, 2].includes(item)) {
        this.page = 1;
        this.form.documentno = "";
        this.form.delaydiy = "";
        this.getlists();
      }
    },
    close(item) {
      this.day_item = -1;
      this.form.delayday = "";
      this.form.delaydiy = "";
      this.getlists();
    },
    formateReason(row, column) {
      var data = row[column.property];
      return data ? data : "--";
    },
    formateCdate(row, column) {
      var data = row[column.property];
      return Moment(data).format("YYYY-MM-DD ");
    }
  },
  computed: {
    showPageBar: function() {
      return !!this.total;
    },
    // 计算搜索内容长度 中文一个字 非中文两个字才出发搜索
    noLength: function() {
      var len = 0;
      var applicationNo = this.form.documentno;
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
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.day_item /deep/ input::-webkit-outer-spin-button,
.day_item /deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
.day_item /deep/ .el-input__inner {
  padding-left: 10px;
  padding-right: 25px;
}
.day_item /deep/ .el-input__suffix {
  right: 8px;
}
.tablelist /deep/ .el-table__row td div.cell {
  line-height: 24px;
}
.day_item /deep/ input {
  -moz-appearance: textfield;
}

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
.topmiddle {
  line-height: 60px;
  padding-right: 8px;
}
.blocktime_middle {
  margin-left: 48px;
}
.blocktime_right {
  margin-left: 48px;
}
.demonstration {
}
.desc {
  div {
    color: #f00 !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.slide_div {
  display: inline-block;
  width: 50px;
  margin-left: 8px;
  cursor: pointer;
}
.slideup {
  position: relative;
  color: #1890ff;
  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border: #1890ff solid;
    border-width: 1px 1px 0 0;
    transform: rotate(135deg);
    margin-bottom: 10px;
    position: absolute;
    top: 3px;
    left: 30px;
    transition: all 0.2s;
  }
}
.slidedown {
  position: relative;
  color: #1890ff;
  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border: #1890ff solid;
    border-width: 1px 1px 0 0;
    transform: rotate(-45deg);
    margin-bottom: 10px;
    position: absolute;
    top: 7px;
    left: 30px;
    transition: all 0.2s;
  }
}
.day {
  display: inline-block;
  .day_item {
    height: 30px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    color: #333;
    padding: 0px 12px;
    margin-right: 3px;
    line-height: 30px;
    transition: background 0.5s;
    &:last-child {
      padding-left: 5px;
    }
    &:not(.day_item_diy):hover {
      color: #333;
      background: #e3e3e3;
    }
    .close {
      display: none;
    }
  }
  .day_active {
    background: #fff;
    border-radius: 2px;
    color: #507acd;
    font-weight: 700;
    position: relative;
  }
  .day_active:hover {
    background: #e3e3e3;
    border-radius: 2px;
    color: #507acd;
    position: relative;
  }
  .day_active .close {
    display: block;
    position: absolute;
    top: -10px;
    right: -8px;
    color: #fff;
    background-color: #f56c6c;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    line-height: 16px;
    font-size: 12px;
    text-align: center;
    font-style: unset;
    font-weight: 700;
    cursor: pointer;
  }
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
.outer-border {
  width: 100px;
  height: 90px;
  position: absolute;
  left: -12px;
  top: -9px;
  border: 1px solid #ccc;
  z-index: 99;
  background: #fff;
}
</style>

