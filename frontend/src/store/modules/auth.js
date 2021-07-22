import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  CREATE_ACCOUNT
} from "../actions/auth";
import { REQUEST_TODOS } from "../actions/user";
import axios from "axios";

// todo добавить уведомления для ответ notify

const state = {
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => (!!state.accessToken && !!state.refreshToken),
  authStatus: state => state.status
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    axios.post('auth/login', {...user})
      .then(resp => {
        localStorage.setItem("accessToken", resp.data.accessToken);
        localStorage.setItem("refreshToken", resp.data.refreshToken);
        localStorage.setItem("userId", resp.data.id);
        commit(AUTH_SUCCESS, resp.data);
        dispatch(REQUEST_TODOS);
      })
      .catch(err => {
        commit(AUTH_ERROR, err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
      });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    commit(REQUEST_TODOS);
    let refreshToken = localStorage.getItem('refreshToken')
    axios.post(`auth/logout`, {refreshToken})
      .then((resp) => {
        alert(resp.data.message);
        commit(AUTH_LOGOUT);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  [CREATE_ACCOUNT]: ({ commit }, newUser) => {
    axios.post('auth/registration ', {...newUser})
      .then(resp => {
        alert(resp.data.message);
      })
      .catch(err => {
        alert(err);
      });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.accessToken = resp.accessToken;
    state.refreshToken = resp.refreshToken;
    state.id = resp.id;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    state.accessToken = "";
    state.refreshToken = "";
    state.id = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
