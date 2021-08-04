import request from '@/utils/request.js'

export const GetCommentsAPI = ({ type = 'a', source, offset, limit = 10 }) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}

export const PostCommentLikingsAPI = target => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

export const DeleteCommentLikingsAPI = id => {
  return request({
    url: '/v1_0/comment/likings/' + id,
    method: 'DELETE'
  })
}

export const PostCommentsAPI = ({ content, target }) => {
  console.log(content, target)
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      content,
      target
    }
  })
}
