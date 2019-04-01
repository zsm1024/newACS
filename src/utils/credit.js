import axios from 'axios'
import Cookies from 'js-cookie'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import { reportApiError } from './behavior'

var arrExceptUrl = ['S100011/order/deladdress','S100011/img/saveinfo']
var baseURLStr = window.g.ApiUrl
let cancelToken = axios.CancelToken;
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let removePending = (ever) => {
  if (!arrExceptUrl.includes(ever.url) ) {
    for (let p in pending) {
      if (pending[p].u === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
        pending[p].f(); //执行取消操作
        pending.splice(p, 1); //把这条记录从数组中移除
      }
    }
  }
  
}
// if(process.env.NODE_ENV=="development"){
//     baseURLStr = process.env.BASE_API
// }
// 创建axios实例
const service = axios.create({
  baseURL: baseURLStr, // api的base_url
  timeout: 15000 // 请求超时时间
})
if (process.env.NODE_ENV == "development") {
  store.dispatch("PushSocketConnect");
}

// request拦截器
service.interceptors.request.use(config => {
  removePending(config); //在一个ajax发送前执行一下取消操作
  config.cancelToken = new cancelToken((c) => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({ u: config.url + '&' + config.method, f: c });
  });
  if (store.getters.token) {
    var token = getToken()
    config.headers['Authorization'] = 'Bearer ' + token
    // 让每个请求携带自定义token 请根据实际情况自行修改
    // Cookies.set('_token', token)
    // Cookies.set('Admin-Token', token)
    // config.headers['Postman-Token'] = '842d2c36-331a-4a08-a403-5cbfe8ad38e8'

  } else {
    location.href = '/login.html'
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
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
    if (error.request) {
      reportApiError(error.request.status, 'apierror:' + JSON.stringify(error.request.custom.options))
      if (error.request.status == '401') {
        location.href = '/login.html'
      } else {
        console.log('err' + error)// for debug
        Message({
          showClose: true,
          message: '服务器错误，请联系运维管理员',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(error)
    }
  }
)

export default service
