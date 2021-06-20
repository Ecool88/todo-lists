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
import { mapMutations } from "vuex";

export default {
  name: "todoStatus",
  data() {
    return {
      selected: 'all'
    };
  },
  methods: {
    ...mapMutations(["FILTER_TASKS"]),
    changeFilter(el) {
      this.selected = el;
      this.FILTER_TASKS(el)
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
