import { param2Obj } from '@/utils/param2Obj'

const toolbar = {
  REFRESH: {
    id: 'refresh',
    widget: 'click',
    position: 'right',
    label: '',
    type: 'primary',
    size: 'mini',
    icon: 'el-icon-refresh',
    tooltipDisabled: false,
    tooltipContent: 'refresh',
    tooltipPlacement: 'bottom',
    tooltipEffect: 'dark'
  },
  COLUMNS_SELECT: {
    id: 'checks',
    widget: 'checks',
    size: 'mini',
    position: 'right',
    props: {'label': 'label', '$label': '$label', 'value': 'visible'},
    tooltipDisabled: false,
    tooltipContent: 'Columns_Select',
    tooltipPlacement: 'bottom',
    tooltipEffect: 'dark'
  }
}

const allItems = {
  'Student_List': [
    toolbar.COLUMNS_SELECT,
    toolbar.REFRESH
  ]
}

export default {
  GET: config => {
    const { id } = param2Obj(config.url)
    if (id) {
      const items = JSON.parse(JSON.stringify(allItems[id]))
      return items
    } else {
      return []
    }
  }
}
