import request from '@/utils/bcredit'

// 异常日志
export function reportError(cid, m) {
  return request({
    url: 'S400031/hlskdjfls/bienp21?cid=' + cid + '&m=' + encodeURIComponent(m),
    method: 'get'
  })
};

// 行为日志
export function reportBehavior(params) {
  const data = params
  return request({
    url: 'S400031/hlskdjfls/bienp02',
    method: 'post',
    data
  })
};