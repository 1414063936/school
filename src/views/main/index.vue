<template>
  <div class="main">
    <el-menu :default-active="defaultActive" class="el-menu-vertical" :collapse="!active" :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor" unique-opened>
      <el-menu-item index="0" style="height: 62px; line-height: 62px;font-size: 18px; font-weight:800;">
        <div style="color: #FFF;">
          <span style="display: inline-block !important;">dbSonar</span>
        </div>
      </el-menu-item>
      <my-menu-item :menus="sideBarNavMenus" :max-lable-length="25"></my-menu-item>
    </el-menu>
    <div class="main-container">
      <el-menu class="main-header" mode="horizontal" :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor">
        <div class="left-header">
          <my-hamburger class="left-header-item" :isActive="active" @toggle-click="toggleSideBar"></my-hamburger>
          <span class="left-header-item">
            <my-bread-crumb class="left-header-item"></my-bread-crumb>
          </span>
        </div>
        <div class="right-header">
          <el-dropdown class="right-header-item" trigger="click">
             <span class="el-dropdown-link">
               <i class="el-icon-cn-morentouxiang" :style="{color: textColor, fontSize: iconSize, padding: '0 2px'}"></i>
               <span :style="{color: textColor}">{{$t('user_setting')}}</span><i class="el-icon-arrow-down el-icon--right"></i>
             </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>
                {{loginName}}
              </el-dropdown-item>
              <el-dropdown-item  divided>
                <span @click="changeUser">{{$t('change_user')}}</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="changePassword">{{$t('change_password')}}</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="logOut">{{$t('logout')}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-menu>
      <div class="main-view-container">
        <router-view :key="key"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MyHamburger from '@/components/hamburger'
import MyBreadCrumb from '@/components/breadCrumb'
import MyMenuItem from '@/components/menuItem'
import { mapGetters } from 'vuex'
export default {
  name: 'Main',
  components: {
    [MyHamburger.name]: MyHamburger,
    [MyBreadCrumb.name]: MyBreadCrumb,
    [MyMenuItem.name]: MyMenuItem
  },
  data: function () {
    return {
      key: '',
      active: true,
      backgroundColor: '#30465D',
      textColor: '#92A3B5',
      activeTextColor: '#FFFFFF',
      iconSize: '18px',
      iconColor: '#92A3B5'
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (val) {
        this.key = val.matched[1].path
      }
    }
  },
  computed: {
    ...mapGetters(['system', 'apiProject', 'sideBarMenus']),
    sideBarNavMenus () {
      // console.log(this.sideBarMenus)
      return this.sideBarMenus
    },
    defaultActive () {
      return this.$route.path
    },
    loginName () {
      return this.$store.state.user.name
    }
  },
  methods: {
    toggleSideBar (active) {
      this.active = active
    },
    changeUser () {

    },
    changePassword () {

    },
    logOut () {
      const vm = this
      vm.$store.dispatch('setLoginStatus', false)
        .then(response => {
          vm.$axios.get('/' + vm.apiProject + '/login/logout')
            .then(response => {
              location.reload()
            })
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import 'src/assets/styles/mixin.scss';

  :focus {
    outline: -webkit-focus-ring-color auto 0;
  }

  .main {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  }

  .main-container{
    flex: 1;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    overflow: auto;
  }

  .main-view-container{
    /*flex:1;*/
    overflow: auto;
    height: 100%;
    padding: 16px;
  }

  .main-header {
    /*height: 60px;*/
  }

  .left-header {
    float: left;
    height: 100%;
    line-height: 60px;
  }

  .left-header-item {
    display: inline-block;
    margin: 0 8px;
  }

  .right-header {
    float: right;
    height: 100%;
    line-height: 60px;
    margin-right: 15px;
  }
  .right-header-item {
    display: inline-block;
    padding: 0 5px 0 5px;
  }
  .right-header-item:hover {
    background-color: rgb(38,56,74);
  }

  .el-dropdown-menu {
    padding: 3px 0;
  }

</style>

<style>

</style>
