<template>
  <div>
    <form class="w-50  mx-auto" @submit.prevent="login">
      <h2 class="text-center">Sign in</h2>
      <div class="form-group">
        <label for="inputLogin">Email address</label>
        <input required v-model="name" type="text" class="form-control" id="inputLogin" aria-describedby="emailHelp" placeholder="Enter login">
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input  required v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Enter password">
      </div>
      <button type="submit" class="btn btn-primary mt-2 float-end">Submit</button>
    </form>
  </div>
</template>

<style>

</style>

<script>
import { AUTH_REQUEST } from "actions/auth";

export default {
  name: "login",
  data() {
    return {
      name: "test",
      password: "test"
    };
  },
  methods: {
    login: function() {
      const { name, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { name, password }).then(() => {
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
      });
    }
  }
};
</script>
