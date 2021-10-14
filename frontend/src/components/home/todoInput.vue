<template>
  <div>
    <div class="d-flex mt-2">
      <input
        v-model="todoText"
        class=" form-control"
        placeholder="Create new task"
        style="margin-right: 1em"
        type="text"
        @focus="onFocus"
        @blur="onBlur"
      />
      <button @click="addTodoItem" class="btn btn-outline-success">Add</button>
    </div>
    <div v-if="todoText.length && !focused" class="form-floating">
      <textarea
        v-model="todoBody"
        id="description"
        class="form-control mt-2"
        style="height: 100px"
        placeholder="Write description for task"></textarea>
      <label for="description">Description</label>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "todoInput",
  data() {
    return {
      todoText: "",
      todoBody: "",
      focused: false
    };
  },
  methods: {
    ...mapActions(["ADD_TODO"]),
    addTodoItem() {
      if (this.todoText) {
        this.ADD_TODO({
          title: this.todoText.trim(),
          description: this.todoBody.trim(),
          completed: false
        });
        this.todoText = "";
        this.todoBody = "";
      }
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    }
  }
};
</script>

<style scoped>

</style>
