<template>
  <el-tooltip
    :disabled="tooltipDisabled"
    :content="$t(tooltipContent)"
    :placement="tooltipPlacement"
    :effect="tooltipEffect">
    <el-dropdown :trigger="trigger" :placement="placement" :hide-on-click="false">
      <el-button style="margin-left: 10px;margin-right: 10px" :type="type" :size="size">
        <i class="el-icon-menu"></i>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <template v-for="(option, index) in internalChecks" >
          <el-dropdown-item :key="index">
            <el-checkbox-group v-model="option['visible']">
              <el-checkbox :label="$t(option['label'])"></el-checkbox>
            </el-checkbox-group>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </el-tooltip>
</template>

<script>
export default {
  name: 'MyChecksButton',
  props: {
    tooltipDisabled: {
      type: Boolean,
      default: true
    },
    tooltipContent: String,
    tooltipPlacement: String,
    tooltipEffect: String,
    type: {
      type: String,
      default: 'primary'
    },
    size: String,
    placement: String,
    trigger: {
      type: String,
      default: 'click'
    },
    checks: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      internalChecks: this.checks
    }
  },
  mounted () {

  },
  methods: {
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    setChecks (checks) {
      this.internalChecks = checks
    }
  },
  watch: {
    checks: function (val) {
      this.internalChecks = val
    }
  }
}
</script>
