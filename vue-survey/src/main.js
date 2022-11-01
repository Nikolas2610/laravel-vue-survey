import { createApp } from 'vue'
import './style.css'
import store from './store'
import router from './router'
import './assets/styles/css/main.css'
import App from './App.vue'

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
