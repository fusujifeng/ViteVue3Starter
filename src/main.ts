import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/css/main.css'
import App from './App.vue'
import router from './router'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/github-dark.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
