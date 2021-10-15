<template>
  <div>
    <ul class="d-flex justify-content-center my-3">
      <li>
        <button @click="changeFilter('complete')" :class="{'bg-success': selected == 'complete'}">Completed</button>
      </li>
      <li class="mx-3">
        <button @click="changeFilter('not')" :class="{'bg-success': selected == 'not'}">Not Completed</button>
      </li>
      <li>
        <button @click="changeFilter('all')" :class="{'bg-success': selected == 'all'}">All</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "todoStatus",
  setup() {
    const store = useStore();

    const selected = ref('all')

    const changeFilter = (el) => {
      selected.value = el;
      store.commit('FILTER_TASKS', el)
    }


    return{
      selected,
      changeFilter
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  display: flex;
}
button {
  outline: none;
  border: none;
  padding: 10px 20px;
  color: #000;
}
button:hover {
  outline: none;
  background-color: rgb(194, 243, 227);
}
.active {
  outline: none;
  color: white;
  background-color: rgb(0, 202, 135);
}
.active:hover {
  outline: none;
  border: none;
  padding: 10px 20px;
  color: white;
  background-color: rgb(0, 202, 135);
}
</style>
