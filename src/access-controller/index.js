import Vue from 'vue'
import './axios'
import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { openLoading, closeLoading } from './loading'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
NProgress.configure({ showSpinner: false })

Vue.prototype.$openLoading = openLoading
Vue.prototype.$closeLoading = closeLoading

const routeWhiteList = ['/login', '/401', '/404']
// 路由钩子函数
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar

  if (routeWhiteList.includes(to.path)) {
    next()
  } else {
    // 若未登录，强行跳转到登录页面
    const isLogin = store.getters.isLogin
    if (isLogin === true || isLogin === 'true') {
      next()
    } else {
      next('/login')
      NProgress.done() // finish progress bar
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

const getAccessMenus = () => {
  axios.get('/menu', {params: {userAccessLevel: 100}})
    .then(response => {
      store.dispatch('setSideBarMenus', response.data.menus)
    })
}

getAccessMenus()

export default {

}
