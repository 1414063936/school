<template>
  <div>
    {{ row }}
  </div>
</template>

<script>
export default {
  created () {
    this.row = JSON.parse(this.$route.query.row)
  },
  data () {
    return {
      row: {}
    }
  }
}
</script>
