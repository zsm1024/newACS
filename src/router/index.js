import Vue from 'vue'
import Router from 'vue-router'
import { recordRoute } from '../utils/behavior'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
var daihouurl = '/dealer/afterloan/doclist';
if (window.local.daihouisold) {
  daihouurl = '/dealer/afterloan/doclistold';
}
/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', name: 'login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/login2', name: 'login2', component: () => import('@/views/login/index2'), hidden: true },
  { path: '/404', name: 'notfound', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dealer/dashboard',
    name: 'dashboard2',
    hidden: true,
    children: [{
      path: 'dealer/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index2')
    }]
  },
  {
    path: '/dealer/creditapproval',
    component: Layout,
    redirect: '/dealer/creditapproval/movepart',
    name: 'creditapproval',
    meta: { title: '信贷审批', icon: 'example' },
    children: [
      /*{
        path: 'stayEndowment',
        name: 'stayEndowment',
        component: () => import('@/views/creditapproval/stayEndowment'),
        meta: { title: '客户留资', icon: 'table' }
      },*/
      {
        path: 'orderchange/:id',
        name: 'orderchange',
        component: () => import('@/views/creditapproval/orderfile/orderchange'),
        meta: { title: '资产变更', icon: 'table', urlactive: 'assetslist' }
      },
      {
        path: 'changephoto/:id',
        name: 'changephoto',
        component: () => import('@/views/creditapproval/orderfile/changephoto'),
        meta: { title: '资产变更影像', icon: 'table', urlactive: 'order' }
      },
      {
        path: 'movepart',
        name: 'movepart',
        component: () => import('@/views/creditapproval/movepart'),
        meta: { title: '移动进件', icon: 'table' }
      },
      {
        path: 'orderlist',
        name: 'orderlist',
        component: () => import('@/views/creditapproval/orderlist'),
        meta: { title: '订单管理', icon: 'table', urlactive: 'order' }
      },
      {
        path: 'assetslist',
        name: 'assetslist',
        component: () => import('@/views/creditapproval/assetslist'),
        meta: { title: '资产变更', icon: 'table', urlactive: 'assetslist' }
      },
      {
        path: 'secondorder/:id',
        name: 'secondorder',
        component: () => import('@/views/creditapproval/orderfile/secondorder'),
        meta: { title: '二手车贷', icon: 'table', urlactive: 'order' }
      },
      {
        path: 'personalorder/:id',
        name: 'personalorder',
        component: () => import('@/views/creditapproval/orderfile/personalorder'),
        meta: { title: '个人贷款', icon: 'table', urlactive: 'order' }
      },
      {
        path: 'identityorder/:id',
        name: 'identityorder',
        component: () => import('@/views/creditapproval/orderfile/identityorder'),
        meta: { title: '填写身份信息', icon: 'table', urlactive: 'order' }
      },
      {
        path: 'identmain/:id',
        name: 'identmain',
        component: () => import('@/views/creditapproval/orderfile/identmain'),
        meta: { title: '填写身份信息', icon: 'table', urlactive: 'order' }
      },
      {
        path: 'toauthphoto/:id',
        name: 'toauthphoto',
        component: () => import('@/views/creditapproval/orderfile/toauthphoto'),
        meta: { title: '上传影响资料', icon: 'table', urlactive: 'order' }
      },
      {
        path: 'orderphoto/:id',
        name: 'orderphoto',
        component: () => import('@/views/creditapproval/orderfile/orderphoto'),
        meta: { title: '上传影响资料', icon: 'table', urlactive: 'order' }
      },
      {
        path: 'ordersuccess/:id',
        name: 'ordersuccess',
        component: () => import('@/views/creditapproval/orderfile/ordersuccess'),
        meta: { title: '信息填写成功', icon: 'table', urlactive: 'order' }
      },
      {
        path: 'tofangsuccess/:id',
        name: 'tofangsuccess',
        component: () => import('@/views/creditapproval/manfile/tofangsuccess'),
        meta: { title: '信息填写成功', icon: 'table', urlactive: 'loan' }
      },
      {
        path: 'manlist',
        name: 'manlist',
        component: () => import('@/views/creditapproval/manlist'),
        meta: { title: '放款管理', icon: 'table', urlactive: 'loan' }
      },
      {
        path: 'appliloan/:id',
        name: 'appliloan',
        component: () => import('@/views/creditapproval/manfile/appliloan'),
        meta: { title: '申请放款', icon: 'table', urlactive: 'loan' }
      },
      {
        path: 'tophoto/:id',
        name: 'tophoto',
        component: () => import('@/views/creditapproval/manfile/tophoto'),
        meta: { title: '申请放款', icon: 'table', urlactive: 'loan' }
      },
      {
        path: 'yingxiang/:id',
        name: 'yingxiang',
        component: () => import('@/views/creditapproval/manfile/yingxiang'),
        meta: { title: '申请放款', icon: 'table', urlactive: 'loan' }
      },
      {
        path: 'speciallist',
        name: 'speciallist',
        component: () => import('@/views/creditapproval/speciallist'),
        meta: { title: '特殊业务', icon: 'table' }
      }
    ]
  },

  {
    path: '/dealer/afterloan',
    component: Layout,
    redirect: daihouurl,
    name: 'afterloan',
    meta: { title: '贷后管理', icon: 'example' },
    children: [
      {
        path: 'doclistold',
        name: 'doclistold',
        component: () => import('@/views/afterloan/doclistold'),
        meta: { title: '文档管理', icon: 'table', urlactive: 'doc' }
      },
      {
        path: 'delaylistold',
        name: 'delaylistold',
        component: () => import('@/views/afterloan/delaylistold'),
        meta: { title: '延期管理', icon: 'table', urlactive: 'delay' }
      },
      {
        path: 'mortlistold',
        name: 'mortlistold',
        component: () => import('@/views/afterloan/mortlistold'),
        meta: { title: '解抵押', icon: 'table', urlactive: 'jiediya' }
      },
      {
        path: 'insulistold',
        name: 'insulistold',
        component: () => import('@/views/afterloan/insulistold'),
        meta: { title: '保险业务', icon: 'table', urlactive: 'baoxianyewu' }
      },
      {
        path: 'doclist',
        name: 'doclist',
        component: () => import('@/views/afterloan/doclist'),
        meta: { title: '文档管理', icon: 'table', urlactive: 'doc' }
      },
      // {
      //   path: 'waybill',
      //   name: 'waybill',
      //   component: () => import('@/views/afterloan/docchild/waybill'),
      //   meta: { title: '新建运单', icon: 'table', urlactive: 'doc' }
      // },
      {
        path: 'sendpost/:id',
        name: 'sendpost',
        component: () => import('@/views/afterloan/sendpost'),
        meta: { title: '运单邮寄', icon: 'table', urlactive: 'doc' }
      },
      {
        path: 'sendpostl/:id',
        name: 'sendpostl',
        component: () => import('@/views/afterloan/sendpost'),
        meta: { title: '运单邮寄', icon: 'table', urlactive: 'doc' }
      },
      {
        path: 'sendpostedit/:id',
        name: 'sendpostedit',
        component: () => import('@/views/afterloan/sendpost'),
        meta: { title: '运单邮寄', icon: 'table', urlactive: 'doc' }
      },
      {
        path: 'sendposteditl/:id',
        name: 'sendposteditl',
        component: () => import('@/views/afterloan/sendpost'),
        meta: { title: '运单邮寄', icon: 'table', urlactive: 'doc' }
      },
      {
        path: 'sendpostdetail/:id',
        name: 'sendpostdetail',
        component: () => import('@/views/afterloan/sendpost'),
        meta: { title: '运单邮寄详情', icon: 'table', urlactive: 'doc' }
      },
      {
        path: 'sendpostlist/:id',
        name: 'sendpostlist',
        component: () => import('@/views/afterloan/sendpostlist'),
        meta: { title: '运单邮寄列表', icon: 'table', urlactive: 'doc' }
      },
      {
        path: 'delaylist',
        name: 'delaylist',
        component: () => import('@/views/afterloan/delaylist'),
        meta: { title: '延期管理', icon: 'table', urlactive: 'delay' }
      },
      {
        path: 'delay/:no',
        name: 'delay',
        component: () => import('@/views/afterloan/delay'),
        meta: { title: '延期申请', icon: 'table', urlactive: 'delay' }
      },
      {
        path: 'delaydetail/:id',
        name: 'delaydetail',
        component: () => import('@/views/afterloan/delay'),
        meta: { title: '延期申请查看页', icon: 'table', urlactive: 'delay' }
      },
      {
        path: 'delayedit/:id',
        name: 'delayedit',
        component: () => import('@/views/afterloan/delay'),
        meta: { title: '延期申请编辑页', icon: 'table', urlactive: 'delay' }
      },
      {
        path: 'mortgage',
        name: 'mortgage',
        component: () => import('@/views/afterloan/mortlist'),
        meta: { title: '解抵押', icon: 'table', urlactive: 'jiediya' }
      },
      {
        path: 'mortview/:id',
        name: 'mortview',
        component: () => import('@/views/afterloan/mortview'),
        meta: { title: '确认解抵押', icon: 'table', urlactive: 'jiediya' }
      },
      {
        path: 'insulist',
        name: 'insulist',
        component: () => import('@/views/afterloan/insulist'),
        meta: { title: '保险业务', icon: 'table', urlactive: 'baoxianyewu' }
      },
      {
        path: 'addinsulist/:id',
        name: 'addinsulist',
        component: () => import('@/views/afterloan/addinsulist'),
        meta: { title: '保险业务', icon: 'table', urlactive: 'baoxianyewu' }
      },
      {
        path: 'editinsulist/:id',
        name: 'editinsulist',
        component: () => import('@/views/afterloan/editinsulist'),
        meta: { title: '保险业务', icon: 'table', urlactive: 'baoxianyewu' }
      },
      {
        path: 'lookinsulist/:id',
        name: 'lookinsulist',
        component: () => import('@/views/afterloan/lookinsulist'),
        meta: { title: '保险业务', icon: 'table', urlactive: 'baoxianyewu' }
      },
    ]
  },
  {
    path: '/dealer/commission',
    component: Layout,
    redirect: '/dealer/commission/settlerebate',
    name: 'commission',
    meta: { title: '佣金结算', icon: 'example' },
    children: [
      {
        path: 'settlerebate',
        name: 'settlerebate',
        component: () => import('@/views/commission/settlerebate'),
        meta: { title: '返利管理', icon: 'table' }
      },
      {
        path: 'quarterreward',
        name: 'quarterreward',
        component: () => import('@/views/commission/quarterreward'),
        meta: { title: '季度优胜奖管理', icon: 'table' }
      },
      {
        path: 'personalcom',
        name: 'personalcom',
        component: () => import('@/views/commission/personalcom'),
        meta: { title: '个人佣金', icon: 'table' }
      },

    ]
  },
  {
    path: '/dealer/basicset',
    component: Layout,
    redirect: '/dealer/basicset/saleslist',
    name: 'basicset',
    meta: { title: '基础设置', icon: 'example' },
    children: [
      {
        path: 'tooldown',
        name: 'tooldown',
        component: () => import('@/views/basicset/tooldown'),
        meta: { title: '系统工具下载', icon: 'table' }
      },
      {
        path: 'tooldown1',
        name: 'tooldown1',
        component: () => import('@/views/basicset/tooldown1'),
        meta: { title: '系统工具下载', icon: 'table' }
      },
      {
        path: 'tooldown2',
        name: 'tooldown2',
        component: () => import('@/views/basicset/tooldown2'),
        meta: { title: '系统工具下载', icon: 'table' }
      },
      {
        path: 'saleslist',
        name: 'saleslist',
        component: () => import('@/views/basicset/saleslist'),
        meta: { title: '销售顾问管理', icon: 'table' }
      },
      {
        path: 'saledirectslist',
        name: 'saledirectslist',
        component: () => import('@/views/basicset/saledirectslist'),
        meta: { title: '销售总监管理', icon: 'table' }
      },
      {
        path: 'creditslist',
        name: 'creditslist',
        component: () => import('@/views/basicset/creditslist'),
        meta: { title: '信贷专员管理', icon: 'table' }
      },
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import('@/views/basicset/userlist'),
        meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'appraiser',
        name: 'appraiser',
        component: () => import('@/views/basicset/appraiser'),
        meta: { title: '评估师', icon: 'table' }
      }

    ]
  },
  {
    path: '/dealer/together',
    component: Layout,
    redirect: '/dealer/together/notice',
    name: 'together',
    meta: { title: '协同办公', icon: 'example' },
    children: [
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/together/notice'),
        meta: { title: '通知公告', icon: 'table', urlactive: 'notice' }
      },
      {
        path: 'dataList',
        name: 'dataList',
        component: () => import('@/views/together/dataList'),
        meta: { title: '资料管理', icon: 'table', urlactive: 'dataList' }
      },
      {
        path: 'docList',
        name: 'docList',
        component: () => import('@/views/together/docList'),
        meta: { title: '文档管理详情', icon: 'table', urlactive: 'dataList' }
      },
      {
        path: 'togList',
        name: 'togList',
        component: () => import('@/views/together/togList'),
        meta: { title: '通知公告详情', icon: 'table', urlactive: 'notice' }
      },
      {
        path: 'marketInfo',
        name: 'marketInfo',
        component: () => import('@/views/together/marketInfo'),
        meta: { title: '市场信息', icon: 'table', urlactive: 'marketInfo' }
      },
      {
        path: 'maillist',
        name: 'maillist',
        component: () => import('@/views/together/maillist'),
        meta: { title: '通讯录', icon: 'table', urlactive: 'maillist' }
      },

      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/together/video'),
        meta: { title: '案例展示', icon: 'table', urlactive: 'video' }
      },
      {
        path: 'videoshow',
        name: 'videoshow',
        component: () => import('@/views/together/videoshow'),
        meta: { title: '案例展示详情', icon: 'table', urlactive: 'video' }
      },
      {
        path: 'calc',
        name: 'calc',
        component: () => import('@/views/together/calc'),
        meta: { title: '算车贷', icon: 'table', urlactive: 'calc' }
      }
    ]
  },
  {
    path: '/dealer/record',
    component: Layout,
    redirect: '/dealer/record/recorder',
    name: 'record',
    meta: { title: '备案邮寄', icon: 'example' },
    children: [
      {
        path: 'recorder',
        name: 'recorder',
        component: () => import('@/views/record/recorder'),
        meta: { title: '备案管理', icon: 'table', urlactive: 'record' }
      },
      {
        path: 'post',
        name: 'post',
        component: () => import('@/views/record/post'),
        meta: { title: '抵押管理', icon: 'table', urlactive: 'post' }
      },
      {
        path: 'addRecord/:look/:id',
        name: 'addRecord',
        component: () => import('@/views/record/addRecord'),
        meta: { title: '备案管理', icon: 'table', urlactive: 'record' }
      },
      {
        path: 'addPost/:look/:id',
        name: 'addPost',
        component: () => import('@/views/record/addPost'),
        meta: { title: '抵押管理', icon: 'table', urlactive: 'post' }
      }
    ]
  },
  {
    path: '/dealer/sendcard',
    component: Layout,
    redirect: '/dealer/sendcard/addcard',
    name: 'sendcard',
    meta: { title: '证件邮寄', icon: 'example' },
    children: [
      {
        path: 'addcard',
        name: 'addcard',
        component: () => import('@/views/sendcard/addcard'),
        meta: { title: '证件邮寄', icon: 'table', urlactive: 'addcard' }
      },
      {
        path: 'cardrec',
        name: 'cardrec',
        component: () => import('@/views/sendcard/cardrec'),
        meta: { title: '证件接收', icon: 'table', urlactive: 'cardrec' }
      },
      {
        path: 'cardlist',
        name: 'cardlist',
        component: () => import('@/views/sendcard/cardlist'),
        meta: { title: '证件邮寄列表', icon: 'table', urlactive: 'cardlist' }
      },
      {
        path: 'receCard/:id',
        name: 'receCard',
        component: () => import('@/views/sendcard/addcard'),
        meta: { title: '接收证件', icon: 'table', urlactive: 'cardrec' }
      },
      {
        path: 'cardDetail/:id',
        name: 'cardDetail',
        component: () => import('@/views/sendcard/addcard'),
        meta: { title: '查看证件', icon: 'table', urlactive: 'cardrec' }
      },
      {
        path: 'editCard/:id',
        name: 'editCard',
        component: () => import('@/views/sendcard/addcard'),
        meta: { title: '编辑证件', icon: 'table', urlactive: 'cardlist' }
      }
    ]
  },
  {
    path: '/dealer/count',
    component: Layout,
    redirect: '/dealer/count/count',
    name: 'count2',
    hidden: true,
    children: [{
      path: '/dealer/count/count',
      name: 'count',
      component: () => import('@/views/count/count')
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

var vueRouter = new Router({
  //   mode: 'history', 
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

vueRouter.beforeEach(function (to, from, next) {
  if (window.local.viewTimeStamp) {
    var fromTitle = from.meta.title || ((from.fullPath == "/dealer/dashboard") ? '首页' : '未知')
    var toTitle = to.meta.title || ((to.fullPath == "/dealer/dashboard") ? '首页' : '未知')
    let diff = (new Date().getTime() - window.local.viewTimeStamp);
    let desc = `从【${fromTitle}】页面跳转到【${toTitle}】,页面停留${diff}毫秒`
    window.local.viewTimeStamp = new Date().getTime()
    recordRoute(diff, desc)
  } else {
    window.local.viewTimeStamp = new Date().getTime();
  }
  next();
})
export default vueRouter;
