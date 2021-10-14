<template>
  <div>
    <div class="d-flex my-3 justify-content-between align-items-center">
      <h3 :class="{'text-decoration-line-through' : todo.completed}" v-if="!editing">{{todo.title}}</h3>
      <div v-else class="mr-2 d-flex justify-content-between align-items-center col">
        <input
          v-model="todoText"
          type="text"
          class="form-control w-75"
        />
        <div class="mx-1">
          <input
            :checked="completed"
            class="mx-1"
            @change="onCompleted"
            type="checkbox" />
          <label class>Completed</label>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <button @click="updateTodoItem(todo)" class="btn btn-primary mx-2">{{editing?'Update':'Edit'}}</button>
        <button @click="deleteTodoItem(todo._id)" class="btn btn-danger">Delete</button>
      </div>
    </div>
    <p v-if="!editing" class="lead" :class="{'text-decoration-line-through' : todo.completed}">{{todo.description}}</p>
    <div v-else class="form-floating">
      <textarea class="form-control" placeholder="Leave a comment here" :id="'floatingTextarea-' + todo._id"
                style="height: 100px" v-model="todoBody"></textarea>
      <label :for="'floatingTextarea-' + todo._id">Description</label>
    </div>
  </div>
</template>

<style scoped>

</style>
<script>
import { mapActions } from "vuex";

export default {
  name: "todoItem",
  props: {
    todo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      todoText: "",
      todoBody: "",
      editing: false,
      completed: this.todo.completed
    };
  },
  methods: {
    ...mapActions(["DELETE_TODO", "UPDATE_TODO"]),
    onCompleted() {
      this.completed = this.completed == true ? false : true;
    },
    updateTodoItem(todo) {
      this.editing = this.editing == true ? false : true;
      if (this.editing) {
        this.todoText = todo.title;
        this.todoBody = todo.description;
      } else {
        this.UPDATE_TODO({
          id: todo._id,
          title: this.todoText,
          description: this.todoBody,
          completed: this.completed
        });
      }
    },
    deleteTodoItem(id){
      this.DELETE_TODO(id);
    }
  }
};
</script>
