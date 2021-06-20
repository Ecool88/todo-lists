import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import Loading from "components/lib/loading";
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false;
Vue.component("loading", Loading);

new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
