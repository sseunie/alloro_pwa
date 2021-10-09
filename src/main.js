import 'mdb-vue-ui-kit/css/mdb.min.css'
import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/scripts/router"
import store from "@/scripts/store"
import './registerServiceWorker'

import Pusher from './scripts/pusher'

createApp(App)
    .use(router)
    .use(store)
    .use(Pusher, {
        apiKey: '3b4762476a7cab20819b',
        cluster: 'eu'
    })
    .mount('#app')
