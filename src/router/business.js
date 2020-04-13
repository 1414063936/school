import Main from '@/views/main'
import secondRouter from '@/views/main/secondRouter'
import thirdRouter from '@/views/main/thirdRouter'
import Config from './config/config'
import General from './general/general'

const Home = {
  path: '',
  redirect: 'home',
  component: Main,
  children: [
    {
      name: 'Home',
      path: 'home',
      meta: {
        label: 'menu.Home'
      },
      component: () => import('@/views/business/home')
    }
  ]
}

const Business = [
  Home,
  {
    path: '/Student',
    name: 'Student',
    meta: {
      label: 'menu.Student'
    },
    component: Main,
    children: [
      General.Student_Base(),
      General.Student_Statistics()
    ]
  },
  {
    path: '/Teacher',
    name: 'Teacher',
    meta: {
      label: 'menu.Teacher'
    },
    component: Main,
    children: [
      General.Teacher_Base(),
      General.Teacher_Statistics()
    ]
  },
  {
    path: '/Course',
    name: 'Course',
    meta: {
      label: 'menu.Course'
    },
    component: Main,
    children: [
      General.Student_Course(),
      General.Teacher_Course()
    ]
  },
  {
    path: '/Grade',
    name: 'Grade',
    meta: {
      label: 'menu.Grade'
    },
    component: Main,
    children: [
      {
        name: 'Award',
        path: 'Award',
        meta: {
          label: 'menu.Award'
        },
        component: secondRouter,
        children: [
          {
            name: 'Country_Award',
            path: 'Country_Award',
            meta: {
              label: 'menu.Country_Award'
            },
            component: thirdRouter,
            children: [
              General.Country_Award_List()
            ]
          },
          General.Award_First_List(),
          General.Award_Second_List()
        ]
      },
      General.Grade_List()
    ]
  },
  {
    path: '/System_Manage',
    name: 'System_Manage',
    meta: {
      label: 'menu.System_Manage'
    },
    component: Main,
    children: [
      Config.User(),
      Config.Notify_Server()
    ]
  },
  {
    path: '/Audit',
    name: 'Audit',
    meta: {
      label: 'menu.Audit'
    },
    component: Main,
    children: [
      General.Audit_Information(),
      General.Sql_List(),
      General.Session_List(),
      General.Risk_List()
    ]
  }
]

export default Business
