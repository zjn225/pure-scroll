import Vue from 'vue'
import pureScroll from '../../packages/index'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(pureScroll)

new Vue({
  render: h => h(App),
}).$mount('#app')
