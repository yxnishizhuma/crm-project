import axios from 'axios'
import router from './router'

// 此处为axios配置请求头，
axios.interceptors.request.use(
  config => {
    // 此处做请求拦截，如果有需要
    let token = localStorage.getItem('token') || ''
    if (!config.url.includes('login')) {
      config.headers = {
        'content-type': 'application/json',
        'Authorization': token
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    // console.log(response,'response')
    if (response.status === 200 && response.request.status === 200) {
      // if (response.data) {
      return response.data
    }
    return response
  },
  error => { // 失败判断
    console.log(error,'error',error.response)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (!error.response.config.url.includes('login')) {
            //   router.replace({
            //     path: "/login"
            // });
            // store.dispatch('clearToken').then(() => location.reload())
          }
      }
    }
    return Promise.reject(error.response.data)
  }
)

export default axios
