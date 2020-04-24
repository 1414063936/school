<template>
  <my-panel :items="LAYOUT">
    <template slot="main">
      <my-toolbar :ref="toolbar[0].id" auto-load-items :url="toolbar[0].url" @click#refresh="refreshData"></my-toolbar>
      <div style="height: calc(100% - 35px)">
        <my-table
          ref="autoTable"
          auto-load-data
          auto-load-columns
          :height-fit="table.heightFit"
          :show-pagination="table.pagination.enable"
          :expand="table.expand"
          :url="table.url"
          :columnsUrl="table.columnsUrl"
          :data="tableData"
          :columns="tableColumns"
          :border="table.border"
          @columns-change="columns_change"
          @click#update="updateUser"
          @click#delete="deleteUser">
        </my-table>
      </div>
    </template>
  </my-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import ElRow from 'element-ui/lib/row'
import ElCol from 'element-ui/lib/col'
import MyPanel from '../../../components/panel/index.vue'
import MyToolbar from '../../../components/toolbar/index.vue'
import MyChecksButton from '../../../components/button/ChecksButton.vue'
export default {
  components: {
    MyChecksButton,
    MyToolbar,
    MyPanel,
    [ElRow.name]: ElRow,
    [ElCol.name]: ElCol
  },
  props: {
    toolbar: {
      type: Array,
      default: function () {
        return []
      }
    },
    table: Object
  },
  data () {
    return {
      LAYOUT: [
        {
          gutter: 0,
          equally: true,
          style: {
            'overflow-y': 'auto',
            flex: 1
          },
          cols: [
            {
              slot: 'main'
            }
          ]
        }
      ],
      tableColumns: [],
      tableData: [],
      checks: []
    }
  },
  computed: {
    ...mapGetters(['system', 'apiProject'])
  },
  mounted () {
    this.$refs['autoTable'].setParams(this.getParams())
  },
  methods: {
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    columns_change (val) {
      // this.checks = val
      this.$refs[this.toolbar[0].id].trigger('checks', 'setChecks', val)
    },
    updateUser (row) {
      console.log(row)
    },
    deleteUser (row) {
      console.log(row)
    },
    refreshData () {
      this.$refs['autoTable'].setParams(this.getParams())
      this.$refs['autoTable'].refreshData()
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
  }

  .x-panel-wrapper {
    flex: 1;
    overflow: auto;
  }
</style>
