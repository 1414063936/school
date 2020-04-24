<template>
  <my-panel :items="LAYOUT" style="background-color: #FFFFFF; padding: 15px">
    <template slot="main">
      <my-toolbar :ref="toolbar[0].id" auto-load-items :url="toolbar[0].url" @click#openDialog="openDialog" @click#refresh="refreshData" @date#change="dateChange"></my-toolbar>
      <div style="height: calc(100% - 35px)">
        <my-table
          ref="table"
          :auto-load-data="table.autoLoadData"
          :auto-load-columns="table.autoLoadColumns"
          :height-fit="table.heightFit"
          :show-pagination="table.pagination.enable"
          :expand="table.expand"
          :url="table.url"
          :columns="computedColumns"
          :columnsUrl="table.columnsUrl"
          :data="computedData"
          :border="table.border"
          @columns-change="columns_change">
        </my-table>
      </div>
      <el-dialog :visible.sync="visible" width="60%">
        <span slot="title" class="el-dialog__title">过滤</span>
        <my-form
          ref="filterForm"
          label-width="120px"
          :model="params"
          :type="formType"
          :rules="formRules"
          :items="formItems">
        </my-form>
        <div slot="footer">
          <el-button type="primary" @click="onSwitch" v-if="foldItems.length > 0">{{ buttonObj[buttonNow] }}</el-button>
          <el-button type="primary" @click="onSubmit">{{$t('过滤')}}</el-button>
        </div>
      </el-dialog>
    </template>
  </my-panel>
</template>

<script>
import MyForm from '../../../components/form/index.vue'
import MyDateRange from '../../../components/dateRange/index.vue'

export default {
  components: {
    MyDateRange,
    MyForm},
  props: {
    toolbar: {
      type: Array,
      default: function () {
        return []
      }
    },
    table: Object,
    form: {
      type: Object,
      default: function () {
        return {
          formType: 'filter',
          formRules: {},
          formItems: [],
          foldItems: []
        }
      }
    }
  },
  created () {
    this.row = JSON.parse(this.$route.query.row)

    if (this.formType === 'filter') {
      this.params['op'] = {}
    }
    this.formItems.forEach(item => {
      item.row.forEach(temp => {
        if (this.row[temp.prop]) {
          // 根据参数设置默认值
          temp.defaultValue = this.row[temp.prop]
          this.$set(this.params, temp.prop, this.row[temp.prop])

          if (this.formType === 'filter') {
            if (temp.slots && temp.slots[0]) {
              this.params.op[temp.prop] = temp.slots[0].value
            } else {
              this.params.op[temp.prop] = '='
            }
          }
        }
      })
    })
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
      formRules: this.form.formRules,
      formItems: this.form.formItems,
      foldItems: this.form.foldItems,
      visible: false,
      data: [],
      columns: [],
      params: {},
      op: {},
      row: {},
      buttonNow: 'open',
      buttonObj: {
        close: '收合',
        open: '展开'
      }
    }
  },
  computed: {
    formType: function () {
      if (!this.form.formType) {
        return 'filter'
      } else {
        return this.form.formType
      }
    },
    computedColumns: function () {
      return this.columns
    },
    computedData: function () {
      return this.data
    }
  },
  mounted () {
    if (this.table.autoLoadData) {
      this.$refs['table'].setParams(this.getParams())
    }

    this.$nextTick(() => {
      if (!this.table.autoLoadData) {
        this.loadData()
      }
    })
  },
  methods: {
    openDialog () {
      this.visible = true
    },
    loadData () {
      const vm = this
      const _params = this.getParams()
      if (_params === false) {
        return false
      }
      if (this.table.pagination) {
        const pagination = vm.$refs['table'].getPagination()
        _params.offset = (pagination.currentPage - 1) * pagination.pageSize
        _params.pageSize = pagination.pageSize
      }

      console.log(_params)
      vm.$axios(this.table.url, _params)
        .then(response => {
          const {meta, data} = response.data
          this.columns = meta.col
          this.data = data
        })
    },
    refreshData () {
      this.loadData()
    },
    columns_change (val) {
      this.$refs[this.toolbar[0].id].trigger('checks', 'setChecks', val)
    },
    getParams () {
      const _params = {}
      if (this.formType === 'filter') {
        _params['filter'] = []
      }
      for (let i in this.params) {
        if (i !== 'op' && this.params[i] !== '') {
          if (this.params.op && this.params.op[i]) {
            _params['filter'].push([i, this.params.op[i], this.params[i]])
          } else {
            _params[i] = this.params[i]
          }
        }
      }

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
    },
    onSubmit () {
      this.$refs['filterForm'].validate((valid) => {
        if (valid) {
          if (!this.table.autoLoadData) {
            this.loadData()
          } else {
            const _params = this.getParams()
            this.$refs['table'].setParams(_params)
            this.$refs['table'].refreshData()
          }
          this.visible = false
        }
      })
    },
    onSwitch () {
      if (this.buttonNow === 'close') {
        this.buttonNow = 'open'
      } else {
        this.buttonNow = 'close'
      }

      this.$refs['filterForm'].toggleItemDisplay(this.foldItems)
    },
    dateChange () {
      this.loadData()
    }
  }
}
</script>
