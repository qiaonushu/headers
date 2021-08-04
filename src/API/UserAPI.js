import request from '@/utils/request.js'
import store from '@/store'

export const LoginAPI = ({ mobile, code }) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POSt',
    data: {
      mobile,
      code
    },
    is_Auto: false
  })
}

export const refreshTokenAPI = () => {
  return request({
    url: '/v1_0/authorizations',
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${store.state.Login.refresh_token}`
    }
  })
}

export const GetUserAPI = () => {
  return request({
    url: '/v1_0/user'
  })
}

export const GetUserProfile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

export const PatchUserPhoto = photo => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: photo
  })
}

export const PatchUserProfile = ({ birthday, name }) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      birthday,
      name
    }
  })
}
