import axios from 'axios'
import store from '../store'

var baseURLStr = window.g.ApiUrl

// if (process.env.NODE_ENV == "development") {
//   baseURLStr = process.env.BASE_API
// }
// 创建axios实例
const service = axios.create({
  baseURL: baseURLStr, // api的base_url
  timeout: 5000  // 请求超时时间
})

if (process.env.NODE_ENV == "development") {
  store.dispatch("PushSocketConnect");
}

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (process.env.NODE_ENV == "development") {
      store.dispatch("PushSocketSenddata", response);
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
