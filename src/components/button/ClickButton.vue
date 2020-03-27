<template>
  <el-button
    :type="type"
    :size="size"
    @click="() => emitEventHandler('click')">
    {{ label }}
  </el-button>
</template>
<script>
import ElButton from 'element-ui/lib/button'
export default {
  name: 'ClickButton',
  components: {
    [ElButton.name]: ElButton
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'mini'
    }
  },
  methods: {
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    }
  }
}
</script>
