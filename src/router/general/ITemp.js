import Temp from '@/views/general/Temp'
import { connector } from '@/store'
import IRoute from '../IRoute'

// 使用vuex-connector
class ITemp extends IRoute {
  constructor (r) {
    const key = r.path
    r.component = function () {
      return new Promise(function (resolve, reject) {
        resolve(connector.connect({
          mapStateToProps: {
            text: state => state.views[key].props.text
          }
        })(Temp))
      })
    }
    super(r)
  }
}

export default ITemp
