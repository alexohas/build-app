import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { lessons } from "./lessons";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
Vue.prototype.$lessons = lessons;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
