<template>
  <section>
    <el-row>
      <el-col :span='18'>
        <el-breadcrumb
          separator='/'
          class='app-breadcrumb'
        >
          <el-breadcrumb-item class='firstbread'>证件邮寄</el-breadcrumb-item>
          <el-breadcrumb-item>证件邮寄</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="midcontent">
      <el-col
        :span="22"
        :offset="1"
      >
        <el-form
          size="medium"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-position='right'
          label-width="124px"
        >
          <div class="formtitle">
            <span>证件信息</span>
          </div>
          <el-card>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="证件名称"
                  prop="documentid"
                >
                  <el-select
                    :disabled="normalDisable"
                    size="small"
                    v-model="ruleForm.documentid"
                    filterable
                    placeholder="请选择"
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
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="证件状态"
                  prop="documentstatus"
                >
                  <el-select
                    :disabled="normalDisable"
                    size="small"
                    v-model="ruleForm.documentstatus"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="cardStatus in documentstatues"
                      :key="cardStatus.code"
                      :label="cardStatus.name"
                      :value="cardStatus.code"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="证件上传">
                  <el-upload
                    class="avatar-uploader"
                    :headers="uploadHeader"
                    :action="acitonUrl"
                    :disabled="normalDisable"
                    :show-file-list="false"
                    :on-success="uploadCardFile"
                    :on-error="handleError"
                    :before-upload="checkUpload"
                  >
                    <img
                      v-if="cardUrl || normalDisable"
                      :src="cardUrl"
                      class="avatar"
                    >
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                    ></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>

          <div class="formtitle">
            <span>寄出信息</span>
          </div>
          <el-card>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="寄出城市"
                  prop="sendCity"
                >
                  <el-cascader
                    :disabled="isDisable"
                    size="small"
                    :options="citys"
                    v-model="ruleForm.sendCity"
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="寄出经销商"
                  prop="senddealerid"
                >
                  <el-select
                    :disabled="isDisable"
                    size="small"
                    v-model="ruleForm.senddealerid"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="j in sendJxs"
                      :key="j.ID"
                      :label="j.SPNAME"
                      :value="j.ID"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="联络人"
                  prop="sendperson"
                >
                  <el-input
                    :disabled="normalDisable"
                    size="small"
                    v-model="ruleForm.sendperson"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="手机号"
                  prop="sendphone"
                >
                  <el-input
                    :disabled="normalDisable"
                    size="small"
                    v-model="ruleForm.sendphone"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <div class="formtitle">
            <span>接收信息</span>
          </div>
          <el-card>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="接收城市"
                  prop="receiveCity"
                >
                  <el-cascader
                    :disabled="normalDisable"
                    size="small"
                    :options="citys"
                    v-model="ruleForm.receiveCity"
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="接收经销商"
                  prop="receivedealerid"
                >
                  <el-select
                    :disabled="normalDisable"
                    size="small"
                    v-model="ruleForm.receivedealerid"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="j in receiveJxs"
                      :key="j.ID"
                      :label="j.SPNAME"
                      :value="j.ID"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="联络人"
                  prop="receiveperson"
                >
                  <el-input
                    :disabled="normalDisable"
                    size="small"
                    v-model="ruleForm.receiveperson"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="手机号"
                  prop="receivephone"
                >
                  <el-input
                    :disabled="normalDisable"
                    size="small"
                    v-model="ruleForm.receivephone"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <div class="formtitle">
            <span>快递信息</span>
          </div>
          <el-card>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="快递公司"
                  prop="mailcompany"
                >
                  <el-select
                    :disabled="normalDisable"
                    size="small"
                    v-model="ruleForm.mailcompany"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="com in expressCom"
                      :key="com.code"
                      :label="com.name"
                      :value="com.code"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="快递单号"
                  prop="mailno"
                >
                  <el-input
                    :disabled="normalDisable"
                    size="small"
                    v-model="ruleForm.mailno"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="寄出日期"
                  prop="maildate"
                >
                  <el-date-picker
                    :disabled="normalDisable"
                    v-model="ruleForm.maildate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择寄出日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="快递单上传">
                  <el-upload
                    class="avatar-uploader"
                    :headers="uploadHeader"
                    :action="acitonUrl"
                    :disabled="normalDisable"
                    :show-file-list="false"
                    :on-success="uploadExpressFile"
                    :before-upload="checkUpload"
                  >
                    <img
                      v-if="expressUrl || normalDisable"
                      :src="expressUrl"
                      class="avatar"
                    >
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                    ></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <div
            v-if="receiveShow"
            class="formtitle"
          >
            <span>接收证件</span>
          </div>
          <el-card v-if="receiveShow">
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="证件状态"
                  prop="recstatus"
                >
                  <el-select
                    size="small"
                    :disabled="receiveDisable"
                    v-model="ruleForm.recstatus"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="cardStatus in documentstatues"
                      :key="cardStatus.code"
                      :label="cardStatus.name"
                      :value="cardStatus.code"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="接收证件照片上传">
                  <el-upload
                    class="avatar-uploader"
                    :headers="uploadHeader"
                    :action="acitonUrl"
                    :disabled="receiveDisable"
                    :show-file-list="false"
                    :on-success="uploadRecFile"
                    :before-upload="checkUpload"
                  >
                    <img
                      v-if="recUrl"
                      :src="recUrl"
                      class="avatar"
                    >
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                    ></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
        <div
          v-if="!normalDisable || !receiveDisable"
          style='text-align:center;margin:15px 0'
        >
          <el-button
            v-if="!normalDisable"
            type='primary'
            size='mini'
            @click="zcCard"
            :loading="isLoading"
          >暂 存</el-button>
          <el-button
            type='primary'
            size='mini'
            @click="submitCard"
            :loading="isLoading"
          >提 交</el-button>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import Moment from "moment/moment";
