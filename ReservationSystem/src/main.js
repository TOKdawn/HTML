// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(VueRouter)
axios.defaults.baseURL = 'http://visitor.neusoft.edu.cn'

Vue.prototype.$axios = axios



const router = new VueRouter({
    routes
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    router
}).$mount('#app')