import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  CREATE_ACCOUNT
} from "../actions/auth";
import { REQUEST_TODOS } from "../actions/user";
import axios from "axios";


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
        if (resp.data.accessToken && resp.data.refreshToken) {
          localStorage.setItem("accessToken", resp.data.accessToken);
          localStorage.setItem("refreshToken", resp.data.refreshToken);
          localStorage.setItem("userId", resp.data.id);
          commit(AUTH_SUCCESS, resp.data);
          alert('Пользователь успешно зашел')
          dispatch(REQUEST_TODOS);
        }
      })
      .catch(err => {
        alert(err.message)
        commit(AUTH_ERROR, err);
        clearLocalStorage();
      });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    commit(REQUEST_TODOS);
    let refreshToken = localStorage.getItem('refreshToken')
    axios.post(`auth/logout`, {refreshToken})
      .then((resp) => {
        alert(resp.data.message);
        commit(AUTH_LOGOUT);
        clearLocalStorage();
      })
      .catch((err) => {
        console.log(err);
        alert('Пользователь разлогинен без доступа к сайту')
        commit(AUTH_LOGOUT);
        clearLocalStorage();
      });
  },
  [CREATE_ACCOUNT]: ({}, newUser) => {
    axios.post('auth/registration ', {...newUser})
      .then(resp => {
        alert(resp.data.message);
      })
      .catch(err => {
        alert(err.message);
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

function clearLocalStorage() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
}
