import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Business from './business'

Vue.use(Router)

const staticRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const routes = staticRoutes.concat(Business)

export default new Router({
  routes: routes
})
