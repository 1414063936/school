<template>
  <div style="display: block">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item v-for="(item,index)  in items" :key="index">
        <span v-if="items.length -1 == index" style="color: #FFFFFF">{{ $t(item) }}</span>
        <span v-else style="color: #A6AFBB">{{ $t(item) }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'MyBreadCrumb',
  data () {
    return {
      items: []
    }
  },
  created () {
    this.refreshBreadCrumb()
  },
  watch: {
    $route () {
      this.refreshBreadCrumb()
    }
  },
  methods: {
    refreshBreadCrumb () {
      const matched = this.$route.matched
      const breadCrumb = []
      matched.forEach(item => {
        if (item.name) {
          breadCrumb.push(item.meta.label)
        }
      })

      this.items = breadCrumb
    }
  }
}
</script>

<style scoped>

</style>
