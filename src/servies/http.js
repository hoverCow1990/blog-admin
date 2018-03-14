import Axios from 'axios'
import $Constant from '../config/constant.js'

Axios.defaults.timeout = 30000

// 请求拦截器
Axios.interceptors.request.use(config => {
  // const USI = Vue.prototype.$Auth.get()
  // if (USI.token && !!config.addAuth) {
  //   config.headers.common[Vue.prototype.$Constant.tokenName] = USI.token
  // }
  return config
}, err => Promise.reject(err))

// 响应拦截器
Axios.interceptors.response.use(result => {
  return result.data
}, err => {
  console.log(err)
  if (err.response && [403, 401].indexOf(err.response.status) !== -1) {
    window.location = $Constant.URL.homePage
  }
  return Promise.reject(err)
})

export default Axios
