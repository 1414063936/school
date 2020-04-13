import { param2Obj } from '@/utils/param2Obj'
import { syncHttpGet } from '@/utils/jqueryAjax'

let systemConfig = {}
syncHttpGet('./static/config/system.json', {}, (data, textStatus, jqXHR) => {
  systemConfig = data
})

const ApiProject = systemConfig.api_project

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
            element: 'my-dialog-button',
            props: {
              id: 'open',
              label: '查看',
              type: 'text',
              size: 'mini',

              title: 'new Component',
              component: 'Table',
              compProps: {
                toolbar: [
                  {
                    id: 'top_toolbar',
                    'url': '/page/toolbar?id=Student_List'
                  }
                ],
                table: {
                  url: '/' + ApiProject + '/student/list',
                  columnsUrl: '/page/table_column?id=Student_List',
                  pagination: {
                    enable: false
                  },
                  expand: {
                    enable: false
                  },
                  heightFit: false
                }
              }
            }
          },
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
  ],
  'Grade_List': [
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
    }
  ],
  'Notify_Server_List': [
    {
      prop: 'server_type',
      label: '服务器种类'
    },
    {
      prop: 'server_name',
      label: '服务器名称'
    },
    {
      prop: 'server_ip',
      label: '服务器IP'
    },
    {
      prop: 'server_port',
      label: '端口'
    },
    {
      prop: 'enabled_flag',
      label: '状态'
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

  'Sql_Statistics': [
    {
      prop: 'sql_type',
      label: 'SQL操作指令'
    },
    {
      prop: 'count',
      label: '总数',
      postLink: '/Audit/Sql_List',
      params: ['sql_type']
    }
  ],
  'Session_Statistics': [
    {
      prop: 'session_status',
      label: '会话状态'
    },
    {
      prop: 'count',
      label: '总数',
      postLink: '/Audit/Session_List',
      params: ['session_status']
    }
  ],
  'Risk_Statistics': [
    {
      prop: 'risk_name',
      label: '风险名称'
    },
    {
      prop: 'risk_level',
      label: '风险等级'
    },
    {
      prop: 'risk_type',
      label: '风险类型'
    },
    {
      prop: 'count',
      label: '总数',
      postLink: '/Audit/Risk_list',
      params: ['risk_name', 'risk_level', 'risk_type']
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
