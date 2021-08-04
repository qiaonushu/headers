import axios from 'axios'
import { refreshTokenAPI } from '@/API/UserAPI.js'
import store from '@/store/index.js'
import router from '@/router'
import { clearStorage, setStorage } from './storage.js'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

export default ({ url, method = 'GET', data, headers, params, is_Auto = true }) => {
  return request({
    url,
    method,
    data,
    headers,
    params,
    is_Auto
  })
}

request.interceptors.request.use(
  function(config) {
    // 判断Login.js里的token有没有获取到，在请求头里有没有token
    if (store.state.Login.token.length > 0 && config.headers.Authorization === undefined && config.is_Auto) {
      config.headers.Authorization = `Bearer ${store.state.Login.token}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  function(response) {
    return response
  },
  async function(error) {
    // 对响应错误做点什么
    if (error.response.status === 401) {
      // 续签token
      const { data } = await refreshTokenAPI()
      // 重新保存token
      store.commit('Login/setToken', data.data.token)
      setStorage('token', data.data.token)
      // 将客户发送失败的请求从新发送
      error.config.headers.Authorization = `Bearer ${data.data.token}`
      return request(error.config)
    } else if (error.response.status === 500) {
      store.commit('Login/setToken', '')
      store.commit('Login/setRefresh_Token', '')
      store.commit('setUser', '')
      clearStorage()
      router.push(`/login?path=${router.currentRoute.path}`)
    }
    return Promise.reject(error)
  }
)
