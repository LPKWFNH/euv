import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import $xhr from './common/network/axios/xhr';
Vue.prototype.xhr = $xhr;

$xhr.xhr({
  url: '/xhr/get',
  method: 'xGET',
  params: {
      a: 'A',
      b: 'B'
  }
}).then(
    res => {
      console.log(res);
    }
).catch(
    err => {
      console.log(err);
    }
);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
