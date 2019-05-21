import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const moment = require('moment')
require('moment/locale/ru')
 
Vue.use(require('vue-moment'), {
    moment
})
 

Vue.config.productionTip = false

Vue.use(Antd)

Vue.moment().locale('ru')

new Vue({
  render: h => h(App)
}).$mount('#app')
