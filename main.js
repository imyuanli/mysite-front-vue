import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(ElementUI)
const app = new Vue({
    ...App,
    ElementUI
})
app.$mount()

//
// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import App from './App.vue'
// Vue.config.productionTip = false
// App.mpType = 'app'
// Vue.use(ElementUI)
//
// new Vue({
//     el: '#app',
//     render: h => h(App)
// })



// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif