import IRoute from '../IRoute'

const Config = {
  User: function () {
    return new IRoute({
      name: 'User',
      path: 'User',
      meta: {
        label: 'menu.User'
      },
      component: () => import('@/views/student')
    })
  }
}

export default Config
