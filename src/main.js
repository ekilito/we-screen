import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles/common.scss'

const app = createApp(App)

app.use(router) // Vue.use(router) 注册插件  注册路由

app.mount('#app')