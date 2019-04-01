import request from '@/utils/credit'
// 协同平台
export function notice(params) {
  const data = params
  return request({
    url: '/S110031/notice/post',
    method: 'post',
    data
  })
}
export function noticeread(params) {
  return request({
    url: '/S110031/notice/get?msg=' + params,
    method: 'get'
  })
}
export function Activity(params) {
  const data = params
  return request({
    url: '/S110031/Activity/post ',
    method: 'post',
    data
  })
}
export function Market(params) {
  const data = params
  return request({
    url: '/S110031/Market/post ',
    method: 'post',
    data
  })
}
export function downloadread(params) {
  return request({
    url: '/S110031/download/get?msg=' + params,
    method: 'get'
  })
}
export function download(params) {
  const data = params
  return request({
    url: '/S110031/download/post',
    method: 'post',
    data
  })
}
export function noticecontent(params) {
  return request({
    url: '/S110031/noticecontent/get?msg=' + params,
    method: 'get'
  })
}
export function downloadcontent(param) {
  return request({
    url: '/S110031/downloadcontent/get?msg=' + param,
    method: 'get'
  })
}
export function AddList() {
  return request({
    url: '/S110031/AddList/get',
    method: 'get'
  })
}
// export function Market(params) {
//   const data = params
//   return request({
//     url: '/S110031/Market/post ',
//     method: 'post',
//     data
//   })
// }
export function Case() {
  return request({
    url: '/S110031/Case/get',
    method: 'get'
  })
}
export function getPendingTask(params) {
  const data = params
  return request({
    url: '/S100011/home/getPendingTask',
    method: 'post',
    data
  })
}
export function getCharData(params) {
  const data = params
  return request({
    url: '/S100011/home/getChartData',
    method: 'post',
    data
  })
}
export function dealerlist(params) {
  const data = params
  return request({
    url: '/S100011/statistical/dealerlist',
    method: 'post',
    data
  })
}
export function loanlist(params) {
  const data = params
  return request({
    url: '/S100011/statistical/loanlist',
    method: 'post',
    data
  })
}
export function loanbacklist(params) {
  const data = params
  return request({
    url: '/S100011/statistical/loanbacklist',
    method: 'post',
    data
  })
}
export function applicationbacklist(params) {
  const data = params
  return request({
    url: '/S100011/statistical/applicationbacklist',
    method: 'post',
    data
  })
}
export function loanlistexport(params) {
  // const data = params
  return request({
    url: '/S100011/statistical/loanlistexport/',
    method: 'get',
    params
  })
}
// 案例展示

export function casecontent(params) {
  return request({
    url: '/S110031/casecontent/get?msg=' + params,
    method: 'get'
  })
}

/** 算车贷 **/
// 获取制造商
export function getMaker(params) {
  return request({
    url: '/S100011/vehicle/getMaker',
    //url: 'http://10.50.132.161:33011/vehicle/getMaker',
    method: 'get'
  })
}
// 获取车型
export function getModel(makerid) {
  return request({
    url: '/S100011/vehicle/getModel?makerid=' + makerid,
    //url: 'http://10.50.132.161:33011/vehicle/getModel?makerid=' + makerid,
    method: 'get',
  })
}
// 获取车款
export function getStyle(modelid) {
  return request({
    url: '/S100011/vehicle/getStyle?modelid=' + modelid,
    //url: 'http://10.50.132.161:33011/vehicle/getStyle?modelid=' + modelid,
    method: 'get'
  })
}
// 获取车款指导价
export function getPrice(styleid) {
  return request({
    url: '/S100011/vehicle/getPrice?styleid=' + styleid,
    //url: 'http://10.50.132.161:33011/vehicle/getPrice?styleid=' + styleid,
    method: 'get'
  })
}
// 获取金融产品
export function getFinancialInfo(styleid) {
  return request({
    url: '/S100011/calc/getFinancialInfo?styleid=' + styleid,
    //url: 'http://10.50.132.161:33011/calc/getFinancialInfo?styleid=' + styleid,
    method: 'get'
  })
}
// 计算
export function create(params) {
  return request({
    url: '/S100011/calc/create',
    //url: 'http://10.50.132.161:33011/calc/create',
    method: 'post',
    data: params
  })
}