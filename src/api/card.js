/* eslint-disable */
import request from '@/utils/credit'
// 【证件邮寄表单页】
// 证件名称列表
export function cardList(params) {
  const data = params
  return request({
    url: '/S150020/document/getdocumentlist',
    method: 'get',
    data
  })
}

export function jxsName(params) {
  const data = params
  return request({
    url: '/S150020/document/getdealername/' + data,
    method: 'get',
    data
  })
}

// 经销商列表
export function jsxList(params) {
  const data = params
  return request({
    url: '/S150020/document/getdealerlistbycity',
    method: 'post',
    data
  })
}

// 状态
export function commonStatus(params) {
  return request({
    url: 'S150020/SORecord/GetCodeByTypeID?typeid=' + params,
    method: 'get'
  })
}

// 获取默认地址
export function getMailSpinfo(params) {
  const data = params
  return request({
    url: '/S150020/document/getmailspinfo',
    method: 'post',
    data
  })
}

// 证件邮寄&草稿
export function sendCard(params) {
  const data = params
  return request({
    url: '/S150020/document/savemailinginfo',
    method: 'post',
    data
  })
}

// 证件接收
export function receiveCard(params) {
  const data = params
  return request({
    url: '/S150020/document/savereceiveinfo',
    method: 'post',
    data
  })
}

// 【证件邮寄列表页】

// 证件邮寄列表
export function sendList(params) {
  const data = params
  return request({
    url: '/S150020/document/getsendmailinglist',
    method: 'post',
    data
  })
}

// 【证件接收列表页】
// 证件邮寄列表
export function receiveList(params) {
  const data = params
  return request({
    url: '/S150020/document/getreceivemailinglist',
    method: 'post',
    data
  })
}

// 证件详情
export function cardDetail(params) {
  const data = params
  return request({
    url: '/S150020/document/getmailingdetail',
    method: 'post',
    data
  })
}

export function commonDeal(res, successCallback) {
  if (res.data.success == 1) {
    successCallback()
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