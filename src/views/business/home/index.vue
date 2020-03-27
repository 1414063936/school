<template>
  <div class="x-panel">
    <el-row :gutter="16" style="flex: 1; overflow-y: auto; margin-bottom: 16px;">
      <el-col :span="8">
        <div class="x-panel-wrapper">
          <v-chart style="width: 98%; height: 98%" :options="polar" :autoresize="true"></v-chart>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="x-panel-wrapper">
          <v-chart style="width: 98%; height: 98%" :options="polar" :autoresize="true"></v-chart>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="x-panel-wrapper">
          <v-chart style="width: 98%; height: 98%" :options="polar" :autoresize="true"></v-chart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16" style="flex: 1; overflow-y: auto">
      <el-col :span="8">
        <div class="x-panel-wrapper">
          <v-chart style="width: 98%; height: 98%" :options="polar" :autoresize="true"></v-chart>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="x-panel-wrapper">
          <v-chart style="width: 98%; height: 98%" :options="polar" :autoresize="true"></v-chart>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="x-panel-wrapper">
          <v-chart style="width: 98%; height: 98%" :options="polar" :autoresize="true"></v-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ElRow from 'element-ui/lib/row'
import ElCol from 'element-ui/lib/col'
import { mapGetters } from 'vuex'
export default {
  components: {
    [ElRow.name]: ElRow,
    [ElCol.name]: ElCol
  },
  data () {
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
    ...mapGetters(['system', 'apiProject'])
  },
  mounted () {
    const vm = this
    vm.$axios.get('/' + vm.apiProject + '/student/list')
      .then(response => {

      })
  }
}
</script>

<style scoped>
  .x-panel {
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }

  .el-row {
    display: flex;
    display: -webkit-flex;
  }

  .el-col {
    height: 100%;
    /*flex: 1;*/
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    border-radius: 4px;
  }

  .x-panel-wrapper {
    background-color: #FFFFFF;
    flex: 1;
    overflow: auto;
  }
</style>
