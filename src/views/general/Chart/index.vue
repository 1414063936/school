<template>
  <my-panel :items="LAYOUT">
    <template slot="main">
      <div style="width: 100%; height: 100%; background-color: #FFFFFF">
        <v-chart
          style="width: 100%; height: 100%"
          theme="walden"
          :autoresize="true"
          :options="polar">
        </v-chart>
      </div>
    </template>
  </my-panel>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import MyPanel from '../../../components/panel/index.vue'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/polar'

export default {
  components: {
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
    text: String
  },
  data () {
    let data = []

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI
      let r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }

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
      polar: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
  computed: {

  },
  mounted () {

  },
  watch: {

  }
}
</script>
