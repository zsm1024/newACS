/**
 * Created by jiachenpan on 16/11/18.
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function getBase64Image(img) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();  //本地预览
    reader.readAsDataURL(img);    //Base64
    reader.onload = function (e) {
      resolve(this.result)
    }
  })

}

export function toTree(data) {

  // 删除 所有 children,以防止多次调用
  data.forEach(function (item) {
    delete item.children;
  });

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  var map = {};
  data.forEach(function (item) {
    map[item.CODE] = item;
  });

  var val = [];
  data.forEach(function (item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    var parent = map[item.pcode];

    // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item);


    } else {
      //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item);
    }
  });

  return val;
}
// 生成GUID
export function GUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

export function isEmpty(obj) {
  for (var name in obj) {
    return false
  }
  return true
}
// 判断对象是否相等
export function isObjectValueEqual(a, b) {
  var aProps = Object.getOwnPropertyNames(a).filter(item => {
    return item != "__ob__"
  });
  var bProps = Object.getOwnPropertyNames(b).filter(item => {
    return item != "__ob__"
  });
  if (aProps.length != bProps.length) {
    return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    if (a[propName] != b[propName]) {
      return false;
    }
  }
  return true;
}

// 接口公共处理
export function apiCommonDeal(res, successCallback) {
  if (!res) {
    return;
  }
  if (res.data.success == 1) {
    successCallback(res.data.data);
  } else {
    let errorCallback = arguments[2]
    if (errorCallback == undefined) {
      this.$message({
        type: "error",
        message: res.data.message
      });
    } else {
      errorCallback();
    }
  }
}

/** Object扩展 **/

//对象替换
export function objectReplace(oriObj, replaceObject) {
  let newObj = JSON.parse(JSON.stringify(oriObj));
  for (const key in replaceObject) {
    if (replaceObject.hasOwnProperty(key)) {
      if (key in newObj) {
        //值为字符包是新键 值为对象则key为新键 fun执行方法返回新值
        let newKey = (typeof replaceObject[key] == 'string') ? replaceObject[key] : replaceObject[key].key;
        let values = (typeof replaceObject[key] == 'string') ? newObj[key] : replaceObject[key].fun(newObj[key], newObj)
        delete newObj[key]
        let tmp = {};
        tmp[newKey] = values
        newObj = Object.assign({}, newObj, tmp);
      } else {
        let values = replaceObject[key].fun(newObj)
        let tmp = {};
        tmp[key] = values
        newObj = Object.assign({}, newObj, tmp);
      }
    }
  }
  return newObj
}

//筛选指定键
export function objectOnly(oriObj, keys) {
  let newObj = JSON.parse(JSON.stringify(oriObj));
  for (const key in newObj) {
    if (keys.indexOf(key) === -1) {
      delete newObj[key];
    }
  }
  return newObj;
}

//排除指定键
export function objectExcept(oriObj, keys) {
  let newObj = JSON.parse(JSON.stringify(oriObj));
  for (const key in newObj) {
    if (keys.indexOf(key) !== -1) {
      delete newObj[key];
    }
  }
  return newObj;
}

//集合替换
export function collectReplace(oriObj, replaceObject) {
  let tmp = []
  oriObj.forEach(function (value) {
    tmp.push(objectReplace(value, replaceObject));
  })
  return tmp;
}

//集合筛选指定键组成新数组 [1,2,3]
export function collectPluck(oriObj, key) {
  let tmp = []
  oriObj.forEach(function (value) {
    tmp.push(value[key]);
  })
  return tmp;
}

//集合筛选指定值
export function collectOnly(oriObj, keys) {
  let tmp = []
  oriObj.forEach(function (value) {
    tmp.push(objectOnly(value, keys));
  })
  return tmp;
}

//集合去除指定值
export function collectExcept(oriObj, keys) {
  let tmp = []
  oriObj.forEach(function (value) {
    tmp.push(objectExcept(value, keys));
  })
  return tmp;
}

//集合筛选
export function collectWhere(oriObj) {
  let tmp = oriObj.slice(0);
  let r1 = arguments[1];
  let r2 = arguments[2];
  let r3 = arguments[3];
  if (Object.prototype.toString.call(r1) == "[object Function]") {
    return tmp.filter((item, index) => {
      return r1(item, index);
    })
  } else {
    if (r2 == undefined) {
      return tmp.filter((item, index) => {
        return item[r1];
      })
    } else {
      if (r3 == undefined) {
        return tmp.filter((item, index) => {
          return item[r1] == r2
        })
      } else {
        return tmp.filter((item, index) => {
          return eval(`item['${r1}'] ${r2} ${r3}`)
        })
      }
    }
  }
}

//集合筛选获取第一项
export function collectFirst() {
  if (arguments.length == 1 && arguments[0].length) {
    return arguments[0][0];
  }
  var collect = collectWhere(...arguments)
  if (collect && collect.length) {
    return collect[0]
  }
  return false;
}

//集合筛选获取最后一项
export function collectLast() {
  if (arguments.length == 1 && arguments[0].length) {
    return arguments[0][arguments[0].length - 1];
  }
  var collect = collectWhere(...arguments)
  if (collect && collect.length) {
    return collect[collect.length - 1]
  }
  return false;
}

//集合正序排序
export function collectSortBy(oriObj, r1, r2 = true) {
  let tmp = oriObj.slice(0);
  if (Object.prototype.toString.call(r1) == "[object Function]") {
    //todo
  } else {
    return tmp.sort((a, b) => {
      if (r2) {
        return Number(a[r1]) - Number(b[r1]);
      } else {
        if (a[r1] > b[r1]) {
          return 1;
        } else if (a[r1] < b[r1]) {
          return -1;
        } else {
          return 0;
        }
      }
    })
  }
}

