import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routers from './router.js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Schedule from './components/Schedule'
import Search from './components/Search'
import VueSkycons from 'vue-skycons'

Vue.use(VueRouter)
Vue.use(iView)
Vue.use(VueSkycons, { color: 'gray' })
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Search },
  { path: '/schedule', component: Schedule }
]

const RouterConfig = {
    routes: routes
};
const router = new VueRouter(RouterConfig)

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
