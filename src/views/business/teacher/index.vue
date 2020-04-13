<template>
  <div style="width: 100%;height: 100%">
    <my-toolbar :ref="toolbar[0].id" auto-load-items :url="toolbar[0].url" @click#refresh="refreshData"></my-toolbar>
    <div style="height: calc(100% - 35px); overflow-y: auto">
      <div>
        <my-table
          ref="autoTable"
          auto-load-data
          auto-load-columns
          :height-fit="false"
          :expand="table.expand"
          :url="table.url"
          :columnsUrl="table.columnsUrl"
          @columns-change="columns_change"
          @click#update="updateUser"
          @click#delete="deleteUser">
        </my-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ElRow from 'element-ui/lib/row'
import ElCol from 'element-ui/lib/col'
export default {
  components: {
    [ElRow.name]: ElRow,
    [ElCol.name]: ElCol
  },
  computed: {
    ...mapGetters(['system', 'apiProject'])
  },
  data () {
    return {
      table: {
        url: '/api/student/list',
        columnsUrl: '/page/table_column?id=Student_List',
        pagination: {
          enable: true
        },
        expand: {
          enable: true
        }
      },
      toolbar: [
        {
          id: 'top_toolbar',
          url: '/page/toolbar?id=Student_List'
        }
      ]
    }
  },
  methods: {
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
      this.$refs['autoTable'].refreshData()
    }
  }
}
</script>

<style scoped>

</style>
