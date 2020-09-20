import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import lang from "@/lang";

//Загрузка языкового пакета
lang.init('ru-RU');

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
