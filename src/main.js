import Vue from 'vue'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import App from './App.vue'
Vue.use(ElementUI)
import * as urls from "@/config/env";
import { iconfontUrl, iconfontVersion } from "@/config/env";
import { loadStyle } from './util/util'

Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
})

iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele));
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
