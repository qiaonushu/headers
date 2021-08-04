import Vue from 'vue'
import Vuex from 'vuex'
import Home from '@/store/modules/Home.js'
import Login from '@/store/modules/Login.js'
import Article from '@/store/modules/Article.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Home,
    Login,
    Article
  }
})

export default store
