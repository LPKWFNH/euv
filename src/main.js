import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import $xhr from './common/network/axios/xhr';
Vue.prototype.xhr = $xhr;

$xhr.xhr({
    url: '/xhr/post',
    method: 'POST',
    data: {
        a: "A",
        b: "B",
        c: "C"
    }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
