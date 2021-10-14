import {createStore} from "vuex";
import user from "./modules/user";
import auth from "./modules/auth";


const store = createStore({
  modules: {
    user,
    auth
  },
});

export default store;
