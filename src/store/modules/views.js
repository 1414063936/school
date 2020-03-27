import Handlebars from 'handlebars/dist/handlebars'
import view from '../../../static/config/view.json'
import { syncHttpGet } from '@/utils/jqueryAjax'

let systemConfig = {}
syncHttpGet('./static/config/system.json', {}, (data, textStatus, jqXHR) => {
  systemConfig = data
})

const source = JSON.stringify(view)
const tpl = Handlebars.compile(source)
const data = {
  api_project: systemConfig.api_project
}
const output = tpl(data)
const views = {
  state: JSON.parse(output),
  mutations: {},
  actions: {}
}

export default views
