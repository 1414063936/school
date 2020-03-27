import { Loading } from 'element-ui'

const loadOption = {
  fullscreen: true,
  lock: true,
  text: '',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
}

export function openLoading () {
  return Loading.service(loadOption)
}

export function closeLoading (loadingInstance) {
  if (loadingInstance) {
    loadingInstance.close()
  }
}
