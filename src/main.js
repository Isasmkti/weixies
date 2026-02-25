import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useThemeStore } from './stores/themeStore'
import { MotionPlugin } from '@vueuse/motion'
import VueApexCharts from "vue3-apexcharts";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const themeStore = useThemeStore()
themeStore.initTheme()

app.use(router)
    .use(MotionPlugin)
    .use(VueSweetalert2)
    .use(VueApexCharts)
    .mount('#app')




// app.use(pinia)

// const themeStore = useThemeStore()
// themeStore.initTheme()

// app
//   .use(router)
//   .use(MotionPlugin)
//   .use(VueSweetalert2)
//   .use(VueApexCharts)
//   .mount('#app')