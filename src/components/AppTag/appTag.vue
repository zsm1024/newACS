<!--
 * @Author: ln
 * @Date: 2019-01-15 13:31:35
 * @LastEditors: ln
 * @LastEditTime: 2019-01-15 15:19:19
 * @Description: 
 * @Version: 0.0.1
 -->
<template>
  <div class="tag_container">
    <span
      class="tag"
      v-for="tag in tags.async_extend_tag"
      :style="bg(tag)"
      :key="tag.code"
    >
      {{tag.name}}
    </span>
  </div>
</template>
<script>
const codeBg = {
  // "0008": "red",
  // "0011": "blue",
  // "0007": "yellow"
  "0015": "#ECF3FF"
};
export default {
  name: "appTag",
  props: {
    tags: {
      type: [Object]
    }
  },
  data() {
    return {};
  },
  mounted: function() {},
  methods: {
    bg: function(tag) {
      return "background:" + (codeBg[tag.code] || "#ECF3FF");
    }
  },
  computed: {}
};
</script>
<style scoped>
.tag_container {
}
.tag_container .tag {
  display: inline-block;
  width: 52px;
  background: #ecf3ff;
  border-radius: 2px;
  border: 1px solid #c7dbff;
  line-height: 22px;
  text-align: center;
  box-sizing: border-box;
  font-size: 12px;
  color: #4e699e;
  margin: 2px 4px 2px 0;
}
</style>

