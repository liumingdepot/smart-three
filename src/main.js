import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './axios/axios.js'
import VCharts from 'v-charts'

Vue.use(VCharts)
Vue.prototype.$axios = axios
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
