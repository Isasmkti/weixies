import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(MotionPlugin).mount('#app')
