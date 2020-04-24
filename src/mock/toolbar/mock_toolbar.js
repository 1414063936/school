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
  },
  FILTER: {
    id: 'openDialog',
    widget: 'click',
    position: 'right',
    label: 'btn_filter',
    type: 'primary',
    size: defaultSize,
    icon: 'el-icon-search',
    tooltipDisabled: false,
    tooltipContent: 'filter',
    tooltipPlacement: 'bottom',
    tooltipEffect: 'dark'
  },
  DATE_RANGE: {
    id: 'dateRange',
    widget: 'my-date-range',
    position: 'left'
  },
  FLEX_DIRECTION: {
    id: 'switchDirection',
    widget: 'click',
    position: 'right',
    label: '',
    type: 'primary',
    size: defaultSize,
    icon: 'el-icon-rank',
    tooltipDisabled: false,
    tooltipContent: '切换显示',
    tooltipPlacement: 'bottom',
    tooltipEffect: 'dark'
  },
  CHART_TYPE: {
    id: 'switchType',
    widget: 'dropdown',
    position: 'right',
    button: {
      element: 'my-click-button',
      label: '',
      type: 'primary',
      size: defaultSize,
      icon: 'el-icon-picture-outline',
      tooltipDisabled: false,
      tooltipContent: '切换图表类型',
      tooltipPlacement: 'bottom',
      tooltipEffect: 'dark'
    },
    options: []
  }
}

const allItems = {
  'Base': [
    toolbar.COLUMNS_SELECT,
    toolbar.REFRESH
  ],
  'Condition_Table': [
    toolbar.DATE_RANGE,
    toolbar.FILTER,
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
  ],
  'Audit_Statistics': [
    toolbar.DATE_RANGE,
    toolbar.REFRESH,
    toolbar.FLEX_DIRECTION
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
