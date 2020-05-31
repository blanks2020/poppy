import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ViewDesign from 'view-design'
import axios from 'axios'
import '@style/theme.less'
import '@style/util.less'
// import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(ViewDesign)

Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
