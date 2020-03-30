// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSimpleAlert from "vue-simple-alert";
import VModal from 'vue-js-modal'
import VueNumericInput from 'vue-numeric-input';
Vue.use(VueNumericInput)
Vue.use(VModal, { dynamic: true, injectModalsContainer: true })
Vue.use(VueSimpleAlert);
require('../node_modules/bootstrap/dist/css/bootstrap.css')
require('../node_modules/bootstrap/dist/js/bootstrap.js')




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
/* eslint-disable */