<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <div :style="{display: 'flex', justifyContent: 'center', alignItems: 'center'}" class="title">dbSonar</div>
        <div :style="{display: 'flex', justifyContent: 'center', alignItems: 'center'}" class="subtitle">{{$t('system_name')}}</div>
      </div>
      <el-form-item prop="userName">
        <el-input name="userName" type="text" v-model="loginForm.userName"  autoComplete="on" :placeholder="$t('login_name')" :readonly="readonly">
          <i slot="prepend" class="el-icon-cn-yonghu"></i>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input name="password" :type="passwordType" v-model="loginForm.password" autoComplete="on" :placeholder="$t('password')"  :readonly="readonly">
          <i slot="prepend" class="el-icon-cn-jiesuo"></i>
          <i slot="append" class="el-icon-view" @click="showPwd"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <!--<lang-select v-model="loginForm.lang" :value="loginForm.lang" :languages="system.langs"></lang-select>-->
        <el-select v-model="loginForm.lang" @change="handleSetLanguage" :popper-class="popperClass">
          <el-option v-for="item in system.langs" :key="item.value" :label="item.label" :value="item.value" :disabled="language===item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" size="mini" class="login-button" :loading="loading" @click.native.prevent="handleSignIn"><span style="font-size: 18px">{{$t('login')}}</span></el-button>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    // [LangSelect.name]: LangSelect
  },
  name: 'Login',
  data: function () {
    return {
      iconSize: '18px',
      iconColor: '#92A3B5',
      textColor: '#92A3B5',
      loginForm: {
        userName: '',
        password: '',
        lang: ''
      },
      passwordType: 'password',
      loading: false,
      readonly: false,
      instanceForm: {
        instanceId: '',
        userName: '',
        userAccessLevel: 0
      },
      instanceRules: {
        instanceId: [{ required: true, trigger: 'blur' }]
      },
      showInstanceSelect: false,
      popperClass: 'el-select-dropdown__cover',
      langs: [
        {label: 'En', value: 'en'},
        {label: '简中', value: 'zh_CN'},
        {label: '简繁', value: 'zh_TW'}
      ]
    }
  },
  computed: {
    ...mapGetters(['system', 'apiProject', 'isLogin']),
    language () {
      return this.$store.getters.language
    },
    loginRules () {
      return {
        userName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleSignIn: function () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const vm = this
          const _model = Object.assign(this.loginForm)
          vm.loading = true
          vm.$axios('/' + vm.apiProject + '/login/getLogin', {
            showLoading: false, // 不全屏覆盖显示loading中
            method: 'post',
            data: _model
          })
            .then(response => {
              const data = response.data
              if (!data) {
                return false
              }

              if (data.status !== 'success') {
                vm.$message({
                  type: 'warning',
                  message: data.errorMessage
                })

                return false
              }

              vm.$store.commit('SET_NAME', this.loginForm.userName)
              vm.$store.commit('SET_STATUS', true)

              vm.$router.push({path: '/home'})
            }).finally(() => {
              vm.loading = false
            })
        } else {
          return false
        }
      })
    },
    handleSetLanguage (lang) {
      this.$store.commit('SET_LANGUAGE', lang)
      this.$i18n.locale = lang
    }
  },
  watch: {
    system: {
      immediate: true,
      handler: function (system) {
        if (!this.language) {
          this.$store.commit('SET_LANGUAGE', system.defaults.lang)
        }
        this.$i18n.locale = this.language
        this.loginForm.lang = this.language
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
  $bg:#2d3a4b;
  $light_gray:#eee;

  /* cover element-ui css */
  .login-container {
    .el-form-item {
      border: 1px solid #3E4A58;
      background: #283442;
      border-radius: 5px;
    }
    .el-input {
      /*height: 4rem;*/
      .el-input-group__prepend,.el-input-group__append {
        /*<!--background-color: $bg;-->*/
        background:none;
        font-size: 1.33rem;
        border:none;
        /*border: 1px solid #3E4A58;*/
      }
      input {
        height: 100%;
        background: transparent;
        border:none;
        color: #FFFFFF;
        /*font-size: 1.67rem;*/
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
      /*input:-webkit-autofill {*/
      /*-webkit-box-shadow: 0 0 0 1000px #2d3a4b inset!important;*/
      /*-webkit-text-fill-color: #fff!important;*/
      /*}*/
      .el-input__inner {
        /*border: 1px solid #3E4A58;*/
      }
    }
    .el-select {
      width: 100%;
    }
    .el-button {
      /*height:4rem;*/
      width:100%;
      margin-bottom:20px;
    }
  }

  @media screen and (max-width: 1280px){
    .login-form {
      width: 350px;
    }
    .title-container{
      margin-bottom: 2rem;
      div {
        margin-bottom: 1.5rem
      }
      .title {
        color: #FFFFFF;
        font-weight: 700;
        font-size: 3rem;
      }
      .subtitle {
        color: #FFFFFF;
        font-weight: 700;
        font-size: 1.6rem;
      }
    }

  }
  @media screen and (min-width: 1281px){
    .login-form {
      width: 520px;
    }
    .title-container{
      margin-bottom: 4rem;
      div {
        margin-bottom: 1.5rem;
      }
      .title {
        color: #FFFFFF;
        font-weight: 700;
        font-size: 4rem;
      }
      .subtitle {
        color: #FFFFFF;
        font-weight: 700;
        font-size: 2.5rem;
      }
    }
  }

  @media screen and (max-height: 578px){
    .login-container {
      .el-input {
        height: 2.67rem
      }
      .el-button{
        height: 2.67rem
      }
    }
  }
  @media screen and (min-height: 579px){
    .login-container {
      .el-input {
        height: 4rem
      }
      .el-button{
        height: 4rem
      }
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      padding: 35px 35px 15px;
      margin: 0 auto;
      -webkit-transform: translateY(-60%);
      transform: translateY(-60%);
    }

    .tips {
      font-size: 12px;
      color: #576777;
      line-height:18px;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
  }
</style>
<style>
  .el-select-dropdown__cover {
    border: 1px solid #283442 !important;
    background-color: #283442 !important;
  }
  .el-select-dropdown__cover .el-select-dropdown__item {
    color: #FFFFFF;
  }
  .el-select-dropdown__cover .el-select-dropdown__item.hover {
    background-color: #2d3949;
    color: #009efc;
  }
  .el-select-dropdown__cover .el-select-dropdown__item:hover {
    background-color: #2d3949;
    color: #009efc;
  }

  .el-select-dropdown__cover.el-popper[x-placement^=bottom]  .popper__arrow{
    border-bottom-color: #283442;
  }
  .el-select-dropdown__cover.el-popper[x-placement^=bottom]  .popper__arrow:after {
    border-bottom-color: #283442;
  }
</style>
