<template>
  <div
    class="drag_verify"
    :style="dragVerifyStyle"
    @mousemove="dragMoving"
    @mouseup="dragFinish"
    @mouseleave="dragFinish"
    @touchmove="dragMoving"
    @touchend="dragFinish"
  >

    <div
      class="dv_progress_bar"
      :class="animateClass2"
      ref="progressBar"
      :style="progressBarStyle"
    >

    </div>
    <div
      class="dv_text"
      :style="textStyle"
      ref="message"
    >{{message}}</div>

    <div
      class="dv_handler dv_handler_bg"
      :class="animateClass"
      @mousedown="dragStart"
      ref="handler"
      :style="handlerStyle"
      @touchstart="dragStart"
    >
      <i :class="handlerIcon"></i>
    </div>

  </div>
</template>
<script>
export default {
  name: "dragVerify",
  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 60
    },
    text: {
      type: String,
      default: "swiping to the right side"
    },
    successText: {
      type: String,
      default: "success"
    },
    background: {
      type: String,
      default: "#ccc"
    },
    progressBarBg: {
      type: String,
      default: "#FFFF99"
    },
    completedBg: {
      type: String,
      default: "#66cc66"
    },
    circle: {
      type: Boolean,
      default: true
    },
    radius: {
      type: String,
      default: "0px"
    },
    handlerIcon: {
      type: String
    },
    successIcon: {
      type: String
    },
    handlerBg: {
      type: String,
      default: "#fff"
    },
    textSize: {
      type: String,
      default: "20px"
    }
  },
  computed: {
    handlerStyle: function() {
      return {
        left: "0px",
        width: this.height + "px",
        height: this.height + "px",
        //borderRadius: this.circle ? "50%" : this.radius,
        background: this.handlerBg
      };
    },
    message: function() {
      return this.isPassing ? this.successText : this.text;
    },
    dragVerifyStyle: function() {
      return {
        width: this.width + "px",
        height: this.height + "px",
        lineHeight: this.height + "px",
        background: this.background,
        borderRadius: this.circle ? this.height / 2 + "px" : this.radius
      };
    },
    progressBarStyle: function() {
      return {
        background: this.progressBarBg,
        height: this.height + "px",
        borderRadius: this.circle
          ? this.height / 2 + "px 0 0 " + this.height / 2 + "px"
          : this.radius
      };
    },
    textStyle: function() {
      return {
        height: this.height + "px",
        width: this.width + "px",
        fontSize: this.textSize
      };
    },
    handlerIconClass: function() {
      return this.isPassing ? this.handlerIcon : this.successIcon;
    }
  },
  data() {
    return {
      isMoving: false,
      x: 0,
      isPassing: false,
      animateClass: [],
      animateClass2: []
    };
  },
  mounted: function() {
    this.init();
  },
  methods: {
    init: function() {},
    dragStart: function(e) {
      if (!this.isPassing) {
        this.isMoving = true;
        var handler = this.$refs.handler;
        this.x =
          (e.pageX || e.touches[0].pageX) -
          parseInt(handler.style.left.replace("px", ""), 10);
      }
      this.$emit("handlerMove");
    },
    dragMoving: function(e) {
      if (this.isMoving && !this.isPassing) {
        var _x = (e.pageX || e.touches[0].pageX) - this.x;
        var handler = this.$refs.handler;
        if (_x > 0 && _x <= this.width - this.height) {
          handler.style.left = _x + "px";
          this.$refs.progressBar.style.width = _x + this.height / 2 + "px";
        } else if (_x > this.width - this.height) {
          handler.style.left = this.width - this.height + "px";
          this.$refs.progressBar.style.width =
            this.width - this.height / 2 + "px";
          this.passVerify();
        }
      }
    },
    dragFinish: function(e) {
      if (this.isMoving && !this.isPassing) {
        var _x = (e.pageX || e.changedTouches[0].pageX) - this.x;
        if (_x < this.width - this.height) {
          this.animateClass = ["goFirst"];
          this.animateClass2 = ["goFirst2"];
          var that = this;
          setTimeout(function() {
            that.$refs.handler.style.left = "0";
            that.$refs.progressBar.style.width = "0";
            that.animateClass = [];
            that.animateClass2 = [];
          }, 500);
        }
        this.isMoving = false;
      }
    },
    passVerify: function() {
      this.isPassing = true;
      this.isMoving = false;
      var handler = this.$refs.handler;
      handler.className += " dv_handler_ok_bg";
      handler.children[0].className = this.successIcon;
      this.$refs.progressBar.style.background = this.completedBg;
      this.$refs.message.style["-webkit-text-fill-color"] = "unset";
      this.$refs.message.style.animation = "slidetounlock2 3s infinite";
      this.$refs.message.style.color = "#fff";
      this.$emit("passcallback");
    }
  }
};
</script>
<style>
.drag_verify {
  position: relative;
  background-color: #e8e8e8;
  text-align: center;
  overflow: hidden;
}
.drag_verify .dv_handler {
  position: absolute;
  top: 0px;
  left: 0px;
  /* border: 1px solid #ccc; */
  cursor: move;
}
.drag_verify .dv_handler_bg {
}
.drag_verify .dv_handler_ok_bg {
}
.drag_verify .dv_handler i {
  color: #666;
  font-size: 1.5em;
}
.drag_verify .dv_progress_bar {
  position: absolute;
  height: 34px;
  width: 0px;
  /* transition: background 2s ease-in; */
}
.drag_verify .dv_text {
  position: absolute;
  top: 0px;
  color: transparent;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, #333),
    color-stop(0.4, #333),
    color-stop(0.5, #fff),
    color-stop(0.6, #333),
    color-stop(1, #333)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-size-adjust: none;
  animation: slidetounlock 3s infinite;
}
.goFirst {
  left: 0px !important;
  transition: left 0.5s;
}
.goFirst2 {
  width: 0px !important;
  transition: width 0.5s;
}
@-webkit-keyframes slidetounlock {
  0% {
    background-position: -150px 0;
  }
  100% {
    background-position: 180px 0;
  }
}
@-webkit-keyframes slidetounlock2 {
  0% {
    background-position: -150px 0;
  }
  100% {
    background-position: -150px 0;
  }
}
</style>