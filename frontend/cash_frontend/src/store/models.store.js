import api from "@/services/main.service";

export default {
  namespaced: true,
  state: () => ({
    entries: [],
    exchanges: [],
  }),
  getters: {
    entries(state) {
      return state.entries;
    },
    exchanges(state) {
      return state.exchanges;
    }
  },
  mutations: {
    async updateEntries(state) {
      state.entries = [];
      (await api.getAllEntries()).forEach(element => state.entries.push(element));
    },
    addEntry(state, entry) {
      state.entries.push(entry);
    },

    async updateExchanges(state) {
      state.exchanges = [];
      (await api.getAllExchanges()).forEach(element => state.exchanges.push(element));
    },
    addExchange(state, exchange) {
      state.exchanges.push(exchange);
    },
  },
  actions: {
    async updateEntries(context) {
      await context.commit("updateEntries");
    },
    addEntry(context, entry) {
      context.commit("addEntry", entry);
    },

    async updateExchanges(context) {
      await context.commit("updateExchanges");
    },
    addExchange(context, exchange) {
      context.commit("addExchange", exchange);
    },
  }
}


