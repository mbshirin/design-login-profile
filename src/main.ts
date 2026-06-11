import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '@/styles/fonts.css'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
})

app.use(router)
app.use(ToastService)
app.use(createPinia())

app.mount('#app')
