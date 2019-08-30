import Vue from 'vue'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
Vue.use(VueRouter)
Vue.use(Vant)
//引入时间组件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY年MM月DD日") {
  return moment(dataStr).format(pattern)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
