
export default {
  namespaced: true,
  state: () => ({
      token: "",
  }),
  getters: {
    isLoggedIn(state) {
      return state.token != "";
    },
    token(state) {
      return state.token;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = "";
    }
  },
  actions: {
    clearToken(context) {
      context.commit("clearToken");
      localStorage.removeItem("token", "");
    },
    setToken(context, token) {
      context.commit("setToken", token);
      localStorage.setItem("token", token);
    }
  },
}

