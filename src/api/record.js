/* eslint-disable */
import request from '@/utils/credit'
// 【抵押备案板块】
//  获取备案管理状态接口
export function beianStatus(params) {
  return request({
    url: 'S150020/SORecord/GetCodeByTypeID?typeid=' + params,
    method: 'get'
  })
}
// 历史备案信息列表
export function recorderList(params) {
  const data = params
  return request({
    url: 'S150020/SORecord/GetRecordList',
    method: 'post',
    data
  })
}

// 新增备案信息
export function addRecord(params) {
  const data = params
  return request({
    url: 'S150020/SORecord/SaveRecordApply',
    method: 'post',
    data
  })
}
// 查看备案信息
export function getRecordInfo(params) {
  return request({
    url: 'S150020/SORecord/GetRecordInfo?id='+params,
    method: 'get',
  })
}
// 删除备案信息
export function delRecordApply(params) {
  const data = params
  return request({
    url: 'S150020/SORecord/DelRecordApply',
    method: 'post',
    data
  })
}



// 历史抵押申请列表
export function postLIst(params) {
  const data = params
  return request({
    url: 'S150020/SOMortgage/GetMortgageList',
    method: 'post',
    data
  })
}

// 抵押资料详情
export function getMortgageInfo(params) {
  return request({
    url: 'S150020/SOMortgage/GetMortgageInfo?id='+params,
    method: 'get',
  })
}
//新增抵押备案
export function saveMortgageApply(params) {
  const data = params
  return request({
    url: 'S150020/SOMortgage/SaveMortgageApply',
    method: 'post',
    data
  })
}

// 删除抵押资料申请
export function delMortgageApply(params) {
  const data = params
  return request({
    url: 'S150020/SOMortgage/DelMortgageApply',
    method: 'post',
    data
  })
}


// 获取留言
export function getMESSAGEList(i,id) {
  return request({
    url: 'S150020/SORecord/GetMESSAGEList?id='+ id+'&oper='+i,
    method: 'get'
  })
}

// 添加留言
export function saveMESSAGE(params) {
  const data = params
  return request({
    url: 'S150020/SORecord/SaveMESSAGE',
    method: 'post',
    data
  })
}
// 删除附件
export function delRecordFile(params) {
  return request({
    url: 'S150020/SORecord/DelRecordFile?id='+params,
    method: 'get',
  })
}
/* get请求实例
export function orderNewType(params) {
  return request({
    url: 'S100011/order/new/' + params,
    method: 'get'
  })
}
*/
