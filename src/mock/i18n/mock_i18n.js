import enLocale from '../../../static/i18n/en.json'
import zhCnLocale from '../../../static/i18n/zh_CN.json'
import zhTwLocale from '../../../static/i18n/zh_TW.json'

export default {
  GET: config => {
    return {
      lang: {
        enLocale,
        zhCnLocale,
        zhTwLocale
      }
    }
  }
}
