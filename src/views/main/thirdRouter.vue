<template>
  <div>
    <h3>这里是第三层</h3>
    <router-view :key="key"></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      key: ''
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (val) {
        this.key = val.matched[3].path
      }
    }
  }
}
</script>
