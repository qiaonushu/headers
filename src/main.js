import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.less'
import '@vant/touch-emulator'
import 'amfe-flexible'
import '@/utils/GlobalMethod//Focus.js'

Vue.config.productionTip = false

Vue.use(Vant)

Vue.use(Lazyload, {
  lazyComponent: true
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
