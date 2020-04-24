<template>
  <my-panel :items="LAYOUT">
    <template slot="main">
      <my-toolbar :ref="toolbar[0].id" auto-load-items :url="toolbar[0].url" @click#refresh="refreshData" @date#change="dateChange" @click#switchDirection="switchDirection"></my-toolbar>
      <div class="main-layout" :style="{'flex-direction': flexDirection}">
        <div style="flex: 1; background-color: #FFFFFF; overflow: hidden; position: relative">
          <div style="position: absolute; width: 100%; z-index: 99; padding: 3px 16px">
            <el-dropdown style="float: right" @command="switchChartType">
              <i style="font-size: 16px; cursor: pointer" class="el-icon-menu"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in chartList"
                  :key="index"
                  :command="item.type">
                  {{ $t(item.label) }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <my-vue-e-charts ref="chartWrapper"></my-vue-e-charts>
        </div>
        <div style="flex: 1; overflow: hidden">
          <my-table
            ref="autoTable"
            auto-load-data
            auto-load-columns
            :height-fit="table.heightFit"
            :show-pagination="table.pagination.enable"
            :layout="table.pagination.layout"
            :expand="table.expand"
            :url="table.url"
            :columnsUrl="table.columnsUrl"
            :border="table.border"
            :stripe="table.stripe">
          </my-table>
        </div>
      </div>
    </template>
  </my-panel>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import MyPanel from '../../../components/panel/index.vue'
import MyVueECharts from '../../../components/chart/VueECharts.vue'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/polar'

export default {
  components: {
    MyVueECharts,
    MyPanel,
    'v-chart': ECharts
  },
  props: {
    toolbar: {
      type: Array,
      default: function () {
        return []
      }
    },
    chart: Object,
    table: Object
  },
  data () {
    return {
      LAYOUT: [
        {
          gutter: 0,
          equally: true,
          style: {
            flex: 1
          },
          cols: [
            {
              slot: 'main'
            }
          ]
        }
      ],
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      chartType: false,
      chartData: {},
      chartList: [
        {type: 'line', label: '折线图'},
        {type: 'column', label: '柱状图'},
        {type: 'bar', label: '条形图'},
        {type: 'area', label: '区域图'},
        {type: 'stackColumn', label: '堆叠柱状图'},
        {type: 'stackBar', label: '堆叠条形图'},
        {type: 'stackArea', label: '堆叠区域图'},
        {type: 'pie', label: '饼图'}
      ]
    }
  },
  computed: {

  },
  mounted () {
    this.$refs['autoTable'].setParams(this.getParams())
    this.$nextTick(() => {
      this.loadChart()
    })
  },
  watch: {

  },
  methods: {
    loadChart () {
      const vm = this
      const _params = this.getParams()
      vm.$axios(this.chart.url, _params)
        .then(response => {
          vm.chartData = response.data.chartData
          if (vm.chartType) {
            vm.chartData.chart_info.chart_type = vm.chartType
          } else {
            this.chartType = vm.chartData.chart_info.chart_type
          }
          this.$refs['chartWrapper'].initChart(vm.chartData)
        })
    },
    switchDirection () {
      if (this.flexDirection === 'column') {
        this.flexDirection = 'row'
      } else {
        this.flexDirection = 'column'
      }
    },
    switchChartType (type) {
      if (this.chartType !== type) {
        this.chartType = type
        this.chartData.chart_info.chart_type = type
        this.$refs['chartWrapper'].initChart(this.chartData)
      }
    },
    dateChange () {
      this.refreshData()
    },
    refreshData () {
      const _params = this.getParams()
      if (_params === false) {
        return false
      }
      this.$refs['autoTable'].setParams(_params)
      this.$refs['autoTable'].refreshData()
      this.loadChart()
    },
    getParams () {
      const _params = {}

      const dateRange = this.$refs[this.toolbar[0].id].trigger('dateRange', 'getDateRange')
      if (dateRange === null) {
        this.$message({
          type: 'warning',
          message: '请选择查询时间'
        })
        return false
      } else if (dateRange) {
        _params['beginDate'] = dateRange[0]
        _params['endDate'] = dateRange[1]
      }
      return _params
    }
  }
}
</script>

<style>
  .main-layout {
    width: 100%;
    height: calc(100% - 35px);
    display: flex;
    display: -webkit-flex;
  }
</style>
