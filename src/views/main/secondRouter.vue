<template>
  <fragment>
    <h2>这里是第二层</h2>
    <router-view :key="key"></router-view>
  </fragment>
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
        this.key = val.matched[2].path
      }
    }
  }
}
</script>
