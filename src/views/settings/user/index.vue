<template>
  <div style="width: 100%;height: 100%">
    <my-toolbar :ref="toolbar[0].id" auto-load-items :url="toolbar[0].url" @click#add="openDialog('add')" @click#refresh="refreshData"></my-toolbar>
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
        @click#update="clickUpdateButton"
        @click#delete="clickDeleteButton">
      </my-table>
    </div>
    <my-form-dialog
      ref="formDialog"
      @click#submit="setData">
    </my-form-dialog>
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
          url: '/page/toolbar?id=User_List'
        }
      ],
      dialogVisible: false,
      dialogTitle: '',
      dialogType: 'add',
      submitLoading: false,
      model: {},
      defaultValue: {
        sex: '男'
      },
      setDataUrl: {
        'add': '/student/add',
        'edit': '/student/edit',
        'delete': '/student/delete'
      },
      rule: [
        {
          type: 'el-row',
          native: true,
          children: [
            {
              type: 'input',
              title: 'cno',
              field: 'cno',
              col: {
                span: 20
              },
              validate: [
                {type: 'string', required: true, message: '请输入学号', trigger: 'blur'}
              ]
            }
          ]
        },
        {
          type: 'el-row',
          native: true,
          children: [
            {
              type: 'input',
              title: 'name',
              field: 'name',
              col: {
                span: 20
              },
              validate: [
                {type: 'string', required: true, message: '请输入姓名', trigger: 'blur'}
              ]
            }
          ]
        },
        {
          type: 'el-row',
          native: true,
          children: [
            {
              type: 'radio',
              title: 'sex',
              field: 'sex',
              value: '男',
              options: [
                { value: '男', label: '男' },
                { value: '女', label: '女' }
              ],
              col: {
                span: 20
              },
              validate: [
                {required: true, message: '请选择性别', trigger: 'change'}
              ]
            }
          ]
        },
        {
          type: 'el-row',
          native: true,
          children: [
            {
              type: 'DatePicker',
              title: 'birth',
              field: 'birth',
              col: {
                span: 20
              },
              validate: [
                {required: true, message: '请选择出生日期', trigger: 'blur'}
              ]
            }
          ]
        },
        {
          type: 'el-row',
          native: true,
          children: [
            {
              type: 'input',
              title: 'phone',
              field: 'phone',
              col: {
                span: 20
              }
            }
          ]
        },
        {
          type: 'el-row',
          native: true,
          children: [
            {
              type: 'input',
              title: 'address',
              field: 'address',
              col: {
                span: 20
              }
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.formDialog = this.$refs['formDialog']
  },
  methods: {
    columns_change (val) {
      // this.checks = val
      this.$refs[this.toolbar[0].id].trigger('checks', 'setChecks', val)
    },
    openDialog (type, value) {
      if (type === 'add') {
        this.dialogTitle = this.$t('添加用户')
        this.dialogType = 'add'
        value = Object.assign(this.defaultValue)
      } else {
        this.dialogTitle = this.$t('编辑用户')
        this.dialogType = 'edit'
      }

      const formDialog = this.formDialog
      formDialog.setTitle(this.dialogTitle)
      formDialog.openDialog()
      this.$nextTick(() => {
        formDialog.setForm(this.rule, function () {
          // 在setRule产生的DOM更新后调用
          formDialog.setValue(value)
        })
      })
    },
    clickUpdateButton (row) {
      const value = Object.assign({}, row)
      this.openDialog('edit', value)
    },
    clickDeleteButton (row) {
      console.log(row)
    },
    async setData () {
      const vm = this
      const data = this.formDialog.getValue()

      if (data) {
        const url = '/' + vm.apiProject + (this.dialogType === 'add' ? this.setDataUrl.add : this.setDataUrl.edit)

        vm.formDialog.toggleLoading()
        vm.$axios.post(url, {data: data})
          .then((response) => {
            if (response.data.status === 'success') {
              vm.formDialog.closeDialog()
            }
          })
          .finally(() => {
            vm.formDialog.toggleLoading()
          })
      }
    },
    refreshData () {
      this.$refs['autoTable'].refreshData()
    }
  }
}
</script>

<style scoped>

</style>
