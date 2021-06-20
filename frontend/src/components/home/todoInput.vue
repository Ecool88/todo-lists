<template>
  <div>
    <div class="d-flex mt-2">
      <input
        v-model="todoText"
        class=" form-control"
        style="margin-right: 1em"
        type="text"
      />
<!--    не сработал mr-2  удалить атрибут style у инпута-->
      <button @click="addTodoItem" class="btn btn-outline-success">Add</button>
    </div>
  </div>
</template>

<script>
import { v1 } from "uuid";
import { mapActions } from "vuex";


export default {
  name: "todoInput",
  data() {
    return {
      todoText: ""
    };
  },
  methods: {
    ...mapActions(["ADD_TODO"]),
    addTodoItem() {
      if (this.todoText){
        this.ADD_TODO({
          id: v1(),
          title: this.todoText,
          completed: false
        });
        this.todoText = "";
      }
    }
  }
};
</script>

<style scoped>

</style>
