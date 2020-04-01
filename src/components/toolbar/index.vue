<template>
  <div class="my-toolbar">
    <div class="left">
      <slot name="l-left"></slot>
      <template v-for="(item, index) in leftItems">
        <toolbar-item :key="index" :item="item" :emitFunc="emitEventHandler"></toolbar-item>
      </template>
      <slot name="r-left"></slot>
    </div>
    <div class="right">
      <slot name="l-right"></slot>
      <template v-for="(item, index) in rightItems">
        <toolbar-item :key="index" :item="item" :emitFunc="emitEventHandler"></toolbar-item>
      </template>
      <slot name="r-right"></slot>
    </div>
  </div>
</template>

<script>
import ToolbarItem from './item'
import methods from '../mixins/methods'

export default {
  name: 'MyToolbar',
  components: {
    ToolbarItem,
    [ToolbarItem.name]: ToolbarItem
  },
  mixins: [methods],
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    },
    url: String,
    autoLoadItems: {
      type: Boolean,
      default: false
    }
  },
  created () {
    if (this.autoLoadItems) {
      this.loadItems()
    }
  },
  data () {
    return {
      internalItems: this.items
    }
  },
  computed: {
    leftItems: function () {
      let items = []
      this.internalItems.forEach(function (item) {
        if (!item.position || item.position === 'left') {
          items.push(item)
        }
      })

      return items
    },
    rightItems: function () {
      let items = []
      this.internalItems.forEach(function (item) {
        if (item.position === 'right') {
          items.push(item)
        }
      })

      return items
    }
  },
  methods: {
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    trigger (ref, method, ...args) {
      const comps = this.$refs[ref]
      if (comps && comps.length > 0) {
        const comp = comps[0]
        if (comp) {
          comp[method](...args)
        }
      }
    },
    loadItems () {
      let _params = {}
      this.syncHttpGet(this.url, _params, (data, textStatus, jqXHR) => {
        if (data instanceof Array) {
          this.internalItems = this.internalItems.concat(data)
        }
      })
    }
  }
}
</script>

<style scoped>
  .my-toolbar {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    width: 100%;
    /*padding: 5px 0px 5px 5px;*/
  }
</style>
