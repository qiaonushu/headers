import request from '@/utils/request.js'

export const GetArticleAPI = ({ channel_id, pre_timestamp }) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id,
      timestamp: pre_timestamp || new Date().getTime()
    },
    is_Auto: false
  })
}

export const PostDislikesAPI = ({ target }) => {
  return request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target
    }
  })
}

export const PostReportsAPI = ({ target, type, remark }) => {
  console.log(target, type, remark)
  return request({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target,
      type,
      remark
    }
  })
}

export const GetArticleDetailsAPI = id => {
  return request({
    url: '/v1_0/articles/' + id
  })
}

export const PostUserFollowingsAPI = target => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

export const DeleteUserFollowingsAPI = id => {
  return request({
    url: '/v1_0/user/followings/' + id,
    method: 'DELETE'
  })
}

export const PostArticleLikingsAPI = target => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

export const DeleteArticleLikingsAPI = id => {
  return request({
    url: '/v1_0/article/likings/' + id,
    method: 'DELETE'
  })
}