//集合倒序排序
export function collectSortByDesc(oriObj, r1, r2 = true) {
  let tmp = oriObj.slice(0);
  if (Object.prototype.toString.call(r1) == "[object Function]") {
    //todo
  } else {
    return tmp.sort((a, b) => {
      if (r2) {
        return Number(b[r1]) - Number(a[r1]);
      } else {
        if (a[r1] > b[r1]) {
          return -1;
        } else if (a[r1] < b[r1]) {
          return 1;
        } else {
          return 0;
        }
      }
    })
  }
}

//获取两个数组的重复值
export function arrayGetSame(p1, p2) {
  var attendUid = p1;
  var dataattendUid = p2;
  var result = [];
  var c = dataattendUid.toString();
  for (var i = 0; i < attendUid.length; i++) {
    if (c.indexOf(attendUid[i].toString()) > -1) {
      for (var j = 0; j < dataattendUid.length; j++) {
        if (attendUid[i] == dataattendUid[j]) {
          result.push(attendUid[i]);
          break;
        }
      }
    }
  }
  return result;
}

//获取当前时间
export function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}
// 判斷頁面是否縮放
export function detectZoom() {
  var ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase();

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  }
  else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  }
  else if (~ua.indexOf('chrome')) {
    if (window.devicePixelRatio) {
      return window.devicePixelRatio;
    }
    var div = document.createElement('div');
    div.innerHTML = '1';
    div.setAttribute('style', 'font:100px/1em sans-serif;-webkit-text-size-adjust:none;position: absolute;top:-100%;');
    document.body.appendChild(div);
    ratio = 1000 / div.clientHeight;
    ratio = Math.round(zoom * 100) / 100;
    document.body.removeChild(div);
  }
  else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth;
  }

  if (ratio) {
    ratio = Math.round(ratio * 100);
  }

  return ratio;
}

export var Base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function (e) {
    var t = "";
    var n, r, i, s, o, u, a;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = (n & 3) << 4 | r >> 4;
      u = (r & 15) << 2 | i >> 6;
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64
      } else if (isNaN(i)) {
        a = 64
      }
      t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
    }
    return t
  },
  decode: function (e) {
    var t = "";
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = s << 2 | o >> 4;
      r = (o & 15) << 4 | u >> 2;
      i = (u & 3) << 6 | a;
      t = t + String.fromCharCode(n);
      if (u != 64) {
        t = t + String.fromCharCode(r)
      }
      if (a != 64) {
        t = t + String.fromCharCode(i)
      }
    }
    t = Base64._utf8_decode(t);
    return t
  },
  _utf8_encode: function (e) {
    e = e.replace(/rn/g, "n");
    var t = "";
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r)
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode(r >> 6 | 192);
        t += String.fromCharCode(r & 63 | 128)
      } else {
        t += String.fromCharCode(r >> 12 | 224);
        t += String.fromCharCode(r >> 6 & 63 | 128);
        t += String.fromCharCode(r & 63 | 128)
      }
    }
    return t
  },
  _utf8_decode: function (e) {
    var t = "";
    var n = 0;
    var r = c1 = c2 = 0;
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode((r & 31) << 6 | c2 & 63);
        n += 2
      } else {
        c2 = e.charCodeAt(n + 1);
        c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        n += 3
      }
    }
    return t
  }
}


// 获取操作系统类型
export function getOS() {
  var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
  var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
  var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios'
  if (/android/i.test(userAgent)) return 'android'
  if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
  if (/mac/i.test(appVersion)) return 'MacOSX'
  if (/win/i.test(appVersion)) return 'windows'
  if (/linux/i.test(appVersion)) return 'linux'
}

// 获取浏览器类型和版本
export function getExplore() {
  var sys = {},
    ua = navigator.userAgent.toLowerCase(),
    s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
    (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
      (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
          (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
            (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
              (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
  // 根据关系进行判断
  if (sys.ie) return ('IE: ' + sys.ie)
  if (sys.edge) return ('EDGE: ' + sys.edge)
  if (sys.firefox) return ('Firefox: ' + sys.firefox)
  if (sys.chrome) return ('Chrome: ' + sys.chrome)
  if (sys.opera) return ('Opera: ' + sys.opera)
  if (sys.safari) return ('Safari: ' + sys.safari)
  return 'Unkonwn'
}

// 获取屏幕分辨率
export function getRatio() {
  return window.screen.width + "*" + window.screen.height
}

// dom转字符串
export function domToString(node) {
  let tmpNode = document.createElement('div')
  tmpNode.style.display = "none";
  tmpNode.appendChild(node.cloneNode())
  let str = tmpNode.innerHTML
  tmpNode = node = null;
  return str;
}

function preAll(target) {
  var pe = target.parentElement;
  var cs = pe.children;
  var arr = [];
  for (var i = 0; i < cs.length; i++) {
    var csi = cs[i];
    if (csi == target) {
      break;
    }
    arr.push(csi);
  }
  return arr;
}

// 获取当前节点的选择器
export function makeSelector(el) {
  var tag, index, stack = [];
  for (; el.parentNode; el = el.parentNode) {
    tag = el.tagName;
    if (tag != "HTML") {
      index = preAll(el).length + 1;
      if (tag == "BODY") {
        stack.unshift(tag);
      } else {
        if (index == 1) {
          stack.unshift(tag);
        } else {
          stack.unshift(tag + ':nth-child(' + index + ')');
        }
      }
    }
  }
  return stack.join('>');
}

// 金额用逗号隔开 11200.56 => 11,200.56
export function fmoney(s, n) {
  n = n >= 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
  var t = "";
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + (n > 0 ? ("." + r) : "");
} 
