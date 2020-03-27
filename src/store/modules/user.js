import Cookies from 'js-cookie'

const user = {
  state: {
    status: Cookies.get('isLogin') === 'true',
    name: Cookies.get('loginName') ? Cookies.get('loginName') : ''
  },
  mutations: {
    SET_STATUS: (state, status) => {
      state.status = status
      // sessionStorage.setItem('status', status)
      Cookies.set('isLogin', status)
    },
    SET_NAME: (state, name) => {
      state.name = name
      Cookies.set('loginName', name)
    }
  },
  actions: {
    setLoginStatus ({ commit }, isLogin) {
      commit('SET_STATUS', isLogin)
    }
  }
}

export default user
