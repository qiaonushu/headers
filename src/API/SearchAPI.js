import request from '@/utils/request.js'

export const GetSuggestionAPI = q => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const GetSearchAPI = ({ q, page = 1 }) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page
    }
  })
}
