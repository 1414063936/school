import ITable from '../general/ITable'
import IConditionTable from '../general/IConditionTable'
import IChart from '../general/IChart'
import ITemp from '../general/ITemp'
import ITab from '../general/ITab'

// 不同路由共用一个组件如ITable，需设置router-view标签的key，否则不会触发页面更新
const General = {
  Student_Base: function () {
    return new ITable({
      name: 'Student_Base',
      path: 'Student_Base',
      meta: {
        label: 'menu.Student_Base'
      }
    })
  },
  Student_Statistics: function () {
    return new IChart({
      name: 'Student_Statistics',
      path: 'Student_Statistics',
      meta: {
        label: 'menu.Student_Statistics'
      }
    })
  },
  Teacher_Base: function () {
    return new ITable({
      name: 'Teacher_Base',
      path: 'Teacher_Base',
      meta: {
        label: 'menu.Teacher_Base'
      }
    })
  },
  Teacher_Statistics: function () {
    return new IChart({
      name: 'Teacher_Statistics',
      path: 'Teacher_Statistics',
      meta: {
        label: 'menu.Teacher_Statistics'
      }
    })
  },
  Student_Course: function () {
    return new ITemp({
      name: 'Student_Course',
      path: 'Student_Course',
      meta: {
        label: 'menu.Student_Course'
      }
    })
  },
  Teacher_Course: function () {
    return new ITemp({
      name: 'Teacher_Course',
      path: 'Teacher_Course',
      meta: {
        label: 'menu.Teacher_Course'
      }
    })
  },
  Grade_List: function () {
    return new ITemp({
      name: 'Grade_List',
      path: 'Grade_List',
      meta: {
        label: 'menu.Grade_List'
      }
    })
  },
  Country_Award_List: function () {
    return new ITemp({
      name: 'Country_Award_List',
      path: 'Country_Award_List',
      meta: {
        label: 'menu.Country_Award_List'
      }
    })
  },
  Award_First_List: function () {
    return new ITemp({
      name: 'Award_First_List',
      path: 'Award_First_List',
      meta: {
        label: 'menu.Award_First_List'
      }
    })
  },
  Award_Second_List: function () {
    return new ITemp({
      name: 'Award_Second_List',
      path: 'Award_Second_List',
      meta: {
        label: 'menu.Award_Second_List'
      }
    })
  },
  Audit_Information: function () {
    return new ITab({
      name: 'Audit_Information',
      path: 'Audit_Information',
      meta: {
        label: 'menu.Audit_Information'
      }
    })
  },
  Sql_List: function () {
    return new IConditionTable({
      name: 'Sql_List',
      path: 'Sql_List',
      meta: {
        label: 'menu.Sql_List'
      }
    })
  },
  Session_List: function () {
    return new IConditionTable({
      name: 'Session_List',
      path: 'Session_List',
      meta: {
        label: 'menu.Session_List'
      }
    })
  },
  Risk_List: function () {
    return new IConditionTable({
      name: 'Risk_List',
      path: 'Risk_List',
      meta: {
        label: 'menu.Risk_List'
      }
    })
  }
}

export default General
