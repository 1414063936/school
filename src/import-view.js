/**
 * 注册业务组件(view)
 */
import Vue from 'vue'

const items = [
  {name: 'Table', from: () => import('@/views/general/Table')},
  {name: 'ChartTable', from: () => import('@/views/general/ChartTable')},
  {name: 'Temp', from: () => import('@/views/general/Temp')}
]

const importComponent = (items) => {
  items.forEach(item => {
    Vue.component(item.name, item.from)
  })
}

importComponent(items)
