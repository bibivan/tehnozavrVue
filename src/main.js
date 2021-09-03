import Vue from 'vue';
import App2 from './App.vue';

import showMessage from './data/showMessage';
import { message1, message2 } from './data/messages';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App2),
}).$mount('#app');

showMessage(message1);
showMessage(message2);
