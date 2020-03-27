<template>
  <fragment>
    <template v-for="(first, index1) in menus">
      <router-link :to="first.path" :key="index1" v-if="first.type === 'item'">
        <el-menu-item :index="first.path">
          <i :class="first.meta.iconClass"></i>
          <span slot="title">{{ $t(first.meta.label) }}</span>
        </el-menu-item>
      </router-link>
      <el-submenu :index="'' + index1" :key="index1" v-else>
        <template slot="title">
          <i v-if="first.meta.iconClass" :class="first.meta.iconClass"></i>
          <span>{{ $t(first.meta.label) }}</span>
        </template>
        <template v-for="(second, index2) in first.children">
          <router-link :to="second.path" :key="index1 + '-' + index2" v-if="second.type === 'item'">
            <el-menu-item :index="second.path">
              <i :class="second.meta.iconClass"></i>
              <span slot="title">{{ $t(second.meta.label) }}</span>
            </el-menu-item>
          </router-link>
          <el-submenu :index="index1 + '-' + index2" :key="index2" v-else>
            <template slot="title">
              <i v-if="second.meta.iconClass" :class="second.meta.iconClass"></i>
              {{ $t(second.meta.label) }}
            </template>
            <template v-for="(third, index3) in second.children">
              <router-link :to="third.path" :key="index1 + '-' + index2 + '-' + index3" v-if="third.type === 'item'">
                <el-menu-item :index="third.path">
                  <i :class="third.meta.iconClass"></i>
                  <span slot="title">{{ $t(third.meta.label) }}</span>
                </el-menu-item>
              </router-link>
              <el-submenu :index="index1 + '-' + index2 + '-' + index3" :key="index3" v-else>
                <template slot="title">
                  <i v-if="third.meta.iconClass" :class="third.meta.iconClass"></i>
                  {{ $t(third.meta.label) }}
                </template>
                <template v-for="(fourth, index4) in third.children">
                  <router-link :to="fourth.path" :key="index1 + '-' + index2 + '-' + index3 + '-' + index4">
                    <el-menu-item :index="fourth.path">
                      <i :class="fourth.meta.iconClass"></i>
                      <span slot="title">{{ $t(fourth.meta.label) }}</span>
                    </el-menu-item>
                  </router-link>
                </template>
              </el-submenu>
            </template>
          </el-submenu>
        </template>
      </el-submenu>
    </template>
  </fragment>
</template>

<script>
import ElSubMenu from 'element-ui/lib/submenu'
import ElMenuItemGroup from 'element-ui/lib/menu-item-group'
import ElMenuItem from 'element-ui/lib/menu-item'
export default {
  name: 'MyMenuItem',
  components: {
    [ElSubMenu.name]: ElSubMenu,
    [ElMenuItemGroup.name]: ElMenuItemGroup,
    [ElMenuItem.name]: ElMenuItem
  },
  props: {
    menus: {
      type: Array
    },
    maxLableLength: Number
  }
}
</script>

<style scoped>
  /*去除router-link 下划线*/
  a {
    text-decoration: none;
  }
  .router-link-active{
    text-decoration: none;
  }
</style>
