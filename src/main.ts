import { createApp } from 'vue'
import stores from '@/stores'

import App from './App.vue'
import router from './router'
import { setup } from "@/setup"

import 'normalize.css'
import "@/assets/common.scss"
import './tailwind.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

// 安装应用组件
setup(app)

app.use(stores)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
