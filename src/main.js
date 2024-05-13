// css
import '@/assets/main.scss'

// 通用
import { createApp } from 'vue'
import App from './App.vue'

// pinia
import pinia from '@/stores/index'

// router
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
