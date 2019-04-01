import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

var baseURLStr = window.g.ApiUrl

if (process.env.NODE_ENV == 'development') {
  baseURLStr = process.env.BASE_API
}
// 创建axios实例
const service = axios.create({
  baseURL: baseURLStr, // api的base_ur
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  config.headers['Authorization'] = 'Bearer ' + ' eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiYzE0OGFhOGNhZGJmNzc4MDNhMGIxZWQ3MjY5YjZmIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NTA4MDYwNTIsImV4cCI6MTU1MDg2MzY1MiwiaXNzIjoiaHR0cDovL2lkNC1kZXYuZ3dtZmMuY29tIiwiYXVkIjpbImh0dHA6Ly9pZDQtZGV2Lmd3bWZjLmNvbS9yZXNvdXJjZXMiLCJhcGkxIl0sImNsaWVudF9pZCI6ImRlYWxlci5hY3MiLCJzdWIiOiIwMDAwMzk3MCIsImF1dGhfdGltZSI6MTU1MDgwNjA1MiwiaWRwIjoibG9jYWwiLCJuYW1lIjoiMDAwMDM5NzAiLCJzY29wZSI6WyJhcGkxIl0sImFtciI6WyJCZWFyZXIiXX0.V8B4igt0-y1gt2Qwm4c6K0uCwFpmEsswrjRqu9F5Dl_wAAnIAdO2GKgYgmEA1HALZhn37Ukx7pbzPEJUVtCbDG6WTJEPZlqjkTfzNxb4lrQ9QzaTIbuyvUcZQl-WJgFjG7yH_XNqh7J11Is98fDlmsOiPAHqCZ7jFHZ2_qtBcwsnW97ut-EtMVSOnjRMAX74pqz0l1vXoV0VVZ115B4V9i8c1ISKQa-JB38Q2rNpymuxiiWMKhYKoKGcuXjpSjEEiisxtCer0hWF6tzlTIetodxFMkvRXuhDX6jJBqAx77M9TQtTeGEgUne2W1ckUfNn982QDkcnPToWIri0mzA6jg'
  // getToken()
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
