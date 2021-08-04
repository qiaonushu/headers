import { PostDislikesAPI, PostReportsAPI, GetArticleDetailsAPI } from '@/API'

const Article = {
  namespaced: true,
  state() {
    return {
      target: ''
    }
  },
  mutations: {
    getTarget(state, val) {
      state.target = val
    }
  },
  actions: {
    async Postdislikes(store, val) {
      try {
        const { data } = await PostDislikesAPI(val)
        store.commit('getTarget', data.data.target)
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async Postreports(store, val) {
      try {
        const { data } = await PostReportsAPI(val)
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async GetArticleDetails(store, val) {
      try {
        const { data } = await GetArticleDetailsAPI(val)
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

export default Article
