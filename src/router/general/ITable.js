import Table from '@/views/general/Table'
import { connector } from '@/store'
import IRoute from '../IRoute'

// 使用vuex-connector
class ITable extends IRoute {
  constructor (r) {
    const key = r.path
    r.component = function () {
      return new Promise(function (resolve, reject) {
        resolve(connector.connect({
          mapStateToProps: {
            toolbar: state => state.views[key].props.toolbar,
            table: state => state.views[key].props.table
          }
        })(Table))
      })
    }
    super(r)
  }
}

export default ITable
