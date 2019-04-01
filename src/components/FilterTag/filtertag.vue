<!--
 * @Author: ln
 * @Date: 2019-01-25 10:54:40
 * @LastEditors: ln
 * @LastEditTime: 2019-02-28 14:15:11
 * @Description: 筛选栏组件
 * @Version: 0.0.1
 -->

<template>
  <div class="filtertag-container">
    <ul class="filtertag">
      <li
        class="filtertag-item"
        v-for="tag in tags"
        :class="[(tmpcurrent===tag[value]) ? 'filtertag-active' : '']"
        :key='tag[value]'
        @click="choseDay(tag)"
      >
        <span>{{tag[text]}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "filterTag",
  props: {
    tags: {
      type: Array,
      required: true
    },
    current: {
      type: String | Number,
      default: ""
    },
    text: {
      type: String,
      default: "name"
    },
    value: {
      type: String,
      default: "code"
    }
  },
  data() {
    return {
      tmpcurrent: ""
    };
  },
  mounted: function() {
    this.tmpcurrent = this.current;
  },
  methods: {
    choseDay: function(tag) {
      this.tmpcurrent = tag[this.value];
      this.$emit("on-change", tag);
    }
  },
  computed: {},
  watch: {
    current: function(newvalue) {
      this.tmpcurrent = newvalue;
    }
  }
};
</script>
<style scoped>
.filtertag-container {
  display: inline-block;
}
.filtertag {
  display: inline-block;
}
.filtertag .filtertag-item {
  height: 30px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  color: #333;
  padding: 0px 12px;
  margin-right: 8px;
  line-height: 30px;
  transition: background 0.5s;
}
.filtertag .filtertag-item:hover {
  color: #333;
  background: #e3e3e3;
  border-radius: 2px;
}
.filtertag .filtertag-active {
  background: #fff;
  border-radius: 2px;
  color: #507acd;
  font-weight: 700;
}
.filtertag .filtertag-active:hover {
  background: #e3e3e3;
  border-radius: 2px;
  color: #507acd;
  font-weight: 700;
}
</style>

