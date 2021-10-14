import {createRouter, createWebHistory} from "vue-router";
import Home from "components/home";
import Login from "components/login";
import Registration from "components/registration"
import store from "../store";


const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/registration",
      name: "Registration",
      component: Registration,
      beforeEnter: ifNotAuthenticated
    }
  ]
});

export default router;
