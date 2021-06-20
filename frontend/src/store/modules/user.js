import { USER_REQUEST, USER_ERROR, USER_SUCCESS, ADD_TODO, UPDATE_TODO, DELETE_TODO } from "../actions/user";
import { AUTH_LOGOUT } from "../actions/auth";
import axios from "axios";

const state = {
  status: "",
  todos: [],
  selected: 'all',
  token: localStorage.getItem('user-token') || ""
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
  [USER_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    let id = localStorage.getItem('user-id')
    let token = localStorage.getItem('user-token')
    axios.get(`http://localhost:3000/api/user/${id}`, {params: {token} })
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
    let id = localStorage.getItem('user-id')
    let token = localStorage.getItem('user-token')
    axios.post(`http://localhost:3000/api/user/${id}`, { token, todo})
      .then(resp => {
        commit(ADD_TODO, resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  [UPDATE_TODO]:({ commit }, todo) => {
    let id = localStorage.getItem('user-id')
    let token = localStorage.getItem('user-token')
    axios.put(`http://localhost:3000/api/user/${id}`, { token, todo})
      .then(resp => {
        commit(ADD_TODO, resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //todo убрать в запросах let id и let token подумать как связать
  //подумать как передать делит запросе парметры и обработать их
  [DELETE_TODO]:({ commit }, idTodo) => {
    let id = localStorage.getItem('user-id')
    let token = localStorage.getItem('user-token')
    axios.delete(`http://localhost:3000/api/user/${id}/task/${idTodo}/${token}`)
      .then(resp => {
        commit(ADD_TODO, resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const mutations = {
  [USER_REQUEST]: state => {
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
    state.todos = resp.todos;
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
