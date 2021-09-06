import 'mdb-vue-ui-kit/css/mdb.min.css'
import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/scripts/router"
import store from "@/scripts/store"
import './registerServiceWorker'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
