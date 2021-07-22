<template>
  <nav class="navbar navbar-expand-sm bg-light">
    <div>
      <strong>Your Tasks</strong>
    </div>
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
import { mapGetters, mapState } from "vuex";
import { AUTH_LOGOUT } from "actions/auth";

export default {
  name: "navigation",
  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
      });
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState({
      authLoading: state => state.auth.status === "loading"
    })
  }
};
</script>

<style>
  .router-link-exact-active.router-link-active {
    display: none;
  }
</style>
