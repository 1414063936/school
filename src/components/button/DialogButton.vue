<template>
  <span>
    <my-click-button
      :type="type"
      :size="size"
      :label="label"
      @click="click">
    </my-click-button>
    <my-component-dialog
      ref="MyDialog"
      :title="title"
      modal-append-to-body
      @component-link ="() => emitEventHandler('component-link')"
      :component="component"
      :compProps="compProps">
    </my-component-dialog>
  </span>
</template>

<script>
import MyClickButton from './ClickButton.vue'
import MyComponentDialog from '@/components/dialog/ComponentDialog.vue'

export default {
  name: 'MyDialogButton',
  components: {
    [MyClickButton.name]: MyClickButton,
    [MyComponentDialog.name]: MyComponentDialog
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
    title: {
      type: String,
      default: ''
    },
    width: String,
    height: String,
    component: String,
    compProps: Object
  },
  data () {
    return {

    }
  },
  methods: {
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    click () {
      this.$refs['MyDialog'].open()
    }
  }
}
</script>
