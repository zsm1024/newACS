import request from '@/utils/credit'
// 基础code码
export function getVersionInfo(params) {
  return request({
    url: '/S100011/Common/getVersionInfo',
    method: 'get',
    params
  })
}
// 基础设置销售专员
export function getsalelist(params) {
  const data = params
  return request({
    url: '/S100011/sale/getsalelist',
    method: 'post',
    data
  })
}
export function getsaledirectslist(params) {
  const data = params
  return request({
    url: '/S100011/sale/getsaledirectorlist',
    method: 'post',
    data
  })
}
export function addsaledirector(params) {
  const data = params
  return request({
    url: '/S100011/sale/addsaledirector',
    method: 'post',
    data
  })
}

export function addsale(params) {
  const data = params
  return request({
    url: '/S100011/sale/addsale',
    method: 'post',
    data
  })
}

export function upsale(params) {
  const data = params
  return request({
    url: '/S100011/sale/upsale',
    method: 'post',
    data
  })
}

export function deletesale(params) {
  const data = params
  return request({
    url: '/S100011/sale/deletesale',
    method: 'post',
    data
  })
}

// 基础设置信贷专员
export function getcreditlist(params) {
  const data = params
  return request({
    url: '/S100011/sale/getcreditlist',
    method: 'post',
    data
  })
}

export function addcredit(params) {
  const data = params
  return request({
    url: '/S100011/sale/addCredit',
    method: 'post',
    data
  })
}

export function upcredit(params) {
  const data = params
  return request({
    url: '/S100011/sale/upsale',
    method: 'post',
    data
  })
}

export function deletecredit(params) {
  const data = params
  return request({
    url: '/S100011/sale/deletesale',
    method: 'post',
    data
  })
}

// 基础设置评估师
export function getApplist(params) {
  const data = params
  return request({
    url: '/S100011/sale/getApplist',
    method: 'post',
    data
  })
}

export function addAppraiser(params) {
  const data = params
  return request({
    url: '/S100011/sale/addAppraiser',
    method: 'post',
    data
  })
}

export function upappraiser(params) {
  const data = params
  return request({
    url: '/S100011/sale/upAppraiser',
    method: 'post',
    data
  })
}

export function deleteApp(id) {
  return request({
    url: '/S100011/sale/delAppraiser?id=' + id,
    method: 'post'
  })
}

export function postTool() {
  return request({
    url: '/S100011/dealer/GetDownloadInfo/',
    method: 'post'
  })
}

export function getInfoSalers(params) {
  return request({
    url: '/S100011/user/info',
    method: 'post'
  })
}

export function getAllCredit() {
  return request({
    url: '/S100011/dealer/getAllCredit',
    method: 'post'
  })
}

