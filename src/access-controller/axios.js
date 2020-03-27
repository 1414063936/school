import Vue from 'vue'
import {Message} from 'element-ui'
import VueAxiosPlugin from 'vue-axios-plugin'
import store from '../store'
import { openLoading, closeLoading } from './loading'

let loadingInstance
Vue.use(VueAxiosPlugin, {
  withCredentials: true,
  timeout: 1000 * 5,
  reqHandleFunc: config => {
    if (config.showLoading !== false) {
      // 全屏遮罩
      loadingInstance = openLoading()
    }
    return config
  },
  reqErrorFunc: error => {
    // 处理请求异常
    closeLoading(loadingInstance)
    Message({ message: error.message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  },
  resHandleFunc: response => {
    closeLoading(loadingInstance)
    return response
  },
  resErrorFunc: error => {
    // 处理通讯异常
    closeLoading(loadingInstance)
    if (error.response && error.response.status) {
      switch (error.response.status) {
        default:
        case 400:
        case 401:
          Message({
            message: error.response.data ? error.response.data.errorMessage : 'Unknown mistake!',
            type: 'error',
            duration: 5 * 1000
          })
          store.dispatch('setLoginStatus', false).then(response => {
            location.reload()
          })
          break
        case 404:
          Message({message: 'Resource does not exist！', type: 'error', duration: 5 * 1000})
          break
        case 403:
          Message({message: 'Resource not available！', type: 'error', duration: 5 * 1000})
          break
        case 504:
          Message({message: 'Request timed out！', type: 'error', duration: 5 * 1000})
          break
      }
    }

    return Promise.reject(error)
  }
})
