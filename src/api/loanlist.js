import request from '@/utils/credit'

// 订单列表
export function postLoanlist(params) {
  const data = params
  return request({
    url: 'S100011/Contract/GetList',
    method: 'post',
    data
  })
}
// 订单详情
export function getLoaninfo(params) {
  return request({
    url: 'S100011/Contract/ContractInfo?key=' + params,
    method: 'get'
  })
}
// 特殊业务申请
export function getNewSpecial(params) {
  return request({
    url: 'S100011/Special/NewSpecial?contractid=' + params,
    method: 'get'
  })
}
// 特殊业务申请列表
export function getSpeciallist(params) {
  return request({
    url: 'S100011/Special/GetSpecialList?contractid=' + params,
    method: 'get'
  })
}
// 特殊业务申请
export function postSpecialsub(params) {
  const data = params
  return request({
    url: 'S100011/Special/SpecialApplySubmit',
    method: 'post',
    data
  })
}
// 获取开户人列表
export function getArtys(params) {
  return request({
    url: 'S100011/Contract/GetArtys?contractid=' + params,
    method: 'get'
  })
}

// 获取图片预览
export function ordergetcontractimage(params) {
  return request({
    url: 'S100011/contract/getImage?id=' + params,
    method: 'post'
  })
}
// 获取图片预览
export function contractgethouimage(params) {
  return request({
    url: 'S100011/contract/replenish-images?id=' + params,
    method: 'post'
  })
}
// 获取客户授权图片
export function contractgetoldimage(params) {
  return request({
    url: 'S100011/contract/before-signed-images?id=' + params,
    method: 'post'
  })
}
// 放款保存
export function postContractSave(params) {
  const data = params
  return request({
    url: 'S100011/contract/Save',
    method: 'post',
    data
  })
}

// 放款保存
export function postContractSubmit(params) {
  const data = params
  return request({
    url: 'S100011/contract/Submit',
    method: 'post',
    data
  })
}
// 放款签署验证
export function postContractSaveCheck(params) {
  const data = params
  return request({
    url: 'S100011/contract/SaveCheck',
    method: 'post',
    data
  })
}
// 放款签署
export function postContractSign(params) {
  const data = params
  return request({
    url: 'S100011/Contract/SignContract',
    method: 'post',
    data
  })
}
// 撤回
export function postcontractCancel(params) {
  const data = params
  return request({
    url: 'S100011/contract/cancel',
    method: 'post',
    data
  })
}

// 放弃退回
export function postcontractGiveup(params) {
  const data = params
  return request({
    url: 'S100011/contract/giveup',
    method: 'post',
    data
  })
}
// 获取打印按钮
export function getPrintBtn(params) {
  return request({
    url: 'S100011/Contract/GetPrintBtnList?contractid=' + params,
    method: 'get'
  })
}

// 获取流程审批的按钮
export function getLoanCurrentTaskCmd(params) {
  return request({
    url: 'S100011/wf/getCurrentTaskCmd?dataid=' + params,
    method: 'get'
  })
}
// 流程提交
export function postWfSubmit(params) {
  const data = params
  return request({
    url: 'S100011/contract/WfSubmit',
    method: 'post',
    data
  })
}

// 获取反欺诈列表接口

export function getPartyInfo(params) {
  return request({
    url: 'S100011/contract/getPartyInfo?key=' + params,
    method: 'get'
  })
}
// 获取反欺诈列表详情接口

export function getChangecardInfo(params) {
  return request({
    url: 'S100011/contract/getChangeCardInfo?key=' + params,
    method: 'get'
  })
}
// 更新反欺诈列表详情接口

export function UpdateChangeCardInfo(params) {
  const data = params
  return request({
    url: 'S100011/contract/UpdateChangeCardInfo',
    method: 'post',
    data
  })
}

