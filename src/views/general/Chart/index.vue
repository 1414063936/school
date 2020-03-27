<template>
  <div style="width: 100%; height: 100%; background-color: #FFFFFF">
    <v-chart
      style="width: 100%; height: 100%"
      :autoresize="true"
      :options="polar">
    </v-chart>
  </div>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

export default {
  components: {
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
  methods: {

  }
}
</script>
