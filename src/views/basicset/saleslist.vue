<template>
  <section>
    <div class='app-container' style="margin-top:5px;position:relative;">
      <el-row>
        <el-col :span="18">

          <el-breadcrumb
            separator="/"
            class="app-breadcrumb"
          >
            <el-breadcrumb-item class='firstbread'>基础设置</el-breadcrumb-item>
            <el-breadcrumb-item>销售顾问管理</el-breadcrumb-item>
          </el-breadcrumb>

        </el-col>
        <el-col
          :span="2"
          style="margin:3px 0 8px 0;text-align:right;padding-right:8px"
        >
          <el-button
            size="small"
            type="success"
            class="btncolor"
            @click="donew"
          >新增</el-button>
        </el-col>
        <el-col
          :span="4"
          class="topsearch"
        >
          <el-input
            placeholder=""
            class="searchinput"
            size="small"
            v-model="name"
            @keyup.enter.native="searchname"
          >
            <i
              slot="suffix"
              @click="searchname"
              style="cursor:pointer"
              class="el-icon-search"
            ></i>
          </el-input>

        </el-col>

      </el-row>

      <!--列表-->
      <el-table
        :data='lists'
        highlight-current-row
        v-loading='listLoading'
        class="tablelist"
        style="min-height:440px"
        stripe
      >

        <el-table-column
          :formatter="dateFormat"
          align='left'
          :prop='col.field'
          :label='col.title'
          v-for='(col, index) in cols'
          :key='index'
        >
        </el-table-column>
        <el-table-column
          label='操作'
          align='left'
          width='200'
        >
          <template slot-scope='scope'>
            <span
              class='linkurl'
              style="margin:0px"
              @click="edit(scope)"
            >编辑</span>

            <span
              class='linkurl'
              @click="dellist(scope)"
            >删除</span>
          </template>
        </el-table-column>

      </el-table>

      <!--工具条-->
      <el-col
        v-if="!!total"
        :span='24'
        style="text-align:right"
        class='toolbar'
      >

        <Page
          :current="page"
          :total="total"
          @on-change="handleCurrentChange"
          @on-page-size-change="handleSizeChange"
          show-sizer
          show-total
        ></Page>
      </el-col>

    </div>
    <el-dialog
      :title="titlezi"
      :visible.sync="dialogFormVisible"
      center
      width="800px"
      class="add-saleslist"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
      >

        <el-form-item
          label="销售顾问"
          prop="name"
          :label-width="formLabelWidth"
          size="small"
        >
          <el-input
            v-model="form.name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="销售顾问电话"
          prop="phone"
          :label-width="formLabelWidth"
          size="small"
        >
          <el-input
            v-model="form.phone"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="启用状态"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.isActive"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="cancelButton('form')"
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="submitform('form')"
          :disabled="btndisable"
        >确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getsalelist, addsale, upsale, deletesale } from "@/api/basic";
import btnadd from "@/assets/images/btn_add.png";

export default {
  data() {
    return {
      btndisable: false,
      titlezi: "新增销售顾问",
      btnadd,
      id: this.$route.params.id,
      name: "",
      lists: [],
      cols: [
        { title: "销售顾问", field: "name" },
        { title: "销售顾问电话", field: "phone" },
        { title: "启用状态", field: "isActive" }
      ],
      options: [
        {
          value: "1",
          label: "启用"
        },
        {
          value: "0",
          label: "停用"
        }
      ],
      total: 0,
      pagesize: 10,
      page: 1,
      listLoading: false,
      dialogFormVisible: false,
      formLabelWidth: "110px",
      form: {
        id: "",
        name: "",
        phone: "",
        isActive: ""
      },
      rules: {
        name: [{ required: true, message: "请输入销售顾问", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }]
      }
    };
  },
  methods: {
    donew() {
      this.dialogFormVisible = true;
      this.titlezi = "新增销售顾问";
    },
    cancelButton(form) {
      this.form = {
        id: "",
        name: "",
        phone: "",
        isActive: ""
      };
      this.getlists();
      this.dialogFormVisible = false;
    },
    dateFormat(row, column) {
      var data = row[column.property];
      if (column.label === "启用状态") {
        if (data === "1") {
          return "启用";
        } else {
          return "停用";
        }
      } else {
        return data;
      }
    },
    searchname() {
      this.getlists();
    },
    dellist(scope) {
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
          deletesale(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getlists();
            } else {
              this.$message({
                type: "error",
                message: "添加失败，请联系管理员"
              });
              this.getlists();
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
    edit(scope) {
      this.titlezi = "编辑销售顾问";
      console.log(scope.row);
      this.form = scope.row;
      this.dialogFormVisible = true;
    },
    submitform(formname) {
      this.$refs[formname].validate(valid => {
        let para = {};
        para = this.form;
        if (valid) {
          this.btndisable = true;
          if (this.form.id) {
            upsale(para).then(res => {
              this.btndisable = false;
              if (res.data.success) {
                this.$message({
                  type: "success",
                  message: "更新成功！"
                });
                this.getlists();
                this.$refs["form"].resetFields();
                this.dialogFormVisible = false;
              } else {
                this.$message({
                  type: "error",
                  message: "添加失败，请联系管理员"
                });
              }
            });
          } else {
            addsale(para).then(res => {
              this.btndisable = false;
              if (res.data.success) {
                this.$message({
                  type: "success",
                  message: "添加成功！"
                });
                this.getlists();
                this.$refs["form"].resetFields();
                this.dialogFormVisible = false;
              } else {
                this.$message({
                  type: "error",
                  message: "添加失败，请联系管理员"
                });
                this.getlists();
              }
            });
          }
        } else {
          console.log("验证未通过，请填写完整!!");
          return false;
        }
      });
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
      let para = {};
      para = {
        name: this.name,
        PageIndex: this.page,
        pageSize: this.pagesize
      };
      this.listLoading = true;

      getsalelist(para).then(res => {
        if (res.data.success) {
          this.total = res.data.data.recordsTotal;
          this.lists = res.data.data.data;
          this.cols = this.cols;
        } else {
          this.lists = [];
          this.cols = this.cols;
        }
        this.listLoading = false;
      });
    }
  },
  mounted() {
    this.getlists();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
.add-saleslist /deep/ .el-dialog__body {
  padding-bottom: 0px;
}
.add-saleslist /deep/ .el-dialog__footer {
  padding-bottom: 24px;
}
.app-container /deep/ .app-breadcrumb.el-breadcrumb {
  line-height: 52px;
  height: 37px;
}
.topsearch {
  margin-top: 3px;
  height: 30px;
  line-height: 30px;
}
</style>

