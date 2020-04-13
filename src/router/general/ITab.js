import Tab from '@/views/general/Tab'
import { connector } from '@/store'
import IRoute from '../IRoute'

// 使用vuex-connector
class ITab extends IRoute {
  constructor (r) {
    const key = r.path
    r.component = function () {
      return new Promise(function (resolve, reject) {
        resolve(connector.connect({
          mapStateToProps: {
            tabs: state => state.views[key].props.tabs
          }
        })(Tab))
      })
    }
    super(r)
  }
}

export default ITab
