// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { initGooglemap } from "@/handler/ggMapLoader";
import VueTouch from 'vue-touch';
import touch from 'vue-directive-touch';
Vue.use(touch);
/* var VueTouch = require('vue-touch')
 */Vue.config.productionTip = false
//初始化谷歌地图
/* console.log(initGooglemap)
 */initGooglemap({
  key: "AIzaSyAykiHW3aGWjrc4XSxp_W_2G79eR4O4Czg",
  language: 'zh-CN',
  v: '3'
});
/* Vue.use(VueTouch, {name: 'v-touch'})
 *//* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
