import request from '@/utils/credit'

// 订单列表
export function getMove(params) {
  const data = params
  return request({
    url: 's160011/wechatorder/application',
    method: 'post',
    data
  })
}

export function moveDel(params) {
  const data = params
  return request({
    url: 's160011/wechatorder/delete',
    method: 'post',
    data
  })
}

export function moveToacs(params) {
  const data = params
  return request({
    url: 's160011/wechatorder/sendtoacs',
    method: 'post',
    data
  })
}

// 特殊业务
export function specialtask(params) {
  const data = params
  return request({
    url: 'S100011/order/specialtask',
    method: 'post',
    data
  })
}
