import Table from '@/views/general/Chart'
import { connector } from '@/store'
import IRoute from '../IRoute'

// 使用vuex-connector
class IChart extends IRoute {
  constructor (r) {
    const key = r.path
    r.component = function () {
      return new Promise(function (resolve, reject) {
        resolve(connector.connect({
          mapStateToProps: {
            toolbar: state => state.views[key].props.toolbar,
            chart: state => state.views[key].props.chart,
            text: state => state.views[key].props.text
          }
        })(Table))
      })
    }
    super(r)
  }
}

export default IChart
