import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function getMove(params) {
  return request({
    url: '/move/inlist',
    method: 'get',
    params
  })
}
