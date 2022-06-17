
export default {
  namespaced: true,
  state: () => ({
    token: "",
    isAdmin: false,
  }),
  getters: {
    isLoggedIn(state) {
      return state.token != "";
    },
    token(state) {
      return state.token;
    },
    isUserAdmin(state) {
      return state.isAdmin;
    }
  },
  mutations: {
    setToken(state, { token, isAdmin }) {
      state.token = token;
      state.isAdmin = isAdmin;
    },
    clearToken(state) {
      state.token = "";
      state.isAdmin = false;
    }
  },
  actions: {
    clearToken(context) {
      context.commit("clearToken");
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
    },
    setToken(context, paras) {
      context.commit("setToken", paras);
      localStorage.setItem("token", paras.token);
      localStorage.setItem("isAdmin", paras.isAdmin);
    }
  },
}

