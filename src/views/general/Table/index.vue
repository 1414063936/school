<template>
  <my-panel :items="LAYOUT">
    <template slot="main">
      <div style="height: 35px">
        <el-button type="primary" icon="el-icon-refresh" @click="refreshData"></el-button>
      </div>
      <div style="height: calc(100% - 35px)">
        <myTable
          ref="autoTable"
          auto-load-data
          auto-load-columns
          :show-pagination="table.pagination.enable"
          :url="table.url"
          :columnsUrl="table.columnsUrl"
          :data="tableData"
          :columns="tableColumns"
          @click#update="updateUser"
          @click#delete="deleteUser">
        </myTable>
      </div>
    </template>
  </my-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import ElRow from 'element-ui/lib/row'
import ElCol from 'element-ui/lib/col'
import MyPanel from '../../../components/panel/index.vue'
export default {
  components: {
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
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['system', 'apiProject'])
  },
  mounted () {

  },
  methods: {
    updateUser (row) {
      console.log(row)
    },
    deleteUser (row) {
      console.log(row)
    },
    refreshData () {
      this.$refs['autoTable'].refreshData()
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
