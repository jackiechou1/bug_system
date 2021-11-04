import Vue from 'vue'
import '@/init-ui'
import router from '@/router'
import '@/assets/less/main.less'
import store from '@/store'
import App from '@/App.vue'
import moment from 'moment'
import '@/directives/index'
import { hasFunc } from '@/directives/func'
import VueDND from 'awe-dnd'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueDND)
Vue.use(ElementUI)

moment.locale('zh-cn')

Vue.config.productionTip = false
Vue.prototype.hasFunc = hasFunc

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
