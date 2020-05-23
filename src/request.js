// import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'

axios.defaults.withCredentials = false

// 创建 axios 实例
const service = axios.create({
  baseURL: '/', // api base_url
  timeout: 6000, // 请求超时时间
  // withCredentials: true,
})

// const err = (error) => {
//   if (error.response) {
//     const data = error.response.data
//     const token = Vue.ls.get(ACCESS_TOKEN)
//     if (error.response.status === 403) {
//       notification.error({
//         message: 'Forbidden',
//         description: data.message
//       })
//     }
//     if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
//       notification.error({
//         message: 'Unauthorized',
//         description: 'Authorization verification failed'
//       })
//       if (token) {
//         store.dispatch('Logout').then(() => {
//           setTimeout(() => {
//             window.location.reload()
//           }, 1500)
//         })
//       }
//     }
//   }
//   return Promise.reject(error)
// }

// 不需要携带token的路径
// const notTakeTokenPath = [
//   '/admin/login',
//   '/admin/refresh',
//   '/admin/logout'
// ]

// request interceptor
service.interceptors.request.use(async config => {
  // 遇到不需要携带token的接口，则直接返回config
  // console.log(notTakeTokenPath.indexOf(config.url), config)
  // if (notTakeTokenPath.indexOf(config.url) > -1) {
  //   return config
  // }
  // let token = Vue.ls.get(ACCESS_TOKEN)
  // let tokenType = Vue.ls.get(TOKEN_TYPE)
  // const refreshToken = Vue.ls.get(REFRESH_TOKEN)

  // 如果token过期或者丢失，则刷新token
  // if (!token || !tokenType) {
  //   const refreshRes = await service({
  //     url: '/admin/refresh',
  //     method: 'post',
  //     data: {
  //       refresh_token: refreshToken
  //     }
  //   })
  //   Vue.ls.set(ACCESS_TOKEN, refreshRes.data.access_token, refreshRes.data.expires_in)
  //   Vue.ls.set(REFRESH_TOKEN, refreshRes.data.refresh_token)
  //   Vue.ls.set(TOKEN_TYPE, refreshRes.data.token_type)
  //   token = refreshRes.data.access_token
  //   tokenType = refreshRes.data.token_type
  // }
  // config.headers['Authorization'] = `${tokenType} ${token}`
  return config
}, () => {})

// response interceptor
service.interceptors.response.use((response) => {
  const res = response.data;
  if (res.status === 0) {
    Router.router.push({ name: 'login' })
    return false
  }
  return response.data
}, () => {})

// const installer = {
//   vm: {},
//   install (Vue) {
//     Vue.use(VueAxios, service)
//   }
// }

export default service
