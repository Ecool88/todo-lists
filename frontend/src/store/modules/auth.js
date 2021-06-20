import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "../actions/auth";
import { USER_REQUEST } from "../actions/user";
import axios from "axios";

const state = {
  token: localStorage.getItem("user-token") || "",
  id: localStorage.getItem("user-id") || "",
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    axios.post('http://localhost:3000/api/login', {...user})
      .then(resp => {
        localStorage.setItem("user-token", resp.data.token);
        localStorage.setItem("user-id", resp.data.id);
        commit(AUTH_SUCCESS, resp.data);
        dispatch(USER_REQUEST);
      })
      .catch(err => {
        commit(AUTH_ERROR, err);
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-id");
      });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    commit(USER_REQUEST);
    let id = localStorage.getItem('user-id')
    axios.get(`http://localhost:3000/api/logout/user/${id}`)
      .then(() => {
        commit(AUTH_LOGOUT);
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-id");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.token;
    state.id = resp.id;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    state.token = "";
    state.id = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
