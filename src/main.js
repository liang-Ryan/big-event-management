// css
import '@/assets/main.scss'

// 通用
import { createApp } from 'vue'
import App from './App.vue'

// router
import router from './router'

// pinia
import pinia from '@/stores/index'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
