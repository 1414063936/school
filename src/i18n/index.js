import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import axios from 'axios'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhCnLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementZhTwCnLocale from 'element-ui/lib/locale/lang/zh-TW'// element-ui lang
import enLocale from '../../static/i18n/en.json'
import zhCnLocale from '../../static/i18n/zh_CN.json'
import zhTwLocale from '../../static/i18n/zh_TW.json'
import Cookies from 'js-cookie'

Vue.use(VueI18n)

// axios.get('/lang')
//   .then(response => {
//     console.log(response)
//   })

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh_CN: {
    ...zhCnLocale,
    ...elementZhCnLocale
  },
  zh_TW: {
    ...zhTwLocale,
    ...elementZhTwCnLocale
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('x-language'), // set locale
  fallbackLocale: Cookies.get('x-language'),
  messages, // set locale messages
  silentTranslationWarn: true
})

export default i18n
