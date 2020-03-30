<template>
  <div :class="{ 'my-table-container': true, 'height-fit': heightFit }">
    <div class="my-table-wrapper" v-resize:debounce.50="onResize">
      <el-table
        :ref="ref"
        :data="internalData"
        :stripe="stripe"
        :border="border"
        :size="size"
        :height="internalHeight"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        @current-change="handleCurrentRow"
        @row-click="(row, event, column) => rowClick(row, event, column)"
        @selection-change="changeSelection">
        <template v-if="showSelectCheckBox">
          <el-table-column type="selection" width="48"></el-table-column>
        </template>
        <el-table-column v-if="indexed" type="index" width="48"></el-table-column>
        <el-table-column v-if="expand" type="expand">
          <template slot-scope="scope">
            <el-form label-position="right" label-width="100px" size="mini" class="table-expand">
              <el-form-item
                v-for="(column, key) in internalColumns"
                :key="key"
                :label="$t(column.label)">
                <span style="white-space: pre-line;">
                  <pre><code>{{ scope.row[column.prop] }}</code></pre>
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(column, key) in internalColumns"
          :key="key"
          :prop="column.prop"
          :label="$t(column.label)"
          :width="column.width"
          :min-width="column.minWidth"
          :show-overflow-tooltip="column.showOverflowTooltip">
          <template slot-scope="scope">
            <span v-if="column.widget !== undefined">
              <column-render :column="column" :row="scope.row" :emitFunc="emitEventHandler"></column-render>
            </span>
            <span v-else>
              {{ scope.row[column.prop] }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="my-pagination-wrapper" v-if="showPagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="internalCurrentPage"
        :page-sizes="internalPageSizes"
        :page-size="internalPageSize"
        :layout="layout"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import resize from 'vue-resize-directive'
import m from '../mixins/methods'
import ElTable from 'element-ui/lib/table'
import ElTableColumn from 'element-ui/lib/table-column'
import ElPagination from 'element-ui/lib/pagination'
import ColumnRender from './column/index.vue'
export default {
  name: 'myTable',
  mixins: [m],
  directives: {
    resize
  },
  components: {
    ColumnRender,
    [ElTable.name]: ElTable,
    [ElTableColumn.name]: ElTableColumn,
    [ElPagination.name]: ElPagination,
    [ColumnRender.name]: ColumnRender
  },
  props: {
    size: {
      type: String,
      default: 'mini'
    },
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: true
    },
    width: [String, Number],
    height: [String, Number],
    heightFit: {
      // 自动根据div高度计算表格高度
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    showSelectCheckBox: {
      type: Boolean,
      default: false
    },
    indexed: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: true
    },

    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    url: {
      type: String
    },
    columnsUrl: {
      type: String
    },
    autoLoadColumns: {
      type: Boolean,
      default: false
    },
    autoLoadData: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: false
    },
    // 分页
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 50, 100]
      }
    },
    // 是否动态计算每页数量
    autoComputedPageSize: {
      type: Boolean,
      default: true
    },
    // pageSizes默认长度
    pageSizeLength: {
      type: Number,
      default: 3
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper, slot'
    }
  },
  data () {
    return {
      ref: 'myTable',
      internalData: [],
      internalColumns: [],
      internalCurrentPage: this.currentPage,
      internalPageSize: this.pageSize,
      internalPageSizes: this.pageSizes,
      internalHeight: this.height,
      currentRow: false,
      total: 0,
      selection: [],
      tablesHeight: Number
    }
  },
  created () {
    if (this.autoLoadColumns) {
      let _params = {}
      this.syncHttpGet(this.columnsUrl, _params, (data, textStatus, jqXHR) => {
        this.internalColumns = data
      })
    }
  },
  mounted () {
    // const vm = this

    this.$nextTick(() => {
      const tableHeight = this.$refs[this.ref].$el.offsetHeight
      if (!this.height && this.heightFit) {
        this.internalHeight = tableHeight
      }

      if (this.showPagination && this.autoComputedPageSize) {
        this.getPageSize(tableHeight)
      }

      if (this.autoLoadData) {
        this.loadDataHandler()
      }
    })
  },
  watch: {
    data: {
      immediate: true,
      handler: function (val) {
        this.internalData = JSON.parse(JSON.stringify(val))
      }
    },
    columns: {
      immediate: true,
      handler: function (val) {
        this.internalColumns = JSON.parse(JSON.stringify(val))
      }
    },
    tablesHeight: function (val) {
      this.getPageSize(val)
    }
  },
  methods: {
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    handleCurrentRow (row) {
      this.currentRow = row
    },
    rowClick (row, event, column) {
      if (this.showSelectCheckBox) {
        this.$refs[this.ref].toggleRowSelection(row)
      }
    },
    changeSelection (val) {
      this.selection = val
    },
    loadDataHandler () {
      let _params = {}

      if (this.showPagination) {
        _params.offset = (this.internalCurrentPage - 1) * this.internalPageSize
        _params.pageSize = this.internalPageSize
      }

      this.$axios.get(this.url, {params: _params}).then(response => {
        const { data, count } = response.data
        this.internalData = data
        if (count) {
          this.total = count
        } else {
          this.total = this.internalData.length
        }
      })
    },
    refreshData () {
      this.loadDataHandler()
    },
    getPageSize (tableHeight) {
      // line-height 23 + padding 12 + border 1，含有operation列的为37
      const rowHeight = 37
      const headerHeight = this.$refs[this.ref].$refs['headerWrapper'].offsetHeight

      this.internalPageSize = (Math.floor((tableHeight - headerHeight) / rowHeight) || 1)
      if (this.internalPageSize < 1) {
        this.internalPageSize = 1
      }
      this.internalCurrentPage = 1
      this.internalPageSizes = []
      for (let i = 0; i < this.pageSizeLength; i++) {
        this.internalPageSizes.push(this.internalPageSize * (i + 1))
      }
    },
    handleSizeChange (val) {
      this.internalPageSize = val
      this.internalCurrentPage = 1
      if (this.autoLoadData) {
        this.loadDataHandler()
      }
    },
    handleCurrentChange (val) {
      this.internalCurrentPage = val
      if (this.autoLoadData) {
        this.loadDataHandler()
      }
    },
    onResize (el) {
      // console.log(el.offsetHeight)
      this.tablesHeight = el.offsetHeight
      if (this.heightFit) {
        this.internalHeight = this.tablesHeight
      }
    }
  }
}
</script>

<style scoped>
  .my-table-container {
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    background-color: white;
    overflow: auto;
  }

  .my-table-wrapper {
    flex: 1;
    padding: 0;
    overflow: auto;
  }

  .el-table {
    /*width: 100%;*/
    height: 100%;
    overflow: auto;
  }

  .height-fit .my-table-wrapper, .height-fit .el-table {
    overflow-y: hidden;
  }

  .my-pagination-wrapper {
    display: flex;
    display: -webkit-flex;
    height: 32px;
    margin: 0 5px 0 5px;
    justify-content: flex-end;
    align-items: center;
  }
</style>

<style>

</style>
