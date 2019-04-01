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
            <el-breadcrumb-item>评估师</el-breadcrumb-item>
          </el-breadcrumb>

        </el-col>
        <el-col
          :span="2"
          style="margin: 3px 0 8px;text-align:right;padding-right:8px"
        >
          <el-button
            size="small"
            type="success"
            class="btncolor"
            @click="addNew"
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
      :title="title"
      :visible.sync="dialogFormVisible"
      center
      width="800px"
      class="add-appraiser"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
      >

        <el-form-item
          label="评估师"
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
          label="评估师证件"
          prop="mD5"
          :label-width="formLabelWidth"
        >
          <el-col :span='7'>
            <el-upload
              style="border: 1px solid #e8e8e8;"
              class="avatar-uploader"
              :headers="uploadHeader"
              :action="uploadaction"
              :show-file-list="false"
              :on-success="hadleSuccess"
              :on-error="handleError"
              :file-list="fileList"
            >
              <div style="width:120px;height:120px"  v-if="imgtu !=''">
              <img
                :src="imgtu"
                class="imagePost"
                alt=""
              >
               </div>
              <i
                class="el-icon-plus avatar-uploader-icon"
                v-else
              ></i>
            </el-upload>
          </el-col>
          <el-col :span='24'>
            <span style="font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #999;">支持的文件类型：.jpg .bmp .jpeg .png .gif</span>
          </el-col>
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
import { getToken } from "@/utils/auth";
import { getImg } from "@/api/credit";
import { getApplist, addAppraiser, upappraiser, deleteApp } from "@/api/basic";
import btnadd from "@/assets/images/btn_add.png";

export default {
  data() {
    return {
      btndisable: false,
      imgtu: "",
      title: "新增评估师",
      fileList: [],
      uploadHeader: {
        Authorization: "Bearer " + getToken()
      },
      uploadaction:
        window.g.ApiUrl + "S120017/upload?Md5=&sceneid=1200170003&randomstr=",
      btnadd,
      id: this.$route.params.id,
      name: "",
      lists: [],
      cols: [
        { title: "评估师", field: "name" },
        { title: "评估师电话", field: "phone" }
        // { title: '评估师证件', field: 'mD5' }
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
        name: "",
        phone: "",
        mD5: ""
      },
      rules: {
        name: [{ required: true, message: "请输入信贷专员", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        mD5: [{ required: true, message: "请上传图片", trigger: "change" }]
      }
    };
  },
  methods: {
    cancelButton(form) {
      this.getlists();
      this.dialogFormVisible = false;
    },
    hadleSuccess(response, file, fileList) {
      this.form.mD5 = "";
      this.form.mD5 = response.data.md5;
      this.imgtu = URL.createObjectURL(file.raw);
      console.log(this.form.mD5);
      this.$message({
        type: "success",
        message: "上传成功"
      });
    },
    handleError(response, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败，请联系管理员"
      });
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
      var para = scope.row.id;
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteApp(para).then(res => {
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
    addNew() {
      this.title = "新增评估师";
      this.form = {};
      this.fileList = [];
      this.imgtu = "";
      this.dialogFormVisible = true;
    },
    edit(scope) {
      this.title = "更新评估师";
      this.imgtu = "";
      this.form = scope.row;
      this.imgtu = window.g.ApiUrl + "S120017/download?md5=" + scope.row.mD5;
      // this.fileList = []
      // this.fileList.push({ name: scope.row.md5 })
      this.dialogFormVisible = true;
    },
    submitform(formname) {
      console.log(this.form);
      this.$refs[formname].validate(valid => {
        let para = {};
        para = this.form;
        if (valid) {
          this.btndisable = true;
          if (this.form.id) {
            upappraiser(para).then(res => {
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
            addAppraiser(para).then(res => {
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

      getApplist(para).then(res => {
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
.add-appraiser /deep/ .el-dialog__body {
  padding-bottom: 0px;
}
.add-appraiser /deep/ .el-dialog__footer {
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

