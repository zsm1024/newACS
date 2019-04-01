import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueJsonp from 'vue-jsonp'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import Mock from './mock'
import { Affix, Page, Timeline, TimelineItem, Steps, Step, BackTop, Modal, Poptip } from 'iview'
import VueQr from 'vue-qr'
import 'iview/dist/styles/iview.css'
import Print from 'vue-print-nb'
import VCharts from 'v-charts'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vuebar from 'vuebar'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
// 引入echartss
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 例子效果
import VueParticles from 'vue-particles'
import { matchPoint } from './utils/behavior'
import { reportLocalError } from './utils/behavior'
import '@/icons' // icon
// import '@/permission' // permission control
Mock.bootstrap()
Vue.use(echarts)
Vue.use(Viewer)
Vue.use(VCharts)
Vue.use(Vuebar)
Vue.use(VueParticles)
Vue.use(VueJsonp)

Vue.component('Poptip', Poptip)
Vue.component('VueQr', VueQr)
Vue.component('Modal', Modal)
Vue.component('BackTop', BackTop)
Vue.component('Affix', Affix)
Vue.component('Page', Page)
Vue.component('Step', Step)
Vue.component('Steps', Steps)
Vue.component('Timeline', Timeline)
Vue.component('TimelineItem', TimelineItem)

Vue.use(ElementUI, { locale })
Vue.use(Print)

Vue.config.productionTip = false

Vue.config.errorHandler = function(err) {
  console.log(err) // for debug
  reportLocalError(err)
}
var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

window.addEventListener('click', function(event) {
  matchPoint(event, vm)
}, true)
