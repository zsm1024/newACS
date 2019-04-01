<template>
  <div class="container">
    <el-row
      class="center_container"
      justify="center"
    >
      <el-col>
        <el-row class="center_container2">
          <el-col class="form_container">
            <el-row>
              <el-col class="login_qr">
                <div class="toggle_panel">
                  <span>{{loginType}}</span>
                </div>
                <span class="zhezhao"></span>
                <span
                  class="qr"
                  @click.capture.prevent="toggleQr"
                >
                  <div
                    :style="imgsrc"
                    class="bg_imgs"
                  >
                  </div>
                </span>
              </el-col>
              <!-- :rules="loginRules" -->
              <el-col v-show="showQr">
                <el-form
                  class="login-form"
                  autoComplete="on"
                  ref="loginForm"
                  :model="loginForm"
                  label-position="left"
                >
                  <el-form-item
                    prop="tips"
                    class="tips"
                    :class="[{hide:!loginForm.tips},{show:loginForm.tips}]"
                  >
                    <div>
                      <el-input
                        type="text"
                        ref="tips"
                        name="tips"
                        style="background-color:none!important;"
                        autoComplete="off"
                        :disabled="true"
                        v-model="loginForm.tips"
                      >
                        <span
                          slot="prefix"
                          class="login_form_icon icon_error"
                        >
                          <i></i>
                        </span>
                      </el-input>
                    </div>
                  </el-form-item>
                  <el-form-item prop="username">
                    <div>
                      <el-input
                        ref="username"
                        name="newusername"
                        type="text"
                        :class="nameCssAnimate"
                        @focus="focusAnimate(1)"
                        @blur='blurAnimate(1)'
                        @input="username_pop=false"
                        style="background-color:none!important;"
                        v-model="loginForm.username"
                        autoComplete="on"
                        :placeholder="usernamePlaceholder"
                      >
                        <span
                          slot="prefix"
                          class="login_form_icon icon_name"
                        >
                          <i></i>
                        </span>
                      </el-input>
                    </div>
                  </el-form-item>
                  <el-form-item prop="password">
                    <div>
                      <el-input
                        ref="password"
                        name="newpassword"
                        :type="pwdType"
                        :class="pwdCssAnimate"
                        @focus="focusAnimate(2)"
                        @blur='blurAnimate(2)'
                        @input="pwd_pop=false"
                        style="background-color:none!important;"
                        @keyup.enter.native="handleLogin"
                        v-model="loginForm.password"
                        autoComplete="off"
                        :placeholder="pwdPlaceholder"
                      ><span
                          slot="prefix"
                          class="login_form_icon icon_pwd"
                        >
                          <i></i>
                        </span></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item :style="verifyStyle">
                    <div>
                      <div>
                        <drag-verify
                          :width="270"
                          :height="40"
                          text="请按住滑块拖动"
                          success-text="验证通过"
                          background="#eee"
                          progress-bar-bg="#76c61d"
                          completed-bg="#76c61d"
                          handler-bg="#fff"
                          handlerIcon="el-icon-d-arrow-right"
                          successIcon="el-icon-circle-check"
                          text-size="14px"
                          :circle="false"
                          radius="4px"
                          @passcallback='passcallback'
                          @handlerMove="handlerMove"
                        ></drag-verify>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item
                    prop="captcha"
                    style="margin-bottom:8px !important"
                    v-if="isFirstLogin"
                  >
                    <div class="captcha_container">
                      <el-input
                        ref="captcha"
                        name="captcha"
                        type="text"
                        style="background-color:none!important;width:160px"
                        v-model="loginForm.captcha"
                        :placeholder="captchaPlaceholder"
                        maxlength="6"
                        @focus="focusCommon"
                        @blur='blurCommon'
                        autoComplete="off"
                      >
                        <span
                          slot="prefix"
                          class="login_form_icon icon_captcha"
                        >
                          <i></i>
                        </span>
                      </el-input>
                      <el-button
                        :type="countdown?'info':'primary'"
                        style="width:102px;height:40px;"
                        :disabled="!!countdown"
                        @click="getCode"
                      >{{countdown?(countdown+"秒后重发"):"发送验证码"}}</el-button>
                    </div>
                  </el-form-item>
                  <el-form-item style="margin-bottom:8px !important">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      placement="top-end"
                    >
                      <div
                        class="forgetpwd_tips"
                        slot="content"
                      >金融IT支持QQ:1991847367<br />请联系以上QQ进行密码重置。</div>
                      <span class="forgetpwd">忘记密码</span>
                    </el-tooltip>
                  </el-form-item>
                  <el-form-item :style="buttonStyle">
                    <el-button
                      type="primary"
                      style="width:100%;font-size:16px;"
                      :loading="loading"
                      @click.native.prevent="handleLogin"
                    >
                      登 录
                    </el-button>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col
                v-show="!showQr"
                :span='24'
              >
                <div class="qrcode">

                </div>
              </el-col>
              <el-col
                v-show="!showQr"
                style="text-align:center;padding-top:8px;padding-bottom:24px;"
              >
                <span class="qrcode_notice">请使用微信扫描二维码登录</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <div class="header_container">
    </div>
    <div
      class="footer_container"
      ref="topAffix"
    >
      <footer id="footer">
        <div>
          <span class="copyright">© 2017-2025 天津长城滨银汽车金融有限公司 版权所有</span><br />
          <span class="tel">客服热线 400-6527-606</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import dragVerify from "../../components/DragVerify/dragVerify";
