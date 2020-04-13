import IRoute from '../IRoute'

const Config = {
  User: function () {
    return new IRoute({
      name: 'User',
      path: 'User',
      meta: {
        label: 'menu.User'
      },
      component: () => import('@/views/settings/user')
    })
  },
  Notify_Server: function () {
    return new IRoute({
      name: 'Notify_Server',
      path: 'Notify_Server',
      meta: {
        label: 'menu.Notify_Server'
      },
      component: () => import('@/views/settings/notifyServer')
    })
  }
}

export default Config
