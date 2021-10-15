<template>
  <div>
    <form class="w-50  mx-auto" @submit.prevent="registration">
      <h2 class="text-center">Registration</h2>
      <div class="form-group">
        <label for="inputUsername">Username</label>
        <input required v-model="registrationData.username" type="text" class="form-control" id="inputUsername"  placeholder="Enter username">
      </div>
      <div class="form-group">
        <label for="inputEmail">Email address</label>
        <input required v-model="registrationData.email" type="text" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input  required v-model="registrationData.password" type="password" class="form-control" id="inputPassword" placeholder="Enter password">
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
  name: "registration",
  setup(){
    const store = useStore();
    const router = useRouter();
    const route = useRoute();


    const registrationData = reactive({
      username: '',
      email: '',
      password: ''
    });

    const registration = () => {
      const email = registrationData.email.trim();
      const password = registrationData.password.trim();
      const username = registrationData.username.trim();
      store.dispatch('CREATE_ACCOUNT', { email, password, username }).then(() => {
        if (route.path === "/registration") {
          router.push("/login");
        }
      });
    }

    return{
      registrationData,
      registration
    }

  }
};
</script>
