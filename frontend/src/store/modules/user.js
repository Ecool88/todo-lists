import { REQUEST_TODOS, USER_ERROR, USER_SUCCESS, ADD_TODO, UPDATE_TODO, DELETE_TODO } from "../actions/user";
import { AUTH_LOGOUT } from "../actions/auth";
import axios from "axios";

const state = {
  status: "",
  todos: [],
  selected: 'all',
};

const getters = {
  sortedTasks: state => {
    if (state.selected == 'complete'){
      return state.todos.filter(item => item.completed == true);
    } else if (state.selected == 'not'){
      return state.todos.filter(item => item.completed == false);
    } else {
      return state.todos;
    }
  }
};

const actions = {
  [REQUEST_TODOS]: ({ commit, dispatch }) => {
    commit(REQUEST_TODOS);
    const user = localStorage.getItem("userId") || "";
    axios.get(`tasks`, {params: {user: user}})
      .then(resp => {
        commit(USER_SUCCESS);
        commit(ADD_TODO, resp.data);
      })
      .catch((err) => {
        console.log(err);
        commit(USER_ERROR);
        dispatch(AUTH_LOGOUT);
      });
  },
  [ADD_TODO]:({ commit }, todo) => {
    const user = localStorage.getItem("userId") || "";
    axios.post(`tasks`, {...todo, user})
      .then(resp => {
        alert(resp.data.message);
        commit(ADD_TODO, resp.data.items);
      })
      .catch((err) => {
        alert(err.message);
      });
  },
  [UPDATE_TODO]:({ commit }, todo) => {
    const user = localStorage.getItem("userId") || "";
    axios.put(`tasks/${todo.id}`, {...todo, user})
      .then(resp => {
        alert(resp.data.message);
        commit(ADD_TODO, resp.data.items);
      })
      .catch((err) => {
        alert(err);
      });
  },
  [DELETE_TODO]:({ commit }, idTodo) => {
    const user = localStorage.getItem("userId") || "";
    axios.delete(`tasks/${idTodo}`, {params: {user}})
      .then(resp => {
        alert(resp.data.message);
        commit(ADD_TODO, resp.data.items);
      })
      .catch((err) => {
        alert(err);
      });
  }
};

const mutations = {
  [REQUEST_TODOS]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: state => {
    state.status = "success";
  },
  [USER_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.todos = [];
  },
  [ADD_TODO]: (state, resp) => {
    state.todos = resp;
  },
  FILTER_TASKS(state, filter) {
    state.selected = filter;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
