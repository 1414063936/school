import ConditionTable from '@/views/general/ConditionTable'
import { connector } from '@/store'
import IRoute from '../IRoute'

// 使用vuex-connector
class IConditionTable extends IRoute {
  constructor (r) {
    const key = r.path
    r.component = function () {
      return new Promise(function (resolve, reject) {
        resolve(connector.connect({
          mapStateToProps: {
            toolbar: state => state.views[key].props.toolbar,
            filters: state => state.views[key].props.filters,
            table: state => state.views[key].props.table
          }
        })(ConditionTable))
      })
    }
    super(r)
  }
}

export default IConditionTable
