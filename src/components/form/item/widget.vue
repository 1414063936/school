<script>
import renders from './renders'
export default {
  name: 'MyWidget',
  functional: true,
  render: (createElement, ctx) => {
    const config = ctx.props.config
    const widget = config.type ? config.type : 'input'
    const render = renders[widget]

    if (!render) { throw new Error(`This Widget [${widget}] is not supported`) }

    if (!ctx.data.props) {
      ctx.data.props = {}
    }
    Object.assign(ctx.data.props, config)
    return render(createElement, ctx)
  }
}
</script>

<style scoped>
  .el-input .el-select {
    width: 130px;
  }
</style>
