import {param2Obj} from '@/utils/param2Obj'
import menuGroup from '../../../static/menu/menu_group.json'
import menuItem from '../../../static/menu/menu_item.json'
import accessConfig from '../../../static/menu/access.json'

// 递归获取menus
const getDetail = (obj, children) => {
  let detail
  if (!children) {
    detail = menuItem[obj]
  } else {
    detail = menuGroup[obj]
    detail['children'] = []
    children.forEach(item => {
      detail['children'].push(getDetail(item.obj, item.children))
    })
    // detail = getDetail(obj, type)
  }

  return detail
}

const menus = {}
accessConfig.access.forEach(item => {
  const _menu = []
  item.menus.forEach(x => {
    const detail = getDetail(x.obj, x.children)
    _menu.push(detail)
  })
  menus[item.level] = _menu
})

export default {
  GET: config => {
    const {userAccessLevel} = param2Obj(config.url)
    return {
      menus: menus[userAccessLevel]
    }
  }
}
