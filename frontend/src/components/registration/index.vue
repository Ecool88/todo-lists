<template>
  <div>
    <form class="w-50  mx-auto" @submit.prevent="registration">
      <h2 class="text-center">Registration</h2>
      <div class="form-group">
        <label for="inputUsername">Username</label>
        <input required v-model="username" type="text" class="form-control" id="inputUsername"  placeholder="Enter username">
      </div>
      <div class="form-group">
        <label for="inputEmail">Email address</label>
        <input required v-model="email" type="text" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email">
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
import { CREATE_ACCOUNT } from "actions/auth";

export default {
  name: "registration",
  data() {
    return {
      username: '',
      email: "email@com",
      password: "123456"
    };
  },
  methods: {
    registration: function() {
      const email = this.email.trim();
      const password = this.password.trim();
      const username = this.username.trim();
      this.$store.dispatch(CREATE_ACCOUNT, { email, password, username }).then(() => {
        if (this.$route.path === "/registration") {
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>
