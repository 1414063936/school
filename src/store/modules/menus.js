const menus = {
  state: {
    sideBarMenus: []
  },
  mutations: {
    SET_SIDE_BAR_MENUS: (state, sideBarMenus) => {
      state.sideBarMenus = sideBarMenus
    }
  },
  actions: {
    setSideBarMenus ({ commit }, activeRootMenu) {
      commit('SET_SIDE_BAR_MENUS', activeRootMenu)
    }
  }
}

export default menus
