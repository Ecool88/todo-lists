import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import Loading from "components/lib/loading";
import "bootstrap/dist/css/bootstrap.css";
import interceptorsSetup from "./services/serviceBase.interceptor";

Vue.config.productionTip = false;
Vue.component("loading", Loading);

interceptorsSetup();

new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
