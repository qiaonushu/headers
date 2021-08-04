import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
import Layout from '@/views/Layout'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/layout' },
  { path: '/login', component: () => import(/* webpackChunkName:'login' */ '@/views/Login') },
  { path: '/search', component: () => import(/* webpackChunkName:'search' */ '@/views/Search') },
  { path: '/searchresult/:q', component: () => import(/* webpackChunkName:'searchresult' */ '@/views/SearchResult') },
  {
    path: '/articledetails/:id',
    component: () => import(/* webpackChunkName:'articledetails' */ '@/views/ArticleDetails')
  },
  { path: '/xs', component: () => import(/* webpackChunkName:'xs' */ '@/views/Xs-Student') },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      { path: 'user', component: () => import(/* webpackChunkName:'user' */ '@/views/Layout/User') },
      { path: 'home', component: () => import(/* webpackChunkName:'home' */ '@/views/Layout/Home') },
      { path: 'setdata', component: () => import(/* webpackChunkName:'setdata' */ '@/views/Layout/SetData') }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (store.state.Login.token.length > 0 && to.path === '/login') {
    next(false)
  } else {
    next()
  }
})

export default router
