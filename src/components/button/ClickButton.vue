<template>
  <el-tooltip
    :disabled="tooltipDisabled"
    :content="$t(tooltipContent)"
    :placement="tooltipPlacement"
    :effect="tooltipEffect">
    <el-button
      :icon="icon"
      :type="type"
      :size="size"
      @click="() => emitEventHandler('click')">
      {{ label }}
    </el-button>
  </el-tooltip>
</template>
<script>
import ElButton from 'element-ui/lib/button'
export default {
  name: 'MyClickButton',
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
    },
    icon: {
      type: String,
      default: ''
    },

    tooltipDisabled: {
      type: Boolean,
      default: true
    },
    tooltipContent: String,
    tooltipPlacement: String,
    tooltipEffect: String
  },
  methods: {
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    }
  }
}
</script>
