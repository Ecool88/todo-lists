<template>
  <div>
    <loading v-if="loading" />
    <div v-if="isAuthenticated">
      <todo-input />
      <todo-status />
      <todo-item v-for="(todo, index) in sortedTasks" :key="index" :todo="todo" />
    </div>
    <div v-if="!isAuthenticated && authStatus !== 'loading'">
      <h1 class="text-center">Welcome to todo tasks !</h1>
      <login />
    </div>
  </div>
</template>

<style>

</style>

<script>
import todoItem from "./todoItem.vue";
import todoInput from "./todoInput";
import todoStatus from "./todoStatus";
import { mapGetters } from "vuex";
import Login from "components/login";

export default {
  components: {
    Login,
    todoItem,
    todoInput,
    todoStatus
  },
  name: "home",
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus", "sortedTasks"]),
    loading: function() {
      return this.authStatus === "loading" && !this.isAuthenticated;
    }
  }
};
</script>
