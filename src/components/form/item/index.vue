<template>
  <el-form-item
    :label="$t(item.label)"
    :prop="item.prop"
    :label-width="item.labelWidth"
    :required="item.required"
    :rules="item.rules"
    :error="item.error"
    :show-message="item.showMessage"
    :inline-message="item.inlineMessage"
    :size="item.size"
    v-show="!hidden">
    <my-widget v-model="model[item.prop]" :config="item"></my-widget>
  </el-form-item>
</template>

<script>
import MyWidget from './widget.vue'

export default {
  name: 'MyFormItem',
  components: {
    [MyWidget.name]: MyWidget
  },
  props: {
    model: Object,
    item: Object
  },
  data () {
    return {
      hidden: false
    }
  },
  created () {
    if (this.item.defaultValue) {
      // 不能直接this.model[this.item.prop] = this.item.defaultValue，否则无法更新
      this.$set(this.model, this.item.prop, this.item.defaultValue)
    }
  },
  mounted () {
    if (this.item.hidden) {
      this.hidden = this.item.hidden
    }
  },
  methods: {
    genOperator: function (item) {
      // init model
      const list = []
      item.options.forEach((op) => {
        list.push(op)
      })
      return {
        type: 'select',
        disabled: false,
        options: list
      }
    },
    setDefaultValue (value) {
      this.$set(this.model, this.item.prop, value)
    },
    setOp (op) {
      if (this.item.slots && this.item.slots[0]) {
        this.item.slots[0].value = op
      }
    },
    toggleDisplay () {
      this.hidden = !this.hidden
    }
  },
  watch: {
    item: {
      immediate: true,
      deep: true,
      handler (val, oldVal) {
        if (this.model.op) {
          if (val.slots && val.slots[0]) {
            this.model['op'][val.prop] = val.slots[0].value
          } else {
            this.model['op'][val.prop] = '='
          }
        }
      }
    }
  }
}
</script>
