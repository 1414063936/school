import { param2Obj } from '@/utils/param2Obj'
// import { syncHttpGet } from '@/utils/jqueryAjax'
// let systemConfig = {}
// syncHttpGet('./static/config/system.json', {}, (data, textStatus, jqXHR) => {
//   systemConfig = data
// })

const columns = {
  'Student_List': [
    {
      prop: 'cno',
      label: '学号'
    },
    {
      prop: 'name',
      label: '姓名'
    },
    {
      prop: 'sex',
      label: '性别'
    },
    {
      prop: 'birth',
      label: '出生年月',
      visible: false,
      width: '160px',
      showOverflowTooltip: true
    },
    {
      prop: 'phone',
      label: '联系方式'
    },
    {
      prop: 'address',
      label: '地址',
      minWidth: '200px',
      showOverflowTooltip: true
    },
    {
      prop: 'operations',
      label: '操作',
      width: '100px',
      widget: 'operations',
      fixed: 'right',
      props: {
        type: 'dropdown',
        options: [
          {
            element: 'my-click-button',
            props: {
              id: 'update',
              label: '编辑',
              type: 'text',
              size: 'mini'
            }
          },
          {
            element: 'my-click-button',
            props: {
              id: 'delete',
              label: '删除',
              type: 'text',
              size: 'mini'
            }
          }
        ]
      }
    }
  ],
  'Teacher_List': [
    {
      prop: 'cno',
      label: '学号'
    },
    {
      prop: 'name',
      label: '姓名'
    },
    {
      prop: 'sex',
      label: '性别'
    },
    {
      prop: 'birth',
      label: '出生年月',
      width: '160px',
      showOverflowTooltip: true
    },
    {
      prop: 'phone',
      label: '联系方式'
    },
    {
      prop: 'address',
      label: '地址',
      minWidth: '200px',
      showOverflowTooltip: true
    },
    {
      prop: 'operations',
      label: '操作',
      width: '100px',
      widget: 'operations',
      fixed: 'right',
      props: {
        type: 'dropdown',
        options: [
          {
            element: 'my-click-button',
            props: {
              id: 'update',
              label: '编辑',
              type: 'text',
              size: 'mini'
            }
          },
          {
            element: 'my-click-button',
            props: {
              id: 'delete',
              label: '删除',
              type: 'text',
              size: 'mini'
            }
          }
        ]
      }
    }
  ]
}

export default {
  GET: config => {
    const { id } = param2Obj(config.url)
    if (id) {
      const tableColumns = JSON.parse(JSON.stringify(columns[id]))
      return tableColumns
    } else {
      return []
    }
  }
}
