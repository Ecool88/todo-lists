<template>
  <nav class="navbar navbar-expand-sm bg-light">
    <router-link class="nav-link home-link" to="/">
      <strong>Your Tasks</strong>
    </router-link>
    <ul class="navbar-nav" style="margin-left: auto;">
      <li v-if="isAuthenticated" class="nav-item" @click="logout">
        <span class="nav-link">Logout</span>
      </li>
      <li v-if="!isAuthenticated && !authLoading" class="nav-item d-flex flex-row">
        <router-link class="nav-link" to="/login" exact>Login</router-link>
        <router-link class="nav-link" to="/registration" exact>Registration</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.nav-item{
  cursor: pointer;
}
</style>

<script>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import {computed} from "vue";

export default {
  name: "navigation",
  setup(){
    const store = useStore();
    const router = useRouter();
    const route = useRoute()

    const isAuthenticated = computed(() => store.getters["isAuthenticated"])
    const authLoading = computed(() => store.state.auth.status === "loading")
    const logout = () => {
      store.dispatch('AUTH_LOGOUT').then(() => {
        if (route.path !== "/") {
          router.push("/");
        }
      })
    }


    return {
      isAuthenticated,
      authLoading,
      logout
    }
  },
};
</script>

<style>
  .router-link-exact-active.router-link-active:not(.home-link) {
    display: none;
  }
</style>
