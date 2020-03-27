import { syncHttpGet } from '@/utils/jqueryAjax'

let systemConfig = {}

syncHttpGet('./static/config/system.json', {}, (data, textStatus, jqXHR) => {
  systemConfig = data
})

const system = {
  state: {
    system: systemConfig
  },
  mutations: {},
  actions: {}
}

export default system
