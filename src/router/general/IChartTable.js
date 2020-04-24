import Table from '@/views/general/ChartTable'
import { connector } from '@/store'
import IRoute from '../IRoute'

// 使用vuex-connector
class IChartTable extends IRoute {
  constructor (r) {
    const key = r.path
    r.component = function () {
      return new Promise(function (resolve, reject) {
        resolve(connector.connect({
          mapStateToProps: {
            toolbar: state => state.views[key].props.toolbar,
            chart: state => state.views[key].props.chart,
            table: state => state.views[key].props.table
          }
        })(Table))
      })
    }
    super(r)
  }
}

export default IChartTable
