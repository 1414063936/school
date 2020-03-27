import Mock from 'mockjs'
import MENU from './menu/mock_menu'
import LANG from './i18n/mock_i18n'
import COLUMNS from './table/mock_column'

import Login from './temp/login'
import Student from './temp/student'
import Teacher from './temp/teacher'

Mock.setup({
  timeout: '50-100'
})

Mock.mock(/\/menu/, 'get', MENU.GET)
Mock.mock(/\/lang/, 'get', LANG.GET)
Mock.mock(/\/page\/table_column/, 'get', COLUMNS.GET)
Mock.mock(/\/page\/toolbar/, 'get', COLUMNS.GET)

Mock.mock(/\/api\/login\/getLogin/, Login.POST)
Mock.mock(/\/api\/login\/logout/, Login.GET)
Mock.mock(/\/api\/student\/list/, Student.GET)
Mock.mock(/\/api\/teacher\/list/, Teacher.GET)
