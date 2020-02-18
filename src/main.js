import Vue from 'vue'
import App from './App.vue'
import "bulma/css/bulma.css"
import lodash from 'lodash'

Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
