<script>
import ElRow from 'element-ui/lib/row'
import ElCol from 'element-ui/lib/col'
import Handlebars from 'handlebars/dist/handlebars'
import { partials } from './partials'
export default {
  name: 'MyPanel',
  components: {
    [ElRow.name]: ElRow,
    [ElCol.name]: ElCol
  },
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  created () {
    partials.forEach((partial) => {
      Handlebars.registerPartial(partial.name, partial.template)
    })

    const source = `{{> my-panel text=items}}`
    const tpl = Handlebars.compile(source)
    let _items = this.recursive(this.items)
    const template = tpl({items: _items})
    this.$options.template = template
  },
  methods: {
    scale (len) {
      return Math.floor(24 / len)
    },
    recursive (items) {
      const that = this
      const _items = []
      items.forEach(function (item) {
        const _item = {}
        _item.gutter = item.gutter ? item.gutter : 0
        _item.style = item.style ? item.style : {}
        _item.cols = []

        const avgSpan = that.scale(item.cols.length)
        item.cols.forEach(function (col) {
          const _col = {}
          _col.span = col.span
          _col.offset = col.offset || 0
          _col.push = col.push || 0
          _col.pull = col.pull || 0
          _col.style = col.style || {}
          _col.slot = col.slot

          if (col.children) {
            _col.children = that.recursive(col.children)
          }

          if (item.equally) {
            _col.span = avgSpan
          }

          _item.cols.push(_col)
        })
        _items.push(_item)
      })

      return _items
    }
  }
}
</script>

<style scoped>
  .my-panel {
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }

  .my-panel .el-row {
    display: flex;
    display: -webkit-flex;
    margin-bottom: 16px;
  }
  .my-panel .el-row:last-child {
    margin-bottom: 0;
  }

  .my-panel .el-col {
    height: 100%;
    /*flex: 1;*/
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }

  .my-panel .my-panel-wrapper {
    flex: 1;
    overflow: auto;
  }
</style>
