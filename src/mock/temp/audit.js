const sql = [
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
const session = [
  {
    session_status: 'Success',
    count: '100000'
  },
  {
    session_status: 'Failed',
    count: '1000'
  }
]
const risk = [
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
export default {
  GET_SQL: config => {
    return {
      data: sql,
      count: sql.length
    }
  },
  GET_SESSION: config => {
    return {
      data: session,
      count: session.length
    }
  },
  GET_RISK: config => {
    return {
      data: risk,
      count: risk.length
    }
  }
}
