import request from '@/utils/credit'
// 个人佣金
export function getPerson(params) {
  const data = params
  return request({
    url: '/S150011/personcommission/getlist',
    method: 'post',
    data
  })
}
// 返利管理
export function PostFanliceshi(params) {
  return request({
    responseType: 'arraybuffer',
    headers: {
      'Accept': 'application/vnd.ms-excel',
      'Content-Type': 'application/vnd.ms-excel;'
    },
    url: '/S150011/excel/exportget/' + params.qaid + '/' + params.dealerid,
    method: 'post'
  })
}
export function getFanliStatus(params) {
  const data = params
  return request({
    url: '/S150011/basecommission/getstatus',
    method: 'post',
    data
  })
}
export function getFanliLists(params) {
  const data = params
  return request({
    url: '/S150011/basecommission/getlist',
    method: 'post',
    data
  })
}
export function getFanliInfo(params) {
  const data = params
  return request({
    url: '/S150011/basecommission/getbasedealerinfo',
    method: 'post',
    data
  })
}
export function getFanliAttachs(params) {
  const data = params
  return request({
    url: '/S150011/basecommission/getbasedealerattachs',
    method: 'post',
    data
  })
}
export function getFanliInfoList(params) {
  const data = params
  return request({
    url: '/S150011/basecommission/getbasecontractlist',
    method: 'post',
    data
  })
}
export function PostFanliConfrim(params) {
  const data = params
  return request({
    url: '/S150011/basecommission/confirmreceipt',
    method: 'post',
    data
  })
}
export function PostFanliHistory(params) {
  const data = params
  return request({
    url: '/S150011/basecommission/receipthistory',
    method: 'post',
    data
  })
}
export function PostFanliDoConfirm(params) {
  const data = params
  return request({
    url: '/S150011/basecommission/confirmexpress',
    method: 'post',
    data
  })
}
export function PostFanliGetexpresslist(params) {
  const data = params
  return request({
    url: '/S150011/basecommission/getexpresslist',
    method: 'post',
    data
  })
}
export function PostFanliConfirmReceivemoney(params) {
  const data = params
  return request({
    url: '/S150011/basecommission/confirmreceivemoney',
    method: 'post',
    data
  })
}
// 季度优胜奖
export function getQuarter(params) {
  return request({
    url: '/S150011/quarterawards/getquarter',
    method: 'get',
    params
  })
}

export function getPoststate(params) {
  return request({
    url: '/S150011/quarterawards/getpoststate',
    method: 'get',
    params
  })
}

export function getQuarterList(params) {
  const data = params
  return request({
    url: '/S150011/quarterawards/getqaslist',
    method: 'post',
    data
  })
}

export function getTwfList(params) {
  const data = params
  return request({
    url: '/S150011/quarterawards/getwflist',
    method: 'post',
    data
  })
}

export function PostSendPost(params) {
  const data = params
  return request({
    url: '/S150011/quarterawards/setexpressinfo',
    method: 'post',
    data
  })
}

export function getDealerList(params) {
  const data = params
  return request({
    url: '/S150011/quarterawards/getdealer',
    method: 'post',
    data
  })
}

export function GetSendPost(params) {
  const data = params
  return request({
    url: '/S150011/quarterawards/getexpressinfo',
    method: 'post',
    data
  })
}

export function PostSendConfirm(params) {
  const data = params
  return request({
    url: '/S150011/quarterawards/confirm',
    method: 'post',
    data
  })
}

export function PostAccount(params) {
  const data = params
  return request({
    url: '/S150011/quarterawards/transf2account',
    method: 'post',
    data
  })
}

export function PostExportExcel(params) {
  return request({
    url: '/S150011/excel/exportget?titleid=' + params.id,
    method: 'get'
  })
}

