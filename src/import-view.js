/**
 * 注册业务组件(view)
 */
import Vue from 'vue'

const items = [
  {name: 'Table', from: () => import('@/views/general/Table')}
]

const importComponent = (items) => {
  items.forEach(item => {
    Vue.component(item.name, item.from)
  })
}

importComponent(items)
