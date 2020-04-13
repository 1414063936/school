<template>
  <my-panel :items="LAYOUT">
    <template slot="main">
      <el-tabs v-model="activeName" :type="type" @tab-click="handleClick" style="height: 100%">
        <el-tab-pane
          v-for="(tab, key) in tabs"
          :key="key"
          :label="$t(tab.label)"
          :name="tab.name">
          <async-component :is="components[tab.name]" v-bind="tab.compProps"></async-component>
        </el-tab-pane>
      </el-tabs>
    </template>
  </my-panel>
</template>

<script>
import ElTabs from 'element-ui/lib/tabs'
import ELTabPane from 'element-ui/lib/tab-pane'
export default {
  components: {
    [ElTabs.name]: ElTabs,
    [ELTabPane.name]: ELTabPane
  },
  props: {
    tabs: {
      type: Array
    }
  },
  data () {
    return {
      LAYOUT: [
        {
          gutter: 0,
          equally: true,
          style: {
            flex: 1
          },
          cols: [
            {
              slot: 'main'
            }
          ]
        }
      ],
      activeName: '',
      tabSeq: [],
      tabVisible: {},
      components: {},
      type: 'border-card'
    }
  },
  created () {
    if (this.$route.query.activeName) {
      this.activeName = this.$route.query.activeName
    } else {
      this.activeName = this.tabs[0].name
    }

    this.tabs.forEach(tab => {
      if (this.activeName === tab.name) {
        // 异步懒加载
        this.components[tab.name] = () => import('@/views/' + tab.component)
        this.tabVisible[tab.name] = true
      } else {
        this.tabVisible[tab.name] = false
      }
    })
  },
  methods: {
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    handleClick (value) {

    }
  },
  watch: {
    activeName: function (val, oldVal) {
      this.$router.push({
        query: {
          activeName: val
        }
      })
      let component
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].name === val) {
          component = this.tabs[i].component
          break
        }
      }
      if (oldVal) {
        if (component && !this.components[val]) {
          // 异步懒加载
          // 无法使用表达式，会编译views下的所有组件，然后加载指定组件
          this.components[val] = () => import('@/views/' + component)
          // this.components[val] = (resolve) => require(['@/views/' + component], resolve)
        }
      }
    }
  }
}
</script>

<style>
  .el-tabs__content{
    height: calc(100% - 40px);
    overflow: auto;
  }

  .el-tabs--left .el-tabs__content, .el-tabs--right .el-tabs__content{
    height: 100%;
  }

  .el-tab-pane{
    height: 100%;
  }
</style>
