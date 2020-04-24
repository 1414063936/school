<template>
  <fragment>
    <el-form :inline="true" style="height: 35px;">
      <el-form-item>
        <el-radio-group v-model="shortcutOption">
          <el-radio-button v-for="option in shortcutOptions" :key="option.value" :label="option.value" :value="option.value">{{$t(option.label)}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="margin-top: 0.7px">
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          :clearable="false"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          @change="dateRangeChange">
        </el-date-picker>
      </el-form-item>
    </el-form>
  </fragment>
</template>

<script>
import moment from 'moment'
export default {
  name: 'MyDateRange',
  components: {},
  props: {

  },
  data () {
    return {
      visible: false,
      shortcutOption: 'today',
      shortcutOptions: [
        { label: '今天', value: 'today' },
        { label: '昨天', value: 'yesterday' },
        { label: '本周', value: 'thisWeek' },
        { label: '本月', value: 'thisMonth' }
      ],
      dateRange: [moment().startOf('week'), moment().startOf('hour')]
    }
  },
  methods: {
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    dateRangeChange () {
      this.shortcutOption = 'custom'
    },
    getDateRange () {
      if (this.dateRange) {
        return [moment(this.dateRange[0]).format('X'), moment(this.dateRange[1]).format('X')]
      } else {
        return null
      }
    }
  },
  watch: {
    dateRange (val) {
      if (val) {
        this.emitEventHandler('change')
      }
    },
    shortcutOption: function (val) {
      switch (val) {
        case 'today':
          this.dateRange = [moment().startOf('day'), moment().startOf('hour')]
          break
        case 'yesterday':
          this.dateRange = [moment().subtract(1, 'days').startOf('day'), moment().startOf('day')]
          break
        case 'thisWeek':
          this.dateRange = [moment().startOf('week'), moment().startOf('hour')]
          break
        case 'thisMonth':
          this.dateRange = [moment().startOf('month'), moment().startOf('hour')]
          break
      }
    }
  }
}
</script>
