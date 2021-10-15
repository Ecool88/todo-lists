<template>
  <div>
    <form class="w-50  mx-auto" @submit.prevent="login">
      <h2 class="text-center">Sign in</h2>
      <div class="form-group">
        <label for="inputEmail">Email address</label>
        <input required v-model="loginData.email" type="text" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input  required v-model="loginData.password" type="password" class="form-control" id="inputPassword" placeholder="Enter password">
      </div>
      <button type="submit" class="btn btn-primary mt-2 float-end">Submit</button>
    </form>
  </div>
</template>

<style>

</style>

<script>
import {reactive} from "vue";
import {useStore} from "vuex";
import {useRouter, useRoute} from "vue-router";

export default {
  name: "login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const loginData = reactive({
      email: "second@yandex.com",
      password: "passw0rd"
    })

    const login = () => {
      const email = loginData.email.trim();
      const password = loginData.password.trim();
      store.dispatch('AUTH_REQUEST', { email, password }).then(() => {
        if (route.path !== "/") {
          router.push("/");
        }
      });
    }


    return{
      loginData,
      login
    }

  }
};
</script>
