import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './store'
import Pinia from './store'
import './service/index.ts'
import 'normalize.css'
import './assets/css/index.less'
import registerIcons from './global/register-icons'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/el-message.css'
const app = createApp(App)

app.use(axios)
app.use(router)
app.use(Pinia)
// app.use(ElementPlus)
app.use(registerIcons)
app.mount('#app')
