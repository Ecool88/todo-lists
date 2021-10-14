import{ createApp } from 'vue';
import App from "./App";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import interceptorsSetup from "./services/serviceBase.interceptor";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

interceptorsSetup();

const optionsNotifications = {
  timeout: 2000
};

const app = createApp(App)
  app.use(router)
  app.use(store)
  app.mount('#app')
  app.use(Toast, optionsNotifications);
