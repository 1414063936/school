import Vue from 'vue'
import MyTable from './table'
import MyPanel from './panel'
import MyCard from './card'
import MyToolbar from './toolbar'
import MyClickButton from './button/ClickButton.vue'
import MyChecksButton from './button/ChecksButton.vue'
import MyDialogButton from './button/DialogButton.vue'
import MyFormDialogButton from './button/FormDialogButton.vue'
import MyUploadFileButton from './button/UploadFileButton.vue'

import MyFormDialog from './dialog/FormDialog.vue'

Vue.component(MyTable.name, MyTable)
Vue.component(MyPanel.name, MyPanel)
Vue.component(MyCard.name, MyCard)
Vue.component(MyToolbar.name, MyToolbar)
Vue.component(MyClickButton.name, MyClickButton)
Vue.component(MyChecksButton.name, MyChecksButton)
Vue.component(MyDialogButton.name, MyDialogButton)
Vue.component(MyFormDialogButton.name, MyFormDialogButton)
Vue.component(MyUploadFileButton.name, MyUploadFileButton)

Vue.component(MyFormDialog.name, MyFormDialog)
