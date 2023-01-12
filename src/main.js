import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// gojs
import "babel-polyfill"
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
import gojs from 'gojs'
Vue.prototype.go = gojs
/* eslint-disable no-new */
// 导入element ui
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式表
import './assets/css/global.css'

// 引入iconfont 样式
import './assets/fonts/iconfont.css'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios.defaults.baseURL = 'http://127.0.0.1:5000/'
// axios.defaults.baseURL = 'http://127.0.0.1:5000/'
Vue.prototype.$http = axios
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

// 树状条导入
import TreeTable from 'vue-table-with-tree-grid'
// 注册全局组件
Vue.component('tree-table', TreeTable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
