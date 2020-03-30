// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import i18n from './i18n'
import router from './router'
import store from './store'
// element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/assets_bk/theme/index.css'

// axios插件、路由拦截
import './access-controller/index'

// mock data
import './mock'

import { Plugin } from 'vue-fragment'

// ECharts
import walden from '@/assets/echarts/theme/walden.json'
import VueECharts from 'vue-echarts/components/ECharts'

// v-charts
import VChartsLine from 'v-charts/lib/line.common'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/polar'

import 'echarts'

import './assets/icon/icon-cn/iconfont.css'
import './assets/icon/material/iconfont.css'
import './assets/styles/global.css'

// 注册组件
import '@/components/index'

Vue.use(Element, {
  size: 'mini',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(Plugin)

Vue.component('v-chart', VueECharts)
VueECharts.registerTheme('walden', walden)

Vue.component(VChartsLine.name, VChartsLine)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
