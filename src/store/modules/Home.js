import { GetUserChannelsAPI, GetChannelsAPI, PutUserChannelsAPI } from '@/API'

const Home = {
  namespaced: true,
  state() {
    return {
      channelsList: [],
      AllChannelsList: []
    }
  },
  mutations: {
    getChannels(state, val) {
      state.channelsList = val
    },
    getAllChannels(state, val) {
      state.AllChannelsList = val
    }
  },
  actions: {
    async GetUserchannels(store) {
      try {
        const { data } = await GetUserChannelsAPI()
        store.commit('getChannels', data.data.channels)
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async Getchannels(store) {
      try {
        const { data } = await GetChannelsAPI()
        store.commit('getAllChannels', data.data.channels)
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async PutUserChannels(store) {
      try {
        const { data } = await PutUserChannelsAPI(store.getters.updataChannelsList)
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      }
    }
  },
  getters: {
    updataChannelsList(state) {
      return state.channelsList.filter((item, index) => {
        if (item.id !== 0) {
          return { seq: (item.seq = index + 1), id: item.id }
        }
      })
    }
  }
}

export default Home
