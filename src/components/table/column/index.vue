<script>
// 通过渲染函数产生节点
import renders from './renders'
export default {
  name: 'ColumnRender',
  functional: true,
  render: (createElement, ctx) => {
    const column = ctx.props.column
    const widget = column.widget ? column.widget : ''
    const render = renders[widget]

    return render(createElement, ctx, ctx.props.emitFunc)
  }
}
</script>
