<template>
  <el-select
    :id="id"
    :name="name"
    :value="value"
    :autocomplete="autocomplete"
    :automaticDropdown="automaticDropdown"
    :size="size"
    :disabled="disabled"
    :clearable="clearable"
    :filterable="filterable"
    :allowCreate="allowCreate"
    :loading="loading"
    :popperClass="popperClass"
    :remote="remote"
    :loadingText="loadingText"
    :noMatchText="noMatchText"
    :noDataText="noDataText"
    :remoteMethod="remoteHttpMethod"
    :filterMethod="filterMethod"
    :multiple="multiple"
    :multipleLimit="multipleLimit"
    :placeholder="placeholder"
    :defaultFirstOption="defaultFirstOption"
    :reserveKeyword="reserveKeyword"
    :valueKey="valueKey"
    :collapseTags="collapseTags"
    :popperAppendToBody="popperAppendToBody"
    @input="(val)=>emitEventHandler('input',val)"
    @change="(val)=>emitEventHandler('change',val)">
    <template v-for="option in internalOptions">
      <el-option-group v-if="option.options" :key="option.label">
        <el-option v-for="opt in option.options"
                   :key="opt.value"
                   :label="opt.label"
                   :value="opt.value"></el-option>
      </el-option-group>
      <el-option v-else :key="option.value" :label="option.label" :value="option.value"></el-option>
    </template>
  </el-select>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    name: String,
    id: String,
    value: {
      required: true
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    // remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: String,
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    url: String,
    params: Object
  },
  data () {
    return {
      internalOptions: this.options
    }
  },
  mounted () {
    if (this.url && !this.filterable) {
      this.remoteHttpMethod()
    }
  },
  methods: {
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    remoteHttpMethod (query) {
      const vm = this
      const _params = {}
      if (!query) {
        Object.assign(_params, {query: query})
      }

      vm.$axios.get(this.url, _params)
        .then((response) => {
          this.internalOptions = response.data.data
        })
    }
  }
}
</script>
