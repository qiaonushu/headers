import { LoginAPI } from '@/API'
import { getStorage, setStorage } from '@/utils/storage.js'

const Login = {
  namespaced: true,
  state() {
    return {
      token: getStorage('token') || '',
      refresh_token: getStorage('refresh_token') || '',
      formLogin: {
        mobile: 13888888888,
        code: 246810
      }
    }
  },
  mutations: {
    setToken(state, val) {
      state.token = val
    },
    setRefresh_token(state, val) {
      state.refresh_token = val
    }
  },
  actions: {
    // 表单提交事件
    async getLogin(store) {
      // try{请求成功执行的代码}catch（接收错误）{请求失败执行的代码}
      try {
        // 将参数传给登录接口
        const { data } = await LoginAPI(store.state.formLogin)
        // 保存返回的数据
        store.commit('setToken', data.data.token)
        store.commit('setRefresh_token', data.data.refresh_token)
        setStorage('token', data.data.token)
        setStorage('refresh_token', data.data.refresh_token)
        return Promise.resolve(data) // 返回成功的Promise对象
      } catch (err) {
        return Promise.reject(err) // 返回失败的Promise对象
      }
    }
  }
}

export default Login