import bgImg from "@/assets/images/bg@2x.png";
import nameIcon from "@/assets/images/login_name.png";
export default {
  name: "login",
  components: {
    dragVerify
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error(" "));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error(" "));
      } else {
        callback();
      }
    };
    const validateCaptcha = (rule, value, callback) => {
      if (this.isFirstLogin && value.trim().length == 0) {
        callback(new Error(" "));
      } else {
        callback();
      }
    };

    return {
      nameCssAnimate: ["el-input-unfocus"],
      pwdCssAnimate: ["el-input-unfocus"],
      showQr: true,
      loginForm: {
        username: "",
        password: "",
        tips: "",
        captcha: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "change", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "change", validator: validatePass }
        ],
        captcha: [
          { required: true, trigger: "change", validator: validateCaptcha }
        ]
      },
      loading: false,
      pwdType: "password",
      isCheck: false,
      username_msg: "用户名",
      pwd_msg: "密码",
      verify_msg: "请完成验证",
      username_pop: false,
      pwd_pop: false,
      verify_pop: false,
      usernamePlaceholder: "用户名",
      pwdPlaceholder: "密码",
      captchaPlaceholder: "手机验证码",
      loginType: "账号登录",
      isFirstLogin: false,
      countdown: 0,
      timer: null
    };
  },
  mounted: function() {},
  methods: {
    scrollEvent: function() {
      var that = this;
      scrollFunc();
      var top = getScroll(window, true);
      if (scrollDirection == "left" || scrollDirection == "right") {
        var left = window.scrollX;
        console.log(this.$refs.topAffix.$el.style);
        this.$refs.topAffix.$el.style.left =
          "calc(100vw - 100% - " + left + "px)";
      }
    },
    focusAnimate: function(type) {
      if (type == 1) {
        this.nameCssAnimate.push("el-input-focused");
        this.usernamePlaceholder = "";
      } else {
        this.pwdCssAnimate.push("el-input-focused");
        this.pwdPlaceholder = "";
      }
    },
    blurAnimate: function(type) {
      if (type == 1) {
        // 动画
        this.nameCssAnimate.pop();
        this.usernamePlaceholder = "用户名";
      } else {
        this.pwdCssAnimate.pop();
        this.pwdPlaceholder = "密码";
      }
    },
    focusCommon: function() {
      this.captchaPlaceholder = "";
    },
    blurCommon: function() {
      this.captchaPlaceholder = "手机验证码";
    },
    showPwd: function() {},
    toggleQr: function(e) {
      this.showQr = !this.showQr;
      this.loginType = this.showQr ? "账号登录" : "扫码登录";
    },
    getCode: function() {
      const TIME_COUNT = 30;
      this.countdown = TIME_COUNT;
      this.$refs.captcha.focus();
      if (!this.timer) {
        this.countdown = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.countdown > 0 && this.countdown <= TIME_COUNT) {
            this.countdown--;
          } else {
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    handleLogin: function() {
      this.$refs.loginForm.validate(valid => {});
      if (!this.loginForm.username.trim() && !this.loginForm.password.trim()) {
        this.loginForm.tips = "请输入用户名和密码";
        this.nameCssAnimate = ["el-input-unfocus-error"];
        this.$refs.username.focus();
        return;
      }
      if (!this.loginForm.username.trim()) {
        this.loginForm.tips = "请输入用户名";
        this.nameCssAnimate = ["el-input-unfocus-error"];
        this.$refs.username.focus();
        return;
      }
      this.nameCssAnimate = ["el-input-unfocus"];
      if (!this.loginForm.password.trim()) {
        this.loginForm.tips = "请输入密码";
        this.pwdCssAnimate = ["el-input-unfocus-error"];
        this.$refs.password.focus();
        return;
      }
      this.pwdCssAnimate = ["el-input-unfocus"];

      if (this.isFirstLogin && !this.loginForm.captcha.trim()) {
        this.loginForm.tips = "请输入验证码";
        this.$refs.captcha.focus();
        return;
      }
      if (!this.isCheck) {
        this.loginForm.tips = this.verify_msg;
        return;
      }
      this.loginForm.tips = "";
    },
    passcallback: function() {
      this.isCheck = true;
      if (this.loginForm.tips == this.verify_msg) {
        this.loginForm.tips = "";
      }
      console.log("验证通过");
    },
    handlerMove: function() {
      this.verify_pop = false;
      console.log(this.isCheck);
    }
  },
  computed: {
    imgsrc: function() {
      if (this.showQr) {
        return {
          left: 0,
          top: 0
        };
      } else {
        return {
          left: "-60px",
          top: "-60px"
        };
      }
    },
    verifyStyle: function() {
      return this.isFirstLogin
        ? {
            "margin-bottom": "16px !important"
          }
        : {
            "margin-bottom": "8px !important"
          };
    },
    buttonStyle: function() {
      return this.isFirstLogin
        ? {
            "margin-bottom": "40px !important"
          }
        : {
            "margin-bottom": "40px !important"
          };
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  padding-top: 140px;
  min-width: 330px;
}
.center_container {
  width: 330px;
  box-sizing: content-box;
  position: absolute;
  left: 75%;
  margin-left: -205px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}
.center_container2 {
  border-radius: 4px;
  min-width: 330px;
}
.banner_container {
  width: 390px;
  height: 560px;
  background: #409eff;
}
.form_container {
  width: 330px;
}
.tips {
  transition: width 0.3s linear, height 0.3s linear;
  overflow: hidden;
}
.tips.show {
  height: 40px;
  width: 270px;
  margin-bottom: 16px !important;
}
.tips.hide {
  height: 0px;
  width: 0px;
  margin-bottom: 0px !important;
}
.captcha_container {
  display: flex;
  justify-content: space-between;
}
.login_qr {
  height: 78px;
  text-align: right;
  position: relative;
}
.login_qr > .qr {
  width: 60px;
  height: 60px;
  display: block;
  float: right;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 0 4px 0 0;
}
.bg_imgs {
  width: 200%;
  height: 200%;
  position: absolute;
  background-image: url(~@/assets/images/login_toggle.png);
  background-size: cover;
  background-repeat: no-repeat;
  transition: left 0.2s linear, top 0.2s linear;
}
.zhezhao {
  width: 0px;
  height: 0px;
  display: block;
  position: absolute;
  border-width: 0px 42px 42px;
  border-style: solid;
  border-color: transparent;
  transform: rotate(-135deg);
  top: 23px;
  cursor: auto;
  right: 3px;
  z-index: 100;
}
.login-form .login_form_icon {
  display: flex;
  align-items: center;
  height: 100%;
}
.login-form .login_form_icon i {
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
}
.login-form .login_form_icon.icon_name i {
  background: url(~@/assets/images/login_name.png) no-repeat;
  //background-size: cover;
  background-size: cover;
}
.login-form .login_form_icon.icon_pwd i {
  background: url(~@/assets/images/login_pwd.png) no-repeat;
  //background-size: cover;
  background-size: cover;
}
.login-form .login_form_icon.icon_error i {
  background: url(~@/assets/images/login_error.png) no-repeat;
  //background-size: cover;
  background-size: cover;
}
.login-form .login_form_icon.icon_captcha i {
  background: url(~@/assets/images/login_captcha.png) no-repeat;
  //background-size: cover;
  background-size: cover;
}
.captcha_container .el-button {
  padding-left: 10px;
  padding-right: 10px;
}
.login-form {
  width: 270px;
  margin: 0 auto;
}
.new_ver {
  margin-top: 26px;
}
.new_ver /deep/ .el-checkbox__inner {
  border-radius: 50%;
}
.login-form /deep/ .el-input__inner {
  border-radius: 4px;
  border-width: 0;
  color: #333;
  font-size: 14px;
}
.login-form /deep/ .el-input__inner:focus {
  border-color: #fff;
}
.login-form /deep/ .el-input__inner:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
.tips /deep/ .el-input__inner {
  background: #fff1f0;
  border-radius: 4px;
  border: 1px solid #f64a4a;
}
.login-form /deep/ .el-form-item__error {
  left: auto;
  right: 0px;
}
.login-form /deep/ .el-input__prefix {
  left: 8px;
}
.login-form /deep/ .el-icon-circle-check {
  color: #6c6;
}

.login-form /deep/ .el-icon-d-arrow-right {
  font-size: 16px;
}
.login-form /deep/ .dv_handler_bg {
  box-sizing: content-box;
}
.login-form /deep/ .el-form-item:not(.tips) {
  margin-bottom: 16px !important;
}
.login-form /deep/ .el-form-item:last-child {
  margin-bottom: 34px !important;
}
.login-form /deep/ .el-input.is-disabled .el-input__inner {
  cursor: unset;
  color: #333;
  font-size: 14px;
}
.login-form /deep/ .el-button--primary {
  background: #507acd !important;
  border: 1px solid #507acd !important;
}
.login-form /deep/ .el-button--primary:hover {
  background: #5881d8 !important;
  border: 1px solid #5881d8 !important;
}
.login-form /deep/ .el-button--primary:active {
  background: #3c60c5 !important;
  border: 1px solid #3c60c5 !important;
}
.title {
  font-size: 14px;
  font-family: "Microsoft YaHei", 微软雅黑;
  color: #808080;
  line-height: 21px;
  display: block;
  font-weight: bold;
}
footer {
  text-align: center;
}
footer .copyright,
.tel {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #fff;
  line-height: 25px;
}
.forgetpwd {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #fff;
  line-height: 22px;
  cursor: pointer;
  float: right;
}
.forgetpwd_tips {
  color: #333;
  line-height: 20px;
  font-size: 14px;
}
.qrcode {
  background: url(~@/assets/images/qr.png) no-repeat;
  background-size: cover;
  height: 220px;
  width: 220px;
  padding: 15px;
  box-sizing: border-box;
  margin: 1px auto 1px;
}
.qrcode_notice {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #fff;
  line-height: 18px;
}
.header_container {
  background: url(~@/assets/images/logo_new.svg) no-repeat;
  background-size: cover;
  width: 240px;
  height: 40px;
  position: fixed;
  top: 5%;
  left: 10%;
}
.footer_container {
  position: fixed;
  bottom: 33px;
  left: 0;
  width: 100%;
}
.toggle_panel {
  display: inline-block;
  width: calc(100% - 120px);
  font-size: 0px;
  text-align: center;
}
.toggle_panel > span {
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  display: inline-block;
  width: 100%;
  line-height: 78px;
  box-sizing: border-box;
  font-size: 20px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: #fff;
}
@media screen and (min-height: 850px) and (max-height: 900px) {
  .container {
    padding-top: 140px;
  }
}
@media screen and (min-height: 800px) and (max-height: 850px) {
  .container {
    padding-top: 100px;
  }
}
@media screen and (min-height: 750px) and (max-height: 800px) {
  .container {
    // padding-top: 70px;
    padding-top: 100px;
  }
}
@media screen and (min-height: 700px) and (max-height: 750px) {
  .container {
    // padding-top: 45px;
    padding-top: 100px;
  }
  .footer_container {
    // position: unset !important;
    // transform: translateY(8vh);
  }
}
@media screen and (min-height: 550px) and (max-height: 700px) {
  .container {
    // padding-top: 35px;
    padding-top: 100px;
  }
  .footer_container {
    // position: unset !important;
    // transform: translateY(8vh);
  }
}
@media screen and (max-height: 550px) {
  .container {
    // padding-top: 5vh;
    padding-top: 100px;
  }
  .footer_container {
    position: absolute;
    //transform: translateY(6vh);
  }
}
@media screen and (max-width: 600px) {
  .center_container {
    margin-left: unset;
    right: calc(5vw);
    left: unset;
  }
}
@media screen and (max-width: 370px) {
  .center_container {
    left: calc(50% - 165px);
    right: 0;
  }
}
@media screen and (max-width: 330px) {
  .center_container {
    left: 0;
  }
}
// @media screen and (max-width: 950px) {
//   .banner_container {
//     left: unset;
//     margin-left: 0;
//     display: none;
//   }
//   .center_container {
//     margin-left: -255px;
//     width: 510px;
//   }
//   .center_container2 {
//     min-width: unset;
//   }
// }
</style>
<style>
html {
  /* overflow-y: -webkit-paged-x; */
}
html::-webkit-scrollbar {
  width: 0px;
}
html {
  /* -ms-overflow-style: none;
  overflow: -moz-scrollbars-none; */
}
body {
  height: unset;
  margin-left: 0px !important;
  user-select: none;
  background: url(~@/assets/images/bg@2x.jpg) no-repeat;
  background-size: cover;
  height: 100%;
  min-height: 680px;
  background-position: 50% 50%;
}
body #app {
  position: relative;
}
.el-tooltip__popper {
  background: #fff !important;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.15) !important;
  border-radius: 4px !important;
  padding: 5px 10px !important;
  margin-bottom: 8px !important;
}
.popper__arrow {
  border-top-color: #fff !important;
}
.popper__arrow::after {
  border-top-color: #fff !important;
}
/* 了解更多 */
.more {
  position: absolute;
  bottom: 40px;
  z-index: 100;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.readmore {
  color: #fff;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  line-height: 19px;
  margin-right: 4px;
}
.readmore_right {
  color: #ccc;
  background: #fff;
  font-weight: 900;
  border-radius: 50%;
  text-align: center;
  width: 13px;
  height: 13px;
  line-height: 13px;
}
/* css3动画 */
.el-input-unfocus::after {
  content: " ";
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 50%;
  display: block;
  height: 2px;
  transform: translate(-50%);
  transition-property: width;
  transition-duration: 0.4s;
  -webkit-transition-property: width; /* Safari */
  -webkit-transition-duration: 0.4s; /* Safari */
  background-color: #2878ff;
  width: 0px;
}
.el-input-unfocus-error::after {
  content: " ";
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 50%;
  display: block;
  height: 2px;
  transform: translate(-50%);
  transition-property: width;
  transition-duration: 0.4s;
  -webkit-transition-property: width; /* Safari */
  -webkit-transition-duration: 0.4s; /* Safari */
  background-color: #ff0000;
  width: 0px;
}
.el-input-focused::after {
  width: 100%;
}
</style>


