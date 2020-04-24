<template>
  <v-chart
    ref="e-charts"
    style="width: 100%; height: 100%"
    :theme="theme"
    :group='group'
    :autoresize="true"
    :options="internalOptions">
  </v-chart>
</template>

<script>
import moment from 'moment'
export default {
  name: 'MyVueECharts',
  props: {
    theme: {
      type: String,
      default: 'walden'
    },
    options: {
      type: Object,
      default: function () {
        return {}
      }
    },
    grid: {
      type: Object,
      default: function () {
        return {
          top: 30,
          left: 20,
          right: 20,
          containLabel: true
        }
      }
    },
    toolbox: {
      type: Object,
      default: function () {
        return {
          show: false
        }
      }
    },
    group: String
  },
  created () {

  },
  data () {
    return {
      chartData: {
        'chart_info': {
          title: '',
          'is_utc': false
        },
        'col_info': {
          s: '', // legend
          x: '',
          y: ''
        },
        categories: []
      },
      chartType: 'line',
      areaStyle: false, // 是否是区域图
      stack: false, // 是否需要堆叠
      isUtc: false,
      internalOptions: this.options
    }
  },
  computed: {

  },
  methods: {
    initChart (data) {
      if (data) {
        this.chartData = data
      } else {
        data = this.chartData
      }

      this.setBaseOptions()
      this.setTypeOptions()
      this.$refs['e-charts'].refresh()
    },
    setBaseOptions () {
      const { 'chart_info': chartInfo, 'col_info': colInfo } = this.chartData
      const { s: legendName, x: xName, y: yName } = colInfo
      this.chartType = chartInfo.chart_type
      this.isUtc = chartInfo.is_utc
      const isUtc = this.isUtc
      const baseConfig = {
        title: {
          text: chartInfo.title,
          left: 'center'
        },
        legend: {
          title: this.$t(legendName),
          bottom: 10
        },
        xAxis: {
          // boundaryGap: false,
          name: this.$t(xName),
          nameLocation: 'center',
          nameGap: 25
        },
        yAxis: {
          name: this.$t(yName)
        },
        grid: this.grid,
        toolbox: this.toolbox,
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let html = ''
            if (params.length > 0) {
              let name = ''
              if (isUtc) {
                name = moment(params[0].name * 1000).format('YYYY-MM-DD HH:mm:ss')
              } else {
                name = params[0].name
              }
              html += name + '<br>'
            }

            params.forEach((param) => {
              html += `
                <span style="color:${param.color}">\u25CF</span>
                <span>${param.seriesName}</span>：
                ${param.value}<br>`
            })
            return html
          }
        }
      }

      Object.assign(this.internalOptions, baseConfig)
    },
    setTypeOptions () {
      const type = this.chartType
      const { categories } = this.chartData
      const isUtc = this.isUtc
      let series

      this.areaStyle = false
      this.stack = false
      switch (type) {
        case 'column':
          this.chartType = 'bar'
          break
        case 'stackColumn':
          this.chartType = 'bar'
          this.stack = true
          break
        case 'area':
          this.chartType = 'line'
          this.areaStyle = true
          break
        case 'stackArea':
          this.chartType = 'line'
          this.areaStyle = true
          this.stack = true
          break
        case 'line':
          break
        // 特殊，属于bar，需要将x轴y轴对调
        case 'bar':
          this.chartType = 'temp_bar'
          break
        case 'stackBar':
          this.chartType = 'temp_bar'
          this.stack = true
          break
        case 'pie':
          Object.assign(this.internalOptions.tooltip, {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          })
          break
      }

      const xAxis = {}
      const yAxis = {}
      xAxis['type'] = 'category'
      xAxis['data'] = categories
      xAxis['axisLabel'] = {
        formatter: function (value, index) {
          if (isUtc === true) {
            return moment(value * 1000).format('MM-DD HH:mm')
          } else {
            return value
          }
        }
      }
      yAxis['type'] = 'value'

      if (this.chartType === 'temp_bar') {
        this.chartType = 'bar'
        const { 'col_info': colInfo } = this.chartData
        const { x: xName, y: yName } = colInfo
        xAxis['name'] = this.$t(xName)
        yAxis['name'] = this.$t(yName)

        // 与column x轴y轴对调
        Object.assign(this.internalOptions.xAxis, yAxis)
        Object.assign(this.internalOptions.yAxis, xAxis)
      } else if (this.chartType !== 'pie') {
        Object.assign(this.internalOptions.xAxis, xAxis)
        Object.assign(this.internalOptions.yAxis, yAxis)
      }

      series = this.getSeries()

      if (this.chartType === 'pie') {
        this.internalOptions.xAxis = false
        this.internalOptions.yAxis = false
        series = this.getPieSeries(series)
      }
      Object.assign(this.internalOptions, {series: series})
      console.log(this.internalOptions)
    },
    getSeries () {
      const { data, col_info: colInfo } = this.chartData
      const { s: legendName, x: xName, y: yName } = colInfo
      const isUtc = this.isUtc
      const categories = this.chartData.categories

      const legends = data.reduce((acc, row) => {
        const legend = row[legendName]
        let xValue = row[xName]
        let yValue = row[yName]
        if (!acc[legend]) {
          acc[legend] = []
        }

        if (isUtc && isNaN(xValue)) {
          // 需将时间转为timestamp
          xValue = moment(xValue).unix()
        }
        acc[legend].push({ x: xValue, y: yValue })

        return acc
      }, {})

      const series = Object.keys(legends).reduce((acc, legend) => {
        const arr = categories.map(category => 0)
        legends[legend].map(({ x, y }) => {
          const index = categories.indexOf(x)
          arr[index] += y
        })

        if (this.areaStyle !== false) {
          acc.push({
            name: legend,
            data: arr,
            type: this.chartType,
            areaStyle: this.areaStyle,
            stack: this.stack
          })
        } else {
          acc.push({
            name: legend,
            data: arr,
            type: this.chartType,
            stack: this.stack
          })
        }
        return acc
      }, [])

      return series
    },
    getPieSeries (series) {
      const { data, col_info: colInfo } = this.chartData
      const { s: legendName, x: xName, y: yName } = colInfo
      const isUtc = this.isUtc
      let piesData = []
      series.forEach(item => {
        const { name, data } = item
        const sum = data.reduce((sum, i) => {
          return sum + i
        }, 0)
        piesData.push({ name: name, value: sum })
      })

      if (isUtc === true) {
        return [
          {
            name: this.$t(legendName),
            type: 'pie',
            radius: '65%',
            label: {
              formatter: '{b} {d}%'
            },
            data: piesData
          }
        ]
      } else {
        const legendData = []
        const legendsX = data.reduce((acc, row) => {
          const legend = row[legendName]
          legendData.push(legend)
          let xValue = row[xName]
          let yValue = row[yName]
          if (!acc[legend]) {
            acc[legend] = []
          }
          acc[legend].push({x: xValue, y: yValue})

          return acc
        }, {})

        // 只显示第一层的legend
        this.internalOptions.legend.data = legendData

        let piesDataX = Object.keys(legendsX).reduce((acc, row) => {
          legendsX[row].map(({x, y}) => {
            acc.push({name: x, value: y, node: row})
          })
          return acc
        }, [])

        return [
          {
            name: this.$t(legendName),
            type: 'pie',
            radius: '40%',
            minShowLabelAngle: 2,
            label: {
              position: 'inner',
              formatter: function (param) {
                if (param.percent > 2) {
                  return `${param.name}`
                } else {
                  return ''
                }
              }
            },
            data: piesData
          },
          {
            name: this.$t(xName),
            type: 'pie',
            radius: ['45%', '65%'],
            minShowLabelAngle: 2,
            label: {
              formatter: function (param) {
                return `${param.name} ${param.percent}%`
              }
            },
            data: piesDataX,
            tooltip: {
              formatter (param) {
                return `${param.seriesName} <br/>${param.data.node}^${param.name} : ${param.value} (${param.percent}%)`
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    chartType (val) {
      // this.initChart()
    }
  }
}
</script>
