<template>
  <div class="my-card" ref="MyCard">
    <el-card :body-style="{'height': bodyHeight, 'overflow': 'auto'}">
      <div slot="header" v-if="$slots.header" ref="cardHeader">
        <slot name="header"></slot>
      </div>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
import ElCard from 'element-ui/lib/card'
export default {
  name: 'MyCard',
  components: {
    [ElCard.name]: ElCard
  },
  props: {
    shadow: {
      type: String
    }
  },
  data () {
    return {
      bodyHeight: 'calc(100% - 33px)'
    }
  },
  mounted () {
    const vm = this
    this.$nextTick(() => {
      let headerHeight = 0
      if (vm.$refs['cardHeader']) {
        headerHeight = vm.$refs['cardHeader'].offsetHeight + 16
      }
      this.bodyHeight = 'calc(100% - ' + headerHeight + 'px)'
    })
  }
}
</script>

<style scoped>
  .my-card {
    height: 100%;
    width: 100%;
  }

  .el-card {
    height: 100%;
    width: 100%;
  }
</style>

<style>
  /* 放在scoped中会失效 */
  .my-card .el-card__header {
    padding: 8px 20px;
    border-bottom: 0 solid #ebeef5!important;
  }

  .my-card .el-card__body {
    padding-top: 5px;
    padding-bottom: 5px;
  }
</style>
