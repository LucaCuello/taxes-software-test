import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiBookmarkCheck, BiBookmarkCheckFill, BiTrash } from 'oh-vue-icons/icons'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

addIcons(BiTrash, BiBookmarkCheck, BiBookmarkCheckFill)

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.mount('#app')
