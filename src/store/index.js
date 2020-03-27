import Vue from 'vue'
import Vuex from 'vuex'
import VuexConnector from '@xunlei/vuex-connector'

import modules from './modules'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: modules,
  getters: getters
})

export const connector = new VuexConnector(store)
export default store
