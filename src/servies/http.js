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
  // Vue.prototype.$Pulgin.loading.close()
  // if (!err.response) {
  //   Vue.prototype.$Pulgin.toast({
  //     message: '访问超时，请稍后再试',
  //     type: 'error'
  //   })
  // } else {
  //   if ([404, 500, 501, 503, 504].indexOf(err.response.status) !== -1) {
  //     Vue.prototype.$Pulgin.toast({
  //       message: Vue.prototype.$Constant.apiMessage.common.unknown,
  //       type: 'error'
  //     })
  //   } else if ([400].indexOf(err.response.status) !== -1) {
  //     let messageArr = err.response.data.message.split(':')
  //     Object.assign(err.response.data, {
  //       code: messageArr.length > 1 ? messageArr[0] : '',
  //       message: messageArr.length > 1 ? messageArr[1] : messageArr[0]
  //     })
  //     Vue.prototype.$Pulgin.toast({
  //       message: err.response.data.message,
  //       type: 'error'
  //     })
  //   } else if ([403, 401].indexOf(err.response.status) !== -1) {
  //     if (!err.config.notAuthJump) {
  //       Vue.prototype.$Pulgin.toast(Vue.prototype.$Constant.apiMessage.common.userFail)
  //       Vue.prototype.$Auth.remove()
  //       Vue.prototype.$Navigation.goLogin()
  //     }
  //   }
  if ([403, 401].indexOf(err.response.status) !== -1) {
    window.location = $Constant.URL.homePage
  }
  return Promise.reject(err)
})

export default Axios