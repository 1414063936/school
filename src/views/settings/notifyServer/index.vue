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
      :options="options"
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
    const items = {
      server_type: {
        type: 'select',
        title: 'server_type',
        field: 'server_type',
        options: [
          { value: 'SMTP', label: 'SMTP' },
          { value: 'SYSLOG', label: 'SYSLOG' },
          { value: 'SNMP', label: 'SNMP' },
          { value: 'CUSTOM', label: 'CUSTOM' }
        ],
        col: {
          span: 20
        },
        on: {
          'change': (value) => {
            this.formDialog.setRule(this.rules[value])
          }
        },
        validate: [
          {type: 'string', required: true, message: '请选择服务器种类', trigger: ['blur', 'change']}
        ]
      },
      server_name: {
        type: 'input',
        title: 'server_name',
        field: 'server_name',
        col: {
          span: 20
        },
        validate: [
          {type: 'string', required: true, message: '请输入服务器名称', trigger: 'blur'}
        ]
      },
      server_ip: {
        type: 'input',
        title: 'server_ip',
        field: 'server_ip',
        col: {
          span: 20
        },
        validate: [
          {type: 'string', required: true, message: '请输入服务器IP', trigger: 'blur'}
        ]
      },
      server_port: {
        type: 'input',
        title: 'server_port',
        field: 'server_port',
        col: {
          span: 20
        },
        validate: [
          {type: 'string', required: true, message: '请输入端口', trigger: 'blur'}
        ]
      },
      smtp_validate: {
        type: 'select',
        title: 'smtp_validate',
        field: 'smtp_validate',
        value: 'Y',
        options: [
          { value: 'Y', label: 'Yes' },
          { value: 'N', label: 'No' }
        ],
        col: {
          span: 20
        },
        on: {
          'change': (value) => {
            if (value === 'N') {
              this.toggleDisplayHandler(true, ['smtp_account', 'smtp_pwd'])
              this.formDialog.setValue({
                'smtp_account': 'skip',
                'smtp_pwd': 'skip'
              })
            } else {
              this.toggleDisplayHandler(false, ['smtp_account', 'smtp_pwd'])
              this.formDialog.setValue(this.tempValue)
            }
          }
        },
        validate: [
          {type: 'string', required: true, message: '请选择服务器种类', trigger: ['blur', 'change']}
        ]
      },
      smtp_account: {
        type: 'input',
        title: 'smtp_account',
        field: 'smtp_account',
        col: {
          span: 20
        },
        validate: [
          {type: 'string', required: true, message: '请输入帐号', trigger: 'blur'}
        ]
      },
      smtp_pwd: {
        type: 'input',
        title: 'smtp_pwd',
        field: 'smtp_pwd',
        col: {
          span: 20
        },
        props: {
          type: 'password',
          autoComplete: 'new-password'
        },
        validate: [
          {type: 'string', required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      smtp_sender: {
        type: 'input',
        title: 'smtp_sender',
        field: 'smtp_sender',
        col: {
          span: 20
        },
        validate: [
          {type: 'string', required: true, message: '请输入发信帐号', trigger: 'blur'}
        ]
      },
      enabled_flag: {
        type: 'radio',
        title: 'enabled_flag',
        field: 'enabled_flag',
        value: 'Y',
        options: [
          { value: 'Y', label: '启用' },
          { value: 'N', label: '停用' }
        ],
        col: {
          span: 20
        },
        validate: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ]
      },
      api_wrapper: {
        type: 'my-upload-file-button',
        title: 'api_wrapper',
        field: 'api_wrapper',
        col: {
          span: 20
        },
        props: {
          listType: 'text',
          limit: 1,
          autoUpload: false
        }
      },
      api: {
        type: 'my-upload-file-button',
        title: 'api',
        field: 'api',
        col: {
          span: 20
        },
        props: {
          listType: 'text',
          limit: 1,
          autoUpload: false
        }
      },
      snmp_community: {
        type: 'input',
        title: 'snmp_community',
        field: 'snmp_community',
        col: {
          span: 20
        }
      },
      snmp_command: {
        type: 'input',
        title: 'snmp_command',
        field: 'snmp_command',
        col: {
          span: 20
        }
      }
    }

    return {
      table: {
        url: '/api/notifyServer/list',
        columnsUrl: '/page/table_column?id=Notify_Server_List',
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
          url: '/page/toolbar?id=Notify_Server_List'
        }
      ],
      dialogVisible: false,
      dialogTitle: '',
      dialogType: 'add',
      submitLoading: false,
      formDialog: {},
      defaultValue: {
        server_type: 'SMTP',
        server_name: '',
        enabled_flag: 'Y',
        smtp_validate: 'Y',
        api_wrapper: [],
        api: []
      },
      tempValue: {},
      setDataUrl: {
        'add': '/notifyServer/add',
        'edit': '/notifyServer/edit',
        'delete': '/notifyServer/delete'
      },
      options: {
        form: {
          labelWidth: '150px'
        },
        submitBtn: false
      },
      rules: {
        'SMTP': [
          items.server_type,
          items.server_name,
          items.server_ip,
          items.server_port,
          items.smtp_validate,
          items.smtp_account,
          items.smtp_pwd,
          items.smtp_sender,
          items.enabled_flag
        ],
        'CUSTOM': [
          items.server_type,
          items.server_name,
          items.api_wrapper,
          items.api,
          items.enabled_flag
        ],
        'SYSLOG': [
          items.server_type,
          items.server_name,
          items.server_ip,
          items.server_port,
          items.enabled_flag
        ],
        'SNMP': [
          items.server_type,
          items.server_name,
          items.server_ip,
          items.server_port,
          items.snmp_community,
          items.snmp_command,
          items.enabled_flag
        ]
      }
    }
  },
  mounted () {
    this.formDialog = this.$refs['formDialog']
  },
  methods: {
    columns_change (value) {
      // this.checks = value
      this.$refs[this.toolbar[0].id].trigger('checks', 'setChecks', value)
    },
    refreshData () {
      this.$refs['autoTable'].refreshData()
    },
    openDialog (type, value) {
      const vm = this
      let disabled = false
      if (type === 'add') {
        this.dialogTitle = this.$t('添加消息传递通道')
        this.dialogType = 'add'
        value = Object.assign(this.defaultValue)
      } else {
        this.dialogTitle = this.$t('编辑消息传递通道')
        this.dialogType = 'edit'
        disabled = true
      }

      const serverType = value.server_type
      const formDialog = this.formDialog
      formDialog.setTitle(this.dialogTitle)
      formDialog.openDialog()

      this.$nextTick(() => {
        formDialog.setForm(this.rules[serverType], function () {
          // 在setRule产生的DOM更新后调用
          formDialog.setValue(value)
          formDialog.toggleDisabled(disabled, 'server_type')

          if (serverType === 'SMTP') {
            vm.tempValue = {
              smtp_account: value.smtp_account,
              smtp_pwd: value.smtp_pwd
            }
            formDialog.trigger('smtp_validate', 'change', value.smtp_validate)
          }
          if (serverType === 'CUSTOM') {
            formDialog.setFileList('api_wrapper', value.api_wrapper)
            formDialog.setFileList('api', value.api)
          }
        })
      })
    },
    clickUpdateButton (row) {
      const value = Object.assign({}, row)
      const { api, api_wrapper: apiWrapper } = row
      if (api) {
        value['api'] = [{name: api}]
      }
      if (apiWrapper) {
        value['api_wrapper'] = [{name: apiWrapper}]
      }

      this.openDialog('edit', value)
    },
    clickDeleteButton (row) {
      console.log(row)
    },
    toggleDisplayHandler (bool, fields) {
      this.formDialog.toggleDisplay(bool, fields)
    },
    async setData () {
      const vm = this
      const data = this.formDialog.getValue()

      if (data) {
        if (data.server_type === 'CUSTOM') {
          let apiWrapper = await this.formDialog.getFileList('api_wrapper')
          let api = await this.formDialog.getFileList('api')
          if (apiWrapper.length > 0) {
            data.api_wrapper = apiWrapper.pop()
          }
          if (api.length > 0) {
            data.api = api.pop()
          }
        }

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
    }
  }
}
</script>
