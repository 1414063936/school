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
      prop: 'exec_status',
      label: '会话状态'
    },
    {
      prop: 'count',
      label: '总数',
      postLink: '/Audit/Session_List',
      params: ['exec_status']
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
  ],
  'Sql_List': [
    {
      prop: 'ap_sys',
      label: '应用系统'
    },
    {
      prop: 'db_name',
      label: '数据库名称'
    },
    {
      prop: 'os_user',
      label: '操作系统用户'
    },
    {
      prop: 'db_user',
      label: '数据库用户'
    },
    {
      minWidth: '300px',
      showOverflowTooltip: true,
      prop: 'sql_statement',
      label: 'SQL语句'
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
              label: '语句详情',
              type: 'text',
              size: 'mini',

              title: '语句详情',
              component: 'Temp',
              compProps: {
                text: '内容'
              }
            }
          },
          {
            element: 'my-dialog-button',
            props: {
              id: 'open',
              label: '会话详情',
              type: 'text',
              size: 'mini',

              title: '会话详情',
              component: 'Temp',
              compProps: {
                text: '内容'
              }
            }
          }
        ]
      }
    }
  ],
  'Session_List': [
    {
      prop: 'client_ip',
      label: '数据库客户端IP'
    },
    {
      prop: 'db_user',
      label: '数据库用户'
    },
    {
      prop: 'os_user',
      label: '操作系统用户'
    },
    {
      prop: 'sql_client_program',
      label: '客户端工具'
    },
    {
      prop: 'exec_utc',
      label: 'SQL执行时间'
    },
    {
      prop: 'end_utc',
      label: '结束时间'
    },
    {
      prop: 'elapse_utc',
      label: 'SQL历时(秒)'
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
              label: '会话详情',
              type: 'text',
              size: 'mini',

              title: '会话详情',
              component: 'Temp',
              compProps: {
                text: '内容'
              }
            }
          }
        ]
      }
    }
  ],
  'Risk_List': [
    {
      prop: 'creation_date',
      label: '创建时间'
    },
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
      prop: 'status',
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
            element: 'my-dialog-button',
            props: {
              id: 'open',
              label: '风险详情',
              type: 'text',
              size: 'mini',

              title: '风险详情',
              component: 'Temp',
              compProps: {
                text: '内容'
              }
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
