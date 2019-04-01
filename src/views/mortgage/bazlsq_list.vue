<template>
 <section style="background-color:#fff">
  1231321231321
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
import chart from "../together/chart";
import {
  notice,
  noticeread,
  download,
  getPendingTask,
  Case
} from "@/api/together";
export default {
  name: "dashboard",
  components: {
    draggable,
    chart
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.ve-line {
  height: 377px !important;
}
.el-tag {
  margin-right: 10px;
  cursor: pointer;
}
.dashboard {
  margin-top: 10px;
}
.box-card {
  margin: 20px 5px 5px 5px;
  height: 130px;
}
.down-card {
  margin: 25px 5px 5px 5px;
}
.colorone {
  background-color: #70c1b3;
  color: #ffffff;
}
.onesize {
  font-size: 34px;
  font-weight: bold;
}
.onename {
  font-size: 14px;
}
.colortwo {
  background-color: #b2dbbf;
  color: #ffffff;
}
.colorthree {
  background-color: #f3ffbd;
  color: #000000;
}
.colorfour {
  background-color: #eb547c;
  color: #ffffff;
}
.imgset {
  position: absolute;
  top: 21px;
  right: -28px;
  cursor: pointer;
}
.roundbutton {
  width: 180px;
  text-align: left;
  background-color: #f9f9f9;
}
.roundbutton:hover {
  background-color: #00a5ff;
  color: #ffffff;
}
.buttonul {
  margin-bottom: 39px;
}
.buttonul li {
  padding-bottom: 25px;
  text-align: center;
}
.buttonspan {
  margin-left: 25px !important;
}

.clearfix span {
  font-size: 16px;
  color: #333333;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebebeb;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-icon-more {
  color: #b6b6b6;
}
.hoverlink:hover {
  color: #78e1d4;
}
.cardtime {
  height: 340px;
  width: 100%;
  max-width: 400px;
}

.footercenter {
  font-size: 14px;
  color: #9c9eb5;
  text-align: center;
  margin-top: 100px;
}
.top20 {
  padding-top: 20px;
}
.el-icon-mobile-phone {
  font-size: 30px;
  color: #94ffe7;
  font-weight: bolder;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 100px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.liststy .class-b {
  height: 44px;
  background: #f9fafb;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 3px;
  cursor: pointer;
  color: #666;
  font-size: 14px;
}

.liststy > li:hover {
  color: #108ee9;
}
.liststy > li p {
  width: 85%;
}
.isup {
  color: #ffb22f;
  border-radius: 4px;
  border: 1px solid #ffb22f;
  padding: 2px 4px;
  margin-left: 8px;
  font-size: 12px;
}
.liststy .class-a {
  color: #999;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-tabs__nav-wrap::after {
  background-color: none !important;
}
.el-carousel__item[data-v-50698a54]:nth-child(2n + 1) {
  box-shadow: 0px 3px 18px 2px rgba(0, 0, 0, 0.7);
  padding-top: 10;
  border-radius: 6px;
}
.el-carousel__container {
  position: relative;
  height: 300px;
  margin-top: 16px;
  border-radius: 6px;
}
.imgs{
  height: calc(100vh – 70px)
}
</style>