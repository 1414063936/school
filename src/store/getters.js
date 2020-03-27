const getters = {
  isLogin: state => state.user.status,
  system: state => state.system.system,
  apiProject: state => state.system.system.api_project,
  language: state => state.app.language,
  sideBarMenus: state => state.menus.sideBarMenus
}

export default getters
