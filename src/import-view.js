import Vue from 'vue'

const items = [
  {name: 'Table', from: 'views/general/Table'}
]

const importComponents = (items) => {
  items.forEach(item => {
    Vue.component(item.name, () => import('@/' + item.from))
  })
}

importComponents(items)
