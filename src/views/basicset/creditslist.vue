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
            <el-breadcrumb-item>信贷专员管理</el-breadcrumb-item>
          </el-breadcrumb>

        </el-col>
        <el-col
          :span="2"
          style="margin:3px 0 8px;text-align:right;padding-right:8px"
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
        stripe
      >

        <el-table-column
          align='left'
          prop='name'
          label='信贷专员'
        >
        </el-table-column>
        <el-table-column
          align='left'
          prop='phone'
          label='信贷专员电话'
        >
        </el-table-column>
        <el-table-column
          align='left'
          :formatter="dateFormat"
          prop='isActive'
          label='启用状态'
        >
        </el-table-column>
        <el-table-column
          align='left'
          prop='refData.statusname'
          label='审批状态'
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
      class="add-credit"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
      >

        <el-form-item
          label="信贷专员"
          prop="name"
          size="small"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系电话"
          prop="phone"
          size="small"
          :label-width="formLabelWidth"
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
            disabled="disabled"
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
        <el-form-item
          label="身份证上传"
          class="is-required"
          :label-width="formLabelWidth"
        >
          <div style="border:1px solid #DBDFE6;height:300px">
            <div style="padding-top:11px;padding-left:13px;float:left">
              <el-upload
                class="avatar-uploader"
                style="border: 2px dashed #e8e8e8;width:120px;height:120px"
                :headers="uploadHeader"
                :action="acitonUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-error="handleError"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  :src="imageUrl"
                  class="imagePost"
                  style="width:120px;height:120px"
                  v-show="imageUrl !=''"
                >
                <i
                  class="el-icon-plus avatar-uploader-icon"
                  v-show="imageUrl ==''"
                ></i>
              </el-upload>
            </div>

            <div style="float:left;padding-top:11px;padding-left:78px">
              <div style="color:#666666;font-size:14px;font-weight:bold;padding-right:37px;float:left;">最佳拍摄示意</div>
              <img
                :src="group2"
                alt=""
              >
            </div>
            <div style="clear:both;border-top:1px solid #DBDFE6;padding-top:30px;">
              <div style="margin-left:4px;float:left">
                <img
                  :src="group3"
                  style="border: 2px dashed #e8e8e8;"
                >
                <div style="margin-top:-17px;margin-left:16px">
                  <img
                    :src="group1"
                    style="vertical-align:middle"
                  >
                  <span>不要倾斜拍摄</span>

                </div>
              </div>
              <div style="margin-left:16px;float:left">
                <img
                  :src="group4"
                  style="border: 2px dashed #e8e8e8;"
                >
                <div style="margin-top:-17px;margin-left:16px">
                  <img
                    :src="group1"
                    style="vertical-align:middle"
                  >
                  <span>不要离摄像头太远</span>

                </div>
              </div>
              <div style="margin-left:16px;float:left">
                <img
                  :src="group5"
                  style="border: 2px dashed #e8e8e8;"
                >
                <div style="margin-top:-17px;margin-left:16px">
                  <img
                    :src="group1"
                    style="vertical-align:middle"
                  >
                  <span>不要超出屏幕</span>

                </div>
              </div>
              <div style="margin-left:16px;float:left">
                <img
                  :src="group6"
                  style="border: 2px dashed #e8e8e8;"
                >
                <div style="margin-top:-17px;margin-left:16px">
                  <img
                    :src="group1"
                    style="vertical-align:middle"
                  >
                  <span>不要有倾角</span>

                </div>
              </div>
            </div>
          </div>

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
          size="small"
          type="primary"
          @click="submitform('form')"
          :disabled="btndisable"
        >确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getcreditlist, addcredit, upcredit, deletecredit } from "@/api/basic";
import { getToken } from "@/utils/auth";
import btnadd from "@/assets/images/btn_add.png";
import group1 from "@/assets/images/group1.png";
import group2 from "@/assets/images/group2.png";
import group3 from "@/assets/images/group3.png";
import group4 from "@/assets/images/group4.png";
import group5 from "@/assets/images/group5.png";
import group6 from "@/assets/images/group6.png";

export default {
  data() {
    return {
      imageUrl: "",
      template: "",
      uploadHeader: {
        Authorization: "Bearer " + getToken()
      },
      acitonUrl:
        window.g.ApiUrl + "S120017/upload/?Md5=&sceneid=1100310001&randomstr=",
      btndisable: false,
      titlezi: "新增信贷专员",
      group1,
      group2,
      group3,
      group4,
      group5,
      group6,
      id: this.$route.params.id,
      name: "",
      lists: [],
      cols: [
        { title: "信贷专员", field: "name" },
        { title: "信贷专员电话", field: "phone" },
        { title: "启用状态", field: "isActive" },
        { title: "审批状态", field: "refData.statusname" }
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
        isActive: "0",
        mD5: ""
      },
      rules: {
        name: [{ required: true, message: "请输入信贷专员", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }]
      }
    };
  },
  methods: {
    donew() {
      this.imageUrl = "";
      this.form = {
        id: "",
        name: "",
        phone: "",
        isActive: "0",
        mD5: ""
      };
      this.dialogFormVisible = true;
      this.titlezi = "新增信贷专员";
    },
    cancelButton(form) {
      //this.$refs[form].resetFields()
      this.dialogFormVisible = false;
      this.form = {
        id: "",
        name: "",
        phone: "",
        isActive: "",
        mD5: ""
      };
      this.getlists();
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
    handleChange(value) {
      console.log(CodeToText[value[0]]);
      console.log(CodeToText[value[1]]);
      console.log(CodeToText[value[2]]);
    },
    handleAvatarSuccess(res, file) {
      var i = this.inx;
      console.log(i);
      this.form.mD5 = res.data.md5;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {},
    handleError(response, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败，请联系管理员"
      });
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
          deletecredit(para).then(res => {
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
    edit(scope) {
      this.titlezi = "编辑信贷专员";
      console.log(scope.row);
      this.form = scope.row;
      if (scope.row.mD5) {
        this.imageUrl = window.g.ApiUrl + "S120017/download?md5=" + scope.row.mD5;
      } else {
        this.imageUrl = "";
      }

      this.dialogFormVisible = true;
    },
    submitform(formname) {
      this.$refs[formname].validate(valid => {
        let para = {};
        para = this.form;
        if (valid) {
          this.btndisable = true;
          if (this.form.id) {
            upcredit(para).then(res => {
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
                  message: res.data.message
                });
                this.getlists();
              }
            });
          } else {
            addcredit(para).then(res => {
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
                  message: res.data.message
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

      getcreditlist(para).then(res => {
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
.tablelist /deep/ .el-table__row td div.cell {
  line-height: 24px;
}
.imagePost {
  width: 120px;
  height: 120px;
}
.avatar-uploader {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 115px;
  text-align: center;
}
.add-credit /deep/ .el-dialog__body {
  padding-bottom: 0px;
}
.add-credit /deep/ .el-dialog__footer {
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

