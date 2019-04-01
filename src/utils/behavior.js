import relations from './behaviorLog'
import { reportBehavior, reportError } from '../api/maidian'
import Cookies from 'js-cookie'
import { Base64, getOS, getExplore, getRatio, domToString, makeSelector } from '../utils/index';
const PROJECT_ID = window.local.subjectId;
const QUEUE_COUNT = window.local.queueCount;
/**
 * 字符串是否含有html标签的检测
 * @param htmlStr
 */
function checkHtml(htmlStr) {
    var reg = /<[^>]+>/g;
    return reg.test(htmlStr);
}

function packagePara(cid, uid, ac, ot, on, vt) {
    return {
        cid: cid, // 客户端ID
        pid: PROJECT_ID, // 项目ID
        uid: uid, // 用户ID
        // cs: 0, // 客户端耗时
        ct: +((new Date).getTime() + '').substr(0, 10), // 客户端请求时间戳
        dr: getRatio(), // 屏幕分辨率
        v: getExplore(), // 浏览器版本
        osv: getOS(), // 电脑操作系统
        vt: vt, // 页面停留时间
        ac: ac, // 动作(点击、跳转页面)
        ot: ot, // 对象标签
        on: on, // 对象名
        ref: location.href, // 页面
        ti: "" // 页面标题
    }
}

function packageErrorPara(cid, uid, ec, em) {
    return {
        cid: cid,
        pid: PROJECT_ID,
        uid: uid,
        ct: +((new Date).getTime() + '').substr(0, 10),
        dr: getRatio(),
        v: getExplore(),
        osv: getOS(),
        ec: ec,
        em: em,
        ref: location.href,
        ti: ""
    }
}

export function reportLocalError(error) {
    var cid = Cookies.get('userId')
    var tmp = packageErrorPara(cid, cid, '200', error.stack.substr(0, 500))
    var m = Base64.encode(JSON.stringify(tmp))
    reportError(cid, m)
}

export function reportApiError(code, error) {
    var cid = Cookies.get('userId')
    var tmp = packageErrorPara(cid, cid, code, error)
    var m = Base64.encode(JSON.stringify(tmp))
    reportError(cid, m)
}

function checkList(target) {
    var c = target;
    var p = c.parentElement
    var pp = p.parentElement
    var ppp = pp.parentElement
    var pppp = ppp.parentElement
    // 1.topmiddle
    if (p.className.split(' ').includes('topmiddle') || pp.className.split(' ').includes('topmiddle')) {
        return true;
    }
    // 2.searchbar
    if (c.tagName.toLowerCase() == "button" && ppp.className.split(' ').includes('searchbar')) {
        return true;
    }
    if (c.tagName.toLowerCase() == "span" && pppp.className.split(' ').includes('searchbar')) {
        return true;
    }
    // 3.linkurl(innerText无标签)
    if (c.className.split(' ').includes('linkurl') && !checkHtml(c.innerText)) {
        return true;
    }
    // 4.el-dropdown-menu.el-dropdown-menu__item
    if (c.className.split(' ').includes('el-dropdown-menu__item') || p.className.split(' ').includes('el-dropdown-menu__item')) {
        return true;
    }

    return false;
}


export function matchPoint(event, vm) {
    let routeName = vm.$route.name.toLowerCase()
    // 根据路由名判断是否存在
    var relationKeys = Object.keys(relations);
    var k;
    var isMatch = relationKeys.some(item => {
        // 用|可以为多个路由设置相同的匹配条件
        if (item.split('|').includes(routeName)) {
            k = item;
            return true;
        }
        return false;
    })
    if (isMatch) {
        let target = event.target;
        let r = relations[k]
        let s = target.innerHTML.trim();
        if (checkHtml(s)) {
            var child = target.children.length == 1 ? target.firstElementChild : null;
            var parent = target;
        } else {
            var parent = target.parentElement;
            var child = target;
        }

        let childTagName = child ? child.tagName.toLowerCase() : '';
        let childClassName = child ? child.className : '';
        let childText = child ? child.innerText : '';

        let parentTagName = parent.tagName.toLowerCase();
        let parentClassName = parent.className;
        var matchRule,
            status;
        // list匹配
        if (r.isList) {
            status = checkList(target)
            status && console.log('isList匹配成功')
        }
        // ponit精确匹配
        if (r.points && r.points.length != 0) {
            status = status || r.points.some(function (item, index) {
                if (item.current) {
                    if (item.current.tagName && item.current.tagName != childTagName) {
                        return false;
                    }
                    if (item.current.className && !childClassName.split(' ').includes(item.current.className)) {
                        return false;
                    }
                    if (item.current.text && item.current.text != childText) {
                        return false;
                    }
                }
                if (item.parent) {
                    if (item.parent.tagName && item.parent.tagName != parentTagName) {
                        return false;
                    }
                    if (item.parent.className && !parentClassName.split(' ').includes(item.parent.className)) {
                        return false;
                    }
                }
                matchRule = index;
                return true;
            })
        }
        // xponit排除
        if (status && r.xpoints && r.xpoints.length != 0) {


            status = !r.xpoints.some(function (item, index) {
                if (item.current) {
                    if (item.current.tagName && item.current.tagName != childTagName) {
                        return false;
                    }
                    if (item.current.className && !childClassName.split(' ').includes(item.current.className)) {
                        return false;
                    }
                    if (item.current.text && item.current.text != childText) {
                        return false;
                    }
                }
                if (item.parent) {
                    if (item.parent.tagName && item.parent.tagName != parentTagName) {
                        return false;
                    }
                    if (item.parent.className && !parentClassName.split(' ').includes(item.parent.className)) {
                        return false;
                    }
                }
                matchRule = index;
                return true;
            })
        }
        if (status) {
            var cid = Cookies.get('userId')
            var on = target.innerText || makeSelector(target);
            var para = packagePara(cid, cid, 'click', target.tagName, on, 0);
            window.local.reportQueue.push(para);
            if (window.local.reportQueue.length >= QUEUE_COUNT) {
                var tmp = JSON.stringify(window.local.reportQueue);
                var p = {
                    cid: cid,
                    m: Base64.encode(tmp)
                };
                window.local.reportQueue = [];
                reportBehavior(p);
            }
        }
    }
}

export function recordRoute(vt, desc) {
    var cid = Cookies.get('userId')
    var para = packagePara(cid, cid, 'link', "a", desc, vt);
    window.local.reportQueue.push(para)
    if (window.local.reportQueue.length >= QUEUE_COUNT) {
        var tmp = JSON.stringify(window.local.reportQueue);
        var p = {
            cid: cid,
            m: Base64.encode(tmp)
        }
        window.local.reportQueue = [];
        reportBehavior(p);
    }
}