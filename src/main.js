import Vue from 'vue'
import App from './App.vue'
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
