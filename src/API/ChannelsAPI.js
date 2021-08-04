import request from '@/utils/request.js'
import store from '@/store/index.js'

export const GetUserChannelsAPI = () => {
  return request({
    url: '/v1_0/user/channels',
    headers: {
      Authorization: `Bearer ${store.state.Login.token}`
    }
  })
}

export const GetChannelsAPI = () => {
  return request({
    url: '/v1_0/channels',
    is_Auto: false
  })
}

export const PutUserChannelsAPI = channels => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
