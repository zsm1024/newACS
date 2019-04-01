import request from '@/utils/baseurl'
// 获取产品
export function produce(params) {
  return request({
    url: '/Common/invoke',
    method: 'post',
    data: params,
    transformRequest: [function(data) {
      let ret = ''
      // eslint-disable-next-line
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// 获取金融产品
export function jinrong(params) {
  return request({
    url: '/Common/invoke',
    method: 'post',
    data: params,
    transformRequest: [function(data) {
      let ret = ''
      // eslint-disable-next-line
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
