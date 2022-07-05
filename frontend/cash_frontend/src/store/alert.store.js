export default {
  namespaced: true,
  state: () => ({
    showAlert: false,
    message: "",
  }),
  getters: {
    showAlert(state) {
      return state.showAlert
    },
    message(state) {
      return state.message
    }
  },
  mutations: {
    openAlert(state, { message }) {
      state.showAlert = true;
      state.message = message;
    },
    clearAlert(state) {
      state.showAlert = false;
      state.message = "";
    }
  },
  actions: {
    openAlert(context, paras) {
      console.log("Haloo")
      context.commit("openAlert", paras);
    },
    clearAlert(context) {
      context.commit("clearAlert");
    }
  },
}

