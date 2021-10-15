<template>
  <div>
    <div class="d-flex my-3 justify-content-between align-items-center">
      <h3 :class="{'text-decoration-line-through' : todo.completed}" v-if="!item.editing">{{todo.title}}</h3>
      <div v-else class="mr-2 d-flex justify-content-between align-items-center col">
        <input
          v-model="item.title"
          type="text"
          class="form-control w-75"
        />
        <div class="mx-1">
          <input
            :checked="item.completed"
            class="mx-1"
            @change="onCompleted"
            type="checkbox" />
          <label class>Completed</label>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <button @click="updateTodoItem(todo)" class="btn btn-primary mx-2">{{item.editing?'Update':'Edit'}}</button>
        <button @click="deleteTodoItem(todo._id)" class="btn btn-danger">Delete</button>
      </div>
    </div>
    <p v-if="!item.editing" class="lead" :class="{'text-decoration-line-through' : todo.completed}">{{todo.description}}</p>
    <div v-else class="form-floating">
      <textarea class="form-control" placeholder="Leave a comment here" :id="'floatingTextarea-' + todo._id"
                style="height: 100px" v-model="item.description"></textarea>
      <label :for="'floatingTextarea-' + todo._id">Description</label>
    </div>
  </div>
</template>

<style scoped>

</style>
<script>
import { reactive } from "vue";
import {useStore} from "vuex";

export default {
  name: "todoItem",
  props: {
    todo: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const store = useStore();

    const item = reactive({
      title: '',
      description: '',
      editing: false,
      completed: props.todo.completed
    })

    const onCompleted = () => {
      item.completed = !item.completed;
    };


    const updateTodoItem = (todo) => {
      item.editing = !item.editing;
      if (item.editing) {
        item.title = todo.title;
        item.description = todo.description;
      } else {
        store.dispatch('UPDATE_TODO', {
          id: todo._id,
          title: item.title,
          description: item.description,
          completed: item.completed
        })
      }
    }

    const deleteTodoItem = (id) => {
      store.dispatch('DELETE_TODO', id)
    }



    return {
      item,
      onCompleted,
      updateTodoItem,
      deleteTodoItem
    }
  }
};
</script>
