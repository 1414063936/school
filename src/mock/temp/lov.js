import {param2Obj} from '@/utils/param2Obj'

const options = {
  'sql_type': [
    {value: 'SELECT', label: 'SELECT'},
    {value: 'INSERT', label: 'INSERT'},
    {value: 'CONNECT', label: 'CONNECT'},
    {value: 'DISCONNECT', label: 'DISCONNECT'},
    {value: 'SET', label: 'SET'},
    {value: 'DELETE', label: 'DELETE'},
    {value: 'OTHER', label: 'OTHER'}
  ],
  'ap_sys': [
    {value: 'CENTER', label: 'CENTER'},
    {value: 'AP_TEST', label: 'AP_TEST'}
  ],
  'client_ip': [
    {value: '192.168.81.197', label: '192.168.81.197'}
  ],
  'sql_class': [
    {value: 'DQL', label: 'DQL'},
    {value: 'DDL', label: 'DDL'},
    {value: 'DML', label: 'DML'},
    {value: 'DCL', label: 'DCL'}
  ],
  'class_elapse_utc': [
    {value: '0~0.1', label: '0~0.1'},
    {value: '0.1~1', label: '0.1~1'},
    {value: '1~', label: '1~'}
  ],
  'dest_ip': [
    {value: '192.168.81.197', label: '192.168.81.197'}
  ],
  'db_name': [
    {value: 'cobra', label: 'cobra'}
  ],
  'db_type': [
    {value: 'PGS', label: 'PGS'}
  ],
  'db_user': [
    {value: 'postgres', label: 'postgres'}
  ],
  'os_user': [
    {value: 'dbsecure', label: 'dbsecure'}
  ],
  'exec_status': [
    {value: '成功', label: '成功'},
    {value: '失败', label: '失败'}
  ],
  'risk_name': [
    {value: '删表', label: '删表'},
    {value: '授权', label: '授权'},
    {value: '连续登录失败', label: '连续登录失败'},
    {value: '删除语句', label: '删除语句'}
  ],
  'risk_type': [
    {value: '统计操作', label: '统计操作'},
    {value: '风险操作', label: '风险操作'}
  ],
  'risk_level': [
    {value: '低', label: '低'},
    {value: '中', label: '中'},
    {value: '高', label: '高'}
  ],
  'risk_status': [
    {value: '已读', label: '已读'},
    {value: '未读', label: '未读'}
  ]
}
export default {
  GET: config => {
    const {val} = param2Obj(config.url)
    return {
      data: options[val]
    }
  }
}
