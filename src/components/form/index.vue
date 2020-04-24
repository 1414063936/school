<template>
  <div class="form-container">
    <el-form
      :ref="ref"
      :model="model"
      :rules="rules"
      :inline="inline"
      :label-position="labelPosition"
      :label-width="labelWidth"
      :labelSuffix="labelSuffix"
      :show-message="showMessage"
      :inline-message="inlineMessage"
      :status-icon="statusIcon"
      :validate-on-rule-change="validateOnRuleChange"
      :size="size"
      :disabled="disabled"
      @validate="(prop,status)=> emitEventHandler('validate',prop,status)">
      <template v-for="(item, index) in items">
        <el-row :key="index">
          <template v-for="(col, index1) in item.row">
            <el-col :key="index1" :span="col.span">
              <my-form-item :ref="'item-' + col.prop" :model="model" :item="col"></my-form-item>
            </el-col>
          </template>
        </el-row>
      </template>
    </el-form>
  </div>
</template>

<script>
import MyFormItem from './item'
import { defaultSize } from '@/default'
export default {
  name: 'MyForm',
  mixins: [],
  components: {
    MyFormItem
  },
  props: {
    model: Object,
    rules: Object,
    inline: Boolean,
    labelPosition: String,
    labelWidth: String,
    labelSuffix: {
      type: String,
      default: ''
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    inlineMessage: Boolean,
    statusIcon: {
      type: Boolean,
      default: true
    },
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: defaultSize
    },
    disabled: Boolean,

    type: {
      type: String,
      default: 'filter'
    },
    items: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  created () {
    if (this.type === 'filter' && !this.model['op']) {
      this.model['op'] = {}
    }
  },
  data () {
    return {
      ref: 'form'
    }
  },
  mounted () {

  },
  methods: {
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    clearValidate () {
      this.$refs[this.ref].clearValidate()
    },
    resetFields () {
      this.$refs[this.ref].resetFields()
    },
    validate (callback) {
      this.$refs[this.ref].validate(callback)
    },
    validateField (prop, cb) {
      this.$refs[this.ref].validateField(prop, cb)
    },
    getValue (type) {
      let value
      this.$refs[this.ref].validate(validate => {
        if (!validate) {
          value = false
        } else {
          value = {}
          if (this.type === 'filter') {
            value['filter'] = []
          }
          for (let i in this.model) {
            if (i !== 'op' && this.model[i] !== '') {
              if (this.model.op && this.model.op[i]) {
                value['filter'].push([i, this.model.op[i], this.model[i]])
              } else {
                value[i] = this.model[i]
              }
            }
          }
        }
      })

      return value
    },
    setValue (value) {
      if (this.type === 'filter') {
        value.filter.forEach(item => {
          const [prop, op, val] = item
          if (this.$refs['item-' + prop]) {
            this.$refs['item-' + prop][0].setOp(op)
            this.$refs['item-' + prop][0].setDefaultValue(val)
          }
        })
      } else {
        for (let i in value) {
          if (this.$refs['item-' + i]) {
            this.$refs['item-' + i][0].setDefaultValue(value[i])
          }
        }
      }
    },
    toggleItemDisplay (items) {
      // ref在v-for中
      items.forEach(item => {
        this.$refs['item-' + item][0].toggleDisplay()
      })
    }
  }
}
</script>
