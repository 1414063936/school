<template>
  <el-dialog
    :visible.sync="visible"
    :title="dialogTitle"
    :top="top"
    @closed="closed">
    <form-create ref="form" :rule="rule" v-model="model" :option="options"></form-create>
    <span slot="footer">
      <el-button v-show="showResetButton" type="primary" @click="resetForm">{{$t('重置')}}</el-button>
      <el-button type="primary" @click="clickSubmit" :loading="submitLoading">{{$t('提交')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import methods from '../mixins/methods'
export default {
  mixins: [methods],
  name: 'MyFormDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    top: {
      type: String,
      default: '10vh'
    },
    showResetButton: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: function () {
        return {
          form: {
            labelWidth: '150px'
          },
          submitBtn: false
        }
      }
    },
    rule: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  created () {

  },
  data () {
    return {
      dialogTitle: this.title,
      visible: false,
      model: {},
      submitLoading: false
    }
  },
  methods: {
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    getObject () {
      return this.model
    },
    setForm (rule, callback) {
      this.resetForm()
      this.setRule(rule)
      this.$nextTick(() => {
        if (callback) {
          callback()
        }
      })
    },
    setRule (rule) {
      this.model.reload(rule)
    },
    getValue () {
      let data
      this.model.validate((valid) => {
        if (!valid) {
          data = false
        } else {
          data = this.model.formData()
        }
      })

      return data
    },
    setValue (value) {
      this.model.setValue(value)
    },
    getFileList (field) {
      return this.model.el(field).getFileList()
    },
    setFileList (field, value) {
      this.model.el(field).setFileList(value)
    },
    clearValidateState () {
      this.model.clearValidateState()
    },
    resetForm () {
      this.model.resetFields()
    },
    setTitle (title) {
      this.dialogTitle = title
    },
    openDialog () {
      this.visible = true
    },
    closeDialog () {
      this.visible = false
    },
    toggleDisabled (bool) {
      this.model.disabled(bool, ...Array.from(arguments).slice(1))
    },
    toggleDisplay (bool) {
      this.model.hidden(bool, ...Array.from(arguments).slice(1))
    },
    toggleLoading () {
      this.submitLoading = !this.submitLoading
    },
    trigger (filed, event, value) {
      this.model.trigger(filed, event, value)
    },
    clickSubmit () {
      this.emitEventHandler('click#submit')
    },
    closed () {
      // this.model.destroy()
    }
  }
}
</script>
