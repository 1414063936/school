const sqlCount = [
  {
    sql_type: 'SELECT',
    count: '100000'
  },
  {
    sql_type: 'INSERT',
    count: '20000'
  },
  {
    sql_type: 'CONNECT',
    count: '50000'
  },
  {
    sql_type: 'DISCONNECT',
    count: '50000'
  },
  {
    sql_type: 'SET',
    count: '19000'
  },
  {
    sql_type: 'DELETE',
    count: '8000'
  },
  {
    sql_type: 'OTHER',
    count: '3000'
  }
]
const sessionCount = [
  {
    exec_status: '成功',
    count: '100000'
  },
  {
    exec_status: '失败',
    count: '1000'
  }
]
const riskCount = [
  {
    risk_name: '删表',
    risk_level: '高',
    risk_type: '风险操作',
    count: 2
  },
  {
    risk_name: '授权',
    risk_level: '中',
    risk_type: '风险操作',
    count: 20
  },
  {
    risk_name: '连续登录失败',
    risk_level: '中',
    risk_type: '统计操作',
    count: 5
  },
  {
    risk_name: '删除语句',
    risk_level: '低',
    risk_type: '风险操作',
    count: 1500
  }
]

const sqlList = {
  meta: {
    col: [
      {
        showOverflowTooltip: true,
        prop: 'ap_sys',
        label: '应用系统'
      },
      {
        showOverflowTooltip: true,
        prop: 'db_name',
        label: '数据库名称'
      },
      {
        showOverflowTooltip: true,
        prop: 'os_user',
        label: '应用系统用户'
      },
      {
        showOverflowTooltip: true,
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
    ]
  },
  data: [
    {
      'ap_sys': 'AP_TEST',
      'db_name': 'cobra',
      'os_user': 'postgres',
      'db_user': 'postgre',
      'sql_statement': 'select max(id) as max_utc from sys_event_logs where id > 1***864;'
    },
    {
      'ap_sys': 'AP_TEST',
      'db_name': 'cobra',
      'os_user': 'postgres',
      'db_user': 'postgre',
      'sql_statement': 'select notify_server_id from notify_servers where notify_type = \'S***\' and enabled_flag = \'Y\' and default_notify_server=\'Y\';'
    },
    {
      'ap_sys': 'AP_TEST',
      'db_name': 'cobra',
      'os_user': 'postgres',
      'db_user': 'postgre',
      'sql_statement': 'select case when enabled_flag = \'Y\' then \'O*\' else \'O**\' end from sec_facility_infos where facility_id=\'1***168.82***9\' and facility_type=\'S***Eyes\''
    },
    {
      'ap_sys': 'AP_TEST',
      'db_name': 'cobra',
      'os_user': 'postgres',
      'db_user': 'postgre',
      'sql_statement': 'select login_name,user_name,email,phone_num from sec_users where enabled_flag = \'Y\' and privilege_level::int & 1* =1*;'
    },
    {
      'ap_sys': 'AP_TEST',
      'db_name': 'cobra',
      'os_user': 'postgres',
      'db_user': 'postgre',
      'sql_statement': 'select archive_queue_id,archive_name,begin_date,end_date from archive_queue where status in (\'Q***E\',\'E***R\') and batch_type = \'D***TE\' order by archive_queue_id'
    }
  ]
}
const sessionList = {
  meta: {
    col: [
      {
        showOverflowTooltip: true,
        prop: 'client_ip',
        label: '数据库客户端IP'
      },
      {
        showOverflowTooltip: true,
        prop: 'db_user',
        label: '数据库用户'
      },
      {
        showOverflowTooltip: true,
        prop: 'os_user',
        label: '操作系统用户'
      },
      {
        showOverflowTooltip: true,
        prop: 'sql_client_program',
        label: '客户端工具'
      },
      {
        width: 180,
        showOverflowTooltip: true,
        prop: 'exec_utc',
        label: 'SQL执行时间'
      },
      {
        width: 180,
        showOverflowTooltip: true,
        prop: 'end_utc',
        label: '结束时间'
      },
      {
        showOverflowTooltip: true,
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
    ]
  },
  data: [
    {
      'client_ip': '192.168.82.129',
      'db_user': 'postgres',
      'os_user': 'postgres',
      'sql_client_program': 'psql',
      'exec_utc': '2020-04-14 14:58:08',
      'end_utc': '2020-04-14 14:58:08',
      'elapse_utc': '0.003691'
    },
    {
      'client_ip': '192.168.82.129',
      'db_user': 'postgres',
      'os_user': 'postgres',
      'sql_client_program': 'psql',
      'exec_utc': '2020-04-14 14:57:08',
      'end_utc': '2020-04-14 14:57:08',
      'elapse_utc': '0.003691'
    },
    {
      'client_ip': '192.168.82.129',
      'db_user': 'postgres',
      'os_user': 'postgres',
      'sql_client_program': 'psql',
      'exec_utc': '2020-04-14 14:56:08',
      'end_utc': '2020-04-14 14:56:08',
      'elapse_utc': '0.003691'
    },
    {
      'client_ip': '192.168.82.129',
      'db_user': 'postgres',
      'os_user': 'postgres',
      'sql_client_program': 'psql',
      'exec_utc': '2020-04-14 14:55:08',
      'end_utc': '2020-04-14 14:55:08',
      'elapse_utc': '0.003691'
    }
  ]
}
const riskList = {
  meta: {
    col: [
      {
        width: 180,
        showOverflowTooltip: true,
        prop: 'creation_date',
        label: '创建时间'
      },
      {
        showOverflowTooltip: true,
        prop: 'risk_name',
        label: '风险名称'
      },
      {
        showOverflowTooltip: true,
        prop: 'risk_level',
        label: '风险等级'
      },
      {
        showOverflowTooltip: true,
        prop: 'risk_type',
        label: '风险类型'
      },
      {
        showOverflowTooltip: true,
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
  },
  data: [
    {
      creation_date: '2020-04-15 00:00:00',
      risk_name: '删表',
      risk_level: '高',
      risk_type: '风险操作',
      status: '未读'
    },
    {
      creation_date: '2020-04-15 02:00:00',
      risk_name: '删表',
      risk_level: '高',
      risk_type: '风险操作',
      status: '未读'
    }
  ]
}

const chart1 = {
  'chart_info': {
    'chart_type': 'line',
    'title': 'SQL统计情况',
    'is_utc': true
  },
  'col_info': {
    s: 'sql_type', // legend
    x: 'exec_utc',
    y: 'count'
  },
  categories: [1587344400, 1587348000, 1587351600, 1587355200, 1587358800, 1587362400, 1587366000],
  data: [
    {
      'sql_type': 'SELECT',
      'exec_utc': 1587344400,
      'count': 123456
    },
    {
      'sql_type': 'SELECT',
      'exec_utc': 1587348000,
      'count': 133456
    },
    {
      'sql_type': 'SELECT',
      'exec_utc': 1587351600,
      'count': 103456
    },
    {
      'sql_type': 'SELECT',
      'exec_utc': 1587355200,
      'count': 83456
    },
    {
      'sql_type': 'SELECT',
      'exec_utc': 1587358800,
      'count': 183456
    },
    {
      'sql_type': 'SELECT',
      'exec_utc': 1587362400,
      'count': 166656
    },
    {
      'sql_type': 'SELECT',
      'exec_utc': 1587366000,
      'count': 125556
    },
    {
      'sql_type': 'CONNECT',
      'exec_utc': 1587344400,
      'count': 223456
    },
    {
      'sql_type': 'CONNECT',
      'exec_utc': 1587348000,
      'count': 193456
    },
    {
      'sql_type': 'CONNECT',
      'exec_utc': 1587351600,
      'count': 143456
    },
    {
      'sql_type': 'CONNECT',
      'exec_utc': 1587355200,
      'count': 93456
    },
    {
      'sql_type': 'CONNECT',
      'exec_utc': 1587358800,
      'count': 203456
    },
    {
      'sql_type': 'CONNECT',
      'exec_utc': 1587362400,
      'count': 196656
    },
    {
      'sql_type': 'CONNECT',
      'exec_utc': 1587366000,
      'count': 145556
    },
    {
      'sql_type': 'DISCONNECT',
      'exec_utc': 1587344400,
      'count': 213256
    },
    {
      'sql_type': 'DISCONNECT',
      'exec_utc': 1587348000,
      'count': 193256
    },
    {
      'sql_type': 'DISCONNECT',
      'exec_utc': 1587351600,
      'count': 143156
    },
    {
      'sql_type': 'DISCONNECT',
      'exec_utc': 1587355200,
      'count': 93456
    },
    {
      'sql_type': 'DISCONNECT',
      'exec_utc': 1587358800,
      'count': 203056
    },
    {
      'sql_type': 'DISCONNECT',
      'exec_utc': 1587362400,
      'count': 196256
    },
    {
      'sql_type': 'DISCONNECT',
      'exec_utc': 1587366000,
      'count': 144056
    },
    {
      'sql_type': 'UPDATE',
      'exec_utc': 1587344400,
      'count': 4456
    },
    {
      'sql_type': 'UPDATE',
      'exec_utc': 1587348000,
      'count': 3456
    },
    {
      'sql_type': 'UPDATE',
      'exec_utc': 1587351600,
      'count': 1436
    },
    {
      'sql_type': 'UPDATE',
      'exec_utc': 1587355200,
      'count': 4456
    },
    {
      'sql_type': 'UPDATE',
      'exec_utc': 1587358800,
      'count': 2956
    },
    {
      'sql_type': 'UPDATE',
      'exec_utc': 1587362400,
      'count': 1956
    },
    {
      'sql_type': 'UPDATE',
      'exec_utc': 1587366000,
      'count': 1556
    },
    {
      'sql_type': 'INSERT',
      'exec_utc': 1587344400,
      'count': 1345
    },
    {
      'sql_type': 'INSERT',
      'exec_utc': 1587348000,
      'count': 1934
    },
    {
      'sql_type': 'INSERT',
      'exec_utc': 1587351600,
      'count': 2345
    },
    {
      'sql_type': 'INSERT',
      'exec_utc': 1587355200,
      'count': 2222
    },
    {
      'sql_type': 'INSERT',
      'exec_utc': 1587358800,
      'count': 3333
    },
    {
      'sql_type': 'INSERT',
      'exec_utc': 1587362400,
      'count': 2366
    },
    {
      'sql_type': 'INSERT',
      'exec_utc': 1587366000,
      'count': 1556
    },
    {
      'sql_type': 'DELETE',
      'exec_utc': 1587344400,
      'count': 1456
    },
    {
      'sql_type': 'DELETE',
      'exec_utc': 1587348000,
      'count': 1456
    },
    {
      'sql_type': 'DELETE',
      'exec_utc': 1587351600,
      'count': 1436
    },
    {
      'sql_type': 'DELETE',
      'exec_utc': 1587355200,
      'count': 956
    },
    {
      'sql_type': 'DELETE',
      'exec_utc': 1587358800,
      'count': 2036
    },
    {
      'sql_type': 'DELETE',
      'exec_utc': 1587362400,
      'count': 1956
    },
    {
      'sql_type': 'DELETE',
      'exec_utc': 1587366000,
      'count': 2556
    },
    {
      'sql_type': 'CREATE',
      'exec_utc': 1587344400,
      'count': 26
    },
    {
      'sql_type': 'CREATE',
      'exec_utc': 1587348000,
      'count': 16
    },
    {
      'sql_type': 'CREATE',
      'exec_utc': 1587351600,
      'count': 56
    },
    {
      'sql_type': 'CREATE',
      'exec_utc': 1587355200,
      'count': 93
    },
    {
      'sql_type': 'CREATE',
      'exec_utc': 1587358800,
      'count': 203
    },
    {
      'sql_type': 'CREATE',
      'exec_utc': 1587362400,
      'count': 15
    },
    {
      'sql_type': 'CREATE',
      'exec_utc': 1587366000,
      'count': 55
    },
    {
      'sql_type': 'OTHER',
      'exec_utc': 1587344400,
      'count': 1226
    },
    {
      'sql_type': 'OTHER',
      'exec_utc': 1587348000,
      'count': 4316
    },
    {
      'sql_type': 'OTHER',
      'exec_utc': 1587351600,
      'count': 2156
    },
    {
      'sql_type': 'OTHER',
      'exec_utc': 1587355200,
      'count': 3293
    },
    {
      'sql_type': 'OTHER',
      'exec_utc': 1587358800,
      'count': 1203
    },
    {
      'sql_type': 'OTHER',
      'exec_utc': 1587362400,
      'count': 1354
    },
    {
      'sql_type': 'OTHER',
      'exec_utc': 1587366000,
      'count': 2155
    }
  ]
}

export default {
  GET_SQL: config => {
    return {
      data: sqlCount,
      count: sqlCount.length
    }
  },
  GET_SESSION: config => {
    return {
      data: sessionCount,
      count: sessionCount.length
    }
  },
  GET_RISK: config => {
    return {
      data: riskCount,
      count: riskCount.length
    }
  },
  GET_SQL_LIST: config => {
    return {
      data: sqlList.data,
      meta: sqlList.meta,
      count: sqlList.data.length
    }
  },
  GET_SESSION_LIST: config => {
    return {
      data: sessionList.data,
      meta: sessionList.meta,
      count: sessionList.data.length
    }
  },
  GET_RISK_LIST: config => {
    return {
      data: riskList.data,
      meta: riskList.meta,
      count: riskList.data.length
    }
  },
  GET_SQL_CHART: config => {
    return {
      chartData: chart1
    }
  }
}