import { getToken } from "@/utils/auth";
import {
  cardList,
  jsxList,
  sendCard,
  receiveCard,
  cardDetail,
  commonStatus,
  commonDeal,
  jxsName,
  getMailSpinfo
} from "@/api/card";
import Cookies from "js-cookie";
import { provinceAndCityData } from "element-china-area-data";
const FILE_URL = window.g.ApiUrl + "S120017/download?md5=";
var userid = Cookies.get("userId");
// var userid = "sccdjc2";
export default {
  data() {
    return {
      uploadHeader: {
        Authorization: "Bearer " + getToken()
      },
      acitonUrl:
        window.g.ApiUrl + "S120017/upload/?Md5=&sceneid=1100310001&randomstr=",
      normalDisable: false, // 基本信息是否修改
      receiveShow: false, // 接收部分是否展示
      receiveDisable: true, // 接收部分能否修改
      editCard: false, // 暂存
      firstLoad: false, // 是否第一次加载
      cardId: "", // 邮寄详情和发送邮寄的ID
      isLoading: false,
      isDisable: false, //寄出经销商是否允许编辑
      focus: "card", //错误后自动聚焦到元素
      cards: [],
      documentstatues: [],
      sendJxs: [],
      receiveJxs: [],
      jxs: [],
      citys: provinceAndCityData,
      cardUrl: "",
      expressUrl: "",
      expressCom: [],
      recUrl: "",
      ruleForm: {
        userid: userid,
        documentid: "", // 证件名称
        documentstatus: "", // 证件状态
        documentimage: "", // 证件附件
        documentimagename: "", // 证件附件名
        sendprovince: "",
        sendcity: "",
        sendCity: [], // 寄出城市
        senddealerid: "", // 寄出经销商
        sendperson: "", // 联络人
        sendphone: "", // 手机号
        receiveprovince: "",
        receivecity: "",
        receiveCity: [], // 接收城市
        receivedealerid: "", // 接收经销商
        receiveperson: "", // 接收人
        receivephone: "", // 手机号
        mailcompany: "", // 快递公司
        mailno: "", // 快递单号
        maildate: "", // 寄出日期
        mailimage: "", // 快递单文件
        mailimagename: "", // 快递单文件名
        recstatus: "", // 证件状态
        receiveimage: "", // 照片
        filename: "", // 照片文件名
        mailstatus: "" // 状态 -1草稿 0待接收 1已接收
      },
      rules: {
        documentid: [
          { required: true, message: "请选择证件", trigger: "change" }
        ],
        documentstatus: [
          { required: true, message: "请选择证件状态", trigger: "change" }
        ],
        sendCity: [
          { required: true, message: "请选择寄出城市", trigger: "change" }
        ],
        senddealerid: [
          { required: true, message: "请选择经销商", trigger: "change" }
        ],
        sendperson: [
          { required: true, message: "请输入联络人", trigger: "change" }
        ],
        sendphone: [
          { required: true, message: "请输入手机号", trigger: "change" }
        ],
        receiveCity: [
          { required: true, message: "请选择接收城市", trigger: "change" }
        ],
        receivedealerid: [
          { required: true, message: "请选择接收经销商", trigger: "change" }
        ],
        receiveperson: [
          { required: true, message: "请选择联络人", trigger: "change" }
        ],
        receivephone: [
          { required: true, message: "请输入手机号", trigger: "change" }
        ],
        mailcompany: [
          { required: true, message: "请输入快递公司", trigger: "change" }
        ],
        mailno: [
          { required: true, message: "请输入快递单号", trigger: "change" }
        ],
        maildate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        recstatus: [
          { required: true, message: "请选择证件状态", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    comSendCity: function() {
      return this.ruleForm.sendCity;
    },
    comReceiveCity: function() {
      return this.ruleForm.receiveCity;
    }
  },
  watch: {
    comSendCity(newCity, oldCity) {
      if (!this.normalDisable && !this.editCard) {
        this.ruleForm.senddealerid = "";
      }
      this.ruleForm.sendprovince = newCity[0];
      this.ruleForm.sendcity = newCity[1];
      this.choseJxsByCity(newCity, res => {
        this.sendJxs = res.data.data;
      });
    },
    comReceiveCity(newCity, oldCity) {
      if (!this.normalDisable && (!this.editCard || this.firstLoad)) {
        this.ruleForm.receivedealerid = "";
      } else {
        this.firstLoad = true;
      }
      this.ruleForm.receiveprovince = newCity[0];
      this.ruleForm.receivecity = newCity[1];
      this.choseJxsByCity(newCity, res => {
        this.receiveJxs = res.data.data;
      });
    }
  },
  methods: {
    // 上传证件
    uploadCardFile(res, file) {
      this.ruleForm.documentimage = res.data.md5;
      this.cardUrl = URL.createObjectURL(file.raw);
      this.ruleForm.documentimagename = file.raw.name;
    },
    // 上传快递单
    uploadExpressFile(res, file) {
      this.ruleForm.mailimage = res.data.md5;
      this.expressUrl = URL.createObjectURL(file.raw);
      this.ruleForm.mailimagename = file.raw.name;
    },
    // 接收证件照片
    uploadRecFile(res, file) {
      this.ruleForm.receiveimage = res.data.md5;
      this.recUrl = URL.createObjectURL(file.raw);
      this.ruleForm.filename = file.raw.name;
    },
    handleError(response, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败，请联系管理员"
      });
    },
    // 检查上传格式及大小
    checkUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message({
          type: "error",
          message: "只能上传JPG格式!"
        });
      }
      if (!isLt2M) {
        this.$message({
          type: "error",
          message: "文件大小不能超过20MB!"
        });
      }
      return isJPG && isLt2M;
    },
    choseJxsByCity: function(newCity, callBack) {
      let province = newCity[0],
        city = newCity[1];
      let para = {
        userid: userid,
        provincecode: province,
        citycode: city,
        countycode: ""
      };
      jsxList(para).then(res => {
        callBack(res);
      });
    },
    // 获取下拉列表
    loadSelect() {
      cardList().then(res => {
        this.cards = res.data.data;
      });
      commonStatus("00001M1RH6RYT0000A1A").then(res => {
        let statuss = res.data.data;
        this.documentstatues = statuss;
        statuss.sort(function(pre, sub) {
          return sub.code - pre.code;
        });
        this.ruleForm.documentstatus = statuss[0].code;
        //this.ruleForm.recstatus = statuss[0].code;
      });
      commonStatus("00001HKYK9DD40000A23").then(res => {
        this.expressCom = res.data.data;
      });
      var para = { userid: userid };
      getMailSpinfo(para).then(res => {
        let info = res.data.data[0];
        if (info && info.ID) {
          this.editCard = true;
          this.ruleForm.sendCity = [info.PROVINCE, info.CITY];
          this.ruleForm.senddealerid = info.ID;
          this.isDisable = true;
        } else {
          this.isDisable = false;
        }
      });
    },
    // 加载详情
    cardDetail() {
      let para = {
        mailingid: this.cardId,
        userid: userid
      };
      cardDetail(para).then(res => {
        if (res.data.success != 1) {
          this.$message({
            type: "error",
            message: res.data.message
          });
        } else if (res.data.data.length == 0) {
          this.$message({
            type: "error",
            message: "证件不存在"
          });
        } else {
          let detail = res.data.data[0];
          let routeName = this.$route.name;
          //邮寄列表未接收状态不展示接收信息
          if (
            (detail.recvstatus == "" || detail.recvstatus == null) &&
            routeName == "cardDetail"
          ) {
            this.receiveShow = false;
          }
          this.ruleForm = Object.assign({}, this.ruleForm, {
            documentid: detail.docid, // 证件名称
            documentstatus: detail.sendstatus, // 证件状态
            documentimage: detail.sendimage, // 证件附件
            sendCity: [detail.sendprovincecode, detail.sendcitycode], // 寄出城市
            senddealerid: detail.senddealercode, // 寄出经销商
            sendperson: detail.contactor, // 联络人
            sendphone: detail.contactorphone, // 手机号
            receiveCity: [detail.recvprovincecode, detail.recvcitycode], // 接收城市
            receivedealerid: detail.recvdealercode, // 接收经销商
            receiveperson: detail.recvperson, // 接收人
            receivephone: detail.recvphone, // 手机号
            mailcompany: detail.expresscompany, // 快递公司
            mailno: detail.expressno, // 快递单号
            maildate: Moment(detail.senddate).format("YYYY-MM-DD"), // 寄出日期
            mailimage: detail.expressimage, // 快递单文件
            recstatus: detail.recvstatus, // 证件状态
            receiveimage: detail.recvimage, // 照片
            mailstatus: detail.mailstatus
          });
          this.ruleForm.senddealerid = detail.senddealercode;
          //接收证件的证件状态默认为正常
          if (detail.recvstatus == "" || detail.recvstatus == null) {
            let statuss = this.documentstatues;
            statuss.sort(function(pre, sub) {
              return sub.code - pre.code;
            });
            this.ruleForm.recstatus = statuss[0].code;
          }
          this.cardUrl = Boolean(detail.sendimage)
            ? FILE_URL + detail.sendimage
            : "";
          this.expressUrl = Boolean(detail.expressimage)
            ? FILE_URL + detail.expressimage
            : "";
          this.recUrl = Boolean(detail.recvimage)
            ? FILE_URL + detail.recvimage
            : "";
        }
      });
    },
    initfunction() {
      this.loadSelect();
      let routeName = this.$route.name;
      // 根据路由禁用某些功能
      if (["receCard", "cardDetail", "editCard"].includes(routeName)) {
        this.cardId = this.$route.params.id;
        if (routeName === "receCard") {
          this.normalDisable = true;
          this.receiveShow = true;
          this.receiveDisable = false;
          this.isDisable = true;
        } else if (routeName === "cardDetail") {
          this.normalDisable = true;
          this.receiveShow = true;
          this.receiveDisable = true;
          this.isDisable = true;
        } else {
          this.normalDisable = false;
          this.receiveShow = false;
          this.receiveDisable = true;
          this.editCard = true;
        }
        this.cardDetail();
      }
    },
    checkFrom() {
      let status = false;
      this.$refs["ruleForm"].validate((valid, s) => {
        status = valid;
      });
      return status;
    },
    submitCard() {
      this.isLoading = true;
      // 验证表单
      if (this.checkFrom()) {
        if (!this.normalDisable) {
          // 添加证件邮寄
          let para = this.except(this.ruleForm, [
            "recstatus",
            "receiveimage",
            "receiveCity",
            "sendCity",
            "filename"
          ]);
          para.mailstatus = 0;
          para.mailingid = this.cardId;
          sendCard(para).then(res => {
            commonDeal.call(this, res, () => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$router.push({
                path: "/dealer/sendcard/cardlist"
              });
            });
          });
        }
        if (!this.receiveDisable) {
          // 证件接收
          let para = this.only(this.ruleForm, [
            "recstatus",
            "receiveimage",
            "filename"
          ]);
          para.mailstatus = 1;
          para.userid = this.ruleForm.userid;
          para.mailingid = this.cardId;
          para.documentstatus = para.recstatus;
          delete para.recstatus;
          receiveCard(para).then(res => {
            commonDeal.call(this, res, () => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$router.push({
                path: "/dealer/sendcard/cardrec"
              });
            });
          });
        }
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    },
    zcCard() {
      this.isLoading = true;
      // 验证表单
      if (this.checkFrom()) {
        if (!this.normalDisable) {
          // 添加证件邮寄
          let para = this.except(this.ruleForm, [
            "recstatus",
            "receiveimage",
            "receiveCity",
            "sendCity",
            "filename"
          ]);
          para.mailstatus = -1;
          para.mailingid = this.cardId;
          sendCard(para).then(res => {
            commonDeal.call(this, res, () => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$router.push({
                path: "/dealer/sendcard/cardlist"
              });
            });
          });
        }
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    },
    only(object, keys = []) {
      let newObj = Object.assign({}, object);
      for (const key in newObj) {
        if (keys.indexOf(key) === -1) {
          delete newObj[key];
        }
      }
      return newObj;
    },
    except(object, keys = []) {
      let newObj = Object.assign({}, object);
      for (const key in newObj) {
        if (keys.indexOf(key) !== -1) {
          delete newObj[key];
        }
      }
      return newObj;
    }
  },
  mounted() {
    this.initfunction();
  },
  beforeRouteLeave(to, from, next) {
    next();
    if (to.name == "addcard") {
      location.reload();
    }
  }
};
</script>

<style scoped lang="scss" scoped>
.midcontent {
  margin-top: 20px;
  background-color: #ffffff;
  margin-bottom: 20px;
  padding-bottom: 80px;
}
.btncolor {
  background-color: #64ecdf;
  border: 1px solid #64ecdf;
}
.formtitle {
  clear: both;
  font-size: 16px;
  padding-top: 10px;
  color: #333333;
  padding-bottom: 15px;
}
.avatar-uploader /deep/ .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: rgb(251, 251, 251);
  border: 1px dashed rgb(217, 217, 217);
}
.midcontent /deep/ .el-card {
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/* .numinput{
    width: 110px;
  } */
</style>