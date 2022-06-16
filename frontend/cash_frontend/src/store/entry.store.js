import api from "@/services/entry.service";

export default {
  namespaced: true,
  state: () => ({
    entries: [],
  }),
  getters: {
    entries(state) {
      return state.entries;
    }
  },
  mutations: {
    async updateEntries(state) {
      state.entries = [];
      (await api.getAllEntries()).forEach(element => state.entries.push(element));
      // state.entries.push({ amount: 1, user: { firstname: "Lukas", lastname: "Reiterer 123123123123123123" }, currency: { symbol: "$", name: "Dollar" }, lastUpdate: "10.06.2022", category: "car" });
      // state.entries.push({ amount: 44, user: { firstname: "Hubert", lastname: "Müller" }, currency: { symbol: "kn", name: "Kuna" }, lastUpdate: "08.06.2022", category: "food" });
      // state.entries.push({ amount: 144, user: { firstname: "Seb", lastname: "Steiner" }, currency: { symbol: "€", name: "Euro" }, lastUpdate: "10.06.2022", category: "food" });
      // state.entries.push({ amount: 85, user: { firstname: "Franz", lastname: "Huber" }, currency: { symbol: "kn", name: "Kuna" }, lastUpdate: "07.06.2022", category: "etc" });
      // state.entries.push({ amount: 200, user: { firstname: "Niklas", lastname: "Maier" }, currency: { symbol: "kn", name: "Kuna" }, lastUpdate: "10.06.2022", category: "car" });
      // state.entries.push({ amount: 5, user: { firstname: "Elias", lastname: "Rider" }, currency: { symbol: "€", name: "Euro" }, lastUpdate: "09.06.2022", category: "car" });
      // state.entries.push({ amount: 100, user: { firstname: "Sau", lastname: "paddel" }, currency: { symbol: "$", name: "Dollar" }, lastUpdate: "10.06.2022", category: "etc" });
      // state.entries.push({ amount: 1000, user: { firstname: "Peter", lastname: "Haberle" }, currency: { symbol: "€", name: "Euro" }, lastUpdate: "10.06.2022", category: "food" });
    },
    addEntry(state, entry) {
      state.entries.push(entry);
    },
  },
  actions: {
    async updateEntries(context) {
      await context.commit("updateEntries");
    },
    addEntry(context, entry) {
      context.commit("addEntry", entry);
    },
  }
}


