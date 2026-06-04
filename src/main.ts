import Vue from 'vue'
// @ts-ignore
import App from './App.vue'
import store from './store/index'
import addInterceptors from '@API/interceptors'
import Router from '@API/router'

// 引入 uview-ui
import uView from 'uview-ui'
Vue.use(uView)

Vue.config.productionTip = false

addInterceptors()

Vue.prototype.$Router = Router
Vue.prototype.$store = store

new App({
  store,
}).$mount();
