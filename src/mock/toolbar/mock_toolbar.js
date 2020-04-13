import { param2Obj } from '@/utils/param2Obj'
import { defaultSize } from '@/default'

const toolbar = {
  ADD: {
    id: 'add',
    widget: 'click',
    position: 'left',
    label: 'btn_add',
    type: 'primary',
    size: defaultSize,
    icon: 'el-icon-edit',
    tooltipDisabled: false,
    tooltipContent: 'add',
    tooltipPlacement: 'bottom',
    tooltipEffect: 'dark'
  },
  REFRESH: {
    id: 'refresh',
    widget: 'click',
    position: 'right',
    label: '',
    type: 'primary',
    size: defaultSize,
    icon: 'el-icon-refresh',
    tooltipDisabled: false,
    tooltipContent: 'refresh',
    tooltipPlacement: 'bottom',
    tooltipEffect: 'dark'
  },
  COLUMNS_SELECT: {
    id: 'checks',
    widget: 'checks',
    size: defaultSize,
    position: 'right',
    props: {'label': 'label', '$label': '$label', 'value': 'visible'},
    tooltipDisabled: false,
    tooltipContent: 'Columns_Select',
    tooltipPlacement: 'bottom',
    tooltipEffect: 'dark'
  }
}

const allItems = {
  'Base': [
    toolbar.COLUMNS_SELECT,
    toolbar.REFRESH
  ],
  'Student_List': [
    toolbar.COLUMNS_SELECT,
    toolbar.REFRESH
  ],
  'User_List': [
    toolbar.ADD,
    toolbar.COLUMNS_SELECT,
    toolbar.REFRESH
  ],
  'Notify_Server_List': [
    toolbar.ADD,
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
