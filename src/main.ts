import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './lib/router'

import { authGuard } from './lib/router/authGuard'

const app = createApp(App)

// TODO add to env

app.use(createPinia())
app.use(router)

app.mount('#app')

authGuard()
