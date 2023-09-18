import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiBookmarkCheck, BiBookmarkCheckFill, BiCheckLg, BiTrash } from 'oh-vue-icons/icons'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import './assets/main.css'

addIcons(BiTrash, BiBookmarkCheck, BiBookmarkCheckFill, BiCheckLg)

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(Toast)
app.mount('#app')
