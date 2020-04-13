import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Business from './business'

Vue.use(Router)

// Navigating to current location ("XXXXXX") is not allowed
// https://www.jianshu.com/p/a140ad42ef00
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

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
